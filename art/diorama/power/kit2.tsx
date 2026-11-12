// ============================================================
// More objects for the power-bill video: the hot sun, AC units,
// a battery that is too small, a handshake promise scroll, the
// PJM control house, the auction podium and gavel, price paddles,
// the coin column that rises to a price line, the stylised map of
// the region with city pins, a magnifier, a crane, the price
// ceiling, office and factory buildings. Pure functions of props.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'
import { W } from './kit'

// ------------------------------------------------------------ ground strip used by every street layout
export const Ground: React.FC<{ y: number; o?: number; dark?: boolean }> = ({ y, o = 1, dark }) => (
  <g opacity={o}><rect x={-100} y={y} width={2120} height={300} fill={dark ? '#13223F' : '#D9C7A6'} /><rect x={-100} y={y} width={2120} height={10} fill={dark ? '#2B4A78' : '#BFAE8E'} /></g>
)
export const Clouds: React.FC<{ f: number; at: [number, number, number][]; o?: number }> = ({ f, at, o = 0.9 }) => (
  <g opacity={o}>{at.map(([cx, cy, cs], k) => <g key={k} transform={`translate(${cx + Math.sin(f / 90 + k) * 14} ${cy}) scale(${cs})`}><ellipse cx={0} cy={0} rx={110} ry={34} fill="#FFFFFF" /><ellipse cx={-50} cy={-18} rx={60} ry={40} fill="#FFFFFF" /><ellipse cx={40} cy={-26} rx={66} ry={46} fill="#FFFFFF" /></g>)}</g>
)

// ------------------------------------------------------------ the hot sun (heat 0–1 makes it bigger, redder, with wavy rays)
export const Sun: React.FC<{ x: number; y: number; heat?: number; f?: number; o?: number }> = ({ x, y, heat = 0, f = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={120 + 50 * heat} fill={P.gold} opacity={0.15 + 0.15 * heat} />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-8} y={-150 - 30 * heat - 8 * Math.sin(f / 6 + k)} width={16} height={46} rx={8} fill={heat > 0.5 ? '#F2994A' : P.gold} transform={`rotate(${k * 30 + f * 0.3})`} />)}
    <circle r={86} fill={heat > 0.5 ? '#F7B045' : '#F6D25C'} />
    <circle r={86} fill="#F06B5B" opacity={0.35 * heat} />
  </g>
)
// # an air-conditioner box on a wall; run 0–1 spins its fan and puffs cool air
export const AC: React.FC<{ x: number; y: number; s?: number; run?: number; f?: number }> = ({ x, y, s = 1, run = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-46} width={120} height={92} rx={10} fill="#E9EEF5" stroke="#9AA5B5" strokeWidth={4} />
    <circle cx={-14} cy={0} r={32} fill="#C9CFD8" />
    <g transform={`translate(-14 0) rotate(${f * 24 * run})`}>{[0, 1, 2].map((k) => <ellipse key={k} cx={0} cy={-14} rx={8} ry={16} fill="#7A8698" transform={`rotate(${k * 120})`} />)}</g>
    {[0, 1, 2].map((k) => <rect key={k} x={26} y={-26 + k * 20} width={24} height={8} rx={3} fill="#9AA5B5" />)}
    {run > 0 && [0, 1].map((k) => { const ph = ((f / 20 + k / 2) % 1); return <path key={k} d={`M64 ${-20 + k * 30} q 16 -10 32 0 q 16 10 32 0`} fill="none" stroke={P.skyD} strokeWidth={5} strokeLinecap="round" opacity={run * (1 - ph)} transform={`translate(${ph * 40} 0)`} /> })}
  </g>
)
// # a thermometer; level 0–1
export const Thermo: React.FC<{ x: number; y: number; level: number; s?: number; o?: number }> = ({ x, y, level, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-22} y={-300} width={44} height={300} rx={22} fill="#FFFFFF" stroke="#C9CFD8" strokeWidth={5} />
    <circle cx={0} cy={10} r={40} fill="#F06B5B" />
    <rect x={-10} y={-280 + 270 * (1 - clamp01(level))} width={20} height={270 * clamp01(level) + 10} rx={10} fill="#F06B5B" />
    {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={22} y={-260 + k * 52} width={18} height={5} rx={2} fill="#9AA5B5" />)}
  </g>
)
// # a battery: fill 0–1, overflow 0–1 makes lightning spill over the top (too small to store it all)
export const Battery: React.FC<{ x: number; y: number; s?: number; fill?: number; overflow?: number; f?: number; o?: number }> = ({ x, y, s = 1, fill = 0, overflow = 0, f = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={90} ry={12} fill="#000" opacity={0.12} />
    <rect x={-70} y={-200} width={140} height={200} rx={18} fill="#E9EEF5" stroke="#5C6F8E" strokeWidth={6} />
    <rect x={-26} y={-222} width={52} height={22} rx={6} fill="#5C6F8E" />
    <rect x={-54} y={-16 - 168 * clamp01(fill)} width={108} height={168 * clamp01(fill)} rx={10} fill={P.mint} />
    {overflow > 0 && [0, 1, 2].map((k) => { const ph = (f / 14 + k / 3) % 1; return <path key={k} d="M0 0 L-14 30 L4 30 L-10 64" fill="none" stroke={P.gold} strokeWidth={8} strokeLinejoin="round" opacity={overflow * (1 - ph)} transform={`translate(${-40 + k * 40} ${-236 - ph * 70}) rotate(${(k - 1) * 20})`} /> })}
  </g>
)

// ------------------------------------------------------------ the promise: a rolled scroll with a gold seal and ribbon
export const Scroll: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; r?: number }> = ({ x, y, s = 1, o = 1, open = 0, r = 0 }) => {
  const w = lerp(60, 260, clamp01(open))
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <rect x={-w / 2} y={-150} width={w} height={300} rx={10} fill="#FFF6E2" stroke="#CDB58C" strokeWidth={4} />
      {open > 0.5 && [0, 1, 2, 3].map((k) => <rect key={k} x={-w / 2 + 30} y={-100 + k * 44} width={w - 60} height={10} rx={5} fill="#E2D2B0" opacity={(open - 0.5) * 2} />)}
      <rect x={-w / 2 - 16} y={-166} width={32} height={332} rx={16} fill="#E2C996" /><rect x={w / 2 - 16} y={-166} width={32} height={332} rx={16} fill="#E2C996" />
      <circle cx={0} cy={110} r={34} fill="#C94A3E" /><circle cx={0} cy={110} r={22} fill="#E06B5B" />
      <path d="M-14 136 L-24 180 L0 166 L24 180 L14 136" fill="#C94A3E" />
    </g>
  )
}

// ------------------------------------------------------------ the grid operator's house (PJM): a calm control building
export const ControlHouse: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; name?: string }> = ({ x, y, s = 1, o = 1, f = 0, name = 'PJM' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={300} ry={22} fill="#000" opacity={0.12} />
    <rect x={-270} y={-300} width={540} height={300} rx={14} fill="#E9EEF5" />
    <rect x={-270} y={-300} width={540} height={70} rx={14} fill={P.navy3} />
    <text x={0} y={-248} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 10 }}>{name}</text>
    {/* # the big wall screen: a live grid map with blinking nodes */}
    <rect x={-220} y={-210} width={440} height={150} rx={10} fill={P.navy1} />
    {Array.from({ length: 9 }, (_, k) => <circle key={k} cx={-180 + (k % 5) * 90 + (k > 4 ? 45 : 0)} cy={-170 + (k > 4 ? 70 : 0)} r={9} fill={(Math.floor(f / 8) + k) % 4 ? P.mint : P.gold} />)}
    {[[-180, -170, -90, -170], [-90, -170, -45, -100], [-45, -100, 45, -100], [0, -170, 45, -100], [90, -170, 135, -100], [180, -170, 135, -100]].map(([a, b, c, d], k) => <line key={k} x1={a} y1={b} x2={c} y2={d} stroke={P.sky} strokeWidth={3} opacity={0.6} />)}
    <rect x={-40} y={-50} width={80} height={50} rx={6} fill="#6E7E96" />
  </g>
)

// ------------------------------------------------------------ auction: podium with gavel, price paddles
export const Podium: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string }> = ({ x, y, s = 1, o = 1, label = 'AUCTION' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={140} ry={14} fill="#000" opacity={0.12} />
    <path d="M-110 0 L-90 -220 L90 -220 L110 0 Z" fill="#8E6232" />
    <rect x={-130} y={-246} width={260} height={30} rx={8} fill="#B9864C" />
    <rect x={-80} y={-170} width={160} height={56} rx={8} fill={P.gold} />
    <text x={0} y={-130} textAnchor="middle" fill="#5A3A22" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>{label}</text>
  </g>
)
export const Gavel: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-6} y={0} width={12} height={110} rx={6} fill="#8E6232" />
    <rect x={-44} y={-26} width={88} height={40} rx={12} fill="#6E4A26" />
  </g>
)
// # a round price paddle on a stick; text = the price shown (only once spoken)
export const Paddle: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string; color?: string; r?: number }> = ({ x, y, s = 1, o = 1, text = '', color = P.paper, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-7} y={0} width={14} height={120} rx={6} fill="#8E6232" />
    <circle cx={0} cy={-50} r={64} fill={color} stroke="#CDB58C" strokeWidth={5} />
    <text x={0} y={-30} textAnchor="middle" fill={P.navy0} style={{ font: '400 64px "Bebas Neue"' }}>{text}</text>
  </g>
)

// ------------------------------------------------------------ a column of coins rising from the ground to height h (px)
export const CoinColumn: React.FC<{ x: number; y: number; h: number; w?: number; color?: string; extra?: number; o?: number }> = ({ x, y, h, w = 110, color = P.gold, extra = 0, o = 1 }) => {
  const n = Math.max(0, Math.round(h / 22)), base = Math.max(0, Math.round((h - extra) / 22))
  return (
    <g opacity={o}>
      <ellipse cx={x} cy={y + 6} rx={w * 0.6} ry={10} fill="#000" opacity={0.12} />
      {Array.from({ length: n }, (_, k) => <g key={k}><ellipse cx={x} cy={y - k * 22} rx={w / 2} ry={12} fill={k >= base ? P.coralD : P.goldD} /><ellipse cx={x} cy={y - k * 22 - 6} rx={w / 2} ry={12} fill={k >= base ? P.coral : color} /></g>)}
    </g>
  )
}

// ------------------------------------------------------------ office tower and factory (for "shops, offices and factories")
export const Office: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0.6 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={120} ry={12} fill="#000" opacity={0.12} />
    <rect x={-100} y={-380} width={200} height={380} rx={8} fill="#9FC4E8" />
    <rect x={30} y={-380} width={70} height={380} rx={8} fill="#000" opacity={0.08} />
    {Array.from({ length: 8 }, (_, r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-80 + c * 58} y={-356 + r * 42} width={42} height={26} rx={4} fill={(r + c) % 3 ? '#E9F4FF' : P.gold} opacity={(r + c) % 3 ? 0.9 : lit} />))}
  </g>
)
export const Factory: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number }> = ({ x, y, s = 1, o = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={14} fill="#000" opacity={0.12} />
    <path d="M-180 0 L-180 -160 L-110 -220 L-110 -160 L-40 -220 L-40 -160 L30 -220 L30 -160 L180 -160 L180 0 Z" fill="#C9CFD8" />
    <rect x={110} y={-300} width={40} height={140} fill="#9AA5B5" />
    {[0, 1, 2].map((k) => { const ph = (f / 40 + k / 3) % 1; return <circle key={k} cx={130 + Math.sin(ph * 5) * 10} cy={-320 - ph * 120} r={22 + ph * 26} fill="#FFFFFF" opacity={0.6 * (1 - ph)} /> })}
    {[-140, -70, 0, 70].map((wx) => <rect key={wx} x={wx} y={-120} width={50} height={40} rx={4} fill={P.gold} opacity={0.6} />)}
  </g>
)

// ------------------------------------------------------------ the stylised region: a soft rounded land shape with city pins
export const RegionMap: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-420 -120 C -380 -260, -180 -300, 0 -250 C 140 -300, 300 -280, 380 -180 C 440 -100, 400 40, 300 120 C 200 220, 40 260, -80 230 C -220 200, -360 140, -420 40 C -450 -20, -440 -80, -420 -120 Z" fill="#CFE3C8" stroke="#9EBF95" strokeWidth={6} />
    <path d="M-420 -120 C -380 -260, -180 -300, 0 -250 C 140 -300, 300 -280, 380 -180 C 440 -100, 400 40, 300 120 C 200 220, 40 260, -80 230 C -220 200, -360 140, -420 40 C -450 -20, -440 -80, -420 -120 Z" fill={P.gold} opacity={0.25 * lit} />
    {/* # the Atlantic coast on the right */}
    <path d="M380 -180 C 440 -100, 400 40, 300 120" fill="none" stroke={P.skyD} strokeWidth={10} opacity={0.4} />
  </g>
)
export const Pin: React.FC<{ x: number; y: number; label: string; o?: number; s?: number }> = ({ x, y, label, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 0 C -22 -30, -30 -48, -30 -62 A 30 30 0 1 1 30 -62 C 30 -48, 22 -30, 0 0 Z" fill={P.coral} />
    <circle cx={0} cy={-62} r={12} fill="#FFFFFF" />
    <rect x={-label.length * 13 - 14} y={8} width={label.length * 26 + 28} height={52} rx={26} fill={P.card} stroke={P.edge} strokeWidth={3} />
    <text x={0} y={46} textAnchor="middle" fill={P.ink} style={{ font: '400 42px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
  </g>
)

// ------------------------------------------------------------ magnifier, crane, price ceiling
export const Magnifier: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; children?: React.ReactNode }> = ({ x, y, s = 1, r = -30, o = 1, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={110} fill="#E6F4FF" opacity={0.55} />
    {children}
    <circle r={110} fill="none" stroke={P.navy3} strokeWidth={18} />
    <rect x={-14} y={110} width={28} height={150} rx={12} fill={P.navy3} transform={`rotate(${r})`} />
  </g>
)
export const Crane: React.FC<{ x: number; y: number; s?: number; o?: number; swing?: number; idle?: number }> = ({ x, y, s = 1, o = 1, swing = 0, idle = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-14} y={-520} width={28} height={520} fill="#F2B233" />
    {Array.from({ length: 12 }, (_, k) => <path key={k} d={`M-14 ${-40 - k * 40} L14 ${-80 - k * 40}`} stroke="#C98F1A" strokeWidth={5} />)}
    <g transform={`rotate(${swing * 8} 0 -520)`}>
      <rect x={-120} y={-536} width={460} height={20} fill="#F2B233" />
      <rect x={-150} y={-540} width={60} height={40} fill="#5C6A80" />
      <line x1={280} y1={-516} x2={280} y2={-360 + 40 * idle} stroke="#5C6A80" strokeWidth={4} />
      <rect x={256} y={-366 + 40 * idle} width={48} height={22} rx={4} fill="#5C6A80" />
    </g>
  </g>
)
// # a heavy ceiling bar across the frame at y (the price cap); bump 0–1 shakes it when something hits it
export const Ceiling: React.FC<{ y: number; x0?: number; x1?: number; o?: number; bump?: number; label?: string }> = ({ y, x0 = 260, x1 = 1660, o = 1, bump = 0, label }) => (
  <g opacity={o} transform={`translate(0 ${-6 * Math.sin(bump * Math.PI * 3) * (1 - bump)})`}>
    <rect x={x0} y={y - 22} width={x1 - x0} height={44} rx={10} fill="#5C6A80" />
    {Array.from({ length: Math.floor((x1 - x0) / 80) }, (_, k) => <path key={k} d={`M${x0 + 20 + k * 80} ${y - 22} L${x0 + 60 + k * 80} ${y + 22}`} stroke="#F2B233" strokeWidth={14} />)}
    {label && <g transform={`translate(${x1 + 20} ${y})`}><rect x={0} y={-30} width={label.length * 26 + 30} height={60} rx={30} fill={P.card} stroke={P.edge} strokeWidth={3} /><text x={15 + label.length * 13} y={18} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{label}</text></g>}
  </g>
)
export const _W = W
