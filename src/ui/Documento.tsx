import { Fragment, type ReactNode } from 'react';
import type { Documento, ImagenDef } from '../motor/tipos';
import { ImagenZonas } from './ImagenZonas';

export interface PropsDocumento {
  doc: Documento;
  imagenes: Map<string, ImagenDef>;
  inspeccion: boolean;
  /** Clases extra para un elemento ("seleccionado", "registrado", "guia"). */
  claseElemento: (ref: string) => string;
  onElemento: (ref: string) => void;
}

/** Cuerpo de un documento con sus elementos señalables. */
export function CuerpoDocumento({ doc, imagenes, inspeccion, claseElemento, onElemento }: PropsDocumento) {
  const r = (elem: string) => `${doc.id}:${elem}`;
  const El = ({ id, children, como = 'span', className = '' }: { id: string; children: ReactNode; como?: 'span' | 'div' | 'li' | 'td'; className?: string }) => {
    const Tag = como;
    return (
      <Tag
        className={`el ${className} ${claseElemento(r(id))}`}
        onClick={(e) => {
          e.stopPropagation();
          if (inspeccion) onElemento(r(id));
        }}
        data-ref={r(id)}
      >
        {children}
      </Tag>
    );
  };

  switch (doc.tipo) {
    case 'glosario':
      return (
        <div>
          {doc.entradas.map((e) => (
            <El key={e.id} id={e.id} como="div" className="glosario-entrada">
              <b>{e.termino}</b>
              {e.definicion}
            </El>
          ))}
        </div>
      );
    case 'ficha': {
      const foto = doc.foto;
      const img = foto ? imagenes.get(foto.imagen) : undefined;
      return (
        <div className="ficha">
          <div className="ficha-campos">
            {doc.campos.map((c) => (
              <El key={c.id} id={c.id} como="div" className="ficha-campo">
                <span className="ficha-etiqueta">{c.etiqueta}</span>
                <span className="ficha-valor">{c.valor}</span>
              </El>
            ))}
          </div>
          {foto && img && (
            <figure className={`ficha-foto el ${claseElemento(r(foto.id))}`} style={{ margin: 0 }} data-ref={r(foto.id)}>
              <ImagenZonas
                imagen={img}
                recorte={foto.recorte}
                resaltarAlPasar={inspeccion}
                onZona={(z) => inspeccion && onElemento(z ? `${r(foto.id)}@${z.id}` : r(foto.id))}
                alt="Fotografía adjunta a la ficha"
              />
              <figcaption>{foto.pie ?? 'Fotografía del motor'}</figcaption>
            </figure>
          )}
        </div>
      );
    }
    case 'manifiesto':
      return (
        <div>
          {doc.intro && <p style={{ marginTop: 0 }}>{doc.intro}</p>}
          {doc.pasos.map((p, i) => (
            <El key={p.id} id={p.id} como="div" className="manifiesto-paso">
              <span className="manifiesto-num">PASO {i + 1}</span>
              <span>{p.texto}</span>
            </El>
          ))}
        </div>
      );
    case 'informe': {
      const parrafos: (typeof doc.frases)[] = [];
      for (const f of doc.frases) {
        if (!parrafos.length || f.parrafo) parrafos.push([]);
        parrafos[parrafos.length - 1].push(f);
      }
      return (
        <div>
          {parrafos.map((ps, i) => (
            <p key={i} className="informe-parrafo">
              {ps.map((f, j) => (
                <Fragment key={f.id}>
                  {j > 0 && ' '}
                  <El id={f.id} className="informe-frase">
                    {f.texto}
                  </El>
                </Fragment>
              ))}
            </p>
          ))}
        </div>
      );
    }
    case 'tabla':
      return (
        <div className="tabla-scroll">
          <table className="tabla-doc">
            <thead>
              <tr>
                {doc.columnas.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doc.filas.map((f) => (
                <tr key={f.id}>
                  <th scope="row">{f.cabecera}</th>
                  {f.celdas.map((c) => (
                    <El key={c.id} id={c.id} como="td">
                      {c.valor}
                    </El>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'plano': {
      const img = imagenes.get(doc.imagen);
      return (
        <div>
          {img && (
            <div className="plano-marco">
              <ImagenZonas
                imagen={img}
                marcadores={doc.etiquetas.map((e, i) => ({
                  id: e.id,
                  zona: e.zona,
                  numero: i + 1,
                  clase: claseElemento(r(e.id)).includes('seleccionado') ? 'seleccionado' : claseElemento(r(e.id)).includes('registrado') ? 'registrado' : '',
                }))}
                onMarcador={(id) => inspeccion && onElemento(r(id))}
              />
            </div>
          )}
          <ul className="plano-leyenda">
            {doc.etiquetas.map((e, i) => (
              <El key={e.id} id={e.id} como="li">
                <span className="plano-num">{i + 1}</span>
                <span>{e.texto}</span>
              </El>
            ))}
          </ul>
          {doc.leyenda && <p className="nota" style={{ color: 'var(--tinta-suave)' }}>{doc.leyenda}</p>}
        </div>
      );
    }
  }
}
