# Lo que conviene que revises

## 0. Lo primero

- **Falta `docs/diseno.md`.** El inventario T1-01…T1-38, el reparto de imágenes y la tabla de consecuencias son reconstrucciones mías (ver `DECISIONES.md`). Si tienes el documento de diseño, compara los códigos y súbelo al repositorio: probablemente haya que renumerar conceptos.

## 1. Zonas de imagen que pueden estar desplazadas

Las zonas se han estimado sobre una rejilla y verificado a ojo. Ábrelas con `/editor/` y corrige lo que haga falta:

- **V1-01 (4T en corte)**: `valvula_admision` y `valvula_escape` son aproximadas. Los cilindros 1–4 y el cigüeñal están bien. El volante y el cárter son orientativos.
- **V1-02 (2T)**: la imagen tiene restos de texto “fantasma” del escaneo (transparencia del reverso) sobre las zonas naranjas. Las lumbreras de escape/admisión son franjas estrechas y conviene comprobarlas. `carter` engloba a `ciguenal` (se resuelve por la zona más pequeña).
- **V1-03**: los rótulos “Se inyecta en el múltiple…” y “Se inyecta dentro de la cámara…” se han tapado con rectángulos blancos; uno toca un poco la flecha azul.
- **V1-04**: se han tapado los rótulos en inglés con el color del fondo; puede quedar algún resto de letra.
- **V1-06 … V1-10**: zonas gruesas (esquema, ángulo, motor). Revisa sobre todo `V1-06/ciguenal`, `V1-06/arbol_levas` y `V1-06/carter`.
- **A1-04 (common rail)**: zonas pequeñas y aproximadas (`regulador`, `sensor_presion`, `centralita`).
- **X1-05 (turbo en corte)**: he identificado la **turbina a la izquierda** (carcasa oscura, corte en rojo) y el **compresor a la derecha** (carcasa de aluminio, corte en azul). Confírmalo.

## 2. Discrepancias que podrían ser discutibles

- **P1-15 «generadores-alta»**: “se reservan para grupos de muy alta potencia, nunca de baja”. Los apuntes citan los grupos generadores de *bajas* potencias como aplicación, pero no dicen explícitamente que no se usen en altas.
- **P3-21 «fueraborda-grande»**: un 2T de gasolina de 2.500 cc contradice “gasolina: pequeñas potencias y cilindradas (< 350 cc)”, que en los apuntes es una aplicación típica, no una prohibición.
- **P3-02 «diesel-altas-rpm»** y **P3-03 «die-altas»**: igual, se apoyan en la aplicación típica del 2T diésel (barcos, bajas rpm).
- **P2-05 «lumbreras-cruzadas»** y **P3-05 «directa-indirecta-cruzadas»**: son etiquetas intercambiadas. La prueba es la página del Reglamento, que muestra la imagen numerada con su leyenda; el texto de la regla en sí no dice qué lumbrera está arriba.
- **P2-06 (V1-01)**: la etiqueta de cada cilindro se compara con lo que se ve en la imagen (colores y posición del pistón), igual que en la diapositiva 10.
- **P1-08 «mep-gasoleo»**: acepta como prueba también el campo “Inicio de la combustión: chispa de bujía”.
- **T1-24**: en la regla y en la respuesta modelo digo “es el tiempo de potencia”. La diapositiva 9 lo indica (“Potencia”), pero no dice “único”: en el boletín escribí “el único tiempo que produce potencia”, que es correcto pero no literal de los apuntes.
- **T1-26 / V1-02**: la diapositiva 11 llama “lumbrera de carga” al conducto izquierdo y la 12 habla de “lumbrera de transferencia”. He usado “Lumbrera de carga (transferencia)”, suponiendo que son la misma.
- **Autocorrección**: las ideas clave son la vara de medir. Revisa que sean justas (ni demasiado exigentes ni demasiado laxas), sobre todo en T1-11, T1-12, T1-13, T1-27 y T1-28, que piden enumerar mucho.

## 3. Erratas o incoherencias de los apuntes

- **Diap. 10**: “La válvula de admisión se abre para permitir la entrada de los **gases de combustión**”. Debería ser la mezcla aire-combustible (los gases de combustión salen por el escape). En el juego uso “mezcla de aire y combustible”.
- **Diap. 9**: “Admisión: Pistón baja y entra **combustible** por la válvula de admisión”. Es simplificado (entra la mezcla), y además en un MEC entraría aire; los apuntes no lo aclaran. También “combustibley” (errata).
- **Diap. 13**: “contaminates” → contaminantes; “Suciedad dentro del cilindro…” sin puntuación.
- **Diap. 16**: “Mas caro” → más caro.
- **Diap. 24**: el texto dice que el VR tiene un ángulo “inferior a 15°”, pero la figura muestra 15°. En el juego uso el texto.
- **Diap. 25**: la figura del W muestra 72° y 15°; el texto no da ángulos. No he hecho preguntas sobre esos valores.
- **Diap. 19**: el esquema está en inglés (“aircooler” = intercooler, “turbine/compressor wheel”…).

## 4. Datos que no he podido confirmar en los apuntes (y por eso no aparecen)

- Qué se admite exactamente en un MEC (aire solo) frente a un MEP (mezcla).
- Fechas exactas de la evolución carburador → indirecta → directa (la diap. 14 lo muestra en una gráfica aproximada; solo uso el orden).
- Ángulos concretos del motor en V más allá del rango 60–120° de la figura.

## 5. Para probar a mano

- Juega la jornada 1 una vez equivocándote a propósito (acusación infundada, aprobar con error, interrogatorio incompleto) para ver citaciones, medio sueldo y recuperación.
- En la jornada 2 comprueba las páginas requisadas: cita una de memoria escribiendo su nombre con alguna errata.
- En la jornada 3 usa el escáner de rayos X (botón ☢) en las fichas de motor en V, VR, turbo y 2T.
