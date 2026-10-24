import { describe, expect, it } from 'vitest';
import { acierto, fallo, ver } from '../dominio';
import { estaRequisada } from '../requisas';

describe('dominio', () => {
  it('nuevo → visto al leer el boletín', () => {
    expect(ver(undefined).estado).toBe('visto');
  });
  it('acierto con Reglamento', () => {
    const r = acierto(ver(undefined), 'reglamento', 1);
    expect(r.estado).toBe('reglamento');
    expect(r.aplicadoEnDia).toBe(1);
  });
  it('de memoria en dos días distintos → dominado', () => {
    let r = acierto(undefined, 'reglamento', 1);
    r = acierto(r, 'memoria', 2);
    expect(r.estado).toBe('memoria');
    r = acierto(r, 'memoria', 2);
    expect(r.estado).toBe('memoria');
    r = acierto(r, 'memoria', 3);
    expect(r.estado).toBe('dominado');
  });
  it('acierto con Reglamento no baja un estado alto', () => {
    let r = acierto(undefined, 'memoria', 1);
    r = acierto(r, 'reglamento', 2);
    expect(r.estado).toBe('memoria');
  });
  it('un fallo baja un estado y nunca por debajo de visto', () => {
    let r = acierto(undefined, 'memoria', 1);
    r = acierto(r, 'memoria', 2);
    expect(r.estado).toBe('dominado');
    r = fallo(r, 3);
    expect(r.estado).toBe('memoria');
    expect(r.diasMemoria).toHaveLength(1);
    r = fallo(r, 3);
    expect(r.estado).toBe('reglamento');
    r = fallo(r, 3);
    expect(r.estado).toBe('visto');
    expect(r.aplicadoEnDia).toBeUndefined();
    r = fallo(r, 3);
    expect(r.estado).toBe('visto');
    expect(r.fallado).toBe(true);
  });
  it('tras volver a memoria hace falta otro día distinto para dominar', () => {
    let r = acierto(undefined, 'memoria', 1);
    r = acierto(r, 'memoria', 2);
    r = fallo(r, 3); // memoria, conserva día 2
    r = acierto(r, 'memoria', 4);
    expect(r.estado).toBe('dominado');
  });
});

describe('requisas', () => {
  it('requisada desde el día siguiente al primer acierto', () => {
    const r = acierto(undefined, 'reglamento', 2);
    expect(estaRequisada(r, 2)).toBe(false);
    expect(estaRequisada(r, 3)).toBe(true);
  });
  it('si un fallo la devuelve a visto, deja de estar requisada', () => {
    const r = fallo(acierto(undefined, 'reglamento', 1), 2);
    expect(estaRequisada(r, 3)).toBe(false);
  });
  it('sin aciertos no hay requisa', () => {
    expect(estaRequisada(ver(undefined), 5)).toBe(false);
  });
});
