// Ítems sobre un dibujo SVG. Modos:
//  toca       → "toca la pieza X"
//  identifica → "¿qué pieza es la resaltada?"
//  pregunta   → pregunta tipo test con el dibujo delante
//  etiquetar  → colocar etiquetas en los huecos A, B, C…
import { useState } from 'react'
import type { AlResponder, ItemDiagrama } from '../../tipos'
import { barajar } from '../../progreso'
import Diagrama, { type MarcaZona } from '../../diagramas/Diagrama'
import { nombreZona } from '../../diagramas/zonas'
import Opciones from './Opciones'

interface Props {
  item: ItemDiagrama
  respondido: boolean
  onResponder: AlResponder
}

export default function DiagramaItem(props: Props) {
  switch (props.item.modo) {
    case 'toca':
      return <Toca {...props} />
    case 'identifica':
      return <Identifica {...props} />
    case 'pregunta':
      return <Pregunta {...props} />
    case 'etiquetar':
      return <Etiquetar {...props} />
  }
}

function Toca({ item, respondido, onResponder }: Props) {
  const [tocada, setTocada] = useState<string | null>(null)
  const marcas: Record<string, MarcaZona> = {}
  if (respondido && item.objetivo) {
    if (tocada && tocada !== item.objetivo) marcas[tocada] = 'mal'
    marcas[item.objetivo] = 'sol'
  }
  return (
    <div className="diagrama-item">
      <Diagrama
        id={item.diagrama}
        marcas={marcas}
        onZona={
          respondido
            ? undefined
            : (z) => {
                setTocada(z)
                onResponder(z === item.objetivo)
              }
        }
      />
      {respondido && tocada && tocada !== item.objetivo && (
        <p className="pista">
          Has tocado: <strong>{nombreZona(item.diagrama, tocada)}</strong>. En verde, la correcta.
        </p>
      )}
    </div>
  )
}

function Identifica({ item, respondido, onResponder }: Props) {
  const [opciones] = useState(() => barajar(item.opciones ?? []))
  return (
    <div className="diagrama-item">
      <Diagrama id={item.diagrama} resaltada={item.objetivo} />
      <Opciones
        opciones={opciones.map((z) => nombreZona(item.diagrama, z))}
        correcta={opciones.indexOf(item.objetivo ?? '')}
        respondido={respondido}
        onElegir={(i) => onResponder(opciones[i] === item.objetivo)}
      />
    </div>
  )
}

function Pregunta({ item, respondido, onResponder }: Props) {
  const textos = item.opcionesTexto ?? []
  const [orden] = useState(() => barajar(textos.map((_, i) => i)))
  return (
    <div className="diagrama-item">
      <Diagrama id={item.diagrama} />
      <Opciones
        opciones={orden.map((i) => textos[i])}
        correcta={orden.indexOf(item.correcta ?? -1)}
        respondido={respondido}
        onElegir={(i) => onResponder(orden[i] === item.correcta)}
      />
    </div>
  )
}

const LETRAS = 'ABCDEFGH'

function Etiquetar({ item, respondido, onResponder }: Props) {
  const huecos = item.huecos ?? []
  const [fichas] = useState(() => barajar(huecos.map((h) => h.etiqueta)))
  // puestas[zona] = índice de la ficha colocada en ese hueco
  const [puestas, setPuestas] = useState<Record<string, number>>({})
  const [seleccionada, setSeleccionada] = useState<number | null>(null)

  const usadas = new Set(Object.values(puestas))
  const letras = Object.fromEntries(huecos.map((h, i) => [h.zona, LETRAS[i]]))
  const bienEn = (zona: string, etiqueta: string) => fichas[puestas[zona]] === etiqueta

  function tocarHueco(zona: string) {
    if (respondido) return
    if (seleccionada !== null) {
      setPuestas((p) => {
        const nuevo: Record<string, number> = {}
        for (const [z, f] of Object.entries(p)) if (f !== seleccionada) nuevo[z] = f
        nuevo[zona] = seleccionada
        return nuevo
      })
      setSeleccionada(null)
    } else if (puestas[zona] !== undefined) {
      setPuestas((p) => {
        const { [zona]: _fuera, ...resto } = p
        return resto
      })
    }
  }

  const marcas: Record<string, MarcaZona> = {}
  if (respondido) for (const h of huecos) marcas[h.zona] = bienEn(h.zona, h.etiqueta) ? 'ok' : 'mal'

  return (
    <div className="diagrama-item">
      <Diagrama id={item.diagrama} letras={letras} marcas={marcas} onZona={respondido ? undefined : tocarHueco} />
      {!respondido && (
        <div className="fichas">
          {fichas.map((texto, i) =>
            usadas.has(i) ? null : (
              <button key={i} className={`ficha ${seleccionada === i ? 'elegida' : ''}`} onClick={() => setSeleccionada(seleccionada === i ? null : i)}>
                {texto}
              </button>
            ),
          )}
        </div>
      )}
      <ul className="huecos">
        {huecos.map((h, i) => {
          const puesta = puestas[h.zona]
          const estado = respondido ? (bienEn(h.zona, h.etiqueta) ? 'ok' : 'mal') : ''
          return (
            <li key={h.zona}>
              <button className={`hueco ${estado} ${seleccionada !== null ? 'esperando' : ''}`} onClick={() => tocarHueco(h.zona)}>
                <span className="letra-hueco">{LETRAS[i]}</span>
                <span>{puesta !== undefined ? fichas[puesta] : '…'}</span>
              </button>
              {respondido && estado === 'mal' && <small className="correcta">Correcto: {h.etiqueta}</small>}
            </li>
          )
        })}
      </ul>
      {!respondido && (
        <>
          <p className="pista">Toca una etiqueta y después su hueco (letra del dibujo o de la lista).</p>
          <button
            className="boton principal"
            disabled={Object.keys(puestas).length < huecos.length}
            onClick={() => onResponder(huecos.every((h) => bienEn(h.zona, h.etiqueta)))}
          >
            Comprobar
          </button>
        </>
      )}
    </div>
  )
}
