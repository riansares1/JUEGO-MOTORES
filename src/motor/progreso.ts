// Serialización, exportación/importación y validación del progreso.
import type { Asignatura, Progreso } from './tipos';
import { progresoInicial } from './partida';

export function exportarProgreso(p: Progreso): string {
  return JSON.stringify({ tipo: 'inspeccion-mci-progreso', exportado: new Date().toISOString(), progreso: p }, null, 2);
}

function esObjeto(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}

/** Valida un progreso importado. Lanza un Error con mensaje legible si no es válido. */
export function importarProgreso(texto: string, asig: Asignatura): Progreso {
  let datos: unknown;
  try {
    datos = JSON.parse(texto);
  } catch {
    throw new Error('El archivo no es un JSON válido.');
  }
  const p = esObjeto(datos) && esObjeto(datos.progreso) ? datos.progreso : datos;
  if (!esObjeto(p)) throw new Error('El archivo no contiene un progreso.');
  if (p.version !== 1) throw new Error('Versión de progreso no compatible.');
  if (p.asignatura !== asig.id) throw new Error(`El progreso es de otra asignatura (${String(p.asignatura)}).`);
  if (typeof p.dia !== 'number' || typeof p.jornadaMax !== 'number') throw new Error('Faltan campos del progreso.');
  if (!esObjeto(p.dominio) || !esObjeto(p.usos) || !Array.isArray(p.historial)) throw new Error('Progreso dañado.');
  const base = progresoInicial(asig);
  return { ...base, ...(p as unknown as Progreso) };
}

/** Carga desde texto guardado (localStorage); si falla, empieza de cero. */
export function cargarProgreso(texto: string | null, asig: Asignatura): Progreso {
  if (!texto) return progresoInicial(asig);
  try {
    return importarProgreso(texto, asig);
  } catch {
    return progresoInicial(asig);
  }
}
