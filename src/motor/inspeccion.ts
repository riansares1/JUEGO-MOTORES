// Inspección: evaluar la pareja (elemento señalado, prueba) contra las discrepancias plantadas.
import { descomponerRef } from './documentos';
import type { Discrepancia, EstadoDiscrepanciaRegistrada, ExpedienteInstancia, Prueba, RefElemento, ResultadoPareja } from './tipos';

/** ¿El elemento señalado corresponde al elemento esperado? Una ref sin zona acepta cualquier zona. */
export function coincideElemento(esperado: RefElemento, senalado: RefElemento): boolean {
  if (esperado === senalado) return true;
  const e = descomponerRef(esperado);
  const s = descomponerRef(senalado);
  if (e.doc !== s.doc) return false;
  if (e.doc === 'rx') return !e.zona || e.zona === s.zona;
  if (e.elem !== s.elem) return false;
  return !e.zona; // esperado sin zona: vale el elemento entero o cualquiera de sus zonas
}

function esElementoDe(d: Discrepancia, senalado: RefElemento): boolean {
  return [d.elemento, ...(d.elementosAceptados ?? [])].some((r) => coincideElemento(r, senalado));
}

function esPruebaDe(d: Discrepancia, prueba: Prueba): boolean {
  return d.pruebas.some((p) => {
    if (p.tipo === 'regla') return prueba.tipo === 'regla' && prueba.concepto === p.concepto;
    return prueba.tipo === 'elemento' && coincideElemento(p.ref, prueba.ref);
  });
}

/**
 * Evalúa una pareja. Si la prueba es otro elemento, el orden no importa (se puede señalar primero
 * la foto y luego el campo de la ficha, o al revés).
 */
export function evaluarPareja(
  exp: ExpedienteInstancia,
  elemento: RefElemento,
  prueba: Prueba,
  registradas: EstadoDiscrepanciaRegistrada[],
): ResultadoPareja {
  if (prueba.tipo === 'elemento' && coincideElemento(prueba.ref, elemento) && coincideElemento(elemento, prueba.ref)) {
    return { tipo: 'infundada', motivo: 'Un elemento no puede ser prueba contra sí mismo.' };
  }
  for (const d of exp.discrepancias) {
    const directa = esElementoDe(d, elemento) && esPruebaDe(d, prueba);
    const inversa =
      prueba.tipo === 'elemento' && esElementoDe(d, prueba.ref) && esPruebaDe(d, { tipo: 'elemento', ref: elemento });
    if (directa || inversa) {
      const ya = registradas.some((r) => r.id === d.id);
      return ya ? { tipo: 'repetida', discrepancia: d } : { tipo: 'registrada', discrepancia: d };
    }
  }
  const tocaElemento = exp.discrepancias.some(
    (d) => esElementoDe(d, elemento) || (prueba.tipo === 'elemento' && esElementoDe(d, prueba.ref)),
  );
  return {
    tipo: 'infundada',
    motivo: tocaElemento
      ? 'La prueba aportada no demuestra la discrepancia de ese elemento.'
      : 'El elemento señalado no contiene ninguna discrepancia demostrable con esa prueba.',
  };
}

/**
 * Cómo se aportó la prueba, para el dominio:
 *  - regla no requisada → "reglamento"
 *  - regla requisada citada de memoria (escrita) → "memoria"
 *  - regla requisada consultada pagando → "consultada" (no cuenta para el dominio)
 *  - otro elemento → "elemento" (cuenta como memoria si la regla del concepto está requisada)
 */
export function modoDeRegistro(
  prueba: Prueba,
  requisadas: string[],
  consultadas: string[],
): EstadoDiscrepanciaRegistrada['modo'] {
  if (prueba.tipo === 'elemento') return 'elemento';
  if (!requisadas.includes(prueba.concepto)) return 'reglamento';
  return consultadas.includes(prueba.concepto) ? 'consultada' : 'memoria';
}
