// Validación automática del contenido: referencias, parches, zonas, preguntas y jugabilidad.
import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  aplicarParches,
  conceptosHastaJornada,
  crearAzar,
  descomponerRef,
  elementosDe,
  evaluarPareja,
  existeRef,
  preguntasDe,
  progresoInicial,
  seleccionarExpedientes,
  textoDeElemento,
  type ExpedienteInstancia,
} from '../../motor';
import { asignatura as A } from '../asignatura';

const zonasDe = (id: string) => A.imagenes.find((i) => i.id === id)?.zonas.map((z) => z.id) ?? [];
const jornadaDeConcepto = (id: string) => A.jornadas.find((j) => j.conceptosNuevos.includes(id))?.numero ?? 99;

describe('conceptos', () => {
  it('ids únicos y campos completos', () => {
    const ids = A.conceptos.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of A.conceptos) {
      expect(c.id).toMatch(/^T\d-\d{2}$/);
      expect(c.regla.length, c.id).toBeGreaterThan(20);
      expect(c.boletin.length, c.id).toBeGreaterThan(20);
      expect(c.respuestaModelo.length, c.id).toBeGreaterThan(10);
      expect(c.ideasClave.length, c.id).toBeGreaterThanOrEqual(2);
      expect(c.ideasClave.length, c.id).toBeLessThanOrEqual(3);
      if (c.imagen) expect(zonasDe(c.imagen.id).length, `${c.id} imagen ${c.imagen.id}`).toBeGreaterThan(0);
    }
  });
  it('el Tema 1 tiene los 38 conceptos repartidos en las jornadas 1–3', () => {
    const t1 = A.conceptos.filter((c) => c.tema === 1).map((c) => c.id);
    expect(t1).toHaveLength(38);
    expect(A.jornadas.flatMap((j) => j.conceptosNuevos).filter((id) => id.startsWith('T1'))).toEqual(t1);
  });
});

describe('imágenes', () => {
  it('existen, con zonas válidas', () => {
    for (const im of A.imagenes) {
      expect(existsSync(`public/${im.src}`), im.src).toBe(true);
      const ids = im.zonas.map((z) => z.id);
      expect(new Set(ids).size, im.id).toBe(ids.length);
      expect(ids.length, im.id).toBeGreaterThan(0);
      for (const z of im.zonas) {
        expect(z.x >= 0 && z.y >= 0 && z.x + z.w <= 100.01 && z.y + z.h <= 100.01, `${im.id}/${z.id}`).toBe(true);
      }
      for (const c of im.conceptos) expect(A.conceptos.some((x) => x.id === c), `${im.id}→${c}`).toBe(true);
    }
  });
  it('cada zona tiene algún punto donde es la zona más pequeña (se puede señalar)', () => {
    for (const im of A.imagenes) {
      for (const z of im.zonas) {
        let alcanzable = false;
        for (let a = 0.05; a < 1 && !alcanzable; a += 0.05) {
          for (let c = 0.05; c < 1 && !alcanzable; c += 0.05) {
            const x = z.x + z.w * a;
            const y = z.y + z.h * c;
            const gana = im.zonas.filter((q) => x >= q.x && x <= q.x + q.w && y >= q.y && y <= q.y + q.h).sort((p, q) => p.w * p.h - q.w * q.h)[0];
            if (gana?.id === z.id) alcanzable = true;
          }
        }
        expect(alcanzable, `${im.id}/${z.id}`).toBe(true);
      }
    }
  });
  it('las imágenes V1-01 … V1-10 están en el inventario visual', () => {
    const v = A.imagenes.filter((i) => i.seguimiento).map((i) => i.id);
    expect(v).toEqual(['V1-01', 'V1-02', 'V1-03', 'V1-04', 'V1-05', 'V1-06', 'V1-07', 'V1-08', 'V1-09', 'V1-10']);
  });
});

describe('plantillas', () => {
  const ids = A.plantillas.map((p) => p.id);
  it('ids únicos', () => expect(new Set(ids).size).toBe(ids.length));

  for (const p of A.plantillas) {
    describe(p.id, () => {
      it('documentos y elementos bien formados', () => {
        for (const c of p.conceptos) expect(A.conceptos.some((x) => x.id === c), c).toBe(true);
        const docIds = p.documentos.map((d) => d.id);
        expect(new Set(docIds).size).toBe(docIds.length);
        for (const d of p.documentos) {
          const els = elementosDe(d);
          expect(new Set(els).size, d.id).toBe(els.length);
          if (d.tipo === 'plano') {
            expect(zonasDe(d.imagen).length, d.imagen).toBeGreaterThan(0);
            for (const e of d.etiquetas) expect(zonasDe(d.imagen), e.zona).toContain(e.zona);
          }
          if (d.tipo === 'ficha' && d.foto) {
            expect(zonasDe(d.foto.imagen).length).toBeGreaterThan(0);
            if (d.foto.recorte) expect(zonasDe(d.foto.imagen)).toContain(d.foto.recorte);
          }
          if (d.tipo === 'tabla') for (const f of d.filas) expect(f.celdas.length + 1).toBe(d.columnas.length);
        }
        if (p.rayosX) expect(zonasDe(p.rayosX.imagen).length).toBeGreaterThan(0);
        const jMax = Math.max(...p.conceptos.map(jornadaDeConcepto));
        expect(jMax, 'conceptos de jornada definida').toBeLessThan(99);
      });

      for (const d of p.discrepancias) {
        it(`discrepancia ${d.id}`, () => {
          expect(p.conceptos, 'concepto en la plantilla').toContain(d.concepto);
          const docs = aplicarParches(p.documentos, d.parches);
          // el parche cambia algo
          for (const pa of d.parches) {
            expect(textoDeElemento(docs, pa.ref) !== textoDeElemento(p.documentos, pa.ref) || pa.zona !== undefined || pa.imagen !== undefined, pa.ref).toBe(true);
          }
          expect(existeRef(docs, d.elemento, zonasDe, p.rayosX), d.elemento).toBe(true);
          const jPlantilla = Math.max(...p.conceptos.map(jornadaDeConcepto));
          for (const pr of d.pruebas) {
            if (pr.tipo === 'regla') {
              expect(A.conceptos.some((c) => c.id === pr.concepto), pr.concepto).toBe(true);
              expect(jornadaDeConcepto(pr.concepto), `${pr.concepto} conocido`).toBeLessThanOrEqual(jPlantilla);
            } else {
              expect(existeRef(docs, pr.ref, zonasDe, p.rayosX), pr.ref).toBe(true);
              if (descomponerRef(pr.ref).doc === 'rx') expect(p.rayosX).toBeDefined();
            }
          }
          if (d.imagen) expect(A.imagenes.find((i) => i.id === d.imagen)?.seguimiento, d.imagen).toBe(true);
          for (const q of preguntasDe(d, A.conceptos)) {
            expect(q.enunciado.length).toBeGreaterThan(5);
            expect(q.respuestaModelo.length).toBeGreaterThan(3);
            if (q.tipo === 'localizar') {
              expect(zonasDe(q.imagen!), `${q.imagen}/${q.zonaCorrecta}`).toContain(q.zonaCorrecta);
            } else {
              expect(q.ideasClave.length).toBeGreaterThanOrEqual(1);
              expect(q.ideasClave.length).toBeLessThanOrEqual(3);
            }
          }
          // coherencia con el motor: cada prueba declarada registra la discrepancia
          const exp: ExpedienteInstancia = {
            uid: 'x', plantilla: p.id, solicitante: '', motivo: '', documentos: docs, rayosX: p.rayosX, discrepancias: [d], guiado: false,
          };
          for (const pr of d.pruebas) expect(evaluarPareja(exp, d.elemento, pr, []).tipo, JSON.stringify(pr)).toBe('registrada');
          // y una regla cualquiera que no sea prueba no la registra
          const otra = A.conceptos.find((c) => !d.pruebas.some((x) => x.tipo === 'regla' && x.concepto === c.id))!;
          expect(evaluarPareja(exp, d.elemento, { tipo: 'regla', concepto: otra.id }, []).tipo).toBe('infundada');
        });
      }
    });
  }
});

describe('cobertura y jugabilidad', () => {
  const jugables = A.jornadas.filter((j) => A.plantillas.some((p) => p.discrepancias.some((d) => j.conceptosNuevos.includes(d.concepto))));
  it('cada concepto de las jornadas jugables tiene al menos una discrepancia', () => {
    for (const j of jugables) {
      for (const c of j.conceptosNuevos) {
        const n = A.plantillas.flatMap((p) => p.discrepancias).filter((d) => d.concepto === c).length;
        expect(n, c).toBeGreaterThanOrEqual(1);
      }
    }
  });
  it('cada jornada jugable genera el número de expedientes previsto con 25–30 % limpios', () => {
    for (const j of jugables) {
      for (let s = 1; s <= 20; s++) {
        const p = { ...progresoInicial(A), jornadaMax: j.numero };
        const exps = seleccionarExpedientes(A, p, j, { recuperacion: false, dia: 1, azar: crearAzar(s) });
        expect(exps).toHaveLength(j.numExpedientes);
        const limpios = exps.filter((e) => e.discrepancias.length === 0).length;
        expect(limpios / exps.length).toBeGreaterThanOrEqual(0.25);
        expect(limpios / exps.length).toBeLessThanOrEqual(0.3);
        const conocidos = new Set(conceptosHastaJornada(A, j.numero));
        for (const e of exps) {
          expect(e.documentos.length).toBeLessThanOrEqual(j.maxDocumentos);
          expect(e.discrepancias.length).toBeLessThanOrEqual(j.maxDiscrepancias);
          for (const d of e.discrepancias) expect(conocidos.has(d.concepto)).toBe(true);
          if (!j.rayosX) expect(e.rayosX).toBeUndefined();
        }
      }
    }
  });
});
