// Pequeños constructores para escribir el contenido de forma compacta.
// Son ayudas de datos: el motor no depende de ellos.
import type {
  DocFicha,
  DocGlosario,
  DocInforme,
  DocManifiesto,
  DocPlano,
  DocTabla,
  Discrepancia,
  Parche,
  Pregunta,
  Prueba,
} from '../motor/tipos';

export const glosario = (id: string, titulo: string, entradas: [string, string, string][], extra: Partial<DocGlosario> = {}): DocGlosario => ({
  id,
  tipo: 'glosario',
  titulo,
  emisor: 'Ministerio de Industria · Registro de Motores',
  entradas: entradas.map(([eid, termino, definicion]) => ({ id: eid, termino, definicion })),
  ...extra,
});

export const ficha = (
  id: string,
  titulo: string,
  campos: [string, string, string][],
  extra: Partial<DocFicha> = {},
): DocFicha => ({
  id,
  tipo: 'ficha',
  titulo,
  emisor: 'Ficha de homologación',
  campos: campos.map(([cid, etiqueta, valor]) => ({ id: cid, etiqueta, valor })),
  ...extra,
});

export const manifiesto = (id: string, titulo: string, pasos: [string, string][], extra: Partial<DocManifiesto> = {}): DocManifiesto => ({
  id,
  tipo: 'manifiesto',
  titulo,
  emisor: 'Manifiesto de secuencia',
  pasos: pasos.map(([pid, texto]) => ({ id: pid, texto })),
  ...extra,
});

export const informe = (id: string, titulo: string, frases: (string | [string, string])[], extra: Partial<DocInforme> = {}): DocInforme => {
  // Las frases se dan como [id, texto]; un string suelto "¶" marca nuevo párrafo para la frase siguiente.
  const out: DocInforme['frases'] = [];
  let parrafo = false;
  for (const f of frases) {
    if (f === '¶') {
      parrafo = true;
      continue;
    }
    if (typeof f === 'string') throw new Error('Frase sin id');
    out.push({ id: f[0], texto: f[1], ...(parrafo ? { parrafo: true } : {}) });
    parrafo = false;
  }
  return { id, tipo: 'informe', titulo, emisor: 'Informe técnico', frases: out, ...extra };
};

export const tabla = (
  id: string,
  titulo: string,
  columnas: string[],
  filas: [string, string, ...string[]][],
  extra: Partial<DocTabla> = {},
): DocTabla => ({
  id,
  tipo: 'tabla',
  titulo,
  emisor: 'Tabla comparativa',
  columnas,
  // fila: [idFila, cabecera, valor1, valor2…]; las celdas reciben id `${idFila}${n}` (n desde 1)
  filas: filas.map(([fid, cabecera, ...valores]) => ({
    id: fid,
    cabecera,
    celdas: valores.map((valor, i) => ({ id: `${fid}${i + 1}`, valor })),
  })),
  ...extra,
});

export const plano = (id: string, titulo: string, imagen: string, etiquetas: [string, string, string][], extra: Partial<DocPlano> = {}): DocPlano => ({
  id,
  tipo: 'plano',
  titulo,
  emisor: 'Plano técnico',
  imagen,
  etiquetas: etiquetas.map(([eid, zona, texto]) => ({ id: eid, zona, texto })),
  ...extra,
});

export const regla = (concepto: string): Prueba => ({ tipo: 'regla', concepto });
export const elem = (ref: string): Prueba => ({ tipo: 'elemento', ref });

export const corregir = (enunciado: string, respuestaModelo: string, ideasClave: string[]): Pregunta => ({
  tipo: 'corregir',
  enunciado,
  respuestaModelo,
  ideasClave,
});
export const explicar = (enunciado: string, respuestaModelo: string, ideasClave: string[]): Pregunta => ({
  tipo: 'explicar',
  enunciado,
  respuestaModelo,
  ideasClave,
});
export const nombrar = (enunciado: string, respuestaModelo: string, ideasClave: string[]): Pregunta => ({
  tipo: 'nombrar',
  enunciado,
  respuestaModelo,
  ideasClave,
});
export const localizar = (enunciado: string, imagen: string, zonaCorrecta: string, respuestaModelo: string): Pregunta => ({
  tipo: 'localizar',
  enunciado,
  respuestaModelo,
  ideasClave: [],
  imagen,
  zonaCorrecta,
});

interface OpcDisc {
  id: string;
  concepto: string;
  /** Elemento alterado. */
  ref: string;
  /** Nuevo texto (atajo para un único parche de texto). */
  texto?: string;
  parches?: Parche[];
  pruebas?: Prueba[];
  explicacion: string;
  guia?: string;
  imagen?: string;
  preguntas?: Pregunta[];
}

export const disc = (o: OpcDisc): Discrepancia => ({
  id: o.id,
  concepto: o.concepto,
  ...(o.imagen ? { imagen: o.imagen } : {}),
  parches: o.parches ?? [{ ref: o.ref, texto: o.texto }],
  elemento: o.ref,
  pruebas: o.pruebas ?? [regla(o.concepto)],
  explicacion: o.explicacion,
  ...(o.guia ? { guia: o.guia } : {}),
  ...(o.preguntas ? { interrogatorio: o.preguntas } : {}),
});
