// ============================================================
// COVER DRAWINGS — hand-drawn things the prop library lacks, in
// the same flat style (thick dark outline, bright fills). Each is
// centred on (x, y); wrap in <Part> so the gate knows its box.
// ============================================================
import React from 'react'

export const INK = '#05070C', GOLD = '#F2B632', RED = '#D8432F', BLUE = '#2F5FD0', MINT = '#3DAA6E'
const font = (px: number) => ({ font: `400 ${px}px "Bebas Neue"`, letterSpacing: px * 0.04 })

// # 300 × 190 payment card
export const Card: React.FC<{ x: number; y: number; r?: number; s?: number; color?: string; text?: string }> = ({ x, y, r = 0, s = 1, color = BLUE, text }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-150} y={-95} width={300} height={190} rx={20} fill={INK} opacity={0.25} transform="translate(10 14)" />
    <rect x={-150} y={-95} width={300} height={190} rx={20} fill={color} stroke={INK} strokeWidth={8} />
    <rect x={-115} y={-50} width={58} height={44} rx={8} fill={GOLD} stroke={INK} strokeWidth={4} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-115 + k * 60} y={32} width={48} height={14} rx={7} fill="#FFFFFF" opacity={0.85} />)}
    {text && <text x={125} y={-40} textAnchor="end" fill="#FFFFFF" style={font(46)}>{text}</text>}
  </g>
)
// # a coin, radius r
export const Coin: React.FC<{ x: number; y: number; r?: number; sign?: string }> = ({ x, y, r = 34, sign = '$' }) => (
  <g><circle cx={x} cy={y} r={r} fill={GOLD} stroke={INK} strokeWidth={r * 0.16} /><text x={x} y={y + r * 0.45} textAnchor="middle" fill="#8A5A00" style={font(r * 1.3)}>{sign}</text></g>
)
// # a pile of coins, about w wide
export const Pile: React.FC<{ x: number; y: number; w: number; r?: number }> = ({ x, y, w, r = 36 }) => {
  const n = Math.max(3, Math.round(w / (r * 1.7)))
  return <g>{Array.from({ length: n * 3 - 3 }, (_, i) => {
    const row = i < n ? 0 : i < n * 2 - 1 ? 1 : 2, k = row === 0 ? i : row === 1 ? i - n : i - (n * 2 - 1)
    return <Coin key={i} x={x - w / 2 + r + k * r * 1.7 + row * r * 0.85} y={y - row * r * 1.25} r={r} />
  })}</g>
}
// # a price tag with a word, ≈ 280 × 150 at s 1
export const Tag: React.FC<{ x: number; y: number; text: string; r?: number; s?: number; color?: string }> = ({ x, y, text, r = 0, s = 1, color = '#FFFFFF' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeLinejoin="round">
    <path d="M-140 -75 H100 L150 0 L100 75 H-140 Z" fill={INK} opacity={0.25} transform="translate(10 12)" />
    <path d="M-140 -75 H100 L150 0 L100 75 H-140 Z" fill={color} stroke={INK} strokeWidth={8} />
    <circle cx={105} cy={0} r={14} fill="none" stroke={INK} strokeWidth={6} />
    <text x={-30} y={30} textAnchor="middle" fill={INK} style={font(Math.min(92, 220 / (text.length * 0.44)))}>{text}</text>
  </g>
)
// # a sheet of paper with a title and a stamp (bill, contract), 300 × 380 at s 1
export const Paper: React.FC<{ x: number; y: number; title: string; stamp?: string; r?: number; s?: number; stampColor?: string }> = ({ x, y, title, stamp, r = -5, s = 1, stampColor = RED }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeLinejoin="round">
    <rect x={-150} y={-190} width={300} height={380} rx={10} fill={INK} opacity={0.25} transform="translate(12 14)" />
    <rect x={-150} y={-190} width={300} height={380} rx={10} fill="#FFFDF5" stroke={INK} strokeWidth={8} />
    <text x={0} y={-115} textAnchor="middle" fill={INK} style={font(64)}>{title}</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-105} y={-70 + k * 36} width={210 - (k % 2) * 60} height={12} rx={6} fill="#8A93A3" opacity={0.6} />)}
    {stamp && <g transform="translate(0 120) rotate(-12)"><rect x={-120} y={-45} width={240} height={90} rx={12} fill="none" stroke={stampColor} strokeWidth={10} />
      <text x={0} y={28} textAnchor="middle" fill={stampColor} style={font(80)}>{stamp}</text></g>}
  </g>
)
// # a phone with a word on the screen, 200 × 380 at s 1
export const Phone: React.FC<{ x: number; y: number; text?: string; r?: number; s?: number; screen?: string }> = ({ x, y, text, r = 0, s = 1, screen = '#5BCBFF' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-100} y={-190} width={200} height={380} rx={30} fill={INK} />
    <rect x={-84} y={-160} width={168} height={310} rx={14} fill={screen} />
    {text && <text x={0} y={20} textAnchor="middle" fill={INK} style={font(70)}>{text}</text>}
  </g>
)
// # a popcorn bucket, 260 × 340 at s 1
export const Popcorn: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeLinejoin="round">
    {[[-80, -110], [-30, -140], [25, -135], [80, -105], [-55, -150], [50, -160], [0, -175]].map(([px, py], i) => <circle key={i} cx={px} cy={py} r={42} fill="#FFF6D8" stroke={INK} strokeWidth={6} />)}
    <path d="M-130 -100 L130 -100 L100 170 L-100 170 Z" fill="#FFFFFF" stroke={INK} strokeWidth={8} />
    {[-80, -27, 27, 80].map((sx, i) => <path key={i} d={`M${sx - 18} -100 L${sx + 18} -100 L${sx * 0.77 + 14} 170 L${sx * 0.77 - 14} 170 Z`} fill={RED} />)}
    <path d="M-130 -100 L130 -100 L100 170 L-100 170 Z" fill="none" stroke={INK} strokeWidth={8} />
  </g>
)
// # a burger, 260 × 190 at s 1
export const Burger: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round" stroke={INK} strokeWidth={7}>
    <path d="M-130 0 Q-130 -95 0 -95 Q130 -95 130 0 Z" fill="#E9A23B" />
    <path d="M-135 0 L135 0 L120 22 L-120 22 Z" fill={MINT} />
    <rect x={-130} y={22} width={260} height={36} rx={14} fill="#6B3A1E" />
    <path d="M-125 58 L125 58 Q125 95 0 95 Q-125 95 -125 58 Z" fill="#E9A23B" />
  </g>
)
// # a mousetrap (the trap in "free" offers), 340 × 160 at s 1
export const Trap: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round" stroke={INK} strokeWidth={8}>
    <rect x={-170} y={20} width={340} height={60} rx={10} fill="#C98B4E" />
    <path d="M-130 20 L-130 -40 L130 -40 L130 20" fill="none" stroke="#B8C0CA" strokeWidth={12} />
    <path d="M-130 20 L-130 -40 L130 -40 L130 20" fill="none" stroke={INK} strokeWidth={4} />
    <rect x={-30} y={0} width={60} height={22} rx={6} fill={GOLD} />
  </g>
)
// # a dumbbell, 320 × 110 at s 1
export const Dumbbell: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} stroke={INK} strokeWidth={7} strokeLinejoin="round">
    <rect x={-110} y={-12} width={220} height={24} rx={10} fill="#B8C0CA" />
    {[-1, 1].map((d) => <g key={d}><rect x={d * 110 - 25} y={-55} width={50} height={110} rx={12} fill="#2A2F38" /><rect x={d * 150 - 15} y={-38} width={30} height={76} rx={10} fill="#2A2F38" /></g>)}
  </g>
)
// # an aeroplane seat, 220 × 300 at s 1
export const Seat: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = BLUE }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth={8} strokeLinejoin="round">
    <rect x={-80} y={-150} width={160} height={210} rx={30} fill={color} />
    <rect x={-60} y={-140} width={120} height={50} rx={14} fill="#FFFFFF" opacity={0.9} />
    <rect x={-100} y={40} width={200} height={60} rx={20} fill={color} />
    <rect x={-60} y={100} width={20} height={50} fill="#2A2F38" /><rect x={40} y={100} width={20} height={50} fill="#2A2F38" />
  </g>
)
// # a plane ticket / boarding pass, 300 × 150 at s 1
export const Pass: React.FC<{ x: number; y: number; r?: number; s?: number; text?: string }> = ({ x, y, r = 0, s = 1, text = '12A' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeLinejoin="round">
    <rect x={-150} y={-75} width={300} height={150} rx={14} fill="#FFFFFF" stroke={INK} strokeWidth={7} />
    <rect x={-150} y={-75} width={80} height={150} rx={14} fill={RED} stroke={INK} strokeWidth={7} />
    <text x={40} y={25} textAnchor="middle" fill={INK} style={font(80)}>{text}</text>
  </g>
)
// # a vinyl record (music / labels), radius 160 at s 1
export const Record: React.FC<{ x: number; y: number; s?: number; label?: string; color?: string }> = ({ x, y, s = 1, label, color = RED }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={168} fill={INK} opacity={0.25} transform="translate(12 14)" />
    <circle r={160} fill="#14161C" stroke={INK} strokeWidth={8} />
    {[130, 105, 80].map((r) => <circle key={r} r={r} fill="none" stroke="#2E333D" strokeWidth={5} />)}
    <circle r={58} fill={color} stroke={INK} strokeWidth={6} />
    <circle r={10} fill={INK} />
    {label && <text y={-20} textAnchor="middle" fill="#FFFFFF" style={font(34)}>{label}</text>}
  </g>
)
// # headphones, 300 × 280 at s 1
export const Headphones: React.FC<{ x: number; y: number; s?: number; r?: number; color?: string }> = ({ x, y, s = 1, r = 0, color = MINT }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeLinejoin="round" strokeLinecap="round">
    <path d="M-120 40 Q-120 -130 0 -130 Q120 -130 120 40" fill="none" stroke={INK} strokeWidth={40} />
    <path d="M-120 40 Q-120 -130 0 -130 Q120 -130 120 40" fill="none" stroke="#2A2F38" strokeWidth={24} />
    {[-1, 1].map((d) => <rect key={d} x={d * 120 - 45} y={10} width={90} height={130} rx={36} fill={color} stroke={INK} strokeWidth={8} />)}
  </g>
)
