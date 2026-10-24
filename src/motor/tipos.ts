// Tipos del motor de juego. No contienen nada específico de ningún tema:
// todo el contenido (conceptos, imágenes, expedientes, jornadas) llega como datos.

// ───────────────────────── Contenido ─────────────────────────

export interface Concepto {
  /** Código del inventario, p. ej. "T1-14". */
  id: string;
  tema: number;
  /** Nombre corto de la regla tal como aparece en el Reglamento. */
  nombre: string;
  /** Otros nombres aceptados al citar la regla de memoria (regla requisada). */
  alias?: string[];
  /** Enunciado de la regla (página del Reglamento). */
  regla: string;
  /** Detalles o viñetas de la página del Reglamento. */
  puntos?: string[];
  /** Explicación del Boletín del Ministerio (más pedagógica que la regla). */
  boletin: string;
  /** Imagen que acompaña a la regla en el Boletín y en el Reglamento. */
  imagen?: { id: string; pie?: string };
  /** Pregunta tipo examen de respuesta corta. */
  pregunta: string;
  respuestaModelo: string;
  /** Dos o tres ideas que debe contener la respuesta. */
  ideasClave: string[];
  /** Procedencia en los apuntes (p. ej. "Tema 1, diap. 7"). */
  fuente: string;
}

/** Zona rectangular sobre una imagen, en porcentajes (0–100) del ancho/alto. */
export interface Zona {
  id: string;
  nombre: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ImagenDef {
  id: string;
  titulo: string;
  src: string;
  ancho: number;
  alto: number;
  fuente: string;
  /** true para las imágenes del inventario visual (V…) cuyo dominio se sigue. */
  seguimiento: boolean;
  conceptos: string[];
  zonas: Zona[];
}

// ───────────────────────── Documentos ─────────────────────────

export type TipoDocumento = 'glosario' | 'ficha' | 'manifiesto' | 'informe' | 'tabla' | 'plano';

interface DocBase {
  id: string;
  tipo: TipoDocumento;
  titulo: string;
  subtitulo?: string;
  /** Organismo o firma que emite el documento (ambientación). */
  emisor?: string;
  pie?: string;
}

export interface EntradaGlosario {
  id: string;
  termino: string;
  definicion: string;
}
export interface DocGlosario extends DocBase {
  tipo: 'glosario';
  entradas: EntradaGlosario[];
}

export interface CampoFicha {
  id: string;
  etiqueta: string;
  valor: string;
}
export interface FotoFicha {
  id: string;
  imagen: string;
  /** Si se indica, la foto muestra solo esta zona de la imagen. */
  recorte?: string;
  pie?: string;
}
export interface DocFicha extends DocBase {
  tipo: 'ficha';
  campos: CampoFicha[];
  foto?: FotoFicha;
}

export interface PasoManifiesto {
  id: string;
  texto: string;
}
export interface DocManifiesto extends DocBase {
  tipo: 'manifiesto';
  intro?: string;
  pasos: PasoManifiesto[];
}

export interface FraseInforme {
  id: string;
  texto: string;
  /** Empieza párrafo nuevo. */
  parrafo?: boolean;
}
export interface DocInforme extends DocBase {
  tipo: 'informe';
  frases: FraseInforme[];
}

export interface CeldaTabla {
  id: string;
  valor: string;
}
export interface FilaTabla {
  id: string;
  cabecera: string;
  celdas: CeldaTabla[];
}
export interface DocTabla extends DocBase {
  tipo: 'tabla';
  columnas: string[];
  filas: FilaTabla[];
}

export interface EtiquetaPlano {
  id: string;
  /** Zona de la imagen a la que apunta la etiqueta. */
  zona: string;
  texto: string;
}
export interface DocPlano extends DocBase {
  tipo: 'plano';
  imagen: string;
  etiquetas: EtiquetaPlano[];
  leyenda?: string;
}

export type Documento = DocGlosario | DocFicha | DocManifiesto | DocInforme | DocTabla | DocPlano;

// ───────────────────────── Discrepancias ─────────────────────────

/**
 * Referencia a un elemento señalable:
 *  - "doc:elem"          campo, frase, paso, entrada, celda o etiqueta de un documento
 *  - "doc:elem@zona"     zona de la imagen de una foto/plano de un documento
 *  - "rx@zona"           zona de la imagen del escáner de rayos X
 */
export type RefElemento = string;

export type Prueba = { tipo: 'regla'; concepto: string } | { tipo: 'elemento'; ref: RefElemento };

/** Cambio que planta el error sobre la versión correcta del documento. */
export interface Parche {
  ref: RefElemento;
  /** Nuevo texto principal (valor, texto o definición). */
  texto?: string;
  /** Solo glosario: nuevo término. */
  termino?: string;
  /** Foto o etiqueta: nueva zona. */
  zona?: string;
  /** Foto: nueva imagen. */
  imagen?: string;
}

export type TipoPregunta = 'corregir' | 'explicar' | 'nombrar' | 'localizar';

export interface Pregunta {
  tipo: TipoPregunta;
  enunciado: string;
  respuestaModelo: string;
  ideasClave: string[];
  /** Solo "localizar": imagen sin etiquetas y zona correcta. */
  imagen?: string;
  zonaCorrecta?: string;
}

export interface Discrepancia {
  id: string;
  /** Concepto principal cuyo dominio se evalúa. */
  concepto: string;
  /** Imagen del inventario visual implicada (mecánicas visuales). */
  imagen?: string;
  parches: Parche[];
  /** Elemento alterado que hay que señalar. */
  elemento: RefElemento;
  /** Otros elementos que también cuentan como "el elemento" (raro). */
  elementosAceptados?: RefElemento[];
  /** Pruebas válidas: regla(s) del Reglamento y/o elementos con los que se contradice. */
  pruebas: Prueba[];
  /** Explicación breve del error (informe y resolución). */
  explicacion: string;
  /** Texto del expediente de formación (guiado). */
  guia?: string;
  /** Preguntas del interrogatorio. Si se omite, se usa la pregunta del concepto. */
  interrogatorio?: Pregunta[];
}

export interface PlantillaExpediente {
  id: string;
  /** Conceptos que aparecen en los documentos (deben estar vistos para usar la plantilla). */
  conceptos: string[];
  solicitante: string;
  motivo: string;
  documentos: Documento[];
  /** Imagen del escáner de rayos X (solo en jornadas con escáner). */
  rayosX?: { imagen: string; pie?: string };
  discrepancias: Discrepancia[];
  /** false si la plantilla no debe usarse nunca como expediente limpio. */
  usableLimpia?: boolean;
}

export interface JornadaDef {
  numero: number;
  titulo: string;
  /** Texto de ambientación del boletín. */
  presentacion: string;
  conceptosNuevos: string[];
  imagenesNuevas: string[];
  numExpedientes: number;
  maxDocumentos: number;
  maxDiscrepancias: number;
  /** Solo reglas del día o del anterior (fase de aprendizaje). */
  soloDiaYAnterior: boolean;
  rayosX: boolean;
}

export interface ConfigJuego {
  sueldoExpediente: number;
  medioSueldo: number;
  multaCitacion: number;
  avisosPorJornada: number;
  costeConsulta: number;
  /** Fracción de expedientes fallados a partir de la cual hay recuperación (estrictamente mayor). */
  umbralRecuperacion: number;
  porcentajeLimpiosMin: number;
  porcentajeLimpiosMax: number;
  numExpedientesRecuperacion: number;
}

export interface TemaDef {
  numero: number;
  nombre: string;
}

export interface Asignatura {
  id: string;
  nombre: string;
  temas: TemaDef[];
  conceptos: Concepto[];
  imagenes: ImagenDef[];
  plantillas: PlantillaExpediente[];
  jornadas: JornadaDef[];
  config: ConfigJuego;
}

// ───────────────────────── Estado ─────────────────────────

export type EstadoDominio = 'nuevo' | 'visto' | 'reglamento' | 'memoria' | 'dominado';

export interface RegistroDominio {
  estado: EstadoDominio;
  /** Días en los que se aplicó de memoria (para "dominado" hacen falta dos distintos). */
  diasMemoria: number[];
  /** Día en que se aplicó bien por primera vez (la regla queda requisada desde el día siguiente). */
  aplicadoEnDia?: number;
  /** Último día en que se practicó (acierto o fallo). */
  ultimoDia?: number;
  /** Pendiente de repaso por fallo. */
  fallado?: boolean;
  aciertos: number;
  fallos: number;
  /** Ya tuvo su expediente de formación. */
  guiado?: boolean;
}

export interface ExpedienteInstancia {
  uid: string;
  plantilla: string;
  solicitante: string;
  motivo: string;
  documentos: Documento[];
  rayosX?: { imagen: string; pie?: string };
  discrepancias: Discrepancia[];
  guiado: boolean;
}

export type ResultadoPareja =
  | { tipo: 'registrada'; discrepancia: Discrepancia }
  | { tipo: 'repetida'; discrepancia: Discrepancia }
  | { tipo: 'infundada'; motivo: string };

export interface RespuestaPregunta {
  texto: string;
  enviada: boolean;
  /** Ideas clave marcadas en la autocorrección. */
  marcadas: boolean[];
  /** Zona señalada (localizar). */
  zona?: string;
  corregida: boolean;
  acierto?: boolean;
}

export interface EstadoDiscrepanciaRegistrada {
  id: string;
  /** Cómo se aportó la prueba. */
  modo: 'reglamento' | 'memoria' | 'consultada' | 'elemento';
  respuestas: RespuestaPregunta[];
}

export type Sello = 'aprobado' | 'denegado';

export type TipoResultado =
  | 'completo' // sueldo completo
  | 'medio' // medio sueldo
  | 'citacion'; // aprobado con errores

export interface ResultadoExpediente {
  uid: string;
  plantilla: string;
  sello: Sello;
  tipo: TipoResultado;
  pago: number;
  fallado: boolean;
  /** Discrepancias presentes en el expediente y si se resolvieron. */
  detalle: { discrepancia: string; concepto: string; registrada: boolean; interrogatorioOk: boolean; modo?: EstadoDiscrepanciaRegistrada['modo'] }[];
  infundadas: number;
  consultas: number;
  mensaje: string;
}

export interface EventoCitacion {
  expediente: string;
  motivo: string;
  multa: number;
}

export interface EstadoExpedienteActual {
  registradas: EstadoDiscrepanciaRegistrada[];
  /** Reglas requisadas consultadas en este expediente (pagando). */
  consultadas: string[];
  infundadas: number;
  sello?: Sello;
}

export interface EstadoJornada {
  jornada: number;
  dia: number;
  recuperacion: boolean;
  expedientes: ExpedienteInstancia[];
  indice: number;
  actual: EstadoExpedienteActual;
  resultados: ResultadoExpediente[];
  citaciones: EventoCitacion[];
  gastoConsultas: number;
  /** Requisas fijadas al empezar la jornada. */
  requisadas: string[];
  boletinLeido: boolean;
  terminada: boolean;
}

export interface InformeJornada {
  jornada: number;
  dia: number;
  recuperacion: boolean;
  fecha: string;
  expedientes: number;
  fallados: number;
  sueldoBruto: number;
  multas: number;
  consultas: number;
  sueldoNeto: number;
  citaciones: EventoCitacion[];
  conceptosFallados: string[];
  necesitaRecuperacion: boolean;
}

export interface Progreso {
  version: 1;
  asignatura: string;
  /** Día de juego actual: se incrementa al terminar cada jornada (también recuperaciones). */
  dia: number;
  /** Jornada más alta desbloqueada. */
  jornadaMax: number;
  /** Jornada cuya recuperación está pendiente (bloquea la siguiente). */
  recuperacionPendiente: number | null;
  dominio: Record<string, RegistroDominio>;
  /** Veces usada cada plantilla/discrepancia (variedad). */
  usos: Record<string, number>;
  historial: InformeJornada[];
  sueldoTotal: number;
  jornadaEnCurso: EstadoJornada | null;
}
