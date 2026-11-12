// ============================================================
// LONG VIDEO — "$100 in 1928: Why Investing Beats Saving Over Time" — objects:
// a company building with a logo-less sign, a share certificate (a pie slice of
// the company), a gold "money mountain", a storm cloud, a race chart drawn from
// the real 1928–2025 yearly values (log scale), dice + magic hat (luck), a rent
// key. Reuses the bank and money-ideas kits. No camera moves (owner r56).
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'
import { HIST } from './data'

const TXT = (size: number) => ({ font: `400 ${size}px "Bebas Neue"` })

// ------------------------------------------------------------ a company building (factory + office), name on a sign; grow 0–1 adds a floor
export const Company: React.FC<{ x: number; y: number; s?: number; o?: number; name?: string; col?: string; grow?: number; glow?: number }> = ({ x, y, s = 1, o = 1, name = 'COMPANY', col = '#5B7DB1', grow = 0, glow = 0 }) => {
  const extra = 90 * clamp01(grow)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {glow > 0 && <ellipse cx={0} cy={-200} rx={260} ry={220} fill={P.gold} opacity={0.22 * glow} />}
      <ellipse cx={0} cy={6} rx={230} ry={16} fill="#000" opacity={0.14} />
      <rect x={-200} y={-260 - extra} width={220} height={260 + extra} rx={8} fill={col} />
      {Array.from({ length: Math.floor((260 + extra - 40) / 60) }, (_, r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-180 + c * 66} y={-240 - extra + r * 60} width={46} height={34} rx={4} fill="#CFE6FF" />))}
      <rect x={20} y={-150} width={190} height={150} fill="#7E8FA8" />
      <path d="M20 -150 L80 -190 L80 -150 L140 -190 L140 -150 L200 -190 L200 -150 Z" fill="#6A7B94" />
      <rect x={150} y={-250} width={30} height={100} fill="#6A7B94" />
      <rect x={60} y={-90} width={60} height={90} fill="#4A5568" />
      <rect x={-190} y={-310 - extra} width={200} height={44} rx={8} fill="#16294A" />
      <text x={-90} y={-279 - extra} textAnchor="middle" fill="#FFFFFF" style={TXT(name.length > 10 ? 26 : 32)}>{name}</text>
    </g>
  )
}

// ------------------------------------------------------------ a share certificate with a pie showing the owned slice
export const Share: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; slice?: number; t?: string }> = ({ x, y, s = 1, o = 1, r = 0, slice = 0.12, t = 'SHARE' }) => {
  const a = Math.PI * 2 * clamp01(slice), ex = 50 * Math.sin(a), ey = -50 * Math.cos(a)
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <rect x={-130} y={-90} width={260} height={180} rx={10} fill="#EAF6EE" stroke="#4E9A68" strokeWidth={5} />
      <text x={-40} y={-36} textAnchor="middle" fill="#2F6E45" style={{ ...TXT(44), letterSpacing: 4 }}>{t}</text>
      {[0, 1].map((k) => <rect key={k} x={-110} y={0 + k * 22} width={130} height={8} rx={4} fill="#B9DCC4" />)}
      <g transform="translate(70 10)"><circle r={50} fill="#B9DCC4" /><path d={`M0 0 L0 -50 A50 50 0 ${slice > 0.5 ? 1 : 0} 1 ${ex} ${ey} Z`} fill="#2FAE6B" /></g>
    </g>
  )
}

// ------------------------------------------------------------ a gold money mountain whose height is h (base width w)
export const Mountain: React.FC<{ x: number; base: number; h: number; w?: number; o?: number }> = ({ x, base, h, w = 520, o = 1 }) => (
  <g opacity={o}>
    <path d={`M${x - w / 2} ${base} Q${x - w / 4} ${base - h * 0.55} ${x} ${base - h} Q${x + w / 4} ${base - h * 0.55} ${x + w / 2} ${base} Z`} fill={P.gold} stroke={P.goldD} strokeWidth={6} />
    {h > 60 && Array.from({ length: 8 }, (_, k) => <circle key={k} cx={x - w * 0.3 + (k % 4) * w * 0.2} cy={base - 30 - Math.floor(k / 4) * Math.min(80, h * 0.3)} r={14} fill={P.goldD} opacity={0.45} />)}
  </g>
)

// ------------------------------------------------------------ a storm cloud with a lightning bolt (strike 0–1)
export const Storm: React.FC<{ x: number; y: number; s?: number; o?: number; strike?: number }> = ({ x, y, s = 1, o = 1, strike = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={150} ry={60} fill="#5C6F8E" /><ellipse cx={-70} cy={-30} rx={80} ry={60} fill="#6E819F" /><ellipse cx={60} cy={-40} rx={90} ry={70} fill="#6E819F" />
    {strike > 0 && <path d="M10 40 L-30 130 L10 130 L-20 230 L60 110 L20 110 L50 40 Z" fill={P.gold} opacity={strike} />}
  </g>
)

// ------------------------------------------------------------ the race chart: log scale $100 → $1.16M, years 1928–2025, lines grow to year `upto`
export const CHART = { x0: 260, x1: 1400, y0: 880, y1: 300 }
const LOG0 = Math.log10(50), LOG1 = Math.log10(2_000_000)
export const cx = (yr: number) => lerp(CHART.x0, CHART.x1, (yr - 1927) / (2025 - 1927))
export const cy = (v: number) => lerp(CHART.y0, CHART.y1, (Math.log10(v) - LOG0) / (LOG1 - LOG0))
export const RaceChart: React.FC<{ upto: number; show: [boolean, boolean, boolean, boolean]; o?: number }> = ({ upto, show, o = 1 }) => {
  const pts = (col: number) => [[1927, 100] as [number, number], ...HIST.filter((r) => r[0] <= upto).map((r) => [r[0], r[col]] as [number, number])]
  const path = (col: number) => pts(col).map(([yr, v], i) => `${i ? 'L' : 'M'}${cx(yr).toFixed(1)} ${cy(v).toFixed(1)}`).join(' ')
  const lines: [number, string, number][] = [[2, '#2FAE6B', 8], [4, '#5B7DB1', 6], [3, P.gold, 6], [5, '#F06B5B', 5]]
  return (
    <g opacity={o}>
      {[100, 1000, 10000, 100000, 1000000].map((v) => <g key={v}><line x1={CHART.x0} x2={CHART.x1} y1={cy(v)} y2={cy(v)} stroke="var(--cc-ink2)" strokeOpacity={0.25} strokeWidth={2} />
        <text x={CHART.x0 - 16} y={cy(v) + 12} textAnchor="end" fill="var(--cc-ink2)" style={TXT(34)}>{v >= 1000000 ? '$1M' : v >= 1000 ? `$${v / 1000}K` : `$${v}`}</text></g>)}
      {[1928, 1950, 1975, 2000, 2025].map((yr) => <text key={yr} x={cx(yr)} y={CHART.y0 + 50} textAnchor="middle" fill="var(--cc-ink2)" style={TXT(34)}>{yr}</text>)}
      <line x1={CHART.x0} x2={CHART.x1} y1={CHART.y0} y2={CHART.y0} stroke="var(--cc-ink)" strokeWidth={4} />
      {lines.map(([col, c, w], k) => show[k] ? <path key={k} d={path(col)} fill="none" stroke={c} strokeWidth={w} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={col === 5 ? '14 10' : undefined} /> : null)}
    </g>
  )
}
// # the value in a column at a (fractional) year
export const valAt = (col: number, yr: number) => { const r = HIST.filter((h) => h[0] <= yr).pop(); return r ? r[col] : 100 }
