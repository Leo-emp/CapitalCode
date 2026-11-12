// ============================================================
// LONG VIDEO — "How Mortgages Actually Work"
// Art direction (owner r82/r83/r85): its own world — a GOLDEN-HOUR SUBURB. Lavender-to-peach skies with a low sun,
// layered rolling hills (back), terracotta-roof homes and a stone lender's hall (middle), fences, hedges and long
// soft shadows (front). Warm gold = your money and your home; brick red = interest; sage green = the part you own.
// Settings change by chapter: kitchen at sunset, the street, the study, the park seesaw, two hill roads, the garden,
// the porch at dusk. Every object here is drawn fresh for this video. Only engine helpers are shared.
// ============================================================
import React from 'react'
import { clamp01, lerp, rnd } from '../kit'
import { Label } from '../charts'

export const GOLD = '#F2B544', GOLDD = '#C98A1E', BRICK = '#D2553F', BRICKD = '#9E3626', SAGE = '#7FB37A', SAGED = '#4E8551'
export const INK = '#2B2236', CREAM = '#FFF4E2', PLUM = '#4A3A63', SKYB = '#8FB8E0', NIGHT = '#2A2448'

// # full-frame sky: gradient + a low sun with halo + a few soft clouds (back layer)
export const Sky: React.FC<{ id: string; top?: string; mid?: string; bottom?: string; sun?: [number, number]; sunR?: number; f?: number; clouds?: number }> = ({ id, top = '#7A6AA6', mid = '#F4A98A', bottom = '#FFD9A0', sun = [1500, 700], sunR = 90, f = 0, clouds = 3 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={top} /><stop offset="58%" stopColor={mid} /><stop offset="100%" stopColor={bottom} /></linearGradient>
      <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFF6D8" stopOpacity={0.95} /><stop offset="35%" stopColor="#FFE3A0" stopOpacity={0.5} /><stop offset="100%" stopColor="#FFD08A" stopOpacity={0} /></radialGradient>
    </defs>
    <rect x={0} y={0} width={1920} height={1080} fill={`url(#${id}-sky)`} />
    <circle cx={sun[0]} cy={sun[1]} r={sunR * 5} fill={`url(#${id}-sun)`} />
    <circle cx={sun[0]} cy={sun[1]} r={sunR} fill="#FFF1C9" />
    {Array.from({ length: clouds }, (_, i) => {
      const x = ((rnd(i + 3) * 1920 + f * (0.25 + 0.1 * i)) % 2300) - 200, y = 150 + rnd(i + 7) * 260, s = 0.7 + rnd(i + 11) * 0.6
      return <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity={0.55}>
        <ellipse cx={0} cy={0} rx={150} ry={34} fill="#FFE9D6" /><ellipse cx={-50} cy={-22} rx={70} ry={36} fill="#FFE9D6" /><ellipse cx={45} cy={-30} rx={80} ry={44} fill="#FFF1E4" />
      </g>
    })}
  </g>
)

// # rolling hills: three layers with atmospheric fade (back to middle)
export const Hills: React.FC<{ id: string; y: number; cols?: [string, string, string]; seed?: number }> = ({ id, y, cols = ['#C9A3B8', '#9DBF8E', '#7FAE72'], seed = 1 }) => {
  const ridge = (base: number, amp: number, k: number) => {
    let d = `M0 1080 L0 ${base}`
    for (let x = 0; x <= 1920; x += 160) d += ` Q ${x + 80} ${base - amp * (0.4 + rnd(x / 160 + k + seed))} ${x + 160} ${base - amp * 0.3 * rnd(x + k)}`
    return d + ' L1920 1080 Z'
  }
  return (
    <g>
      <defs>{cols.map((c, i) => <linearGradient key={i} id={`${id}-h${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} /><stop offset="100%" stopColor={c} stopOpacity={0.75} /></linearGradient>)}</defs>
      <path d={ridge(y - 120, 70, 1)} fill={`url(#${id}-h0)`} opacity={0.7} />
      <path d={ridge(y - 50, 60, 5)} fill={`url(#${id}-h1)`} opacity={0.9} />
      <path d={ridge(y + 10, 40, 9)} fill={`url(#${id}-h2)`} />
    </g>
  )
}

// # ground plane: a lawn or path with a warm rim and a gradient (front layer)
export const Ground: React.FC<{ id: string; y: number; top?: string; bottom?: string; rim?: string }> = ({ id, y, top = '#8DBB72', bottom = '#5E9150', rim = '#FFE3A0' }) => (
  <g>
    <defs><linearGradient id={`${id}-gr`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={top} /><stop offset="100%" stopColor={bottom} /></linearGradient></defs>
    <rect x={0} y={y} width={1920} height={1080 - y} fill={`url(#${id}-gr)`} />
    <rect x={0} y={y} width={1920} height={5} fill={rim} opacity={0.55} />
  </g>
)

// # a soft long shadow under an object
export const Shade: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 0.22 }) => <ellipse cx={x} cy={y} rx={w} ry={w * 0.14} fill={INK} opacity={o} />

// # THE HOME: two-storey house with terracotta roof, chimney, lit windows, door, porch step; shown 0..1 builds walls
export const Home: React.FC<{ id: string; x: number; y: number; s?: number; o?: number; wall?: string; roof?: string; lit?: number; owned?: number; grey?: number }> = ({ id, x, y, s = 1, o = 1, wall = '#F6E3C4', roof = BRICK, lit = 0.6, owned = 0, grey = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <defs>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={wall} /><stop offset="100%" stopColor="#E2C79F" /></linearGradient>
      <linearGradient id={`${id}-roof`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={roof} /><stop offset="100%" stopColor={BRICKD} /></linearGradient>
      <clipPath id={`${id}-clip`}><rect x={-200} y={-150} width={400} height={300} /></clipPath>
    </defs>
    <Shade x={30} y={152} w={260} />
    <rect x={110} y={-250} width={44} height={90} fill="#B8664F" /><rect x={104} y={-258} width={56} height={14} fill="#8E4A38" />
    <rect x={-200} y={-150} width={400} height={300} fill={`url(#${id}-wall)`} stroke={INK} strokeWidth={5} />
    {/* # the part you own fills the walls sage from the bottom (owned 0..1) */}
    {owned > 0 && <g clipPath={`url(#${id}-clip)`}><rect x={-200} y={150 - 300 * owned} width={400} height={300 * owned} fill={SAGE} opacity={0.85} /></g>}
    <path d="M-240 -140 L0 -300 L240 -140 Z" fill={`url(#${id}-roof)`} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    {[-120, 120].map((wx, k) => <g key={k}>{[-80, 20].map((wy, j) => <g key={j}><rect x={wx - 42} y={wy - 36} width={84} height={72} rx={6} fill={lit > 0.5 ? '#FFD983' : '#9FC3E4'} stroke={INK} strokeWidth={4} />
      <rect x={wx - 42} y={wy - 36} width={84} height={72} rx={6} fill="#FFF2C0" opacity={0.5 * lit} /><path d={`M${wx} ${wy - 36} L${wx} ${wy + 36} M${wx - 42} ${wy} L${wx + 42} ${wy}`} stroke={INK} strokeWidth={3} /></g>)}</g>)}
    <rect x={-40} y={40} width={80} height={110} rx={8} fill="#6C4A3A" stroke={INK} strokeWidth={4} /><circle cx={22} cy={98} r={6} fill={GOLD} />
    <rect x={-70} y={148} width={140} height={14} rx={4} fill="#C9B79A" stroke={INK} strokeWidth={3} />
    {grey > 0 && <path d="M-240 -140 L0 -300 L240 -140 L200 -140 L200 150 L-200 150 L-200 -140 Z" fill="#5A5870" opacity={0.5 * grey} />}
  </g>
)

// # the lender's hall: stone steps, columns, pediment with a coin emblem (middle layer)
export const LenderHall: React.FC<{ id: string; x: number; y: number; s?: number; o?: number; name?: string }> = ({ id, x, y, s = 1, o = 1, name = 'LENDER' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <defs><linearGradient id={`${id}-stone`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#F3EBDD" /><stop offset="100%" stopColor="#CFC2AC" /></linearGradient></defs>
    <Shade x={20} y={10} w={300} />
    <rect x={-270} y={-30} width={540} height={36} fill="#D9CDB7" stroke={INK} strokeWidth={4} /><rect x={-240} y={-60} width={480} height={34} fill="#E4D9C4" stroke={INK} strokeWidth={4} />
    <rect x={-220} y={-330} width={440} height={272} fill={`url(#${id}-stone)`} stroke={INK} strokeWidth={4} />
    {[-165, -55, 55, 165].map((cx, k) => <g key={k}><rect x={cx - 24} y={-320} width={48} height={256} fill="#FBF6EC" stroke={INK} strokeWidth={3} />{[-12, 0, 12].map((d) => <path key={d} d={`M${cx + d} -310 L${cx + d} -72`} stroke="#D8CDB8" strokeWidth={3} />)}</g>)}
    <rect x={-250} y={-372} width={500} height={44} fill="#E9DFCC" stroke={INK} strokeWidth={4} />
    <path d="M-262 -372 L0 -480 L262 -372 Z" fill="#F1E8D8" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={0} cy={-412} r={26} fill={GOLD} stroke={GOLDD} strokeWidth={5} /><Label x={0} y={-401} text="$" size={34} font="Bebas Neue" color={GOLDD} />
    <rect x={-120} y={-366} width={240} height={34} rx={6} fill={PLUM} /><Label x={0} y={-340} text={name} size={30} font="Bebas Neue" color={CREAM} />
  </g>
)

// # FOR SALE / SOLD yard sign on a post
export const YardSign: React.FC<{ x: number; y: number; t: string; o?: number; col?: string; r?: number }> = ({ x, y, t, o = 1, col = BRICK, r = 0 }) => { const hw = Math.max(100, 30 + t.length * 11); return (
  <g transform={`translate(${x} ${y}) rotate(${r})`} opacity={o}>
    <rect x={-6} y={-150} width={12} height={150} fill="#8E6A4E" /><rect x={-hw - 10} y={-150} width={2 * hw + 20} height={12} fill="#8E6A4E" />
    <rect x={-hw} y={-138} width={2 * hw} height={96} rx={10} fill={CREAM} stroke={col} strokeWidth={8} />
    <Label x={0} y={-74} text={t} size={46} font="Bebas Neue" color={col} />
  </g>
) }

// # a gold price tag on a string (width follows text)
export const Tag: React.FC<{ x: number; y: number; t: string; o?: number; s?: number; col?: string; ink?: string; r?: number }> = ({ x, y, t, o = 1, s = 1, col = GOLD, ink = INK, r = 0 }) => {
  const w = 60 + t.length * 30
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <path d={`M${-w / 2 - 40} 0 L${-w / 2} -46 L${w / 2} -46 L${w / 2} 46 L${-w / 2} 46 Z`} fill={col} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <circle cx={-w / 2 - 14} cy={0} r={9} fill={CREAM} stroke={INK} strokeWidth={3} />
      <Label x={14} y={18} text={t} size={54} font="Bebas Neue" color={ink} />
    </g>
  )
}

// # a stack of coins (n coins), gold or brick-red
export const Coins: React.FC<{ x: number; y: number; n: number; col?: string; o?: number; s?: number }> = ({ x, y, n, col = GOLD, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => <g key={i} transform={`translate(${(i % 2) * 3} ${-i * 16})`}>
      <ellipse cx={0} cy={6} rx={46} ry={14} fill={col === GOLD ? GOLDD : BRICKD} /><rect x={-46} y={-8} width={92} height={14} fill={col === GOLD ? GOLDD : BRICKD} /><ellipse cx={0} cy={-8} rx={46} ry={14} fill={col} stroke={INK} strokeWidth={2} /></g>)}
  </g>
)

// # a sage brick (a piece of your home)
export const Brick: React.FC<{ x: number; y: number; o?: number; s?: number; t?: string }> = ({ x, y, o = 1, s = 1, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-30} width={120} height={60} rx={8} fill={SAGE} stroke={INK} strokeWidth={4} /><rect x={-52} y={-24} width={104} height={12} rx={6} fill="#A9D5A2" opacity={0.7} />
    {t && <Label x={0} y={86} text={t} size={38} font="Bebas Neue" color={SAGED} />}
  </g>
)

// # a piggy bank (the down payment savings)
export const Piggy: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number }> = ({ x, y, s = 1, o = 1, fill = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shade x={0} y={110} w={150} />
    {[-70, 70].map((lx) => <rect key={lx} x={lx - 18} y={60} width={36} height={52} rx={10} fill="#E58FA0" stroke={INK} strokeWidth={4} />)}
    <ellipse cx={0} cy={0} rx={150} ry={110} fill="#F4A7B5" stroke={INK} strokeWidth={5} />
    <ellipse cx={-30} cy={-40} rx={70} ry={30} fill="#FFD0D8" opacity={0.7} />
    <ellipse cx={150} cy={10} rx={34} ry={40} fill="#F08DA0" stroke={INK} strokeWidth={4} /><circle cx={142} cy={2} r={6} fill={INK} /><circle cx={158} cy={18} r={6} fill={INK} />
    <circle cx={90} cy={-40} r={9} fill={INK} /><path d="M60 -100 L80 -140 L100 -96 Z" fill="#E58FA0" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-40} y={-112} width={80} height={10} rx={5} fill={INK} />
    <Label x={0} y={30} text={`${Math.round(fill * 100) === 100 ? '' : ''}`} size={10} />
  </g>
)

// # the claim ribbon: a gold ribbon from the lender's hand-held key to the home (the lien). p 0..1 draws it
export const ClaimRibbon: React.FC<{ a: [number, number]; b: [number, number]; p: number; o?: number }> = ({ a, b, p, o = 1 }) => {
  const mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 90
  const pt = (t: number) => [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * mx + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * my + t * t * b[1]]
  const n = 30, pts = Array.from({ length: n + 1 }, (_, i) => pt((i / n) * clamp01(p)))
  return <g opacity={o}><path d={'M' + pts.map(([x, y]) => `${x} ${y}`).join(' L')} fill="none" stroke={GOLDD} strokeWidth={14} strokeLinecap="round" strokeDasharray="2 22" />
    <path d={'M' + pts.map(([x, y]) => `${x} ${y}`).join(' L')} fill="none" stroke={GOLD} strokeWidth={6} strokeLinecap="round" /></g>
}

// # a big brass key
export const Key: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <circle cx={-70} cy={0} r={44} fill={GOLD} stroke={INK} strokeWidth={5} /><circle cx={-70} cy={0} r={18} fill={CREAM} stroke={INK} strokeWidth={4} />
    <rect x={-30} y={-12} width={130} height={24} rx={6} fill={GOLD} stroke={INK} strokeWidth={5} />
    <rect x={64} y={10} width={16} height={30} fill={GOLD} stroke={INK} strokeWidth={4} /><rect x={88} y={10} width={12} height={22} fill={GOLD} stroke={INK} strokeWidth={4} />
  </g>
)

// # an umbrella (mortgage insurance) held over something; open 0..1
export const Umbrella: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; col?: string }> = ({ x, y, s = 1, o = 1, open = 1, col = '#5A8FD0' }) => {
  const w = lerp(30, 200, open)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d={`M0 -10 L0 200 Q0 236 -34 236`} fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" />
      <path d={`M${-w} 0 Q0 ${-w * 0.9} ${w} 0 Q${w * 0.66} -24 ${w * 0.33} 0 Q0 -24 ${-w * 0.33} 0 Q${-w * 0.66} -24 ${-w} 0 Z`} fill={col} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M${-w * 0.5} -${w * 0.38} Q0 ${-w * 0.7} ${w * 0.4} -${w * 0.4}`} fill="none" stroke="#FFFFFF" strokeOpacity={0.4} strokeWidth={8} strokeLinecap="round" />
    </g>
  )
}

// # a rounded gauge: how much of the home's original price you still owe (v 0..1); mark at 80% / 78%
export const OweGauge: React.FC<{ x: number; y: number; v: number; o?: number; s?: number; marks?: number[] }> = ({ x, y, v, o = 1, s = 1, marks = [0.8, 0.78] }) => {
  const ang = (t: number) => Math.PI * (1 - t)
  const P = (t: number, r: number) => [Math.cos(ang(t)) * r, -Math.sin(ang(t)) * r]
  const [nx, ny] = P(v, 190)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M-240 0 A240 240 0 0 1 240 0" fill="none" stroke="#E9DCC6" strokeWidth={60} />
      <path d={`M-240 0 A240 240 0 0 1 ${P(v, 240)[0]} ${P(v, 240)[1]}`} fill="none" stroke={BRICK} strokeWidth={60} />
      {marks.map((m, k) => { const [ax, ay] = P(m, 286), [bx, by] = P(m, 206); return <g key={k}><path d={`M${ax} ${ay} L${bx} ${by}`} stroke={k ? SAGED : GOLDD} strokeWidth={8} />{k === 0 && <Label x={P(m, 330)[0]} y={P(m, 330)[1] + 12} text={`${Math.round(m * 100)}%`} size={40} font="Bebas Neue" color={k ? SAGED : GOLDD} />}</g> })}
      <path d={`M0 0 L${nx} ${ny}`} stroke={INK} strokeWidth={12} strokeLinecap="round" /><circle r={22} fill={INK} />
      <Label x={0} y={80} text={`OWED: ${Math.round(v * 100)}%`} size={50} font="Bebas Neue" color={INK} />
    </g>
  )
}

// # a cozy room wall + floor with a window letting in sunset light (interior settings)
export const Room: React.FC<{ id: string; wall?: string; floor?: string; win?: [number, number, number, number]; glow?: number; night?: number }> = ({ id, wall = '#F3D9B8', floor = '#B98A62', win = [1260, 220, 460, 400], glow = 1, night = 0 }) => {
  const [wx, wy, ww, wh] = win
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-w`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={wall} /><stop offset="100%" stopColor="#E6C29A" /></linearGradient>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={floor} /><stop offset="100%" stopColor="#8C6446" /></linearGradient>
        <linearGradient id={`${id}-out`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={night ? NIGHT : '#8E7AB4'} /><stop offset="100%" stopColor={night ? '#5A4A7A' : '#FFC48A'} /></linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFE6B0" stopOpacity={0.45 * glow} /><stop offset="100%" stopColor="#FFE6B0" stopOpacity={0} /></linearGradient>
      </defs>
      <rect x={0} y={0} width={1920} height={1080} fill={`url(#${id}-w)`} />
      {Array.from({ length: 14 }, (_, i) => <rect key={i} x={i * 140} y={0} width={4} height={800} fill="#E2C39E" opacity={0.5} />)}
      <rect x={0} y={800} width={1920} height={280} fill={`url(#${id}-f)`} />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${i * 240} 800 L${i * 240 - 120} 1080`} stroke="#9C7252" strokeWidth={3} opacity={0.5} />)}
      <rect x={0} y={792} width={1920} height={14} fill="#D9B48C" />
      <rect x={wx - 16} y={wy - 16} width={ww + 32} height={wh + 32} rx={10} fill="#FBF1E2" stroke={INK} strokeWidth={4} />
      <rect x={wx} y={wy} width={ww} height={wh} fill={`url(#${id}-out)`} />
      <circle cx={wx + ww * 0.7} cy={wy + wh * 0.72} r={44} fill="#FFF0C4" opacity={1 - night} />
      <path d={`M${wx} ${wy + wh * 0.8} Q ${wx + ww * 0.3} ${wy + wh * 0.65} ${wx + ww * 0.6} ${wy + wh * 0.78} T ${wx + ww} ${wy + wh * 0.74} L${wx + ww} ${wy + wh} L${wx} ${wy + wh} Z`} fill="#8FAF7E" />
      <path d={`M${wx + ww / 2} ${wy} L${wx + ww / 2} ${wy + wh} M${wx} ${wy + wh / 2} L${wx + ww} ${wy + wh / 2}`} stroke="#FBF1E2" strokeWidth={12} />
      <path d={`M${wx} ${wy + wh} L${wx + ww} ${wy + wh} L${wx + ww - 460} 1080 L${wx - 520} 1080 Z`} fill={`url(#${id}-beam)`} />
    </g>
  )
}

// # a wooden table edge (front layer)
export const Table: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <g><rect x={x - w / 2} y={y} width={w} height={34} rx={8} fill="#A8704A" stroke={INK} strokeWidth={4} /><rect x={x - w / 2 + 40} y={y + 34} width={26} height={1080 - y} fill="#8A5A3A" /><rect x={x + w / 2 - 66} y={y + 34} width={26} height={1080 - y} fill="#8A5A3A" />
    <rect x={x - w / 2} y={y} width={w} height={8} rx={4} fill="#C98F62" /></g>
)

// # the monthly bill envelope with a window showing an amount
export const Envelope: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; open?: number; r?: number }> = ({ x, y, s = 1, o = 1, t = '', open = 0, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-100} width={340} height={200} rx={12} fill="#FFFBF2" stroke={INK} strokeWidth={5} />
    <path d={`M-170 -100 L0 ${lerp(10, -200, open)} L170 -100`} fill={open > 0.5 ? '#F5E7CF' : 'none'} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-120} y={10} width={240} height={64} rx={8} fill="#EFE3CC" stroke={INK} strokeWidth={3} />
    <Label x={0} y={56} text={t} size={t.length > 8 ? 38 : 48} font="Bebas Neue" color={INK} />
  </g>
)

// # a glass jar on a shelf (escrow): fill 0..1 with gold coins; label on a paper tag
export const EscrowJar: React.FC<{ id: string; x: number; y: number; fill: number; s?: number; o?: number; t?: string }> = ({ id, x, y, fill, s = 1, o = 1, t = 'ESCROW' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <defs><clipPath id={`${id}-jar`}><rect x={-110} y={-200} width={220} height={260} rx={40} /></clipPath></defs>
    <rect x={-90} y={-236} width={180} height={40} rx={10} fill="#B88A5A" stroke={INK} strokeWidth={4} />
    <rect x={-110} y={-200} width={220} height={260} rx={40} fill="#E6F2F4" opacity={0.55} stroke={INK} strokeWidth={5} />
    <g clipPath={`url(#${id}-jar)`}>{Array.from({ length: Math.round(18 * clamp01(fill)) }, (_, i) => <ellipse key={i} cx={-70 + (i % 4) * 46 + ((i >> 2) % 2) * 20} cy={40 - Math.floor(i / 4) * 34} rx={30} ry={12} fill={GOLD} stroke={GOLDD} strokeWidth={3} />)}</g>
    <rect x={-80} y={-150} width={22} height={160} rx={11} fill="#FFFFFF" opacity={0.45} />
    <rect x={-80} y={-60} width={160} height={52} rx={8} fill={CREAM} stroke={INK} strokeWidth={3} /><Label x={0} y={-22} text={t} size={36} font="Bebas Neue" color={INK} />
  </g>
)

// # a big wall calendar page showing a grid of months (filled = paid)
export const MonthGrid: React.FC<{ x: number; y: number; paid: number; total?: number; o?: number; s?: number; cols?: number }> = ({ x, y, paid, total = 360, o = 1, s = 1, cols = 30 }) => {
  const rows = Math.ceil(total / cols), cw = 22, ch = 22
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-cols * cw / 2 - 30} y={-60} width={cols * cw + 60} height={rows * ch + 100} rx={16} fill="#FFFBF2" stroke={INK} strokeWidth={5} />
      <rect x={-cols * cw / 2 - 30} y={-60} width={cols * cw + 60} height={40} rx={16} fill={BRICK} />
      {[-200, 200].map((rx) => <circle key={rx} cx={rx} cy={-60} r={12} fill={INK} />)}
      {Array.from({ length: total }, (_, i) => <rect key={i} x={-cols * cw / 2 + (i % cols) * cw + 2} y={-10 + Math.floor(i / cols) * ch} width={cw - 5} height={ch - 5} rx={3} fill={i < paid ? SAGE : '#EDE2CF'} />)}
    </g>
  )
}

// # a seesaw in the park: tilt -1 (left side down) .. 1 (right side down); loads drawn by the scene
export const Seesaw: React.FC<{ x: number; y: number; tilt: number; L?: React.ReactNode; R?: React.ReactNode; o?: number }> = ({ x, y, tilt, L, R, o = 1 }) => {
  const a = tilt * 14
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <Shade x={0} y={170} w={520} o={0.18} />
      <path d="M-90 170 L0 10 L90 170 Z" fill="#C9673F" stroke={INK} strokeWidth={6} strokeLinejoin="round" /><circle cx={0} cy={10} r={20} fill={GOLD} stroke={INK} strokeWidth={5} />
      <g transform={`rotate(${a})`}>
        <rect x={-560} y={-14} width={1120} height={30} rx={14} fill="#E9B062" stroke={INK} strokeWidth={6} />
        <rect x={-560} y={-14} width={1120} height={10} rx={5} fill="#F8D28C" />
        {[-470, 470].map((hx) => <rect key={hx} x={hx - 10} y={-70} width={20} height={58} rx={6} fill="#8E5A3A" />)}
        <g transform="translate(-380 -14)"><g transform={`rotate(${-a})`}>{L}</g></g>
        <g transform="translate(380 -14)"><g transform={`rotate(${-a})`}>{R}</g></g>
      </g>
    </g>
  )
}

// # a winding road up a hill to a home: len 0..1 how far the walker has gone; steep or gentle
export const HillRoad: React.FC<{ id: string; pts: [number, number][]; p?: number; col?: string; o?: number; w?: number }> = ({ id, pts, p = 0, col = '#E9D3AE', o = 1, w = 54 }) => {
  const d = 'M' + pts.map(([x, y]) => `${x} ${y}`).join(' L')
  return <g opacity={o}><path d={d} fill="none" stroke="#B49870" strokeWidth={w + 10} strokeLinejoin="round" strokeLinecap="round" /><path d={d} fill="none" stroke={col} strokeWidth={w} strokeLinejoin="round" strokeLinecap="round" />
    <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={5} strokeDasharray="22 26" strokeLinecap="round" /><path id={id} d={d} fill="none" stroke="none" />{p > 0 && null}</g>
}
// # point at fraction t along a polyline
export const along = (pts: [number, number][], t: number): [number, number] => {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = seg.reduce((a, b) => a + b, 0)
  let d = clamp01(t) * tot
  for (let i = 0; i < seg.length; i++) { if (d <= seg[i]) { const k = d / seg[i]; return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)] } d -= seg[i] }
  return pts[pts.length - 1]
}

// # a round tree with a trunk (garden / park dressing)
export const Tree: React.FC<{ x: number; y: number; s?: number; col?: string; o?: number }> = ({ x, y, s = 1, col = '#6FA463', o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shade x={20} y={4} w={110} />
    <path d="M-14 0 L-10 -140 L10 -140 L14 0 Z" fill="#8A5A3A" />
    <circle cx={0} cy={-200} r={100} fill={col} /><circle cx={-60} cy={-160} r={64} fill={col} /><circle cx={64} cy={-150} r={60} fill={col} />
    <circle cx={-30} cy={-240} r={44} fill="#9CCB8A" opacity={0.6} />
  </g>
)

// # a low picket fence across the front (front layer)
export const Fence: React.FC<{ x0: number; x1: number; y: number; col?: string }> = ({ x0, x1, y, col = '#FFF7EA' }) => (
  <g>{Array.from({ length: Math.floor((x1 - x0) / 46) + 1 }, (_, i) => <path key={i} d={`M${x0 + i * 46 - 14} ${y} L${x0 + i * 46 - 14} ${y - 90} L${x0 + i * 46} ${y - 110} L${x0 + i * 46 + 14} ${y - 90} L${x0 + i * 46 + 14} ${y} Z`} fill={col} stroke="#C9B79A" strokeWidth={3} />)}
    <rect x={x0 - 20} y={y - 70} width={x1 - x0 + 40} height={14} fill={col} stroke="#C9B79A" strokeWidth={3} /></g>
)

// # a hedge bush
export const Bush: React.FC<{ x: number; y: number; s?: number; col?: string }> = ({ x, y, s = 1, col = '#5E9A55' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse cx={0} cy={0} rx={90} ry={54} fill={col} /><ellipse cx={-50} cy={-20} rx={50} ry={40} fill={col} /><ellipse cx={46} cy={-26} rx={54} ry={44} fill={col} /><ellipse cx={-20} cy={-40} rx={30} ry={20} fill="#8CC27E" opacity={0.6} /></g>
)

// # a wooden signboard with a heading and up to 3 lines (used once per scene, big and clear)
export const Board: React.FC<{ x: number; y: number; w: number; h: number; o?: number; children?: React.ReactNode }> = ({ x, y, w, h, o = 1, children }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2 + 40} y={h / 2 - 10} width={18} height={140} fill="#7A5236" /><rect x={w / 2 - 58} y={h / 2 - 10} width={18} height={140} fill="#7A5236" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill="#B98454" stroke={INK} strokeWidth={6} />
    <rect x={-w / 2 + 16} y={-h / 2 + 16} width={w - 32} height={h - 32} rx={12} fill="#FFF4E2" />
    {children}
  </g>
)
