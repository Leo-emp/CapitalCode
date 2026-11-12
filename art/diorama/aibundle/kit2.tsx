// ============================================================
// More objects for the AI-bundle video: Nina's desk and laptop, the
// plan cards (Personal / Family with their people), the flat price
// line that steps up, the data packet that travels, the coin column,
// and the hidden-door / court props. Flat, front-on, no camera moves.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'
import { Mini } from '../../rig/Mini'
import { Tag } from './kit'

// ------------------------------------------------------------ a desk with a laptop; screen 0 blank, 'letter' lines, 'budget' grid, 'slides' cards
export const Desk: React.FC<{ x: number; y: number; s?: number; o?: number; screen?: 'blank' | 'letter' | 'budget' | 'slides' | 'w'; fill?: number; glow?: number }> = ({ x, y, s = 1, o = 1, screen = 'blank', fill = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {/* # the desk */}
    <rect x={-260} y={-12} width={520} height={26} rx={10} fill="#B9874E" />
    <rect x={-240} y={14} width={22} height={200} rx={8} fill="#9A6E3C" /><rect x={218} y={14} width={22} height={200} rx={8} fill="#9A6E3C" />
    {/* # the laptop */}
    <path d="M-170 -12 L170 -12 L190 0 L-190 0 Z" fill="#9AA6B8" />
    <rect x={-150} y={-222} width={300} height={210} rx={14} fill="#2B3446" />
    {glow > 0 && <rect x={-160} y={-232} width={320} height={230} rx={18} fill={P.gold} opacity={0.25 * glow} />}
    <rect x={-136} y={-208} width={272} height={182} rx={8} fill="#F7FAFF" />
    {screen === 'letter' && Array.from({ length: 5 }, (_, k) => <rect key={k} x={-110} y={-188 + k * 30} width={(k === 4 ? 120 : 220) * clamp01(fill * 5 - k)} height={14} rx={7} fill="#B9C6DA" />)}
    {screen === 'budget' && <g>{Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => <rect key={`${r}${c}`} x={-110 + c * 56} y={-190 + r * 36} width={50} height={28} rx={4} fill={c === 3 ? '#BFE7CF' : '#E3E9F2'} opacity={clamp01(fill * 4 - r)} />))}
      <path d="M-100 -50 L-40 -70 L20 -60 L90 -100" stroke="#2FA86B" strokeWidth={6} fill="none" opacity={clamp01(fill * 2 - 1)} /></g>}
    {screen === 'slides' && [0, 1, 2].map((k) => <g key={k} opacity={clamp01(fill * 3 - k)}><rect x={-120 + k * 82} y={-170} width={72} height={100} rx={6} fill="#E0703A" opacity={0.25 + 0.25 * k} /><rect x={-112 + k * 82} y={-158} width={56} height={10} rx={5} fill="#FFFFFF" /></g>)}
    {screen === 'w' && <g><rect x={-46} y={-162} width={92} height={92} rx={22} fill="#3A7BD5" /><text x={0} y={-94} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 66px "Bebas Neue"' }}>W</text></g>}
  </g>
)

// ------------------------------------------------------------ a plan card: title band, its people (minis), and a price tag below
export const PlanCard: React.FC<{ f: number; x: number; y: number; s?: number; o?: number; title: string; people: number; shown?: number; price: string; priceO?: number; color?: string; sticker?: string; stickerO?: number; dim?: number[]; sub?: string }> = ({ f, x, y, s = 1, o = 1, title, people, shown = 1, price, priceO = 1, color = P.navy3, sticker, stickerO = 0, dim = [], sub = 'A YEAR' }) => {
  const W = people > 1 ? 520 : 300
  const looks = ['investorF', 'buyer', 'worker', 'owner', 'investor', 'hero']
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-W / 2} y={-300} width={W} height={340} rx={30} fill="#000" opacity={0.08} transform="translate(8 10)" />
      <rect x={-W / 2} y={-300} width={W} height={340} rx={30} fill="#FFFFFF" stroke="#D8CDB8" strokeWidth={4} />
      <rect x={-W / 2} y={-300} width={W} height={80} rx={30} fill={color} /><rect x={-W / 2} y={-250} width={W} height={30} fill={color} />
      <text x={0} y={-242} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 52px "Bebas Neue"', letterSpacing: 4 }}>{title}</text>
      {Array.from({ length: people }, (_, k) => {
        const t = clamp01(shown * people - k), cols = people > 1 ? 6 : 1, px = people > 1 ? -200 + (k % cols) * 80 : 0
        return t > 0 ? <g key={k} opacity={t * (dim[k] ? 0.3 : 1)}><Mini look={looks[k % looks.length]} x={px} y={10} scale={0.9 * (0.8 + 0.2 * t)} frame={f} seed={k + 3} /></g> : null
      })}
      <g opacity={priceO}><Tag x={0} y={170} text={price} s={0.9} r={0} sub={sub} sticker={sticker} stickerO={stickerO} /></g>
    </g>
  )
}

// ------------------------------------------------------------ the flat price line over N years; p draws it; step 0–1 lifts its end
export const PriceLine: React.FC<{ x: number; y: number; w: number; years: number; p: number; step?: number; o?: number; rise?: number; label?: string }> = ({ x, y, w, years, p, step = 0, o = 1, rise = 160, label }) => {
  const dx = w / years
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <line x1={0} y1={40} x2={w + dx} y2={40} stroke={P.ink2} strokeWidth={4} />
      {Array.from({ length: years }, (_, k) => <g key={k} opacity={clamp01(p * years - k)}>
        <rect x={k * dx + 6} y={-10} width={dx - 12} height={50} rx={8} fill={P.gold} opacity={0.9} />
        <line x1={k * dx} y1={36} x2={k * dx} y2={50} stroke={P.ink2} strokeWidth={3} /></g>)}
      {/* # the step at the end */}
      {step > 0 && <g><rect x={years * dx + 6} y={-10 - rise * step} width={dx - 12} height={50 + rise * step} rx={8} fill={P.coral} />
        <path d={`M${years * dx + dx / 2} ${-30 - rise * step} l-22 30 l44 0 Z`} fill={P.coral} opacity={step} /></g>}
      {label && <text x={(years * dx) / 2} y={110} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
    </g>
  )
}

// ------------------------------------------------------------ a data packet (a small glowing envelope) — travels along a path
export const Packet: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = '#5B8DEF' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={46} fill={color} opacity={0.2} />
    <rect x={-34} y={-24} width={68} height={48} rx={8} fill="#FFFFFF" stroke={color} strokeWidth={4} />
    <path d="M-34 -22 L0 4 L34 -22" fill="none" stroke={color} strokeWidth={4} />
  </g>
)

// ------------------------------------------------------------ a column of coins, n coins high (a year's payment each, or a pile)
export const CoinColumn: React.FC<{ x: number; y: number; n: number; w?: number; o?: number; color?: string }> = ({ x, y, n, w = 120, o = 1, color = P.gold }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: Math.max(0, Math.floor(n)) }, (_, k) => <g key={k}><ellipse cx={0} cy={-k * 22} rx={w / 2} ry={16} fill={P.goldD} /><ellipse cx={0} cy={-k * 22 - 6} rx={w / 2} ry={16} fill={color} /></g>)}
  </g>
)

// ------------------------------------------------------------ a lightning bolt (electricity)
export const Bolt: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M10 -60 L-30 6 L-4 6 L-14 60 L30 -10 L4 -10 Z" fill={P.gold} stroke={P.goldD} strokeWidth={4} strokeLinejoin="round" /></g>
)

// ------------------------------------------------------------ a coin cut like a pie: share 0–1 stays gold, the rest is a coral bite
export const PieCoin: React.FC<{ x: number; y: number; r?: number; share: number; bite?: number; o?: number }> = ({ x, y, r = 200, share, bite = 1, o = 1 }) => {
  const a = 2 * Math.PI * (1 - (1 - share) * bite)
  const ex = Math.sin(a) * r, ey = -Math.cos(a) * r
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <circle r={r} fill={P.coral} />
      <path d={`M0 0 L0 ${-r} A${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${ex} ${ey} Z`} fill={P.gold} />
      <circle r={r * 0.78} fill="none" stroke={P.goldD} strokeWidth={6} opacity={0.5} />
    </g>
  )
}

// ------------------------------------------------------------ a calendar page with a short label (month / year), big and flat
export const Page: React.FC<{ x: number; y: number; s?: number; o?: number; top: string; big: string; color?: string }> = ({ x, y, s = 1, o = 1, top, big, color = P.coral }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-120} width={220} height={240} rx={20} fill="#FFFFFF" stroke="#D8CDB8" strokeWidth={4} />
    <rect x={-110} y={-120} width={220} height={70} rx={20} fill={color} /><rect x={-110} y={-70} width={220} height={20} fill={color} />
    <text x={0} y={-68} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>{top}</text>
    <text x={0} y={60} textAnchor="middle" fill={P.navy0} style={{ font: '400 96px "Bebas Neue"' }}>{big}</text>
    {[-60, 60].map((cx) => <rect key={cx} x={cx - 8} y={-136} width={16} height={34} rx={8} fill="#8E7A58" />)}
  </g>
)

export const mix = lerp
