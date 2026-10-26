// Pantalla principal: decide si se ve el inicio o una ronda.
import { useState } from 'react'
import Inicio from './componentes/Inicio'
import Ronda from './componentes/Ronda'
import { barajar, cargarProgreso, elegirRonda, guardarProgreso, itemsFallados, registrarRespuesta, type Progreso } from './progreso'
import { COLORES, TEMAS } from './temas'
import type { Item } from './tipos'

type Modo = { tipo: 'tema'; numero: number } | { tipo: 'fallos' } | { tipo: 'simulacro' }

export default function App() {
  const [progreso, setProgreso] = useState<Progreso>(cargarProgreso)
  const [modo, setModo] = useState<Modo | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [numRonda, setNumRonda] = useState(0)

  function prepararItems(m: Modo): Item[] {
    if (m.tipo === 'tema') {
      const tema = TEMAS.find((t) => t.numero === m.numero)!
      return elegirRonda(tema.items, 10, progreso)
    }
    if (m.tipo === 'fallos') {
      return barajar(itemsFallados(TEMAS.flatMap((t) => t.items), progreso)).slice(0, 10)
    }
    // Simulacro: 5 ítems de cada tema, mezclados.
    return barajar(TEMAS.flatMap((t) => elegirRonda(t.items, 5, progreso)))
  }

  function empezar(m: Modo) {
    setModo(m)
    setItems(prepararItems(m))
    setNumRonda((n) => n + 1)
    window.scrollTo({ top: 0 })
  }

  function registrar(id: string, acierto: boolean) {
    setProgreso((p) => {
      const nuevo = registrarRespuesta(p, id, acierto)
      guardarProgreso(nuevo)
      return nuevo
    })
  }

  if (!modo) {
    return (
      <Inicio
        progreso={progreso}
        onTema={(numero) => empezar({ tipo: 'tema', numero })}
        onFallos={() => empezar({ tipo: 'fallos' })}
        onSimulacro={() => empezar({ tipo: 'simulacro' })}
        onBorrar={() => {
          setProgreso({})
          guardarProgreso({})
        }}
      />
    )
  }

  let titulo = 'Simulacro mixto'
  let subtitulo = '20 ítems de los 4 temas'
  let color = '#1e3a5f'
  if (modo.tipo === 'tema') {
    const tema = TEMAS.find((t) => t.numero === modo.numero)!
    titulo = `Tema ${tema.numero} · ${tema.juego}`
    subtitulo = tema.descripcion
    color = COLORES[tema.numero]
  } else if (modo.tipo === 'fallos') {
    titulo = 'Repasar mis fallos'
    subtitulo = 'Ítems que fallaste la última vez'
    color = '#dc2626'
  }

  return (
    <Ronda
      key={numRonda}
      titulo={titulo}
      subtitulo={subtitulo}
      color={color}
      items={items}
      onRegistrar={registrar}
      onOtraRonda={() => empezar(modo)}
      onSalir={() => setModo(null)}
    />
  )
}
