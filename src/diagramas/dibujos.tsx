// Dibujos SVG de los diagramas. Cada diagrama tiene:
//  - fondo:  elementos decorativos (no se pueden tocar)
//  - zonas:  piezas clicables; el id coincide con src/diagramas/zonas.ts
//  - encima: decoración que va por encima (flechas, números…), tampoco se toca
// Clases CSS: "pz" = pieza con relleno, "ln" = línea, "hit" = área invisible para tocar mejor.
import type { ReactNode } from 'react'

export interface DefDiagrama {
  viewBox: string
  fondo?: ReactNode
  zonas: Record<string, { forma: ReactNode; ancla?: [number, number] }>
  encima?: ReactNode
}

// Colores de las piezas
const C = {
  tapa: '#8fa3bf',
  culata: '#a9b8ca',
  bloque: '#b8c4d3',
  camisa: '#e5eaf1',
  junta: '#4b5a6e',
  piston: '#d4d9e0',
  seg: '#334155',
  biela: '#7f93ab',
  cig: '#6a7f99',
  contra: '#56687f',
  carter: '#9eabbb',
  valv: '#eef1f5',
  pipa: '#f3f6fa',
  muelle: '#334155',
  leva: '#5b6b82',
  taque: '#c7ced8',
  bronce: '#c08a4b',
}

const borde = { stroke: '#334155', strokeWidth: 1.2 }

function Flecha({ x1, y1, x2, y2, color = '#2563eb' }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const a1 = ang + 2.6
  const a2 = ang - 2.6
  return (
    <g stroke={color} strokeWidth={2.5} fill={color}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <polygon
        points={`${x2},${y2} ${x2 + 9 * Math.cos(a1)},${y2 + 9 * Math.sin(a1)} ${x2 + 9 * Math.cos(a2)},${y2 + 9 * Math.sin(a2)}`}
        stroke="none"
      />
    </g>
  )
}

/** Muelle en zigzag vertical centrado en x. */
function zigzag(x: number, y1: number, y2: number, ancho: number, vueltas: number) {
  const paso = (y2 - y1) / (vueltas * 2)
  let d = `M${x - ancho / 2},${y1}`
  for (let i = 1; i <= vueltas * 2; i++) {
    d += ` L${i % 2 ? x + ancho / 2 : x - ancho / 2},${y1 + paso * i}`
  }
  return d
}

/** Punto de un círculo con el ángulo medido en grados desde arriba y en sentido horario. */
function polar(cx: number, cy: number, r: number, grados: number): [number, number] {
  const a = (grados * Math.PI) / 180
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)]
}

function Tramo({ d, flecha = true }: { d: string; flecha?: boolean }) {
  return (
    <>
      <path d={d} className="hit" fill="none" strokeWidth={18} />
      <path d={d} className="ln" fill="none" stroke="#1e3a5f" strokeWidth={3} markerEnd={flecha ? 'url(#punta)' : undefined} />
    </>
  )
}

const defsPunta = (
  <defs>
    <marker id="punta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1e3a5f" />
    </marker>
  </defs>
)

function EjesPV({ conPM = true }: { conPM?: boolean }) {
  return (
    <g>
      {defsPunta}
      <line x1={40} y1={258} x2={345} y2={258} stroke="#64748b" strokeWidth={1.5} />
      <line x1={40} y1={258} x2={40} y2={15} stroke="#64748b" strokeWidth={1.5} />
      <text x={30} y={22} className="txt">p</text>
      <text x={340} y={274} className="txt">V</text>
      {conPM && (
        <>
          <line x1={90} y1={258} x2={90} y2={30} stroke="#cbd5e1" strokeDasharray="4 4" />
          <line x1={320} y1={258} x2={320} y2={30} stroke="#cbd5e1" strokeDasharray="4 4" />
          <text x={78} y={274} className="txt-p">PMS</text>
          <text x={308} y={274} className="txt-p">PMI</text>
        </>
      )}
    </g>
  )
}

function Num({ x, y, n }: { x: number; y: number; n: string }) {
  return (
    <text x={x} y={y} className="txt-num">
      {n}
    </text>
  )
}

// ───────────────────────── Tema 2: motor completo ─────────────────────────
const motor: DefDiagrama = {
  viewBox: '0 0 400 530',
  zonas: {
    carter: {
      forma: <path className="pz" fill={C.carter} {...borde} d="M60,420 H340 L322,505 Q319,516 306,516 H94 Q81,516 78,505 Z" />,
    },
    bloque: {
      forma: (
        <>
          <path className="pz" fill={C.bloque} {...borde} d="M60,218 H112 V330 H96 V420 H60 Z" />
          <path className="pz" fill={C.bloque} {...borde} d="M340,218 H288 V330 H304 V420 H340 Z" />
        </>
      ),
    },
    camisa: {
      forma: (
        <>
          <rect className="pz" fill={C.camisa} {...borde} x={112} y={218} width={8} height={112} />
          <rect className="pz" fill={C.camisa} {...borde} x={280} y={218} width={8} height={112} />
        </>
      ),
    },
    culata: {
      forma: <rect className="pz" fill={C.culata} {...borde} x={60} y={95} width={280} height={117} />,
    },
    pipa_adm: {
      forma: <path className="pz" fill={C.pipa} {...borde} d="M60,140 C125,145 150,178 160,204 L120,204 C112,170 95,160 60,160 Z" />,
    },
    pipa_esc: {
      forma: <path className="pz" fill={C.pipa} {...borde} d="M340,140 C275,145 250,178 240,204 L280,204 C288,170 305,160 340,160 Z" />,
    },
    guia: {
      forma: (
        <>
          <rect className="pz" fill="#7a8aa0" {...borde} x={133} y={128} width={14} height={30} />
          <rect className="pz" fill="#7a8aa0" {...borde} x={253} y={128} width={14} height={30} />
        </>
      ),
    },
    valvula_adm: {
      forma: (
        <>
          <rect className="hit" x={128} y={115} width={24} height={88} />
          <rect className="pz" fill={C.valv} {...borde} x={137} y={115} width={6} height={84} />
          <path className="pz" fill={C.valv} {...borde} d="M117,209 L163,209 L146,198 L134,198 Z" />
        </>
      ),
    },
    valvula_esc: {
      forma: (
        <>
          <rect className="hit" x={248} y={115} width={24} height={88} />
          <rect className="pz" fill={C.valv} {...borde} x={257} y={115} width={6} height={84} />
          <path className="pz" fill={C.valv} {...borde} d="M244,209 L276,209 L264,198 L256,198 Z" />
        </>
      ),
    },
    asiento: {
      forma: (
        <>
          <rect className="hit" x={104} y={196} width={22} height={18} />
          <rect className="hit" x={154} y={196} width={22} height={18} />
          <rect className="hit" x={232} y={196} width={20} height={18} />
          <rect className="hit" x={268} y={196} width={20} height={18} />
          <path className="pz" fill="#374151" d="M106,212 L118,212 L118,208 L112,200 L106,200 Z M174,212 L162,212 L162,208 L168,200 L174,200 Z" />
          <path className="pz" fill="#374151" d="M234,212 L245,212 L245,208 L239,200 L234,200 Z M286,212 L275,212 L275,208 L281,200 L286,200 Z" />
        </>
      ),
    },
    muelle: {
      forma: (
        <>
          <rect className="hit" x={122} y={112} width={36} height={18} />
          <rect className="hit" x={242} y={112} width={36} height={18} />
          <rect className="pz" fill={C.muelle} x={126} y={113} width={28} height={4} />
          <rect className="pz" fill={C.muelle} x={246} y={113} width={28} height={4} />
          <path className="ln" fill="none" stroke={C.muelle} strokeWidth={2.5} d={zigzag(140, 117, 128, 26, 3)} />
          <path className="ln" fill="none" stroke={C.muelle} strokeWidth={2.5} d={zigzag(260, 117, 128, 26, 3)} />
        </>
      ),
    },
    taque: {
      forma: (
        <>
          <rect className="pz" fill={C.taque} {...borde} x={126} y={99} width={28} height={14} rx={2} />
          <rect className="pz" fill={C.taque} {...borde} x={246} y={99} width={28} height={14} rx={2} />
        </>
      ),
    },
    tapa: {
      forma: (
        <path
          className="pz"
          fill={C.tapa}
          {...borde}
          fillRule="evenodd"
          d="M60,95 L60,45 Q60,22 85,22 L315,22 Q340,22 340,45 L340,95 Z M72,95 L72,48 Q72,34 88,34 L312,34 Q328,34 328,48 L328,95 Z"
        />
      ),
    },
    arbol_levas: {
      forma: (
        <>
          <path className="pz" fill={C.leva} {...borde} d="M123,66 A17,17 0 0 1 157,66 L147,95 A7,7 0 0 1 133,95 Z" />
          <path className="pz" fill={C.leva} {...borde} d="M243,66 A17,17 0 0 1 277,66 L267,95 A7,7 0 0 1 253,95 Z" />
          <circle cx={140} cy={66} r={6} fill="#e2e8f0" />
          <circle cx={260} cy={66} r={6} fill="#e2e8f0" />
        </>
      ),
    },
    bujia: {
      forma: (
        <>
          <rect className="hit" x={184} y={28} width={32} height={186} />
          <rect className="pz" fill="#e8edf3" {...borde} x={193} y={40} width={14} height={160} />
          <rect className="pz" fill="#94a3b8" {...borde} x={187} y={150} width={26} height={16} />
          <rect className="pz" fill="#475569" x={197} y={200} width={6} height={11} />
        </>
      ),
    },
    junta: {
      forma: (
        <>
          <rect className="hit" x={60} y={209} width={280} height={12} />
          <rect className="pz" fill={C.junta} x={60} y={212} width={280} height={6} />
        </>
      ),
    },
    contrapeso: {
      forma: <path className="pz" fill={C.contra} {...borde} d="M200,430 L209,481.2 A52,52 0 0 1 148.8,421 Z" />,
    },
    ciguenal: {
      forma: (
        <>
          <path className="pz" fill={C.cig} {...borde} d="M210.6,440.6 L242.6,408.6 L221.4,387.4 L189.4,419.4 Z" />
          <circle className="pz" fill={C.cig} {...borde} cx={200} cy={430} r={18} />
          <circle cx={200} cy={430} r={5} fill="#e2e8f0" />
        </>
      ),
    },
    piston: {
      forma: <rect className="pz" fill={C.piston} {...borde} x={121} y={244} width={158} height={70} rx={4} />,
    },
    segmentos: {
      forma: (
        <>
          <rect className="hit" x={121} y={248} width={158} height={28} />
          <rect className="pz" fill={C.seg} x={119} y={251} width={162} height={4} />
          <rect className="pz" fill={C.seg} x={119} y={259} width={162} height={4} />
          <rect className="pz" fill={C.seg} x={119} y={268} width={162} height={6} />
        </>
      ),
    },
    biela: {
      forma: (
        <>
          <path className="pz" fill={C.biela} {...borde} d="M189,298 L211,298 L247,392 L219,404 Z" />
          <circle className="pz" fill={C.biela} {...borde} cx={200} cy={292} r={17} />
          <circle className="pz" fill={C.biela} {...borde} cx={232} cy={398} r={22} />
          <circle cx={232} cy={398} r={9} fill={C.cig} stroke="#334155" />
        </>
      ),
    },
    bulon: {
      forma: (
        <>
          <circle className="hit" cx={200} cy={292} r={14} />
          <circle className="pz" fill="#e8edf3" {...borde} cx={200} cy={292} r={10} />
          <circle cx={200} cy={292} r={4} fill="#94a3b8" />
        </>
      ),
    },
  },
  encima: (
    <g pointerEvents="none">
      {/* conductos de refrigeración en el bloque */}
      <rect x={70} y={228} width={30} height={80} rx={6} fill="#bfdbfe" opacity={0.8} />
      <rect x={300} y={228} width={30} height={80} rx={6} fill="#bfdbfe" opacity={0.8} />
      {/* aceite en el cárter */}
      <path d="M86,492 H314 L310,505 Q308,511 300,511 H100 Q92,511 90,505 Z" fill="#fcd34d" opacity={0.7} />
      {/* sentido del aire: entra por la izquierda, sale por la derecha */}
      <Flecha x1={14} y1={150} x2={52} y2={150} color="#2563eb" />
      <Flecha x1={348} y1={150} x2={388} y2={150} color="#ea580c" />
    </g>
  ),
}

// ───────────────────────── Tema 2: pistón ─────────────────────────
const piston: DefDiagrama = {
  viewBox: '0 0 400 340',
  fondo: (
    <g>
      <line x1={86} y1={20} x2={86} y2={330} stroke="#cbd5e1" strokeDasharray="5 5" />
      <line x1={314} y1={20} x2={314} y2={330} stroke="#cbd5e1" strokeDasharray="5 5" />
    </g>
  ),
  zonas: {
    falda: {
      forma: (
        <path
          className="pz"
          fill={C.piston}
          {...borde}
          fillRule="evenodd"
          d="M100,160 H300 V306 Q300,318 288,318 H112 Q100,318 100,306 Z M158,220 a42,42 0 1 0 84,0 a42,42 0 1 0 -84,0 Z"
        />
      ),
      ancla: [130, 290],
    },
    portasegmentos: {
      forma: <rect className="pz" fill="#c3c9d2" {...borde} x={100} y={95} width={200} height={65} />,
      ancla: [200, 155],
    },
    cabeza: {
      forma: <path className="pz" fill="#bfc6d0" {...borde} d="M100,95 V60 Q100,40 122,40 H278 Q300,40 300,60 V95 Z" />,
      ancla: [200, 66],
    },
    seg_compresion: {
      forma: (
        <>
          <rect className="hit" x={90} y={100} width={220} height={32} />
          <rect className="pz" fill={C.seg} x={94} y={103} width={212} height={8} rx={2} />
          <rect className="pz" fill={C.seg} x={94} y={120} width={212} height={8} rx={2} />
        </>
      ),
    },
    seg_engrase: {
      forma: (
        <>
          <rect className="hit" x={90} y={134} width={220} height={18} />
          <rect className="pz" fill="#1f2937" x={94} y={137} width={212} height={12} rx={2} />
          {[115, 145, 175, 205, 235, 265].map((x) => (
            <rect key={x} x={x} y={141} width={12} height={4} fill="#e2e8f0" />
          ))}
        </>
      ),
    },
    alojamiento_bulon: {
      forma: (
        <path
          className="pz"
          fill="#aab3bf"
          {...borde}
          fillRule="evenodd"
          d="M158,220 a42,42 0 1 0 84,0 a42,42 0 1 0 -84,0 Z M174,220 a26,26 0 1 0 52,0 a26,26 0 1 0 -52,0 Z"
        />
      ),
    },
    bulon: {
      forma: (
        <>
          <circle className="pz" fill="#e8edf3" {...borde} cx={200} cy={220} r={25} />
          <circle cx={200} cy={220} r={11} fill="#ffffff" stroke="#334155" />
        </>
      ),
    },
  },
}

// ───────────────────────── Tema 2: biela ─────────────────────────
const biela: DefDiagrama = {
  viewBox: '0 0 300 410',
  zonas: {
    cana: {
      forma: (
        <>
          <path className="pz" fill={C.biela} {...borde} d="M135,96 L165,96 L182,280 L118,280 Z" />
          <path className="pz" fill="#62758e" d="M143,112 L157,112 L168,266 L132,266 Z" />
          {/* sección en doble T */}
          <path className="pz" fill={C.biela} {...borde} d="M222,170 h44 v9 h-17 v24 h17 v9 h-44 v-9 h17 v-24 h-17 Z" />
          <line x1={168} y1={190} x2={220} y2={190} stroke="#94a3b8" strokeDasharray="3 3" />
        </>
      ),
    },
    pie: {
      forma: (
        <path
          className="pz"
          fill={C.biela}
          {...borde}
          fillRule="evenodd"
          d="M118,66 a32,32 0 1 0 64,0 a32,32 0 1 0 -64,0 Z M132,66 a18,18 0 1 0 36,0 a18,18 0 1 0 -36,0 Z"
        />
      ),
    },
    cabeza: {
      forma: (
        <path
          className="pz"
          fill={C.biela}
          {...borde}
          fillRule="evenodd"
          d="M88,330 a62,62 0 1 0 124,0 a62,62 0 1 0 -124,0 Z M106,330 a44,44 0 1 0 88,0 a44,44 0 1 0 -88,0 Z"
        />
      ),
    },
    cojinete: {
      forma: (
        <path
          className="pz"
          fill={C.bronce}
          {...borde}
          fillRule="evenodd"
          d="M106,330 a44,44 0 1 0 88,0 a44,44 0 1 0 -88,0 Z M114,330 a36,36 0 1 0 72,0 a36,36 0 1 0 -72,0 Z"
        />
      ),
    },
  },
  encima: (
    <g pointerEvents="none">
      <line x1={88} y1={330} x2={106} y2={330} stroke="#1f2937" strokeWidth={2} />
      <line x1={194} y1={330} x2={212} y2={330} stroke="#1f2937" strokeWidth={2} />
      <rect x={94} y={300} width={6} height={60} fill="#475569" />
      <rect x={200} y={300} width={6} height={60} fill="#475569" />
    </g>
  ),
}

// ───────────────────────── Tema 2: cigüeñal ─────────────────────────
function brazo(x: number, arriba: boolean) {
  return arriba ? <rect key={x} className="pz" fill={C.cig} {...borde} x={x} y={48} width={25} height={100} rx={4} /> : <rect key={x} className="pz" fill={C.cig} {...borde} x={x} y={112} width={25} height={100} rx={4} />
}
function contrapeso(x: number, arriba: boolean) {
  // arriba = la muñequilla está arriba, así que el contrapeso va abajo
  return arriba ? (
    <path key={x} className="pz" fill={C.contra} {...borde} d={`M${x - 4},148 h33 v22 q0,18 -16.5,18 q-16.5,0 -16.5,-18 Z`} />
  ) : (
    <path key={x} className="pz" fill={C.contra} {...borde} d={`M${x - 4},112 h33 v-22 q0,-18 -16.5,-18 q-16.5,0 -16.5,18 Z`} />
  )
}
const muñequillas: [number, boolean][] = [
  [105, true],
  [215, false],
  [325, true],
]
const ciguenal: DefDiagrama = {
  viewBox: '0 0 500 260',
  fondo: (
    <g>
      <line x1={10} y1={130} x2={490} y2={130} stroke="#cbd5e1" strokeDasharray="6 4" />
      <rect x={44} y={122} width={8} height={16} fill={C.cig} />
      <rect x={410} y={120} width={22} height={20} fill={C.cig} />
    </g>
  ),
  zonas: {
    contrapeso: {
      forma: <>{muñequillas.flatMap(([x, a]) => [contrapeso(x - 25, a), contrapeso(x + 30, a)])}</>,
    },
    brazo: {
      forma: <>{muñequillas.flatMap(([x, a]) => [brazo(x - 25, a), brazo(x + 30, a)])}</>,
    },
    apoyo: {
      forma: (
        <>
          {[50, 160, 270, 380].map((x) => (
            <rect key={x} className="pz" fill="#93a5bb" {...borde} x={x} y={114} width={30} height={32} rx={3} />
          ))}
        </>
      ),
    },
    munequilla: {
      forma: (
        <>
          {muñequillas.map(([x, a]) => (
            <rect key={x} className="pz" fill="#b4c2d3" {...borde} x={x} y={a ? 58 : 170} width={30} height={32} rx={3} />
          ))}
        </>
      ),
    },
    amortiguador: {
      forma: (
        <>
          <rect className="pz" fill="#4b5d75" {...borde} x={16} y={72} width={28} height={116} rx={6} />
          {[86, 100, 114, 128, 142, 156, 170].map((y) => (
            <line key={y} x1={16} y1={y} x2={44} y2={y} stroke="#cbd5e1" strokeWidth={1.5} />
          ))}
        </>
      ),
    },
    volante: {
      forma: (
        <>
          <rect className="pz" fill="#5b6b82" {...borde} x={432} y={16} width={34} height={228} rx={8} />
          {Array.from({ length: 19 }, (_, i) => 24 + i * 11.5).map((y) => (
            <rect key={y} x={466} y={y} width={6} height={6} fill="#334155" />
          ))}
        </>
      ),
    },
  },
}

// ───────────────────────── Tema 2: distribución OHV / OHC / DOHC ─────────────────────────
function cilindroDecor(x: number, ancho: number, yTop: number, yPiston: number) {
  return (
    <g>
      <rect x={x - 10} y={yTop} width={10} height={130} fill={C.bloque} stroke="#334155" />
      <rect x={x + ancho} y={yTop} width={10} height={130} fill={C.bloque} stroke="#334155" />
      <rect x={x + 3} y={yPiston} width={ancho - 6} height={45} rx={3} fill={C.piston} stroke="#334155" />
      <line x1={x + ancho / 2} y1={yPiston + 30} x2={x + ancho / 2} y2={yPiston + 110} stroke={C.biela} strokeWidth={10} />
    </g>
  )
}

function Valvula({ x, yTop, yCabeza, ancho = 34 }: { x: number; yTop: number; yCabeza: number; ancho?: number }) {
  return (
    <>
      <rect className="hit" x={x - 12} y={yTop} width={24} height={yCabeza - yTop + 12} />
      <rect className="pz" fill={C.valv} {...borde} x={x - 3} y={yTop} width={6} height={yCabeza - yTop + 2} />
      <path className="pz" fill={C.valv} {...borde} d={`M${x - ancho / 2},${yCabeza + 10} L${x + ancho / 2},${yCabeza + 10} L${x + 6},${yCabeza} L${x - 6},${yCabeza} Z`} />
    </>
  )
}

function Muelle({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <>
      <rect className="hit" x={x - 18} y={y1 - 4} width={36} height={y2 - y1 + 8} />
      <rect className="pz" fill={C.muelle} x={x - 15} y={y1 - 4} width={30} height={4} />
      <path className="ln" fill="none" stroke={C.muelle} strokeWidth={2.5} d={zigzag(x, y1, y2, 26, 5)} />
    </>
  )
}

function Leva({ cx, cy, haciaArriba = false }: { cx: number; cy: number; haciaArriba?: boolean }) {
  const d = haciaArriba
    ? `M${cx - 17},${cy + 4} A17,17 0 0 0 ${cx + 17},${cy + 4} L${cx + 7},${cy - 25} A7,7 0 0 0 ${cx - 7},${cy - 25} Z`
    : `M${cx - 17},${cy - 4} A17,17 0 0 1 ${cx + 17},${cy - 4} L${cx + 7},${cy + 25} A7,7 0 0 1 ${cx - 7},${cy + 25} Z`
  return (
    <>
      <path className="pz" fill={C.leva} {...borde} d={d} />
      <circle cx={cx} cy={cy} r={5} fill="#e2e8f0" />
    </>
  )
}

const culataDecor = (x: number, y: number, w: number, h: number) => (
  <rect x={x} y={y} width={w} height={h} fill="#dfe5ed" stroke="#94a3b8" rx={4} />
)

const ohv: DefDiagrama = {
  viewBox: '0 0 260 420',
  fondo: (
    <g>
      {culataDecor(20, 90, 220, 85)}
      <rect x={20} y={175} width={220} height={190} fill="#eef1f5" stroke="#94a3b8" rx={4} />
      {cilindroDecor(40, 90, 175, 215)}
      {/* cigüeñal y engranajes de mando del árbol de levas */}
      <circle cx={85} cy={360} r={26} fill={C.cig} stroke="#334155" />
      <circle cx={145} cy={370} r={13} fill="#94a3b8" stroke="#334155" />
    </g>
  ),
  zonas: {
    valvula: { forma: <Valvula x={85} yTop={62} yCabeza={164} /> },
    muelle: { forma: <Muelle x={85} y1={78} y2={128} /> },
    balancin: {
      forma: (
        <>
          <rect className="hit" x={70} y={30} width={130} height={32} />
          <path className="pz" fill="#7f93ab" {...borde} d="M74,62 L74,52 Q74,44 84,44 L184,40 Q194,40 194,48 L194,56 L84,62 Z" />
          <circle cx={136} cy={50} r={6} fill="#e2e8f0" stroke="#334155" />
        </>
      ),
    },
    varilla: {
      forma: (
        <>
          <line className="hit" x1={186} y1={58} x2={190} y2={300} stroke="transparent" strokeWidth={18} />
          <line className="ln" x1={186} y1={58} x2={190} y2={300} stroke="#475569" strokeWidth={5} />
        </>
      ),
    },
    taque: { forma: <rect className="pz" fill={C.taque} {...borde} x={178} y={300} width={24} height={24} rx={2} /> },
    arbol_levas: { forma: <Leva cx={190} cy={354} haciaArriba /> },
  },
}

const ohc: DefDiagrama = {
  viewBox: '0 0 260 330',
  fondo: (
    <g>
      {culataDecor(20, 20, 220, 150)}
      {cilindroDecor(40, 120, 170, 200)}
    </g>
  ),
  zonas: {
    valvula: { forma: <Valvula x={80} yTop={78} yCabeza={158} /> },
    muelle: { forma: <Muelle x={80} y1={96} y2={138} /> },
    balancin: {
      forma: (
        <>
          <rect className="hit" x={66} y={62} width={160} height={28} />
          <path className="pz" fill="#7f93ab" {...borde} d="M70,86 L70,78 Q70,70 80,70 L214,66 Q224,66 224,74 L224,82 L80,86 Z" />
          <circle cx={212} cy={76} r={6} fill="#e2e8f0" stroke="#334155" />
        </>
      ),
    },
    arbol_levas: { forma: <Leva cx={150} cy={36} /> },
  },
}

const dohc: DefDiagrama = {
  viewBox: '0 0 300 330',
  fondo: (
    <g>
      {culataDecor(20, 20, 260, 150)}
      {cilindroDecor(55, 190, 170, 200)}
      <rect x={144} y={40} width={12} height={125} fill="#e8edf3" stroke="#334155" />
    </g>
  ),
  zonas: {
    valvula: {
      forma: (
        <>
          <Valvula x={95} yTop={92} yCabeza={158} />
          <Valvula x={205} yTop={92} yCabeza={158} ancho={30} />
        </>
      ),
    },
    muelle: {
      forma: (
        <>
          <Muelle x={95} y1={96} y2={132} />
          <Muelle x={205} y1={96} y2={132} />
        </>
      ),
    },
    taque: {
      forma: (
        <>
          <rect className="pz" fill={C.taque} {...borde} x={80} y={76} width={30} height={16} rx={2} />
          <rect className="pz" fill={C.taque} {...borde} x={190} y={76} width={30} height={16} rx={2} />
        </>
      ),
    },
    arbol_levas: {
      forma: (
        <>
          <Leva cx={95} cy={47} />
          <Leva cx={205} cy={47} />
        </>
      ),
    },
  },
}

// ───────────────────────── Tema 3: diagramas p-V ─────────────────────────
const pvOtto: DefDiagrama = {
  viewBox: '0 0 360 285',
  fondo: <EjesPV />,
  zonas: {
    t12: { forma: <Tramo d="M320,225 C200,222 120,180 90,120" />, ancla: [160, 216] },
    t23: { forma: <Tramo d="M90,120 L90,40" />, ancla: [68, 80] },
    t34: { forma: <Tramo d="M90,40 C120,110 200,170 320,180" />, ancla: [190, 116] },
    t41: { forma: <Tramo d="M320,180 L320,225" />, ancla: [342, 202] },
  },
  encima: (
    <g pointerEvents="none">
      <Num x={326} y={240} n="1" />
      <Num x={98} y={130} n="2" />
      <Num x={98} y={40} n="3" />
      <Num x={326} y={176} n="4" />
    </g>
  ),
}

const pvDiesel: DefDiagrama = {
  viewBox: '0 0 360 285',
  fondo: <EjesPV />,
  zonas: {
    t12: { forma: <Tramo d="M320,228 C200,225 110,150 90,60" />, ancla: [168, 210] },
    t23: { forma: <Tramo d="M90,60 L160,60" />, ancla: [125, 38] },
    t34: { forma: <Tramo d="M160,60 C190,110 250,150 320,160" />, ancla: [242, 106] },
    t41: { forma: <Tramo d="M320,160 L320,228" />, ancla: [342, 195] },
  },
  encima: (
    <g pointerEvents="none">
      <Num x={326} y={243} n="1" />
      <Num x={72} y={72} n="2" />
      <Num x={164} y={52} n="3" />
      <Num x={326} y={156} n="4" />
    </g>
  ),
}

const pvDual: DefDiagrama = {
  viewBox: '0 0 360 285',
  fondo: <EjesPV />,
  zonas: {
    t12: { forma: <Tramo d="M320,228 C200,225 120,180 90,110" />, ancla: [162, 214] },
    t23: { forma: <Tramo d="M90,110 L90,50" />, ancla: [68, 82] },
    t34: { forma: <Tramo d="M90,50 L150,50" />, ancla: [120, 30] },
    t45: { forma: <Tramo d="M150,50 C180,110 240,150 320,165" />, ancla: [236, 108] },
    t51: { forma: <Tramo d="M320,165 L320,228" />, ancla: [342, 197] },
  },
  encima: (
    <g pointerEvents="none">
      <Num x={326} y={243} n="1" />
      <Num x={98} y={124} n="2" />
      <Num x={74} y={48} n="3" />
      <Num x={154} y={42} n="4" />
      <Num x={326} y={160} n="5" />
    </g>
  ),
}

const pvReal: DefDiagrama = {
  viewBox: '0 0 360 285',
  fondo: (
    <g>
      <EjesPV />
      <line x1={40} y1={236} x2={345} y2={236} stroke="#94a3b8" strokeDasharray="2 3" />
      <text x={44} y={232} className="txt-p">p atm</text>
      {/* ciclo teórico (discontinuo) */}
      <path d="M90,120 L90,40 C120,110 200,170 320,180 L320,225 C200,222 120,180 90,120" fill="none" stroke="#94a3b8" strokeWidth={2} strokeDasharray="6 4" />
      {/* ciclo real (continuo) */}
      <path
        d="M320,226 C220,222 150,196 110,150 C102,120 106,86 120,76 C160,130 230,168 296,184 Q316,192 320,226"
        fill="none"
        stroke="#1e3a5f"
        strokeWidth={2.5}
      />
    </g>
  ),
  zonas: {
    p_tiempo: {
      forma: <path className="pz" fill="#fdba74" opacity={0.85} d="M90,120 L90,40 C96,55 104,68 112,80 C106,90 104,120 110,150 C102,140 94,130 90,120 Z" />,
      ancla: [70, 70],
    },
    p_calor: {
      forma: <path className="pz" fill="#93c5fd" opacity={0.85} d="M112,80 C150,128 220,166 300,177 L296,184 C230,168 160,130 120,76 Z M112,80 L120,76 Z" />,
      ancla: [210, 140],
    },
    p_escape: {
      forma: <path className="pz" fill="#c4b5fd" opacity={0.9} d="M296,184 L320,180 L320,226 Q316,192 296,184 Z" />,
      ancla: [342, 200],
    },
    p_bombeo: {
      forma: <path className="pz" fill="#fca5a5" opacity={0.9} d="M95,234 C170,224 260,224 320,230 C260,248 170,250 95,240 Z" />,
      ancla: [200, 254],
    },
  },
}

// Diagrama circular: PMS arriba, PMI abajo, giro en sentido horario.
const [aavaX, aavaY] = polar(160, 165, 110, -20)
const [rcvaX, rcvaY] = polar(160, 165, 110, 220)
const [aaveX, aaveY] = polar(160, 165, 88, 135)
const [rcveX, rcveY] = polar(160, 165, 88, 20)
function puntoDist(x: number, y: number, color: string) {
  return (
    <>
      <circle className="hit" cx={x} cy={y} r={17} />
      <circle className="pz" cx={x} cy={y} r={9} fill={color} stroke="#1f2937" strokeWidth={2} />
    </>
  )
}
const distribucion: DefDiagrama = {
  viewBox: '0 0 320 330',
  fondo: (
    <g>
      <line x1={160} y1={30} x2={160} y2={300} stroke="#cbd5e1" strokeDasharray="5 4" />
      <text x={147} y={22} className="txt">PMS</text>
      <text x={148} y={318} className="txt">PMI</text>
      <path d={`M${aavaX},${aavaY} A110,110 0 1 1 ${rcvaX},${rcvaY}`} fill="none" stroke="#3b82f6" strokeWidth={11} opacity={0.75} />
      <path d={`M${aaveX},${aaveY} A88,88 0 1 1 ${rcveX},${rcveY}`} fill="none" stroke="#f97316" strokeWidth={11} opacity={0.75} />
      <path d="M290,120 A140,140 0 0 1 296,190" fill="none" stroke="#64748b" strokeWidth={2} markerEnd="url(#puntaGiro)" />
      <defs>
        <marker id="puntaGiro" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#64748b" />
        </marker>
      </defs>
      <text x={274} y={110} className="txt-p">giro</text>
      <rect x={6} y={300} width={12} height={8} fill="#3b82f6" />
      <text x={22} y={308} className="txt-p">admisión</text>
      <rect x={6} y={314} width={12} height={8} fill="#f97316" />
      <text x={22} y={322} className="txt-p">escape</text>
    </g>
  ),
  zonas: {
    cruce: {
      forma: <path className="pz" fill="#fde68a" opacity={0.9} d={(() => {
        const [ax, ay] = polar(160, 165, 128, -20)
        const [bx, by] = polar(160, 165, 128, 20)
        const [cx, cy] = polar(160, 165, 70, 20)
        const [dx, dy] = polar(160, 165, 70, -20)
        return `M${ax},${ay} A128,128 0 0 1 ${bx},${by} L${cx},${cy} A70,70 0 0 0 ${dx},${dy} Z`
      })()} />,
      ancla: [160, 118],
    },
    aava: { forma: puntoDist(aavaX, aavaY, '#1d4ed8'), ancla: [96, 40] },
    rcve: { forma: puntoDist(rcveX, rcveY, '#c2410c'), ancla: [226, 40] },
    aave: { forma: puntoDist(aaveX, aaveY, '#c2410c'), ancla: [262, 262] },
    rcva: { forma: puntoDist(rcvaX, rcvaY, '#1d4ed8'), ancla: [58, 280] },
  },
}

// ───────────────────────── Tema 4 ─────────────────────────
const lazos: DefDiagrama = {
  viewBox: '0 0 360 285',
  fondo: (
    <g>
      <EjesPV />
      <line x1={40} y1={234} x2={345} y2={234} stroke="#94a3b8" strokeDasharray="2 3" />
      <text x={44} y={230} className="txt-p">p atm</text>
    </g>
  ),
  zonas: {
    lazo_trabajo: {
      forma: (
        <path
          className="pz"
          fill="#93c5fd"
          stroke="#1e3a5f"
          strokeWidth={2.5}
          d="M320,228 C220,224 150,198 110,150 C100,120 104,86 120,76 C160,130 230,170 300,186 Q318,194 320,228 Z"
        />
      ),
      ancla: [180, 150],
    },
    lazo_bombeo: {
      forma: <path className="pz" fill="#fca5a5" stroke="#1e3a5f" strokeWidth={2.5} d="M95,232 C170,224 260,224 320,228 C260,246 170,248 95,240 Z" />,
      ancla: [210, 256],
    },
  },
}

const curvas: DefDiagrama = {
  viewBox: '0 0 360 300',
  fondo: (
    <g>
      <line x1={45} y1={272} x2={340} y2={272} stroke="#64748b" strokeWidth={1.5} />
      <line x1={45} y1={272} x2={45} y2={20} stroke="#64748b" strokeWidth={1.5} />
      <text x={230} y={292} className="txt-p">régimen de giro (rpm) →</text>
      {[100, 160, 220, 280].map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={272} stroke="#eef2f7" />
      ))}
    </g>
  ),
  zonas: {
    curva_pot: {
      forma: (
        <>
          <path d="M60,248 C140,200 220,110 285,62 Q300,54 322,68" className="hit" fill="none" strokeWidth={16} />
          <path d="M60,248 C140,200 220,110 285,62 Q300,54 322,68" className="ln" fill="none" stroke="#dc2626" strokeWidth={3.5} />
        </>
      ),
    },
    curva_par: {
      forma: (
        <>
          <path d="M60,140 C110,105 170,92 205,92 C240,92 290,110 322,140" className="hit" fill="none" strokeWidth={16} />
          <path d="M60,140 C110,105 170,92 205,92 C240,92 290,110 322,140" className="ln" fill="none" stroke="#2563eb" strokeWidth={3.5} />
        </>
      ),
    },
    curva_ce: {
      forma: (
        <>
          <path d="M60,205 C110,240 160,245 190,245 C220,245 280,238 322,205" className="hit" fill="none" strokeWidth={16} />
          <path d="M60,205 C110,240 160,245 190,245 C220,245 280,238 322,205" className="ln" fill="none" stroke="#16a34a" strokeWidth={3.5} />
        </>
      ),
    },
    pot_max: {
      forma: (
        <>
          <circle className="hit" cx={296} cy={60} r={15} />
          <circle className="pz" cx={296} cy={60} r={7} fill="#ffffff" stroke="#1f2937" strokeWidth={2.5} />
        </>
      ),
    },
    par_max: {
      forma: (
        <>
          <circle className="hit" cx={205} cy={92} r={15} />
          <circle className="pz" cx={205} cy={92} r={7} fill="#ffffff" stroke="#1f2937" strokeWidth={2.5} />
        </>
      ),
    },
    ce_min: {
      forma: (
        <>
          <circle className="hit" cx={190} cy={245} r={15} />
          <circle className="pz" cx={190} cy={245} r={7} fill="#ffffff" stroke="#1f2937" strokeWidth={2.5} />
        </>
      ),
    },
  },
}

export const DIBUJOS: Record<string, DefDiagrama> = {
  motor,
  piston,
  biela,
  ciguenal,
  ohv,
  ohc,
  dohc,
  pv_otto: pvOtto,
  pv_diesel: pvDiesel,
  pv_dual: pvDual,
  pv_real: pvReal,
  distribucion,
  lazos,
  curvas,
}
