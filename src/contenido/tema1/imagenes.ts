// Imágenes del Tema 1. Las zonas viven en zonas.json para poder corregirlas con /editor.
import type { ImagenDef, Zona } from '../../motor/tipos';
import zonas from './zonas.json';

const Z = zonas as Record<string, Zona[]>;

const img = (
  id: string,
  titulo: string,
  ancho: number,
  alto: number,
  fuente: string,
  conceptos: string[],
  seguimiento = id.startsWith('V'),
): ImagenDef => ({
  id,
  titulo,
  src: `img/tema1/${id}.jpg`,
  ancho,
  alto,
  fuente,
  seguimiento,
  conceptos,
  zonas: Z[id] ?? [],
});

export const imagenesTema1: ImagenDef[] = [
  // Inventario visual (dominio seguido)
  img('V1-01', 'Motor de cuatro tiempos en corte', 733, 840, 'Tema 1, diap. 10', ['T1-16', 'T1-22', 'T1-23', 'T1-24', 'T1-25']),
  img('V1-02', 'Motor de dos tiempos: piezas', 1180, 1033, 'Tema 1, diap. 11', ['T1-17', 'T1-26', 'T1-27']),
  img('V1-03', 'Evolución del sistema de inyección', 927, 994, 'Tema 1, diap. 14', ['T1-30']),
  img('V1-04', 'Esquema del motor sobrealimentado', 1400, 798, 'Tema 1, diap. 19 (y 20)', ['T1-33', 'T1-34']),
  img('V1-05', 'Refrigeración por aire y por agua', 1400, 456, 'Tema 1, diap. 21', ['T1-35']),
  img('V1-06', 'Motor en línea', 1400, 517, 'Tema 1, diap. 22', ['T1-36']),
  img('V1-07', 'Motor en V', 1400, 717, 'Tema 1, diap. 23', ['T1-37']),
  img('V1-08', 'Motor en VR', 1400, 848, 'Tema 1, diap. 24', ['T1-37']),
  img('V1-09', 'Motor en W', 1400, 761, 'Tema 1, diap. 25', ['T1-38']),
  img('V1-10', 'Motor bóxer (cilindros opuestos)', 1400, 855, 'Tema 1, diap. 26', ['T1-38']),
  // Imágenes de apoyo (sin seguimiento de dominio)
  img('A1-01', 'Pistón, PMS, PMI y carrera', 1155, 1205, 'Tema 1, diap. 8', ['T1-04', 'T1-18', 'T1-19', 'T1-20', 'T1-21']),
  img('A1-02', 'Los cuatro tiempos', 1400, 782, 'Tema 1, diap. 9', ['T1-22', 'T1-23', 'T1-24', 'T1-25']),
  img('A1-03', 'Fases del motor de dos tiempos', 1240, 630, 'Tema 1, diap. 11', ['T1-27']),
  img('A1-04', 'Sistema common rail', 1140, 867, 'Tema 1, diap. 17', ['T1-32']),
  img('A1-05', 'Inyección directa e indirecta', 1220, 633, 'Tema 1, diap. 15', ['T1-30']),
  img('A1-06', 'Inyección monopunto y multipunto', 715, 480, 'Tema 1, diap. 15', ['T1-30']),
  img('X1-05', 'Turbocompresor en corte', 985, 825, 'Tema 1, diap. 20', ['T1-34']),
];
