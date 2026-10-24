import type { Asignatura, Concepto, PlantillaExpediente } from '../tipos';

const concepto = (id: string, nombre: string, alias: string[] = []): Concepto => ({
  id,
  tema: 1,
  nombre,
  alias,
  regla: `Regla ${nombre}`,
  boletin: `Boletín ${nombre}`,
  pregunta: `¿Qué es ${nombre}?`,
  respuestaModelo: `Modelo ${nombre}`,
  ideasClave: ['idea A', 'idea B'],
  fuente: 'test',
});

export const conceptos: Concepto[] = [
  concepto('T1-01', 'Motor de encendido provocado', ['MEP']),
  concepto('T1-02', 'Motor de encendido por compresión', ['MEC', 'motor diésel']),
  concepto('T1-03', 'Cuatro tiempos', ['4T']),
  concepto('T1-04', 'Dos tiempos', ['2T']),
  concepto('T1-05', 'Refrigeración por aire'),
];

const ficha = (id: string, combustible: string, encendido: string): PlantillaExpediente => ({
  id,
  conceptos: ['T1-01', 'T1-02'],
  solicitante: 'Talleres Prueba',
  motivo: 'Homologación',
  documentos: [
    {
      id: 'f',
      tipo: 'ficha',
      titulo: 'Ficha',
      campos: [
        { id: 'comb', etiqueta: 'Combustible', valor: combustible },
        { id: 'enc', etiqueta: 'Encendido', valor: encendido },
      ],
      foto: { id: 'foto', imagen: 'V1-05', recorte: 'aletas' },
    },
  ],
  rayosX: { imagen: 'V1-05' },
  discrepancias: [
    {
      id: 'enc-mal',
      concepto: 'T1-01',
      parches: [{ ref: 'f:enc', texto: 'Por compresión' }],
      elemento: 'f:enc',
      pruebas: [{ tipo: 'regla', concepto: 'T1-01' }, { tipo: 'elemento', ref: 'f:comb' }],
      explicacion: 'La gasolina es de MEP',
    },
    {
      id: 'foto-mal',
      concepto: 'T1-05',
      imagen: 'V1-05',
      parches: [{ ref: 'f:foto', zona: 'radiador' }],
      elemento: 'f:foto',
      pruebas: [{ tipo: 'regla', concepto: 'T1-05' }],
      explicacion: 'Foto de radiador',
      interrogatorio: [
        { tipo: 'nombrar', enunciado: '¿Qué muestra?', respuestaModelo: 'Un radiador', ideasClave: ['radiador', 'agua'] },
        { tipo: 'localizar', enunciado: 'Señala las aletas', respuestaModelo: '', ideasClave: [], imagen: 'V1-05', zonaCorrecta: 'aletas' },
      ],
    },
    {
      id: 'rx-mal',
      concepto: 'T1-05',
      parches: [{ ref: 'f:comb', texto: 'Gasolina' }],
      elemento: 'f:comb',
      pruebas: [{ tipo: 'elemento', ref: 'rx@aletas' }],
      explicacion: 'solo rayos X',
    },
  ],
});

const tiempos = (id: string): PlantillaExpediente => ({
  id,
  conceptos: ['T1-03', 'T1-04'],
  solicitante: 'Motos Prueba',
  motivo: 'Inspección',
  documentos: [
    {
      id: 'g',
      tipo: 'glosario',
      titulo: 'Glosario',
      entradas: [
        { id: 'e4', termino: '4T', definicion: '4 carreras, 2 vueltas' },
        { id: 'e2', termino: '2T', definicion: '2 carreras, 1 vuelta' },
      ],
    },
  ],
  discrepancias: [
    {
      id: '4t-mal',
      concepto: 'T1-03',
      parches: [{ ref: 'g:e4', texto: '4 carreras, 4 vueltas' }],
      elemento: 'g:e4',
      pruebas: [{ tipo: 'regla', concepto: 'T1-03' }],
      explicacion: '',
    },
    {
      id: '2t-mal',
      concepto: 'T1-04',
      parches: [{ ref: 'g:e2', texto: '2 carreras, 2 vueltas' }],
      elemento: 'g:e2',
      pruebas: [{ tipo: 'regla', concepto: 'T1-04' }],
      explicacion: '',
    },
  ],
});

export const asignatura: Asignatura = {
  id: 'test',
  nombre: 'Test',
  temas: [{ numero: 1, nombre: 'Tema 1' }],
  conceptos,
  imagenes: [
    {
      id: 'V1-05',
      titulo: 'Refrigeración',
      src: '',
      ancho: 100,
      alto: 50,
      fuente: '',
      seguimiento: true,
      conceptos: ['T1-05'],
      zonas: [
        { id: 'aletas', nombre: 'Aletas', x: 0, y: 0, w: 40, h: 100 },
        { id: 'radiador', nombre: 'Radiador', x: 60, y: 0, w: 40, h: 100 },
      ],
    },
  ],
  plantillas: [ficha('p1', 'Gasolina', 'Por chispa'), ficha('p2', 'GLP', 'Por chispa'), ficha('p3', 'Bioetanol', 'Por chispa'), tiempos('p4'), tiempos('p5')],
  jornadas: [
    {
      numero: 1,
      titulo: 'J1',
      presentacion: '',
      conceptosNuevos: ['T1-01', 'T1-02', 'T1-05'],
      imagenesNuevas: ['V1-05'],
      numExpedientes: 8,
      maxDocumentos: 1,
      maxDiscrepancias: 1,
      soloDiaYAnterior: true,
      rayosX: false,
    },
    {
      numero: 2,
      titulo: 'J2',
      presentacion: '',
      conceptosNuevos: ['T1-03', 'T1-04'],
      imagenesNuevas: [],
      numExpedientes: 10,
      maxDocumentos: 1,
      maxDiscrepancias: 1,
      soloDiaYAnterior: true,
      rayosX: true,
    },
  ],
  config: {
    sueldoExpediente: 10,
    medioSueldo: 5,
    multaCitacion: 5,
    avisosPorJornada: 2,
    costeConsulta: 3,
    umbralRecuperacion: 1 / 3,
    porcentajeLimpiosMin: 0.25,
    porcentajeLimpiosMax: 0.3,
    numExpedientesRecuperacion: 8,
  },
};
