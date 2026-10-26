# MCIA · Estudia jugando

Web para entender y memorizar la teoría de **Motores de Combustión Interna Alternativos** (4 temas) jugando.
Sin cálculos ni cuenta atrás. El progreso se guarda en el navegador.

- **Tema 1 · Clasificador**: clasificar características (MEP/MEC, 2T/4T, inyección…).
- **Tema 2 · Taller**: reconocer piezas en dibujos del motor, pistón, biela, cigüeñal y distribución.
- **Tema 3 · Diagrama p-V**: colocar los procesos en los ciclos Otto, Diesel y Dual, pérdidas y ángulos de distribución.
- **Tema 4 · Banco de pruebas**: causa-efecto (¿sube, baja o igual?), parámetros y curvas características.

Todo el contenido sale de los apuntes de `DOCS/APUNTES`. Cada pregunta indica su tema y apartado.

---

## 1. Probarlo en tu ordenador

Necesitas [Node.js](https://nodejs.org) (versión 20 o más). Después, en una terminal, dentro de esta carpeta:

```bash
npm install      # solo la primera vez: descarga las librerías
npm run dev      # arranca la web en http://localhost:5173
```

Abre esa dirección en el navegador. Cada vez que guardes un archivo, la página se actualiza sola.
Para pararlo, pulsa `Ctrl + C` en la terminal.

Otros comandos útiles:

```bash
npm run validar  # revisa que las preguntas de los JSON estén bien escritas
npm run build    # revisa + compila la versión final en la carpeta dist/
```

Truco: abre `http://localhost:5173/#diagramas` para ver todos los dibujos con el nombre de cada pieza resaltada.

## 2. Subirlo a GitHub

El código ya está en el repositorio `riansares1/JUEGO-MOTORES`. Cuando cambies algo:

```bash
git add .
git commit -m "Describe aquí lo que has cambiado"
git push
```

## 3. Publicarlo en Vercel

1. Entra en [vercel.com](https://vercel.com) con tu cuenta de GitHub.
2. Pulsa **Add New… → Project** e importa el repositorio `JUEGO-MOTORES`.
3. Vercel detecta que es un proyecto **Vite** solo. Deja los valores por defecto
   (Build Command `npm run build`, Output Directory `dist`) y pulsa **Deploy**.
4. En un minuto tendrás una dirección del tipo `https://juego-motores.vercel.app`.

A partir de ahí, cada `git push` a la rama principal vuelve a publicar la web automáticamente.
(Si trabajas en otra rama, Vercel crea una versión de prueba con su propia dirección.)

## 4. Añadir o cambiar preguntas

Las preguntas están en `src/data/tema1.json` … `tema4.json`. No hace falta tocar código:
copia un ítem que se parezca al que quieres, pégalo dentro de la lista `"items"` y cambia los textos.

Reglas:
- Cada ítem necesita un `"id"` **único** (por ejemplo `"t1-47"`).
- Separa los ítems con comas, y no dejes coma después del último.
- `"explicacion"`: máximo 2 líneas, explicando el porqué.
- `"fuente"`: empieza por `"Tema N · "` y el apartado de los apuntes.
- Después ejecuta `npm run validar`: te dirá si falta algo o hay un error.

### Formatos disponibles

**Test** (4 opciones; `correcta` es la posición empezando a contar en 0 — la app las desordena):
```json
{
  "id": "t1-47", "tipo": "test",
  "enunciado": "¿Qué combustible usa un MEC?",
  "opciones": ["Diésel", "Gasolina", "GLP", "Bioetanol"],
  "correcta": 0,
  "explicacion": "El MEC usa diésel y biodiésel; los demás son de MEP.",
  "fuente": "Tema 1 · Clasificación por proceso de combustión"
}
```

**Verdadero / falso**: `"tipo": "vf"` y `"correcta": true` o `false`.

**Sube, baja o igual**: `"tipo": "efecto"` y `"correcta": "sube"`, `"baja"` o `"igual"`.

**Clasificar** (2–3 cajas, 6–8 tarjetas; `caja` es la posición de su caja, desde 0):
```json
{
  "id": "t1-48", "tipo": "clasificar",
  "enunciado": "¿MEP o MEC?",
  "cajas": ["MEP", "MEC"],
  "tarjetas": [
    { "texto": "Bujía", "caja": 0 },
    { "texto": "Autoinflamación", "caja": 1 }
  ],
  "explicacion": "…", "fuente": "Tema 1 · …"
}
```

**Ordenar**: `"tipo": "ordenar"` y `"pasos": [...]` escritos **en el orden correcto** (la app los desordena).

**Emparejar**: `"tipo": "emparejar"` y `"pares": [{ "izq": "Pieza", "der": "Función" }, …]` (3–6 parejas).

**Diagrama**: `"tipo": "diagrama"`, `"diagrama"` (nombre del dibujo) y un `"modo"`:
- `"toca"` + `"objetivo"`: la usuaria debe tocar esa pieza.
- `"identifica"` + `"objetivo"` + `"opciones"` (3–4 piezas): se resalta la pieza y se elige su nombre.
- `"etiquetar"` + `"huecos": [{ "zona": "t12", "etiqueta": "Compresión adiabática" }, …]`.
- `"pregunta"` + `"opcionesTexto"` + `"correcta"`: una pregunta tipo test con el dibujo delante.

Los nombres de dibujos y piezas (por ejemplo `motor` → `piston`, `biela`, `culata`…) están en
`src/diagramas/zonas.ts`.

## Cómo funciona el repaso

Cada ítem tiene un nivel de 0 a 3. Si aciertas sube un nivel; si fallas vuelve a 0.
Las rondas eligen primero los ítems no vistos y los de nivel 0. «Dominado» = nivel 3.
«Repasar mis fallos» junta los ítems que fallaste la última vez, de todos los temas.

## Estructura del código

```
src/
  data/temaN.json        ← el contenido (preguntas)
  tipos.ts               ← la forma de cada tipo de ítem
  progreso.ts            ← guardado en el navegador y elección de ítems
  App.tsx                ← decide qué pantalla se ve
  componentes/           ← inicio, ronda y un componente por formato de ítem
  diagramas/             ← dibujos SVG y nombres de sus piezas
scripts/validar.mjs      ← revisión automática de los JSON
```
