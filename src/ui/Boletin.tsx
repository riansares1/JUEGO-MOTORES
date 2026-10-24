import { useState } from 'react';
import { conceptosHastaJornada } from '../motor/seleccion';
import { jornadaDef } from '../motor/partida';
import type { Asignatura, Concepto, Progreso } from '../motor/tipos';
import { ImagenConLeyenda } from './ImagenZonas';
import { imagenesDeConcepto } from './Reglamento';

interface Props {
  asig: Asignatura;
  progreso: Progreso;
  onAbrirVentanilla: () => void;
  onSalir: () => void;
}

export function Boletin({ asig, progreso, onAbrirVentanilla, onSalir }: Props) {
  const j = progreso.jornadaEnCurso!;
  const def = jornadaDef(asig, j.jornada);
  const conocidos = new Set(conceptosHastaJornada(asig, j.jornada));
  let conceptos: Concepto[];
  if (j.recuperacion) {
    const fallados = asig.conceptos.filter((c) => conocidos.has(c.id) && progreso.dominio[c.id]?.fallado);
    conceptos = fallados.length ? fallados : asig.conceptos.filter((c) => def.conceptosNuevos.includes(c.id));
  } else {
    conceptos = asig.conceptos.filter((c) => def.conceptosNuevos.includes(c.id));
  }
  const [pagina, setPagina] = useState(0);
  const total = conceptos.length + 2;
  const c = pagina >= 1 && pagina <= conceptos.length ? conceptos[pagina - 1] : null;

  return (
    <div className="pantalla">
      <div className="fila-botones" style={{ width: 'min(860px, 100%)', justifyContent: 'space-between' }}>
        <button className="boton secundario pequeno" onClick={onSalir}>
          Menú
        </button>
        <span className="nota">
          Página {pagina + 1} de {total}
        </span>
      </div>
      <article className="boletin papel">
        <header className="boletin-cab">
          <div>MINISTERIO DE INDUSTRIA · DIRECCIÓN GENERAL DE MOTORES</div>
          <h2>BOLETÍN OFICIAL {j.recuperacion ? '· REPASO' : ''}</h2>
          <div>
            Día {j.dia} · {def.titulo}
          </div>
        </header>

        {pagina === 0 && (
          <section>
            {j.recuperacion ? (
              <p className="explicacion">
                <b>Jornada de recuperación.</b> En tu última jornada fallaste más de un tercio de los expedientes. Antes de avanzar, repasa estas reglas: hoy los expedientes insistirán en ellas.
              </p>
            ) : (
              <p className="explicacion">{def.presentacion}</p>
            )}
            <h3>{j.recuperacion ? 'Reglas a repasar' : 'Reglas que entran hoy en vigor'}</h3>
            <ul>
              {conceptos.map((x) => (
                <li key={x.id}>
                  <b>{x.id}</b> · {x.nombre}
                </li>
              ))}
            </ul>
            {j.requisadas.length > 0 && (
              <div className="regla-oficial">
                <b>Aviso de requisa.</b> Las siguientes páginas del Reglamento quedan requisadas porque ya las aplicaste correctamente:{' '}
                <span style={{ fontFamily: 'var(--fuente-maquina)' }}>{j.requisadas.join(', ')}</span>. Para usarlas como prueba deberás citarlas de memoria (nombre o código) o pagar {asig.config.costeConsulta} créditos por consultarlas.
              </div>
            )}
            {j.dia === 1 && (
              <div className="regla-oficial" style={{ fontSize: '1em' }}>
                <b>Cómo trabajar en la ventanilla</b>
                <ol style={{ margin: '6px 0 0 1.2em', padding: 0 }}>
                  <li>Lee cada expediente. No hay reloj: tómate tu tiempo.</li>
                  <li>Si algo contradice la teoría, activa 🔍 <b>Inspección</b>, señala el dato erróneo y después la <b>prueba</b>: la página del Reglamento que incumple (o el otro dato con el que se contradice).</li>
                  <li>Cada discrepancia registrada abre un <b>interrogatorio</b>: escribe tu respuesta, compárala con la respuesta modelo y marca las ideas clave que hayas recogido. Solo cuenta como acierto si están todas.</li>
                  <li>Sella <b>APROBADO</b> si todo está en regla o <b>DENEGADO</b> si has demostrado una discrepancia.</li>
                  <li>Una acusación infundada o aprobar un expediente con errores supone una <b>citación</b>: las dos primeras de cada jornada son avisos; desde la tercera, multa.</li>
                </ol>
              </div>
            )}
          </section>
        )}

        {c && (
          <section>
            <p style={{ fontFamily: 'var(--fuente-maquina)', margin: 0 }}>{j.recuperacion ? 'Regla a repasar' : 'Regla nueva'} · {c.id}</p>
            <h2 style={{ marginTop: 4 }}>{c.nombre}</h2>
            <div className="regla-oficial">
              <b>Texto del Reglamento.</b> {c.regla}
            </div>
            <p className="explicacion">{c.boletin}</p>
            {imagenesDeConcepto(asig, c).map((im) => (
              <ImagenConLeyenda key={im.id} imagen={im} />
            ))}
            <p className="nota" style={{ color: 'var(--tinta-suave)' }}>Fuente: {c.fuente}</p>
          </section>
        )}

        {pagina === total - 1 && (
          <section style={{ textAlign: 'center' }}>
            <p className="explicacion">Fin del boletín. Las reglas quedan publicadas en tu Reglamento (pestaña Tema {asig.conceptos.find((x) => x.id === conceptos[0]?.id)?.tema ?? 1}).</p>
            <p>Hoy te esperan {j.expedientes.length} expedientes.</p>
            <button className="boton" onClick={onAbrirVentanilla}>
              Abrir la ventanilla
            </button>
          </section>
        )}
      </article>
      <div className="fila-botones" style={{ marginTop: 14 }}>
        <button className="boton secundario" disabled={pagina === 0} onClick={() => setPagina(pagina - 1)}>
          ← Anterior
        </button>
        {pagina < total - 1 && (
          <button className="boton" onClick={() => setPagina(pagina + 1)}>
            Siguiente →
          </button>
        )}
        {pagina < total - 1 && (
          <button className="boton secundario pequeno" onClick={() => setPagina(total - 1)}>
            Ir al final
          </button>
        )}
      </div>
    </div>
  );
}
