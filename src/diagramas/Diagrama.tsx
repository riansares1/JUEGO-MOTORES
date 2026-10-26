import { DIBUJOS } from './dibujos'

export type MarcaZona = 'ok' | 'mal' | 'sol'

interface Props {
  id: string
  /** Si se pasa, las zonas se pueden tocar. */
  onZona?: (zona: string) => void
  /** Zona pintada en naranja ("¿qué pieza es la resaltada?"). */
  resaltada?: string
  /** Colores de corrección: ok = verde, mal = rojo, sol = solución. */
  marcas?: Record<string, MarcaZona>
  /** Letras (A, B, C…) que se dibujan en los huecos de etiquetar. */
  letras?: Record<string, string>
  letraActiva?: string
}

export default function Diagrama({ id, onZona, resaltada, marcas, letras, letraActiva }: Props) {
  const def = DIBUJOS[id]
  if (!def) return <p className="aviso">Diagrama «{id}» no encontrado.</p>
  const clases = ['diag', onZona ? 'tocable' : '', resaltada ? 'con-resalte' : ''].join(' ')
  return (
    <svg viewBox={def.viewBox} className={clases} role="img" aria-label="Diagrama">
      {def.fondo}
      {Object.entries(def.zonas).map(([zid, z]) => {
        const cls = ['zona', resaltada === zid ? 'resaltada' : '', marcas?.[zid] ?? ''].join(' ')
        return (
          <g key={zid} className={cls} data-zona={zid} onClick={onZona ? () => onZona(zid) : undefined}>
            {z.forma}
          </g>
        )
      })}
      {def.encima}
      {letras &&
        Object.entries(letras).map(([zid, letra]) => {
          const a = def.zonas[zid]?.ancla
          if (!a) return null
          const activa = letraActiva === zid
          return (
            <g
              key={zid}
              className={`letra ${activa ? 'activa' : ''} ${marcas?.[zid] ?? ''}`}
              onClick={onZona ? () => onZona(zid) : undefined}
            >
              <circle cx={a[0]} cy={a[1]} r={12} />
              <text x={a[0]} y={a[1] + 5} textAnchor="middle">
                {letra}
              </text>
            </g>
          )
        })}
    </svg>
  )
}
