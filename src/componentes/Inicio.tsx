import type { Progreso } from '../progreso'
import { itemsFallados, porcentajeDominado } from '../progreso'
import { COLORES, ICONOS, TEMAS } from '../temas'

interface Props {
  progreso: Progreso
  onTema: (numero: number) => void
  onFallos: () => void
  onSimulacro: () => void
  onBorrar: () => void
}

export default function Inicio({ progreso, onTema, onFallos, onSimulacro, onBorrar }: Props) {
  const todos = TEMAS.flatMap((t) => t.items)
  const nFallos = itemsFallados(todos, progreso).length
  return (
    <main className="pantalla inicio">
      <header className="portada">
        <h1>MCIA · Estudia jugando</h1>
        <p>Motores de Combustión Interna Alternativos. Rondas de 10, sin prisas.</p>
      </header>

      <div className="rejilla-temas">
        {TEMAS.map((t) => {
          const pct = porcentajeDominado(t.items, progreso)
          return (
            <button key={t.numero} className="tarjeta-tema" style={{ '--acento': COLORES[t.numero] } as React.CSSProperties} onClick={() => onTema(t.numero)}>
              <span className="icono">{ICONOS[t.numero]}</span>
              <span className="tema-num">Tema {t.numero}</span>
              <strong>{t.titulo}</strong>
              <span className="juego">
                «{t.juego}» · {t.items.length} ítems
              </span>
              <span className="barra">
                <span style={{ width: `${pct}%` }} />
              </span>
              <span className="pct">{pct}% dominado</span>
            </button>
          )
        })}
      </div>

      <div className="botonera">
        <button className="boton grande" onClick={onFallos} disabled={nFallos === 0}>
          🔁 Repasar mis fallos {nFallos > 0 ? `(${nFallos})` : ''}
        </button>
        <button className="boton grande principal" onClick={onSimulacro}>
          🎯 Simulacro mixto (20)
        </button>
      </div>

      <footer className="pie">
        <p>Un ítem está «dominado» cuando lo aciertas 3 veces seguidas. Si fallas, vuelve a empezar.</p>
        <button
          className="enlace"
          onClick={() => {
            if (confirm('¿Seguro que quieres borrar todo tu progreso?')) onBorrar()
          }}
        >
          Borrar progreso
        </button>
      </footer>
    </main>
  )
}
