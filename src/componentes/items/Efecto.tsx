import type { AlResponder, ItemEfecto } from '../../tipos'
import Opciones from './Opciones'

const VALORES = ['sube', 'baja', 'igual'] as const

export default function Efecto({ item, respondido, onResponder }: { item: ItemEfecto; respondido: boolean; onResponder: AlResponder }) {
  return (
    <Opciones
      columnas
      opciones={['▲ Sube', '▼ Baja', '＝ Igual']}
      correcta={VALORES.indexOf(item.correcta)}
      respondido={respondido}
      onElegir={(i) => onResponder(VALORES[i] === item.correcta)}
    />
  )
}
