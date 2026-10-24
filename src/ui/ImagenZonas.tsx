import { useState, type CSSProperties, type MouseEvent } from 'react';
import type { ImagenDef, Zona } from '../motor/tipos';

export const urlImagen = (src: string) => `${import.meta.env.BASE_URL}${src}`;

/** Zona más pequeña que contiene el punto (en % de la imagen completa). */
export function zonaEnPunto(zonas: Zona[], x: number, y: number): Zona | null {
  const dentro = zonas.filter((z) => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h);
  dentro.sort((a, b) => a.w * a.h - b.w * b.h);
  return dentro[0] ?? null;
}

export interface Marcador {
  id: string;
  zona: string;
  numero: number;
  clase?: string;
}

interface Props {
  imagen: ImagenDef;
  recorte?: string;
  clase?: string;
  /** Pinta los contornos de todas las zonas. */
  zonasVisibles?: boolean;
  /** Resalta la zona bajo el puntero (modo inspección o localización). */
  resaltarAlPasar?: boolean;
  estadoZona?: (id: string) => 'correcta' | 'incorrecta' | 'seleccionada' | undefined;
  onZona?: (zona: Zona | null) => void;
  marcadores?: Marcador[];
  onMarcador?: (id: string) => void;
  alt?: string;
}

export function ImagenZonas({ imagen, recorte, clase, zonasVisibles, resaltarAlPasar, estadoZona, onZona, marcadores, onMarcador, alt }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const r = recorte ? imagen.zonas.find((z) => z.id === recorte) : undefined;
  const marco = r ?? { x: 0, y: 0, w: 100, h: 100 };

  const aMarco = (z: { x: number; y: number; w: number; h: number }) => ({
    left: `${((z.x - marco.x) / marco.w) * 100}%`,
    top: `${((z.y - marco.y) / marco.h) * 100}%`,
    width: `${(z.w / marco.w) * 100}%`,
    height: `${(z.h / marco.h) * 100}%`,
  });

  const punto = (e: MouseEvent<HTMLDivElement>) => {
    const caja = e.currentTarget.getBoundingClientRect();
    const fx = (e.clientX - caja.left) / caja.width;
    const fy = (e.clientY - caja.top) / caja.height;
    return { x: marco.x + fx * marco.w, y: marco.y + fy * marco.h };
  };

  const visibles = imagen.zonas.filter((z) => z.x < marco.x + marco.w && z.x + z.w > marco.x && z.y < marco.y + marco.h && z.y + z.h > marco.y);
  const contenedor: CSSProperties = r ? { aspectRatio: `${r.w * imagen.ancho} / ${r.h * imagen.alto}` } : {};
  const imgEstilo: CSSProperties = r
    ? { width: `${(100 / r.w) * 100}%`, left: `${(-r.x / r.w) * 100}%`, top: `${(-r.y / r.h) * 100}%` }
    : {};

  return (
    <div
      className={`imagen-zonas ${clase ?? ''}`}
      style={contenedor}
      onClick={(e) => {
        if (!onZona) return;
        const p = punto(e);
        onZona(zonaEnPunto(visibles, p.x, p.y));
      }}
      onPointerMove={(e) => {
        if (!resaltarAlPasar) return;
        const p = punto(e as unknown as MouseEvent<HTMLDivElement>);
        setHover(zonaEnPunto(visibles, p.x, p.y)?.id ?? null);
      }}
      onPointerLeave={() => setHover(null)}
    >
      <img src={urlImagen(imagen.src)} alt={alt ?? imagen.titulo} className={r ? 'recorte-img' : undefined} style={imgEstilo} draggable={false} />
      {visibles.map((z) => {
        const est = estadoZona?.(z.id);
        const ver = zonasVisibles || est || (resaltarAlPasar && hover === z.id);
        if (!ver) return null;
        const cls = est ?? (hover === z.id && resaltarAlPasar ? 'seleccionada' : 'visible');
        return <div key={z.id} className={`zona ${cls}`} style={{ ...aMarco(z), pointerEvents: 'none' }} title={zonasVisibles ? z.nombre : undefined} />;
      })}
      {marcadores?.map((m) => {
        const z = imagen.zonas.find((x) => x.id === m.zona);
        if (!z) return null;
        const cx = ((z.x + z.w / 2 - marco.x) / marco.w) * 100;
        const cy = ((z.y + z.h / 2 - marco.y) / marco.h) * 100;
        return (
          <button
            key={m.id}
            type="button"
            className={`marcador ${m.clase ?? ''}`}
            style={{ left: `${cx}%`, top: `${cy}%` }}
            onClick={(e) => {
              e.stopPropagation();
              onMarcador?.(m.id);
            }}
            aria-label={`Marcador ${m.numero}`}
          >
            {m.numero}
          </button>
        );
      })}
    </div>
  );
}
