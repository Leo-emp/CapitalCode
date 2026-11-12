// # Fresh drawings for "How Social Security Actually Works" (owner rules r82/r83: this video's own world).
// # The world: a VINTAGE 1940s POST OFFICE. Mint art-deco tiles, tall arched windows with daylight, a marble-topped
// # wooden counter, globe pendant lamps, and a network of brass pneumatic tubes: Rosa's payroll tax rides capsules through
// # the tubes straight into retirees' mailboxes (pay-as-you-go). The trust fund is a round vault of bond envelopes, the
// # benefit formula is a brass three-chute sorting machine, claiming ages are three mail vans, and labels are postage stamps.
// # Every prop is drawn around its own origin (bottom centre for things that stand on the counter/floor).
import React from 'react'
import { lerp } from '../kit'

export const TXT = (size: number): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 2 })

export const TILE = '#BFE0D0', TILE2 = '#A6D1BD', DEEPT = '#1D4E57', BRASS = '#C9A24A', BRASS2 = '#8F6E27', CREAM = '#F6EEDC'
export const RED = '#C4473A', NAVY = '#22314A', WOOD = '#8B5A3C', WOOD2 = '#6A4129', MARBLE = '#EDE7DD', INK = '#1E2630'
export const GREEN = '#4F9D6A', SKY = '#CFE7F2', GOLD = '#E5B94E', SHADE = 'rgba(20,30,30,0.22)', PLUM = '#6B4C7A'

export type Tone = 'day' | 'warm' | 'dusk' | 'night'
const WIN: Record<Tone, [string, string]> = { day: ['#BFE3F2', '#F4FAFC'], warm: ['#F4D9A8', '#FCEFD6'], dusk: ['#8C7BA8', '#E9B89A'], night: ['#1E2A48', '#3B4A6E'] }
export const FLOOR = 860

// ================================================================== WORLD
export const PostWorld: React.FC<{ f: number; id: string; tone?: Tone; dim?: number }> = ({ f, id, tone = 'day', dim = 0 }) => {
  const [w0, w1] = WIN[tone]
  return (
    <g>
      <defs>
        <pattern id={`${id}-tile`} width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill={TILE} /><rect x="1" y="1" width="58" height="58" fill={TILE2} opacity="0.35" /><rect x="2" y="2" width="56" height="20" fill="#FFFFFF" opacity="0.12" /></pattern>
        <linearGradient id={`${id}-win`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={w0} /><stop offset="100%" stopColor={w1} /></linearGradient>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={WOOD} /><stop offset="100%" stopColor={WOOD2} /></linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFF3C8" stopOpacity="0.55" /><stop offset="100%" stopColor="#FFF3C8" stopOpacity="0" /></radialGradient>
      </defs>
      <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-tile)`} />
      {/* art-deco arched windows with daylight and soft beams */}
      {[260, 960, 1660].map((x, k) => <g key={k}>
        <path d={`M${x - 170} 620 L${x - 170} 250 A170 170 0 0 1 ${x + 170} 250 L${x + 170} 620 Z`} fill={DEEPT} />
        <path d={`M${x - 150} 610 L${x - 150} 255 A150 150 0 0 1 ${x + 150} 255 L${x + 150} 610 Z`} fill={`url(#${id}-win)`} />
        {[-75, 0, 75].map((d) => <line key={d} x1={x + d} y1={110} x2={x + d} y2={610} stroke={DEEPT} strokeWidth={6} />)}
        {[330, 450].map((y) => <line key={y} x1={x - 150} y1={y} x2={x + 150} y2={y} stroke={DEEPT} strokeWidth={6} />)}
        <path d={`M${x - 150} 610 L${x + 150} 610 L${x + 260} ${FLOOR} L${x - 40} ${FLOOR} Z`} fill="#FFFFFF" opacity={tone === 'night' ? 0.03 : 0.09} />
      </g>)}
      {/* a brass rail along the top (the tube network's trunk) */}
      <rect x={-40} y={60} width={2000} height={22} fill={BRASS2} /><rect x={-40} y={60} width={2000} height={8} fill="#F1D58C" opacity={0.5} />
      {/* globe pendant lamps */}
      {[440, 1480].map((x, k) => <g key={k}><line x1={x} y1={82} x2={x} y2={150} stroke={INK} strokeWidth={3} /><circle cx={x} cy={170} r={60} fill={`url(#${id}-glow)`} /><circle cx={x} cy={170} r={22} fill="#FFF6D8" stroke={BRASS2} strokeWidth={3} /></g>)}
      {/* the marble-topped counter */}
      <rect x={-40} y={FLOOR} width={2000} height={24} fill={MARBLE} /><rect x={-40} y={FLOOR + 24} width={2000} height={200} fill={`url(#${id}-wood)`} />
      {Array.from({ length: 11 }, (_, i) => <rect key={i} x={i * 190 - 20} y={FLOOR + 50} width={150} height={140} rx={8} fill="none" stroke={WOOD2} strokeWidth={5} opacity={0.6} />)}
      {dim > 0 && <rect x={-40} y={-40} width={2000} height={1160} fill="#0E1626" opacity={dim} />}
    </g>
  )
}
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.3 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.48" r="0.78"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#0C1A1C" stopOpacity={k} /></radialGradient></defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-vig)`} />
  </g>
)

// ================================================================== LABELS
// # a postage-stamp label with a perforated edge (callers give it its own clear space)
export const Stamp: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string }> = ({ x, y, t, o = 1, size = 44, col = CREAM, tc = INK }) => {
  const w = Math.max(120, t.length * size * 0.46 + 64), h = size + 34
  const holes = Math.floor(w / 22)
  return <g transform={`translate(${x} ${y - size / 2 - 2})`} opacity={o}>
    <rect x={-w / 2 + 6} y={-h / 2 + 8} width={w} height={h} fill={SHADE} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={col} />
    {Array.from({ length: holes }, (_, i) => <g key={i}><circle cx={-w / 2 + 11 + i * (w - 22) / (holes - 1)} cy={-h / 2} r={5} fill={TILE} /><circle cx={-w / 2 + 11 + i * (w - 22) / (holes - 1)} cy={h / 2} r={5} fill={TILE} /></g>)}
    <rect x={-w / 2 + 8} y={-h / 2 + 8} width={w - 16} height={h - 16} fill="none" stroke={tc} strokeWidth={2} opacity={0.5} />
    <text y={size * 0.36} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-80 -80 L80 80 M80 -80 L-80 80" stroke={CREAM} strokeWidth={32} strokeLinecap="round" />
    <path d="M-80 -80 L80 80 M80 -80 L-80 80" stroke={RED} strokeWidth={20} strokeLinecap="round" />
  </g>
)

// ================================================================== THINGS
export const Envelope: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; t?: string; col?: string }> = ({ x, y, s = 1, r = 0, o = 1, t, col = CREAM }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-70} y={-44} width={140} height={88} rx={6} fill={SHADE} transform="translate(5 6)" />
    <rect x={-70} y={-44} width={140} height={88} rx={6} fill={col} stroke={INK} strokeWidth={3} />
    <path d="M-70 -44 L0 8 L70 -44" fill="none" stroke={INK} strokeWidth={3} />
    <rect x={36} y={-36} width={26} height={30} fill={RED} />
    {t && <text y={34} textAnchor="middle" fill={INK} style={TXT(26)}>{t}</text>}
  </g>
)
// # a brass capsule (the tube canister) carrying money
export const Capsule: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-34} y={-16} width={68} height={32} rx={16} fill={BRASS} stroke={BRASS2} strokeWidth={3} />
    <rect x={-10} y={-16} width={20} height={32} fill={GREEN} />
    <text y={8} textAnchor="middle" fill={CREAM} style={TXT(22)}>$</text>
  </g>
)
// # point at fraction t along a polyline
export const along = (pts: [number, number][], t: number): [number, number, number] => {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  const L = seg.reduce((a, b) => a + b, 0); let d = Math.max(0, Math.min(1, t)) * L
  for (let i = 0; i < seg.length; i++) { if (d <= seg[i] || i === seg.length - 1) { const k = seg[i] ? d / seg[i] : 0; const a = pts[i], b = pts[i + 1]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI] } d -= seg[i] }
  return [pts[0][0], pts[0][1], 0]
}
// # a brass pneumatic tube along a polyline, with glass windows; `flow` 0..1 = how many capsules run; `rate` speed
export const Tube: React.FC<{ pts: [number, number][]; f: number; flow?: number; n?: number; rate?: number; o?: number; w?: number }> = ({ pts, f, flow = 1, n = 5, rate = 1, o = 1, w = 38 }) => {
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  return (
    <g opacity={o}>
      <path d={d} fill="none" stroke={BRASS2} strokeWidth={w + 10} strokeLinejoin="round" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#D9EEF0" strokeWidth={w} strokeLinejoin="round" strokeLinecap="round" opacity={0.9} />
      <path d={d} fill="none" stroke="#FFFFFF" strokeWidth={6} strokeLinejoin="round" opacity={0.5} transform="translate(0 -8)" />
      {flow > 0 && Array.from({ length: n }, (_, i) => { const t = ((f * 0.006 * rate + i / n) % 1); const [x, y, a] = along(pts, t); return i / n < flow ? <Capsule key={i} x={x} y={y} r={a} s={w / 44} /> : null })}
    </g>
  )
}
// # a retiree's mailbox on a post (bottom centre); `flag` 0..1 raises the red flag
export const Mailbox: React.FC<{ x: number; y: number; s?: number; o?: number; flag?: number; t?: string }> = ({ x, y, s = 1, o = 1, flag = 0, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={6} cy={4} rx={70} ry={10} fill={SHADE} />
    <rect x={-8} y={-160} width={16} height={160} fill={WOOD2} />
    <path d="M-70 -160 L-70 -230 A40 40 0 0 1 -30 -270 L30 -270 A40 40 0 0 1 70 -230 L70 -160 Z" fill={NAVY} />
    <path d="M-70 -230 A40 40 0 0 1 -30 -270 L0 -270 L0 -160 L-70 -160 Z" fill="#FFFFFF" opacity={0.08} />
    <g transform={`translate(76 -200) rotate(${lerp(90, 0, flag)})`}><rect x={-4} y={-70} width={8} height={70} fill={RED} /><rect x={-4} y={-70} width={34} height={22} fill={RED} /></g>
    {t && <text y={-200} textAnchor="middle" fill={CREAM} style={TXT(28)}>{t}</text>}
  </g>
)
// # the round vault (centre origin); `fill` 0..1 = how full it is with bond envelopes; `open` 0..1 swings the door
export const Vault: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; open?: number }> = ({ x, y, s = 1, o = 1, fill = 1, open = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={230} fill="#6E7682" /><circle r={200} fill="#2E3440" />
    {/* bond envelopes stacked inside, from the bottom up */}
    <clipPath id={`vault-${Math.round(x)}`}><circle r={196} /></clipPath>
    <g clipPath={`url(#vault-${Math.round(x)})`}>
      {Array.from({ length: Math.round(18 * fill) }, (_, k) => <g key={k} transform={`translate(${((k % 3) - 1) * 110} ${170 - Math.floor(k / 3) * 60})`}><rect x={-50} y={-24} width={100} height={48} rx={4} fill={CREAM} stroke={BRASS2} strokeWidth={2} /><text y={10} textAnchor="middle" fill={NAVY} style={TXT(22)}>BOND</text></g>)}
    </g>
    {/* the door swung aside */}
    <g transform={`translate(${lerp(0, 330, open)} 0) scale(${lerp(1, 0.35, open)} 1)`}><circle r={210} fill="#8E96A3" stroke="#5A616C" strokeWidth={10} />{[0, 60, 120].map((a) => <line key={a} x1={-80} y1={0} x2={80} y2={0} stroke="#5A616C" strokeWidth={12} transform={`rotate(${a})`} />)}<circle r={30} fill="#5A616C" /></g>
  </g>
)
// # a mail van (bottom centre)
export const Van: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; col?: string }> = ({ x, y, s = 1, o = 1, t, col = NAVY }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={10} cy={6} rx={230} ry={16} fill={SHADE} />
    <path d="M-210 -30 L-210 -230 L80 -230 L150 -140 L210 -130 L210 -30 Z" fill={col} />
    <path d="M90 -216 L140 -146 L90 -146 Z" fill={SKY} />
    <rect x={-210} y={-120} width={420} height={18} fill={RED} /><rect x={-210} y={-100} width={420} height={10} fill={CREAM} />
    {t && <text x={-60} y={-150} textAnchor="middle" fill={CREAM} style={TXT(64)}>{t}</text>}
    {[-120, 130].map((cx) => <g key={cx}><circle cx={cx} cy={-26} r={36} fill={INK} /><circle cx={cx} cy={-26} r={14} fill="#C9CED6" /></g>)}
  </g>
)
// # tiny natural motion on the thing being talked about: a brass glint (fills short quiet moments)
export const Life: React.FC<{ f: number; at: number; x: number; y: number; kind?: 'glint' | 'spark' }> = ({ f, at, x, y, kind = 'glint' }) => {
  const t = (f - at) / 18
  if (t < 0 || t > 1) return null
  const k = Math.sin(Math.PI * t)
  if (kind === 'spark') return <g transform={`translate(${x} ${y})`} opacity={k}>{[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={0} y1={-20 - 30 * t} x2={0} y2={-34 - 40 * t} stroke={GOLD} strokeWidth={5} strokeLinecap="round" transform={`rotate(${i * 60})`} />)}</g>
  return <g transform={`translate(${x} ${y}) rotate(${30 * t}) scale(${k})`} opacity={0.95}><path d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z" fill="#FFFFFF" /></g>
}
