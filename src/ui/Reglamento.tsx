import { useEffect, useMemo, useState } from 'react';
import { conceptosHastaJornada } from '../motor/seleccion';
import type { Asignatura, Concepto, ImagenDef } from '../motor/tipos';
import { ImagenZonas, urlImagen } from './ImagenZonas';

interface Props {
  asig: Asignatura;
  jornada: number;
  requisadas: string[];
  consultadas: string[];
  /** Hay un elemento señalado esperando prueba. */
  esperandoPrueba: boolean;
  onPrueba: (concepto: string) => void;
  onConsultar: (concepto: string) => void;
  guiaConcepto?: string;
  abierto: boolean;
  onCerrar: () => void;
}

export function imagenesDeConcepto(asig: Asignatura, c: Concepto): ImagenDef[] {
  const ids = new Set<string>();
  if (c.imagen) ids.add(c.imagen.id);
  for (const im of asig.imagenes) if (im.conceptos.includes(c.id)) ids.add(im.id);
  return [...ids].map((id) => asig.imagenes.find((i) => i.id === id)!).filter(Boolean);
}

export function Reglamento({ asig, jornada, requisadas, consultadas, esperandoPrueba, onPrueba, onConsultar, guiaConcepto, abierto, onCerrar }: Props) {
  const visibles = useMemo(() => new Set(conceptosHastaJornada(asig, jornada)), [asig, jornada]);
  const [tema, setTema] = useState(asig.temas[0]?.numero ?? 1);
  const [abiertas, setAbiertas] = useState<Set<string>>(new Set());
  const [visor, setVisor] = useState<ImagenDef | null>(null);

  useEffect(() => {
    if (!guiaConcepto) return;
    const c = asig.conceptos.find((x) => x.id === guiaConcepto);
    if (c) setTema(c.tema);
    setAbiertas((s) => new Set(s).add(guiaConcepto));
    const t = setTimeout(() => document.getElementById(`pag-${guiaConcepto}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 80);
    return () => clearTimeout(t);
  }, [guiaConcepto, asig]);

  const paginas = asig.conceptos.filter((c) => c.tema === tema && visibles.has(c.id));
  const alternar = (id: string) =>
    setAbiertas((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <aside className={`reglamento ${abierto ? 'abierto' : ''}`} aria-label="Reglamento">
      <div className="reglamento-cab fila-botones" style={{ justifyContent: 'space-between' }}>
        <span>REGLAMENTO DEL MINISTERIO</span>
        <button className="boton secundario pequeno boton-reglamento" onClick={onCerrar}>
          Cerrar
        </button>
      </div>
      <div className="pestanas" role="tablist">
        {asig.temas.map((t) => (
          <button key={t.numero} role="tab" aria-selected={tema === t.numero} className={`pestana ${tema === t.numero ? 'activa' : ''}`} onClick={() => setTema(t.numero)}>
            Tema {t.numero}
          </button>
        ))}
      </div>
      <div className="paginas">
        {esperandoPrueba && (
          <p className="nota" style={{ color: '#5a4400', background: '#fff3bf', padding: '6px 8px', borderRadius: 4, marginTop: 0 }}>
            Elige la página que demuestra la discrepancia y pulsa «Usar como prueba».
          </p>
        )}
        {paginas.length === 0 && <p>{asig.temas.find((t) => t.numero === tema)?.nombre}: páginas aún no publicadas.</p>}
        {paginas.map((c) => {
          const requisada = requisadas.includes(c.id) && !consultadas.includes(c.id);
          const abierta = abiertas.has(c.id);
          const guia = guiaConcepto === c.id;
          return (
            <section key={c.id} id={`pag-${c.id}`} className={`pagina ${esperandoPrueba && !requisada ? 'prueba-posible' : ''} ${guia ? 'guia' : ''}`}>
              <button className="pagina-cab" onClick={() => alternar(c.id)} aria-expanded={abierta}>
                <span className="pagina-cod">{c.id}</span>
                <span className="pagina-nombre">{requisada ? '— — —' : c.nombre}</span>
                {requisada && <span className="requisada-sello">REQUISADA</span>}
                {consultadas.includes(c.id) && <span className="requisada-sello" style={{ color: '#6a4a00', borderColor: '#6a4a00' }}>CONSULTADA</span>}
              </button>
              {esperandoPrueba && !requisada && (
                <div style={{ padding: '0 10px 8px' }}>
                  <button className="boton pequeno" onClick={() => onPrueba(c.id)}>
                    ⚖ Usar como prueba
                  </button>
                </div>
              )}
              {abierta && requisada && (
                <div className="pagina-cuerpo">
                  <p>
                    Esta página ha sido <b>requisada</b>: ya aplicaste bien esta regla. Para usarla como prueba, escribe su nombre o código en la barra de inspección (de memoria), o consúltala pagando {asig.config.costeConsulta} créditos (lo resuelto así no cuenta para tu dominio).
                  </p>
                  <button className="boton secundario pequeno" onClick={() => onConsultar(c.id)}>
                    Consultar (−{asig.config.costeConsulta} cr)
                  </button>
                </div>
              )}
              {abierta && !requisada && (
                <div className="pagina-cuerpo">
                  <p style={{ marginTop: 0 }}>{c.regla}</p>
                  {c.puntos && (
                    <ul>
                      {c.puntos.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                  {(() => {
                    const ims = imagenesDeConcepto(asig, c);
                    return ims.length ? (
                      <div className="imagenes">
                        {ims.map((im) => (
                          <button key={im.id} className="miniatura" onClick={() => setVisor(im)} title={`Ampliar: ${im.titulo}`}>
                            <img src={urlImagen(im.src)} alt={im.titulo} loading="lazy" />
                          </button>
                        ))}
                      </div>
                    ) : null;
                  })()}
                  <p className="nota" style={{ color: '#4b5d7a', marginBottom: 0 }}>Fuente: {c.fuente}</p>
                </div>
              )}
            </section>
          );
        })}
      </div>
      {visor && (
        <div className="modal-fondo" onClick={() => setVisor(null)}>
          <div className="modal papel" onClick={(e) => e.stopPropagation()}>
            <div className="cabecera-doc" style={{ cursor: 'default' }}>
              <span>{visor.id} · {visor.titulo}</span>
              <button className="boton secundario pequeno" onClick={() => setVisor(null)}>
                Cerrar
              </button>
            </div>
            <div className="cuerpo-doc">
              <ImagenZonas imagen={visor} />
              <p className="nota" style={{ color: 'var(--tinta-suave)' }}>{visor.fuente}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
