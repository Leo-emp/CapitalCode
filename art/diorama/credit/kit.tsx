// # Shared drawings for "How Credit Scores Actually Work".
// Every prop is drawn around its own origin (bottom centre for things that stand, centre for flat things), so a scene
// can place, scale and animate it with one transform.
import React from 'react'
import { P } from '../kit'

export const TXT = (size: number, w = 400): React.CSSProperties => ({ font: `${w} ${size}px "Bebas Neue"`, letterSpacing: 1 })
export const RED = '#E5634F', RED_D = '#B7402F', GREEN = '#3DBE84', GREEN_D = '#23935F', GOLD = '#E9C25A', BLUE = '#4F78AA', INK = '#16294A', CREAM = '#FFF6E2'

// ---------------------------------------------------------------- a credit card; `used` 0–1 fills a balance bar under it, `cut` 0–1 splits it in two
export const Card: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; col?: string; used?: number; bar?: boolean; label?: string; cut?: number }> = ({ x, y, s = 1, o = 1, r = 0, col = '#3A6EA8', used = 0, bar = false, label, cut = 0 }) => {
  const barCol = used > 0.6 ? RED : used > 0.3 ? GOLD : GREEN
  const half = (side: number) => (
    <g transform={`translate(${side * 40 * cut} ${side * 20 * cut}) rotate(${side * 10 * cut})`}>
      <clipPath id={`cc-half-${side}-${Math.round(x)}-${Math.round(y)}`}><rect x={side < 0 ? -200 : 0} y={-130} width={200} height={260} /></clipPath>
      <g clipPath={cut > 0 ? `url(#cc-half-${side}-${Math.round(x)}-${Math.round(y)})` : undefined}>
        <rect x={-170} y={-108} width={340} height={216} rx={22} fill={col} />
        <rect x={-170} y={-60} width={340} height={40} fill="#1D2A44" opacity={0.55} />
        <rect x={-140} y={0} width={56} height={42} rx={8} fill={GOLD} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={-140 + k * 74} y={62} width={56} height={14} rx={7} fill="#FFFFFF" opacity={0.75} />)}
        {label && <text x={150} y={-74} textAnchor="end" fill="#FFFFFF" style={TXT(34)}>{label}</text>}
      </g>
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {cut > 0 ? <>{half(-1)}{half(1)}</> : half(0)}
      {bar && <g transform="translate(0 150)">
        <rect x={-170} y={-18} width={340} height={36} rx={18} fill="#FFFFFF" stroke="#C9D3E0" strokeWidth={3} />
        <rect x={-166} y={-14} width={332 * Math.max(0, Math.min(1, used))} height={28} rx={14} fill={barCol} />
      </g>}
    </g>
  )
}

// ---------------------------------------------------------------- the score meter: a 300–850 arc with FICO's bands; `v` = the score the needle shows
const BANDS: [number, number, string, string][] = [[300, 580, '#E5634F', 'POOR'], [580, 670, '#F28C6B', 'FAIR'], [670, 740, '#F4C95D', 'GOOD'], [740, 800, '#8FD0A2', 'VERY GOOD'], [800, 850, '#3DBE84', 'EXCEPTIONAL']]
export const Meter: React.FC<{ x: number; y: number; s?: number; o?: number; v: number; show?: string; bands?: number; ends?: number; lit?: number[] }> = ({ x, y, s = 1, o = 1, v, show, bands = 1, ends = 1, lit = [] }) => {
  const ang = (val: number) => Math.PI * (1 - (Math.max(300, Math.min(850, val)) - 300) / 550)
  const pt = (val: number, r: number) => [r * Math.cos(ang(val)), -r * Math.sin(ang(val))]
  const arc = (a: number, b: number, r: number) => { const [x0, y0] = pt(a, r), [x1, y1] = pt(b, r); return `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}` }
  const [nx, ny] = pt(v, 240)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M-340 0 A340 340 0 0 1 340 0 Z" fill="#FFFFFF" stroke="#E2D3B4" strokeWidth={8} />
      <path d={arc(300, 850, 290)} fill="none" stroke="#E8E1D2" strokeWidth={60} />
      {BANDS.map(([a, b, col], k) => <path key={k} d={arc(a, b, 290)} fill="none" stroke={col} strokeWidth={60 + 14 * (lit[k] ?? 0)} opacity={bands} />)}
      <line x1={0} y1={0} x2={nx} y2={ny} stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <circle r={28} fill={INK} />
      <g opacity={ends}><text x={-290} y={52} textAnchor="middle" fill={INK} style={TXT(48)}>300</text><text x={290} y={52} textAnchor="middle" fill={INK} style={TXT(48)}>850</text></g>
      {show && <text x={v >= 575 ? -120 : 120} y={-80} textAnchor="middle" fill={INK} style={TXT(120)}>{show}</text>}
    </g>
  )
}
export const BAND_NAMES = BANDS

// ---------------------------------------------------------------- a credit bureau: an archive building full of files, with its name on top
export const Bureau: React.FC<{ x: number; y: number; s?: number; o?: number; name: string; col?: string; glow?: number }> = ({ x, y, s = 1, o = 1, name, col = '#7FA8D8', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse cx={0} cy={-170} rx={220} ry={220} fill={P.gold} opacity={0.25 * glow} />}
    <rect x={-160} y={-300} width={320} height={300} rx={12} fill="#F3EAD8" stroke="#D6C7A6" strokeWidth={4} />
    <rect x={-180} y={-340} width={360} height={56} rx={10} fill={col} />
    <text x={0} y={-298} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>{name}</text>
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <g key={`${r}${c}`}><rect x={-130 + c * 90} y={-260 + r * 80} width={80} height={66} rx={6} fill="#D9CDB3" /><rect x={-104 + c * 90} y={-232 + r * 80} width={28} height={8} rx={4} fill="#8E7A5A" /></g>))}
  </g>
)

// ---------------------------------------------------------------- the formula machine: a box with turning gears, a slot on the left (input) and a screen (output)
export const Machine: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; run?: number; screen?: string; name?: string }> = ({ x, y, s = 1, o = 1, f = 0, run = 0, screen = '', name = 'FORMULA' }) => {
  const Gear: React.FC<{ cx: number; cy: number; r: number; dir: number }> = ({ cx, cy, r, dir }) => (
    <g transform={`translate(${cx} ${cy}) rotate(${dir * f * 3 * run})`}>
      {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-r * 0.16} y={-r - 12} width={r * 0.32} height={24} rx={4} fill="#B88A2E" transform={`rotate(${k * 36})`} />)}
      <circle r={r} fill={GOLD} stroke="#B88A2E" strokeWidth={6} /><circle r={r * 0.3} fill="#B88A2E" />
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-230} y={-380} width={460} height={380} rx={26} fill="#5C6F8E" stroke="#3E4E69" strokeWidth={8} />
      <rect x={-250} y={-200} width={40} height={90} rx={8} fill="#3E4E69" />
      <rect x={-180} y={-340} width={360} height={130} rx={14} fill="#1D2A44" />
      <text x={0} y={-252} textAnchor="middle" fill="#7DF0B0" style={TXT(90)}>{screen}</text>
      <Gear cx={-90} cy={-110} r={56} dir={1} /><Gear cx={50} cy={-90} r={40} dir={-1} /><Gear cx={150} cy={-130} r={30} dir={1} />
      <text x={0} y={-400} textAnchor="middle" fill={P.ink} style={TXT(54)}>{name}</text>
    </g>
  )
}

// ---------------------------------------------------------------- a credit report: rows of payment marks (1 = on time ✓, 0 = late ✗), optional title
export const Report: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; marks?: number[]; title?: string; glow?: number; col?: string }> = ({ x, y, s = 1, o = 1, r = 0, marks = [], title = 'CREDIT REPORT', glow = 0, col = '#FFFDF5' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-175} y={-225} width={350} height={450} rx={26} fill={P.gold} opacity={0.35 * glow} />}
    <rect x={-150} y={-200} width={300} height={400} rx={16} fill={col} stroke="#D6C7A6" strokeWidth={4} />
    <text x={0} y={-140} textAnchor="middle" fill={INK} style={TXT(44)}>{title}</text>
    {Array.from({ length: 5 }, (_, k) => <rect key={k} x={-110} y={-100 + k * 34} width={150 - (k % 2) * 40} height={12} rx={6} fill="#C9B79A" />)}
    {marks.map((m, k) => <g key={k} transform={`translate(${-110 + (k % 6) * 44} ${90 + Math.floor(k / 6) * 44})`}>
      <rect x={-16} y={-16} width={32} height={32} rx={6} fill={m ? '#DDF3E6' : '#FBE0DA'} />
      {m ? <path d="M-9 0 l6 7 l12 -14" fill="none" stroke={GREEN} strokeWidth={5} strokeLinecap="round" /> : <path d="M-8 -8 l16 16 M8 -8 l-16 16" stroke={RED} strokeWidth={5} strokeLinecap="round" />}
    </g>)}
  </g>
)

// ---------------------------------------------------------------- an application form (a new-credit check)
export const Form: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-105} width={160} height={210} rx={10} fill="#FFFFFF" stroke="#C9D3E0" strokeWidth={4} />
    <text x={0} y={-66} textAnchor="middle" fill={BLUE} style={TXT(30)}>APPLY</text>
    {[0, 1, 2, 3].map((k) => <g key={k}><rect x={-56} y={-40 + k * 34} width={18} height={18} rx={3} fill="none" stroke="#9FB0C8" strokeWidth={3} /><rect x={-28} y={-36 + k * 34} width={84} height={10} rx={5} fill="#C9D3E0" /></g>)}
  </g>
)

// ---------------------------------------------------------------- small objects: laptop, graduation cap, birthday cake, briefcase, piggy-bank vault, stopwatch, scissors
export const Laptop: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-150} width={220} height={140} rx={10} fill="#2F3E66" /><rect x={-96} y={-138} width={192} height={116} rx={6} fill="#7FA8D8" />
    <path d="M-140 -10 L140 -10 L120 10 L-120 10 Z" fill="#9FB0C8" />
  </g>
)
export const Cap: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-60 -40 L-60 0 Q0 30 60 0 L60 -40 Z" fill="#2F3E66" /><path d="M-120 -60 L0 -110 L120 -60 L0 -10 Z" fill="#1D2A44" />
    <path d="M90 -62 L90 10" stroke={GOLD} strokeWidth={6} /><circle cx={90} cy={14} r={10} fill={GOLD} />
  </g>
)
export const Cake: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-100} width={180} height={100} rx={12} fill="#F4B6C2" /><path d="M-90 -80 q22 24 45 0 q22 24 45 0 q22 24 45 0 q22 24 45 0" fill="#FFFFFF" />
    {[-40, 0, 40].map((cx) => <g key={cx}><rect x={cx - 6} y={-150} width={12} height={50} rx={4} fill="#7FA8D8" /><path d={`M${cx} -172 q10 12 0 20 q-10 -8 0 -20`} fill={GOLD} /></g>)}
  </g>
)
export const Briefcase: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-40} y={-150} width={80} height={36} rx={12} fill="none" stroke="#6E5236" strokeWidth={12} />
    <rect x={-110} y={-120} width={220} height={120} rx={16} fill="#8E5B3A" /><rect x={-110} y={-80} width={220} height={10} fill="#6E5236" />
  </g>
)
export const Vault: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '$1,000,000' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-260} width={260} height={260} rx={20} fill="#8BA0BF" stroke="#5C6F8E" strokeWidth={8} />
    <circle cx={0} cy={-140} r={70} fill="#5C6F8E" /><circle cx={0} cy={-140} r={46} fill="#8BA0BF" />
    {[0, 60, 120].map((a) => <line key={a} x1={0} y1={-140} x2={46 * Math.cos((a * Math.PI) / 180)} y2={-140 + 46 * Math.sin((a * Math.PI) / 180)} stroke="#5C6F8E" strokeWidth={8} />)}
    <text x={0} y={-30} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>{t}</text>
  </g>
)
export const Stopwatch: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number }> = ({ x, y, s = 1, o = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-16} y={-140} width={32} height={26} rx={6} fill="#5C6F8E" />
    <circle cy={-40} r={86} fill="#FFFFFF" stroke="#5C6F8E" strokeWidth={14} />
    <line x1={0} y1={-40} x2={60 * Math.sin(f / 4)} y2={-40 - 60 * Math.cos(f / 4)} stroke={RED} strokeWidth={8} strokeLinecap="round" />
    <circle cy={-40} r={10} fill="#5C6F8E" />
  </g>
)
export const Scissors: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number }> = ({ x, y, s = 1, o = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[1, -1].map((d) => <g key={d} transform={`rotate(${d * (8 + 18 * open)})`}><path d="M0 0 L170 -10 L170 10 Z" fill="#C9D3E0" stroke="#8BA0BF" strokeWidth={3} /><circle cx={-50} cy={d * 30} r={30} fill="none" stroke={RED} strokeWidth={12} /></g>)}
  </g>
)

// ---------------------------------------------------------------- a big cross for "not in it" (comfortable size, never tiny)
export const NoCross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-60 -60 L60 60 M60 -60 L-60 60" stroke={RED} strokeWidth={24} strokeLinecap="round" />
  </g>
)
// ---------------------------------------------------------------- a tick in a green circle
export const Tick: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={50} fill={GREEN} /><path d="M-24 2 l16 18 l34 -38" fill="none" stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
  </g>
)
// ---------------------------------------------------------------- a donut chart slice set: the five FICO parts; `shown` k slices, `lit` index highlighted
export const PARTS: [number, string, string][] = [[35, 'PAYMENT HISTORY', '#4F78AA'], [30, 'AMOUNTS OWED', '#E5634F'], [15, 'LENGTH OF HISTORY', '#E9C25A'], [10, 'NEW CREDIT', '#3DBE84'], [10, 'CREDIT MIX', '#B48AD8']]
export const Donut: React.FC<{ x: number; y: number; s?: number; o?: number; grow: number[]; lit?: number; labels?: number[] }> = ({ x, y, s = 1, o = 1, grow, lit = -1, labels = [] }) => {
  let a0 = -90
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {PARTS.map(([pct, name, col], k) => {
        const a1 = a0 + pct * 3.6, g = grow[k] ?? 0, mid = ((a0 + a1) / 2) * Math.PI / 180
        const R = 260 + (lit === k ? 24 : 0), r0 = 140
        const pt = (a: number, r: number) => `${r * Math.cos((a * Math.PI) / 180)} ${r * Math.sin((a * Math.PI) / 180)}`
        const end = a0 + (a1 - a0) * g
        const d = g > 0.001 ? `M${pt(a0, r0)} L${pt(a0, R)} A${R} ${R} 0 ${end - a0 > 180 ? 1 : 0} 1 ${pt(end, R)} L${pt(end, r0)} A${r0} ${r0} 0 ${end - a0 > 180 ? 1 : 0} 0 ${pt(a0, r0)} Z` : ''
        const el = <g key={k}>
          {d && <path d={d} fill={col} stroke="#FFFFFF" strokeWidth={6} opacity={lit >= 0 && lit !== k ? 0.45 : 1} />}
          <g opacity={labels[k] ?? 0}><text x={200 * Math.cos(mid)} y={200 * Math.sin(mid) + 22} textAnchor="middle" fill="#FFFFFF" style={TXT(64)}>{`${pct}%`}</text></g>
        </g>
        a0 = a1
        return el
      })}
    </g>
  )
}
