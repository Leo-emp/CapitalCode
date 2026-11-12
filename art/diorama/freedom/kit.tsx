// ============================================================
// LONG VIDEO — "How to Reach Financial Freedom, Step by Step" —
// this video's own world (owner rules r82/r83: fresh art per video).
// Art direction: "the road to freedom" — a warm dawn-to-golden-hour
// landscape drawn in layers (far hazy hills, mid hills, textured
// foreground), soft gradients, rim light and a little grain.
// Each chapter has its own place: dawn bedroom, mountain trail,
// rainy street, workshop, orchard, snowy hill, golden summit.
// Only engine helpers are shared (timing, Person rig, Headline).
// House rules: every picture lands ON its word; one picture group at a
// time; labels stick to the part they name; nothing covers anything.
// ============================================================
import React from 'react'
import { clamp01, lerp, rnd } from '../kit'

// ------------------------------------------------------------ palette
export const C = {
  ink: '#2B2340', inkSoft: '#5B5270',
  apricot: '#F6B48A', peach: '#FAD3B2', cream: '#FFF3E2', sun: '#FFC85A', sunD: '#E89B2E',
  terra: '#D9734E', terraD: '#A9502F', sage: '#8DB38B', sageD: '#5E8A63', moss: '#4C7A55',
  sky: '#8EC5E8', skyD: '#4F86B8', indigo: '#3A3A72', plum: '#6B4A7A',
  cash: '#6CC58C', cashD: '#2F8F58', cashL: '#BFEBCB', red: '#E0503F', redD: '#A8342A',
  gold: '#F2C14E', goldD: '#B8862A', snow: '#F4F8FC', snowD: '#C9D8E8', wood: '#9A6440', woodD: '#6B4026',
}
export const FONT = { big: '"Bebas Neue"', body: 'Inter' }

// ------------------------------------------------------------ shared gradients (fixed ids; identical copies are harmless)
export const Defs: React.FC = () => (
  <defs>
    <linearGradient id="fr-dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4B4A8A" /><stop offset="0.45" stopColor="#C987A0" /><stop offset="0.8" stopColor="#F6B48A" /><stop offset="1" stopColor="#FFD9A8" /></linearGradient>
    <linearGradient id="fr-day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7FB6E0" /><stop offset="0.7" stopColor="#CFE6F2" /><stop offset="1" stopColor="#FFF0DA" /></linearGradient>
    <linearGradient id="fr-rain" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4A5878" /><stop offset="0.7" stopColor="#8796B0" /><stop offset="1" stopColor="#B7C0D0" /></linearGradient>
    <linearGradient id="fr-shop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5A3E36" /><stop offset="0.6" stopColor="#8A5E48" /><stop offset="1" stopColor="#B98A66" /></linearGradient>
    <linearGradient id="fr-orchard" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9FD0E6" /><stop offset="0.65" stopColor="#E4F2DA" /><stop offset="1" stopColor="#FBF2D8" /></linearGradient>
    <linearGradient id="fr-winter" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7E93C4" /><stop offset="0.6" stopColor="#C9D6EE" /><stop offset="1" stopColor="#EEF3FA" /></linearGradient>
    <linearGradient id="fr-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E7795E" /><stop offset="0.45" stopColor="#F6A96A" /><stop offset="0.8" stopColor="#FFD58A" /><stop offset="1" stopColor="#FFE9BE" /></linearGradient>
    <linearGradient id="fr-storm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2E3550" /><stop offset="1" stopColor="#6A7393" /></linearGradient>
    <radialGradient id="fr-sunglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFF2C4" stopOpacity="0.95" /><stop offset="0.35" stopColor="#FFD27A" stopOpacity="0.55" /><stop offset="1" stopColor="#FFD27A" stopOpacity="0" /></radialGradient>
    <radialGradient id="fr-vig" cx="0.5" cy="0.48" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#1A1030" stopOpacity="0.32" /></radialGradient>
    <linearGradient id="fr-cashg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4FB277" /><stop offset="0.5" stopColor="#7AD49A" /><stop offset="1" stopColor="#3E9E66" /></linearGradient>
    <linearGradient id="fr-goldg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#D9A23A" /><stop offset="0.5" stopColor="#FFD873" /><stop offset="1" stopColor="#C88F2C" /></linearGradient>
    <linearGradient id="fr-woodg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B07A50" /><stop offset="1" stopColor="#7A4C2E" /></linearGradient>
    <linearGradient id="fr-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0.05" /></linearGradient>
    <pattern id="fr-grain" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="#000" opacity="0.06" /><circle cx="4" cy="4" r="0.6" fill="#fff" opacity="0.07" /></pattern>
    <pattern id="fr-grass" width="28" height="18" patternUnits="userSpaceOnUse"><path d="M3 18 L6 8 L8 18 M15 18 L19 6 L21 18" stroke="#000" strokeOpacity="0.07" strokeWidth="2" fill="none" /></pattern>
    <pattern id="fr-plank" width="160" height="40" patternUnits="userSpaceOnUse"><rect width="160" height="40" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="2" /></pattern>
  </defs>
)

// ------------------------------------------------------------ backgrounds: sky + sun + three hill layers + ground with texture
export type Sky = 'dawn' | 'day' | 'rain' | 'shop' | 'orchard' | 'winter' | 'gold' | 'storm'
export const Backdrop: React.FC<{ sky: Sky; f: number; sun?: [number, number] | null; hills?: [string, string, string]; ground?: number; o?: number }> = ({ sky, f, sun = null, hills, ground = 930, o = 1 }) => {
  const H = hills ?? HILLS[sky]
  const drift = (f * 0.15) % 1920
  return (
    <g opacity={o}>
      <rect width={1920} height={1080} fill={`url(#fr-${sky})`} />
      {sun && <g><circle cx={sun[0]} cy={sun[1]} r={360} fill="url(#fr-sunglow)" /><circle cx={sun[0]} cy={sun[1]} r={92} fill="#FFE7A6" /><circle cx={sun[0]} cy={sun[1]} r={72} fill="#FFF4CF" /></g>}
      {/* # slow clouds */}
      {sky !== 'shop' && [0, 1, 2].map((k) => { const x = ((k * 700 + drift * (0.6 + k * 0.2)) % 2400) - 300, y = 150 + k * 70
        return <g key={k} opacity={sky === 'rain' || sky === 'storm' ? 0.55 : 0.75} transform={`translate(${x} ${y}) scale(${0.8 + 0.3 * k})`}><ellipse cx={0} cy={0} rx={130} ry={34} fill="#FFFFFF" opacity={0.7} /><ellipse cx={-50} cy={-20} rx={60} ry={34} fill="#FFFFFF" opacity={0.7} /><ellipse cx={45} cy={-26} rx={70} ry={40} fill="#FFFFFF" opacity={0.7} /></g> })}
      {sky !== 'shop' && <>
        <path d={`M0 ${ground - 300} C 300 ${ground - 420} 520 ${ground - 330} 760 ${ground - 380} S 1300 ${ground - 470} 1560 ${ground - 360} S 1860 ${ground - 330} 1920 ${ground - 360} L1920 ${ground} L0 ${ground} Z`} fill={H[0]} opacity={0.7} />
        <path d={`M0 ${ground - 170} C 260 ${ground - 250} 560 ${ground - 150} 860 ${ground - 210} S 1420 ${ground - 270} 1920 ${ground - 180} L1920 ${ground} L0 ${ground} Z`} fill={H[1]} opacity={0.9} />
      </>}
      <rect x={0} y={ground - 10} width={1920} height={1090 - ground} fill={H[2]} />
      <rect x={0} y={ground - 10} width={1920} height={14} fill="#FFFFFF" opacity={0.12} />
      <rect x={0} y={ground - 10} width={1920} height={1090 - ground} fill={sky === 'shop' ? 'url(#fr-plank)' : 'url(#fr-grass)'} />
    </g>
  )
}
const HILLS: Record<Sky, [string, string, string]> = {
  dawn: ['#B98AA8', '#9A7A9E', '#6E5A7E'], day: ['#A9CBBF', '#86B48E', '#6E9E6E'], rain: ['#8A95AC', '#6F7B95', '#565F75'],
  shop: ['#000', '#000', '#7A5238'], orchard: ['#B8D8B0', '#93C08A', '#76A86C'], winter: ['#B9C7E2', '#DCE5F3', '#F2F6FB'],
  gold: ['#D88E7A', '#C9786A', '#9C5E5A'], storm: ['#4A5270', '#3C4460', '#2E3550'],
}
export const Grain: React.FC = () => <><rect width={1920} height={1080} fill="url(#fr-grain)" pointerEvents="none" /><rect width={1920} height={1080} fill="url(#fr-vig)" pointerEvents="none" /></>

// ------------------------------------------------------------ text helpers: a tag stuck to a thing (pill with a little pointer)
export const Tag: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; color?: string; ink?: string; point?: 'down' | 'up' | 'none'; w?: number }> = ({ x, y, text, o = 1, size = 40, color = C.cream, ink = C.ink, point = 'down', w }) => {
  if (o <= 0.01) return null
  const W = w ?? Math.max(120, text.length * size * 0.5 + 44), H = size + 22
  return (
    <g opacity={o} transform={`translate(${x} ${y})`}>
      <rect x={-W / 2 + 3} y={-H / 2 + 5} width={W} height={H} rx={H / 2} fill="#000" opacity={0.15} />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={color} />
      {point === 'down' && <path d={`M-12 ${H / 2 - 1} L0 ${H / 2 + 14} L12 ${H / 2 - 1} Z`} fill={color} />}
      {point === 'up' && <path d={`M-12 ${-H / 2 + 1} L0 ${-H / 2 - 14} L12 ${-H / 2 + 1} Z`} fill={color} />}
      <text x={0} y={size * 0.36} textAnchor="middle" fill={ink} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>
    </g>
  )
}

// # a clean cross for "not X": two rounded strokes that draw on (p 0–1)
export const Cross: React.FC<{ x: number; y: number; r?: number; p: number; color?: string }> = ({ x, y, r = 90, p, color = C.red }) => {
  if (p <= 0.01) return null
  const a = clamp01(p * 2), b = clamp01(p * 2 - 1)
  return (
    <g transform={`translate(${x} ${y})`} strokeLinecap="round" fill="none">
      <circle r={r} stroke="#FFFFFF" strokeWidth={14} opacity={0.55 * p} />
      <circle r={r} stroke={color} strokeWidth={9} opacity={p} />
      <line x1={-r * 0.6} y1={-r * 0.6} x2={lerp(-r * 0.6, r * 0.6, a)} y2={lerp(-r * 0.6, r * 0.6, a)} stroke={color} strokeWidth={14} />
      {b > 0 && <line x1={r * 0.6} y1={-r * 0.6} x2={lerp(r * 0.6, -r * 0.6, b)} y2={lerp(-r * 0.6, r * 0.6, b)} stroke={color} strokeWidth={14} />}
    </g>
  )
}
export const Check: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 40, p }) => p <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`} opacity={p}><circle r={r} fill={C.cashD} /><path d={`M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.35} L${r * 0.5} ${-r * 0.35}`} stroke="#fff" strokeWidth={r * 0.22} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
)

// ------------------------------------------------------------ money objects
// # a banknote bundle (with shading band)
export const Bundle: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; red?: boolean }> = ({ x, y, s = 1, r = 0, o = 1, red }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-58} y={-22} width={116} height={44} rx={6} fill={red ? C.red : 'url(#fr-cashg)'} stroke={red ? C.redD : C.cashD} strokeWidth={3} />
    <rect x={-58} y={-22} width={116} height={10} rx={5} fill="#fff" opacity={0.25} />
    <rect x={-12} y={-22} width={24} height={44} fill={C.cream} opacity={0.9} />
    <circle cx={-36} cy={0} r={9} fill="none" stroke={red ? C.redD : C.cashD} strokeWidth={3} /><circle cx={36} cy={0} r={9} fill="none" stroke={red ? C.redD : C.cashD} strokeWidth={3} />
  </g>
)
export const CoinG: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={30} ry={30} fill={C.goldD} /><circle r={30} fill="url(#fr-goldg)" /><circle r={21} fill="none" stroke={C.goldD} strokeWidth={3} />
    <text y={11} textAnchor="middle" fill={C.goldD} style={{ font: `400 30px ${FONT.big}` }}>$</text>
  </g>
)
// # a stack of bundles, n high (grows from the bottom)
export const Stack: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={80} ry={14} fill="#000" opacity={0.15} />
    {Array.from({ length: Math.max(0, Math.ceil(n)) }, (_, k) => <g key={k} opacity={Math.min(1, n - k)}><Bundle x={(k % 2 ? 4 : -4)} y={-22 - k * 40} /></g>)}
  </g>
)
// # a spending sack (one year of spending): burlap with a drawstring and a label
export const Sack: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string; color?: string }> = ({ x, y, s = 1, o = 1, label, color = '#D9B27C' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={70} ry={12} fill="#000" opacity={0.15} />
    <path d="M-62 0 C-80 -60 -50 -110 -26 -124 L26 -124 C50 -110 80 -60 62 0 Z" fill={color} />
    <path d="M-62 0 C-80 -60 -50 -110 -26 -124 L-6 -124 C-36 -100 -50 -50 -30 0 Z" fill="#000" opacity={0.08} />
    <path d="M-30 -126 Q0 -150 30 -126" fill="none" stroke="#8A6A3E" strokeWidth={8} strokeLinecap="round" />
    <rect x={-30} y={-132} width={60} height={12} rx={6} fill="#8A6A3E" />
    <text y={-46} textAnchor="middle" fill="#6E5230" style={{ font: `400 64px ${FONT.big}` }}>$</text>
    {label && <text y={34} textAnchor="middle" fill={C.ink} style={{ font: `400 34px ${FONT.big}`, letterSpacing: 1 }}>{label}</text>}
  </g>
)
// # the freedom pile: a tower of stacked sacks/bundles drawn as one solid gold-green column with bands; h in px
export const Tower: React.FC<{ x: number; y: number; h: number; w?: number; o?: number; label?: string }> = ({ x, y, h, w = 220, o = 1, label }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={6} rx={w * 0.62} ry={18} fill="#000" opacity={0.16} />
    <rect x={-w / 2} y={-h} width={w} height={h} rx={14} fill="url(#fr-cashg)" />
    <rect x={-w / 2} y={-h} width={w * 0.18} height={h} rx={10} fill="#fff" opacity={0.16} />
    {Array.from({ length: Math.floor(h / 44) }, (_, k) => <rect key={k} x={-w / 2} y={-44 * (k + 1)} width={w} height={4} fill={C.cashD} opacity={0.35} />)}
    <rect x={-w / 2 - 8} y={-h - 16} width={w + 16} height={22} rx={10} fill={C.cashD} />
    {label && <Tag x={0} y={-h - 70} text={label} size={46} color={C.cream} />}
  </g>
)

// ------------------------------------------------------------ places and things
// # a wooden signpost with a board; lit 0–1 warms it
export const Signpost: React.FC<{ x: number; y: number; text: string; n?: number; o?: number; lit?: number; s?: number }> = ({ x, y, text, n, o = 1, lit = 0, s = 1 }) => {
  // # board grows with the label so long words never spill over the edge
  const L = -110 - Math.max(0, text.length * 19 + (n !== undefined ? 60 : 20) - 228) / 2, R = -L - 20
  return (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={40} ry={8} fill="#000" opacity={0.18} />
    <rect x={-8} y={-170} width={16} height={172} rx={4} fill="url(#fr-woodg)" />
    <path d={`M${L} -200 L${R} -200 L${R + 28} -170 L${R} -140 L${L} -140 Z`} fill={lit > 0.5 ? C.sun : '#E9CFA4'} stroke={C.woodD} strokeWidth={4} />
    {n !== undefined && <><circle cx={L + 28} cy={-170} r={20} fill={C.terra} /><text x={L + 28} y={-160} textAnchor="middle" fill="#fff" style={{ font: `400 30px ${FONT.big}` }}>{n}</text></>}
    <text x={n !== undefined ? (L + 52 + R + 14) / 2 : (L + R + 14) / 2} y={-158} textAnchor="middle" fill={C.ink} style={{ font: `400 34px ${FONT.big}`, letterSpacing: 1 }}>{text}</text>
  </g>
  )
}
// # a summit flag on a pole (waves)
export const Flag: React.FC<{ x: number; y: number; f: number; s?: number; o?: number; color?: string; text?: string }> = ({ x, y, f, s = 1, o = 1, color = C.terra, text }) => {
  const w = Math.sin(f / 7) * 8
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-4} y={-220} width={8} height={222} rx={3} fill="#5B4636" />
      <path d={`M4 -216 C 60 ${-226 + w} 100 ${-196 - w} 150 ${-206 + w} L 150 ${-136 + w} C 100 ${-126 - w} 60 ${-156 + w} 4 -146 Z`} fill={color} />
      <path d={`M4 -216 C 60 ${-226 + w} 100 ${-196 - w} 150 ${-206 + w} L150 ${-196 + w} C 100 ${-186 - w} 60 ${-214 + w} 4 -204 Z`} fill="#fff" opacity={0.2} />
      {text && <text x={78} y={-162} textAnchor="middle" fill="#fff" style={{ font: `400 34px ${FONT.big}` }}>{text}</text>}
    </g>
  )
}
// # an alarm clock with two bells; ring 0–1 shakes it
export const Alarm: React.FC<{ x: number; y: number; f: number; s?: number; ring?: number; o?: number; calm?: number }> = ({ x, y, f, s = 1, ring = 0, o = 1, calm = 0 }) => {
  const sh = ring * Math.sin(f * 2.2) * 7
  return (
    <g transform={`translate(${x + sh} ${y}) rotate(${sh * 0.6}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={80} ry={12} fill="#000" opacity={0.2} />
      <path d="M-50 -10 L-64 4 M50 -10 L64 4" stroke="#3A3046" strokeWidth={10} strokeLinecap="round" />
      <circle cx={-52} cy={-128} r={30} fill={C.gold} /><circle cx={52} cy={-128} r={30} fill={C.gold} />
      <circle cx={0} cy={-70} r={76} fill={calm > 0.5 ? C.sage : C.terra} />
      <circle cx={0} cy={-70} r={60} fill={C.cream} />
      <circle cx={-18} cy={-92} r={40} fill="url(#fr-glass)" />
      <line x1={0} y1={-70} x2={0} y2={-112} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
      <line x1={0} y1={-70} x2={28} y2={-60} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
      {ring > 0.05 && [0, 1, 2].map((k) => <path key={k} d={`M${-96 - k * 16} ${-150 + k * 4} q -14 30 0 60 M${96 + k * 16} ${-150 + k * 4} q 14 30 0 60`} stroke={C.terra} strokeWidth={6} fill="none" strokeLinecap="round" opacity={ring * (0.8 - k * 0.2)} />)}
    </g>
  )
}
// # a pay envelope (take-home pay) with an amount
export const Envelope: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; text?: string; color?: string }> = ({ x, y, s = 1, o = 1, r = 0, text, color = '#F4E3C4' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-104} y={-64} width={208} height={128} rx={10} fill="#000" opacity={0.12} transform="translate(5 6)" />
    <rect x={-104} y={-64} width={208} height={128} rx={10} fill={color} stroke="#C9A877" strokeWidth={3} />
    <path d="M-104 -64 L0 6 L104 -64" fill="none" stroke="#C9A877" strokeWidth={4} />
    <rect x={-56} y={-20} width={112} height={44} rx={6} fill="url(#fr-cashg)" opacity={0.85} transform="translate(0 -40)" />
    {text && <text y={46} textAnchor="middle" fill={C.ink} style={{ font: `400 40px ${FONT.big}` }}>{text}</text>}
  </g>
)
// # a credit card (tilted, glossy)
export const Card: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; hot?: number }> = ({ x, y, s = 1, o = 1, r = -8, hot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {hot > 0 && <rect x={-150} y={-100} width={300} height={200} rx={30} fill={C.red} opacity={0.22 * hot} />}
    <rect x={-124} y={-76} width={248} height={152} rx={16} fill="#000" opacity={0.15} transform="translate(6 8)" />
    <rect x={-124} y={-76} width={248} height={152} rx={16} fill={hot > 0.5 ? C.redD : C.indigo} />
    <rect x={-124} y={-76} width={248} height={60} rx={16} fill="#fff" opacity={0.12} />
    <rect x={-124} y={-40} width={248} height={30} fill="#1E1A2E" opacity={0.7} />
    <rect x={-96} y={6} width={46} height={34} rx={6} fill={C.gold} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-30 + k * 34} y={50} width={26} height={8} rx={3} fill="#fff" opacity={0.6} />)}
  </g>
)
// # Maya's little car; broken 0–1 adds smoke and a raised hood
export const Car: React.FC<{ x: number; y: number; f: number; s?: number; o?: number; broken?: number }> = ({ x, y, f, s = 1, o = 1, broken = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={240} ry={18} fill="#000" opacity={0.2} />
    <path d="M-220 -40 L-210 -110 Q-200 -130 -170 -134 L-110 -140 L-60 -210 Q-40 -230 0 -230 L90 -230 Q130 -230 150 -200 L190 -140 L215 -130 Q230 -120 228 -90 L224 -40 Z" fill={C.sky} />
    <path d="M-220 -40 L-214 -80 L224 -80 L224 -40 Z" fill={C.skyD} opacity={0.55} />
    <path d="M-80 -144 L-40 -200 L30 -200 L30 -144 Z M50 -144 L50 -200 L100 -200 Q120 -200 132 -180 L156 -144 Z" fill="#DDEFF8" />
    <path d="M-80 -144 L-40 -200 L-10 -200 L-50 -144 Z" fill="#fff" opacity={0.5} />
    <g transform={`translate(-218 -112) rotate(${-38 * broken})`}><path d="M0 0 L-4 -10 L120 -26 L128 -16 Z" fill={C.skyD} /></g>
    {[-130, 140].map((wx) => <g key={wx}><circle cx={wx} cy={-30} r={46} fill="#2B2733" /><circle cx={wx} cy={-30} r={20} fill="#9AA0AE" /></g>)}
    <circle cx={214} cy={-100} r={12} fill={C.sun} />
    {broken > 0.05 && [0, 1, 2, 3].map((k) => { const t = ((f / 40 + k / 4) % 1); return <circle key={k} cx={-190 - t * 60 + Math.sin(t * 6 + k) * 14} cy={-150 - t * 220} r={26 + t * 40} fill="#8C8C98" opacity={broken * (1 - t) * 0.65} /> })}
  </g>
)
// # umbrella over a cash cushion (the rainy-day fund)
export const Umbrella: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number }> = ({ x, y, s = 1, o = 1, open = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-5} y={-330} width={10} height={330} rx={4} fill="#4A3A30" />
    <path d="M0 0 q 0 26 -26 26" stroke="#4A3A30" strokeWidth={10} fill="none" strokeLinecap="round" />
    <g transform={`translate(0 -330) scale(${lerp(0.25, 1, open)} 1)`}>
      <path d="M-260 0 Q0 -200 260 0 Q216 -30 173 0 Q130 -30 87 0 Q43 -30 0 0 Q-43 -30 -87 0 Q-130 -30 -173 0 Q-216 -30 -260 0 Z" fill={C.terra} />
      <path d="M-87 0 Q-60 -150 0 -164 Q-40 -120 -43 -14 Z M87 0 Q60 -150 0 -164 Q40 -120 43 -14 Z" fill="#fff" opacity={0.22} />
    </g>
  </g>
)
// # a bucket of savings; level 0–1; hole 0–1 opens a leak at the side, plug 0–1 corks it
export const Bucket: React.FC<{ x: number; y: number; f: number; level: number; hole?: number; plug?: number; s?: number; o?: number }> = ({ x, y, f, level, hole = 0, plug = 0, s = 1, o = 1 }) => {
  const top = -300, lvl = lerp(-20, top + 30, clamp01(level))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={200} ry={20} fill="#000" opacity={0.18} />
      <clipPath id="fr-bucketclip"><path d="M-170 -300 L170 -300 L140 0 L-140 0 Z" /></clipPath>
      <path d="M-170 -300 L170 -300 L140 0 L-140 0 Z" fill="#B7C3D3" />
      <g clipPath="url(#fr-bucketclip)">
        <rect x={-180} y={lvl} width={360} height={-lvl + 10} fill="url(#fr-cashg)" />
        {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-150 + k * 50} y={lvl + 6 + (k % 2) * 8} width={40} height={14} rx={4} fill={C.cashL} opacity={0.6} />)}
      </g>
      <path d="M-170 -300 L-140 0 L-110 0 L-136 -300 Z" fill="#fff" opacity={0.25} />
      <ellipse cx={0} cy={-300} rx={170} ry={22} fill="none" stroke="#8C98AA" strokeWidth={10} />
      <path d="M-150 -210 L150 -210 M-146 -110 L146 -110" stroke="#8C98AA" strokeWidth={6} opacity={0.7} />
      {hole > 0.02 && <g transform="translate(150 -70)">
        <ellipse cx={0} cy={0} rx={16 * hole} ry={20 * hole} fill="#2B2733" />
        {plug < 0.5 && [0, 1, 2].map((k) => { const t = ((f / 22 + k / 3) % 1); return <g key={k} opacity={hole * (1 - t) * (1 - plug * 2)}><CoinG x={20 + t * 90} y={t * t * 80} s={0.5} r={t * 200} /></g> })}
        {plug > 0.02 && <g transform={`translate(${lerp(80, 6, plug)} 0)`} opacity={plug}><rect x={-8} y={-22} width={36} height={44} rx={8} fill={C.wood} /><rect x={-8} y={-22} width={36} height={10} rx={5} fill="#fff" opacity={0.2} /></g>}
      </g>}
    </g>
  )
}
// # a gauge dial (savings rate): v 0–1 sets the needle
export const Gauge: React.FC<{ x: number; y: number; v: number; s?: number; o?: number; text?: string }> = ({ x, y, v, s = 1, o = 1, text }) => {
  const a = lerp(-180, 0, clamp01(v)) * Math.PI / 180
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M-230 0 A230 230 0 0 1 230 0 Z" fill="#3E2C28" />
      <path d="M-200 0 A200 200 0 0 1 200 0" fill="none" stroke="#E7D3B0" strokeWidth={38} />
      <path d={`M-200 0 A200 200 0 0 1 ${200 * Math.cos(a)} ${200 * Math.sin(a)}`} fill="none" stroke={C.cash} strokeWidth={38} />
      {Array.from({ length: 11 }, (_, k) => { const t = (-180 + k * 18) * Math.PI / 180; return <line key={k} x1={170 * Math.cos(t)} y1={170 * Math.sin(t)} x2={150 * Math.cos(t)} y2={150 * Math.sin(t)} stroke="#E7D3B0" strokeWidth={5} /> })}
      <line x1={0} y1={0} x2={150 * Math.cos(a)} y2={150 * Math.sin(a)} stroke={C.terra} strokeWidth={14} strokeLinecap="round" />
      <circle r={26} fill={C.gold} stroke={C.goldD} strokeWidth={4} />
      {text && <text y={-78} textAnchor="middle" fill={C.cream} style={{ font: `400 70px ${FONT.big}` }}>{text}</text>}
    </g>
  )
}
// # a hand-drawn path/trail on the ground (from a to b, curving), drawn p 0–1
export const Trail: React.FC<{ d: string; p?: number; w?: number; color?: string; dash?: boolean }> = ({ d, p = 1, w = 34, color = '#E9D3A8', dash }) => (
  <g>
    <path d={d} fill="none" stroke="#000" strokeOpacity={0.12} strokeWidth={w + 10} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />
    <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />
    {dash && <path d={d} fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={5} strokeDasharray="0.02 0.02" pathLength={1} />}
  </g>
)
// # a little house (Maya's home at the end of the road)
export const Cottage: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={180} ry={16} fill="#000" opacity={0.16} />
    <rect x={-140} y={-170} width={280} height={170} fill={C.cream} />
    <rect x={-140} y={-170} width={60} height={170} fill="#000" opacity={0.06} />
    <path d="M-170 -160 L0 -290 L170 -160 Z" fill={C.terra} /><path d="M-170 -160 L0 -290 L-20 -160 Z" fill="#fff" opacity={0.12} />
    <rect x={-30} y={-100} width={60} height={100} rx={6} fill={C.wood} />
    {[-90, 90].map((wx) => <g key={wx}><rect x={wx - 28} y={-130} width={56} height={50} rx={4} fill={lit > 0.5 ? '#FFE08A' : '#9CC6E0'} /><path d={`M${wx} -130 L${wx} -80 M${wx - 28} -105 L${wx + 28} -105`} stroke={C.cream} strokeWidth={4} /></g>)}
    <rect x={80} y={-270} width={30} height={70} fill={C.terraD} />
  </g>
)
// # small simple figure for crowds (not the cast): round head + body; tone gold/grey
export const Mini: React.FC<{ x: number; y: number; s?: number; tone?: 'warm' | 'grey' | 'gold' | 'sad'; o?: number }> = ({ x, y, s = 1, tone = 'warm', o = 1 }) => {
  const body = tone === 'gold' ? C.gold : tone === 'grey' ? '#B5B9C6' : tone === 'sad' ? '#8C93A8' : C.terra
  const head = tone === 'grey' || tone === 'sad' ? '#9AA0AE' : '#C98B62'
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={2} rx={26} ry={6} fill="#000" opacity={0.15} />
      <path d="M-24 0 Q-24 -46 0 -46 Q24 -46 24 0 Z" fill={body} />
      <circle cy={-64} r={17} fill={head} />
    </g>
  )
}
// # a bank / institution building with columns (the Fed, a study's university)
export const Hall: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string; color?: string }> = ({ x, y, s = 1, o = 1, text, color = C.cream }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={230} ry={16} fill="#000" opacity={0.15} />
    <rect x={-210} y={-30} width={420} height={30} fill="#D9CBB4" />
    {[-160, -80, 0, 80, 160].map((cx) => <g key={cx}><rect x={cx - 18} y={-200} width={36} height={170} fill={color} /><rect x={cx - 18} y={-200} width={10} height={170} fill="#000" opacity={0.06} /></g>)}
    <rect x={-210} y={-230} width={420} height={30} fill="#D9CBB4" />
    <path d="M-230 -230 L0 -320 L230 -230 Z" fill={color} /><path d="M-230 -230 L0 -320 L0 -230 Z" fill="#000" opacity={0.05} />
    {text && <text y={-246} textAnchor="middle" fill={C.ink} style={{ font: `400 28px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>}
  </g>
)
// # a deterministic sprinkle of tiny twinkles/raindrops
export const Rain: React.FC<{ f: number; o?: number; n?: number }> = ({ f, o = 1, n = 70 }) => o <= 0.01 ? null : (
  <g opacity={o}>{Array.from({ length: n }, (_, k) => { const x = rnd(k) * 1920, sp = 18 + rnd(k + 9) * 10, y = ((rnd(k + 3) * 1080 + f * sp) % 1180) - 100
    return <line key={k} x1={x} y1={y} x2={x - 8} y2={y + 34} stroke="#E4ECF8" strokeWidth={3} strokeLinecap="round" opacity={0.55} /> })}</g>
)
export const Snow: React.FC<{ f: number; o?: number; n?: number }> = ({ f, o = 1, n = 60 }) => o <= 0.01 ? null : (
  <g opacity={o}>{Array.from({ length: n }, (_, k) => { const x = (rnd(k) * 1920 + Math.sin(f / 30 + k) * 20), y = ((rnd(k + 3) * 1080 + f * (1.5 + rnd(k + 1) * 1.5)) % 1120) - 40
    return <circle key={k} cx={x} cy={y} r={3 + rnd(k + 5) * 4} fill="#fff" opacity={0.8} /> })}</g>
)

// ------------------------------------------------------------ scene windows without a dark dip: a scene fades IN over the previous one
// # (drawn later = on top) and stays fully visible until the next one has fully covered it.
export const fadeIn = (f: number, a: number, d = 10) => (f < a - 2 ? 0 : Math.min(1, (f - (a - 2)) / d))
export const scene = (f: number, a: number, b: number, d = 10) => (f >= b + d + 2 ? 0 : fadeIn(f, a, d))

// ------------------------------------------------------------ the mountain of chapter one: layered rock, a snow cap, a zig-zag trail;
// # flagT 0–1 = where the finish flag stands along the trail (1 = summit); returns nothing else
export const TRAIL_PTS: [number, number][] = [[760, 930], [1080, 860], [1240, 760], [1100, 650], [1300, 560], [1460, 470], [1360, 390], [1540, 300]]
export const trailAt = (t: number): [number, number] => {
  const n = TRAIL_PTS.length - 1, x = Math.max(0, Math.min(n - 1e-6, t * n)), i = Math.floor(x), u = x - i
  return [lerp(TRAIL_PTS[i][0], TRAIL_PTS[i + 1][0], u), lerp(TRAIL_PTS[i][1], TRAIL_PTS[i + 1][1], u)]
}
export const Mountain: React.FC<{ f: number; flagT?: number; flagO?: number; trailP?: number; o?: number; flagText?: string }> = ({ f, flagT = 1, flagO = 1, trailP = 1, o = 1, flagText }) => {
  const [fx, fy] = trailAt(flagT)
  return (
    <g opacity={o}>
      <path d="M640 940 L1180 380 L1330 470 L1540 230 L1900 640 L1920 940 Z" fill="#7C8FA8" />
      <path d="M1540 230 L1900 640 L1920 940 L1560 940 L1460 560 Z" fill="#000" opacity={0.12} />
      <path d="M640 940 L1180 380 L1240 460 L900 940 Z" fill="#fff" opacity={0.08} />
      <path d="M1540 230 L1610 310 L1580 330 L1550 300 L1510 340 L1480 300 Z" fill={C.snow} />
      <path d="M1180 380 L1220 420 L1196 432 L1170 410 L1150 420 Z" fill={C.snow} />
      <path d={'M' + TRAIL_PTS.map((p) => p.join(' ')).join(' L')} fill="none" stroke="#E9D3A8" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${trailP} 1`} />
      <path d={'M' + TRAIL_PTS.map((p) => p.join(' ')).join(' L')} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={4} strokeDasharray="0.012 0.012" pathLength={1} opacity={trailP} />
      {[[880, 910], [990, 930], [1700, 900], [1820, 920]].map(([x, y], k) => <g key={k} transform={`translate(${x} ${y})`}><path d="M0 -120 L44 0 L-44 0 Z" fill={C.moss} /><path d="M0 -120 L44 0 L0 0 Z" fill="#000" opacity={0.15} /><rect x={-6} y={0} width={12} height={16} fill={C.woodD} /></g>)}
      {flagO > 0.01 && <Flag x={fx} y={fy} f={f} s={0.9} o={flagO} text={flagText} />}
    </g>
  )
}
// # a big coin that flips (t 0–1) from its front text to its back text
export const FlipCoin: React.FC<{ x: number; y: number; t: number; front: string; back: string; s?: number; o?: number }> = ({ x, y, t, front, back, s = 1, o = 1 }) => {
  const sx = Math.abs(Math.cos(Math.PI * Math.min(1, Math.max(0, t))))
  const showBack = t > 0.5
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={190} rx={150} ry={20} fill="#000" opacity={0.15} />
      <g transform={`scale(${Math.max(0.04, sx)} 1)`}>
        <circle cy={10} r={160} fill={C.goldD} /><circle r={160} fill="url(#fr-goldg)" /><circle r={128} fill="none" stroke={C.goldD} strokeWidth={8} />
        <text y={46} textAnchor="middle" fill={showBack ? C.terraD : C.ink} style={{ font: `400 140px ${FONT.big}` }}>{showBack ? back : front}</text>
      </g>
    </g>
  )
}
// # an hourglass; sand 0–1 = how much has run down
export const Hourglass: React.FC<{ x: number; y: number; sand: number; s?: number; o?: number }> = ({ x, y, sand, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-300} width={220} height={24} rx={10} fill="url(#fr-woodg)" /><rect x={-110} y={-24} width={220} height={24} rx={10} fill="url(#fr-woodg)" />
    <path d="M-86 -276 L86 -276 Q86 -190 10 -150 Q86 -110 86 -24 L-86 -24 Q-86 -110 -10 -150 Q-86 -190 -86 -276 Z" fill="#DCEBF5" opacity={0.75} />
    <path d={`M${-70 * (1 - sand)} ${-276 + 100 * sand + 20} L${70 * (1 - sand)} ${-276 + 100 * sand + 20} L0 -160 Z`} fill={C.sun} opacity={sand < 0.98 ? 1 : 0} />
    <path d={`M-80 -28 Q0 ${-28 - 110 * sand} 80 -28 Z`} fill={C.sun} />
    {sand > 0.02 && sand < 0.98 && <rect x={-3} y={-152} width={6} height={124} fill={C.sun} />}
    <path d="M-86 -276 L-60 -276 Q-60 -200 -10 -150 Z" fill="#fff" opacity={0.45} />
  </g>
)
