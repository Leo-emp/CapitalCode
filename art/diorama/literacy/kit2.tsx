// ============================================================
// THE TEN CARDS — more parts for the ten lessons (same world as kit.tsx:
// walnut, bottle green, brass, warm paper). Two backdrops alternate:
//   Study  — the lamp-lit desk (kit.tsx)
//   Sheet  — "inside the card": a giant cream index card fills the frame
//            (owner rule r57: cream background used more often)
// ============================================================
import React from 'react'
import { clamp01, lerp } from '../kit'
import { C, FONT } from './kit'

// # cue helper: K = { name: 's9:offer', … } → t.name = frame; BEATS = Object.values(K)
export const cues = <T extends Record<string, string>>(c: (k: string) => number, K: T) => Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as { [P in keyof T]: number }

// ------------------------------------------------------------ backdrop: inside a giant index card
export const Sheet: React.FC<{ n?: number | string; title?: string; o?: number }> = ({ n, title, o = 1 }) => (
  <g opacity={o}>
    <rect width={1920} height={1080} fill={C.walnutD} />
    <rect x={40} y={34} width={1840} height={1012} rx={18} fill="#000" opacity={0.25} transform="translate(8 10)" />
    <rect x={40} y={34} width={1840} height={1012} rx={18} fill="url(#fl-paper)" />
    {Array.from({ length: 14 }, (_, k) => <line key={k} x1={60} x2={1860} y1={300 + k * 56} y2={300 + k * 56} stroke={C.rule} strokeWidth={2} opacity={0.35} />)}
    <line x1={40} x2={1880} y1={240} y2={240} stroke={C.margin} strokeWidth={4} opacity={0.7} />
    {n !== undefined && <text x={86} y={210} fill={C.margin} style={{ font: `400 110px ${FONT.big}` }}>{n}</text>}
    {title && <text x={1840} y={200} textAnchor="end" fill={C.inkSoft} opacity={0.5} style={{ font: `400 56px ${FONT.big}`, letterSpacing: 3 }}>{title}</text>}
  </g>
)

// # big number / label text
export const Num: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; o?: number; anchor?: 'start' | 'middle' | 'end' }> = ({ x, y, text, size = 80, color = C.ink, o = 1, anchor = 'middle' }) => o <= 0.01 ? null : (
  <text x={x} y={y} textAnchor={anchor} fill={color} opacity={o} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>
)

// # a horizontal money bar: segments in fractions of the bar; `lift` pulls a segment up and away
export type Seg = { a: number; b: number; color: string; label?: string; o?: number; lift?: number; dx?: number; ink?: string }
export const MoneyBar: React.FC<{ x: number; y: number; w: number; h?: number; segs: Seg[]; o?: number }> = ({ x, y, w, h = 120, segs, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <rect x={6} y={10} width={w} height={h} rx={14} fill="#000" opacity={0.15} />
    {segs.map((s, k) => { const so = s.o ?? 1; if (so <= 0.01) return null
      const sx = s.a * w + (s.dx ?? 0), sw = (s.b - s.a) * w, sy = -(s.lift ?? 0)
      return <g key={k} opacity={so}>
        <rect x={sx} y={sy} width={sw} height={h} rx={10} fill={s.color} stroke="#fff" strokeWidth={4} />
        <rect x={sx} y={sy} width={sw} height={h * 0.22} rx={8} fill="#fff" opacity={0.18} />
        {s.label && sw > 60 && <text x={sx + sw / 2} y={sy + h / 2 + 18} textAnchor="middle" fill={s.ink ?? '#fff'} style={{ font: `400 ${Math.min(54, h * 0.45)}px ${FONT.big}`, letterSpacing: 1 }}>{s.label}</text>}
      </g> })}
  </g>
)

// # a tapered bucket with a water level (fill 0–1); rate on its belly
export const Bucket: React.FC<{ x: number; y: number; w?: number; h?: number; fill: number; rate: string; color?: string; o?: number; label?: string; glow?: number }> = ({ x, y, w = 260, h = 300, fill, rate, color = C.teal, o = 1, label, glow = 0 }) => {
  if (o <= 0.01) return null
  const top = w / 2, bot = w * 0.38, lv = h * clamp01(fill), wl = lerp(bot, top, clamp01(fill))
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      {glow > 0 && <ellipse cx={0} cy={-h / 2} rx={w * 0.7} ry={h * 0.7} fill="url(#fl-lamp)" opacity={glow} />}
      <ellipse cx={0} cy={6} rx={w * 0.5} ry={16} fill="#000" opacity={0.2} />
      <path d={`M${-top} ${-h} L${top} ${-h} L${bot} 0 L${-bot} 0 Z`} fill="#E9EEF0" opacity={0.85} />
      {lv > 1 && <path d={`M${-wl} ${-lv} L${wl} ${-lv} L${bot} 0 L${-bot} 0 Z`} fill={color} opacity={0.9} />}
      {lv > 1 && <ellipse cx={0} cy={-lv} rx={wl} ry={10} fill="#fff" opacity={0.3} />}
      <path d={`M${-top} ${-h} L${top} ${-h} L${bot} 0 L${-bot} 0 Z`} fill="none" stroke={C.inkSoft} strokeWidth={6} strokeLinejoin="round" />
      <ellipse cx={0} cy={-h} rx={top} ry={14} fill="none" stroke={C.inkSoft} strokeWidth={6} />
      <path d={`M${-top + 6} ${-h} Q0 ${-h - top * 0.9} ${top - 6} ${-h}`} fill="none" stroke={C.inkSoft} strokeWidth={5} opacity={0.6} />
      <rect x={-78} y={-h * 0.55 - 40} width={156} height={74} rx={14} fill={C.paper} stroke={C.inkSoft} strokeWidth={3} />
      <text x={0} y={-h * 0.55 + 18} textAnchor="middle" fill={C.ink} style={{ font: `400 64px ${FONT.big}` }}>{rate}</text>
      {label && <text x={0} y={60} textAnchor="middle" fill={C.ink} style={{ font: `400 40px ${FONT.big}`, letterSpacing: 1 }}>{label}</text>}
    </g>
  )
}

// # a glass jar holding coins (fill 0–1), label on a paper band
export const Jar: React.FC<{ x: number; y: number; s?: number; fill: number; label?: string; o?: number; color?: string }> = ({ x, y, s = 1, fill, label, o = 1, color = C.gold }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={120} ry={16} fill="#000" opacity={0.2} />
    <rect x={-110} y={-300} width={220} height={300} rx={36} fill="#DCEFF2" opacity={0.55} />
    {fill > 0.01 && <rect x={-100} y={-290 * clamp01(fill)} width={200} height={290 * clamp01(fill) - 8} rx={28} fill={color} />}
    {fill > 0.01 && Array.from({ length: Math.ceil(6 * fill) }, (_, k) => <ellipse key={k} cx={-60 + (k % 3) * 60} cy={-20 - k * 40} rx={28} ry={9} fill="#fff" opacity={0.25} />)}
    <rect x={-110} y={-300} width={220} height={300} rx={36} fill="none" stroke="#fff" strokeWidth={6} opacity={0.8} />
    <rect x={-90} y={-334} width={180} height={40} rx={10} fill={C.walnut} />
    <rect x={-84} y={-300} width={26} height={200} rx={13} fill="#fff" opacity={0.35} />
    {label && <g><rect x={-104} y={-200} width={208} height={64} rx={8} fill={C.paper} stroke={C.inkSoft} strokeWidth={2} /><text x={0} y={-155} textAnchor="middle" fill={C.ink} style={{ font: `400 40px ${FONT.big}`, letterSpacing: 1 }}>{label}</text></g>}
  </g>
)

// # an arrow that draws on (p 0–1)
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; p?: number; color?: string; w?: number; bend?: number }> = ({ x1, y1, x2, y2, p = 1, color = C.ink, w = 12, bend = 0 }) => {
  if (p <= 0.01) return null
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend
  const t = clamp01(p), bx = lerp(lerp(x1, mx, t), lerp(mx, x2, t), t), by = lerp(lerp(y1, my, t), lerp(my, y2, t), t)
  const cx = lerp(x1, mx, t), cy = lerp(y1, my, t), ang = Math.atan2(by - cy, bx - cx)
  return (
    <g strokeLinecap="round" fill="none">
      <path d={`M${x1} ${y1} Q${cx} ${cy} ${bx} ${by}`} stroke={color} strokeWidth={w} />
      <path d={`M${bx + Math.cos(ang) * w * 1.4} ${by + Math.sin(ang) * w * 1.4} L${bx + Math.cos(ang + 2.4) * w * 2.6} ${by + Math.sin(ang + 2.4) * w * 2.6} L${bx + Math.cos(ang - 2.4) * w * 2.6} ${by + Math.sin(ang - 2.4) * w * 2.6} Z`} fill={color} />
    </g>
  )
}

// # a pie made of parts that sweep in (each part has its own p 0–1)
export const Pie: React.FC<{ x: number; y: number; r: number; parts: { v: number; color: string; p: number; label?: string; lift?: number }[] }> = ({ x, y, r, parts }) => {
  const tot = parts.reduce((a, q) => a + q.v, 0); let acc = 0
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r + 10} fill="#000" opacity={0.12} transform="translate(6 10)" />
      <circle r={r} fill={C.paperD} opacity={0.6} />
      {parts.map((q, k) => {
        const a0 = (acc / tot) * Math.PI * 2 - Math.PI / 2; acc += q.v
        const a1 = a0 + (q.v / tot) * Math.PI * 2 * clamp01(q.p)
        if (q.p <= 0.01) return null
        const mid = (a0 + a0 + (q.v / tot) * Math.PI * 2) / 2, L = q.lift ?? 0
        const ox = Math.cos(mid) * L, oy = Math.sin(mid) * L
        const large = a1 - a0 > Math.PI ? 1 : 0
        return <g key={k} transform={`translate(${ox} ${oy})`}>
          <path d={`M0 0 L${Math.cos(a0) * r} ${Math.sin(a0) * r} A${r} ${r} 0 ${large} 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r} Z`} fill={q.color} stroke="#fff" strokeWidth={5} />
          {q.label && q.p > 0.9 && <text x={Math.cos(mid) * r * 0.64} y={Math.sin(mid) * r * 0.64 + 20} textAnchor="middle" fill="#fff" style={{ font: `400 ${r * 0.2}px ${FONT.big}` }}>{q.label}</text>}
        </g>
      })}
    </g>
  )
}

// # a score dial 300–850 with a needle (val) and coloured bands
export const Gauge: React.FC<{ x: number; y: number; r?: number; val: number; o?: number }> = ({ x, y, r = 300, val, o = 1 }) => {
  if (o <= 0.01) return null
  const ang = (v: number) => Math.PI + ((v - 300) / 550) * Math.PI
  const arc = (v0: number, v1: number, col: string) => { const a0 = ang(v0), a1 = ang(v1); return <path d={`M${Math.cos(a0) * r} ${Math.sin(a0) * r} A${r} ${r} 0 0 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r}`} stroke={col} strokeWidth={r * 0.2} fill="none" /> }
  const a = ang(val)
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <path d={`M${-r - r * 0.18} 0 A${r * 1.18} ${r * 1.18} 0 0 1 ${r + r * 0.18} 0 Z`} fill={C.paper} stroke={C.inkSoft} strokeWidth={4} />
      {arc(300, 580, C.red)}{arc(580, 670, C.gold)}{arc(670, 740, C.sky)}{arc(740, 850, C.cash)}
      <text x={-r} y={60} textAnchor="middle" fill={C.ink} style={{ font: `400 56px ${FONT.big}` }}>300</text>
      <text x={r} y={60} textAnchor="middle" fill={C.ink} style={{ font: `400 56px ${FONT.big}` }}>850</text>
      <line x1={0} y1={0} x2={Math.cos(a) * r * 0.8} y2={Math.sin(a) * r * 0.8} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
      <circle r={30} fill={C.ink} /><circle r={12} fill={C.brass} />
    </g>
  )
}

// # a price tag on a string
export const PriceTag: React.FC<{ x: number; y: number; text: string; s?: number; r?: number; o?: number; color?: string; ink?: string }> = ({ x, y, text, s = 1, r = -10, o = 1, color = C.brassL, ink = C.ink }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M-30 -70 Q -60 -120 -20 -150" stroke={C.inkSoft} strokeWidth={4} fill="none" />
    <path d="M-60 -60 L120 -60 L170 0 L120 60 L-60 60 Z" fill="#000" opacity={0.18} transform="translate(6 8)" />
    <path d="M-60 -60 L120 -60 L170 0 L120 60 L-60 60 Z" fill={color} stroke={C.brassD} strokeWidth={4} />
    <circle cx={-30} cy={0} r={12} fill={C.paper} stroke={C.brassD} strokeWidth={3} />
    <text x={60} y={22} textAnchor="middle" fill={ink} style={{ font: `400 ${text.length > 5 ? 50 : 64}px ${FONT.big}` }}>{text}</text>
  </g>
)

// # a desk calendar page
export const Calendar: React.FC<{ x: number; y: number; s?: number; top?: string; big?: string; o?: number; color?: string }> = ({ x, y, s = 1, top = 'PAYDAY', big = '1', o = 1, color = C.tomato }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-130} width={220} height={240} rx={14} fill="#000" opacity={0.2} transform="translate(6 8)" />
    <rect x={-110} y={-130} width={220} height={240} rx={14} fill={C.paper} />
    <rect x={-110} y={-130} width={220} height={64} rx={14} fill={color} /><rect x={-110} y={-90} width={220} height={24} fill={color} />
    <text x={0} y={-82} textAnchor="middle" fill="#fff" style={{ font: `400 44px ${FONT.big}`, letterSpacing: 2 }}>{top}</text>
    <text x={0} y={70} textAnchor="middle" fill={C.ink} style={{ font: `400 130px ${FONT.big}` }}>{big}</text>
    {[-60, 0, 60].map((k) => <rect key={k} x={k - 8} y={-146} width={16} height={34} rx={6} fill={C.inkSoft} />)}
  </g>
)

// # a shopping basket with groceries peeking out (food, a toy car, a little house = rent)
export const Basket: React.FC<{ x: number; y: number; s?: number; o?: number; full?: number }> = ({ x, y, s = 1, o = 1, full = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={230} ry={22} fill="#000" opacity={0.2} />
    <path d="M-180 -120 Q0 -330 180 -120" stroke={C.walnutD} strokeWidth={14} fill="none" />
    <g opacity={full}>
      <rect x={-150} y={-210} width={70} height={120} rx={10} fill={C.sky} /><rect x={-150} y={-210} width={70} height={30} rx={10} fill="#fff" opacity={0.5} />
      <circle cx={-30} cy={-150} r={52} fill={C.tomato} /><rect x={-34} y={-212} width={8} height={18} fill={C.walnutD} />
      <g transform="translate(70 -150)"><rect x={-60} y={-30} width={120} height={44} rx={14} fill={C.teal} /><rect x={-34} y={-62} width={64} height={36} rx={10} fill={C.tealD} /><circle cx={-34} cy={18} r={16} fill={C.ink} /><circle cx={34} cy={18} r={16} fill={C.ink} /></g>
      <g transform="translate(140 -160) scale(0.4)"><rect x={-100} y={-150} width={200} height={150} fill={C.paper} /><path d="M-125 -140 L0 -240 L125 -140 Z" fill={C.tomato} /><rect x={-30} y={-84} width={60} height={84} fill={C.walnut} /></g>
    </g>
    <path d="M-210 -120 L210 -120 L170 0 L-170 0 Z" fill={C.walnutL} />
    {[0, 1, 2].map((k) => <line key={k} x1={-200 + k * 6} x2={200 - k * 6} y1={-90 + k * 32} y2={-90 + k * 32} stroke={C.walnutD} strokeWidth={5} opacity={0.6} />)}
    {Array.from({ length: 8 }, (_, k) => <line key={k} x1={-170 + k * 48} x2={-160 + k * 46} y1={-120} y2={0} stroke={C.walnutD} strokeWidth={4} opacity={0.4} />)}
  </g>
)

// # a balance scale: tilt in degrees (+ = right side down); children placed on each pan via render props
export const Scale: React.FC<{ x: number; y: number; tilt: number; s?: number; o?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, tilt, s = 1, o = 1, left, right }) => {
  if (o <= 0.01) return null
  const a = (tilt * Math.PI) / 180, L = 300, ly = -Math.sin(a) * L, ry = Math.sin(a) * L
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={170} ry={18} fill="#000" opacity={0.2} />
      <rect x={-120} y={-30} width={240} height={30} rx={10} fill="url(#fl-brass)" />
      <rect x={-12} y={-430} width={24} height={404} fill="url(#fl-brass)" />
      <g transform="translate(0 -420)">
        <line x1={-L * Math.cos(a)} y1={ly} x2={L * Math.cos(a)} y2={ry} stroke={C.brassD} strokeWidth={16} strokeLinecap="round" />
        <circle r={22} fill={C.brass} />
        {[[-L * Math.cos(a), ly, left], [L * Math.cos(a), ry, right]].map(([px, py, ch], k) => (
          <g key={k} transform={`translate(${px} ${py})`}>
            <path d="M0 0 L-110 170 M0 0 L110 170" stroke={C.brassD} strokeWidth={4} />
            <path d="M-140 170 Q0 230 140 170 Z" fill="url(#fl-brass)" />
            <g transform="translate(0 168)">{ch as React.ReactNode}</g>
          </g>
        ))}
      </g>
    </g>
  )
}

// # a small company building (for "a share of a company", "500 companies")
export const Building: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string; h?: number }> = ({ x, y, s = 1, o = 1, color = C.skyD, h = 220 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-70} y={-h} width={140} height={h} fill={color} /><rect x={-70} y={-h} width={30} height={h} fill="#000" opacity={0.1} />
    {Array.from({ length: Math.floor(h / 50) * 3 }, (_, k) => <rect key={k} x={-50 + (k % 3) * 36} y={-h + 20 + Math.floor(k / 3) * 50} width={22} height={28} fill="#FFE7B0" opacity={0.85} />)}
    <rect x={-80} y={-h - 14} width={160} height={16} fill={C.ink} opacity={0.5} />
  </g>
)

// # a car with a puff of smoke (broken down)
export const Car: React.FC<{ x: number; y: number; s?: number; o?: number; smoke?: number }> = ({ x, y, s = 1, o = 1, smoke = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={230} ry={18} fill="#000" opacity={0.2} />
    <path d="M-220 -40 L-200 -110 L-100 -120 L-50 -190 L110 -190 L170 -120 L220 -100 L220 -30 Z" fill={C.sky} />
    <path d="M-36 -176 L100 -176 L146 -124 L-80 -124 Z" fill="#DCEFF2" />
    <rect x={-230} y={-50} width={460} height={30} rx={12} fill={C.skyD} />
    {[-130, 140].map((k) => <g key={k}><circle cx={k} cy={-14} r={46} fill={C.ink} /><circle cx={k} cy={-14} r={20} fill={C.paperD} /></g>)}
    {smoke > 0.01 && [0, 1, 2].map((k) => <circle key={k} cx={180 + k * 34} cy={-200 - k * 50 * smoke} r={34 + k * 12} fill="#9AA3A8" opacity={0.7 * smoke} />)}
  </g>
)

// # a magnifying glass
export const Magnifier: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={70} y={70} width={44} height={170} rx={18} fill={C.walnut} transform="rotate(-45 92 155)" />
    <circle r={110} fill="#DCEFF2" opacity={0.35} /><circle r={110} fill="none" stroke="url(#fl-brass)" strokeWidth={22} />
    <path d="M-60 -50 Q-40 -80 -10 -86" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.7} />
  </g>
)

// # an hourglass (time)
export const Hourglass: React.FC<{ x: number; y: number; s?: number; o?: number; t: number }> = ({ x, y, s = 1, o = 1, t }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-260} width={220} height={24} rx={8} fill={C.walnut} /><rect x={-110} y={0} width={220} height={24} rx={8} fill={C.walnut} />
    <path d="M-80 -236 L80 -236 L10 -118 L80 0 L-80 0 L-10 -118 Z" fill="#DCEFF2" opacity={0.55} stroke="#fff" strokeWidth={4} />
    <path d={`M${-70 * (1 - t)} ${-220 + 100 * t} L${70 * (1 - t)} ${-220 + 100 * t} L0 -120 Z`} fill={C.gold} />
    <path d={`M-70 0 L70 0 L${70 - 60 * t} ${-90 * t} L${-70 + 60 * t} ${-90 * t} Z`} fill={C.gold} />
    <line x1={0} y1={-120} x2={0} y2={-6} stroke={C.gold} strokeWidth={4} />
  </g>
)

// # a phone showing a bank balance
export const Phone: React.FC<{ x: number; y: number; s?: number; o?: number; amount: string; label?: string }> = ({ x, y, s = 1, o = 1, amount, label = 'BANK ACCOUNT' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-250} width={260} height={500} rx={36} fill="#000" opacity={0.2} transform="translate(8 10)" />
    <rect x={-130} y={-250} width={260} height={500} rx={36} fill={C.ink} />
    <rect x={-112} y={-220} width={224} height={440} rx={20} fill="#F4FBF6" />
    <rect x={-112} y={-220} width={224} height={90} rx={20} fill={C.teal} />
    <text x={0} y={-162} textAnchor="middle" fill="#fff" style={{ font: `400 34px ${FONT.big}`, letterSpacing: 1 }}>{label}</text>
    <text x={0} y={-30} textAnchor="middle" fill={C.ink} style={{ font: `400 ${amount.length > 7 ? 64 : 84}px ${FONT.big}` }}>{amount}</text>
    {[0, 1, 2].map((k) => <rect key={k} x={-86} y={40 + k * 50} width={172} height={28} rx={8} fill={C.paperD} />)}
  </g>
)

// # an offer letter
export const Letter: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; amount: string; head?: string }> = ({ x, y, s = 1, r = 0, o = 1, amount, head = 'JOB OFFER' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-180} y={-240} width={360} height={480} rx={10} fill="#000" opacity={0.2} transform="translate(8 10)" />
    <rect x={-180} y={-240} width={360} height={480} rx={10} fill="url(#fl-paper)" />
    <text x={0} y={-170} textAnchor="middle" fill={C.ink} style={{ font: `400 56px ${FONT.big}`, letterSpacing: 3 }}>{head}</text>
    <line x1={-140} x2={140} y1={-140} y2={-140} stroke={C.brass} strokeWidth={5} />
    {[0, 1, 2].map((k) => <rect key={k} x={-140} y={-110 + k * 34} width={280 - k * 50} height={14} rx={7} fill={C.paperD} />)}
    <text x={0} y={70} textAnchor="middle" fill={C.cashD} style={{ font: `400 100px ${FONT.big}` }}>{amount}</text>
    <text x={0} y={120} textAnchor="middle" fill={C.inkSoft} style={{ font: `400 36px ${FONT.big}`, letterSpacing: 2 }}>A YEAR</text>
    <path d="M-120 190 C-80 160 -40 210 0 180 C30 160 60 200 110 180" stroke={C.ink} strokeWidth={4} fill="none" />
  </g>
)

// # a bar for a bar chart (grows with h)
export const Column: React.FC<{ x: number; base: number; h: number; w?: number; color?: string; top?: string; under?: string; o?: number; ink?: string }> = ({ x, base, h, w = 150, color = C.cash, top, under, o = 1, ink = C.ink }) => o <= 0.01 ? null : (
  <g opacity={o}>
    <rect x={x - w / 2 + 6} y={base - h + 8} width={w} height={h} rx={10} fill="#000" opacity={0.14} />
    <rect x={x - w / 2} y={base - h} width={w} height={h} rx={10} fill={color} />
    <rect x={x - w / 2} y={base - h} width={w * 0.3} height={h} rx={10} fill="#fff" opacity={0.16} />
    {top && <text x={x} y={base - h - 22} textAnchor="middle" fill={ink} style={{ font: `400 58px ${FONT.big}` }}>{top}</text>}
    {under && <text x={x} y={base + 56} textAnchor="middle" fill={C.inkSoft} style={{ font: `400 42px ${FONT.big}`, letterSpacing: 1 }}>{under}</text>}
  </g>
)

// # word-synced emphasis: a brass underline sweeps under the headline on each key spoken word (fills quiet stretches)
export const Sweep: React.FC<{ f: number; at: number[]; y?: number; w?: number }> = ({ f, at, y = 212, w = 520 }) => {
  const a = at.filter((t) => f >= t && f < t + 26).pop()
  if (a === undefined) return null
  const p = clamp01((f - a) / 10), o = 1 - clamp01((f - a - 14) / 12)
  return <g opacity={o}><line x1={960 - w / 2} x2={960 - w / 2 + w * p} y1={y} y2={y} stroke={C.brass} strokeWidth={7} strokeLinecap="round" /><circle cx={960 - w / 2 + w * p} cy={y} r={9} fill={C.brassL} /></g>
}
