import { conceptosTema1 } from './conceptos';
import { imagenesTema1 } from './imagenes';
import { plantillasJornada1 } from './expedientes/jornada1';
import { plantillasJornada2 } from './expedientes/jornada2';

export const tema1 = {
  conceptos: conceptosTema1,
  imagenes: imagenesTema1,
  plantillas: [...plantillasJornada1, ...plantillasJornada2],
};
