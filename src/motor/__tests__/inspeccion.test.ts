import { describe, expect, it } from 'vitest';
import { aplicarParches } from '../documentos';
import { coincideElemento, evaluarPareja, modoDeRegistro } from '../inspeccion';
import type { ExpedienteInstancia } from '../tipos';
import { asignatura } from './fixture';

function instancia(plantilla: string, disc: string): ExpedienteInstancia {
  const p = asignatura.plantillas.find((x) => x.id === plantilla)!;
  const d = p.discrepancias.find((x) => x.id === disc)!;
  return {
    uid: 'x',
    plantilla,
    solicitante: '',
    motivo: '',
    documentos: aplicarParches(p.documentos, d.parches),
    rayosX: p.rayosX,
    discrepancias: [d],
    guiado: false,
  };
}

describe('aplicarParches', () => {
  it('planta el error sin tocar la plantilla original', () => {
    const exp = instancia('p1', 'enc-mal');
    const doc = exp.documentos[0];
    expect(doc.tipo === 'ficha' && doc.campos[1].valor).toBe('Por compresión');
    const orig = asignatura.plantillas[0].documentos[0];
    expect(orig.tipo === 'ficha' && orig.campos[1].valor).toBe('Por chispa');
  });
  it('lanza si el parche no encaja', () => {
    expect(() => aplicarParches(asignatura.plantillas[0].documentos, [{ ref: 'f:nada', texto: 'x' }])).toThrow();
  });
});

describe('evaluarPareja', () => {
  it('pareja correcta con regla → registrada', () => {
    const exp = instancia('p1', 'enc-mal');
    const r = evaluarPareja(exp, 'f:enc', { tipo: 'regla', concepto: 'T1-01' }, []);
    expect(r.tipo).toBe('registrada');
  });
  it('regla equivocada → infundada', () => {
    const exp = instancia('p1', 'enc-mal');
    const r = evaluarPareja(exp, 'f:enc', { tipo: 'regla', concepto: 'T1-02' }, []);
    expect(r.tipo).toBe('infundada');
  });
  it('elemento sin error → infundada', () => {
    const exp = instancia('p1', 'enc-mal');
    expect(evaluarPareja(exp, 'f:comb', { tipo: 'regla', concepto: 'T1-01' }, []).tipo).toBe('infundada');
  });
  it('elemento contra elemento en cualquier orden', () => {
    const exp = instancia('p1', 'enc-mal');
    expect(evaluarPareja(exp, 'f:enc', { tipo: 'elemento', ref: 'f:comb' }, []).tipo).toBe('registrada');
    expect(evaluarPareja(exp, 'f:comb', { tipo: 'elemento', ref: 'f:enc' }, []).tipo).toBe('registrada');
  });
  it('un elemento no es prueba contra sí mismo', () => {
    const exp = instancia('p1', 'enc-mal');
    expect(evaluarPareja(exp, 'f:enc', { tipo: 'elemento', ref: 'f:enc' }, []).tipo).toBe('infundada');
  });
  it('zona de una foto cuenta como la foto', () => {
    const exp = instancia('p1', 'foto-mal');
    expect(coincideElemento('f:foto', 'f:foto@radiador')).toBe(true);
    expect(evaluarPareja(exp, 'f:foto@radiador', { tipo: 'regla', concepto: 'T1-05' }, []).tipo).toBe('registrada');
  });
  it('zona exigida debe coincidir', () => {
    expect(coincideElemento('rx@aletas', 'rx@aletas')).toBe(true);
    expect(coincideElemento('rx@aletas', 'rx@radiador')).toBe(false);
    expect(coincideElemento('rx', 'rx@radiador')).toBe(true);
  });
  it('prueba de rayos X', () => {
    const exp = instancia('p1', 'rx-mal');
    expect(evaluarPareja(exp, 'f:comb', { tipo: 'elemento', ref: 'rx@aletas' }, []).tipo).toBe('registrada');
    expect(evaluarPareja(exp, 'rx@aletas', { tipo: 'elemento', ref: 'f:comb' }, []).tipo).toBe('registrada');
    expect(evaluarPareja(exp, 'f:comb', { tipo: 'elemento', ref: 'rx@radiador' }, []).tipo).toBe('infundada');
  });
  it('repetida si ya estaba registrada', () => {
    const exp = instancia('p1', 'enc-mal');
    const r = evaluarPareja(exp, 'f:enc', { tipo: 'regla', concepto: 'T1-01' }, [{ id: 'enc-mal', modo: 'reglamento', respuestas: [] }]);
    expect(r.tipo).toBe('repetida');
  });
  it('modo de registro', () => {
    expect(modoDeRegistro({ tipo: 'regla', concepto: 'T1-01' }, [], [])).toBe('reglamento');
    expect(modoDeRegistro({ tipo: 'regla', concepto: 'T1-01' }, ['T1-01'], [])).toBe('memoria');
    expect(modoDeRegistro({ tipo: 'regla', concepto: 'T1-01' }, ['T1-01'], ['T1-01'])).toBe('consultada');
    expect(modoDeRegistro({ tipo: 'elemento', ref: 'f:x' }, [], [])).toBe('elemento');
  });
});
