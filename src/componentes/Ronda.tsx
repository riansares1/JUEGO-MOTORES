// Una ronda: va mostrando ítems uno a uno, da feedback y al final enseña el resumen.
import { useState } from 'react'
import type { Item } from '../tipos'
import ItemVista, { NOMBRE_FORMATO } from './ItemVista'

interface Props {
  titulo: string
  subtitulo?: string
  color: string
  items: Item[]
  onRegistrar: (id: string, acierto: boolean) => void
  onOtraRonda: () => void
  onSalir: () => void
}

export default function Ronda({ titulo, subtitulo, color, items, onRegistrar, onOtraRonda, onSalir }: Props) {
  const [indice, setIndice] = useState(0)
  const [acierto, setAcierto] = useState<boolean | null>(null)
  const [resultados, setResultados] = useState<{ item: Item; acierto: boolean }[]>([])

  const terminado = indice >= items.length

  if (items.length === 0) {
    return (
      <main className="pantalla" style={{ '--acento': color } as React.CSSProperties}>
        <Cabecera titulo={titulo} subtitulo={subtitulo} onSalir={onSalir} />
        <div className="tarjeta vacia">
          <p>No hay ítems para esta ronda. 🎉</p>
          <button className="boton principal" onClick={onSalir}>
            Volver al inicio
          </button>
        </div>
      </main>
    )
  }

  if (terminado) {
    const aciertos = resultados.filter((r) => r.acierto).length
    const fallos = resultados.filter((r) => !r.acierto)
    return (
      <main className="pantalla" style={{ '--acento': color } as React.CSSProperties}>
        <Cabecera titulo={titulo} subtitulo={subtitulo} onSalir={onSalir} />
        <section className="tarjeta resumen">
          <p className="marcador">
            {aciertos} / {resultados.length}
          </p>
          <p>{aciertos === resultados.length ? '¡Ronda perfecta!' : 'aciertos en esta ronda'}</p>
        </section>
        {fallos.length > 0 && (
          <section className="tarjeta">
            <h3>Para repasar</h3>
            <ul className="lista-fallos">
              {fallos.map(({ item }) => (
                <li key={item.id}>
                  <p className="enunciado-fallo">{item.enunciado}</p>
                  <p>{item.explicacion}</p>
                  <p className="fuente">{item.fuente}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="botonera">
          <button className="boton principal" onClick={onOtraRonda}>
            Otra ronda
          </button>
          <button className="boton" onClick={onSalir}>
            Inicio
          </button>
        </div>
      </main>
    )
  }

  const item = items[indice]
  const respondido = acierto !== null

  function responder(ok: boolean) {
    if (respondido) return
    setAcierto(ok)
    setResultados((r) => [...r, { item, acierto: ok }])
    onRegistrar(item.id, ok)
  }

  function siguiente() {
    setAcierto(null)
    setIndice((i) => i + 1)
    window.scrollTo({ top: 0 })
  }

  return (
    <main className="pantalla" style={{ '--acento': color } as React.CSSProperties}>
      <Cabecera titulo={titulo} subtitulo={subtitulo} onSalir={onSalir} />
      <div className="progreso-ronda" aria-label={`Ítem ${indice + 1} de ${items.length}`}>
        <div style={{ width: `${(indice / items.length) * 100}%` }} />
      </div>
      <section className="tarjeta item">
        <p className="formato">
          {indice + 1}/{items.length} · {NOMBRE_FORMATO[item.tipo]}
        </p>
        <h2 className="enunciado">{item.enunciado}</h2>
        {/* key: cada ítem empieza con su estado limpio */}
        <ItemVista key={`${indice}-${item.id}`} item={item} respondido={respondido} onResponder={responder} />
      </section>
      {respondido && (
        <section className={`feedback ${acierto ? 'ok' : 'mal'}`} role="status">
          <p className="veredicto">{acierto ? '✔ ¡Correcto!' : '✘ No es correcto'}</p>
          <p>{item.explicacion}</p>
          <p className="fuente">{item.fuente}</p>
          <button className="boton principal" onClick={siguiente} autoFocus>
            {indice + 1 < items.length ? 'Siguiente' : 'Ver resultados'}
          </button>
        </section>
      )}
    </main>
  )
}

function Cabecera({ titulo, subtitulo, onSalir }: { titulo: string; subtitulo?: string; onSalir: () => void }) {
  return (
    <header className="cabecera">
      <button className="volver" onClick={onSalir} aria-label="Volver al inicio">
        ←
      </button>
      <div>
        <h1>{titulo}</h1>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
    </header>
  )
}
