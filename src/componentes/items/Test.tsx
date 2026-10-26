import { useState } from 'react'
import type { AlResponder, ItemTest } from '../../tipos'
import { barajar } from '../../progreso'
import Opciones from './Opciones'

export default function Test({ item, respondido, onResponder }: { item: ItemTest; respondido: boolean; onResponder: AlResponder }) {
  // Se desordenan las opciones una sola vez; guardamos el índice original de cada una.
  const [orden] = useState(() => barajar(item.opciones.map((_, i) => i)))
  return (
    <Opciones
      opciones={orden.map((i) => item.opciones[i])}
      correcta={orden.indexOf(item.correcta)}
      respondido={respondido}
      onElegir={(i) => onResponder(orden[i] === item.correcta)}
    />
  )
}
