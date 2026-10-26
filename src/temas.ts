// Carga los JSON de contenido. Para añadir un tema nuevo: crea src/data/temaN.json e impórtalo aquí.
import type { Tema } from './tipos'
import tema1 from './data/tema1.json'
import tema2 from './data/tema2.json'
import tema3 from './data/tema3.json'
import tema4 from './data/tema4.json'

export const TEMAS: Tema[] = [tema1, tema2, tema3, tema4] as Tema[]

/** Color de cada minijuego. */
export const COLORES: Record<number, string> = {
  1: '#2563eb',
  2: '#d97706',
  3: '#7c3aed',
  4: '#059669',
}

export const ICONOS: Record<number, string> = {
  1: '🗂️',
  2: '🔧',
  3: '📈',
  4: '⚙️',
}
