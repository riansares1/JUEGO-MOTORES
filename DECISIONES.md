# Decisiones tomadas por mi cuenta

## La más importante: falta `docs/diseno.md`

El repositorio solo contiene los cuatro PDF (en `DOCS/APUNTES/`, no en `docs/apuntes/`). **No existe `docs/diseno.md`**, así que no pude seguir el diseño, su inventario de 143 conceptos ni su tabla de consecuencias. Lo he reconstruido todo a partir del encargo y de los apuntes del Tema 1:

- **Inventario T1-01 … T1-38 propio.** Los códigos los he asignado yo siguiendo el orden de las diapositivas y respetando el reparto por jornadas del encargo (J1 = T1-01…15, J2 = T1-16…26, J3 = T1-27…38). Es muy probable que no coincidan con los del diseño. Si el diseño aparece, hay que renumerar `src/contenido/tema1/conceptos.ts` (y las referencias en los expedientes; la validación automática avisa de cualquier código roto).
  - J1: motor, combustión, interna, alternativo (01–04); ventajas (05–09); inconvenientes (10–11); aplicaciones (12); criterios de clasificación (13); MEP (14); MEC (15).
  - J2: 4T (16), 2T (17), PMS (18), PMI (19), carrera (20), cilindrada unitaria (21), admisión/compresión/expansión/escape (22–25), características del 2T: lumbreras, cárter y barrido (26).
  - J3: fases del 2T (27), ventajas y aplicaciones del 2T (28), inconvenientes del 2T (29), carburación/inyección directa/indirecta/mono/multipunto (30), ventajas e inconvenientes de la inyección directa (31), common rail (32), aspiración natural y sobrealimentación (33), turbocompresor e intercooler (34), refrigeración (35), en línea (36), V y VR (37), W y bóxer (38). Para que salieran exactamente 12 conceptos, V/VR y W/bóxer van agrupados de dos en dos.
- **Imágenes V1-01 … V1-10.** El encargo cita las diapositivas 10, 11, 14, 19, 20, 21 y 22–26 (11 diapositivas para 10 imágenes). He interpretado que las 19 y 20 son una sola imagen (sobrealimentación): V1-01 = diap. 10 (4T en corte), V1-02 = diap. 11 (2T), V1-03 = diap. 14 (evolución de la inyección), V1-04 = diap. 19 (esquema sobrealimentado; la foto en corte del turbo de la diap. 20 se usa en el escáner como `X1-05`), V1-05 = diap. 21 (aletas y radiador), V1-06…V1-10 = diap. 22…26 (línea, V, VR, W, bóxer).
- **Imágenes de apoyo** sin seguimiento de dominio (`A1-01` PMS/PMI/carrera, diap. 8; `A1-02` los cuatro tiempos, diap. 9; `A1-03` fases del 2T, diap. 11; `A1-04` common rail, diap. 17; `A1-05` y `A1-06` inyección directa/indirecta y mono/multipunto, diap. 15; `X1-05` turbo en corte, diap. 20). Las uso en boletines, planos, localizaciones y escáner porque son muy útiles, pero no las meto en el mapa de dominio para no inventar códigos V.
- **Tabla de consecuencias** (en `src/motor/veredicto.ts`):
  | Expediente | Sello | Situación | Resultado |
  |---|---|---|---|
  | sin errores | APROBADO | — | sueldo completo (10 cr) |
  | sin errores | DENEGADO | imposible: el sello está bloqueado sin discrepancias registradas | — |
  | con errores | APROBADO | — | citación y 0 cr |
  | con errores | DENEGADO | registrada e interrogatorio correcto | sueldo completo |
  | con errores | DENEGADO | interrogatorio incompleto (o falta alguna discrepancia) | medio sueldo (5 cr) |
  - Acusación infundada: citación. Citaciones 1 y 2 de cada jornada son avisos; desde la 3.ª, −5 cr cada una.
  - Consultar una página requisada: −3 cr (por expediente) y lo resuelto así no cuenta para el dominio.

## Mecánicas

- **“Fallar” un expediente** (para la recuperación) = resultado distinto de sueldo completo: aprobar con errores o denegar con interrogatorio incompleto. Las acusaciones infundadas cuestan citaciones pero no hacen fallar el expediente si al final se resuelve bien.
- **Recuperación**: si se fallan más de 1/3 de los expedientes, la jornada siguiente no se desbloquea y “Continuar” lleva a una jornada de recuperación de 8 expedientes que prioriza los conceptos fallados. Se puede repetir hasta superarla.
- **Días**: llevo un contador de “día de servicio” que avanza al terminar cualquier jornada (también recuperaciones y repeticiones). Las requisas (“desde la jornada siguiente”) y el estado dominado (“de memoria en dos jornadas distintas”) usan ese día, no el número de jornada; así repetir una jornada también cuenta como otro día.
- **Requisas**: una regla queda requisada desde el día siguiente al primer acierto. Si un fallo la baja a “visto”, deja de estar requisada (vuelve al Reglamento para que se pueda estudiar). En el Reglamento la página requisada muestra su código pero no su nombre ni su contenido.
- **Prueba con otro elemento** (foto, escáner, otro campo): cuenta como “aplicado con Reglamento” si la regla del concepto no está requisada y como “de memoria” si lo está.
- **Dominio**: un fallo baja un estado, nunca por debajo de “visto”. Desde “dominado” baja a “de memoria” conservando solo el último día de memoria. Las imágenes V siguen la misma lógica cuando la discrepancia es visual.
- **Fallos que bajan dominio**: aprobar con errores y denegar con interrogatorio incompleto. Las acusaciones infundadas no bajan dominio (ya penalizan con citación).
- **Expedientes de formación**: el primer expediente con discrepancia de cada regla nueva (no aplicada ni guiada antes) viene guiado: pasos, pista, elemento que parpadea y página del Reglamento resaltada. Como en la J1 hay 15 reglas nuevas y solo 9 huecos con error (12 expedientes, 3 limpios), no caben todas el primer día: las reglas sin aplicar se intercalan (1.ª, 3.ª, 5.ª…, luego 2.ª, 4.ª…) para que la primera partida recorra todo el boletín, y las que no salen se priorizan al repetir la jornada o en la siguiente.
- **Selección**: prioridad (1) reglas nuevas sin aplicar, (2) conceptos fallados de cualquier jornada ya vista, (3) repaso de reglas del día o del anterior menos practicadas, (4) resto. He permitido que los fallados de jornadas anteriores a la anterior entren aunque la fase de aprendizaje diga “solo reglas del día o del anterior”: son reglas ya conocidas y el encargo pide mezclar los fallados.
- **Limpios**: 25–30 % de los expedientes (12 → 3, 10 → 3, 8 → 2). Un expediente limpio es una plantilla con sus datos correctos.
- **Tamaño de jornada**: J1 = 12, J2 = 10, J3 = 12 expedientes.
- **Mecánica visual 3 (localización)** implementada como tipo de pregunta del interrogatorio: “señala X” sobre la imagen sin etiquetas, corrección automática.
- **Mecánica visual 1 (etiqueta falsa)**: en los planos las etiquetas son marcadores numerados sobre las zonas con su leyenda al lado (más legible en tablet que rótulos sobre la imagen). El error puede ser un texto falso o un marcador puesto en la pieza equivocada.
- **Mecánica visual 2 (foto que contradice la ficha)**: fichas con fotografía (recorte de una zona de la imagen) y el escáner de rayos X (desde la J3). En esos casos se acepta como prueba el elemento contradictorio y, cuando también vale, la regla.
- **Tolerancia al citar de memoria**: sin tildes ni mayúsculas, código en varios formatos (`T1-14`, `t1 14`, `t114`, `t1-5`) y erratas según la longitud (0 en alias de ≤ 3 letras como “MEP”, 1 hasta 6, 2 hasta 12 y ~18 % en nombres largos). Una cita que no reconoce ninguna regla no penaliza.
- **Interrogatorio**: si una discrepancia no define preguntas propias, se usa la pregunta tipo examen del concepto. Muchas definen una pregunta de corregir/explicar/nombrar y algunas una segunda de localizar.
- **Pantallas pequeñas**: por debajo de 980 px el Reglamento pasa a un panel lateral que se abre con un botón; por debajo de 700 px los documentos dejan de ser flotantes y se apilan.

## Contenido

- Todo dato técnico sale de los apuntes del Tema 1. Las discrepancias se construyen invirtiendo o cambiando un dato de los apuntes (unidades, válvulas abiertas/cerradas, sube/baja, número de vueltas, lo que se inyecta dónde…).
- Las empresas y los motores de los expedientes son ficticios.
- En las preguntas de MEC no afirmo qué entra en la admisión de un diésel (los apuntes solo hablan de mezcla en la admisión), para no añadir contenido que no está.
- Para el ángulo del VR uso el texto de los apuntes (“inferior a 15°”), no el 15° que aparece en la figura.

## Técnica

- Vite + React + TypeScript, sin librerías extra. Dos páginas: `/` (juego) y `/editor/` (editor de zonas), y `vercel.json` reescribe `/editor` a `/editor/index.html`.
- El motor (`src/motor`) es puro y no conoce el Tema 1; el contenido está en `src/contenido`. Los “constructores” de `src/contenido/constructores.ts` solo sirven para escribir datos de forma compacta.
- Las imágenes se generan con `scripts/extraer_imagenes.py` (rasterizado con `pdftoppm`, recorte, borrado de rótulos originales donde hacía falta para las preguntas sin etiquetas).
- Las zonas solapadas se resuelven eligiendo la zona más pequeña que contiene el punto; un test comprueba que todas las zonas son señalables.
- Además de los tests del motor hay un test de contenido que valida referencias, parches, zonas y preguntas, y que comprueba que cada prueba declarada registra realmente la discrepancia.
