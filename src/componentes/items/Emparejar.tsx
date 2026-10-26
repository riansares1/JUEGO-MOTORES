// Emparejar: se toca un elemento de la izquierda y luego su pareja de la derecha (o al revés).
import { useState } from 'react'
import type { AlResponder, ItemEmparejar } from '../../tipos'
import { barajar } from '../../progreso'

const COLORES = ['#dbeafe', '#fde68a', '#ddd6fe', '#fbcfe8', '#bbf7d0', '#fed7aa']

export default function Emparejar({ item, respondido, onResponder }: { item: ItemEmparejar; respondido: boolean; onResponder: AlResponder }) {
  const [ordenDer] = useState(() => barajar(item.pares.map((_, i) => i)))
  // parejas[izquierda] = índice (original) de la derecha elegida
  const [parejas, setParejas] = useState<Record<number, number>>({})
  const [selIzq, setSelIzq] = useState<number | null>(null)
  const [selDer, setSelDer] = useState<number | null>(null)

  const izqDe = (der: number) => Object.keys(parejas).map(Number).find((i) => parejas[i] === der)

  function unir(izq: number, der: number) {
    setParejas((p) => {
      const nuevo: Record<number, number> = {}
      for (const [k, v] of Object.entries(p)) if (Number(k) !== izq && v !== der) nuevo[Number(k)] = v
      nuevo[izq] = der
      return nuevo
    })
    setSelIzq(null)
    setSelDer(null)
  }
  function tocarIzq(i: number) {
    if (respondido) return
    if (parejas[i] !== undefined && selDer === null) {
      const { [i]: _quitada, ...resto } = parejas
      setParejas(resto)
      return
    }
    if (selDer !== null) unir(i, selDer)
    else setSelIzq(selIzq === i ? null : i)
  }
  function tocarDer(d: number) {
    if (respondido) return
    const izq = izqDe(d)
    if (izq !== undefined && selIzq === null) {
      const { [izq]: _quitada, ...resto } = parejas
      setParejas(resto)
      return
    }
    if (selIzq !== null) unir(selIzq, d)
    else setSelDer(selDer === d ? null : d)
  }

  const completo = Object.keys(parejas).length === item.pares.length
  // Cada pareja hecha recibe un color según el orden de la columna izquierda.
  const colorIzq = (i: number) => (parejas[i] !== undefined ? COLORES[i % COLORES.length] : undefined)

  return (
    <div className="emparejar">
      {!respondido && <p className="pista">Toca un elemento de cada columna para unirlos. Toca una pareja para deshacerla.</p>}
      <div className="columnas">
        <div className="col">
          {item.pares.map((p, i) => {
            const bien = parejas[i] === i
            return (
              <button
                key={i}
                className={`ficha ${selIzq === i ? 'elegida' : ''} ${respondido ? (bien ? 'ok' : 'mal') : ''}`}
                style={!respondido ? { background: colorIzq(i) } : undefined}
                onClick={() => tocarIzq(i)}
              >
                <strong>{p.izq}</strong>
                {respondido && !bien && <small>→ {p.der}</small>}
              </button>
            )
          })}
        </div>
        <div className="col">
          {ordenDer.map((d) => {
            const izq = izqDe(d)
            return (
              <button
                key={d}
                className={`ficha ${selDer === d ? 'elegida' : ''} ${respondido ? (izq === d ? 'ok' : 'apagada') : ''}`}
                style={!respondido && izq !== undefined ? { background: colorIzq(izq) } : undefined}
                onClick={() => tocarDer(d)}
              >
                {item.pares[d].der}
              </button>
            )
          })}
        </div>
      </div>
      {!respondido && (
        <button className="boton principal" disabled={!completo} onClick={() => onResponder(item.pares.every((_, i) => parejas[i] === i))}>
          Comprobar
        </button>
      )}
    </div>
  )
}
