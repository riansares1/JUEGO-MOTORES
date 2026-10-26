// Lista de botones de opción reutilizada por test, V/F, causa-efecto y diagramas.
import { useState } from 'react'

interface Props {
  opciones: string[]
  correcta: number
  respondido: boolean
  onElegir: (indice: number) => void
  columnas?: boolean
}

export default function Opciones({ opciones, correcta, respondido, onElegir, columnas }: Props) {
  const [elegida, setElegida] = useState<number | null>(null)
  return (
    <div className={`opciones ${columnas ? 'en-fila' : ''}`}>
      {opciones.map((texto, i) => {
        let estado = ''
        if (respondido) {
          if (i === correcta) estado = 'ok'
          else if (i === elegida) estado = 'mal'
          else estado = 'apagada'
        }
        return (
          <button
            key={i}
            className={`opcion ${estado}`}
            disabled={respondido}
            onClick={() => {
              setElegida(i)
              onElegir(i)
            }}
          >
            {texto}
          </button>
        )
      })}
    </div>
  )
}
