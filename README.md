# Inspección de Motores

Juego web para estudiar **Motores de Combustión Interna**, inspirado en *Papers, Please*. Eres una inspectora del Ministerio: revisas expedientes de motores (glosarios, fichas de homologación, manifiestos de secuencia, informes, tablas y planos) y, para denegar uno, tienes que **demostrar** qué regla de la teoría incumple. Después contestas un interrogatorio de respuesta corta y te autocorriges con la respuesta modelo.

Contenido actual: **Tema 1 completo** (conceptos T1-01…T1-38, imágenes V1-01…V1-10) en las jornadas 1, 2 y 3.

## Ejecutar en local

Requisitos: Node 20 o superior.

```bash
npm install
npm run dev        # http://localhost:5173  (editor de zonas en /editor/)
npm test           # tests del motor y validación del contenido
npm run build      # compila en dist/
npm run preview    # sirve dist/ en http://localhost:4173
```

## Publicar en Vercel

1. Sube el repositorio a GitHub e impórtalo en Vercel (*Add New → Project*).
2. Vercel detecta Vite: *Build command* `npm run build`, *Output directory* `dist`. No hace falta cambiar nada.
3. `vercel.json` ya redirige `/editor` a la página del editor.

Es una web estática: no hay backend ni llamadas externas. El progreso se guarda en el `localStorage` del navegador; desde la pantalla de inicio se puede **exportar/importar** a un archivo JSON o **reiniciar**.

## Cómo se juega

1. **Boletín**: al empezar cada jornada lees las reglas nuevas, con su explicación e imágenes.
2. **Mesa**: llegan los expedientes de la cola. Puedes mover los documentos y ponerlos lado a lado. A la derecha está el **Reglamento**, con una pestaña por tema.
3. **Inspección** (botón 🔍): señala el dato erróneo y después la prueba: una página del Reglamento («Usar como prueba») u otro elemento que lo contradiga (otro campo, la foto o el escáner de rayos X).
4. **Interrogatorio**: escribe, envía (queda bloqueado), lee la respuesta modelo y marca las ideas clave que recogiste. Solo es acierto si están todas. Algunas preguntas piden **localizar** una pieza en la imagen sin etiquetas.
5. **Sellos**: APROBADO o DENEGADO (bloqueado si no has registrado ninguna discrepancia).
6. **Citaciones**: acusación infundada o aprobar con errores. Las dos primeras de cada jornada son avisos; desde la tercera, multa.
7. **Requisas**: una regla que ya aplicaste bien queda requisada al día siguiente. Para usarla como prueba escribe su nombre o código (de memoria) o paga por consultarla.
8. **Informe** de fin de jornada con sueldo, citaciones, conceptos fallados y mapa de dominio. Si fallas más de un tercio de los expedientes, toca una **jornada de recuperación**.

## Estructura

```
src/motor/        motor genérico (TypeScript puro, sin contenido) + tests
src/contenido/    datos: asignatura.ts (temas, jornadas, reglas económicas)
  tema1/          conceptos.ts, imagenes.ts, zonas.json, expedientes/jornadaN.ts
src/ui/           interfaz React (inicio, boletín, mesa, reglamento, interrogatorio, informe…)
src/editor/       editor de zonas (/editor/)
public/img/tema1/ imágenes recortadas de los apuntes
scripts/          extraer_imagenes.py (regenera las imágenes desde el PDF)
```

## Cómo añadir un tema nuevo (por ejemplo, el Tema 2)

No hay que tocar el motor: todo son datos.

1. **Imágenes**: añade una entrada por imagen en un script como `scripts/extraer_imagenes.py` (diapositiva, caja de recorte y, si hace falta, zonas a blanquear) y genera los JPG en `public/img/tema2/`.
2. **Zonas**: crea `src/contenido/tema2/zonas.json` (`{ "V2-01": [{ "id", "nombre", "x", "y", "w", "h" }] }`, en % de la imagen). Para ajustarlas con el editor, importa también ese JSON en `src/editor/Editor.tsx`.
3. **Conceptos**: `src/contenido/tema2/conceptos.ts` con objetos `Concepto` (`id` `T2-01`…, `tema: 2`, `nombre`, `alias`, `regla`, `boletin`, `pregunta`, `respuestaModelo`, 2–3 `ideasClave`, `fuente`).
4. **Imágenes**: `src/contenido/tema2/imagenes.ts` (como el del Tema 1: id, título, tamaño, conceptos asociados; `seguimiento` true para las del inventario V).
5. **Expedientes**: `src/contenido/tema2/expedientes/jornadaN.ts` con `PlantillaExpediente`s. Cada plantilla contiene los documentos **correctos** y una lista de `discrepancias`; cada discrepancia indica el concepto, el parche que planta el error (`ref` del elemento + texto nuevo, o zona nueva), el elemento a señalar, las pruebas válidas (`regla('T2-05')`, `elem('d1:campo')`, `elem('rx')`), una explicación, una pista para el modo formación y, opcionalmente, preguntas (`corregir`, `explicar`, `nombrar`, `localizar`). Usa los constructores de `src/contenido/constructores.ts` (`glosario`, `ficha`, `manifiesto`, `informe`, `tabla`, `plano`, `disc`).
6. **Registro**: en `src/contenido/asignatura.ts` suma los conceptos, imágenes y plantillas del tema y añade sus jornadas (`JornadaDef`: conceptos nuevos, imágenes nuevas, nº de expedientes, documentos y discrepancias máximos por expediente, rayos X).
7. Ejecuta `npm test`: la validación de contenido comprueba códigos, parches, zonas, preguntas y que cada prueba declarada registre de verdad su discrepancia.

Para otra asignatura bastaría con crear otro `Asignatura` con la misma forma.

## Documentos del proyecto

- `PLAN.md`: arquitectura y fases.
- `DECISIONES.md`: decisiones tomadas sin el documento de diseño.
- `REVISAR.md`: zonas, discrepancias discutibles y erratas de los apuntes que conviene revisar.
