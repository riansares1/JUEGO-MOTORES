// Clasificar: se toca una tarjeta y luego la caja (o se arrastra con el ratón).
import { useState } from 'react'
import type { AlResponder, ItemClasificar } from '../../tipos'
import { barajar } from '../../progreso'

export default function Clasificar({ item, respondido, onResponder }: { item: ItemClasificar; respondido: boolean; onResponder: AlResponder }) {
  const [orden] = useState(() => barajar(item.tarjetas.map((_, i) => i)))
  // colocadas[tarjeta] = índice de la caja donde la ha puesto la usuaria
  const [colocadas, setColocadas] = useState<Record<number, number>>({})
  const [seleccionada, setSeleccionada] = useState<number | null>(null)

  const sinColocar = orden.filter((t) => colocadas[t] === undefined)

  function colocar(tarjeta: number, caja: number) {
    setColocadas((c) => ({ ...c, [tarjeta]: caja }))
    setSeleccionada(null)
  }
  function quitar(tarjeta: number) {
    if (respondido) return
    setColocadas((c) => {
      const copia = { ...c }
      delete copia[tarjeta]
      return copia
    })
  }
  function comprobar() {
    onResponder(item.tarjetas.every((t, i) => colocadas[i] === t.caja))
  }

  return (
    <div className="reparto">
      {!respondido && (
        <div className="bandeja">
          {sinColocar.length === 0 ? (
            <p className="pista">Todo colocado. Toca una tarjeta de una caja para devolverla.</p>
          ) : (
            <p className="pista">Toca una tarjeta y después su caja.</p>
          )}
          <div className="fichas">
            {sinColocar.map((t) => (
              <button
                key={t}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', String(t))}
                className={`ficha ${seleccionada === t ? 'elegida' : ''}`}
                onClick={() => setSeleccionada(seleccionada === t ? null : t)}
              >
                {item.tarjetas[t].texto}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className={`cajas cajas-${item.cajas.length}`}>
        {item.cajas.map((nombre, c) => (
          <div
            key={c}
            className={`caja ${seleccionada !== null ? 'esperando' : ''}`}
            onClick={() => seleccionada !== null && !respondido && colocar(seleccionada, c)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const t = Number(e.dataTransfer.getData('text/plain'))
              if (!Number.isNaN(t) && !respondido) colocar(t, c)
            }}
          >
            <h4>{nombre}</h4>
            {orden
              .filter((t) => colocadas[t] === c)
              .map((t) => {
                const bien = item.tarjetas[t].caja === c
                return (
                  <button
                    key={t}
                    className={`ficha colocada ${respondido ? (bien ? 'ok' : 'mal') : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Con una tarjeta elegida, tocar dentro de la caja la coloca ahí.
                      if (seleccionada !== null) colocar(seleccionada, c)
                      else quitar(t)
                    }}
                  >
                    {item.tarjetas[t].texto}
                    {respondido && !bien && <small> → va en «{item.cajas[item.tarjetas[t].caja]}»</small>}
                  </button>
                )
              })}
          </div>
        ))}
      </div>
      {!respondido && (
        <button className="boton principal" disabled={sinColocar.length > 0} onClick={comprobar}>
          Comprobar
        </button>
      )}
    </div>
  )
}
