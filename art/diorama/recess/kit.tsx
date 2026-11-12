// # Fresh drawings for "How Recessions Actually Work" (owner rules r82/r83: this video's own world).
// # The world: a TABLETOP TOY-THEATRE TOWN. A warm wooden table under a hanging lamp, a plaster wall behind it.
// # Painted wooden toy shops stand on the table (café, barber, grocer, the espresso-machine works, a bank, the Fed),
// # brass coin tokens roll between them, and the weather is held up on sticks like a toy theatre: a cotton storm
// # cloud, a painted sun. The lamp dims as the recession deepens and warms again in the recovery.
// # Every prop is drawn around its own origin (bottom centre for things that stand on the table).
import React from 'react'

export const TXT = (size: number): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 2 })

export const WALL = '#E9DCC6', WALL2 = '#D8C6A8', WOOD = '#B27A4B', WOOD2 = '#8E5B34', WOOD3 = '#6B4126', FELT = '#3F7D5C'
export const CREAM = '#FFF6E6', INK = '#2A2321', RED = '#C9483A', BLUE = '#3C6E9F', TEAL = '#2F8C83', MUSTARD = '#E0A93B'
export const PINK = '#E58C8A', GREEN = '#5FA35A', BRASS = '#D9A441', BRASS2 = '#A87622', SLATE = '#4D5A6A', SHADE = 'rgba(40,24,12,0.25)'

export type Mood = 'warm' | 'dim' | 'storm' | 'dawn'
const LIGHT: Record<Mood, [string, number]> = { warm: ['#FFE2A6', 0.55], dim: ['#F3CF96', 0.3], storm: ['#B9C3D6', 0.18], dawn: ['#FFD9A0', 0.45] }
const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

// ================================================================== WORLD
// # the wall, the hanging lamp and its pool of light, the wooden table (top at y = TOP), wood grain, dust motes
export const TOP = 860
export const TableWorld: React.FC<{ f: number; id: string; mood?: Mood; lamp?: number }> = ({ f, id, mood = 'warm', lamp }) => {
  const [lc, lo0] = LIGHT[mood], lo = lamp ?? lo0
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={mood === 'storm' ? '#9EA4AE' : WALL2} /><stop offset="100%" stopColor={mood === 'storm' ? '#C3C2BF' : WALL} /></linearGradient>
        <radialGradient id={`${id}-pool`} cx="0.5" cy="0.35" r="0.6"><stop offset="0%" stopColor={lc} stopOpacity={lo} /><stop offset="100%" stopColor={lc} stopOpacity={0} /></radialGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={WOOD} /><stop offset="100%" stopColor={WOOD2} /></linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={WOOD2} /><stop offset="100%" stopColor={WOOD3} /></linearGradient>
      </defs>
      <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-wall)`} />
      {/* wallpaper stripes */}
      {Array.from({ length: 24 }, (_, i) => <rect key={i} x={i * 84} y={-40} width={26} height={TOP + 40} fill="#FFFFFF" opacity={0.08} />)}
      {/* the lamp: cord, shade, bulb and its light pool */}
      <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-pool)`} />
      <line x1={960} y1={-40} x2={960} y2={-12} stroke={INK} strokeWidth={4} />
      <path d="M900 30 L1020 30 L990 -12 L930 -12 Z" fill={SLATE} /><ellipse cx={960} cy={30} rx={60} ry={8} fill="#3A4452" />
      <circle cx={960} cy={36} r={11} fill={lc} opacity={0.6 + lo * 0.6} />
      {/* table top and front edge */}
      <rect x={-40} y={TOP} width={2000} height={140} fill={`url(#${id}-top)`} />
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M-40 ${TOP + 18 + i * 18} Q480 ${TOP + 12 + i * 18 + rnd(i) * 10} 960 ${TOP + 20 + i * 18} T1960 ${TOP + 16 + i * 18}`} stroke={WOOD3} strokeWidth={2} fill="none" opacity={0.25} />)}
      <rect x={-40} y={TOP + 140} width={2000} height={100} fill={`url(#${id}-edge)`} />
      <rect x={-40} y={TOP} width={2000} height={6} fill="#FFFFFF" opacity={0.18} />
      {/* dust motes in the lamp light */}
      {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={760 + rnd(i) * 400 + 20 * Math.sin(f / 50 + i)} cy={160 + ((rnd(i + 9) * 500 + f * 0.4) % 560)} r={2 + rnd(i + 3) * 2} fill="#FFFFFF" opacity={0.25 * lo} />)}
    </g>
  )
}
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.32 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.45" r="0.78"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#1C120A" stopOpacity={k} /></radialGradient></defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-vig)`} />
  </g>
)
export const Shadow: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 1 }) => <ellipse cx={x + w * 0.06} cy={y + 4} rx={w / 2} ry={w * 0.07} fill={SHADE} opacity={o} />

// ================================================================== LABELS
// # a little wooden sign label: plank with nail heads (callers give it its own clear space)
export const Sign: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string }> = ({ x, y, t, o = 1, size = 44, col = CREAM, tc = INK }) => {
  const w = Math.max(120, t.length * size * 0.46 + 60)
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2 + 6} y={-size - 12} width={w} height={size + 28} rx={8} fill={SHADE} />
    <rect x={-w / 2} y={-size - 18} width={w} height={size + 28} rx={8} fill={col} stroke={WOOD3} strokeWidth={3} />
    <circle cx={-w / 2 + 14} cy={-size / 2 - 4} r={4} fill={WOOD3} /><circle cx={w / 2 - 14} cy={-size / 2 - 4} r={4} fill={WOOD3} />
    <text y={-2} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}
// # a game card standing on the table (fact cards): coloured header + big value
export const FactCard: React.FC<{ x: number; y: number; head: string; big: string; small?: string; col?: string; o?: number; s?: number; r?: number }> = ({ x, y, head, big, small, col = RED, o = 1, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-230} width={340} height={300} rx={18} fill={SHADE} transform="translate(8 10)" />
    <rect x={-170} y={-230} width={340} height={300} rx={18} fill={CREAM} stroke={INK} strokeWidth={4} />
    <rect x={-170} y={-230} width={340} height={70} rx={16} fill={col} /><rect x={-170} y={-180} width={340} height={20} fill={col} />
    <text y={-182} textAnchor="middle" fill={CREAM} style={TXT(40)}>{head}</text>
    <text y={-40} textAnchor="middle" fill={INK} style={TXT(big.length > 6 ? 84 : 110)}>{big}</text>
    {small && <text y={30} textAnchor="middle" fill={INK} style={TXT(34)}>{small}</text>}
  </g>
)
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-80 -80 L80 80 M80 -80 L-80 80" stroke={CREAM} strokeWidth={32} strokeLinecap="round" />
    <path d="M-80 -80 L80 80 M80 -80 L-80 80" stroke={RED} strokeWidth={20} strokeLinecap="round" />
  </g>
)

// ================================================================== MONEY
export const Token: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={3} cy={8} rx={30} ry={10} fill={SHADE} />
    <rect x={-30} y={-8} width={60} height={10} fill={BRASS2} /><ellipse cx={0} cy={2} rx={30} ry={10} fill={BRASS2} />
    <ellipse cx={0} cy={-8} rx={30} ry={10} fill={BRASS} />
    <text y={-2} textAnchor="middle" fill={BRASS2} style={TXT(t.length > 2 ? 16 : 20)} transform="scale(1 0.5) translate(0 -8)">{t}</text>
  </g>
)
// # a stack of brass tokens standing on y
export const Stack: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={6} cy={6} rx={40} ry={10} fill={SHADE} />
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => <g key={i} transform={`translate(0 ${-i * 12})`}><ellipse cy={0} rx={34} ry={10} fill={BRASS2} /><rect x={-34} y={-10} width={68} height={10} fill={BRASS2} /><ellipse cy={-10} rx={34} ry={10} fill={BRASS} /></g>)}
  </g>
)

// ================================================================== TOY SHOPS
// # a painted wooden block shop (bottom centre): body, roof board, sign, door and windows; `lit` 0..1, `dark` 0..1
export const Shop: React.FC<{ x: number; y: number; s?: number; o?: number; col?: string; roof?: string; name: string; kind?: 'cafe' | 'barber' | 'grocer' | 'works' | 'home'; lit?: number; dark?: number }> = ({ x, y, s = 1, o = 1, col = CREAM, roof = RED, name, kind = 'cafe', lit = 1, dark = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shadow x={0} y={0} w={300} />
    <rect x={-130} y={-240} width={260} height={240} rx={6} fill={col} />
    <rect x={-130} y={-240} width={70} height={240} fill="#FFFFFF" opacity={0.16} />
    <rect x={120} y={-240} width={10} height={240} fill="#000" opacity={0.1} />
    <path d="M-150 -240 L-110 -300 L110 -300 L150 -240 Z" fill={roof} />
    <rect x={-100} y={-288} width={200} height={40} rx={6} fill={CREAM} stroke={INK} strokeWidth={3} />
    <text y={-257} textAnchor="middle" fill={INK} style={TXT(30)}>{name}</text>
    {kind === 'cafe' && <g><path d="M-130 -200 L130 -200 L118 -160 L-118 -160 Z" fill={RED} />{[-100, -50, 0, 50, 100].map((k) => <path key={k} d={`M${k - 25} -160 q25 18 50 0`} fill={CREAM} />)}</g>}
    {kind === 'barber' && <g transform="translate(-112 -150)"><rect x={-10} y={-60} width={20} height={120} rx={10} fill={CREAM} stroke={INK} strokeWidth={3} />{[0, 1, 2, 3].map((k) => <path key={k} d={`M-10 ${-50 + k * 28} L10 ${-38 + k * 28}`} stroke={RED} strokeWidth={6} />)}</g>}
    {kind === 'grocer' && <g>{[-80, 80].map((k) => <g key={k} transform={`translate(${k} -20)`}><rect x={-40} y={-30} width={80} height={30} fill={WOOD} />{[-24, 0, 24].map((a) => <circle key={a} cx={a} cy={-36} r={12} fill={[RED, GREEN, MUSTARD][(a + 24) / 24]} />)}</g>)}</g>}
    {kind === 'works' && <g><rect x={60} y={-340} width={36} height={100} fill={SLATE} /><circle cx={78} cy={-360 - 10 * Math.sin(lit * 6)} r={14 * lit} fill="#D8D2C8" opacity={0.7 * lit} /></g>}
    {/* windows and door */}
    {[-70, 70].map((k) => <rect key={k} x={k - 34} y={-150} width={68} height={60} rx={6} fill={dark > 0.5 ? '#5A5660' : `rgba(255,${205 + 30 * lit},130,${0.5 + 0.5 * lit})`} stroke={INK} strokeWidth={4} />)}
    <rect x={-26} y={-96} width={52} height={96} rx={4} fill={dark > 0.5 ? '#3D3942' : BLUE} />
    {dark > 0 && <rect x={-130} y={-240} width={260} height={240} fill={INK} opacity={0.35 * dark} />}
  </g>
)

// # a columned toy building: BANK or THE FED (bottom centre)
export const Hall: React.FC<{ x: number; y: number; s?: number; o?: number; name: string; col?: string }> = ({ x, y, s = 1, o = 1, name, col = '#E6E1D6' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shadow x={0} y={0} w={360} />
    <rect x={-170} y={-24} width={340} height={24} fill="#CFC8BA" /><path d="M-170 -260 L0 -340 L170 -260 Z" fill={col} stroke={INK} strokeWidth={3} />
    <rect x={-160} y={-260} width={320} height={30} fill="#D9D2C4" stroke={INK} strokeWidth={3} />
    {[-120, -60, 0, 60, 120].map((k) => <rect key={k} x={k - 14} y={-230} width={28} height={206} fill={col} stroke="#B8B0A0" strokeWidth={3} />)}
    <text y={-286} textAnchor="middle" fill={INK} style={TXT(36)}>{name}</text>
  </g>
)

// ================================================================== TOY-THEATRE WEATHER (on sticks)
export const StickCloud: React.FC<{ x: number; y: number; s?: number; o?: number; storm?: number; f: number }> = ({ x, y, s = 1, o = 1, storm = 0, f }) => (
  <g transform={`translate(${x} ${y + 4 * Math.sin(f / 18)}) scale(${s})`} opacity={o}>
    <rect x={-5} y={0} width={10} height={420} fill={WOOD2} />
    <path d="M-170 0 Q-180 -70 -110 -80 Q-90 -150 -10 -130 Q40 -180 100 -120 Q180 -120 170 -40 Q190 10 130 10 L-130 10 Q-190 10 -170 0 Z" fill={storm > 0.5 ? '#6E7684' : '#F4F1EC'} stroke={INK} strokeWidth={4} />
    {storm > 0 && <g opacity={storm}>{[-90, 0, 90].map((k, i) => <line key={k} x1={k} y1={20} x2={k - 20} y2={70 + 10 * Math.sin(f / 4 + i)} stroke="#7FA9D9" strokeWidth={6} strokeLinecap="round" />)}<path d="M20 10 L-10 70 L20 70 L-6 130" stroke={MUSTARD} strokeWidth={10} fill="none" strokeLinejoin="round" opacity={Math.sin(f / 3) > 0.6 ? 1 : 0} /></g>}
  </g>
)
export const StickSun: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-5} y={0} width={10} height={420} fill={WOOD2} />
    <g transform={`translate(0 -90) rotate(${f * 0.6})`}>{Array.from({ length: 12 }, (_, k) => <path key={k} d="M-12 -95 L0 -130 L12 -95 Z" fill={MUSTARD} transform={`rotate(${k * 30})`} />)}</g>
    <circle cy={-90} r={90} fill={MUSTARD} stroke={INK} strokeWidth={4} /><circle cx={-30} cy={-110} r={8} fill={INK} /><circle cx={30} cy={-110} r={8} fill={INK} />
    <path d="M-36 -70 Q0 -40 36 -70" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
)

// # a wooden dial on a stand (SPENDING / RATE): value v −1..1 swings the needle
export const Dial: React.FC<{ x: number; y: number; v: number; label: string; s?: number; o?: number }> = ({ x, y, v, label, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shadow x={0} y={0} w={240} />
    <rect x={-14} y={-120} width={28} height={120} fill={WOOD2} />
    <path d="M-150 -120 A150 150 0 0 1 150 -120 Z" fill={CREAM} stroke={INK} strokeWidth={4} />
    <path d="M-150 -120 A150 150 0 0 1 -75 -250 L0 -120 Z" fill={RED} opacity={0.8} /><path d="M75 -250 A150 150 0 0 1 150 -120 L0 -120 Z" fill={GREEN} opacity={0.8} />
    <line x1={0} y1={-120} x2={125 * Math.sin(v * 1.3)} y2={-120 - 125 * Math.cos(v * 1.3)} stroke={INK} strokeWidth={10} strokeLinecap="round" /><circle cy={-120} r={14} fill={INK} />
    <text y={-140 + 200} textAnchor="middle" fill={CREAM} style={TXT(40)}>{label}</text>
  </g>
)

// # tiny natural motion on the thing being talked about: a lamp-light glint (fills short quiet moments)
export const Life: React.FC<{ f: number; at: number; x: number; y: number; kind?: 'glint' | 'spark' }> = ({ f, at, x, y, kind = 'glint' }) => {
  const t = (f - at) / 18
  if (t < 0 || t > 1) return null
  const k = Math.sin(Math.PI * t)
  if (kind === 'spark') return <g transform={`translate(${x} ${y})`} opacity={k}>{[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={0} y1={-20 - 30 * t} x2={0} y2={-34 - 40 * t} stroke={BRASS} strokeWidth={5} strokeLinecap="round" transform={`rotate(${i * 60})`} />)}</g>
  return <g transform={`translate(${x} ${y}) rotate(${30 * t}) scale(${k})`} opacity={0.95}><path d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z" fill="#FFFFFF" /></g>
}
