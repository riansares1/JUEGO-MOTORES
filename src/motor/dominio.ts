// Estados de dominio de conceptos e imágenes.
// nuevo → visto → aplicado con Reglamento → aplicado de memoria → dominado (de memoria en dos días distintos).
// Un fallo baja un estado (nunca por debajo de "visto").
import type { EstadoDominio, RegistroDominio } from './tipos';

export const ORDEN_DOMINIO: EstadoDominio[] = ['nuevo', 'visto', 'reglamento', 'memoria', 'dominado'];

export const NOMBRE_DOMINIO: Record<EstadoDominio, string> = {
  nuevo: 'Nuevo',
  visto: 'Visto',
  reglamento: 'Aplicado con Reglamento',
  memoria: 'Aplicado de memoria',
  dominado: 'Dominado',
};

export function nivel(e: EstadoDominio): number {
  return ORDEN_DOMINIO.indexOf(e);
}

export function registroNuevo(): RegistroDominio {
  return { estado: 'nuevo', diasMemoria: [], aciertos: 0, fallos: 0 };
}

export function ver(r: RegistroDominio | undefined): RegistroDominio {
  const base = r ?? registroNuevo();
  return base.estado === 'nuevo' ? { ...base, estado: 'visto' } : base;
}

export type ModoAcierto = 'reglamento' | 'memoria';

export function acierto(r: RegistroDominio | undefined, modo: ModoAcierto, dia: number): RegistroDominio {
  const base = ver(r);
  const out: RegistroDominio = {
    ...base,
    diasMemoria: [...base.diasMemoria],
    aciertos: base.aciertos + 1,
    ultimoDia: dia,
    fallado: false,
  };
  if (out.aplicadoEnDia === undefined) out.aplicadoEnDia = dia;
  if (modo === 'reglamento') {
    if (nivel(out.estado) < nivel('reglamento')) out.estado = 'reglamento';
    return out;
  }
  if (!out.diasMemoria.includes(dia)) out.diasMemoria.push(dia);
  if (out.diasMemoria.length >= 2) out.estado = 'dominado';
  else if (nivel(out.estado) < nivel('memoria')) out.estado = 'memoria';
  return out;
}

export function fallo(r: RegistroDominio | undefined, dia: number): RegistroDominio {
  const base = ver(r);
  const nuevoNivel = Math.max(nivel('visto'), nivel(base.estado) - 1);
  const estado = ORDEN_DOMINIO[nuevoNivel];
  const out: RegistroDominio = { ...base, estado, fallos: base.fallos + 1, ultimoDia: dia, fallado: true };
  if (estado === 'memoria') out.diasMemoria = base.diasMemoria.slice(-1);
  else out.diasMemoria = [];
  if (nivel(estado) < nivel('reglamento')) out.aplicadoEnDia = undefined; // la regla vuelve al Reglamento
  return out;
}
