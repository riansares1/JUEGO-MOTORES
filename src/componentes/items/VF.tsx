import type { AlResponder, ItemVF } from '../../tipos'
import Opciones from './Opciones'

export default function VF({ item, respondido, onResponder }: { item: ItemVF; respondido: boolean; onResponder: AlResponder }) {
  return (
    <Opciones
      columnas
      opciones={['Verdadero', 'Falso']}
      correcta={item.correcta ? 0 : 1}
      respondido={respondido}
      onElegir={(i) => onResponder((i === 0) === item.correcta)}
    />
  )
}
