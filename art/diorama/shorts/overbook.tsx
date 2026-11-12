// ============================================================
// SHORT — "Why airlines sell seats that don't exist" (s1–s27,
// ≈ 1:59), seven tall pieces. Sourced: US DOT 14 CFR 250 (overbooking
// is legal; volunteers first; domestic >2 h late = 400% of the one-way
// fare, max $2,150 from 22 Jan 2025, Federal Register 24 Oct 2024);
// DOT Air Travel Consumer Report (Q4 2024: 0.25 involuntary bumps per
// 10,000 passengers = 1 in 40,000); United Flight 3411 (9 Apr 2017:
// four crew seats on a full plane, $800 vouchers refused, a passenger
// dragged off; 27 Apr 2017: volunteers offered up to $10,000).
// Our example maths: 5% of 180 seats = 9 → 189 tickets; 9 × $200 = $1,800.
// House rules (owner r22/r26/r27): every word and number appears ON
// its spoken word, never before; objects never sit on top of each
// other — each beat owns its own space and the last one leaves before
// the next arrives; one headline slot; all inside x 60–940, y 220–1270.
// ============================================================
import React from 'react'
import { Emblem } from '../../logo/Emblem'
import { expressionAt } from '../../motion/acting'
import { Actor, heldPoint } from '../../rig/Actor'
import { Mini } from '../../rig/Mini'
import { cyclePose, mixPose, type ExpressionId, type Pose, poseAt, type PoseId } from '../../rig/pose'
import { Calendar, Label } from '../charts'
import { arc, easeInOut, easeOut, lerp, on, P, pop, span, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Prop, TallStage, W, H } from './tall'

// # the content column: a little left of centre so nothing reaches the right-hand buttons
const CX = 500

// ------------------------------------------------------------ timing helpers
// # visible from a to b with clean fades (gone by b) — the last beat leaves before the next one lands
const win = (f: number, a: number, b: number, d = 5) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
// # one headline slot: each line from its cue until the next line's cue (fades out just BEFORE it)
type Head = [at: number, text: string, color?: string, size?: number]
const Headline: React.FC<{ f: number; lines: Head[]; until: number; y?: number }> = ({ f, lines, until, y = 330 }) => (
  <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    return o > 0.001 ? <g key={k} transform={`translate(${CX} ${y}) scale(${0.94 + 0.06 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 100} font="Bebas Neue" color={color ?? P.ink} o={o} /></g> : null
  })}</g>
)

// ------------------------------------------------------------ acting (the HD cast)
// # a beat: from `at` the actor springs into `pose` with a face; with `loop` it keeps swinging pose ↔ loop
type Beat = [at: number, pose: PoseId, face?: ExpressionId, loop?: PoseId, period?: number]
const posed = (f: number, beats: Beat[]): Pose => {
  const base = poseAt(f, 30, beats.map(([at, p]) => [at, p] as [number, PoseId]))
  const cur = beats.filter((b) => b[0] <= f).pop()
  if (!cur || !cur[3]) return base
  return mixPose(base, cyclePose(f, cur[1], cur[3], cur[4] ?? 16), on(f, cur[0], 10))
}
const Person: React.FC<{ f: number; who: string; beats: Beat[]; x: number; y: number; s?: number; flip?: boolean; life?: number; o?: number }> = ({ f, who, beats, x, y, s = 1, flip, life = 3, o = 1 }) => {
  const p = posed(f, beats), ex = expressionAt(f, beats.map(([at, pose, face]) => ({ at, pose, expression: face })))
  return o > 0.001 ? <g opacity={o}><Actor who={who} pose={p} expression={ex.expression} blend={ex.from ? { from: ex.from, mix: ex.mix! } : undefined} x={x} y={y} scale={s} frame={f} flip={flip} life={life} /></g> : null
}
// # where a Person's right hand is (for a prop held in it)
const hand = (f: number, beats: Beat[], x: number, y: number, s = 1, flip = false) => heldPoint(posed(f, beats), { x, y, scale: s }, flip)

// ------------------------------------------------------------ the objects of this film
const SEAT = '#4C7FD0', SEAT_D = '#2F5DA8', SEAT_L = '#7FA8E6'
// # passengers' jackets (seated busts) — varied so a row reads as different people
const JACKETS = ['#C9563F', '#3E8E6E', '#7A5BB5', '#D49A2A', '#2E6FA8', '#B84F7A', '#5E7D3A', '#A0522D']
const SKINS = ['#F2C9A0', '#C68E62', '#8D5A3B', '#E8B48A', '#6E4429', '#F5D3B3']

// # an airline seat seen from the side (facing right); `who` seats a passenger (index into the palettes);
// # `ghost` draws it as a dashed outline that flickers — the seat that doesn't exist; `lit` rings it in a colour
const Seat: React.FC<{ x: number; y: number; s?: number; o?: number; who?: number; whoO?: number; whoX?: number; ghost?: boolean; lit?: number; litColor?: string; grey?: number }> = ({ x, y, s = 1, o = 1, who, whoO = 1, whoX = 0, ghost, lit = 0, litColor = P.coral, grey = 0 }) => {
  const fill = ghost ? 'none' : SEAT, dark = ghost ? 'none' : SEAT_D
  const st = ghost ? { stroke: P.sky, strokeWidth: 6, strokeDasharray: '16 11' } : {}
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {lit > 0 && <ellipse cx={-4} cy={-70} rx={78} ry={118} fill={litColor} opacity={0.3 * lit} />}
      {!ghost && <ellipse cx={4} cy={34} rx={66} ry={10} fill="#000" opacity={0.2} />}
      <g opacity={1 - 0.55 * grey}>
        {/* # back rest */}
        <path d="M-56 -150 Q-56 -168 -38 -168 H-24 Q-6 -168 -8 -150 L-14 -14 H-56 Z" fill={fill} {...st} />
        {!ghost && <path d="M-50 -156 Q-48 -162 -38 -162 H-28 L-30 -24 H-48 Z" fill={SEAT_L} opacity={0.35} />}
        {/* # a seated passenger: torso + head, facing right */}
        {who !== undefined && whoO > 0.001 && <g opacity={whoO} transform={`translate(${whoX} 0)`}>
          <rect x={-46} y={-112} width={58} height={94} rx={24} fill={JACKETS[who % JACKETS.length]} />
          <circle cx={-12} cy={-138} r={25} fill={SKINS[who % SKINS.length]} />
          <path d="M-38 -142 Q-36 -168 -10 -166 Q12 -164 14 -146 Q2 -156 -14 -154 Q-28 -152 -38 -142 Z" fill="#2A1F1A" />
          <circle cx={2} cy={-140} r={3.2} fill="#0A0F1E" />
        </g>}
        {/* # cushion, arm rest, the stand */}
        <rect x={-58} y={-30} width={112} height={30} rx={13} fill={fill} {...st} />
        <rect x={-30} y={-70} width={72} height={13} rx={6.5} fill={dark} {...st} />
        {!ghost && <><rect x={-7} y={0} width={14} height={28} fill="#5C6F8E" /><rect x={-38} y={24} width={76} height={9} rx={4.5} fill="#5C6F8E" /></>}
      </g>
    </g>
  )
}
// # a seat on the seat map (top view): `state` 0 = free, 1 = sold (a passenger's head), 2 = no-show (dashed coral), 3 = filled by an extra ticket (gold)
const SeatDot: React.FC<{ x: number; y: number; state: number; o?: number }> = ({ x, y, state, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {state === 2
      ? <rect x={-11} y={-8} width={22} height={17} rx={5} fill="none" stroke={P.coral} strokeWidth={3} strokeDasharray="5 3" />
      : <><rect x={-11} y={-8} width={22} height={17} rx={5} fill={state === 3 ? P.gold : SEAT} /><rect x={-11} y={-8} width={22} height={5} rx={2.5} fill={state === 3 ? P.goldD : SEAT_D} />
        {state === 1 && <circle cx={0} cy={2} r={5} fill="#F2C9A0" />}</>}
  </g>
)
// # the plane seen from above (nose up): 30 rows × 6 seats; seat (r, k) sits at seatXY
const ROWS = 30, COLS = [-88, -62, -36, 36, 62, 88]
const seatXY = (cx: number, y0: number, r: number, k: number) => ({ x: cx + COLS[k], y: y0 + 112 + r * 22 })
const Fuselage: React.FC<{ cx: number; y0: number; y1: number; o?: number; s?: number }> = ({ cx, y0, y1, o = 1, s = 1 }) => (
  <g opacity={o} transform={`translate(${cx} ${(y0 + y1) / 2}) scale(${s}) translate(${-cx} ${-(y0 + y1) / 2})`}>
    {/* # wings and tail behind the body */}
    <path d={`M${cx - 120} ${y0 + 330} L${cx - 250} ${y0 + 470} L${cx - 250} ${y0 + 510} L${cx - 120} ${y0 + 450} Z`} fill="#D8DFEA" />
    <path d={`M${cx + 120} ${y0 + 330} L${cx + 250} ${y0 + 470} L${cx + 250} ${y0 + 510} L${cx + 120} ${y0 + 450} Z`} fill="#D8DFEA" />
    <path d={`M${cx - 40} ${y1 - 60} L${cx - 160} ${y1 + 10} L${cx - 160} ${y1 + 34} L${cx - 30} ${y1 + 10} Z M${cx + 40} ${y1 - 60} L${cx + 160} ${y1 + 10} L${cx + 160} ${y1 + 34} L${cx + 30} ${y1 + 10} Z`} fill="#C9D2E0" />
    <path d={`M${cx - 125} ${y0 + 120} Q${cx - 125} ${y0} ${cx} ${y0 - 10} Q${cx + 125} ${y0} ${cx + 125} ${y0 + 120} L${cx + 120} ${y1 - 80} Q${cx + 60} ${y1 + 30} ${cx} ${y1 + 30} Q${cx - 60} ${y1 + 30} ${cx - 120} ${y1 - 80} Z`}
      fill="#F2F5FA" stroke="#C9D2E0" strokeWidth={4} />
    <path d={`M${cx - 52} ${y0 + 46} Q${cx} ${y0 + 20} ${cx + 52} ${y0 + 46} L${cx + 46} ${y0 + 70} H${cx - 46} Z`} fill={P.navy3} />
    <rect x={cx - 6} y={y0 + 100} width={12} height={y1 - y0 - 200} fill="#E1E7F0" />
  </g>
)
// # a plane seen from the side; `lit` fills every window gold (a full flight)
const Plane: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; lit?: number }> = ({ x, y, s = 1, r = 0, o = 1, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M-300 0 Q-300 -44 -240 -44 L230 -44 Q300 -44 330 0 Q300 30 230 30 L-240 30 Q-300 30 -300 0 Z" fill="#F2F5FA" />
    <path d="M-300 0 Q-300 -44 -240 -44 L-150 -44 L-150 30 L-240 30 Q-300 30 -300 0 Z" fill={P.navy2} opacity={0.12} />
    <path d="M-230 -44 L-290 -150 L-215 -150 L-150 -44 Z" fill={P.navy2} />
    <path d="M-40 10 L-160 150 L-90 150 L60 10 Z" fill="#D8DFEA" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-110 + k * 26} y={-22} width={14} height={16} rx={5} fill={P.navy3} />)}
    {lit > 0 && Array.from({ length: 12 }, (_, k) => <rect key={`l${k}`} x={-110 + k * 26} y={-22} width={14} height={16} rx={5} fill={P.gold} opacity={on(lit * 30, k * 1.5, 4)} />)}
    <path d="M255 -30 Q300 -26 318 -6 L262 -6 Z" fill={P.navy3} />
    <rect x={-300} y={2} width={630} height={8} fill={P.coral} opacity={0.8} />
  </g>
)
// # a boarding pass: a sky band, a plane glyph, the main text, a perforated stub with a barcode
const Ticket: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string; textO?: number; glow?: number; glowColor?: string; color?: string }> = ({ x, y, s = 1, r = 0, o = 1, text = '', textO = 1, glow = 0, glowColor = P.coral, color = P.sky }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-190} y={-100} width={380} height={200} rx={28} fill={glowColor} opacity={0.4 * glow} />}
    <rect x={-170} y={-80} width={340} height={160} rx={18} fill="#000" opacity={0.18} transform="translate(8 10)" />
    <rect x={-170} y={-80} width={340} height={160} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <path d="M-170 -62 Q-170 -80 -152 -80 H152 Q170 -80 170 -62 V-44 H-170 Z" fill={color} />
    <path d="M-150 -62 l22 0 l14 -10 l6 0 l-8 10 l14 0 l6 -5 l4 0 l-3 7 l3 7 l-4 0 l-6 -5 l-14 0 l8 10 l-6 0 l-14 -10 l-22 0 z" fill="#FFFFFF" transform="translate(0 0)" />
    <path d="M86 -44 V80" stroke={P.edge === 'none' ? '#C2B9B1' : '#CDB58C'} strokeWidth={4} strokeDasharray="8 8" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <rect key={k} x={102 + k * 7} y={-20} width={k % 3 === 0 ? 5 : 3} height={70} fill={P.navy1} opacity={0.75} />)}
    {text && <text x={-40} y={46} textAnchor="middle" fill={P.navy1} opacity={textO} style={{ font: '400 96px "Bebas Neue"' }}>{text}</text>}
  </g>
)
// # a gold voucher card with an amount
const Voucher: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; amount?: string; amountO?: number }> = ({ x, y, s = 1, r = 0, o = 1, amount = '', amountO = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-180} y={-100} width={360} height={200} rx={20} fill="#000" opacity={0.2} transform="translate(8 10)" />
    <rect x={-180} y={-100} width={360} height={200} rx={20} fill={P.gold} />
    <rect x={-164} y={-84} width={328} height={168} rx={14} fill="none" stroke="#FFF3C8" strokeWidth={4} strokeDasharray="10 8" />
    <text x={0} y={-24} textAnchor="middle" fill={P.navy1} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 6 }}>VOUCHER</text>
    {amount && <text x={0} y={70} textAnchor="middle" fill={P.navy1} opacity={amountO} style={{ font: '400 100px "Bebas Neue"' }}>{amount}</text>}
  </g>
)
// # a loaf of bread; `stale` 0→1 turns it grey-green with mould and stink lines
const Bread: React.FC<{ x: number; y: number; s?: number; o?: number; stale?: number }> = ({ x, y, s = 1, o = 1, stale = 0 }) => {
  const mix = (a: number[], b: number[]) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], stale))).join(',')})`
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={118} rx={230} ry={20} fill="#000" opacity={0.16} />
      <path d="M-230 100 Q-250 -40 -150 -100 Q0 -170 150 -100 Q250 -40 230 100 Z" fill={mix([217, 154, 78], [172, 160, 142])} />
      <path d="M-200 60 Q-210 -30 -130 -78 Q0 -136 130 -78 Q210 -30 200 60" fill="none" stroke={mix([240, 196, 130], [192, 182, 166])} strokeWidth={14} strokeLinecap="round" opacity={0.6} />
      {[-110, -30, 50, 130].map((cx) => <path key={cx} d={`M${cx - 30} -60 Q${cx} -100 ${cx + 30} -70`} stroke={mix([168, 104, 44], [128, 118, 102])} strokeWidth={10} fill="none" strokeLinecap="round" />)}
      {stale > 0 && <g opacity={stale} stroke="#6B5A44" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-150 -40 l30 30 l-10 30 l26 22" /><path d="M60 -90 l-14 34 l22 20 l-8 36" /><path d="M150 0 l-30 20 l10 34" />
      </g>}
    </g>
  )
}
// # a rubber stamp: a rotated outlined box with a word
const Stamp: React.FC<{ x: number; y: number; text: string; color: string; s?: number; o?: number; size?: number }> = ({ x, y, text, color, s = 1, o = 1, size = 110 }) => {
  const w = text.length * size * 0.44 + 70
  return o > 0.001 ? <g transform={`translate(${x} ${y}) rotate(-8) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-size * 0.78} width={w} height={size * 1.3} rx={18} fill="none" stroke={color} strokeWidth={12} />
    <text x={0} y={size * 0.36} textAnchor="middle" fill={color} style={{ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 4 }}>{text}</text>
  </g> : null
}
// # a clock face; `sweep` 0→1 fills a coral wedge from 12 to 2 o'clock (two hours)
const Clock: React.FC<{ x: number; y: number; s?: number; o?: number; sweep?: number }> = ({ x, y, s = 1, o = 1, sweep = 0 }) => {
  const a = (sweep * 60 - 90) * Math.PI / 180, R = 104
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <circle r={130} fill="#000" opacity={0.18} transform="translate(8 10)" />
      <circle r={130} fill={P.paper} stroke={P.navy1} strokeWidth={10} />
      {sweep > 0 && <path d={`M0 0 L0 ${-R} A${R} ${R} 0 0 1 ${R * Math.cos(a)} ${R * Math.sin(a)} Z`} fill={P.coral} opacity={0.75} />}
      {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-4} y={-118} width={8} height={k % 3 === 0 ? 22 : 12} rx={4} fill={P.navy1} transform={`rotate(${k * 30})`} />)}
      <rect x={-6} y={-64} width={12} height={70} rx={6} fill={P.navy1} transform={`rotate(${sweep * 60})`} />
      <rect x={-4} y={-94} width={8} height={100} rx={4} fill={P.navy3} transform={`rotate(${sweep * 720})`} />
      <circle r={12} fill={P.navy1} />
    </g>
  )
}
// # a newspaper with a two-line headline
const Paper: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; l1: string; l2: string }> = ({ x, y, s = 1, r = 0, o = 1, l1, l2 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-270} y={-170} width={540} height={340} rx={10} fill="#000" opacity={0.18} transform="translate(10 12)" />
    <rect x={-270} y={-170} width={540} height={340} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <text x={0} y={-112} textAnchor="middle" fill={P.navy1} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 8 }}>THE DAILY NEWS</text>
    <rect x={-240} y={-96} width={480} height={5} fill={P.navy1} />
    <text x={0} y={-22} textAnchor="middle" fill={P.coralD} style={{ font: '400 74px "Bebas Neue"' }}>{l1}</text>
    <text x={0} y={52} textAnchor="middle" fill={P.coralD} style={{ font: '400 74px "Bebas Neue"' }}>{l2}</text>
    {[0, 1, 2].map((k) => <rect key={k} x={-240} y={86 + k * 22} width={k === 2 ? 300 : 480} height={10} rx={5} fill="#C8B994" />)}
  </g>
)
// # a laptop: navy screen with a small bar chart; `bars` 0→1 grows them, `hi` lights the no-show bar coral, `tick` draws a big mint tick
const Laptop: React.FC<{ x: number; y: number; s?: number; o?: number; bars?: number; hi?: number; tick?: number }> = ({ x, y, s = 1, o = 1, bars = 0, hi = 0, tick = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-290} y={-190} width={580} height={360} rx={22} fill={P.navy0} stroke="#C9D2E0" strokeWidth={10} />
    <path d="M-340 170 H340 L310 214 H-310 Z" fill="#C9D2E0" /><rect x={-60} y={170} width={120} height={14} rx={7} fill="#A9B4C4" />
    <g opacity={1 - tick}>
      {[0.45, 0.7, 0.55, 0.85, 0.62].map((h, k) => {
        const bh = 210 * h * easeOut(Math.min(1, Math.max(0, bars * 1.6 - k * 0.15)))
        return <rect key={k} x={-230 + k * 96} y={130 - bh} width={64} height={bh} rx={10} fill={k === 3 && hi > 0 ? P.coral : P.sky} opacity={k === 3 ? 1 : lerp(1, 0.45, hi)} />
      })}
    </g>
    {tick > 0 && <path d="M-110 -10 L-30 70 L130 -110" stroke={P.mint} strokeWidth={40} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={420} strokeDashoffset={420 * (1 - tick)} />}
  </g>
)
// # a round panel ("little world") with a label under it
const Circle: React.FC<{ x: number; y: number; o?: number; s?: number; label: string; children: React.ReactNode; ring?: string }> = ({ x, y, o = 1, s = 1, label, children, ring = P.champ }) => (
  o > 0.001 ? <g opacity={o}>
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={150} fill={P.card} stroke={ring} strokeWidth={6} />
      <clipPath id={`ob-c-${x}-${y}`}><circle r={144} /></clipPath>
      <g clipPath={`url(#ob-c-${x}-${y})`}>{children}</g>
    </g>
    <Label x={x} y={y + 150 * s + 64} text={label} size={66} font="Bebas Neue" color={P.ink} />
  </g> : null
)
// # a gate sign
const GateSign: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-6} y={60} width={12} height={90} fill="#8A97AB" />
    <rect x={-170} y={-70} width={340} height={140} rx={18} fill={P.navy0} stroke={P.gold} strokeWidth={6} />
    <text x={0} y={36} textAnchor="middle" fill={P.gold} style={{ font: '400 110px "Bebas Neue"', letterSpacing: 10 }}>GATE</text>
  </g>
)
// # a hand microphone (held)
const Mic: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(-30) scale(${s})`} opacity={o}>
    <rect x={-8} y={-10} width={16} height={60} rx={8} fill="#2B2F3A" /><circle cx={0} cy={-22} r={20} fill="#8A97AB" /><circle cx={-6} cy={-28} r={6} fill="#FFFFFF" opacity={0.5} />
  </g>
)
// # a balance: `tilt` in degrees (negative = the left pan goes down)
const Balance: React.FC<{ x: number; y: number; s?: number; o?: number; tilt?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, s = 1, o = 1, tilt = 0, left, right }) => {
  const a = tilt * Math.PI / 180, L = 280
  const lx = -L * Math.cos(a), ly = -L * Math.sin(a), rx = L * Math.cos(a), ry = L * Math.sin(a)
  const Pan: React.FC<{ px: number; py: number; children?: React.ReactNode }> = ({ px, py, children }) => (
    <g transform={`translate(${px} ${py})`}>
      <path d="M0 0 L-118 150 M0 0 L118 150" stroke={P.champ} strokeWidth={5} />
      <path d="M-120 150 H120 Q100 196 0 196 Q-100 196 -120 150 Z" fill={P.champ} />
      <g transform="translate(0 92)">{children}</g>
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M-120 420 H120 L90 386 H-90 Z" fill={P.champ} /><rect x={-14} y={0} width={28} height={390} fill={P.champ} />
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={P.champ} strokeWidth={20} strokeLinecap="round" />
      <circle r={26} fill={P.gold} />
      <Pan px={lx} py={ly}>{left}</Pan>
      <Pan px={rx} py={ry}>{right}</Pan>
    </g>
  )
}
// # a small crew member: a Mini with a pilot's cap
const Crew: React.FC<{ x: number; y: number; s: number; f: number; seed: number; o?: number }> = ({ x, y, s, f, seed, o = 1 }) => (
  o > 0.001 ? <g opacity={o}>
    <Mini look="investor" x={x} y={y} scale={s} frame={f} seed={seed} mood="neutral" />
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-27 -164 Q-26 -184 0 -186 Q26 -184 27 -164 Z" fill={P.navy0} /><rect x={-32} y={-168} width={64} height={9} rx={4.5} fill="#0A0F1E" />
      <circle cx={0} cy={-176} r={5} fill={P.gold} />
    </g>
  </g> : null
)
// # a person icon for the 100-passenger grid
const Pax: React.FC<{ x: number; y: number; color: string; hollow?: boolean; o?: number }> = ({ x, y, color, hollow, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle cx={0} cy={-6} r={6} fill={hollow ? 'none' : color} stroke={hollow ? color : 'none'} strokeWidth={2.5} />
    <path d="M-10 11 Q-10 1 0 1 Q10 1 10 11 Z" fill={hollow ? 'none' : color} stroke={hollow ? color : 'none'} strokeWidth={2.5} />
  </g>
)
// # a label on a soft pill
const Pill: React.FC<{ x: number; y: number; text: string; size?: number; o?: number; color?: string; fill?: string; s?: number }> = ({ x, y, text, size = 56, o = 1, color = P.ink, fill = P.card, s = 1 }) => {
  const w = text.length * size * 0.42 + 44
  return o > 0.001 ? <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-w / 2} y={-size * 0.78} width={w} height={size * 1.2} rx={size * 0.4} fill={fill} opacity={0.95} /><Label x={0} y={size * 0.08} text={text} size={size} font="Bebas Neue" color={color} /></g> : null
}
const ArrowDown: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string; len?: number }> = ({ x, y, s = 1, o = 1, color = P.gold, len = 60 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d={`M-20 ${-len} H20 V0 H48 L0 56 L-48 0 H-20 Z`} fill={color} /></g>
)
// # a flicker for the seat that doesn't exist
const flick = (f: number) => 0.6 + 0.25 * Math.sin(f / 3) + 0.1 * Math.sin(f * 1.7)

// ---------------------------------------------------------------- s1–s4: seats that don't exist · why sell one? · more tickets than seats · a scam? legal
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), seats = c('s1:seats'), exist = c('s1:exist'), purpose = c('s1:purpose')
  const s2 = c('s2'), sell2 = c('s2:sell'), ticket = c('s2:ticket'), seat2 = c('s2:seat'), isnt = c("s2:isn't"), there = c('s2:there')
  const s3 = c('s3'), busy = c('s3:busy'), sell = c('s3:sell'), more = c('s3:more'), plane = c('s3:plane'), seats3 = c('s3:seats')
  const s4 = c('s4'), scam = c('s4:scam'), legal = c('s4:legal'), reason = c('s4:reason'), simple = c('s4:simple')
  const A = win(f, s1, s2), B = win(f, s2, s3), Cc = win(f, s3, s4), D = on(f, s4, 8)
  const fly = easeOut(span(f, s1, s1 + 22))
  const heroB: Beat[] = [[s2, 'scratchHead', 'thinking'], [ticket, 'holdUp', 'thinking'], [there, 'shrug', 'shocked']]
  const hp = hand(f, heroB, 290, 1255, 0.78)
  const heroD: Beat[] = [[s4, 'hold', 'thinking'], [scam, 'holdUp', 'shocked'], [legal, 'hold', 'smiling'], [reason, 'explain', 'smiling']]
  return (
    <g>
      <TallStage id="oh" f={f} />
      <Headline f={f} until={9e9} lines={[[s1, 'AIRLINES', P.ink, 120], [exist, "SEATS THAT DON'T EXIST", P.goldInk, 90], [purpose, 'ON PURPOSE', P.coralInk, 124], [s2, '', P.ink], [ticket, 'WHY SELL IT?', P.ink, 124],
        [s3, '', P.ink], [busy, 'A BUSY FLIGHT', P.ink, 110], [more, 'MORE TICKETS THAN SEATS', P.goldInk, 84], [s4, '', P.ink], [reason, 'THE REASON IS SIMPLE', P.ink, 92]]} />
      {/* # A: a plane flies in; its seats line up underneath; one more seat flickers — it doesn't exist */}
      <g opacity={A}>
        <Plane x={lerp(-420, CX, fly)} y={lerp(640, 600, fly)} s={1.12} r={lerp(-6, 0, fly)} />
        {[170, 370, 570].map((x, k) => <g key={k} opacity={on(f, seats + k * 3, 5)}><Seat x={x} y={1120} s={pop(f, seats + k * 3) * 1.45} /></g>)}
        <g opacity={on(f, exist, 6) * flick(f)}><Seat x={790} y={1120} s={pop(f, exist) * 1.45} ghost /></g>
      </g>
      {/* # B: you hold a ticket — for a seat that isn't there */}
      <g opacity={B}>
        <Person f={f} who="hero" beats={heroB} x={290} y={1255} s={0.78} life={3} o={on(f, s2, 8)} />
        <g opacity={on(f, sell2, 6)}><Ticket x={hp.x + 50} y={hp.y - 80} s={0.62 * pop(f, sell2)} r={-8} glow={on(f, ticket, 6) * (1 - on(f, ticket + 12, 8))} glowColor={P.gold} /></g>
        <g opacity={on(f, seat2, 6) * (f >= isnt ? flick(f) : 1)}><Seat x={740} y={1120} s={pop(f, seat2) * 1.35} ghost /></g>
        <g opacity={on(f, there, 6)} transform={`translate(740 650) scale(${pop(f, there)})`}><Prop id="question" x={0} y={0} size={190} f={f} /></g>
      </g>
      {/* # C: seven tickets, six seats — six drop into a seat, the seventh has nowhere to go */}
      <g opacity={Cc}>
        {Array.from({ length: 5 }, (_, k) => {
          const last = k === 4, x = last ? 800 : 140 + k * 165, y = last ? 560 : k % 2 ? 660 : 560, at = sell + k * 3, land = easeInOut(span(f, more + k * 2, more + k * 2 + 12))
          return <g key={k} opacity={on(f, at, 5)}><Ticket x={x} y={last ? y + Math.sin(f / 2) * 5 * on(f, seats3, 4) : lerp(y, 900, land)} s={0.44 * pop(f, at)} r={last ? -8 : 0} glow={last ? on(f, seats3, 6) : 0} /></g>
        })}
        {Array.from({ length: 4 }, (_, k) => <g key={k} opacity={on(f, plane + k * 2, 5)}><Seat x={140 + k * 165} y={1190} s={pop(f, plane + k * 2) * 1.15} lit={on(f, plane + k * 2 + 12, 6) * 0.6} litColor={P.mint} /></g>)}
        <g opacity={on(f, seats3 + 4, 6)} transform={`translate(830 1010) scale(${pop(f, seats3 + 4)})`}><Prop id="question" x={0} y={0} size={200} f={f} /></g>
        {/* # the crowd on "busy" (small, at the top, gone before the tickets) */}
        <g opacity={on(f, s3, 6) * (1 - on(f, sell - 4, 6))}>{[150, 330, 510, 690, 870].map((x, k) => <g key={k} opacity={on(f, s3 + k * 2, 5)}><Mini look={['hero', 'buyer', 'investor', 'owner', 'worker'][k]} x={x} y={1180} scale={2.3} frame={f} seed={k + 3} /></g>)}</g>
      </g>
      {/* # D: a scam? — the gavel: legal — the reason is simple */}
      <g opacity={D}>
        <g opacity={on(f, s4, 6) * (1 - on(f, reason - 2, 6))}><Ticket x={CX} y={680} s={pop(f, s4) * 1.25} r={-3} /></g>
        <Stamp x={CX} y={660} text="SCAM?" color={P.coral} s={pop(f, scam) * 1.1} o={on(f, scam, 5) * (1 - on(f, legal - 4, 5))} />
        <Stamp x={CX} y={660} text="LEGAL" color={P.mint} s={pop(f, legal) * 1.1} o={on(f, legal, 5) * (1 - on(f, reason - 2, 6))} />
        {(() => { const gp = hand(f, heroD, 760, 1255, 0.76, true); return <g opacity={on(f, s4, 6) * (1 - on(f, reason - 2, 6))} transform={`translate(${gp.x} ${gp.y - 30}) rotate(${lerp(-50, 10, easeInOut(span(f, legal - 6, legal)))}) scale(${pop(f, s4)})`}><Prop id="gavel" x={0} y={0} size={170} f={f} /></g> })()}
        <g opacity={on(f, reason, 6)}><Seat x={300} y={1180} s={pop(f, reason) * 1.6} /></g>
        <g opacity={on(f, simple, 6)} transform={`translate(300 820) scale(${pop(f, simple)})`}><Prop id="question" x={0} y={0} size={150} f={f} /></g>
        <Person f={f} who="hero" beats={heroD} x={760} y={1255} s={0.76} life={5} flip o={on(f, s4, 8)} />
      </g>
      <Vignette id="oh" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s5–s8: no-shows · connection, sick, oversleep, plans · doors close · stale bread
const NoShow: React.FC<PieceProps> = ({ f, c }) => {
  const s5 = c('s5'), people = c('s5:people'), never = c('s5:never'), show = c('s5:show')
  const s6 = c('s6'), connection = c('s6:connection'), sick = c('s6:sick'), oversleep = c('s6:oversleep'), plans = c('s6:plans'), change = c('s6:change')
  const s7 = c('s7'), doors = c('s7:doors'), close = c('s7:close'), empty = c('s7:empty'), never7 = c('s7:never'), sold = c('s7:sold')
  const s8 = c('s8'), bread = c('s8:bread'), stale = c('s8:stale'), plane = c('s8:plane'), off = c('s8:off')
  const A = win(f, s5, s6), B = win(f, s6, s7), Cc = win(f, s7, s8), D = on(f, s8, 8)
  const row = [140, 320, 500, 680, 860]
  const shut = easeInOut(span(f, close - 4, close + 10))
  const lift = easeInOut(span(f, plane, off + 16))
  return (
    <g>
      <TallStage id="on" f={f} />
      <Headline f={f} until={9e9} lines={[[show, 'NO-SHOWS', P.coralInk, 130], [s6, '', P.ink], [s7, '', P.ink], [doors, 'THE DOORS CLOSE', P.ink, 110], [never7, 'NEVER SOLD AGAIN', P.coralInk, 110], [s8, '', P.ink], [bread, 'LIKE BREAD…', P.ink, 120], [plane, 'GONE STALE', P.coralInk, 120]]} />
      {/* # A: a row fills up — one seat stays empty */}
      <g opacity={A}>
        {row.map((x, k) => <Seat key={k} x={x} y={1040} s={pop(f, s5 + k * 2) * 1.5} o={on(f, s5 + k * 2, 5)} who={k === 3 ? undefined : k} whoO={on(f, people + k * 3, 6)} lit={k === 3 ? on(f, never, 8) : 0} />)}
        <g opacity={on(f, show, 6)} transform={`translate(680 640) scale(${pop(f, show)})`}><Prop id="question" x={0} y={0} size={200} f={f} /></g>
        {/* # the passenger who should be there: a dashed outline that fades away */}
        <g opacity={on(f, never, 6) * (1 - on(f, show + 6, 14)) * 0.8}><Seat x={680} y={1040} s={1.5} ghost who={undefined} /></g>
      </g>
      {/* # B: why — four little worlds, one per reason */}
      <g opacity={B}>
        <Circle x={290} y={600} o={on(f, connection, 6)} s={pop(f, connection)} label="MISSED CONNECTION">
          <Plane x={lerp(-20, 70, span(f, connection, s7))} y={lerp(10, -60, span(f, connection, s7))} s={0.3} r={-14} />
          <g transform="translate(-60 70)"><Prop id="clock" x={0} y={0} size={110} f={f} /></g>
        </Circle>
        <Circle x={710} y={600} o={on(f, sick, 6)} s={pop(f, sick)} label="SICK">
          <Prop id="thermometer" x={-30} y={0} size={210} f={f} /><g transform="translate(70 60)"><Prop id="medical-kit" x={0} y={0} size={110} f={f} /></g>
        </Circle>
        <Circle x={290} y={980} o={on(f, oversleep, 6)} s={pop(f, oversleep)} label="OVERSLEPT">
          <Prop id="clock" x={-20} y={20} size={190} f={f} />
          {[0, 1, 2].map((k) => <text key={k} x={60 + k * 28} y={-40 - k * 34} fill={P.sky} opacity={on(f, oversleep + 4 + k * 4, 5)} style={{ font: `400 ${40 + k * 12}px "Bebas Neue"` }}>Z</text>)}
        </Circle>
        <Circle x={710} y={980} o={on(f, change, 6)} s={pop(f, change)} label="NEW PLANS">
          <Calendar x={0} y={0} text="" s={1.2} />
          <g opacity={on(f, plans, 5)} transform={`scale(${pop(f, plans)})`}><path d="M-60 -40 L60 80 M60 -40 L-60 80" stroke={P.coral} strokeWidth={18} strokeLinecap="round" /></g>
        </Circle>
      </g>
      {/* # C: the cabin door slides shut — the empty seat's price tag is crossed out */}
      <g opacity={Cc}>
        <g opacity={on(f, s7, 6)} transform={`translate(${CX} 640) scale(${pop(f, s7)})`}>
          <rect x={-190} y={-230} width={380} height={460} rx={40} fill="#E1E7F0" />
          <rect x={-150} y={-200} width={300} height={400} rx={30} fill="#26364F" />
          <clipPath id="on-door"><rect x={-150} y={-200} width={300} height={400} rx={30} /></clipPath>
          <g clipPath="url(#on-door)">
            <g transform={`translate(${lerp(-300, 0, shut)} 0)`}>
              <rect x={-150} y={-200} width={300} height={400} fill="#F2F5FA" />
              <circle cx={0} cy={-80} r={46} fill="#9CC7EE" stroke="#C9D2E0" strokeWidth={10} />
              <rect x={70} y={10} width={44} height={14} rx={7} fill="#8A97AB" />
            </g>
          </g>
        </g>
        <g opacity={on(f, empty, 6)}>
          <Seat x={360} y={1220} s={pop(f, empty) * 1.75} grey={on(f, never7, 10)} />
          <g transform={`translate(720 1060) rotate(6) scale(${pop(f, empty + 4) * 1.2})`} opacity={on(f, empty + 4, 6)}>
            <path d="M-130 0 L-90 -70 H130 V70 H-90 Z" fill={P.paper} stroke={P.edge} strokeWidth={3} />
            <circle cx={-88} cy={0} r={11} fill={P.navy1} />
            <text x={20} y={36} textAnchor="middle" fill={P.navy1} style={{ font: '400 100px "Bebas Neue"' }}>$</text>
            <g opacity={on(f, sold, 5)}><path d="M-110 -60 L120 60 M120 -60 L-110 60" stroke={P.coral} strokeWidth={16} strokeLinecap="round" /></g>
          </g>
        </g>
      </g>
      {/* # D: fresh bread goes stale — as the plane takes off */}
      <g opacity={D}>
        <Bread x={CX} y={680} s={pop(f, bread) * 1.25} o={on(f, bread, 6)} stale={easeInOut(span(f, plane - 2, plane + 10))} />
        <g opacity={on(f, bread, 6)} transform={`translate(780 520) rotate(8) scale(${pop(f, bread)})`}>
          <path d="M-120 0 L-84 -56 H120 V56 H-84 Z" fill={P.paper} stroke={P.edge} strokeWidth={3} /><circle cx={-82} cy={0} r={10} fill={P.navy1} />
          <text x={20} y={22} textAnchor="middle" fill={f >= plane ? P.coralD : P.navy1} style={{ font: '400 64px "Bebas Neue"' }}>{f >= plane ? 'UNSOLD' : 'FRESH'}</text>
        </g>
        <g opacity={on(f, plane, 6)}><Plane x={lerp(200, 820, lift)} y={lerp(1120, 930, lift)} s={0.55} r={lerp(0, -12, span(f, plane, plane + 10))} /></g>
        <g opacity={on(f, plane, 6)}><rect x={80} y={1180} width={860} height={10} rx={5} fill={P.ink2} opacity={0.35} /></g>
      </g>
      <Vignette id="on" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s9–s13: example — 180 seats · 5 in 100 don't turn up · 9 empty · 189 tickets · 9 × $200 = $1,800 on one flight
// # the nine no-show seats (row, column) on the seat map
const NOSHOW: [number, number][] = [[2, 1], [5, 4], [8, 0], [11, 5], [14, 2], [17, 3], [20, 1], [23, 4], [26, 2]]
const PAX_OUT = [12, 37, 55, 71, 94]
const Maths: React.FC<PieceProps> = ({ f, c }) => {
  const s9 = c('s9'), plane = c('s9:plane'), hundred = c('s9:hundred'), eighty = c('s9:eighty'), seats9 = c('s9:seats')
  const route = c('s10:route'), five = c('s10:five'), hundred10 = c('s10:hundred'), turn = c('s10:turn')
  const s11 = c('s11'), nine = c('s11:nine'), empty = c('s11:empty')
  const sells = c('s12:sells'), e89 = c('s12:eightynine'), tickets12 = c('s12:tickets')
  const s13 = c('s13'), ticket = c('s13:ticket'), two = c('s13:two'), nine13 = c('s13:nine'), extra = c('s13:extra'), bring = c('s13:bring'), eighteen = c('s13:eighteen'), one = c('s13:one')
  const A = win(f, s9, s13, 8), B = on(f, s13, 8)
  const cx = 290, y0 = 410
  const fx = (r: number, k: number) => seatXY(cx, y0, r, k)
  // # where the nine extra tickets wait (3 × 3, on the right) before they fly into the empty seats
  const wait = (j: number) => ({ x: 690 + (j % 3) * 80, y: 980 + Math.floor(j / 3) * 56 })
  return (
    <g>
      <TallStage id="om" f={f} />
      <Headline f={f} until={9e9} lines={[[s9, 'AN EXAMPLE', P.ink2, 96], [route, 'NO-SHOWS', P.coralInk, 120], [nine, 'EMPTY SEATS', P.coralInk, 116], [sells, 'SELL MORE TICKETS', P.goldInk, 104],
        [s13, '', P.ink], [ticket, 'EXAMPLE FARE', P.ink2, 96], [extra, 'THE EXTRA TICKETS', P.goldInk, 100], [one, 'ON JUST ONE FLIGHT', P.goldInk, 100]]} />
      <g opacity={A}>
        {/* # the plane from above, its 180 seats filling in row by row */}
        <g opacity={on(f, s9, 6)}><Fuselage cx={cx} y0={y0} y1={y0 + 830} s={lerp(0.92, 1, on(f, plane, 12))} /></g>
        {Array.from({ length: ROWS }, (_, r) => COLS.map((_, k) => {
          const p = fx(r, k), at = hundred + r * 0.7
          const j = NOSHOW.findIndex(([nr, nk]) => nr === r && nk === k)
          const state = j < 0 ? 1 : f >= e89 + j ? 3 : f >= nine + j * 2 ? 2 : 1
          return <SeatDot key={`${r}-${k}`} x={p.x} y={p.y} state={state} o={on(f, at, 4)} />
        }))}
        <Pill x={740} y={520} text="180 SEATS" size={76} color={P.ink} o={on(f, eighty, 6)} s={pop(f, eighty)} />
        {/* # 100 passengers — five don't turn up */}
        <g opacity={on(f, route, 6) * (1 - on(f, s11, 8))}>
          {Array.from({ length: 100 }, (_, i) => {
            const out = PAX_OUT.includes(i)
            const lit = out && f >= five + PAX_OUT.indexOf(i) * 3
            return <g key={i} transform={`translate(${590 + (i % 10) * 36} ${600 + Math.floor(i / 10) * 50}) scale(1.45)`}><Pax x={0} y={0} color={lit ? P.coral : P.ink2} hollow={lit} o={on(f, hundred10 - 6 + Math.floor(i / 10), 4) * (out ? 1 - 0.6 * on(f, turn, 10) : 1)} /></g>
          })}
          <Label x={752} y={1160} text="5 IN 100" size={92} font="Bebas Neue" color={P.coralInk} o={on(f, five, 6)} />
        </g>
        <Pill x={740} y={760} text="9 EMPTY" size={84} color={P.coralInk} o={on(f, nine, 6) * (1 - on(f, sells - 4, 6))} s={pop(f, nine)} />
        {/* # the nine extra tickets: they appear on "sells" and fly into the empty seats on "189" */}
        {NOSHOW.map(([r, k], j) => {
          const w = wait(j), p = fx(r, k), t = easeInOut(span(f, e89 + j - 10, e89 + j))
          const q = arc(w, p, t, 120)
          return f < e89 + j + 1 ? <g key={j} opacity={on(f, sells + j, 4)}><Ticket x={q.x} y={q.y} s={lerp(0.2, 0.07, t) * pop(f, sells + j)} /></g> : null
        })}
        <Pill x={740} y={800} text="189 TICKETS" size={84} color={P.goldInk} o={on(f, e89, 6)} s={pop(f, e89) * (1 + 0.06 * on(f, tickets12, 6))} />
      </g>
      {/* # B: $200 a ticket × 9 extra tickets = $1,800 — on just one flight */}
      <g opacity={B}>
        <g opacity={on(f, ticket, 6) * (1 - on(f, one - 4, 6))}><Ticket x={CX} y={560} s={pop(f, ticket) * 1.35} text="$200" textO={on(f, two, 5)} /></g>
        {Array.from({ length: 9 }, (_, k) => { const t = easeInOut(span(f, bring + k * 1.2, bring + k * 1.2 + 10)), q = arc({ x: 150 + (k % 5) * 175, y: 800 + Math.floor(k / 5) * 110 }, { x: 270, y: 1090 }, t, 80)
          return <g key={k} opacity={on(f, nine13 + k * 1.5, 4) * (1 - on(f, bring + k * 1.2 + 8, 3))}><Ticket x={q.x} y={q.y} s={0.42 * pop(f, nine13 + k * 1.5) * lerp(1, 0.3, t)} glow={on(f, extra, 6)} glowColor={P.gold} /></g> })}
        <g opacity={on(f, one, 6)}><Plane x={CX} y={740} s={pop(f, one) * 0.95} lit={span(f, one, one + 30)} /></g>
        <g opacity={on(f, bring, 6)} transform={`translate(270 1110) scale(${pop(f, bring)})`}><Prop id="money-bag" x={0} y={0} size={280} f={f} /></g>
        <Pill x={640} y={1110} text="$1,800" size={150} color={P.goldInk} o={on(f, eighteen, 6)} s={pop(f, eighteen) * (1 + 0.06 * on(f, eighteen + 4, 6) * (1 - on(f, eighteen + 14, 8)))} />
      </g>
      <Vignette id="om" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s14–s15: computers predict (route, day, season) · guess right → full plane, nobody notices
const Predict: React.FC<PieceProps> = ({ f, c }) => {
  const computers = c('s14:computers'), predict = c('s14:predict'), noshows = c('s14:noshows'), route = c('s14:route'), day = c('s14:day'), season = c('s14:season')
  const s15 = c('s15'), right = c('s15:right'), plane = c('s15:plane'), leaves = c('s15:leaves'), full = c('s15:full'), nobody = c('s15:nobody'), trick = c('s15:trick')
  const A = win(f, computers, plane, 6), B = on(f, plane, 8)
  const go = easeInOut(span(f, leaves, leaves + 30))
  const hero: Beat[] = [[plane, 'relax', 'smiling'], [nobody, 'leanBack', 'smiling'], [trick, 'confident', 'smug']]
  return (
    <g>
      <TallStage id="op" f={f} />
      <Headline f={f} until={9e9} lines={[[computers, 'COMPUTERS PREDICT', P.ink, 110], [right, 'GUESS RIGHT…', P.mintInk, 120], [full, 'A FULL FLIGHT', P.ink, 120], [nobody, 'NOBODY NOTICES', P.ink, 116]]} />
      <g opacity={A}>
        <Laptop x={CX} y={600} s={pop(f, computers) * 1.1} o={on(f, computers, 6)} bars={span(f, predict, predict + 20)} hi={on(f, noshows, 6)} tick={easeInOut(span(f, right, right + 10))} />
        <g opacity={on(f, noshows, 6) * (1 - on(f, right - 4, 6))}><Label x={CX} y={455} text="NO-SHOWS" size={64} font="Bebas Neue" color={P.coral} /></g>
        {/* # what the computer looks at: the route, the day, the season */}
        <g opacity={1 - on(f, right - 2, 6)}>
          <Circle x={200} y={1000} s={0.78 * pop(f, route)} o={on(f, route, 6)} label="ROUTE">
            <path d="M-80 40 Q0 -90 80 30" stroke={P.sky} strokeWidth={10} strokeDasharray="16 12" fill="none" strokeLinecap="round" />
            {[[-80, 40], [80, 30]].map(([px, py], k) => <g key={k} transform={`translate(${px} ${py})`}><path d="M0 0 C-30 -36 -30 -70 0 -70 C30 -70 30 -36 0 0 Z" fill={P.coral} /><circle cy={-48} r={11} fill="#FFFFFF" /></g>)}
          </Circle>
          <Circle x={CX} y={1000} s={0.78 * pop(f, day)} o={on(f, day, 6)} label="DAY">
            <Calendar x={0} y={10} text="" s={1.25} />
          </Circle>
          <Circle x={800} y={1000} s={0.78 * pop(f, season)} o={on(f, season, 6)} label="SEASON">
            <g transform="translate(-50 -20)"><circle r={42} fill={P.gold} />{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-5} y={-74} width={10} height={22} rx={5} fill={P.gold} transform={`rotate(${k * 45})`} />)}</g>
            <g transform="translate(55 50)" stroke="#BFE6FF" strokeWidth={9} strokeLinecap="round">{[0, 60, 120].map((a) => <line key={a} x1={0} y1={-48} x2={0} y2={48} transform={`rotate(${a})`} />)}</g>
          </Circle>
        </g>
      </g>
      {/* # B: the plane leaves full; on board, nobody notices */}
      <g opacity={B}>
        <Plane x={lerp(CX, 640, go)} y={lerp(620, 470, go)} r={lerp(0, -9, go)} s={pop(f, plane) * 1.05} lit={span(f, full - 6, full + 30)} />
        <Person f={f} who="hero" beats={hero} x={CX} y={1255} s={0.8} life={3} o={on(f, plane, 8)} />
      </g>
      <Vignette id="op" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s16–s19: everyone shows up · volunteers (later flight, vouchers, cash) · bumped · 2+ h late → 4 × fare, up to $2,150
const Bump: React.FC<PieceProps> = ({ f, c }) => {
  const s16 = c('s16'), sometimes = c('s16:sometimes'), everyone = c('s16:everyone'), shows = c('s16:shows')
  const s17 = c('s17'), ask = c('s17:ask'), volunteers = c('s17:volunteers'), later = c('s17:later'), flight = c('s17:flight'), vouchers = c('s17:vouchers'), cash = c('s17:cash')
  const s18 = c('s18'), nobody = c('s18:nobody'), agrees = c('s18:agrees'), someone = c('s18:someone'), bumped = c('s18:bumped')
  const s19 = c('s19'), inside = c('s19:inside'), two = c('s19:two'), hours = c('s19:hours'), late = c('s19:late'), owes = c('s19:owes'), four = c('s19:four'), fare = c('s19:fare'), two2 = c('s19:two#2'), fifty = c('s19:fifty')
  const A = win(f, s16, s17), B = win(f, s17, s18), Cc = win(f, s18, s19), D = on(f, s19, 8)
  const agent: Beat[] = [[s17, 'present', 'smiling'], [ask, 'pointUp', 'smiling'], [vouchers, 'offer', 'smiling']]
  const ap = hand(f, agent, 210, 1255, 0.74)
  const vol: Beat[] = [[ask, 'think', 'thinking'], [volunteers, 'reachUp', 'smiling'], [cash, 'thumbsUp', 'smiling']]
  const out = easeInOut(span(f, bumped, bumped + 16))
  return (
    <g>
      <TallStage id="ob" f={f} />
      <Headline f={f} until={9e9} lines={[[sometimes, 'SOMETIMES…', P.ink, 120], [everyone, 'EVERYONE SHOWS UP', P.coralInk, 110], [s17, '', P.ink], [ask, 'ASK FOR VOLUNTEERS', P.goldInk, 104], [s18, '', P.ink], [nobody, 'NOBODY AGREES', '#F7FAFF', 120], [bumped, 'AGAINST THEIR WILL', P.coralInk, 104],
        [s19, '', P.ink], [inside, 'FLIGHTS INSIDE THE US', P.ink, 96], [late, 'MORE THAN 2 HOURS LATE', '#F7FAFF', 92], [owes, 'THE AIRLINE OWES YOU', P.goldInk, 98]]} />
      {/* # A: seven people, six seats — six sit, one is left standing */}
      <g opacity={A}>
        {Array.from({ length: 5 }, (_, k) => <Seat key={k} x={140 + k * 180} y={800} s={1.3 * pop(f, s16 + k)} o={on(f, s16 + k, 5)} who={k + 2} whoO={on(f, shows + k * 2, 5)} />)}
        {Array.from({ length: 6 }, (_, k) => {
          const x = 130 + k * 150, gone = k < 5 ? on(f, shows + k * 2, 5) : 0
          return <g key={k} opacity={on(f, everyone + k * 2, 5) * (1 - gone)}><Mini look={['hero', 'buyer', 'investor', 'worker', 'owner', 'buyer'][k]} x={x} y={1240} scale={1.75} frame={f} seed={k + 21} mood={k === 5 && f >= shows + 12 ? 'sad' : 'neutral'} /></g>
        })}
        <g opacity={on(f, shows + 12, 6)} transform={`translate(880 880) scale(${pop(f, shows + 12)})`}><Prop id="exclamation" x={0} y={0} size={130} f={f} /></g>
      </g>
      {/* # B: the gate agent asks for volunteers — a later flight, vouchers or cash */}
      <g opacity={B}>
        <GateSign x={CX} y={560} s={pop(f, s17)} o={on(f, s17, 6) * (1 - on(f, later - 6, 6))} />
        <Person f={f} who="investor" beats={agent} x={210} y={1255} s={0.74} life={7} o={on(f, s17, 8)} />
        <g opacity={on(f, s17, 6)}><Mic x={ap.x + 6} y={ap.y - 12} s={0.9} /></g>
        <Person f={f} who="buyer" beats={vol} x={790} y={1255} s={0.74} life={9} flip o={on(f, ask, 8)} />
        <g opacity={on(f, later, 6)} transform={`translate(300 540) scale(${pop(f, later) * 0.85})`}><Clock x={0} y={0} sweep={span(f, later, flight + 20) * 0.5} /></g>
        <g opacity={on(f, flight, 6)}><Plane x={lerp(560, 700, span(f, flight, vouchers))} y={560} s={pop(f, flight) * 0.5} /></g>
        <g opacity={on(f, vouchers, 6)}><Voucher x={300} y={800} s={pop(f, vouchers) * 0.72} r={-4} /></g>
        <g opacity={on(f, cash, 6)} transform={`translate(680 800) scale(${pop(f, cash)})`}><Prop id="cash-stack" x={0} y={0} size={220} f={f} /></g>
      </g>
      {/* # C: nobody agrees — someone is bumped out of their seat */}
      <g opacity={Cc}>
        {[590, 725, 860].map((x, k) => <g key={k} opacity={on(f, s18 + k * 2, 5)}>
          <Mini look={['hero', 'worker', 'investor'][k]} x={x} y={1240} scale={1.75} frame={f} seed={k + 31} />
          <g opacity={on(f, agrees + k * 2, 5)} transform={`translate(${x} 880) scale(${pop(f, agrees + k * 2)})`}><Prop id="cross" x={0} y={0} size={100} f={f} /></g>
        </g>)}
        <g opacity={on(f, s18, 6)}>
          <Seat x={270} y={860} s={pop(f, s18) * 1.55} who={1} whoO={1 - out} whoX={0} lit={on(f, bumped, 6)} />
          <Stamp x={270} y={780} text="BUMPED" color={P.coral} size={84} s={pop(f, bumped)} o={on(f, bumped, 5)} />
          <g opacity={on(f, bumped, 6)}><Mini look="buyer" x={lerp(270, 380, easeInOut(span(f, bumped + 4, bumped + 30)))} y={1245} scale={1.75} frame={f} seed={61} mood="sad" /></g>
          <g opacity={on(f, bumped + 6, 6)} transform={`translate(380 470) scale(${pop(f, bumped + 6)})`}><rect x={-210} y={-54} width={420} height={108} rx={16} fill={P.navy0} stroke={P.gold} strokeWidth={5} /><text x={0} y={22} textAnchor="middle" fill={P.gold} style={{ font: '400 58px "Bebas Neue"', letterSpacing: 2 }}>NEXT FLIGHT →</text></g>
        </g>
      </g>
      {/* # D: the rule — 2+ hours late → 4 × the one-way fare, up to $2,150 */}
      <g opacity={D}>
        <g opacity={on(f, s19, 6) * (1 - on(f, two - 6, 6))}><Plane x={lerp(260, 740, span(f, s19, two))} y={lerp(760, 640, span(f, s19, two))} s={0.85 * pop(f, s19)} r={-6} /><Label x={CX} y={960} text="A US FLIGHT" size={90} font="Bebas Neue" color={P.skyInk} o={on(f, inside, 6)} /></g>
        <g opacity={on(f, two, 6)}><Clock x={290} y={640} s={pop(f, two) * 0.95} sweep={easeInOut(span(f, hours, late + 10))} /></g>
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, four + k * 3, 5)}><Ticket x={690 - 30 + k * 22} y={590 + k * 30} s={0.6 * pop(f, four + k * 3)} r={-6 + k * 4} text={k === 3 ? 'FARE' : ''} textO={on(f, fare, 5)} /></g>)}
        <Label x={720} y={850} text="4 × FARE" size={84} font="Bebas Neue" color={P.goldInk} o={on(f, fare, 6)} />
        <g opacity={on(f, two2, 6)} transform={`translate(250 1060) scale(${pop(f, two2)})`}><Prop id="cash-stack" x={0} y={0} size={230} f={f} /></g>
        <Pill x={650} y={1080} text="UP TO $2,150" size={92} color={P.goldInk} o={on(f, two2, 6)} s={pop(f, two2) * (1 + 0.08 * on(f, fifty, 6) * (1 - on(f, fifty + 10, 8)))} />
        <Label x={650} y={1190} text="THE MAXIMUM" size={60} font="Bebas Neue" color={P.ink2} o={on(f, fifty, 6)} />
      </g>
      <Vignette id="ob" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s20–s22: 2017 United, 4 seats for crew on a full plane · $800 vouchers refused · dragged off · weeks later up to $10,000
const United: React.FC<PieceProps> = ({ f, c }) => {
  const s20 = c('s20'), united = c('s20:united'), four = c('s20:four'), full = c('s20:full'), crew = c('s20:crew')
  const y2017 = s20 + 8 // # "2017" is said right after "In" (the aligner keeps it inside the gap before "United")
  const nobody = c('s21:nobody'), offer = c('s21:offer'), eight = c('s21:eight'), vouchers = c('s21:vouchers'), one = c('s21:one'), passenger = c('s21:passenger'), dragged = c('s21:dragged')
  const s22 = c('s22'), united2 = c('s22:united'), volunteers = c('s22:volunteers'), ten = c('s22:ten'), thousand = c('s22:thousand')
  const A = win(f, s20, s22, 8), Cc = on(f, s22, 8)
    const hero: Beat[] = [[s22, 'think', 'thinking'], [volunteers, 'reachUp', 'smiling'], [thousand, 'celebrate', 'shocked']]
  return (
    <g>
      <TallStage id="ou" f={f} />
      <Headline f={f} until={9e9} lines={[[y2017, '2017', P.goldInk, 150], [united, 'UNITED', P.ink, 140], [crew, 'SEATS FOR ITS OWN CREW', P.ink, 92], [nobody, 'NOBODY TOOK IT', P.coralInk, 116], [dragged, 'DRAGGED OFF', P.coralInk, 130],
        [s22, 'WEEKS LATER', P.ink, 120], [united2, '', P.ink], [volunteers, 'FOR VOLUNTEERS', P.mintInk, 116]]} />
      <g opacity={A}>
        {/* # a full row: four seats glow (needed for the crew); one passenger is pulled out */}
        {Array.from({ length: 6 }, (_, k) => {
          const pulled = k === 2
          return <Seat key={k} x={140 + k * 144} y={830} s={1.12 * pop(f, s20 + k * 2)} o={on(f, s20 + k * 2, 5)} who={k}
            whoO={on(f, full + k, 4) * (pulled ? 1 - on(f, one, 6) : 1)} whoX={0}
            lit={Math.max(k >= 2 ? on(f, four + (k - 2) * 2, 5) * (1 - on(f, nobody, 8)) : 0, pulled ? on(f, passenger, 6) : 0)} litColor={P.coral} />
        })}
        {/* # the four crew members (pilot caps) */}
        {[440, 580, 720, 860].map((x, k) => <Crew key={k} x={x} y={1245} s={1.75} f={f} seed={k + 41} o={on(f, crew + k * 2, 5) * (1 - on(f, one - 4, 6))} />)}
        {/* # the $800 voucher nobody took */}
        <g opacity={on(f, offer, 6) * (1 - on(f, one - 4, 6))}>
          <Voucher x={CX} y={520} s={pop(f, offer) * 0.95} amount="$800" amountO={on(f, eight, 5)} />
          <g opacity={on(f, vouchers + 4, 5)} transform={`translate(${CX} 520) scale(${pop(f, vouchers + 4) * 1.3})`}><path d="M-110 -70 L110 70 M110 -70 L-110 70" stroke={P.coral} strokeWidth={18} strokeLinecap="round" /></g>
        </g>
        <g opacity={on(f, one, 6)}>{(() => { const wx = lerp(430, 230, easeInOut(span(f, dragged, dragged + 40))); return <>
          <Crew x={wx - 120} y={1245} s={1.75} f={f} seed={52} />
          <Mini look="buyer" x={wx} y={1245} scale={1.75} frame={f} seed={53} mood="sad" />
          <Crew x={wx + 120} y={1245} s={1.75} f={f} seed={54} /></> })()}</g>
        <g opacity={on(f, dragged + 6, 6)}><Paper x={CX} y={500} s={pop(f, dragged + 6) * 0.85} r={-2} l1="PASSENGER" l2="DRAGGED OFF FLIGHT" /></g>
      </g>
      {/* # C: weeks later — up to $10,000 for volunteers */}
      <g opacity={Cc}>
        <g opacity={on(f, s22, 6) * (1 - on(f, ten - 4, 6))}><g transform={`translate(${CX} 640) scale(${pop(f, s22) * 2.2})`}><Calendar x={0} y={0} text="27" /></g><Label x={CX} y={880} text="APRIL 2017" size={84} font="Bebas Neue" color={P.ink} /></g>
        <Pill x={CX} y={680} text="UP TO $10,000" size={110} color={P.goldInk} o={on(f, ten, 6)} s={pop(f, ten) * (1 + 0.08 * on(f, thousand, 8))} />
        <g opacity={on(f, ten, 6)} transform={`translate(270 1050) scale(${pop(f, ten)})`}><Prop id="cash-stack" x={0} y={0} size={360} f={f} /></g>
        <Person f={f} who="hero" beats={hero} x={760} y={1255} s={0.76} life={3} flip o={on(f, s22, 8)} />
      </g>
      <Vignette id="ou" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s23–s27: rare · 1 in 40,000 (end of 2024) · extra tickets outweigh payouts · the gate agent asks · a seat that doesn't exist
const End: React.FC<PieceProps> = ({ f, c, to }) => {
  const s23 = c('s23'), rare = c('s23:rare')
  const end = c('s24:end'), one = c('s24:one'), forty = c('s24:forty')
  const s25 = c('s25'), airlines = c('s25:airlines'), keep = c('s25:keep'), thousands = c('s25:thousands'), extra = c('s25:extra'), more = c('s25:more'), payouts = c('s25:payouts')
  const s26 = c('s26'), gate = c('s26:gate'), asks = c('s26:asks'), volunteers = c('s26:volunteers'), know = c('s26:know')
  const s27 = c('s27'), sold = c('s27:sold'), seat = c('s27:seat'), exist = c('s27:exist')
  const A = win(f, s23, c('s25:airlines')), B = win(f, s25, s26), Cc = win(f, s26, s27), D = on(f, s27, 8) * (1 - on(f, exist + 16, 8))
  const fin = on(f, exist + 22, 8)
  const zoom = lerp(1, 0.42, easeInOut(span(f, forty - 4, forty + 26)))
  const agent: Beat[] = [[s26, 'present', 'smiling'], [asks, 'pointUp', 'smiling']]
  const ap = hand(f, agent, 230, 1255, 0.74)
  const hero: Beat[] = [[s26, 'idle', 'neutral'], [volunteers, 'reachUp', 'smiling'], [know, 'point', 'smug']]
  const tilt = lerp(0, -6, easeInOut(span(f, extra, extra + 12))) + lerp(0, -9, easeInOut(span(f, more, more + 14)))
  const drop = easeInOut(span(f, sold, seat + 8))
  return (
    <g>
      <TallStage id="oe" f={f} />
      <Headline f={f} until={c('s27')} lines={[[s23, 'BUMPED AGAINST YOUR WILL?', P.ink, 84], [rare, 'RARE', P.mintInk, 150], [end, 'END OF 2024', P.ink, 120], [forty, '1 IN 40,000', P.coralInk, 140],
        [s25, 'SO THEY KEEP DOING IT', P.ink, 100], [more, 'THE EXTRA TICKETS WIN', P.goldInk, 96], [s26, '', P.ink], [asks, 'ANY VOLUNTEERS?', P.goldInk, 120]]} />
      {/* # A: a field of passengers — find the one who was bumped (zooming out to forty thousand) */}
      <g opacity={A}>
        <defs><pattern id="oe-dots" width={30} height={30} patternUnits="userSpaceOnUse"><circle cx={15} cy={15} r={7} fill={P.sky} opacity={0.55} /></pattern></defs>
        <g transform={`translate(${CX} 840) scale(${zoom}) translate(${-CX} -840)`}>
          <clipPath id="oe-clip"><rect x={CX - 400 / zoom} y={840 - 380 / zoom} width={800 / zoom} height={760 / zoom} rx={30 / zoom} /></clipPath>
          <rect x={-2000} y={-2000} width={5000} height={5000} fill="url(#oe-dots)" clipPath="url(#oe-clip)" opacity={on(f, s23, 10)} />
          <g opacity={on(f, one, 5)}><circle cx={CX + 15} cy={855} r={14 / zoom} fill={P.coral} /><circle cx={CX + 15} cy={855} r={34 / zoom} fill="none" stroke={P.coral} strokeWidth={7 / zoom} opacity={0.9} /></g>
        </g>
        <g opacity={on(f, rare, 6) * (1 - on(f, end, 8))} transform={`translate(${lerp(300, 700, span(f, rare, end))} ${lerp(980, 720, span(f, rare, end))}) rotate(-20) scale(${pop(f, rare)})`}><Prop id="magnifier" x={0} y={0} size={230} f={f} /></g>
      </g>
      {/* # B: thousands of flights — the extra tickets outweigh the payouts */}
      <g opacity={B}>
        {[170, 390, 610, 830].map((x, k) => { const at = k === 0 ? airlines : k === 1 ? keep : thousands + (k - 2) * 3; return <g key={k} opacity={on(f, at, 5)}><Plane x={x} y={490} s={0.28 * pop(f, at)} /></g> })}
        <Balance x={CX} y={640} s={1.12} tilt={tilt} o={on(f, extra - 6, 6)}
          left={<g opacity={on(f, extra, 6)} transform={`scale(${pop(f, extra)})`}><Prop id="money-bag" x={0} y={-12} size={150} f={f} /></g>}
          right={<g opacity={on(f, extra - 6, 6)}><Prop id="coin" x={0} y={20} size={80} f={f} /></g>} />
        <Label x={CX - 230} y={1200} text="EXTRA TICKETS" size={62} font="Bebas Neue" color={P.goldInk} o={on(f, extra, 6)} />
        <Label x={CX + 260} y={1200} text="RARE PAYOUTS" size={62} font="Bebas Neue" color={P.ink2} o={on(f, payouts, 6)} />
      </g>
      {/* # C: next time — the gate agent asks; you know why */}
      <g opacity={Cc}>
        <GateSign x={CX} y={640} s={pop(f, s26) * (1 + 0.06 * on(f, gate, 6) * (1 - on(f, gate + 10, 8)))} o={on(f, s26, 6)} />
        <Person f={f} who="investor" beats={agent} x={230} y={1255} s={0.74} life={7} o={on(f, s26, 8)} />
        <g opacity={on(f, s26, 6)}><Mic x={ap.x + 6} y={ap.y - 12} s={0.9} /></g>
        <Person f={f} who="hero" beats={hero} x={780} y={1255} s={0.76} life={3} flip o={on(f, s26 + 4, 8)} />
      </g>
      {/* # D: someone was sold a seat that doesn't exist */}
      <g opacity={D}>
        <g opacity={on(f, s27, 6) * flick(f)}><Seat x={CX} y={1110} s={pop(f, s27) * 1.9} ghost lit={on(f, exist, 8) * 0.6} litColor={P.sky} /></g>
        <g opacity={on(f, sold, 6)}><Ticket x={CX} y={lerp(560, 760, drop)} s={pop(f, sold) * 0.85} r={lerp(-8, 0, drop)} glow={on(f, exist, 8)} glowColor={P.sky} /></g>
      </g>
      <g opacity={fin}><svg x={W / 2 - 80} y={600} width={160} height={160}><Emblem size={160} /></svg>
        <Label x={W / 2} y={850} text="CAPITALCODE" size={80} font="Bebas Neue" color={P.ink} /></g>
      <Vignette id="oe" w={W} h={H} />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const OVERBOOK = [
  makePiece('ob-hook', "Short: airlines sell seats that don't exist — why sell one? — more tickets than seats — a scam? legal", { canvas: 'tall', mood: 'dark', Component: Hook,
    beats: [...beat('s1', ['', 'seats', 'exist', 'purpose']), ...beat('s2', ['', 'ticket', 'seat', "isn't", 'there']), ...beat('s3', ['', 'busy', 'sell', 'more', 'plane', 'seats']), ...beat('s4', ['', 'scam', 'legal', 'reason', 'simple'])],
    sfx: [['s1', 'whoosh', 0.5], ['s1:seats', 'pop', 0.4], ['s1:exist', 'chime', 0.5], ['s2:ticket', 'swish', 0.4], ['s2:there', 'softpop', 0.4], ['s3:sell', 'flutter', 0.4], ['s3:plane', 'click', 0.4], ['s3:seats', 'thud', 0.4], ['s4:scam', 'impact', 0.5], ['s4:legal', 'thud', 0.5], ['s4:simple', 'ding', 0.4]] }),
  makePiece('ob-noshow', 'Short: some people never show up — connection, sick, oversleep, new plans — the doors close — bread gone stale', { canvas: 'tall', mood: 'light', Component: NoShow,
    beats: [...beat('s5', ['', 'people', 'never', 'show']), ...beat('s6', ['', 'connection', 'sick', 'oversleep', 'change', 'plans']), ...beat('s7', ['', 'doors', 'close', 'empty', 'never', 'sold']), ...beat('s8', ['', 'bread', 'stale', 'plane', 'off'])],
    sfx: [['s5:people', 'pop', 0.4], ['s5:show', 'softpop', 0.4], ['s6:connection', 'pop', 0.4], ['s6:sick', 'pop', 0.4], ['s6:oversleep', 'pop', 0.4], ['s6:plans', 'tick', 0.4], ['s7:close', 'thud', 0.5], ['s7:sold', 'crack', 0.4], ['s8:bread', 'softpop', 0.4], ['s8:stale', 'swish', 0.4], ['s8:plane', 'whoosh', 0.5]] }),
  makePiece('ob-maths', 'Short: example — 180 seats, 5 in 100 no-shows → 9 empty → 189 tickets; 9 × $200 = $1,800 on one flight', { canvas: 'tall', mood: 'dark', Component: Maths,
    beats: [...beat('s9', ['', 'plane', 'hundred', 'eighty']), ...beat('s10', ['route', 'five', 'hundred', 'turn']), ...beat('s11', ['', 'nine', 'empty']), ...beat('s12', ['sells', 'eightynine', 'tickets']), ...beat('s13', ['', 'ticket', 'two', 'nine', 'extra', 'bring', 'eighteen', 'one'])],
    sfx: [['s9:hundred', 'flutter', 0.4], ['s9:eighty', 'pop', 0.4], ['s10:hundred', 'flutter', 0.4], ['s10:five', 'tick', 0.4], ['s11:nine', 'click', 0.4], ['s12:sells', 'flutter', 0.4], ['s12:eightynine', 'ding', 0.5], ['s13:two', 'pop', 0.4], ['s13:nine', 'flutter', 0.4], ['s13:eighteen', 'cash', 0.5], ['s13:one', 'whoosh', 0.4]] }),
  makePiece('ob-predict', 'Short: computers predict no-shows by route, day and season — guess right and the plane leaves full', { canvas: 'tall', mood: 'light', Component: Predict,
    beats: [...beat('s14', ['computers', 'predict', 'noshows', 'route', 'day', 'season']), ...beat('s15', ['', 'right', 'plane', 'leaves', 'full', 'nobody', 'trick'])],
    sfx: [['s14:computers', 'pop', 0.4], ['s14:predict', 'click', 0.4], ['s14:route', 'pop', 0.4], ['s14:day', 'pop', 0.4], ['s14:season', 'pop', 0.4], ['s15:right', 'chime', 0.5], ['s15:leaves', 'whoosh', 0.5], ['s15:trick', 'softpop', 0.4]] }),
  makePiece('ob-bump', 'Short: everyone shows up — volunteers for vouchers or cash — bumped against their will — up to 4 × fare, max $2,150', { canvas: 'tall', mood: 'dark', Component: Bump,
    beats: [...beat('s16', ['', 'sometimes', 'everyone', 'shows']), ...beat('s17', ['', 'ask', 'volunteers', 'later', 'flight', 'vouchers', 'cash']), ...beat('s18', ['', 'nobody', 'agrees', 'someone', 'bumped']),
      ...beat('s19', ['', 'inside', 'two', 'hours', 'late', 'owes', 'four', 'fare', 'two#2', 'fifty'])],
    sfx: [['s16:everyone', 'flutter', 0.4], ['s16:shows', 'pop', 0.4], ['s17:ask', 'ding', 0.4], ['s17:later', 'tick', 0.4], ['s17:vouchers', 'pop', 0.4], ['s17:cash', 'cash', 0.5], ['s18:agrees', 'tick', 0.4], ['s18:bumped', 'impact', 0.5], ['s19:two', 'tick', 0.4], ['s19:four', 'flutter', 0.4], ['s19:two#2', 'cash', 0.5]] }),
  makePiece('ob-united', 'Short: 2017 — United needed 4 crew seats on a full plane — $800 vouchers refused — dragged off — up to $10,000', { canvas: 'tall', mood: 'light', Component: United,
    beats: [...beat('s20', ['', 'united', 'four', 'full', 'crew']), ...beat('s21', ['nobody', 'offer', 'eight', 'vouchers', 'one', 'passenger', 'dragged']), ...beat('s22', ['', 'united', 'volunteers', 'ten', 'thousand'])],
    sfx: [['s20:united', 'pop', 0.4], ['s20:four', 'tick', 0.4], ['s20:full', 'flutter', 0.4], ['s20:crew', 'pop', 0.4], ['s21:eight', 'pop', 0.4], ['s21:vouchers', 'crack', 0.4], ['s21:dragged', 'impact', 0.5], ['s22', 'swish', 0.4], ['s22:ten', 'cash', 0.6]] }),
  makePiece('ob-end', "Short: being bumped is rare — 1 in 40,000 — extra tickets outweigh payouts — the gate agent asks — a seat that doesn't exist", { canvas: 'tall', mood: 'dark', Component: End,
    beats: [...beat('s23', ['', 'rare']), ...beat('s24', ['end', 'one', 'forty']), ...beat('s25', ['', 'airlines', 'keep', 'thousands', 'extra', 'more', 'payouts']), ...beat('s26', ['', 'gate', 'asks', 'volunteers', 'know']), ...beat('s27', ['', 'sold', 'seat', 'exist'])],
    sfx: [['s23:rare', 'softpop', 0.4], ['s24:one', 'ding', 0.5], ['s24:forty', 'whoosh', 0.4], ['s25:thousands', 'flutter', 0.4], ['s25:extra', 'cash', 0.4], ['s25:more', 'thud', 0.4], ['s26:gate', 'pop', 0.4], ['s26:volunteers', 'ding', 0.4], ['s27:sold', 'swish', 0.4], ['s27:exist', 'chime', 0.5]] }),
]
