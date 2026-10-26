// Nombres de las zonas clicables de cada diagrama. Están en zonas.json para que
// también los pueda leer el revisor (scripts/validar.mjs) con cualquier versión de Node.
// El dibujo de cada zona está en src/diagramas/dibujos.tsx.
import datos from './zonas.json'

export const ZONAS: Record<string, { titulo: string; zonas: Record<string, string> }> = datos

export function nombreZona(diagrama: string, zona: string): string {
  return ZONAS[diagrama]?.zonas[zona] ?? zona
}
