// Nombres de las zonas clicables de cada diagrama.
// Los JSON de preguntas se refieren a estas zonas por su id (la clave).
// El dibujo de cada zona está en src/diagramas/dibujos.tsx.

export const ZONAS: Record<string, { titulo: string; zonas: Record<string, string> }> = {
  motor: {
    titulo: 'Corte de un motor 4T DOHC',
    zonas: {
      tapa: 'Tapa de culata',
      arbol_levas: 'Árbol de levas',
      taque: 'Taqué',
      muelle: 'Muelle de válvula',
      guia: 'Guía de válvula',
      culata: 'Culata',
      bujia: 'Bujía / inyector',
      pipa_adm: 'Pipa de admisión',
      pipa_esc: 'Pipa de escape',
      valvula_adm: 'Válvula de admisión',
      valvula_esc: 'Válvula de escape',
      asiento: 'Asiento de válvula',
      junta: 'Junta de culata',
      bloque: 'Bloque',
      camisa: 'Camisa',
      piston: 'Pistón',
      segmentos: 'Segmentos',
      bulon: 'Bulón',
      biela: 'Biela',
      ciguenal: 'Cigüeñal',
      contrapeso: 'Contrapeso',
      carter: 'Cárter',
    },
  },
  piston: {
    titulo: 'Pistón',
    zonas: {
      cabeza: 'Cabeza',
      portasegmentos: 'Portasegmentos (ranuras)',
      seg_compresion: 'Segmentos de compresión',
      seg_engrase: 'Segmento de engrase (rascador)',
      alojamiento_bulon: 'Alojamiento del bulón',
      bulon: 'Bulón',
      falda: 'Falda',
    },
  },
  biela: {
    titulo: 'Biela',
    zonas: {
      pie: 'Pie de biela',
      cana: 'Caña o cuerpo (doble T)',
      cabeza: 'Cabeza de biela',
      cojinete: 'Cojinete',
    },
  },
  ciguenal: {
    titulo: 'Cigüeñal',
    zonas: {
      amortiguador: 'Amortiguador de vibraciones',
      apoyo: 'Apoyos (muñones principales)',
      munequilla: 'Muñequillas',
      brazo: 'Brazos',
      contrapeso: 'Contrapesos',
      volante: 'Volante de inercia',
    },
  },
  ohv: {
    titulo: 'Distribución OHV',
    zonas: {
      arbol_levas: 'Árbol de levas',
      taque: 'Taqué (empujador)',
      varilla: 'Varilla',
      balancin: 'Balancín',
      muelle: 'Muelle',
      valvula: 'Válvula',
    },
  },
  ohc: {
    titulo: 'Distribución OHC',
    zonas: {
      arbol_levas: 'Árbol de levas',
      balancin: 'Balancín',
      muelle: 'Muelle',
      valvula: 'Válvula',
    },
  },
  dohc: {
    titulo: 'Distribución DOHC',
    zonas: {
      arbol_levas: 'Árboles de levas',
      taque: 'Taqués',
      muelle: 'Muelles',
      valvula: 'Válvulas',
    },
  },
  pv_otto: {
    titulo: 'Diagrama p-V',
    zonas: { t12: 'Tramo 1-2', t23: 'Tramo 2-3', t34: 'Tramo 3-4', t41: 'Tramo 4-1' },
  },
  pv_diesel: {
    titulo: 'Diagrama p-V',
    zonas: { t12: 'Tramo 1-2', t23: 'Tramo 2-3', t34: 'Tramo 3-4', t41: 'Tramo 4-1' },
  },
  pv_dual: {
    titulo: 'Diagrama p-V',
    zonas: {
      t12: 'Tramo 1-2',
      t23: 'Tramo 2-3',
      t34: 'Tramo 3-4',
      t45: 'Tramo 4-5',
      t51: 'Tramo 5-1',
    },
  },
  pv_real: {
    titulo: 'Ciclo Otto real frente al teórico',
    zonas: {
      p_calor: 'Pérdidas de calor',
      p_tiempo: 'Pérdidas de tiempo',
      p_escape: 'Pérdidas de escape',
      p_bombeo: 'Pérdidas por bombeo',
    },
  },
  distribucion: {
    titulo: 'Diagrama circular de distribución',
    zonas: {
      aava: 'AAVA',
      rcva: 'RCVA',
      aave: 'AAVE',
      rcve: 'RCVE',
      cruce: 'Cruce de válvulas',
    },
  },
  lazos: {
    titulo: 'Ciclo real en el diagrama p-V',
    zonas: { lazo_trabajo: 'Lazo de trabajo', lazo_bombeo: 'Lazo de bombeo' },
  },
  curvas: {
    titulo: 'Curvas características (plena carga)',
    zonas: {
      curva_par: 'Curva de par',
      curva_pot: 'Curva de potencia',
      curva_ce: 'Curva de consumo específico',
      par_max: 'Par máximo',
      pot_max: 'Potencia máxima',
      ce_min: 'Consumo específico mínimo',
    },
  },
}

export function nombreZona(diagrama: string, zona: string): string {
  return ZONAS[diagrama]?.zonas[zona] ?? zona
}
