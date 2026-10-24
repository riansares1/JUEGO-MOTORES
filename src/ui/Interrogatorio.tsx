import { useState } from 'react';
import { textoDeElemento } from '../motor/documentos';
import { preguntasDe } from '../motor/interrogatorio';
import type { Asignatura, Discrepancia, Documento, EstadoDiscrepanciaRegistrada, Pregunta, RespuestaPregunta } from '../motor/tipos';
import { ImagenZonas } from './ImagenZonas';

const NOMBRE_TIPO: Record<Pregunta['tipo'], string> = {
  corregir: 'Corregir',
  explicar: 'Explicar',
  nombrar: 'Nombrar',
  localizar: 'Localizar',
};

interface Props {
  asig: Asignatura;
  discrepancia: Discrepancia;
  registro: EstadoDiscrepanciaRegistrada;
  documentos: Documento[];
  onEnviar: (idx: number, texto: string) => void;
  onAutocorregir: (idx: number, marcadas: boolean[]) => void;
  onLocalizar: (idx: number, zona: string) => void;
  onCerrar: () => void;
}

export function Interrogatorio({ asig, discrepancia, registro, documentos, onEnviar, onAutocorregir, onLocalizar, onCerrar }: Props) {
  const preguntas = preguntasDe(discrepancia, asig.conceptos);
  const terminado = registro.respuestas.every((r) => r.corregida);
  const concepto = asig.conceptos.find((c) => c.id === discrepancia.concepto);

  return (
    <div className="modal-fondo">
      <div className="modal papel" role="dialog" aria-label="Interrogatorio">
        <div className="cabecera-doc" style={{ cursor: 'default' }}>
          <span>Interrogatorio · discrepancia registrada</span>
          <button className="boton secundario pequeno" onClick={onCerrar}>
            {terminado ? 'Volver a la mesa' : 'Volver más tarde'}
          </button>
        </div>
        <div className="cuerpo-doc">
          <p style={{ marginTop: 0 }}>
            Has señalado: <b>«{textoDeElemento(documentos, discrepancia.elemento)}»</b>
          </p>
          {preguntas.map((p, i) => (
            <PreguntaUI
              key={i}
              asig={asig}
              indice={i}
              total={preguntas.length}
              pregunta={p}
              respuesta={registro.respuestas[i]}
              activa={registro.respuestas.slice(0, i).every((r) => r.corregida)}
              onEnviar={(t) => onEnviar(i, t)}
              onAutocorregir={(m) => onAutocorregir(i, m)}
              onLocalizar={(z) => onLocalizar(i, z)}
            />
          ))}
          {terminado && (
            <div className="respuesta-modelo">
              <b>Resumen.</b> {discrepancia.explicacion}
              {concepto && (
                <>
                  <br />
                  <span className="nota" style={{ color: '#28406a' }}>
                    Regla {concepto.id} · {concepto.nombre}
                  </span>
                </>
              )}
              <div style={{ marginTop: 10 }}>
                <button className="boton" onClick={onCerrar}>
                  Volver a la mesa y sellar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PreguntaUI({
  asig,
  indice,
  total,
  pregunta,
  respuesta,
  activa,
  onEnviar,
  onAutocorregir,
  onLocalizar,
}: {
  asig: Asignatura;
  indice: number;
  total: number;
  pregunta: Pregunta;
  respuesta: RespuestaPregunta;
  activa: boolean;
  onEnviar: (t: string) => void;
  onAutocorregir: (m: boolean[]) => void;
  onLocalizar: (z: string) => void;
}) {
  const [texto, setTexto] = useState(respuesta.texto);
  const [marcadas, setMarcadas] = useState<boolean[]>(respuesta.marcadas);
  const [aviso, setAviso] = useState('');
  if (!activa) return null;

  const cabecera = (
    <p style={{ marginBottom: 6 }}>
      <span className="etiqueta-tipo">{NOMBRE_TIPO[pregunta.tipo]}</span>{' '}
      {total > 1 && <span className="nota" style={{ color: 'var(--tinta-suave)' }}>Pregunta {indice + 1} de {total}</span>}
      <br />
      <b style={{ fontSize: '1.08em' }}>{pregunta.enunciado}</b>
    </p>
  );

  if (pregunta.tipo === 'localizar') {
    const img = asig.imagenes.find((x) => x.id === pregunta.imagen)!;
    return (
      <section style={{ borderTop: '1px solid var(--papel-borde)', paddingTop: 8, marginTop: 8 }}>
        {cabecera}
        {!respuesta.corregida && <p className="nota" style={{ color: 'var(--tinta-suave)', marginTop: 0 }}>Toca directamente la pieza en la imagen (sin etiquetas).</p>}
        <div style={{ maxWidth: 560 }}>
          <ImagenZonas
            imagen={img}
            resaltarAlPasar={false}
            estadoZona={(id) => {
              if (!respuesta.corregida) return undefined;
              if (id === pregunta.zonaCorrecta) return 'correcta';
              if (id === respuesta.zona) return 'incorrecta';
              return undefined;
            }}
            onZona={(z) => {
              if (respuesta.corregida) return;
              if (!z) {
                setAviso('Ahí no hay ninguna pieza identificable. Prueba otra vez.');
                return;
              }
              onLocalizar(z.id);
            }}
            alt="Imagen sin etiquetas"
          />
        </div>
        {aviso && !respuesta.corregida && <p className="nota" style={{ color: 'var(--rojo)' }}>{aviso}</p>}
        {respuesta.corregida && (
          <p className={respuesta.acierto ? 'resultado-ok' : 'resultado-ko'}>
            {respuesta.acierto ? '✓ Correcto.' : '✗ No es ahí. La zona correcta está marcada en verde.'} <span style={{ fontWeight: 400, color: 'var(--tinta)' }}>{pregunta.respuestaModelo}</span>
          </p>
        )}
      </section>
    );
  }

  return (
    <section style={{ borderTop: '1px solid var(--papel-borde)', paddingTop: 8, marginTop: 8 }}>
      {cabecera}
      <textarea
        value={respuesta.enviada ? respuesta.texto : texto}
        disabled={respuesta.enviada}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe tu respuesta como en el examen…"
        aria-label="Tu respuesta"
      />
      {!respuesta.enviada && (
        <div className="fila-botones" style={{ marginTop: 6 }}>
          <button className="boton" disabled={texto.trim().length < 2} onClick={() => onEnviar(texto.trim())}>
            Enviar respuesta
          </button>
          <span className="nota" style={{ color: 'var(--tinta-suave)' }}>Al enviar, tu respuesta queda bloqueada.</span>
        </div>
      )}
      {respuesta.enviada && (
        <>
          <div className="respuesta-modelo">
            <b>Respuesta modelo:</b> {pregunta.respuestaModelo}
          </div>
          <p style={{ margin: '6px 0' }}>{respuesta.corregida ? 'Ideas clave que marcaste:' : 'Marca honradamente las ideas clave que aparecen en TU respuesta:'}</p>
          {pregunta.ideasClave.map((idea, k) => (
            <label key={k} className="idea">
              <input
                type="checkbox"
                checked={respuesta.corregida ? respuesta.marcadas[k] : !!marcadas[k]}
                disabled={respuesta.corregida}
                onChange={(e) => setMarcadas((m) => pregunta.ideasClave.map((_, j) => (j === k ? e.target.checked : !!m[j])))}
              />
              <span>{idea}</span>
            </label>
          ))}
          {!respuesta.corregida ? (
            <button className="boton" onClick={() => onAutocorregir(pregunta.ideasClave.map((_, j) => !!marcadas[j]))}>
              Confirmar autocorrección
            </button>
          ) : (
            <p className={respuesta.acierto ? 'resultado-ok' : 'resultado-ko'}>
              {respuesta.acierto ? '✓ Respuesta completa.' : '✗ Respuesta incompleta: faltan ideas clave.'}
            </p>
          )}
        </>
      )}
    </section>
  );
}
