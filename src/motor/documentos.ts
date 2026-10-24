// Referencias a elementos señalables y aplicación de parches (errores plantados).
import type { Documento, Parche, RefElemento } from './tipos';

export interface RefDescompuesta {
  doc: string;
  elem: string;
  zona?: string;
}

export function descomponerRef(ref: RefElemento): RefDescompuesta {
  const [base, zona] = ref.split('@');
  const [doc, elem = ''] = base.split(':');
  return { doc, elem, zona };
}

export function ref(doc: string, elem: string, zona?: string): RefElemento {
  return zona ? `${doc}:${elem}@${zona}` : `${doc}:${elem}`;
}

/** Ids de todos los elementos de un documento (sin zonas). */
export function elementosDe(doc: Documento): string[] {
  switch (doc.tipo) {
    case 'glosario':
      return doc.entradas.map((e) => e.id);
    case 'ficha':
      return [...doc.campos.map((c) => c.id), ...(doc.foto ? [doc.foto.id] : [])];
    case 'manifiesto':
      return doc.pasos.map((p) => p.id);
    case 'informe':
      return doc.frases.map((f) => f.id);
    case 'tabla':
      return doc.filas.flatMap((f) => f.celdas.map((c) => c.id));
    case 'plano':
      return ['imagen', ...doc.etiquetas.map((e) => e.id)];
  }
}

/** Texto legible de un elemento (para informes y mensajes). */
export function textoDeElemento(docs: Documento[], r: RefElemento): string {
  const { doc: idDoc, elem } = descomponerRef(r);
  const doc = docs.find((d) => d.id === idDoc);
  if (!doc) return r;
  switch (doc.tipo) {
    case 'glosario': {
      const e = doc.entradas.find((x) => x.id === elem);
      return e ? `${e.termino}: ${e.definicion}` : r;
    }
    case 'ficha': {
      const c = doc.campos.find((x) => x.id === elem);
      if (c) return `${c.etiqueta}: ${c.valor}`;
      return doc.foto?.id === elem ? 'Fotografía' : r;
    }
    case 'manifiesto':
      return doc.pasos.find((x) => x.id === elem)?.texto ?? r;
    case 'informe':
      return doc.frases.find((x) => x.id === elem)?.texto ?? r;
    case 'tabla': {
      for (const f of doc.filas) {
        const i = f.celdas.findIndex((c) => c.id === elem);
        if (i >= 0) return `${f.cabecera} · ${doc.columnas[i + 1] ?? ''}: ${f.celdas[i].valor}`;
      }
      return r;
    }
    case 'plano':
      return doc.etiquetas.find((x) => x.id === elem)?.texto ?? (elem === 'imagen' ? 'Plano' : r);
  }
}

function clonar<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T;
}

/** Devuelve copias de los documentos con los parches aplicados. Lanza si un parche no encaja. */
export function aplicarParches(documentos: Documento[], parches: Parche[]): Documento[] {
  const docs = clonar(documentos);
  for (const p of parches) {
    const { doc: idDoc, elem } = descomponerRef(p.ref);
    const doc = docs.find((d) => d.id === idDoc);
    if (!doc) throw new Error(`Parche ${p.ref}: documento inexistente`);
    let aplicado = false;
    switch (doc.tipo) {
      case 'glosario': {
        const e = doc.entradas.find((x) => x.id === elem);
        if (e) {
          if (p.texto !== undefined) e.definicion = p.texto;
          if (p.termino !== undefined) e.termino = p.termino;
          aplicado = true;
        }
        break;
      }
      case 'ficha': {
        const c = doc.campos.find((x) => x.id === elem);
        if (c && p.texto !== undefined) {
          c.valor = p.texto;
          aplicado = true;
        } else if (doc.foto && doc.foto.id === elem) {
          if (p.zona !== undefined) doc.foto.recorte = p.zona;
          if (p.imagen !== undefined) doc.foto.imagen = p.imagen;
          if (p.texto !== undefined) doc.foto.pie = p.texto;
          aplicado = true;
        }
        break;
      }
      case 'manifiesto': {
        const x = doc.pasos.find((s) => s.id === elem);
        if (x && p.texto !== undefined) {
          x.texto = p.texto;
          aplicado = true;
        }
        break;
      }
      case 'informe': {
        const x = doc.frases.find((s) => s.id === elem);
        if (x && p.texto !== undefined) {
          x.texto = p.texto;
          aplicado = true;
        }
        break;
      }
      case 'tabla': {
        for (const f of doc.filas) {
          const c = f.celdas.find((x) => x.id === elem);
          if (c && p.texto !== undefined) {
            c.valor = p.texto;
            aplicado = true;
          }
        }
        break;
      }
      case 'plano': {
        const e = doc.etiquetas.find((x) => x.id === elem);
        if (e) {
          if (p.texto !== undefined) e.texto = p.texto;
          if (p.zona !== undefined) e.zona = p.zona;
          aplicado = true;
        } else if (elem === 'imagen' && p.imagen !== undefined) {
          doc.imagen = p.imagen;
          aplicado = true;
        }
        break;
      }
    }
    if (!aplicado) throw new Error(`Parche ${p.ref}: elemento inexistente o parche incompatible`);
  }
  return docs;
}

/** ¿Existe el elemento (y la zona, si se indica) en los documentos o en el escáner? */
export function existeRef(
  documentos: Documento[],
  r: RefElemento,
  zonasDeImagen: (imagen: string) => string[],
  rayosX?: { imagen: string },
): boolean {
  const { doc: idDoc, elem, zona } = descomponerRef(r);
  if (idDoc === 'rx') {
    // "rx@zona" → descomponerRef da doc="rx", elem=""; aceptamos también "rx:imagen@zona"
    return !!rayosX && (!zona || zonasDeImagen(rayosX.imagen).includes(zona));
  }
  const doc = documentos.find((d) => d.id === idDoc);
  if (!doc) return false;
  if (!elementosDe(doc).includes(elem)) return false;
  if (!zona) return true;
  if (doc.tipo === 'ficha' && doc.foto?.id === elem) return zonasDeImagen(doc.foto.imagen).includes(zona);
  if (doc.tipo === 'plano' && elem === 'imagen') return zonasDeImagen(doc.imagen).includes(zona);
  return false;
}
