import { NOMBRE_DOMINIO, ORDEN_DOMINIO } from '../motor/dominio';
import type { Asignatura, Progreso } from '../motor/tipos';
import { urlImagen } from './ImagenZonas';

export function LeyendaDominio() {
  return (
    <div className="leyenda">
      {ORDEN_DOMINIO.map((e) => (
        <span key={e} className={`dom-${e}`}>
          {NOMBRE_DOMINIO[e]}
        </span>
      ))}
    </div>
  );
}

export function MapaDominio({ asig, progreso }: { asig: Asignatura; progreso: Progreso }) {
  const estado = (id: string) => progreso.dominio[id]?.estado ?? 'nuevo';
  return (
    <div>
      <LeyendaDominio />
      {asig.temas.map((t) => {
        const cs = asig.conceptos.filter((c) => c.tema === t.numero);
        const ims = asig.imagenes.filter((i) => i.seguimiento && i.id.startsWith(`V${t.numero}-`));
        return (
          <section key={t.numero} style={{ marginBottom: 14 }}>
            <h3 style={{ margin: '10px 0 6px' }}>
              Tema {t.numero} · {t.nombre}
            </h3>
            {cs.length === 0 ? (
              <p className="nota" style={{ color: 'inherit', opacity: 0.7 }}>Contenido aún no disponible.</p>
            ) : (
              <div className="mapa">
                {cs.map((c) => (
                  <div key={c.id} className={`celda-dominio dom-${estado(c.id)}`} title={`${c.id} · ${c.nombre} — ${NOMBRE_DOMINIO[estado(c.id)]}`}>
                    {c.id}
                    <small>{NOMBRE_DOMINIO[estado(c.id)]}</small>
                  </div>
                ))}
              </div>
            )}
            {ims.length > 0 && (
              <>
                <h4 style={{ margin: '10px 0 6px' }}>Imágenes</h4>
                <div className="mapa" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))' }}>
                  {ims.map((im) => (
                    <div key={im.id} className={`celda-dominio dom-${estado(im.id)}`} title={`${im.id} · ${im.titulo} — ${NOMBRE_DOMINIO[estado(im.id)]}`}>
                      <img src={urlImagen(im.src)} alt={im.titulo} style={{ width: '100%', height: 54, objectFit: 'cover', borderRadius: 4, background: '#fff' }} loading="lazy" />
                      {im.id}
                      <small>{NOMBRE_DOMINIO[estado(im.id)]}</small>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}
