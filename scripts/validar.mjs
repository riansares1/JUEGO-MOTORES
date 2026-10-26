// Revisa los JSON de src/data antes de compilar: `npm run validar`.
// Si algo está mal, lo explica y para el build.
import { readFileSync, readdirSync } from 'node:fs'

const carpeta = new URL('../src/data/', import.meta.url)
const ZONAS = JSON.parse(readFileSync(new URL('../src/diagramas/zonas.json', import.meta.url), 'utf8'))
const archivos = readdirSync(carpeta).filter((f) => /^tema\d+\.json$/.test(f)).sort()

const errores = []
const avisos = []
const ids = new Set()
const MAX_ENUNCIADO = 130
const MAX_EXPLICACION = 200

const unicos = (lista) => new Set(lista).size === lista.length

for (const archivo of archivos) {
  const tema = JSON.parse(readFileSync(new URL(archivo, carpeta), 'utf8'))
  const cuenta = {}
  for (const it of tema.items) {
    const donde = `${archivo} → ${it.id ?? '(sin id)'}`
    const mal = (m) => errores.push(`${donde}: ${m}`)
    cuenta[it.tipo] = (cuenta[it.tipo] ?? 0) + 1

    if (!it.id) mal('falta "id"')
    else if (ids.has(it.id)) mal('id repetido')
    else ids.add(it.id)
    for (const campo of ['tipo', 'enunciado', 'explicacion', 'fuente']) if (!it[campo]) mal(`falta "${campo}"`)
    if (it.fuente && !it.fuente.startsWith('Tema ')) mal('la fuente debe empezar por "Tema N · apartado"')
    if (it.enunciado?.length > MAX_ENUNCIADO) avisos.push(`${donde}: enunciado largo (${it.enunciado.length} caracteres)`)
    if (it.explicacion?.length > MAX_EXPLICACION) avisos.push(`${donde}: explicación larga (${it.explicacion.length} caracteres)`)

    switch (it.tipo) {
      case 'test':
        if (it.opciones?.length !== 4) mal('un test necesita 4 opciones')
        else if (!unicos(it.opciones)) mal('opciones repetidas')
        if (!(it.correcta >= 0 && it.correcta < (it.opciones?.length ?? 0))) mal('"correcta" fuera de rango')
        break
      case 'vf':
        if (typeof it.correcta !== 'boolean') mal('"correcta" debe ser true o false')
        break
      case 'efecto':
        if (!['sube', 'baja', 'igual'].includes(it.correcta)) mal('"correcta" debe ser sube, baja o igual')
        break
      case 'clasificar': {
        const n = it.tarjetas?.length ?? 0
        if (!(it.cajas?.length >= 2 && it.cajas.length <= 3)) mal('clasificar necesita 2 o 3 cajas')
        if (n < 6 || n > 8) mal(`clasificar necesita 6–8 tarjetas (tiene ${n})`)
        if (!unicos((it.tarjetas ?? []).map((t) => t.texto))) mal('tarjetas repetidas')
        for (const t of it.tarjetas ?? []) if (!(t.caja >= 0 && t.caja < it.cajas.length)) mal(`tarjeta "${t.texto}" con caja inválida`)
        for (let c = 0; c < (it.cajas?.length ?? 0); c++) if (!it.tarjetas.some((t) => t.caja === c)) mal(`la caja "${it.cajas[c]}" no tiene tarjetas`)
        break
      }
      case 'ordenar':
        if (!(it.pasos?.length >= 3)) mal('ordenar necesita al menos 3 pasos')
        else if (!unicos(it.pasos)) mal('pasos repetidos')
        break
      case 'emparejar':
        if (!(it.pares?.length >= 3 && it.pares.length <= 6)) mal('emparejar necesita 3–6 parejas')
        else if (!unicos(it.pares.map((p) => p.izq)) || !unicos(it.pares.map((p) => p.der))) mal('parejas repetidas')
        break
      case 'diagrama': {
        const d = ZONAS[it.diagrama]
        if (!d) {
          mal(`el diagrama "${it.diagrama}" no existe`)
          break
        }
        const existe = (z) => z in d.zonas
        if (it.modo === 'toca') {
          if (!existe(it.objetivo)) mal(`zona objetivo "${it.objetivo}" no existe en ${it.diagrama}`)
        } else if (it.modo === 'identifica') {
          if (!existe(it.objetivo)) mal(`zona objetivo "${it.objetivo}" no existe`)
          if (!(it.opciones?.length >= 3 && it.opciones.length <= 4)) mal('identifica necesita 3–4 opciones')
          else {
            if (!it.opciones.includes(it.objetivo)) mal('el objetivo debe estar entre las opciones')
            if (!unicos(it.opciones)) mal('opciones repetidas')
            for (const z of it.opciones) if (!existe(z)) mal(`opción "${z}" no existe`)
          }
        } else if (it.modo === 'etiquetar') {
          if (!(it.huecos?.length >= 2)) mal('etiquetar necesita huecos')
          else {
            if (!unicos(it.huecos.map((h) => h.zona))) mal('huecos repetidos')
            for (const h of it.huecos) if (!existe(h.zona)) mal(`hueco "${h.zona}" no existe`)
          }
        } else if (it.modo === 'pregunta') {
          const n = it.opcionesTexto?.length ?? 0
          if (n < 2 || n > 4) mal('pregunta necesita 2–4 opcionesTexto')
          else if (!unicos(it.opcionesTexto)) mal('opciones repetidas')
          if (!(it.correcta >= 0 && it.correcta < n)) mal('"correcta" fuera de rango')
        } else mal(`modo de diagrama desconocido: ${it.modo}`)
        break
      }
      default:
        mal(`tipo desconocido: ${it.tipo}`)
    }
  }
  console.log(`${archivo}: ${tema.items.length} ítems ·`, Object.entries(cuenta).map(([k, v]) => `${k} ${v}`).join(', '))
}

for (const a of avisos) console.warn('⚠️ ', a)
if (errores.length) {
  for (const e of errores) console.error('❌', e)
  console.error(`\n${errores.length} error(es). Corrige los JSON y vuelve a probar.`)
  process.exit(1)
}
console.log('✅ Contenido correcto.')
