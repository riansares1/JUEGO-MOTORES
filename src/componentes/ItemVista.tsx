// Elige qué componente pinta cada ítem según su "tipo".
import type { AlResponder, Item } from '../tipos'
import Test from './items/Test'
import VF from './items/VF'
import Efecto from './items/Efecto'
import Clasificar from './items/Clasificar'
import Ordenar from './items/Ordenar'
import Emparejar from './items/Emparejar'
import DiagramaItem from './items/DiagramaItem'

export const NOMBRE_FORMATO: Record<Item['tipo'], string> = {
  test: 'Test',
  vf: 'Verdadero o falso',
  efecto: '¿Sube, baja o igual?',
  clasificar: 'Clasifica',
  ordenar: 'Ordena',
  emparejar: 'Empareja',
  diagrama: 'Diagrama',
}

export default function ItemVista({ item, respondido, onResponder }: { item: Item; respondido: boolean; onResponder: AlResponder }) {
  const p = { respondido, onResponder }
  switch (item.tipo) {
    case 'test':
      return <Test item={item} {...p} />
    case 'vf':
      return <VF item={item} {...p} />
    case 'efecto':
      return <Efecto item={item} {...p} />
    case 'clasificar':
      return <Clasificar item={item} {...p} />
    case 'ordenar':
      return <Ordenar item={item} {...p} />
    case 'emparejar':
      return <Emparejar item={item} {...p} />
    case 'diagrama':
      return <DiagramaItem item={item} {...p} />
  }
}
