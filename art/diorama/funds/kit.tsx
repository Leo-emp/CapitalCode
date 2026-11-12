// ============================================================
// LONG VIDEO — "Index Funds vs Mutual Funds vs ETFs vs Hedge Funds" — objects for this story:
//   Pot        the fund: a big copper pot that fills with coins (the pooled money)
//   Crowd      a grid of little people (the 1,000 savers), each can light up or hand in a coin
//   Parcel     a fund's PACKAGE (mutual fund box / ETF box) with a lid and a ribbon label
//   ListBoard  the index: a clipboard list of company names that tick off one by one
//   DayClock   a wall clock (mutual funds price once a day, after the close)
//   Board      a stock-exchange price board: a line that wiggles all day long
//   ClubDoor   the hedge fund: a private door behind a velvet rope with a sign
//   Slice      a pie slice token (each person's share of the pot)
// Cast, headline and money helpers come from ../aimoney/common. One file per scene.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'
import { Label } from '../charts'

// # the fund pot: fill 0..1 raises the coin heap; label on the belly
export const Pot: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; label?: string; glow?: number; col?: string }> = ({ x, y, s = 1, o = 1, fill = 0, label = 'FUND', glow = 0, col = '#C9773E' }) => {
  const h = 40 + 150 * clamp01(fill)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {glow > 0 && <ellipse cx={0} cy={-150} rx={300} ry={220} fill={P.gold} opacity={0.18 * glow} />}
      <ellipse cx={0} cy={6} rx={250} ry={26} fill={P.shadow} opacity={0.2} />
      {/* # coins heaped inside, drawn behind the rim */}
      <g>{Array.from({ length: 14 }, (_, k) => { const cx = -170 + (k % 7) * 57 + (k > 6 ? 28 : 0), cy = -250 - (k > 6 ? h * 0.55 : h * 0.3) + (k % 3) * 8; return fill > 0.05 ? <ellipse key={k} cx={cx} cy={cy} rx={30} ry={12} fill={P.gold} stroke={P.goldD} strokeWidth={3} /> : null })}</g>
      <path d="M-230 -260 Q-250 -40 -150 0 L150 0 Q250 -40 230 -260 Z" fill={col} />
      <path d="M-230 -260 Q-250 -40 -150 0 L-110 0 Q-200 -60 -190 -260 Z" fill="#FFFFFF" opacity={0.12} />
      <rect x={-250} y={-280} width={500} height={34} rx={17} fill="#A85F2E" />
      <rect x={-290} y={-240} width={60} height={22} rx={11} fill="#A85F2E" /><rect x={230} y={-240} width={60} height={22} rx={11} fill="#A85F2E" />
      <rect x={-150} y={-170} width={300} height={84} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={3} />
      <Label x={0} y={-112} text={label} size={52} font="Bebas Neue" color="#16294A" />
    </g>
  )
}

// # one little person (head + body), coloured; lit = gold halo
export const Folk: React.FC<{ x: number; y: number; s?: number; col?: string; lit?: number; o?: number }> = ({ x, y, s = 1, col = '#5B7DB1', lit = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {lit > 0 && <circle cx={0} cy={-34} r={34} fill={P.gold} opacity={0.45 * lit} />}
    <circle cx={0} cy={-46} r={14} fill="#F2C7A5" /><path d="M-18 0 Q-20 -30 0 -30 Q20 -30 18 0 Z" fill={col} />
  </g>
)
const FOLK = ['#5B7DB1', '#D9483A', '#1E9A63', '#B4821C', '#7A5AA8', '#2A8FD0', '#C9773E']
// # a grid of folk: shown = how many are visible (0..n), lit = how many glow
export const Crowd: React.FC<{ x: number; y: number; cols: number; rows: number; gap?: number; s?: number; shown?: number; lit?: number; o?: number }> = ({ x, y, cols, rows, gap = 46, s = 1, shown = 1e9, lit = 0, o = 1 }) => (
  <g opacity={o}>{Array.from({ length: cols * rows }, (_, k) => {
    const c = k % cols, r = Math.floor(k / cols)
    return k < shown ? <Folk key={k} x={x + (c - (cols - 1) / 2) * gap + (r % 2) * gap * 0.3} y={y + r * gap * 0.9} s={s} col={FOLK[(k * 3) % FOLK.length]} lit={k < lit ? 1 : 0} /> : null
  })}</g>
)

// # a parcel = a fund's package. open lifts the lid; col tints the box
export const Parcel: React.FC<{ x: number; y: number; s?: number; o?: number; label: string; col?: string; open?: number; r?: number; glow?: number }> = ({ x, y, s = 1, o = 1, label, col = '#2A8FD0', open = 0, r = 0, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-200} y={-250} width={400} height={290} rx={40} fill={P.gold} opacity={0.22 * glow} />}
    <ellipse cx={0} cy={10} rx={200} ry={20} fill={P.shadow} opacity={0.2} />
    <rect x={-170} y={-200} width={340} height={210} rx={14} fill={col} />
    <rect x={-170} y={-200} width={340} height={210} rx={14} fill="none" stroke="#16294A" strokeOpacity={0.25} strokeWidth={4} />
    <rect x={-22} y={-200} width={44} height={210} fill="#F4C95D" />
    <g transform={`translate(0 ${-200 - 60 * open}) rotate(${-14 * open} -180 0)`}><rect x={-185} y={-36} width={370} height={40} rx={10} fill={col} stroke="#16294A" strokeOpacity={0.3} strokeWidth={4} /><rect x={-22} y={-36} width={44} height={40} fill="#F4C95D" /></g>
    <rect x={-150} y={-120} width={300} height={70} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <Label x={0} y={-72} text={label} size={46} font="Bebas Neue" color="#16294A" />
  </g>
)

// # the index list: a clipboard with names; ticks = how many rows are ticked (can be fractional)
export const ListBoard: React.FC<{ x: number; y: number; s?: number; o?: number; title?: string; rows?: string[]; ticks?: number; r?: number }> = ({ x, y, s = 1, o = 1, title = 'S&P 500', rows = ['APPLE', 'MICROSOFT', 'NVIDIA', 'AMAZON', 'ALPHABET', '… 495 MORE'], ticks = 0, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-230} width={340} height={460} rx={18} fill="#8C6239" />
    <rect x={-145} y={-200} width={290} height={410} rx={8} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <rect x={-60} y={-250} width={120} height={44} rx={10} fill="#5C6F8E" />
    <Label x={0} y={-148} text={title} size={50} font="Bebas Neue" color="#16294A" />
    {rows.map((t, k) => (
      <g key={k}><Label x={-110} y={-90 + k * 54} text={t} size={30} anchor="start" font="Inter" weight={700} color="#16294A" o={0.85} />
        {ticks > k && <path d={`M95 ${-104 + k * 54} l12 14 l24 -28`} fill="none" stroke="#1E9A63" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" opacity={clamp01(ticks - k)} />}</g>
    ))}
  </g>
)

// # a wall clock; hour 0..24 sets the hands; ring lights at the close
export const DayClock: React.FC<{ x: number; y: number; s?: number; o?: number; hour?: number; ring?: number }> = ({ x, y, s = 1, o = 1, hour = 10, ring = 0 }) => {
  const hA = ((hour % 12) / 12) * 360, mA = (hour % 1) * 360
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {ring > 0 && <circle r={150} fill={P.gold} opacity={0.3 * ring} />}
      <circle r={118} fill="#16294A" /><circle r={104} fill="#FFFDF8" />
      {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-4} y={-96} width={8} height={k % 3 ? 12 : 22} fill="#16294A" transform={`rotate(${k * 30})`} />)}
      <rect x={-6} y={-58} width={12} height={62} rx={6} fill="#16294A" transform={`rotate(${hA})`} />
      <rect x={-4} y={-86} width={8} height={90} rx={4} fill="#D9483A" transform={`rotate(${mA})`} />
      <circle r={10} fill="#16294A" />
    </g>
  )
}

// # a price board: dark screen with a wiggly line drawn up to t (0..1); live = the dot pulses
export const Board: React.FC<{ x: number; y: number; w?: number; h?: number; o?: number; t?: number; title?: string; seed?: number; flat?: number }> = ({ x, y, w = 620, h = 300, o = 1, t = 1, title = 'STOCK EXCHANGE', seed = 3, flat = 0 }) => {
  const N = 40, pts = Array.from({ length: N + 1 }, (_, k) => { const u = k / N; const v = Math.sin(u * 9 + seed) * 0.28 + Math.sin(u * 23 + seed * 2) * 0.12 + u * 0.25; return [-w / 2 + 30 + u * (w - 60), lerp(v, 0, flat) * h * 0.6] as [number, number] })
  const m = Math.max(1, Math.round(N * clamp01(t)))
  const d = pts.slice(0, m + 1).map(([px, py], k) => `${k ? 'L' : 'M'}${px} ${py}`).join(' ')
  const [lx, ly] = pts[m]
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <rect x={-w / 2 - 14} y={-h / 2 - 60} width={w + 28} height={h + 80} rx={20} fill="#2B4A78" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="#0E1B33" />
      <Label x={0} y={-h / 2 - 16} text={title} size={36} font="Bebas Neue" color="#F2E6CC" />
      {[-1, 0, 1].map((k) => <line key={k} x1={-w / 2 + 20} x2={w / 2 - 20} y1={k * h * 0.28} y2={k * h * 0.28} stroke="#3A5F93" strokeWidth={2} strokeDasharray="6 10" />)}
      <path d={d} fill="none" stroke="#3DDC97" strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r={12} fill="#3DDC97" />
    </g>
  )
}

// # the private club door with velvet rope; open 0..1 opens the door a crack
export const ClubDoor: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string; open?: number; rope?: number }> = ({ x, y, s = 1, o = 1, sign = 'PRIVATE', open = 0, rope = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-190} y={-520} width={380} height={520} rx={12} fill="#2B2F45" />
    <rect x={-160} y={-490} width={320} height={490} rx={6} fill="#120F1C" />
    {open > 0 && <rect x={-160} y={-490} width={320 * open} height={490} fill="#E9C25A" opacity={0.7} />}
    <g transform={`translate(${-160 + 320 * open * 0.85} 0) scale(${1 - 0.85 * open} 1)`}><rect x={0} y={-490} width={320} height={490} rx={6} fill="#5A1E2E" /><rect x={30} y={-460} width={260} height={190} rx={8} fill="none" stroke="#7E2E42" strokeWidth={8} /><rect x={30} y={-240} width={260} height={210} rx={8} fill="none" stroke="#7E2E42" strokeWidth={8} /><circle cx={280} cy={-250} r={14} fill="#E9C25A" /></g>
    <rect x={-140} y={-610} width={280} height={70} rx={10} fill="#E9C25A" /><Label x={0} y={-560} text={sign} size={46} font="Bebas Neue" color="#16294A" />
    {rope > 0 && <g opacity={rope}>
      {[-330, 330].map((px) => <g key={px}><rect x={px - 10} y={-180} width={20} height={180} fill="#C9A13A" /><circle cx={px} cy={-190} r={22} fill="#E9C25A" /><ellipse cx={px} cy={0} rx={50} ry={12} fill="#C9A13A" /></g>)}
      <path d="M-330 -170 Q0 -40 330 -170" fill="none" stroke="#B0233A" strokeWidth={22} strokeLinecap="round" />
    </g>}
  </g>
)

// # a pie-slice token: each person's share of the pot
export const Slice: React.FC<{ x: number; y: number; s?: number; o?: number; frac?: number; t?: string }> = ({ x, y, s = 1, o = 1, frac = 0.15, t }) => {
  const a = frac * Math.PI * 2, R = 90
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <circle r={R} fill="#E6D5B8" stroke="#CDB58C" strokeWidth={4} />
      <path d={`M0 0 L0 ${-R} A${R} ${R} 0 ${a > Math.PI ? 1 : 0} 1 ${R * Math.sin(a)} ${-R * Math.cos(a)} Z`} fill="#E9C25A" stroke="#B88A2E" strokeWidth={4} />
      {t && <Label x={0} y={R + 50} text={t} size={36} font="Bebas Neue" color={P.ink} />}
    </g>
  )
}
