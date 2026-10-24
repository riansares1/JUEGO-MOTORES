// Persistencia del progreso en localStorage.
import { cargarProgreso } from '../motor/progreso';
import type { Asignatura, Progreso } from '../motor/tipos';

const clave = (asig: Asignatura) => `inspeccion-motores:${asig.id}:progreso`;

export function cargar(asig: Asignatura): Progreso {
  let texto: string | null = null;
  try {
    texto = localStorage.getItem(clave(asig));
  } catch {
    /* almacenamiento no disponible */
  }
  return cargarProgreso(texto, asig);
}

export function guardar(asig: Asignatura, p: Progreso): void {
  try {
    localStorage.setItem(clave(asig), JSON.stringify(p));
  } catch {
    /* almacenamiento lleno o bloqueado: el juego sigue en memoria */
  }
}

export function descargarTexto(nombre: string, texto: string): void {
  const blob = new Blob([texto], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
