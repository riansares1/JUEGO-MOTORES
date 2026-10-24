// Normalización de texto y coincidencia aproximada para citar reglas requisadas de memoria.

/** Minúsculas, sin tildes ni diéresis, sin signos, espacios simples. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9ñ]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

/** Distancia de Levenshtein (inserción, borrado, sustitución) con transposición adyacente. */
export function distancia(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const filas = a.length + 1;
  const cols = b.length + 1;
  const d: number[][] = Array.from({ length: filas }, () => new Array<number>(cols).fill(0));
  for (let i = 0; i < filas; i++) d[i][0] = i;
  for (let j = 0; j < cols; j++) d[0][j] = j;
  for (let i = 1; i < filas; i++) {
    for (let j = 1; j < cols; j++) {
      const coste = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + coste);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

/** Erratas toleradas según la longitud del texto esperado. */
export function erratasPermitidas(longitud: number): number {
  if (longitud <= 3) return 0;
  if (longitud <= 6) return 1;
  if (longitud <= 12) return 2;
  return Math.floor(longitud * 0.18);
}

/** Normaliza un código tipo "T1-05": acepta "t1-5", "T1 05", "t105", "T1–05"… */
export function normalizarCodigo(texto: string): string | null {
  const s = texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[–—_.\s]+/g, '-')
    .replace(/-+/g, '-');
  const r = /^([a-z])-?(\d+)-(\d{1,2})$/.exec(s) ?? /^([a-z])(\d)(\d{2})$/.exec(s);
  if (!r) return null;
  return `${r[1].toUpperCase()}${Number(r[2])}-${String(Number(r[3])).padStart(2, '0')}`;
}

export interface CandidatoCita {
  id: string;
  nombres: string[];
}

/**
 * Busca qué regla quiso citar el jugador. Devuelve el id del candidato más cercano dentro de la
 * tolerancia, o null. El código exacto (con tolerancia de formato) gana siempre.
 */
export function identificarCita(texto: string, candidatos: CandidatoCita[]): string | null {
  const entrada = normalizar(texto);
  if (!entrada) return null;
  const codigo = normalizarCodigo(texto);
  if (codigo) {
    const porCodigo = candidatos.find((c) => c.id.toUpperCase() === codigo);
    if (porCodigo) return porCodigo.id;
  }
  let mejor: { id: string; d: number; rel: number } | null = null;
  for (const c of candidatos) {
    for (const nombre of c.nombres) {
      const n = normalizar(nombre);
      if (!n) continue;
      const d = distancia(entrada, n);
      if (d <= erratasPermitidas(n.length)) {
        const rel = d / Math.max(1, n.length);
        if (!mejor || rel < mejor.rel) mejor = { id: c.id, d, rel };
      }
    }
  }
  return mejor?.id ?? null;
}
