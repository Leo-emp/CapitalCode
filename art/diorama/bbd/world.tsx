// ============================================================
// LONG VIDEO — "The Rich Don't Sell. They Borrow." — the drawn WORLDS (owner 2026-10-31: continuous transforming
// illustration; every frame a full drawn setting; things change inside it, never stickers on top). Buildings,
// ground, vault, bank, pipes, trees — each takes 0–1 knobs so a scene can make it grow, open, glow or crack on a word.
// ============================================================
import React from 'react'
import { lerp, P, rnd } from '../kit'

// # a far skyline across the whole width (night or day), with lit windows at night
export const Skyline: React.FC<{ y?: number; night?: boolean; f: number; dim?: number }> = ({ y = 860, night = true, f, dim = 0 }) => (
  <g opacity={1 - dim}>
    {Array.from({ length: 16 }, (_, k) => {
      const w = 90 + rnd(k) * 70, h = 160 + rnd(k + 3) * 260, x = k * 125 - 30
      return <g key={k}>
        <rect x={x} y={y - h} width={w} height={h} rx={4} fill={night ? '#1B3157' : P.ink2} opacity={night ? 0.9 : 0.12} />
        {night && Array.from({ length: Math.floor(h / 46) }, (_, r) => Array.from({ length: 3 }, (_, cc) => {
          const lit = rnd(k * 31 + r * 7 + cc) > 0.55 ? (0.55 + 0.35 * Math.sin(f / 40 + k + r)) : 0
          return lit > 0 ? <rect key={`${r}-${cc}`} x={x + 14 + cc * ((w - 28) / 3)} y={y - h + 18 + r * 46} width={(w - 28) / 3 - 10} height={20} rx={2} fill={P.gold} opacity={lit * 0.5} /> : null
        }))}
      </g>
    })}
  </g>
)
// # the ground band and a soft road
export const Ground: React.FC<{ y?: number; night?: boolean }> = ({ y = 880, night = true }) => (
  <g>
    <rect x={-400} y={y} width={2720} height={600} fill={night ? '#132743' : '#E6D3AE'} />
    <rect x={-400} y={y + 40} width={2720} height={60} fill={night ? '#1A3355' : '#F3E6C8'} />
    {Array.from({ length: 14 }, (_, k) => <rect key={k} x={k * 160 - 40} y={y + 66} width={70} height={8} rx={4} fill={night ? '#2E4A73' : '#E6D3AE'} />)}
  </g>
)
// # a glass tower; `lit` 0–1 lights the penthouse windows, `glow` warms the whole body
export const GlassTower: React.FC<{ x: number; y: number; w?: number; h?: number; lit?: number; glow?: number; f: number }> = ({ x, y, w = 260, h = 640, lit = 0, glow = 0, f }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={6} rx={w * 0.7} ry={20} fill="#000" opacity={0.25} />
    <rect x={-w / 2} y={-h} width={w} height={h} rx={10} fill="#2A5788" />
    <rect x={-w / 2} y={-h} width={w * 0.45} height={h} rx={10} fill="#3A6EA8" />
    {Array.from({ length: Math.floor(h / 70) }, (_, r) => [0, 1, 2].map((cc) => <rect key={`${r}-${cc}`} x={-w / 2 + 20 + cc * ((w - 40) / 3)} y={-h + 30 + r * 70} width={(w - 40) / 3 - 14} height={40} rx={4} fill={r < 2 || glow > 0.5 ? P.gold : '#8CC3F0'} opacity={r < 2 ? 0.25 + 0.7 * lit : glow > 0.5 ? 0.5 + 0.4 * glow : 0.35 + 0.1 * Math.sin(f / 50 + r + cc)} />))}
    <path d={`M${-w / 2 - 10} ${-h} L0 ${-h - 90} L${w / 2 + 10} ${-h} Z`} fill={P.gold} opacity={0.9} />
    
  </g>
)
// # a mansion: wide house, columns, warm windows (`lit`)
export const Mansion: React.FC<{ x: number; y: number; s?: number; lit?: number; o?: number }> = ({ x, y, s = 1, lit = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.2} />
    <rect x={-230} y={-200} width={460} height={200} rx={6} fill="#E9DCC0" />
    <path d="M-260 -195 L0 -300 L260 -195 Z" fill="#5C6F8E" />
    {[-150, -50, 50, 150].map((cx) => <rect key={cx} x={cx - 12} y={-190} width={24} height={190} fill="#F7F1E1" />)}
    {[-200, -100, 100, 200].map((wx) => <rect key={wx} x={wx - 22} y={-150} width={44} height={60} rx={4} fill={P.gold} opacity={0.3 + 0.6 * lit} />)}
    <rect x={-30} y={-110} width={60} height={110} rx={6} fill="#7A4E2D" />
  </g>
)
// # a private jet
export const Jet: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M-150 0 Q-140 -26 -60 -26 L120 -22 Q170 -14 170 0 Q170 14 120 22 L-60 26 Q-140 26 -150 0 Z" fill={P.white} />
    <path d="M-20 -24 L40 -100 L70 -100 L40 -24 Z M-20 24 L40 90 L70 90 L40 24 Z" fill="#C9D3E1" />
    <path d="M-150 0 L-190 -60 L-160 -60 L-120 -16 Z" fill={P.gold} />
    {[-40, -10, 20, 50, 80].map((wx) => <circle key={wx} cx={wx} cy={-6} r={7} fill="#3A6EA8" />)}
  </g>
)
// # a bank building with a gold dome; `lit` warms it
export const BankHall: React.FC<{ x: number; y: number; s?: number; lit?: number; o?: number }> = ({ x, y, s = 1, lit = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={240} ry={18} fill="#000" opacity={0.2} />
    <rect x={-210} y={-220} width={420} height={220} rx={6} fill="#D9DEE6" />
    {[-150, -75, 0, 75, 150].map((cx) => <rect key={cx} x={cx - 16} y={-210} width={32} height={210} fill="#F7FAFF" />)}
    <path d="M-240 -215 L0 -320 L240 -215 Z" fill="#C9CFD9" />
    <ellipse cx={0} cy={-322} rx={70} ry={50} fill={P.gold} />
    <rect x={-150} y={-250} width={300} height={30} rx={6} fill="#3A4A66" /><text x={0} y={-226} textAnchor="middle" fill="#FFF" style={{ font: '400 30px "Bebas Neue"', letterSpacing: 6 }}>BANK</text>
    {lit > 0 && <rect x={-210} y={-220} width={420} height={220} rx={6} fill={P.gold} opacity={0.25 * lit} />}
  </g>
)
// # a vault seen in cut-away: thick walls, a round door (`open` 0–1), shelves of certificates (`n`)
export const Vault: React.FC<{ x: number; y: number; s?: number; open?: number; n?: number; lock?: number; o?: number; crack?: number }> = ({ x, y, s = 1, open = 0, n = 12, lock = 0, o = 1, crack = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-230} y={-300} width={460} height={300} rx={20} fill="#3A4A66" />
    <rect x={-200} y={-270} width={400} height={250} rx={12} fill="#22324D" />
    {Array.from({ length: Math.round(n) }, (_, k) => <g key={k} transform={`translate(${-120 + (k % 3) * 120} ${-50 - Math.floor(k / 3) * 46})`}><rect x={-50} y={-16} width={100} height={32} rx={5} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={2} /><circle cx={38} cy={0} r={6} fill={P.gold} /></g>)}
    <g transform={`translate(${200 + open * 70} -145) scale(${1 - open * 0.75} 1)`}>
      <circle r={110} fill="#8A97AA" stroke="#5C6F8E" strokeWidth={10} opacity={1 - open * 0.3} />
      {[0, 60, 120].map((a) => <rect key={a} x={-70} y={-6} width={140} height={12} rx={6} fill="#5C6F8E" transform={`rotate(${a + lock * 90})`} />)}
      <circle r={24} fill={P.gold} />
    </g>
    {crack > 0 && <path d="M-180 -290 L-120 -200 L-160 -130 L-90 -60 L-130 0" stroke="#0E1B33" strokeWidth={8} fill="none" opacity={crack} />}
  </g>
)
// # a glowing bridge (a line of light) from a to b, drawn to t; cash bundles travel along it at the given phases
export const LightBridge: React.FC<{ a: [number, number]; b: [number, number]; t: number; o?: number; color?: string; lift?: number }> = ({ a, b, t, o = 1, color = P.gold, lift = 120 }) => {
  const mid: [number, number] = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - lift]
  const pt = (u: number) => ({ x: (1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * mid[0] + u * u * b[0], y: (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * mid[1] + u * u * b[1] })
  const d = Array.from({ length: 41 }, (_, k) => k / 40).filter((u) => u <= t).map((u, k) => `${k ? 'L' : 'M'}${pt(u).x} ${pt(u).y}`).join(' ')
  return <g opacity={o}><path d={d} stroke={color} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.35} /><path d={d} stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" /></g>
}
export const onBridge = (a: [number, number], b: [number, number], u: number, lift = 120) => {
  const mid: [number, number] = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - lift]
  return { x: (1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * mid[0] + u * u * b[0], y: (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * mid[1] + u * u * b[1] }
}
// # a banknote bundle (green), any size
export const Cash: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-30} width={120} height={60} rx={8} fill="#7FC98A" stroke="#3E8A4E" strokeWidth={4} />
    <rect x={-14} y={-30} width={28} height={60} fill="#E9C25A" />
    <circle r={14} fill="#A8DDB0" stroke="#3E8A4E" strokeWidth={3} />
  </g>
)
// # a money tree: trunk + round crown with gold coins; `size` 0–1 grows it, `cut` 0–1 removes a wedge (sold off)
export const MoneyTree: React.FC<{ x: number; y: number; size: number; s?: number; coins?: number; o?: number; dead?: number }> = ({ x, y, size, s = 1, coins = 1, o = 1, dead = 0 }) => {
  const k = Math.max(0.05, size)
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={140 * k + 20} ry={14} fill="#000" opacity={0.18} />
    <rect x={-14 * k - 6} y={-260 * k} width={28 * k + 12} height={260 * k} rx={8} fill="#7A4E2D" />
    <circle cx={0} cy={-300 * k} r={170 * k} fill={dead > 0 ? '#9A8F5A' : '#3DA672'} />
    <circle cx={-90 * k} cy={-250 * k} r={110 * k} fill={dead > 0 ? '#8E844F' : '#36955F'} />
    <circle cx={95 * k} cy={-255 * k} r={115 * k} fill={dead > 0 ? '#8E844F' : '#36955F'} />
    {Array.from({ length: Math.round(12 * coins * Math.min(1, k * 1.4)) }, (_, i) => <g key={i} transform={`translate(${(rnd(i * 3) - 0.5) * 260 * k} ${-300 * k + (rnd(i * 3 + 1) - 0.5) * 220 * k})`}><circle r={18 * Math.max(0.6, k)} fill={P.gold} /><circle r={11 * Math.max(0.6, k)} fill="none" stroke={P.goldD} strokeWidth={3} /></g>)}
  </g>
}
// # a pipe from a to b (with a valve `open` 0–1); `flow` 0–1 shows drops moving toward b
export const Pipe: React.FC<{ a: [number, number]; b: [number, number]; open?: number; flow?: number; f: number; o?: number; color?: string }> = ({ a, b, open = 1, flow = 0, f, o = 1, color = P.coral }) => {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2
  return <g opacity={o}>
    <path d={`M${a[0]} ${a[1]} L${a[0]} ${my} L${b[0]} ${my} L${b[0]} ${b[1]}`} stroke="#8A97AA" strokeWidth={22} fill="none" strokeLinejoin="round" />
    <path d={`M${a[0]} ${a[1]} L${a[0]} ${my} L${b[0]} ${my} L${b[0]} ${b[1]}`} stroke="#5C6F8E" strokeWidth={10} fill="none" strokeLinejoin="round" />
    {flow > 0 && Array.from({ length: 6 }, (_, k) => { const u = ((f / 40 + k / 6) % 1), L1 = Math.abs(my - a[1]), L2 = Math.abs(b[0] - a[0]), L3 = Math.abs(b[1] - my), L = L1 + L2 + L3, d = u * L
      const p = d < L1 ? [a[0], a[1] + Math.sign(my - a[1]) * d] : d < L1 + L2 ? [a[0] + Math.sign(b[0] - a[0]) * (d - L1), my] : [b[0], my + Math.sign(b[1] - my) * (d - L1 - L2)]
      return <circle key={k} cx={p[0]} cy={p[1]} r={9} fill={color} opacity={flow} /> })}
    <g transform={`translate(${mx} ${my})`}><circle r={30} fill="#3A4A66" /><g transform={`rotate(${open * 90})`}><rect x={-26} y={-6} width={52} height={12} rx={6} fill={open > 0.5 ? P.mint : P.coral} /></g></g>
  </g>
}
export const mixP = lerp
