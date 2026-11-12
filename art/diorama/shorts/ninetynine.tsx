// ============================================================
// SHORT — "Why prices end in 99" (s1–s30, ≈ 2:04), seven tall
// pieces. Sourced: Thomas & Morwitz 2005 (JCR, NYU, five
// experiments: a 9-ending looks lower than one cent more only when
// the left digit changes); Anderson & Simester 2003 (HBR/QME: a
// dress raised $34 → $39 sold about a third more; $49 beat $44 and
// $54); Lacetera, Pope & Sydnor (NBER 17030 / AER 2012: 22 million
// used-car auction sales; 79,9xx miles ≈ $210 more than 80,0xx but
// only ≈ $10 less than 79,8xx; mostly final buyers). Our maths: 100 ×
// $34 = $3,400; 133 × $39 = $5,187 (+53%).
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
import { arc, clamp01, easeInOut, easeOut, lerp, on, P, pop, span, Vignette } from '../kit'
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
// # a price tag: a punched paper tag on a string; the price in two parts so the FIRST digit can be lit on its own.
// # first: "$4" (dollar sign + first digit) · rest: ".99" · lit: gold box behind the first digit · dim: the cents fade
// # grow: the first digit swells (the eye's weight) · slot: an empty dashed box where the first digit will go
const Tag: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; first?: string; rest?: string; lit?: number; litColor?: string; dim?: number; grow?: number; slot?: boolean; restO?: number; glow?: number; glowColor?: string; string?: boolean }> = ({ x, y, s = 1, r = 0, o = 1, first = '', rest = '', lit = 0, litColor = P.gold, dim = 0, grow = 0, slot, restO = 1, glow = 0, glowColor = P.mint, string = true }) => {
  // # Bebas Neue digits are ~0.42 em wide; the split sits right of the first digit
  const size = 132, split = 42, dw = size * 0.44
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {glow > 0 && <path d="M-196 0 L-140 -122 H196 V122 H-140 Z" fill={glowColor} opacity={0.35 * glow} transform="scale(1.08)" />}
      <path d="M-180 0 L-128 -106 H180 V106 H-128 Z" fill="#000" opacity={0.18} transform="translate(10 14)" />
      <path d="M-180 0 L-128 -106 H180 V106 H-128 Z" fill={P.paper} stroke={P.edge} strokeWidth={3} strokeLinejoin="round" />
      <path d="M-128 -106 H180 V-80 H-140 Z" fill="#FFFFFF" opacity={0.18} />
      <circle cx={-124} cy={0} r={15} fill={P.navy1} opacity={0.85} />
      {string && <path d="M-124 0 Q-170 -70 -150 -150" stroke={P.champ} strokeWidth={5} fill="none" strokeLinecap="round" />}
      <g transform={`translate(${split} 44) scale(${1 + 0.32 * grow}) translate(${-split} -44)`}>
        {/* # the first-digit box (lit gold / empty dashed slot while only "$" is there) */}
        {(lit > 0 || (slot && first.length < 2)) && <rect x={split - dw - 10} y={-78} width={dw + 20} height={128} rx={14} fill={slot && first.length < 2 ? P.gold : litColor} opacity={slot && first.length < 2 ? 0.35 : 0.85 * lit} />}
        {slot && first.length < 2 && <text x={split - dw / 2} y={44} textAnchor="middle" fill={P.goldD} style={{ font: `400 ${size}px "Bebas Neue"` }}>?</text>}
        <text x={first === '$' && slot ? split - dw - 14 : split} y={44} textAnchor="end" fill={P.navy1} style={{ font: `400 ${size}px "Bebas Neue"` }}>{first}</text>
      </g>
      <text x={split + 4} y={44} fill={P.navy1} opacity={(1 - 0.7 * dim) * restO} style={{ font: `400 ${size * (1 - 0.25 * dim)}px "Bebas Neue"` }}>{rest}</text>
    </g>
  )
}
// # a penny: copper, with "1¢"
const Penny: React.FC<{ x: number; y: number; s?: number; o?: number; spin?: number }> = ({ x, y, s = 1, o = 1, spin = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s * (0.35 + 0.65 * Math.abs(Math.cos(spin)))} ${s})`} opacity={o}>
    <circle r={78} fill="#8A4B22" transform="translate(6 8)" opacity={0.6} />
    <circle r={78} fill="#C9763B" /><circle r={62} fill="none" stroke="#9E5526" strokeWidth={6} />
    <path d="M-52 -40 A66 66 0 0 1 30 -62" stroke="#F3B27A" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} />
    <text y={22} textAnchor="middle" fill="#6E3612" style={{ font: '400 70px "Bebas Neue"' }}>1¢</text>
  </g>
)
// # a brain: two soft lobes with folds; `lit` warms it, `digit` shows a number glowing inside
const Brain: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number; litColor?: string; digit?: string; digitO?: number }> = ({ x, y, s = 1, o = 1, lit = 0, litColor = P.gold, digit, digitO = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <defs><radialGradient id={`br-${x}-${y}`}><stop offset="0%" stopColor={litColor} stopOpacity={0.55} /><stop offset="100%" stopColor={litColor} stopOpacity={0} /></radialGradient></defs>
    {lit > 0 && <ellipse rx={330} ry={270} fill={`url(#br-${x}-${y})`} opacity={lit} />}
    <ellipse cx={8} cy={176} rx={170} ry={22} fill="#000" opacity={0.16} />
    {[[-95, -40, 105], [-30, -85, 100], [55, -80, 100], [110, -10, 95], [70, 60, 92], [-20, 55, 100], [-110, 40, 86]].map(([cx, cy, r], k) => <circle key={k} cx={cx} cy={cy} r={r} fill="#F0A1AC" />)}
    <path d="M-200 0 Q-210 -150 -40 -175 Q120 -190 200 -60 Q230 60 140 130 Q20 175 -110 130 Q-210 90 -200 0 Z" fill="#F0A1AC" />
    <path d="M-150 -60 Q-110 -110 -60 -90 M-70 -130 Q-20 -100 -40 -50 M40 -150 Q20 -100 70 -80 M120 -100 Q160 -60 130 -20 M-170 40 Q-120 20 -110 70 M-40 100 Q-10 60 40 90 M100 40 Q140 70 120 110 M0 -175 Q-15 -20 5 150"
      stroke="#D46E7E" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M-150 -100 Q-90 -160 0 -160" stroke="#FFFFFF" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.35} />
    {digit && digitO > 0 && <g opacity={digitO}><circle r={92} fill={P.navy1} opacity={0.88} /><text y={52} textAnchor="middle" fill={P.gold} style={{ font: '400 150px "Bebas Neue"' }}>{digit}</text></g>}
  </g>
)
// # an eye that reads (front-facing almond eye; `look` −1…1 moves the iris left → right)
const Eye: React.FC<{ x: number; y: number; s?: number; o?: number; look?: number }> = ({ x, y, s = 1, o = 1, look = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-90 0 Q0 -70 90 0 Q0 70 -90 0 Z" fill="#FFFFFF" stroke={P.navy1} strokeWidth={6} />
    <circle cx={look * 42} r={32} fill={P.skyD} /><circle cx={look * 42} r={15} fill={P.navy0} /><circle cx={look * 42 + 9} cy={-10} r={7} fill="#FFFFFF" />
  </g>
)
// # a thought cloud with a big word inside
const Cloud: React.FC<{ x: number; y: number; s?: number; o?: number; text: string; color?: string }> = ({ x, y, s = 1, o = 1, text, color = P.navy1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[[-80, 10, 70], [-20, -30, 82], [60, -20, 76], [100, 25, 60], [20, 40, 74], [-70, 45, 56]].map(([cx, cy, r], k) => <circle key={k} cx={cx} cy={cy} r={r} fill={P.paper} />)}
    <circle cx={-40} cy={120} r={20} fill={P.paper} /><circle cx={-60} cy={160} r={11} fill={P.paper} />
    <text x={10} y={40} textAnchor="middle" fill={color} style={{ font: '400 120px "Bebas Neue"' }}>{text}</text>
  </g>
)
// # a university: steps, four columns, a pediment with its name
const University: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={150} rx={250} ry={20} fill="#000" opacity={0.18} />
    <rect x={-230} y={120} width={460} height={30} rx={6} fill="#C9B48E" /><rect x={-210} y={96} width={420} height={28} rx={6} fill="#DCCAA6" />
    {[-150, -50, 50, 150].map((cx) => <g key={cx}><rect x={cx - 24} y={-40} width={48} height={140} fill="#F2E6CC" /><rect x={cx - 24} y={-40} width={14} height={140} fill="#FFFFFF" opacity={0.35} /></g>)}
    <rect x={-215} y={-70} width={430} height={34} rx={4} fill="#DCCAA6" />
    <path d="M-235 -70 L0 -170 L235 -70 Z" fill="#E9DBBE" />
    <text x={0} y={-90} textAnchor="middle" fill={P.navy1} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 4 }}>NYU</text>
  </g>
)
// # a lab beaker, filling with liquid (fill 0→1)
const Beaker: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; color?: string; n?: string }> = ({ x, y, s = 1, o = 1, fill = 1, color = P.sky, n }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <clipPath id={`bk-${x}`}><path d="M-34 -80 V-20 L-60 60 Q-62 80 -42 80 H42 Q62 80 60 60 L34 -20 V-80 Z" /></clipPath>
    <rect x={-70} y={80 - 110 * fill} width={140} height={110 * fill} fill={color} clipPath={`url(#bk-${x})`} opacity={0.85} />
    <path d="M-34 -80 V-20 L-60 60 Q-62 80 -42 80 H42 Q62 80 60 60 L34 -20 V-80 Z" fill="none" stroke="#E6F3FF" strokeWidth={7} strokeLinejoin="round" />
    <rect x={-44} y={-92} width={88} height={14} rx={7} fill="#E6F3FF" />
    {n && <text y={140} textAnchor="middle" fill={P.ink2} style={{ font: '400 46px "Bebas Neue"' }}>{n}</text>}
  </g>
)
// # a dress on a hanger (the same dress throughout)
const Dress: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string; hanger?: boolean }> = ({ x, y, s = 1, o = 1, color = P.coral, hanger = true }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {hanger && <><path d="M0 -190 Q-4 -214 14 -218 Q30 -222 28 -204" stroke={P.ink2} strokeWidth={7} fill="none" strokeLinecap="round" /><path d="M-120 -130 L0 -190 L120 -130" stroke={P.ink2} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>}
    <path d="M-62 -150 Q0 -120 62 -150 L80 -60 Q60 -40 50 -30 L150 180 Q0 220 -150 180 L-50 -30 Q-60 -40 -80 -60 Z" fill={color} />
    <path d="M-50 -30 Q0 -10 50 -30" stroke={P.coralD} strokeWidth={10} fill="none" />
    <path d="M-62 -150 Q0 -120 62 -150" stroke={P.coralD} strokeWidth={6} fill="none" />
    <path d="M-30 -10 L-90 170 M20 0 L40 190" stroke="#FFFFFF" strokeWidth={6} opacity={0.18} />
  </g>
)
// # a catalogue: a glossy magazine with the dress on its cover
const Catalogue: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-200} y={-260} width={400} height={520} rx={16} fill="#000" opacity={0.18} transform="translate(12 14)" />
    <rect x={-200} y={-260} width={400} height={520} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <rect x={-176} y={-170} width={352} height={400} rx={10} fill="#F6D6C9" />
    <text x={0} y={-198} textAnchor="middle" fill={P.navy1} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 6 }}>CATALOGUE</text>
    <Dress x={0} y={50} s={0.78} hanger={false} />
  </g>
)
// # a study: a paper with a title and lines
const Study: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-160} y={-210} width={320} height={420} rx={16} fill="#000" opacity={0.16} transform="translate(10 12)" />
    <rect x={-160} y={-210} width={320} height={420} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <text x={0} y={-130} textAnchor="middle" fill={P.navy1} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>STUDY</text>
    {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-120} y={-80 + k * 44} width={240 - (k % 2) * 70} height={14} rx={7} fill="#C8B994" />)}
    <path d="M-110 150 l30 -40 l30 20 l40 -60 l40 30" stroke={P.skyD} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
)
// # a small dress icon (for counting dresses sold)
const DressIcon: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = P.coral }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-7 -14 Q0 -11 7 -14 L9 -6 L16 15 Q0 19 -16 15 L-9 -6 Z" fill={color} />
  </g>
)
// # a car odometer: navy display, white digits in cells; `lit` lights one digit (index) in a colour
const Odometer: React.FC<{ x: number; y: number; s?: number; o?: number; text: string; lit?: number; litIndex?: number; litColor?: string }> = ({ x, y, s = 1, o = 1, text, lit = 0, litIndex = 0, litColor = P.gold }) => {
  const cells = text.split(''), cw = 46, w = cells.length * cw + 28
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-w / 2} y={-46} width={w} height={92} rx={16} fill={P.navy0} stroke={P.champ} strokeWidth={4} />
      {cells.map((ch, k) => {
        const cx = -w / 2 + 14 + k * cw + cw / 2
        return <g key={k}>
          {ch !== ',' && <rect x={cx - 19} y={-34} width={38} height={68} rx={6} fill={k === litIndex && lit > 0 ? litColor : '#22314F'} opacity={k === litIndex && lit > 0 ? 0.35 + 0.65 * lit : 1} />}
          <text x={cx} y={22} textAnchor="middle" fill={k === litIndex && lit > 0.5 ? P.navy0 : '#F7FAFF'} style={{ font: '400 60px "Bebas Neue"' }}>{ch}</text>
        </g>
      })}
      <text x={w / 2 - 8} y={78} textAnchor="end" fill={P.ink2} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>MILES</text>
    </g>
  )
}
// # a label on a soft pill
const Pill: React.FC<{ x: number; y: number; text: string; size?: number; o?: number; color?: string; fill?: string; s?: number }> = ({ x, y, text, size = 56, o = 1, color = P.ink, fill = P.card, s = 1 }) => {
  const w = text.length * size * 0.42 + 44
  return o > 0.001 ? <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-w / 2} y={-size * 0.78} width={w} height={size * 1.2} rx={size * 0.4} fill={fill} opacity={0.95} /><Label x={0} y={size * 0.08} text={text} size={size} font="Bebas Neue" color={color} /></g> : null
}
// # bold arrows
const ArrowDown: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string; len?: number }> = ({ x, y, s = 1, o = 1, color = P.coral, len = 60 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d={`M-20 ${-len} H20 V0 H48 L0 56 L-48 0 H-20 Z`} fill={color} /></g>
)
// # a flat "=" sign
const Equals: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = P.ink }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-38} y={-26} width={76} height={16} rx={8} fill={color} /><rect x={-38} y={10} width={76} height={16} rx={8} fill={color} /></g>
)
// # a small shopping bag (in a Mini's hand)
const Bag: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = P.gold }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-10 -22 Q0 -36 10 -22" stroke={P.goldD} strokeWidth={4} fill="none" /><rect x={-18} y={-22} width={36} height={38} rx={5} fill={color} /></g>
)

// ---------------------------------------------------------------- s1–s4: $4.99 is one cent less than $5 — so why the 99? — the cent buys the store more — your brain
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), nn = c('s1:ninetynine'), one = c('s1:one'), cent = c('s1:cent'), less = c('s1:less'), five = c('s1:five')
  const s2 = c('s2'), why = c('s2:why'), many = c('s2:many'), prices = c('s2:prices'), nn2 = c('s2:ninetynine')
  const s3 = c('s3'), cent3 = c('s3:cent'), buys = c('s3:buys'), store = c('s3:store'), something = c('s3:something'), far = c('s3:far'), more = c('s3:more')
  const s4 = c('s4'), number = c('s4:number'), brain = c('s4:brain'), first = c('s4:first')
  // # scene windows (each leaves before the next arrives)
  const A = win(f, s1, s2), B = win(f, s2, s3), Cc = win(f, s3, s4), D = on(f, s4, 8)
  // # A: one big $4.99 tag, then it steps left for the $5.00 tag
  const side = easeInOut(span(f, five - 4, five + 12))
  // # B: a wall of prices that all end in 99
  const wall: [string, string][] = [['$1', '.99'], ['$9', '.99'], ['$19', '.99'], ['$2', '.99'], ['$49', '.99'], ['$0', '.99'], ['$7', '.99'], ['$99', '.99'], ['$14', '.99']]
  const heroB: Beat[] = [[s2, 'think', 'thinking'], [why, 'scratchHead', 'thinking'], [nn2, 'shrug', 'shocked']]
  // # C: the cent flies into the store; a bag of money comes out and grows
  const heroC: Beat[] = [[s3, 'present', 'smiling'], [buys, 'point', 'smiling'], [more, 'shrug', 'shocked']]
  const hp = hand(f, heroC, 170, 1255, 0.7)
  const flyT = easeInOut(span(f, buys, store + 8))
  // # the coin is held out in front of the hand (clear of the body), then flies into the shop
  const pen = arc({ x: hp.x + 70, y: hp.y - 40 }, { x: 680, y: 1000 }, flyT, 260)
  const bag = on(f, something, 10) * lerp(0.55, 1.12, easeOut(span(f, far, more + 10)))
  return (
    <g>
      <TallStage id="nh" f={f} />
      <Headline f={f} until={9e9} lines={[[cent, 'ONE CENT LESS', P.goldInk, 110], [why, 'SO WHY 99?', P.ink, 130], [s3, '', P.ink, 100], [store, 'FOR THE STORE…', P.ink, 100], [more, 'WORTH FAR MORE', P.goldInk, 112], [brain, 'YOUR BRAIN', P.ink, 120]]} />
      {/* # A */}
      <g opacity={A}>
        <Tag x={lerp(CX, 270, side)} y={lerp(720, 700, side)} s={pop(f, s1) * lerp(1.6, 0.95, side)} r={-4} first="$4" rest=".99" restO={on(f, nn, 6)} />
        <g opacity={on(f, five, 6)}><Tag x={760} y={700} s={pop(f, five) * 0.95} r={4} first="$5" rest=".00" /></g>
        {/* # the penny: drops in on "cent", sits between the two tags (below them), pointing out the gap */}
        <g opacity={on(f, one, 6)}><Penny x={CX} y={lerp(1080, 1040, side) - (1 - easeOut(span(f, one, cent + 6))) * 320} s={pop(f, cent) * 1.4} spin={f < cent + 6 ? f / 3 : 0} /></g>
        <g opacity={on(f, less, 6)}><Label x={CX} y={1225} text="$5.00 − $4.99 = 1¢" size={84} font="Bebas Neue" color={P.ink2} /></g>
      </g>
      {/* # B */}
      <g opacity={B}>
        {wall.map(([a, b], k) => {
          const at = (k < 3 ? many : prices) + (k % 3) * 3 + Math.floor(k / 3) * 2
          return <g key={k} opacity={on(f, at, 6)}><Tag x={210 + (k % 3) * 290} y={470 + Math.floor(k / 3) * 142} s={0.58 * pop(f, at)} string={false} r={(k % 2 ? 4 : -4)} first={a} rest={b} glow={on(f, nn2, 8)} glowColor={P.gold} /></g>
        })}
        <Person f={f} who="hero" beats={heroB} x={CX} y={1255} s={0.7} life={2} o={on(f, s2, 8)} />
      </g>
      {/* # C */}
      <g opacity={Cc}>
        <g opacity={on(f, s3, 6) * (1 - on(f, something - 6, 6))}><Tag x={CX + 60} y={560} s={pop(f, s3) * 0.8} r={-3} first="$4" rest=".99" dim={on(f, buys, 8)} /></g>
        <g opacity={on(f, s3, 6) * (1 - on(f, store + 10, 6))}><Penny x={pen.x} y={pen.y} s={pop(f, s3) * lerp(0.72, 0.4, flyT) * (1 + 0.2 * on(f, cent3, 6) * (1 - on(f, buys, 6)))} spin={flyT * 12} /></g>
        <Person f={f} who="hero" beats={heroC} x={170} y={1255} s={0.7} life={6} o={on(f, s3, 8)} />
        <g transform={`translate(660 1000) scale(${pop(f, store) * 1.5})`} opacity={on(f, store, 6)}><Prop id="shop-mini" x={0} y={0} size={500} f={f} /></g>
        <g opacity={on(f, something, 6)} transform={`translate(${lerp(680, 290, easeInOut(span(f, something, far)))} ${lerp(900, 610, easeInOut(span(f, something, far)))}) scale(${bag})`}><Prop id="money-bag" x={0} y={0} size={430} f={f} /></g>
      </g>
      {/* # D: the number your brain notices first — the "4" lifts off the tag into the brain */}
      <g opacity={D}>
        <g opacity={on(f, brain, 6)}><Brain x={CX} y={680} s={pop(f, brain) * 1.3} lit={on(f, first, 10)} digit="4" digitO={on(f, first + 8, 6)} /></g>
        <Tag x={CX} y={1130} s={pop(f, s4) * lerp(0.85, 1, on(f, number, 10))} first="$4" rest=".99" lit={on(f, first, 6) * (1 - on(f, first + 8, 6))} o={on(f, s4, 6)} />
        {f >= first && f < first + 16 && (() => { const p = arc({ x: CX - 40, y: 1120 }, { x: CX, y: 680 }, easeInOut(span(f, first, first + 12)), 60); return <text x={p.x} y={p.y + 40} textAnchor="middle" fill={P.gold} style={{ font: '400 120px "Bebas Neue"' }} opacity={1 - on(f, first + 10, 6)}>4</text> })()}
      </g>
      <Vignette id="nh" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s5–s7: we read left to right · the left-digit effect · four-something vs five
const Read: React.FC<PieceProps> = ({ f, c }) => {
  const s5 = c('s5'), price = c('s5:price'), left = c('s5:left'), right = c('s5:right'), first = c('s5:first'), digit = c('s5:digit'), most = c('s5:most')
  const res = c('s6:researchers'), call = c('s6:call'), ld = c('s6:leftdigit')
  const s7 = c('s7'), nn = c('s7:ninetynine'), fs = c('s7:foursomething'), five = c('s7:five'), five2 = c('s7:five#2')
  // # a clean cut just before "four-something": the reading scene's $4.99 tag carries "So four ninety-nine", then tag + cloud land together
  const cut = fs - 4
  const A = f < cut ? on(f, s5, 6) : 0, B = f >= cut ? 1 : 0
  const scan = easeInOut(span(f, left, right + 10))
  const hero: Beat[] = [[s5, 'read', 'thinking'], [first, 'point', 'thinking'], [most, 'point', 'shocked'], [call, 'explain', 'smiling']]
  return (
    <g>
      <TallStage id="nr" f={f} />
      <Headline f={f} until={fs - 4} lines={[[s5, 'LEFT → RIGHT', P.ink, 120], [first, 'THE FIRST DIGIT', P.goldInk, 112], [ld, 'THE LEFT-DIGIT EFFECT', P.ink, 100]]} />
      <g opacity={A}>
        {/* # the eye reads along the tag, then settles on the first digit */}
        <g opacity={on(f, s5, 6) * (1 - on(f, res, 8))}><Eye x={lerp(420, 760, scan) - on(f, first, 12) * lerp(0, 290, scan)} y={470} s={pop(f, s5) * 1.1} look={lerp(-0.8, 0.8, scan) - on(f, first, 12) * 1.6} /></g>
        <g transform={`translate(0 0)`}>
          <Tag x={600} y={700} s={pop(f, price) * 1.4} string={false} first="$4" rest=".99" o={on(f, price, 6)} lit={on(f, digit, 8)} dim={on(f, most, 12)} grow={on(f, most, 14)} />
        </g>
        {/* # the reading arrow sweeps left → right under the price */}
        <g opacity={on(f, left, 6) * (1 - on(f, first, 8))}>
          <path d={`M380 905 H${lerp(380, 850, scan)}`} stroke={P.skyInk} strokeWidth={16} strokeLinecap="round" />
          <path d={`M${lerp(380, 850, scan) - 10} 878 L${lerp(380, 850, scan) + 26} 905 L${lerp(380, 850, scan) - 10} 932 Z`} fill={P.skyInk} />
        </g>
        {/* # researchers: a magnifier comes to the first digit */}
        <g opacity={on(f, res, 8)} transform={`translate(${lerp(840, 740, on(f, call, 14))} ${lerp(1080, 1020, on(f, call, 14))}) rotate(-20) scale(${pop(f, res)})`}><Prop id="magnifier" x={0} y={0} size={260} f={f} /></g>
        <Person f={f} who="hero" beats={hero} x={220} y={1255} s={0.78} life={4} o={on(f, s5, 8)} />
      </g>
      {/* # B: four ninety-nine feels like "4…", five dollars feels like "5" */}
      <g opacity={B}>
        <Tag x={280} y={1010} s={pop(f, cut) * 1.0} r={-4} string={false} first="$4" rest=".99" lit={on(f, fs, 8)} />
        <g opacity={on(f, cut, 6)}><Cloud x={290} y={620} s={pop(f, cut) * 1.15} text="4…" /></g>
        <g opacity={on(f, five, 6)}><Tag x={740} y={1010} s={pop(f, five) * 1.0} r={4} string={false} first="$5" rest=".00" lit={on(f, five2, 8)} litColor={P.coral} /></g>
        <g opacity={on(f, five2, 6)}><Cloud x={720} y={620} s={pop(f, five2) * 1.15} text="5" /></g>
      </g>
      <Vignette id="nr" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s8–s11: 2005, NYU, five experiments · 9-endings look cheaper only when the first digit changes
const Lab: React.FC<PieceProps> = ({ f, c }) => {
  const s8 = c('s8'), profs = c('s8:professors'), ny = c('s8:new'), tested = c('s8:tested'), five = c('s8:five'), exps = c('s8:experiments')
  const y2005 = s8 + 9 // # "2005" is said right after "In" (the aligner keeps it inside the gap before "two")
  const s9 = c('s9'), price = c('s9:price'), nine = c('s9:nine'), cheaper = c('s9:cheaper'), one = c('s9:one'), higher = c('s9:higher'), only = c('s9:only'), cent2 = c('s9:cent#2'), fd = c('s9:first')
  const two = c('s10:two'), three = c('s10:three'), felt = c('s10:felt'), cheaper10 = c('s10:cheaper')
  const s11 = c('s11'), same = c('s11:same'), t19 = c('s11:nineteen'), three2 = c('s11:three#2'), t20 = c('s11:twenty'), away = c('s11:away'), effect = c('s11:effect')
  const A = win(f, s8, s9), B = on(f, s9, 8)
  const left: Beat[] = [[profs, 'present', 'smiling'], [tested, 'measure', 'thinking'], [exps, 'pointUp', 'smiling']]
  const me: Beat[] = [[s9, 'think', 'thinking'], [felt, 'point', 'smiling'], [s11, 'scratchHead', 'thinking'], [away, 'shrug', 'neutral']]
  const right: Beat[] = [[profs + 4, 'explain', 'smiling'], [tested + 4, 'hold', 'thinking'], [exps + 2, 'thumbsUp', 'smiling']]
  // # the two tags: their first digits and cents change with the voice
  const reset = f >= s11
  const lFirst = reset ? (f >= t19 ? '$3' : '$') : f >= two ? '$2' : '$'
  const lRest = reset ? (f >= t19 ? '.19' : '') : f >= nine ? '.99' : ''
  const rFirst = reset ? (f >= three2 ? '$3' : '$') : f >= three ? '$3' : '$'
  const rRest = reset ? (f >= t20 ? '.20' : '') : f >= one ? '.00' : ''
  const litL = reset ? on(f, t19, 6) : on(f, fd, 8), litR = reset ? on(f, three2, 6) : on(f, fd, 8)
  const feel = on(f, felt, 8) * (1 - on(f, s11 - 6, 6))
  const pennyT = easeInOut(span(f, cent2, cent2 + 16))
  const pen = arc({ x: 470, y: 600 }, { x: 540, y: 600 }, pennyT, 50)
  return (
    <g>
      <TallStage id="nl" f={f} />
      <Headline f={f} until={9e9} lines={[[five, '5 EXPERIMENTS', P.ink, 120], [nine, 'ENDS IN 9', P.ink, 120], [higher, 'VS ONE CENT MORE', P.ink, 104], [only, 'ONLY IF THE FIRST DIGIT CHANGES', P.goldInk, 84],
        [felt, 'FELT CHEAPER', P.mintInk, 124], [same, 'SAME FIRST DIGIT…', P.ink, 104], [away, 'NO EFFECT', P.coralInk, 130]]} />
      {/* # A: 2005 · two professors · NYU · five experiments */}
      <g opacity={A}>
        <g opacity={on(f, y2005, 6) * (1 - on(f, ny - 6, 6))} transform={`translate(${CX} 640) scale(${pop(f, y2005) * 1.6})`}><Calendar x={0} y={0} text="2005" s={1.2} /></g>
        <g opacity={on(f, ny, 6) * (1 - on(f, five - 4, 6))}><University x={CX} y={660} s={pop(f, ny) * 1.4} /></g>
        {[0, 1, 2, 3, 4].map((k) => {
          const at = five + k * 3
          return <g key={k} opacity={on(f, at, 5)}><Beaker x={160 + k * 170} y={610} s={pop(f, at) * 1.25} fill={easeOut(span(f, exps + k * 3, exps + 18 + k * 3))} color={[P.sky, P.mint, P.gold, P.coral, '#B48CF0'][k]} n={`${k + 1}`} /></g>
        })}
        <Person f={f} who="investor" beats={left} x={290} y={1255} s={0.74} life={5} o={on(f, profs, 8)} />
        <Person f={f} who="buyer" beats={right} x={710} y={1255} s={0.74} life={6} flip o={on(f, profs + 4, 8)} />
      </g>
      {/* # B: the two tags — first a 9-ending vs one cent more; then 2.99 vs 3.00; then 3.19 vs 3.20 */}
      <g opacity={B}>
        <Tag x={255} y={590 + feel * 30} s={pop(f, price) * 1.0} r={-4} string={false} first={lFirst} rest={lRest} slot lit={litL} litColor={reset ? P.gold : P.mint} glow={feel} o={on(f, price, 6)} />
        <g opacity={on(f, one, 6)}><Tag x={755} y={590} s={pop(f, one) * 1.0} r={4} string={false} first={rFirst} rest={rRest} slot lit={litR} litColor={reset ? P.gold : P.coral} /></g>
        {/* # "a cent higher": +1¢ under the right tag; "that cent": a penny hops from left to right */}
        <Pill x={755} y={790} text="+1¢" size={78} color={P.goldInk} o={on(f, higher, 6) * (1 - on(f, s11 - 6, 6))} s={pop(f, higher)} />
        <g opacity={on(f, cent2, 4) * (1 - on(f, cent2 + 18, 6))}><Penny x={pen.x} y={pen.y} s={0.55} spin={pennyT * 10} /></g>
        {/* # looked cheaper: a mint arrow down by the left tag (s9), then "felt cheaper" (s10) */}
        <g opacity={on(f, cheaper, 6) * (1 - on(f, only, 6)) + on(f, effect, 6) * (1 - on(f, away, 4))}><ArrowDown x={255} y={790} s={1.0 * (f >= s11 ? 1 - on(f, away, 4) : 1)} color={P.mint} /></g>
        <Pill x={285} y={790} text="FEELS CHEAPER" size={68} color={P.mintInk} o={on(f, cheaper10, 6) * (1 - on(f, s11 - 6, 6))} s={pop(f, cheaper10)} />
        {/* # same first digit: an "=" between the slots, then the effect goes away */}
        <Equals x={505} y={590} o={on(f, same, 6)} s={pop(f, same)} />
        <Person f={f} who="hero" beats={me} x={CX} y={1255} s={0.66} life={8} o={on(f, s9, 8)} />
        <g opacity={on(f, away, 6)}><Pill x={CX} y={790} text="LOOKS NO CHEAPER" size={74} color={P.coralInk} s={pop(f, away)} /></g>
      </g>
      <Vignette id="nl" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s12–s16: does it change what we buy? · 2003 catalogue · the same dress · $39 sold a third more than $34
const DressTest: React.FC<PieceProps> = ({ f, c }) => {
  const s12 = c('s12'), change = c('s12:change'), people = c('s12:people'), buy = c('s12:buy')
  const s13 = c('s13'), study = c('s13:study'), in13 = c('s13:in'), womens = c("s13:women's"), cat = c('s13:catalogue')
  const s14 = c('s14'), same = c('s14:same'), dress = c('s14:dress'), different = c('s14:different'), prices = c('s14:prices')
  const t39 = c('s15:thirtynine'), sold = c('s15:sold'), third = c('s15:third'), more = c('s15:more'), t34 = c('s15:thirtyfour')
  const fiveD = c('s16:five'), people16 = c('s16:people'), bought = c('s16:bought')
  const y2003 = in13 + 6
  const A = win(f, s12, s13), B = win(f, s13, dress), Cc = on(f, dress - 2, 8)
  const hero: Beat[] = [[s12, 'think', 'thinking'], [change, 'scratchHead', 'thinking'], [buy, 'hold', 'smiling']]
  const hp = hand(f, hero, CX, 1255, 0.8)
  // # the dress shrinks up once the sales start
  const up = easeInOut(span(f, sold - 6, sold + 12))
  const queue = (n: number, x0: number, at: (k: number) => number, gold: (k: number) => boolean, look: string[]) => Array.from({ length: n }, (_, k) => {
    const a = at(k)
    return <g key={k} opacity={on(f, a, 6)} transform={`translate(0 ${(1 - easeOut(span(f, a, a + 10))) * 30})`}>
      {gold(k) && <ellipse cx={x0 + k * 100} cy={1238} rx={40} ry={12} fill={P.gold} opacity={0.7} />}
      <Mini look={look[k % look.length]} x={x0 + k * 100} y={1240} scale={1.4} frame={f} seed={k + 11} mood={f >= bought ? 'happy' : 'neutral'} />
      <Bag x={x0 + k * 100 + 30} y={1170} s={1.0 * pop(f, bought + k * 2)} o={on(f, bought + k * 2, 5)} color={gold(k) ? P.gold : P.sky} />
    </g>
  })
  return (
    <g>
      <TallStage id="nd" f={f} />
      <Headline f={f} until={9e9} lines={[[buy, 'WHAT WE BUY', P.ink, 120], [s13, '', P.ink, 110], [y2003, 'A 2003 STUDY', P.ink, 110], [same, 'THE SAME DRESS', P.ink, 110], [third, 'A THIRD MORE SOLD', P.goldInk, 104], [fiveD, '$5 DEARER…', P.coralInk, 116], [people16, '…MORE BUYERS', P.mintInk, 116]]} />
      {/* # A: you, shopping; other shoppers around */}
      <g opacity={A}>
        <g opacity={on(f, people, 6)}><Mini look="buyer" x={170} y={1240} scale={2.6} frame={f} seed={4} /></g>
        <g opacity={on(f, people + 4, 6)}><Mini look="worker" x={830} y={1240} scale={2.6} frame={f} seed={7} /></g>
        <Person f={f} who="hero" beats={hero} x={CX} y={1255} s={0.8} life={2} o={on(f, s12, 8)} />
        <g opacity={on(f, buy, 6)}><Prop id="shopping-bag" x={hp.x} y={hp.y + 70} size={170 * pop(f, buy)} f={f} /></g>
        <g opacity={on(f, s12, 6)} transform={`translate(${CX} 580) scale(${pop(f, s12)})`}><Prop id="question" x={0} y={0} size={240} f={f} /></g>
      </g>
      {/* # B: the study (2003) and the women's clothing catalogue */}
      <g opacity={B}>
        <g opacity={on(f, s13, 6) * (1 - on(f, womens - 4, 6))}><Study x={CX - 150} y={780} s={pop(f, s13) * 1.3} r={-4} /></g>
        <g opacity={on(f, y2003, 6) * (1 - on(f, womens - 4, 6))} transform={`translate(${CX + 260} 860) scale(${pop(f, y2003)})`}><Calendar x={0} y={0} text="2003" s={1.5} /></g>
        <g opacity={on(f, womens, 6)}><Catalogue x={370} y={790} s={pop(f, womens) * lerp(1.12, 1.22, on(f, cat, 12))} r={lerp(-6, 0, on(f, cat, 12))} /></g>
        <Person f={f} who="buyer" beats={[[womens, 'read', 'thinking'], [cat, 'point', 'smiling']]} x={790} y={1255} s={0.66} life={9} flip o={on(f, womens, 8)} />
      </g>
      {/* # C: the same dress, two prices, two queues of buyers */}
      <g opacity={Cc}>
        <g opacity={on(f, dress, 6)}><Dress x={CX} y={lerp(800, 570, up)} s={pop(f, dress) * lerp(1.35, 0.72, up)} /></g>
        <g opacity={on(f, different, 6)}>
          <Tag x={200} y={lerp(1170, 830, up)} s={pop(f, different) * 0.75} r={-5} string={false} first={f >= t34 ? '$34' : '$'} rest="" slot={f < t34} lit={0} />
          <Tag x={800} y={lerp(1170, 830, up)} s={pop(f, prices) * 0.75} r={5} string={false} first={f >= t39 ? '$39' : '$'} rest="" slot={f < t39} lit={0} glow={on(f, third, 8)} glowColor={P.gold} />
        </g>
        {/* # +$5 on the $39 tag */}
        <Pill x={880} y={700} text="+$5" size={76} color={P.coralInk} o={on(f, fiveD, 6)} s={pop(f, fiveD)} />
        {/* # buyers: 3 at $34 (on "thirty-four"), 4 at $39 (3 on "sold", the 4th — a third more — on "third") */}
        {queue(3, 110, (k) => t34 + k * 3, () => false, ['buyer', 'worker', 'investor'])}
        {queue(4, 590, (k) => (k < 3 ? sold + k * 3 : third), (k) => k === 3, ['hero', 'buyer', 'owner', 'worker'])}
      </g>
      <Vignette id="nd" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s17–s20: the store's maths (example) · 100 × $34 = $3,400 · 133 × $39 = $5,187 · +53% · $49 beat $44 and $54
const Maths: React.FC<PieceProps> = ({ f, c }) => {
  const s17 = c('s17'), hundred = c('s17:hundred'), t34 = c('s17:thirtyfour'), brings = c('s17:brings'), thousand = c('s17:thousand')
  const s18 = c('s18'), third = c('s18:third'), t133 = c('s18:thirtythree'), five = c('s18:five')
  const half = c('s19:half'), money = c('s19:money'), dress = c('s19:dress')
  const s20 = c('s20'), test = c('s20:test'), t44 = c('s20:fortyfour'), t49 = c('s20:fortynine'), t54 = c('s20:fiftyfour'), sold = c('s20:sold'), most = c('s20:most')
  const A = win(f, s17, s20), B = on(f, s20, 8)
  // # dress grids: cells of 34 px, 10 per row; left 100, right 100 + 33 gold
  const cell = 38
  const grid = (x0: number, n: number, at: (i: number) => number, gold: (i: number) => boolean) => Array.from({ length: n }, (_, i) => {
    const a = at(i)
    return f >= a - 1 ? <DressIcon key={i} x={x0 + (i % 10) * cell} y={570 + Math.floor(i / 10) * cell} s={1.15 * pop(f, a, 8)} o={on(f, a, 4)} color={gold(i) ? P.gold : P.coral} /> : null
  })
  const R = 1195
  const one = easeOut(span(f, half - 8, half + 2)) // # the grids leave first (gone before the dress lands)
  return (
    <g>
      <TallStage id="nm" f={f} />
      <Headline f={f} until={9e9} lines={[[s17, 'EXAMPLE', P.ink2, 90], [half, '≈ HALF AS MUCH AGAIN', P.goldInk, 100], [test, 'ANOTHER TEST', P.ink, 120], [most, '$49 SOLD THE MOST', P.goldInk, 112]]} />
      <g opacity={A}>
        {/* # left: $34 */}
        <Tag x={280} y={470} s={pop(f, t34) * 0.55} r={-4} first="$34" rest="" o={on(f, t34, 6)} string={false} />
        <g opacity={1 - one}>{grid(108, 100, (i) => hundred + Math.floor(i / 10) * 2 + (i % 10) * 0.4, () => false)}</g>
        <Label x={280} y={R - 70} text="100 × $34" size={70} font="Bebas Neue" color={P.ink2} o={on(f, brings, 6) * (1 - one)} />
        <Label x={280} y={R + 10} text="$3,400" size={92} font="Bebas Neue" color={P.ink} o={on(f, thousand, 6)} />
        {/* # right: $39, 100 dresses + 33 gold */}
        <Tag x={730} y={470} s={pop(f, s18) * 0.55} r={4} first="$39" rest="" o={on(f, s18, 6)} string={false} />
        <g opacity={1 - one}>{grid(560, 133, (i) => (i < 100 ? s18 + 4 + Math.floor(i / 10) * 2 + (i % 10) * 0.4 : third + (i - 100) * 0.6), (i) => i >= 100)}</g>
        <Label x={730} y={R - 70} text="133 × $39" size={70} font="Bebas Neue" color={P.ink2} o={on(f, t133, 6) * (1 - one)} />
        <Label x={730} y={R + 10} text="$5,187" size={92} font="Bebas Neue" color={P.goldInk} o={on(f, five, 6)} />
        {/* # +53%: an arrow from the left total to the right one, with the gain on it */}
        <g opacity={on(f, half, 6)}>
          <path d={`M420 ${R - 20} H${lerp(420, 580, easeOut(span(f, half, half + 12)))}`} stroke={P.goldInk} strokeWidth={10} strokeLinecap="round" />
          <path d={`M570 ${R - 40} L600 ${R - 20} L570 ${R} Z`} fill={P.goldInk} opacity={on(f, half + 8, 4)} />
          <Pill x={CX} y={R + 52} text="+53%" size={76} color={P.goldInk} s={pop(f, money)} o={on(f, money, 6)} />
        </g>
        {/* # "from the same dress": one dress between the two tags */}
        <g opacity={on(f, half + 2, 8)}><Dress x={CX} y={760} s={pop(f, half + 2) * 1.2 * (1 + 0.06 * on(f, dress, 5) * (1 - on(f, dress + 8, 8)))} /></g>
      </g>
      {/* # B: $44, $49, $54 on a podium — $49 on top with a crown; $44 and $54 level (demand almost the same) */}
      <g opacity={B}>
        <g opacity={on(f, s20, 6) * (1 - on(f, sold - 4, 6))}><Dress x={CX} y={1120} s={pop(f, s20) * 0.5} /></g>
        {([['$44', 220, t44], ['$49', CX, t49], ['$54', 780, t54]] as const).map(([t, x, at]) => {
          const top = t === '$49', h = top ? 320 : 180, rise = easeOut(span(f, sold, sold + 16))
          return <g key={t}>
            <g opacity={on(f, sold, 6)}><rect x={x - 130} y={1240 - h * rise} width={260} height={h * rise} rx={12} fill={top ? P.gold : P.navy4} /><rect x={x - 130} y={1240 - h * rise} width={260} height={14} rx={7} fill="#FFFFFF" opacity={0.25} /></g>
            <Tag x={x} y={lerp(800, 1240 - h - 100, rise)} s={pop(f, s20) * 0.66} r={0} string={false} first={f >= at ? t : '$'} rest="" slot={f < at} o={on(f, s20, 6)} glow={top ? on(f, most, 8) : 0} glowColor={P.gold} />
          </g>
        })}
        <g opacity={on(f, most, 6)} transform={`translate(${CX} ${1240 - 320 - 270}) scale(${pop(f, most)})`}><Prop id="crown" x={0} y={0} size={170} f={f} /></g>
      </g>
      <Vignette id="nm" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s21–s26: not just small purchases · 22 million used cars · 79,9xx vs 80,0xx = $210 · 79,8xx = $10 · the 7 → 8 · final buyers
const Cars: React.FC<PieceProps> = ({ f, c }) => {
  const s21 = c('s21'), small = c('s21:small'), purchases = c('s21:purchases')
  const s22 = c('s22'), m22 = c('s22:twentytwo'), used = c('s22:usedcar'), auctions = c('s22:auctions')
  const car23 = c('s23:car'), under = c('s23:under'), miles = c('s23:miles'), two = c('s23:two'), dollars = c('s23:dollars'), over = c('s23:over')
  const car24 = c('s24:car'), fewer = c('s24:fewer'), ten = c('s24:ten'), more24 = c('s24:more')
  const big = c('s25:big'), drop = c('s25:drop'), digit = c('s25:digit'), seven = c('s25:seven'), eight = c('s25:eight')
  const s26 = c('s26'), traced = c('s26:traced'), people = c('s26:people'), buy = c('s26:buy'), dealers = c('s26:dealers')
  const A = win(f, s21, s22), B = win(f, s22, car23), Cc = win(f, car23, s26), D = on(f, s26, 8)
  // # the staircase: three rows (car, odometer, price note) — 79,850 · 79,950 · 80,050
  const rows = [{ y: 560, odo: '79,850', at: car24, read: fewer }, { y: 820, odo: '79,950', at: car23, read: under }, { y: 1080, odo: '80,050', at: over, read: over }]
  const buyer: Beat[] = [[people, 'hold', 'smiling'], [buy, 'present', 'smiling']]
  const dealer: Beat[] = [[dealers, 'shrug', 'neutral']]
  const kp = hand(f, buyer, 290, 1255, 0.78)
  return (
    <g>
      <TallStage id="nc" f={f} />
      <Headline f={f} until={9e9} lines={[[purchases, 'NOT JUST SMALL STUFF', P.ink, 104], [m22, '22 MILLION CAR SALES', P.ink, 104], [auctions, 'AT AUCTIONS', P.ink, 110], [car23, 'MILES ON THE CLOCK', P.ink, 104], [drop, 'THE BIG DROP', P.coralInk, 124], [eight, '7 → 8', P.coralInk, 140], [s26, '', P.ink, 110], [people, 'EVERYDAY BUYERS', P.mintInk, 110]]} />
      {/* # A: small purchases — a coffee, a bag, a dress — step aside */}
      <g opacity={A}>
        {[['coffee-cup', 260], ['shopping-bag', CX], ['dress', 740]].map(([id, x], k) => {
          const at = small + k * 3, s = pop(f, at) * lerp(1, 0.7, on(f, purchases, 12))
          return <g key={id as string} opacity={on(f, at, 6)} transform={`translate(${x} ${640}) scale(${s * 1.35})`}>
            {id === 'dress' ? <Dress x={0} y={20} s={0.75} hanger={false} /> : <Prop id={id as string} x={0} y={0} size={270} f={f} />}
          </g>
        })}
        <g opacity={on(f, s21, 4)} transform={`translate(${lerp(1300, 740, easeOut(span(f, s21, s21 + 18)))} 1080)`}><Prop id="car" x={0} y={0} size={380} f={f} /></g>
        <g opacity={1 - on(f, s22 - 6, 6)}><Person f={f} who="hero" beats={[[s21, 'explain', 'smiling'], [small, 'present', 'smug'], [purchases, 'shrug', 'smiling']]} x={270} y={1255} s={0.72} life={4} o={on(f, s21, 8)} /></g>
      </g>
      {/* # B: 22 million sales — a lot of cars; the gavel of the auction */}
      <g opacity={B}>
        <g opacity={1 - on(f, m22 - 2, 6)}>
          <Person f={f} who="investor" beats={[[s22, 'read', 'thinking']]} x={320} y={1255} s={0.7} life={11} o={on(f, s22, 6)} />
          <Person f={f} who="hero" beats={[[s22 + 4, 'think', 'thinking']]} x={690} y={1255} s={0.7} life={12} flip o={on(f, s22 + 4, 6)} />
        </g>
        {Array.from({ length: 20 }, (_, k) => {
          const at = m22 + (k % 6) + Math.floor(k / 6) * 3
          return <g key={k} opacity={on(f, at, 5) * (k === 14 && f >= used ? 1 : f >= used ? 0.55 : 1)}><Prop id="car" x={160 + (k % 4) * 230} y={510 + Math.floor(k / 4) * 110} size={k === 14 && f >= used ? 175 : 140} f={f} /></g>
        })}
        <Person f={f} who="buyer" beats={[[auctions, 'pointUp', 'smiling']]} x={735} y={1255} s={0.44} life={13} flip o={on(f, auctions, 6)} />
        <g opacity={on(f, auctions, 6)} transform={`translate(330 1150) rotate(${lerp(-35, 0, easeInOut(span(f, auctions, auctions + 8)))}) scale(${pop(f, auctions)})`}><Prop id="gavel" x={0} y={0} size={170} f={f} /></g>
      </g>
      {/* # C: the mileage staircase */}
      <g opacity={Cc}>
        {rows.map((r, k) => {
          const firstLit = k < 2 ? on(f, seven, 6) : on(f, eight, 6)
          return <g key={k} opacity={on(f, r.at, 6)}>
            <g transform={`translate(190 ${r.y}) scale(${pop(f, r.at)})`}><Prop id="car" x={0} y={0} size={270} f={f} /></g>
            <g opacity={on(f, r.read, 6)}><Odometer x={535} y={r.y} s={pop(f, r.read) * 1.05} text={r.odo} lit={Math.max(on(f, digit, 6) * 0.5, firstLit)} litIndex={0} litColor={k < 2 ? P.gold : P.coral} /></g>
          </g>
        })}
        <Person f={f} who="buyer" beats={[[car23, 'point', 'thinking'], [under, 'point', 'shocked'], [two, 'thumbsUp', 'smiling']]} x={800} y={1255} s={0.5} life={14} flip o={on(f, car23 + 4, 8) * (1 - on(f, over - 8, 6))} />
        {/* # +$210 for the car just under 80,000; the coral drop to the car just over it */}
        <Pill x={830} y={830} text="+$210" size={74} color={P.goldInk} o={on(f, two, 6)} s={pop(f, two)} />
        <g opacity={on(f, over, 6)}><ArrowDown x={830} y={1000} s={pop(f, over) * (1 + 0.25 * on(f, big, 8) * (1 - on(f, drop + 14, 10)))} len={90} color={P.coral} /></g>
        {/* # only +$10 for the car with ~100 fewer miles */}
        <Pill x={830} y={570} text="+$10" size={74} color={P.mintInk} o={on(f, ten, 6)} s={pop(f, ten)} />
        <g opacity={on(f, more24, 6)}><path d="M830 640 V720" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" strokeDasharray="6 12" /></g>
      </g>
      {/* # D: traced to everyday buyers (key in hand), not the dealers */}
      <g opacity={D}>
        <g opacity={on(f, s26, 6) * (1 - on(f, people - 4, 6))} transform={`translate(${CX} 600) rotate(-15) scale(${pop(f, s26)})`}><Prop id="magnifier" x={0} y={0} size={320} f={f} /></g>
        <Person f={f} who="hero" beats={buyer} x={290} y={1255} s={0.78} life={3} o={on(f, traced, 8)} />
        <g opacity={on(f, buy, 6)}><Prop id="key" x={kp.x} y={kp.y - 10} size={110 * pop(f, buy)} f={f} /></g>
        <Label x={290} y={790} text="BUYERS" size={78} font="Bebas Neue" color={P.mintInk} o={on(f, buy, 6)} />
        <Person f={f} who="owner" beats={dealer} x={720} y={1255} s={0.78} life={5} flip o={on(f, traced + 4, 8) * (1 - 0.35 * on(f, dealers, 8))} />
        <g opacity={on(f, dealers, 5)} transform={`translate(720 1030) scale(${pop(f, dealers)})`}><path d="M-120 -120 L120 120 M120 -120 L-120 120" stroke={P.coralInk} strokeWidth={22} strokeLinecap="round" /></g>
        <Label x={720} y={790} text="NOT DEALERS" size={78} font="Bebas Neue" color={P.ink2} o={on(f, dealers, 6)} />
      </g>
      <Vignette id="nc" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s27–s30: never about the cent · the first number · round it up · $4.99 = $5
const End: React.FC<PieceProps> = ({ f, c, to }) => {
  const s27 = c('s27'), nn = c('s27:ninetynine'), never = c('s27:never'), saving = c('s27:saving'), cent = c('s27:cent')
  const s28 = c('s28'), number = c('s28:number'), brain = c('s28:brain'), first = c('s28:first')
  const s29 = c('s29'), see = c('s29:see'), round = c('s29:round'), up = c('s29:up'), head = c('s29:head')
  const four = c('s30:four'), that = c('s30:that'), five = c('s30:five')
  const end = on(f, to - 50, 12)
  const A = win(f, s27, s28), B = win(f, s28, four) , Cc = on(f, four, 8) * (1 - on(f, to - 64, 8))
  const hero: Beat[] = [[s27, 'idle', 'neutral'], [never, 'shrug', 'smug'], [cent, 'present', 'smiling']]
  const hp = hand(f, hero, CX, 1255, 0.8)
  // # the roll: each digit slides up to its rounded value between "round" and "up"
  const roll = easeInOut(span(f, round, up + 10))
  return (
    <g>
      <TallStage id="ne" f={f} />
      <Headline f={f} until={c('s30:four')} lines={[[never, 'NEVER ABOUT THE CENT', P.ink, 104], [s28, '', P.ink, 104], [first, 'THE FIRST NUMBER', P.goldInk, 112], [s29, '', P.ink, 104], [round, 'ROUND IT UP', P.mintInk, 130]]} />
      {/* # A: the 99 · you shrug · saving a cent */}
      <g opacity={A}>
        <g opacity={on(f, nn, 6)}><Tag x={CX} y={620} s={pop(f, nn) * 1.2} first="$4" rest=".99" lit={0} string={false} /></g>
        <Person f={f} who="hero" beats={hero} x={CX} y={1255} s={0.8} life={2} o={on(f, s27, 8)} />
        <g opacity={on(f, saving, 6)} transform={`translate(820 1130) scale(${pop(f, saving)})`}><Prop id="piggy-bank" x={0} y={0} size={230} f={f} /></g>
        <g opacity={on(f, cent, 6)}><Penny x={hp.x} y={hp.y - 50} s={0.55 * pop(f, cent)} /></g>
      </g>
      {/* # B: the brain and the first number (callback) · then the price rolls up to $5.00 in your head */}
      <g opacity={B}>
        <g opacity={on(f, brain, 6)}><Brain x={CX} y={lerp(650, 600, on(f, s29, 12))} s={pop(f, brain) * lerp(1.3, 0.95, on(f, s29, 12))} lit={Math.max(on(f, first, 10) * (1 - on(f, s29, 8)), on(f, head, 10))} litColor={f >= s29 ? P.mint : P.gold} digit={f >= s29 ? (f >= head ? '5' : undefined) : '4'} digitO={f >= s29 ? on(f, head, 6) : on(f, first + 6, 6)} /></g>
        <g opacity={on(f, s28, 6)}>
          {/* # the price, digit by digit, rolling up like an odometer on "round it up" */}
          <g transform={`translate(${CX} 1090) scale(${pop(f, s28) * lerp(1.0, 1.2, on(f, see, 10))})`}>
            <path d="M-260 0 L-200 -120 H260 V120 H-200 Z" fill={P.paper} stroke={P.edge} strokeWidth={3} strokeLinejoin="round" />
            <circle cx={-196} cy={0} r={16} fill={P.navy1} opacity={0.85} />
            <clipPath id="ne-roll"><rect x={-160} y={-100} width={400} height={190} /></clipPath>
            <g clipPath="url(#ne-roll)">
              <text x={-100} y={56} fill={P.navy1} style={{ font: '400 160px "Bebas Neue"' }}>$</text>
              {([['4', '5', -40], ['.', '.', 30], ['9', '0', 70], ['9', '0', 140]] as const).map(([a, b, x], k) => (
                <g key={k} transform={`translate(0 ${-roll * 190})`}>
                  <text x={x} y={56} fill={P.navy1} style={{ font: '400 160px "Bebas Neue"' }}>{a}</text>
                  <text x={x} y={56 + 190} fill={k === 0 ? P.goldD : P.navy1} style={{ font: '400 160px "Bebas Neue"' }}>{b}</text>
                </g>
              ))}
            </g>
            {f >= first && f < s29 && <rect x={-48} y={-80} width={78} height={150} rx={12} fill="none" stroke={P.gold} strokeWidth={8} opacity={on(f, first, 6)} />}
          </g>
        </g>
      </g>
      {/* # C: $4.99 = $5 */}
      <g opacity={Cc}>
        <Tag x={250} y={640} s={pop(f, four) * 0.9} r={-4} first="$4" rest=".99" string={false} />
        <Equals x={CX + 5} y={640} o={on(f, that, 6)} s={pop(f, that) * 1.3} color={P.ink} />
        <g opacity={on(f, five, 6)}><Tag x={765} y={640} s={pop(f, five) * 0.9} r={4} first="$5" rest="" string={false} grow={0.35 * on(f, five, 10)} /></g>
        <Person f={f} who="hero" beats={[[four, 'present', 'smiling'], [that, 'explain', 'smiling'], [five, 'thumbsUp', 'smiling']]} x={CX} y={1255} s={0.76} life={2} o={on(f, four, 8)} />
      </g>
      <g opacity={end}><svg x={W / 2 - 80} y={600} width={160} height={160}><Emblem size={160} /></svg>
        <Label x={W / 2} y={850} text="CAPITALCODE" size={80} font="Bebas Neue" color={P.ink} /></g>
      <Vignette id="ne" w={W} h={H} />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const NINETYNINE = [
  makePiece('n99-hook', 'Short: $4.99 is one cent less than $5 — so why 99? — the cent buys the store more — your brain', { canvas: 'tall', mood: 'dark', Component: Hook,
    beats: [...beat('s1', ['', 'ninetynine', 'one', 'cent', 'less', 'five']), ...beat('s2', ['', 'why', 'many', 'prices', 'ninetynine']), ...beat('s3', ['', 'cent', 'buys', 'store', 'something', 'far', 'more']), ...beat('s4', ['', 'number', 'brain', 'first'])],
    sfx: [['s1', 'pop', 0.5], ['s1:cent', 'coin', 0.6], ['s1:five', 'pop', 0.5], ['s2:many', 'flutter', 0.4], ['s2:ninetynine', 'ding', 0.4], ['s3:buys', 'whoosh', 0.4], ['s3:store', 'cash', 0.5], ['s3:more', 'pop', 0.5], ['s4:brain', 'softpop', 0.5], ['s4:first', 'chime', 0.5]] }),
  makePiece('n99-read', 'Short: we read left to right — the first digit counts most — the left-digit effect — 4-something vs 5', { canvas: 'tall', mood: 'light', Component: Read,
    beats: [...beat('s5', ['', 'price', 'left', 'right', 'first', 'digit', 'most']), ...beat('s6', ['researchers', 'call', 'leftdigit']), ...beat('s7', ['', 'ninetynine', 'foursomething', 'five', 'five#2'])],
    sfx: [['s5:price', 'pop', 0.5], ['s5:left', 'swish', 0.4], ['s5:digit', 'ding', 0.5], ['s6:researchers', 'whoosh', 0.3], ['s6:leftdigit', 'click', 0.5], ['s7:foursomething', 'softpop', 0.5], ['s7:five#2', 'softpop', 0.5]] }),
  makePiece('n99-lab', 'Short: 2005 NYU, five experiments — 9-endings look cheaper only when the first digit changes', { canvas: 'tall', mood: 'dark', Component: Lab,
    beats: [...beat('s8', ['', 'professors', 'new', 'tested', 'five', 'experiments']), ...beat('s9', ['price', 'nine', 'cheaper', 'one', 'higher', 'only', 'cent#2', 'first']), ...beat('s10', ['two', 'three', 'felt', 'cheaper']),
      ...beat('s11', ['', 'same', 'nineteen', 'twenty', 'effect', 'away'])],
    sfx: [['s8:professors', 'pop', 0.4], ['s8:new', 'whoosh', 0.3], ['s8:five', 'tick', 0.4], ['s8:experiments', 'flutter', 0.4], ['s9:price', 'pop', 0.4], ['s9:higher', 'coin', 0.4], ['s9:first', 'ding', 0.4], ['s10:two', 'click', 0.4], ['s10:three', 'click', 0.4], ['s10:felt', 'chime', 0.4],
      ['s11:same', 'tick', 0.4], ['s11:nineteen', 'click', 0.4], ['s11:twenty', 'click', 0.4], ['s11:away', 'thud', 0.4]] }),
  makePiece('n99-dress', 'Short: 2003 catalogue — the same dress at $39 sold about a third more than at $34', { canvas: 'tall', mood: 'light', Component: DressTest,
    beats: [...beat('s12', ['', 'change', 'people', 'buy']), ...beat('s13', ['study', 'in', "women's", 'catalogue']), ...beat('s14', ['same', 'dress', 'different', 'prices']), ...beat('s15', ['thirtynine', 'sold', 'third', 'thirtyfour']),
      ...beat('s16', ['five', 'people', 'bought'])],
    sfx: [['s12:buy', 'softpop', 0.4], ['s13:study', 'swish', 0.4], ['s13:catalogue', 'flutter', 0.4], ['s14:dress', 'pop', 0.5], ['s15:thirtynine', 'click', 0.4], ['s15:third', 'ding', 0.5], ['s15:thirtyfour', 'click', 0.4], ['s16:five', 'tick', 0.4], ['s16:bought', 'cash', 0.5]] }),
  makePiece('n99-maths', 'Short: example — 100 × $34 = $3,400; 133 × $39 = $5,187 (+53%); $49 beat $44 and $54', { canvas: 'tall', mood: 'dark', Component: Maths,
    beats: [...beat('s17', ['', 'hundred', 'thirtyfour', 'brings', 'thousand']), ...beat('s18', ['', 'third', 'thirtythree', 'five']), ...beat('s19', ['half', 'money', 'dress']), ...beat('s20', ['', 'test', 'fortyfour', 'fortynine', 'fiftyfour', 'sold', 'most'])],
    sfx: [['s17:hundred', 'flutter', 0.4], ['s17:thousand', 'cash', 0.5], ['s18:third', 'flutter', 0.4], ['s18:five', 'cash', 0.5], ['s19:half', 'swish', 0.4], ['s19:money', 'ding', 0.5], ['s20:fortyfour', 'pop', 0.4], ['s20:fortynine', 'pop', 0.4], ['s20:fiftyfour', 'pop', 0.4], ['s20:most', 'chime', 0.5]] }),
  makePiece('n99-cars', 'Short: 22 million used cars — just under 80,000 miles ≈ $210 more than just over; 100 fewer miles ≈ $10', { canvas: 'tall', mood: 'light', Component: Cars,
    beats: [...beat('s21', ['', 'small', 'purchases']), ...beat('s22', ['', 'twentytwo', 'usedcar', 'auctions']), ...beat('s23', ['car', 'under', 'miles', 'two', 'over']), ...beat('s24', ['car', 'fewer', 'ten', 'more']),
      ...beat('s25', ['big', 'drop', 'digit', 'seven', 'eight']), ...beat('s26', ['', 'traced', 'people', 'buy', 'dealers'])],
    sfx: [['s21:small', 'pop', 0.4], ['s22:twentytwo', 'flutter', 0.4], ['s22:auctions', 'impact', 0.4], ['s23:car', 'pop', 0.4], ['s23:two', 'cash', 0.5], ['s23:over', 'thud', 0.5], ['s24:car', 'pop', 0.4], ['s24:ten', 'tick', 0.4], ['s25:drop', 'whoosh', 0.4],
      ['s25:seven', 'click', 0.4], ['s25:eight', 'crack', 0.5], ['s26:traced', 'whoosh', 0.3], ['s26:buy', 'ding', 0.4]] }),
  makePiece('n99-end', 'Short: never about the cent — the first number — round it up — $4.99 = $5', { canvas: 'tall', mood: 'dark', Component: End,
    beats: [...beat('s27', ['', 'ninetynine', 'never', 'saving', 'cent']), ...beat('s28', ['', 'number', 'brain', 'first']), ...beat('s29', ['', 'see', 'round', 'up', 'head']), ...beat('s30', ['four', 'that', 'five'])],
    sfx: [['s27:ninetynine', 'pop', 0.4], ['s27:never', 'tick', 0.4], ['s27:cent', 'coin', 0.5], ['s28:brain', 'softpop', 0.4], ['s28:first', 'chime', 0.5], ['s29:round', 'flutter', 0.4], ['s29:head', 'ding', 0.5], ['s30:five', 'impact', 0.5]] }),
]
