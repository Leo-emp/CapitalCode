// ============================================================
// LONG VIDEO — "Why Companies Buy Back Their Own Stock" — objects for
// this story: the pizza (a company cut into slices = shares; slices pull
// out, tear in two, and widen when there are fewer of them), a share
// certificate, a stack of shares that shrinks, the stock-market board,
// a glass ring headquarters, a shredder, a harbour with a lighthouse and
// a clock. The cast, headline and coin helpers come from ../aimoney/common;
// the till, banknote and small figures from ../gift/kit. One file per scene.
// ============================================================
import React from 'react'
import { lerp, P } from '../kit'

// ------------------------------------------------------------ the pizza
// # one wedge from angle a0 to a1 (degrees, 0 = up, clockwise) of radius r: crust rim, cheese, a few pepperoni
const pt = (r: number, deg: number) => { const a = (deg - 90) * Math.PI / 180; return [r * Math.cos(a), r * Math.sin(a)] }
const wedge = (r: number, a0: number, a1: number) => { const [x0, y0] = pt(r, a0), [x1, y1] = pt(r, a1); return `M0 0 L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z` }
export const Wedge: React.FC<{ r: number; a0: number; a1: number; tint?: string; hi?: number }> = ({ r, a0, a1, tint, hi = 0 }) => {
  const mid = (a0 + a1) / 2, span = a1 - a0
  const dots = [[0.62, 0], [0.38, -0.22], [0.8, 0.28], [0.8, -0.3]].filter(([, k]) => Math.abs(k) * 2 < 1)
  return (
    <g>
      <path d={wedge(r, a0, a1)} fill="#D9963F" />
      <path d={wedge(r * 0.88, a0 + 0.6, a1 - 0.6)} fill="#F6C94E" />
      <path d={wedge(r * 0.88, a0 + 0.6, a1 - 0.6)} fill="#FFE07A" opacity={0.35} transform="translate(-4 -4)" />
      {dots.map(([d, k], i) => { const [x, y] = pt(r * d, mid + k * span); return <circle key={i} cx={x} cy={y} r={r * 0.07} fill="#C8452F" /> })}
      {tint && <path d={wedge(r, a0, a1)} fill={tint} opacity={0.28} />}
      {hi > 0 && <path d={wedge(r, a0, a1)} fill="none" stroke="#FFFFFF" strokeWidth={8} opacity={hi} strokeLinejoin="round" />}
    </g>
  )
}
// # the whole pizza: n slices each `width` degrees (default 360/n); per slice: pull (0–1 outward), o (opacity), tint, hi.
// # spin turns the pizza; a board under it
export type SliceFx = { pull?: number; o?: number; tint?: string; hi?: number; dx?: number; dy?: number; rot?: number; a0?: number; w?: number }
export const Pizza: React.FC<{ x: number; y: number; r: number; n: number; width?: number; fx?: (k: number) => SliceFx; spin?: number; o?: number; board?: number }> = ({ x, y, r, n, width, fx, spin = 0, o = 1, board = 1 }) => {
  const w = width ?? 360 / n
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      {board > 0 && <g opacity={board}><ellipse cx={0} cy={r * 0.16} rx={r * 1.16} ry={r * 1.12} fill="#000" opacity={0.18} /><circle r={r * 1.1} fill="#B98252" /><circle r={r * 1.1} fill="none" stroke="#8E5E36" strokeWidth={10} /></g>}
      <g transform={`rotate(${spin})`}>
        {Array.from({ length: n }, (_, k) => {
          const e = fx?.(k) ?? {}, sw = e.w ?? w, a0 = e.a0 ?? k * w, mid = a0 + sw / 2, [px, py] = pt(r * 0.32 * (e.pull ?? 0), mid)
          if ((e.o ?? 1) <= 0.001) return null
          return <g key={k} opacity={e.o ?? 1} transform={`translate(${px + (e.dx ?? 0)} ${py + (e.dy ?? 0)}) rotate(${e.rot ?? 0})`}><Wedge r={r} a0={a0} a1={a0 + sw} tint={e.tint} hi={e.hi} /></g>
        })}
      </g>
    </g>
  )
}
// # one slice on its own (pointing up), torn in two by `tear` 0–1: the halves fly apart and spin
export const LoneSlice: React.FC<{ x: number; y: number; r: number; w?: number; tear?: number; o?: number; rot?: number; tint?: string }> = ({ x, y, r, w = 36, tear = 0, o = 1, rot = 0, tint }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {tear <= 0 ? <g transform={`translate(0 ${r * 0.5})`}><Wedge r={r} a0={-w / 2} a1={w / 2} tint={tint} /></g> : <>
      <g transform={`translate(${-tear * 160} ${r * 0.5 + tear * 120}) rotate(${-tear * 50})`} opacity={1 - tear * 0.6}><Wedge r={r} a0={-w / 2} a1={0} tint={tint} /></g>
      <g transform={`translate(${tear * 160} ${r * 0.5 + tear * 140}) rotate(${tear * 60})`} opacity={1 - tear * 0.6}><Wedge r={r} a0={0} a1={w / 2} tint={tint} /></g>
    </>}
  </g>
)

// ------------------------------------------------------------ shares on paper
// # a share certificate: cream paper, a seal, SHARE and a name; tear 0–1 rips it in two
export const Share: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; name?: string; tear?: number; color?: string }> = ({ x, y, s = 1, r = 0, o = 1, name = 'SHARE', tear = 0, color = '#2E6FB8' }) => {
  const body = (clip?: string) => (
    <g clipPath={clip}>
      <rect x={-150} y={-100} width={300} height={200} rx={14} fill="#FFF8E6" stroke="#D6C08E" strokeWidth={4} />
      <rect x={-134} y={-84} width={268} height={168} rx={8} fill="none" stroke={color} strokeWidth={5} />
      <text x={0} y={-24} textAnchor="middle" fill={color} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 6 }}>{name}</text>
      <rect x={-90} y={8} width={180} height={10} rx={5} fill="#D6C08E" /><rect x={-70} y={30} width={140} height={10} rx={5} fill="#D6C08E" />
      <circle cx={96} cy={58} r={24} fill={P.coral} /><circle cx={96} cy={58} r={14} fill="none" stroke="#FFFFFF" strokeWidth={3} />
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <rect x={-150} y={-100} width={300} height={200} rx={14} fill="#000" opacity={0.15 * (1 - tear)} transform="translate(8 10)" />
      {tear <= 0 ? body() : <>
        <defs><clipPath id="shL"><path d="M-160 -110 L6 -110 L-12 -40 L10 20 L-8 110 L-160 110 Z" /></clipPath><clipPath id="shR"><path d="M6 -110 L160 -110 L160 110 L-8 110 L10 20 L-12 -40 Z" /></clipPath></defs>
        <g transform={`translate(${-tear * 140} ${tear * 60}) rotate(${-tear * 30})`} opacity={1 - tear * 0.7}>{body('url(#shL)')}</g>
        <g transform={`translate(${tear * 140} ${tear * 80}) rotate(${tear * 34})`} opacity={1 - tear * 0.7}>{body('url(#shR)')}</g>
      </>}
    </g>
  )
}
// # a stack of share papers seen from the side: h = height in px; a label under it
export const ShareStack: React.FC<{ x: number; y: number; h: number; w?: number; o?: number; color?: string }> = ({ x, y, h, w = 220, o = 1, color = '#2E6FB8' }) => {
  const n = Math.max(1, Math.round(h / 14))
  return (
    <g opacity={o}>
      <rect x={x - w / 2 + 10} y={y - h + 10} width={w} height={h} rx={8} fill="#000" opacity={0.16} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} rx={8} fill="#FFF8E6" />
      {Array.from({ length: n }, (_, k) => <rect key={k} x={x - w / 2} y={y - (k + 1) * (h / n)} width={w} height={3} fill="#D6C08E" />)}
      <rect x={x - w / 2} y={y - h} width={w} height={18} rx={6} fill={color} />
    </g>
  )
}

// ------------------------------------------------------------ the market
// # the stock-market board: a dark panel with rows of tickers; `hi` lights the row of the company buying
export const Board: React.FC<{ x: number; y: number; s?: number; o?: number; hi?: number; f: number }> = ({ x, y, s = 1, o = 1, hi = 0, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-330} y={-210} width={660} height={420} rx={22} fill="#0D1424" />
    <rect x={-330} y={-210} width={660} height={70} rx={22} fill="#1E2C48" />
    <text x={0} y={-160} textAnchor="middle" fill="#9FB4D6" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 6 }}>STOCK MARKET</text>
    {Array.from({ length: 4 }, (_, k) => {
      const up = (k + Math.floor(f / 20)) % 3 !== 1
      return <g key={k} transform={`translate(0 ${-90 + k * 76})`}>
        {k === 0 && hi > 0 && <rect x={-310} y={-34} width={620} height={64} rx={12} fill={P.gold} opacity={0.3 * hi} />}
        <rect x={-290} y={-14} width={[150, 120, 170, 130][k]} height={22} rx={8} fill="#5C6F8E" />
        <path d={up ? 'M190 8 L210 -16 L230 8 Z' : 'M190 -16 L210 8 L230 -16 Z'} fill={up ? P.mint : P.coral} />
        <rect x={244} y={-14} width={50} height={22} rx={8} fill={up ? P.mint : P.coral} opacity={0.7} />
      </g>
    })}
  </g>
)
// # a big company: a glass ring headquarters with a name banner
export const Ring: React.FC<{ x: number; y: number; s?: number; o?: number; name?: string }> = ({ x, y, s = 1, o = 1, name = 'APPLE' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={40} rx={330} ry={70} fill="#000" opacity={0.15} />
    <ellipse cx={0} cy={0} rx={300} ry={110} fill="#BFD9EE" />
    <ellipse cx={0} cy={-40} rx={300} ry={110} fill="#E8F3FB" />
    <ellipse cx={0} cy={-40} rx={210} ry={66} fill="#7BB86A" />
    <path d="M-300 -40 L-300 0 A300 110 0 0 0 300 0 L300 -40 A300 110 0 0 1 -300 -40 Z" fill="#9CC4E4" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-280 + k * 48} y={-12 + Math.sin((k / 11) * Math.PI) * 60} width={6} height={36} fill="#FFFFFF" opacity={0.6} />)}
    <rect x={-120} y={-230} width={240} height={70} rx={16} fill={P.navy2} />
    <text x={0} y={-180} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 54px "Bebas Neue"', letterSpacing: 6 }}>{name}</text>
  </g>
)
// # a paper shredder: papers go in the top (feed 0–1) and strips fall out
export const Shredder: React.FC<{ x: number; y: number; s?: number; o?: number; strips?: number }> = ({ x, y, s = 1, o = 1, strips = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {strips > 0 && Array.from({ length: 7 }, (_, k) => <rect key={k} x={-120 + k * 36} y={60} width={18} height={lerp(0, 140 + (k % 3) * 30, strips)} rx={4} fill="#FFF8E6" stroke="#D6C08E" strokeWidth={2} />)}
    <rect x={-170} y={-60} width={340} height={130} rx={22} fill="#3A4660" />
    <rect x={-150} y={-74} width={300} height={24} rx={10} fill="#1B2233" />
    <rect x={-170} y={-60} width={340} height={30} rx={16} fill="#FFFFFF" opacity={0.1} />
    <circle cx={120} cy={20} r={14} fill={P.mint} />
  </g>
)

// ------------------------------------------------------------ the rules
// # a harbour: a lighthouse on a rock, a calm bay and a small boat; storm 0–1 makes the waves outside high
export const Harbour: React.FC<{ x: number; y: number; s?: number; o?: number; boat?: number; light?: number; f: number }> = ({ x, y, s = 1, o = 1, boat = 0, light = 0, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-520 80 Q-260 40 0 80 T520 80 L520 220 L-520 220 Z" fill="#2A8FD0" />
    {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M${-480 + k * 170} ${110 + Math.sin(f / 9 + k) * 6} q30 -18 60 0`} stroke="#9FDCFF" strokeWidth={6} fill="none" strokeLinecap="round" />)}
    <path d="M-520 80 L-300 80 L-260 20 L-180 30 L-150 80" fill="#6B5A48" />
    <path d="M180 80 L240 -10 L330 -20 L400 80 Z" fill="#6B5A48" />
    {/* # lighthouse */}
    <path d="M250 -10 L270 -250 L320 -250 L340 -10 Z" fill="#F7FAFF" />
    <rect x={262} y={-200} width={70} height={30} fill={P.coral} /><rect x={256} y={-110} width={82} height={30} fill={P.coral} />
    <rect x={262} y={-300} width={66} height={50} rx={8} fill="#2B4A78" /><rect x={274} y={-292} width={42} height={34} rx={6} fill={P.gold} opacity={0.5 + 0.5 * light} />
    {light > 0 && <path d="M295 -275 L-120 -380 L-120 -170 Z" fill={P.gold} opacity={0.22 * light} />}
    {/* # the boat sails in from the left */}
    <g transform={`translate(${lerp(-460, 20, boat)} ${70 + Math.sin(f / 11) * 4})`}>
      <path d="M-90 0 L90 0 L60 40 L-60 40 Z" fill="#B8433A" /><rect x={-4} y={-150} width={8} height={150} fill="#5C4A3A" />
      <path d="M8 -146 L90 -20 L8 -20 Z" fill="#F7FAFF" /><path d="M-8 -120 L-70 -20 L-8 -20 Z" fill="#E6EEF8" />
    </g>
  </g>
)
// # a wall clock; t (0–1) moves the minute hand round from 3:30 to 4:00
export const Clock: React.FC<{ x: number; y: number; s?: number; o?: number; t?: number; warn?: number }> = ({ x, y, s = 1, o = 1, t = 0, warn = 0 }) => {
  const m = lerp(180, 360, t)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <circle r={150} fill="#000" opacity={0.15} transform="translate(8 10)" />
      <circle r={150} fill="#FFFDF8" stroke={P.navy2} strokeWidth={14} />
      {warn > 0 && <path d={`M0 0 L0 -136 A136 136 0 0 1 ${136 * Math.sin(-Math.PI / 6)} ${-136 * Math.cos(Math.PI / 6)} Z`} fill={P.coral} opacity={0.35 * warn} transform="rotate(60)" />}
      {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-4} y={-136} width={8} height={22} rx={3} fill={P.navy2} transform={`rotate(${k * 30})`} />)}
      <rect x={-7} y={-80} width={14} height={86} rx={7} fill={P.navy2} transform={`rotate(${105 + t * 15})`} />
      <rect x={-5} y={-118} width={10} height={124} rx={5} fill={P.coralD} transform={`rotate(${m})`} />
      <circle r={12} fill={P.navy2} />
    </g>
  )
}
