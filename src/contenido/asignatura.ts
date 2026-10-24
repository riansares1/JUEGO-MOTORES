// Registro de la asignatura: temas, jornadas y reglas económicas del juego.
// Para añadir un tema: crear contenido/temaN/ y sumarlo aquí (conceptos, imágenes, plantillas y jornadas).
import type { Asignatura, ConfigJuego, JornadaDef } from '../motor/tipos';
import { tema1 } from './tema1';

const rango = (tema: number, desde: number, hasta: number) =>
  Array.from({ length: hasta - desde + 1 }, (_, i) => `T${tema}-${String(desde + i).padStart(2, '0')}`);

const faseAprendizaje = { maxDocumentos: 1, maxDiscrepancias: 1, soloDiaYAnterior: true } as const;

export const jornadas: JornadaDef[] = [
  {
    numero: 1,
    titulo: 'Jornada 1 · Qué es un MCIA',
    presentacion:
      'Bienvenida al Puesto de Inspección de Motores. Hoy empiezas en la ventanilla: definiciones básicas, ventajas e inconvenientes de los MCIA, sus aplicaciones, los criterios de clasificación y los dos procesos de combustión (MEP y MEC).',
    conceptosNuevos: rango(1, 1, 15),
    imagenesNuevas: [],
    numExpedientes: 12,
    ...faseAprendizaje,
    rayosX: false,
  },
  {
    numero: 2,
    titulo: 'Jornada 2 · Renovación de la carga',
    presentacion:
      'El Ministerio amplía tus competencias a la renovación de la carga: motores de cuatro y dos tiempos, puntos muertos, carrera, cilindrada unitaria, los cuatro tiempos y las características constructivas del dos tiempos.',
    conceptosNuevos: rango(1, 16, 26),
    imagenesNuevas: ['V1-01', 'V1-02'],
    numExpedientes: 10,
    ...faseAprendizaje,
    rayosX: false,
  },
  {
    numero: 3,
    titulo: 'Jornada 3 · Sistemas y disposiciones',
    presentacion:
      'Última jornada del Tema 1. Llegan el ciclo del dos tiempos y su balance, el suministro de combustible, la sobrealimentación, la refrigeración y la disposición de los cilindros. Además, se instala en tu mesa el ESCÁNER DE RAYOS X: úsalo para ver el interior del motor y contrastarlo con la ficha.',
    conceptosNuevos: rango(1, 27, 38),
    imagenesNuevas: ['V1-03', 'V1-04', 'V1-05', 'V1-06', 'V1-07', 'V1-08', 'V1-09', 'V1-10'],
    numExpedientes: 12,
    ...faseAprendizaje,
    rayosX: true,
  },
];

export const config: ConfigJuego = {
  sueldoExpediente: 10,
  medioSueldo: 5,
  multaCitacion: 5,
  avisosPorJornada: 2,
  costeConsulta: 3,
  umbralRecuperacion: 1 / 3,
  porcentajeLimpiosMin: 0.25,
  porcentajeLimpiosMax: 0.3,
  numExpedientesRecuperacion: 8,
};

export const asignatura: Asignatura = {
  id: 'mci-motores-combustion-interna',
  nombre: 'Motores de Combustión Interna',
  temas: [
    { numero: 1, nombre: 'Clasificación de los MCIA' },
    { numero: 2, nombre: 'Elementos constructivos' },
    { numero: 3, nombre: 'Ciclos termodinámicos' },
    { numero: 4, nombre: 'Actuación de motores' },
  ],
  conceptos: [...tema1.conceptos],
  imagenes: [...tema1.imagenes],
  plantillas: [...tema1.plantillas],
  jornadas,
  config,
};
