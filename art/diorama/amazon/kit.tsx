// ============================================================
// LONG VIDEO — "Amazon Sells You Everything. Its Profit Comes From Somewhere Else."
// objects: a cardboard parcel, a delivery van, a warehouse with a conveyor, a
// server rack with blinking lights, a data hall (racks inside a building), a
// two-floor "Amazon" building (store upstairs, servers in the basement), a TV
// streaming screen, a profit coin. One file per scene. No logos. No camera moves.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

// ------------------------------------------------------------ a cardboard parcel with tape
export const Parcel: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; label?: string }> = ({ x, y, s = 1, o = 1, r = 0, label }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-90} width={120} height={90} rx={6} fill="#C99A62" /><path d="M-60 -90 L-40 -110 L80 -110 L60 -90 Z" fill="#DDB27C" /><path d="M60 -90 L80 -110 L80 -20 L60 0 Z" fill="#A87C48" />
    <rect x={-8} y={-90} width={16} height={90} fill="#E9D3A8" /><path d="M-8 -90 L12 -110 L28 -110 L8 -90 Z" fill="#F2E2C0" />
    {label && <text x={0} y={-36} textAnchor="middle" fill="#5A3E1E" style={{ font: '400 30px "Bebas Neue"' }}>{label}</text>}
  </g>
)

// ------------------------------------------------------------ a delivery van; wheels turn with f
export const Van: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; flip?: boolean }> = ({ x, y, s = 1, o = 1, f = 0, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={190} ry={12} fill={P.shadow} opacity={0.2} />
    <path d="M-180 -20 L-180 -200 Q-180 -214 -166 -214 L80 -214 Q96 -214 100 -200 L118 -130 L176 -110 Q192 -104 192 -86 L192 -20 Z" fill="#EEF3FA" stroke="#9AA8BC" strokeWidth={4} />
    <path d="M96 -196 L112 -132 L60 -132 L60 -196 Z" fill="#2B3A55" />
    <rect x={-160} y={-150} width={200} height={40} rx={6} fill="#2B5A8A" /><text x={-60} y={-121} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 30px "Bebas Neue"', letterSpacing: 3 }}>DELIVERY</text>
    {[-110, 120].map((cx) => <g key={cx} transform={`translate(${cx} -20) rotate(${(f * 9) % 360})`}><circle r={32} fill="#1B1B22" /><circle r={15} fill="#C9D3E1" /><rect x={-3} y={-15} width={6} height={30} fill="#1B1B22" /></g>)}
  </g>
)

// ------------------------------------------------------------ a warehouse shed with a roller door and a conveyor
export const Warehouse: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; label?: string }> = ({ x, y, s = 1, o = 1, f = 0, label = 'WAREHOUSE' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-260 0 L-260 -220 L0 -300 L260 -220 L260 0 Z" fill="#8A97AA" /><path d="M-260 -220 L0 -300 L260 -220" fill="none" stroke="#5A6680" strokeWidth={10} />
    <rect x={-120} y={-150} width={240} height={150} rx={6} fill="#5A6680" />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-112} y={-142 + k * 28} width={224} height={6} fill="#4A5670" />)}
    <rect x={-200} y={-200} width={120} height={30} rx={6} fill={P.paper} /><text x={-140} y={-178} textAnchor="middle" fill={P.navy0} style={{ font: '400 24px "Bebas Neue"' }}>{label}</text>
    <rect x={130} y={-40} width={160} height={14} rx={7} fill="#3E4A61" />{[0, 1, 2].map((k) => <rect key={k} x={140 + ((k * 54 + f * 2) % 150)} y={-70} width={30} height={30} rx={3} fill="#C99A62" />)}
  </g>
)

// ------------------------------------------------------------ a server rack: a tall cabinet with blinking lights (lit 0–1)
export const Rack: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; lit?: number }> = ({ x, y, s = 1, o = 1, f = 0, lit = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-260} width={120} height={260} rx={8} fill="#1F2B4A" />
    {Array.from({ length: 8 }, (_, k) => <g key={k}><rect x={-48} y={-246 + k * 30} width={96} height={22} rx={3} fill="#2E3D63" />
      {[0, 1, 2].map((j) => <circle key={j} cx={-34 + j * 14} cy={-235 + k * 30} r={4} fill={((f / 6 + k * 3 + j * 5) % 7) < 3.5 * clamp01(lit) ? P.mint : '#3E4A61'} />)}</g>)}
  </g>
)

// ------------------------------------------------------------ a data hall: a long low building with racks visible through a window
export const DataHall: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; lit?: number; label?: string }> = ({ x, y, s = 1, o = 1, f = 0, lit = 1, label = 'DATA CENTER' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-320} y={-280} width={640} height={280} rx={14} fill="#C9D3E1" />
    <rect x={-290} y={-250} width={580} height={210} rx={8} fill="#0F1A30" />
    {[0, 1, 2, 3, 4].map((k) => <g key={k} transform={`translate(${-230 + k * 115} -40) scale(0.75)`}><Rack x={0} y={0} f={f + k * 5} lit={lit} /></g>)}
    {[-260, -160, 160, 260].map((fx) => <g key={fx} transform={`translate(${fx} -300)`}><rect x={-30} y={-20} width={60} height={20} rx={4} fill="#8A97AA" /><circle cx={0} cy={-10} r={8} fill="#5A6680" /></g>)}
    <text x={0} y={-260} textAnchor="middle" fill={P.navy0} style={{ font: '400 26px "Bebas Neue"', letterSpacing: 3 }}>{label}</text>
  </g>
)

// ------------------------------------------------------------ the two-floor building: the store upstairs, the server room below ground
// # open 0–1 lifts the ground slab to reveal the basement
export const TwoFloor: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; open?: number }> = ({ x, y, s = 1, o = 1, f = 0, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {/* # basement */}
    <g opacity={clamp01(open)}><rect x={-300} y={0} width={600} height={lerp(0, 200, clamp01(open))} rx={10} fill="#0F1A30" />
      {[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${-210 + k * 140} ${lerp(0, 190, clamp01(open))}) scale(0.62)`}><Rack x={0} y={0} f={f + k * 7} /></g>)}</g>
    {/* # the store */}
    <rect x={-300} y={-300} width={600} height={300} rx={10} fill="#F2E6CC" stroke="#C9B48A" strokeWidth={4} />
    <path d="M-320 -300 L320 -300 L300 -350 L-300 -350 Z" fill="#E9A23B" />{[-260, -180, -100, -20, 60, 140, 220].map((sx) => <rect key={sx} x={sx} y={-350} width={40} height={50} fill="#FFFFFF" opacity={0.4} />)}
    <rect x={-250} y={-240} width={220} height={150} rx={8} fill="#BFE3FF" /><rect x={30} y={-240} width={220} height={150} rx={8} fill="#BFE3FF" />
    <g transform="translate(-140 -110) scale(0.5)"><Parcel x={0} y={0} /></g><g transform="translate(140 -110) scale(0.5)"><Parcel x={0} y={0} /></g>
    <rect x={-50} y={-80} width={100} height={80} rx={4} fill="#5A6680" />
    <text x={0} y={-262} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>THE STORE</text>
  </g>
)

// ------------------------------------------------------------ a streaming TV with a play button and a show title
export const StreamTV: React.FC<{ x: number; y: number; s?: number; o?: number; title?: string; glow?: number }> = ({ x, y, s = 1, o = 1, title = 'STREAMCO', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse cx={0} cy={-120} rx={240} ry={150} fill={P.sky} opacity={0.18 * clamp01(glow)} />}
    <rect x={-200} y={-250} width={400} height={240} rx={14} fill="#111A2E" /><rect x={-184} y={-236} width={368} height={208} rx={8} fill="#2B3A6E" />
    <circle cx={0} cy={-132} r={44} fill="#FFFFFF" opacity={0.9} /><path d="M-14 -156 L22 -132 L-14 -108 Z" fill="#2B3A6E" />
    <text x={0} y={-50} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 32px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>
    <rect x={-30} y={-10} width={60} height={30} fill="#111A2E" /><rect x={-90} y={18} width={180} height={12} rx={6} fill="#111A2E" />
  </g>
)

// ------------------------------------------------------------ a soft spotlight that snaps on its word and fades
export const ASpot: React.FC<{ f: number; at: number; x: number; y: number; rx?: number; ry?: number }> = ({ f, at, x, y, rx = 200, ry = 160 }) => {
  const t = f - at
  if (t < 0 || t > 30) return null
  const o = t < 3 ? t / 3 : 1 - (t - 3) / 27
  return <ellipse cx={x} cy={y} rx={Math.min(rx, 230)} ry={Math.min(ry, 210)} fill={P.gold} opacity={0.18 * o} />
}
