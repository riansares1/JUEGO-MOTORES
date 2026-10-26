// Progreso guardado en el navegador (localStorage) y elección de ítems para cada ronda.
//
// Repetición espaciada simple:
//   - cada ítem tiene un nivel de 0 a 3
//   - acierto → sube un nivel (máximo 3); fallo → vuelve a 0
//   - "dominado" = nivel 3
import type { Item } from './tipos'

export interface EstadoItem {
  nivel: number
  vistas: number
  ultimaFallada: boolean
}
export type Progreso = Record<string, EstadoItem>

const CLAVE = 'mcia-progreso-v1'

export function cargarProgreso(): Progreso {
  try {
    const texto = localStorage.getItem(CLAVE)
    return texto ? (JSON.parse(texto) as Progreso) : {}
  } catch {
    return {}
  }
}

export function guardarProgreso(p: Progreso) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(p))
  } catch {
    // Si el navegador no deja guardar (modo privado…), se juega igual sin guardar.
  }
}

export function registrarRespuesta(p: Progreso, id: string, acierto: boolean): Progreso {
  const previo = p[id] ?? { nivel: 0, vistas: 0, ultimaFallada: false }
  const nuevo: EstadoItem = {
    nivel: acierto ? Math.min(3, previo.nivel + 1) : 0,
    vistas: previo.vistas + 1,
    ultimaFallada: !acierto,
  }
  return { ...p, [id]: nuevo }
}

export function porcentajeDominado(items: Item[], p: Progreso): number {
  if (items.length === 0) return 0
  const dominados = items.filter((it) => (p[it.id]?.nivel ?? 0) >= 3).length
  return Math.round((dominados / items.length) * 100)
}

export function barajar<T>(lista: T[]): T[] {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

/** 0 = no visto o en nivel 0 (máxima prioridad) … 3 = dominado. */
function prioridad(it: Item, p: Progreso): number {
  const e = p[it.id]
  if (!e) return 0
  return e.nivel
}

/** Reordena para que no salgan dos formatos iguales seguidos si se puede evitar. */
function alternarFormatos(items: Item[]): Item[] {
  const restantes = [...items]
  const salida: Item[] = []
  while (restantes.length) {
    const anterior = salida[salida.length - 1]?.tipo
    let idx = restantes.findIndex((it) => it.tipo !== anterior)
    if (idx === -1) idx = 0
    salida.push(restantes.splice(idx, 1)[0])
  }
  return salida
}

/**
 * Elige `n` ítems: primero los no vistos y los de nivel 0, luego nivel 1, 2 y 3.
 * Limita cuántos ítems del mismo formato entran para que la ronda sea variada.
 */
export function elegirRonda(items: Item[], n: number, p: Progreso): Item[] {
  const ordenados = barajar(items).sort((a, b) => prioridad(a, p) - prioridad(b, p))
  const maxPorTipo = Math.max(2, Math.ceil(n * 0.4))
  const cuenta: Record<string, number> = {}
  const elegidos: Item[] = []
  for (const it of ordenados) {
    if (elegidos.length >= n) break
    if ((cuenta[it.tipo] ?? 0) >= maxPorTipo) continue
    cuenta[it.tipo] = (cuenta[it.tipo] ?? 0) + 1
    elegidos.push(it)
  }
  // Si faltan (pocos formatos disponibles), se rellena sin límite.
  for (const it of ordenados) {
    if (elegidos.length >= n) break
    if (!elegidos.includes(it)) elegidos.push(it)
  }
  return alternarFormatos(barajar(elegidos))
}

export function itemsFallados(items: Item[], p: Progreso): Item[] {
  return items.filter((it) => p[it.id]?.ultimaFallada)
}
