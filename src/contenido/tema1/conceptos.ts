// Tema 1 · Clasificación de los MCIA — inventario de conceptos T1-01 … T1-38.
// Todo el contenido procede de los apuntes "Tema 1_Clasificación de MCIA.pdf" (diapositiva indicada en `fuente`).
import type { Concepto } from '../../motor/tipos';

const c = (x: Omit<Concepto, 'tema'>): Concepto => ({ tema: 1, ...x });

export const conceptosTema1: Concepto[] = [
  // ───────────── Jornada 1: introducción, ventajas, inconvenientes, aplicaciones, combustión ─────────────
  c({
    id: 'T1-01',
    nombre: 'Motor',
    alias: ['definicion de motor', 'concepto de motor', 'que es un motor'],
    regla: 'Un MOTOR es un aparato que transforma en trabajo mecánico cualquier otra forma de energía.',
    boletin:
      'La definición de partida es general: cualquier aparato que convierta otra forma de energía (térmica, eléctrica, química…) en trabajo mecánico es un motor. Un documento que diga que un motor "produce calor" o "transforma trabajo mecánico en otra energía" está describiendo justo lo contrario.',
    pregunta: '¿Qué es un motor?',
    respuestaModelo: 'Un aparato que transforma en trabajo mecánico cualquier otra forma de energía.',
    ideasClave: ['Es un aparato que produce trabajo mecánico', 'A partir de cualquier otra forma de energía'],
    fuente: 'Tema 1, diap. 3',
  }),
  c({
    id: 'T1-02',
    nombre: 'Motor de combustión',
    alias: ['combustion', 'motor de combustion'],
    regla: 'Un motor de COMBUSTIÓN utiliza energía térmica: transforma energía térmica en energía mecánica.',
    boletin:
      'El apellido "de combustión" indica de qué energía parte el motor: de la energía térmica que libera la combustión. Por tanto un motor de combustión transforma energía térmica en energía mecánica (no energía eléctrica ni química directamente en trabajo).',
    pregunta: '¿Qué transforma un motor de combustión?',
    respuestaModelo: 'Utiliza energía térmica: transforma energía térmica en energía mecánica.',
    ideasClave: ['Utiliza energía térmica', 'La transforma en energía mecánica'],
    fuente: 'Tema 1, diap. 3',
  }),
  c({
    id: 'T1-03',
    nombre: 'Combustión interna',
    alias: ['interna', 'motor de combustion interna', 'mci'],
    regla: 'Un motor es de combustión INTERNA cuando el estado térmico se genera en el propio fluido motor.',
    boletin:
      'Lo que distingue a un motor de combustión interna es DÓNDE se genera el estado térmico: en el propio fluido motor, el mismo fluido que luego trabaja sobre el émbolo. Si un documento dice que el calor se genera fuera y se transmite al fluido, no está describiendo un motor de combustión interna.',
    pregunta: '¿Cuándo es interna la combustión de un motor?',
    respuestaModelo: 'Cuando el estado térmico se genera en el propio fluido motor.',
    ideasClave: ['Se refiere a dónde se genera el estado térmico', 'Se genera en el propio fluido motor'],
    fuente: 'Tema 1, diap. 3',
  }),
  c({
    id: 'T1-04',
    nombre: 'Motor alternativo',
    alias: ['alternativo', 'mcia'],
    regla:
      'Un motor de combustión interna es ALTERNATIVO cuando la transmisión de trabajo se realiza mediante el desplazamiento lineal de un émbolo.',
    boletin:
      'La "A" de MCIA viene de alternativo: el trabajo se transmite mediante el desplazamiento lineal (de vaivén) de un émbolo o pistón dentro del cilindro. El mecanismo biela-manivela convierte después ese movimiento alternativo en giro del cigüeñal.',
    imagen: { id: 'A1-01', pie: 'Pistón con movimiento alternativo y mecanismo biela-manivela (diap. 8).' },
    pregunta: '¿Cuándo es alternativo un motor de combustión interna?',
    respuestaModelo: 'Cuando la transmisión de trabajo se realiza mediante el desplazamiento lineal de un émbolo.',
    ideasClave: ['Transmisión del trabajo', 'Mediante desplazamiento lineal', 'De un émbolo (pistón)'],
    fuente: 'Tema 1, diap. 3',
  }),
  c({
    id: 'T1-05',
    nombre: 'Ventaja: combustibles líquidos de elevado poder calorífico',
    alias: ['combustibles liquidos', 'poder calorifico', 'elevado poder calorifico', 'autonomia'],
    regla:
      'Ventaja de los MCIA: uso de combustibles líquidos de elevado poder calorífico, muy importante en automoción porque condiciona la autonomía del vehículo.',
    boletin:
      'Primera ventaja de los MCIA: queman combustibles LÍQUIDOS de ELEVADO poder calorífico. En automoción es clave, porque el poder calorífico del combustible condiciona la autonomía del vehículo.',
    pregunta: '¿Por qué es una ventaja de los MCIA el tipo de combustible que usan?',
    respuestaModelo:
      'Porque usan combustibles líquidos de elevado poder calorífico, lo que es muy importante en automoción porque condiciona la autonomía del vehículo.',
    ideasClave: ['Combustibles líquidos', 'De elevado poder calorífico', 'Condiciona la autonomía (automoción)'],
    fuente: 'Tema 1, diap. 4',
  }),
  c({
    id: 'T1-06',
    nombre: 'Ventaja: buen rendimiento térmico',
    alias: ['rendimiento termico', 'buen rendimiento'],
    regla:
      'Ventaja de los MCIA: buen rendimiento térmico, con valores que varían con el régimen de carga y con el régimen de giro.',
    boletin:
      'Los MCIA tienen buen rendimiento térmico, pero no es un valor fijo: varía con el régimen de carga y con el régimen de giro. Desconfía de cualquier documento que declare un rendimiento "constante, independiente del régimen".',
    pregunta: '¿Qué se puede decir del rendimiento térmico de los MCIA?',
    respuestaModelo: 'Es bueno, con valores que varían con el régimen de carga y con el régimen de giro.',
    ideasClave: ['Buen rendimiento térmico', 'Varía con el régimen de carga', 'Varía con el régimen de giro'],
    fuente: 'Tema 1, diap. 4',
  }),
  c({
    id: 'T1-07',
    nombre: 'Ventaja: amplio campo de potencias',
    alias: ['campo de potencias', 'amplio campo de potencias', 'rango de potencias'],
    regla: 'Ventaja de los MCIA: amplio campo de potencias, desde 0,1 kW hasta valores superiores a 32 MW.',
    boletin:
      'Hay MCIA desde potencias minúsculas, unos 0,1 kW, hasta valores superiores a 32 MW. Fíjate en las unidades: kW abajo, MW arriba.',
    pregunta: '¿Entre qué potencias se fabrican los MCIA?',
    respuestaModelo: 'Desde 0,1 kW hasta valores superiores a 32 MW: es un campo de potencias muy amplio.',
    ideasClave: ['Desde 0,1 kW', 'Hasta más de 32 MW'],
    fuente: 'Tema 1, diap. 4',
  }),
  c({
    id: 'T1-08',
    nombre: 'Ventaja: modularidad',
    alias: ['modularidad', 'modular'],
    regla: 'Ventaja de los MCIA: modularidad, el mismo diseño sirve para distintas potencias.',
    boletin:
      'Modularidad significa que con un mismo diseño se obtienen distintas potencias (por ejemplo, variando el número de cilindros). No confundir con "un diseño distinto para cada potencia".',
    pregunta: '¿Qué significa que los MCIA sean modulares?',
    respuestaModelo: 'Que un mismo diseño sirve para obtener distintas potencias.',
    ideasClave: ['Mismo diseño', 'Distintas potencias'],
    fuente: 'Tema 1, diap. 4',
  }),
  c({
    id: 'T1-09',
    nombre: 'Ventaja: disposiciones constructivas variadas',
    alias: ['disposiciones constructivas', 'disposiciones variadas', 'innovacion en disposicion y diseno'],
    regla: 'Ventaja de los MCIA: permiten disposiciones constructivas muy variadas (innovación en disposición y diseño).',
    boletin:
      'Los MCIA admiten disposiciones constructivas muy variadas, lo que deja mucho margen a la innovación en disposición y diseño (en línea, en V, en W, bóxer…).',
    pregunta: '¿Qué ventaja constructiva tienen los MCIA?',
    respuestaModelo: 'Permiten disposiciones constructivas muy variadas, con innovación en disposición y diseño.',
    ideasClave: ['Disposiciones constructivas muy variadas', 'Innovación en disposición y diseño'],
    fuente: 'Tema 1, diap. 4',
  }),
  c({
    id: 'T1-10',
    nombre: 'Inconveniente: contaminación',
    alias: ['contaminacion', 'emisiones contaminantes'],
    regla: 'Inconveniente de los MCIA: contaminación (CO2, NOx, SO2, CO, HC, partículas…).',
    boletin:
      'El primer inconveniente de los MCIA es la contaminación. Los contaminantes que cita el temario son CO2, NOx, SO2, CO, HC y partículas. Si un informe presenta la contaminación como una ventaja, o dice que los MCIA no emiten alguno de ellos, hay discrepancia.',
    pregunta: 'Cita el inconveniente medioambiental de los MCIA y sus contaminantes.',
    respuestaModelo: 'La contaminación: emiten CO2, NOx, SO2, CO, HC y partículas, entre otros.',
    ideasClave: ['Es un inconveniente: contaminación', 'Contaminantes: CO2, NOx, SO2, CO, HC, partículas'],
    fuente: 'Tema 1, diap. 4',
  }),
  c({
    id: 'T1-11',
    nombre: 'Inconveniente: problemas de combustible',
    alias: ['problemas de combustible', 'precio del petroleo', 'carencia de petroleo'],
    regla:
      'Inconveniente de los MCIA: problemas de combustible. El precio del petróleo y su posible carencia en el futuro (medio-largo plazo) provocan: la necesidad de optimizar los procesos de combustión mejorando el rendimiento, la búsqueda de nuevos combustibles (biocombustibles, H2, GNC, GNL…) y la aparición de nuevas tecnologías (motores eléctricos, híbridos…).',
    boletin:
      'Segundo inconveniente: el combustible. Su precio y su posible carencia a medio-largo plazo tienen tres consecuencias: (1) optimizar la combustión mejorando el rendimiento, (2) buscar nuevos combustibles (biocombustibles, H2, GNC, GNL) y (3) la aparición de nuevas tecnologías como motores eléctricos e híbridos.',
    pregunta: '¿Qué consecuencias tienen los problemas de combustible de los MCIA?',
    respuestaModelo:
      'El precio del petróleo y su posible carencia futura obligan a optimizar los procesos de combustión mejorando el rendimiento, a buscar nuevos combustibles (biocombustibles, H2, GNC, GNL) y han provocado la aparición de nuevas tecnologías (motores eléctricos, híbridos).',
    ideasClave: [
      'Causa: precio del petróleo y posible carencia futura',
      'Optimizar la combustión mejorando el rendimiento',
      'Nuevos combustibles (biocombustibles, H2, GNC, GNL) y nuevas tecnologías (eléctricos, híbridos)',
    ],
    fuente: 'Tema 1, diap. 4',
  }),
  c({
    id: 'T1-12',
    nombre: 'Aplicaciones de los MCIA',
    alias: ['aplicaciones', 'usos de los mcia'],
    regla:
      'Aplicaciones de los MCIA: transporte por carretera (automóviles, camiones, motocicletas…), maquinaria de obras públicas, maquinaria agrícola, propulsión ferroviaria, propulsión marina, grupos generadores de energía eléctrica (bajas potencias), accionamiento industrial (bombas, compresores…), accionamiento rural y cogeneración.',
    boletin:
      'Las aplicaciones de los MCIA son muy amplias: transporte por carretera, obras públicas, maquinaria agrícola, propulsión ferroviaria y marina, accionamiento industrial (bombas, compresores) y rural, cogeneración y grupos generadores de energía eléctrica. Ojo: en generación eléctrica el temario los sitúa en BAJAS potencias.',
    pregunta: 'Cita aplicaciones de los MCIA.',
    respuestaModelo:
      'Transporte por carretera, maquinaria de obras públicas y agrícola, propulsión ferroviaria y marina, grupos generadores de energía eléctrica de bajas potencias, accionamiento industrial (bombas, compresores) y rural, y cogeneración.',
    ideasClave: [
      'Transporte: carretera, ferroviario y marino',
      'Maquinaria (obras públicas, agrícola) y accionamiento industrial o rural',
      'Grupos generadores eléctricos de bajas potencias y cogeneración',
    ],
    fuente: 'Tema 1, diap. 5',
  }),
  c({
    id: 'T1-13',
    nombre: 'Criterios de clasificación de los MCIA',
    alias: ['clasificacion de los mcia', 'criterios de clasificacion', 'clasificacion'],
    regla:
      'Los MCIA se clasifican según: el proceso de combustión (MEP / MEC), la renovación de la carga (4T / 2T), el suministro de combustible (carburación / inyección directa o indirecta), la presión de admisión (aspiración natural / sobrealimentado), la refrigeración (por agua / por aire) y el número y disposición de cilindros (en línea, en V, en VR, en W, bóxer…).',
    boletin:
      'Este es el índice del tema: seis criterios de clasificación y sus tipos. Cada tipo pertenece a UN criterio: "sobrealimentado" va con la presión de admisión, "inyección" con el suministro de combustible, "4T/2T" con la renovación de la carga…',
    pregunta: '¿Según qué criterios se clasifican los MCIA?',
    respuestaModelo:
      'Según el proceso de combustión (MEP/MEC), la renovación de la carga (4T/2T), el suministro de combustible (carburación/inyección), la presión de admisión (aspiración natural/sobrealimentado), la refrigeración (agua/aire) y el número y disposición de los cilindros (línea, V, VR, W, bóxer).',
    ideasClave: [
      'Combustión (MEP/MEC) y renovación de la carga (4T/2T)',
      'Suministro de combustible (carburación/inyección) y presión de admisión (atmosférico/sobrealimentado)',
      'Refrigeración (agua/aire) y número y disposición de cilindros',
    ],
    fuente: 'Tema 1, diap. 6',
  }),
  c({
    id: 'T1-14',
    nombre: 'Motor de encendido provocado (MEP)',
    alias: ['mep', 'encendido provocado', 'motor de gasolina', 'motor otto'],
    regla:
      'MEP — Motor de Encendido Provocado (motor de gasolina o motor Otto): la combustión es originada por un agente externo, usualmente una chispa provocada por una bujía, que inflama la mezcla aire-combustible. Combustibles: gasolina, GN, GLP, bioetanol…',
    boletin:
      'En el MEP la combustión NO empieza sola: la provoca un agente externo, normalmente la chispa de la bujía, que inflama la mezcla aire-combustible. Se le llama también motor de gasolina u Otto. Combustibles: gasolina, gas natural (GN), gas licuado del petróleo (GLP), bioetanol…',
    pregunta: '¿Cómo se inicia la combustión en un MEP y qué combustibles usa?',
    respuestaModelo:
      'La combustión la origina un agente externo, usualmente una chispa provocada por una bujía que inflama la mezcla aire-combustible. Usa gasolina, GN, GLP, bioetanol…',
    ideasClave: [
      'La combustión la origina un agente externo',
      'Normalmente la chispa de una bujía que inflama la mezcla aire-combustible',
      'Combustibles: gasolina, GN, GLP, bioetanol',
    ],
    fuente: 'Tema 1, diap. 7',
  }),
  c({
    id: 'T1-15',
    nombre: 'Motor de encendido por compresión (MEC)',
    alias: ['mec', 'encendido por compresion', 'motor diesel'],
    regla:
      'MEC — Motor de Encendido por Compresión (motor diésel): el aire sufre una fuerte compresión de forma que se garantiza la autoinflamación del combustible en el momento de la inyección. Combustibles: diésel, biodiésel…',
    boletin:
      'En el MEC no hay bujía que provoque la combustión: el aire se comprime tanto que, cuando se inyecta el combustible, este se autoinflama. Combustibles: diésel (gasóleo), biodiésel…',
    pregunta: '¿Cómo se produce la combustión en un MEC y qué combustibles usa?',
    respuestaModelo:
      'El aire sufre una fuerte compresión que garantiza la autoinflamación del combustible en el momento de la inyección. Usa diésel, biodiésel…',
    ideasClave: ['Fuerte compresión del aire', 'Autoinflamación del combustible al inyectarlo', 'Combustibles: diésel, biodiésel'],
    fuente: 'Tema 1, diap. 7',
  }),

  // ───────────── Jornada 2: renovación de la carga ─────────────
  c({
    id: 'T1-16',
    nombre: 'Motor de cuatro tiempos (4T)',
    alias: ['4t', 'cuatro tiempos', '4 tiempos'],
    regla: 'Motor de 4 tiempos (4T): 4 movimientos del pistón ↔ 2 revoluciones del cigüeñal por ciclo.',
    boletin:
      'Clasificación por renovación de la carga. En el 4T el ciclo completo necesita 4 movimientos (carreras) del pistón, que corresponden a 2 revoluciones del cigüeñal: cada tiempo es media vuelta.',
    imagen: { id: 'V1-01', pie: 'Motor de cuatro tiempos en corte (diap. 10).' },
    pregunta: '¿Qué caracteriza a un motor de 4 tiempos?',
    respuestaModelo: 'Que el ciclo se completa en 4 movimientos del pistón, que equivalen a 2 revoluciones del cigüeñal.',
    ideasClave: ['4 movimientos (carreras) del pistón por ciclo', '2 revoluciones del cigüeñal por ciclo'],
    fuente: 'Tema 1, diap. 6 y 8',
  }),
  c({
    id: 'T1-17',
    nombre: 'Motor de dos tiempos (2T)',
    alias: ['2t', 'dos tiempos', '2 tiempos'],
    regla: 'Motor de 2 tiempos (2T): 2 movimientos del pistón ↔ 1 revolución del cigüeñal por ciclo.',
    boletin:
      'En el 2T el ciclo se completa en solo 2 movimientos del pistón, es decir, en 1 revolución del cigüeñal.',
    imagen: { id: 'V1-02', pie: 'Motor de dos tiempos (diap. 11).' },
    pregunta: '¿Qué caracteriza a un motor de 2 tiempos frente al de 4?',
    respuestaModelo: 'El ciclo se completa en 2 movimientos del pistón, es decir, en 1 revolución del cigüeñal (el 4T necesita 4 y 2).',
    ideasClave: ['2 movimientos (carreras) del pistón por ciclo', '1 revolución del cigüeñal por ciclo'],
    fuente: 'Tema 1, diap. 6 y 8',
  }),
  c({
    id: 'T1-18',
    nombre: 'Punto muerto superior (PMS)',
    alias: ['pms', 'punto muerto superior'],
    regla:
      'Punto muerto superior (PMS): posición del émbolo cuando hay el mínimo volumen en el cilindro (volumen de la cámara de combustión).',
    boletin:
      'El PMS es la posición más alta del émbolo: el volumen encerrado en el cilindro es el MÍNIMO y coincide con el volumen de la cámara de combustión.',
    imagen: { id: 'A1-01', pie: 'PMS, PMI y carrera (diap. 8).' },
    pregunta: 'Define punto muerto superior.',
    respuestaModelo: 'Es la posición del émbolo cuando hay el mínimo volumen en el cilindro, que es el volumen de la cámara de combustión.',
    ideasClave: ['Posición del émbolo', 'Volumen mínimo en el cilindro', 'Ese volumen es el de la cámara de combustión'],
    fuente: 'Tema 1, diap. 8',
  }),
  c({
    id: 'T1-19',
    nombre: 'Punto muerto inferior (PMI)',
    alias: ['pmi', 'punto muerto inferior'],
    regla: 'Punto muerto inferior (PMI): posición del émbolo cuando hay el máximo volumen en el cilindro.',
    boletin: 'El PMI es la posición más baja del émbolo: el volumen encerrado en el cilindro es el MÁXIMO.',
    imagen: { id: 'A1-01', pie: 'PMS, PMI y carrera (diap. 8).' },
    pregunta: 'Define punto muerto inferior.',
    respuestaModelo: 'Es la posición del émbolo cuando hay el máximo volumen en el cilindro.',
    ideasClave: ['Posición del émbolo', 'Volumen máximo en el cilindro'],
    fuente: 'Tema 1, diap. 8',
  }),
  c({
    id: 'T1-20',
    nombre: 'Carrera (s)',
    alias: ['carrera', 's'],
    regla: 'Carrera (s): distancia entre el PMS y el PMI. Es la máxima longitud que puede recorrer el pistón.',
    boletin: 'La carrera es una LONGITUD (no un volumen): la distancia entre PMS y PMI, el máximo recorrido del pistón.',
    imagen: { id: 'A1-01', pie: 'La carrera es la distancia entre PMS y PMI (diap. 8).' },
    pregunta: 'Define la carrera de un motor.',
    respuestaModelo: 'Es la distancia entre el PMS y el PMI, la máxima longitud que puede recorrer el pistón.',
    ideasClave: ['Distancia (longitud) entre PMS y PMI', 'Máximo recorrido del pistón'],
    fuente: 'Tema 1, diap. 8',
  }),
  c({
    id: 'T1-21',
    nombre: 'Cilindrada unitaria (volumen de desplazamiento)',
    alias: ['cilindrada unitaria', 'volumen de desplazamiento', 'cilindrada'],
    regla: 'Volumen de desplazamiento o cilindrada unitaria: volumen desplazado por el émbolo cuando se mueve entre el PMS y el PMI.',
    boletin:
      'La cilindrada unitaria es un VOLUMEN: el que barre el émbolo de un cilindro al ir del PMS al PMI. No hay que confundirla con la carrera (que es una longitud) ni con el volumen de la cámara de combustión (el que queda en el PMS).',
    imagen: { id: 'A1-01', pie: 'El émbolo desplaza la cilindrada unitaria entre PMS y PMI (diap. 8).' },
    pregunta: '¿Qué es la cilindrada unitaria?',
    respuestaModelo: 'Es el volumen de desplazamiento: el volumen desplazado por el émbolo cuando se mueve entre el PMS y el PMI.',
    ideasClave: ['Es un volumen desplazado por el émbolo', 'Entre el PMS y el PMI'],
    fuente: 'Tema 1, diap. 8',
  }),
  c({
    id: 'T1-22',
    nombre: '4T · Admisión',
    alias: ['admision', 'tiempo de admision', 'primer tiempo'],
    regla:
      'Primer tiempo, ADMISIÓN: el pistón baja y entra la mezcla de aire y combustible por la válvula de admisión, que está abierta (la de escape, cerrada). El cigüeñal da ½ revolución.',
    boletin:
      'Admisión: el pistón BAJA del PMS al PMI y aspira la carga a través de la válvula de admisión ABIERTA. Media vuelta de cigüeñal.',
    imagen: { id: 'A1-02', pie: 'Los cuatro tiempos (diap. 9).' },
    pregunta: 'Describe el tiempo de admisión de un motor 4T.',
    respuestaModelo:
      'El pistón baja y aspira la mezcla de aire y combustible a través de la válvula de admisión, que está abierta. El cigüeñal gira media vuelta.',
    ideasClave: ['El pistón baja', 'Válvula de admisión abierta: entra la mezcla', 'Media vuelta de cigüeñal'],
    fuente: 'Tema 1, diap. 9 y 10',
  }),
  c({
    id: 'T1-23',
    nombre: '4T · Compresión',
    alias: ['compresion', 'tiempo de compresion', 'segundo tiempo'],
    regla:
      'Segundo tiempo, COMPRESIÓN: el pistón sube y se comprimen el combustible y el aire; las válvulas están cerradas. El cigüeñal da ½ revolución.',
    boletin: 'Compresión: el pistón SUBE con las DOS válvulas CERRADAS y comprime la mezcla. Otra media vuelta de cigüeñal.',
    imagen: { id: 'A1-02', pie: 'Los cuatro tiempos (diap. 9).' },
    pregunta: 'Describe el tiempo de compresión de un motor 4T.',
    respuestaModelo: 'El pistón sube con las válvulas cerradas y comprime la mezcla de aire y combustible. El cigüeñal gira media vuelta.',
    ideasClave: ['El pistón sube comprimiendo la mezcla', 'Las dos válvulas cerradas', 'Media vuelta de cigüeñal'],
    fuente: 'Tema 1, diap. 9 y 10',
  }),
  c({
    id: 'T1-24',
    nombre: '4T · Expansión (combustión)',
    alias: ['expansion', 'combustion expansion', 'tercer tiempo', 'tiempo de potencia', 'explosion'],
    regla:
      'Tercer tiempo, EXPANSIÓN: la mezcla explota (por la chispa de la bujía en los motores de gasolina o por la propia compresión en los diésel) y, con las válvulas cerradas, empuja el pistón hacia abajo. Es el tiempo de potencia. El cigüeñal da ½ revolución.',
    boletin:
      'Expansión: la combustión empuja el pistón HACIA ABAJO con las válvulas CERRADAS. Es el único tiempo que produce potencia. La mezcla se inflama por chispa (gasolina) o por la propia compresión (diésel).',
    imagen: { id: 'A1-02', pie: 'Los cuatro tiempos (diap. 9).' },
    pregunta: 'Describe el tiempo de expansión de un motor 4T.',
    respuestaModelo:
      'La mezcla se inflama (por la chispa de la bujía en gasolina o por la propia compresión en diésel) y, con las válvulas cerradas, los gases empujan el pistón hacia abajo. Es el tiempo que produce potencia; el cigüeñal gira media vuelta.',
    ideasClave: [
      'Combustión de la mezcla (chispa en gasolina, compresión en diésel)',
      'Válvulas cerradas y el pistón baja empujado',
      'Es el tiempo de potencia',
    ],
    fuente: 'Tema 1, diap. 9 y 10',
  }),
  c({
    id: 'T1-25',
    nombre: '4T · Escape',
    alias: ['escape', 'tiempo de escape', 'cuarto tiempo'],
    regla:
      'Cuarto tiempo, ESCAPE: el pistón sube y expulsa los gases quemados por la válvula de escape, que está abierta. El cigüeñal da ½ revolución.',
    boletin: 'Escape: el pistón SUBE y empuja los gases quemados fuera de la cámara a través de la válvula de escape ABIERTA.',
    imagen: { id: 'A1-02', pie: 'Los cuatro tiempos (diap. 9).' },
    pregunta: 'Describe el tiempo de escape de un motor 4T.',
    respuestaModelo: 'El pistón sube y expulsa los gases quemados a través de la válvula de escape, que está abierta. El cigüeñal gira media vuelta.',
    ideasClave: ['El pistón sube', 'Expulsa los gases quemados por la válvula de escape abierta', 'Media vuelta de cigüeñal'],
    fuente: 'Tema 1, diap. 9 y 10',
  }),
  c({
    id: 'T1-26',
    nombre: '2T · Características: lumbreras, cárter y barrido',
    alias: ['lumbreras', 'caracteristicas del 2t', 'barrido', 'carter'],
    regla:
      'Motor de 2 tiempos: las válvulas se sustituyen por LUMBRERAS (orificios realizados en el propio cilindro); el CÁRTER sirve como depósito de preadmisión del aire; existe un proceso de BARRIDO.',
    boletin:
      'El 2T no tiene válvulas: usa lumbreras, que son orificios en el propio cilindro que el pistón abre y cierra al moverse. El cárter hace de depósito de preadmisión y los gases quemados se expulsan mediante el barrido.',
    imagen: { id: 'V1-02', pie: 'Motor de dos tiempos: lumbreras y cárter (diap. 11).' },
    pregunta: '¿Qué características constructivas tiene un motor de 2 tiempos?',
    respuestaModelo:
      'Las válvulas se sustituyen por lumbreras (orificios en el propio cilindro), el cárter sirve como depósito de preadmisión del aire y existe un proceso de barrido.',
    ideasClave: ['Lumbreras (orificios en el cilindro) en lugar de válvulas', 'El cárter es depósito de preadmisión', 'Proceso de barrido'],
    fuente: 'Tema 1, diap. 11',
  }),

  // ───────────── Jornada 3: 2T, combustible, sobrealimentación, refrigeración, disposición ─────────────
  c({
    id: 'T1-27',
    nombre: '2T · Fases del ciclo',
    alias: ['fases del 2t', 'ciclo de dos tiempos', 'admision compresion', 'potencia escape'],
    regla:
      'Ciclo 2T. Fase de ADMISIÓN-COMPRESIÓN: el pistón sube desde el PMI; la cara superior comprime en el cilindro mientras la cara inferior succiona la mezcla aire-combustible al cárter a través de la lumbrera de admisión (el cárter ha de estar sellado). Fase de POTENCIA-ESCAPE: en el PMS se provoca la combustión; la expansión hace bajar el pistón, que abre la lumbrera de escape (salen los gases) y la lumbrera de transferencia (la mezcla pasa del cárter al cilindro). En el PMI empieza a subir, cierra la transferencia y comienza un nuevo ciclo.',
    boletin:
      'Dos fases por vuelta. Al SUBIR: arriba se comprime y abajo el cárter (sellado) aspira mezcla por la lumbrera de admisión. Al BAJAR tras la combustión: se abre primero el escape y la lumbrera de transferencia lleva la mezcla del cárter al cilindro.',
    imagen: { id: 'A1-03', pie: 'Fases del motor de dos tiempos (diap. 11).' },
    pregunta: 'Describe las dos fases del ciclo de un motor de 2 tiempos.',
    respuestaModelo:
      'Admisión-compresión: el pistón sube desde el PMI; por encima comprime la mezcla en el cilindro y por debajo succiona mezcla al cárter (sellado) por la lumbrera de admisión. Potencia-escape: en el PMS se produce la combustión, el pistón baja y abre la lumbrera de escape (salen los gases) y la de transferencia, por la que la mezcla pasa del cárter al cilindro.',
    ideasClave: [
      'Subida: compresión arriba y succión de mezcla al cárter (sellado) por la lumbrera de admisión',
      'Bajada: combustión/expansión y apertura de la lumbrera de escape',
      'Lumbrera de transferencia: la mezcla pasa del cárter al cilindro',
    ],
    fuente: 'Tema 1, diap. 12',
  }),
  c({
    id: 'T1-28',
    nombre: '2T · Ventajas respecto al 4T y aplicaciones',
    alias: ['ventajas del 2t', 'ventajas dos tiempos', 'aplicaciones del 2t'],
    regla:
      'Ventajas del 2T respecto al 4T: mayor potencia específica por volumen y peso del motor (teóricamente la misma potencia en la mitad de tiempo, 1 vuelta de cigüeñal); más ligeros, sencillos y económicos (se elimina el sistema de renovación de la carga y sus inercias, menos sistemas auxiliares). Aplicación: gasolina para pequeñas potencias y cilindradas (menos de 350 cc: motocicletas, fueraborda, motosierras, cortacéspedes…); diésel para grandes potencias a bajas revoluciones (motores de barcos, 35.000 CV a 80–200 rpm).',
    boletin:
      'El 2T da más potencia por volumen y peso (un ciclo por vuelta) y es más ligero, sencillo y barato. Por eso se usa en gasolina para cosas pequeñas (<350 cc) y, en diésel, en los enormes motores lentos de barco (35.000 CV a 80–200 rpm).',
    pregunta: '¿Qué ventajas tiene el motor de 2 tiempos frente al de 4 y dónde se aplica?',
    respuestaModelo:
      'Mayor potencia específica por volumen y peso (un ciclo por vuelta de cigüeñal) y motores más ligeros, sencillos y económicos al eliminar el sistema de renovación de la carga. Se aplica en gasolina a pequeñas potencias y cilindradas (<350 cc: motos, fuerabordas, motosierras) y en diésel a grandes potencias a bajas revoluciones (barcos).',
    ideasClave: [
      'Mayor potencia específica (un ciclo en 1 vuelta)',
      'Más ligeros, sencillos y económicos (sin sistema de renovación de la carga por válvulas)',
      'Gasolina: pequeñas cilindradas (<350 cc); diésel: grandes potencias a bajas rpm (barcos)',
    ],
    fuente: 'Tema 1, diap. 13',
  }),
  c({
    id: 'T1-29',
    nombre: '2T · Inconvenientes respecto al 4T',
    alias: ['inconvenientes del 2t', 'inconvenientes dos tiempos'],
    regla:
      'Inconvenientes del 2T respecto al 4T: consumo de aceite (se quema una mezcla de aire-combustible y aceite; la suciedad en el cilindro puede afectar a la bujía e impedir su correcto funcionamiento); rendimiento inferior (la combustión y la renovación de la carga son menos efectivas que en el 4T); emisiones más contaminantes.',
    boletin:
      'El precio de la sencillez del 2T: quema aceite junto con la mezcla (y ensucia la bujía), rinde menos porque combustión y renovación de la carga son peores, y contamina más.',
    pregunta: '¿Qué inconvenientes tiene el motor de 2 tiempos frente al de 4?',
    respuestaModelo:
      'Consume aceite, porque se quema una mezcla de aire, combustible y aceite que ensucia el cilindro y la bujía; tiene menor rendimiento porque la combustión y la renovación de la carga son menos efectivas; y sus emisiones son más contaminantes.',
    ideasClave: [
      'Consumo de aceite (se quema con la mezcla; suciedad que afecta a la bujía)',
      'Rendimiento inferior (peor combustión y renovación de la carga)',
      'Emisiones más contaminantes',
    ],
    fuente: 'Tema 1, diap. 13',
  }),
  c({
    id: 'T1-30',
    nombre: 'Suministro de combustible: carburación e inyección',
    alias: ['suministro de combustible', 'carburacion', 'inyeccion directa', 'inyeccion indirecta', 'monopunto', 'multipunto'],
    regla:
      'Suministro de combustible: carburación o inyección. Inyección DIRECTA: el combustible se inyecta directamente en la cámara de combustión. Inyección INDIRECTA: se inyecta en el conducto de admisión; puede ser MONOPUNTO (un solo inyector) o MULTIPUNTO (un inyector para cada cilindro).',
    boletin:
      'La mezcla en los MEP se preparó primero con carburador, luego con inyección indirecta (en el conducto/múltiple de admisión) y después con inyección directa (dentro de la cámara de combustión). La indirecta puede tener un único inyector (monopunto) o uno por cilindro (multipunto).',
    imagen: { id: 'V1-03', pie: 'Evolución del sistema de inyección (diap. 14).' },
    pregunta: 'Clasifica los MCIA según el suministro de combustible.',
    respuestaModelo:
      'Por carburación o por inyección. La inyección es directa si el combustible se inyecta en la cámara de combustión e indirecta si se inyecta en el conducto de admisión; la indirecta puede ser monopunto (un solo inyector) o multipunto (un inyector por cilindro).',
    ideasClave: [
      'Carburación o inyección',
      'Directa: en la cámara de combustión; indirecta: en el conducto de admisión',
      'Indirecta monopunto (un inyector) o multipunto (uno por cilindro)',
    ],
    fuente: 'Tema 1, diap. 14 y 15',
  }),
  c({
    id: 'T1-31',
    nombre: 'Inyección directa: ventajas e inconvenientes',
    alias: ['ventajas inyeccion directa', 'inconvenientes inyeccion directa'],
    regla:
      'Inyección directa. Ventajas: menor consumo de combustible (menores pérdidas de calor) → mayor rendimiento; mayor relación de compresión; funcionamiento más estable. Inconvenientes: mayores emisiones de NOx; no posibilidad de aplicar el ciclo Atkinson (híbridos); más cara; los inyectores sufren más (mayor mantenimiento).',
    boletin:
      'La inyección directa gana en consumo y rendimiento (menos pérdidas de calor), permite mayor relación de compresión y funciona de forma más estable. A cambio emite MÁS NOx, impide usar el ciclo Atkinson de los híbridos, es más cara y sus inyectores necesitan más mantenimiento.',
    pregunta: '¿Qué ventajas e inconvenientes tiene la inyección directa?',
    respuestaModelo:
      'Ventajas: menor consumo por menores pérdidas de calor y por tanto mayor rendimiento, mayor relación de compresión y funcionamiento más estable. Inconvenientes: mayores emisiones de NOx, no permite aplicar el ciclo Atkinson (híbridos), es más cara y los inyectores sufren más.',
    ideasClave: [
      'Ventajas: menor consumo/mayor rendimiento, mayor relación de compresión, funcionamiento más estable',
      'Inconvenientes: más NOx y sin ciclo Atkinson',
      'Inconvenientes: más cara y más mantenimiento de inyectores',
    ],
    fuente: 'Tema 1, diap. 16',
  }),
  c({
    id: 'T1-32',
    nombre: 'Sistema common rail',
    alias: ['common rail', 'conducto comun', 'rampa comun'],
    regla: 'Sistema COMMON RAIL: sistema de inyección directa diésel donde la alimentación de combustible se realiza desde un conducto común.',
    boletin:
      'El common rail es inyección DIRECTA en motores DIÉSEL: todos los inyectores (de control eléctrico) se alimentan desde un mismo conducto común a presión, gobernados por una unidad de control electrónico.',
    imagen: { id: 'A1-04', pie: 'Esquema de un sistema common rail (diap. 17).' },
    pregunta: '¿Qué es el sistema common rail?',
    respuestaModelo: 'Un sistema de inyección directa para motores diésel en el que la alimentación de combustible a los inyectores se realiza desde un conducto común.',
    ideasClave: ['Inyección directa', 'En motores diésel', 'Alimentación desde un conducto común'],
    fuente: 'Tema 1, diap. 17',
  }),
  c({
    id: 'T1-33',
    nombre: 'Aspiración natural y sobrealimentación',
    alias: ['aspiracion natural', 'sobrealimentacion', 'sobrealimentado', 'atmosferico', 'presion de admision'],
    regla:
      'Según la presión de admisión. ASPIRACIÓN NATURAL: el aire (o la mezcla aire-combustible) entra al cilindro a presión atmosférica. SOBREALIMENTADO: el aire entra a mayor presión que la atmosférica impulsado por un compresor. Objetivo de la sobrealimentación: aumentar la potencia del motor mediante el incremento del caudal de aire de admisión (incremento de la densidad del aire), incrementando la presión (turbocompresor) y reduciendo la temperatura (intercooler).',
    boletin:
      'Un motor atmosférico admite el aire a presión atmosférica. Uno sobrealimentado lo admite a más presión gracias a un compresor. ¿Para qué? Para meter más masa de aire (más densidad) y así aumentar la potencia: se sube la presión con el turbocompresor y se baja la temperatura con el intercooler.',
    pregunta: '¿Cuál es el objetivo de la sobrealimentación y cómo se consigue?',
    respuestaModelo:
      'Aumentar la potencia del motor incrementando el caudal de aire de admisión, es decir, su densidad. Se consigue aumentando la presión del aire (turbocompresor) y reduciendo su temperatura (intercooler).',
    ideasClave: [
      'Objetivo: aumentar la potencia',
      'Aumentando el caudal/densidad del aire de admisión',
      'Más presión (turbocompresor) y menos temperatura (intercooler)',
    ],
    fuente: 'Tema 1, diap. 18',
  }),
  c({
    id: 'T1-34',
    nombre: 'Turbocompresor e intercooler',
    alias: ['turbocompresor', 'turbo', 'intercooler'],
    regla:
      'TURBOCOMPRESOR: una turbina accionada por los gases de escape mueve un compresor, el cual a su vez comprime el aire que entra en el motor (incremento de presión). INTERCOOLER: intercambiador de calor que baja la temperatura del aire de admisión.',
    boletin:
      'El turbo aprovecha los gases de ESCAPE para mover una TURBINA; la turbina, por un eje común, mueve el COMPRESOR que comprime el aire de ADMISIÓN. Al comprimirse el aire se calienta, así que el intercooler (un intercambiador de calor) lo enfría antes de entrar al motor.',
    imagen: { id: 'V1-04', pie: 'Esquema de un motor sobrealimentado (diap. 19).' },
    pregunta: 'Explica el funcionamiento del turbocompresor y la función del intercooler.',
    respuestaModelo:
      'Los gases de escape accionan una turbina que mueve un compresor, que comprime el aire que entra en el motor. El intercooler es un intercambiador de calor que baja la temperatura del aire de admisión.',
    ideasClave: ['La turbina la accionan los gases de escape', 'La turbina mueve el compresor, que comprime el aire de admisión', 'El intercooler enfría el aire de admisión'],
    fuente: 'Tema 1, diap. 18–20',
  }),
  c({
    id: 'T1-35',
    nombre: 'Refrigeración por aire y por agua',
    alias: ['refrigeracion', 'refrigeracion por aire', 'refrigeracion por agua', 'aletas', 'radiador'],
    regla:
      'Refrigeración POR AIRE: aletas para aumentar la transmisión de calor; apta para motores de aluminio pero mayor dimensión del motor. Refrigeración POR AGUA (con aditivos y anticongelante): existen cámaras de agua en bloque y culata por donde se hace circular el agua; se debe disponer de una bomba de agua y un intercambiador de calor (radiador).',
    boletin:
      'Dos métodos. Por aire: el cilindro lleva aletas que aumentan la superficie de transmisión de calor (bien para aluminio, pero el motor abulta más). Por agua: el agua (con aditivos y anticongelante) circula por cámaras en bloque y culata, impulsada por una bomba, y se enfría en el radiador.',
    imagen: { id: 'V1-05', pie: 'Aletas (aire) y radiador (agua) (diap. 21).' },
    pregunta: 'Compara la refrigeración por aire y por agua.',
    respuestaModelo:
      'Por aire: el cilindro lleva aletas que aumentan la transmisión de calor; es apta para motores de aluminio pero aumenta la dimensión del motor. Por agua: el agua con aditivos y anticongelante circula por cámaras en bloque y culata, y hace falta una bomba de agua y un intercambiador de calor (radiador).',
    ideasClave: [
      'Aire: aletas que aumentan la transmisión de calor (apta para aluminio, motor más grande)',
      'Agua: circula por cámaras en bloque y culata (con aditivos y anticongelante)',
      'Agua: necesita bomba de agua y radiador',
    ],
    fuente: 'Tema 1, diap. 21',
  }),
  c({
    id: 'T1-36',
    nombre: 'Motores en línea',
    alias: ['en linea', 'motor en linea', 'cilindros en linea'],
    regla:
      'Motores EN LÍNEA: los más habituales. Cuentan con un solo bloque y una sola culata. Por encima de 6 cilindros el cigüeñal es muy grande (problema estructural).',
    boletin:
      'Disposición más habitual: todos los cilindros en fila, un bloque y una culata. Su límite: con más de 6 cilindros el cigüeñal se hace demasiado largo (problema estructural).',
    imagen: { id: 'V1-06', pie: 'Motor en línea (diap. 22).' },
    pregunta: '¿Qué caracteriza a los motores en línea?',
    respuestaModelo: 'Son los más habituales; tienen un solo bloque y una sola culata, y por encima de 6 cilindros el cigüeñal resulta muy grande, lo que es un problema estructural.',
    ideasClave: ['Un solo bloque y una sola culata', 'Son los más habituales', 'Más de 6 cilindros: cigüeñal muy grande (problema estructural)'],
    fuente: 'Tema 1, diap. 22',
  }),
  c({
    id: 'T1-37',
    nombre: 'Motores en V y en VR',
    alias: ['en v', 'motor en v', 'vr', 'motor vr', 'en vr'],
    regla:
      'Motores EN V: dos bloques y dos culatas, pero un solo cigüeñal; por encima de 6 cilindros el tamaño del cigüeñal puede reducirse (ángulo entre bancadas de 60–120° en la figura). Motores EN VR: motores en V con un ángulo entre cilindros muy pequeño (inferior a 15°), lo que permite emplear un único sistema bloque-culata.',
    boletin:
      'En V: dos bancadas (dos bloques y dos culatas) que comparten un único cigüeñal, más corto que el de un motor en línea equivalente. En VR: una V muy cerrada (menos de 15°) que permite volver a un único bloque y una única culata.',
    imagen: { id: 'V1-07', pie: 'Motor en V (diap. 23).' },
    pregunta: '¿Qué diferencia un motor en V de uno en VR?',
    respuestaModelo:
      'El motor en V tiene dos bloques y dos culatas con un solo cigüeñal, que puede ser más corto por encima de 6 cilindros. El VR es un motor en V con un ángulo muy pequeño entre cilindros (inferior a 15°), lo que permite un único conjunto bloque-culata.',
    ideasClave: [
      'V: dos bloques y dos culatas, un solo cigüeñal (más corto con más de 6 cilindros)',
      'VR: V con ángulo muy pequeño (< 15°)',
      'VR: un único bloque-culata',
    ],
    fuente: 'Tema 1, diap. 23 y 24',
  }),
  c({
    id: 'T1-38',
    nombre: 'Motores en W y bóxer',
    alias: ['en w', 'motor en w', 'boxer', 'cilindros opuestos', 'motor boxer'],
    regla:
      'Motores EN W: los cilindros se disponen en dos bloques VR unidos en una única bancada inferior donde hay un único cigüeñal. Motores con cilindros OPUESTOS o BÓXER: motor con cilindros en V formando un ángulo de 180°; su principal ventaja es reducir la altura del motor.',
    boletin:
      'En W: dos motores VR montados en V sobre una misma bancada y un único cigüeñal. Bóxer: una "V" abierta del todo, a 180° (cilindros opuestos), cuya gran ventaja es que el motor es más bajo.',
    imagen: { id: 'V1-09', pie: 'Motor en W (diap. 25).' },
    pregunta: 'Describe los motores en W y los bóxer.',
    respuestaModelo:
      'En W: los cilindros se disponen en dos bloques VR unidos en una única bancada inferior con un único cigüeñal. Bóxer: los cilindros están opuestos, en V a 180°, y su principal ventaja es reducir la altura del motor.',
    ideasClave: ['W: dos bloques VR en una única bancada con un solo cigüeñal', 'Bóxer: cilindros opuestos, V a 180°', 'Bóxer: reduce la altura del motor'],
    fuente: 'Tema 1, diap. 25 y 26',
  }),
];
