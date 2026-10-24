// Estado de la partida: funciones puras que reciben el Progreso y devuelven uno nuevo.
// La interfaz solo llama a estas funciones y guarda el resultado.
import { crearAzar } from './azar';
import { acierto, fallo, ver } from './dominio';
import { evaluarPareja, modoDeRegistro } from './inspeccion';
import { autocorregir, enviarRespuesta, localizar, preguntasDe, respuestaVacia } from './interrogatorio';
import { calcularRequisadas } from './requisas';
import { clavesDeUso, conceptosHastaJornada, seleccionarExpedientes } from './seleccion';
import { identificarCita } from './texto';
import type {
  Asignatura,
  Discrepancia,
  EstadoDiscrepanciaRegistrada,
  EstadoExpedienteActual,
  EstadoJornada,
  EventoCitacion,
  ExpedienteInstancia,
  InformeJornada,
  Progreso,
  Prueba,
  RefElemento,
  ResultadoExpediente,
  ResultadoPareja,
  Sello,
} from './tipos';
import { bloqueoDeSello, resolverVeredicto, type BloqueoSello } from './veredicto';

export function progresoInicial(asig: Asignatura): Progreso {
  return {
    version: 1,
    asignatura: asig.id,
    dia: 1,
    jornadaMax: asig.jornadas[0]?.numero ?? 1,
    recuperacionPendiente: null,
    dominio: {},
    usos: {},
    historial: [],
    sueldoTotal: 0,
    jornadaEnCurso: null,
  };
}

function actualVacio(): EstadoExpedienteActual {
  return { registradas: [], consultadas: [], infundadas: 0 };
}

export function jornadaDef(asig: Asignatura, numero: number) {
  const j = asig.jornadas.find((x) => x.numero === numero);
  if (!j) throw new Error(`Jornada ${numero} no definida`);
  return j;
}

export function jornadasDesbloqueadas(asig: Asignatura, p: Progreso): number[] {
  return asig.jornadas.map((j) => j.numero).filter((n) => n <= p.jornadaMax);
}

/** Lo que haría el botón "Continuar". */
export function siguienteJornada(asig: Asignatura, p: Progreso): { numero: number; recuperacion: boolean; enCurso: boolean } {
  if (p.jornadaEnCurso) return { numero: p.jornadaEnCurso.jornada, recuperacion: p.jornadaEnCurso.recuperacion, enCurso: true };
  if (p.recuperacionPendiente !== null) return { numero: p.recuperacionPendiente, recuperacion: true, enCurso: false };
  const jugadas = new Set(p.historial.filter((h) => !h.necesitaRecuperacion).map((h) => h.jornada));
  const pendiente = jornadasDesbloqueadas(asig, p).find((n) => !jugadas.has(n));
  return { numero: pendiente ?? p.jornadaMax, recuperacion: false, enCurso: false };
}

export function iniciarJornada(asig: Asignatura, p: Progreso, numero: number, semilla = Date.now()): Progreso {
  const def = jornadaDef(asig, numero);
  const recuperacion = p.recuperacionPendiente === numero;
  const expedientes = seleccionarExpedientes(asig, p, def, { recuperacion, dia: p.dia, azar: crearAzar(semilla) });
  const usos = { ...p.usos };
  for (const e of expedientes) for (const k of clavesDeUso(e)) usos[k] = (usos[k] ?? 0) + 1;
  const jornada: EstadoJornada = {
    jornada: numero,
    dia: p.dia,
    recuperacion,
    expedientes,
    indice: 0,
    actual: actualVacio(),
    resultados: [],
    citaciones: [],
    gastoConsultas: 0,
    requisadas: calcularRequisadas(p.dominio, conceptosHastaJornada(asig, numero), p.dia),
    boletinLeido: false,
    terminada: expedientes.length === 0,
  };
  return { ...p, usos, jornadaEnCurso: jornada };
}

function conJornada(p: Progreso, f: (j: EstadoJornada) => EstadoJornada): Progreso {
  if (!p.jornadaEnCurso) throw new Error('No hay jornada en curso');
  return { ...p, jornadaEnCurso: f(p.jornadaEnCurso) };
}

export function expedienteActual(p: Progreso): ExpedienteInstancia | null {
  const j = p.jornadaEnCurso;
  if (!j || j.indice >= j.expedientes.length) return null;
  return j.expedientes[j.indice];
}

/** Al cerrar el boletín: las reglas e imágenes de la jornada pasan a "visto". */
export function leerBoletin(asig: Asignatura, p: Progreso): Progreso {
  const j = p.jornadaEnCurso;
  if (!j) return p;
  const def = jornadaDef(asig, j.jornada);
  const dominio = { ...p.dominio };
  for (const id of [...def.conceptosNuevos, ...def.imagenesNuevas]) dominio[id] = ver(dominio[id]);
  return { ...p, dominio, jornadaEnCurso: { ...j, boletinLeido: true } };
}

function nuevaCitacion(asig: Asignatura, j: EstadoJornada, expediente: string, motivo: string): EventoCitacion {
  const numero = j.citaciones.length + 1;
  return { expediente, motivo, multa: numero > asig.config.avisosPorJornada ? asig.config.multaCitacion : 0 };
}

export interface ResultadoPresentacion {
  progreso: Progreso;
  resultado: ResultadoPareja;
  citacion?: EventoCitacion;
}

export function presentarPareja(asig: Asignatura, p: Progreso, elemento: RefElemento, prueba: Prueba): ResultadoPresentacion {
  const exp = expedienteActual(p);
  const j = p.jornadaEnCurso;
  if (!exp || !j) throw new Error('No hay expediente en curso');
  if (j.actual.sello) throw new Error('El expediente ya está sellado');
  const resultado = evaluarPareja(exp, elemento, prueba, j.actual.registradas);
  if (resultado.tipo === 'registrada') {
    const d = resultado.discrepancia;
    const reg: EstadoDiscrepanciaRegistrada = {
      id: d.id,
      modo: modoDeRegistro(prueba, j.requisadas, j.actual.consultadas),
      respuestas: preguntasDe(d, asig.conceptos).map(respuestaVacia),
    };
    return {
      progreso: conJornada(p, (jj) => ({ ...jj, actual: { ...jj.actual, registradas: [...jj.actual.registradas, reg] } })),
      resultado,
    };
  }
  if (resultado.tipo === 'repetida') return { progreso: p, resultado };
  const citacion = nuevaCitacion(asig, j, exp.uid, `Acusación infundada. ${resultado.motivo}`);
  return {
    progreso: conJornada(p, (jj) => ({
      ...jj,
      citaciones: [...jj.citaciones, citacion],
      actual: { ...jj.actual, infundadas: jj.actual.infundadas + 1 },
    })),
    resultado,
    citacion,
  };
}

/** Candidatos que se pueden citar por escrito: las reglas que existen en el Reglamento de la jornada. */
export function candidatosCita(asig: Asignatura, p: Progreso) {
  const j = p.jornadaEnCurso;
  const conocidos = new Set(j ? conceptosHastaJornada(asig, j.jornada) : []);
  return asig.conceptos.filter((c) => conocidos.has(c.id)).map((c) => ({ id: c.id, nombres: [c.nombre, ...(c.alias ?? [])] }));
}

/** Citar una regla escribiendo su nombre o código (reglas requisadas). */
export function citarPorTexto(
  asig: Asignatura,
  p: Progreso,
  elemento: RefElemento,
  texto: string,
): ResultadoPresentacion | { progreso: Progreso; resultado: { tipo: 'desconocida' } } {
  const id = identificarCita(texto, candidatosCita(asig, p));
  if (!id) return { progreso: p, resultado: { tipo: 'desconocida' } };
  return presentarPareja(asig, p, elemento, { tipo: 'regla', concepto: id });
}

export function consultarRegla(asig: Asignatura, p: Progreso, concepto: string): Progreso {
  return conJornada(p, (j) => {
    if (!j.requisadas.includes(concepto) || j.actual.consultadas.includes(concepto)) return j;
    return {
      ...j,
      gastoConsultas: j.gastoConsultas + asig.config.costeConsulta,
      actual: { ...j.actual, consultadas: [...j.actual.consultadas, concepto] },
    };
  });
}

function conRespuesta(
  p: Progreso,
  discId: string,
  idx: number,
  f: (r: EstadoDiscrepanciaRegistrada['respuestas'][number], d: Discrepancia) => EstadoDiscrepanciaRegistrada['respuestas'][number],
): Progreso {
  const exp = expedienteActual(p);
  const d = exp?.discrepancias.find((x) => x.id === discId);
  if (!d) throw new Error(`Discrepancia ${discId} no está en el expediente`);
  return conJornada(p, (j) => ({
    ...j,
    actual: {
      ...j.actual,
      registradas: j.actual.registradas.map((reg) =>
        reg.id !== discId ? reg : { ...reg, respuestas: reg.respuestas.map((r, i) => (i === idx ? f(r, d) : r)) },
      ),
    },
  }));
}

export function responderPregunta(p: Progreso, discId: string, idx: number, texto: string): Progreso {
  return conRespuesta(p, discId, idx, (r) => enviarRespuesta(r, texto));
}

export function autocorregirPregunta(asig: Asignatura, p: Progreso, discId: string, idx: number, marcadas: boolean[]): Progreso {
  return conRespuesta(p, discId, idx, (r, d) => autocorregir(r, preguntasDe(d, asig.conceptos)[idx], marcadas));
}

export function localizarPregunta(asig: Asignatura, p: Progreso, discId: string, idx: number, zona: string): Progreso {
  return conRespuesta(p, discId, idx, (r, d) => localizar(r, preguntasDe(d, asig.conceptos)[idx], zona));
}

export function puedeSellar(p: Progreso, sello: Sello): BloqueoSello | null {
  const j = p.jornadaEnCurso;
  if (!j) return 'ya-sellado';
  return bloqueoDeSello(j.actual, sello);
}

export function sellar(
  asig: Asignatura,
  p: Progreso,
  sello: Sello,
): { progreso: Progreso; resultado?: ResultadoExpediente; bloqueo?: BloqueoSello; citacion?: EventoCitacion } {
  const exp = expedienteActual(p);
  const j = p.jornadaEnCurso;
  if (!exp || !j) throw new Error('No hay expediente en curso');
  const bloqueo = bloqueoDeSello(j.actual, sello);
  if (bloqueo) return { progreso: p, bloqueo };
  const resultado = resolverVeredicto(exp, j.actual, sello, asig.config);

  // Dominio
  const dominio = { ...p.dominio };
  for (const det of resultado.detalle) {
    const d = exp.discrepancias.find((x) => x.id === det.discrepancia)!;
    const ok = sello === 'denegado' && det.registrada && det.interrogatorioOk;
    const ids = [d.concepto, ...(d.imagen ? [d.imagen] : [])];
    for (const id of ids) {
      if (!ok) {
        dominio[id] = fallo(dominio[id], j.dia);
        continue;
      }
      const requisada = j.requisadas.includes(d.concepto);
      const modo = det.modo === 'consultada' ? null : det.modo === 'memoria' || (det.modo === 'elemento' && requisada) ? 'memoria' : 'reglamento';
      if (modo) dominio[id] = acierto(dominio[id], modo, j.dia);
      else dominio[id] = { ...ver(dominio[id]), ultimoDia: j.dia };
    }
    if (exp.guiado) dominio[d.concepto] = { ...dominio[d.concepto], guiado: true };
  }

  let citacion: EventoCitacion | undefined;
  if (resultado.tipo === 'citacion') citacion = nuevaCitacion(asig, j, exp.uid, resultado.mensaje);

  return {
    progreso: {
      ...p,
      dominio,
      jornadaEnCurso: {
        ...j,
        citaciones: citacion ? [...j.citaciones, citacion] : j.citaciones,
        resultados: [...j.resultados, resultado],
        actual: { ...j.actual, sello },
      },
    },
    resultado,
    citacion,
  };
}

export function siguienteExpediente(p: Progreso): Progreso {
  return conJornada(p, (j) => {
    if (!j.actual.sello) return j;
    const indice = j.indice + 1;
    return { ...j, indice, actual: actualVacio(), terminada: indice >= j.expedientes.length };
  });
}

export function informeDeJornada(asig: Asignatura, j: EstadoJornada): InformeJornada {
  const sueldoBruto = j.resultados.reduce((s, r) => s + r.pago, 0);
  const multas = j.citaciones.reduce((s, c) => s + c.multa, 0);
  const fallados = j.resultados.filter((r) => r.fallado).length;
  const conceptosFallados: string[] = [];
  for (const r of j.resultados) {
    for (const d of r.detalle) {
      const ok = r.sello === 'denegado' && d.registrada && d.interrogatorioOk;
      if (!ok && !conceptosFallados.includes(d.concepto)) conceptosFallados.push(d.concepto);
    }
  }
  const total = j.expedientes.length;
  return {
    jornada: j.jornada,
    dia: j.dia,
    recuperacion: j.recuperacion,
    fecha: new Date().toISOString(),
    expedientes: total,
    fallados,
    sueldoBruto,
    multas,
    consultas: j.gastoConsultas,
    sueldoNeto: sueldoBruto - multas - j.gastoConsultas,
    citaciones: j.citaciones,
    conceptosFallados,
    necesitaRecuperacion: total > 0 && fallados > total * asig.config.umbralRecuperacion,
  };
}

export function cerrarJornada(asig: Asignatura, p: Progreso): { progreso: Progreso; informe: InformeJornada } {
  const j = p.jornadaEnCurso;
  if (!j) throw new Error('No hay jornada en curso');
  const informe = informeDeJornada(asig, j);
  const ultima = Math.max(...asig.jornadas.map((x) => x.numero));
  let { jornadaMax, recuperacionPendiente } = p;
  if (informe.necesitaRecuperacion) {
    recuperacionPendiente = j.jornada;
  } else {
    if (recuperacionPendiente === j.jornada) recuperacionPendiente = null;
    jornadaMax = Math.max(jornadaMax, Math.min(ultima, j.jornada + 1));
  }
  return {
    progreso: {
      ...p,
      dia: p.dia + 1,
      jornadaMax,
      recuperacionPendiente,
      historial: [...p.historial, informe],
      sueldoTotal: p.sueldoTotal + informe.sueldoNeto,
      jornadaEnCurso: null,
    },
    informe,
  };
}

/** Abandonar la jornada en curso sin informe (no avanza el día). */
export function abandonarJornada(p: Progreso): Progreso {
  return { ...p, jornadaEnCurso: null };
}
