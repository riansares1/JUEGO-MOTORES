// Jornada 3 · T1-27 … T1-38: ciclo y balance del 2T, suministro de combustible, inyección directa,
// common rail, sobrealimentación, refrigeración y disposición de cilindros. Imágenes V1-03 … V1-10.
// Desde esta jornada hay escáner de rayos X (referencias "rx@zona").
import type { PlantillaExpediente } from '../../../motor/tipos';
import { corregir, disc, elem, explicar, ficha, glosario, informe, localizar, manifiesto, nombrar, plano, regla, tabla } from '../../constructores';

export const plantillasJornada3: PlantillaExpediente[] = [
  // ───────────── P3-01 · Manifiesto del ciclo de dos tiempos ─────────────
  {
    id: 'P3-01',
    conceptos: ['T1-27'],
    solicitante: 'Motosierras y Desbrozadoras del Bierzo',
    motivo: 'Validación del manifiesto de ciclo de un motor de dos tiempos',
    documentos: [
      manifiesto('d1', 'Manifiesto de secuencia · Ciclo de dos tiempos', [
        ['p1', 'Fase de admisión-compresión: el pistón sube desde el PMI hacia la culata.'],
        ['p2', 'Por encima, la cara superior del pistón comprime la mezcla en el cilindro.'],
        ['p3', 'Por debajo, la cara inferior succiona la mezcla aire-combustible hacia el cárter a través de la lumbrera de admisión; para ello el cárter ha de estar sellado.'],
        ['p4', 'Fase de potencia-escape: al llegar al PMS termina la compresión y se provoca la combustión; la expansión empuja el pistón hacia abajo.'],
        ['p5', 'Al bajar, el pistón abre la lumbrera de escape y salen los gases de combustión.'],
        ['p6', 'También abre la lumbrera de transferencia, por la que la mezcla pasa del cárter al cilindro.'],
        ['p7', 'Al llegar al PMI empieza a subir de nuevo, cierra la lumbrera de transferencia y comienza un nuevo ciclo.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'carter-abierto',
        concepto: 'T1-27',
        ref: 'd1:p3',
        texto: 'Por debajo, la cara inferior succiona la mezcla aire-combustible hacia el cárter a través de la lumbrera de admisión; para ello el cárter debe estar abierto a la atmósfera.',
        explicacion: 'Para que la cara inferior del pistón pueda succionar la mezcla, el cárter ha de estar SELLADO.',
        guia: 'Revisa la condición que se exige al cárter en el paso 3.',
      }),
      disc({
        id: 'transferencia-al-reves',
        concepto: 'T1-27',
        ref: 'd1:p6',
        texto: 'También abre la lumbrera de transferencia, por la que los gases quemados vuelven del cilindro al cárter.',
        explicacion: 'Por la lumbrera de transferencia la MEZCLA pasa del cárter al cilindro; los gases quemados salen por la lumbrera de escape.',
        guia: 'Revisa qué circula por la lumbrera de transferencia.',
        preguntas: [
          explicar('¿Qué ocurre en la fase de potencia-escape de un 2T?', 'Tras la combustión en el PMS, la expansión hace bajar el pistón, que abre la lumbrera de escape (salen los gases) y la de transferencia, por la que la mezcla pasa del cárter al cilindro.', [
            'La expansión hace bajar el pistón',
            'Se abre la lumbrera de escape y salen los gases',
            'La lumbrera de transferencia lleva la mezcla del cárter al cilindro',
          ]),
        ],
      }),
      disc({
        id: 'combustion-pmi',
        concepto: 'T1-27',
        ref: 'd1:p4',
        texto: 'Fase de potencia-escape: al llegar al PMI termina la compresión y se provoca la combustión; la expansión empuja el pistón hacia arriba.',
        explicacion: 'La compresión termina y la combustión se provoca en el PMS; la expansión empuja el pistón hacia abajo.',
        guia: 'Revisa en qué punto muerto se produce la combustión.',
      }),
      disc({
        id: 'sube-desde-pms',
        concepto: 'T1-27',
        ref: 'd1:p1',
        texto: 'Fase de admisión-compresión: el pistón baja desde el PMS hacia el cárter.',
        explicacion: 'En la fase de admisión-compresión el pistón SUBE desde el PMI hacia la culata.',
        guia: 'Revisa el sentido del movimiento en la fase de admisión-compresión.',
      }),
    ],
  },

  // ───────────── P3-02 · Informe: balance del 2T ─────────────
  {
    id: 'P3-02',
    conceptos: ['T1-28', 'T1-29'],
    solicitante: 'Consultora Naval y Agrícola Duero',
    motivo: 'Visado de informe comparativo 2T/4T',
    documentos: [
      informe('d1', 'Informe técnico · El motor de dos tiempos frente al de cuatro', [
        ['f1', 'Frente al 4T, el 2T ofrece mayor potencia específica por volumen y peso: teóricamente da la misma potencia en la mitad de tiempo (una vuelta de cigüeñal).'],
        ['f2', 'Es más ligero, sencillo y económico, porque elimina el sistema de renovación de la carga y sus inercias.'],
        ['f3', 'En gasolina se usa en pequeñas potencias y cilindradas, por debajo de 350 cc: motocicletas, motores fueraborda, motosierras o cortacéspedes.'],
        ['f4', 'En diésel se emplea en grandes potencias a bajas revoluciones, como los motores de barco (35.000 CV a 80–200 rpm).'],
        '¶',
        ['f5', 'Como inconvenientes, consume aceite: se quema una mezcla de aire-combustible y aceite que ensucia el cilindro y puede afectar a la bujía.'],
        ['f6', 'Su rendimiento es inferior, ya que tanto la combustión como la renovación de la carga son menos efectivas que en el 4T.'],
        ['f7', 'Además, sus emisiones son más contaminantes.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'menor-potencia',
        concepto: 'T1-28',
        ref: 'd1:f1',
        texto: 'Frente al 4T, el 2T ofrece menor potencia específica por volumen y peso, porque necesita dos vueltas de cigüeñal por ciclo.',
        explicacion: 'El 2T tiene MAYOR potencia específica: completa el ciclo en una sola vuelta de cigüeñal.',
        guia: 'Revisa la frase sobre la potencia específica.',
        preguntas: [
          explicar('¿Por qué el 2T tiene mayor potencia específica que el 4T?', 'Porque completa el ciclo en una vuelta de cigüeñal: teóricamente obtiene la misma potencia en la mitad de tiempo, y además es más ligero.', [
            'Un ciclo por cada vuelta de cigüeñal',
            'Misma potencia en la mitad de tiempo (por volumen y peso)',
          ]),
        ],
      }),
      disc({
        id: 'gasolina-grandes',
        concepto: 'T1-28',
        ref: 'd1:f3',
        texto: 'En gasolina se reserva para grandes cilindradas, por encima de 350 cc, como los camiones de largo recorrido.',
        explicacion: 'En gasolina el 2T se aplica a pequeñas potencias y cilindradas (menos de 350 cc).',
        guia: 'Revisa la aplicación del 2T de gasolina.',
      }),
      disc({
        id: 'diesel-altas-rpm',
        concepto: 'T1-28',
        ref: 'd1:f4',
        texto: 'En diésel se emplea en pequeñas potencias a muy altas revoluciones, como las motosierras.',
        explicacion: 'El 2T diésel se usa para GRANDES potencias a BAJAS revoluciones (barcos, 35.000 CV a 80–200 rpm).',
        guia: 'Revisa la aplicación del 2T diésel.',
      }),
      disc({
        id: 'sin-aceite',
        concepto: 'T1-29',
        ref: 'd1:f5',
        texto: 'A diferencia del 4T, no consume aceite, ya que el aceite nunca llega a la cámara de combustión.',
        explicacion: 'El 2T SÍ consume aceite: se quema una mezcla de aire-combustible y aceite.',
        guia: 'Revisa la frase sobre el aceite.',
      }),
      disc({
        id: 'mayor-rendimiento',
        concepto: 'T1-29',
        ref: 'd1:f6',
        texto: 'Su rendimiento es superior, ya que la combustión y la renovación de la carga son más efectivas que en el 4T.',
        explicacion: 'El rendimiento del 2T es INFERIOR: combustión y renovación de la carga son menos efectivas.',
        guia: 'Revisa la frase sobre el rendimiento.',
        preguntas: [
          nombrar('Nombra los tres inconvenientes del 2T respecto al 4T.', 'Consumo de aceite, rendimiento inferior y emisiones más contaminantes.', [
            'Consumo de aceite',
            'Rendimiento inferior',
            'Emisiones más contaminantes',
          ]),
        ],
      }),
      disc({
        id: 'emisiones-limpias',
        concepto: 'T1-29',
        ref: 'd1:f7',
        texto: 'Además, sus emisiones son más limpias que las del 4T.',
        explicacion: 'Las emisiones del 2T son MÁS contaminantes, porque quema peor.',
        guia: 'Revisa la última frase.',
      }),
    ],
  },

  // ───────────── P3-03 · Tabla: balance 4T / 2T ─────────────
  {
    id: 'P3-03',
    conceptos: ['T1-28', 'T1-29'],
    solicitante: 'Academia de Mecánica Naval de Ferrol',
    motivo: 'Aprobación de tabla de comparación 2T/4T',
    documentos: [
      tabla(
        'd1',
        'Tabla comparativa · Balance del 2T respecto al 4T',
        ['Aspecto', 'Motor de 2 tiempos (respecto al 4T)'],
        [
          ['pot', 'Potencia específica (por volumen y peso)', 'Mayor'],
          ['con', 'Peso, sencillez y coste', 'Más ligero, sencillo y económico'],
          ['ace', 'Aceite', 'Lo consume: se quema junto con la mezcla'],
          ['ren', 'Rendimiento', 'Inferior'],
          ['emi', 'Emisiones', 'Más contaminantes'],
          ['gas', 'Aplicación en gasolina', 'Pequeñas potencias y cilindradas (< 350 cc)'],
          ['die', 'Aplicación en diésel', 'Grandes potencias a bajas revoluciones (barcos)'],
        ],
      ),
    ],
    discrepancias: [
      disc({ id: 'pot-menor', concepto: 'T1-28', ref: 'd1:pot1', texto: 'Menor', explicacion: 'El 2T tiene mayor potencia específica por volumen y peso.', guia: 'Revisa la potencia específica.' }),
      disc({ id: 'con-pesado', concepto: 'T1-28', ref: 'd1:con1', texto: 'Más pesado, complejo y caro', explicacion: 'El 2T es más ligero, sencillo y económico: elimina el sistema de renovación de la carga.', guia: 'Revisa el peso, la sencillez y el coste.' }),
      disc({ id: 'ren-superior', concepto: 'T1-29', ref: 'd1:ren1', texto: 'Superior', explicacion: 'El rendimiento del 2T es inferior al del 4T.', guia: 'Revisa el rendimiento.' }),
      disc({ id: 'emi-limpias', concepto: 'T1-29', ref: 'd1:emi1', texto: 'Menos contaminantes', explicacion: 'Las emisiones del 2T son más contaminantes.', guia: 'Revisa las emisiones.' }),
      disc({ id: 'die-altas', concepto: 'T1-28', ref: 'd1:die1', texto: 'Pequeñas potencias a altas revoluciones', explicacion: 'El 2T diésel se aplica a grandes potencias a bajas revoluciones (barcos: 35.000 CV a 80–200 rpm).', guia: 'Revisa la aplicación en diésel.' }),
    ],
  },

  // ───────────── P3-04 · Glosario de suministro de combustible ─────────────
  {
    id: 'P3-04',
    conceptos: ['T1-30', 'T1-32'],
    solicitante: 'Inyección y Diagnosis del Levante S.L.',
    motivo: 'Aprobación de glosario de sistemas de alimentación',
    documentos: [
      glosario('d1', 'Glosario oficial · Suministro de combustible', [
        ['dir', 'Inyección directa', 'Inyección del combustible directamente en la cámara de combustión.'],
        ['ind', 'Inyección indirecta', 'Inyección del combustible en el conducto de admisión.'],
        ['mono', 'Inyección monopunto', 'Inyección indirecta con un solo inyector.'],
        ['multi', 'Inyección multipunto', 'Inyección indirecta con un inyector para cada cilindro.'],
        ['cr', 'Common rail', 'Sistema de inyección directa diésel en el que la alimentación de combustible se realiza desde un conducto común.'],
      ]),
    ],
    discrepancias: [
      disc({ id: 'directa-conducto', concepto: 'T1-30', ref: 'd1:dir', texto: 'Inyección del combustible en el conducto de admisión, antes de la válvula.', explicacion: 'En la inyección directa el combustible se inyecta en la cámara de combustión; en el conducto de admisión es indirecta.', guia: 'Revisa dónde se inyecta en la inyección directa.' }),
      disc({ id: 'mono-por-cilindro', concepto: 'T1-30', ref: 'd1:mono', texto: 'Inyección indirecta con un inyector para cada cilindro.', explicacion: 'Monopunto = un solo inyector. Un inyector por cilindro es multipunto.', guia: 'Revisa cuántos inyectores tiene la inyección monopunto.' }),
      disc({
        id: 'multi-unico',
        concepto: 'T1-30',
        ref: 'd1:multi',
        texto: 'Inyección directa con un único inyector común para todos los cilindros.',
        explicacion: 'La multipunto es una inyección indirecta con un inyector para cada cilindro.',
        guia: 'Revisa la definición de multipunto.',
        preguntas: [
          explicar('Explica la diferencia entre inyección monopunto y multipunto.', 'Ambas son inyección indirecta (en el conducto de admisión); la monopunto tiene un solo inyector y la multipunto un inyector para cada cilindro.', [
            'Ambas son inyección indirecta',
            'Monopunto: un solo inyector',
            'Multipunto: un inyector por cilindro',
          ]),
        ],
      }),
      disc({
        id: 'cr-indirecta-gasolina',
        concepto: 'T1-32',
        ref: 'd1:cr',
        texto: 'Sistema de inyección indirecta de gasolina con un inyector por cilindro.',
        explicacion: 'El common rail es un sistema de inyección DIRECTA DIÉSEL alimentado desde un conducto común.',
        guia: 'Revisa la definición de common rail.',
      }),
    ],
  },

  // ───────────── P3-05 · Plano: evolución de la inyección (V1-03) ─────────────
  {
    id: 'P3-05',
    conceptos: ['T1-30'],
    solicitante: 'Revista «Motor y Técnica»',
    motivo: 'Visado de infografía sobre preparación de la mezcla en MEP',
    documentos: [
      plano(
        'd1',
        'Plano técnico · Preparación de la mezcla en MEP',
        'V1-03',
        [
          ['e1', 'carburador', 'Carburador'],
          ['e2', 'inyeccion_indirecta', 'Inyección indirecta: se inyecta en el múltiple (conducto) de admisión'],
          ['e3', 'inyeccion_directa', 'Inyección directa: se inyecta dentro de la cámara de combustión'],
        ],
        { leyenda: 'Evolución histórica: carburador → inyección indirecta → inyección directa.' },
      ),
    ],
    discrepancias: [
      disc({
        id: 'indirecta-en-camara',
        concepto: 'T1-30',
        imagen: 'V1-03',
        ref: 'd1:e2',
        texto: 'Inyección indirecta: se inyecta dentro de la cámara de combustión',
        explicacion: 'En la indirecta se inyecta en el conducto de admisión; dentro de la cámara de combustión es la directa.',
        guia: 'Revisa la etiqueta 2.',
        preguntas: [
          corregir('Corrige la etiqueta 2.', 'Inyección indirecta: el combustible se inyecta en el conducto (múltiple) de admisión.', ['Se inyecta en el conducto de admisión']),
          localizar('Señala en la imagen sin etiquetas el sistema que inyecta directamente en la cámara de combustión.', 'V1-03', 'inyeccion_directa', 'Es el tercer círculo: el inyector entra en la cámara de combustión.'),
        ],
      }),
      disc({
        id: 'directa-indirecta-cruzadas',
        concepto: 'T1-30',
        imagen: 'V1-03',
        ref: 'd1:e3',
        parches: [
          { ref: 'd1:e3', zona: 'inyeccion_indirecta' },
          { ref: 'd1:e2', zona: 'inyeccion_directa' },
        ],
        elementosAceptados: ['d1:e2'],
        explicacion: 'Las etiquetas de inyección directa e indirecta señalan el esquema equivocado: en el esquema central el inyector está en el conducto de admisión (indirecta) y en el de la derecha, en la cámara (directa).',
        guia: 'Mira dónde está el inyector en cada esquema y compáralo con las etiquetas.',
        preguntas: [localizar('Señala el sistema de inyección indirecta.', 'V1-03', 'inyeccion_indirecta', 'Es el esquema central: el inyector está en el múltiple de admisión.')],
      }),
    ],
  },

  // ───────────── P3-06 · Tabla: inyección directa ─────────────
  {
    id: 'P3-06',
    conceptos: ['T1-31'],
    solicitante: 'Departamento de Ingeniería de Motores Alcarreños',
    motivo: 'Aprobación de tabla de ventajas e inconvenientes',
    documentos: [
      tabla(
        'd1',
        'Tabla comparativa · Inyección directa',
        ['Aspecto', 'Valoración', 'Detalle'],
        [
          ['con', 'Consumo de combustible', 'Ventaja', 'Menor (menores pérdidas de calor) → mayor rendimiento'],
          ['rc', 'Relación de compresión', 'Ventaja', 'Mayor'],
          ['fun', 'Funcionamiento', 'Ventaja', 'Más estable'],
          ['nox', 'Emisiones de NOx', 'Inconveniente', 'Mayores'],
          ['atk', 'Ciclo Atkinson (híbridos)', 'Inconveniente', 'No es posible aplicarlo'],
          ['cos', 'Coste', 'Inconveniente', 'Más cara'],
          ['iny', 'Inyectores', 'Inconveniente', 'Sufren más (mayor mantenimiento)'],
        ],
      ),
    ],
    discrepancias: [
      disc({
        id: 'nox-menores',
        concepto: 'T1-31',
        ref: 'd1:nox2',
        texto: 'Menores',
        explicacion: 'La inyección directa produce MAYORES emisiones de NOx; por eso es un inconveniente.',
        guia: 'Revisa las emisiones de NOx (fíjate también en la valoración de la fila).',
        preguntas: [
          explicar('Cita los inconvenientes de la inyección directa.', 'Mayores emisiones de NOx, imposibilidad de aplicar el ciclo Atkinson (híbridos), mayor coste y más desgaste de los inyectores (más mantenimiento).', [
            'Más NOx',
            'No permite el ciclo Atkinson',
            'Más cara y más mantenimiento de inyectores',
          ]),
        ],
      }),
      disc({ id: 'consumo-mayor', concepto: 'T1-31', ref: 'd1:con2', texto: 'Mayor (más pérdidas de calor)', explicacion: 'La inyección directa reduce el consumo (menores pérdidas de calor) y aumenta el rendimiento.', guia: 'Revisa el consumo de combustible.' }),
      disc({ id: 'atkinson-facil', concepto: 'T1-31', ref: 'd1:atk2', texto: 'Facilita aplicarlo', explicacion: 'Con inyección directa NO es posible aplicar el ciclo Atkinson (híbridos).', guia: 'Revisa la fila del ciclo Atkinson.' }),
      disc({ id: 'rc-menor', concepto: 'T1-31', ref: 'd1:rc2', texto: 'Menor', explicacion: 'La inyección directa permite una MAYOR relación de compresión.', guia: 'Revisa la relación de compresión.' }),
    ],
  },

  // ───────────── P3-07 · Ficha: diésel common rail ─────────────
  {
    id: 'P3-07',
    conceptos: ['T1-15', 'T1-30', 'T1-32'],
    solicitante: 'Camiones y Autobuses del Guadalquivir',
    motivo: 'Homologación de motor diésel con common rail',
    documentos: [
      ficha(
        'd1',
        'Ficha de homologación · Motor CG-CR6',
        [
          ['proc', 'Proceso de combustión', 'MEC · encendido por compresión'],
          ['comb', 'Combustible', 'Gasóleo'],
          ['iny', 'Tipo de inyección', 'Directa (en la cámara de combustión)'],
          ['sis', 'Sistema de alimentación', 'Common rail: todos los inyectores se alimentan desde un conducto común'],
          ['inyc', 'Inyectores', 'Con control eléctrico (unidad de control electrónico)'],
        ],
        { foto: { id: 'foto', imagen: 'A1-04', pie: 'Esquema del sistema adjunto por el fabricante' } },
      ),
    ],
    discrepancias: [
      disc({
        id: 'cr-indirecta',
        concepto: 'T1-32',
        ref: 'd1:iny',
        texto: 'Indirecta (en el conducto de admisión)',
        pruebas: [regla('T1-32'), elem('d1:sis')],
        explicacion: 'El common rail es un sistema de inyección DIRECTA diésel.',
        guia: 'Compara el tipo de inyección con el sistema de alimentación declarado.',
        preguntas: [
          explicar('¿Qué es el sistema common rail?', 'Un sistema de inyección directa diésel en el que la alimentación de combustible se realiza desde un conducto común.', [
            'Inyección directa',
            'Diésel',
            'Alimentación desde un conducto común',
          ]),
          localizar('Señala en el esquema sin etiquetas el conducto común.', 'A1-04', 'conducto_comun', 'Es el conducto horizontal (rojo) del que salen las tuberías a todos los inyectores.'),
        ],
      }),
      disc({
        id: 'cr-gasolina',
        concepto: 'T1-32',
        ref: 'd1:proc',
        texto: 'MEP · encendido provocado por bujía',
        pruebas: [regla('T1-32'), regla('T1-15'), regla('T1-14'), elem('d1:comb'), elem('d1:sis')],
        explicacion: 'Un motor de gasóleo con common rail es un MEC (diésel): el common rail es inyección directa diésel.',
        guia: 'Compara el proceso de combustión con el combustible y el sistema de alimentación.',
      }),
    ],
  },

  // ───────────── P3-08 · Ficha: motor sobrealimentado con escáner (X1-05) ─────────────
  {
    id: 'P3-08',
    conceptos: ['T1-33', 'T1-34'],
    solicitante: 'Turbo Preparaciones Montes de Oca',
    motivo: 'Homologación de motor sobrealimentado',
    rayosX: { imagen: 'X1-05', pie: 'Escáner del grupo de sobrealimentación instalado en el motor.' },
    documentos: [
      ficha('d1', 'Ficha de homologación · Motor TP-20T', [
        ['pres', 'Presión de admisión', 'Sobrealimentado: el aire entra a mayor presión que la atmosférica'],
        ['turb', 'Accionamiento de la turbina', 'Gases de escape'],
        ['comp', 'Función del compresor', 'Comprime el aire que entra en el motor'],
        ['ic', 'Intercooler', 'Intercambiador de calor que baja la temperatura del aire de admisión'],
        ['obj', 'Objetivo declarado', 'Aumentar la potencia incrementando el caudal (densidad) del aire de admisión'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'atmosferico-con-turbo',
        concepto: 'T1-33',
        ref: 'd1:pres',
        texto: 'Aspiración natural: el aire entra a presión atmosférica',
        pruebas: [elem('rx'), elem('d1:comp'), elem('d1:turb'), regla('T1-33')],
        explicacion: 'El escáner muestra un turbocompresor y la ficha describe su compresor: el motor es sobrealimentado, no de aspiración natural.',
        guia: 'Abre el escáner de rayos X: ¿qué hay en el sistema de admisión?',
        preguntas: [
          explicar('Diferencia un motor de aspiración natural de uno sobrealimentado.', 'En aspiración natural el aire (o la mezcla) entra al cilindro a presión atmosférica; en el sobrealimentado entra a mayor presión, impulsado por un compresor.', [
            'Aspiración natural: a presión atmosférica',
            'Sobrealimentado: a mayor presión, impulsado por un compresor',
          ]),
          localizar('En el escáner sin etiquetas, señala la turbina.', 'X1-05', 'turbina', 'La turbina es la rueda del lado de escape (carcasa oscura con el corte en rojo).'),
        ],
      }),
      disc({
        id: 'turbina-aire',
        concepto: 'T1-34',
        ref: 'd1:turb',
        texto: 'Aire de admisión ya comprimido',
        explicacion: 'La turbina la accionan los GASES DE ESCAPE; la turbina mueve el compresor, que comprime el aire de admisión.',
        guia: 'Revisa qué acciona la turbina.',
        preguntas: [
          explicar('Explica cómo funciona un turbocompresor.', 'Los gases de escape accionan una turbina que, a través de un eje común, mueve un compresor; el compresor comprime el aire que entra en el motor.', [
            'Los gases de escape accionan la turbina',
            'La turbina mueve el compresor',
            'El compresor comprime el aire de admisión',
          ]),
        ],
      }),
      disc({
        id: 'intercooler-calienta',
        concepto: 'T1-34',
        ref: 'd1:ic',
        texto: 'Calentador que eleva la temperatura del aire de admisión para aumentar su presión',
        explicacion: 'El intercooler es un intercambiador de calor que BAJA la temperatura del aire de admisión (así aumenta su densidad).',
        guia: 'Revisa la función del intercooler.',
      }),
      disc({
        id: 'objetivo-densidad',
        concepto: 'T1-33',
        ref: 'd1:obj',
        texto: 'Reducir el consumo disminuyendo la densidad del aire de admisión',
        explicacion: 'El objetivo de la sobrealimentación es aumentar la potencia incrementando el caudal de aire, es decir, su DENSIDAD.',
        guia: 'Revisa el objetivo declarado de la sobrealimentación.',
      }),
    ],
  },

  // ───────────── P3-09 · Plano del motor sobrealimentado (V1-04) ─────────────
  {
    id: 'P3-09',
    conceptos: ['T1-34'],
    solicitante: 'Escuela de Automoción del Bajo Aragón',
    motivo: 'Visado de esquema de sobrealimentación',
    documentos: [
      plano('d1', 'Plano técnico · Esquema de motor sobrealimentado', 'V1-04', [
        ['e1', 'motor', 'Motor'],
        ['e2', 'intercooler', 'Intercooler: enfría el aire de admisión'],
        ['e3', 'compresor', 'Compresor: comprime el aire que entra en el motor'],
        ['e4', 'turbina', 'Turbina: accionada por los gases de escape'],
        ['e5', 'colector_escape', 'Gases de escape del motor hacia la turbina'],
        ['e6', 'entrada_aire', 'Entrada de aire'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'compresor-turbina-cruzados',
        concepto: 'T1-34',
        imagen: 'V1-04',
        ref: 'd1:e3',
        parches: [
          { ref: 'd1:e3', zona: 'turbina' },
          { ref: 'd1:e4', zona: 'compresor' },
        ],
        elementosAceptados: ['d1:e4'],
        explicacion: 'Las etiquetas del compresor y la turbina están cambiadas: la turbina está en el lado al que llegan los gases de escape; el compresor, en el lado por el que entra el aire.',
        guia: 'Sigue el recorrido de los gases de escape: ¿a qué rueda llegan?',
        preguntas: [localizar('Señala la turbina en el esquema sin etiquetas.', 'V1-04', 'turbina', 'La turbina es la rueda a la que llega el conducto de gases de escape (rojo).')],
      }),
      disc({
        id: 'intercooler-calienta',
        concepto: 'T1-34',
        imagen: 'V1-04',
        ref: 'd1:e2',
        texto: 'Intercooler: calienta el aire para aumentar su presión',
        explicacion: 'El intercooler es un intercambiador de calor que BAJA la temperatura del aire de admisión.',
        guia: 'Revisa la etiqueta del intercooler.',
        preguntas: [
          corregir('Corrige la etiqueta del intercooler.', 'Intercooler: intercambiador de calor que baja la temperatura del aire de admisión.', ['Intercambiador de calor', 'Baja la temperatura del aire de admisión']),
          localizar('Señala el intercooler en el esquema sin etiquetas.', 'V1-04', 'intercooler', 'Es el intercambiador situado en el conducto de aire comprimido, entre el compresor y el motor.'),
        ],
      }),
      disc({
        id: 'turbina-aire',
        concepto: 'T1-34',
        imagen: 'V1-04',
        ref: 'd1:e4',
        texto: 'Turbina: accionada por el aire que sale del intercooler',
        explicacion: 'La turbina la accionan los gases de escape.',
        guia: 'Revisa la etiqueta de la turbina.',
      }),
    ],
  },

  // ───────────── P3-10 · Informe sobre la sobrealimentación ─────────────
  {
    id: 'P3-10',
    conceptos: ['T1-33'],
    solicitante: 'Federación de Talleres de Preparación',
    motivo: 'Visado de informe divulgativo sobre sobrealimentación',
    documentos: [
      informe('d1', 'Informe técnico · Presión de admisión', [
        ['f1', 'En un motor de aspiración natural, el aire (o la mezcla aire-combustible) entra al cilindro a presión atmosférica.'],
        ['f2', 'En un motor sobrealimentado entra a mayor presión que la atmosférica, impulsado por un compresor.'],
        '¶',
        ['f3', 'El objetivo de la sobrealimentación es aumentar la potencia del motor incrementando el caudal de aire de admisión, es decir, su densidad.'],
        ['f4', 'Para ello se incrementa la presión (turbocompresor) y se reduce la temperatura (intercooler).'],
      ]),
    ],
    discrepancias: [
      disc({ id: 'atmosferico-mayor', concepto: 'T1-33', ref: 'd1:f1', texto: 'En un motor de aspiración natural, el aire entra al cilindro a una presión superior a la atmosférica.', explicacion: 'En aspiración natural el aire entra a presión ATMOSFÉRICA.', guia: 'Revisa la primera frase.' }),
      disc({
        id: 'objetivo-consumo',
        concepto: 'T1-33',
        ref: 'd1:f3',
        texto: 'El objetivo de la sobrealimentación es reducir la potencia del motor disminuyendo la densidad del aire de admisión.',
        explicacion: 'El objetivo es AUMENTAR la potencia incrementando el caudal (densidad) de aire.',
        guia: 'Revisa el objetivo de la sobrealimentación.',
      }),
      disc({
        id: 'sube-temperatura',
        concepto: 'T1-33',
        ref: 'd1:f4',
        texto: 'Para ello se incrementa la presión (turbocompresor) y también la temperatura del aire (intercooler).',
        explicacion: 'El intercooler REDUCE la temperatura del aire; así aumenta su densidad.',
        guia: 'Revisa qué hace el intercooler con la temperatura.',
        preguntas: [
          explicar('¿Cómo se consigue aumentar la densidad del aire de admisión?', 'Aumentando su presión con el turbocompresor y reduciendo su temperatura con el intercooler.', [
            'Más presión: turbocompresor',
            'Menos temperatura: intercooler',
          ]),
        ],
      }),
    ],
  },

  // ───────────── P3-11 · Ficha: refrigeración por aire con foto (V1-05) ─────────────
  {
    id: 'P3-11',
    conceptos: ['T1-35'],
    solicitante: 'Motocicletas Trail del Moncayo',
    motivo: 'Homologación de motor refrigerado por aire',
    documentos: [
      ficha(
        'd1',
        'Ficha de homologación · Motor TM-250A',
        [
          ['ref', 'Sistema de refrigeración', 'Por aire'],
          ['ele', 'Elementos de refrigeración', 'Aletas en el cilindro que aumentan la transmisión de calor'],
          ['mat', 'Material del bloque', 'Aluminio'],
          ['obs', 'Observaciones', 'Mayor dimensión del motor que con refrigeración por agua'],
        ],
        { foto: { id: 'foto', imagen: 'V1-05', recorte: 'aletas' } },
      ),
    ],
    discrepancias: [
      disc({
        id: 'campo-agua',
        concepto: 'T1-35',
        imagen: 'V1-05',
        ref: 'd1:ref',
        texto: 'Por agua (circuito con bomba y radiador)',
        pruebas: [elem('d1:foto'), elem('d1:ele'), regla('T1-35')],
        explicacion: 'La foto y los elementos declarados (aletas) corresponden a refrigeración por aire.',
        guia: 'Compara el sistema de refrigeración con la fotografía adjunta.',
        preguntas: [
          nombrar('¿Qué sistema de refrigeración muestra la foto y cómo funciona?', 'Refrigeración por aire: el cilindro tiene aletas que aumentan la transmisión de calor.', ['Refrigeración por aire', 'Aletas que aumentan la transmisión de calor']),
        ],
      }),
      disc({
        id: 'foto-radiador',
        concepto: 'T1-35',
        imagen: 'V1-05',
        ref: 'd1:foto',
        parches: [{ ref: 'd1:foto', zona: 'radiador' }],
        elementosAceptados: ['d1:ref', 'd1:ele'],
        pruebas: [elem('d1:ref'), elem('d1:ele'), regla('T1-35')],
        explicacion: 'La foto muestra un radiador (refrigeración por agua), pero la ficha declara refrigeración por aire con aletas.',
        guia: 'Compara la fotografía con el sistema de refrigeración declarado.',
        preguntas: [
          explicar('¿Qué necesita la refrigeración por agua?', 'Cámaras de agua en bloque y culata por las que circula el agua (con aditivos y anticongelante), una bomba de agua y un intercambiador de calor (radiador).', [
            'Cámaras de agua en bloque y culata',
            'Bomba de agua',
            'Radiador (intercambiador de calor)',
          ]),
        ],
      }),
      disc({
        id: 'mas-compacto',
        concepto: 'T1-35',
        ref: 'd1:obs',
        texto: 'Motor más compacto que uno refrigerado por agua',
        explicacion: 'La refrigeración por aire implica MAYOR dimensión del motor.',
        guia: 'Revisa las observaciones sobre el tamaño del motor.',
      }),
    ],
  },

  // ───────────── P3-12 · Ficha: refrigeración por agua con foto (V1-05) ─────────────
  {
    id: 'P3-12',
    conceptos: ['T1-35'],
    solicitante: 'Grupos Electrógenos Cierzo S.A.',
    motivo: 'Homologación de motor refrigerado por agua',
    documentos: [
      ficha(
        'd1',
        'Ficha de homologación · Motor GC-40W',
        [
          ['ref', 'Sistema de refrigeración', 'Por agua (con aditivos y anticongelante)'],
          ['cir', 'Circuito', 'Cámaras de agua en bloque y culata'],
          ['com', 'Componentes', 'Bomba de agua y radiador (intercambiador de calor)'],
        ],
        { foto: { id: 'foto', imagen: 'V1-05', recorte: 'radiador' } },
      ),
    ],
    discrepancias: [
      disc({
        id: 'sin-bomba',
        concepto: 'T1-35',
        ref: 'd1:com',
        texto: 'Aletas en el cilindro; no necesita bomba ni radiador',
        pruebas: [regla('T1-35'), elem('d1:ref'), elem('d1:foto')],
        explicacion: 'La refrigeración por agua necesita bomba de agua e intercambiador de calor (radiador); las aletas son propias de la refrigeración por aire.',
        guia: 'Revisa los componentes de un sistema refrigerado por agua.',
      }),
      disc({
        id: 'foto-aletas',
        concepto: 'T1-35',
        imagen: 'V1-05',
        ref: 'd1:foto',
        parches: [{ ref: 'd1:foto', zona: 'aletas' }],
        elementosAceptados: ['d1:ref', 'd1:com'],
        pruebas: [elem('d1:ref'), elem('d1:com'), regla('T1-35')],
        explicacion: 'La foto muestra un cilindro con aletas (refrigeración por aire), no el radiador de un sistema por agua.',
        guia: 'Compara la fotografía con el sistema de refrigeración declarado.',
        preguntas: [localizar('Señala el elemento de la refrigeración por agua en la imagen sin etiquetas.', 'V1-05', 'radiador', 'El radiador (intercambiador de calor).')],
      }),
    ],
  },

  // ───────────── P3-13 · Ficha: motor en V con escáner (V1-07) ─────────────
  {
    id: 'P3-13',
    conceptos: ['T1-36', 'T1-37'],
    solicitante: 'Deportivos Artesanos de Albacete',
    motivo: 'Homologación de motor de 8 cilindros',
    rayosX: { imagen: 'V1-07', pie: 'Escáner del bloque motor.' },
    documentos: [
      ficha('d1', 'Ficha de homologación · Motor DA-8', [
        ['disp', 'Disposición de cilindros', 'En V'],
        ['ncil', 'Número de cilindros', '8'],
        ['blq', 'Bloques y culatas', 'Dos bloques y dos culatas'],
        ['cig', 'Cigüeñal', 'Uno solo, común a las dos bancadas'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'dice-en-linea',
        concepto: 'T1-36',
        imagen: 'V1-07',
        ref: 'd1:disp',
        texto: 'En línea',
        pruebas: [elem('rx'), elem('d1:blq'), regla('T1-36')],
        explicacion: 'Un motor en línea tiene un solo bloque y una sola culata; la ficha declara dos y el escáner muestra un motor en V.',
        guia: 'Abre el escáner y compara con la disposición declarada.',
        preguntas: [
          nombrar('¿Qué disposición muestra el escáner y qué la caracteriza?', 'Un motor en V: dos bloques y dos culatas con un solo cigüeñal.', ['Motor en V', 'Dos bloques y dos culatas', 'Un solo cigüeñal']),
        ],
      }),
      disc({
        id: 'dos-ciguenales',
        concepto: 'T1-37',
        ref: 'd1:cig',
        texto: 'Dos, uno por bancada',
        pruebas: [regla('T1-37'), elem('d1:disp')],
        explicacion: 'El motor en V tiene dos bloques y dos culatas, pero un SOLO cigüeñal.',
        guia: 'Revisa el número de cigüeñales de un motor en V.',
      }),
      disc({
        id: 'un-bloque',
        concepto: 'T1-37',
        imagen: 'V1-07',
        ref: 'd1:blq',
        texto: 'Un solo bloque y una sola culata',
        pruebas: [regla('T1-37'), elem('d1:disp'), elem('rx')],
        explicacion: 'Un motor en V (no VR) tiene dos bloques y dos culatas.',
        guia: 'Revisa los bloques y culatas de un motor en V.',
        preguntas: [localizar('Señala en el escáner sin etiquetas el ángulo entre bancadas.', 'V1-07', 'angulo', 'Es el esquema de las dos bancadas formando ángulo (60–120° en la figura).')],
      }),
    ],
  },

  // ───────────── P3-14 · Ficha: motor VR con escáner (V1-08) ─────────────
  {
    id: 'P3-14',
    conceptos: ['T1-37'],
    solicitante: 'Motores Compactos de Burgos',
    motivo: 'Homologación de motor VR6',
    rayosX: { imagen: 'V1-08', pie: 'Escáner del bloque.' },
    documentos: [
      ficha('d1', 'Ficha de homologación · Motor MC-VR6', [
        ['disp', 'Disposición de cilindros', 'En VR'],
        ['ncil', 'Número de cilindros', '6'],
        ['ang', 'Ángulo entre cilindros', 'Muy pequeño (menos de 15°)'],
        ['blq', 'Bloque y culata', 'Un único sistema bloque-culata'],
        ['cig', 'Cigüeñal', 'Uno'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'vr-dos-bloques',
        concepto: 'T1-37',
        imagen: 'V1-08',
        ref: 'd1:blq',
        texto: 'Dos bloques y dos culatas independientes',
        pruebas: [regla('T1-37'), elem('rx'), elem('d1:ang')],
        explicacion: 'El ángulo muy pequeño del VR permite emplear un ÚNICO sistema bloque-culata; el escáner muestra un único bloque.',
        guia: 'Abre el escáner: ¿cuántos bloques ves?',
        preguntas: [
          explicar('¿Qué es un motor VR y qué ventaja tiene su ángulo?', 'Es un motor en V con un ángulo entre cilindros muy pequeño (inferior a 15°), lo que permite emplear un único sistema bloque-culata.', [
            'Motor en V con ángulo muy pequeño (< 15°)',
            'Un único sistema bloque-culata',
          ]),
        ],
      }),
      disc({
        id: 'vr-90',
        concepto: 'T1-37',
        ref: 'd1:ang',
        texto: '90°',
        pruebas: [regla('T1-37'), elem('d1:disp'), elem('d1:blq')],
        explicacion: 'En un VR el ángulo entre cilindros es muy pequeño, inferior a 15°.',
        guia: 'Revisa el ángulo declarado para un VR.',
      }),
    ],
  },

  // ───────────── P3-15 · Tabla de disposiciones ─────────────
  {
    id: 'P3-15',
    conceptos: ['T1-36', 'T1-37', 'T1-38'],
    solicitante: 'Editorial Técnica Sierra Norte',
    motivo: 'Aprobación de tabla de disposiciones de cilindros',
    documentos: [
      tabla(
        'd1',
        'Tabla comparativa · Disposición de los cilindros',
        ['Disposición', 'Bloques y culatas', 'Cigüeñal', 'Rasgo principal'],
        [
          ['lin', 'En línea', 'Un bloque y una culata', 'Uno (muy grande por encima de 6 cilindros)', 'La más habitual'],
          ['v', 'En V', 'Dos bloques y dos culatas', 'Uno', 'Por encima de 6 cilindros el cigüeñal puede ser más corto'],
          ['vr', 'En VR', 'Un único sistema bloque-culata', 'Uno', 'V con ángulo muy pequeño (< 15°)'],
          ['w', 'En W', 'Dos bloques VR en una única bancada inferior', 'Uno', 'Dos VR unidos'],
          ['box', 'Bóxer', 'Cilindros opuestos', '—', 'V a 180°: reduce la altura del motor'],
        ],
      ),
    ],
    discrepancias: [
      disc({ id: 'linea-rara', concepto: 'T1-36', ref: 'd1:lin3', texto: 'La menos habitual', explicacion: 'Los motores en línea son los más habituales.', guia: 'Revisa el rasgo principal de los motores en línea.' }),
      disc({ id: 'v-dos-cig', concepto: 'T1-37', ref: 'd1:v2', texto: 'Dos, uno por bancada', explicacion: 'El motor en V tiene un solo cigüeñal.', guia: 'Revisa el cigüeñal del motor en V.' }),
      disc({ id: 'w-tres', concepto: 'T1-38', ref: 'd1:w1', texto: 'Tres bloques en línea, cada uno con su culata', explicacion: 'En el motor en W los cilindros se disponen en dos bloques VR unidos en una única bancada inferior.', guia: 'Revisa los bloques del motor en W.' }),
      disc({
        id: 'boxer-90',
        concepto: 'T1-38',
        ref: 'd1:box3',
        texto: 'V a 90°: reduce la longitud del motor',
        explicacion: 'El bóxer es un motor en V a 180° y su principal ventaja es reducir la ALTURA del motor.',
        guia: 'Revisa el rasgo del bóxer.',
        preguntas: [
          corregir('Corrige el rasgo principal del motor bóxer.', 'Es un motor con los cilindros en V formando un ángulo de 180° (cilindros opuestos); su principal ventaja es reducir la altura del motor.', [
            'V a 180° (cilindros opuestos)',
            'Reduce la altura del motor',
          ]),
        ],
      }),
      disc({ id: 'linea-ciguenal-corto', concepto: 'T1-36', ref: 'd1:lin2', texto: 'Uno, que se acorta al aumentar el número de cilindros', explicacion: 'En línea, por encima de 6 cilindros el cigüeñal es muy grande (problema estructural).', guia: 'Revisa el cigüeñal del motor en línea.' }),
    ],
  },

  // ───────────── P3-16 · Plano del motor en línea (V1-06) ─────────────
  {
    id: 'P3-16',
    conceptos: ['T1-36'],
    solicitante: 'Restauraciones Clásicas del Pisuerga',
    motivo: 'Visado de plano de motor de seis cilindros en línea',
    documentos: [
      plano('d1', 'Plano técnico · Motor de seis cilindros en línea', 'V1-06', [
        ['e1', 'numeracion', 'Seis cilindros en fila: un solo bloque y una sola culata'],
        ['e2', 'arbol_levas', 'Árbol de levas'],
        ['e3', 'cilindros', 'Cilindros y pistones'],
        ['e4', 'ciguenal', 'Cigüeñal (muy largo por encima de 6 cilindros)'],
        ['e5', 'carter', 'Cárter'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'linea-dos-bloques',
        concepto: 'T1-36',
        imagen: 'V1-06',
        ref: 'd1:e1',
        texto: 'Seis cilindros en fila: dos bloques y dos culatas',
        explicacion: 'Un motor en línea tiene un solo bloque y una sola culata.',
        guia: 'Revisa la etiqueta del esquema de cilindros.',
        preguntas: [
          explicar('¿Qué caracteriza a un motor en línea?', 'Es la disposición más habitual: un solo bloque y una sola culata; por encima de 6 cilindros el cigüeñal es muy grande (problema estructural).', [
            'Un solo bloque y una sola culata',
            'La más habitual',
            'Más de 6 cilindros: cigüeñal muy grande',
          ]),
        ],
      }),
      disc({
        id: 'ciguenal-mal-sitio',
        concepto: 'T1-36',
        imagen: 'V1-06',
        ref: 'd1:e4',
        parches: [{ ref: 'd1:e4', zona: 'arbol_levas' }],
        explicacion: 'La etiqueta del cigüeñal señala el árbol de levas. El cigüeñal está en la parte baja, unido a las bielas.',
        guia: 'Comprueba a qué pieza apunta cada etiqueta.',
        preguntas: [localizar('Señala el cigüeñal en el plano sin etiquetas.', 'V1-06', 'ciguenal', 'El cigüeñal está bajo los cilindros, unido a las bielas.')],
      }),
    ],
  },

  // ───────────── P3-17 · Plano del motor en V (V1-07) ─────────────
  {
    id: 'P3-17',
    conceptos: ['T1-37'],
    solicitante: 'Oficina Técnica Hidalgo e Hijos',
    motivo: 'Visado de plano de motor en V',
    documentos: [
      plano('d1', 'Plano técnico · Motor en V', 'V1-07', [
        ['e1', 'numeracion', 'Cilindros repartidos en dos bancadas'],
        ['e2', 'angulo', 'Ángulo entre bancadas (60–120° en la figura)'],
        ['e3', 'esquema', 'Dos bancadas de cilindros sobre un único cigüeñal'],
        ['e4', 'motor', 'Motor en V: dos bloques y dos culatas'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'v-dos-ciguenales',
        concepto: 'T1-37',
        imagen: 'V1-07',
        ref: 'd1:e3',
        texto: 'Dos bancadas de cilindros, cada una con su propio cigüeñal',
        explicacion: 'El motor en V tiene dos bloques y dos culatas, pero un solo cigüeñal.',
        guia: 'Revisa la etiqueta del esquema.',
        preguntas: [localizar('Señala en el plano sin etiquetas el ángulo que forman las bancadas.', 'V1-07', 'angulo', 'El esquema superior con las dos bielas formando ángulo.')],
      }),
      disc({
        id: 'v-un-bloque',
        concepto: 'T1-37',
        imagen: 'V1-07',
        ref: 'd1:e4',
        texto: 'Motor en V: un único sistema bloque-culata',
        explicacion: 'El único bloque-culata es propio del VR; el motor en V tiene dos bloques y dos culatas.',
        guia: 'Revisa la etiqueta del motor completo.',
      }),
    ],
  },

  // ───────────── P3-18 · Plano del motor VR (V1-08) ─────────────
  {
    id: 'P3-18',
    conceptos: ['T1-37'],
    solicitante: 'Motores Compactos de Burgos',
    motivo: 'Visado de plano de bloque VR',
    documentos: [
      plano('d1', 'Plano técnico · Motor VR', 'V1-08', [
        ['e1', 'numeracion', 'Seis cilindros escalonados'],
        ['e2', 'angulo', 'Ángulo muy pequeño entre cilindros'],
        ['e3', 'bloque', 'Único sistema bloque-culata'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'vr-dos-bloques',
        concepto: 'T1-37',
        imagen: 'V1-08',
        ref: 'd1:e3',
        texto: 'Dos bloques independientes, uno por bancada',
        explicacion: 'El VR, gracias a su ángulo muy pequeño, usa un único sistema bloque-culata.',
        guia: 'Revisa la etiqueta del bloque.',
        preguntas: [localizar('Señala el bloque único del VR en el plano sin etiquetas.', 'V1-08', 'bloque', 'El bloque fotografiado a la derecha.')],
      }),
      disc({
        id: 'vr-angulo-grande',
        concepto: 'T1-37',
        imagen: 'V1-08',
        ref: 'd1:e2',
        texto: 'Ángulo de 90° entre cilindros',
        explicacion: 'En el VR el ángulo entre cilindros es muy pequeño, inferior a 15°.',
        guia: 'Revisa la etiqueta del ángulo.',
      }),
    ],
  },

  // ───────────── P3-19 · Plano del motor en W (V1-09) ─────────────
  {
    id: 'P3-19',
    conceptos: ['T1-38'],
    solicitante: 'Gran Turismo de la Ribera S.A.',
    motivo: 'Visado de plano de motor W12',
    documentos: [
      plano('d1', 'Plano técnico · Motor en W', 'V1-09', [
        ['e1', 'numeracion', 'Doce cilindros en dos bloques VR'],
        ['e2', 'angulo', 'Ángulos entre los bloques VR y dentro de cada VR'],
        ['e3', 'motor', 'Motor en W: única bancada inferior con un único cigüeñal'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'w-dos-ciguenales',
        concepto: 'T1-38',
        imagen: 'V1-09',
        ref: 'd1:e3',
        texto: 'Motor en W: dos bancadas inferiores, cada una con su cigüeñal',
        explicacion: 'En el motor en W los dos bloques VR se unen en una ÚNICA bancada inferior con un ÚNICO cigüeñal.',
        guia: 'Revisa la etiqueta del motor completo.',
        preguntas: [
          explicar('Describe un motor en W.', 'Los cilindros se disponen en dos bloques VR unidos en una única bancada inferior donde hay un único cigüeñal.', [
            'Dos bloques VR',
            'Una única bancada inferior',
            'Un único cigüeñal',
          ]),
        ],
      }),
      disc({
        id: 'w-bloques-linea',
        concepto: 'T1-38',
        imagen: 'V1-09',
        ref: 'd1:e1',
        texto: 'Doce cilindros en dos bloques en línea separados',
        explicacion: 'Los cilindros del motor en W se agrupan en dos bloques VR.',
        guia: 'Revisa la etiqueta del esquema de cilindros.',
        preguntas: [localizar('Señala en el plano sin etiquetas el esquema de numeración de los cilindros.', 'V1-09', 'numeracion', 'Es el esquema superior izquierdo con los cilindros numerados del 1 al 12.')],
      }),
    ],
  },

  // ───────────── P3-20 · Plano del motor bóxer (V1-10) ─────────────
  {
    id: 'P3-20',
    conceptos: ['T1-38'],
    solicitante: 'Motos de Gran Turismo del Sella',
    motivo: 'Visado de plano de motor de cilindros opuestos',
    documentos: [
      plano('d1', 'Plano técnico · Motor bóxer', 'V1-10', [
        ['e1', 'esquema', 'Cilindros opuestos'],
        ['e2', 'angulo', 'Ángulo de 180° entre cilindros'],
        ['e3', 'motor', 'Motor bóxer: su principal ventaja es reducir la altura del motor'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'boxer-60',
        concepto: 'T1-38',
        imagen: 'V1-10',
        ref: 'd1:e2',
        texto: 'Ángulo de 60° entre cilindros',
        explicacion: 'El bóxer es un motor en V con los cilindros formando 180°.',
        guia: 'Revisa la etiqueta del ángulo.',
        preguntas: [localizar('Señala en el plano sin etiquetas el detalle que muestra el ángulo de 180°.', 'V1-10', 'angulo', 'Es el pequeño esquema con los dos cilindros enfrentados y la flecha de 180°.')],
      }),
      disc({
        id: 'boxer-longitud',
        concepto: 'T1-38',
        imagen: 'V1-10',
        ref: 'd1:e3',
        texto: 'Motor bóxer: su principal ventaja es reducir la longitud del cigüeñal',
        explicacion: 'La principal ventaja del bóxer es reducir la ALTURA del motor.',
        guia: 'Revisa la etiqueta del motor completo.',
      }),
    ],
  },

  // ───────────── P3-21 · Ficha 2T con escáner (V1-02) ─────────────
  {
    id: 'P3-21',
    conceptos: ['T1-17', 'T1-26', 'T1-28'],
    solicitante: 'Fueraborda Ría de Arousa',
    motivo: 'Homologación de motor fueraborda de dos tiempos',
    rayosX: { imagen: 'V1-02', pie: 'Escáner del cilindro y el cárter.' },
    documentos: [
      ficha('d1', 'Ficha de homologación · Motor RA-2T-30', [
        ['ciclo', 'Renovación de la carga', '2 tiempos'],
        ['ren', 'Elementos de renovación', 'Lumbreras de admisión, transferencia y escape'],
        ['pre', 'Depósito de preadmisión', 'Cárter sellado'],
        ['apl', 'Aplicación', 'Motor fueraborda (gasolina, 300 cc)'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'fueraborda-valvulas',
        concepto: 'T1-26',
        imagen: 'V1-02',
        ref: 'd1:ren',
        texto: 'Válvulas de admisión y escape accionadas por árbol de levas',
        pruebas: [elem('rx'), regla('T1-26'), elem('d1:ciclo')],
        explicacion: 'El escáner muestra lumbreras en el cilindro y ninguna válvula: en el 2T las válvulas se sustituyen por lumbreras.',
        guia: 'Abre el escáner: ¿hay válvulas en la culata?',
        preguntas: [localizar('En el escáner sin etiquetas, señala la lumbrera de carga (transferencia).', 'V1-02', 'lumbrera_carga', 'Es el conducto lateral izquierdo que comunica el cárter con el cilindro.')],
      }),
      disc({
        id: 'fueraborda-grande',
        concepto: 'T1-28',
        ref: 'd1:apl',
        texto: 'Motor fueraborda (gasolina, 2.500 cc, gran potencia)',
        explicacion: 'El 2T de gasolina se aplica a pequeñas potencias y cilindradas, por debajo de 350 cc.',
        guia: 'Revisa la cilindrada declarada para un 2T de gasolina.',
      }),
    ],
  },
];
