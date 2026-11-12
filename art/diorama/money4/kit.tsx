// ============================================================
// LONG VIDEO — "4 Money Ideas That Decide If Time Works For You or Against
// You" — objects: a dresser whose drawer slides open (a $100 bill inside),
// a shopping basket that fills with items, hanging price tags, an
// hourglass, a snowball on a slope, a credit card, a coin tower, small
// grocery items. Reuses the bank kit's bills, bricks and calendar pages.
// No camera moves (owner r56).
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

const TXT = (size: number) => ({ font: `400 ${size}px "Bebas Neue"` })

// ------------------------------------------------------------ a wooden dresser; open 0–1 slides the top drawer out; children sit in the drawer
export const Dresser: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; children?: React.ReactNode }> = ({ x, y, s = 1, o = 1, open = 0, children }) => {
  const d = 90 * clamp01(open)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={240} ry={16} fill="#000" opacity={0.14} />
      <rect x={-210} y={-380} width={420} height={380} rx={14} fill="#A9744E" /><rect x={-224} y={-396} width={448} height={26} rx={8} fill="#8E5B3A" />
      {[0, 1].map((k) => <g key={k}><rect x={-186} y={-220 + k * 110} width={372} height={92} rx={10} fill="#B9845C" stroke="#8E5B3A" strokeWidth={4} /><rect x={-30} y={-180 + k * 110} width={60} height={14} rx={7} fill="#6E4F33" /></g>)}
      {/* the top drawer, sliding out towards the viewer (down and bigger) */}
      <g transform={`translate(0 ${d * 0.5}) scale(${1 + d / 900})`}>
        <rect x={-186} y={-340} width={372} height={100} rx={10} fill="#C99366" stroke="#8E5B3A" strokeWidth={4} />
        {open > 0.05 && <g transform="translate(0 -350)">{children}</g>}
        <rect x={-30} y={-298} width={60} height={14} rx={7} fill="#6E4F33" />
      </g>
      {[-190, 190].map((lx) => <rect key={lx} x={lx - 12} y={-8} width={24} height={12} rx={4} fill="#6E4F33" />)}
    </g>
  )
}

// ------------------------------------------------------------ small grocery / life items (centre x, y)
export const Item: React.FC<{ kind: 'bread' | 'milk' | 'apple' | 'house' | 'car' | 'scissors' | 'shirt' | 'gas'; x: number; y: number; s?: number; o?: number }> = ({ kind, x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {kind === 'bread' && <g><path d="M-44 10 Q-50 -36 0 -40 Q50 -36 44 10 Z" fill="#D9A25F" /><path d="M-26 -22 l10 -8 M-4 -26 l10 -8 M18 -22 l10 -8" stroke="#A9744E" strokeWidth={4} /></g>}
    {kind === 'milk' && <g><rect x={-24} y={-50} width={48} height={64} rx={6} fill="#FFFFFF" stroke="#C9D3DF" strokeWidth={3} /><path d="M-24 -50 L0 -70 L24 -50 Z" fill="#E8EEF6" /><rect x={-24} y={-26} width={48} height={18} fill="#5BCBFF" /></g>}
    {kind === 'apple' && <g><circle cx={0} cy={-14} r={26} fill="#E14B3B" /><path d="M0 -40 q6 -12 14 -14" stroke="#6E4F33" strokeWidth={4} fill="none" /><ellipse cx={10} cy={-44} rx={9} ry={5} fill="#5DAE5B" /></g>}
    {kind === 'house' && <g><rect x={-30} y={-30} width={60} height={44} fill="#E9C25A" /><path d="M-40 -30 L0 -64 L40 -30 Z" fill="#C94A3E" /><rect x={-8} y={-12} width={16} height={26} fill="#6E4F33" /></g>}
    {kind === 'car' && <g><path d="M-46 8 L-46 -12 Q-44 -22 -30 -24 L-18 -40 L18 -40 L30 -24 Q44 -22 46 -12 L46 8 Z" fill="#3A6EA8" /><circle cx={-26} cy={10} r={10} fill="#1B2233" /><circle cx={26} cy={10} r={10} fill="#1B2233" /><rect x={-14} y={-36} width={28} height={12} rx={3} fill="#BFE4FF" /></g>}
    {kind === 'scissors' && <g><circle cx={-12} cy={10} r={10} fill="none" stroke="#5C6F8E" strokeWidth={6} /><circle cx={12} cy={10} r={10} fill="none" stroke="#5C6F8E" strokeWidth={6} /><path d="M-6 2 L18 -44 M6 2 L-18 -44" stroke="#8A97AA" strokeWidth={6} strokeLinecap="round" /></g>}
    {kind === 'shirt' && <g><path d="M-36 -36 L-14 -44 Q0 -34 14 -44 L36 -36 L48 -14 L30 -8 L30 14 L-30 14 L-30 -8 L-48 -14 Z" fill="#7FB77E" /></g>}
    {kind === 'gas' && <g><rect x={-22} y={-46} width={44} height={60} rx={6} fill="#F06B5B" /><rect x={-14} y={-38} width={28} height={16} rx={3} fill="#FFFFFF" /><path d="M22 -30 q16 0 16 16 l0 20" stroke="#5C6F8E" strokeWidth={5} fill="none" /></g>}
  </g>
)

// ------------------------------------------------------------ a shopping basket holding a list of items (shown = how many are in it)
export const ITEMS = ['bread', 'milk', 'apple', 'house', 'car', 'scissors', 'shirt', 'gas', 'apple', 'bread'] as const
export const Basket: React.FC<{ x: number; y: number; s?: number; o?: number; shown?: number; items?: readonly (typeof ITEMS)[number][]; pop?: number[] }> = ({ x, y, s = 1, o = 1, shown = 10, items = ITEMS, pop = [] }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-150 -110 Q0 -260 150 -110" fill="none" stroke="#8E5B3A" strokeWidth={14} strokeLinecap="round" />
    {/* items poking out of the top, two rows */}
    {items.map((k, i) => i < shown ? <Item key={i} kind={k} x={-110 + (i % 5) * 55} y={-96 - Math.floor(i / 5) * 46 - 18 * (pop[i] ?? 0)} s={0.8} /> : null)}
    <path d="M-170 -110 L170 -110 L140 40 L-140 40 Z" fill="#C99366" stroke="#8E5B3A" strokeWidth={6} />
    {[-90, -30, 30, 90].map((lx) => <line key={lx} x1={lx} y1={-104} x2={lx * 0.85} y2={36} stroke="#8E5B3A" strokeWidth={4} />)}
    <line x1={-160} y1={-50} x2={160} y2={-50} stroke="#8E5B3A" strokeWidth={4} />
  </g>
)

// ------------------------------------------------------------ a hanging price tag with text (string goes up from its hole)
export const Tag: React.FC<{ x: number; y: number; t: string; s?: number; o?: number; r?: number; col?: string; ink?: string }> = ({ x, y, t, s = 1, o = 1, r = -6, col = '#F4C95D', ink = '#16294A' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d={`M-20 -40 L${Math.max(110, 26 * t.length)} -40 L${Math.max(110, 26 * t.length)} 40 L-20 40 L-56 0 Z`} fill={col} stroke="#B88A2E" strokeWidth={4} />
    <circle cx={-30} cy={0} r={8} fill="#FFFFFF" stroke="#B88A2E" strokeWidth={3} />
    <text x={Math.max(110, 26 * t.length) / 2 - 6} y={18} textAnchor="middle" fill={ink} style={TXT(52)}>{t}</text>
  </g>
)

// ------------------------------------------------------------ an hourglass; t 0–1 moves the sand from top to bottom
export const Hourglass: React.FC<{ x: number; y: number; s?: number; o?: number; t?: number; r?: number }> = ({ x, y, s = 1, o = 1, t = 0.5, r = 0 }) => {
  const k = clamp01(t)
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <rect x={-110} y={-190} width={220} height={26} rx={10} fill="#8E5B3A" /><rect x={-110} y={164} width={220} height={26} rx={10} fill="#8E5B3A" />
      <path d="M-86 -164 L86 -164 Q86 -40 10 0 Q86 40 86 164 L-86 164 Q-86 40 -10 0 Q-86 -40 -86 -164 Z" fill="#DDEBF7" opacity={0.5} stroke="#A9C4DE" strokeWidth={5} />
      <path d={`M${-70 * (1 - k)} ${-150 + 140 * k} L${70 * (1 - k)} ${-150 + 140 * k} L0 -6 Z`} fill={P.gold} />
      <path d={`M${-74 * Math.sqrt(k)} 156 L${74 * Math.sqrt(k)} 156 L0 ${156 - 120 * k} Z`} fill={P.gold} />
      {k > 0 && k < 1 && <line x1={0} y1={0} x2={0} y2={150} stroke={P.gold} strokeWidth={4} />}
    </g>
  )
}

// ------------------------------------------------------------ a snowball (radius r) on a slope
export const Snowball: React.FC<{ x: number; y: number; r: number; o?: number; spin?: number }> = ({ x, y, r, o = 1, spin = 0 }) => (
  <g opacity={o} transform={`translate(${x} ${y - r})`}>
    <circle r={r} fill="#FFFFFF" stroke="#C9D3DF" strokeWidth={4} />
    <g transform={`rotate(${spin})`}>{[0, 1, 2, 3].map((k) => <circle key={k} cx={Math.cos(k * 1.6) * r * 0.5} cy={Math.sin(k * 1.6) * r * 0.5} r={r * 0.12} fill="#E3EAF2" />)}</g>
  </g>
)

// ------------------------------------------------------------ a credit card
export const CreditCard: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string }> = ({ x, y, s = 1, o = 1, r = 0, t = 'CREDIT' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-95} width={300} height={190} rx={20} fill="#5B4BB7" /><rect x={-150} y={-50} width={300} height={34} fill="#2E2470" />
    <rect x={-115} y={10} width={58} height={44} rx={8} fill="#E9C25A" /><text x={120} y={70} textAnchor="end" fill="#FFFFFF" style={TXT(38)}>{t}</text>
  </g>
)

// ------------------------------------------------------------ a tower of coins (n coins, each 18 px), optional label above
export const CoinTower: React.FC<{ x: number; y: number; n: number; o?: number; w?: number; red?: boolean }> = ({ x, y, n, o = 1, w = 110, red }) => (
  <g opacity={o}>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <ellipse key={k} cx={x} cy={y - k * 16} rx={w / 2} ry={14} fill={red ? '#F06B5B' : P.gold} stroke={red ? '#C94A3E' : P.goldD} strokeWidth={3} />)}</g>
)

// ------------------------------------------------------------ a simple wall clock face (decor for a room)
export const Window: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-110} y={-90} width={220} height={180} rx={10} fill="#BFE4FF" stroke="#E2D8C2" strokeWidth={14} /><line x1={0} y1={-90} x2={0} y2={90} stroke="#E2D8C2" strokeWidth={10} /><line x1={-110} y1={0} x2={110} y2={0} stroke="#E2D8C2" strokeWidth={10} />
    <ellipse cx={-40} cy={-40} rx={40} ry={14} fill="#FFFFFF" opacity={0.8} /></g>
)

// ------------------------------------------------------------ a room: wall + floor + window (calm home scene)
export const Room: React.FC<{ ground: number; o?: number }> = ({ ground, o = 1 }) => (
  <g opacity={o}>
    <rect x={-100} y={0} width={2120} height={ground} fill="#F3E5CB" />
    <rect x={-100} y={ground - 40} width={2120} height={40} fill="#E2CDA6" />
    <rect x={-100} y={ground} width={2120} height={300} fill="#C9A77C" /><rect x={-100} y={ground} width={2120} height={10} fill="#A9875C" />
    {Array.from({ length: 9 }, (_, k) => <line key={k} x1={k * 240} y1={ground + 10} x2={k * 240 - 60} y2={1080} stroke="#B8946A" strokeWidth={4} />)}
  </g>
)
export const lerpPt = (a: [number, number], b: [number, number], t: number): [number, number] => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]
