// Editor de zonas (fuera del juego): ver cada imagen con sus zonas, moverlas/redimensionarlas
// arrastrando y exportar el JSON resultante para sustituir src/contenido/<tema>/zonas.json.
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { asignatura } from '../contenido/asignatura';
import zonasTema1 from '../contenido/tema1/zonas.json';
import type { Zona } from '../motor/tipos';
import { descargarTexto } from '../estado/almacen';
import { urlImagen } from '../ui/ImagenZonas';

type Mapa = Record<string, Zona[]>;
const CLAVE = 'inspeccion-motores:editor-zonas';
const original = zonasTema1 as Mapa;
const r1 = (n: number) => Math.round(n * 10) / 10;

function cargar(): Mapa {
  try {
    const t = localStorage.getItem(CLAVE);
    if (t) return { ...original, ...(JSON.parse(t) as Mapa) };
  } catch {
    /* sin almacenamiento */
  }
  return JSON.parse(JSON.stringify(original)) as Mapa;
}

export function Editor() {
  const imagenes = asignatura.imagenes.filter((i) => i.id in original);
  const [mapa, setMapa] = useState<Mapa>(cargar);
  const [actual, setActual] = useState(imagenes[0]?.id ?? '');
  const [sel, setSel] = useState<string | null>(null);
  const [aviso, setAviso] = useState('');
  const lienzo = useRef<HTMLDivElement>(null);
  const arrastre = useRef<{ id: string; modo: 'mover' | 'redimensionar'; px: number; py: number; z: Zona } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(mapa));
    } catch {
      /* sin almacenamiento */
    }
  }, [mapa]);

  const img = imagenes.find((i) => i.id === actual)!;
  const zonas = mapa[actual] ?? [];
  const cambiar = (id: string, cambio: Partial<Zona>) =>
    setMapa((m) => ({ ...m, [actual]: (m[actual] ?? []).map((z) => (z.id === id ? { ...z, ...cambio } : z)) }));

  const empezar = (e: RPointerEvent, z: Zona, modo: 'mover' | 'redimensionar') => {
    e.stopPropagation();
    e.preventDefault();
    setSel(z.id);
    arrastre.current = { id: z.id, modo, px: e.clientX, py: e.clientY, z: { ...z } };
    lienzo.current?.setPointerCapture(e.pointerId);
  };
  const mover = (e: RPointerEvent) => {
    const a = arrastre.current;
    const caja = lienzo.current?.getBoundingClientRect();
    if (!a || !caja) return;
    const dx = ((e.clientX - a.px) / caja.width) * 100;
    const dy = ((e.clientY - a.py) / caja.height) * 100;
    if (a.modo === 'mover') {
      cambiar(a.id, { x: r1(Math.min(100 - a.z.w, Math.max(0, a.z.x + dx))), y: r1(Math.min(100 - a.z.h, Math.max(0, a.z.y + dy))) });
    } else {
      cambiar(a.id, { w: r1(Math.min(100 - a.z.x, Math.max(1, a.z.w + dx))), h: r1(Math.min(100 - a.z.y, Math.max(1, a.z.h + dy))) });
    }
  };

  const json = JSON.stringify(mapa, null, 1);

  return (
    <div className="pantalla" style={{ alignItems: 'stretch' }}>
      <h1>EDITOR DE ZONAS</h1>
      <p className="subtitulo">
        Arrastra una zona para moverla y su esquina inferior derecha para cambiar su tamaño. Los cambios se guardan en este navegador; cuando termines, exporta el JSON y sustituye <code>src/contenido/tema1/zonas.json</code>.{' '}
        <a href={import.meta.env.BASE_URL}>Volver al juego</a>
      </p>
      <div className="panel" style={{ width: '100%', maxWidth: 'none' }}>
        <div className="fila-botones">
          <label>
            Imagen:{' '}
            <select value={actual} onChange={(e) => { setActual(e.target.value); setSel(null); }} style={{ fontSize: '1em', padding: 4 }}>
              {imagenes.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.id} · {i.titulo}
                </option>
              ))}
            </select>
          </label>
          <button
            className="boton secundario pequeno"
            onClick={() => {
              const id = window.prompt('Identificador de la nueva zona (sin espacios):', 'nueva_zona');
              if (!id || zonas.some((z) => z.id === id)) return;
              setMapa((m) => ({ ...m, [actual]: [...(m[actual] ?? []), { id, nombre: id, x: 40, y: 40, w: 20, h: 20 }] }));
              setSel(id);
            }}
          >
            + Añadir zona
          </button>
          <button className="boton pequeno" onClick={() => { descargarTexto('zonas.json', json); setAviso('JSON exportado (zonas.json).'); }}>
            Exportar JSON
          </button>
          <button
            className="boton secundario pequeno"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(json);
                setAviso('JSON copiado al portapapeles.');
              } catch {
                setAviso('No se pudo copiar: usa «Exportar JSON».');
              }
            }}
          >
            Copiar JSON
          </button>
          <button
            className="boton peligro pequeno"
            onClick={() => {
              if (window.confirm('¿Descartar todos los cambios y volver a las zonas del repositorio?')) {
                setMapa(JSON.parse(JSON.stringify(original)) as Mapa);
                setSel(null);
              }
            }}
          >
            Descartar cambios
          </button>
          {aviso && <span className="nota">{aviso}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(280px, 1fr)', gap: 16, marginTop: 16 }} className="editor-rejilla">
        <div className="papel" style={{ padding: 10 }}>
          <div ref={lienzo} className="imagen-zonas" style={{ touchAction: 'none' }} onPointerMove={mover} onPointerUp={() => (arrastre.current = null)} onPointerCancel={() => (arrastre.current = null)}>
            <img src={urlImagen(img.src)} alt={img.titulo} draggable={false} />
            {zonas.map((z) => (
              <div
                key={z.id}
                onPointerDown={(e) => empezar(e, z, 'mover')}
                style={{
                  position: 'absolute',
                  left: `${z.x}%`,
                  top: `${z.y}%`,
                  width: `${z.w}%`,
                  height: `${z.h}%`,
                  border: `2px solid ${sel === z.id ? '#e00' : '#1e5ac8'}`,
                  background: sel === z.id ? 'rgba(230,0,0,0.12)' : 'rgba(30,90,200,0.10)',
                  cursor: 'move',
                }}
              >
                <span style={{ position: 'absolute', left: 2, top: 0, font: '700 12px sans-serif', background: '#fffd', color: '#123', padding: '0 3px' }}>{z.id}</span>
                <span
                  onPointerDown={(e) => empezar(e, z, 'redimensionar')}
                  style={{ position: 'absolute', right: -7, bottom: -7, width: 14, height: 14, background: sel === z.id ? '#e00' : '#1e5ac8', cursor: 'nwse-resize', borderRadius: 3 }}
                />
              </div>
            ))}
          </div>
          <p className="nota" style={{ color: 'var(--tinta-suave)' }}>
            {img.fuente} · {img.ancho}×{img.alto} px. Al pulsar en la imagen, el juego elige la zona más pequeña que contiene el punto.
          </p>
        </div>
        <div className="papel" style={{ padding: 10, overflow: 'auto', maxHeight: '80vh' }}>
          <table className="tabla-doc">
            <thead>
              <tr>
                <th>id / nombre</th>
                <th>x</th>
                <th>y</th>
                <th>w</th>
                <th>h</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {zonas.map((z) => (
                <tr key={z.id} onClick={() => setSel(z.id)} style={{ background: sel === z.id ? '#fde7e7' : undefined }}>
                  <td>
                    <b style={{ fontFamily: 'var(--fuente-maquina)' }}>{z.id}</b>
                    <input value={z.nombre} onChange={(e) => cambiar(z.id, { nombre: e.target.value })} style={{ width: '100%', font: 'inherit' }} />
                  </td>
                  {(['x', 'y', 'w', 'h'] as const).map((k) => (
                    <td key={k}>
                      <input type="number" step={0.5} value={z[k]} onChange={(e) => cambiar(z.id, { [k]: Number(e.target.value) })} style={{ width: 58, font: 'inherit' }} />
                    </td>
                  ))}
                  <td>
                    <button
                      className="boton peligro pequeno"
                      title="Borrar zona"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`¿Borrar la zona ${z.id}? Si algún expediente la usa, la validación de contenido fallará.`)) setMapa((m) => ({ ...m, [actual]: (m[actual] ?? []).filter((x) => x.id !== z.id) }));
                      }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
