// ============================================================
// LONG VIDEO — "Why a Higher Salary Can Still Leave You Broke" (≈ 8:45,
// s1–s63), eleven wide diorama pieces between chapter cards. Sam (hero)
// and coworker Jo (buyer) act the story out (owner rule r29).
// Sourced: BLS Consumer Expenditures 2024 (avg income $104,207, spending
// $78,535, housing $26,266 = 33.4%, transportation $13,318; quintile income
// 16,658 / 42,925 / 74,474 / 121,548 / 264,510 and spending 35,046 / 50,054 /
// 66,900 / 89,972 / 150,342); IRS 2026 (single brackets 10% to $12,400, 12% to
// $50,400, 22% to $105,700; standard deduction $16,100); SSA 2026 wage base
// $184,500, FICA 7.65%; Fed SHED 2025 (63% could cover $400 with cash; 68% in
// 2021); AAA 2026 ($1,071.92 a month to own and run a new car).
// Our maths: raise 60,000 → 75,000: +2,650 federal tax (6,500 at 12%, 8,500 at
// 22%), +1,147.50 payroll → 11,202.50 kept ≈ $933 a month; example costs
// 400 + 350 + 180 = 930; quintile steps +47,074 income / +23,072 spending;
// 90¢ vs 57¢ spent per pre-tax dollar; gap 25,672.
// House rules (owner r22/r26/r27/r29): every word and number shows ON its
// spoken word, never before; one headline slot; text ≥ 44 px; the cast acts.
// ============================================================
// ============================================================
import React from 'react'
import { expressionAt } from '../motion/acting'
import { getProp } from '../props/registry'
import { Actor, heldPoint } from '../rig/Actor'
import { Mini } from '../rig/Mini'
import { cyclePose, mixPose, type Pose, poseAt, type PoseId, type ExpressionId } from '../rig/pose'
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
  for (const [at, kx, ky, ks] of [...keys].sort((a, b) => a[0] - b[0])) { const t = easeInOut(span(f, at, at + d)); x = lerp(x, kx, t); y = lerp(y, ky, t); z = lerp(z, ks, t) }
  return `translate(${x} ${y}) scale(${z}) translate(${-x} ${-y})`
}
// # the headline slot: each line from its cue until the next line's cue — never two at once
type Head = [at: number, text: string, color?: string, size?: number]
const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number }> = ({ f, lines, until = 9e9, y = 150 }) => (
  <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    return o > 0.001 ? <g key={k} transform={`translate(960 ${y}) scale(${0.95 + 0.05 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 96} font="Bebas Neue" color={color ?? P.ink} o={o} /></g> : null
  })}</g>
)

// ------------------------------------------------------------ acting
// # a beat: from `at` the actor springs into `pose`; with `loop` it keeps swinging pose ↔ loop (signing, counting, clapping…)
type Beat = [at: number, pose: PoseId, face?: ExpressionId, loop?: PoseId, period?: number]
const posed = (f: number, beats: Beat[]): Pose => {
  const base = poseAt(f, 30, beats.map(([at, p]) => [at, p] as [number, PoseId]))
  const cur = beats.filter((b) => b[0] <= f).pop()
  if (!cur || !cur[3]) return base
  return mixPose(base, cyclePose(f, cur[1], cur[3], cur[4] ?? 16), on(f, cur[0], 10))
}
const faced = (f: number, beats: Beat[]) => expressionAt(f, beats.map(([at, pose, face]) => ({ at, pose, expression: face })))
// # one cast member acting a list of beats; returns the pose too so props can follow the hand
const Person: React.FC<{ f: number; who: string; beats: Beat[]; x: number; y: number; s?: number; flip?: boolean; life?: number; o?: number }> = ({ f, who, beats, x, y, s = 1, flip, life = 3, o = 1 }) => {
  const p = posed(f, beats), ex = faced(f, beats)
  return <g opacity={o}><Actor who={who} pose={p} expression={ex.expression} blend={ex.from ? { from: ex.from, mix: ex.mix! } : undefined} x={x} y={y} scale={s} frame={f} flip={flip} life={life} /></g>
}
// # where a Person's right hand is (scene pixels) — for a prop held in it
const hand = (f: number, beats: Beat[], x: number, y: number, s = 1, flip = false) => heldPoint(posed(f, beats), { x, y, scale: s }, flip)

// ------------------------------------------------------------ the cast of objects
const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={34} ry={34} fill={P.goldD} /><circle r={34} fill={P.gold} /><circle r={25} fill="none" stroke={P.goldD} strokeWidth={4} />
    <text y={13} textAnchor="middle" fill={P.goldD} style={{ font: '400 38px "Bebas Neue"' }}>{text}</text>
  </g>
)
// # a phone held up, its screen showing a few lines
const Phone: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; children?: React.ReactNode }> = ({ x, y, s = 1, r = 0, o = 1, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-92} y={-170} width={184} height={340} rx={30} fill="#0D1424" />
    <rect x={-80} y={-150} width={160} height={300} rx={20} fill="#F7FAFF" />
    <rect x={-26} y={-162} width={52} height={8} rx={4} fill="#2A3550" />
    {children}
  </g>
)
// # a sneaker box with a sneaker peeking out
const SneakerBox: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-90} width={300} height={90} rx={10} fill="#E05A4C" /><rect x={-150} y={-90} width={300} height={22} rx={8} fill="#B8433A" />
    <path d="M-110 -90 Q-110 -150 -40 -150 L30 -132 Q90 -120 110 -100 L110 -90 Z" fill="#F7FAFF" /><path d="M-110 -100 L110 -100" stroke="#2B4A78" strokeWidth={10} />
    <path d="M-60 -140 L-20 -128 M-50 -146 L-10 -134" stroke="#2B4A78" strokeWidth={5} strokeLinecap="round" />
    <rect x={-150} y={-12} width={300} height={12} fill="#000" opacity={0.12} />
  </g>
)
// # a document (loan contract) with a title
const Doc: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; title?: string; stamp?: string; stampO?: number; lines?: number }> = ({ x, y, s = 1, r = 0, o = 1, title, stamp, stampO = 0, lines = 4 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-190} width={300} height={380} rx={18} fill="#000" opacity={0.16} transform="translate(10 12)" />
    <rect x={-150} y={-190} width={300} height={380} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    {title && <text x={0} y={-120} textAnchor="middle" fill={P.navy2} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>}
    {Array.from({ length: lines }, (_, k) => <rect key={k} x={-110} y={-80 + k * 42} width={220 - (k % 2) * 60} height={14} rx={7} fill="#C8B994" />)}
    {stamp && <g opacity={stampO} transform={`rotate(-12) scale(${0.8 + 0.2 * stampO})`}><rect x={-130} y={70} width={260} height={90} rx={12} fill="none" stroke={P.coral} strokeWidth={8} /><text x={0} y={136} textAnchor="middle" fill={P.coral} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>{stamp}</text></g>}
  </g>
)
// # a shop counter (front) with a card terminal
const Counter: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 1 }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={y} width={w} height={40} rx={10} fill="#C98F5A" /><rect x={x - w / 2} y={y + 40} width={w} height={420} fill="#A86F42" />
    <rect x={x - w / 2} y={y + 40} width={w} height={14} fill="#000" opacity={0.15} />
    {Array.from({ length: Math.floor(w / 180) }, (_, k) => <rect key={k} x={x - w / 2 + 30 + k * 180} y={y + 80} width={140} height={300} rx={10} fill="#000" opacity={0.07} />)}
  </g>
)
const Terminal: React.FC<{ x: number; y: number; s?: number; text?: string; o?: number; lit?: number }> = ({ x, y, s = 1, text, o = 1, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-150} width={120} height={150} rx={18} fill="#1B2233" /><rect x={-46} y={-136} width={92} height={56} rx={8} fill={lit > 0 ? P.mint : '#3A4A66'} opacity={0.9} />
    {text && <text x={0} y={-96} textAnchor="middle" fill="#0D1424" style={{ font: '400 34px "Bebas Neue"' }}>{text}</text>}
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-40 + c * 30} y={-66 + r * 20} width={20} height={12} rx={3} fill="#5A6680" />))}
  </g>
)
// # a person-shaped silhouette with a question mark (an unknown payer)
const Shadow: React.FC<{ x: number; y: number; s?: number; o?: number; q?: number; color?: string }> = ({ x, y, s = 1, o = 1, q = 1, color = P.navy4 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-150} r={42} fill={color} /><path d="M-70 0 Q-70 -96 0 -100 Q70 -96 70 0 Z" fill={color} />
    <g opacity={q}><circle cx={0} cy={-150} r={30} fill={P.gold} /><text x={0} y={-134} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>?</text></g>
  </g>
)
// # a rounded panel with a big number and a caption
const Stat: React.FC<{ x: number; y: number; big: string; small?: string; color?: string; o?: number; s?: number; w?: number }> = ({ x, y, big, small, color = P.goldInk, o = 1, s = 1, w = 520 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-110} width={w} height={small ? 220 : 160} rx={28} fill={P.card} />
    <Label x={0} y={small ? 10 : 20} text={big} size={110} font="Bebas Neue" color={color} />
    {small && <Label x={0} y={80} text={small} size={48} font="Bebas Neue" color={P.ink2} />}
  </g>
)
// # a stamp that thumps on
const Stamp: React.FC<{ x: number; y: number; text: string; f: number; at: number; color?: string; r?: number; size?: number }> = ({ x, y, text, f, at, color = P.coralInk, r = -8, size = 72 }) => {
  const t = on(f, at, 6), w = text.length * size * 0.42 + 70
  return <g opacity={t} transform={`translate(${x} ${y}) rotate(${r}) scale(${lerp(1.4, 1, easeOut(span(f, at, at + 6)))})`}>
    <rect x={-w / 2} y={-size * 0.75} width={w} height={size * 1.3} rx={14} fill="none" stroke={color} strokeWidth={8} />
    <Label x={0} y={size * 0.33} text={text} size={size} font="Bebas Neue" color={color} />
  </g>
}
// # a tick in a circle
const Tick: React.FC<{ x: number; y: number; o: number; r?: number; ok?: boolean }> = ({ x, y, o, r = 40, ok = true }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={ok ? P.mint : P.coral} />
    {ok ? <path d={`M${-r * 0.45} 0 l${r * 0.3} ${r * 0.3} l${r * 0.6} ${-r * 0.65}`} stroke={P.white} strokeWidth={r * 0.22} fill="none" strokeLinecap="round" />
      : <path d={`M${-r * 0.4} ${-r * 0.4} L${r * 0.4} ${r * 0.4} M${r * 0.4} ${-r * 0.4} L${-r * 0.4} ${r * 0.4}`} stroke={P.white} strokeWidth={r * 0.22} strokeLinecap="round" />}</g>
)
// # a coin flying from a to b over d frames starting at t0 (arcs up)
const fly = (f: number, t0: number, a: [number, number], b: [number, number], d = 18, h = 140) => {
  const t = easeInOut(span(f, t0, t0 + d))
  return { x: lerp(a[0], b[0], t), y: lerp(a[1], b[1], t) - Math.sin(t * Math.PI) * h, o: on(f, t0, 3) * (1 - span(f, t0 + d - 2, t0 + d + 2)), t }
}


// ------------------------------------------------------------ objects for this story
// # a glass savings jar, fill 0–1, with an optional label on its lid
const Jar: React.FC<{ x: number; y: number; s?: number; fill: number; label?: string; o?: number; color?: string }> = ({ x, y, s = 1, fill, label, o = 1, color = P.gold }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-230} width={220} height={240} rx={34} fill="#DDEBF7" opacity={0.35} stroke="#A9C4DE" strokeWidth={6} />
    <rect x={-96} y={4 - 220 * Math.max(0, Math.min(1, fill))} width={192} height={220 * Math.max(0, Math.min(1, fill))} rx={26} fill={color} />
    {Array.from({ length: Math.floor(fill * 6) }, (_, k) => <ellipse key={k} cx={-50 + (k % 3) * 50} cy={-14 - Math.floor(k / 3) * 40} rx={22} ry={8} fill={P.goldD} opacity={0.6} />)}
    <rect x={-120} y={-262} width={240} height={40} rx={12} fill={P.navy3} />
    {label && <text x={0} y={-233} textAnchor="middle" fill={P.white} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
  </g>
)
// # a tax bucket: fill 0–1 of water, its rate on the front, an optional cap line
const Bucket: React.FC<{ x: number; y: number; fill: number; rate: string; o?: number; s?: number; color?: string; dry?: boolean }> = ({ x, y, fill, rate, o = 1, s = 1, color = '#4FA8E8', dry }) => {
  const f = Math.max(0, Math.min(1, fill)), h = 220
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-110 -220 L110 -220 L90 0 L-90 0 Z" fill="#0E1B33" opacity={0.45} />
    <clipPath id={`bk${Math.round(x)}`}><path d="M-110 -220 L110 -220 L90 0 L-90 0 Z" /></clipPath>
    <rect x={-120} y={-h * f} width={240} height={h * f} fill={dry ? P.mint : '#7FD3FF'} clipPath={`url(#bk${Math.round(x)})`} opacity={0.9} />
    <path d="M-110 -220 L110 -220 L90 0 L-90 0 Z" fill="none" stroke={P.ink2} strokeWidth={8} strokeLinejoin="round" />
    <path d="M-110 -220 Q0 -300 110 -220" fill="none" stroke={P.ink2} strokeWidth={5} opacity={0.6} />
    <text x={0} y={-80} textAnchor="middle" fill={P.ink} style={{ font: '400 72px "Bebas Neue"' }}>{rate}</text>
  </g>
}
// # a simple side-view car (facing right), wheels on y = 0
const Car: React.FC<{ x: number; y: number; s?: number; color?: string; o?: number; old?: number; spin?: number }> = ({ x, y, s = 1, color = '#3A6EA8', o = 1, old = 0, spin = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={300} ry={18} fill="#000" opacity={0.2} />
    <path d="M-290 -50 Q-290 -110 -230 -118 L-130 -128 L-70 -200 Q-50 -220 -20 -220 L120 -220 Q150 -220 170 -196 L230 -128 L270 -118 Q300 -110 300 -60 L300 -40 Q300 -24 284 -24 L-276 -24 Q-290 -24 -290 -40 Z" fill={old > 0.5 ? '#8A8F99' : color} />
    <path d="M-50 -196 L40 -196 L40 -132 L-104 -132 Z M64 -196 L120 -196 Q138 -196 150 -180 L190 -132 L64 -132 Z" fill="#BFE4FF" opacity={0.85} />
    {[-170, 180].map((cx) => <g key={cx} transform={`translate(${cx} -24) rotate(${spin * 360})`}><circle r={52} fill="#1B2233" /><circle r={26} fill="#C9D1DE" /><rect x={-4} y={-24} width={8} height={18} fill="#8C97AA" /></g>)}
    {old > 0 && <g opacity={old}><circle cx={-320} cy={-60} r={22} fill="#9AA3B2" opacity={0.6} /><circle cx={-350} cy={-90} r={30} fill="#9AA3B2" opacity={0.4} /></g>}
  </g>
)
// # a house; size 0–1 grows it (a nicer place)
const House: React.FC<{ x: number; y: number; s?: number; o?: number; big?: number; color?: string }> = ({ x, y, s = 1, o = 1, big = 0, color = '#E9C25A' }) => {
  const w = 220 + 120 * big, h = 170 + 110 * big
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={10} fill={color} /><path d={`M${-w / 2 - 30} ${-h} L0 ${-h - 120 - 40 * big} L${w / 2 + 30} ${-h} Z`} fill="#C94A3E" />
    <rect x={-36} y={-110} width={72} height={110} rx={8} fill="#6E5236" />
    {Array.from({ length: big > 0.5 ? 4 : 2 }, (_, k) => <rect key={k} x={-w / 2 + 26 + (k % 2) * (w - 112)} y={-h + 34 + Math.floor(k / 2) * 90} width={60} height={56} rx={6} fill="#BFE4FF" />)}
  </g>
}
// # an envelope (a bill) — text on its face
const Bill: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string }> = ({ x, y, s = 1, r = 0, o = 1, text }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-76} width={240} height={152} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={3} /><path d="M-120 -76 L0 10 L120 -76" fill="none" stroke="#C8B994" strokeWidth={6} />
    {text && <text x={0} y={56} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>{text}</text>}
  </g>
)
// # a labelled horizontal money bar growing from x, with value text at its end
const MBar: React.FC<{ x: number; y: number; w: number; h?: number; color: string; label?: string; value?: string; o?: number; vo?: number; inside?: boolean }> = ({ x, y, w, h = 80, color, label, value, o = 1, vo = 1, inside }) => (
  <g opacity={o}>
    {label && <Label x={x} y={y - 16} text={label} size={46} font="Bebas Neue" color={P.ink} anchor="start" />}
    <rect x={x} y={y} width={Math.max(0, w)} height={h} rx={16} fill={color} />
    {value && <Label x={inside ? x + w - 18 : x + w + 20} y={y + h / 2 + 20} text={value} size={58} font="Bebas Neue" color={inside ? P.navy0 : P.ink} anchor={inside ? 'end' : 'start'} o={vo} />}
  </g>
)

// ---------------------------------------------------------------- s1–s6: Sam's raise 60k → 75k (+15,000 a year); a year later savings look the same — no big purchase, no disaster; only 63% could cover $400 with cash (68% in 2021); three quiet forces
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const sam = c('s1:sam'), raise = c('s1:raise'), d60 = c('s1:60000'), d75 = c('s1:75000')
  const d15 = c('s2:15000'), every = c('s2:every')
  const later = c('s3:later'), savings = c('s3:savings'), same = c('s3:same')
  const big = c('s3a:big'), disaster = c('s3a:disaster'), moment = c('s3a:moment'), went = c('s3a:went')
  const where = c('s4:where'), go = c('s4:go')
  const unusual = c('s5:unusual'), federal = c('s5:federal'), d63 = c('s5:63'), adults = c('s5:adults'), d400 = c('s5:400'), cash = c('s5:cash')
  const back = c('s5a:back'), d68 = c('s5a:68'), slipped = c('s5a:slipped'), stuck = c('s5a:stuck')
  const bigger = c('s6:bigger'), breathing = c('s6:breathing'), three = c('s6:three'), forces = c('s6:forces'), offer = c('s6:offer'), letter = c('s6:letter')
  const A = win(f, sam, later), B = win(f, later, unusual), Cc = win(f, unusual, bigger), D = on(f, bigger, 10)
  const boss: Beat[] = [[0, 'idle', 'smiling'], [raise - 6, 'offer', 'smiling'], [d75, 'clapA', 'smiling', 'clapB', 12], [every, 'thumbsUp', 'smiling']]
  const hero: Beat[] = [[0, 'idle', 'smiling'], [raise, 'receive', 'smiling'], [d75, 'fistPump', 'smiling'], [every, 'celebrate', 'smiling'], [later, 'phone', 'neutral'], [same, 'phone', 'worried'], [big, 'shrug', 'thinking'], [where, 'scratchHead', 'thinking'],
    [unusual, 'explain', 'neutral'], [d68, 'lookFar', 'thinking'], [bigger, 'idle', 'neutral'], [three, 'countOne', 'neutral'], [letter, 'read', 'thinking']]
  const hx = f < later ? 520 : 380
  const hp = hand(f, hero, hx, 1190, 1.45)
  const lit = new Set(Array.from({ length: 63 }, (_, k) => k))
  // # SHED points (only the sourced years)
  const pts: [string, number, number][] = [['2021', 68, d68], ['2022', 63, slipped], ['2023', 63, slipped + 6], ['2024', 63, slipped + 12], ['2025', 63, stuck]]
  return (
    <g>
      <Stage id="sh" frame={f} />
      <Headline f={f} lines={[[sam, 'MEET SAM', P.ink, 130], [raise, 'A RAISE!', P.mintInk, 140], [d75, '$60,000 → $75,000', P.goldInk, 124], [d15, '+$15,000 A YEAR', P.mintInk, 130], [later, 'A YEAR LATER…', P.ink, 124], [same, 'SAVINGS: ABOUT THE SAME', P.coralInk, 110],
        [big, 'NO BIG PURCHASE', P.ink, 120], [disaster, 'NO DISASTER', P.ink, 124], [where, 'WHERE DID IT GO?', P.coralInk, 130], [unusual, 'SAM IS NOT ALONE', P.ink, 124], [d63, '63% COULD COVER $400', P.goldInk, 116], [cash, '…WITH CASH (2025)', P.goldInk, 116],
        [d68, '2021: 68%', P.ink, 124], [stuck, 'STUCK AT 63% SINCE 2022', P.coralInk, 110], [breathing, 'MORE PAY ≠ BREATHING ROOM', P.ink, 104], [three, 'THREE QUIET FORCES', P.goldInk, 124], [letter, 'NOT ON THE OFFER LETTER', P.ink, 110]]} />
      <g transform={camera(f, [[c("s6:none"), 1000, 560, 1.03], [c("s6:clearly"), 1300, 640, 1.06], [c("s5a:since"), 960, 540, 1], [c("s3:exactly"), 1200, 600, 1.05], [d60, 1220, 560, 1.08], [every, 960, 540, 1], [same, 1260, 640, 1.1], [big, 960, 540, 1], [d63, 1260, 600, 1.05], [back, 960, 540, 1], [stuck, 1300, 620, 1.08], [bigger, 960, 540, 1], [letter, 1260, 620, 1.08]])}>
        {/* # A: the boss hands Sam a raise; the salary tag flips from $60,000 to $75,000; +$15,000 every year */}
        <g opacity={A}>
          <Person f={f} who="investor" beats={boss} x={1640} y={1180} s={1.3} flip life={7} o={on(f, sam, 8)} />
          <g opacity={on(f, sam, 8)} transform="translate(1640 330)"><rect x={-90} y={-36} width={180} height={72} rx={14} fill={P.navy2} /><Label x={0} y={18} text="BOSS" size={52} font="Bebas Neue" color={P.white} /></g>
          {(() => { const t = easeInOut(span(f, raise - 4, raise + 14)); const bp = hand(f, boss, 1640, 1180, 1.3, true)
            return <g opacity={on(f, raise - 4, 6) * (1 - on(f, d60, 8))} transform={`translate(${lerp(bp.x - 60, hp.x + 80, t)} ${lerp(bp.y - 40, hp.y - 40, t)}) rotate(-6) scale(0.8)`}><Bill x={0} y={0} text="RAISE" /></g> })()}
          <g opacity={on(f, d60, 6)} transform={`translate(1140 520) rotate(-4) scale(${pop(f, d60)})`}>
            <rect x={-250} y={-90} width={500} height={180} rx={24} fill={f >= d75 ? P.mint : P.paper} stroke={P.edge} strokeWidth={3} />
            <Label x={0} y={-30} text="SALARY" size={48} font="Bebas Neue" color={f >= d75 ? '#FFFFFF' : P.navy2} />
            <Label x={0} y={56} text={f >= d75 ? '$75,000' : '$60,000'} size={104} font="Bebas Neue" color={f >= d75 ? '#FFFFFF' : P.navy0} />
            <g opacity={on(f, d75, 6)}><Label x={0} y={-120} text="$60,000 →" size={56} font="Bebas Neue" color={P.ink2} /></g>
            <g transform="translate(200 -78) rotate(8)"><rect x={-70} y={-22} width={140} height={44} rx={10} fill={P.gold} /><Label x={0} y={14} text="EXAMPLE" size={36} font="Bebas Neue" color={P.navy0} /></g></g>
          <g opacity={on(f, d15, 6)} transform={`translate(1000 800) scale(${pop(f, d15)})`}><rect x={-200} y={-60} width={400} height={120} rx={20} fill={P.gold} /><Label x={0} y={30} text="+$15,000" size={92} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, every, 6)} transform={`translate(1270 800) scale(${pop(f, every) * 0.8})`}><Calendar x={0} y={0} text="EVERY YEAR" s={1.1} /></g>
        </g>
        {/* # B: a year later — the savings jar barely moved; no big purchase, no disaster */}
        <g opacity={B}>
          <g opacity={on(f, later, 6)} transform={`translate(1560 330) scale(${pop(f, later) * 0.8})`}><Calendar x={0} y={0} text="+1 YEAR" s={1.2} /></g>
          <Jar x={1220} y={900} s={1.25} fill={0.18 + 0.02 * on(f, same, 20)} label="SAVINGS" o={on(f, savings, 6)} />
          <Label x={1220} y={980} text={f >= same ? 'ALMOST THE SAME' : ''} size={56} font="Bebas Neue" color={P.coralInk} />
          {[[big, 'shopping-bag'], [disaster, 'fire'], [moment, 'exclamation']].map(([at, id], k) => <g key={k} opacity={on(f, at as number, 6) * (1 - on(f, where, 8))} transform={`translate(${1500 + (k % 2) * 160} ${560 + k * 140}) scale(${pop(f, at as number) * 0.8})`}><circle r={70} fill={P.card} /><Prop id={id as string} x={0} y={-4} size={90} f={f} /><path d="M-60 -60 L60 60" stroke={P.coral} strokeWidth={12} strokeLinecap="round" opacity={on(f, (at as number) + 6, 4)} /></g>)}
          <g opacity={on(f, went, 6) * (1 - on(f, where, 8))}>{Array.from({ length: 5 }, (_, k) => { const p = ((f - went) / 40 + k / 5) % 1; return <Coin key={k} x={1220 + Math.sin(k * 2) * 60} y={780 - p * 300} s={0.6} o={Math.sin(p * Math.PI)} /> })}</g>
          <g opacity={on(f, go, 6)} transform={`translate(1540 620) scale(${pop(f, go) * 1.2})`}><circle r={90} fill={P.gold} /><Label x={0} y={40} text="?" size={140} font="Bebas Neue" color={P.navy0} /></g>
        </g>
        {/* # C: 100 adults, 63 light up with a $400 bill paid in cash; the line since 2021 */}
        <g opacity={Cc}>
          <g opacity={1 - on(f, d68 - 4, 8)}>
            {Array.from({ length: 100 }, (_, k) => { const col = k % 20, row = Math.floor(k / 20), x = 790 + col * 52, y = 400 + row * 104, ok = lit.has(k) && f >= d63 + Math.floor(k / 6)
              return <g key={k} opacity={on(f, unusual + col * 0.6, 5)}><Mini look={['hero', 'buyer', 'investor', 'owner', 'worker'][k % 5]} x={x} y={y + 40} scale={0.42} frame={f} seed={k + 7} mood={ok ? 'happy' : 'neutral'} />{ok && <circle cx={x + 14} cy={y - 50} r={10} fill={P.mint} />}</g> })}
            <g opacity={on(f, federal, 6)} transform={`translate(1845 560) scale(${pop(f, federal) * 0.6})`}><circle r={80} fill={P.card} /><Prop id="bank" x={0} y={-6} size={110} f={f} /></g>
            <g opacity={on(f, d400, 6)} transform={`translate(1300 960) scale(${pop(f, d400) * 0.8})`}><Bill x={-140} y={0} text="$400" /><g opacity={on(f, cash, 6)}><Prop id="cash-stack" x={150} y={0} size={140} f={f} /></g></g>
          </g>
          <g opacity={on(f, d68 - 4, 8)}>
            <rect x={760} y={880} width={1000} height={8} rx={4} fill={P.navy4} />
            {pts.map(([yr, v, at], k) => { const x = 840 + k * 220, y = 880 - (v - 50) * 26
              return <g key={k} opacity={on(f, at, 6)}>{k > 0 && <path d={`M${x - 220} ${880 - (pts[k - 1][1] - 50) * 26} L${x} ${y}`} stroke={P.coral} strokeWidth={8} opacity={on(f, at, 6)} />}
                <circle cx={x} cy={y} r={18} fill={k === 0 ? P.mint : P.coral} /><Label x={x} y={y - 34} text={`${v}%`} size={52} font="Bebas Neue" color={P.ink} /><Label x={x} y={940} text={yr} size={48} font="Bebas Neue" color={P.ink2} /></g> })}
          </g>
        </g>
        {/* # D: three shadowy forces rise from the offer letter */}
        <g opacity={D}>
          <g opacity={on(f, offer, 6)} transform={`translate(1240 760) rotate(-4) scale(${pop(f, offer) * 0.75})`}><Doc x={0} y={0} title="OFFER" lines={4} stamp="$75,000" stampO={on(f, letter, 6)} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, forces + k * 4, 6)} transform={`translate(${1000 + k * 240} ${lerp(760, 470, easeOut(span(f, forces + k * 4, forces + k * 4 + 16)))}) scale(0.9)`}><Shadow x={0} y={0} q={1} color={[P.coral, P.gold, P.sky][k]} /><Label x={0} y={50} text={`${k + 1}`} size={60} font="Bebas Neue" color={P.ink} /></g>)}
          <g opacity={on(f, bigger, 6) * (1 - on(f, three, 8))}>
            <g transform={`translate(1060 560) rotate(-4) scale(${pop(f, bigger) * 0.8})`}><rect x={-230} y={-80} width={460} height={160} rx={22} fill={P.mint} /><Label x={0} y={30} text="$75,000" size={100} font="Bebas Neue" color="#FFFFFF" /></g>
            <Jar x={1500} y={880} s={1} fill={0.12} label="SAVINGS" />
            <g opacity={on(f, breathing, 6)} transform={`translate(1500 420) scale(${pop(f, breathing)})`}><Prop id="cloud" x={0} y={0} size={200} f={f} /><path d="M-90 -60 L90 60" stroke={P.coral} strokeWidth={12} strokeLinecap="round" /></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={hx} y={1190} s={1.45} life={2} />
        {f >= later && f < unusual && <Phone x={hp.x + 160} y={hp.y + 10} s={1} r={8} o={on(f, later, 6) * (1 - on(f, where, 6))}><Label x={0} y={-80} text="SAVINGS" size={46} font="Bebas Neue" color={P.navy1} /><Label x={0} y={20} text="SAME?" size={66} font="Bebas Neue" color="#D9483A" /></Phone>}
      </g>
      <Vignette id="sh" />
    </g>
  )
}

// ---------------------------------------------------------------- s7–s12: force 1 is tax — taken before pay lands; the bracket myth (a raise can't leave you with less); layers = buckets filling and spilling, each taxed at its own rate; 2026 single: 10% / 12% / 22% over $50,400 taxable (after the standard deduction); new dollars land in the top layers
const Tax: React.FC<PieceProps> = ({ f, c }) => {
  const first = c('s7:first'), arrives = c('s7:arrives'), reaches = c('s7:reaches'), account = c("s7:account")
  const tax = c('s8:tax'), differently = c('s8:differently')
  const fear = c('s9:fear'), push = c('s9:push'), higher = c('s9:higher'), bracket = c('s9:bracket'), less = c('s9:less'), not = c('s9:not')
  const layers = c('s10:layers'), rate = c('s10:rate'), slice = c('s10:slice'), band = c('s10:band')
  const water = c('s10a:water'), buckets = c('s10a:buckets'), fills = c('s10a:fills'), spills = c('s10a:spills'), next = c('s10a:next'), own = c('s10a:own')
  const only = c('s10b:only'), taxed = c('s10b:taxed'), nothing = c('s10b:nothing'), lower = c('s10b:lower'), again = c('s10b:again')
  const single = c('s11:single'), d10 = c('s11:10'), d12 = c('s11:12'), d22 = c('s11:22'), taxable = c('s11:taxable'), standard = c('s11:standard'), d504 = c('s11:50400')
  const moving = c('s12:moving'), never = c('s12:never'), smaller = c('s12:smaller'), dollars = c('s12:dollars'), top = c('s12:top'), highest = c('s12:highest')
  const A = win(f, first, fear), B = win(f, fear, layers), Cc = on(f, layers, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [arrives, 'phone', 'neutral'], [tax, 'oops', 'shocked'], [fear, 'nervous', 'worried'], [less, 'despair', 'worried'], [not, 'thumbsUp', 'smiling'], [layers, 'explain', 'neutral'],
    [water, 'pointUp', 'neutral'], [spills, 'explain', 'neutral'], [only, 'countOne', 'neutral'], [single, 'idle', 'neutral'], [standard, 'pointDown', 'neutral'], [never, 'thumbsUp', 'smiling'], [top, 'pointUp', 'thinking']]
  // # the buckets: standard deduction (dry, tax-free), 10%, 12%, 22%; water level is the money poured in so far
  const pour = on(f, fills, 70) // # 0 → 1 as Sam's income pours in
  const lvl = (k: number) => Math.max(0, Math.min(1, pour * 4 - k)) // # bucket k fills after k earlier ones
  const bx = (k: number) => 820 + k * 270
  return (
    <g>
      <Stage id="st" frame={f} tint="teal" />
      <Headline f={f} lines={[[first, 'FORCE #1', P.goldInk, 130], [tax, 'TAX', P.coralInk, 150], [differently, 'NOT HOW MANY PEOPLE THINK', P.ink, 104], [fear, 'THE FEAR:', P.ink, 120], [bracket, 'A HIGHER BRACKET…', P.ink, 120], [less, '…LEAVES YOU WITH LESS?', P.coralInk, 116], [not, 'NOT HOW IT WORKS', P.mintInk, 120],
        [layers, 'TAX COMES IN LAYERS', P.ink, 120], [buckets, 'PICTURE BUCKETS', P.skyInk, 124], [own, 'EACH WITH ITS OWN RATE', P.ink, 116], [only, 'ONLY THE WATER IN EACH BUCKET…', P.ink, 100], [lower, 'LOWER BUCKETS: NEVER TAXED AGAIN', P.mintInk, 100],
        [single, '2026, SINGLE', P.ink, 124], [d504, '22% ABOVE $50,400 TAXABLE', P.goldInk, 110], [never, 'YOUR PAY NEVER SHRINKS', P.mintInk, 116], [top, 'NEW DOLLARS: TOP RATE', P.coralInk, 116]]} />
      <g transform={camera(f, [[c("s10:income"), 1100, 600, 1.04], [c("s10:charged"), 1200, 600, 1.05], [c("s11:after"), 1000, 560, 1.03], [c("s10a:picture"), 1300, 640, 1.06], [c("s9:works"), 960, 540, 1], [c("s8:many"), 1200, 600, 1.05], [tax, 1240, 600, 1.1], [fear, 960, 540, 1], [less, 1240, 620, 1.08], [layers, 960, 540, 1], [taxed, 1180, 640, 1.05], [single, 960, 540, 1], [d504, 1500, 600, 1.08], [moving, 960, 540, 1], [top, 1500, 620, 1.1]])}>
        {/* # A: the paycheck travels to Sam's bank account — a slice is cut off on "tax" */}
        <g opacity={A}>
          <g opacity={on(f, reaches, 6)} transform={`translate(1600 640) scale(${pop(f, reaches)})`}><circle r={120} fill={P.card} /><Prop id="bank" x={0} y={-8} size={150} f={f} /><Label x={0} y={170} text={f >= account ? "SAM'S ACCOUNT" : ''} size={50} font="Bebas Neue" color={P.ink} /></g>
          {(() => { const t = easeInOut(span(f, arrives, arrives + 50)); return <g opacity={on(f, arrives, 6)} transform={`translate(${lerp(820, 1380, t)} 640)`}>
            <rect x={-170} y={-80} width={340} height={160} rx={18} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={5} /><Label x={0} y={20} text="PAYCHECK" size={56} font="Bebas Neue" color="#1F5A2E" />
            <g opacity={on(f, tax, 6)} transform={`translate(${170 - 60} ${-80 - 60 * on(f, tax, 14)}) rotate(${-20 * on(f, tax, 14)})`}><rect x={-60} y={0} width={120} height={160} rx={10} fill={P.coral} /><Label x={0} y={96} text="TAX" size={48} font="Bebas Neue" color="#FFFFFF" /></g></g> })()}
        </g>
        {/* # B: the myth — climbing a step into a higher bracket and losing money (stamped MYTH) */}
        <g opacity={B}>
          {[0, 1, 2].map((k) => <rect key={k} x={900 + k * 260} y={860 - k * 120} width={260} height={120 + k * 120} rx={10} fill={[P.sky, P.gold, P.coral][k]} opacity={on(f, fear + k * 4, 6)} />)}
          <g opacity={on(f, fear + 8, 6)}><Mini look="hero" x={lerp(1290, 1550, on(f, bracket, 16))} y={lerp(740, 620, on(f, bracket, 16))} scale={1.3} frame={f} seed={3} mood={f >= less ? 'sad' : 'neutral'} /></g>
          {Array.from({ length: 4 }, (_, k) => { const m = fly(f, less + k * 3, [1550, 520], [1600 + k * 30, 980], 18, -60); return <Coin key={k} x={m.x} y={m.y} s={0.7} o={m.o} /> })}
          <Stamp x={1300} y={420} text="MYTH" f={f} at={not} color={P.coralInk} size={110} />
        </g>
        {/* # the layers: income as a stack of bands, before it becomes buckets */}
        <g opacity={on(f, layers, 6) * (1 - on(f, water, 8))}>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, layers + k * 4, 6)} transform={`translate(${1240 + (1 - easeOut(span(f, layers + k * 4, layers + k * 4 + 12))) * 300} ${880 - k * 130})`}><rect x={-300} y={-55} width={600} height={110} rx={16} fill={['#7FD3FF', '#5FB6F0', '#3E95DA', '#2A7FC8'][k]} /></g>)}
          <g opacity={on(f, slice, 6)}><path d="M960 360 h40 v540 h-40" stroke={P.goldInk} strokeWidth={8} fill="none" /></g>
          <g opacity={on(f, band, 6)}><rect x={930} y={555} width={620} height={130} rx={18} fill="none" stroke={P.goldInk} strokeWidth={8} strokeDasharray="16 10" /></g>
        </g>
        {/* # C: the buckets — water pours in from the left, fills one bucket, spills into the next; each bucket shows its rate */}
        <g opacity={Cc}>
          {[0, 1, 2, 3].map((k) => { const show = on(f, [buckets, buckets + 4, buckets + 8, buckets + 12][k], 6)
            return <g key={k}>
              <Bucket x={bx(k)} y={900} fill={lvl(k)} rate={[f >= standard ? '0%' : '?', f >= d10 ? '10%' : '?', f >= d12 ? '12%' : '?', f >= d22 ? '22%' : '?'][k]} o={show} dry={k === 0} color={['#4FA8E8', '#5FB6F0', '#3E95DA', '#2A7FC8'][k]} />
              {k < 3 && lvl(k) >= 1 && lvl(k + 1) < 1 && <path d={`M${bx(k) + 100} 690 Q${bx(k) + 140} 640 ${bx(k) + 170} 700`} stroke="#4FA8E8" strokeWidth={14} fill="none" strokeLinecap="round" />}
              <Label x={bx(k)} y={980} text={['', 'UP TO $12,400', 'TO $50,400', 'ABOVE $50,400'][k] && (k === 3 ? (f >= d504 ? 'ABOVE $50,400' : '') : k === 2 ? (f >= d504 ? 'TO $50,400' : '') : k === 1 ? (f >= d504 ? 'UP TO $12,400' : '') : '')} size={44} font="Bebas Neue" color={P.ink2} />
              {/* # tax tags appear on "taxed": each bucket taxed only at its own rate */}
              {k > 0 && <g opacity={on(f, taxed + k * 4, 6) * lvl(k)} transform={`translate(${bx(k) + 70} 620) scale(${pop(f, taxed + k * 4) * 0.8})`}><Coin x={0} y={0} s={1} text="TAX" /></g>}
            </g> })}
          {/* # the tap pouring water */}
          <g opacity={on(f, water, 6)}><rect x={620} y={560} width={110} height={40} rx={14} fill={P.navy4} /><rect x={700} y={580} width={30} height={60} rx={8} fill={P.navy4} />
            {f >= fills && <rect x={706} y={640} width={18} height={240} rx={9} fill="#4FA8E8" opacity={0.85 * (1 - on(f, only, 10))} />}</g>
          <g opacity={on(f, standard, 6)} transform={`translate(${bx(0)} 470) scale(${pop(f, standard) * 0.9})`}><rect x={-130} y={-60} width={260} height={110} rx={16} fill={P.mint} /><Label x={0} y={-12} text="STANDARD" size={40} font="Bebas Neue" color="#FFFFFF" /><Label x={0} y={34} text="DEDUCTION: 0%" size={40} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, again, 6) * (1 - on(f, single, 8))}>{[1, 2].map((k) => <Tick key={k} x={bx(k)} y={560} o={1} r={34} />)}</g>
          {/* # the new dollars: a gold top layer in the highest bucket */}
          <g opacity={on(f, dollars, 6)}><rect x={bx(3) - 92} y={900 - 220 * lvl(3) - 40} width={184} height={40} rx={8} fill={P.gold} /><Label x={bx(3) + 140} y={900 - 220 * lvl(3) - 10} text={f >= top ? 'NEW $' : ''} size={48} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <g opacity={on(f, never, 6) * (1 - on(f, dollars, 8))} transform={`translate(1700 420) scale(${pop(f, never)})`}><Prop id="arrow-up" x={0} y={0} size={140} f={f} /><Label x={0} y={110} text={f >= smaller ? 'TOTAL PAY ↑' : ''} size={48} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={f < layers ? 460 : 330} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="st" />
    </g>
  )
}

// ---------------------------------------------------------------- s13–s17: Sam's raise: +$2,650 federal tax (6,500 at 12%, 8,500 at 22%); +7.65% payroll ≈ $1,150 (Social Security 6.2% to $184,500, Medicare 1.45%); ≈ $11,200 left before state tax (most states add their own); ≈ $930 a month — still a lot
const TaxMath: React.FC<PieceProps> = ({ f, c }) => {
  const d15 = c('s13:15000'), d2650 = c('s13:2650'), federal = c('s13:federal')
  const part = c('s13a:part'), fits = c('s13a:fits'), d12 = c('s13a:12'), d8500 = c('s13a:8500'), spills = c('s13a:spills'), d22 = c('s13a:22')
  const social = c('s14:social'), medicare = c('s14:medicare'), d765 = c('s14:765'), d1150 = c('s14:1150')
  const fund = c('s14a:fund'), benefits = c('s14a:benefits'), coverage = c('s14a:coverage'), retirement = c('s14a:retirement'), d62 = c('s14a:62'), d1845 = c('s14a:184500'), d145 = c('s14a:145'), every = c('s14a:every')
  const leaves = c('s15:leaves'), d11200 = c('s15:11200'), state = c('s15:state')
  const most = c('s15a:most'), states = c('s15a:states'), bigger = c('s15a:bigger')
  const spread = c('s16:spread'), d930 = c('s16:930'), month = c('s16:month')
  const still = c('s17:still'), part2 = c('s17:part'), mystery = c('s17:mystery')
  const A = win(f, c('s13'), fund), B = win(f, fund, leaves), Cc = on(f, leaves, 10)
  const W = 1100 / 15000 // # px per dollar of the raise bar
  const hero: Beat[] = [[0, 'idle', 'neutral'], [d2650, 'oops', 'shocked'], [part, 'explain', 'neutral'], [social, 'read', 'neutral'], [fund, 'idle', 'neutral'], [retirement, 'relief', 'smiling'], [leaves, 'countA', 'neutral', 'countB', 14], [states, 'shrug', 'worried'], [spread, 'phone', 'smiling'], [still, 'thumbsUp', 'smiling'], [mystery, 'scratchHead', 'thinking']]
  const seg = (x0: number, v: number, col: string, o: number, txt: string, to = 1) => <g opacity={o}><rect x={x0} y={520} width={v * W * to} height={130} rx={14} fill={col} /><Label x={x0 + (v * W) / 2} y={600} text={v * W > 150 ? txt : ''} size={48} font="Bebas Neue" color="#FFFFFF" /></g>
  return (
    <g>
      <Stage id="sm" frame={f} />
      <Headline f={f} lines={[[c('s13'), 'SAM’S RAISE', P.ink, 124], [d2650, '+$2,650 FEDERAL INCOME TAX', P.coralInk, 106], [d12, '$6,500 IN THE 12% BUCKET', P.ink, 110], [d22, '$8,500 IN THE 22% BUCKET', P.ink, 110], [d765, 'SOCIAL SECURITY + MEDICARE: 7.65%', P.coralInk, 92], [d1150, '≈ $1,150 MORE', P.coralInk, 124],
        [retirement, 'FOR BENEFITS IN RETIREMENT', P.ink, 104], [d1845, '6.2% UP TO $184,500', P.ink, 116], [every, '1.45% OF EVERY DOLLAR', P.ink, 116], [d11200, '≈ $11,200 LEFT', P.mintInk, 130], [state, '…BEFORE STATE TAX', P.ink, 120], [bigger, 'MOST STATES TAKE MORE', P.coralInk, 116],
        [spread, 'SPREAD OVER 12 MONTHS', P.ink, 116], [d930, '≈ $930 A MONTH', P.mintInk, 140], [still, 'STILL A LOT', P.ink, 130], [mystery, 'SO WHERE DID IT GO?', P.goldInk, 116]]} />
      <g transform={camera(f, [[c("s17:explains"), 960, 540, 1], [c("s17:money"), 1200, 600, 1.05], [c("s16:raise"), 1000, 560, 1.03], [c("s15a:places"), 1300, 640, 1.06], [c("s15a:own"), 960, 540, 1], [c("s13:sam"), 1200, 600, 1.05], [d2650, 1300, 600, 1.06], [d22, 1200, 760, 1.08], [social, 960, 540, 1], [d1150, 1500, 600, 1.08], [fund, 960, 540, 1], [leaves, 1200, 600, 1.05], [most, 960, 540, 1], [d930, 1240, 640, 1.1], [still, 960, 540, 1]])}>
        {/* # A + B: the raise as a long bar; slices are cut off for federal tax and payroll tax */}
        <g opacity={on(f, c('s13'), 8) * (1 - on(f, most, 10))}>
          <Label x={700} y={490} text={f >= d15 ? 'THE $15,000 RAISE' : ''} size={52} font="Bebas Neue" color={P.ink} anchor="start" />
          {seg(700, 15000, P.mint, on(f, c('s13'), 6), '', on(f, c('s13'), 14))}
          <g opacity={on(f, d2650, 6)}><rect x={700 + (15000 - 2650) * W} y={lerp(520, 400, on(f, d2650 + 4, 12))} width={2650 * W} height={130} rx={14} fill={P.coral} /><Label x={700 + (15000 - 1325) * W} y={lerp(600, 480, on(f, d2650 + 4, 12))} text="$2,650" size={50} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, d1150, 6)}><rect x={700 + (15000 - 2650 - 1147.5) * W} y={lerp(520, 400, on(f, d1150 + 4, 12))} width={1147.5 * W} height={130} rx={14} fill={P.goldD} /><Label x={700 + (15000 - 2650 - 574) * W} y={lerp(600, 480, on(f, d1150 + 4, 12)) - 100} text="$1,150" size={48} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, d11200, 6)}><path d={`M700 690 h${11202.5 * W}`} stroke={P.mintInk} strokeWidth={8} /><Label x={700 + 5600 * W} y={750} text="≈ $11,200 LEFT" size={60} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        {/* # A: the two buckets the raise lands in */}
        <g opacity={A * on(f, part, 8)}>
          <Bucket x={1060} y={930} s={0.7} fill={on(f, fits, 20) * 0.5} rate="12%" />
          <Bucket x={1400} y={930} s={0.7} fill={on(f, spills, 20) * 0.65} rate="22%" />
          <Label x={1060} y={700} text={f >= d12 ? '$6,500' : ''} size={52} font="Bebas Neue" color={P.ink} /><Label x={1400} y={700} text={f >= d8500 ? '$8,500' : ''} size={52} font="Bebas Neue" color={P.ink} />
          <Label x={1230} y={1000} text={f >= federal ? 'FEDERAL INCOME TAX' : ''} size={44} font="Bebas Neue" color={P.ink2} />
        </g>
        {/* # B: what payroll tax pays for — Social Security and Medicare; the cap and the 1.45% */}
        <g opacity={B}>
          {[[benefits, 'SOCIAL SECURITY', 'piggy-bank', d62, '6.2%', f >= d1845 ? 'UP TO $184,500' : ''], [coverage, 'MEDICARE', 'medical-kit', d145, '1.45%', f >= every ? 'EVERY DOLLAR' : '']].map(([at, t, id, at2, pct, cap], k) => (
            <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${1000 + k * 480} 820) scale(${pop(f, at as number) * 0.9})`}>
              <rect x={-200} y={-150} width={400} height={300} rx={26} fill={P.card} /><Prop id={id as string} x={0} y={-60} size={120} f={f} />
              <Label x={0} y={40} text={t as string} size={50} font="Bebas Neue" color={P.ink} /><Label x={0} y={100} text={f >= (at2 as number) ? `${pct} ${cap}` : ''} size={44} font="Bebas Neue" color={P.goldInk} /></g>))}
          <g opacity={0} transform={`translate(1790 980) scale(${pop(f, retirement) * 0.7})`}><Mini look="owner" x={0} y={100} scale={1.4} frame={f} seed={5} mood="happy" /><Prop id="hourglass" x={110} y={20} size={90} f={f} /></g>
        </g>
        {/* # C: state tax may take more; then ≈ $11,200 ÷ 12 = ≈ $930 a month */}
        <g opacity={Cc}>
          <g opacity={on(f, most, 6) * (1 - on(f, spread, 8))}>
            <rect x={700} y={540} width={11202.5 * W} height={130} rx={14} fill={P.mint} />
            <rect x={700 + 11202.5 * W - 520 * W * on(f, bigger, 14)} y={540} width={520 * W * on(f, bigger, 14) + 1} height={130} rx={14} fill={P.navy4} opacity={0.85} />
            <Label x={700 + 11202.5 * W - 260 * W} y={720} text={f >= bigger ? 'STATE TAX?' : ''} size={46} font="Bebas Neue" color={P.ink2} />
            <g opacity={on(f, states, 6)} transform={`translate(${700 + 11202.5 * W - 260 * W} 860) scale(${pop(f, states)})`}><rect x={-140} y={-46} width={280} height={92} rx={16} fill={P.navy4} /><Label x={0} y={18} text="STATE TAX" size={52} font="Bebas Neue" color="#FFFFFF" /></g>
          </g>
          <g opacity={on(f, spread, 6)}>
            {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, spread + k * 1.5, 5)} transform={`translate(${760 + (k % 6) * 170} ${470 + Math.floor(k / 6) * 210}) scale(0.8)`}><Calendar x={0} y={0} text={['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][k]} s={1} />
              <Label x={0} y={140} text={f >= d930 ? '$930' : ''} size={48} font="Bebas Neue" color={P.mintInk} /></g>)}
            <g opacity={on(f, part2, 6)} transform={`translate(1700 360) scale(${pop(f, part2)})`}><circle r={80} fill={P.gold} /><Label x={0} y={36} text="?" size={110} font="Bebas Neue" color={P.navy0} /></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={360} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="sm" />
    </g>
  )
}

// ---------------------------------------------------------------- s18–s25: force 2, after payday — the BLS survey; households lined up in five equal groups; middle: earned ≈ 74,500, spent ≈ 66,900; next: ≈ 121,500 / ≈ 90,000; +47,000 income → +23,000 spending (about half); top: ≈ 264,500 / ≈ 150,300 (> 4× the lowest group's spending); different households — but the more earned, the more spent
const Groups: React.FC<PieceProps> = ({ f, c }) => {
  const second = c('s18:second'), bigger = c('s18:bigger'), payday = c('s18:payday')
  const bureau = c('s19:bureau'), thousands = c('s19:thousands'), households = c('s19:households'), earn = c('s19:earn'), spend = c('s19:spend')
  const line = c('s20:line'), lowest = c('s20:lowest'), highest = c('s20:highest'), split = c('s20:split'), five = c('s20:five'), pattern = c('s20:pattern')
  const same = c('s20a:same'), left = c('s20a:left'), right = c('s20a:right')
  const middle = c('s21:middle'), d745 = c('s21:74500'), spent21 = c('s21:spent'), d669 = c('s21:66900')
  const next = c('s22:next'), d1215 = c('s22:121500'), d90 = c('s22:90000')
  const d47 = c('s23:47000'), d23 = c('s23:23000'), half = c('s23:half')
  const top = c('s24:top'), d2645 = c('s24:264500'), d1503 = c('s24:150300'), four = c('s24:four'), lowest24 = c('s24:lowest')
  const different = c('s25:different'), same25 = c('s25:same'), clear = c('s25:clear'), earns = c('s25:earns'), tends = c('s25:tends')
  const A = win(f, second, line), B = on(f, line, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [payday, 'countA', 'smiling', 'countB', 14], [bureau, 'read', 'neutral'], [line, 'explain', 'neutral'], [middle, 'pointUp', 'neutral'], [d47, 'measure', 'neutral'], [half, 'countOne', 'neutral'], [top, 'shock', 'shocked'], [different, 'stop', 'neutral'], [clear, 'weighA', 'thinking', 'weighB', 22]]
  // # five groups: income and spending before tax (BLS CE 2024)
  const G = [[16658, 35046], [42925, 50054], [74474, 66900], [121548, 89972], [264510, 150342]]
  const S = 330 / 264510 // # px per dollar
  const gx = (k: number) => 760 + k * 220
  const incAt = [lowest, lowest + 6, d745, d1215, d2645], expAt = [lowest24, lowest24 + 4, d669, d90, d1503]
  return (
    <g>
      <Stage id="sg" frame={f} />
      <Headline f={f} lines={[[second, 'FORCE #2', P.goldInk, 130], [payday, 'AFTER PAYDAY', P.ink, 124], [bureau, 'BUREAU OF LABOR STATISTICS', P.ink, 100], [earn, 'WHAT THEY EARN…', P.ink, 120], [spend, '…AND WHAT THEY SPEND', P.ink, 116], [five, 'FIVE EQUAL GROUPS', P.ink, 124],
        [d745, 'MIDDLE: EARNED ≈ $74,500', P.ink, 110], [d669, 'SPENT ≈ $66,900', P.coralInk, 116], [d1215, 'NEXT: ≈ $121,500', P.ink, 116], [d90, 'SPENT ≈ $90,000', P.coralInk, 116], [d23, '+$47,000 IN → +$23,000 OUT', P.goldInk, 104], [half, 'ABOUT HALF', P.goldInk, 130],
        [d2645, 'TOP: ≈ $264,500', P.ink, 120], [d1503, 'SPENT ≈ $150,300', P.coralInk, 120], [four, '> 4× THE LOWEST GROUP', P.coralInk, 116], [different, 'DIFFERENT HOUSEHOLDS', P.ink, 116], [tends, 'EARN MORE → SPEND MORE', P.goldInk, 116]]} />
      <g transform={camera(f, [[c("s20a:each"), 1200, 600, 1.05], [c("s25:picture"), 960, 540, 1], [c("s23:households"), 1200, 600, 1.05], [c("s21:tax"), 1000, 560, 1.03], [c("s20a:earners"), 1300, 640, 1.06], [c("s20a:households"), 960, 540, 1], [c("s18:happens"), 1200, 600, 1.05], [bureau, 1240, 560, 1.06], [line, 960, 540, 1], [d745, 1300, 640, 1.08], [d47, 1360, 640, 1.06], [top, 960, 540, 1], [d1503, 1560, 600, 1.06], [different, 960, 540, 1]])}>
        {/* # A: payday, then the survey — a clipboard and a town of households */}
        <g opacity={A}>
          <g opacity={on(f, second, 6) * (1 - on(f, payday, 8))} transform={`translate(1240 760) scale(${pop(f, second) * 1.3})`}><Shadow x={0} y={0} q={1} color={P.gold} /><Label x={0} y={50} text="2" size={60} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, payday, 6)} transform={`translate(1240 420) scale(${pop(f, payday) * 0.8})`}><Calendar x={0} y={0} text="PAYDAY" s={1.3} /></g>
          <g opacity={on(f, bureau, 6)} transform={`translate(1600 600) rotate(4) scale(${pop(f, bureau) * 0.6})`}><Doc x={0} y={0} title="SURVEY" lines={5} /></g>
          {Array.from({ length: 18 }, (_, k) => { const at = thousands + k * 1.2; return <g key={k} opacity={on(f, at, 5)} transform={`translate(${820 + (k % 6) * 120} ${640 + Math.floor(k / 6) * 130}) scale(0.32)`}><House x={0} y={0} big={rnd(k + 3) * 0.6} color={['#E9C25A', '#7CC4F2', '#9AD9A8', '#F2A08F'][k % 4]} /></g> })}
          <g opacity={on(f, earn, 6)} transform="translate(1600 900)"><Coin x={-60} y={0} s={1} /><g opacity={on(f, spend, 6)}><Prop id="shopping-bag" x={60} y={0} size={100} f={f} /></g></g>
        </g>
        <g opacity={on(f, line, 6) * (1 - on(f, five, 8))}>{Array.from({ length: 10 }, (_, k) => <Mini key={k} look={['hero', 'buyer', 'owner', 'worker', 'investor'][k % 5]} x={lerp(1240 + (k % 3) * 60, 800 + k * 105, easeOut(span(f, line + k * 1.5, line + k * 1.5 + 16)))} y={980} scale={0.5 + k * 0.05} frame={f} seed={k + 200} />)}</g>
        {/* # B: five groups of households, each with an income bar (blue) and a spending bar (coral) */}
        <g opacity={B}>
          <rect x={700} y={960} width={1160} height={10} rx={5} fill={P.navy4} />
          {G.map(([inc, exp], k) => { const show = on(f, five + k * 3, 6), hi = (k === 2 && f >= middle && f < top) || (k === 3 && f >= next && f < top) || (k === 4 && f >= top)
            return <g key={k} opacity={show * (hi || f < middle ? 1 : 0.55)}>
              <rect x={gx(k) - 80} y={960 - inc * S * on(f, incAt[k], 14)} width={74} height={inc * S * on(f, incAt[k], 14)} rx={10} fill={P.sky} opacity={on(f, incAt[k], 4)} />
              <rect x={gx(k) + 6} y={960 - exp * S * on(f, expAt[k], 14)} width={74} height={exp * S * on(f, expAt[k], 14)} rx={10} fill={P.coral} opacity={on(f, expAt[k], 4)} />
            </g> })}
          <Label x={700} y={1020} text={f >= left ? '← LOWEST EARNERS' : ''} size={44} font="Bebas Neue" color={P.ink2} anchor="start" />
          <Label x={1860} y={1020} text={f >= right ? 'HIGHEST →' : ''} size={44} font="Bebas Neue" color={P.ink2} anchor="end" />
          <g opacity={on(f, earn, 6)}><rect x={720} y={380} width={30} height={30} rx={6} fill={P.sky} /><Label x={760} y={406} text="EARNED (BEFORE TAX)" size={40} font="Bebas Neue" color={P.ink} anchor="start" /><rect x={1080} y={380} width={30} height={30} rx={6} fill={P.coral} /><Label x={1120} y={406} text="SPENT" size={40} font="Bebas Neue" color={P.ink} anchor="start" /></g>
          {/* # the step from middle to next: +47,000 in, +23,000 out */}
          <g opacity={on(f, d47, 6) * (1 - on(f, top, 8))}>
            <path d={`M${gx(3) - 80} ${960 - 74474 * S} H${gx(3) - 120} V${960 - 121548 * S} H${gx(3) - 80}`} stroke={P.skyInk} strokeWidth={6} fill="none" />
            <Label x={gx(3) - 130} y={960 - 98000 * S} text="+$47K" size={46} font="Bebas Neue" color={P.skyInk} anchor="end" />
            <g opacity={on(f, d23, 6)}><path d={`M${gx(3) + 80} ${960 - 66900 * S} H${gx(3) + 120} V${960 - 89972 * S} H${gx(3) + 80}`} stroke={P.coralInk} strokeWidth={6} fill="none" /><Label x={gx(3) + 130} y={960 - 78000 * S} text="+$23K" size={46} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
          </g>
          <g opacity={on(f, four, 6) * (1 - on(f, different, 8))}><path d={`M${gx(0) + 43} ${930 - 35046 * S} Q${gx(2)} 500 ${gx(4) + 43} ${930 - 150342 * S}`} stroke={P.coralInk} strokeWidth={6} fill="none" strokeDasharray="14 10" /><Label x={gx(2)} y={540} text={f >= four ? '× 4+' : ''} size={64} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, earns, 6)}><path d={`M${gx(0)} ${900 - 35046 * S} L${gx(4) + 40} ${900 - 150342 * S}`} stroke={P.goldInk} strokeWidth={8} opacity={0.8} /><Prop id="arrow-up" x={gx(4) + 60} y={880 - 150342 * S - 60} size={90} f={f} /></g>
          <g opacity={on(f, same25, 6) * (1 - on(f, clear, 8))} transform={`translate(1500 420) scale(${pop(f, same25)})`}><rect x={-230} y={-50} width={460} height={100} rx={16} fill={P.card} /><Label x={0} y={18} text="NOT THE SAME PEOPLE" size={52} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={f < line ? 460 : 300} y={1190} s={1.35} life={2} />
      </g>
      <Vignette id="sg" />
    </g>
  )
}

// ---------------------------------------------------------------- s26–s27a: the biggest item is home — ≈ $26,300 on housing (a third of all spending); then transportation ≈ $13,300, mostly cars; the easiest places for a raise to go (a bigger home, a newer car feel affordable)
const Home: React.FC<PieceProps> = ({ f, c }) => {
  const biggest = c('s26:biggest'), home = c('s26:home'), average = c('s26:average'), d263 = c('s26:26300'), housing = c('s26:housing'), third = c('s26:third')
  const transportation = c('s27:transportation'), d133 = c('s27:13300'), owning = c('s27:owning'), cars = c('s27:cars')
  const two = c('s27a:two'), easiest = c('s27a:easiest'), raise = c('s27a:raise'), income = c('s27a:income'), bigger = c('s27a:bigger'), newer = c('s27a:newer'), affordable = c('s27a:affordable')
  const hero: Beat[] = [[0, 'idle', 'neutral'], [home, 'present', 'smiling'], [third, 'countOne', 'neutral'], [transportation, 'explain', 'neutral'], [two, 'idle', 'thinking'], [bigger, 'lookFar', 'thinking'], [affordable, 'thumbsUp', 'smiling']]
  // # donut: housing 33.4%, transportation 17.0% of all spending (BLS 2024)
  const R0 = 200, arc = (a0: number, a1: number) => { const q = (a: number) => [Math.sin(a * Math.PI * 2) * R0, -Math.cos(a * Math.PI * 2) * R0]; const [x0, y0] = q(a0), [x1, y1] = q(a1); return `M${x0} ${y0} A${R0} ${R0} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${x1} ${y1}` }
  const h = 0.334 * on(f, third, 18), t = 0.17 * on(f, d133, 14)
  return (
    <g>
      <Stage id="sx" frame={f} tint="teal" />
      <Headline f={f} lines={[[biggest, 'THE BIGGEST ITEM: HOME', P.ink, 116], [d263, '≈ $26,300 A YEAR ON HOUSING', P.goldInk, 104], [third, 'A THIRD OF ALL SPENDING', P.goldInk, 110], [transportation, 'NEXT: TRANSPORTATION', P.ink, 116], [d133, '≈ $13,300 A YEAR', P.skyInk, 120],
        [easiest, 'WHERE A RAISE GOES EASILY', P.ink, 110], [affordable, 'IT FEELS AFFORDABLE', P.coralInk, 116]]} />
      <g transform={camera(f, [[c("s27:came"), 960, 540, 1], [c("s26:everything"), 1200, 600, 1.05], [d263, 1100, 620, 1.06], [third, 1500, 600, 1.08], [transportation, 960, 540, 1], [cars, 1100, 760, 1.08], [two, 960, 540, 1], [affordable, 1240, 600, 1.06]])}>
        <g opacity={1 - on(f, two, 10)}>
          <g opacity={on(f, biggest, 6)} transform={`translate(1060 800) scale(${pop(f, biggest)})`}><House x={0} y={0} s={1.1} /></g>
          <g opacity={on(f, d263, 6)} transform={`translate(1060 900) scale(${pop(f, d263) * 0.8})`}><Stat x={0} y={0} big="$26,300" small={f >= housing ? 'HOUSING, 2024' : ''} w={460} /></g>
          <g transform="translate(1540 560)" opacity={on(f, average, 6)}>
            <circle r={R0} fill="none" stroke={P.navy3} strokeWidth={90} opacity={0.5} />
            {h > 0.001 && <path d={arc(0, h)} fill="none" stroke={P.gold} strokeWidth={90} />}
            {t > 0.001 && <path d={arc(0.334, 0.334 + t)} fill="none" stroke={P.sky} strokeWidth={90} />}
            <Label x={0} y={24} text={f >= third ? '⅓' : ''} size={110} font="Bebas Neue" color={P.ink} />
            <Label x={0} y={300} text={f >= d133 ? 'HOME ⅓ · TRANSPORT 17%' : f >= third ? 'HOME: ⅓' : ''} size={48} font="Bebas Neue" color={P.ink} />
          </g>
          <g opacity={on(f, transportation, 6)} transform={`translate(${lerp(900, 1450, easeOut(span(f, transportation, transportation + 20)))} 1010) scale(0.42)`}><Car x={0} y={0} spin={(f - transportation) / 20} /></g>
          <g opacity={on(f, owning, 6)} transform={`translate(760 900) scale(${pop(f, owning) * 0.8})`}><Prop id="gas-pump" x={0} y={0} size={110} f={f} /></g>
        </g>
        {/* # the easiest places for a raise to go: the current home and car, and the bigger home / newer car the raise makes feel affordable */}
        <g opacity={on(f, two, 10)}>
          <g transform="translate(940 820)"><House x={0} y={0} s={0.8} /><g opacity={on(f, cars, 0) * 0 + 1} transform="translate(0 160) scale(0.4)"><Car x={0} y={0} old={1} /></g></g>
          <path d="M1120 700 L1260 700" stroke={P.goldInk} strokeWidth={10} opacity={on(f, raise, 6)} /><path d="M1260 676 L1300 700 L1260 724 Z" fill={P.goldInk} opacity={on(f, raise, 6)} />
          <Label x={1210} y={660} text={f >= raise ? 'RAISE' : ''} size={48} font="Bebas Neue" color={P.goldInk} />
          <g opacity={on(f, bigger, 6)} transform={`translate(1560 840) scale(${pop(f, bigger)})`}><House x={0} y={0} s={0.85} big={1} color="#9AD9A8" /></g>
          <g opacity={on(f, newer, 6)} transform={`translate(1560 1000) scale(${pop(f, newer) * 0.42})`}><Car x={0} y={0} color="#D95A4E" /></g>
          <g opacity={on(f, income, 6)} transform={`translate(1210 470) scale(${pop(f, income) * 0.8})`}><Coin x={0} y={0} s={1.4} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={380} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="sx" />
    </g>
  )
}

// ---------------------------------------------------------------- s28–s34: how it happens to Sam — ≈ $930 a month extra; nicer apartment +$400; car trade-in, loan +$350 (AAA: a new car ≈ $1,070 a month to own and run; higher insurance, running costs); small things +$180; 400 + 350 + 180 = 930, the whole raise; lifestyle creep
const Creep: React.FC<PieceProps> = ({ f, c }) => {
  const watch = c('s28:watch'), reasonable = c('s28:reasonable')
  const d930 = c('s29:930'), month29 = c('s29:month')
  const apartment = c('s30:apartment'), closer = c('s30:closer'), d400 = c('s30:400'), earned = c('s30:earned')
  const old = c('s31:old'), noise = c('s31:noise'), trades = c('s31:trades'), loan = c('s31:loan'), d350 = c('s31:350')
  const payment = c('s31a:payment'), aaa = c('s31a:aaa'), d1070 = c('s31a:1070'), fuel = c('s31a:fuel'), insurance = c('s31a:insurance'), upkeep = c('s31a:upkeep'), loses = c('s31a:loses')
  const nicer = c('s31b:nicer'), higher = c('s31b:higher'), running = c('s31b:running'), top31 = c('s31b:top')
  const small = c('s32:small'), dinners = c('s32:dinners'), subscriptions = c('s32:subscriptions'), phone = c('s32:phone'), d180 = c('s32:180')
  const add = c('s33:add'), d400b = c('s33:400'), d350b = c('s33:350'), d180b = c('s33:180'), d930b = c('s33:930'), whole = c('s33:whole')
  const crazy = c('s34:crazy'), common = c('s34:common'), name = c('s34:name'), lifestyle = c('s34:lifestyle')
  const A = win(f, watch, payment), B = win(f, payment, small), Cc = on(f, small, 10)
  const spent = (f >= d400 ? 400 : 0) + (f >= d350 ? 350 : 0) + (f >= d180 ? 180 : 0)
  const left = 930 - spent
  const hero: Beat[] = [[0, 'idle', 'neutral'], [d930, 'carry', 'smiling'], [apartment, 'present', 'smiling'], [earned, 'confident', 'smug'], [noise, 'scratchHead', 'worried'], [trades, 'offer', 'neutral'], [loan, 'signA', 'neutral', 'signB', 14],
    [aaa, 'read', 'thinking'], [d1070, 'oops', 'shocked'], [nicer, 'nervous', 'worried'], [small, 'phone', 'smiling'], [dinners, 'phone', 'smiling'], [add, 'countOne', 'neutral'], [whole, 'emptyPockets', 'worried'], [crazy, 'shrug', 'neutral'], [lifestyle, 'facepalm', 'worried']]
  const hx = 360, hp = hand(f, hero, hx, 1190, 1.4)
  // # the monthly jar: coins leave it as each new cost is signed
  const jar = <g opacity={on(f, d930, 6) * (1 - on(f, crazy, 10)) * (1 - win(f, payment, small))}><Jar x={1700} y={600} s={0.9} fill={left / 930} label="+$930" /><Label x={1700} y={680} text={f >= d930 ? `$${left} LEFT` : ''} size={52} font="Bebas Neue" color={left > 0 ? P.ink : P.coralInk} /></g>
  const leave = (at: number, n: number, to: [number, number]) => Array.from({ length: n }, (_, k) => { const m = fly(f, at + k * 3, [1700, 470], to, 18, 120); return <Coin key={k} x={m.x} y={m.y} s={0.7} o={m.o} /> })
  return (
    <g>
      <Stage id="sc" frame={f} />
      <Headline f={f} lines={[[watch, 'WATCH IT HAPPEN', P.ink, 124], [reasonable, 'ONE REASONABLE DECISION AT A TIME', P.ink, 92], [d930, '+$930 A MONTH', P.mintInk, 130], [apartment, 'A NICER APARTMENT', P.ink, 120], [d400, '+$400 A MONTH', P.coralInk, 124], [earned, 'IT FEELS EARNED', P.ink, 120],
        [noise, 'THE OLD CAR MAKES A NOISE', P.ink, 110], [loan, 'A NEW LOAN', P.ink, 124], [d350, '+$350 A MONTH', P.coralInk, 124], [payment, 'THE PAYMENT ISN’T THE WHOLE COST', P.ink, 98], [d1070, 'AAA: ≈ $1,070 A MONTH TO OWN AND RUN', P.coralInk, 92],
        [higher, 'HIGHER INSURANCE, HIGHER RUNNING COSTS', P.ink, 88], [small, 'THEN THE SMALL THINGS', P.ink, 120], [d180, '+$180 A MONTH', P.coralInk, 124], [add, 'ADD IT UP', P.ink, 124], [d930b, '= $930: THE WHOLE RAISE', P.coralInk, 116], [crazy, 'NONE OF IT WAS CRAZY', P.ink, 116], [lifestyle, 'LIFESTYLE CREEP', P.goldInk, 140]]} />
      <g transform={camera(f, [[c("s34:exactly"), 960, 540, 1], [c("s34:choices"), 1200, 600, 1.05], [c("s31a:own"), 1000, 560, 1.03], [c("s31a:estimates"), 1300, 640, 1.06], [c("s31a:whole"), 960, 540, 1], [c("s28:decision"), 1200, 600, 1.05], [apartment, 1100, 640, 1.06], [d400, 1400, 560, 1.06], [noise, 960, 540, 1], [d350, 1300, 640, 1.06], [payment, 960, 540, 1], [d1070, 1200, 600, 1.06], [small, 960, 540, 1], [d180, 1400, 560, 1.06], [add, 960, 540, 1], [lifestyle, 1200, 600, 1.06]])}>
        <g opacity={on(f, watch, 6) * (1 - on(f, d930, 8))}>{['house', 'car', 'pizza'].map((id, k) => <g key={k} opacity={on(f, reasonable + k * 4, 6)} transform={`translate(${1000 + k * 260} 640) scale(${pop(f, reasonable + k * 4)})`}><rect x={-100} y={-120} width={200} height={240} rx={22} fill={P.card} /><Prop id={id} x={0} y={-30} size={110} f={f} /><Label x={0} y={90} text="?" size={70} font="Bebas Neue" color={P.goldInk} /></g>)}</g>
        {/* # A: the apartment upgrade, then the car trade-in */}
        <g opacity={A}>
          <g opacity={1 - on(f, old, 10)}>
            <g opacity={on(f, apartment, 6)} transform={`translate(1000 880) scale(${pop(f, apartment)})`}><House x={0} y={0} s={0.85} big={on(f, closer, 20)} color={f >= closer ? '#9AD9A8' : '#E9C25A'} /></g>
            <g opacity={on(f, closer, 6)} transform={`translate(1300 820) scale(${pop(f, closer) * 0.7})`}><Prop id="briefcase" x={0} y={0} size={120} f={f} /><Label x={0} y={110} text="CLOSER TO WORK" size={52} font="Bebas Neue" color={P.ink} /></g>
            {leave(d400, 4, [1000, 760])}
            <g opacity={on(f, d400, 6)} transform={`translate(1000 450) scale(${pop(f, d400)})`}><Bill x={0} y={0} text="RENT +$400" /></g>
          </g>
          <g opacity={on(f, old, 8)}>
            <g opacity={1 - on(f, trades + 10, 10)} transform="translate(1000 900) scale(0.7)"><Car x={0} y={0} old={on(f, noise, 10)} /></g>
            <g opacity={on(f, noise, 6) * (1 - on(f, trades, 8))} transform={`translate(1140 640) scale(${pop(f, noise)})`}><Prop id="exclamation" x={0} y={0} size={100} f={f} /></g>
            <g opacity={on(f, trades + 6, 8)} transform={`translate(${lerp(1500, 1040, easeOut(span(f, trades + 6, trades + 26)))} 900) scale(0.7)`}><Car x={0} y={0} color="#D95A4E" spin={(f - trades) / 18} /></g>
            {leave(d350, 4, [1040, 760])}
            <g opacity={on(f, loan, 6)} transform={`translate(1000 450) scale(${pop(f, loan)})`}><Bill x={0} y={0} text="LOAN +$350" /></g>
          </g>
        </g>
        {/* # B: the whole cost of a car — payment plus fuel, insurance, upkeep and lost value (AAA) */}
        <g opacity={B}>
          <g transform="translate(1000 940) scale(0.6)"><Car x={0} y={0} color="#D95A4E" /></g>
          {[[payment, 'LOAN INTEREST', P.coral], [fuel, 'FUEL', '#F2B84B'], [insurance, 'INSURANCE', '#7CC4F2'], [upkeep, 'UPKEEP', '#9AD9A8'], [loses, 'LOST VALUE', P.navy4]].map(([at, t, col], k) => (
            <g key={k} opacity={on(f, at as number, 6)} transform={`translate(0 ${-(1 - easeOut(span(f, at as number, (at as number) + 12))) * 80})`}><rect x={760} y={760 - k * 86} width={480} height={78} rx={12} fill={col as string} /><Label x={780} y={812 - k * 86} text={t as string} size={48} font="Bebas Neue" color={P.navy0} anchor="start" /></g>))}
          <g opacity={on(f, aaa, 6)} transform={`translate(1500 520) scale(${pop(f, aaa) * 0.85})`}><Stat x={0} y={0} big={f >= d1070 ? '≈ $1,070' : 'AAA'} small={f >= d1070 ? 'A MONTH, AVERAGE NEW CAR' : ''} w={560} /></g>
          <g opacity={on(f, higher, 6)} transform={`translate(1500 840) scale(${pop(f, higher) * 0.8})`}><Prop id="shield" x={-80} y={0} size={110} f={f} /><Prop id="arrow-up" x={60} y={0} size={100} f={f} /></g>
          <g opacity={on(f, running, 6)} transform={`translate(1500 960) scale(${pop(f, running) * 0.8})`}><Prop id="gas-pump" x={-80} y={0} size={100} f={f} /><Prop id="arrow-up" x={60} y={0} size={100} f={f} /></g>
          <Label x={1000} y={1050} text={f >= top31 ? '…ON TOP OF THE LOAN' : ''} size={48} font="Bebas Neue" color={P.ink} />
        </g>
        {/* # C: the small things, then the sum: 400 + 350 + 180 = 930 */}
        <g opacity={Cc}>
          <g opacity={1 - on(f, add, 10)}>
            {[[dinners, 'pizza', 'DINNERS OUT'], [subscriptions, 'laptop', 'SUBSCRIPTIONS'], [phone, 'phone', 'PHONE PLAN']].map(([at, id, t], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${880 + k * 260} 720) scale(${pop(f, at as number) * 0.9})`}><circle r={90} fill={P.card} /><Prop id={id as string} x={0} y={-6} size={120} f={f} /><Label x={0} y={150} text={t as string} size={46} font="Bebas Neue" color={P.ink} /></g>)}
            {leave(d180, 3, [1140, 720])}
          </g>
          <g opacity={on(f, add, 8)} transform="translate(1060 640)">
            {[[d400b, '$400', 'RENT'], [d350b, '$350', 'CAR'], [d180b, '$180', 'EXTRAS']].map(([at, v, t], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${-330 + k * 280} 0) scale(${pop(f, at as number)})`}><rect x={-110} y={-70} width={220} height={140} rx={20} fill={P.coral} /><Label x={0} y={10} text={v as string} size={80} font="Bebas Neue" color="#FFFFFF" /><Label x={0} y={56} text={t as string} size={40} font="Bebas Neue" color="#FFFFFF" />{k < 2 && <Label x={140} y={20} text="+" size={80} font="Bebas Neue" color={P.ink} />}</g>)}
            <g opacity={on(f, d930b, 6)} transform={`translate(0 230) scale(${pop(f, d930b)})`}><rect x={-230} y={-70} width={460} height={140} rx={22} fill={P.navy2} /><Label x={0} y={28} text="= $930" size={96} font="Bebas Neue" color="#FFFFFF" /></g>
          </g>
          <g opacity={on(f, lifestyle, 6)} transform={`translate(1560 420) scale(${pop(f, lifestyle)})`}><Prop id="seedling" x={0} y={0} size={160} f={f} /></g>
          <g opacity={on(f, common, 6) * (1 - on(f, lifestyle, 6))}>{Array.from({ length: 6 }, (_, k) => <Mini key={k} look={['hero', 'buyer', 'owner', 'worker', 'investor', 'hero'][k]} x={1420 + (k % 3) * 90} y={460 + Math.floor(k / 3) * 140} scale={0.6} frame={f} seed={k + 30} />)}</g>
        </g>
        {jar}
        <Person f={f} who="hero" beats={hero} x={hx} y={1190} s={1.4} life={2} />
        {f >= loan && f < payment && <path d={`M${hp.x - 6} ${hp.y + 4} l60 -70`} stroke={P.navy0} strokeWidth={12} strokeLinecap="round" />}
        {f >= small && f < add && <Phone x={hp.x + 160} y={hp.y + 10} s={1} r={8} o={on(f, small, 6)}><Label x={0} y={-80} text="ORDER" size={48} font="Bebas Neue" color={P.navy1} /><Label x={0} y={20} text="+ $" size={80} font="Bebas Neue" color="#D9483A" /></Phone>}
      </g>
      <Vignette id="sc" />
    </g>
  )
}

// ---------------------------------------------------------------- s35–s37a: force 3 makes it stick — a lease (often a year), a car loan (years), subscriptions (every month until cancelled); easy to spend, hard to un-spend: once signed, the costs arrive every month; cutting back = breaking a lease, selling a car, living with less — it feels like a loss
const Stick: React.FC<PieceProps> = ({ f, c }) => {
  const third = c('s35:third'), stick = c('s35:stick')
  const lease = c('s36:lease'), year = c('s36:year'), loan = c('s36:loan'), years = c('s36:years'), subscription = c('s36:subscription'), month = c('s36:month'), cancel = c('s36:cancel')
  const easy = c('s37:easy'), hard = c('s37:hard'), signed = c('s37:signed'), arrive = c('s37:arrive'), every = c('s37:every'), next = c('s37:next'), comes = c('s37:comes')
  const cutting = c('s37a:cutting'), breaking = c('s37a:breaking'), selling = c('s37a:selling'), living = c('s37a:living'), loss = c('s37a:loss'), right = c('s37a:right')
  const A = win(f, third, easy), B = win(f, easy, cutting), Cc = on(f, cutting, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [lease, 'signA', 'neutral', 'signB', 14], [subscription, 'phone', 'smiling'], [easy, 'thumbsUp', 'smiling'], [hard, 'push', 'angry'], [arrive, 'carryHeavy', 'worried'], [cutting, 'despair', 'worried'], [loss, 'slump', 'worried'], [right, 'nodA', 'neutral', 'nodB', 22]]
  const hp = hand(f, hero, 360, 1190, 1.4)
  return (
    <g>
      <Stage id="sk" frame={f} tint="teal" />
      <Headline f={f} lines={[[third, 'FORCE #3', P.goldInk, 130], [stick, 'IT STICKS', P.coralInk, 140], [lease, 'A LEASE: OFTEN A YEAR', P.ink, 116], [loan, 'A CAR LOAN: YEARS', P.ink, 120], [subscription, 'A SUBSCRIPTION: EVERY MONTH', P.ink, 106],
        [easy, 'EASY TO SPEND…', P.mintInk, 124], [hard, '…HARD TO UN-SPEND', P.coralInk, 124], [c('s37:once'), 'ONCE SIGNED…', P.ink, 124], [every, '…EVERY MONTH', P.coralInk, 130], [next, 'RAISE OR NOT', P.ink, 124], [cutting, 'CUTTING BACK LATER', P.ink, 120], [loss, 'FEELS LIKE A LOSS', P.coralInk, 124]]} />
      <g transform={camera(f, [[c("s37a:feels"), 960, 540, 1], [c("s37:once"), 1200, 600, 1.05], [c("s37a:feels"), 960, 540, 1], [c("s37:once"), 1200, 600, 1.05], [lease, 1100, 600, 1.06], [subscription, 1500, 600, 1.06], [easy, 960, 540, 1], [every, 1300, 640, 1.06], [cutting, 960, 540, 1], [loss, 1200, 620, 1.06]])}>
        {/* # A: three contracts with their lengths */}
        <g opacity={A}>
          <g opacity={on(f, third, 6) * (1 - on(f, stick, 8))} transform={`translate(1240 760) scale(${pop(f, third) * 1.3})`}><Shadow x={0} y={0} q={1} color={P.sky} /><Label x={0} y={50} text="3" size={60} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, lease, 6)} transform={`translate(860 660) rotate(-4) scale(${pop(f, lease) * 0.7})`}><Doc x={0} y={0} title="LEASE" lines={3} stamp={f >= year ? '12 MONTHS' : undefined} stampO={on(f, year, 6)} /></g>
          <g opacity={on(f, loan, 6)} transform={`translate(1180 660) rotate(3) scale(${pop(f, loan) * 0.7})`}><Doc x={0} y={0} title="CAR LOAN" lines={3} stamp={f >= years ? 'YEARS' : undefined} stampO={on(f, years, 6)} /></g>
          <g opacity={on(f, subscription, 6)} transform={`translate(1500 660) scale(${pop(f, subscription)})`}><circle r={150} fill={P.card} /><path d="M-70 -20 A80 80 0 1 1 -10 70" stroke={P.goldInk} strokeWidth={14} fill="none" transform={`rotate(${(f - subscription) * 4})`} />
            <Label x={0} y={20} text={f >= month ? 'MONTHLY' : ''} size={56} font="Bebas Neue" color={P.ink} /><Label x={0} y={200} text={f >= cancel ? 'UNTIL YOU CANCEL' : ''} size={48} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, stick, 6)} transform={`translate(${lerp(1240, 1700, on(f, lease, 12))} ${lerp(620, 330, on(f, lease, 12))}) scale(${pop(f, stick) * lerp(2, 1, on(f, lease, 12))})`}><Prop id="magnet" x={0} y={0} size={140} f={f} />
            <g opacity={1 - on(f, lease, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${-60 + k * 60} 110) rotate(${-10 + k * 10}) scale(0.25)`}><Bill x={0} y={0} /></g>)}</g></g>
        </g>
        {/* # B: a one-way door (easy in, hard out), then bills arriving month after month */}
        <g opacity={B}>
          <g opacity={1 - on(f, signed, 8)}>
            <rect x={1080} y={360} width={260} height={560} rx={16} fill={P.navy2} /><circle cx={1300} cy={640} r={14} fill={P.gold} />
            <path d="M880 640 H1060" stroke={P.mintInk} strokeWidth={14} opacity={on(f, easy, 6)} /><path d="M1040 610 L1080 640 L1040 670 Z" fill={P.mintInk} opacity={on(f, easy, 6)} />
            <path d="M1560 640 H1360" stroke={P.coralInk} strokeWidth={14} opacity={on(f, hard, 6)} strokeDasharray="20 16" /><path d="M1380 610 L1340 640 L1380 670 Z" fill={P.coralInk} opacity={on(f, hard, 6)} />
            <path d="M1590 610 L1650 670 M1650 610 L1590 670" stroke={P.coralInk} strokeWidth={12} strokeLinecap="round" opacity={on(f, hard, 6)} />
          </g>
          <g opacity={on(f, signed, 6)}>
            {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, signed + 6, 6)} transform={`translate(${860 + k * 170} 470) scale(0.8)`}><Calendar x={0} y={0} text={['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'][k]} s={1} /></g>)}
            {Array.from({ length: 6 }, (_, k) => { const at = arrive + k * 6; return <g key={k} opacity={on(f, at, 5)} transform={`translate(${860 + k * 170} ${lerp(470, 720, easeOut(span(f, at, at + 12)))}) scale(0.55)`}><Bill x={0} y={0} text="$930" /></g> })}
            <g opacity={on(f, comes, 6)} transform={`translate(1700 880) scale(${pop(f, comes) * 0.8})`}><Prop id="question" x={0} y={0} size={120} f={f} /><Label x={0} y={110} text="NEXT RAISE?" size={48} font="Bebas Neue" color={P.ink} /></g>
          </g>
        </g>
        {/* # C: cutting back — break the lease, sell the car, live with less */}
        <g opacity={Cc}>
          {[[breaking, 'LEASE', 'contract'], [selling, 'CAR', 'car'], [living, 'LESS', 'wallet']].map(([at, t, id], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${880 + k * 300} 660) scale(${pop(f, at as number)})`}>
            <circle r={110} fill={P.card} /><Prop id={id as string} x={0} y={-6} size={140} f={f} /><path d="M-80 -80 L80 80" stroke={P.coral} strokeWidth={12} strokeLinecap="round" opacity={on(f, (at as number) + 8, 4)} /><Label x={0} y={170} text={t as string} size={52} font="Bebas Neue" color={P.ink} /></g>)}
          <g opacity={on(f, loss, 6)} transform={`translate(1640 420) scale(${pop(f, loss)})`}><Prop id="arrow-down" x={0} y={0} size={140} f={f} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={360} y={1190} s={1.4} life={2} />
        {f >= lease && f < subscription && <path d={`M${hp.x - 6} ${hp.y + 4} l60 -70`} stroke={P.navy0} strokeWidth={12} strokeLinecap="round" />}
        {f >= arrive && f < cutting && Array.from({ length: Math.min(5, 1 + Math.floor((f - arrive) / 8)) }, (_, k) => <g key={k} transform={`translate(${hp.x - 40} ${hp.y - 20 - k * 40}) scale(0.45) rotate(${k % 2 ? 4 : -4})`}><Bill x={0} y={0} /></g>)}
      </g>
      <Vignette id="sk" />
    </g>
  )
}

// ---------------------------------------------------------------- s38–s45a: the gap decides — avg household ≈ $104,200 in, ≈ $78,500 out → gap ≈ $25,700 (income taxes still come out); middle spends ≈ 90¢ per pre-tax dollar, top ≈ 57¢; higher earners keep more on average, but only through the gap; lenders and landlords approve bigger rent and loans for bigger incomes
const Gap: React.FC<PieceProps> = ({ f, c }) => {
  const decides = c('s38:decides'), build = c('s38:build')
  const salary = c('s39:salary'), gap = c('s39:gap'), comes = c('s39:comes'), goes = c('s39:goes')
  const average = c('s40:average'), d1042 = c('s40:104200'), spent = c('s40:spent'), d785 = c('s40:78500')
  const leaves = c('s41:leaves'), d257 = c('s41:25700'), taxes = c('s41:taxes')
  const another = c('s42:another'), middle = c('s42:middle'), d90 = c('s42:90'), dollar = c('s42:dollar')
  const top = c('s43:top'), d57 = c('s43:57')
  const keep = c('s44:keep'), help = c('s44:help')
  const only = c('s45:only'), rises = c('s45:rises'), bills = c('s45:bills')
  const lenders = c('s45a:lenders'), landlords = c('s45a:landlords'), approved = c('s45a:approved'), rent = c('s45a:rent'), loan = c('s45a:loan')
  const A = win(f, decides, another), B = win(f, another, only), Cc = on(f, only, 10)
  const hero: Beat[] = [[0, 'think', 'thinking'], [salary, 'stop', 'neutral'], [gap, 'measure', 'neutral'], [average, 'idle', 'neutral'], [d257, 'pointUp', 'neutral'], [taxes, 'nervous', 'worried'], [another, 'explain', 'neutral'], [keep, 'thumbsUp', 'smiling'],
    [only, 'countOne', 'neutral'], [rises, 'shock', 'shocked'], [lenders, 'phone', 'neutral'], [approved, 'taDa', 'smiling']]
  const S = 900 / 104207
  return (
    <g>
      <Stage id="sp" frame={f} />
      <Headline f={f} lines={[[decides, 'WHAT DECIDES IT?', P.ink, 124], [salary, 'NOT THE SALARY', P.coralInk, 124], [gap, 'THE GAP', P.goldInk, 150], [d1042, 'AVERAGE HOUSEHOLD: ≈ $104,200 IN', P.ink, 96], [d785, '≈ $78,500 OUT', P.coralInk, 124], [d257, 'GAP ≈ $25,700', P.goldInk, 130], [taxes, '…BEFORE INCOME TAXES', P.ink, 116],
        [middle, 'MIDDLE GROUP: 90¢', P.ink, 124], [dollar, 'SPENT PER $1 EARNED', P.ink, 116], [d57, 'TOP GROUP: 57¢', P.mintInk, 130], [keep, 'HIGHER EARNERS DO KEEP MORE', P.mintInk, 104], [only, 'BUT ONLY THROUGH THE GAP', P.goldInk, 112], [bills, 'BIGGER SALARY, BIGGER BILLS', P.coralInk, 108], [approved, 'APPROVED FOR MORE', P.ink, 120]]} />
      <g transform={camera(f, [[c("s45a:also"), 1200, 600, 1.05], [c("s45a:easier"), 1300, 640, 1.06], [c("s45a:income"), 960, 540, 1], [c("s45:salary"), 1200, 600, 1.05], [c("s45:fast"), 1000, 560, 1.03], [c("s44:raise"), 1300, 640, 1.06], [c("s44:average"), 960, 540, 1], [c("s41:come"), 1200, 600, 1.05], [comes, 1240, 640, 1.06], [d1042, 960, 540, 1], [d257, 1500, 620, 1.08], [another, 960, 540, 1], [d57, 1400, 640, 1.06], [only, 960, 540, 1], [bills, 1200, 620, 1.06], [lenders, 960, 540, 1], [loan, 1400, 640, 1.06]])}>
        {/* # A: in vs out, and the gap between them */}
        <g opacity={A}>
          <g opacity={on(f, salary, 6) * (1 - on(f, gap, 8))} transform={`translate(1240 560) scale(${pop(f, salary)})`}><rect x={-240} y={-80} width={480} height={160} rx={22} fill={P.paper} /><Label x={0} y={26} text="SALARY" size={90} font="Bebas Neue" color={P.navy0} /><path d="M-220 -70 L220 70" stroke={P.coral} strokeWidth={14} strokeLinecap="round" /></g>
          <g opacity={on(f, comes, 6)}><Label x={760} y={490} text={f >= average ? 'EARNED (BEFORE TAX)' : 'COMES IN'} size={48} font="Bebas Neue" color={P.ink} anchor="start" /><rect x={760} y={510} width={(f >= d1042 ? 104207 * S : 900) * on(f, comes, 14)} height={110} rx={16} fill={P.sky} /><Label x={780} y={586} text={f >= d1042 ? '$104,200' : ''} size={64} font="Bebas Neue" color={P.navy0} anchor="start" /></g>
          <g opacity={on(f, goes, 6)}><Label x={760} y={690} text={f >= spent ? 'SPENT' : 'GOES OUT'} size={48} font="Bebas Neue" color={P.ink} anchor="start" /><rect x={760} y={710} width={(f >= d785 ? 78535 * S : 700) * on(f, goes, 14)} height={110} rx={16} fill={P.coral} /><Label x={780} y={786} text={f >= d785 ? '$78,500' : ''} size={64} font="Bebas Neue" color="#FFFFFF" anchor="start" /></g>
          <g opacity={on(f, leaves, 6)}><rect x={760 + 78535 * S} y={700} width={(104207 - 78535) * S} height={130} rx={16} fill="none" stroke={P.goldInk} strokeWidth={8} strokeDasharray="16 10" /><Label x={760 + 91371 * S} y={890} text={f >= d257 ? 'GAP ≈ $25,700' : ''} size={56} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, taxes, 6)} transform={`translate(${760 + 98000 * S} 970) scale(${pop(f, taxes) * 0.8})`}><Coin x={0} y={0} s={1.2} text="TAX" /></g>
          <g opacity={on(f, build, 6) * (1 - on(f, salary, 6))} transform={`translate(1240 640) scale(${pop(f, build)})`}><Jar x={0} y={160} s={1} fill={0.4} label="SAVINGS" /></g>
        </g>
        {/* # B: one pre-tax dollar each — the middle group spends 90¢ of it, the top group 57¢ */}
        <g opacity={B}>
          {[[middle, 'MIDDLE GROUP', 0.898, d90], [top, 'TOP GROUP', 0.568, d57]].map(([at, t, sh, at2], k) => { const x = 980 + k * 520
            return <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${x} 660) scale(${pop(f, at as number)})`}>
              <circle r={190} fill={P.gold} /><circle r={160} fill="none" stroke={P.goldD} strokeWidth={8} />
              {(() => { const a = Math.PI * 2 * (sh as number) * on(f, at2 as number, 16); return a > 0.01 ? <path d={`M0 0 L0 -190 A190 190 0 ${a > Math.PI ? 1 : 0} 1 ${Math.sin(a) * 190} ${-Math.cos(a) * 190} Z`} fill={P.coral} /> : null })()}
              <Label x={0} y={30} text={f >= (at2 as number) ? `${Math.round((sh as number) * 100)}¢` : '$1'} size={100} font="Bebas Neue" color="#FFFFFF" />
              <Label x={0} y={260} text={t as string} size={52} font="Bebas Neue" color={P.ink} /></g> })}
          <Label x={1240} y={400} text={f >= dollar ? 'SPENT OUT OF EACH $1 EARNED BEFORE TAX' : ''} size={48} font="Bebas Neue" color={P.ink2} />
          <g opacity={on(f, help, 6)} transform={`translate(1750 520) scale(${pop(f, help) * 0.8})`}><Tick x={0} y={0} o={1} r={50} /></g>
        </g>
        {/* # C: if spending rises as fast as income, the gap stays shut; lenders and landlords approve more */}
        <g opacity={Cc}>
          <g opacity={1 - on(f, lenders, 8)}>
            {[0, 1].map((k) => <g key={k}><rect x={760} y={520 + k * 200} width={lerp(500, 900, on(f, rises, 30)) * (k ? 0.96 : 1)} height={110} rx={16} fill={k ? P.coral : P.sky} /><Label x={780} y={596 + k * 200} text={k ? 'SPENDING' : 'INCOME'} size={56} font="Bebas Neue" color={k ? '#FFFFFF' : P.navy0} anchor="start" /></g>)}
            <Label x={1240} y={900} text={f >= bills ? 'THE GAP NEVER GROWS' : ''} size={60} font="Bebas Neue" color={P.coralInk} />
          </g>
          <g opacity={on(f, lenders, 8)}>
            {[[lenders, 'bank', 'LENDER', loan, 'BIGGER LOAN'], [landlords, 'house', 'LANDLORD', rent, 'BIGGER RENT']].map(([at, id, t, at2, t2], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${1000 + k * 480} 640) scale(${pop(f, at as number)})`}>
              <rect x={-200} y={-180} width={400} height={360} rx={26} fill={P.card} /><Prop id={id as string} x={0} y={-60} size={150} f={f} /><Label x={0} y={70} text={t as string} size={56} font="Bebas Neue" color={P.ink} />
              <g opacity={on(f, at2 as number, 6)}><Label x={0} y={140} text={t2 as string} size={46} font="Bebas Neue" color={P.goldInk} /></g></g>)}
            <Stamp x={1240} y={420} text="APPROVED" f={f} at={approved} color={P.mintInk} size={90} />
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={360} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="sp" />
    </g>
  )
}

// ---------------------------------------------------------------- s46–s50a: same salary, different places — not who earns more but what each does with the difference; Sam and coworker Jo, both $75,000; Sam's raise → rent, car loan, extras; Jo keeps the old place and car, auto-transfers the raise to savings on payday; a year later Jo has more than $11,000 saved, Sam has new bills; Jo just kept the gap open
const Twins: React.FC<PieceProps> = ({ f, c }) => {
  const same = c('s46:same'), different = c('s46:different'), places = c('s46:places')
  const earns = c('s46a:earns'), does = c('s46a:does'), difference = c('s46a:difference')
  const picture = c('s47:picture'), jo = c('s47:jo'), both = c('s47:both'), d75 = c('s47:75000')
  const sam48 = c('s48:sam'), rent = c('s48:rent'), car = c('s48:car'), extras = c('s48:extras')
  const kept = c('s49:kept'), apartment = c('s49:apartment'), oldcar = c('s49:car'), automatic = c('s49:automatic'), savings = c('s49:savings'), payday = c('s49:payday')
  const raise50 = c('s50:raise'), taxes = c('s50:taxes'), later = c('s50:later'), d11 = c('s50:11000'), saved = c('s50:saved'), bills = c('s50:bills')
  const single = c('s50a:single'), simply = c('s50a:simply'), gap = c('s50a:gap'), closing = c('s50a:closing')
  const sx = 520, jx = 1420
  const sam: Beat[] = [[0, 'idle', 'neutral'], [picture, 'waveA', 'smiling', 'waveB', 14], [sam48, 'carry', 'smiling'], [rent, 'signA', 'neutral', 'signB', 14], [later, 'carryHeavy', 'worried'], [bills, 'despair', 'worried'], [single, 'shrug', 'worried']]
  const joB: Beat[] = [[0, 'idle', 'neutral'], [jo, 'waveA', 'smiling', 'waveB', 14], [kept, 'confident', 'smug'], [automatic, 'phone', 'neutral'], [payday, 'thumbsUp', 'smiling'], [d11, 'celebrate', 'smiling'], [simply, 'hug', 'smiling']]
  const jp = hand(f, joB, jx, 1190, 1.35), sp = hand(f, sam, sx, 1190, 1.35)
  return (
    <g>
      <Stage id="sw" frame={f} />
      <Headline f={f} lines={[[same, 'SAME SALARY…', P.ink, 124], [different, '…DIFFERENT PLACES', P.goldInk, 124], [earns, 'NOT WHO EARNS MORE', P.ink, 120], [does, 'WHAT EACH DOES WITH IT', P.goldInk, 116], [jo, 'SAM AND JO', P.ink, 130], [d75, 'BOTH EARN $75,000', P.ink, 120],
        [sam48, 'SAM: RENT, CAR LOAN, EXTRAS', P.coralInk, 106], [kept, 'JO: SAME APARTMENT, SAME CAR', P.mintInk, 104], [automatic, 'RAISE → SAVINGS, ON PAYDAY', P.mintInk, 108], [later, 'A YEAR LATER', P.ink, 124], [d11, 'JO: $11,000+ SAVED', P.mintInk, 124], [bills, 'SAM: NEW BILLS', P.coralInk, 124], [c('s50a:single'), 'SAME PAY AS SAM', P.ink, 120], [simply, 'JO KEPT THE GAP OPEN', P.goldInk, 116]]} />
      <g transform={camera(f, [[c("s46a:person"), 960, 540, 1], [c("s46:two"), 1200, 600, 1.05], [earns, 960, 600, 1.04], [picture, 960, 540, 1], [rent, 700, 640, 1.06], [kept, 1240, 640, 1.06], [later, 960, 540, 1], [d11, 1300, 620, 1.06], [single, 960, 540, 1]])}>
        {/* # A dividing line and the two sides */}
        <rect x={956} y={300} width={8} height={760} rx={4} fill={P.navy4} opacity={on(f, picture, 8)} />
        {/* # the opening: two people on two paths */}
        <g opacity={on(f, c('s46'), 4) * (1 - on(f, picture, 8))}>
          <g transform="translate(960 640)"><Prop id="briefcase" x={0} y={0} size={160} f={f} /></g>
          <path d="M960 740 Q760 860 620 980" stroke={P.coralInk} strokeWidth={10} fill="none" opacity={on(f, different, 6)} /><path d="M960 740 Q1160 860 1300 980" stroke={P.mintInk} strokeWidth={10} fill="none" opacity={on(f, different, 6)} />
          <g opacity={on(f, difference, 6)} transform={`translate(960 430) scale(${pop(f, difference)})`}><Coin x={0} y={0} s={1.5} text="+" /></g>
        </g>
        {/* # Sam's side: rent, car loan, extras pile up */}
        <g opacity={on(f, sam48, 6)}>
          {[[rent, 'RENT +$400', 'house'], [car, 'LOAN +$350', 'car'], [extras, 'EXTRAS +$180', 'pizza']].map(([at, t, id], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${860} ${460 + k * 170}) scale(${pop(f, at as number) * 0.68})`}><rect x={-140} y={-60} width={280} height={120} rx={18} fill={P.card} /><Prop id={id as string} x={-80} y={0} size={80} f={f} /><Label x={40} y={18} text={(t as string).split(' ')[1]} size={60} font="Bebas Neue" color={P.coralInk} /></g>)}
          <Label x={800} y={1000} text={f >= bills ? 'NEW BILLS' : ''} size={56} font="Bebas Neue" color={P.coralInk} />
        </g>
        {/* # Jo's side: old place, old car, an automatic pipe from paycheck to the savings jar */}
        <g opacity={on(f, kept, 6)}>
          <g opacity={on(f, apartment, 6)} transform="translate(1130 520) scale(0.45)"><House x={0} y={0} /></g>
          <g opacity={on(f, oldcar, 6)} transform="translate(1130 640) scale(0.3)"><Car x={0} y={0} color="#7CC4F2" /></g>

          <Jar x={1720} y={1000} s={0.9} fill={0.08 + 0.85 * on(f, later, 50)} label="SAVINGS" o={on(f, savings, 6)} color={P.mint} />
          <Label x={1720} y={720} text={f >= d11 ? '$11,000+' : ''} size={70} font="Bebas Neue" color={P.mintInk} />
        </g>
        <g opacity={on(f, both, 6) * (1 - on(f, sam48, 8))}>{[sx + 230, jx + 230].map((x, k) => <g key={k} transform={`translate(${x} 420) scale(${pop(f, d75) * 0.7})`}><rect x={-150} y={-50} width={300} height={100} rx={16} fill={P.paper} /><Label x={0} y={22} text={f >= d75 ? '$75,000' : ''} size={64} font="Bebas Neue" color={P.navy0} /></g>)}</g>
        <g opacity={on(f, gap, 6)} transform={`translate(1240 360) scale(${pop(f, gap)})`}><rect x={-200} y={-50} width={400} height={100} rx={16} fill="none" stroke={P.goldInk} strokeWidth={8} strokeDasharray="16 10" /><Label x={0} y={20} text={f >= closing ? 'GAP: OPEN' : 'GAP'} size={60} font="Bebas Neue" color={P.goldInk} /></g>
        <Person f={f} who="hero" beats={sam} x={sx} y={1190} s={1.35} life={2} o={on(f, c('s46'), 4)} />
        <Person f={f} who="buyer" beats={joB} x={jx} y={1190} s={1.35} life={9} o={on(f, c('s46'), 4)} />
        <g opacity={on(f, automatic, 6)}><path d={`M1130 760 Q1300 760 1660 ${760}`} stroke={P.mintInk} strokeWidth={12} fill="none" strokeDasharray="22 14" strokeDashoffset={-(f - automatic) * 3} />
            {Array.from({ length: 4 }, (_, k) => { const p = ((f - payday) / 36 + k / 4) % 1; return f > payday ? <Coin key={k} x={lerp(1130, 1660, p)} y={760} s={0.55} o={Math.sin(p * Math.PI)} /> : null })}</g>
        {f >= taxes && f < later + 4 && <g opacity={on(f, taxes, 6)}>{[sx, jx].map((x, k) => <g key={k} transform={`translate(${x + 200} 330) scale(0.7)`}><Coin x={0} y={0} s={1} text="TAX" /></g>)}</g>}
        {f >= automatic && f < later && <Phone x={1700} y={440} s={0.7} r={6} o={on(f, automatic, 6)}><Label x={0} y={-80} text="AUTO" size={52} font="Bebas Neue" color={P.navy1} /><Label x={0} y={10} text="SAVE" size={60} font="Bebas Neue" color="#1E9A63" /><Label x={0} y={100} text="PAYDAY" size={44} font="Bebas Neue" color={P.navy1} /></Phone>}
        {f >= later && f < single && Array.from({ length: 3 }, (_, k) => <g key={k} opacity={on(f, later + k * 4, 5)} transform={`translate(${sp.x + 90} ${sp.y + 10 - k * 36}) scale(0.4) rotate(${k % 2 ? 4 : -4})`}><Bill x={0} y={0} /></g>)}
      </g>
      <Vignette id="sw" />
    </g>
  )
}

// ---------------------------------------------------------------- s51–s57a: Jo's trick was timing, not willpower — money that never lands in checking is harder to spend; decided once, the day the raise arrived; the big repeating costs (home, car) matter most — $5 coffee vs $400 rent every month; some split each raise in advance (e.g. half and half); enjoying some is fine — the problem is spending it by accident; choose how much of the gap to give up
const Count: React.FC<PieceProps> = ({ f, c }) => {
  const trick = c("s51:jo's"), willpower = c('s51:willpower'), timing = c('s51:timing')
  const never = c('s52:never'), lands = c('s52:lands'), checking = c('s52:checking'), harder = c('s52:harder')
  const decided = c('s53:decided'), once = c('s53:once'), day = c('s53:day'), habit = c('s53:habit'), claim = c('s53:claim')
  const biggest = c('s54:biggest'), home = c('s54:home'), car = c('s54:car'), matter = c('s54:matter'), repeat = c('s54:repeat'), years = c('s54:years')
  const d5 = c('s55:5'), coffee = c('s55:coffee'), d400 = c('s55:400'), rent = c('s55:rent'), again = c('s55:again'), automatically = c('s55:automatically')
  const advance = c('s55a:advance'), split = c('s55a:split'), half = c('s55a:half'), savings = c('s55a:savings'), spending = c('s55a:spending'), better = c('s55a:better')
  const none = c('s56:none'), enjoy = c('s56:enjoy'), fine = c('s56:fine')
  const matters = c('s56a:matters'), wasted = c('s56a:wasted'), problem = c('s56a:problem'), accident = c('s56a:accident')
  const choose = c('s57:choose'), gap = c('s57:gap'), disappear = c('s57:disappear'), decision = c('s57:decision')
  const half57 = c('s57a:half'), feel = c('s57a:feel'), growing = c('s57a:growing')
  const A = win(f, trick, biggest), B = win(f, biggest, advance), Cc = win(f, advance, choose), D = on(f, choose, 10)
  const jo: Beat[] = [[0, 'idle', 'smiling'], [willpower, 'push', 'angry'], [timing, 'countOne', 'smiling'], [never, 'explain', 'neutral'], [decided, 'signA', 'neutral', 'signB', 14], [claim, 'confident', 'smug'],
    [biggest, 'measure', 'neutral'], [coffee, 'hold', 'smiling'], [rent, 'shock', 'shocked'], [advance, 'weighA', 'thinking', 'weighB', 22], [better, 'thumbsUp', 'smiling'], [enjoy, 'celebrate', 'smiling'], [matters, 'hug', 'smiling'], [accident, 'oops', 'shocked'], [choose, 'confident', 'smug'], [growing, 'jump', 'smiling']]
  const jp = hand(f, jo, 380, 1190, 1.4)
  return (
    <g>
      <Stage id="sn" frame={f} tint="teal" />
      <Headline f={f} lines={[[trick, 'JO’S TRICK', P.ink, 130], [willpower, 'NOT WILLPOWER', P.coralInk, 124], [timing, 'TIMING', P.goldInk, 150], [never, 'MONEY THAT NEVER LANDS…', P.ink, 110], [harder, '…IS HARDER TO SPEND', P.mintInk, 116], [once, 'DECIDED ONCE', P.ink, 124], [day, 'ON DAY ONE', P.goldInk, 124], [habit, 'BEFORE A NEW HABIT CLAIMS IT', P.ink, 100],
        [biggest, 'THE BIG COSTS MATTER MOST', P.ink, 110], [repeat, 'THEY REPEAT FOR YEARS', P.coralInk, 116], [d5, '$5 COFFEE: NICE', P.ink, 124], [d400, '$400 RENT: EVERY MONTH', P.mintInk, 116], [advance, 'DECIDE IN ADVANCE', P.ink, 124], [split, 'SPLIT EACH RAISE IN ADVANCE', P.ink, 104], [half, 'HALF TO SAVINGS…', P.mintInk, 124], [spending, '…HALF TO SPENDING', P.goldInk, 124],
        [none, 'ENJOYING A RAISE IS FINE', P.mintInk, 116], [problem, 'THE PROBLEM:', P.ink, 124], [accident, 'SPENT BY ACCIDENT', P.coralInk, 124], [choose, 'CHOOSE YOUR GAP', P.goldInk, 130], [growing, 'A GAP THAT KEEPS GROWING', P.mintInk, 110]]} />
      <g transform={camera(f, [[c("s57a:still"), 1200, 600, 1.05], [c("s57a:raise"), 1000, 560, 1.03], [c("s57:instead"), 1300, 640, 1.06], [c("s56a:something"), 960, 540, 1], [c("s54:also"), 1200, 600, 1.05], [never, 1240, 600, 1.06], [day, 960, 540, 1], [coffee, 1100, 620, 1.06], [again, 960, 540, 1], [half, 1240, 620, 1.06], [none, 960, 540, 1], [accident, 1300, 620, 1.06], [choose, 960, 540, 1], [growing, 1240, 620, 1.06]])}>
        {/* # A: not willpower (a flexed arm, crossed) but timing (a clock); a pipe that sends the raise to savings before checking; day one */}
        <g opacity={A}>
          <g opacity={on(f, willpower, 6) * (1 - on(f, never, 8))} transform={`translate(1000 600) scale(${pop(f, willpower)})`}><circle r={110} fill={P.card} /><Prop id="trophy" x={0} y={-6} size={130} f={f} /><path d="M-80 -80 L80 80" stroke={P.coral} strokeWidth={12} strokeLinecap="round" opacity={on(f, willpower + 8, 4)} /><Label x={0} y={170} text="WILLPOWER" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, timing, 6) * (1 - on(f, never, 8))} transform={`translate(1460 600) scale(${pop(f, timing)})`}><circle r={110} fill={P.gold} /><Prop id="clock" x={0} y={-6} size={140} f={f} /><Label x={0} y={170} text="TIMING" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, never, 8)}>
            <rect x={760} y={560} width={260} height={150} rx={18} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={5} /><Label x={890} y={652} text="PAYCHECK" size={50} font="Bebas Neue" color="#1F5A2E" />
            <path d="M1020 635 H1180 Q1220 635 1220 595 V470 H1480" stroke={P.mintInk} strokeWidth={22} fill="none" opacity={on(f, never, 6)} />
            <path d="M1220 680 V800 H1480" stroke={P.navy4} strokeWidth={22} fill="none" opacity={on(f, checking, 6) * 0.6} />
            <g opacity={on(f, lands, 6)}><Jar x={1600} y={560} s={0.6} fill={0.3 + 0.4 * on(f, harder, 30)} label="SAVINGS" color={P.mint} /></g>
            <g opacity={on(f, checking, 6)} transform="translate(1600 830)"><rect x={-110} y={-60} width={220} height={120} rx={16} fill={P.card} /><Label x={0} y={16} text="CHECKING" size={46} font="Bebas Neue" color={P.ink} /></g>
            {Array.from({ length: 4 }, (_, k) => { const p = ((f - never) / 40 + k / 4) % 1; return f > never ? <Coin key={k} x={p < 0.5 ? lerp(1020, 1220, p * 2) : lerp(1220, 1480, p * 2 - 1)} y={p < 0.5 ? 635 : 470} s={0.55} o={Math.sin(p * Math.PI)} /> : null })}
            <g opacity={on(f, day, 6)} transform={`translate(890 400) scale(${pop(f, day) * 0.7})`}><Calendar x={0} y={0} text="DAY 1" s={1.2} /></g>
          </g>
        </g>
        {/* # B: the big repeating costs vs the small one-offs — $5 coffee once vs $400 rent every month */}
        <g opacity={B}>
          <g opacity={on(f, home, 6) * (1 - on(f, d5, 8))} transform={`translate(1000 860) scale(${pop(f, home)})`}><House x={0} y={0} s={0.9} /></g>
          <g opacity={on(f, car, 6) * (1 - on(f, d5, 8))} transform={`translate(1500 900) scale(${pop(f, car) * 0.5})`}><Car x={0} y={0} /></g>
          <g opacity={on(f, repeat, 6) * (1 - on(f, d5, 8))}>{Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, repeat + k * 2, 4)} transform={`translate(${880 + k * 150} 430) scale(0.6)`}><Calendar x={0} y={0} text={`${k + 1}`} s={1} /></g>)}</g>
          <g opacity={on(f, d5, 6)}>
            <g transform={`translate(1000 640) scale(${pop(f, d5)})`}><Prop id="coffee-cup" x={0} y={0} size={160} f={f} /><Label x={0} y={140} text="$5 · ONCE" size={56} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, d400, 6)} transform={`translate(1480 640) scale(${pop(f, d400)})`}><House x={0} y={70} s={0.6} /><Label x={0} y={140} text="$400 · MONTHLY" size={56} font="Bebas Neue" color={P.mintInk} /></g>
            {Array.from({ length: 12 }, (_, k) => <Coin key={k} x={1300 + (k % 6) * 72} y={880 + Math.floor(k / 6) * 70} s={0.6} o={on(f, again + k * 2, 4)} text="$400" />)}
          </g>
        </g>
        {/* # C: a raise split in advance, half and half; enjoying a raise is fine — spending by accident is the problem */}
        <g opacity={Cc}>
          <g opacity={1 - on(f, none, 8)} transform="translate(1240 640)">
            <circle r={220} fill={P.navy3} opacity={on(f, advance, 6) * 0.8} /><Label x={0} y={28} text={f >= advance && f < half ? 'RAISE' : ''} size={84} font="Bebas Neue" color="#FFFFFF" />
            {on(f, half, 4) > 0 && <path d={`M0 0 L0 -220 A220 220 0 0 1 0 220 Z`} fill={P.mint} opacity={on(f, half, 8)} />}
            {on(f, spending, 4) > 0 && <path d={`M0 0 L0 220 A220 220 0 0 1 0 -220 Z`} fill={P.gold} opacity={on(f, spending, 8)} />}
            <Label x={110} y={20} text={f >= savings ? 'SAVE' : ''} size={64} font="Bebas Neue" color="#FFFFFF" /><Label x={-110} y={20} text={f >= spending ? 'SPEND' : ''} size={64} font="Bebas Neue" color={P.navy0} />
            <Label x={0} y={290} text={f >= advance ? 'THE RAISE, PLANNED AHEAD' : ''} size={50} font="Bebas Neue" color={P.ink} />
          </g>
          <g opacity={on(f, none, 8)}>
            <g opacity={on(f, none, 6)} transform={`translate(1000 640) scale(${pop(f, none)})`}><circle r={120} fill={P.mint} /><path d="M-50 0 l34 36 l70 -76" stroke="#FFFFFF" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
            <g opacity={on(f, matters, 6)} transform={`translate(1000 880) scale(${pop(f, matters) * 0.8})`}><Label x={0} y={0} text="ON PURPOSE" size={64} font="Bebas Neue" color={P.mintInk} /></g>
            <g opacity={on(f, problem, 6)} transform={`translate(1500 640) scale(${pop(f, problem)})`}><circle r={120} fill={P.coral} /><Prop id="dominoes" x={0} y={0} size={150} f={f} /></g>
            <g opacity={on(f, accident, 6)} transform={`translate(1500 880) scale(${pop(f, accident) * 0.8})`}><Label x={0} y={0} text="BY ACCIDENT" size={64} font="Bebas Neue" color={P.coralInk} /></g>
          </g>
        </g>
        {/* # D: a gap dial — Jo turns it; a half-saved raise and a gap that keeps growing */}
        <g opacity={D}>
          <g transform="translate(1240 700)">
            <path d="M-260 0 A260 260 0 0 1 260 0" fill="none" stroke={P.navy3} strokeWidth={50} />
            {(() => { const a = Math.PI * lerp(0.15, 0.5, on(f, gap, 20)) * (f >= disappear && f < half57 ? 1 - 0.7 * on(f, disappear, 30) : 1) + Math.PI * 0.2 * on(f, growing, 30); return <g><path d={`M-260 0 A260 260 0 0 1 ${-Math.cos(a) * 260} ${-Math.sin(a) * 260}`} fill="none" stroke={P.mint} strokeWidth={50} /><path d={`M0 0 L${-Math.cos(a) * 200} ${-Math.sin(a) * 200}`} stroke={P.ink} strokeWidth={12} strokeLinecap="round" /></g> })()}
            <circle r={22} fill={P.ink} /><Label x={0} y={90} text="GAP" size={70} font="Bebas Neue" color={P.goldInk} />
          </g>
          <g opacity={on(f, feel, 6)} transform={`translate(1660 420) scale(${pop(f, feel)})`}><Prop id="seedling" x={0} y={0} size={150} f={f} /></g>
          <g opacity={on(f, decision, 6) * (1 - on(f, half57, 8))}>{Array.from({ length: 5 }, (_, k) => <Coin key={k} x={1500 + k * 60} y={980} s={0.6} o={1 - on(f, disappear + k * 5, 10)} />)}</g>
        </g>
        <Person f={f} who="buyer" beats={jo} x={380} y={1190} s={1.4} life={9} />
        {f >= coffee && f < rent && <g transform={`translate(${jp.x + 20} ${jp.y - 30})`}><Prop id="coffee-cup" x={0} y={0} size={90} f={f} /></g>}
      </g>
      <Vignette id="sn" />
    </g>
  )
}

// ---------------------------------------------------------------- s58–s63: why a higher salary can still leave you broke — taxes take a slice of every extra dollar; spending rises with income; monthly costs are easy to sign, hard to undo; together they turn a raise into a lifestyle; the salary is the headline, the gap is the story; same pay, one gets richer, one gets busier paying bills; your real raise = how much wider the gap becomes
const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const why = c('s58:why'), higher = c('s58:higher'), broke = c('s58:broke')
  const taxes = c('s59:taxes'), slice = c('s59:slice'), extra = c('s59:extra')
  const spending = c('s60:spending'), rise = c('s60:rise')
  const monthly = c('s61:monthly'), sign = c('s61:sign'), undo = c('s61:undo')
  const mistake = c('s61a:mistake'), together = c('s61a:together'), raise = c('s61a:raise'), lifestyle = c('s61a:lifestyle')
  const salary = c('s62:salary'), headline = c('s62:headline'), gap = c('s62:gap'), story = c('s62:story')
  const two = c('s62a:two'), richer = c('s62a:richer'), busier = c('s62a:busier'), bills = c('s62a:bills')
  const real = c('s63:real'), number = c('s63:number'), letter = c('s63:letter'), wider = c('s63:wider'), becomes = c('s63:becomes')
  const A = win(f, why, salary), B = win(f, salary, two), Cc = win(f, two, real), D = on(f, real, 10)
  const hero: Beat[] = [[0, 'scratchHead', 'thinking'], [taxes, 'countOne', 'neutral'], [spending, 'explain', 'neutral'], [monthly, 'signA', 'neutral', 'signB', 14], [together, 'shrug', 'worried'], [salary, 'idle', 'neutral'], [gap, 'measure', 'smiling'], [two, 'idle', 'neutral'], [real, 'read', 'thinking'], [wider, 'taDa', 'smiling']]
  return (
    <g>
      <Stage id="sy" frame={f} />
      <Headline f={f} lines={[[why, 'SO WHY CAN MORE PAY…', P.ink, 116], [broke, '…STILL LEAVE YOU BROKE?', P.coralInk, 116], [taxes, '1. TAX TAKES A SLICE', P.ink, 120], [spending, '2. SPENDING RISES WITH INCOME', P.ink, 104], [monthly, '3. EASY TO SIGN, HARD TO UNDO', P.ink, 104],
        [together, 'TOGETHER…', P.ink, 130], [lifestyle, 'A RAISE BECOMES A LIFESTYLE', P.coralInk, 110], [headline, 'SALARY: THE HEADLINE', P.ink, 124], [story, 'THE GAP: THE STORY', P.goldInk, 130], [richer, 'ONE GETS RICHER…', P.mintInk, 124], [busier, '…ONE GETS BUSIER', P.coralInk, 124], [real, 'YOUR REAL RAISE', P.goldInk, 140], [wider, 'HOW MUCH WIDER THE GAP GETS', P.mintInk, 108]]} />
      <g transform={camera(f, [[c("s62a:one"), 960, 540, 1], [c("s62a:earn"), 1200, 600, 1.05], [taxes, 1000, 640, 1.06], [spending, 1240, 640, 1.06], [monthly, 1480, 640, 1.06], [together, 960, 540, 1], [story, 1300, 620, 1.06], [two, 960, 540, 1], [wider, 1240, 620, 1.06]])}>
        <g opacity={on(f, why, 6) * (1 - on(f, taxes, 8))}><g transform={`translate(1060 560) rotate(-4) scale(${pop(f, why) * 0.8})`}><rect x={-230} y={-80} width={460} height={160} rx={22} fill={P.mint} /><Label x={0} y={30} text={f >= higher ? "$75,000" : "SALARY"} size={100} font="Bebas Neue" color="#FFFFFF" /></g><g opacity={on(f, broke, 6)}><Jar x={1500} y={880} s={1} fill={0.05} label="SAVINGS" /></g></g>
        {/* # A: the three forces as three panels, then they merge into a "lifestyle" */}
        <g opacity={A}>
          {[[taxes, 'TAX', P.coral, 'interest-percent'], [spending, 'SPENDING', P.gold, 'shopping-bag'], [monthly, 'CONTRACTS', P.sky, 'contract']].map(([at, t, col, id], k) => { const m = on(f, together, 20)
            return <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${lerp(1000 + k * 300, 1060 + k * 240, m)} ${lerp(640, 560, m)}) scale(${pop(f, at as number) * lerp(1, 0.8, m)})`}>
              <rect x={-130} y={-150} width={260} height={300} rx={26} fill={col as string} /><Prop id={id as string} x={0} y={-40} size={130} f={f} /><Label x={0} y={100} text={t as string} size={52} font="Bebas Neue" color={P.navy0} /></g> })}
          <g opacity={on(f, slice, 6) * (1 - on(f, spending, 8))}>{Array.from({ length: 3 }, (_, k) => <Coin key={k} x={900 + k * 90} y={900} s={0.7} text={f >= extra ? '$' : ''} />)}</g>
          <g opacity={on(f, rise, 6) * (1 - on(f, monthly, 8))} transform="translate(1300 900)"><Prop id="arrow-up" x={0} y={0} size={110} f={f} /></g>
          <g opacity={on(f, undo, 6) * (1 - on(f, together, 8))} transform="translate(1600 900)"><Prop id="padlock" x={0} y={0} size={110} f={f} /></g>
          <g opacity={on(f, mistake, 6) * (1 - on(f, together, 8))} transform="translate(1300 360)"><Tick x={0} y={0} o={1} r={44} /></g>
          <g opacity={on(f, raise, 6)} transform={`translate(1300 900) scale(${pop(f, raise)})`}><rect x={-230} y={-50} width={460} height={100} rx={18} fill={P.card} /><Label x={0} y={18} text={f >= lifestyle ? 'RAISE → LIFESTYLE' : 'RAISE'} size={60} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # B: a newspaper headline (salary) vs the story underneath (the gap) */}
        <g opacity={B}>
          <g transform={`translate(1240 640) scale(${pop(f, salary)})`}>
            <rect x={-340} y={-260} width={680} height={520} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={3} />
            <Label x={0} y={-160} text={f >= headline ? 'SALARY: $75,000' : 'SALARY'} size={84} font="Bebas Neue" color={P.navy0} />
            <rect x={-280} y={-120} width={560} height={8} fill={P.navy0} />
            {Array.from({ length: 5 }, (_, k) => <rect key={k} x={-280} y={-80 + k * 44} width={k === 2 ? 300 : 560} height={14} rx={7} fill="#C8B994" opacity={1 - on(f, gap, 8) * 0.6} />)}
            <g opacity={on(f, gap, 6)}><rect x={-250} y={20} width={500} height={150} rx={18} fill="none" stroke={P.goldInk} strokeWidth={10} strokeDasharray="20 12" /><Label x={0} y={120} text={f >= story ? 'THE GAP' : ''} size={96} font="Bebas Neue" color={P.goldInk} /></g>
          </g>
        </g>
        {/* # C: two people, same pay: one jar grows, one pile of bills grows */}
        <g opacity={Cc}>
          <Person f={f} who="buyer" beats={[[0, 'idle', 'smiling'], [richer, 'celebrate', 'smiling']]} x={1480} y={1190} s={1.3} flip life={9} />
          <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [busier, 'carryHeavy', 'worried'], [bills, 'despair', 'worried']]} x={640} y={1190} s={1.3} life={2} />
          <Jar x={1260} y={880} s={0.85} fill={0.2 + 0.7 * on(f, richer, 40)} label="SAVINGS" color={P.mint} />
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, busier + k * 4, 5)} transform={`translate(900 ${900 - k * 46}) scale(0.55) rotate(${k % 2 ? 5 : -5})`}><Bill x={0} y={0} text={f >= bills ? 'BILL' : ''} /></g>)}
        </g>
        {/* # D: the offer letter fades; the gap opens wider */}
        <g opacity={D}>
          <g opacity={on(f, number, 6) * (1 - on(f, wider, 10) * 0.6)} transform={`translate(1000 640) rotate(-4) scale(${pop(f, number) * 0.7})`}><Doc x={0} y={0} title="OFFER" lines={3} stamp={f >= letter ? '$75,000' : undefined} stampO={on(f, letter, 6)} /></g>
          <g opacity={on(f, real, 6)}>
            <Label x={1260} y={500} text="INCOME" size={48} font="Bebas Neue" color={P.ink} anchor="start" /><rect x={1260} y={520} width={540} height={90} rx={16} fill={P.sky} />
            <Label x={1260} y={680} text="SPENDING" size={48} font="Bebas Neue" color={P.ink} anchor="start" /><rect x={1260} y={700} width={lerp(470, 300, on(f, wider, 30))} height={90} rx={16} fill={P.coral} />
            <rect x={1260 + lerp(470, 300, on(f, wider, 30))} y={694} width={540 - lerp(470, 300, on(f, wider, 30))} height={102} rx={16} fill="none" stroke={P.goldInk} strokeWidth={8} strokeDasharray="16 10" />
            <Label x={1260 + (lerp(470, 300, on(f, wider, 30)) + 540) / 2} y={860} text={f >= becomes ? 'GAP' : ''} size={70} font="Bebas Neue" color={P.goldInk} />
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={380} y={1190} s={1.4} life={2} o={1 - Cc} />
      </g>
      <Vignette id="sy" />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const SALARY = [
  makePiece('salary-hook', 'Long: Sam’s raise 60k → 75k; savings flat a year later; 63% could cover $400 with cash (68% in 2021); three quiet forces', { mood: 'light', Component: Hook,
    beats: ["s6:none", "s6:clearly", "s5a:since", "s3:exactly", ...beat('s1', ['sam', 'raise', '60000', '75000']), ...beat('s2', ['15000', 'every']), ...beat('s3', ['later', 'savings', 'same']), ...beat('s3a', ['big', 'disaster', 'moment', 'went']), ...beat('s4', ['where', 'go']), ...beat('s5', ['unusual', 'federal', '63', 'adults', '400', 'cash']), ...beat('s5a', ['back', '68', 'slipped', 'stuck']), ...beat('s6', ['bigger', 'breathing', 'three', 'forces', 'offer', 'letter'])],
    sfx: [['s1:raise', 'chime', 0.5], ['s1:75000', 'impact', 0.5], ['s2:15000', 'coin', 0.4], ['s3:same', 'thud', 0.4], ['s4:where', 'riser', 0.4], ['s5:63', 'ding', 0.4], ['s5a:stuck', 'thud', 0.4], ['s6:three', 'whoosh', 0.4]] }),
  makePiece('salary-tax', 'Long: force 1 is tax — the bracket myth; tax in layers = buckets that fill and spill; 2026 single 10/12/22% (22% above $50,400 taxable); new dollars hit the top rate', { mood: 'dark', Component: Tax,
    beats: ["s10:income", "s10:charged", "s11:after", "s10a:picture", "s9:works", "s8:many", ...beat('s7', ['first', 'arrives', 'reaches', 'account']), ...beat('s8', ['tax', 'differently']), ...beat('s9', ['fear', 'push', 'higher', 'bracket', 'less', 'not']), ...beat('s10', ['layers', 'rate', 'slice', 'band']), ...beat('s10a', ['water', 'buckets', 'fills', 'spills', 'next', 'own']), ...beat('s10b', ['only', 'taxed', 'nothing', 'lower', 'again']), ...beat('s11', ['single', '10', '12', '22', 'taxable', 'standard', '50400']), ...beat('s12', ['moving', 'never', 'smaller', 'dollars', 'top', 'highest'])],
    sfx: [['s8:tax', 'crack', 0.5], ['s9:not', 'thud', 0.5], ['s10a:spills', 'swish', 0.4], ['s11:50400', 'ding', 0.4], ['s12:never', 'chime', 0.4]] }),
  makePiece('salary-taxmath', 'Long: Sam’s raise: +$2,650 federal tax; +$1,150 payroll (7.65%); ≈ $11,200 left before state tax; ≈ $930 a month', { mood: 'light', Component: TaxMath,
    beats: ["s17:explains", "s17:money", "s16:raise", "s15a:places", "s15a:own", "s13:sam", ...beat('s13', ['15000', '2650', 'federal']), ...beat('s13a', ['part', 'fits', '12', '8500', 'spills', '22']), ...beat('s14', ['social', 'medicare', '765', '1150']), ...beat('s14a', ['fund', 'benefits', 'coverage', 'retirement', '62', '184500', '145', 'every']), ...beat('s15', ['leaves', '11200', 'state']), ...beat('s15a', ['most', 'states', 'bigger']), ...beat('s16', ['spread', '930', 'month']), ...beat('s17', ['still', 'part', 'mystery'])],
    sfx: [['s13:2650', 'crack', 0.5], ['s14:1150', 'crack', 0.4], ['s15:11200', 'ding', 0.5], ['s15a:bigger', 'thud', 0.4], ['s16:930', 'chime', 0.5]] }),
  makePiece('salary-groups', 'Long: force 2 — BLS: five income groups; middle 74.5k/66.9k, next 121.5k/90k (+47k in, +23k out), top 264.5k/150.3k; earn more → spend more', { mood: 'light', Component: Groups,
    beats: ["s20a:each", "s25:picture", "s23:households", "s21:tax", "s20a:earners", "s20a:households", "s18:happens", ...beat('s18', ['second', 'bigger', 'payday']), ...beat('s19', ['bureau', 'thousands', 'households', 'earn', 'spend']), ...beat('s20', ['line', 'lowest', 'highest', 'split', 'five', 'pattern']), ...beat('s20a', ['same', 'left', 'right']), ...beat('s21', ['middle', '74500', 'spent', '66900']), ...beat('s22', ['next', '121500', '90000']), ...beat('s23', ['47000', '23000', 'half']), ...beat('s24', ['top', '264500', '150300', 'four', 'lowest']), ...beat('s25', ['different', 'same', 'clear', 'earns', 'tends'])],
    sfx: [['s19:bureau', 'pop', 0.4], ['s20:five', 'swish', 0.4], ['s21:66900', 'pop', 0.4], ['s22:90000', 'pop', 0.4], ['s23:half', 'ding', 0.5], ['s24:150300', 'impact', 0.5], ['s25:tends', 'riser', 0.4]] }),
  makePiece('salary-home', 'Long: the biggest item is home (≈ $26,300, a third); transportation ≈ $13,300; where a raise goes most easily', { mood: 'dark', Component: Home,
    beats: ["s27:came", "s26:everything", ...beat('s26', ['biggest', 'home', 'average', '26300', 'housing', 'third']), ...beat('s27', ['transportation', '13300', 'owning', 'cars']), ...beat('s27a', ['two', 'easiest', 'raise', 'income', 'bigger', 'newer', 'affordable'])],
    sfx: [['s26:home', 'pop', 0.4], ['s26:third', 'swish', 0.4], ['s27:13300', 'pop', 0.4], ['s27a:bigger', 'chime', 0.4]] }),
  makePiece('salary-creep', 'Long: Sam’s $930 a month: rent +$400, car loan +$350 (AAA ≈ $1,070 a month to own and run a new car), extras +$180 = $930; lifestyle creep', { mood: 'light', Component: Creep,
    beats: ["s34:exactly", "s34:choices", "s31a:own", "s31a:estimates", "s31a:whole", "s28:decision", ...beat('s28', ['watch', 'reasonable']), ...beat('s29', ['930', 'month']), ...beat('s30', ['apartment', 'closer', '400', 'earned']), ...beat('s31', ['old', 'noise', 'trades', 'loan', '350']), ...beat('s31a', ['payment', 'aaa', '1070', 'fuel', 'insurance', 'upkeep', 'loses']), ...beat('s31b', ['nicer', 'higher', 'running', 'top']), ...beat('s32', ['small', 'dinners', 'subscriptions', 'phone', '180']), ...beat('s33', ['add', '400', '350', '180', '930', 'whole']), ...beat('s34', ['crazy', 'common', 'name', 'lifestyle'])],
    sfx: [['s30:400', 'coin', 0.4], ['s31:350', 'coin', 0.4], ['s31a:1070', 'impact', 0.5], ['s32:180', 'coin', 0.4], ['s33:930', 'impact', 0.6], ['s34:lifestyle', 'riser', 0.4]] }),
  makePiece('salary-stick', 'Long: force 3 — leases, loans, subscriptions; easy to spend, hard to un-spend; cutting back feels like a loss', { mood: 'dark', Component: Stick,
    beats: ["s37a:feels", "s37:once", "s37a:feels", "s37:once", ...beat('s35', ['third', 'stick']), ...beat('s36', ['lease', 'year', 'loan', 'years', 'subscription', 'month', 'cancel']), ...beat('s37', ['easy', 'hard', 'signed', 'arrive', 'every', 'next', 'comes']), ...beat('s37a', ['cutting', 'breaking', 'selling', 'living', 'loss', 'right'])],
    sfx: [['s35:stick', 'thud', 0.5], ['s36:lease', 'pop', 0.4], ['s36:loan', 'pop', 0.4], ['s37:hard', 'crack', 0.4], ['s37:every', 'tick', 0.4], ['s37a:loss', 'thud', 0.4]] }),
  makePiece('salary-gap', 'Long: the gap decides — $104,200 in vs $78,500 out (gap ≈ $25,700 before tax); 90¢ vs 57¢ spent per $1; only through the gap; approved for more', { mood: 'light', Component: Gap,
    beats: ["s45a:also", "s45a:easier", "s45a:income", "s45:salary", "s45:fast", "s44:raise", "s44:average", "s41:come", ...beat('s38', ['decides', 'build']), ...beat('s39', ['salary', 'gap', 'comes', 'goes']), ...beat('s40', ['average', '104200', 'spent', '78500']), ...beat('s41', ['leaves', '25700', 'taxes']), ...beat('s42', ['another', 'middle', '90', 'dollar']), ...beat('s43', ['top', '57']), ...beat('s44', ['keep', 'help']), ...beat('s45', ['only', 'rises', 'bills']), ...beat('s45a', ['lenders', 'landlords', 'approved', 'rent', 'loan'])],
    sfx: [['s39:gap', 'impact', 0.5], ['s41:25700', 'ding', 0.4], ['s42:90', 'swish', 0.4], ['s43:57', 'swish', 0.4], ['s45:bills', 'thud', 0.4], ['s45a:approved', 'pop', 0.4]] }),
  makePiece('salary-twins', 'Long: Sam vs Jo, both $75,000 — Sam: rent, loan, extras; Jo: same home and car, raise auto-saved; a year later Jo has $11,000+ saved', { mood: 'light', Component: Twins,
    beats: ["s46a:person", "s46:two", ...beat('s46', ['same', 'different', 'places']), ...beat('s46a', ['earns', 'does', 'difference']), ...beat('s47', ['picture', 'jo', 'both', '75000']), ...beat('s48', ['sam', 'rent', 'car', 'extras']), ...beat('s49', ['kept', 'apartment', 'car', 'automatic', 'savings', 'payday']), ...beat('s50', ['raise', 'taxes', 'later', '11000', 'saved', 'bills']), ...beat('s50a', ['single', 'simply', 'gap', 'closing'])],
    sfx: [['s47:jo', 'pop', 0.4], ['s48:rent', 'coin', 0.4], ['s49:automatic', 'click', 0.4], ['s50:11000', 'chime', 0.5], ['s50:bills', 'thud', 0.4]] }),
  makePiece('salary-count', 'Long: timing not willpower — save before checking, decide once; big repeating costs matter most ($5 coffee vs $400 rent); split raises in advance; enjoy on purpose; choose your gap', { mood: 'dark', Component: Count,
    beats: ["s57a:still", "s57a:raise", "s57:instead", "s56a:something", "s54:also", ...beat('s51', ["jo's", 'willpower', 'timing']), ...beat('s52', ['never', 'lands', 'checking', 'harder']), ...beat('s53', ['decided', 'once', 'day', 'habit', 'claim']), ...beat('s54', ['biggest', 'home', 'car', 'matter', 'repeat', 'years']), ...beat('s55', ['5', 'coffee', '400', 'rent', 'again', 'automatically']), ...beat('s55a', ['advance', 'split', 'half', 'savings', 'spending', 'better']), ...beat('s56', ['none', 'enjoy', 'fine']), ...beat('s56a', ['matters', 'wasted', 'problem', 'accident']), ...beat('s57', ['choose', 'gap', 'disappear', 'decision']), ...beat('s57a', ['half', 'feel', 'growing'])],
    sfx: [['s51:timing', 'ding', 0.4], ['s52:harder', 'click', 0.4], ['s55:400', 'coin', 0.4], ['s55a:half', 'swish', 0.4], ['s56a:accident', 'thud', 0.4], ['s57:gap', 'chime', 0.4]] }),
  makePiece('salary-payoff', 'Long: three forces — tax, spending, sticky costs — turn a raise into a lifestyle; salary is the headline, the gap is the story; your real raise is how much wider the gap gets', { mood: 'light', Component: Payoff,
    beats: ["s62a:one", "s62a:earn", ...beat('s58', ['why', 'higher', 'broke']), ...beat('s59', ['taxes', 'slice', 'extra']), ...beat('s60', ['spending', 'rise']), ...beat('s61', ['monthly', 'sign', 'undo']), ...beat('s61a', ['mistake', 'together', 'raise', 'lifestyle']), ...beat('s62', ['salary', 'headline', 'gap', 'story']), ...beat('s62a', ['two', 'richer', 'busier', 'bills']), ...beat('s63', ['real', 'number', 'letter', 'wider', 'becomes'])],
    sfx: [['s59:taxes', 'pop', 0.4], ['s60:spending', 'pop', 0.4], ['s61:monthly', 'pop', 0.4], ['s62:gap', 'impact', 0.5], ['s63:wider', 'chime', 0.5]] }),
]
