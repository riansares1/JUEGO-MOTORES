import { jornadaDef } from '../motor/partida';
import type { Asignatura, InformeJornada, Progreso } from '../motor/tipos';
import { MapaDominio } from './MapaDominio';

interface Props {
  asig: Asignatura;
  progreso: Progreso;
  informe: InformeJornada;
  onContinuar: () => void;
  onMenu: () => void;
}

export function Informe({ asig, progreso, informe, onContinuar, onMenu }: Props) {
  const def = jornadaDef(asig, informe.jornada);
  const siguienteEs = progreso.recuperacionPendiente !== null ? `Jornada de recuperación (${progreso.recuperacionPendiente})` : informe.jornada < progreso.jornadaMax ? `Jornada ${informe.jornada + 1}` : null;
  return (
    <div className="pantalla">
      <article className="informe papel">
        <header className="boletin-cab">
          <div>MINISTERIO DE INDUSTRIA · DIRECCIÓN GENERAL DE MOTORES</div>
          <h2>INFORME DE FIN DE JORNADA</h2>
          <div>
            Día {informe.dia} · {def.titulo} {informe.recuperacion ? '· Recuperación' : ''}
          </div>
        </header>

        <div className="cifras">
          <div className="cifra">
            <b>{informe.sueldoBruto}</b>Sueldo bruto (cr)
          </div>
          <div className="cifra">
            <b>−{informe.multas}</b>Multas por citación
          </div>
          <div className="cifra">
            <b>−{informe.consultas}</b>Consultas de páginas requisadas
          </div>
          <div className="cifra">
            <b>{informe.sueldoNeto}</b>Sueldo neto (cr)
          </div>
          <div className="cifra">
            <b>
              {informe.expedientes - informe.fallados}/{informe.expedientes}
            </b>
            Expedientes resueltos
          </div>
          <div className="cifra">
            <b>{informe.citaciones.length}</b>Citaciones
          </div>
        </div>

        {informe.necesitaRecuperacion ? (
          <div className="regla-oficial" style={{ borderColor: 'var(--rojo)' }}>
            <b>Has fallado más de un tercio de los expedientes ({informe.fallados} de {informe.expedientes}).</b> El Ministerio te asigna una <b>jornada de recuperación</b> antes de seguir avanzando.
          </div>
        ) : (
          <p className="resultado-ok">Jornada superada.{informe.jornada < progreso.jornadaMax ? ' Se desbloquea la siguiente jornada.' : ''}</p>
        )}

        {informe.citaciones.length > 0 && (
          <>
            <h3>Citaciones</h3>
            <ul>
              {informe.citaciones.map((c, i) => (
                <li key={i}>
                  {c.motivo} {c.multa > 0 ? <b>(−{c.multa} cr)</b> : <i>(aviso)</i>}
                </li>
              ))}
            </ul>
          </>
        )}

        <h3>Conceptos fallados</h3>
        {informe.conceptosFallados.length === 0 ? (
          <p>Ninguno. ¡Buen trabajo!</p>
        ) : (
          informe.conceptosFallados.map((id) => {
            const c = asig.conceptos.find((x) => x.id === id);
            if (!c) return null;
            return (
              <div key={id} className="fallado">
                <b style={{ fontFamily: 'var(--fuente-maquina)' }}>{c.id}</b>
                <div>
                  <b>{c.nombre}</b>
                  <div>{c.regla}</div>
                </div>
              </div>
            );
          })
        )}

        <h3>Mapa de dominio del temario</h3>
        <MapaDominio asig={asig} progreso={progreso} />

        <div className="fila-botones" style={{ marginTop: 16 }}>
          {siguienteEs && (
            <button className="boton" onClick={onContinuar}>
              Continuar: {siguienteEs}
            </button>
          )}
          <button className="boton secundario" onClick={onMenu}>
            Volver al menú
          </button>
        </div>
      </article>
    </div>
  );
}
