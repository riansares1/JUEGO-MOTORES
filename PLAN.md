# PLAN — Inspección de Motores (juego tipo *Papers, Please* para MCI)

> Nota importante: `docs/diseno.md` **no está en el repositorio** (solo están los cuatro PDF en
> `DOCS/APUNTES/`). El diseño que sigue está reconstruido a partir del encargo y de los apuntes del
> Tema 1. Todas las decisiones que suplen al documento de diseño están en `DECISIONES.md`.

## 1. Arquitectura

```
src/
  motor/            ← motor genérico, sin contenido (TS puro, testeado con Vitest)
    tipos.ts          tipos de contenido (conceptos, imágenes, documentos, plantillas, jornadas)
    texto.ts          normalización y coincidencia aproximada (tildes, mayúsculas, erratas)
    documentos.ts     referencias a elementos, aplicación de parches (errores plantados)
    inspeccion.ts     evaluar pareja elemento ↔ prueba, citar regla requisada por nombre
    interrogatorio.ts autocorrección con ideas clave, localización en imagen
    veredicto.ts      tabla de consecuencias (sueldo completo / medio / citación / bloqueado)
    dominio.ts        estados de dominio y transiciones (nuevo → … → dominado; fallo baja uno)
    requisas.ts       qué reglas están requisadas y coste de consulta
    seleccion.ts      selección de expedientes de una jornada (nuevas, falladas, repaso, limpios)
    jornada.ts        máquina de estados pura de una jornada (reducer)
    progreso.ts       progreso persistente, cierre de jornada, recuperación, export/import
    azar.ts           generador pseudoaleatorio con semilla (reproducible en tests)
  contenido/        ← SOLO datos
    asignatura.ts     registro de la asignatura (temas, jornadas, reglas del juego)
    tema1/
      conceptos.ts    T1-01 … T1-38
      imagenes.ts     V1-01 … V1-10 + imágenes de apoyo
      zonas.json      zonas de cada imagen (editable con /editor)
      expedientes/    plantillas de expediente por jornada (documentos + discrepancias plantables)
  ui/               ← React: inicio, boletín, mesa, documentos, reglamento, interrogatorio, informe,
                      progreso, editor de zonas
  estado/           ← persistencia en localStorage
public/img/tema1/   ← imágenes recortadas de los apuntes (generadas por scripts/extraer_imagenes.py)
```

Principio: **el motor no conoce el Tema 1**. Un tema nuevo = carpeta `contenido/temaN/` con sus
conceptos, imágenes, zonas y plantillas + jornadas en `asignatura.ts`.

## 2. Modelo de juego (resumen)

* **Boletín** al inicio de cada jornada: una página por regla nueva (regla, explicación, imagen).
* **Expediente** = 1–3 documentos (glosario, ficha de homologación, manifiesto de secuencia, informe
  técnico, tabla comparativa, plano) + opcional escáner de rayos X (desde jornada 3).
* **Plantillas** con datos correctos + lista de discrepancias plantables (parches). El selector elige
  plantilla y, si toca, una discrepancia. Así la misma plantilla sirve como expediente limpio.
* **Inspección**: modo inspección → señalar elemento → señalar prueba (página del Reglamento u otro
  elemento). Pareja correcta = discrepancia registrada; incorrecta = acusación infundada (citación).
* **Regla requisada**: se cita escribiendo nombre/código (tolerancia a tildes y erratas) o se consulta
  pagando; lo resuelto consultando no cuenta para el dominio.
* **Interrogatorio** por discrepancia: corregir / explicar / nombrar / localizar. Autocorrección.
* **Veredicto**: sellos APROBADO / DENEGADO (bloqueado sin discrepancias registradas).
* **Dominio**: nuevo → visto → aplicado con Reglamento → aplicado de memoria → dominado.
* **Informe** de fin de jornada y **recuperación** si se falla más de un tercio.

## 3. Fases

1. Extracción de imágenes (V1-01…V1-10 + apoyo) y zonas iniciales.
2. Motor + tests (Vitest).
3. Interfaz: inicio, boletín, mesa, reglamento, interrogatorio, informe, progreso.
4. Contenido Jornada 1 (T1-01…T1-15) + validación automática del contenido + partida de prueba.
5. Jornadas 2 y 3 (T1-16…T1-38), rayos X.
6. Editor de zonas (`/editor`), pulido visual, tablet.
7. `REVISAR.md`, `DECISIONES.md`, `README.md`, build, push.

Tras cada fase: `npm test`, `npm run build` y revisión manual del contenido contra los apuntes.
