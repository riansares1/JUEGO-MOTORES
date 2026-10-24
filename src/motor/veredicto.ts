// Veredicto y consecuencias.
//
// | Expediente     | Sello      | Situación                                           | Resultado        |
// |----------------|------------|-----------------------------------------------------|------------------|
// | sin errores    | APROBADO   | —                                                   | sueldo completo  |
// | sin errores    | DENEGADO   | imposible: sello bloqueado sin discrepancias        | —                |
// | con errores    | APROBADO   | —                                                   | citación, 0      |
// | con errores    | DENEGADO   | todas registradas e interrogatorio correcto         | sueldo completo  |
// | con errores    | DENEGADO   | falta alguna discrepancia o falla el interrogatorio | medio sueldo     |
import { interrogatorioCorrecto, interrogatorioTerminado } from './interrogatorio';
import type { ConfigJuego, EstadoExpedienteActual, ExpedienteInstancia, ResultadoExpediente, Sello } from './tipos';

export type BloqueoSello = 'sin-discrepancias' | 'interrogatorio-pendiente' | 'ya-sellado';

export function bloqueoDeSello(actual: EstadoExpedienteActual, sello: Sello): BloqueoSello | null {
  if (actual.sello) return 'ya-sellado';
  if (actual.registradas.some((r) => !interrogatorioTerminado(r))) return 'interrogatorio-pendiente';
  if (sello === 'denegado' && actual.registradas.length === 0) return 'sin-discrepancias';
  return null;
}

export function resolverVeredicto(
  exp: ExpedienteInstancia,
  actual: EstadoExpedienteActual,
  sello: Sello,
  config: ConfigJuego,
): ResultadoExpediente {
  const detalle = exp.discrepancias.map((d) => {
    const reg = actual.registradas.find((r) => r.id === d.id);
    return {
      discrepancia: d.id,
      concepto: d.concepto,
      registrada: !!reg,
      interrogatorioOk: !!reg && interrogatorioCorrecto(reg),
      modo: reg?.modo,
    };
  });
  const base = { uid: exp.uid, plantilla: exp.plantilla, sello, detalle, infundadas: actual.infundadas, consultas: actual.consultadas.length };
  const conErrores = exp.discrepancias.length > 0;

  if (!conErrores) {
    return { ...base, tipo: 'completo', pago: config.sueldoExpediente, fallado: false, mensaje: 'Expediente en regla aprobado correctamente.' };
  }
  if (sello === 'aprobado') {
    return {
      ...base,
      tipo: 'citacion',
      pago: 0,
      fallado: true,
      mensaje: 'Has aprobado un expediente con discrepancias. Citación y sin sueldo.',
    };
  }
  const todas = detalle.every((x) => x.registrada);
  const ok = detalle.every((x) => x.interrogatorioOk);
  if (todas && ok) {
    return { ...base, tipo: 'completo', pago: config.sueldoExpediente, fallado: false, mensaje: 'Denegación bien fundamentada. Sueldo completo.' };
  }
  return {
    ...base,
    tipo: 'medio',
    pago: config.medioSueldo,
    fallado: true,
    mensaje: todas
      ? 'Denegación correcta, pero el interrogatorio no fue completo. Medio sueldo.'
      : 'Denegación correcta, pero quedaron discrepancias sin registrar. Medio sueldo.',
  };
}
