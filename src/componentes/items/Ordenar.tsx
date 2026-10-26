// Ordenar: se arrastra cada paso por el asa ⠿ (también con el dedo) o se usan las flechas.
import { useRef, useState } from 'react'
import type { AlResponder, ItemOrdenar } from '../../tipos'
import { barajar } from '../../progreso'

function desordenar(n: number): number[] {
  const base = Array.from({ length: n }, (_, i) => i)
  let orden = barajar(base)
  // Evitamos que salga ya ordenado.
  for (let intento = 0; intento < 10 && orden.every((v, i) => v === i); intento++) orden = barajar(base)
  return orden
}

function mover(lista: number[], desde: number, hasta: number): number[] {
  const copia = [...lista]
  const [x] = copia.splice(desde, 1)
  copia.splice(hasta, 0, x)
  return copia
}

export default function Ordenar({ item, respondido, onResponder }: { item: ItemOrdenar; respondido: boolean; onResponder: AlResponder }) {
  const [orden, setOrden] = useState(() => desordenar(item.pasos.length))
  const [arrastrando, setArrastrando] = useState<number | null>(null)
  const filas = useRef<(HTMLLIElement | null)[]>([])

  function alMover(e: React.PointerEvent) {
    if (arrastrando === null) return
    let destino = orden.length - 1
    for (let i = 0; i < filas.current.length; i++) {
      const r = filas.current[i]?.getBoundingClientRect()
      if (r && e.clientY < r.top + r.height / 2) {
        destino = i
        break
      }
    }
    if (destino !== arrastrando) {
      setOrden((o) => mover(o, arrastrando, destino))
      setArrastrando(destino)
    }
  }

  return (
    <div className="ordenar">
      {!respondido && <p className="pista">Arrastra por ⠿ o usa las flechas. Arriba = primero.</p>}
      <ol>
        {orden.map((paso, pos) => {
          const bien = paso === pos
          return (
            <li
              key={paso}
              ref={(el) => {
                filas.current[pos] = el
              }}
              className={`paso ${arrastrando === pos ? 'arrastrando' : ''} ${respondido ? (bien ? 'ok' : 'mal') : ''}`}
            >
              {!respondido && (
                <span
                  className="asa"
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId)
                    setArrastrando(pos)
                  }}
                  onPointerMove={alMover}
                  onPointerUp={() => setArrastrando(null)}
                  onPointerCancel={() => setArrastrando(null)}
                >
                  ⠿
                </span>
              )}
              <span className="num">{pos + 1}</span>
              <span className="texto">
                {item.pasos[paso]}
                {respondido && !bien && <small> (va en el puesto {paso + 1})</small>}
              </span>
              {!respondido && (
                <span className="flechas">
                  <button aria-label="Subir" disabled={pos === 0} onClick={() => setOrden((o) => mover(o, pos, pos - 1))}>
                    ▲
                  </button>
                  <button aria-label="Bajar" disabled={pos === orden.length - 1} onClick={() => setOrden((o) => mover(o, pos, pos + 1))}>
                    ▼
                  </button>
                </span>
              )}
            </li>
          )
        })}
      </ol>
      {!respondido && (
        <button className="boton principal" onClick={() => onResponder(orden.every((v, i) => v === i))}>
          Comprobar
        </button>
      )}
    </div>
  )
}
