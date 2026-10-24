// Requisas: una regla aplicada bien una vez queda requisada desde el día siguiente.
import { nivel } from './dominio';
import type { RegistroDominio } from './tipos';

export function estaRequisada(r: RegistroDominio | undefined, dia: number): boolean {
  return !!r && r.aplicadoEnDia !== undefined && r.aplicadoEnDia < dia && nivel(r.estado) >= nivel('reglamento');
}

export function calcularRequisadas(dominio: Record<string, RegistroDominio>, conceptos: string[], dia: number): string[] {
  return conceptos.filter((id) => estaRequisada(dominio[id], dia));
}
