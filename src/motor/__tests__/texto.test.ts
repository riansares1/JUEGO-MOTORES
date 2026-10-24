import { describe, expect, it } from 'vitest';
import { distancia, identificarCita, normalizar, normalizarCodigo } from '../texto';

const cands = [
  { id: 'T1-14', nombres: ['Motor de encendido provocado', 'MEP'] },
  { id: 'T1-15', nombres: ['Motor de encendido por compresión', 'MEC', 'motor diésel'] },
  { id: 'T1-35', nombres: ['Refrigeración por aire y por agua'] },
];

describe('texto', () => {
  it('normaliza tildes, mayúsculas y signos', () => {
    expect(normalizar('  Refrigeración  POR   agua! ')).toBe('refrigeracion por agua');
  });
  it('distancia con transposición', () => {
    expect(distancia('motor', 'mtoor')).toBe(1);
    expect(distancia('abc', 'abc')).toBe(0);
  });
  it('normaliza códigos en varios formatos', () => {
    expect(normalizarCodigo('t1-5')).toBe('T1-05');
    expect(normalizarCodigo('T1 05')).toBe('T1-05');
    expect(normalizarCodigo('t105')).toBe('T1-05');
    expect(normalizarCodigo('T1–14')).toBe('T1-14');
    expect(normalizarCodigo('motor')).toBeNull();
  });
  it('identifica por código', () => {
    expect(identificarCita('t1-14', cands)).toBe('T1-14');
  });
  it('identifica por nombre sin tildes ni mayúsculas y con erratas', () => {
    expect(identificarCita('motor de encendido por compresion', cands)).toBe('T1-15');
    expect(identificarCita('MOTOR DE ENCENDIDO PROVOCADO', cands)).toBe('T1-14');
    expect(identificarCita('motor de encendio provocao', cands)).toBe('T1-14');
    expect(identificarCita('refrigeracion por aire y por agau', cands)).toBe('T1-35');
  });
  it('identifica alias cortos solo exactos', () => {
    expect(identificarCita('mep', cands)).toBe('T1-14');
    expect(identificarCita('Mec', cands)).toBe('T1-15');
    expect(identificarCita('mex', cands)).toBeNull();
  });
  it('no confunde reglas parecidas', () => {
    expect(identificarCita('motor de encendido por compresion', cands)).not.toBe('T1-14');
    expect(identificarCita('turbocompresor', cands)).toBeNull();
  });
});
