import { describe, expect, it } from 'vitest';
import { crearAzar } from '../azar';
import { preguntasDe } from '../interrogatorio';
import {
  autocorregirPregunta,
  cerrarJornada,
  citarPorTexto,
  consultarRegla,
  expedienteActual,
  iniciarJornada,
  leerBoletin,
  localizarPregunta,
  presentarPareja,
  progresoInicial,
  puedeSellar,
  responderPregunta,
  sellar,
  siguienteExpediente,
  siguienteJornada,
} from '../partida';
import { exportarProgreso, importarProgreso } from '../progreso';
import { numeroLimpios, seleccionarExpedientes } from '../seleccion';
import type { Progreso } from '../tipos';
import { asignatura as A } from './fixture';

type Estrategia = 'perfecto' | 'aprobar-todo' | 'interrogatorio-mal' | 'memoria' | 'consultar';

function resolverInterrogatorio(p: Progreso, bien: boolean): Progreso {
  const exp = expedienteActual(p)!;
  for (const reg of p.jornadaEnCurso!.actual.registradas) {
    const d = exp.discrepancias.find((x) => x.id === reg.id)!;
    preguntasDe(d, A.conceptos).forEach((q, i) => {
      if (q.tipo === 'localizar') {
        p = localizarPregunta(A, p, d.id, i, bien ? q.zonaCorrecta! : 'otra');
      } else {
        p = responderPregunta(p, d.id, i, 'mi respuesta');
        p = autocorregirPregunta(A, p, d.id, i, q.ideasClave.map((_, k) => bien || k > 0));
      }
    });
  }
  return p;
}

function jugarExpediente(p: Progreso, estrategia: Estrategia): Progreso {
  const exp = expedienteActual(p)!;
  const d = exp.discrepancias[0];
  if (!d || estrategia === 'aprobar-todo') return siguienteExpediente(sellar(A, p, 'aprobado').progreso);
  const reglaProb = d.pruebas.find((x) => x.tipo === 'regla');
  const prueba = reglaProb ?? d.pruebas[0];
  if (prueba.tipo === 'regla' && estrategia === 'memoria' && p.jornadaEnCurso!.requisadas.includes(prueba.concepto)) {
    p = citarPorTexto(A, p, d.elemento, prueba.concepto.toLowerCase()).progreso;
  } else {
    if (prueba.tipo === 'regla' && estrategia === 'consultar') p = consultarRegla(A, p, prueba.concepto);
    p = presentarPareja(A, p, d.elemento, prueba).progreso;
  }
  p = resolverInterrogatorio(p, estrategia !== 'interrogatorio-mal');
  return siguienteExpediente(sellar(A, p, 'denegado').progreso);
}

function jugarJornada(p: Progreso, numero: number, estrategia: Estrategia, semilla = 7) {
  p = iniciarJornada(A, p, numero, semilla);
  p = leerBoletin(A, p);
  while (!p.jornadaEnCurso!.terminada) p = jugarExpediente(p, estrategia);
  return cerrarJornada(A, p);
}

describe('selección de expedientes', () => {
  it('número de limpios entre 25 % y 30 %', () => {
    expect(numeroLimpios(8, 0.25, 0.3)).toBe(2);
    expect(numeroLimpios(10, 0.25, 0.3)).toBe(3);
    expect(numeroLimpios(11, 0.25, 0.3)).toBe(3);
    expect(numeroLimpios(12, 0.25, 0.3)).toBe(3);
  });
  it('genera la jornada con limpios, guiados al principio y sin rayos X si no tocan', () => {
    const p = leerBoletin(A, iniciarJornada(A, progresoInicial(A), 1, 3));
    const exps = p.jornadaEnCurso!.expedientes;
    expect(exps).toHaveLength(8);
    expect(exps.filter((e) => e.discrepancias.length === 0)).toHaveLength(2);
    expect(exps[0].guiado).toBe(true);
    expect(exps[0].discrepancias).toHaveLength(1);
    expect(exps.every((e) => e.discrepancias.length <= 1)).toBe(true);
    expect(exps.some((e) => e.discrepancias.some((d) => d.id === 'rx-mal'))).toBe(false);
    expect(exps.every((e) => e.rayosX === undefined)).toBe(true);
    // solo conceptos de la jornada 1
    expect(exps.flatMap((e) => e.discrepancias.map((d) => d.concepto)).every((c) => ['T1-01', 'T1-02', 'T1-05'].includes(c))).toBe(true);
  });
  it('un concepto se guía solo una vez por jornada', () => {
    const p = iniciarJornada(A, progresoInicial(A), 1, 11);
    const guiados = p.jornadaEnCurso!.expedientes.filter((e) => e.guiado).map((e) => e.discrepancias[0].concepto);
    expect(new Set(guiados).size).toBe(guiados.length);
  });
  it('prioriza los conceptos fallados', () => {
    let p = progresoInicial(A);
    p = { ...p, jornadaMax: 2, dominio: { 'T1-01': { estado: 'visto', diasMemoria: [], aciertos: 0, fallos: 1, fallado: true } } };
    const exps = seleccionarExpedientes(A, p, A.jornadas[1], { recuperacion: false, dia: 2, azar: crearAzar(1) });
    const conceptos = exps.flatMap((e) => e.discrepancias.map((d) => d.concepto));
    expect(conceptos).toContain('T1-01');
    expect(conceptos).toContain('T1-03');
    expect(conceptos).toContain('T1-04');
  });
  it('con rayos X se instancian el escáner y sus discrepancias', () => {
    let p = progresoInicial(A);
    p = { ...p, jornadaMax: 2 };
    const exps = seleccionarExpedientes(A, p, A.jornadas[1], { recuperacion: false, dia: 2, azar: crearAzar(2) });
    expect(exps.filter((e) => e.plantilla.startsWith('p') && ['p1', 'p2', 'p3'].includes(e.plantilla)).every((e) => !!e.rayosX)).toBe(true);
  });
});

describe('veredicto y consecuencias', () => {
  it('DENEGADO bloqueado sin discrepancias registradas', () => {
    const p = leerBoletin(A, iniciarJornada(A, progresoInicial(A), 1, 3));
    expect(puedeSellar(p, 'denegado')).toBe('sin-discrepancias');
    expect(sellar(A, p, 'denegado').bloqueo).toBe('sin-discrepancias');
  });
  it('interrogatorio pendiente bloquea los sellos', () => {
    let p = leerBoletin(A, iniciarJornada(A, progresoInicial(A), 1, 3));
    const d = expedienteActual(p)!.discrepancias[0];
    p = presentarPareja(A, p, d.elemento, d.pruebas[0]).progreso;
    expect(puedeSellar(p, 'denegado')).toBe('interrogatorio-pendiente');
    expect(puedeSellar(p, 'aprobado')).toBe('interrogatorio-pendiente');
  });
  it('sueldo completo, medio sueldo y citación', () => {
    let p = leerBoletin(A, iniciarJornada(A, progresoInicial(A), 1, 3));
    // 1: perfecto
    const d = expedienteActual(p)!.discrepancias[0];
    p = presentarPareja(A, p, d.elemento, d.pruebas[0]).progreso;
    p = resolverInterrogatorio(p, true);
    let r = sellar(A, p, 'denegado');
    expect(r.resultado!.tipo).toBe('completo');
    expect(r.resultado!.pago).toBe(10);
    p = siguienteExpediente(r.progreso);
    // 2: interrogatorio mal → medio
    while (expedienteActual(p)!.discrepancias.length === 0) p = siguienteExpediente(sellar(A, p, 'aprobado').progreso);
    const d2 = expedienteActual(p)!.discrepancias[0];
    p = presentarPareja(A, p, d2.elemento, d2.pruebas[0]).progreso;
    p = resolverInterrogatorio(p, false);
    r = sellar(A, p, 'denegado');
    expect(r.resultado!.tipo).toBe('medio');
    expect(r.resultado!.pago).toBe(5);
    expect(r.resultado!.fallado).toBe(true);
    p = siguienteExpediente(r.progreso);
    // 3: aprobar con errores → citación
    while (expedienteActual(p)!.discrepancias.length === 0) p = siguienteExpediente(sellar(A, p, 'aprobado').progreso);
    r = sellar(A, p, 'aprobado');
    expect(r.resultado!.tipo).toBe('citacion');
    expect(r.resultado!.pago).toBe(0);
    expect(r.citacion).toBeDefined();
  });
  it('expediente limpio aprobado → sueldo completo', () => {
    let p = leerBoletin(A, iniciarJornada(A, progresoInicial(A), 1, 3));
    while (expedienteActual(p)!.discrepancias.length !== 0) p = jugarExpediente(p, 'perfecto');
    const r = sellar(A, p, 'aprobado');
    expect(r.resultado!.tipo).toBe('completo');
  });
});

describe('citaciones', () => {
  it('las dos primeras son avisos y desde la tercera hay multa', () => {
    let p = leerBoletin(A, iniciarJornada(A, progresoInicial(A), 1, 3));
    const multas: number[] = [];
    for (let i = 0; i < 4; i++) {
      const r = presentarPareja(A, p, 'f:inexistente', { tipo: 'regla', concepto: 'T1-02' });
      p = r.progreso;
      multas.push(r.citacion!.multa);
    }
    expect(multas).toEqual([0, 0, 5, 5]);
    expect(p.jornadaEnCurso!.actual.infundadas).toBe(4);
  });
  it('las citaciones se reinician cada jornada', () => {
    const { progreso, informe } = jugarJornada(progresoInicial(A), 1, 'aprobar-todo');
    expect(informe.citaciones.length).toBeGreaterThan(2);
    expect(informe.multas).toBe((informe.citaciones.length - 2) * 5);
    const p2 = iniciarJornada(A, progreso, 1, 1);
    expect(p2.jornadaEnCurso!.citaciones).toHaveLength(0);
  });
});

describe('requisas en partida', () => {
  it('una regla aplicada bien queda requisada al día siguiente', () => {
    const { progreso } = jugarJornada(progresoInicial(A), 1, 'perfecto');
    const p = iniciarJornada(A, progreso, 2, 5);
    const aplicados = Object.entries(progreso.dominio).filter(([id, r]) => id.startsWith('T') && r.estado === 'reglamento').map(([id]) => id);
    expect(aplicados.length).toBeGreaterThan(0);
    for (const id of aplicados) expect(p.jornadaEnCurso!.requisadas).toContain(id);
  });
  it('citar de memoria una requisada → aplicado de memoria; consultando no cuenta', () => {
    let { progreso } = jugarJornada(progresoInicial(A), 1, 'perfecto');
    const antes = { ...progreso.dominio };
    const memoria = jugarJornada(progreso, 1, 'memoria', 9).progreso;
    const subieron = Object.keys(antes).filter((id) => antes[id].estado === 'reglamento' && memoria.dominio[id].estado === 'memoria');
    expect(subieron.length).toBeGreaterThan(0);
    const consultando = jugarJornada(progreso, 1, 'consultar', 9);
    for (const id of Object.keys(antes)) {
      if (antes[id].estado === 'reglamento') expect(consultando.progreso.dominio[id].estado).toBe('reglamento');
    }
    expect(consultando.informe.consultas).toBeGreaterThan(0);
    progreso = consultando.progreso;
    expect(progreso.dia).toBe(3);
  });
  it('consultar una regla no requisada no cuesta nada', () => {
    let p = leerBoletin(A, iniciarJornada(A, progresoInicial(A), 1, 3));
    p = consultarRegla(A, p, 'T1-01');
    expect(p.jornadaEnCurso!.gastoConsultas).toBe(0);
  });
  it('cita escrita desconocida no penaliza', () => {
    const p = leerBoletin(A, iniciarJornada(A, progresoInicial(A), 1, 3));
    const r = citarPorTexto(A, p, 'f:enc', 'xyzzy');
    expect(r.resultado.tipo).toBe('desconocida');
    expect(r.progreso.jornadaEnCurso!.citaciones).toHaveLength(0);
  });
});

describe('dominio en partida', () => {
  it('el boletín marca como vistos conceptos e imágenes', () => {
    const p = leerBoletin(A, iniciarJornada(A, progresoInicial(A), 1, 3));
    expect(p.dominio['T1-01'].estado).toBe('visto');
    expect(p.dominio['V1-05'].estado).toBe('visto');
  });
  it('los aciertos suben y los fallos bajan', () => {
    const bien = jugarJornada(progresoInicial(A), 1, 'perfecto').progreso;
    expect(Object.values(bien.dominio).some((r) => r.estado === 'reglamento')).toBe(true);
    const mal = jugarJornada(bien, 1, 'aprobar-todo', 7).progreso;
    expect(Object.entries(mal.dominio).some(([id, r]) => bien.dominio[id].estado === 'reglamento' && r.estado === 'visto')).toBe(true);
  });
  it('el expediente de formación marca el concepto como guiado', () => {
    const { progreso } = jugarJornada(progresoInicial(A), 1, 'perfecto');
    expect(Object.values(progreso.dominio).some((r) => r.guiado)).toBe(true);
    const p = iniciarJornada(A, progreso, 1, 3);
    const guiados = p.jornadaEnCurso!.expedientes.filter((e) => e.guiado).map((e) => e.discrepancias[0].concepto);
    for (const c of guiados) expect(progreso.dominio[c]?.guiado).not.toBe(true);
  });
});

describe('recuperación', () => {
  it('fallar más de un tercio exige recuperación y bloquea la siguiente', () => {
    const { progreso, informe } = jugarJornada(progresoInicial(A), 1, 'aprobar-todo');
    expect(informe.necesitaRecuperacion).toBe(true);
    expect(progreso.recuperacionPendiente).toBe(1);
    expect(progreso.jornadaMax).toBe(1);
    expect(siguienteJornada(A, progreso)).toEqual({ numero: 1, recuperacion: true, enCurso: false });
    const rec = iniciarJornada(A, progreso, 1, 4);
    expect(rec.jornadaEnCurso!.recuperacion).toBe(true);
    expect(rec.jornadaEnCurso!.expedientes).toHaveLength(A.config.numExpedientesRecuperacion);
    // la recuperación prioriza lo fallado
    const conceptos = rec.jornadaEnCurso!.expedientes.flatMap((e) => e.discrepancias.map((d) => d.concepto));
    expect(conceptos.length).toBeGreaterThan(0);
    const superada = jugarJornada(progreso, 1, 'perfecto', 4);
    expect(superada.informe.recuperacion).toBe(true);
    expect(superada.progreso.recuperacionPendiente).toBeNull();
    expect(superada.progreso.jornadaMax).toBe(2);
  });
  it('no fallar más de un tercio desbloquea la siguiente', () => {
    const { progreso, informe } = jugarJornada(progresoInicial(A), 1, 'perfecto');
    expect(informe.fallados).toBe(0);
    expect(informe.sueldoNeto).toBe(80);
    expect(progreso.jornadaMax).toBe(2);
    expect(siguienteJornada(A, progreso).numero).toBe(2);
  });
  it('el informe lista los conceptos fallados', () => {
    const { informe } = jugarJornada(progresoInicial(A), 1, 'interrogatorio-mal');
    expect(informe.conceptosFallados.length).toBeGreaterThan(0);
    expect(informe.fallados).toBe(6);
  });
});

describe('exportar / importar', () => {
  it('ida y vuelta', () => {
    const { progreso } = jugarJornada(progresoInicial(A), 1, 'perfecto');
    const vuelta = importarProgreso(exportarProgreso(progreso), A);
    expect(vuelta).toEqual(progreso);
  });
  it('rechaza archivos de otra asignatura o dañados', () => {
    expect(() => importarProgreso('no json', A)).toThrow();
    expect(() => importarProgreso(JSON.stringify({ ...progresoInicial(A), asignatura: 'otra' }), A)).toThrow();
    expect(() => importarProgreso(JSON.stringify({ version: 1, asignatura: 'test' }), A)).toThrow();
  });
});
