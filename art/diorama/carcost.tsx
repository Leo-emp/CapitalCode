// ============================================================
// LONG VIDEO — "What Your Car Really Costs" (≈ 4:39, s1–s49),
// nine wide diorama pieces between chapter cards.
// Sourced: Edmunds Q3 2026 (payment $787, financed $44,664, APR 7.0%,
// 84+ month loans 25.5%, $1,000+ payments 21.2%, lifetime interest
// $9,938); AAA Your Driving Costs 2026 (weighted average $12,863/yr,
// $1,071.92/mo, $35.24/day, 85.75¢/mile; depreciation $4,422; insurance
// $2,098; finance $1,184; license/registration/taxes $802; fuel 17.32¢
// and maintenance 11.73¢ a mile; MSRP $39,376; small sedan $9,259;
// half-ton pickup $16,449; 10k mi/yr $10,992; medium sedans EV/gas/hybrid).
// Our maths: monthly lines, $703.46 billed, 34.4%, $22,110, 56%, $64,315.
// House rules (owner r22/r26/r27): every word and number shows ON its
// spoken word, never before; one headline slot whose lines hand over
// without overlapping; text ≥ 44 px; nothing under the corner logo.
// ============================================================
import React from 'react'
import { getProp } from '../props/registry'
import { Mini } from '../rig/Mini'
import { Calendar, Label } from './charts'
import { easeInOut, easeOut, lerp, on, P, Pedestal, pop, rnd, span, Stage, Vignette } from './kit'
import { makePiece, type PieceProps } from './registry'

const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> = ({ id, x, y, size, f }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} />
}
// # visible from a to b with clean fades (gone by b)
const win = (f: number, a: number, b: number, d = 8) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
// # camera: on each cue the view eases to [cue, focus x, focus y, zoom]; Stage, headline and vignette stay put
type CamKey = [at: number, x: number, y: number, s: number]
const camera = (f: number, keys: CamKey[], d = 14) => {
  let x = 960, y = 540, z = 1
  for (const [at, kx, ky, ks] of keys) { const t = easeInOut(span(f, at, at + d)); x = lerp(x, kx, t); y = lerp(y, ky, t); z = lerp(z, ks, t) }
  return `translate(${x} ${y}) scale(${z}) translate(${-x} ${-y})`
}
// # the headline slot: each line from its cue until the next line's cue — never two at once
type Head = [at: number, text: string, color?: string, size?: number]
const Headline: React.FC<{ f: number; lines: Head[]; until: number; y?: number }> = ({ f, lines, until, y = 150 }) => (
  <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    return o > 0.001 ? <g key={k} transform={`translate(960 ${y}) scale(${0.95 + 0.05 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 96} font="Bebas Neue" color={color ?? P.ink} o={o} /></g> : null
  })}</g>
)

// ------------------------------------------------------------ the cast of objects
type CarKind = 'sedan' | 'small' | 'pickup'
// # a side-view car facing right, wheels on y = 0; badge 'ev' (plug) or 'hy' (leaf); age 0→1 fades the paint and adds rust
const Car: React.FC<{ x: number; y: number; s?: number; color?: string; kind?: CarKind; o?: number; spin?: number; badge?: 'ev' | 'hy'; age?: number; flip?: boolean }> = ({ x, y, s = 1, color = '#D95A4E', kind = 'sedan', o = 1, spin = 0, badge, age = 0, flip }) => {
  const wheel = (cx: number, r: number) => (
    <g transform={`translate(${cx} ${-r})`}>
      <circle r={r} fill="#1B2233" /><circle r={r * 0.62} fill="#C9D1DE" /><circle r={r * 0.22} fill="#6B7689" />
      <g transform={`rotate(${spin * 360})`}>{[0, 72, 144, 216, 288].map((a) => <rect key={a} x={-3} y={-r * 0.6} width={6} height={r * 0.38} rx={3} fill="#8C97AA" transform={`rotate(${a})`} />)}</g>
    </g>
  )
  const paint = age > 0 ? `color-mix(in srgb, ${color} ${100 - 35 * age}%, #8A8F99)` : color
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={kind === 'small' ? 270 : 330} ry={20} fill="#000" opacity={0.22} />
      {kind === 'pickup' ? (
        <g>
          <path d="M-330 -60 Q-330 -150 -300 -150 L-60 -150 L-60 -235 Q-60 -250 -40 -250 L120 -250 Q150 -250 175 -215 L225 -150 L300 -140 Q340 -132 340 -80 L340 -50 Q340 -30 320 -30 L-310 -30 Q-330 -30 -330 -60 Z" fill={paint} />
          <path d="M-40 -232 L110 -232 Q135 -232 152 -205 L190 -158 L-40 -158 Z" fill="#2B4A78" /><path d="M-30 -226 L40 -226 L-10 -165 L-30 -165 Z" fill="#5BCBFF" opacity={0.35} />
          <rect x={-320} y={-150} width={250} height={14} rx={6} fill="#000" opacity={0.15} />
          <rect x={-330} y={-92} width={670} height={10} fill="#000" opacity={0.1} />
          <path d="M60 -150 L60 -40" stroke="#000" strokeOpacity={0.18} strokeWidth={4} />
          <circle cx={326} cy={-105} r={16} fill={P.gold} /><rect x={-334} y={-120} width={14} height={34} rx={6} fill={P.coral} />
          {wheel(-200, 62)}{wheel(215, 62)}
        </g>
      ) : (
        <g transform={kind === 'small' ? 'scale(0.84)' : undefined}>
          <path d="M-310 -50 Q-310 -118 -262 -124 L-176 -132 Q-112 -212 -14 -218 L92 -218 Q156 -212 206 -138 L276 -126 Q320 -118 320 -66 L320 -46 Q320 -26 298 -26 L-290 -26 Q-310 -26 -310 -50 Z" fill={paint} />
          <path d="M-150 -134 Q-100 -198 -28 -202 L-28 -134 Z" fill="#2B4A78" /><path d="M-8 -202 L86 -202 Q136 -198 180 -134 L-8 -134 Z" fill="#2B4A78" />
          <path d="M-120 -140 Q-90 -185 -60 -195 L-90 -140 Z M30 -198 L60 -198 L20 -140 L0 -140 Z" fill="#5BCBFF" opacity={0.35} />
          <path d="M-300 -86 Q0 -96 312 -84" stroke="#FFFFFF" strokeOpacity={0.22} strokeWidth={8} fill="none" />
          <path d="M-18 -134 L-18 -34 M-170 -126 L-176 -40" stroke="#000" strokeOpacity={0.18} strokeWidth={4} />
          <rect x={10} y={-112} width={40} height={10} rx={5} fill="#000" opacity={0.22} />
          <ellipse cx={304} cy={-92} rx={14} ry={10} fill={P.gold} /><rect x={-312} y={-104} width={12} height={30} rx={5} fill={P.coral} />
          {wheel(-180, 56)}{wheel(196, 56)}
          {age > 0.05 && [[-220, -60], [-60, -50], [120, -64], [240, -54]].map(([rx, ry], k) => <circle key={k} cx={rx} cy={ry} r={8 + 10 * age * rnd(k)} fill="#9A5B33" opacity={0.6 * age} />)}
        </g>
      )}
      {badge && (
        <g transform={`translate(${kind === 'pickup' ? 40 : 70} ${kind === 'pickup' ? -300 : -280}) scale(${flip ? -1 : 1} 1)`}>
          <circle r={42} fill={badge === 'ev' ? P.sky : P.mint} stroke="#FFFFFF" strokeWidth={5} />
          {badge === 'ev' ? <path d="M6 -26 L-14 4 L0 4 L-6 26 L14 -6 L0 -6 Z" fill="#FFFFFF" /> : <path d="M-16 18 Q-20 -18 20 -22 Q22 16 -16 18 Z M-16 18 L8 -8" fill="#FFFFFF" stroke="#2A9D6B" strokeWidth={3} />}
        </g>
      )}
    </g>
  )
}
// # a paper bill (envelope) with a label
const Envelope: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string; cross?: number }> = ({ x, y, s = 1, r = 0, o = 1, text, cross = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-92} width={300} height={190} rx={16} fill="#000" opacity={0.16} transform="translate(8 10)" />
    <rect x={-150} y={-95} width={300} height={190} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <path d="M-150 -85 L0 20 L150 -85" fill="none" stroke="#C8B994" strokeWidth={6} strokeLinejoin="round" />
    {text && <text x={0} y={72} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>{text}</text>}
    {cross > 0 && <path d={`M-170 -115 L${-170 + 340 * Math.min(1, cross * 2)} ${-115 + 230 * Math.min(1, cross * 2)} ${cross > 0.5 ? `M170 -115 L${170 - 340 * (cross * 2 - 1)} ${-115 + 230 * (cross * 2 - 1)}` : ''}`} stroke={P.coral} strokeWidth={20} strokeLinecap="round" />}
  </g>
)
// # a big window sticker / price tag on a string
const Tag: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; top: string; sub?: string; subO?: number; color?: string; strike?: number }> = ({ x, y, s = 1, r = 0, o = 1, top, sub, subO = 1, color, strike = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M0 -190 L0 -120" stroke={P.ink2} strokeWidth={5} />
    <rect x={-190} y={-110} width={380} height={230} rx={26} fill="#000" opacity={0.18} transform="translate(10 12)" />
    <rect x={-190} y={-120} width={380} height={230} rx={26} fill={color ?? P.paper} stroke={P.edge} strokeWidth={3} />
    <circle cx={0} cy={-90} r={13} fill={P.navy1} />
    <text x={0} y={20} textAnchor="middle" fill={P.navy0} style={{ font: '400 120px "Bebas Neue"' }}>{top}</text>
    {sub && <text x={0} y={88} textAnchor="middle" fill={P.navy2} opacity={subO} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 2 }}>{sub}</text>}
    {strike > 0 && <rect x={-200} y={-14} width={400 * strike} height={22} rx={11} fill={P.coral} transform="rotate(-12)" />}
  </g>
)
// # a paper bank note and a gold coin
const Note: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}><rect x={-60} y={-34} width={120} height={68} rx={9} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={5} /><circle r={18} fill="none" stroke="#3E8A4E" strokeWidth={4} /><text y={12} textAnchor="middle" fill="#1F5A2E" style={{ font: '400 34px "Bebas Neue"' }}>$</text></g>
)
const Coin: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><ellipse cx={0} cy={8} rx={44} ry={16} fill={P.goldD} /><ellipse cx={0} cy={0} rx={44} ry={16} fill={P.gold} /><ellipse cx={0} cy={0} rx={30} ry={10} fill="none" stroke={P.goldD} strokeWidth={3} /></g>
)
// # a dial: 1 = full, 0 = empty; label under it
const Gauge: React.FC<{ x: number; y: number; s?: number; v: number; label: string; o?: number }> = ({ x, y, s = 1, v, label, o = 1 }) => {
  const a = Math.PI * (1 - v), nx = Math.cos(a) * -1 * 150, ny = -Math.sin(a) * 150
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <circle r={210} fill={P.card} />
      <path d="M-170 0 A170 170 0 0 1 170 0" fill="none" stroke={P.navy3} strokeWidth={34} />
      <path d={`M-170 0 A170 170 0 0 1 ${-Math.cos(Math.PI * v) * 170} ${-Math.sin(Math.PI * v) * 170}`} fill="none" stroke={v > 0.5 ? P.mint : v > 0.3 ? P.gold : P.coral} strokeWidth={34} />
      <path d={`M0 0 L${-nx} ${ny}`} stroke={P.white} strokeWidth={12} strokeLinecap="round" /><circle r={24} fill={P.white} />
      <Label x={0} y={110} text={label} size={60} font="Bebas Neue" color={P.ink} />
    </g>
  )
}
// # an odometer strip
const Odo: React.FC<{ x: number; y: number; s?: number; text: string; o?: number; unit?: string }> = ({ x, y, s = 1, text, o = 1, unit = 'MILES' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-210} y={-70} width={420} height={140} rx={24} fill="#141B2B" stroke={P.navy4} strokeWidth={5} />
    <text x={0} y={30} textAnchor="middle" fill={P.white} style={{ font: '400 96px "Bebas Neue"', letterSpacing: 8 }}>{text}</text>
    <text x={0} y={120} textAnchor="middle" fill={P.ink2} style={{ font: '400 58px "Bebas Neue"', letterSpacing: 3 }}>{unit}</text>
  </g>
)
// # a cost block in a stack: icon, name, monthly amount
const Block: React.FC<{ x: number; y: number; w: number; h: number; color: string; name: string; value?: string; vo?: number; o?: number }> = ({ x, y, w, h, color, name, value, vo = 1, o = 1 }) => (
  <g opacity={o}>
    <rect x={x} y={y + 6} width={w} height={h} rx={14} fill="#000" opacity={0.14} />
    <rect x={x} y={y} width={w} height={h} rx={14} fill={color} />
    {h >= 50 && <text x={x + 26} y={y + h / 2 + 18} fill={P.navy0} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 1 }}>{name}</text>}
    {value && h >= 50 && <text x={x + w - 26} y={y + h / 2 + 18} textAnchor="end" fill={P.navy0} opacity={vo} style={{ font: '400 54px "Bebas Neue"' }}>{value}</text>}
  </g>
)
// # a horizontal bar with a label above and a value at its end
const HBar: React.FC<{ x: number; y: number; w: number; h?: number; color: string; label: string; value?: string; vo?: number; o?: number }> = ({ x, y, w, h = 100, color, label, value, vo = 1, o = 1 }) => (
  <g opacity={o}>
    <Label x={x} y={y - 22} text={label} size={52} font="Bebas Neue" color={P.ink} anchor="start" />
    <rect x={x} y={y + 8} width={Math.max(0, w)} height={h} rx={18} fill="#000" opacity={0.12} />
    <rect x={x} y={y} width={Math.max(0, w)} height={h} rx={18} fill={color} />
    {value && <Label x={x + w + 24} y={y + h / 2 + 24} text={value} size={72} font="Bebas Neue" color={P.ink} anchor="start" o={vo} />}
  </g>
)
// # a round icon medallion with a caption
const Medal: React.FC<{ x: number; y: number; id: string; text?: string; f: number; at: number; r?: number; o?: number }> = ({ x, y, id, text, f, at, r = 120, o = 1 }) => (
  <g opacity={on(f, at, 6) * o} transform={`translate(${x} ${y}) scale(${pop(f, at)})`}>
    <circle r={r} fill={P.card} /><Prop id={id} x={0} y={-6} size={r * 1.25} f={f} />
    {text && <Label x={0} y={r + 66} text={text} size={56} font="Bebas Neue" color={P.ink} />}
  </g>
)
// # a mailbox (flag up when a letter arrives)
const Mailbox: React.FC<{ x: number; y: number; s?: number; flag?: number; o?: number }> = ({ x, y, s = 1, flag = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-12} y={-10} width={24} height={150} fill={P.navy3} />
    <path d="M-120 -10 L-120 -110 Q-120 -170 -60 -170 L60 -170 Q120 -170 120 -110 L120 -10 Z" fill="#3A6EA8" />
    <path d="M-120 -110 Q-120 -170 -60 -170 L-40 -170 Q-90 -160 -90 -110 L-90 -10 L-120 -10 Z" fill="#000" opacity={0.15} />
    <g transform={`translate(120 -100) rotate(${-90 * flag})`}><rect x={0} y={-8} width={14} height={90} fill={P.coral} /><rect x={0} y={-8} width={50} height={34} fill={P.coral} /></g>
  </g>
)
// # a sea line with an iceberg: tip above water (shown) and the mass below (revealed by `below`)
const Iceberg: React.FC<{ x: number; y: number; s?: number; below: number; o?: number }> = ({ x, y, s = 1, below, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <g opacity={0.12 + 0.88 * below}>
      <path d="M-230 0 L-420 90 L-520 230 L-470 360 L-300 470 L-60 520 L200 500 L400 410 L520 250 L470 110 L260 0 Z" fill="#4E9CC7" />
      <path d="M-230 0 L-420 90 L-520 230 L-470 360 L-300 470 L-200 300 L-120 120 Z" fill="#8CC8E6" />
      <path d="M-120 120 L-200 300 L-300 470 L-60 520 L40 300 Z" fill="#6DB3DA" />
      <path d="M260 0 L470 110 L520 250 L400 410 L260 300 L180 120 Z" fill="#3B86B3" />
      <path d="M-120 120 L40 300 L260 300 L180 120 L40 40 Z" fill="#5FA8D2" />
    </g>
    <path d="M-230 0 L-160 -80 L-60 -120 L50 -104 L170 -50 L260 0 Z" fill="#DDEFFB" />
    <path d="M-230 0 L-160 -80 L-60 -120 L-80 -50 L-130 0 Z" fill="#FFFFFF" />
    <path d="M50 -104 L170 -50 L260 0 L120 0 Z" fill="#B9DDF2" />
  </g>
)
const Water: React.FC<{ y: number; f: number; o?: number }> = ({ y, f, o = 1 }) => (
  <g opacity={o}>
    <rect x={-100} y={y} width={2120} height={1200} fill="#0D3A57" opacity={0.55} />
    <path d={`M-100 ${y} ${Array.from({ length: 22 }, (_, k) => `Q${-50 + k * 100} ${y - 14 + Math.sin(f / 14 + k) * 6} ${k * 100} ${y}`).join(' ')} L2020 ${y} L2020 ${y + 12} L-100 ${y + 12} Z`} fill="#5BCBFF" opacity={0.7} />
  </g>
)
// # a little road with dashes, scrolling with frame
const Road: React.FC<{ y: number; f: number; speed?: number; o?: number }> = ({ y, f, speed = 8, o = 1 }) => (
  <g opacity={o}>
    <rect x={-100} y={y} width={2120} height={120} fill="#2A3346" />
    {Array.from({ length: 14 }, (_, k) => <rect key={k} x={((k * 180 - f * speed) % 2520 + 2520) % 2520 - 300} y={y + 54} width={100} height={12} rx={6} fill="#E9C25A" opacity={0.8} />)}
  </g>
)

// ---------------------------------------------------------------- s1–s5: $787 a month · affordable? · not the cost · $1,072 a month · the biggest piece never arrives as a bill
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const payment = c('s1:payment'), car = c('s1:car'), d787 = c('s1:787'), month1 = c('s1:month')
  const buyers = c('s2:buyers'), number = c('s2:number'), decides = c('s2:decides'), affordable = c('s2:affordable')
  const but = c('s3:but'), not3 = c('s3:not'), costs3 = c('s3:costs')
  const add = c('s4:add'), everything = c('s4:everything'), avg4 = c('s4:average'), car4 = c('s4:car'), costs4 = c('s4:costs'), d1072 = c('s4:1072'), month4 = c('s4:month'), own = c('s4:own')
  const biggest = c('s5:biggest'), never = c('s5:never')
  const A = win(f, payment, add), B = on(f, add, 10)
  const sea = 640, carY = sea - 128
  return (
    <g>
      <Stage id="ch" frame={f} />
      <Headline f={f} until={9e9} lines={[[payment, 'THE AVERAGE NEW CAR PAYMENT', P.ink, 92], [affordable, 'AFFORDABLE?', P.ink, 120], [not3, 'NOT WHAT THE CAR COSTS', P.coralInk, 110], [add, 'ADD EVERYTHING UP…', P.ink, 100], [d1072, '$1,072 A MONTH', P.goldInk, 140], [own, 'TO OWN AND RUN', P.ink, 104], [never, 'NEVER ARRIVES AS A BILL', P.coralInk, 110]]} />
      <g transform={camera(f, [[c('s1:month'), 1150, 620, 1.13], [c('s2:buyers'), 900, 640, 1], [c('s2:number'), 1240, 560, 1.12], [c('s3:not'), 960, 540, 1], [c('s4:average'), 960, 620, 1.13], [c('s4:own'), 960, 540, 1]])}>
      {/* # A: the shiny new car, its payment tag swinging in; three buyers judge it by the tag */}
      <g opacity={A}>
        <path d="M900 0 L1220 0 L1560 860 L560 860 Z" fill="#FFFFFF" opacity={0.05 * on(f, car, 14)} />
        <ellipse cx={1060} cy={856} rx={560} ry={70} fill={P.navy3} opacity={0.6 * on(f, payment, 10)} />
        <ellipse cx={1060} cy={846} rx={460} ry={46} fill={P.sky} opacity={0.14 * on(f, car, 10)} />
        <g transform={`translate(${lerp(1600, 1060, easeOut(span(f, payment, car + 6)))} 840)`}><Car x={0} y={0} s={1.15} spin={-(Math.max(0, Math.min(f, car + 6) - payment)) / 30} /></g>
        <g transform={`translate(1240 ${lerp(160, 470, easeOut(span(f, d787, d787 + 12)))}) rotate(${Math.sin((f - d787) / 9) * 6 * (1 - span(f, d787, d787 + 50))})`}>
          <Tag x={0} y={0} s={0.82} top="$787" sub="A MONTH" subO={on(f, month1, 6)} o={on(f, d787, 4)} strike={on(f, not3, 10)} />
        </g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, buyers + k * 4, 6)}><Pedestal x={280 + k * 170} y={900} r={70} /><Mini look={['hero', 'owner', 'investor'][k]} x={280 + k * 170} y={900} scale={1.0} frame={f} seed={k + 3} mood={f >= decides ? 'happy' : 'neutral'} /></g>)}
        <g opacity={on(f, number, 6) * (1 - on(f, but, 8))}><path d="M560 640 Q760 560 1010 520" stroke={P.ink2} strokeWidth={5} strokeDasharray="12 12" fill="none" /></g>
        <g opacity={on(f, decides, 6) * (1 - on(f, not3, 8))} transform={`translate(450 620) scale(${pop(f, decides)})`}><circle r={60} fill={P.mint} /><path d="M-26 2 L-6 22 L28 -18" stroke="#FFFFFF" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
        <g opacity={on(f, costs3, 6)} transform={`translate(450 620) scale(${pop(f, costs3)})`}><circle r={60} fill={P.card} /><Label x={0} y={30} text="?" size={90} font="Bebas Neue" color={P.goldInk} /></g>
      </g>
      {/* # B: the car rides an iceberg — the costs you see above the water, the biggest piece below it */}
      <g opacity={B}>
        <Water y={sea} f={f} o={on(f, add, 12)} />
        <Iceberg x={960} y={sea} s={1.15} below={on(f, biggest, 24)} o={on(f, add, 12)} />
        <g transform={`translate(960 ${carY}) scale(${0.55 * pop(f, add)})`}><Car x={0} y={0} /></g>
        {[['gas-pump', everything], ['shield', avg4], ['receipt', car4], ['interest-percent', costs4]].map(([id, a], k) => (
          <g key={k} opacity={on(f, a as number, 6)} transform={`translate(${520 + k * 290 + (k > 1 ? 300 : 0)} ${lerp(330, 380, on(f, a as number, 10))}) scale(${pop(f, a as number)})`}>
            <circle r={78} fill={P.card} /><Prop id={id as string} x={0} y={-4} size={104} f={f} /></g>
        ))}
        <g opacity={on(f, d1072, 6) * (1 - on(f, biggest, 8))} transform={`translate(1560 500) scale(${pop(f, d1072) * 0.62})`}><Tag x={0} y={0} top="$1,072" sub="A MONTH" subO={on(f, month4, 6)} /></g>
        <g opacity={on(f, biggest, 10)}><Label x={960} y={880} text="?" size={240} font="Bebas Neue" color={P.goldInk} o={0.9} /></g>
        <g opacity={on(f, never, 6)} transform={`translate(1500 860) scale(${pop(f, never) * 0.7}) rotate(6)`}><Envelope x={0} y={0} text="BILL" cross={span(f, never + 6, never + 20)} /></g>
      </g>
      </g>
      <Vignette id="ch" />
    </g>
  )
}

// ---------------------------------------------------------------- s7–s12: the loan — $44,700 at 7% · 1 in 4 run 7+ years · 1 in 5 pay $1,000+ · ≈ $10,000 interest · longer = smaller payments, more interest · most of a payment buys the car · sell it later
const Loan: React.FC<PieceProps> = ({ f, c }) => {
  const pay6 = c('s6:payment'), s7 = c('s7'), loan7 = c('s7:loan'), d447 = c('s7:44700'), d7 = c('s7:7'), int7 = c('s7:interest')
  const one8 = c('s8:one'), four = c('s8:four'), loans8 = c('s8:loans'), seven = c('s8:seven'), longer8 = c('s8:longer')
  const one9 = c('s9:one'), five9 = c('s9:five'), signed = c('s9:signed'), thousand = c('s9:thousand'), month9 = c('s9:month')
  const life = c('s10:life'), pays10 = c('s10:pays'), d10k = c('s10:10000'), interest10 = c('s10:interest')
  const longer = c('s10a:longer'), smaller = c('s10a:smaller'), years10a = c('s10a:years'), total10a = c('s10a:total'), grows = c('s10a:grows')
  const bigger = c('s10b:bigger'), stretched = c('s10b:stretched'), years10b = c('s10b:years'), int10b = c('s10b:interest'), record = c('s10b:record'), rate = c('s10b:rate'), d7b = c('s10b:7')
  const most = c('s11:most'), disappears = c('s11:disappears'), paying = c('s11:paying'), car11 = c('s11:car')
  const car12 = c('s12:car'), sell = c('s12:sell'), later = c('s12:later')
  const A = win(f, pay6, one8), B = win(f, one8, life), Cc = win(f, life, longer), D = win(f, longer, most), E = on(f, most, 8)
  // # loan columns: a short loan (5 years) vs a long loan (7 years) — the long one has lower columns but more of them, and more interest on top
  const cols = (x0: number, n: number, h: number, ih: number, a: number, grow: number) => Array.from({ length: n }, (_, k) => {
    const at = a + k * 3, hh = h * on(f, at, 10)
    return <g key={k} opacity={on(f, at, 6)}>
      <rect x={x0 + k * 92} y={820 - hh} width={70} height={hh} rx={10} fill={P.sky} />
      <rect x={x0 + k * 92} y={820 - hh - ih * grow} width={70} height={ih * grow} rx={10} fill={P.coral} />
    </g>
  })
  return (
    <g>
      <Stage id="cl" frame={f} />
      <Headline f={f} until={9e9} lines={[[d447, 'THE AVERAGE NEW CAR LOAN', P.ink, 96], [one8, '1 IN 4 LOANS', P.ink, 120], [seven, '7 YEARS OR LONGER', P.coralInk, 116], [one9, '1 IN 5 BUYERS', P.ink, 120], [thousand, '$1,000+ A MONTH', P.goldInk, 124],
        [d10k, '≈ $10,000', P.coralInk, 150], [interest10, 'IN INTEREST ALONE', P.coralInk, 110], [longer, 'A LONGER LOAN', P.ink, 110], [smaller, 'SMALLER PAYMENTS…', P.skyInk, 110], [total10a, '…MORE TOTAL INTEREST', P.coralInk, 110], [bigger, 'BIGGER LOANS, MORE YEARS', P.ink, 110], [record, 'RECORD INTEREST', P.coralInk, 116], [rate, 'SAME 7% RATE', P.ink, 116],
        [most, 'MOST OF EACH PAYMENT…', P.ink, 104], [paying, '…PAYS FOR THE CAR', P.mintInk, 116], [sell, 'YOU CAN SELL IT LATER', P.ink, 110]]} />
      <g transform={camera(f, [[c('s7:at'), 1240, 620, 1.13], [c('s7:interest'), 960, 540, 1], [c('s10b:stretched'), 640, 640, 1.12], [c('s10b:total'), 960, 540, 1], [c('s11:payment'), 600, 620, 1.12], [c('s11:disappears'), 960, 540, 1]])}>
      {/* # A: the loan contract; amount and rate land on their words */}
      <g opacity={A}>
        <g opacity={1 - on(f, s7, 8)} transform={`translate(960 560) scale(${pop(f, pay6) * 0.9})`}><Tag x={0} y={0} top="$787" sub="A MONTH" /></g>
        <g opacity={on(f, s7, 8)} transform={`translate(760 600) scale(${pop(f, s7) * 1})`}><Car x={-60} y={250} s={0.7} /></g>
        <g opacity={on(f, loan7, 6)} transform={`translate(1240 560) rotate(4) scale(${pop(f, loan7)})`}>
          <rect x={-200} y={-250} width={400} height={500} rx={22} fill="#000" opacity={0.18} transform="translate(12 14)" />
          <rect x={-200} y={-250} width={400} height={500} rx={22} fill={P.paper} stroke={P.edge} strokeWidth={3} />
          <text x={0} y={-180} textAnchor="middle" fill={P.navy2} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 3 }}>CAR LOAN</text>
          {[0, 1, 2].map((k) => <rect key={k} x={-150} y={-140 + k * 30} width={300 - k * 60} height={12} rx={6} fill="#C8B994" />)}
          <text x={0} y={40} textAnchor="middle" fill={P.navy0} opacity={on(f, d447, 4)} style={{ font: '400 110px "Bebas Neue"' }}>$44,700</text>
          <path d="M-140 170 Q-90 130 -50 170 T40 165 T130 160" stroke={P.navy2} strokeWidth={5} fill="none" opacity={0.7} />
        </g>
        <g opacity={on(f, d7, 6)} transform={`translate(1500 360) scale(${pop(f, d7)})`}><circle r={100} fill={P.coral} /><Label x={0} y={30} text="7%" size={96} font="Bebas Neue" color="#FFFFFF" /><Label x={0} y={160} text="INTEREST" size={52} font="Bebas Neue" color={P.ink} o={on(f, int7, 6)} /></g>
      </g>
      {/* # B: four loans, one with a 7-year ribbon; then five buyers, one signing up for $1,000+ */}
      <g opacity={B}>
        <g opacity={1 - on(f, one9, 8)}>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, k === 0 ? one8 : four + (k - 1) * 3, 6)} transform={`translate(${420 + k * 360} 540) scale(${pop(f, k === 0 ? one8 : four + (k - 1) * 3) * 0.55})`}>
            <rect x={-200} y={-250} width={400} height={500} rx={22} fill={P.paper} stroke={k === 0 && f >= loans8 ? P.gold : P.edge} strokeWidth={k === 0 && f >= loans8 ? 14 : 3} />
            {[0, 1, 2, 3].map((j) => <rect key={j} x={-150} y={-170 + j * 50} width={300 - j * 50} height={18} rx={9} fill="#C8B994" />)}</g>)}
          <g opacity={on(f, seven, 6)}>{Array.from({ length: 7 }, (_, k) => <g key={k} opacity={on(f, seven + k * 2, 5)}><Calendar x={180 + k * 110} y={850} text={`${k + 1}`} s={0.62} /></g>)}</g>
          <g opacity={on(f, longer8, 6)}><path d="M960 850 L1040 850" stroke={P.coralInk} strokeWidth={10} strokeLinecap="round" /><Label x={1060} y={872} text="+" size={90} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
        </g>
        <g opacity={on(f, one9, 8)}>
          {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, k === 0 ? one9 : five9 + (k - 1) * 2, 6) * (k === 0 ? 1 : 1 - 0.45 * on(f, signed, 8))}><Pedestal x={360 + k * 300} y={860} r={80} color={k === 0 && f >= signed ? P.goldD : P.navy4} /><Mini look={['hero', 'owner', 'investor', 'hero', 'owner'][k]} x={360 + k * 300} y={860} scale={1.15} frame={f} seed={k + 11} /></g>)}
          <g opacity={on(f, signed, 6)} transform={`translate(360 470) scale(${pop(f, signed) * 0.85})`}><Tag x={0} y={0} top={f >= thousand ? '$1,000+' : '…'} sub="A MONTH" subO={on(f, month9, 6)} /></g>
        </g>
      </g>
      {/* # C: interest piles up over the life of the loan */}
      <g opacity={Cc}>
        <g transform="translate(960 0)">
          <rect x={-700} y={820} width={1400} height={16} rx={8} fill={P.navy3} />
          {Array.from({ length: 7 }, (_, k) => <g key={k} opacity={on(f, life + k * 3, 6)}><Label x={-600 + k * 200} y={900} text={`YEAR ${k + 1}`} size={46} font="Bebas Neue" color={P.ink2} /></g>)}
          {Array.from({ length: 42 }, (_, k) => {
            const at = pays10 + k * 0.9, col = k % 7, row = Math.floor(k / 7)
            return <Coin key={k} x={-600 + col * 200} y={lerp(420, 790 - row * 44, easeOut(span(f, at, at + 10)))} s={1.9} o={on(f, at, 4)} />
          })}
        </g>
      </g>
      {/* # D: 5-year loan vs 7-year loan — lower columns, more of them, more interest on top; then a bigger loan at the same 7% dial */}
      <g opacity={D * (1 - on(f, bigger, 8))}>
        <Label x={440} y={900} text="SHORTER LOAN" size={52} font="Bebas Neue" color={P.ink} o={on(f, longer, 6)} />
        {cols(240, 5, 360, 50, longer, 1)}
        <Label x={1330} y={900} text="LONGER LOAN" size={52} font="Bebas Neue" color={P.ink} o={on(f, longer, 6)} />
        {cols(1010, f >= years10a ? 7 : 5, lerp(360, 260, on(f, smaller, 14)), 50, longer + 2, 1 + 0.5 * on(f, total10a, 14))}
        <g opacity={on(f, grows, 6)} transform={`translate(1700 520) scale(${pop(f, grows)})`}><Prop id="arrow-up" x={0} y={0} size={150} f={f} /></g>
      </g>
      <g opacity={on(f, bigger, 8) * (1 - on(f, most, 8))}>
        <g transform={`translate(640 580) scale(${lerp(0.6, 0.9, on(f, bigger, 16))} ${lerp(0.6, 0.9, on(f, bigger, 16))})`}>
          <rect x={-200 - 120 * on(f, stretched, 16)} y={-250} width={400 + 240 * on(f, stretched, 16)} height={500} rx={22} fill={P.paper} stroke={P.edge} strokeWidth={3} />
          <text x={0} y={-150} textAnchor="middle" fill={P.navy2} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 3 }}>CAR LOAN</text>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-150 - 100 * on(f, stretched, 16)} y={-90 + k * 50} width={300 + 200 * on(f, stretched, 16) - k * 40} height={18} rx={9} fill="#C8B994" />)}
        </g>
        <g opacity={on(f, years10b, 6)}>{Array.from({ length: 7 }, (_, k) => <g key={k} opacity={on(f, years10b + k * 2, 5)}><Calendar x={340 + k * 100} y={930} text={`${k + 1}`} s={0.55} /></g>)}</g>
        <g opacity={on(f, int10b, 6)}>{Array.from({ length: 9 }, (_, k) => <Coin key={k} x={1060 + (k % 3) * 60 - 60} y={lerp(560, 800 - Math.floor(k / 3) * 26, easeOut(span(f, int10b + k, int10b + k + 10)))} s={1.1} o={on(f, int10b + k, 4)} />)}</g>
        <g opacity={on(f, record, 6)} transform={`translate(1060 400) scale(${pop(f, record)})`}><Prop id="trophy" x={0} y={0} size={170} f={f} /></g>
        <g opacity={on(f, rate, 6)} transform={`translate(1450 600) scale(${pop(f, rate)})`}>
          <circle r={190} fill={P.card} /><path d="M-140 40 A150 150 0 1 1 140 40" fill="none" stroke={P.navy3} strokeWidth={26} />
          <path d={`M0 0 L${Math.cos(-Math.PI * 0.62 + Math.sin(f / 9) * 0.02) * 120} ${Math.sin(-Math.PI * 0.62) * 120}`} stroke={P.coral} strokeWidth={12} strokeLinecap="round" /><circle r={20} fill={P.coral} />
          <Label x={0} y={120} text="7%" size={96} font="Bebas Neue" color={P.ink} o={on(f, d7b, 4)} />
        </g>
      </g>
      {/* # E: a payment splits — most of it builds the car (fills up), the interest slice burns; the car can be sold later */}
      <g opacity={E}>
        <g transform={`translate(${lerp(420, 380, on(f, paying, 12))} 560) scale(${pop(f, most)})`}>
          <circle r={150} fill={P.gold} /><circle r={120} fill="none" stroke={P.goldD} strokeWidth={6} />
          <path d={`M0 0 L0 -150 A150 150 0 0 1 ${Math.sin(Math.PI * 2 * 0.3) * 150} ${-Math.cos(Math.PI * 2 * 0.3) * 150} Z`} fill={P.coral} opacity={on(f, disappears, 8)} />
          <Label x={0} y={250} text="ONE PAYMENT" size={56} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, disappears, 6) * (1 - on(f, paying, 10))} transform={`translate(640 330) scale(${pop(f, disappears)})`}><Prop id="fire" x={0} y={0} size={120} f={f} /><Label x={0} y={100} text="INTEREST" size={50} font="Bebas Neue" color={P.coralInk} /></g>
        {[0, 1, 2, 3, 4].map((k) => { const at = paying + k * 4, t = easeInOut(span(f, at, at + 18)); return <Coin key={k} x={lerp(560, 1240, t)} y={lerp(560, 640, t) - Math.sin(t * Math.PI) * 140} s={1.2} o={on(f, at, 4) * (1 - span(f, at + 16, at + 20))} /> })}
        <g transform="translate(1320 800)">
          <Car x={0} y={0} s={0.95} o={on(f, car11, 6) * 0.25 + 0.75 * on(f, paying, 8)} />
          <rect x={-300} y={60} width={600} height={30} rx={15} fill={P.navy3} opacity={on(f, paying, 6)} />
          <rect x={-300} y={60} width={600 * on(f, paying, 60)} height={30} rx={15} fill={P.mint} opacity={on(f, paying, 6)} />
          <g opacity={on(f, sell, 6)} transform={`translate(120 -300) scale(${pop(f, sell)}) rotate(-6)`}><rect x={-150} y={-60} width={300} height={120} rx={14} fill={P.coral} /><text y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"', letterSpacing: 4 }}>FOR SALE</text></g>
          <g opacity={on(f, later, 6) * on(f, car12, 6)}>{[0, 1, 2].map((k) => <Note key={k} x={-380 + k * 30} y={-200 + k * 20} s={1.1} r={-10 + k * 8} o={on(f, later + k * 3, 5)} />)}</g>
        </g>
      </g>
      </g>
      <Vignette id="cl" />
    </g>
  )
}

// ---------------------------------------------------------------- s13–s14b: AAA works out what a car really costs — not the payment, the money gone for good — averages, 5 years, 15,000 miles — yours will differ
const Study: React.FC<PieceProps> = ({ f, c }) => {
  const every = c('s13:every'), aaa = c('s13:aaa'), works = c('s13:works'), costs13 = c('s13:costs'), run13 = c('s13:run')
  const instead = c('s14:instead'), payment14 = c('s14:payment'), adds = c('s14:adds'), money = c('s14:money'), gone = c('s14:gone')
  const numbers = c('s14a:numbers'), popular = c('s14a:popular'), models = c('s14a:models'), five = c('s14a:five'), d15k = c('s14a:15000'), year = c('s14a:year')
  const own = c('s14b:own'), town = c('s14b:town'), insurance = c('s14b:insurance'), different = c('s14b:different'), typical = c('s14b:typical')
  const A = win(f, every, popular), B = win(f, popular, own), Cc = on(f, own, 8)
  return (
    <g>
      <Stage id="cs" frame={f} tint="teal" />
      <Headline f={f} until={9e9} lines={[[aaa, 'AAA, EVERY YEAR', P.ink, 104], [costs13, 'WHAT A NEW CAR REALLY COSTS', P.goldInk, 96], [instead, 'NOT THE PAYMENT…', P.ink, 104], [gone, '…THE MONEY GONE FOR GOOD', P.coralInk, 100],
        [numbers, 'AVERAGES', P.ink, 120], [popular, 'POPULAR NEW MODELS', P.ink, 104], [five, '5 YEARS', P.ink, 120], [d15k, '15,000 MILES A YEAR', P.ink, 110], [own, 'YOUR CAR · YOUR TOWN · YOUR INSURANCE', P.ink, 80], [typical, 'A TYPICAL EXAMPLE', P.goldInk, 116]]} />
      <g transform={camera(f, [[c('s14b:different'), 960, 620, 1.12], [c('s14b:typical'), 960, 540, 1]])}>
      {/* # A: the study desk — a clipboard ledger that adds up a car; the payment tag is pushed aside; coins fall into a pit marked GONE */}
      <g opacity={A}>
        <g opacity={on(f, every, 6)} transform={`translate(600 600) scale(${pop(f, every)})`}>
          <rect x={-230} y={-290} width={460} height={580} rx={26} fill="#000" opacity={0.2} transform="translate(12 14)" />
          <rect x={-230} y={-290} width={460} height={580} rx={26} fill={P.paper} stroke={P.edge} strokeWidth={3} />
          <rect x={-80} y={-320} width={160} height={60} rx={14} fill={P.navy3} />
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, works + k * 4, 5)}><rect x={-180} y={-200 + k * 70} width={210} height={18} rx={9} fill="#C8B994" /><rect x={90} y={-200 + k * 70} width={90} height={18} rx={9} fill={k === 5 ? P.coral : P.navy3} /></g>)}
          <g opacity={on(f, costs13, 6)}><rect x={-180} y={230} width={360} height={10} rx={5} fill={P.navy2} /></g>
        </g>
        <g opacity={on(f, aaa, 6) * (1 - on(f, instead, 8))} transform={`translate(1260 640) scale(${pop(f, aaa) * 0.75})`}><Car x={0} y={110} /><Prop id="magnifier" x={160} y={-140} size={180} f={f} /></g>
        <g opacity={on(f, run13, 6) * (1 - on(f, instead, 8))} transform="translate(1260 860)"><Prop id="calculator" x={-260} y={0} size={110} f={f} /></g>
        <g opacity={on(f, payment14, 6) * (1 - on(f, numbers, 8))} transform={`translate(${lerp(1200, 1650, on(f, adds, 18))} ${lerp(470, 380, on(f, adds, 18))}) rotate(${lerp(0, 18, on(f, adds, 18))}) scale(${0.7 * pop(f, payment14)})`}>
          <Tag x={0} y={0} top="PAYMENT" strike={on(f, adds - 4, 10)} o={1 - 0.5 * on(f, money, 10)} />
        </g>
        <g opacity={on(f, numbers, 6)} transform={`translate(1240 560) scale(${pop(f, numbers)})`}><circle r={150} fill={P.gold} /><circle r={124} fill="none" stroke={P.goldD} strokeWidth={6} /><Label x={0} y={36} text="AVG" size={110} font="Bebas Neue" color={P.navy0} /></g>
        <g opacity={on(f, money, 6) * (1 - on(f, numbers, 8))}>
          <ellipse cx={1240} cy={860} rx={250} ry={60} fill="#050A14" opacity={0.7} /><ellipse cx={1240} cy={852} rx={250} ry={52} fill="none" stroke={P.navy4} strokeWidth={6} />
          {Array.from({ length: 8 }, (_, k) => { const at = money + k * 4, t = span(f, at, at + 16); return <Coin key={k} x={1120 + (k % 4) * 80} y={lerp(560, 870, easeInOut(t))} s={1.1 * (1 - 0.6 * span(f, at + 12, at + 16))} o={on(f, at, 4) * (1 - span(f, at + 13, at + 16))} /> })}
          <Label x={1240} y={970} text="GONE" size={64} font="Bebas Neue" color={P.coralInk} o={on(f, gone, 6)} />
        </g>
      </g>
      {/* # B: the study's ground rules — five popular models, a 5-year calendar, an odometer at 15,000 a year */}
      <g opacity={B}>
        {['#D95A4E', '#3A6EA8', '#E9C25A', '#3DDC97', '#C9D1DE'].map((col, k) => <g key={k} opacity={on(f, popular + k * 4, 6)}><Car x={260 + k * 350} y={500} s={0.46} color={col} kind={k === 3 ? 'pickup' : k === 1 ? 'small' : 'sedan'} /></g>)}
        <g opacity={on(f, five, 6)}>{Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, five + k * 2, 5)}><Calendar x={340 + k * 150} y={780} text={`${k + 1}`} s={0.85} /></g>)}</g>
        <g opacity={on(f, d15k, 6)} transform={`translate(1450 780) scale(${pop(f, d15k)})`}><Odo x={0} y={0} text="15,000" unit={f >= year ? 'MILES A YEAR' : 'MILES'} /></g>
      </g>
      {/* # C: your numbers differ — a different car, a different town, a different insurance shield */}
      <g opacity={Cc}>
        <g transform={`translate(400 640) scale(${pop(f, own)})`}><circle r={190} fill={P.card} /><Car x={0} y={90} s={0.5} color="#3A6EA8" /></g>
        <g transform={`translate(960 640) scale(${pop(f, town)})`} opacity={on(f, town, 6)}><circle r={190} fill={P.card} /><Prop id="house" x={-40} y={10} size={180} f={f} /><Prop id="map-pin" x={80} y={-60} size={110} f={f} /></g>
        <g transform={`translate(1520 640) scale(${pop(f, insurance)})`} opacity={on(f, insurance, 6)}><circle r={190} fill={P.card} /><Prop id="shield" x={0} y={0} size={210} f={f} /></g>
        {[400, 960, 1520].map((x, k) => <g key={k} opacity={on(f, different + k * 3, 6)}><Label x={x} y={910} text={['$?', '$?', '$?'][k]} size={84} font="Bebas Neue" color={P.goldInk} /></g>)}
      </g>
      </g>
      <Vignette id="cs" />
    </g>
  )
}

// ---------------------------------------------------------------- s15–s22: the bills you see — fuel $216 ($4.15 a gallon), insurance $175 (depends on you), maintenance $147, registration $67, interest $99 → ≈ $700 a month; at the pump, renewal letter, repair receipt
const Bills: React.FC<PieceProps> = ({ f, c }) => {
  const bills = c('s15:bills'), know = c('s15:know')
  const driving = c('s16:driving'), d15k = c('s16:15000'), fuel = c('s16:fuel'), d216 = c('s16:216'), month16 = c('s16:month')
  const gas = c('s16a:gas'), d15 = c('s16a:15'), gallon = c('s16a:gallon'), year16a = c('s16a:year'), measured = c('s16a:measured')
  const insurance = c('s17:insurance'), d175 = c('s17:175'), depends = c('s17a:depends'), live = c('s17a:live'), record = c('s17a:record')
  const maint = c('s18:maintenance'), repairs = c('s18:repairs'), tires = c('s18:tires'), d147 = c('s18:147')
  const license = c('s19:license'), taxes = c('s19:taxes'), d67 = c('s19:67'), example = c('s20:example'), interest = c('s20:interest'), d99 = c('s20:99')
  const together = c('s21:together'), d700 = c('s21:700'), month21 = c('s21:month')
  const each = c('s22:each'), pump = c('s22:pump'), renewal = c('s22:renewal'), letter = c('s22:letter'), receipt = c('s22:receipt')
  const A = win(f, bills, each), B = on(f, each, 8)
  // # the monthly stack, bottom-up, 0.78 px per dollar
  const K = 0.78, base = 940, X = 900, Wd = 600
  const rows: [at: number, vat: number, name: string, v: number, color: string, id: string, why: number][] = [
    [fuel, d216, 'FUEL', 216, '#F2B84B', 'gas-pump', gas], [insurance, d175, 'INSURANCE', 175, '#7CC4F2', 'shield', depends], [maint, d147, 'MAINTENANCE', 147, '#9AD9A8', 'medical-kit', repairs],
    [license, d67, 'REGISTRATION', 67, '#D6C4F0', 'contract', taxes], [interest, d99, 'INTEREST', 99, '#F2A08F', 'interest-percent', example]]
  let y = base
  const stack = rows.map(([at, vat, name, v, color], k) => { const h = v * K; y -= h + 8; return <g key={k} transform={`translate(0 ${-(1 - easeOut(span(f, at, at + 12))) * 200})`}><Block x={X} y={y} w={Wd} h={h} color={color} name={name} value={`$${Math.round(v)}`} vo={on(f, vat, 6)} o={on(f, at, 6)} /></g> })
  const top = y
  // # the current bill's icon shows big on the left
  const cur = rows.reduce((acc, r, k) => (f >= r[0] ? k : acc), -1)
  return (
    <g>
      <Stage id="cb" frame={f} />
      <Headline f={f} until={9e9} lines={[[bills, 'THE BILLS YOU ALREADY KNOW', P.ink, 100], [fuel, 'FUEL', P.goldInk, 130], [insurance, 'INSURANCE', P.skyInk, 130], [depends, 'DEPENDS ON WHERE YOU LIVE', P.ink, 96], [record, '…AND YOUR DRIVING RECORD', P.ink, 96], [maint, 'MAINTENANCE · REPAIRS · TIRES', P.mintInk, 92], [license, 'LICENSE · REGISTRATION · TAXES', P.ink, 90], [interest, 'LOAN INTEREST', P.coralInk, 120],
        [d700, '≈ $700 A MONTH', P.goldInk, 140], [each, 'EACH ONE SHOWS UP SOMEWHERE', P.ink, 100]]} />
      <g transform={camera(f, [[c('s16:216'), 1200, 820, 1.12], [c('s16a:gas'), 760, 700, 1], [c('s16a:gallon'), 520, 760, 1.13], [c('s16a:year'), 860, 460, 1.1], [c('s17:175'), 1200, 760, 1.12], [c('s17a:depends'), 960, 540, 1], [c('s18:repairs'), 560, 640, 1.12], [c('s18:147'), 1200, 700, 1.1], [c('s19:license'), 960, 540, 1], [c('s19:taxes'), 560, 640, 1.12], [c('s19:67'), 1200, 620, 1.1], [c('s20:example'), 960, 540, 1], [c('s20:loan'), 1200, 560, 1.12], [c('s21:together'), 960, 540, 1]])}>
      <g opacity={A}>
        {/* # the car and its month: a growing stack of monthly bills */}
        <g opacity={on(f, bills, 6) * (1 - on(f, fuel, 8))}>{[0, 1, 2].map((k) => <Envelope key={k} x={560 + k * 40} y={540 - k * 40} s={1.1} r={-8 + k * 8} o={on(f, bills + k * 4, 6)} />)}
          <g opacity={on(f, know, 6)} transform={`translate(${560 + 300} 400) scale(${pop(f, know)})`}><circle r={56} fill={P.mint} /><path d="M-24 2 L-6 20 L26 -16" stroke="#FFFFFF" strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g></g>
        <g opacity={on(f, driving, 6) * (1 - on(f, fuel, 8))} transform={`translate(560 820) scale(${pop(f, driving)})`}><Odo x={0} y={0} text="15,000" unit={f >= d15k + 20 ? 'MILES A YEAR' : 'MILES'} o={on(f, d15k, 4)} /></g>
        {rows.map(([at, , , , , id, why], k) => (
          <g key={k} opacity={on(f, at, 8) * (cur === k ? 1 : 1 - on(f, rows[k + 1]?.[0] ?? 9e9, 8))} transform={`translate(520 560) scale(${pop(f, at)})`}>
            <circle r={210} fill={P.card} /><Prop id={id} x={0} y={-10} size={250} f={f} />
            {k === 0 && <g opacity={on(f, d15, 6)} transform="translate(0 290)"><rect x={-190} y={-60} width={380} height={120} rx={18} fill="#141B2B" stroke={P.gold} strokeWidth={5} /><text y={30} textAnchor="middle" fill={P.gold} style={{ font: '400 84px "Bebas Neue"' }}>{f >= gallon ? '$4.15 / GAL' : '$4.15'}</text></g>}
            {k === 1 && <g opacity={on(f, live, 6)}><Prop id="map-pin" x={-190} y={250} size={120} f={f} /><g opacity={on(f, record, 6)}><Prop id="contract" x={190} y={250} size={120} f={f} /></g></g>}
            {k === 2 && <g opacity={on(f, tires, 6)} transform="translate(190 230)"><circle r={70} fill="#1B2233" /><circle r={40} fill="#C9D1DE" /></g>}
            {k === 3 && <g opacity={on(f, why, 6)} transform="translate(0 290)"><rect x={-170} y={-55} width={340} height={110} rx={14} fill="#F7FAFF" stroke={P.navy2} strokeWidth={6} /><text y={26} textAnchor="middle" fill={P.navy1} style={{ font: '400 74px "Bebas Neue"', letterSpacing: 6 }}>CAR · 2026</text></g>}
          </g>
        ))}
        <g opacity={on(f, year16a, 6) * (1 - on(f, insurance, 8))} transform={`translate(860 340) scale(${pop(f, year16a)})`}><Calendar x={0} y={0} text="12 MO" s={0.9} /><g opacity={on(f, measured, 6)}><Prop id="magnifier" x={110} y={60} size={110} f={f} /></g></g>
        <g opacity={on(f, month16, 6)}><Label x={X + Wd / 2} y={base + 70} text="EACH MONTH" size={62} font="Bebas Neue" color={P.ink2} /></g>
        {stack}
        {/* # the total bracket */}
        <g opacity={on(f, together, 8)}>
          <path d={`M${X + Wd + 30} ${top} h30 V${base} h-30`} stroke={P.goldInk} strokeWidth={8} fill="none" />
          <g opacity={on(f, d700, 6)} transform={`translate(${X + Wd + 80} ${(top + base) / 2 + 30})`}><Label x={0} y={0} text="≈ $700" size={96} font="Bebas Neue" color={P.goldInk} anchor="start" /><Label x={0} y={66} text="A MONTH" size={62} font="Bebas Neue" color={P.ink} anchor="start" o={on(f, month21, 6)} /></g>
        </g>
      </g>
      {/* # B: where they show up — at the pump, a renewal letter in the mailbox, a repair receipt */}
      <g opacity={B}>
        <Medal x={400} y={560} id="gas-pump" text="AT THE PUMP" f={f} at={pump} r={170} />
        <g opacity={on(f, renewal, 6)} transform={`translate(960 560) scale(${pop(f, renewal)})`}><circle r={170} fill={P.card} /><Mailbox x={-30} y={20} s={0.7} flag={on(f, letter, 10)} /><g opacity={on(f, letter, 6)}><Envelope x={60} y={lerp(-120, -40, on(f, letter, 12))} s={0.45} r={-10} /></g><Label x={0} y={236} text="RENEWAL LETTER" size={56} font="Bebas Neue" color={P.ink} /></g>
        <Medal x={1520} y={560} id="receipt" text="REPAIR RECEIPT" f={f} at={receipt} r={170} />
      </g>
      </g>
      <Vignette id="cb" />
    </g>
  )
}

// ---------------------------------------------------------------- s23–s30: the cost with no bill — depreciation $4,400 a year (≈ $369 a month), over a third, bigger than fuel and insurance; $22,000 in 5 years, more than half the $39,400 sticker; no bill; used up slowly; you find out at the sale
const Value: React.FC<PieceProps> = ({ f, c }) => {
  const not23 = c('s23:not'), bill23 = c('s23:bill')
  const dep = c('s24:depreciation'), value24 = c('s24:value'), loses = c('s24:loses'), own24 = c('s24:own')
  const aaa25 = c('s25:aaa'), d4400 = c('s25:4400'), year25 = c('s25:year'), d369 = c('s25:369'), month25 = c('s25:month')
  const third = c('s26:third'), total26 = c('s26:total'), fuel26 = c('s26:fuel'), insurance26 = c('s26:insurance')
  const five27 = c('s27:five'), adds27 = c('s27:adds'), d22k = c('s27:22000')
  const half = c('s28:half'), sticker = c('s28:sticker'), study = c('s28:study'), d394 = c('s28:39400')
  const nobody = c('s29:nobody'), bill29 = c('s29:bill')
  const keep = c('s29a:keep'), wears = c('s29a:wears'), still = c('s29a:still'), slowly = c('s29a:slowly'), sale = c('s29a:sale')
  const find = c('s30:find'), sell30 = c('s30:sell'), trade = c('s30:trade'), worth = c('s30:worth'), less = c('s30:less'), paid = c('s30:paid')
  const A = win(f, not23, third), B = win(f, third, five27), Cc = win(f, five27, nobody), D = win(f, nobody, find), E = on(f, find, 8)
  const val = 1 - 0.45 * on(f, loses, 40)
  return (
    <g>
      <Stage id="cv" frame={f} />
      <Headline f={f} until={9e9} lines={[[not23, 'THE BIGGEST COST HAS NO BILL', P.ink, 100], [dep, 'DEPRECIATION', P.coralInk, 140], [loses, 'VALUE LOST WHILE YOU OWN IT', P.ink, 96], [d4400, '≈ $4,400 A YEAR', P.coralInk, 130], [d369, '≈ $369 A MONTH', P.coralInk, 130],
        [third, 'MORE THAN A THIRD OF THE TOTAL', P.ink, 96], [fuel26, 'BIGGER THAN FUEL', P.ink, 110], [insurance26, 'BIGGER THAN INSURANCE', P.ink, 110], [five27, 'OVER 5 YEARS', P.ink, 120], [d22k, '≈ $22,000', P.coralInk, 150],
        [half, 'MORE THAN HALF', P.coralInk, 124], [sticker, 'OF THE AVERAGE STICKER PRICE', P.ink, 96], [nobody, 'NOBODY SENDS A BILL', P.ink, 110], [still, 'THE VALUE STILL GOES', P.ink, 110], [slowly, 'JUST SLOWLY', P.ink, 120], [find, 'YOU FIND OUT WHEN YOU SELL', P.ink, 100], [less, 'FAR LESS THAN YOU PAID', P.coralInk, 110]]} />
      <g transform={camera(f, [[c('s25:year'), 1400, 700, 1.12], [c('s26:third'), 960, 540, 1], [c('s28:that'), 1200, 760, 1.12], [c('s28:study'), 960, 600, 1], [c('s28:39400'), 1500, 620, 1.12], [c('s29:nobody'), 960, 540, 1]])}>
      {/* # A: an empty mailbox; the car with a value gauge that drains; money evaporates off the car */}
      <g opacity={A}>
        <g opacity={1 - on(f, dep, 8)}><Mailbox x={960} y={720} s={1.3} flag={0} o={on(f, not23 - 6, 6)} /><g opacity={on(f, bill23, 6)} transform={`translate(1300 500) scale(${pop(f, bill23) * 0.7})`}><Envelope x={0} y={0} text="BILL?" cross={span(f, bill23, bill23 + 14)} /></g></g>
        <g opacity={on(f, dep, 8)}>
          <g transform={`translate(640 820) scale(${pop(f, dep)})`}><Car x={0} y={0} s={1.05} o={0.55 + 0.45 * val} /></g>
          <g opacity={on(f, value24, 6)}><Gauge x={1360} y={640} s={0.95} v={val} label="VALUE" /></g>
          {f >= own24 && Array.from({ length: 10 }, (_, k) => { const ph = ((f - own24) / 50 + k / 10) % 1; return <Note key={k} x={460 + (k * 47) % 380} y={600 - ph * 330} s={0.8} r={(k % 3 - 1) * 14 + ph * 30} o={Math.sin(ph * Math.PI) * 0.9} /> })}
          <g opacity={on(f, aaa25, 6) * (1 - on(f, d4400, 8))} transform={`translate(1360 940) scale(${pop(f, aaa25)})`}><Prop id="calculator" x={0} y={0} size={110} f={f} /></g>
          <g opacity={on(f, d4400, 6)} transform="translate(1360 920)"><Label x={0} y={0} text="$4,400 / YEAR" size={64} font="Bebas Neue" color={P.coralInk} o={1} /></g>
          <g opacity={on(f, d369, 6) * on(f, month25 - 10, 4)}><Label x={1360} y={990} text="$369 / MONTH" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>
      {/* # B: a donut — depreciation is over a third of the total; then three bars: depreciation vs fuel vs insurance */}
      <g opacity={B}>
        {(() => {
          const r = 220, p = (4422 / 12863) * on(f, third, 24), a = Math.PI * 2 * p
          return <g transform="translate(560 600)" opacity={on(f, third, 6)}>
            <circle r={r} fill="none" stroke={P.navy3} strokeWidth={90} opacity={on(f, total26, 6) * 0.6 + 0.4} />
            <path d={`M0 ${-r} A${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${Math.sin(a) * r} ${-Math.cos(a) * r}`} fill="none" stroke={P.coral} strokeWidth={90} />
            <Label x={0} y={30} text="34%" size={110} font="Bebas Neue" color={P.ink} o={on(f, third + 14, 6)} />
          </g>
        })()}
        <HBar x={980} y={430} w={760 * on(f, third, 18)} color={P.coral} label="DEPRECIATION" o={on(f, third, 6)} />
        <HBar x={980} y={620} w={760 * (2598 / 4422) * on(f, fuel26, 16)} color="#F2B84B" label="FUEL" o={on(f, fuel26, 6)} />
        <HBar x={980} y={810} w={760 * (2098 / 4422) * on(f, insurance26, 16)} color="#7CC4F2" label="INSURANCE" o={on(f, insurance26, 6)} />
      </g>
      {/* # C: five years of lost value pile up; then the sticker price bar with more than half shaded */}
      <g opacity={Cc}>
        <g opacity={1 - on(f, half, 8)}>
          {Array.from({ length: 5 }, (_, k) => { const at = five27 + k * 5; return <g key={k} opacity={on(f, at, 6)}><Calendar x={360 + k * 300} y={460} text={`YR ${k + 1}`} s={0.9} /><rect x={300 + k * 300} y={900 - 70 * (k + 1) * on(f, adds27 + k * 3, 10)} width={120} height={70 * (k + 1) * on(f, adds27 + k * 3, 10)} rx={10} fill={P.coral} /></g> })}
          <rect x={240} y={900} width={1440} height={12} rx={6} fill={P.navy3} />
        </g>
        <g opacity={on(f, half, 8)}>
          <rect x={260} y={540} width={1400} height={180} rx={24} fill="none" stroke={P.ink2} strokeWidth={6} strokeDasharray="20 14" opacity={1 - on(f, sticker, 8)} />
          <rect x={260} y={540} width={1400} height={180} rx={24} fill={P.paper} opacity={on(f, sticker, 8)} />
          <rect x={260} y={540} width={1400 * 0.5615 * on(f, half, 18)} height={180} rx={24} fill={P.coral} />
          <Label x={260 + 1400 * 0.28} y={656} text="LOST: $22,000" size={76} font="Bebas Neue" color="#FFFFFF" o={on(f, half + 14, 6)} />
          <Label x={260} y={500} text="AVERAGE STICKER PRICE" size={58} font="Bebas Neue" color={P.ink} anchor="start" o={on(f, sticker, 6) * on(f, study, 4)} />
          <Label x={1660} y={500} text="$39,400" size={88} font="Bebas Neue" color={P.goldInk} anchor="end" o={on(f, d394, 4)} />
          <path d={`M${260 + 1400 * 0.5} 520 V760`} stroke={P.ink} strokeWidth={5} strokeDasharray="10 10" opacity={on(f, half + 10, 6)} />
          <Label x={260 + 1400 * 0.5} y={820} text="HALF" size={56} font="Bebas Neue" color={P.ink} o={on(f, half + 10, 6)} />
        </g>
      </g>
      {/* # D: no bill for it; keep the car till it wears out — it ages, the gauge drains slowly, an hourglass */}
      <g opacity={D}>
        <g opacity={1 - on(f, keep, 8)} transform={`translate(960 540) scale(${pop(f, nobody) * 1.2})`}><Envelope x={0} y={0} cross={span(f, bill29, bill29 + 14)} /><Label x={0} y={220} text="DEPRECIATION" size={72} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, keep, 8)}>
          <g transform="translate(660 820)"><Car x={0} y={0} s={1.0} age={on(f, wears, 60)} /></g>
          <Gauge x={1360} y={640} s={0.9} v={lerp(0.9, 0.1, on(f, still, 110))} label="VALUE" />
          <g opacity={on(f, slowly, 6)} transform={`translate(1360 330) scale(${pop(f, slowly)})`}><Prop id="hourglass" x={0} y={0} size={170} f={f} /></g>
          <g opacity={on(f, sale, 6)} transform="translate(660 430)"><Label x={0} y={0} text="NO SALE NEEDED" size={60} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>
      {/* # E: sale day — the price you paid vs what the dealer offers */}
      <g opacity={E}>
        <g transform={`translate(560 800) scale(${pop(f, find)})`}><Car x={0} y={0} s={0.9} /></g>
        <g opacity={on(f, sell30, 6)} transform={`translate(560 460) rotate(-6) scale(${pop(f, sell30)})`}><rect x={-170} y={-60} width={340} height={120} rx={14} fill={P.coral} /><text y={26} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 78px "Bebas Neue"', letterSpacing: 4 }}>{f >= trade ? 'TRADE-IN' : 'FOR SALE'}</text></g>
        <rect x={1120} y={340} width={200} height={520} rx={16} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="14 10" opacity={on(f, trade, 6) * (1 - on(f, paid, 10))} />
        <rect x={1120} y={860 - 520 * on(f, paid, 16)} width={200} height={520 * on(f, paid, 16)} rx={16} fill={P.navy4} />
        <Label x={1220} y={930} text="YOU PAID" size={56} font="Bebas Neue" color={P.ink} o={on(f, paid, 6)} />
        <rect x={1420} y={860 - 230 * on(f, worth, 16)} width={200} height={230 * on(f, worth, 16)} rx={16} fill={P.coral} />
        <Label x={1520} y={930} text="WORTH NOW" size={56} font="Bebas Neue" color={P.ink} o={on(f, worth, 6)} />
        <rect x={1100} y={860} width={540} height={10} rx={5} fill={P.navy3} opacity={on(f, worth, 6)} />
      </g>
      </g>
      <Vignette id="cv" />
    </g>
  )
}

// ---------------------------------------------------------------- s31–s35: depreciation can flip the cheaper car — medium sedans: EV charges for $713 vs $2,200 of gas; loses $6,800 a year, ~twice the gas car; $3,100 more a year in total; hybrid cheapest at $10,200
const Flip: React.FC<PieceProps> = ({ f, c }) => {
  const dep = c('s31:depreciation'), change = c('s31:change'), cheaper = c('s31:cheaper')
  const medium = c('s32:medium'), sedans = c('s32:sedans'), electric = c('s32:electric'), d713 = c('s32:713'), charge = c('s32:charge'), against = c('s32:against'), d2200 = c('s32:2200'), gas32 = c('s32:gas')
  const lost = c('s33:lost'), d6800 = c('s33:6800'), value33 = c('s33:value'), twice = c('s33:twice'), gas33 = c('s33:gas')
  const total = c('s34:total'), d3100 = c('s34:3100'), own34 = c('s34:own')
  const cheapest = c('s35:cheapest'), three = c('s35:three'), hybrid = c('s35:hybrid'), d10200 = c('s35:10200')
  const A = win(f, dep, medium), B = on(f, medium, 8)
  const S = 440 / 7000 // # px per dollar for the bars
  const bar = (x: number, y: number, v: number, p: number, color: string, label: string, lo: number) => (
    <g><rect x={x} y={y} width={120} height={0} /><rect x={x} y={y - v * S * p} width={120} height={v * S * p} rx={14} fill={color} />{label && <Label x={x + 60} y={y - v * S * p - 20} text={label} size={60} font="Bebas Neue" color={P.ink} o={lo} />}</g>
  )
  const phase2 = on(f, lost, 10), phase3 = on(f, total, 10)
  return (
    <g>
      <Stage id="cf" frame={f} tint="teal" />
      <Headline f={f} until={9e9} lines={[[change, 'IT CAN CHANGE WHICH CAR IS CHEAPER', P.ink, 92], [medium, 'MEDIUM SEDANS', P.ink, 120], [d713, 'ELECTRIC: $713 A YEAR TO CHARGE', P.skyInk, 88], [d2200, 'GAS: $2,200 OF FUEL', P.goldInk, 104],
        [lost, 'BUT THE VALUE LOST…', P.ink, 110], [twice, 'ROUGHLY TWICE', P.coralInk, 130], [d3100, '+$3,100 A YEAR', P.coralInk, 140], [cheapest, 'THE CHEAPEST OF THE THREE?', P.ink, 100], [hybrid, 'THE HYBRID', P.mintInk, 140]]} />
      <g transform={camera(f, [[c('s32:electric'), 560, 560, 1.13], [c('s32:713'), 960, 540, 1], [c('s32:charge'), 480, 880, 1.12], [c('s32:2200'), 960, 540, 1], [c('s32:fuel'), 960, 880, 1.12], [c('s33:lost'), 960, 540, 1], [c('s33:value'), 520, 900, 1.1], [c('s34:total'), 960, 540, 1], [c('s34:more'), 720, 640, 1.12], [c('s34:own'), 960, 540, 1], [c('s35:10200'), 1440, 900, 1.12]])}>
      {/* # A: a see-saw with two price tags — which car is cheaper? */}
      <g opacity={A}>
        <g transform={`translate(960 760) rotate(${lerp(0, -8, on(f, change, 16)) + lerp(0, 16, on(f, cheaper, 16))})`}>
          <rect x={-560} y={-14} width={1120} height={28} rx={14} fill={P.navy4} />
          <g transform="translate(-380 -14)"><Car x={0} y={0} s={0.45} color="#7CC4F2" /></g>
          <g transform="translate(380 -14)"><Car x={0} y={0} s={0.45} color="#D95A4E" /></g>
        </g>
        <path d="M900 860 L960 760 L1020 860 Z" fill={P.navy3} />
        <g opacity={on(f, cheaper, 6)} transform={`translate(960 440) scale(${pop(f, cheaper)})`}><circle r={90} fill={P.card} /><Label x={0} y={44} text="?" size={140} font="Bebas Neue" color={P.goldInk} /></g>
        <Label x={960} y={980} text="DEPRECIATION" size={60} font="Bebas Neue" color={P.coralInk} o={on(f, dep, 6) * (1 - on(f, cheaper, 8))} />
      </g>
      {/* # B: the comparison board — cars above, bars below; fuel → value lost → total; then the hybrid joins */}
      <g opacity={B}>
        {[[480, '#7CC4F2', 'ev', electric, 'ELECTRIC', electric], [960, '#D95A4E', undefined, Math.min(against, d2200), 'GAS', gas32], [1440, '#3DDC97', 'hy', hybrid, 'HYBRID', hybrid]].map(([x, col, b, at, name, nat], k) => (
          <g key={k} opacity={on(f, k === 0 ? medium : k === 1 ? sedans : at as number, 6)} transform={`translate(${x} 420) scale(${pop(f, k === 0 ? medium : k === 1 ? sedans : at as number) * 0.6})`}>
            <Car x={0} y={0} color={col as string} badge={b as 'ev' | 'hy' | undefined} />
            <Label x={0} y={120} text={name as string} size={120} font="Bebas Neue" color={P.ink} o={on(f, nat as number, 6)} />
            {k === 2 && <g opacity={on(f, d10200, 6)} transform={`translate(0 -336) scale(${pop(f, d10200) * 1.6})`}><Prop id="crown" x={0} y={0} size={120} f={f} /></g>}
          </g>
        ))}
        <rect x={300} y={960} width={1320} height={10} rx={5} fill={P.navy3} />
        {/* # phase 1: energy */}
        <g opacity={1 - phase2}>
          {bar(420, 960, 712.5, on(f, d713, 14), P.sky, '$713', on(f, d713, 6))}
          {bar(900, 960, 2215, on(f, d2200, 14), '#F2B84B', '$2,200', on(f, d2200, 6))}
          <Label x={480} y={1040} text={f >= charge ? 'CHARGING' : ''} size={60} font="Bebas Neue" color={P.ink2} />
          <Label x={960} y={1040} text={f >= d2200 ? 'FUEL' : ''} size={60} font="Bebas Neue" color={P.ink2} />
        </g>
        {/* # phase 2: value lost a year */}
        <g opacity={phase2 * (1 - phase3)}>
          {bar(420, 960, 6786 * 0.85, on(f, d6800, 16), P.coral, '$6,800', on(f, d6800, 6))}
          {bar(900, 960, 3330 * 0.85, on(f, gas33, 16), P.coral, '', 0)}
          <Label x={480} y={1040} text={f >= value33 ? 'VALUE LOST / YEAR' : ''} size={60} font="Bebas Neue" color={P.ink2} />
          <g opacity={on(f, twice, 6)} transform={`translate(700 ${960 - 6786 * 0.85 * S * 0.75}) scale(${pop(f, twice)})`}><Label x={0} y={0} text="× 2" size={110} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {/* # phase 3: total cost a year (relative heights from AAA; only the spoken numbers are labelled) */}
        <g opacity={phase3}>
          {bar(420, 960, 13662 * 0.5, on(f, total, 16), P.navy4, '', 0)}
          {bar(900, 960, 10582 * 0.5, on(f, total, 16), P.navy4, '', 0)}
          {bar(1380, 960, 10204 * 0.5, on(f, d10200, 16), P.mint, '$10,200', on(f, d10200, 6))}
          <g opacity={on(f, d3100, 6)}><path d={`M560 ${960 - 13662 * 0.5 * S} H880 M560 ${960 - 10582 * 0.5 * S} H880`} stroke={P.coralInk} strokeWidth={5} strokeDasharray="12 10" />
            <Label x={720} y={960 - 12122 * 0.5 * S + 22} text="+$3,100" size={64} font="Bebas Neue" color={P.coralInk} /></g>
          <Label x={480} y={1040} text={f >= own34 ? 'TOTAL / YEAR' : ''} size={60} font="Bebas Neue" color={P.ink2} />
          <g opacity={on(f, three, 6) * (1 - on(f, hybrid, 8))} transform="translate(1440 760)"><circle r={60} fill={P.card} /><Label x={0} y={30} text="?" size={90} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>
      </g>
      <Vignette id="cf" />
    </g>
  )
}

// ---------------------------------------------------------------- s36–s38a: put it together — $1,072 a month · $35 a day · 86¢ a mile; 5 years > $64,000 — more than 1.5× the sticker price
const Total: React.FC<PieceProps> = ({ f, c }) => {
  const every = c('s36:every'), together = c('s36:together')
  const d1072 = c('s37:1072'), month = c('s37:month'), d35 = c('s37:35'), day = c('s37:day'), d86 = c('s37:86'), mile = c('s37:mile')
  const five = c('s38:five'), costs = c('s38:costs'), d64k = c('s38:64000'), run = c('s38:run')
  const one = c('s38a:one'), times = c('s38a:times'), sticker = c('s38a:sticker')
  const A = win(f, every, five), B = on(f, five, 8)
  const parts: [string, number, string][] = [['DEPRECIATION', 368.5, P.coral], ['FUEL', 216.5, '#F2B84B'], ['INSURANCE', 174.8, '#7CC4F2'], ['MAINTENANCE', 146.6, '#9AD9A8'], ['INTEREST', 98.7, '#F2A08F'], ['REGISTRATION', 66.8, '#D6C4F0']]
  let y = 960
  return (
    <g>
      <Stage id="ct" frame={f} />
      <Headline f={f} until={9e9} lines={[[every, 'EVERY PIECE TOGETHER', P.ink, 110], [d1072, '$1,072 A MONTH', P.goldInk, 130], [d35, '$35 A DAY', P.goldInk, 130], [d86, '86¢ A MILE', P.goldInk, 130], [five, 'OVER FIVE YEARS…', P.ink, 120], [d64k, 'MORE THAN $64,000', P.coralInk, 140], [run, 'TO OWN AND RUN, 5 YEARS', P.ink, 100], [times, 'MORE THAN 1½ × THE STICKER', P.coralInk, 110]]} />
      {/* # A: the full monthly stack (depreciation at the bottom) and three meters: month, day, mile */}
      <g opacity={A}>
        {parts.map(([name, v, col], k) => { const h = v * 0.6, at = every + k * 4; y -= h + 6; return <g key={k} transform={`translate(0 ${-(1 - easeOut(span(f, at, at + 12))) * 120})`}><Block x={220} y={y} w={620} h={h} color={col} name={name} o={on(f, at, 6)} /></g> })}
        <g opacity={on(f, together, 8)}><path d={`M870 ${y} h30 V960 h-30`} stroke={P.goldInk} strokeWidth={8} fill="none" /></g>
        <g opacity={on(f, d1072, 6)} transform={`translate(1280 420) scale(${pop(f, d1072)})`}><Calendar x={-220} y={0} text={f >= month ? 'MO' : ''} s={1.1} /><Label x={-100} y={30} text="$1,072" size={110} font="Bebas Neue" color={P.ink} anchor="start" /></g>
        <g opacity={on(f, d35, 6)} transform={`translate(1280 640) scale(${pop(f, d35)})`}><circle cx={-220} cy={0} r={66} fill={P.gold} />{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-224} y={-110} width={8} height={26} rx={4} fill={P.gold} transform={`rotate(${k * 45} -220 0)`} opacity={on(f, day, 6)} />)}<Label x={-100} y={34} text="$35" size={110} font="Bebas Neue" color={P.ink} anchor="start" /><Label x={70} y={34} text={f >= day ? '/ DAY' : ''} size={64} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
        <g opacity={on(f, d86, 6)} transform={`translate(1280 860) scale(${pop(f, d86)})`}><g transform="translate(-220 0) scale(0.42)"><Odo x={0} y={0} text="000001" unit="" /></g><Label x={-100} y={34} text="86¢" size={110} font="Bebas Neue" color={P.ink} anchor="start" /><Label x={60} y={34} text={f >= mile ? '/ MILE' : ''} size={64} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
      </g>
      {/* # B: five yearly stacks become one five-year bar, compared with the sticker price */}
      <g opacity={B}>
        <g opacity={1 - on(f, one, 10)}>
          {Array.from({ length: 5 }, (_, k) => { const at = five + k * 4; return <g key={k} opacity={on(f, at, 6)}><Calendar x={420 + k * 270} y={360} text={`YR ${k + 1}`} s={0.8} /><rect x={360 + k * 270} y={900 - 86 * (k + 1) * on(f, at + 6, 12)} width={120} height={86 * (k + 1) * on(f, at + 6, 12)} rx={12} fill={P.gold} /></g> })}
          <rect x={300} y={900} width={1320} height={10} rx={5} fill={P.navy3} />
          <g opacity={on(f, d64k, 6)}><path d="M340 470 H1600" stroke={P.goldInk} strokeWidth={6} strokeDasharray="14 10" /><Label x={1580} y={540} text="$64,000+" size={84} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
        </g>
        <g opacity={on(f, one, 10)}>
          <HBar x={220} y={430} w={1300 * on(f, one, 18)} color={P.gold} label="5 YEARS TO OWN AND RUN" value="$64,000+" vo={on(f, one, 6)} />
          <HBar x={220} y={720} w={1300 * (39376 / 64315) * on(f, sticker, 16)} color={P.navy4} label="AVERAGE STICKER PRICE" value="$39,400" vo={on(f, sticker, 6)} o={on(f, sticker - 4, 6)} />
        </g>
      </g>
      <Vignette id="ct" />
    </g>
  )
}

// ---------------------------------------------------------------- s39–s43: the kind of car — small sedan $9,300 vs half-ton pickup $16,400 → $7,200 a year, ~$36,000 over 5 years; driving 10,000 vs 15,000 miles → about $11,000
const Kinds: React.FC<PieceProps> = ({ f, c }) => {
  const kind = c('s39:kind'), changes = c('s39:changes')
  const small = c('s40:small'), sedan = c('s40:sedan'), d9300 = c('s40:9300'), half = c('s40:half'), pickup = c('s40:pickup'), d16400 = c('s40:16400')
  const gap = c('s41:gap'), d7200 = c('s41:7200'), d36k = c('s41:36000'), years41 = c('s41:years')
  const far = c('s42:far'), drive = c('s42:drive')
  const d10k = c('s43:10000'), d15k = c('s43:15000'), falls = c('s43:falls'), d11k = c('s43:11000')
  const A = win(f, kind, far), B = on(f, far, 8)
  const S = 1000 / 16449
  return (
    <g>
      <Stage id="ck" frame={f} />
      <Headline f={f} until={9e9} lines={[[kind, 'THE KIND OF CAR MATTERS', P.ink, 110], [small, 'SMALL SEDAN', P.skyInk, 120], [half, 'HALF-TON PICKUP', P.coralInk, 120], [gap, 'THE GAP', P.ink, 120], [d7200, '$7,200 A YEAR', P.goldInk, 130], [d36k, '≈ $36,000 OVER 5 YEARS', P.goldInk, 116], [far, 'HOW FAR YOU DRIVE', P.ink, 120], [falls, 'FEWER MILES, LOWER COST', P.mintInk, 110]]} />
      <g transform={camera(f, [[c('s41:year'), 1340, 940, 1.12], [c('s41:years'), 960, 540, 1], [c('s43:year#2'), 1200, 700, 1.12]])}>
      {/* # A: a sedan and a pickup on their bars */}
      <g opacity={A}>
        <g opacity={on(f, kind, 6) * (1 - on(f, small, 8))}>{['#7CC4F2', '#D95A4E', '#E9C25A'].map((col, k) => <g key={k} opacity={on(f, changes + k * 3, 6)}><Car x={420 + k * 540} y={620} s={0.5} color={col} kind={(['small', 'sedan', 'pickup'] as CarKind[])[k]} /></g>)}</g>
        <g opacity={on(f, small, 6)} transform={`translate(310 470) scale(${pop(f, small) * 0.56})`}><Car x={0} y={0} color="#7CC4F2" kind="small" /></g>
        <HBar x={560} y={390} w={1000 * (9259 / 16449) * on(f, d9300, 16)} color={P.sky} label={f >= sedan ? 'SMALL SEDAN' : 'SMALL'} value="$9,300" vo={on(f, d9300, 6)} o={on(f, small, 6)} />
        <g opacity={on(f, pickup, 6)} transform={`translate(310 790) scale(${pop(f, pickup) * 0.56})`}><Car x={0} y={0} color="#D95A4E" kind="pickup" /></g>
        <HBar x={560} y={710} w={1000 * on(f, d16400, 16)} color={P.coral} label="HALF-TON PICKUP" value="$16,400" vo={on(f, d16400, 6)} o={on(f, half, 6)} />
        <g opacity={on(f, gap, 8)}>
          <rect x={560 + 9259 * S} y={700} width={7190 * S * on(f, gap, 16)} height={130} rx={14} fill="none" stroke={P.goldInk} strokeWidth={6} strokeDasharray="14 10" />
          <Label x={560 + (9259 + 3595) * S} y={950} text={f >= d36k ? '× 5 YEARS ≈ $36,000' : '$7,200 / YEAR'} size={60} font="Bebas Neue" color={P.goldInk} o={on(f, d7200, 6)} />
        </g>
      </g>
      {/* # B: a car driving on a road; two odometers; the cost bar falls to ≈ $11,000 */}
      <g opacity={B}>
        <Road y={820} f={f} speed={14} />
        <g transform="translate(560 880)"><Car x={0} y={0} s={0.7} spin={(f - far) / 18} /></g>
        <g opacity={on(f, drive, 6)} transform={`translate(1300 360) scale(${pop(f, drive) * 0.9})`}><Odo x={0} y={0} text={f >= falls ? '10,000' : f >= d15k ? '15,000' : f >= d10k ? '10,000' : '------'} unit="MILES A YEAR" /></g>
        {/* # two labelled bars: the 15,000-mile cost (no number — it was not spoken here) and the 10,000-mile cost, ≈ $11,000 */}
        <g opacity={on(f, d15k, 6)}>
          <Label x={980} y={560} text="15,000 MILES A YEAR" size={58} font="Bebas Neue" color={P.ink2} anchor="start" />
          <rect x={980} y={575} width={640 * on(f, d15k, 14)} height={80} rx={16} fill={P.navy4} />
        </g>
        <g opacity={on(f, falls, 6)}>
          <Label x={980} y={715} text="10,000 MILES A YEAR" size={58} font="Bebas Neue" color={P.ink} anchor="start" />
          <rect x={980} y={730} width={640 * (10992 / 12863) * on(f, falls, 16)} height={80} rx={16} fill={P.mint} />
          <Label x={980 + 640 * (10992 / 12863) + 20} y={790} text={f >= d11k ? '≈ $11,000' : ''} size={64} font="Bebas Neue" color={P.ink} anchor="start" />
        </g>
      </g>
      </g>
      <Vignette id="ck" />
    </g>
  )
}

// ---------------------------------------------------------------- s44–s49: the real price — a car is worth it for many; price > payment; same payment, different costs underneath; the full cost list; the lost value sends no bill; the $787 tip of the iceberg; the rest arrives later
const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const none = c('s44:none'), worth = c('s44:worth'), people = c('s44:people'), work = c('s44:work'), lives = c('s44:lives')
  const price = c('s45:price'), bigger = c('s45:bigger'), payment45 = c('s45:payment')
  const two = c('s45a:two'), cars = c('s45a:cars'), same = c('s45a:same'), different = c('s45a:different'), insurance = c('s45a:insurance'), fuel = c('s45a:fuel'), lost = c('s45a:lost'), notIn = c('s45a:not')
  const payment46 = c('s46:payment'), loan46 = c('s46:loan'), month46 = c('s46:month')
  const full = c('s47:full'), carCosts = c('s47:costs'), fuel47 = c('s47:fuel'), insurance47 = c('s47:insurance'), upkeep = c('s47:upkeep'), interest47 = c('s47:interest'), value47 = c('s47:value')
  const biggest = c('s47a:biggest'), lostV = c('s47a:lost'), never = c('s47a:never'), bill47 = c('s47a:bill')
  const next = c('s48:next'), sold = c('s48:sold'), d787 = c('s48:787'), month48 = c('s48:month'), remember = c('s48:remember'), part = c('s48:part'), see = c('s48:see')
  const rest = c('s49:rest'), pump = c('s49:pump'), mail = c('s49:mail'), day = c('s49:day'), sell = c('s49:sell')
  const A = win(f, none, price), B = win(f, price, cars), Cc = win(f, cars, payment46), D = win(f, payment46, next), E = win(f, next, rest), F = on(f, rest, 8)
  return (
    <g>
      <Stage id="cp" frame={f} tint="teal" />
      <Headline f={f} until={9e9} lines={[[worth, 'A CAR CAN BE WORTH IT', P.ink, 110], [work, 'HOW THEY GET TO WORK', P.ink, 104], [price, 'THE PRICE IS BIGGER…', P.ink, 110], [payment45, '…THAN THE PAYMENT', P.ink, 110], [same, 'SAME PAYMENT', P.ink, 120], [different, 'DIFFERENT COST TO OWN', P.coralInk, 110],
        [payment46, 'THE PAYMENT → THE LOAN', P.ink, 110], [full, 'THE FULL COST → THE CAR', P.goldInk, 110], [biggest, 'THE BIGGEST: LOST VALUE', P.coralInk, 110], [never, 'IT NEVER SENDS A BILL', P.coralInk, 110], [sold, 'NEXT TIME A CAR IS SOLD AS…', P.ink, 100], [remember, 'ONLY THE PART YOU CAN SEE', P.ink, 104], [rest, 'THE REST ARRIVES LATER', P.goldInk, 116]]} />
      <g transform={camera(f, [[c('s45a:because'), 1300, 330, 1.12], [c('s45a:lost'), 960, 540, 1], [c('s46:loan'), 1360, 640, 1.13], [c('s47:full'), 960, 540, 1], [c('s47:upkeep'), 960, 600, 1.1], [c('s47:value'), 960, 540, 1], [c('s47a:lost'), 1500, 700, 1.12], [c('s47a:never'), 960, 540, 1], [c('s49:it'), 1500, 700, 1.12]])}>
      {/* # A: a car on the morning road into town — it gets people to work and home */}
      <g opacity={A}>
        <circle cx={300} cy={380} r={90} fill={P.gold} opacity={0.85 * on(f, none, 20)} />
        {Array.from({ length: 7 }, (_, k) => <rect key={k} x={180 + k * 240} y={760 - (100 + rnd(k + 4) * 150)} width={170} height={100 + rnd(k + 4) * 150} rx={8} fill={P.navy2} opacity={0.6 * on(f, work - 6 + k, 6)} />)}
        <Road y={760} f={f} speed={10} />
        <g transform={`translate(${lerp(-300, 900, easeOut(span(f, none, people)))} 820)`}><Car x={0} y={0} s={0.75} spin={(f - none) / 16} /></g>
        <g opacity={on(f, lives, 6)} transform={`translate(1500 420) scale(${pop(f, lives)})`}><Prop id="house" x={0} y={0} size={200} f={f} /></g>
        <g opacity={on(f, worth, 6)} transform={`translate(960 420) scale(${pop(f, worth) * 1.3})`}><path d="M0 40 C-90 -20 -60 -100 0 -60 C60 -100 90 -20 0 40 Z" fill={P.coral} /></g>
      </g>
      {/* # B: a big PRICE tag next to a small PAYMENT tag */}
      <g opacity={B}>
        <g transform={`translate(${lerp(960, 760, on(f, bigger, 14))} 600) scale(${pop(f, price) * lerp(1, 1.25, on(f, bigger, 14))})`}><Tag x={0} y={0} top="PRICE" color={P.gold} /></g>
        <g opacity={on(f, payment45, 6)} transform={`translate(1360 680) scale(${pop(f, payment45) * 0.55})`}><Tag x={0} y={0} top="PAYMENT" /></g>
      </g>
      {/* # C: two identical cars on the same payment tag, floating on icebergs with very different hidden parts */}
      <g opacity={Cc}>
        <Water y={600} f={f} o={on(f, same, 10)} />
        {[[560, '#7CC4F2', 0.55], [1360, '#D95A4E', 1]].map(([x, col, big], k) => (
          <g key={k} opacity={on(f, cars + k * 4, 6)}>
            <g transform={`translate(${x} 600)`}>
              <g opacity={on(f, same, 10)}><g transform={`scale(${0.62 * (0.6 + 0.4 * (big as number))} ${0.62 * (0.6 + 0.4 * (big as number))})`}><Iceberg x={0} y={0} below={on(f, different, 20)} /></g></g>
              <g transform="translate(0 -62) scale(0.42)"><Car x={0} y={0} color={col as string} /></g>
              <g opacity={on(f, same, 6)} transform={`translate(0 -300) scale(${pop(f, same) * 0.5})`}><Tag x={0} y={0} top="$787" sub="A MONTH" /></g>
              {[['INSURANCE', insurance], ['FUEL', fuel], ['LOST VALUE', lost]].map(([t, a], j) => <Label key={j} x={0} y={130 + j * (60 + 40 * (big as number))} text={t as string} size={48 + 10 * (big as number)} font="Bebas Neue" color={P.white} o={on(f, a as number, 6)} />)}
            </g>
          </g>
        ))}
        <g opacity={on(f, notIn, 6)} transform="translate(960 380)"><Label x={0} y={0} text="NOT IN THE PAYMENT" size={64} font="Bebas Neue" color={P.coralInk} /></g>
      </g>
      {/* # D: the payment points at a loan contract; the full cost points at the car and its five costs; the lost value grows and its bill is crossed out */}
      <g opacity={D}>
        <g opacity={1 - on(f, full, 8)}>
          <g transform={`translate(640 580) scale(${pop(f, payment46) * 0.7})`}><Tag x={0} y={0} top="PAYMENT" /></g>
          <g opacity={on(f, loan46, 6)}><path d="M860 580 H1080" stroke={P.ink} strokeWidth={8} markerEnd="" /><path d="M1080 560 L1110 580 L1080 600 Z" fill={P.ink} /></g>
          <g opacity={on(f, loan46, 6)} transform={`translate(1360 580) scale(${pop(f, loan46) * 0.6})`}><rect x={-200} y={-250} width={400} height={500} rx={22} fill={P.paper} stroke={P.edge} strokeWidth={3} /><text y={-160} textAnchor="middle" fill={P.navy2} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 3 }}>CAR LOAN</text><Calendar x={0} y={60} text={f >= month46 ? 'MO' : ''} s={1.2} /></g>
        </g>
        <g opacity={on(f, full, 8)}>
          <g transform={`translate(960 760) scale(${pop(f, carCosts) * 0.75})`}><Car x={0} y={0} /></g>
          {[['gas-pump', fuel47, 'FUEL'], ['shield', insurance47, 'INSURANCE'], ['medical-kit', upkeep, 'UPKEEP'], ['interest-percent', interest47, 'INTEREST'], ['arrow-down', value47, 'LOST VALUE']].map(([id, a, t], k) => {
            const ang = Math.PI * (1.08 + k * 0.21), x = 960 + Math.cos(ang) * 620, yy = 640 + Math.sin(ang) * 330, isV = k === 4
            const grow = isV ? 1 + 0.35 * on(f, biggest, 12) : 1 - 0.25 * on(f, biggest, 12)
            return <g key={k} opacity={on(f, a as number, 6) * (isV ? 1 : 1 - 0.4 * on(f, biggest, 10))} transform={`translate(${x} ${yy + (isV ? 60 : 0)}) scale(${pop(f, a as number) * grow})`}>
              <circle r={90} fill={isV ? P.coral : P.card} /><Prop id={id as string} x={0} y={-4} size={110} f={f} /><Label x={0} y={146} text={t as string} size={50} font="Bebas Neue" color={P.ink} /></g>
          })}
          <g opacity={on(f, lostV, 6) * (1 - on(f, next - 8, 8))}><circle cx={960 + Math.cos(Math.PI * 1.92) * 620} cy={640 + Math.sin(Math.PI * 1.92) * 330 + 60} r={150 + 10 * Math.sin((f - lostV) / 5)} fill="none" stroke={P.coral} strokeWidth={10} /></g>
          <g opacity={on(f, bill47, 6)} transform={`translate(1560 860) scale(${pop(f, bill47) * 0.55}) rotate(8)`}><Envelope x={0} y={0} text="BILL" cross={span(f, bill47, bill47 + 14)} /></g>
        </g>
      </g>
      {/* # E: a billboard ad — $787 a month — standing on the tip of an iceberg; on "remember" the water clears to show the rest */}
      <g opacity={E}>
        <Water y={660} f={f} />
        <Iceberg x={960} y={660} s={1.15} below={on(f, part, 24)} />
        <g transform={`translate(960 ${660 - 128}) scale(${pop(f, next) * 0.5})`}><Car x={0} y={0} /></g>
        <g opacity={on(f, sold, 6)} transform={`translate(960 300) scale(${pop(f, sold) * 0.9})`}>
          <rect x={-360} y={-130} width={720} height={240} rx={22} fill={P.paper} stroke={P.edge} strokeWidth={3} /><rect x={-14} y={110} width={28} height={40} fill={P.navy3} />
          <text x={0} y={30} textAnchor="middle" fill={P.navy0} opacity={on(f, d787, 4)} style={{ font: '400 140px "Bebas Neue"' }}>{f >= month48 ? '$787 / MONTH' : '$787'}</text>
        </g>
        <g opacity={on(f, see, 6)}><Label x={960} y={980} text="FUEL · INSURANCE · UPKEEP · INTEREST · LOST VALUE" size={52} font="Bebas Neue" color={P.white} /></g>
      </g>
      {/* # F: the rest arrives later — at the pump, in the mail, on the day you sell */}
      <g opacity={F}>
        <Medal x={420} y={600} id="gas-pump" text="AT THE PUMP" f={f} at={pump} r={170} />
        <g opacity={on(f, mail, 6)} transform={`translate(960 600) scale(${pop(f, mail)})`}><circle r={170} fill={P.card} /><Mailbox x={-20} y={20} s={0.7} flag={on(f, mail, 10)} /><Label x={0} y={236} text="IN THE MAIL" size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, day, 6)} transform={`translate(1500 600) scale(${pop(f, day)})`}><circle r={170} fill={P.card} /><g transform="rotate(-6)"><rect x={-130} y={-50} width={260} height={100} rx={12} fill={P.coral} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>{f >= sell ? 'SOLD' : 'SALE DAY'}</text></g><Label x={0} y={236} text="THE DAY YOU SELL" size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>
      </g>
      <Vignette id="cp" />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const CARCOST = [
  makePiece('car-hook', 'Long: $787 a month · affordable? · not the cost · $1,072 a month · the biggest piece has no bill', { mood: 'dark', Component: Hook,
    beats: [...beat('s1', ['payment', 'car', '787', 'month']), ...beat('s2', ['buyers', 'number', 'decides', 'affordable']), ...beat('s3', ['not', 'costs']), ...beat('s4', ['add', 'everything', 'average', 'car', 'costs', '1072', 'month', 'own']), ...beat('s5', ['biggest', 'never'])],
    sfx: [['s1:car', 'whoosh', 0.4], ['s1:787', 'impact', 0.5], ['s2:decides', 'ding', 0.4], ['s3:not', 'crack', 0.5], ['s4:everything', 'pop', 0.4], ['s4:1072', 'impact', 0.6], ['s5:biggest', 'riser', 0.4], ['s5:never', 'thud', 0.5]] }),
  makePiece('car-loan', 'Long: the loan — $44,700 at 7% · 1 in 4 run 7+ years · 1 in 5 pay $1,000+ · ≈ $10,000 interest · longer loans · most of a payment buys the car', { mood: 'light', Component: Loan,
    beats: [...beat('s6', ['payment']), ...beat('s7', ['', 'loan', '44700', '7', 'interest']), ...beat('s8', ['one', 'four', 'loans', 'seven', 'longer']), ...beat('s9', ['one', 'five', 'signed', 'thousand', 'month']), ...beat('s10', ['life', 'pays', '10000', 'interest']),
      ...beat('s10a', ['longer', 'smaller', 'years', 'total', 'grows']), ...beat('s10b', ['bigger', 'stretched', 'years', 'interest', 'record', 'rate', '7']), ...beat('s11', ['most', 'disappears', 'paying', 'car']), ...beat('s12', ['car', 'sell', 'later'])],
    sfx: [['s7:loan', 'pop', 0.4], ['s7:44700', 'impact', 0.5], ['s8:seven', 'tick', 0.4], ['s9:thousand', 'cash', 0.5], ['s10:10000', 'coin', 0.5], ['s10a:grows', 'riser', 0.4], ['s10b:record', 'ding', 0.4], ['s11:disappears', 'whoosh', 0.4], ['s11:car', 'chime', 0.4], ['s12:sell', 'pop', 0.4]] }),
  makePiece('car-study', 'Long: AAA adds up the money gone for good — averages, 5 years, 15,000 miles; yours will differ', { mood: 'dark', Component: Study,
    beats: [...beat('s13', ['every', 'aaa', 'works', 'costs', 'run']), ...beat('s14', ['instead', 'payment', 'adds', 'money', 'gone']), ...beat('s14a', ['numbers', 'popular', 'models', 'five', '15000', 'year']), ...beat('s14b', ['own', 'town', 'insurance', 'different', 'typical'])],
    sfx: [['s13:aaa', 'pop', 0.4], ['s14:adds', 'swish', 0.4], ['s14:gone', 'thud', 0.5], ['s14a:five', 'tick', 0.4], ['s14a:15000', 'click', 0.4], ['s14b:typical', 'impact', 0.5]] }),
  makePiece('car-bills', 'Long: the bills you see — fuel $216, insurance $175, maintenance $147, registration $67, interest $99 → ≈ $700 a month', { mood: 'light', Component: Bills,
    beats: [...beat('s15', ['bills', 'know']), ...beat('s16', ['driving', '15000', 'fuel', '216', 'month']), ...beat('s16a', ['gas', '15', 'gallon', 'year', 'measured']), ...beat('s17', ['insurance', '175']), ...beat('s17a', ['depends', 'live', 'record']),
      ...beat('s18', ['maintenance', 'repairs', 'tires', '147']), ...beat('s19', ['license', 'taxes', '67']), ...beat('s20', ['example', 'interest', '99']), ...beat('s21', ['together', '700', 'month']), ...beat('s22', ['each', 'pump', 'renewal', 'letter', 'receipt'])],
    sfx: [['s16:fuel', 'pop', 0.4], ['s16:216', 'coin', 0.4], ['s17:insurance', 'pop', 0.4], ['s18:maintenance', 'pop', 0.4], ['s19:license', 'pop', 0.4], ['s20:interest', 'pop', 0.4], ['s21:700', 'impact', 0.5], ['s22:pump', 'ding', 0.4], ['s22:letter', 'flutter', 0.4], ['s22:receipt', 'click', 0.4]] }),
  makePiece('car-value', 'Long: depreciation — $4,400 a year, over a third, $22,000 in 5 years, more than half the sticker; no bill; found out at the sale', { mood: 'dark', Component: Value,
    beats: [...beat('s23', ['not', 'bill']), ...beat('s24', ['depreciation', 'value', 'loses', 'own']), ...beat('s25', ['aaa', '4400', '369', 'month']), ...beat('s26', ['third', 'total', 'fuel', 'insurance']), ...beat('s27', ['five', 'adds', '22000']),
      ...beat('s28', ['half', 'sticker', 'study', '39400']), ...beat('s29', ['nobody', 'bill']), ...beat('s29a', ['keep', 'wears', 'still', 'slowly', 'sale']), ...beat('s30', ['find', 'sell', 'trade', 'worth', 'less', 'paid'])],
    sfx: [['s23:bill', 'crack', 0.4], ['s24:depreciation', 'impact', 0.5], ['s24:loses', 'whoosh', 0.4], ['s25:4400', 'thud', 0.5], ['s26:third', 'swish', 0.4], ['s27:22000', 'impact', 0.5], ['s28:half', 'thud', 0.4], ['s29:bill', 'crack', 0.4], ['s29a:slowly', 'tick', 0.4], ['s30:less', 'thud', 0.5]] }),
  makePiece('car-flip', 'Long: medium sedans — EV $713 to charge vs $2,200 gas; loses $6,800 a year, ~twice; +$3,100 a year; hybrid cheapest $10,200', { mood: 'light', Component: Flip,
    beats: [...beat('s31', ['depreciation', 'change', 'cheaper']), ...beat('s32', ['medium', 'sedans', 'electric', '713', 'charge', '2200', 'gas']), ...beat('s33', ['lost', '6800', 'value', 'twice']), ...beat('s34', ['total', '3100', 'own']), ...beat('s35', ['cheapest', 'three', 'hybrid', '10200'])],
    sfx: [['s31:cheaper', 'softpop', 0.4], ['s32:electric', 'pop', 0.4], ['s32:713', 'coin', 0.4], ['s32:2200', 'coin', 0.4], ['s33:6800', 'thud', 0.5], ['s33:twice', 'impact', 0.4], ['s34:3100', 'impact', 0.5], ['s35:hybrid', 'chime', 0.5]] }),
  makePiece('car-total', 'Long: $1,072 a month · $35 a day · 86¢ a mile · more than $64,000 over 5 years — 1.5× the sticker', { mood: 'dark', Component: Total,
    beats: [...beat('s36', ['every', 'together']), ...beat('s37', ['1072', 'month', '35', 'day', '86', 'mile']), ...beat('s38', ['five', 'costs', '64000', 'run']), ...beat('s38a', ['one', 'times', 'sticker'])],
    sfx: [['s36:together', 'swish', 0.4], ['s37:1072', 'impact', 0.5], ['s37:35', 'pop', 0.4], ['s37:86', 'pop', 0.4], ['s38:64000', 'impact', 0.6], ['s38a:times', 'riser', 0.4]] }),
  makePiece('car-kinds', 'Long: small sedan $9,300 vs half-ton pickup $16,400 → $7,200 a year, ~$36,000 in 5 years; 10,000 miles → ≈ $11,000', { mood: 'light', Component: Kinds,
    beats: [...beat('s39', ['kind', 'changes']), ...beat('s40', ['small', '9300', 'half', 'pickup', '16400']), ...beat('s41', ['gap', '7200', '36000']), ...beat('s42', ['far', 'drive']), ...beat('s43', ['10000', '15000', 'falls', '11000'])],
    sfx: [['s40:9300', 'pop', 0.4], ['s40:16400', 'thud', 0.5], ['s41:7200', 'impact', 0.5], ['s41:36000', 'cash', 0.4], ['s42:drive', 'whoosh', 0.4], ['s43:11000', 'chime', 0.4]] }),
  makePiece('car-payoff', 'Long: a car can be worth it · price > payment · same payment, different cost · the full cost list · lost value sends no bill · $787 is the tip', { mood: 'light', Component: Payoff,
    beats: [...beat('s44', ['none', 'worth', 'people', 'work', 'lives']), ...beat('s45', ['price', 'bigger', 'payment']), ...beat('s45a', ['two', 'same', 'different', 'insurance', 'fuel', 'lost', 'not']), ...beat('s46', ['payment', 'loan', 'month']),
      ...beat('s47', ['full', 'costs', 'fuel', 'insurance', 'upkeep', 'interest', 'value']), ...beat('s47a', ['biggest', 'lost', 'never', 'bill']), ...beat('s48', ['next', 'sold', '787', 'month', 'part', 'see']), ...beat('s49', ['rest', 'pump', 'mail', 'day', 'sell'])],
    sfx: [['s44:work', 'whoosh', 0.4], ['s45:price', 'pop', 0.4], ['s45a:same', 'click', 0.4], ['s45a:different', 'thud', 0.4], ['s47:full', 'swish', 0.4], ['s47a:bill', 'crack', 0.4], ['s48:787', 'impact', 0.5], ['s48:see', 'riser', 0.4], ['s49:pump', 'pop', 0.4], ['s49:mail', 'pop', 0.4], ['s49:sell', 'chime', 0.5]] }),
]
