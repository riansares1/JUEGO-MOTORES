// Forma de los ítems que hay en src/data/temaN.json.
// Todos comparten: id, tipo, enunciado, explicacion y fuente.

interface Base {
  id: string
  enunciado: string
  explicacion: string
  fuente: string
}

/** 4 opciones, una correcta (índice empezando en 0). */
export interface ItemTest extends Base {
  tipo: 'test'
  opciones: string[]
  correcta: number
}

/** Verdadero / falso. */
export interface ItemVF extends Base {
  tipo: 'vf'
  correcta: boolean
}

/** Causa-efecto: ¿sube, baja o se queda igual? */
export interface ItemEfecto extends Base {
  tipo: 'efecto'
  correcta: 'sube' | 'baja' | 'igual'
}

/** Tarjetas que se reparten en 2–3 cajas. `caja` es el índice de su caja. */
export interface ItemClasificar extends Base {
  tipo: 'clasificar'
  cajas: string[]
  tarjetas: { texto: string; caja: number }[]
}

/** Pasos escritos en su orden correcto (la app los desordena). */
export interface ItemOrdenar extends Base {
  tipo: 'ordenar'
  pasos: string[]
}

/** Parejas izquierda ↔ derecha (la app desordena la columna derecha). */
export interface ItemEmparejar extends Base {
  tipo: 'emparejar'
  pares: { izq: string; der: string }[]
}

/**
 * Ítem sobre un dibujo SVG (ver src/diagramas/zonas.ts para los nombres de zonas).
 * - toca:       "toca la pieza X"            → objetivo = id de zona
 * - identifica: "¿qué pieza está resaltada?" → objetivo = zona resaltada, opciones = ids de zonas
 * - etiquetar:  colocar etiquetas en huecos  → huecos = [{ zona, etiqueta }]
 * - pregunta:   pregunta tipo test sobre el dibujo → opcionesTexto + correcta
 */
export interface ItemDiagrama extends Base {
  tipo: 'diagrama'
  diagrama: string
  modo: 'toca' | 'identifica' | 'etiquetar' | 'pregunta'
  objetivo?: string
  opciones?: string[]
  huecos?: { zona: string; etiqueta: string }[]
  opcionesTexto?: string[]
  correcta?: number
}

export type Item =
  | ItemTest
  | ItemVF
  | ItemEfecto
  | ItemClasificar
  | ItemOrdenar
  | ItemEmparejar
  | ItemDiagrama

export interface Tema {
  numero: number
  titulo: string
  juego: string
  descripcion: string
  items: Item[]
}

/** Lo que guarda cada componente al responder: si acertó o no. */
export type AlResponder = (acierto: boolean) => void
