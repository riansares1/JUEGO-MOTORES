// Página de revisión de dibujos (abrir con #diagramas en la URL).
// Pinta cada diagrama varias veces, cada una con una pieza resaltada y su nombre.
import Diagrama from '../diagramas/Diagrama'
import { ZONAS } from '../diagramas/zonas'

export default function Galeria() {
  return (
    <main className="pantalla" style={{ maxWidth: 1400 }}>
      {Object.entries(ZONAS).map(([id, d]) => (
        <section key={id}>
          <h2>
            {id} · {d.titulo}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 8 }}>
            {Object.entries(d.zonas).map(([z, nombre]) => (
              <figure key={z} className="diagrama-item" style={{ margin: 0 }}>
                <Diagrama id={id} resaltada={z} />
                <figcaption style={{ fontSize: 12, textAlign: 'center' }}>{nombre}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
