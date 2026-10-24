// Interrogatorio con autocorrección: el jugador escribe, envía (queda bloqueado), ve la respuesta
// modelo y marca las ideas clave que ha recogido. Acierto solo si están todas.
import type { Concepto, Discrepancia, EstadoDiscrepanciaRegistrada, Pregunta, RespuestaPregunta } from './tipos';

export function preguntasDe(d: Discrepancia, conceptos: Concepto[]): Pregunta[] {
  if (d.interrogatorio && d.interrogatorio.length) return d.interrogatorio;
  const c = conceptos.find((x) => x.id === d.concepto);
  if (!c) throw new Error(`Concepto ${d.concepto} inexistente`);
  return [{ tipo: 'explicar', enunciado: c.pregunta, respuestaModelo: c.respuestaModelo, ideasClave: c.ideasClave }];
}

export function respuestaVacia(p: Pregunta): RespuestaPregunta {
  return { texto: '', enviada: false, marcadas: p.ideasClave.map(() => false), corregida: false };
}

export function enviarRespuesta(r: RespuestaPregunta, texto: string): RespuestaPregunta {
  if (r.enviada) return r; // bloqueada
  return { ...r, texto, enviada: true };
}

export function autocorregir(r: RespuestaPregunta, p: Pregunta, marcadas: boolean[]): RespuestaPregunta {
  if (!r.enviada || r.corregida) return r;
  const m = p.ideasClave.map((_, i) => !!marcadas[i]);
  return { ...r, marcadas: m, corregida: true, acierto: m.every(Boolean) };
}

/** Pregunta de localización: se corrige sola al señalar una zona (y queda bloqueada). */
export function localizar(r: RespuestaPregunta, p: Pregunta, zona: string): RespuestaPregunta {
  if (r.corregida) return r;
  const acierto = zona === p.zonaCorrecta;
  return { ...r, zona, enviada: true, corregida: true, acierto, marcadas: p.ideasClave.map(() => acierto) };
}

export function interrogatorioTerminado(reg: EstadoDiscrepanciaRegistrada): boolean {
  return reg.respuestas.every((r) => r.corregida);
}

export function interrogatorioCorrecto(reg: EstadoDiscrepanciaRegistrada): boolean {
  return reg.respuestas.length > 0 && reg.respuestas.every((r) => r.corregida && r.acierto === true);
}
