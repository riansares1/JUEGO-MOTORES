import { useRef, useState } from 'react';
import { jornadasDesbloqueadas, siguienteJornada } from '../motor/partida';
import { exportarProgreso, importarProgreso } from '../motor/progreso';
import type { Asignatura, Progreso } from '../motor/tipos';
import { descargarTexto } from '../estado/almacen';

interface Props {
  asig: Asignatura;
  progreso: Progreso;
  onContinuar: () => void;
  onJornada: (n: number) => void;
  onProgreso: () => void;
  onImportar: (p: Progreso) => void;
  onReiniciar: () => void;
}

export function Inicio({ asig, progreso, onContinuar, onJornada, onProgreso, onImportar, onReiniciar }: Props) {
  const sig = siguienteJornada(asig, progreso);
  const [mensaje, setMensaje] = useState<{ ok: boolean; texto: string } | null>(null);
  const [eligiendo, setEligiendo] = useState(false);
  const fichero = useRef<HTMLInputElement>(null);
  const textoContinuar = sig.enCurso
    ? `Continuar jornada ${sig.numero}${sig.recuperacion ? ' (recuperación)' : ''}`
    : sig.recuperacion
      ? `Jornada de recuperación ${sig.numero}`
      : progreso.historial.length === 0
        ? 'Empezar la jornada 1'
        : `Empezar la jornada ${sig.numero}`;
  const enCurso = progreso.jornadaEnCurso;

  return (
    <div className="pantalla">
      <img src={`${import.meta.env.BASE_URL}sello.svg`} alt="" className="escudo" />
      <h1>INSPECCIÓN DE MOTORES</h1>
      <p className="subtitulo">Ministerio de Industria · Puesto de control de Motores de Combustión Interna</p>

      <div className="panel">
        <div className="columna-botones">
          <button className="boton" style={{ fontSize: '1.15em' }} onClick={onContinuar}>
            {textoContinuar}
          </button>
          <button className="boton secundario" onClick={() => setEligiendo(!eligiendo)} aria-expanded={eligiendo}>
            Elegir jornada desbloqueada
          </button>
          {eligiendo && (
            <div className="fila-botones" style={{ paddingLeft: 10 }}>
              {jornadasDesbloqueadas(asig, progreso).map((n) => {
                const def = asig.jornadas.find((j) => j.numero === n)!;
                return (
                  <button
                    key={n}
                    className="boton secundario pequeno"
                    onClick={() => {
                      if (enCurso && !window.confirm('Hay una jornada a medias. Si empiezas otra, se perderá la jornada en curso. ¿Continuar?')) return;
                      onJornada(n);
                    }}
                  >
                    {def.titulo}
                    {progreso.recuperacionPendiente === n ? ' (recuperación)' : ''}
                  </button>
                );
              })}
            </div>
          )}
          <button className="boton secundario" onClick={onProgreso}>
            Ver progreso
          </button>
          <div className="fila-botones">
            <button
              className="boton secundario pequeno"
              onClick={() => {
                const fecha = new Date().toISOString().slice(0, 10);
                descargarTexto(`progreso-inspeccion-motores-${fecha}.json`, exportarProgreso(progreso));
                setMensaje({ ok: true, texto: 'Progreso exportado.' });
              }}
            >
              Exportar progreso
            </button>
            <button className="boton secundario pequeno" onClick={() => fichero.current?.click()}>
              Importar progreso
            </button>
            <input
              ref={fichero}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = '';
                if (!f) return;
                try {
                  const p = importarProgreso(await f.text(), asig);
                  onImportar(p);
                  setMensaje({ ok: true, texto: 'Progreso importado correctamente.' });
                } catch (err) {
                  setMensaje({ ok: false, texto: `No se pudo importar: ${(err as Error).message}` });
                }
              }}
            />
            <button
              className="boton peligro pequeno"
              onClick={() => {
                if (window.confirm('¿Seguro que quieres borrar todo tu progreso? Exporta antes una copia si la quieres conservar.')) {
                  onReiniciar();
                  setMensaje({ ok: true, texto: 'Progreso reiniciado.' });
                }
              }}
            >
              Reiniciar
            </button>
          </div>
          {mensaje && <p className={mensaje.ok ? 'resultado-ok' : 'resultado-ko'} style={{ color: mensaje.ok ? '#9fd18e' : '#ff9b8f' }}>{mensaje.texto}</p>}
        </div>
      </div>

      <div className="panel">
        <p style={{ margin: 0 }}>
          Día de servicio: <b>{progreso.dia}</b> · Jornadas superadas: <b>{progreso.historial.filter((h) => !h.necesitaRecuperacion).length}</b> · Sueldo acumulado: <b>{progreso.sueldoTotal} cr</b>
        </p>
        <p className="nota" style={{ marginBottom: 0 }}>
          El progreso se guarda automáticamente en este navegador. Usa «Exportar» para llevarlo a otro dispositivo.{' '}
          <a href={`${import.meta.env.BASE_URL}editor/`}>Editor de zonas de imagen</a> (herramienta aparte).
        </p>
      </div>
    </div>
  );
}
