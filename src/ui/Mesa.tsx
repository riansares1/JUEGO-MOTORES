import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { textoDeElemento } from '../motor/documentos';
import { interrogatorioCorrecto, interrogatorioTerminado } from '../motor/interrogatorio';
import {
  autocorregirPregunta,
  citarPorTexto,
  consultarRegla,
  expedienteActual,
  jornadaDef,
  localizarPregunta,
  presentarPareja,
  puedeSellar,
  responderPregunta,
  sellar,
  siguienteExpediente,
  type ResultadoPresentacion,
} from '../motor/partida';
import type { Asignatura, ImagenDef, Progreso, Prueba, ResultadoExpediente, Sello } from '../motor/tipos';
import { CuerpoDocumento } from './Documento';
import { ImagenZonas } from './ImagenZonas';
import { Interrogatorio } from './Interrogatorio';
import { Reglamento } from './Reglamento';

interface Props {
  asig: Asignatura;
  progreso: Progreso;
  setProgreso: (p: Progreso) => void;
  onSalir: () => void;
  onTerminar: (p: Progreso) => void;
}

type Toast = { tipo: 'ok' | 'ko' | 'info'; texto: string } | null;
type Pos = { x: number; y: number };

const ANCHO_VENTANA = 600;

export function Mesa({ asig, progreso, setProgreso, onSalir, onTerminar }: Props) {
  const j = progreso.jornadaEnCurso!;
  const exp = expedienteActual(progreso);
  const def = jornadaDef(asig, j.jornada);
  const imagenes = useMemo(() => new Map<string, ImagenDef>(asig.imagenes.map((i) => [i.id, i])), [asig]);

  const [inspeccion, setInspeccion] = useState(false);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [textoCita, setTextoCita] = useState('');
  const [toast, setToast] = useState<Toast>(null);
  const [interrogando, setInterrogando] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoExpediente | null>(null);
  const [posiciones, setPosiciones] = useState<Record<string, Pos>>({});
  const [foco, setFoco] = useState<string>('');
  const [rayosAbierto, setRayosAbierto] = useState(false);
  const [reglamentoAbierto, setReglamentoAbierto] = useState(false);
  const escritorio = useRef<HTMLDivElement>(null);
  const arrastre = useRef<{ id: string; dx: number; dy: number } | null>(null);

  // Al cambiar de expediente se recoloca la mesa.
  useEffect(() => {
    setSeleccion(null);
    setInspeccion(false);
    setInterrogando(null);
    setRayosAbierto(false);
    setTextoCita('');
    setPosiciones({});
  }, [exp?.uid]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSeleccion(null);
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, []);

  const ventanas = useMemo(() => [...(exp?.documentos.map((d) => d.id) ?? []), ...(rayosAbierto && exp?.rayosX ? ['rx'] : [])], [exp, rayosAbierto]);
  const posDe = useCallback(
    (id: string): Pos => {
      if (posiciones[id]) return posiciones[id];
      const i = ventanas.indexOf(id);
      const ancho = escritorio.current?.clientWidth ?? 1000;
      const w = Math.min(ANCHO_VENTANA, ancho * 0.92);
      const x = Math.min(16 + i * (w + 16), Math.max(0, ancho - w - 8));
      return { x, y: 16 + (x === 16 + i * (w + 16) ? 0 : i * 40) };
    },
    [posiciones, ventanas],
  );

  if (!exp) return null;
  const d0 = exp.discrepancias[0];
  const registradas = j.actual.registradas;
  const registrada = (id: string) => registradas.find((r) => r.id === id);
  const sellado = j.actual.sello;
  const sueldo = j.resultados.reduce((s, r) => s + r.pago, 0) - j.citaciones.reduce((s, c) => s + c.multa, 0) - j.gastoConsultas;
  const avisosRestantes = Math.max(0, asig.config.avisosPorJornada - j.citaciones.length);

  // ── Guía del expediente de formación ──
  const guia = exp.guiado && d0 ? d0 : null;
  const guiaRegla = guia ? (guia.pruebas.find((p) => p.tipo === 'regla') as Extract<Prueba, { tipo: 'regla' }> | undefined)?.concepto ?? guia.concepto : undefined;
  const guiaRegistrada = guia ? !!registrada(guia.id) : false;
  const guiaInterrogada = guia ? !!registrada(guia.id) && interrogatorioTerminado(registrada(guia.id)!) : false;

  const claseElemento = (ref: string) => {
    const cls: string[] = [];
    if (seleccion && seleccion.split('@')[0] === ref) cls.push('seleccionado');
    for (const r of registradas) {
      const d = exp.discrepancias.find((x) => x.id === r.id);
      if (d && d.elemento.split('@')[0] === ref) cls.push('registrado');
    }
    if (guia && !guiaRegistrada && inspeccion && guia.elemento.split('@')[0] === ref) cls.push('guia');
    return cls.join(' ');
  };

  const tratar = (r: ResultadoPresentacion | { progreso: Progreso; resultado: { tipo: 'desconocida' } }) => {
    setProgreso(r.progreso);
    const res = r.resultado;
    if (res.tipo === 'registrada') {
      setSeleccion(null);
      setTextoCita('');
      setToast({ tipo: 'ok', texto: 'Discrepancia registrada. Pasa al interrogatorio.' });
      setInterrogando(res.discrepancia.id);
      setReglamentoAbierto(false);
    } else if (res.tipo === 'repetida') {
      setSeleccion(null);
      setToast({ tipo: 'info', texto: 'Esa discrepancia ya estaba registrada.' });
    } else if (res.tipo === 'desconocida') {
      setToast({ tipo: 'info', texto: 'No reconozco esa regla. Revisa el nombre o el código (sin penalización).' });
    } else {
      setSeleccion(null);
      const c = 'citacion' in r ? r.citacion : undefined;
      const quedan = Math.max(0, asig.config.avisosPorJornada - (r.progreso.jornadaEnCurso?.citaciones.length ?? 0));
      const extra = c ? (c.multa > 0 ? ` Citación: −${c.multa} créditos.` : ` Citación con aviso (avisos libres que quedan hoy: ${quedan}).`) : '';
      setToast({ tipo: 'ko', texto: `Acusación infundada. ${res.motivo}${extra}` });
    }
  };

  const onElemento = (ref: string) => {
    if (!inspeccion || sellado) return;
    if (!seleccion) {
      setSeleccion(ref);
      return;
    }
    if (seleccion === ref) {
      setSeleccion(null);
      return;
    }
    tratar(presentarPareja(asig, progreso, seleccion, { tipo: 'elemento', ref }));
  };

  const onPrueba = (concepto: string) => {
    if (!seleccion) {
      setToast({ tipo: 'info', texto: 'Primero activa la inspección y señala un elemento del documento.' });
      return;
    }
    tratar(presentarPareja(asig, progreso, seleccion, { tipo: 'regla', concepto }));
  };

  const citar = () => {
    if (!seleccion || !textoCita.trim()) return;
    tratar(citarPorTexto(asig, progreso, seleccion, textoCita));
  };

  const estampar = (s: Sello) => {
    const bloqueo = puedeSellar(progreso, s);
    if (bloqueo === 'sin-discrepancias') {
      setToast({ tipo: 'info', texto: 'No puedes denegar sin haber registrado al menos una discrepancia.' });
      return;
    }
    if (bloqueo === 'interrogatorio-pendiente') {
      setToast({ tipo: 'info', texto: 'Termina antes el interrogatorio pendiente.' });
      const pend = registradas.find((r) => !interrogatorioTerminado(r));
      if (pend) setInterrogando(pend.id);
      return;
    }
    if (bloqueo) return;
    const r = sellar(asig, progreso, s);
    setProgreso(r.progreso);
    setInspeccion(false);
    setSeleccion(null);
    if (r.resultado) setResultado(r.resultado);
  };

  const siguiente = () => {
    const p = siguienteExpediente(progreso);
    setResultado(null);
    if (p.jornadaEnCurso?.terminada) onTerminar(p);
    else setProgreso(p);
  };

  // ── Arrastre de ventanas ──
  const empezarArrastre = (id: string, e: RPointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    const p = posDe(id);
    arrastre.current = { id, dx: e.clientX - p.x, dy: e.clientY - p.y };
    setFoco(id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const moverArrastre = (e: RPointerEvent) => {
    const a = arrastre.current;
    if (!a) return;
    const ancho = escritorio.current?.clientWidth ?? 2000;
    setPosiciones((ps) => ({ ...ps, [a.id]: { x: Math.max(0, Math.min(ancho - 80, e.clientX - a.dx)), y: Math.max(0, e.clientY - a.dy) } }));
  };
  const soltarArrastre = () => {
    arrastre.current = null;
  };

  const ventana = (id: string, titulo: string, emisor: string | undefined, cuerpo: ReactNode, extraCabecera?: ReactNode) => {
    const p = posDe(id);
    return (
      <div key={id} className={`ventana-doc papel ${foco === id ? 'enfocada' : ''}`} style={{ left: p.x, top: p.y }} onPointerDown={() => setFoco(id)}>
        <div className="cabecera-doc" onPointerDown={(e) => empezarArrastre(id, e)} onPointerMove={moverArrastre} onPointerUp={soltarArrastre} onPointerCancel={soltarArrastre}>
          <span>{emisor ?? 'Documento'}</span>
          {extraCabecera ?? <span>⠿ arrastrar</span>}
        </div>
        <div className="titulo-doc">{titulo}</div>
        <div className="cuerpo-doc">{cuerpo}</div>
        {sellado && <div className={`sello-estampado ${sellado}`}>{sellado === 'aprobado' ? 'APROBADO' : 'DENEGADO'}</div>}
      </div>
    );
  };

  const interrogada = interrogando ? exp.discrepancias.find((d) => d.id === interrogando) : undefined;
  const regInterrogada = interrogando ? registrada(interrogando) : undefined;

  const pasosGuia = guia
    ? [
        { t: 'Activa el modo inspección (botón 🔍 de abajo).', hecho: inspeccion || guiaRegistrada },
        { t: 'Señala el elemento que parpadea en el documento.', hecho: guiaRegistrada || (!!seleccion && seleccion.split('@')[0] === guia.elemento.split('@')[0]) },
        { t: `Abre la página ${guiaRegla} del Reglamento y pulsa «Usar como prueba».`, hecho: guiaRegistrada },
        { t: 'Responde al interrogatorio y autocorrígete con la respuesta modelo.', hecho: guiaInterrogada },
        { t: 'Sella el expediente como DENEGADO.', hecho: !!sellado },
      ]
    : [];
  const pasoActual = pasosGuia.findIndex((p) => !p.hecho);

  return (
    <div className="mesa">
      <header className="barra">
        <span>
          <span className="etq">{j.recuperacion ? 'RECUPERACIÓN ·' : ''}</span>
          <span className="dato">{def.titulo}</span>
        </span>
        <span>
          <span className="etq">Expediente</span>
          <span className="dato">
            {j.indice + 1}/{j.expedientes.length}
          </span>
        </span>
        <span>
          <span className="etq">Restantes</span>
          <span className="dato">{j.expedientes.length - j.indice - (sellado ? 1 : 0)}</span>
        </span>
        <span>
          <span className="etq">Sueldo</span>
          <span className="dato">{sueldo} cr</span>
        </span>
        <span title="Las dos primeras citaciones de cada jornada son avisos; desde la tercera descuentan sueldo.">
          <span className="etq">Citaciones</span>
          <span className="dato">
            {j.citaciones.length} {avisosRestantes > 0 ? `(${avisosRestantes} aviso${avisosRestantes > 1 ? 's' : ''} libre${avisosRestantes > 1 ? 's' : ''})` : '(multa)'}
          </span>
        </span>
        <span className="fila-botones">
          <button className="boton secundario pequeno boton-reglamento" onClick={() => setReglamentoAbierto(true)}>
            📘 Reglamento
          </button>
          <button className="boton secundario pequeno" onClick={onSalir}>
            Menú
          </button>
        </span>
      </header>

      <div className="cuerpo-mesa">
        <div className={`zona-trabajo ${inspeccion ? 'inspeccionando' : ''}`}>
          <div className="ventanilla">
            <div className="cola" aria-label="Cola de expedientes">
              {j.expedientes.map((e, i) => (
                <span key={e.uid} className={`cola-icono ${i < j.indice ? 'hecho' : i === j.indice ? 'actual' : ''}`} />
              ))}
            </div>
            <div className="solicitante">
              <b>{exp.solicitante}</b> · {exp.motivo}
              {exp.guiado && <span className="chip" style={{ marginLeft: 8, background: 'var(--azul-2)' }}>Expediente de formación</span>}
            </div>
          </div>

          {guia && !sellado && (
            <div className="banda-guia">
              <b>EXPEDIENTE DE FORMACIÓN · Regla nueva {guia.concepto}</b> — {asig.conceptos.find((c) => c.id === guia.concepto)?.nombre}
              {guia.guia && <div style={{ marginTop: 4 }}>💡 {guia.guia}</div>}
              <ol>
                {pasosGuia.map((p, i) => (
                  <li key={i} className={p.hecho ? 'hecho' : i === pasoActual ? 'ahora' : ''}>
                    {p.t}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {inspeccion && !sellado && (
            <div className="banda-inspeccion" role="status">
              {!seleccion ? (
                <span>🔍 <b>Modo inspección:</b> señala un elemento del documento (campo, frase, paso, celda, etiqueta o zona de imagen).</span>
              ) : (
                <>
                  <span>
                    Señalado: <b>«{seleccion.startsWith('rx@') ? `Escáner: ${exp.rayosX && imagenes.get(exp.rayosX.imagen)?.zonas.find((z) => `rx@${z.id}` === seleccion)?.nombre}` : textoDeElemento(exp.documentos, seleccion.split('@')[0])}»</b>. Ahora señala la prueba: una página del Reglamento u otro elemento que lo contradiga.
                  </span>
                  <span className="fila-botones">
                    <label>
                      ¿Regla requisada? Escribe su nombre o código:{' '}
                      <input value={textoCita} onChange={(e) => setTextoCita(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && citar()} placeholder="p. ej. T1-14 o motor de encendido…" />
                    </label>
                    <button className="boton pequeno" onClick={citar} disabled={!textoCita.trim()}>
                      Citar
                    </button>
                    <button className="boton secundario pequeno" onClick={() => setSeleccion(null)}>
                      Cancelar
                    </button>
                  </span>
                </>
              )}
            </div>
          )}

          <div className="escritorio" ref={escritorio}>
            {exp.documentos.map((doc) =>
              ventana(
                doc.id,
                doc.titulo,
                doc.emisor,
                <CuerpoDocumento doc={doc} imagenes={imagenes} inspeccion={inspeccion && !sellado} claseElemento={claseElemento} onElemento={onElemento} />,
              ),
            )}
            {rayosAbierto &&
              exp.rayosX &&
              (() => {
                const img = imagenes.get(exp.rayosX.imagen);
                if (!img) return null;
                return ventana(
                  'rx',
                  'Escáner de rayos X · interior del motor',
                  'Escáner',
                  <div>
                    <ImagenZonas
                      imagen={img}
                      clase="rayosx"
                      resaltarAlPasar={inspeccion && !sellado}
                      estadoZona={(id) => (seleccion === `rx@${id}` ? 'seleccionada' : undefined)}
                      onZona={(z) => z && onElemento(`rx@${z.id}`)}
                      alt="Imagen del escáner"
                    />
                    <p className="nota" style={{ color: 'var(--tinta-suave)', marginBottom: 0 }}>{exp.rayosX.pie ?? 'Contrasta lo que ves con los datos de la ficha. En modo inspección puedes señalar zonas de la imagen.'}</p>
                  </div>,
                  <button className="boton secundario pequeno" onClick={() => setRayosAbierto(false)}>
                    Cerrar
                  </button>,
                );
              })()}
          </div>

          <footer className="herramientas">
            <div className="fila-botones">
              <button className={`boton ${inspeccion ? 'activo' : 'secundario'}`} onClick={() => { setInspeccion(!inspeccion); setSeleccion(null); }} disabled={!!sellado} aria-pressed={inspeccion}>
                🔍 Inspección {inspeccion ? 'ACTIVA' : ''}
              </button>
              {def.rayosX && exp.rayosX && (
                <button className="boton secundario" onClick={() => setRayosAbierto(!rayosAbierto)}>
                  ☢ Rayos X
                </button>
              )}
              <button className="boton secundario pequeno" onClick={() => setPosiciones({})} title="Coloca los documentos lado a lado">
                ▤ Lado a lado
              </button>
              <div className="registro-chips">
                {registradas.map((r, i) => {
                  const fin = interrogatorioTerminado(r);
                  const ok = interrogatorioCorrecto(r);
                  return (
                    <span key={r.id} className={`chip ${!fin ? 'pendiente' : ok ? 'ok' : 'ko'}`} onClick={() => setInterrogando(r.id)} role="button" tabIndex={0}>
                      Discrepancia {i + 1}: {!fin ? 'interrogatorio pendiente' : ok ? 'interrogatorio superado' : 'interrogatorio incompleto'}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="sellos">
              <button className="sello-boton aprobado" onClick={() => estampar('aprobado')} disabled={!!sellado}>
                APROBADO
              </button>
              <button className="sello-boton denegado" onClick={() => estampar('denegado')} disabled={!!sellado || registradas.length === 0} title={registradas.length === 0 ? 'Necesitas registrar una discrepancia' : ''}>
                DENEGADO
              </button>
            </div>
          </footer>
        </div>

        <Reglamento
          asig={asig}
          jornada={j.jornada}
          requisadas={j.requisadas}
          consultadas={j.actual.consultadas}
          esperandoPrueba={inspeccion && !!seleccion && !sellado}
          onPrueba={onPrueba}
          onConsultar={(c) => {
            setProgreso(consultarRegla(asig, progreso, c));
            setToast({ tipo: 'info', texto: `Has consultado la página ${c} (−${asig.config.costeConsulta} créditos). Lo que resuelvas con ella no contará para tu dominio.` });
          }}
          guiaConcepto={guia && !guiaRegistrada && inspeccion && seleccion ? guiaRegla : undefined}
          abierto={reglamentoAbierto}
          onCerrar={() => setReglamentoAbierto(false)}
        />
      </div>

      {interrogada && regInterrogada && (
        <Interrogatorio
          key={interrogada.id}
          asig={asig}
          discrepancia={interrogada}
          registro={regInterrogada}
          documentos={exp.documentos}
          onEnviar={(i, t) => setProgreso(responderPregunta(progreso, interrogada.id, i, t))}
          onAutocorregir={(i, m) => setProgreso(autocorregirPregunta(asig, progreso, interrogada.id, i, m))}
          onLocalizar={(i, z) => setProgreso(localizarPregunta(asig, progreso, interrogada.id, i, z))}
          onCerrar={() => setInterrogando(null)}
        />
      )}

      {resultado && (
        <div className="modal-fondo">
          <div className="modal papel" role="dialog" aria-label="Resultado del expediente">
            <div className="cabecera-doc" style={{ cursor: 'default' }}>
              <span>Resolución del expediente</span>
              <span>{resultado.sello === 'aprobado' ? 'APROBADO' : 'DENEGADO'}</span>
            </div>
            <div className="cuerpo-doc">
              <p className={resultado.tipo === 'completo' ? 'resultado-ok' : 'resultado-ko'} style={{ fontSize: '1.15em' }}>
                {resultado.mensaje} {resultado.pago > 0 ? `+${resultado.pago} cr` : ''}
              </p>
              {exp.discrepancias.length === 0 && <p>El expediente estaba en regla: no había ninguna discrepancia.</p>}
              {exp.discrepancias.map((d) => {
                const det = resultado.detalle.find((x) => x.discrepancia === d.id)!;
                const c = asig.conceptos.find((x) => x.id === d.concepto);
                return (
                  <div key={d.id} className="respuesta-modelo">
                    <div>
                      <b>{det.registrada ? 'Discrepancia detectada' : 'Discrepancia NO detectada'}:</b> «{textoDeElemento(exp.documentos, d.elemento.split('@')[0])}»
                    </div>
                    <div>{d.explicacion}</div>
                    {c && (
                      <div className="nota" style={{ color: '#28406a' }}>
                        Regla {c.id} · {c.nombre}: {c.regla}
                      </div>
                    )}
                    {det.registrada && det.modo === 'consultada' && <div className="nota" style={{ color: '#6a4a00' }}>Resuelta consultando una página requisada: no cuenta para el dominio.</div>}
                    {det.registrada && det.modo === 'memoria' && <div className="nota" style={{ color: '#245d2a' }}>Regla citada de memoria.</div>}
                  </div>
                );
              })}
              <button className="boton" onClick={siguiente} autoFocus>
                {j.indice + 1 >= j.expedientes.length ? 'Terminar la jornada' : 'Siguiente expediente'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast ${toast.tipo}`} role="alert">{toast.texto}</div>}
    </div>
  );
}
