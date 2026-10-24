// Selección de los expedientes de una jornada.
//
// Cada jornada mezcla: (1) reglas nuevas aún no aplicadas, (2) conceptos fallados,
// (3) conceptos que tocan repasar y, si sobran huecos, (4) el resto de reglas del día.
// Entre el 25 % y el 30 % de los expedientes no tienen errores.
import { barajar, type Azar } from './azar';
import { aplicarParches, descomponerRef } from './documentos';
import { nivel } from './dominio';
import type { Asignatura, Discrepancia, ExpedienteInstancia, JornadaDef, PlantillaExpediente, Progreso } from './tipos';

export function numeroLimpios(total: number, min: number, max: number): number {
  const lo = Math.ceil(total * min - 1e-9);
  const hi = Math.floor(total * max + 1e-9);
  if (lo <= hi) return lo;
  return Math.round((total * (min + max)) / 2);
}

export function conceptosHastaJornada(asig: Asignatura, numero: number): string[] {
  return asig.jornadas.filter((j) => j.numero <= numero).flatMap((j) => j.conceptosNuevos);
}

export function conceptosPermitidos(asig: Asignatura, jornada: JornadaDef): string[] {
  if (!jornada.soloDiaYAnterior) return conceptosHastaJornada(asig, jornada.numero);
  return asig.jornadas
    .filter((j) => j.numero === jornada.numero || j.numero === jornada.numero - 1)
    .flatMap((j) => j.conceptosNuevos);
}

function usaRayosX(d: Discrepancia): boolean {
  const refs = [d.elemento, ...(d.elementosAceptados ?? []), ...d.pruebas.flatMap((p) => (p.tipo === 'elemento' ? [p.ref] : []))];
  return refs.some((r) => descomponerRef(r).doc === 'rx');
}

function plantillaElegible(p: PlantillaExpediente, conocidos: Set<string>, jornada: JornadaDef): boolean {
  return p.documentos.length <= jornada.maxDocumentos && p.conceptos.every((c) => conocidos.has(c));
}

function discrepanciaElegible(d: Discrepancia, jornada: JornadaDef): boolean {
  return jornada.rayosX || !usaRayosX(d);
}

export interface OpcionesSeleccion {
  recuperacion: boolean;
  dia: number;
  azar: Azar;
}

interface Eleccion {
  plantilla: PlantillaExpediente;
  discrepancia: Discrepancia | null;
  guiado: boolean;
}

/** Orden de prioridad de conceptos para plantar discrepancias. */
export function prioridadConceptos(asig: Asignatura, progreso: Progreso, jornada: JornadaDef, recuperacion: boolean): string[] {
  const orden = asig.conceptos.map((c) => c.id);
  const pos = (id: string) => orden.indexOf(id);
  const reg = (id: string) => progreso.dominio[id];
  const est = (id: string) => nivel(reg(id)?.estado ?? 'nuevo');
  const conocidos = conceptosHastaJornada(asig, jornada.numero);
  const permitidos = conceptosPermitidos(asig, jornada);
  const fallados = conocidos.filter((id) => reg(id)?.fallado);
  const delDia = jornada.conceptosNuevos;

  const lista: string[] = [];
  const meter = (ids: string[]) => ids.forEach((id) => !lista.includes(id) && lista.push(id));

  if (recuperacion) {
    meter([...fallados].sort((a, b) => pos(a) - pos(b)));
    meter(delDia.filter((id) => est(id) < nivel('reglamento')));
    meter(delDia);
    return lista;
  }
  // Reglas nuevas sin aplicar, intercaladas (1ª, 3ª, 5ª… y luego 2ª, 4ª…) para que, si no caben
  // todas en la jornada, la muestra recorra todo el boletín y no solo su principio.
  const nuevas = delDia.filter((id) => est(id) < nivel('reglamento'));
  meter([...nuevas.filter((_, i) => i % 2 === 0), ...nuevas.filter((_, i) => i % 2 === 1)]);
  meter([...fallados].sort((a, b) => pos(a) - pos(b)));
  const repaso = permitidos
    .filter((id) => est(id) >= nivel('reglamento') && est(id) < nivel('dominado'))
    .sort((a, b) => (reg(a)?.ultimoDia ?? 0) - (reg(b)?.ultimoDia ?? 0) || pos(a) - pos(b));
  meter(repaso);
  meter(delDia);
  meter(permitidos.filter((id) => !delDia.includes(id) && est(id) < nivel('reglamento')));
  meter(permitidos);
  return lista;
}

export function seleccionarExpedientes(
  asig: Asignatura,
  progreso: Progreso,
  jornada: JornadaDef,
  opciones: OpcionesSeleccion,
): ExpedienteInstancia[] {
  const { azar, recuperacion, dia } = opciones;
  const cfg = asig.config;
  const total = recuperacion ? cfg.numExpedientesRecuperacion : jornada.numExpedientes;
  const nLimpios = numeroLimpios(total, cfg.porcentajeLimpiosMin, cfg.porcentajeLimpiosMax);
  const nErrores = total - nLimpios;

  const conocidos = new Set(conceptosHastaJornada(asig, jornada.numero));
  const plantillas = asig.plantillas.filter((p) => plantillaElegible(p, conocidos, jornada));
  const usos = (k: string) => progreso.usos[k] ?? 0;
  const usadasHoy = new Map<string, number>();
  const conceptosHoy = new Map<string, number>();
  const guiadosHoy = new Set<string>();

  const candidatas = (concepto: string) =>
    plantillas.flatMap((p) =>
      p.discrepancias.filter((d) => d.concepto === concepto && discrepanciaElegible(d, jornada)).map((d) => ({ p, d })),
    );

  const elegir = (concepto: string): Eleccion | null => {
    const cands = candidatas(concepto);
    if (!cands.length) return null;
    const puntuadas = barajar(cands, azar).map((c) => ({
      ...c,
      pena: (usadasHoy.get(c.p.id) ?? 0) * 1000 + usos(`${c.p.id}#${c.d.id}`) * 10 + usos(c.p.id),
    }));
    puntuadas.sort((a, b) => a.pena - b.pena);
    const { p, d } = puntuadas[0];
    const r = progreso.dominio[concepto];
    const esNueva = jornada.conceptosNuevos.includes(concepto);
    const guiado = esNueva && !r?.guiado && nivel(r?.estado ?? 'nuevo') < nivel('reglamento') && !guiadosHoy.has(concepto);
    if (guiado) guiadosHoy.add(concepto);
    return { plantilla: p, discrepancia: d, guiado };
  };

  const prioridad = prioridadConceptos(asig, progreso, jornada, recuperacion);
  const errores: Eleccion[] = [];
  let ronda = 0;
  while (errores.length < nErrores && ronda < 4) {
    for (const c of prioridad) {
      if (errores.length >= nErrores) break;
      if ((conceptosHoy.get(c) ?? 0) > ronda) continue;
      const e = elegir(c);
      if (!e) continue;
      errores.push(e);
      conceptosHoy.set(c, (conceptosHoy.get(c) ?? 0) + 1);
      usadasHoy.set(e.plantilla.id, (usadasHoy.get(e.plantilla.id) ?? 0) + 1);
    }
    ronda++;
  }

  // Limpios: plantillas del día (o permitidas) menos usadas hoy.
  const permitidos = new Set(conceptosPermitidos(asig, jornada));
  const limpiables = plantillas.filter((p) => p.usableLimpia !== false && p.conceptos.some((c) => permitidos.has(c)));
  const limpios: Eleccion[] = [];
  for (let i = 0; i < nLimpios && limpiables.length; i++) {
    const ordenadas = barajar(limpiables, azar).sort(
      (a, b) =>
        (usadasHoy.get(a.id) ?? 0) - (usadasHoy.get(b.id) ?? 0) ||
        Number(b.conceptos.some((c) => jornada.conceptosNuevos.includes(c))) -
          Number(a.conceptos.some((c) => jornada.conceptosNuevos.includes(c))) ||
        usos(`${a.id}#limpio`) - usos(`${b.id}#limpio`),
    );
    const p = ordenadas[0];
    limpios.push({ plantilla: p, discrepancia: null, guiado: false });
    usadasHoy.set(p.id, (usadasHoy.get(p.id) ?? 0) + 1);
  }

  // Orden: primero los de formación (en orden del inventario), luego el resto barajado;
  // los limpios se intercalan repartidos, nunca en primera posición.
  const orden = asig.conceptos.map((c) => c.id);
  const guiados = errores.filter((e) => e.guiado).sort((a, b) => orden.indexOf(a.discrepancia!.concepto) - orden.indexOf(b.discrepancia!.concepto));
  const resto = barajar(errores.filter((e) => !e.guiado), azar);
  const secuencia: Eleccion[] = [...guiados, ...resto];
  const totalReal = secuencia.length + limpios.length;
  limpios.forEach((l, i) => {
    const objetivo = Math.floor(((i + 1) * totalReal) / (limpios.length + 1));
    const pos = Math.min(secuencia.length, Math.max(1, objetivo + Math.floor(azar() * 3) - 1));
    secuencia.splice(pos, 0, l);
  });

  return secuencia.map((e, i) => instanciar(e, i, dia, jornada));
}

function instanciar(e: Eleccion, indice: number, dia: number, jornada: JornadaDef): ExpedienteInstancia {
  const discrepancias = e.discrepancia ? [e.discrepancia] : [];
  return {
    uid: `d${dia}-${indice + 1}-${e.plantilla.id}${e.discrepancia ? '-' + e.discrepancia.id : '-limpio'}`,
    plantilla: e.plantilla.id,
    solicitante: e.plantilla.solicitante,
    motivo: e.plantilla.motivo,
    documentos: aplicarParches(e.plantilla.documentos, discrepancias.flatMap((d) => d.parches)),
    rayosX: jornada.rayosX ? e.plantilla.rayosX : undefined,
    discrepancias,
    guiado: e.guiado,
  };
}

/** Claves de uso para la variedad (plantilla, plantilla#discrepancia o plantilla#limpio). */
export function clavesDeUso(exp: ExpedienteInstancia): string[] {
  const d = exp.discrepancias[0];
  return [exp.plantilla, `${exp.plantilla}#${d ? d.id : 'limpio'}`];
}
