// ============================================================
// LONG VIDEO — "Why Every App Now Wants a Monthly Subscription" — objects for this story: the boxed software
// suite with its price sticker, a monthly bill envelope, a wall calendar, a subscription conveyor of coins, a
// daytime window, a design studio desk, and the cast: Maya (the designer who pays) and the Adobe executive.
// Settings stay for a whole scene (casino style); objects transform on the spoken words.
// ============================================================
import React from 'react'
import { lerp, P } from '../kit'
import { type Beat, Person } from '../aimoney/common'

// # Maya, the designer who buys and subscribes (the story's main character)
export const Maya: React.FC<{ f: number; beats: Beat[]; x: number; y?: number; s?: number; flip?: boolean; o?: number }> = ({ f, beats, x, y = 1000, s = 1, flip, o = 1 }) => (
  <g opacity={o}><Person f={f} who="investorF" beats={beats} x={x} y={y} s={s} flip={flip} /></g>
)
// # the software company's executive
export const Exec: React.FC<{ f: number; beats: Beat[]; x: number; y?: number; s?: number; flip?: boolean; o?: number }> = ({ f, beats, x, y = 1000, s = 1, flip, o = 1 }) => (
  <g opacity={o}><Person f={f} who="buyer" beats={beats} x={x} y={y} s={s} flip={flip} /></g>
)
// # the boxed suite: a 3D-ish box with a name and a price sticker
export const SoftBox: React.FC<{ x: number; y: number; s?: number; name?: string; price?: string; color?: string; o?: number; r?: number }> = ({ x, y, s = 1, name = 'CREATIVE SUITE', price, color = '#C2384A', o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M-110 -150 L-70 -180 L150 -180 L110 -150 Z" fill="#E36A78" />
    <path d="M110 -150 L150 -180 L150 120 L110 150 Z" fill="#8E2433" />
    <rect x={-110} y={-150} width={220} height={300} rx={6} fill={color} />
    <circle cx={0} cy={-40} r={56} fill="#FFFFFF" opacity={0.92} />
    <path d="M-24 -10 L0 -76 L24 -10 M-14 -34 L14 -34" stroke={color} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <text x={0} y={60} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>{name}</text>
    {price && <g transform="translate(60 112) rotate(-8)"><rect x={-74} y={-30} width={148} height={60} rx={12} fill={P.gold} /><text y={18} textAnchor="middle" fill="#3A2A12" style={{ font: '400 46px "Bebas Neue"' }}>{price}</text></g>}
  </g>
)
// # a monthly bill envelope with an amount
export const BillEnv: React.FC<{ x: number; y: number; s?: number; amount?: string; o?: number; r?: number; color?: string }> = ({ x, y, s = 1, amount, o = 1, r = 0, color = '#FFFFFF' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-70} width={220} height={140} rx={10} fill={color} stroke="#C9B48E" strokeWidth={5} />
    <path d="M-110 -70 L0 10 L110 -70" fill="none" stroke="#C9B48E" strokeWidth={5} />
    {amount && <text y={52} textAnchor="middle" fill={P.coralInk} style={{ font: '400 44px "Bebas Neue"' }}>{amount}</text>}
  </g>
)
// # a wall calendar page: label on the red band, big text below
export const CalPage: React.FC<{ x: number; y: number; s?: number; top?: string; big: string; o?: number }> = ({ x, y, s = 1, top = '', big, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-100} y={-110} width={200} height={220} rx={14} fill={P.paper} stroke="#C9B48E" strokeWidth={4} />
    <rect x={-100} y={-110} width={200} height={60} rx={14} fill={P.coral} />
    <text y={-68} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"' }}>{top}</text>
    <text y={56} textAnchor="middle" fill={P.navy0} style={{ font: '400 80px "Bebas Neue"' }}>{big}</text>
  </g>
)
// # a sunny window onto the street; children are drawn inside (clipped)
export const DayWindow: React.FC<{ x: number; y: number; w: number; h: number; id: string; children?: React.ReactNode }> = ({ x, y, w, h, id, children }) => (
  <g>
    <defs><clipPath id={`dw-${id}`}><rect x={x} y={y} width={w} height={h} /></clipPath></defs>
    <rect x={x - 22} y={y - 22} width={w + 44} height={h + 44} rx={10} fill="#8E6A45" />
    <g clipPath={`url(#dw-${id})`}>
      <rect x={x} y={y} width={w} height={h} fill="#BFE3F5" />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={x + k * (w / 5)} y={y + h - 160 - (k % 2) * 60} width={w / 5 - 16} height={300} fill="#A9CBE0" />)}
      {children}
    </g>
  </g>
)
// # a building with a name band on top (the company)
export const Tower: React.FC<{ x: number; y: number; s?: number; label?: string; color?: string; glow?: number }> = ({ x, y, s = 1, label = 'ADOBE', color = '#C2384A', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {glow > 0 && <rect x={-180} y={-540} width={360} height={560} rx={20} fill={P.gold} opacity={0.35 * glow} />}
    <rect x={-150} y={-480} width={300} height={480} fill="#E9E2D5" />
    {Array.from({ length: 8 }, (_, r) => [0, 1, 2, 3].map((k) => <rect key={`${r}-${k}`} x={-120 + k * 66} y={-450 + r * 54} width={42} height={30} rx={4} fill="#9DB9D2" />))}
    <rect x={-170} y={-530} width={340} height={56} rx={10} fill={color} />
    <text x={0} y={-490} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 4 }}>{label}</text>
  </g>
)
// # the studio room: cream wall, wooden floor
export const Studio: React.FC = () => (
  <g>
    <rect x={0} y={0} width={1920} height={1000} fill="#F3EAD9" />
    <rect x={0} y={0} width={1920} height={215} fill="#EFE6D6" /><rect x={0} y={205} width={1920} height={22} fill="#8E6A45" />
    <rect x={0} y={1000} width={1920} height={80} fill="#B98F63" /><rect x={0} y={990} width={1920} height={14} fill="#8E6A45" />
  </g>
)
// # a desk with a laptop; screen children drawn inside a 440 × 270 screen whose centre is (x, y - 150)
export const Desk: React.FC<{ x: number; y?: number; children?: React.ReactNode; glow?: number }> = ({ x, y = 720, children, glow = 0 }) => (
  <g>
    <rect x={x - 300} y={y} width={600} height={30} rx={8} fill="#7A5236" />
    <rect x={x - 270} y={y + 30} width={26} height={1000 - y - 30} fill="#5C3D27" /><rect x={x + 244} y={y + 30} width={26} height={1000 - y - 30} fill="#5C3D27" />
    {glow > 0 && <ellipse cx={x} cy={y - 150} rx={320} ry={190} fill="#FFE9A8" opacity={0.4 * glow} />}
    <rect x={x - 240} y={y - 300} width={480} height={300} rx={18} fill="#2A3448" />
    <rect x={x - 220} y={y - 285} width={440} height={270} rx={8} fill="#FFFFFF" />
    <g>{children}</g>
    <rect x={x - 270} y={y - 12} width={540} height={18} rx={9} fill="#5B6680" />
  </g>
)
// # a big red cross over something that was just shown ("not", "can't")
export const Cross: React.FC<{ x: number; y: number; r?: number; t: number }> = ({ x, y, r = 110, t }) => (
  <g opacity={Math.min(1, t * 2)}>
    <path d={`M${x - r} ${y - r} L${x - r + 2 * r * Math.min(1, t * 2)} ${y - r + 2 * r * Math.min(1, t * 2)}`} stroke={P.coral} strokeWidth={22} strokeLinecap="round" />
    {t > 0.5 && <path d={`M${x + r} ${y - r} L${lerp(x + r, x - r, Math.min(1, (t - 0.5) * 2))} ${lerp(y - r, y + r, Math.min(1, (t - 0.5) * 2))}`} stroke={P.coral} strokeWidth={22} strokeLinecap="round" />}
  </g>
)
