// ============================================================
// BIG ILLUSTRATED CHARTS + small shared pieces (owner 2026-10-25:
// "show big charts illustrations when talking about numbers,
// increasing, decreasing or trends"). Premium finish: rounded bars
// with a lit edge and soft shadow, lines that draw themselves with a
// glowing head, donuts that sweep, numbers that count as they're said.
// ============================================================
import React from 'react'
import { clamp01, easeOut, lerp, P, rnd, settle } from './kit'

// # "37.9%" shown at progress p (same decimals as the target)
export const countTo = (v: number, p: number, dec = 0, pre = '', post = '') => `${pre}${(v * clamp01(p)).toFixed(dec)}${post}`

export const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number; o?: number; font?: 'Inter' | 'Bebas Neue' }> = ({ x, y, text, size = 40, color = P.white, anchor = 'middle', weight = 700, o = 1, font = 'Inter' }) => (
  <text x={x} y={y} textAnchor={anchor} fill={color} opacity={o} style={{ font: `${weight} ${size}px "${font}"`, letterSpacing: font === 'Bebas Neue' ? 1 : 0 }}>{text}</text>
)

// ------------------------------------------------------------ vertical bars: grow one by one on their cue
export type Bar = { label: string; value: number; color?: string; at: number; text?: string }
export const BigBars: React.FC<{ f: number; x: number; y: number; w: number; h: number; bars: Bar[]; max: number; dec?: number; unit?: string; pre?: string }> = ({ f, x, y, w, h, bars, max, dec = 0, unit = '', pre = '' }) => {
  const gap = w / bars.length, bw = Math.min(160, gap * 0.62)
  return (
    <g>
      <rect x={x - 20} y={y} width={w + 40} height={6} rx={3} fill={P.champ} opacity={0.5} />
      {bars.map((b, i) => {
        const p = settle(clamp01((f - b.at) / 22)), bh = (b.value / max) * h * p, cx = x + gap * (i + 0.5)
        return (
          <g key={i} opacity={f >= b.at - 2 ? 1 : 0}>
            <ellipse cx={cx} cy={y + 4} rx={bw * 0.65} ry={10} fill="#000" opacity={0.18} />
            <rect x={cx - bw / 2} y={y - bh} width={bw} height={bh} rx={14} fill={b.color ?? P.sky} />
            <rect x={cx - bw / 2} y={y - bh} width={bw * 0.3} height={bh} rx={14} fill="#FFFFFF" opacity={0.18} />
            <Label x={cx} y={y - bh - 22} text={b.text ?? countTo(b.value, easeOut(clamp01((f - b.at) / 22)), dec, pre, unit)} size={52} font="Bebas Neue" color={P.champL} o={p} />
            <Label x={cx} y={y + 56} text={b.label} size={34} color={P.white} o={clamp01((f - b.at) / 10)} />
          </g>
        )
      })}
    </g>
  )
}

// ------------------------------------------------------------ horizontal ranking bars (a leaderboard that builds)
export const RankBars: React.FC<{ f: number; x: number; y: number; w: number; rowH?: number; rows: Bar[]; max: number; dec?: number; unit?: string }> = ({ f, x, y, w, rowH = 62, rows, max, dec = 1, unit = '%' }) => (
  <g>
    {rows.map((r, i) => {
      const p = settle(clamp01((f - r.at) / 18)), bw = (r.value / max) * w * p, yy = y + i * rowH
      return (
        <g key={i} opacity={clamp01((f - r.at + 3) / 6)} transform={`translate(${(1 - clamp01((f - r.at) / 10)) * -40} 0)`}>
          <Label x={x - 24} y={yy + rowH * 0.62} text={r.label} size={34} anchor="end" />
          <rect x={x} y={yy + 8} width={Math.max(8, bw)} height={rowH - 20} rx={(rowH - 20) / 2} fill={r.color ?? P.sky} />
          <rect x={x} y={yy + 8} width={Math.max(8, bw)} height={(rowH - 20) * 0.35} rx={(rowH - 20) / 4} fill="#FFFFFF" opacity={0.2} />
          <Label x={x + bw + 18} y={yy + rowH * 0.64} text={countTo(r.value, easeOut(clamp01((f - r.at) / 18)), dec, '', unit)} size={36} anchor="start" font="Bebas Neue" color={P.champL} />
        </g>
      )
    })}
  </g>
)

// ------------------------------------------------------------ a line that draws itself, with a glowing head and soft area
export const BigLine: React.FC<{ f: number; x: number; y: number; w: number; h: number; values: number[]; min: number; max: number; from: number; to: number; color?: string; area?: boolean; width?: number }> = ({ f, x, y, w, h, values, min, max, from, to, color = P.mint, area = true, width = 10 }) => {
  const p = clamp01((f - from) / Math.max(1, to - from)), n = values.length - 1
  const pt = (i: number) => ({ x: x + (i / n) * w, y: y + h - ((values[i] - min) / (max - min)) * h })
  // # cut the line at progress p (interpolating inside the current segment)
  const k = p * n, last = Math.floor(k), pts = Array.from({ length: last + 1 }, (_, i) => pt(i))
  if (last < n) { const a = pt(last), b = pt(last + 1), t = k - last; pts.push({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }) }
  const d = pts.map((q, i) => `${i ? 'L' : 'M'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' '), head = pts[pts.length - 1]
  return (
    <g opacity={f >= from ? 1 : 0}>
      {[0.25, 0.5, 0.75].map((g) => <rect key={g} x={x} y={y + h * g} width={w} height={2} fill={P.white} opacity={0.08} />)}
      <rect x={x} y={y + h} width={w} height={4} rx={2} fill={P.champ} opacity={0.5} />
      {area && pts.length > 1 && <path d={`${d} L${head.x} ${y + h} L${x} ${y + h} Z`} fill={color} opacity={0.18} />}
      <path d={d} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={head.x} cy={head.y} r={width * 2.6} fill={color} opacity={0.25} /><circle cx={head.x} cy={head.y} r={width * 1.1} fill={P.white} />
    </g>
  )
}

// ------------------------------------------------------------ donut that sweeps in, one highlighted slice
export const Donut: React.FC<{ cx: number; cy: number; r: number; part: number; p: number; color?: string; rest?: string; thick?: number }> = ({ cx, cy, r, part, p, color = P.gold, rest = P.navy4, thick = 70 }) => {
  const a = (Math.min(99.9, part) / 100) * Math.PI * 2 * clamp01(p)
  const arcD = (a0: number, a1: number) => {
    const q = (a: number, rr: number) => [cx + rr * Math.sin(a), cy - rr * Math.cos(a)]
    const [x0, y0] = q(a0, r), [x1, y1] = q(a1, r), [x2, y2] = q(a1, r - thick), [x3, y3] = q(a0, r - thick), big = a1 - a0 > Math.PI ? 1 : 0
    return `M${x0} ${y0} A${r} ${r} 0 ${big} 1 ${x1} ${y1} L${x2} ${y2} A${r - thick} ${r - thick} 0 ${big} 0 ${x3} ${y3} Z`
  }
  return (
    <g>
      <circle cx={cx} cy={cy + 10} r={r} fill="#000" opacity={0.15} />
      <path d={arcD(0, Math.PI * 2 - 0.0001)} fill={rest} />
      {a > 0.001 && <path d={arcD(0, a)} fill={color} />}
    </g>
  )
}

// ------------------------------------------------------------ a dot grid where a few light up (e.g. "the best 4%")
export const DotGrid: React.FC<{ f: number; x: number; y: number; cols: number; rows: number; gap?: number; lit: Set<number>; at: number; litAt: number; dimLeft?: boolean }> = ({ f, x, y, cols, rows, gap = 36, lit, at, litAt }) => (
  <g>
    {Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols), appear = settle(clamp01((f - at - (c + r) * 0.6) / 10)), on = lit.has(i) ? easeOut(clamp01((f - litAt) / 14)) : 0
      return <circle key={i} cx={x + c * gap} cy={y + r * gap} r={(11 + on * 7) * appear} fill={on > 0 ? P.gold : P.navy4} opacity={on > 0 ? 1 : 1 - 0.5 * easeOut(clamp01((f - litAt) / 14))} />
    })}
  </g>
)

// ------------------------------------------------------------ a stack of coins that builds up to n coins at progress p
export const CoinStack: React.FC<{ x: number; y: number; n: number; p?: number; s?: number }> = ({ x, y, n, p = 1, s = 1 }) => {
  const k = Math.round(n * clamp01(p))
  return (
    <g>
      <ellipse cx={x} cy={y + 6 * s} rx={30 * s} ry={9 * s} fill="#000" opacity={0.2} />
      {Array.from({ length: k }, (_, i) => <g key={i}><ellipse cx={x} cy={y - i * 9 * s} rx={26 * s} ry={9 * s} fill={P.goldD} /><ellipse cx={x} cy={y - i * 9 * s - 3 * s} rx={26 * s} ry={9 * s} fill={P.gold} /></g>)}
    </g>
  )
}

// ------------------------------------------------------------ a price tag with a hole and string
export const PriceTag: React.FC<{ x: number; y: number; text: string; s?: number; r?: number; color?: string }> = ({ x, y, text, s = 1, r = -8, color = P.cream }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-110 -50 L80 -50 L130 0 L80 50 L-110 50 Q-120 50 -120 40 L-120 -40 Q-120 -50 -110 -50 Z" fill={color} />
    <circle cx={86} cy={0} r={10} fill={P.navy1} />
    <text x={-20} y={18} textAnchor="middle" fill={P.navy0} style={{ font: '400 60px "Bebas Neue"' }}>{text}</text>
  </g>
)

// ------------------------------------------------------------ split-screen panels that slide in one by one
export const Panels: React.FC<{ f: number; n: number; at: number[]; colors: string[]; children: (i: number, box: { x: number; y: number; w: number; h: number }) => React.ReactNode }> = ({ f, n, at, colors, children }) => {
  const w = 1920 / n
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const p = easeOut(clamp01((f - at[i]) / 14))
        if (p <= 0) return null
        const box = { x: i * w, y: 0, w, h: 1080 }
        return (
          <g key={i} transform={`translate(0 ${(1 - p) * 1080})`}>
            <rect x={box.x} y={0} width={w + 1} height={1080} fill={colors[i % colors.length]} />
            {children(i, box)}
          </g>
        )
      })}
    </g>
  )
}

// ------------------------------------------------------------ a little calendar page that flips (years / months passing)
export const Calendar: React.FC<{ x: number; y: number; text: string; s?: number; flip?: number }> = ({ x, y, text, s = 1, flip = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-80} width={140} height={160} rx={14} fill={P.cream} />
    <rect x={-70} y={-80} width={140} height={42} rx={14} fill={P.coral} />
    <text x={0} y={46} textAnchor="middle" fill={P.navy0} style={{ font: '400 64px "Bebas Neue"' }}>{text}</text>
    {flip > 0 && flip < 1 && <rect x={-70} y={-38} width={140} height={118 * (1 - flip)} fill={P.cream} opacity={0.9} />}
  </g>
)

// # deterministic scatter used by several pieces
export const scatter = (n: number, seed: number, w: number, h: number) => Array.from({ length: n }, (_, i) => ({ x: rnd(seed + i * 2) * w, y: rnd(seed + i * 2 + 1) * h }))
