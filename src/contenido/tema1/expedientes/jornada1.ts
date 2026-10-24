// Jornada 1 · T1-01 … T1-15: concepto de MCIA, ventajas, inconvenientes, aplicaciones,
// criterios de clasificación y proceso de combustión (MEP/MEC).
// Cada plantilla trae los datos CORRECTOS (según los apuntes) y las discrepancias que se pueden plantar.
import type { PlantillaExpediente } from '../../../motor/tipos';
import { corregir, disc, elem, explicar, ficha, glosario, informe, localizar, manifiesto, nombrar, plano, regla, tabla } from '../../constructores';

export const plantillasJornada1: PlantillaExpediente[] = [
  // ───────────── P1-01 · Glosario: definiciones de partida ─────────────
  {
    id: 'P1-01',
    conceptos: ['T1-01', 'T1-02', 'T1-03', 'T1-04'],
    solicitante: 'Escuela de Formación Profesional «Ribera del Tajo»',
    motivo: 'Aprobación de glosario oficial para material docente',
    documentos: [
      glosario('d1', 'Glosario oficial · Conceptos previos', [
        ['motor', 'Motor', 'Aparato que transforma en trabajo mecánico cualquier otra forma de energía.'],
        ['comb', 'Motor de combustión', 'Motor que utiliza energía térmica: transforma energía térmica en energía mecánica.'],
        ['interna', 'Combustión interna', 'Se da cuando el estado térmico se genera en el propio fluido motor.'],
        ['alt', 'Motor alternativo', 'Motor de combustión interna en el que la transmisión de trabajo se realiza mediante el desplazamiento lineal de un émbolo.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'motor-al-reves',
        concepto: 'T1-01',
        ref: 'd1:motor',
        texto: 'Aparato que transforma el trabajo mecánico en cualquier otra forma de energía.',
        explicacion: 'La definición está invertida: un motor transforma OTRA energía EN trabajo mecánico, no al revés.',
        guia: 'Lee la definición de «Motor» y compara el sentido de la transformación con la regla T1-01.',
        preguntas: [
          corregir(
            'Corrige la definición de motor del glosario.',
            'Un motor es un aparato que transforma en trabajo mecánico cualquier otra forma de energía.',
            ['Produce trabajo mecánico (es el resultado, no el origen)', 'A partir de cualquier otra forma de energía'],
          ),
        ],
      }),
      disc({
        id: 'comb-electrica',
        concepto: 'T1-02',
        ref: 'd1:comb',
        texto: 'Motor que utiliza energía eléctrica: transforma energía eléctrica en energía mecánica.',
        explicacion: 'Un motor de combustión utiliza energía TÉRMICA, no eléctrica.',
        guia: 'Fíjate en qué energía dice el glosario que utiliza un motor de combustión.',
      }),
      disc({
        id: 'interna-externa',
        concepto: 'T1-03',
        ref: 'd1:interna',
        texto: 'Se da cuando el estado térmico se genera fuera del fluido motor y se le transmite a través de una pared.',
        explicacion: 'Eso describiría una combustión externa: en la interna el estado térmico se genera en el propio fluido motor.',
        guia: 'Compara DÓNDE se genera el estado térmico según el glosario y según la regla T1-03.',
        preguntas: [
          corregir(
            'Corrige la definición de combustión interna.',
            'Un motor es de combustión interna cuando el estado térmico se genera en el propio fluido motor.',
            ['Se refiere a dónde se genera el estado térmico', 'En el propio fluido motor (no fuera de él)'],
          ),
        ],
      }),
      disc({
        id: 'alt-rotor',
        concepto: 'T1-04',
        ref: 'd1:alt',
        texto: 'Motor de combustión interna en el que la transmisión de trabajo se realiza mediante el giro continuo de un rotor.',
        explicacion: 'En un motor alternativo el trabajo se transmite por el desplazamiento LINEAL de un ÉMBOLO, no por el giro de un rotor.',
        guia: 'Mira cómo se transmite el trabajo según la definición de «Motor alternativo».',
      }),
    ],
  },

  // ───────────── P1-02 · Glosario: términos de clasificación ─────────────
  {
    id: 'P1-02',
    conceptos: ['T1-01', 'T1-03', 'T1-14', 'T1-15'],
    solicitante: 'Asociación de Mecánicos del Valle',
    motivo: 'Registro de glosario técnico para cursos de reciclaje',
    documentos: [
      glosario('d1', 'Glosario oficial · Términos básicos de MCIA', [
        ['motor', 'Motor', 'Aparato que transforma en trabajo mecánico cualquier otra forma de energía.'],
        ['interna', 'Interna (combustión)', 'El estado térmico se genera en el propio fluido motor.'],
        ['mep', 'MEP', 'Motor de encendido provocado (gasolina u Otto): la combustión la origina un agente externo, normalmente la chispa de una bujía, que inflama la mezcla aire-combustible.'],
        ['mec', 'MEC', 'Motor de encendido por compresión (diésel): el aire sufre una fuerte compresión que garantiza la autoinflamación del combustible en el momento de la inyección.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'motor-solo-electrica',
        concepto: 'T1-01',
        ref: 'd1:motor',
        texto: 'Aparato que transforma en trabajo mecánico únicamente la energía eléctrica.',
        explicacion: 'Un motor transforma en trabajo mecánico CUALQUIER otra forma de energía, no solo la eléctrica.',
        guia: 'Compara la definición de «Motor» con la regla T1-01: ¿qué energías puede transformar?',
      }),
      disc({
        id: 'interna-caldera',
        concepto: 'T1-03',
        ref: 'd1:interna',
        texto: 'El estado térmico se genera en una caldera separada y se cede después al fluido motor.',
        explicacion: 'Si el calor se genera en una caldera separada la combustión no es interna: debe generarse en el propio fluido motor.',
      }),
      disc({
        id: 'mep-autoinflamacion',
        concepto: 'T1-14',
        ref: 'd1:mep',
        texto: 'Motor de encendido provocado (gasolina u Otto): el combustible se autoinflama al inyectarse en el aire fuertemente comprimido, sin agente externo.',
        explicacion: 'En el MEP la combustión la origina un agente externo (la chispa de la bujía). La autoinflamación por compresión es propia del MEC.',
        guia: 'Lee cómo empieza la combustión según la entrada «MEP» y compárala con la regla T1-14.',
        preguntas: [
          corregir(
            'Corrige la entrada «MEP»: ¿cómo se inicia la combustión?',
            'En el MEP la combustión la origina un agente externo, usualmente una chispa provocada por una bujía, que inflama la mezcla aire-combustible.',
            ['Agente externo', 'Chispa de la bujía que inflama la mezcla aire-combustible'],
          ),
        ],
      }),
      disc({
        id: 'mec-chispa',
        concepto: 'T1-15',
        ref: 'd1:mec',
        texto: 'Motor de encendido por compresión (diésel): la combustión la origina la chispa de una bujía que inflama la mezcla aire-combustible.',
        explicacion: 'En el MEC no hay chispa: el aire se comprime fuertemente y el combustible se autoinflama al inyectarse.',
        guia: 'Lee la entrada «MEC». ¿Qué inicia la combustión en un motor de encendido por compresión?',
      }),
    ],
  },

  // ───────────── P1-03 · Manifiesto: cadena de conversión de energía ─────────────
  {
    id: 'P1-03',
    conceptos: ['T1-01', 'T1-02', 'T1-03', 'T1-04'],
    solicitante: 'Laboratorio de Ensayos Térmicos «Meseta»',
    motivo: 'Validación del manifiesto de funcionamiento de un MCIA',
    documentos: [
      manifiesto(
        'd1',
        'Manifiesto de secuencia · Conversión de energía en un MCIA',
        [
          ['p1', 'El combustible se quema dentro del propio fluido motor, en el cilindro.'],
          ['p2', 'La combustión libera energía térmica en el fluido motor.'],
          ['p3', 'El fluido motor empuja el émbolo, que se desplaza linealmente.'],
          ['p4', 'El desplazamiento del émbolo transmite trabajo mecánico al exterior.'],
        ],
        { intro: 'Secuencia declarada por el fabricante para un motor de combustión interna alternativo:' },
      ),
    ],
    discrepancias: [
      disc({
        id: 'hogar-exterior',
        concepto: 'T1-03',
        ref: 'd1:p1',
        texto: 'El combustible se quema en un hogar exterior y el calor pasa al fluido motor a través de una pared.',
        explicacion: 'En un motor de combustión interna el estado térmico se genera en el propio fluido motor, no en un hogar exterior.',
        guia: 'Revisa el paso 1: ¿dónde se quema el combustible?',
      }),
      disc({
        id: 'energia-electrica',
        concepto: 'T1-02',
        ref: 'd1:p2',
        texto: 'La combustión libera energía eléctrica en el fluido motor.',
        explicacion: 'La combustión proporciona energía térmica; un motor de combustión transforma energía térmica en mecánica.',
        guia: 'Revisa el paso 2: ¿qué tipo de energía aprovecha un motor de combustión?',
      }),
      disc({
        id: 'rotor-continuo',
        concepto: 'T1-04',
        ref: 'd1:p3',
        texto: 'El fluido motor hace girar un rotor de forma continua, sin émbolo.',
        explicacion: 'En un motor alternativo el trabajo se transmite mediante el desplazamiento lineal de un émbolo.',
        guia: 'Revisa el paso 3 frente a la definición de motor alternativo (T1-04).',
        preguntas: [
          explicar(
            '¿Qué hace que un motor de combustión interna sea alternativo?',
            'Que la transmisión de trabajo se realiza mediante el desplazamiento lineal de un émbolo.',
            ['Transmisión del trabajo', 'Desplazamiento lineal de un émbolo'],
          ),
        ],
      }),
    ],
  },

  // ───────────── P1-04 · Manifiesto: encendido de un MEC ─────────────
  {
    id: 'P1-04',
    conceptos: ['T1-15'],
    solicitante: 'Transportes Hermanos Quintana',
    motivo: 'Homologación de la secuencia de encendido de un motor diésel',
    documentos: [
      manifiesto(
        'd1',
        'Manifiesto de secuencia · Encendido de un MEC (diésel)',
        [
          ['p1', 'Entra aire en el cilindro.'],
          ['p2', 'El pistón somete el aire a una fuerte compresión.'],
          ['p3', 'Se inyecta el combustible (gasóleo).'],
          ['p4', 'El combustible se autoinflama en el momento de la inyección.'],
          ['p5', 'Los gases de la combustión empujan el émbolo.'],
        ],
        { intro: 'Motor de encendido por compresión para camión de reparto.' },
      ),
    ],
    discrepancias: [
      disc({
        id: 'mec-bujia',
        concepto: 'T1-15',
        ref: 'd1:p4',
        texto: 'Salta la chispa de la bujía, que inflama la mezcla.',
        explicacion: 'En un MEC no hay chispa: el combustible se autoinflama al inyectarse en el aire fuertemente comprimido.',
        guia: 'Revisa el paso 4: ¿qué provoca la combustión en un motor de encendido por compresión?',
        preguntas: [
          corregir(
            'Corrige el paso 4 del manifiesto.',
            'El combustible se autoinflama en el momento de la inyección, gracias a la fuerte compresión del aire; no hay chispa.',
            ['Autoinflamación del combustible', 'En el momento de la inyección, por la fuerte compresión del aire (sin chispa)'],
          ),
        ],
      }),
      disc({
        id: 'mec-compresion-ligera',
        concepto: 'T1-15',
        ref: 'd1:p2',
        texto: 'El pistón comprime ligeramente el aire, sin elevar apenas su temperatura.',
        explicacion: 'En el MEC el aire sufre una FUERTE compresión, que es la que garantiza la autoinflamación del combustible.',
        guia: 'Revisa el paso 2: ¿cómo es la compresión del aire en un MEC?',
      }),
    ],
  },

  // ───────────── P1-05 · Manifiesto: encendido de un MEP ─────────────
  {
    id: 'P1-05',
    conceptos: ['T1-14'],
    solicitante: 'Motos Clásicas Peñalara',
    motivo: 'Homologación de la secuencia de encendido de un motor de gasolina',
    documentos: [
      manifiesto(
        'd1',
        'Manifiesto de secuencia · Encendido de un MEP (gasolina)',
        [
          ['p1', 'Se forma la mezcla aire-combustible (gasolina).'],
          ['p2', 'El pistón comprime la mezcla.'],
          ['p3', 'La bujía provoca una chispa (agente externo).'],
          ['p4', 'La chispa inflama la mezcla aire-combustible.'],
          ['p5', 'Los gases de la combustión empujan el émbolo.'],
        ],
        { intro: 'Motor de encendido provocado para motocicleta de calle.' },
      ),
    ],
    discrepancias: [
      disc({
        id: 'mep-sin-chispa',
        concepto: 'T1-14',
        ref: 'd1:p3',
        texto: 'No interviene ningún agente externo: la mezcla se autoinflama por la propia compresión.',
        explicacion: 'En el MEP la combustión la origina un agente externo, usualmente la chispa de una bujía.',
        guia: 'Revisa el paso 3: en un motor de encendido PROVOCADO, ¿quién provoca la combustión?',
      }),
      disc({
        id: 'mep-inflama-calor',
        concepto: 'T1-14',
        ref: 'd1:p4',
        texto: 'La mezcla se autoinflama por la temperatura del aire comprimido, sin necesidad de la chispa.',
        explicacion: 'La autoinflamación es propia del MEC; en el MEP la chispa de la bujía inflama la mezcla.',
        preguntas: [
          corregir(
            'Corrige el paso 4 del manifiesto.',
            'La chispa provocada por la bujía (agente externo) inflama la mezcla aire-combustible.',
            ['La chispa de la bujía (agente externo)', 'Inflama la mezcla aire-combustible'],
          ),
        ],
      }),
    ],
  },

  // ───────────── P1-06 · Ficha: MEP de automóvil ─────────────
  {
    id: 'P1-06',
    conceptos: ['T1-08', 'T1-12', 'T1-14'],
    solicitante: 'Motores Ibéricos del Henares S.A.',
    motivo: 'Homologación de motor para automóvil de turismo',
    documentos: [
      ficha('d1', 'Ficha de homologación · Motor IH-16', [
        ['fab', 'Fabricante', 'Motores Ibéricos del Henares S.A.'],
        ['apl', 'Aplicación', 'Transporte por carretera (automóvil de turismo)'],
        ['proc', 'Proceso de combustión', 'MEP · encendido provocado'],
        ['comb', 'Combustible', 'Gasolina'],
        ['enc', 'Inicio de la combustión', 'Chispa de bujía que inflama la mezcla aire-combustible'],
        ['pot', 'Potencia', '85 kW'],
        ['obs', 'Observaciones', 'Diseño modular: la misma base se homologa en tres potencias.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'mep-autoinflamacion',
        concepto: 'T1-14',
        ref: 'd1:enc',
        texto: 'Autoinflamación del combustible por compresión (sin bujía)',
        pruebas: [regla('T1-14'), elem('d1:proc')],
        explicacion: 'La ficha declara un MEP: la combustión la origina un agente externo (la chispa de la bujía), no la autoinflamación.',
        guia: 'Compara el campo «Inicio de la combustión» con el campo «Proceso de combustión» (o con la regla T1-14).',
      }),
      disc({
        id: 'no-modular',
        concepto: 'T1-08',
        ref: 'd1:obs',
        texto: 'Los MCIA no son modulares: cada potencia exige un diseño completamente distinto.',
        explicacion: 'La modularidad es una ventaja de los MCIA: un mismo diseño sirve para distintas potencias.',
        guia: 'Lee las observaciones y compáralas con la regla de la modularidad (T1-08).',
        preguntas: [
          explicar(
            '¿Qué significa que los MCIA sean modulares?',
            'Que un mismo diseño sirve para obtener distintas potencias.',
            ['Un mismo diseño', 'Distintas potencias'],
          ),
        ],
      }),
    ],
  },

  // ───────────── P1-07 · Ficha: MEC de maquinaria agrícola ─────────────
  {
    id: 'P1-07',
    conceptos: ['T1-12', 'T1-15'],
    solicitante: 'Agromotor Campo de Montiel S.L.',
    motivo: 'Homologación de motor para tractor agrícola',
    documentos: [
      ficha('d1', 'Ficha de homologación · Motor AM-110', [
        ['fab', 'Fabricante', 'Agromotor Campo de Montiel S.L.'],
        ['apl', 'Aplicación', 'Maquinaria agrícola (tractor)'],
        ['proc', 'Proceso de combustión', 'MEC · encendido por compresión'],
        ['comb', 'Combustible', 'Diésel / biodiésel'],
        ['enc', 'Inicio de la combustión', 'Autoinflamación del combustible al inyectarse en el aire fuertemente comprimido'],
        ['pot', 'Potencia', '110 kW'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'mec-chispa',
        concepto: 'T1-15',
        ref: 'd1:enc',
        texto: 'Chispa de bujía que inflama la mezcla aire-combustible',
        pruebas: [regla('T1-15'), elem('d1:proc')],
        explicacion: 'Un MEC no tiene chispa: el combustible se autoinflama gracias a la fuerte compresión del aire.',
        guia: 'Compara el campo «Inicio de la combustión» con el campo «Proceso de combustión» (o con la regla T1-15).',
        preguntas: [
          corregir(
            'Corrige el campo «Inicio de la combustión».',
            'Autoinflamación del combustible en el momento de la inyección, gracias a la fuerte compresión del aire.',
            ['Autoinflamación del combustible', 'Por la fuerte compresión del aire, al inyectarlo'],
          ),
        ],
      }),
      disc({
        id: 'mec-gasolina',
        concepto: 'T1-15',
        ref: 'd1:comb',
        texto: 'Gasolina / GLP',
        pruebas: [regla('T1-15'), regla('T1-14'), elem('d1:proc')],
        explicacion: 'Gasolina y GLP son combustibles de MEP; un MEC usa diésel, biodiésel…',
        guia: 'Compara el combustible con el proceso de combustión declarado.',
        preguntas: [
          nombrar(
            '¿Qué combustibles usa un MEC según el temario?',
            'Diésel (gasóleo) y biodiésel, entre otros.',
            ['Diésel', 'Biodiésel'],
          ),
        ],
      }),
    ],
  },

  // ───────────── P1-08 · Ficha: MEP de grupo electrógeno ─────────────
  {
    id: 'P1-08',
    conceptos: ['T1-12', 'T1-14'],
    solicitante: 'Energía de Emergencia del Sur S.L.',
    motivo: 'Homologación de grupo electrógeno portátil',
    documentos: [
      ficha('d1', 'Ficha de homologación · Grupo GE-8', [
        ['fab', 'Fabricante', 'Energía de Emergencia del Sur S.L.'],
        ['apl', 'Aplicación', 'Grupo generador de energía eléctrica (baja potencia)'],
        ['proc', 'Proceso de combustión', 'MEP · encendido provocado'],
        ['comb', 'Combustible', 'GLP'],
        ['enc', 'Inicio de la combustión', 'Chispa de bujía'],
        ['pot', 'Potencia', '8 kW'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'mep-gasoleo',
        concepto: 'T1-14',
        ref: 'd1:comb',
        texto: 'Gasóleo',
        pruebas: [regla('T1-14'), regla('T1-15'), elem('d1:proc'), elem('d1:enc')],
        explicacion: 'El gasóleo (diésel) es combustible de MEC. Un MEP usa gasolina, GN, GLP, bioetanol…',
        guia: 'Compara el combustible con el proceso de combustión declarado (regla T1-14).',
        preguntas: [
          nombrar(
            'Cita los combustibles de un MEP según el temario.',
            'Gasolina, gas natural (GN), gas licuado del petróleo (GLP) y bioetanol, entre otros.',
            ['Gasolina', 'GN y GLP', 'Bioetanol'],
          ),
        ],
      }),
    ],
  },

  // ───────────── P1-09 · Informe técnico: ventajas e inconvenientes ─────────────
  {
    id: 'P1-09',
    conceptos: ['T1-05', 'T1-06', 'T1-07', 'T1-08', 'T1-09', 'T1-10', 'T1-11'],
    solicitante: 'Consultora Técnica Alcántara',
    motivo: 'Visado de informe técnico sobre MCIA',
    documentos: [
      informe('d1', 'Informe técnico · Balance de los MCIA', [
        ['f1', 'Los MCIA emplean combustibles líquidos de elevado poder calorífico, algo muy importante en automoción porque condiciona la autonomía del vehículo.'],
        ['f2', 'Su rendimiento térmico es bueno, con valores que varían con el régimen de carga y con el régimen de giro.'],
        ['f3', 'Cubren un campo de potencias muy amplio, desde 0,1 kW hasta valores superiores a 32 MW.'],
        ['f4', 'Un mismo diseño puede ofrecerse en distintas potencias (modularidad)'],
        ['f5', 'y admiten disposiciones constructivas muy variadas.'],
        '¶',
        ['f6', 'Como inconveniente, contaminan: emiten CO2, NOx, SO2, CO, HC y partículas.'],
        ['f7', 'Además, el precio del petróleo y su posible carencia futura obligan a optimizar la combustión y a buscar nuevos combustibles.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'bajo-poder-calorifico',
        concepto: 'T1-05',
        ref: 'd1:f1',
        texto: 'Los MCIA emplean combustibles gaseosos de bajo poder calorífico, lo que en automoción limita poco la autonomía del vehículo.',
        explicacion: 'Los MCIA usan combustibles LÍQUIDOS de ELEVADO poder calorífico; precisamente eso condiciona la autonomía.',
        guia: 'Lee la primera frase y compárala con la ventaja de los combustibles (T1-05).',
      }),
      disc({
        id: 'rendimiento-constante',
        concepto: 'T1-06',
        ref: 'd1:f2',
        texto: 'Su rendimiento térmico es constante: no depende ni del régimen de carga ni del régimen de giro.',
        explicacion: 'El rendimiento térmico de los MCIA varía con el régimen de carga y con el régimen de giro.',
        guia: 'Busca la frase sobre el rendimiento térmico.',
        preguntas: [
          corregir(
            'Corrige la frase sobre el rendimiento térmico.',
            'El rendimiento térmico de los MCIA es bueno, con valores que varían con el régimen de carga y con el régimen de giro.',
            ['Buen rendimiento térmico', 'Varía con el régimen de carga y con el régimen de giro'],
          ),
        ],
      }),
      disc({
        id: 'potencias-estrechas',
        concepto: 'T1-07',
        ref: 'd1:f3',
        texto: 'Solo se fabrican en un campo estrecho de potencias, entre 10 kW y 500 kW.',
        explicacion: 'Los MCIA cubren desde 0,1 kW hasta más de 32 MW: un campo de potencias muy amplio.',
        guia: 'Busca la frase sobre el campo de potencias (T1-07).',
      }),
      disc({
        id: 'disposicion-unica',
        concepto: 'T1-09',
        ref: 'd1:f5',
        texto: 'pero exigen una única disposición constructiva, sin margen para innovar en el diseño.',
        explicacion: 'Los MCIA permiten disposiciones constructivas muy variadas, con innovación en disposición y diseño.',
        guia: 'Lee lo que dice el informe sobre las disposiciones constructivas (T1-09).',
      }),
      disc({
        id: 'sin-nox',
        concepto: 'T1-10',
        ref: 'd1:f6',
        texto: 'Como ventaja adicional, no emiten NOx ni partículas.',
        explicacion: 'La contaminación es un inconveniente de los MCIA, y entre sus contaminantes están los NOx y las partículas.',
        guia: 'Revisa la frase sobre las emisiones (T1-10).',
      }),
      disc({
        id: 'petroleo-sin-problema',
        concepto: 'T1-11',
        ref: 'd1:f7',
        texto: 'Además, el precio del petróleo y su disponibilidad no plantean ningún problema, por lo que no es necesario buscar nuevos combustibles.',
        explicacion: 'El precio del petróleo y su posible carencia SON un inconveniente que obliga a optimizar la combustión y buscar nuevos combustibles.',
        guia: 'Revisa la última frase frente a la regla T1-11.',
      }),
    ],
  },

  // ───────────── P1-10 · Informe técnico: inconvenientes y futuro ─────────────
  {
    id: 'P1-10',
    conceptos: ['T1-10', 'T1-11'],
    solicitante: 'Observatorio de Movilidad Sostenible',
    motivo: 'Visado de informe sobre el futuro de los MCIA',
    documentos: [
      informe('d1', 'Informe técnico · Inconvenientes de los MCIA y respuestas del sector', [
        ['f1', 'Entre los inconvenientes de los MCIA está la contaminación: CO2, NOx, SO2, CO, HC y partículas.'],
        ['f2', 'Otro inconveniente es el combustible: el precio del petróleo y su posible carencia a medio-largo plazo.'],
        '¶',
        ['f3', 'Ello obliga a optimizar los procesos de combustión, mejorando el rendimiento.'],
        ['f4', 'También impulsa la búsqueda de nuevos combustibles: biocombustibles, H2, GNC y GNL.'],
        ['f5', 'Y ha provocado la aparición de nuevas tecnologías aplicables al sector, como los motores eléctricos y los híbridos.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'no-contaminan',
        concepto: 'T1-10',
        ref: 'd1:f1',
        texto: 'Los MCIA no presentan problemas de contaminación: sus gases de escape son inocuos.',
        explicacion: 'La contaminación (CO2, NOx, SO2, CO, HC, partículas) es uno de los inconvenientes de los MCIA.',
        guia: 'Lee la primera frase y compárala con la regla T1-10.',
        preguntas: [
          nombrar(
            'Nombra los contaminantes que emiten los MCIA según el temario.',
            'CO2, NOx, SO2, CO, HC y partículas, entre otros.',
            ['CO2 y CO', 'NOx y SO2', 'HC y partículas'],
          ),
        ],
      }),
      disc({
        id: 'abandono-combustibles',
        concepto: 'T1-11',
        ref: 'd1:f4',
        texto: 'Por eso se ha abandonado la búsqueda de combustibles alternativos al petróleo.',
        explicacion: 'Los problemas de combustible impulsan la búsqueda de nuevos combustibles (biocombustibles, H2, GNC, GNL).',
        guia: 'Revisa qué dice el informe sobre los nuevos combustibles (T1-11).',
      }),
      disc({
        id: 'sin-nuevas-tecnologias',
        concepto: 'T1-11',
        ref: 'd1:f5',
        texto: 'Y ha hecho desaparecer el interés por los motores eléctricos y los híbridos.',
        explicacion: 'Los problemas de combustible han provocado la APARICIÓN de nuevas tecnologías como los motores eléctricos e híbridos.',
        guia: 'Revisa la última frase: ¿qué efecto tienen los problemas de combustible sobre las nuevas tecnologías?',
      }),
    ],
  },

  // ───────────── P1-11 · Tabla: criterios de clasificación ─────────────
  {
    id: 'P1-11',
    conceptos: ['T1-13'],
    solicitante: 'Editorial Técnica Sierra Norte',
    motivo: 'Aprobación de tabla de clasificación para manual',
    documentos: [
      tabla(
        'd1',
        'Tabla comparativa · Clasificación de los MCIA',
        ['Criterio', 'Tipos'],
        [
          ['comb', 'Proceso de combustión', 'MEP / MEC'],
          ['ren', 'Renovación de la carga', '4 tiempos / 2 tiempos'],
          ['sum', 'Suministro de combustible', 'Carburación / inyección (directa o indirecta)'],
          ['pres', 'Presión de admisión', 'Aspiración natural / sobrealimentado'],
          ['ref', 'Refrigeración', 'Por agua / por aire'],
          ['disp', 'Número y disposición de cilindros', 'En línea, en V, en VR, en W, bóxer…'],
        ],
      ),
    ],
    discrepancias: [
      disc({
        id: 'presion-carburacion',
        concepto: 'T1-13',
        ref: 'd1:pres1',
        texto: 'Carburación / inyección',
        explicacion: 'Carburación e inyección clasifican el SUMINISTRO DE COMBUSTIBLE; según la presión de admisión el motor es de aspiración natural o sobrealimentado.',
        guia: 'Comprueba que cada criterio lleva sus propios tipos (regla T1-13). Fíjate en la fila «Presión de admisión».',
        preguntas: [
          corregir(
            'Corrige la fila «Presión de admisión».',
            'Según la presión de admisión, los MCIA son de aspiración natural o sobrealimentados.',
            ['Aspiración natural', 'Sobrealimentado'],
          ),
        ],
      }),
      disc({
        id: 'renovacion-mep',
        concepto: 'T1-13',
        ref: 'd1:ren1',
        texto: 'MEP / MEC',
        explicacion: 'MEP y MEC clasifican el PROCESO DE COMBUSTIÓN; según la renovación de la carga el motor es de 4 o de 2 tiempos.',
        guia: 'Comprueba la fila «Renovación de la carga».',
      }),
      disc({
        id: 'refrigeracion-sobrealimentado',
        concepto: 'T1-13',
        ref: 'd1:ref1',
        texto: 'Aspiración natural / sobrealimentado',
        explicacion: 'Esos tipos corresponden a la presión de admisión; según la refrigeración el motor es refrigerado por agua o por aire.',
        guia: 'Comprueba la fila «Refrigeración».',
      }),
    ],
  },

  // ───────────── P1-12 · Tabla: MEP frente a MEC ─────────────
  {
    id: 'P1-12',
    conceptos: ['T1-14', 'T1-15'],
    solicitante: 'Centro de Estudios del Automóvil «Guadarrama»',
    motivo: 'Aprobación de tabla comparativa MEP/MEC',
    documentos: [
      tabla(
        'd1',
        'Tabla comparativa · MEP frente a MEC',
        ['Característica', 'MEP', 'MEC'],
        [
          ['nom', 'Otro nombre', 'Motor de gasolina u Otto', 'Motor diésel'],
          ['ini', 'Inicio de la combustión', 'Agente externo: chispa de la bujía', 'Autoinflamación del combustible al inyectarlo en aire fuertemente comprimido'],
          ['comb', 'Combustibles', 'Gasolina, GN, GLP, bioetanol…', 'Diésel, biodiésel…'],
        ],
      ),
    ],
    discrepancias: [
      disc({
        id: 'mep-ini-autoinflamacion',
        concepto: 'T1-14',
        ref: 'd1:ini1',
        texto: 'Autoinflamación por la fuerte compresión del aire',
        explicacion: 'En el MEP la combustión la origina un agente externo (chispa de la bujía).',
        guia: 'Revisa la columna MEP, fila «Inicio de la combustión».',
      }),
      disc({
        id: 'mec-ini-chispa',
        concepto: 'T1-15',
        ref: 'd1:ini2',
        texto: 'Chispa de la bujía',
        explicacion: 'En el MEC no hay chispa: el combustible se autoinflama al inyectarlo en aire fuertemente comprimido.',
        guia: 'Revisa la columna MEC, fila «Inicio de la combustión».',
      }),
      disc({
        id: 'mec-comb-gasolina',
        concepto: 'T1-15',
        ref: 'd1:comb2',
        texto: 'Gasolina, GLP…',
        explicacion: 'Los combustibles del MEC son diésel, biodiésel…; gasolina y GLP son de MEP.',
        guia: 'Revisa la columna MEC, fila «Combustibles».',
      }),
      disc({
        id: 'mep-nombre-diesel',
        concepto: 'T1-14',
        ref: 'd1:nom1',
        texto: 'Motor diésel',
        explicacion: 'El MEP es el motor de gasolina u Otto; el diésel es el MEC.',
        guia: 'Revisa la columna MEP, fila «Otro nombre».',
        preguntas: [
          nombrar(
            '¿Con qué otros nombres se conoce al MEP?',
            'Motor de gasolina o motor Otto.',
            ['Motor de gasolina', 'Motor Otto'],
          ),
        ],
      }),
    ],
  },

  // ───────────── P1-13 · Tabla: ventajas e inconvenientes ─────────────
  {
    id: 'P1-13',
    conceptos: ['T1-05', 'T1-06', 'T1-07', 'T1-08', 'T1-09', 'T1-10', 'T1-11'],
    solicitante: 'Cámara de Comercio de Talavera',
    motivo: 'Aprobación de tabla resumen para jornada divulgativa',
    documentos: [
      tabla(
        'd1',
        'Tabla comparativa · Ventajas e inconvenientes de los MCIA',
        ['Aspecto', 'Valoración', 'Detalle'],
        [
          ['comb', 'Combustible empleado', 'Ventaja', 'Líquido, de elevado poder calorífico (condiciona la autonomía)'],
          ['rend', 'Rendimiento térmico', 'Ventaja', 'Bueno; varía con el régimen de carga y el de giro'],
          ['pot', 'Campo de potencias', 'Ventaja', 'Desde 0,1 kW hasta más de 32 MW'],
          ['mod', 'Modularidad', 'Ventaja', 'Mismo diseño para distintas potencias'],
          ['disp', 'Disposiciones constructivas', 'Ventaja', 'Muy variadas; innovación en disposición y diseño'],
          ['cont', 'Contaminación', 'Inconveniente', 'CO2, NOx, SO2, CO, HC, partículas'],
          ['pet', 'Precio y posible carencia del petróleo', 'Inconveniente', 'Optimizar la combustión, nuevos combustibles y nuevas tecnologías'],
        ],
      ),
    ],
    discrepancias: [
      disc({
        id: 'contaminacion-ventaja',
        concepto: 'T1-10',
        ref: 'd1:cont1',
        texto: 'Ventaja',
        explicacion: 'La contaminación es un INCONVENIENTE de los MCIA.',
        guia: 'Revisa la valoración de cada aspecto. ¿Es la contaminación una ventaja?',
      }),
      disc({
        id: 'potencias-unidades',
        concepto: 'T1-07',
        ref: 'd1:pot2',
        texto: 'Desde 0,1 MW hasta 32 kW',
        explicacion: 'Las unidades están cambiadas: el campo va desde 0,1 kW hasta más de 32 MW.',
        guia: 'Revisa el detalle del campo de potencias, con atención a las unidades.',
        preguntas: [
          corregir(
            'Corrige el campo de potencias de la tabla.',
            'Desde 0,1 kW hasta valores superiores a 32 MW.',
            ['Límite inferior: 0,1 kW', 'Límite superior: más de 32 MW'],
          ),
        ],
      }),
      disc({
        id: 'modularidad-distinto',
        concepto: 'T1-08',
        ref: 'd1:mod2',
        texto: 'Un diseño distinto para cada potencia',
        explicacion: 'Modularidad es lo contrario: un mismo diseño sirve para distintas potencias.',
        guia: 'Revisa el detalle de la fila «Modularidad».',
      }),
      disc({
        id: 'rendimiento-constante',
        concepto: 'T1-06',
        ref: 'd1:rend2',
        texto: 'Bueno; constante con el régimen de carga y el de giro',
        explicacion: 'El rendimiento térmico VARÍA con el régimen de carga y con el régimen de giro.',
        guia: 'Revisa el detalle del rendimiento térmico.',
      }),
      disc({
        id: 'disposicion-unica',
        concepto: 'T1-09',
        ref: 'd1:disp2',
        texto: 'Una única disposición posible',
        explicacion: 'Los MCIA permiten disposiciones constructivas muy variadas.',
        guia: 'Revisa el detalle de las disposiciones constructivas.',
      }),
      disc({
        id: 'combustible-gaseoso',
        concepto: 'T1-05',
        ref: 'd1:comb2',
        texto: 'Gaseoso, de bajo poder calorífico',
        explicacion: 'Los MCIA usan combustibles LÍQUIDOS de ELEVADO poder calorífico.',
        guia: 'Revisa el detalle del combustible empleado (T1-05).',
      }),
    ],
  },

  // ───────────── P1-14 · Plano: cilindro de un motor alternativo ─────────────
  {
    id: 'P1-14',
    conceptos: ['T1-04'],
    solicitante: 'Oficina Técnica Hidalgo e Hijos',
    motivo: 'Visado de plano de cilindro tipo',
    documentos: [
      plano(
        'd1',
        'Plano técnico · Cilindro de un motor alternativo',
        'A1-01',
        [
          ['e1', 'piston', 'Émbolo (pistón)'],
          ['e2', 'mov_alternativo', 'Movimiento alternativo: desplazamiento lineal del émbolo'],
          ['e3', 'manivela', 'Mecanismo biela-manivela'],
          ['e4', 'mov_rotativo', 'Movimiento rotativo'],
          ['e5', 'bujia', 'Bujía o inyector de combustible'],
        ],
        { leyenda: 'El émbolo transmite el trabajo; la biela-manivela convierte su movimiento en giro.' },
      ),
    ],
    discrepancias: [
      disc({
        id: 'etiqueta-giro-embolo',
        concepto: 'T1-04',
        ref: 'd1:e2',
        texto: 'Movimiento rotativo: giro continuo del émbolo',
        explicacion: 'En un motor alternativo el émbolo se desplaza linealmente (movimiento alternativo); el giro aparece después, en el cigüeñal.',
        guia: 'Mira la etiqueta de la flecha junto al émbolo y compárala con la regla T1-04.',
        preguntas: [
          corregir(
            'Corrige la etiqueta: ¿qué movimiento tiene el émbolo?',
            'Un movimiento alternativo: desplazamiento lineal del émbolo dentro del cilindro.',
            ['Movimiento alternativo', 'Desplazamiento lineal del émbolo'],
          ),
          localizar('En el plano sin etiquetas, señala el elemento cuyo desplazamiento lineal define un motor alternativo.', 'A1-01', 'piston', 'El émbolo (pistón).'),
        ],
      }),
      disc({
        id: 'etiqueta-embolo-manivela',
        concepto: 'T1-04',
        ref: 'd1:e1',
        parches: [{ ref: 'd1:e1', zona: 'manivela' }],
        explicacion: 'La etiqueta «Émbolo» señala el mecanismo biela-manivela. El émbolo es la pieza que se desplaza linealmente en el cilindro.',
        guia: 'Comprueba a qué pieza apunta cada etiqueta. ¿Dónde está realmente el émbolo?',
        preguntas: [
          localizar('Señala el émbolo en el plano sin etiquetas.', 'A1-01', 'piston', 'El émbolo es el pistón, dentro del cilindro.'),
          explicar(
            '¿Qué papel tiene el émbolo en un motor alternativo?',
            'La transmisión de trabajo se realiza mediante el desplazamiento lineal del émbolo.',
            ['Transmite el trabajo', 'Mediante desplazamiento lineal'],
          ),
        ],
      }),
    ],
  },

  // ───────────── P1-15 · Informe técnico: aplicaciones ─────────────
  {
    id: 'P1-15',
    conceptos: ['T1-12'],
    solicitante: 'Agencia de Desarrollo Industrial de Castilla',
    motivo: 'Visado de informe de mercado sobre aplicaciones',
    documentos: [
      informe('d1', 'Informe técnico · Aplicaciones de los MCIA', [
        ['f1', 'En el transporte por carretera equipan automóviles, camiones y motocicletas.'],
        ['f2', 'Se emplean en maquinaria de obras públicas y en maquinaria agrícola.'],
        ['f3', 'Se usan en propulsión ferroviaria y en propulsión marina.'],
        '¶',
        ['f4', 'Accionan grupos generadores de energía eléctrica de bajas potencias.'],
        ['f5', 'En la industria accionan bombas y compresores; también se usan en accionamiento rural y en cogeneración.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'sin-marina',
        concepto: 'T1-12',
        ref: 'd1:f3',
        texto: 'Se usan en propulsión ferroviaria, pero nunca en propulsión marina.',
        explicacion: 'La propulsión marina es una de las aplicaciones de los MCIA.',
        guia: 'Compara las aplicaciones citadas con la lista de la regla T1-12.',
        preguntas: [
          nombrar(
            'Nombra al menos cinco aplicaciones de los MCIA.',
            'Transporte por carretera, maquinaria de obras públicas, maquinaria agrícola, propulsión ferroviaria, propulsión marina, grupos generadores de bajas potencias, accionamiento industrial y rural, cogeneración.',
            ['Transporte: carretera, ferroviario y marino', 'Maquinaria (obras públicas, agrícola) y accionamiento industrial o rural', 'Grupos generadores de bajas potencias y cogeneración'],
          ),
        ],
      }),
      disc({
        id: 'sin-cogeneracion',
        concepto: 'T1-12',
        ref: 'd1:f5',
        texto: 'En cambio, no se emplean ni en accionamiento industrial ni en cogeneración.',
        explicacion: 'El accionamiento industrial (bombas, compresores) y la cogeneración son aplicaciones de los MCIA.',
        guia: 'Revisa la última frase frente a la regla T1-12.',
      }),
      disc({
        id: 'generadores-alta',
        concepto: 'T1-12',
        ref: 'd1:f4',
        texto: 'En generación eléctrica se reservan para grupos de muy alta potencia, nunca de baja.',
        explicacion: 'El temario cita los grupos generadores de energía eléctrica de BAJAS potencias como aplicación de los MCIA.',
        guia: 'Revisa la frase sobre los grupos generadores.',
      }),
    ],
  },
];
