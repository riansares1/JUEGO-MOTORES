import { jornadaDef } from '../motor/partida';
import type { Asignatura, Progreso } from '../motor/tipos';
import { MapaDominio } from './MapaDominio';

export function PantallaProgreso({ asig, progreso, onVolver }: { asig: Asignatura; progreso: Progreso; onVolver: () => void }) {
  return (
    <div className="pantalla">
      <h1>PROGRESO</h1>
      <div className="panel">
        <MapaDominio asig={asig} progreso={progreso} />
      </div>
      <div className="panel">
        <h2 style={{ marginTop: 0 }}>Historial de jornadas</h2>
        {progreso.historial.length === 0 ? (
          <p>Todavía no has terminado ninguna jornada.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="tabla-doc" style={{ color: 'inherit' }}>
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Jornada</th>
                  <th>Resueltos</th>
                  <th>Citaciones</th>
                  <th>Sueldo neto</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                {progreso.historial.map((h, i) => (
                  <tr key={i}>
                    <td>{h.dia}</td>
                    <td>
                      {jornadaDef(asig, h.jornada).titulo}
                      {h.recuperacion ? ' (recuperación)' : ''}
                    </td>
                    <td>
                      {h.expedientes - h.fallados}/{h.expedientes}
                    </td>
                    <td>{h.citaciones.length}</td>
                    <td>{h.sueldoNeto} cr</td>
                    <td>{h.necesitaRecuperacion ? 'Recuperación' : 'Superada'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <button className="boton" style={{ marginTop: 16 }} onClick={onVolver}>
        Volver
      </button>
    </div>
  );
}
