// Jornada 2 · T1-16 … T1-26: renovación de la carga (4T/2T), PMS, PMI, carrera, cilindrada unitaria,
// los cuatro tiempos y las características constructivas del dos tiempos. Imágenes V1-01 y V1-02.
import type { PlantillaExpediente } from '../../../motor/tipos';
import { corregir, disc, elem, explicar, ficha, glosario, informe, localizar, manifiesto, nombrar, plano, regla, tabla } from '../../constructores';

export const plantillasJornada2: PlantillaExpediente[] = [
  // ───────────── P2-01 · Glosario de renovación de la carga ─────────────
  {
    id: 'P2-01',
    conceptos: ['T1-16', 'T1-17', 'T1-18', 'T1-19', 'T1-20', 'T1-21'],
    solicitante: 'Instituto Técnico «Sierra de Gredos»',
    motivo: 'Aprobación de glosario de renovación de la carga',
    documentos: [
      glosario('d1', 'Glosario oficial · Renovación de la carga', [
        ['4t', 'Motor de 4 tiempos', '4 movimientos del pistón, que corresponden a 2 revoluciones del cigüeñal por ciclo.'],
        ['2t', 'Motor de 2 tiempos', '2 movimientos del pistón, que corresponden a 1 revolución del cigüeñal por ciclo.'],
        ['pms', 'Punto muerto superior (PMS)', 'Posición del émbolo cuando hay el mínimo volumen en el cilindro (volumen de la cámara de combustión).'],
        ['pmi', 'Punto muerto inferior (PMI)', 'Posición del émbolo cuando hay el máximo volumen en el cilindro.'],
        ['carrera', 'Carrera (s)', 'Distancia entre el PMS y el PMI: máxima longitud que puede recorrer el pistón.'],
        ['cil', 'Cilindrada unitaria', 'Volumen desplazado por el émbolo cuando se mueve entre el PMS y el PMI.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: '4t-cuatro-vueltas',
        concepto: 'T1-16',
        ref: 'd1:4t',
        texto: '4 movimientos del pistón, que corresponden a 4 revoluciones del cigüeñal por ciclo.',
        explicacion: 'Cada movimiento del pistón es media vuelta: 4 movimientos son 2 revoluciones del cigüeñal.',
        guia: 'Comprueba la relación movimientos del pistón ↔ vueltas del cigüeñal del motor de 4 tiempos.',
      }),
      disc({
        id: '2t-dos-vueltas',
        concepto: 'T1-17',
        ref: 'd1:2t',
        texto: '2 movimientos del pistón, que corresponden a 2 revoluciones del cigüeñal por ciclo.',
        explicacion: 'El 2T completa el ciclo en 2 movimientos del pistón = 1 revolución del cigüeñal.',
        guia: 'Comprueba la relación movimientos ↔ vueltas del motor de 2 tiempos.',
      }),
      disc({
        id: 'pms-maximo',
        concepto: 'T1-18',
        ref: 'd1:pms',
        texto: 'Posición del émbolo cuando hay el máximo volumen en el cilindro.',
        explicacion: 'En el PMS el volumen es el MÍNIMO (el de la cámara de combustión); el máximo corresponde al PMI.',
        guia: 'Revisa la definición de PMS: ¿volumen mínimo o máximo?',
      }),
      disc({
        id: 'pmi-minimo',
        concepto: 'T1-19',
        ref: 'd1:pmi',
        texto: 'Posición del émbolo cuando hay el mínimo volumen en el cilindro.',
        explicacion: 'En el PMI el volumen en el cilindro es el MÁXIMO.',
        guia: 'Revisa la definición de PMI.',
      }),
      disc({
        id: 'carrera-volumen',
        concepto: 'T1-20',
        ref: 'd1:carrera',
        texto: 'Volumen desplazado por el pistón entre el PMS y el PMI.',
        explicacion: 'La carrera es una DISTANCIA (longitud) entre PMS y PMI; el volumen desplazado es la cilindrada unitaria.',
        guia: 'Revisa la definición de carrera: ¿es una longitud o un volumen?',
        preguntas: [
          corregir('Corrige la definición de carrera.', 'La carrera es la distancia entre el PMS y el PMI, la máxima longitud que puede recorrer el pistón.', [
            'Es una distancia (longitud), no un volumen',
            'Entre el PMS y el PMI: máximo recorrido del pistón',
          ]),
        ],
      }),
      disc({
        id: 'cilindrada-distancia',
        concepto: 'T1-21',
        ref: 'd1:cil',
        texto: 'Distancia recorrida por el émbolo entre el PMS y el PMI.',
        explicacion: 'La cilindrada unitaria es un VOLUMEN: el desplazado por el émbolo entre PMS y PMI. La distancia es la carrera.',
        guia: 'Revisa la definición de cilindrada unitaria: ¿es una longitud o un volumen?',
      }),
    ],
  },

  // ───────────── P2-02 · Manifiesto del ciclo de cuatro tiempos ─────────────
  {
    id: 'P2-02',
    conceptos: ['T1-16', 'T1-22', 'T1-23', 'T1-24', 'T1-25'],
    solicitante: 'Talleres Fernández y Morales',
    motivo: 'Validación del manifiesto de ciclo de un motor 4T de gasolina',
    documentos: [
      manifiesto(
        'd1',
        'Manifiesto de secuencia · Ciclo de cuatro tiempos',
        [
          ['p1', 'Admisión: el pistón baja con la válvula de admisión abierta y entra la mezcla de aire y combustible. ½ vuelta de cigüeñal.'],
          ['p2', 'Compresión: el pistón sube con las dos válvulas cerradas y comprime la mezcla. ½ vuelta.'],
          ['p3', 'Expansión: la chispa de la bujía inflama la mezcla y los gases empujan el pistón hacia abajo con las válvulas cerradas; es el tiempo de potencia. ½ vuelta.'],
          ['p4', 'Escape: el pistón sube y expulsa los gases quemados por la válvula de escape, que está abierta. ½ vuelta.'],
          ['p5', 'Ciclo completo: 4 movimientos del pistón y 2 vueltas de cigüeñal.'],
        ],
        { intro: 'Motor de encendido provocado para turismo. Secuencia declarada por el fabricante:' },
      ),
    ],
    discrepancias: [
      disc({
        id: 'admision-sube',
        concepto: 'T1-22',
        ref: 'd1:p1',
        texto: 'Admisión: el pistón sube con la válvula de admisión abierta y entra la mezcla de aire y combustible. ½ vuelta de cigüeñal.',
        explicacion: 'En la admisión el pistón BAJA (del PMS al PMI) y así aspira la mezcla.',
        guia: 'Revisa el movimiento del pistón en el paso de admisión.',
        preguntas: [
          explicar('Describe el tiempo de admisión.', 'El pistón baja y aspira la mezcla de aire y combustible por la válvula de admisión, que está abierta; el cigüeñal da media vuelta.', [
            'El pistón baja',
            'Válvula de admisión abierta: entra la mezcla',
            'Media vuelta de cigüeñal',
          ]),
        ],
      }),
      disc({
        id: 'compresion-admision-abierta',
        concepto: 'T1-23',
        ref: 'd1:p2',
        texto: 'Compresión: el pistón sube con la válvula de admisión abierta y comprime la mezcla. ½ vuelta.',
        explicacion: 'Durante la compresión las DOS válvulas están cerradas; si la de admisión estuviera abierta la mezcla escaparía.',
        guia: 'Revisa el estado de las válvulas durante la compresión.',
      }),
      disc({
        id: 'expansion-escape-abierta',
        concepto: 'T1-24',
        ref: 'd1:p3',
        texto: 'Expansión: la chispa de la bujía inflama la mezcla y los gases empujan el pistón hacia abajo con la válvula de escape abierta; es el tiempo de potencia. ½ vuelta.',
        explicacion: 'En la expansión las válvulas están cerradas: los gases empujan el pistón hacia abajo.',
        guia: 'Revisa el estado de las válvulas durante la expansión.',
      }),
      disc({
        id: 'escape-por-admision',
        concepto: 'T1-25',
        ref: 'd1:p4',
        texto: 'Escape: el pistón sube y expulsa los gases quemados por la válvula de admisión, que está abierta. ½ vuelta.',
        explicacion: 'Los gases quemados salen por la válvula de ESCAPE abierta.',
        guia: 'Revisa por qué válvula salen los gases en el escape.',
      }),
      disc({
        id: 'ciclo-cuatro-vueltas',
        concepto: 'T1-16',
        ref: 'd1:p5',
        texto: 'Ciclo completo: 4 movimientos del pistón y 4 vueltas de cigüeñal.',
        explicacion: 'Cuatro tiempos de media vuelta cada uno suman 2 vueltas de cigüeñal, no 4.',
        guia: 'Suma las vueltas de cigüeñal de los cuatro tiempos y compara con el paso 5.',
      }),
    ],
  },

  // ───────────── P2-03 · Tabla de los cuatro tiempos ─────────────
  {
    id: 'P2-03',
    conceptos: ['T1-22', 'T1-23', 'T1-24', 'T1-25'],
    solicitante: 'Motores Diésel del Ebro S.A.',
    motivo: 'Aprobación de tabla de tiempos para manual de taller',
    documentos: [
      tabla(
        'd1',
        'Tabla comparativa · Los cuatro tiempos',
        ['Tiempo', 'Pistón', 'Válvula de admisión', 'Válvula de escape', 'Cigüeñal'],
        [
          ['adm', '1.º Admisión', 'Baja', 'Abierta', 'Cerrada', '½ vuelta'],
          ['com', '2.º Compresión', 'Sube', 'Cerrada', 'Cerrada', '½ vuelta'],
          ['exp', '3.º Expansión', 'Baja', 'Cerrada', 'Cerrada', '½ vuelta'],
          ['esc', '4.º Escape', 'Sube', 'Cerrada', 'Abierta', '½ vuelta'],
        ],
      ),
    ],
    discrepancias: [
      disc({
        id: 'adm-sube',
        concepto: 'T1-22',
        ref: 'd1:adm1',
        texto: 'Sube',
        explicacion: 'En la admisión el pistón baja.',
        guia: 'Revisa la columna «Pistón» de cada tiempo.',
      }),
      disc({
        id: 'com-adm-abierta',
        concepto: 'T1-23',
        ref: 'd1:com2',
        texto: 'Abierta',
        explicacion: 'En la compresión las dos válvulas están cerradas.',
        guia: 'Revisa las válvulas en la fila de compresión.',
      }),
      disc({
        id: 'exp-sube',
        concepto: 'T1-24',
        ref: 'd1:exp1',
        texto: 'Sube',
        explicacion: 'En la expansión los gases empujan el pistón hacia ABAJO.',
        guia: 'Revisa el movimiento del pistón en la fila de expansión.',
        preguntas: [
          corregir('Corrige la fila de la expansión.', 'En la expansión el pistón baja, empujado por los gases de la combustión, con las dos válvulas cerradas; es el tiempo de potencia.', [
            'El pistón baja empujado por los gases',
            'Válvulas cerradas',
          ]),
        ],
      }),
      disc({
        id: 'esc-cerrada',
        concepto: 'T1-25',
        ref: 'd1:esc3',
        texto: 'Cerrada',
        explicacion: 'En el escape la válvula de escape está abierta para que salgan los gases quemados.',
        guia: 'Revisa la válvula de escape en la fila de escape.',
      }),
      disc({
        id: 'exp-escape-abierta',
        concepto: 'T1-24',
        ref: 'd1:exp3',
        texto: 'Abierta',
        explicacion: 'En la expansión las dos válvulas están cerradas.',
        guia: 'Revisa las válvulas en la fila de expansión.',
      }),
    ],
  },

  // ───────────── P2-04 · Tabla 4T frente a 2T ─────────────
  {
    id: 'P2-04',
    conceptos: ['T1-16', 'T1-17', 'T1-26'],
    solicitante: 'Club de Motociclismo Clásico «Los Pistones»',
    motivo: 'Aprobación de tabla divulgativa 4T/2T',
    documentos: [
      tabla(
        'd1',
        'Tabla comparativa · Cuatro tiempos frente a dos tiempos',
        ['Característica', '4 tiempos', '2 tiempos'],
        [
          ['mov', 'Movimientos del pistón por ciclo', '4', '2'],
          ['rev', 'Revoluciones del cigüeñal por ciclo', '2', '1'],
          ['ren', 'Elementos de renovación de la carga', 'Válvulas', 'Lumbreras (orificios en el propio cilindro)'],
          ['pre', 'Depósito de preadmisión', '—', 'El cárter'],
        ],
      ),
    ],
    discrepancias: [
      disc({
        id: 'rev-4t-cuatro',
        concepto: 'T1-16',
        ref: 'd1:rev1',
        texto: '4',
        pruebas: [regla('T1-16'), elem('d1:mov1')],
        explicacion: '4 movimientos del pistón son 2 revoluciones del cigüeñal (media vuelta por movimiento).',
        guia: 'Compara movimientos del pistón y revoluciones del cigüeñal en la columna 4T.',
      }),
      disc({
        id: 'rev-2t-dos',
        concepto: 'T1-17',
        ref: 'd1:rev2',
        texto: '2',
        pruebas: [regla('T1-17'), elem('d1:mov2')],
        explicacion: 'En el 2T el ciclo dura 1 revolución del cigüeñal.',
        guia: 'Compara movimientos del pistón y revoluciones del cigüeñal en la columna 2T.',
      }),
      disc({
        id: '2t-valvulas',
        concepto: 'T1-26',
        ref: 'd1:ren2',
        texto: 'Válvulas de admisión y de escape en la culata',
        explicacion: 'En el 2T las válvulas se sustituyen por lumbreras, orificios realizados en el propio cilindro.',
        guia: 'Revisa cómo se renueva la carga en el 2T.',
        preguntas: [
          explicar('¿Qué sustituye a las válvulas en un motor de 2 tiempos y qué otras características tiene?', 'Las lumbreras, orificios realizados en el propio cilindro; además el cárter hace de depósito de preadmisión y hay un proceso de barrido.', [
            'Lumbreras: orificios en el propio cilindro',
            'Cárter como depósito de preadmisión',
            'Proceso de barrido',
          ]),
        ],
      }),
      disc({
        id: '2t-preadmision-nada',
        concepto: 'T1-26',
        ref: 'd1:pre2',
        texto: 'No tiene: el cárter solo guarda aceite',
        explicacion: 'En el 2T el cárter sirve como depósito de preadmisión.',
        guia: 'Revisa la fila del depósito de preadmisión.',
      }),
    ],
  },

  // ───────────── P2-05 · Plano del motor de dos tiempos (V1-02) ─────────────
  {
    id: 'P2-05',
    conceptos: ['T1-26'],
    solicitante: 'Jardinería Mecánica del Jarama',
    motivo: 'Visado de plano de motor de dos tiempos',
    documentos: [
      plano(
        'd1',
        'Plano técnico · Motor de dos tiempos',
        'V1-02',
        [
          ['e1', 'bujia', 'Bujía'],
          ['e2', 'culata', 'Culata'],
          ['e3', 'piston', 'Pistón'],
          ['e4', 'lumbrera_escape', 'Lumbrera de escape'],
          ['e5', 'lumbrera_admision', 'Lumbrera de admisión'],
          ['e6', 'lumbrera_carga', 'Lumbrera de carga (transferencia)'],
          ['e7', 'biela', 'Biela'],
          ['e8', 'carter', 'Cárter (depósito de preadmisión)'],
        ],
      ),
    ],
    discrepancias: [
      disc({
        id: 'valvula-escape',
        concepto: 'T1-26',
        imagen: 'V1-02',
        ref: 'd1:e4',
        texto: 'Válvula de escape',
        explicacion: 'Un motor de dos tiempos no tiene válvulas: ese orificio del cilindro es la lumbrera de escape.',
        guia: 'Revisa las etiquetas del lateral del cilindro. ¿Tiene válvulas un 2T?',
        preguntas: [
          corregir('Corrige la etiqueta 4.', 'Es la lumbrera de escape: en el 2T las válvulas se sustituyen por lumbreras, orificios realizados en el propio cilindro.', [
            'Lumbrera de escape (no válvula)',
            'Las lumbreras son orificios en el propio cilindro',
          ]),
          localizar('En el plano sin etiquetas, señala la lumbrera de escape.', 'V1-02', 'lumbrera_escape', 'La lumbrera de escape es el orificio superior del lateral derecho del cilindro.'),
        ],
      }),
      disc({
        id: 'carter-aceite',
        concepto: 'T1-26',
        imagen: 'V1-02',
        ref: 'd1:e8',
        texto: 'Cárter (solo depósito de aceite; no interviene en la admisión)',
        explicacion: 'En el 2T el cárter sirve como depósito de preadmisión: por él pasa la mezcla antes de entrar al cilindro.',
        guia: 'Revisa la etiqueta del cárter.',
        preguntas: [
          explicar('¿Qué función tiene el cárter en un motor de 2 tiempos?', 'Sirve como depósito de preadmisión: la mezcla entra primero al cárter, que debe estar sellado.', [
            'Depósito de preadmisión',
            'Por él pasa la mezcla antes de entrar al cilindro',
          ]),
          localizar('Señala el cárter en el plano sin etiquetas.', 'V1-02', 'carter', 'El cárter es la parte inferior, donde gira el cigüeñal.'),
        ],
      }),
      disc({
        id: 'lumbreras-cruzadas',
        concepto: 'T1-26',
        imagen: 'V1-02',
        ref: 'd1:e4',
        parches: [
          { ref: 'd1:e4', zona: 'lumbrera_admision' },
          { ref: 'd1:e5', zona: 'lumbrera_escape' },
        ],
        elementosAceptados: ['d1:e5'],
        explicacion: 'Las etiquetas de las lumbreras de escape y de admisión están intercambiadas: la de escape es la superior (comunica con el cilindro) y la de admisión la inferior (comunica con el cárter).',
        guia: 'Compara la posición de las lumbreras con la imagen de la página T1-26 del Reglamento.',
        preguntas: [localizar('Señala la lumbrera de admisión en el plano sin etiquetas.', 'V1-02', 'lumbrera_admision', 'La lumbrera de admisión es el orificio inferior del lateral derecho, que comunica con el cárter.')],
      }),
    ],
  },

  // ───────────── P2-06 · Plano del motor de cuatro tiempos (V1-01) ─────────────
  {
    id: 'P2-06',
    conceptos: ['T1-22', 'T1-24', 'T1-25'],
    solicitante: 'Museo de la Automoción de Salamanca (taller)',
    motivo: 'Visado de plano didáctico de un motor de cuatro cilindros',
    documentos: [
      plano(
        'd1',
        'Plano técnico · Motor de cuatro tiempos en corte',
        'V1-01',
        [
          ['e1', 'cilindro1', 'Cilindro en el primer tiempo: admisión (el pistón baja y entra la mezcla)'],
          ['e2', 'cilindro2', 'Cilindro en el segundo tiempo: compresión (válvulas cerradas)'],
          ['e3', 'cilindro3', 'Cilindro en el tercer tiempo: expansión (la mezcla se inflama)'],
          ['e4', 'cilindro4', 'Cilindro en el cuarto tiempo: escape (el pistón sube)'],
          ['e5', 'ciguenal', 'Cigüeñal'],
        ],
        { leyenda: 'Cada cilindro se encuentra en un tiempo distinto del ciclo.' },
      ),
    ],
    discrepancias: [
      disc({
        id: 'tercero-admision',
        concepto: 'T1-24',
        imagen: 'V1-01',
        ref: 'd1:e3',
        texto: 'Cilindro en el tercer tiempo: admisión con la válvula de admisión abierta',
        explicacion: 'El tercer tiempo es la expansión: la mezcla explota y empuja el pistón hacia abajo con las válvulas cerradas.',
        guia: 'Revisa la etiqueta del tercer tiempo (cilindro rojo).',
        preguntas: [
          explicar('Describe el tercer tiempo de un motor 4T.', 'Es la expansión: la mezcla se inflama (por chispa en gasolina o por compresión en diésel) y, con las válvulas cerradas, empuja el pistón hacia abajo. Es el tiempo de potencia.', [
            'Combustión de la mezcla',
            'Válvulas cerradas, el pistón baja',
            'Tiempo de potencia',
          ]),
          localizar('Señala en la imagen sin etiquetas el cilindro que está en expansión.', 'V1-01', 'cilindro3', 'El cilindro rojo, donde la mezcla está ardiendo.'),
        ],
      }),
      disc({
        id: 'cuarto-baja',
        concepto: 'T1-25',
        imagen: 'V1-01',
        ref: 'd1:e4',
        texto: 'Cilindro en el cuarto tiempo: escape (el pistón baja y aspira los gases)',
        explicacion: 'En el escape el pistón SUBE y empuja los gases quemados fuera por la válvula de escape abierta.',
        guia: 'Revisa la etiqueta del cuarto tiempo.',
      }),
      disc({
        id: 'primero-cerradas',
        concepto: 'T1-22',
        imagen: 'V1-01',
        ref: 'd1:e1',
        texto: 'Cilindro en el primer tiempo: admisión (el pistón baja con las dos válvulas cerradas)',
        explicacion: 'En la admisión la válvula de admisión está abierta para que entre la mezcla.',
        guia: 'Revisa la etiqueta del primer tiempo.',
        preguntas: [localizar('Señala el cilindro que está en admisión.', 'V1-01', 'cilindro1', 'El cilindro amarillo, con el pistón bajando.')],
      }),
    ],
  },

  // ───────────── P2-07 · Plano de PMS, PMI y carrera (A1-01) ─────────────
  {
    id: 'P2-07',
    conceptos: ['T1-18', 'T1-19', 'T1-20'],
    solicitante: 'Oficina Técnica Hidalgo e Hijos',
    motivo: 'Visado de plano de cotas de un cilindro',
    documentos: [
      plano(
        'd1',
        'Plano técnico · Puntos muertos y carrera',
        'A1-01',
        [
          ['e1', 'pms', 'Punto muerto superior (PMS)'],
          ['e2', 'pmi', 'Punto muerto inferior (PMI)'],
          ['e3', 'carrera', 'Carrera (s): distancia entre PMS y PMI'],
          ['e4', 'camara', 'Volumen mínimo: cámara de combustión (émbolo en el PMS)'],
          ['e5', 'piston', 'Émbolo'],
        ],
      ),
    ],
    discrepancias: [
      disc({
        id: 'pms-pmi-cruzados',
        concepto: 'T1-18',
        ref: 'd1:e1',
        parches: [
          { ref: 'd1:e1', zona: 'pmi' },
          { ref: 'd1:e2', zona: 'pms' },
        ],
        elementosAceptados: ['d1:e2'],
        pruebas: [regla('T1-18'), regla('T1-19')],
        explicacion: 'Las cotas PMS y PMI están intercambiadas: el PMS es la posición superior (volumen mínimo) y el PMI la inferior (volumen máximo).',
        guia: 'Mira a qué altura apunta cada punto muerto.',
        preguntas: [
          explicar('¿Qué diferencia el PMS del PMI?', 'El PMS es la posición del émbolo con el mínimo volumen en el cilindro (el de la cámara de combustión); el PMI, la posición con el máximo volumen.', [
            'PMS: volumen mínimo (cámara de combustión)',
            'PMI: volumen máximo',
          ]),
        ],
      }),
      disc({
        id: 'carrera-volumen',
        concepto: 'T1-20',
        ref: 'd1:e3',
        texto: 'Carrera (s): volumen desplazado entre PMS y PMI',
        explicacion: 'La carrera es una distancia. El volumen desplazado entre PMS y PMI es la cilindrada unitaria.',
        guia: 'Revisa la etiqueta de la carrera.',
      }),
      disc({
        id: 'camara-maximo',
        concepto: 'T1-18',
        ref: 'd1:e4',
        texto: 'Volumen máximo del cilindro (émbolo en el PMS)',
        explicacion: 'Con el émbolo en el PMS el volumen es el mínimo: el de la cámara de combustión.',
        guia: 'Revisa la etiqueta del volumen sobre el émbolo.',
      }),
    ],
  },

  // ───────────── P2-08 · Informe de un motor de dos tiempos ─────────────
  {
    id: 'P2-08',
    conceptos: ['T1-17', 'T1-26'],
    solicitante: 'Forestal Montes de Toledo S.Coop.',
    motivo: 'Visado de informe técnico de un motor de dos tiempos',
    documentos: [
      informe('d1', 'Informe técnico · Motor de dos tiempos de 50 cc', [
        ['f1', 'El motor inspeccionado es de dos tiempos: completa su ciclo en dos movimientos del pistón, es decir, en una revolución del cigüeñal.'],
        ['f2', 'No tiene válvulas: la renovación de la carga se realiza mediante lumbreras, orificios practicados en el propio cilindro.'],
        '¶',
        ['f3', 'El cárter actúa como depósito de preadmisión.'],
        ['f4', 'Los gases quemados se desalojan mediante un proceso de barrido.'],
      ]),
    ],
    discrepancias: [
      disc({
        id: '2t-dos-revoluciones',
        concepto: 'T1-17',
        ref: 'd1:f1',
        texto: 'El motor inspeccionado es de dos tiempos: completa su ciclo en dos movimientos del pistón, es decir, en dos revoluciones del cigüeñal.',
        explicacion: 'Dos movimientos del pistón son UNA revolución del cigüeñal.',
        guia: 'Comprueba la relación movimientos ↔ revoluciones de la primera frase.',
      }),
      disc({
        id: '2t-con-valvulas',
        concepto: 'T1-26',
        ref: 'd1:f2',
        texto: 'La renovación de la carga se realiza mediante válvulas de admisión y escape situadas en la culata.',
        explicacion: 'En el 2T las válvulas se sustituyen por lumbreras.',
        guia: 'Revisa cómo dice el informe que se renueva la carga.',
      }),
      disc({
        id: 'carter-sin-funcion',
        concepto: 'T1-26',
        ref: 'd1:f3',
        texto: 'El cárter no interviene en la renovación de la carga.',
        explicacion: 'En el 2T el cárter es el depósito de preadmisión: sí interviene en la renovación de la carga.',
        guia: 'Revisa la frase sobre el cárter.',
        preguntas: [
          nombrar('Nombra las tres características constructivas del motor de dos tiempos.', 'Lumbreras en lugar de válvulas, cárter como depósito de preadmisión y proceso de barrido.', [
            'Lumbreras en lugar de válvulas',
            'Cárter como depósito de preadmisión',
            'Proceso de barrido',
          ]),
        ],
      }),
    ],
  },

  // ───────────── P2-09 · Ficha de un motor 4T de motocicleta ─────────────
  {
    id: 'P2-09',
    conceptos: ['T1-14', 'T1-16', 'T1-20', 'T1-21'],
    solicitante: 'Motocicletas Ibéricas del Norte S.L.',
    motivo: 'Homologación de motor monocilíndrico de 4 tiempos',
    documentos: [
      ficha('d1', 'Ficha de homologación · Motor MN-125', [
        ['ciclo', 'Renovación de la carga', '4 tiempos'],
        ['mov', 'Movimientos del pistón por ciclo', '4'],
        ['vueltas', 'Revoluciones del cigüeñal por ciclo', '2'],
        ['proc', 'Proceso de combustión', 'MEP · encendido provocado'],
        ['cil', 'Cilindrada unitaria', '125 cm³'],
        ['carrera', 'Carrera', '54 mm'],
        ['apl', 'Aplicación', 'Transporte por carretera (motocicleta)'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'vueltas-cuatro',
        concepto: 'T1-16',
        ref: 'd1:vueltas',
        texto: '4',
        pruebas: [regla('T1-16'), elem('d1:mov'), elem('d1:ciclo')],
        explicacion: 'Un motor de 4 tiempos da 2 revoluciones de cigüeñal por ciclo, no 4.',
        guia: 'Compara las revoluciones por ciclo con el tipo de motor y los movimientos del pistón.',
      }),
      disc({
        id: 'cilindrada-mm',
        concepto: 'T1-21',
        ref: 'd1:cil',
        texto: '125 mm',
        explicacion: 'La cilindrada unitaria es un volumen (cm³), no una longitud: la longitud es la carrera.',
        guia: 'Fíjate en las unidades de la cilindrada unitaria.',
        preguntas: [
          explicar('¿Qué es la cilindrada unitaria y en qué se mide?', 'Es el volumen desplazado por el émbolo entre el PMS y el PMI; al ser un volumen se mide en unidades de volumen (cm³), no de longitud.', [
            'Volumen desplazado por el émbolo entre PMS y PMI',
            'Se expresa en unidades de volumen (cm³), no de longitud',
          ]),
        ],
      }),
      disc({
        id: 'carrera-cm3',
        concepto: 'T1-20',
        ref: 'd1:carrera',
        texto: '54 cm³',
        explicacion: 'La carrera es una distancia (mm), no un volumen.',
        guia: 'Fíjate en las unidades de la carrera.',
      }),
    ],
  },

  // ───────────── P2-10 · Ficha de un motor 2T ─────────────
  {
    id: 'P2-10',
    conceptos: ['T1-14', 'T1-17', 'T1-26'],
    solicitante: 'Náutica Ligera del Cantábrico',
    motivo: 'Homologación de motor de dos tiempos para embarcación ligera',
    documentos: [
      ficha('d1', 'Ficha de homologación · Motor NC-2T', [
        ['ciclo', 'Renovación de la carga', '2 tiempos'],
        ['mov', 'Movimientos del pistón por ciclo', '2'],
        ['vueltas', 'Revoluciones del cigüeñal por ciclo', '1'],
        ['ren', 'Elementos de renovación de la carga', 'Lumbreras en el cilindro'],
        ['pre', 'Depósito de preadmisión', 'Cárter (sellado)'],
        ['proc', 'Proceso de combustión', 'MEP · encendido provocado'],
      ]),
    ],
    discrepancias: [
      disc({
        id: 'vueltas-dos',
        concepto: 'T1-17',
        ref: 'd1:vueltas',
        texto: '2',
        pruebas: [regla('T1-17'), elem('d1:ciclo'), elem('d1:mov')],
        explicacion: 'En el 2T el ciclo se completa en 1 revolución del cigüeñal.',
        guia: 'Compara las revoluciones por ciclo con el tipo de motor.',
      }),
      disc({
        id: 'valvulas',
        concepto: 'T1-26',
        ref: 'd1:ren',
        texto: 'Válvulas de admisión y escape con árbol de levas',
        pruebas: [regla('T1-26'), elem('d1:ciclo')],
        explicacion: 'El 2T no tiene válvulas: utiliza lumbreras.',
        guia: 'Revisa los elementos de renovación de la carga de un 2T.',
      }),
    ],
  },

  // ───────────── P2-11 · Manifiesto del recorrido del pistón ─────────────
  {
    id: 'P2-11',
    conceptos: ['T1-18', 'T1-19', 'T1-20', 'T1-21'],
    solicitante: 'Laboratorio de Metrología Industrial de Aragón',
    motivo: 'Validación del protocolo de medida de un cilindro',
    documentos: [
      manifiesto(
        'd1',
        'Manifiesto de secuencia · Recorrido del pistón',
        [
          ['p1', 'El pistón parte del PMS: el volumen encerrado en el cilindro es el mínimo (volumen de la cámara de combustión).'],
          ['p2', 'El pistón baja recorriendo la carrera, la distancia entre el PMS y el PMI.'],
          ['p3', 'El pistón llega al PMI: el volumen en el cilindro es el máximo.'],
          ['p4', 'El volumen desplazado por el émbolo entre PMS y PMI es la cilindrada unitaria.'],
        ],
      ),
    ],
    discrepancias: [
      disc({
        id: 'pms-maximo',
        concepto: 'T1-18',
        ref: 'd1:p1',
        texto: 'El pistón parte del PMS: el volumen encerrado en el cilindro es el máximo.',
        explicacion: 'En el PMS el volumen es el mínimo, el de la cámara de combustión.',
        guia: 'Revisa el volumen en el PMS.',
      }),
      disc({
        id: 'pmi-minimo',
        concepto: 'T1-19',
        ref: 'd1:p3',
        texto: 'El pistón llega al PMI: el volumen en el cilindro es el mínimo.',
        explicacion: 'En el PMI el volumen en el cilindro es el máximo.',
        guia: 'Revisa el volumen en el PMI.',
        preguntas: [corregir('Corrige el paso 3.', 'En el PMI el volumen en el cilindro es el máximo.', ['Volumen máximo en el PMI'])],
      }),
      disc({
        id: 'cilindrada-camara',
        concepto: 'T1-21',
        ref: 'd1:p4',
        texto: 'El volumen que queda encerrado con el émbolo en el PMS es la cilindrada unitaria.',
        explicacion: 'Ese es el volumen de la cámara de combustión. La cilindrada unitaria es el volumen DESPLAZADO por el émbolo entre PMS y PMI.',
        guia: 'Revisa la definición de cilindrada unitaria del paso 4.',
      }),
      disc({
        id: 'carrera-tiempo',
        concepto: 'T1-20',
        ref: 'd1:p2',
        texto: 'El pistón baja recorriendo la carrera, que es el volumen comprendido entre el PMS y el PMI.',
        explicacion: 'La carrera es una distancia, no un volumen.',
        guia: 'Revisa la definición de carrera del paso 2.',
      }),
    ],
  },
];
