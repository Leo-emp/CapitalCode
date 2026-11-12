// ============================================================
// LONG VIDEO — "The Business Behind Buy Now, Pay Later" (≈ 8:30,
// s1–s66), fifteen wide diorama pieces between chapter cards.
// First video built on the acting pose library (owner 2026-10-29:
// "make the video noticeably more alive"): the HD cast acts out the
// story — paying at checkout, signing, pitching, handing loans over.
// Sourced: Affirm 10-K FY2026 (revenue $4,261.1M: merchant $1,149.9M,
// card $294.0M, interest $2,047.5M, gain on sale $596.6M, servicing
// $173.1M; GMV $50.2B; 70/16/14 GMV mix; $21.9B loans sold; $0 late
// fees; partner banks up to 36%; 571K merchants; 27.8M consumers);
// CFPB Dec 2025 (2023: 335.8M loans, $45.2B, $135 avg, 19.8M in 2019,
// 4.1% late fee, 0.18% of GMV, 1.83% charge-offs, 53.6M users, 6.3
// loans and $848 per lender); CFPB Sep 2022 (2.49% merchant fees,
// 4.02% revenue, 3.01% costs, 1.01% margin, 73% approved, ~$7 late
// fee, lender claims +41% AOV / +30% conversion, loan stacking);
// Klarna Q2 2026 ($1.042B revenue, $36.6B GMV, $446M transaction
// margin, 1.2M+ merchants).
// House rules (owner r22/r26/r27/r29): every word and number shows ON
// its spoken word, never before; one headline slot, never two lines at
// once; text ≥ 44 px; nothing under the corner logo; the cast acts.
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

// ---------------------------------------------------------------- s1–s5: $100 sneakers split into four $25 payments; no interest, no fees; Affirm took in $4.3B; who is paying? several payers behind "free"
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const sneakers = c('s1:sneakers'), d100 = c('s1:100'), checkout = c('s1:checkout'), split = c('s1:split'), four = c('s1:four'), d25 = c('s1:25')
  const interest = c('s2:interest'), fees = c('s2:fees'), time = c('s2:time'), nothing = c('s2:nothing')
  const affirm = c('s3:affirm'), biggest = c('s3:biggest'), d43 = c('s3:43'), revenue = c('s3:revenue'), fiscal = c('s3:fiscal')
  const loan = c('s4:loan'), who = c('s4:who')
  const follow = c('s5:follow'), money = c('s5:money'), several = c('s5:several'), different = c('s5:different'), payers = c('s5:payers'), hiding = c('s5:hiding')
  const away = on(f, affirm, 16) // # the shop slides away for the money tower
  const hero: Beat[] = [[0, 'carry', 'smiling'], [checkout, 'phone', 'neutral'], [nothing, 'thumbsUp', 'smiling'], [affirm, 'lookFar', 'thinking'], [d43, 'shock', 'shocked'], [who, 'scratchHead', 'thinking'], [follow, 'pointUp', 'neutral'], [payers, 'explain', 'worried']]
  const hx = lerp(640, 420, away), hy = 1190, hs = 1.45
  const hp = hand(f, hero, hx, hy, hs)
  const holdPhone = f >= checkout + 4 && f < nothing - 2
  const tiles = (k: number) => on(f, four + k * 3, 6)
  return (
    <g>
      <Stage id="bh" frame={f} />
      <Headline f={f} lines={[[sneakers, '$100 SNEAKERS', P.ink, 110], [split, 'SPLIT INTO FOUR', P.ink, 110], [d25, '4 × $25', P.goldInk, 130], [interest, 'NO INTEREST', P.mintInk, 120], [fees, 'NO FEES', P.mintInk, 120], [nothing, 'PAY ON TIME: $0 EXTRA', P.ink, 104],
        [affirm, 'AFFIRM: ONE OF THE BIGGEST', P.ink, 100], [d43, '≈ $4.3 BILLION OF REVENUE', P.goldInk, 110], [loan, 'IF THE LOAN IS FREE…', P.ink, 110], [who, '…WHO IS PAYING?', P.coralInk, 124], [several, 'SEVERAL DIFFERENT PAYERS', P.ink, 104], [hiding, 'HIDING BEHIND “FREE”', P.coralInk, 110]]} />
      <g transform={camera(f, [[c("s3:took"), 1240, 600, 1.05], [split, 860, 560, 1.12], [interest, 960, 540, 1], [d43, 1300, 560, 1.1], [loan, 960, 540, 1], [payers, 1240, 600, 1.1], [hiding, 960, 540, 1]])}>
        {/* # the shop: shelves of shoes, the counter, the shop owner — slides away when the money tower comes */}
        <g opacity={1 - away} transform={`translate(${-300 * away} 0)`}>
          {[0, 1].map((r) => <g key={r}><rect x={980} y={300 + r * 150} width={760} height={14} rx={6} fill="#C9A77A" />
            {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M${1010 + k * 122} ${296 + r * 150} q0 -44 40 -44 l40 12 q30 8 34 32 z`} fill={['#E05A4C', '#3A6EA8', '#F2B84B', '#3DDC97', '#C9D1DE', '#7CC4F2'][(k + r * 2) % 6]} opacity={0.85} />)}</g>)}
          <Person f={f} who="owner" beats={[[0, 'idle', 'smiling'], [checkout, 'present', 'smiling'], [nothing, 'nodA', 'smiling', 'nodB', 22]]} x={1640} y={1180} s={1.25} flip life={5} />
          <Counter x={1180} y={790} w={1500} />
          <g opacity={on(f, sneakers, 6) * (1 - on(f, interest - 4, 8))} transform={`translate(1060 790) scale(${pop(f, sneakers) * 0.95})`}><SneakerBox x={0} y={0} /></g>
          <g opacity={on(f, d100, 6) * (1 - on(f, split, 8))} transform={`translate(1290 700) scale(${pop(f, d100)}) rotate(-8)`}>
            <path d="M-110 -50 L80 -50 L130 0 L80 50 L-110 50 Q-120 50 -120 40 L-120 -40 Q-120 -50 -110 -50 Z" fill={P.paper} stroke={P.edge} strokeWidth={3} /><circle cx={86} cy={0} r={10} fill={P.navy1} />
            <text x={-10} y={26} textAnchor="middle" fill={P.navy0} style={{ font: '400 76px "Bebas Neue"' }}>$100</text></g>
          {/* # the price tag splits into four tiles along the counter, each $25 */}
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={tiles(k) * (1 - on(f, interest, 8))} transform={`translate(${lerp(1290, 1000 + k * 170, easeOut(span(f, four + k * 3, four + k * 3 + 12)))} 690) scale(${pop(f, four + k * 3)})`}>
            <rect x={-74} y={-54} width={148} height={108} rx={16} fill={k === 0 ? P.gold : P.paper} stroke={P.edge} strokeWidth={3} />
            <text y={f >= d25 ? 22 : 16} textAnchor="middle" fill={P.navy0} style={{ font: `400 ${f >= d25 ? 64 : 44}px "Bebas Neue"` }}>{f >= d25 ? '$25' : `${k + 1} OF 4`}</text></g>)}
          {/* # no interest, no fees: two stamps; pay on time: four ticks */}
          <g opacity={1 - on(f, nothing - 2, 8)}>
            <Stamp x={1200} y={580} text="NO INTEREST" f={f} at={interest} color={P.mintInk} />
            <Stamp x={1200} y={715} text="NO FEES" f={f} at={fees} color={P.mintInk} r={4} />
          </g>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, time + k * 3, 6) * (1 - on(f, affirm - 12, 8))}><Calendar x={1000 + k * 170} y={950} text={`WK ${k * 2}`} s={0.8} /><Tick x={1040 + k * 170} y={900} o={on(f, time + k * 3 + 4, 5)} r={26} /></g>)}
          <g opacity={on(f, nothing, 6)} transform={`translate(1200 640) scale(${pop(f, nothing)})`}><circle r={110} fill={P.mint} /><Label x={0} y={36} text="$0" size={110} font="Bebas Neue" color="#FFFFFF" /></g>
        </g>
        {/* # the money tower: Affirm's year of revenue */}
        <g opacity={away * (1 - on(f, follow, 10))}>
          <rect x={1060} y={980} width={600} height={16} rx={8} fill={P.navy3} />
          {Array.from({ length: 14 }, (_, k) => { const at = d43 + k * 1.5; return <g key={k} opacity={on(f, at, 4)} transform={`translate(0 ${-(1 - easeOut(span(f, at, at + 10))) * 120})`}>
            <rect x={1180} y={940 - k * 44} width={360} height={40} rx={8} fill={k % 2 ? '#6FBF7A' : '#5CAE69'} stroke="#3E8A4E" strokeWidth={3} /><circle cx={1360} cy={960 - k * 44} r={12} fill="none" stroke="#3E8A4E" strokeWidth={3} /></g> })}
          <g opacity={on(f, affirm, 6)} transform={`translate(1360 ${lerp(900, 330, on(f, biggest, 18))}) scale(${pop(f, affirm)})`}>
            <rect x={-200} y={-60} width={400} height={100} rx={18} fill={P.card} /><Label x={0} y={16} text="AFFIRM" size={72} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, revenue, 6)}><Label x={1360} y={1060} text="REVENUE, ONE YEAR" size={56} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, fiscal, 6)} transform={`translate(1740 760) scale(${pop(f, fiscal)})`}><Calendar x={0} y={0} text="FY26" s={1} /></g>
          <g opacity={on(f, who, 6)} transform={`translate(1740 470) scale(${pop(f, who) * 1.1})`}><circle r={90} fill={P.gold} /><Label x={0} y={40} text="?" size={140} font="Bebas Neue" color={P.navy0} /></g>
        </g>
        {/* # follow the money: a dotted trail from the hero to several hidden payers */}
        <g opacity={on(f, follow, 8)}>
          <path d="M620 620 C800 620 900 520 1080 520" stroke={P.goldInk} strokeWidth={8} strokeDasharray="18 14" fill="none" strokeDashoffset={-f * 2} opacity={on(f, money, 8)} />
          {[0, 1, 2, 3].map((k) => { const at = [several, several + 8, different, payers][k], x = 1160 + k * 190, y = 900 - (k % 2) * 40
            return <g key={k}><path d={`M1080 520 Q${x} 520 ${x} ${y - 220}`} stroke={P.goldInk} strokeWidth={6} strokeDasharray="14 12" fill="none" opacity={on(f, at, 6)} />
              <g transform={`translate(${x} ${y}) scale(${pop(f, at) * 0.95})`}><Shadow x={0} y={0} o={on(f, at, 6)} q={1 - on(f, hiding, 10)} /></g></g> })}
          {Array.from({ length: 3 }, (_, k) => { const p = ((f - money) / 40 + k / 3) % 1; return f > money ? <Coin key={k} x={lerp(620, 1080, p)} y={620 - Math.sin(p * Math.PI) * 60 - p * 100} s={0.7} o={Math.sin(p * Math.PI) * on(f, money, 6)} /> : null })}
          {/* # the "free" curtain slides over them */}
          <g opacity={on(f, hiding, 6)} transform={`translate(${lerp(1980, 1440, easeOut(span(f, hiding, hiding + 14)))} 720)`}>
            <rect x={-340} y={-300} width={680} height={420} rx={40} fill={P.mint} opacity={0.94} /><Label x={0} y={-40} text="FREE" size={190} font="Bebas Neue" color="#FFFFFF" /><Label x={0} y={60} text="PAY IN 4 · NO INTEREST" size={52} font="Bebas Neue" color="#FFFFFF" /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={hx} y={hy} s={hs} life={2} />
        {/* # the phone in the hero's hand: the plan, then its four parts */}
        {holdPhone && <Phone x={hp.x + 160} y={hp.y + 10} s={1} r={8} o={on(f, checkout + 4, 6) * (1 - span(f, nothing - 8, nothing - 2))}>
          <Label x={0} y={-96} text="PAY IN 4" size={50} font="Bebas Neue" color={P.navy1} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-66 + (k % 2) * 70} y={-56 + Math.floor(k / 2) * 90} width={62} height={80} rx={10} fill={k === 0 ? P.gold : '#DCE6F2'} opacity={on(f, split + k * 2, 5)} />)}
          <Label x={0} y={128} text={f >= d25 ? '$25 × 4' : ''} size={44} font="Bebas Neue" color={P.navy1} />
        </Phone>}
      </g>
      <Vignette id="bh" />
    </g>
  )
}

// ---------------------------------------------------------------- s6–s10a: it is a loan — four equal parts, one at checkout then every two weeks, paid off in six weeks; you walk out, the lender waits; longer monthly plans (remember them)
const Loan: React.FC<PieceProps> = ({ f, c }) => {
  const what = c('s6:what'), actually = c('s6:actually')
  const loan = c('s7:loan')
  const classic = c('s8:classic'), split = c('s8:split'), four = c('s8:four'), equal = c('s8:equal'), parts = c('s8:parts')
  const first = c('s9:first'), checkout = c('s9:checkout'), every = c('s9:every'), two = c('s9:two'), whole = c('s9:whole'), six = c('s9:six')
  const walk = c('s10:walk'), today = c('s10:today'), lender = c('s10:lender'), waits = c('s10:waits'), three = c('s10:three')
  const longer = c('s10a:longer'), monthly = c('s10a:monthly'), many = c('s10a:many'), keep = c('s10a:keep'), later = c('s10a:later')
  const A = win(f, what, classic), B = win(f, classic, walk), Cc = win(f, walk, longer), D = on(f, longer, 10)
  // # the shopper: wonders, then the loan reveal; pays the first part; walks out with the box
  const hero: Beat[] = [[0, 'think', 'thinking'], [loan, 'oops', 'shocked'], [classic, 'explain', 'neutral'], [checkout, 'offer', 'smiling'], [every, 'countOne', 'neutral'], [six, 'thumbsUp', 'smiling'], [walk, 'carry', 'smiling', 'carryHeavy', 18], [today, 'carry', 'smiling'], [longer, 'scratchHead', 'thinking'], [keep, 'countOne', 'neutral'], [later, 'pointUp', 'neutral']]
  const hx = f < walk ? 420 : lerp(420, 760, easeInOut(span(f, walk, today + 10))) - (f >= longer ? lerp(0, 340, on(f, longer, 16)) : 0)
  const slot = (k: number) => 860 + k * 260
  const paidAt = [checkout, two, two + 12, six]
  return (
    <g>
      <Stage id="bl" frame={f} />
      <Headline f={f} lines={[[what, 'WHAT IS IT, REALLY?', P.ink, 110], [loan, 'IT IS A LOAN', P.coralInk, 140], [four, 'FOUR EQUAL PARTS', P.ink, 120], [checkout, 'ONE AT CHECKOUT', P.goldInk, 120], [every, 'THEN ONE EVERY 2 WEEKS', P.ink, 110], [six, 'PAID OFF IN 6 WEEKS', P.mintInk, 120],
        [lender, 'THE LENDER WAITS', P.ink, 120], [three, 'FOR 3 MORE PAYMENTS', P.goldInk, 116], [longer, 'LONGER PLANS', P.ink, 120], [monthly, 'PAID MONTHLY', P.skyInk, 120], [keep, 'REMEMBER THESE', P.goldInk, 120]]} />
      <g transform={camera(f, [[c("s10a:lenders"), 1000, 640, 1.05], [loan, 1240, 560, 1.12], [classic, 960, 540, 1], [first, 1000, 640, 1.1], [six, 960, 540, 1], [lender, 1300, 620, 1.1], [three, 960, 540, 1], [many, 1100, 760, 1.1], [keep, 960, 540, 1]])}>
        {/* # A: a gift box marked FREE — it opens on "loan" and a loan contract rises out of it */}
        <g opacity={A}>
          <g transform={`translate(1240 760) scale(${pop(f, what)})`}>
            <rect x={-170} y={-170} width={340} height={200} rx={16} fill={P.mint} /><rect x={-24} y={-170} width={48} height={200} fill={P.gold} />
            <g transform={`rotate(${-28 * on(f, loan, 10)} -190 -190)`}><rect x={-190} y={-230} width={380} height={64} rx={14} fill="#36C98A" /><rect x={-24} y={-230} width={48} height={64} fill={P.gold} />
              <Label x={0} y={-180} text="FREE" size={52} font="Bebas Neue" color="#FFFFFF" o={1 - on(f, loan, 6)} /></g>
          </g>
          <g opacity={on(f, loan, 6)} transform={`translate(1240 ${lerp(700, 470, easeOut(span(f, loan, loan + 14)))}) scale(0.8)`}><Doc x={0} y={0} title="LOAN" stamp="YOU OWE" stampO={on(f, loan + 8, 6)} /></g>
          <g opacity={on(f, actually, 6) * (1 - on(f, loan, 6))} transform={`translate(1240 420) scale(${pop(f, actually)})`}><circle r={70} fill={P.gold} /><Label x={0} y={34} text="?" size={110} font="Bebas Neue" color={P.navy0} /></g>
        </g>
        {/* # B: the four parts on a six-week track */}
        <g opacity={B}>
          <rect x={780} y={820} width={900} height={14} rx={7} fill={P.navy4} opacity={on(f, classic, 8)} />
          <g opacity={on(f, split, 6) * (1 - on(f, four, 6))} transform={`translate(1270 600) scale(${pop(f, split)})`}><rect x={-200} y={-70} width={400} height={140} rx={20} fill={P.paper} /><Label x={0} y={28} text="$100" size={96} font="Bebas Neue" color={P.navy0} /></g>
          {[0, 1, 2, 3].map((k) => {
            const at = [four, four + 5, equal, parts][k], paid = on(f, paidAt[k], 8)
            return <g key={k}>
              <g opacity={on(f, at, 6)} transform={`translate(${lerp(1270, slot(k), easeOut(span(f, at, at + 12)))} ${lerp(600, 700, easeOut(span(f, at, at + 12)))}) scale(${pop(f, at)})`}>
                <rect x={-100} y={-70} width={200} height={140} rx={18} fill={paid > 0.5 ? P.mint : P.paper} />
                <Label x={0} y={26} text="$25" size={84} font="Bebas Neue" color={P.navy0} /></g>
              <Label x={slot(k)} y={900} text={['CHECKOUT', 'WEEK 2', 'WEEK 4', 'WEEK 6'][k]} size={50} font="Bebas Neue" color={P.ink} o={on(f, [checkout, two, two + 12, six][k], 6)} />
              <Tick x={slot(k) + 90} y={630} o={paid} r={30} />
            </g>
          })}
          <g opacity={on(f, whole, 6)} transform={`translate(${slot(3) + 150} 560) scale(${pop(f, six)})`}><path d="M0 120 V-60" stroke={P.ink} strokeWidth={8} /><path d="M0 -60 L110 -30 L0 0 Z" fill={P.mint} /></g>
        </g>
        {/* # C: the lender waits at the door with the three payments still to come */}
        <g opacity={Cc}>
          <rect x={1260} y={360} width={240} height={540} rx={16} fill={P.navy1} opacity={on(f, walk, 8)} /><circle cx={1460} cy={640} r={12} fill={P.gold} opacity={on(f, walk, 8)} />
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [lender, 'hold', 'neutral'], [waits, 'armsCrossed', 'neutral'], [three, 'countOne', 'smug']]} x={1580} y={1180} s={1.3} flip life={7} o={on(f, lender, 8)} />
          <g opacity={on(f, waits, 6)} transform={`translate(1800 560) scale(${pop(f, waits)})`}><Prop id="hourglass" x={0} y={0} size={150} f={f} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, three + k * 3, 6)} transform={`translate(${1080 + k * 0} ${420 + k * 120}) scale(${pop(f, three + k * 3) * 0.75})`}><rect x={-100} y={-60} width={200} height={120} rx={18} fill={P.paper} /><Label x={0} y={24} text="$25" size={80} font="Bebas Neue" color={P.navy0} /></g>)}
        </g>
        {/* # D: longer plans — a calendar strip of months unrolls; a sticky note: remember these */}
        <g opacity={D}>
          {Array.from({ length: 12 }, (_, k) => { const at = (k < 4 ? longer : k < 8 ? monthly : many) + (k % 4) * 3
            return <g key={k} opacity={on(f, at, 6)} transform={`translate(${720 + (k % 6) * 190} ${560 + Math.floor(k / 6) * 230}) scale(${pop(f, at) * 0.95})`}><Calendar x={0} y={0} text={['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][k]} s={1} /></g> })}
          <g opacity={on(f, keep, 6)} transform={`translate(1700 330) rotate(6) scale(${pop(f, keep)})`}><rect x={-150} y={-90} width={300} height={180} rx={10} fill={P.gold} /><Label x={0} y={-10} text="REMEMBER" size={60} font="Bebas Neue" color={P.navy0} /><Label x={0} y={52} text="LONGER PLANS" size={44} font="Bebas Neue" color={P.navy0} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={hx} y={1190} s={1.45} life={2} />
        {/* # the sneaker box rides in the hero's arms on the walk out */}
        {f >= walk && f < longer + 10 && (() => { const h = hand(f, hero, hx, 1190, 1.45); return <g opacity={on(f, walk, 6) * (1 - on(f, longer, 8))}><SneakerBox x={h.x - 40} y={h.y + 30} s={0.6} /></g> })()}
      </g>
      <Vignette id="bl" />
    </g>
  )
}

// ---------------------------------------------------------------- s11–s12a: small loans (~$135 at six big lenders) but 336 million of them, ~$45B in a year; ~20 million in 2019 → ~17× by 2023
const Scale: React.FC<PieceProps> = ({ f, c }) => {
  const small = c('s11:small'), average = c('s11:average'), six = c('s11:six'), biggest = c('s11:biggest'), d135 = c('s11:135')
  const lot = c('s12:lot'), lenders12 = c('s12:six'), made = c('s12:made'), d336 = c('s12:336'), year = c('s12:year'), d45 = c('s12:45')
  const grew = c('s12a:grew'), fast = c('s12a:fast'), same = c('s12a:same'), d20 = c('s12a:20'), loans12a = c('s12a:loans'), by = c('s12a:by'), roughly = c('s12a:roughly'), d17 = c('s12a:17'), many = c('s12a:many')
  const A = win(f, small, lot), B = win(f, lot, grew), Cc = on(f, grew, 10)
  const hero: Beat[] = [[0, 'hold', 'neutral'], [d135, 'present', 'smiling'], [lot, 'shock', 'shocked'], [d45, 'lookFar', 'thinking'], [grew, 'pointUp', 'neutral'], [d17, 'fistPump', 'shocked']]
  const hp = hand(f, hero, 380, 1190, 1.45)
  const H = 520 // # 2023 bar height; 2019 = 19.8 / 335.8 of it
  return (
    <g>
      <Stage id="bs" frame={f} />
      <Headline f={f} lines={[[small, 'SMALL LOANS', P.ink, 120], [d135, 'AVERAGE: ≈ $135', P.goldInk, 124], [lot, 'BUT A LOT OF THEM', P.ink, 120], [d336, '≈ 336 MILLION LOANS', P.goldInk, 116], [d45, 'WORTH ≈ $45 BILLION', P.goldInk, 116],
        [grew, 'AND THEY GREW FAST', P.ink, 120], [d17, '≈ 17 TIMES AS MANY', P.coralInk, 124]]} />
      <g transform={camera(f, [[d135, 760, 600, 1.12], [lot, 960, 540, 1], [d45, 1500, 640, 1.1], [grew, 960, 540, 1], [d17, 1300, 600, 1.1]])}>
        {/* # A: one receipt in the hand, then the six big lenders it comes from */}
        <g opacity={A}>
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, six + k * 2, 6)} transform={`translate(${880 + (k % 3) * 300} ${470 + Math.floor(k / 3) * 300}) scale(${pop(f, six + k * 2) * (f >= biggest ? 1 : 0.9)})`}>
            <circle r={110} fill={P.card} /><Prop id="bank" x={0} y={-8} size={150} f={f} /></g>)}
          <Label x={1180} y={1000} text="SIX OF THE BIGGEST LENDERS" size={56} font="Bebas Neue" color={P.ink2} o={on(f, biggest, 6)} />
        </g>
        {/* # B: one receipt becomes a field of them; the year's total piles up as cash */}
        <g opacity={B}>
          {Array.from({ length: 120 }, (_, k) => { const col = k % 15, row = Math.floor(k / 15), at = lot + (col + row) * 0.9
            return <g key={k} opacity={on(f, at, 5) * 0.95} transform={`translate(${780 + col * 62} ${330 + row * 74})`}><rect x={-22} y={-30} width={44} height={60} rx={6} fill={P.paper} /><rect x={-14} y={-16} width={28} height={6} rx={3} fill="#C8B994" /><rect x={-14} y={-2} width={20} height={6} rx={3} fill="#C8B994" /></g> })}
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, lenders12 + k * 2, 5) * (1 - on(f, d336, 8))} transform={`translate(${830 + k * 170} 270) scale(${pop(f, lenders12 + k * 2) * 0.7})`}><circle r={60} fill={P.card} /><Prop id="bank" x={0} y={-4} size={80} f={f} /></g>)}
          <g opacity={on(f, d336, 6)} transform={`translate(1240 620) scale(${pop(f, d336)})`}><Stat x={0} y={0} big="336 MILLION" small="LOANS IN ONE YEAR" w={620} /></g>
          <g opacity={on(f, d45, 6)} transform={`translate(1240 900) scale(${pop(f, d45) * 0.8})`}><Stat x={0} y={0} big="$45 BILLION" color={P.mintInk} w={620} /></g>
          <g opacity={on(f, made, 6) * (1 - on(f, d336, 8))} transform="translate(1240 960)"><Label x={0} y={0} text={f >= year ? 'IN ONE YEAR' : ''} size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # C: two bars — 2019 vs 2023, the second about 17 times taller */}
        <g opacity={Cc}>
          <rect x={820} y={960} width={900} height={14} rx={7} fill={P.navy4} />
          <g opacity={on(f, same, 6)}>
            <rect x={940} y={960 - H * (19.8 / 335.8) * on(f, d20, 12)} width={220} height={H * (19.8 / 335.8) * on(f, d20, 12)} rx={14} fill={P.sky} />
            <Label x={1050} y={1040} text="2019" size={60} font="Bebas Neue" color={P.ink} /><Label x={1050} y={920 - H * (19.8 / 335.8)} text={f >= d20 ? '≈ 20 MILLION' : ''} size={52} font="Bebas Neue" color={P.ink} />
          </g>
          <g opacity={on(f, roughly, 6)}>
            <rect x={1400} y={960 - H * on(f, roughly, 22)} width={220} height={H * on(f, roughly, 22)} rx={14} fill={P.coral} />
            <Label x={1510} y={1040} text="2023" size={60} font="Bebas Neue" color={P.ink} /><Label x={1510} y={420} text={f >= many ? '≈ 336 MILLION' : ''} size={52} font="Bebas Neue" color={P.ink} />
          </g>
          <g opacity={on(f, loans12a, 6)} transform={`translate(1050 ${930 - H * (19.8 / 335.8) - 150}) scale(${pop(f, loans12a) * 0.8})`}>{[0, 1, 2].map((j) => <rect key={j} x={-50 + j * 8} y={-60 - j * 10} width={100} height={130} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={2} />)}</g>
          <g opacity={on(f, by, 6) * (1 - on(f, roughly + 10, 8))}><path d={`M1180 ${940 - H * 0.06} Q1300 700 1380 ${940 - H * 0.3}`} stroke={P.goldInk} strokeWidth={10} fill="none" strokeDasharray="20 14" strokeDashoffset={-(f - by) * 3} /></g>
          <g opacity={on(f, d17, 6)} transform={`translate(1260 560) scale(${pop(f, d17)})`}><circle r={90} fill={P.gold} /><Label x={0} y={34} text="× 17" size={84} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, grew, 6)} transform={`translate(${lerp(1100, 1760, on(f, grew, 30))} ${lerp(900, 400, on(f, grew, 30))}) scale(${pop(f, grew) * 1.3})`}><Prop id="rocket" x={0} y={0} size={160} f={f} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={380} y={1190} s={1.45} life={4} />
        {/* # the one small receipt in the hero's hand */}
        <g opacity={on(f, small, 6) * (1 - on(f, lot, 8))} transform={`translate(${hp.x + 60} ${hp.y - 40}) rotate(8)`}>
          <rect x={-70} y={-100} width={140} height={200} rx={10} fill={P.paper} /><Label x={0} y={-40} text="LOAN" size={44} font="Bebas Neue" color={P.navy2} />
          <Label x={0} y={40} text={f >= d135 ? '$135' : ''} size={64} font="Bebas Neue" color={P.navy0} /></g>
        <g opacity={on(f, average, 6) * (1 - on(f, lot, 8))} transform={`translate(${hp.x + 220} ${hp.y - 160}) scale(${pop(f, average) * 0.8})`}><Prop id="magnifier" x={0} y={0} size={140} f={f} /></g>
      </g>
      <Vignette id="bs" />
    </g>
  )
}

// ---------------------------------------------------------------- s12b–s13: easy to get — a soft check others can't see that doesn't move your score; 73% approved (2021); low and grow; lending free earns nothing — the money must come from somewhere else
const Approve: React.FC<PieceProps> = ({ f, c }) => {
  const easy = c('s12b:easy'), check = c('s12b:check'), soft = c('s12b:soft'), cannot = c('s12b:cannot'), change = c('s12b:change'), score = c('s12b:score')
  const in12c = c('s12c:in'), bureau12c = c('s12c:bureau'), studied = c('s12c:studied'), approved = c('s12c:approved'), d73 = c('s12c:73'), applied = c('s12c:applied')
  const start = c('s12d:start'), small = c('s12d:small'), raise = c('s12d:raise'), time = c('s12d:time'), low = c('s12d:low'), grow = c('s12d:grow')
  const lending = c('s13:lending'), charging = c('s13:charging'), nothing = c('s13:nothing'), money = c('s13:money'), somewhere = c('s13:somewhere')
  const A = win(f, easy, in12c), B = win(f, in12c, start), Cc = win(f, start, lending), D = on(f, lending, 10)
  const hero: Beat[] = [[0, 'phone', 'neutral'], [soft, 'phone', 'smiling'], [studied, 'idle', 'neutral'], [start, 'phone', 'neutral'], [time, 'phone', 'smiling'], [grow, 'thumbsUp', 'smiling'], [lending, 'emptyPockets', 'worried'], [money, 'scratchHead', 'thinking'], [somewhere, 'lookFar', 'thinking']]
  const hp = hand(f, hero, 420, 1190, 1.45)
  const lit = new Set(Array.from({ length: 73 }, (_, k) => k))
  return (
    <g>
      <Stage id="ba" frame={f} tint="teal" />
      <Headline f={f} lines={[[easy, 'DESIGNED TO BE EASY', P.ink, 120], [soft, 'A SOFT CHECK', P.skyInk, 124], [cannot, 'OTHER LENDERS CAN’T SEE IT', P.ink, 100], [change, 'THE CHECK DOESN’T MOVE YOUR SCORE', P.mintInk, 90], [d73, '≈ 73% APPROVED (2021)', P.goldInk, 116],
        [small, 'SMALL LIMITS FIRST…', P.ink, 116], [raise, '…RAISED AS YOU PAY ON TIME', P.mintInk, 100], [low, '“LOW AND GROW”', P.goldInk, 130], [nothing, 'FREE LENDING EARNS NOTHING', P.coralInk, 104], [somewhere, 'SO WHERE’S THE MONEY FROM?', P.ink, 104]]} />
      <g transform={camera(f, [[c("s12b:designed"), 1100, 600, 1.04], [soft, 1300, 560, 1.12], [change, 960, 540, 1], [d73, 1240, 620, 1.08], [start, 960, 540, 1], [raise, 1300, 640, 1.1], [lending, 960, 540, 1]])}>
        {/* # A: the credit report: a soft check (a feather-light magnifier) that other lenders can't see, the score dial doesn't move */}
        <g opacity={A}>
          <g opacity={on(f, check, 6)} transform={`translate(1100 600) scale(${pop(f, check)})`}><Doc x={0} y={0} title="CREDIT" lines={5} /></g>
          <g opacity={on(f, soft, 6)} transform={`translate(${lerp(1300, 1160, Math.sin((f - soft) / 10) * 0.5 + 0.5)} 640) scale(${pop(f, soft)})`}><Prop id="magnifier" x={0} y={0} size={170} f={f} /></g>
          {[0, 1].map((k) => <g key={k} opacity={on(f, cannot + k * 4, 6)} transform={`translate(${1460 + k * 200} 460)`}><circle r={70} fill={P.card} /><Prop id="bank" x={0} y={-4} size={90} f={f} />
            <path d="M-40 -6 Q0 -40 40 -6 Q0 28 -40 -6 Z" fill="none" stroke={P.ink} strokeWidth={5} transform="translate(0 100)" /><path d="M-46 112 L46 80" stroke={P.coralInk} strokeWidth={8} strokeLinecap="round" /></g>)}
          <g opacity={on(f, score, 6)} transform={`translate(1560 820) scale(${pop(f, score)})`}>
            <path d="M-120 0 A120 120 0 0 1 120 0" fill="none" stroke={P.navy4} strokeWidth={26} /><path d="M-120 0 A120 120 0 0 1 60 -104" fill="none" stroke={P.mint} strokeWidth={26} />
            <path d={`M0 0 L${Math.cos(-Math.PI * 0.33) * 96} ${Math.sin(-Math.PI * 0.33) * 96}`} stroke={P.ink} strokeWidth={10} strokeLinecap="round" /><circle r={14} fill={P.ink} />
            <Label x={0} y={70} text="CHECK: SCORE UNCHANGED" size={48} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # B: 100 applicants, 73 light up approved */}
        <g opacity={B}>
          <g opacity={on(f, in12c + 10, 6)} transform={`translate(830 300) scale(${pop(f, in12c + 10) * 0.8})`}><Calendar x={0} y={0} text="2021" s={1} /></g>
          <g opacity={on(f, bureau12c, 6)} transform={`translate(1700 300) scale(${pop(f, bureau12c) * 0.8})`}><circle r={80} fill={P.card} /><Prop id="bank" x={0} y={-6} size={110} f={f} /><Label x={0} y={130} text="CFPB" size={52} font="Bebas Neue" color={P.ink} /></g>
          {Array.from({ length: 100 }, (_, k) => { const col = k % 20, row = Math.floor(k / 20), x = 760 + col * 52, y = 400 + row * 104, ok = lit.has(k) && f >= approved + Math.floor(k / 4)
            return <g key={k} opacity={on(f, studied + col * 0.5, 5)}><Mini look={['hero', 'buyer', 'investor', 'owner', 'worker'][k % 5]} x={x} y={y + 40} scale={0.42} frame={f} seed={k + 60} mood={ok ? 'happy' : 'neutral'} />
              {ok && <circle cx={x + 14} cy={y - 50} r={10} fill={P.mint} />}</g> })}
          <g opacity={on(f, d73, 6)} transform={`translate(1270 1000) scale(${pop(f, d73) * 0.75})`}><Stat x={0} y={0} big="73 OF 100" color={P.mintInk} w={520} /></g>
          <Label x={1270} y={380} text={f >= applied ? 'PEOPLE WHO APPLIED' : ''} size={52} font="Bebas Neue" color={P.ink2} />
        </g>
        {/* # C: low and grow — a limit bar that steps up with every on-time payment */}
        <g opacity={Cc}>
          <rect x={820} y={900} width={940} height={14} rx={7} fill={P.navy4} />
          {Array.from({ length: 5 }, (_, k) => { const at = k === 0 ? small : raise + (k - 1) * 6, h = 90 + k * 95
            return <g key={k} opacity={on(f, at, 6)}><rect x={860 + k * 180} y={900 - h * on(f, at, 12)} width={140} height={h * on(f, at, 12)} rx={14} fill={k === 0 ? P.sky : P.mint} />
              <Label x={930 + k * 180} y={960} text={k === 0 ? 'START' : `+${k}`} size={48} font="Bebas Neue" color={P.ink} />
              {k > 0 && <Tick x={930 + k * 180} y={860 - h} o={on(f, time + k * 3, 5)} r={26} />}</g> })}
          <g opacity={on(f, low, 6)} transform={`translate(1600 420) scale(${pop(f, low)})`}><Prop id="seedling" x={0} y={0} size={170} f={f} /></g>
        </g>
        {/* # D: free lending earns nothing — an empty till, then a question: where does the money come from? */}
        <g opacity={D}>
          <g transform={`translate(1240 700) scale(${pop(f, lending)})`}><rect x={-230} y={-120} width={460} height={240} rx={22} fill={P.card} /><rect x={-190} y={-80} width={380} height={160} rx={14} fill={P.navy0} />
            <Label x={0} y={22} text={f >= nothing ? '$0' : ''} size={110} font="Bebas Neue" color={P.coralInk} /></g>
          <Label x={1240} y={900} text={f >= charging ? 'SHOPPER PAYS: $0' : ''} size={56} font="Bebas Neue" color={P.ink} />
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, somewhere + k * 4, 6)} transform={`translate(${1000 + k * 240} 380) scale(${pop(f, somewhere + k * 4)})`}><circle r={56} fill={P.gold} /><Label x={0} y={26} text="?" size={80} font="Bebas Neue" color={P.navy0} /></g>)}
        </g>
        <Person f={f} who="hero" beats={hero} x={420} y={1190} s={1.45} life={6} />
        {/* # the phone: approved in seconds, then the limit going up */}
        <Phone x={hp.x + 160} y={hp.y + 10} s={1} r={8} o={(on(f, easy, 6) * (1 - on(f, studied - 6, 6)) + on(f, start, 6) * (1 - on(f, grow, 6)))}>
          <Label x={0} y={-80} text="APPROVED" size={48} font="Bebas Neue" color="#1E9A63" />
          <circle cx={0} cy={10} r={50} fill={P.mint} /><path d="M-22 10 l14 14 l30 -32" stroke="#FFFFFF" strokeWidth={10} fill="none" strokeLinecap="round" />
          <Label x={0} y={120} text={f >= start ? (f >= raise ? 'LIMIT ↑' : 'LOW LIMIT') : 'FAST'} size={48} font="Bebas Neue" color={P.navy1} />
        </Phone>
      </g>
      <Vignette id="ba" />
    </g>
  )
}

// ---------------------------------------------------------------- s14–s18: the store pays the lender a fee on each pay-later sale (like a card fee); small fees × millions of sales = Affirm's ≈ $1.15B from stores on ≈ $50.2B of purchases ≈ $2.30 per $100
const Store: React.FC<PieceProps> = ({ f, c }) => {
  const store = c('s14:store')
  const choose = c('s15:choose'), later = c('s15:later'), pays = c('s15:pays'), lender = c('s15:lender'), fee = c('s15:fee'), sale = c('s15:sale')
  const works = c('s15a:works'), tap = c('s15a:tap'), card = c('s15a:card')
  const each = c('s18a:each'), small = c('s18a:small'), across = c('s18a:across'), millions = c('s18a:millions'), serious = c('s18a:serious')
  const fiscal16 = c('s16:fiscal'), affirm16 = c('s16:affirm'), earned = c('s16:earned'), d115 = c('s16:115'), merchant = c('s16:merchant')
  const financed = c('s17:financed'), d502 = c('s17:502'), purchases = c('s17:purchases')
  const together = c('s18:together'), d2 = c('s18:2'), d30 = c('s18:30'), d100 = c('s18:100')
  const A = win(f, store, each), B = on(f, each, 10)
  const owner: Beat[] = [[0, 'idle', 'smiling'], [store, 'waveA', 'smiling', 'waveB', 14], [choose, 'present', 'smiling'], [pays, 'offer', 'neutral'], [sale, 'idle', 'neutral'], [tap, 'offer', 'neutral'], [card, 'nodA', 'neutral', 'nodB', 20]]
  const hero: Beat[] = [[0, 'idle', 'smiling'], [choose, 'phone', 'neutral'], [later, 'thumbsUp', 'smiling'], [works, 'idle', 'neutral'], [tap, 'offer', 'smiling'], [card, 'idle', 'smiling']]
  const ox = 1000, lx = 1640
  const ownerHand = hand(f, owner, ox, 1180, 1.3, true)
  const heroHand = hand(f, hero, 330, 1190, 1.4)
  const coin1 = fly(f, fee - 2, [ownerHand.x, ownerHand.y], [lx - 140, 640], 20)
  const coin2 = fly(f, card + 4, [ownerHand.x, ownerHand.y], [lx - 140, 640], 20)
  return (
    <g>
      <Stage id="bt" frame={f} />
      <Headline f={f} lines={[[store, 'PAYER #1: THE STORE', P.goldInk, 120], [fee, 'A FEE ON EACH SALE', P.ink, 116], [works, 'LIKE A CARD FEE', P.ink, 120], [small, 'EACH FEE IS SMALL…', P.ink, 116], [millions, '…ACROSS MILLIONS OF SALES', P.ink, 110],
        [d115, 'AFFIRM: ≈ $1.15 BILLION', P.goldInk, 116], [merchant, '…FROM STORE FEES', P.ink, 116], [d502, 'ON ≈ $50.2 BILLION OF SHOPPING', P.ink, 100], [d30, 'STORES PAID ≈ $2.30…', P.coralInk, 120], [d100, '…FOR EVERY $100 OF SHOPPING', P.ink, 104]]} />
      <g transform={camera(f, [[c("s17:same"), 1200, 600, 1.04], [c("s15a:store"), 1000, 620, 1.06], [fee, 1400, 620, 1.1], [works, 960, 540, 1], [tap, 700, 680, 1.1], [each, 960, 540, 1], [d115, 760, 620, 1.08], [d502, 960, 540, 1], [d30, 1300, 620, 1.1]])}>
        {/* # A: the checkout — shopper, store owner behind the counter, the lender at the side collecting the fee */}
        <g opacity={A}>
          <g opacity={on(f, store, 6)} transform={`translate(${ox} 300) scale(${pop(f, store)})`}><rect x={-230} y={-60} width={460} height={110} rx={18} fill={P.coral} /><Label x={0} y={22} text="THE STORE" size={72} font="Bebas Neue" color="#FFFFFF" /></g>
          <Person f={f} who="owner" beats={owner} x={ox} y={1180} s={1.3} flip life={5} />
          <Counter x={800} y={800} w={1000} />
          <g opacity={on(f, choose, 6)}><Terminal x={720} y={800} s={1.1} text={f >= tap ? 'CARD' : 'LATER'} lit={f >= later ? 1 : 0} /></g>
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [lender, 'receive', 'smiling'], [sale, 'hold', 'smiling'], [card, 'receive', 'smiling']]} x={lx} y={1180} s={1.3} flip life={8} o={on(f, lender - 4, 8)} />
          <g opacity={on(f, lender, 6)} transform={`translate(${lx} 360)`}><rect x={-140} y={-50} width={280} height={90} rx={16} fill={P.navy2} /><Label x={0} y={16} text="LENDER" size={60} font="Bebas Neue" color={P.white} /></g>
          <Coin x={coin1.x} y={coin1.y} s={1} o={coin1.o} text="FEE" />
          <Coin x={coin2.x} y={coin2.y} s={0.8} o={coin2.o} />
          <g opacity={on(f, sale, 6) * (1 - on(f, works, 8))} transform={`translate(${ox - 260} 620) rotate(-6) scale(${pop(f, sale) * 0.7})`}><Prop id="receipt" x={0} y={0} size={170} f={f} /></g>
          <g opacity={on(f, card, 6)}><Label x={1330} y={520} text="CARD FEE" size={52} font="Bebas Neue" color={P.ink} o={1 - on(f, each, 6)} /></g>
          <Person f={f} who="hero" beats={hero} x={330} y={1190} s={1.4} life={2} />
          {f >= tap - 4 && f < card + 30 && <g transform={`translate(${heroHand.x + 40} ${heroHand.y - 20}) rotate(-14) scale(${pop(f, tap - 4) * 0.8})`}><Prop id="credit-card" x={0} y={0} size={140} f={f} /></g>}
        </g>
        {/* # B: many shops, many small fees → a pile; the year's purchases → a mountain; $100 → $2.30 */}
        <g opacity={B}>
          <g opacity={1 - on(f, together, 10)}>
            {Array.from({ length: 12 }, (_, k) => { const at = across + k * 1.2, x = 300 + (k % 6) * 150, y = 380 + Math.floor(k / 6) * 150
              const cf = fly(f, at + 10 + (k % 4) * 4, [x, y + 40], [620, 820], 22, 60)
              return <g key={k}><g opacity={on(f, at, 5) * (1 - on(f, d115 - 4, 8))} transform={`translate(${x} ${y}) scale(${pop(f, at) * 0.85})`}><Prop id="shop-mini" x={0} y={0} size={210} f={f} /></g>
                {f > at + 10 && <Coin x={cf.x} y={cf.y} s={0.5} o={cf.o} />}</g> })}
            <g opacity={on(f, each, 6) * (1 - on(f, across, 6))} transform={`translate(620 560) scale(${pop(f, each) * (f >= small ? 0.7 : 1.1)})`}><Coin x={0} y={0} s={1.6} text="FEE" /></g>
            {/* # the pile grows on "serious money" */}
            {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, serious + k * 1.5, 4)}><rect x={480} y={900 - k * 30} width={280} height={26} rx={8} fill={k % 2 ? P.gold : '#E2B444'} stroke={P.goldD} strokeWidth={3} /></g>)}
            <g opacity={on(f, d115, 6)} transform={`translate(620 470) scale(${pop(f, d115) * 0.9})`}><Stat x={0} y={0} big="$1.15 BILLION" small={f >= merchant ? 'FROM STORE FEES' : ''} w={600} /></g>
            <g opacity={on(f, fiscal16, 6) * (1 - on(f, together, 8))} transform={`translate(860 760) scale(${pop(f, fiscal16) * 0.8})`}><Calendar x={0} y={0} text="1 YEAR" s={1} /></g>
            <g opacity={on(f, affirm16, 6) * (1 - on(f, d115, 6))} transform={`translate(620 680) scale(${pop(f, affirm16)})`}><rect x={-130} y={-44} width={260} height={88} rx={14} fill={P.card} /><Label x={0} y={18} text="AFFIRM" size={56} font="Bebas Neue" color={P.ink} /></g>
            <Label x={620} y={1000} text={f >= earned ? 'AFFIRM, ONE YEAR' : ''} size={52} font="Bebas Neue" color={P.ink2} />
            {/* # purchases: a mountain of shopping bags */}
            {Array.from({ length: 15 }, (_, k) => { const row = k < 5 ? 0 : k < 9 ? 1 : k < 12 ? 2 : k < 14 ? 3 : 4, i = [0, 5, 9, 12, 14][row], col = k - i, n = 5 - row
              const at = financed + k * 1.2, x = 1380 + (col - (n - 1) / 2) * 150, y = 930 - row * 130
              return <g key={k} opacity={on(f, at, 5)} transform={`translate(${x} ${y - (1 - easeOut(span(f, at, at + 10))) * 80}) scale(1)`}><Prop id={k % 3 === 1 ? 'grocery-basket' : 'shopping-bag'} x={0} y={0} size={150} f={f} /></g> })}
            <g opacity={on(f, d502, 6)} transform={`translate(1380 330) scale(${pop(f, d502) * 0.9})`}><Stat x={0} y={0} big="$50.2 BILLION" small={f >= purchases ? 'OF PURCHASES' : ''} color={P.mintInk} w={600} /></g>
          </g>
          {/* # together: $100 of shopping → $2.30 to the lender */}
          <g opacity={on(f, together, 10)}>
            <g transform={`translate(760 640) scale(${pop(f, together)})`}><rect x={-230} y={-160} width={460} height={320} rx={30} fill={P.mint} /><Label x={0} y={30} text={f >= d100 ? '$100' : ''} size={150} font="Bebas Neue" color="#FFFFFF" /><Label x={0} y={120} text={f >= d100 ? 'OF SHOPPING' : 'SHOPPING'} size={52} font="Bebas Neue" color="#FFFFFF" /></g>
            <path d="M1010 640 H1160" stroke={P.ink} strokeWidth={10} opacity={on(f, d2, 6)} /><path d="M1160 615 L1200 640 L1160 665 Z" fill={P.ink} opacity={on(f, d2, 6)} />
            <g opacity={on(f, d2, 6)} transform={`translate(1400 640) scale(${pop(f, d2)})`}><circle r={150} fill={P.gold} /><circle r={120} fill="none" stroke={P.goldD} strokeWidth={8} /><Label x={0} y={36} text={f >= d30 ? '$2.30' : '$2'} size={110} font="Bebas Neue" color={P.navy0} /></g>
            <Label x={1400} y={880} text="TO THE LENDER" size={56} font="Bebas Neue" color={P.ink} o={on(f, d30, 6)} />
          </g>
        </g>
      </g>
      <Vignette id="bt" />
    </g>
  )
}

// ---------------------------------------------------------------- s19–s25: CFPB — merchant fees ≈ 2.5% (2021) → $2.50 off the $100 sneakers; why agree? a lender's pitch: +41% orders, +30% checkouts (its own claims); 571,000 stores (Affirm), 1.2M+ (Klarna); 0% plans: a bigger fee from the store
const Pitch: React.FC<PieceProps> = ({ f, c }) => {
  const bureau = c('s19:bureau'), five = c('s19:five'), pattern = c('s19:pattern'), averaged = c('s19:averaged'), d25 = c('s19:25')
  const sneakers = c('s20:sneakers'), d2 = c('s20:2'), d50 = c('s20:50'), gives = c('s20:gives')
  const why = c('s21:why'), agree = c('s21:agree')
  const promise = c('s22:promise'), quoted = c('s22:quoted'), advertised = c('s22:advertised'), d41 = c('s22:41'), d30 = c('s22:30'), checkouts = c('s22:checkouts')
  const claims = c('s23:claims'), independent = c('s23:independent'), signing = c('s23:signing'), affirm = c('s23:affirm'), d571 = c('s23:571000')
  const klarna = c('s23a:klarna'), d12 = c('s23a:12'), stores23a = c('s23a:stores'), offer23a = c('s23a:offer')
  const twist = c('s24:twist'), longer = c('s24:longer'), zero = c('s24:zero'), bigger = c('s24:bigger'), fee = c('s24:fee')
  const sofa = c('s25:sofa'), laptop = c('s25:laptop'), zero2 = c('s25:zero'), year = c('s25:year'), often = c('s25:often'), free = c('s25:free')
  const A = win(f, bureau, sneakers), B = win(f, sneakers, why), Cc = win(f, why, signing), D = win(f, signing, twist), E = on(f, twist, 10)
  const owner: Beat[] = [[0, 'idle', 'neutral'], [sneakers, 'hold', 'neutral'], [gives, 'nervous', 'worried'], [why, 'scratchHead', 'thinking'], [promise, 'think', 'thinking'], [d41, 'nodA', 'smiling', 'nodB', 18], [claims, 'armsCrossed', 'smug'], [signing, 'thumbsUp', 'smiling'],
    [twist, 'idle', 'neutral'], [sofa, 'present', 'smiling'], [often, 'emptyPockets', 'worried']]
  const ox = f < twist ? 520 : 460
  return (
    <g>
      <Stage id="bp" frame={f} />
      <Headline f={f} lines={[[bureau, 'THE US CONSUMER FINANCE BUREAU', P.ink, 96], [five, 'STUDIED 5 BIG LENDERS', P.ink, 116], [d25, 'MERCHANT FEES ≈ 2.5% (2021)', P.goldInk, 110], [sneakers, 'ON YOUR $100 SNEAKERS…', P.ink, 110], [d50, '…≈ $2.50 FROM THE STORE', P.coralInk, 116],
        [why, 'WHY WOULD A STORE AGREE?', P.ink, 110], [promise, 'THE PROMISE: BIGGER SALES', P.goldInk, 110], [d41, '+41% BIGGER ORDERS', P.mintInk, 120], [d30, '+30% MORE CHECKOUTS', P.mintInk, 120],
        [claims, 'THE LENDER’S OWN CLAIMS', P.ink, 110], [independent, 'NOT INDEPENDENT TESTS', P.coralInk, 116], [d571, 'AFFIRM: ≈ 571,000 STORES', P.goldInk, 110], [d12, 'KLARNA: 1.2 MILLION+ STORES', P.skyInk, 106],
        [twist, 'A TWIST', P.ink, 130], [zero, '0% PLANS…', P.mintInk, 130], [bigger, '…A BIGGER FEE FROM THE STORE', P.coralInk, 100], [often, 'THE STORE PAYS FOR “FREE”', P.coralInk, 110]]} />
      <g transform={camera(f, [[c("s24:affirm"), 1100, 640, 1.05], [c("s23:lender's"), 1160, 600, 1.04], [c("s22:one"), 1200, 560, 1.05], [c("s19:in"), 1300, 860, 1.08], [c("s19:consumer"), 1300, 540, 1.05], [five, 1300, 560, 1.08], [sneakers, 960, 540, 1], [d50, 1160, 600, 1.12], [why, 960, 540, 1], [d41, 1300, 560, 1.1], [checkouts, 960, 540, 1], [d571, 1240, 640, 1.08], [twist, 960, 540, 1], [bigger, 1240, 640, 1.1], [often, 960, 540, 1]])}>
        {/* # A: the bureau's study: a building, five lenders, the average fee */}
        <g opacity={A}>
          <g transform={`translate(1300 560) scale(${pop(f, bureau)})`}><Prop id="bank" x={0} y={0} size={300} f={f} /><Label x={0} y={210} text="CFPB" size={72} font="Bebas Neue" color={P.ink} /></g>
          {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, five + k * 2, 6) * (1 - on(f, averaged, 8))} transform={`translate(${900 + k * 200} 900) scale(${pop(f, five + k * 2) * 0.8})`}><circle r={70} fill={P.card} /><Prop id="briefcase" x={0} y={0} size={90} f={f} /></g>)}
          <g opacity={on(f, averaged, 6)} transform={`translate(1300 900) scale(${pop(f, d25) * 0.85})`}><Stat x={0} y={0} big={f >= d25 ? '≈ 2.5%' : '…'} small={f >= d25 ? 'OF SALES, 2021' : ''} color={P.goldInk} w={500} /></g>
          <g opacity={on(f, pattern, 6) * (1 - on(f, averaged, 6))} transform={`translate(1640 760) scale(${pop(f, pattern) * 0.8})`}><Prop id="magnifier" x={0} y={0} size={150} f={f} /></g>
        </g>
        {/* # B: the $100 sneakers; ≈ $2.50 snips off to the lender */}
        <g opacity={B}>
          <g transform={`translate(1150 760) scale(${pop(f, sneakers) * 1.4})`}><SneakerBox x={0} y={0} /></g>
          <g transform="translate(1150 480) rotate(-6)"><rect x={-150} y={-60} width={300} height={120} rx={18} fill={P.paper} /><Label x={0} y={30} text="$100" size={96} font="Bebas Neue" color={P.navy0} /></g>
          {(() => { const m = fly(f, gives - 6, [1150, 560], [1640, 420], 20, 100); return <g opacity={on(f, d2, 6)}><Coin x={f < gives - 6 ? 1300 : m.x} y={f < gives - 6 ? 600 : m.y} s={1.5} text={f >= d50 ? '$2.50' : '$2'} /></g> })()}
          <g opacity={on(f, gives, 6)} transform={`translate(1700 420) scale(${pop(f, gives) * 0.8})`}><circle r={90} fill={P.card} /><Prop id="bank" x={0} y={-4} size={110} f={f} /></g>
        </g>
        {/* # C: the lender's pitch to the store: two claimed numbers on a board */}
        <g opacity={Cc}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [promise, 'pitch', 'smug'], [quoted, 'explain', 'smiling'], [d41, 'pitch', 'smug'], [d30, 'taDa', 'smiling']]} x={1650} y={1180} s={1.3} flip life={8} o={on(f, promise - 4, 8)} />
          <g opacity={on(f, advertised, 6)} transform={`translate(1160 560) scale(${pop(f, advertised)})`}>
            <rect x={-300} y={-230} width={600} height={430} rx={22} fill={P.paper} /><Label x={0} y={-160} text="FOR STORES" size={56} font="Bebas Neue" color={P.navy2} />
            <rect x={-240} y={-90} width={480 * 0.41 / 0.41 * on(f, d41, 14)} height={80} rx={12} fill={P.mint} opacity={on(f, d41, 4)} /><Label x={-230} y={-30} text={f >= d41 ? '+41% ORDER SIZE' : ''} size={48} font="Bebas Neue" color={P.navy0} anchor="start" />
            <rect x={-240} y={40} width={480 * (30 / 41) * on(f, d30, 14)} height={80} rx={12} fill={P.sky} opacity={on(f, d30, 4)} /><Label x={-230} y={100} text={f >= d30 ? '+30% CHECKOUTS' : ''} size={48} font="Bebas Neue" color={P.navy0} anchor="start" />
          </g>
          <g opacity={on(f, quoted, 6)} transform={`translate(1160 280) scale(${pop(f, quoted) * 0.7})`}><Prop id="newspaper" x={0} y={0} size={130} f={f} /></g>
          <Stamp x={1160} y={600} text="SALES PITCH" f={f} at={independent} color={P.coralInk} size={84} />
        </g>
        {/* # D: "their own claims"; stores keep signing up — a map fills with pins */}
        <g opacity={D}>
          
          <rect x={760} y={480} width={880} height={480} rx={28} fill={P.card} opacity={on(f, signing, 6)} />
          {Array.from({ length: 40 }, (_, k) => { const at = signing + k * 0.8, kl = k >= 22
            const x = 820 + rnd(k + 3) * 760, y = 520 + rnd(k + 9) * 400
            return <g key={k} opacity={on(f, kl ? klarna + (k - 22) * 0.8 : at, 4)} transform={`translate(${x} ${y}) scale(0.42)`}><Prop id="map-pin" x={0} y={0} size={90} f={f} />{kl && <circle cx={0} cy={-12} r={16} fill={P.sky} />}</g> })}
          <g opacity={on(f, d571, 6)} transform={`translate(1200 960) scale(${pop(f, d571) * 0.7})`}><Stat x={0} y={0} big={f >= d12 ? '1.2M+ (KLARNA)' : '≈ 571,000'} color={f >= d12 ? P.skyInk : P.goldInk} w={700} /></g>
          <g opacity={on(f, offer23a, 6)} transform={`translate(1560 560) rotate(8) scale(${pop(f, offer23a)})`}><rect x={-150} y={-46} width={300} height={92} rx={16} fill={P.mint} /><Label x={0} y={18} text="PAY LATER" size={56} font="Bebas Neue" color="#FFFFFF" /></g>
          {f >= stores23a && <circle cx={1200} cy={720} r={120 + ((f - stores23a) % 30) * 8} fill="none" stroke={P.skyInk} strokeWidth={6} opacity={(1 - ((f - stores23a) % 30) / 30) * (1 - on(f, twist - 8, 6))} />}
          <Label x={1200} y={455} text={f >= affirm ? 'STORES OFFERING IT' : ''} size={50} font="Bebas Neue" color={P.ink2} />
        </g>
        {/* # E: 0% for a year on a sofa and a laptop — the store pays a bigger fee for that "free" */}
        <g opacity={E}>
          <g opacity={on(f, sofa, 6)} transform={`translate(1060 760) scale(${pop(f, sofa)})`}>
            <rect x={-200} y={-80} width={400} height={110} rx={30} fill="#3A6EA8" /><rect x={-170} y={-170} width={340} height={110} rx={30} fill="#4A80BC" /><rect x={-230} y={-120} width={70} height={160} rx={26} fill="#2F5C8E" /><rect x={160} y={-120} width={70} height={160} rx={26} fill="#2F5C8E" />
            <rect x={-180} y={30} width={20} height={36} fill="#2A2F38" /><rect x={160} y={30} width={20} height={36} fill="#2A2F38" /></g>
          <g opacity={on(f, laptop, 6)} transform={`translate(1520 720) scale(${pop(f, laptop)})`}><Prop id="laptop" x={0} y={0} size={240} f={f} /></g>
          <g opacity={on(f, zero2, 6)} transform={`translate(1290 470) rotate(-6) scale(${pop(f, zero2)})`}><rect x={-230} y={-70} width={460} height={140} rx={20} fill={P.mint} /><Label x={0} y={22} text={f >= year ? '0% FOR A YEAR' : '0%'} size={76} font="Bebas Neue" color="#FFFFFF" /></g>
          {(() => { const m = fly(f, fee, [ox + 120, 720], [1780, 360], 22, 120); return <><Coin x={m.x} y={m.y} s={lerp(1, 1.8, on(f, bigger, 10))} o={m.o + on(f, fee + 22, 4)} text="FEE" /></> })()}
          <g opacity={on(f, longer, 6) * (1 - on(f, sofa, 6))} transform="translate(1200 640) scale(1.5)"><Calendar x={-160} y={0} text="12 MO" s={1.2} /><Label x={80} y={20} text={f >= zero ? '0%' : ''} size={110} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <Person f={f} who="owner" beats={owner} x={ox} y={1180} s={1.4} life={5} o={on(f, sneakers - 6, 8)} />
        <g opacity={on(f, free, 6)} transform={`translate(${ox + 200} 420) scale(${pop(f, free)})`}><Prop id="exclamation" x={0} y={0} size={110} f={f} /></g>
      </g>
      <Vignette id="bp" />
    </g>
  )
}

// ---------------------------------------------------------------- s26–s30a: payer #2 is you on a longer plan with interest; Affirm: 27.8M customers; GMV 70% interest-bearing monthly, 16% pay-in-four, 14% 0% monthly; the rate depends on credit, term, amount — partner banks allow up to 36%; simple interest, but it still adds up
const Interest: React.FC<PieceProps> = ({ f, c }) => {
  const choose = c('s26:choose'), longer = c('s26:longer'), charges = c('s26:charges'), interest = c('s26:interest')
  const affirm = c('s27a:affirm'), d278 = c('s27a:278'), customers = c('s27a:customers'), june = c('s27a:june')
  const most = c('s27:most'), split = c('s27:split'), four = c('s27:four')
  const d70 = c('s28:70'), monthly = c('s28:monthly'), charge = c('s28:charge')
  const d16 = c('s29:16'), classic = c('s29:classic'), d14 = c('s29:14'), zero = c('s29:zero')
  const rate = c('s30:rate'), credit = c('s30:credit'), long = c('s30:long'), much = c('s30:much'), partner = c('s30:partner'), d36 = c('s30:36')
  const simple = c('s30a:simple'), never = c('s30a:never'), rates = c('s30a:rates'), real = c('s30a:real'), price = c('s30a:price')
  const A = win(f, choose, affirm), B = win(f, affirm, most), Cc = win(f, most, rate), D = win(f, rate, simple), E = on(f, simple, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [choose, 'signA', 'neutral', 'signB', 14], [charges, 'read', 'thinking'], [affirm, 'idle', 'neutral'], [most, 'explain', 'neutral'], [d70, 'pointUp', 'neutral'], [rate, 'think', 'thinking'], [d36, 'shock', 'shocked'], [simple, 'explain', 'neutral'], [never, 'thumbsUp', 'smiling'], [real, 'nervous', 'worried']]
  // # donut of Affirm's FY2026 purchase volume: 70 / 16 / 14
  const R0 = 230, seg = (a0: number, a1: number) => { const q = (a: number) => [Math.sin(a * Math.PI * 2) * R0, -Math.cos(a * Math.PI * 2) * R0]; const [x0, y0] = q(a0), [x1, y1] = q(a1); return `M${x0} ${y0} A${R0} ${R0} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${x1} ${y1}` }
  const p70 = 0.7 * on(f, d70, 18), p16 = 0.16 * on(f, d16, 12), p14 = 0.14 * on(f, d14, 12)
  return (
    <g>
      <Stage id="bi" frame={f} tint="teal" />
      <Headline f={f} lines={[[choose, 'PAYER #2: YOU', P.goldInk, 124], [longer, 'A LONGER PLAN…', P.ink, 120], [charges, '…THAT CHARGES INTEREST', P.coralInk, 116], [d278, 'AFFIRM: ≈ 27.8 MILLION CUSTOMERS', P.ink, 100], [most, 'MOST ISN’T SPLIT IN FOUR', P.ink, 110],
        [d70, '70%: MONTHLY LOANS WITH INTEREST', P.coralInk, 100], [d16, '16%: PAY IN FOUR', P.skyInk, 116], [d14, '14%: MONTHLY AT 0%', P.mintInk, 116], [rate, 'THE RATE DEPENDS ON YOU', P.ink, 110], [d36, 'UP TO 36% A YEAR', P.coralInk, 130],
        [simple, 'SIMPLE INTEREST', P.ink, 124], [never, 'NO INTEREST ON INTEREST', P.mintInk, 110], [real, 'STILL A REAL AMOUNT', P.coralInk, 116]]} />
      <g transform={camera(f, [[c("s30a:longer"), 1180, 640, 1.05], [c("s30a:but"), 960, 540, 1], [c("s30a:says"), 1160, 680, 1.05], [c("s28:fiscal"), 1100, 600, 1.03], [charges, 1240, 600, 1.1], [affirm, 960, 540, 1], [d70, 1160, 600, 1.05], [d14, 1160, 580, 1.06], [rate, 960, 540, 1], [d36, 1300, 560, 1.12], [simple, 960, 540, 1], [price, 1300, 640, 1.1]])}>
        {/* # A: the shopper signs a monthly plan; the contract shows 12 payments and an interest rate */}
        <g opacity={A}>
          <rect x={300} y={830} width={1300} height={30} rx={10} fill="#8C6A48" /><rect x={340} y={860} width={30} height={240} fill="#6E5236" /><rect x={1530} y={860} width={30} height={240} fill="#6E5236" />
          <g opacity={on(f, longer, 6)} transform={`translate(1240 560) scale(${pop(f, longer) * 0.95})`}><Doc x={0} y={0} title="PLAN" lines={3} stamp={f >= interest ? '% APR' : undefined} stampO={on(f, interest, 6)} />
            {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-110 + (k % 6) * 38} y={60 + Math.floor(k / 6) * 34} width={28} height={24} rx={5} fill={P.sky} opacity={on(f, longer + 4 + k, 4)} />)}</g>
          <g opacity={on(f, charges, 6)} transform={`translate(1560 380) scale(${pop(f, charges)})`}><Prop id="interest-percent" x={0} y={0} size={170} f={f} /></g>
        </g>
        {/* # B: a crowd: 27.8 million customers */}
        <g opacity={B}>
          {Array.from({ length: 36 }, (_, k) => { const col = k % 9, row = Math.floor(k / 9), at = affirm + (col + row) * 1.2
            return <g key={k} opacity={on(f, at, 5)}><Mini look={['hero', 'buyer', 'investor', 'owner', 'worker'][(k * 3) % 5]} x={820 + col * 110 + (row % 2) * 40} y={480 + row * 140} scale={0.62} frame={f} seed={k + 90} mood="happy" /></g> })}
          <g opacity={on(f, d278, 6)} transform={`translate(1260 950) scale(${pop(f, d278) * 0.75})`}><Stat x={0} y={0} big="27.8 MILLION" small={f >= customers ? (f >= june ? 'ACTIVE CUSTOMERS, JUNE 2026' : 'ACTIVE CUSTOMERS') : ''} w={760} /></g>
        </g>
        {/* # C: the donut of what Affirm finances */}
        <g opacity={Cc}>
          <g transform="translate(1080 600)">
            <circle r={R0} fill="none" stroke={P.navy3} strokeWidth={110} opacity={0.5} />
            {p70 > 0.001 && <path d={seg(0, p70)} fill="none" stroke={P.coral} strokeWidth={110} />}
            {p16 > 0.001 && <path d={seg(0.7, 0.7 + p16)} fill="none" stroke={P.sky} strokeWidth={110} />}
            {p14 > 0.001 && <path d={seg(0.86, 0.86 + p14)} fill="none" stroke={P.mint} strokeWidth={110} />}
            <Label x={0} y={30} text={f >= d14 ? '100%' : f >= d70 ? '70%' : ''} size={110} font="Bebas Neue" color={P.ink} />
          </g>
          <g opacity={on(f, split, 6) * (1 - on(f, d70, 6))} transform={`translate(1080 600) scale(${pop(f, split)})`}>{[0, 1, 2, 3].map((k) => <rect key={k} x={-150 + k * 76} y={-50} width={66} height={100} rx={10} fill={P.paper} opacity={on(f, four, 4)} />)}<path d="M-180 -80 L180 80 M180 -80 L-180 80" stroke={P.coral} strokeWidth={14} opacity={on(f, four + 4, 4)} /></g>
          {[[d70, P.coralInk, '70% INTEREST-BEARING', 380], [d16, P.skyInk, '16% PAY IN 4', 560], [d14, P.mintInk, '14% MONTHLY AT 0%', 740]].map(([at, col, t, y], k) => <g key={k} opacity={on(f, at as number, 6)}><circle cx={1400} cy={(y as number) - 16} r={18} fill={col as string} /><Label x={1430} y={y as number} text={t as string} size={48} font="Bebas Neue" color={P.ink} anchor="start" /></g>)}
        </g>
        {/* # D: the rate dial — credit, term and amount turn it; partner banks allow up to 36% */}
        <g opacity={D}>
          <g transform="translate(1280 820) scale(0.85)">
            <path d="M-300 0 A300 300 0 0 1 300 0" fill="none" stroke={P.navy3} strokeWidth={50} />
            <path d={`M-300 0 A300 300 0 0 1 ${-Math.cos(Math.PI * on(f, d36, 20)) * 300} ${-Math.sin(Math.PI * on(f, d36, 20)) * 300}`} fill="none" stroke={P.coral} strokeWidth={50} opacity={on(f, d36, 4)} />
            {(() => { const a = Math.PI * (0.15 + 0.12 * Math.sin((f - rate) / 9) * (1 - on(f, d36, 6)) + 0.85 * on(f, d36, 20)); return <path d={`M0 0 L${-Math.cos(a) * 240} ${-Math.sin(a) * 240}`} stroke={P.ink} strokeWidth={14} strokeLinecap="round" /> })()}
            <circle r={26} fill={P.ink} /><Label x={-300} y={70} text="0%" size={56} font="Bebas Neue" color={P.ink} /><Label x={300} y={70} text={f >= d36 ? '36%' : ''} size={64} font="Bebas Neue" color={P.coralInk} />
          </g>
          {[[credit, 'YOUR CREDIT', 'shield'], [long, 'HOW LONG', 'calendar'], [much, 'HOW MUCH', 'money-bag']].map(([at, t, id], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${880 + k * 400} 300) scale(${pop(f, at as number) * 0.85})`}><circle r={80} fill={P.card} /><Prop id={id as string} x={0} y={-6} size={120} f={f} /><Label x={0} y={140} text={t as string} size={52} font="Bebas Neue" color={P.ink} /></g>)}
          <g opacity={on(f, partner, 6)} transform={`translate(1700 860) scale(${pop(f, partner) * 0.8})`}><circle r={80} fill={P.card} /><Prop id="bank" x={0} y={-6} size={120} f={f} /><Label x={0} y={140} text="PARTNER BANKS" size={52} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # E: simple interest — a straight line of coins, never a snowball; but the price still grows */}
        <g opacity={E}>
          <g opacity={1 - on(f, rates, 8)}>
            {Array.from({ length: 6 }, (_, k) => <Coin key={k} x={900 + k * 130} y={800 - k * 40} s={0.9} o={on(f, simple + k * 3, 5)} />)}
            <path d="M880 820 L1560 580" stroke={P.mintInk} strokeWidth={8} strokeDasharray="16 12" opacity={on(f, simple + 18, 6)} />
            <g opacity={on(f, never, 6)} transform={`translate(1640 440) scale(${pop(f, never)})`}><Prop id="snowball" x={0} y={0} size={170} f={f} /><path d="M-90 -90 L90 90 M90 -90 L-90 90" stroke={P.coral} strokeWidth={16} strokeLinecap="round" /></g>
          </g>
          <g opacity={on(f, rates, 8)}>
            <g transform="translate(1260 640)"><rect x={-360} y={-90} width={420} height={180} rx={24} fill={P.paper} /><Label x={-150} y={30} text="PRICE" size={90} font="Bebas Neue" color={P.navy0} />
              <rect x={70} y={-90} width={290 * on(f, real, 20)} height={180} rx={24} fill={P.coral} opacity={on(f, real, 4)} /><Label x={215} y={22} text={f >= real + 10 ? '+ INTEREST' : ''} size={60} font="Bebas Neue" color="#FFFFFF" /></g>
            <g opacity={on(f, price, 6)} transform={`translate(1260 900) scale(${pop(f, price) * 0.8})`}><Prop id="arrow-up" x={0} y={0} size={140} f={f} /></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={430} y={1190} s={1.45} life={6} />
        {/* # the pen in the signing hand */}
        {f >= choose && f < charges && (() => { const h = hand(f, hero, 430, 1190, 1.45); return <path d={`M${h.x - 6} ${h.y + 4} l60 -70`} stroke={P.navy0} strokeWidth={12} strokeLinecap="round" /> })()}
      </g>
      <Vignette id="bi" />
    </g>
  )
}

// ---------------------------------------------------------------- s31–s35: interest is Affirm's biggest source (≈ $2.05B); of each revenue dollar ≈ 48¢ interest, ≈ 27¢ store fees; per $100 financed: Affirm ≈ $8.50 vs Klarna < $3; Affirm's interest alone ≈ $4 > all of Klarna's; lending at interest
const Split: React.FC<PieceProps> = ({ f, c }) => {
  const biggest = c('s31:biggest'), source = c('s31:source'), d205 = c('s31:205'), last = c('s31:last')
  const dollar = c('s32:dollar'), d48 = c('s32:48'), d27 = c('s32:27'), fees = c('s32:fees')
  const compare = c('s33:compare'), affirm = c('s33:affirm'), d8 = c('s33:8'), d50 = c('s33:50'), d100 = c('s33:100'), financed = c('s33:financed')
  const klarna = c('s34:klarna'), under = c('s34:under'), d3 = c('s34:3'), quarter = c('s34:quarter')
  const alone = c('s35:alone'), d4 = c('s35:4'), more = c('s35:more'), name = c('s35:name'), money = c('s35:money'), oldest = c('s35:oldest'), banking = c('s35:banking'), lending = c('s35:lending')
  const A = win(f, c('s31'), compare), B = win(f, compare, name), Cc = on(f, name, 10)
  // # Affirm FY2026 revenue lines ($M), biggest first
  const lines: [string, number, string][] = [['INTEREST', 2047.485, P.coral], ['STORE FEES', 1149.932, P.gold], ['LOAN SALES', 596.553, P.sky], ['CARD FEES', 293.99, P.mint], ['SERVICING', 173.123, '#9AD9A8']]
  const banker: Beat[] = [[0, 'idle', 'neutral'], [name, 'pitch', 'smug'], [money, 'countA', 'smiling', 'countB', 14], [lending, 'confident', 'smug']]
  const J = 520 // # jar height for $10 per $100
  return (
    <g>
      <Stage id="bx" frame={f} />
      <Headline f={f} lines={[[biggest, 'INTEREST: THE BIGGEST SOURCE', P.coralInk, 104], [d205, '≈ $2.05 BILLION', P.coralInk, 130], [d48, '48¢ OF EACH REVENUE DOLLAR', P.coralInk, 104], [d27, 'STORE FEES: 27¢', P.goldInk, 116],
        [compare, 'TWO BIG LENDERS', P.ink, 120], [d50, 'AFFIRM: ≈ $8.50…', P.ink, 124], [d100, '…PER $100 FINANCED', P.ink, 116], [d3, 'KLARNA: UNDER $3 PER $100', P.skyInk, 110], [d4, 'AFFIRM’S INTEREST ALONE: ≈ $4', P.coralInk, 100],
        [name, 'THE NAME SAYS “PAY LATER”…', P.ink, 104], [oldest, '…THE OLDEST BUSINESS IN BANKING', P.ink, 100], [lending, 'LENDING AT INTEREST', P.coralInk, 124]]} />
      <g transform={camera(f, [[c("s35:klarna's"), 1380, 640, 1.06], [c("s33:revenue"), 1000, 620, 1.05], [c("s32:interest"), 1240, 600, 1.06], [d205, 760, 520, 1.1], [dollar, 960, 540, 1], [d27, 1320, 620, 1.1], [compare, 960, 540, 1], [d4, 860, 640, 1.08], [name, 960, 540, 1]])}>
        {/* # A: Affirm's five revenue lines as bars; interest is the biggest; then one revenue dollar split 48 / 27 */}
        <g opacity={A}>
          <g opacity={1 - on(f, dollar, 10)}>
            {lines.map(([t, v, col], k) => { const at = k === 0 ? biggest : source + k * 3, w = 820 * (v / 2047.485)
              return <g key={k} opacity={on(f, at, 6) * (k === 0 ? 1 : 0.75)}><rect x={300} y={330 + k * 130} width={w * on(f, at, 14)} height={90} rx={16} fill={k === 0 ? col : P.navy4} />
                <Label x={300 + 20} y={392 + k * 130} text={k === 0 ? t : ''} size={56} font="Bebas Neue" color={P.navy0} anchor="start" /></g> })}
            <Label x={1150} y={404} text={f >= d205 ? '≈ $2.05B' : ''} size={84} font="Bebas Neue" color={P.coralInk} anchor="start" />
            <Label x={1150} y={1000} text={f >= last ? 'AFFIRM REVENUE, LAST YEAR' : ''} size={52} font="Bebas Neue" color={P.ink2} anchor="start" />
          </g>
          <g opacity={on(f, dollar, 10)} transform="translate(1260 620)">
            {(() => { const r = 260, a48 = Math.PI * 2 * 0.4805 * on(f, d48, 16), a27 = Math.PI * 2 * 0.2699 * on(f, d27, 14)
              const pie = (a0: number, a1: number, col: string) => a1 - a0 > 0.001 ? <path d={`M0 0 L${Math.sin(a0) * r} ${-Math.cos(a0) * r} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${Math.sin(a1) * r} ${-Math.cos(a1) * r} Z`} fill={col} /> : null
              return <g><circle r={r} fill={P.gold} opacity={0.35} /><circle r={r} fill="none" stroke={P.goldD} strokeWidth={10} />{pie(0, a48, P.coral)}{pie(Math.PI * 2 * 0.4805, Math.PI * 2 * 0.4805 + a27, P.gold)}
                <Label x={130} y={-30} text={f >= d48 ? '48¢' : ''} size={90} font="Bebas Neue" color="#FFFFFF" /><Label x={-150} y={140} text={f >= d27 ? '27¢' : ''} size={90} font="Bebas Neue" color={P.navy0} /></g> })()}
            <Label x={0} y={330} text="ONE DOLLAR OF REVENUE" size={56} font="Bebas Neue" color={P.ink} />
          </g>
        </g>
        {/* # B: two jars — revenue per $100 financed: Affirm ≈ $8.50 (≈ $4 of it interest) vs Klarna under $3 */}
        <g opacity={B}>
          {[[760, 'AFFIRM', affirm, 8.49, P.gold], [1380, 'KLARNA', klarna, 2.85, P.sky]].map(([x, t, at, v, col], k) => (
            <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${x} 0)`}>
              <rect x={-170} y={940 - J} width={340} height={J} rx={30} fill="none" stroke={P.ink2} strokeWidth={8} />
              <rect x={-160} y={930 - J * ((v as number) / 10) * on(f, k ? d3 : d8, 20)} width={320} height={J * ((v as number) / 10) * on(f, k ? d3 : d8, 20)} rx={24} fill={col as string} />
              {k === 0 && <rect x={-160} y={930 - J * (4.08 / 10) * on(f, d4, 16)} width={320} height={J * (4.08 / 10) * on(f, d4, 16)} rx={24} fill={P.coral} opacity={on(f, d4, 4)} />}
              {k === 0 && <Label x={0} y={900} text={f >= d4 ? 'INTEREST ≈ $4' : ''} size={52} font="Bebas Neue" color="#FFFFFF" />}
              <Label x={0} y={1010} text={t as string} size={64} font="Bebas Neue" color={P.ink} />
              <Label x={0} y={k ? 900 - J * ((v as number) / 10) - 20 : 390} text={k ? (f >= under ? 'UNDER $3' : '') : (f >= d50 ? '≈ $8.50' : f >= d8 ? '≈ $8' : '')} size={70} font="Bebas Neue" color={P.ink} />
            </g>))}
          <path d={`M560 ${930 - J * 0.285} H1580`} stroke={P.skyInk} strokeWidth={5} strokeDasharray="14 10" opacity={on(f, more, 6)} />
          <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [compare, 'weighA', 'thinking', 'weighB', 22], [d3, 'pointDown', 'neutral'], [d4, 'shock', 'shocked']]} x={250} y={1190} s={1.3} life={3} o={on(f, compare - 4, 8)} />
          <Label x={1070} y={300} text={f >= d100 ? 'REVENUE PER $100 FINANCED' : ''} size={56} font="Bebas Neue" color={P.ink2} />
          <Label x={1380} y={1060} text={f >= quarter ? 'LATEST QUARTER' : ''} size={44} font="Bebas Neue" color={P.ink2} />
          
        </g>
        {/* # C: the oldest business in banking: a bank, a banker counting interest */}
        <g opacity={Cc}>
          <g opacity={on(f, banking, 6)} transform={`translate(1300 560) scale(${pop(f, banking)})`}><Prop id="bank" x={0} y={0} size={420} f={f} /></g>
          <g opacity={on(f, name, 6)} transform={`translate(1300 340) scale(${pop(f, name) * (1 - 0.3 * on(f, oldest, 10))})`}><rect x={-240} y={-60} width={480} height={110} rx={20} fill={P.mint} opacity={1 - on(f, banking, 8)} /><Label x={0} y={20} text="PAY LATER" size={72} font="Bebas Neue" color="#FFFFFF" o={1 - on(f, banking, 8)} /></g>
          {Array.from({ length: 6 }, (_, k) => { const t0 = oldest + k * 6, cyc = f > t0 + 24 ? t0 + Math.floor((f - t0) / 36) * 36 : t0, m = fly(f, cyc, [1300, 620], [700, 820], 20, 140); return <Coin key={k} x={m.x} y={m.y} s={0.9} o={m.o} text="%" /> })}
          {Array.from({ length: 6 }, (_, k) => <Coin key={k} x={760 + (k % 3) * 70} y={980 - Math.floor(k / 3) * 30} s={0.8} o={on(f, oldest + k * 6 + 20, 4)} text="%" />)}
          <g opacity={on(f, lending, 6)} transform={`translate(1300 900) rotate(-6) scale(${pop(f, lending)})`}><rect x={-170} y={-50} width={340} height={100} rx={16} fill={P.coral} /><Label x={0} y={20} text="+ INTEREST" size={60} font="Bebas Neue" color="#FFFFFF" /></g>
          <Person f={f} who="investor" beats={banker} x={560} y={1180} s={1.4} life={8} />
        </g>
      </g>
      <Vignette id="bx" />
    </g>
  )
}

// ---------------------------------------------------------------- s36–s40a: payer #3 you never meet — Affirm sells ≈ $21.9B of loans to banks, hedge funds, pension funds, insurers (who get the repayments), in 1–3 year deals; ≈ $597M of gains; the cash goes back out as new loans
const Sold: React.FC<PieceProps> = ({ f, c }) => {
  const someone = c('s36:someone'), meet = c('s36:meet')
  const makes = c('s37:makes'), often = c('s37:often'), keep = c('s37:keep')
  const sold = c('s38:sold'), d219 = c('s38:219'), outside = c('s38:outside'), investors = c('s38:investors')
  const banks = c('s39:banks'), hedge = c('s39:hedge'), pension = c('s39:pension'), insurance = c('s39:insurance'), receive = c('s39:receive'), repaid = c('s39:repaid')
  const sign = c('s39a:sign'), one = c('s39a:one'), three = c('s39a:three'), batches = c('s39a:batches'), again = c('s39a:again')
  const selling = c('s40:selling'), cash = c('s40:cash'), lend = c('s40:lend'), booked = c('s40:booked'), d597 = c('s40:597'), gains = c('s40:gains')
  const making = c('s40a:making'), tying = c('s40a:tying'), old = c('s40a:old')
  const A = win(f, c('s36'), banks), B = win(f, banks, sign), Cc = win(f, sign, selling), D = on(f, selling, 10)
  const lx = 520, bx = 1560
  const lender: Beat[] = [[0, 'idle', 'neutral'], [makes, 'hold', 'smiling'], [often, 'offer', 'neutral'], [sold, 'present', 'smiling'], [banks, 'explain', 'neutral'], [sign, 'signA', 'neutral', 'signB', 14], [batches, 'offer', 'smiling'], [selling, 'receive', 'smiling'], [lend, 'offer', 'smiling'], [d597, 'fistPump', 'smiling'], [making, 'offer', 'smiling'], [tying, 'confident', 'smug']]
  const buyer: Beat[] = [[0, 'idle', 'neutral'], [investors, 'receive', 'smiling'], [banks, 'idle', 'neutral'], [sign, 'signA', 'neutral', 'signB', 15], [batches, 'receive', 'smiling'], [selling, 'offer', 'neutral'], [lend, 'idle', 'smiling']]
  const lh = hand(f, lender, lx, 1180, 1.35)
  // # one loan document travelling from the lender to the buyer (s37–s38), and later batch after batch (s39a)
  const docT = easeInOut(span(f, keep, keep + 24))
  return (
    <g>
      <Stage id="bo" frame={f} />
      <Headline f={f} lines={[[c('s36:payer'), 'PAYER #3', P.goldInk, 130], [someone, 'SOMEONE YOU NEVER MEET', P.ink, 110], [often, 'THE LOAN OFTEN GETS SOLD', P.ink, 108], [d219, '≈ $21.9 BILLION SOLD', P.goldInk, 120], [investors, 'TO OUTSIDE INVESTORS', P.ink, 116],
        [banks, 'BANKS', P.ink, 124], [hedge, 'HEDGE FUNDS', P.ink, 124], [pension, 'PENSION FUNDS', P.ink, 124], [insurance, 'INSURANCE COMPANIES', P.ink, 116], [receive, 'THEY GET YOUR REPAYMENTS', P.mintInk, 108], [sign, 'SOME SIGN LONG DEALS', P.ink, 116], [three, 'RUNNING 1–3 YEARS', P.ink, 116], [again, 'AGAIN AND AGAIN', P.goldInk, 124],
        [cash, 'THE CASH COMES BACK', P.mintInk, 116], [d597, '≈ $597 MILLION OF GAINS', P.goldInk, 110], [making, 'NEW LOANS, AGAIN', P.ink, 120]]} />
      <g transform={camera(f, [[c("s40a:how"), 900, 700, 1.05], [meet, 1300, 600, 1.1], [makes, 960, 540, 1], [d219, 1060, 620, 1.08], [banks, 960, 540, 1], [receive, 1100, 640, 1.06], [sign, 960, 540, 1], [d597, 900, 620, 1.1], [making, 960, 540, 1]])}>
        {/* # A: a stranger in the shadows — then the loan leaves the lender for the investor */}
        <g opacity={A}>
          <g opacity={on(f, someone, 6) * (1 - on(f, investors, 8))} transform={`translate(${bx} 900) scale(${pop(f, someone) * 1.4})`}><Shadow x={0} y={0} q={1} /></g>
          <g opacity={on(f, makes, 6)} transform={`translate(${lerp(lh.x + 90, bx - 160, docT)} ${lerp(lh.y - 60, 640, docT) - Math.sin(docT * Math.PI) * 120}) rotate(${lerp(-6, 8, docT)}) scale(0.5)`}><Doc x={0} y={0} title="LOAN" /></g>
          <g opacity={on(f, sold, 6)} transform={`translate(1060 400) scale(${pop(f, sold)})`}><rect x={-220} y={-64} width={440} height={120} rx={16} fill={P.coral} /><Label x={0} y={24} text="SOLD" size={96} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, d219, 6)} transform={`translate(1060 900) scale(${pop(f, d219) * 0.8})`}><Stat x={0} y={0} big="$21.9 BILLION" small="OF LOANS, LAST YEAR" w={640} /></g>
        </g>
        {/* # B: who buys them — four kinds of buyer; your repayments flow to them */}
        <g opacity={B}>
          {[[banks, 'BANKS', 'bank'], [hedge, 'HEDGE FUNDS', 'chart-board'], [pension, 'PENSION FUNDS', 'family'], [insurance, 'INSURERS', 'umbrella']].map(([at, t, id], k) => (
            <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${820 + (k % 2) * 380} ${430 + Math.floor(k / 2) * 330}) scale(${pop(f, at as number)})`}>
              <circle r={110} fill={P.card} /><Prop id={id as string} x={0} y={-6} size={150} f={f} /><Label x={0} y={170} text={t as string} size={54} font="Bebas Neue" color={P.ink} /></g>))}
          {Array.from({ length: 8 }, (_, k) => { const m = fly(f, receive + k * 5, [300, 900], [820 + (k % 2) * 380, 430 + (Math.floor(k / 2) % 2) * 330], 22, 160); return <Coin key={k} x={m.x} y={m.y} s={0.7} o={m.o} /> })}
          <g opacity={on(f, repaid, 6)} transform={`translate(1640 640) scale(${pop(f, repaid)})`}><Tick x={0} y={0} o={1} r={60} /><Label x={0} y={120} text="REPAID" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # C: a 1–3 year deal, then batch after batch of loans on a belt */}
        <g opacity={Cc}>
          <g opacity={on(f, sign, 6)} transform={`translate(1060 470) scale(${pop(f, sign) * 0.7})`}><Doc x={0} y={0} title="DEAL" lines={3} stamp={f >= three ? '1–3 YEARS' : undefined} stampO={on(f, three, 6)} /></g>
          <rect x={700} y={880} width={720} height={40} rx={20} fill={P.navy4} opacity={on(f, batches, 6)} />
          {Array.from({ length: 6 }, (_, k) => { const p = ((f - batches) / 70 + k / 6) % 1; return f > batches ? <g key={k} opacity={Math.sin(p * Math.PI) * on(f, batches, 6)} transform={`translate(${lerp(700, 1420, p)} 820) scale(0.3)`}>{[0, 1, 2].map((j) => <rect key={j} x={-150 + j * 14} y={-190 - j * 14} width={300} height={380} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={3} />)}</g> : null })}
          <g opacity={on(f, again, 6)} transform={`translate(1060 700) scale(${pop(f, again) * 0.8})`}><path d="M-80 0 A80 80 0 1 1 0 80" stroke={P.goldInk} strokeWidth={14} fill="none" /><path d="M-24 60 L0 92 L24 64" stroke={P.goldInk} strokeWidth={14} fill="none" strokeLinecap="round" /></g>
        </g>
        {/* # D: cash comes back; gains; the cash goes out again as new loans */}
        <g opacity={D}>
          {Array.from({ length: 5 }, (_, k) => { const m = fly(f, cash + k * 3, [bx - 80, 620], [lx + 120, 640], 20, 120); return <g key={k} opacity={m.o}><Prop id="cash-stack" x={m.x} y={m.y} size={130} f={f} /></g> })}
          <g opacity={on(f, booked, 6) * (1 - on(f, making, 8))} transform={`translate(1060 460) scale(${pop(f, d597) * 0.85})`}><Stat x={0} y={0} big={f >= d597 ? '$597 MILLION' : '…'} small={f >= gains ? 'GAINS ON SALES' : ''} w={640} /></g>
          {/* # new loans going out to new shoppers */}
          {Array.from({ length: 3 }, (_, k) => { const at = making + k * 6, m = fly(f, at, [lx + 120, 640], [820 + k * 220, 900], 18, 100)
            return <g key={k}><Mini look={['hero', 'owner', 'worker'][k]} x={820 + k * 220} y={1000} scale={1.1} frame={f} seed={k + 120} mood="happy" />
              {m.t < 1 && <g opacity={m.o} transform={`translate(${m.x} ${m.y}) scale(0.25)`}><Doc x={0} y={0} title="LOAN" /></g>}</g> })}
          <g opacity={on(f, tying, 6)} transform={`translate(1240 400) scale(${pop(f, tying)})`}><Prop id="padlock" x={0} y={0} size={160} f={f} /><path d="M-70 -70 L70 70" stroke={P.mint} strokeWidth={14} strokeLinecap="round" opacity={on(f, old, 6)} /></g>
        </g>
        <Person f={f} who="investor" beats={lender} x={lx} y={1180} s={1.35} life={8} />
        <g opacity={on(f, makes, 6)} transform={`translate(${lx} 330)`}><rect x={-140} y={-50} width={280} height={90} rx={16} fill={P.navy2} /><Label x={0} y={16} text="LENDER" size={60} font="Bebas Neue" color={P.white} /></g>
        <Person f={f} who="buyer" beats={buyer} x={bx} y={1180} s={1.3} flip life={9} o={on(f, investors, 8) * (1 - win(f, banks, sign) * 0.0) * (f >= banks && f < sign ? 0 : 1)} />
      </g>
      <Vignette id="bo" />
    </g>
  )
}

// ---------------------------------------------------------------- s41–s43: Affirm keeps collecting for the buyers (≈ $173M); the loan in your app may belong to a pension fund; the Affirm Card earns a share of card fees (≈ $294M)
const Service: React.FC<PieceProps> = ({ f, c }) => {
  const collecting = c('s41:collecting'), buyers = c('s41:buyers'), earned = c('s41:earned'), d173 = c('s41:173'), work = c('s41:work')
  const app = c('s42:app'), belong = c('s42:belong'), pension = c('s42:pension'), shows = c('s42:shows'), name = c('s42:name')
  const stream = c('s43:stream'), cards = c("s43:affirm's"), pays = c('s43:pays'), card = c('s43:card'), store = c('s43:store'), fee = c('s43:fee'), cut = c('s43:cut'), d17 = c('s43:17'), dollar = c('s43:dollar')
  const across = c('s43:across'), d175 = c('s43:175'), purchases = c('s43:purchases'), cents = c('s43:cents'), added = c('s43:added'), d294 = c('s43:294')
  const A = win(f, c('s41'), app), B = win(f, app, stream), Cc = on(f, stream, 10)
  const hero: Beat[] = [[0, 'phone', 'neutral'], [collecting, 'phone', 'smiling'], [app, 'phone', 'neutral'], [belong, 'phone', 'thinking'], [pension, 'shock', 'shocked'], [shows, 'phone', 'neutral'], [stream, 'idle', 'neutral'], [card, 'offer', 'smiling'], [fee, 'idle', 'smiling'], [d17, 'countOne', 'neutral'], [across, 'explain', 'neutral'], [d294, 'shock', 'shocked']]
  const hp = hand(f, hero, 380, 1190, 1.45)
  return (
    <g>
      <Stage id="bv" frame={f} />
      <Headline f={f} lines={[[collecting, 'AFFIRM STILL COLLECTS', P.ink, 116], [buyers, '…FOR THE BUYERS', P.ink, 116], [d173, '≈ $173 MILLION FOR THAT', P.goldInk, 116], [app, 'THE LOAN IN YOUR APP…', P.ink, 116], [pension, '…MAY BELONG TO A PENSION FUND', P.coralInk, 96], [shows, 'THE APP SHOWS THE LENDER', P.ink, 110],
        [stream, 'ONE MORE STREAM', P.ink, 124], [cards, 'AFFIRM’S CARDS', P.skyInk, 124], [fee, 'THE STORE PAYS A CARD FEE', P.ink, 110], [cut, 'AFFIRM GETS A SMALL CUT', P.goldInk, 112], [d17, '≈ 1.7¢ OF EVERY $1 SPENT', P.goldInk, 112],
        [d175, '≈ $17.5 BILLION OF CARD PURCHASES', P.ink, 98], [d294, '≈ $294 MILLION IN A YEAR', P.goldInk, 116]]} />
      <g transform={camera(f, [[c("s43:affirm's#3"), 1240, 520, 1.05], [collecting, 1240, 600, 1.06], [d173, 1240, 500, 1.1], [app, 960, 540, 1], [pension, 1300, 620, 1.12], [stream, 960, 540, 1], [cut, 1240, 560, 1.04], [across, 960, 540, 1], [d294, 1300, 640, 1.06]])}>
        {/* # A: your payment → the lender (collecting) → the loan's owner; a fee for the work */}
        <g opacity={A}>
          <g transform="translate(1080 640)"><circle r={130} fill={P.card} /><Label x={0} y={20} text="LENDER" size={64} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, buyers, 6)} transform={`translate(1600 640) scale(${pop(f, buyers)})`}><circle r={130} fill={P.card} /><Prop id="briefcase" x={0} y={-10} size={140} f={f} /><Label x={0} y={190} text="LOAN BUYER" size={52} font="Bebas Neue" color={P.ink} /></g>
          {Array.from({ length: 6 }, (_, k) => { const t0 = collecting + k * 12, a = fly(f, t0, [hp.x + 160, hp.y - 60], [1080, 640], 16, 80), b = fly(f, t0 + 16, [1080, 640], [1600, 640], 16, 80)
            return <g key={k}><Coin x={a.x} y={a.y} s={0.7} o={a.o} /><Coin x={b.x} y={b.y} s={0.7} o={b.o * on(f, buyers, 4)} /></g> })}
          <g opacity={on(f, earned, 6)} transform={`translate(1080 360) scale(${pop(f, d173) * 0.8})`}><Stat x={0} y={0} big={f >= d173 ? '$173 MILLION' : '…'} small={f >= work ? 'FOR COLLECTING' : ''} w={600} /></g>
        </g>
        {/* # B: the app shows the lender's name, but inside, the loan is owned by a pension fund */}
        <g opacity={B}>
          <g transform={`translate(1240 620) scale(${pop(f, app) * 1.6})`}>
            <Phone x={0} y={0} s={1}><rect x={-80} y={-150} width={160} height={70} rx={20} fill={P.navy2} /><Label x={0} y={-104} text="LENDER" size={44} font="Bebas Neue" color="#FFFFFF" />
              <rect x={-60} y={-60} width={120} height={150} rx={10} fill="#E8EEF5" /><Label x={0} y={-20} text="LOAN" size={40} font="Bebas Neue" color={P.navy1} />
              <g opacity={on(f, belong, 6)}><rect x={-60} y={10} width={120} height={70} rx={10} fill={on(f, pension, 4) > 0.5 ? P.gold : '#C9D1DE'} /><Label x={0} y={56} text={f >= pension ? 'OWNER:' : '?'} size={34} font="Bebas Neue" color={P.navy0} /></g></Phone>
          </g>
          <g opacity={on(f, pension, 6)} transform={`translate(1620 480) scale(${pop(f, pension)})`}><circle r={110} fill={P.card} /><Prop id="family" x={0} y={-6} size={150} f={f} /><Label x={0} y={170} text="PENSION FUND" size={52} font="Bebas Neue" color={P.ink} /></g>
          <path d="M1330 640 Q1460 560 1520 520" stroke={P.goldInk} strokeWidth={8} strokeDasharray="14 10" fill="none" opacity={on(f, pension + 6, 6)} />
          <g opacity={on(f, name, 6)} transform={`translate(1240 360) scale(${pop(f, name) * 0.7})`}><Prop id="magnifier" x={0} y={0} size={140} f={f} /></g>
        </g>
        {/* # C: one purchase with an Affirm card — the store pays the card fee, Affirm gets a small slice (≈ 1.7¢ per $1); then a year of purchases (≈ $17.5B) and all the slices together (≈ $294M) */}
        <g opacity={Cc}>
          <g opacity={1 - on(f, across, 10)}>
            <Counter x={1200} y={800} w={900} />
            <g opacity={on(f, pays, 6)}><Terminal x={960} y={800} s={1.2} text="CARD" lit={f >= card ? 1 : 0} /></g>
            <g opacity={on(f, store, 6)} transform={`translate(1300 690) scale(${pop(f, store) * 0.9})`}><Prop id="shop-mini" x={0} y={0} size={220} f={f} /><Label x={0} y={150} text="STORE" size={48} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, cards, 6) * (1 - on(f, pays, 8))} transform={`translate(1300 520) rotate(-8) scale(${pop(f, cards) * 1.6})`}><rect x={-120} y={-76} width={240} height={152} rx={16} fill={P.navy2} /><rect x={-90} y={-34} width={44} height={34} rx={6} fill={P.gold} /><Label x={20} y={50} text="AFFIRM" size={40} font="Bebas Neue" color="#FFFFFF" /></g>
            {/* # the fee coin leaves the store; on "cut" a small slice breaks off and flies to Affirm */}
            {(() => { const m = fly(f, fee, [1300, 640], [1330, 430], 16, 60); return <g opacity={on(f, fee, 4)}><Coin x={m.x} y={m.y} s={1.4} text="FEE" /></g> })()}
            {(() => { const m = fly(f, cut, [1360, 410], [1560, 330], 16, 60); return <g opacity={on(f, cut, 4)} transform={`translate(${m.x} ${m.y})`}><path d="M0 0 L0 -30 A30 30 0 0 1 21 -21 Z" fill={P.gold} stroke={P.goldD} strokeWidth={3} /></g> })()}
            <g opacity={on(f, cut, 6)} transform={`translate(1560 330) scale(${pop(f, cut)})`}><circle r={80} fill={P.card} /><Label x={0} y={16} text="AFFIRM" size={44} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, d17, 6)} transform={`translate(1560 520) scale(${pop(f, d17)})`}><rect x={-150} y={-56} width={300} height={112} rx={18} fill={P.gold} /><Label x={0} y={-6} text="≈ 1.7¢" size={64} font="Bebas Neue" color={P.navy0} /><Label x={0} y={40} text={f >= dollar ? 'PER $1 SPENT' : ''} size={36} font="Bebas Neue" color={P.navy0} /></g>
          </g>
          <g opacity={on(f, across, 10)}>
            {/* # a year of card purchases: many small receipts */}
            {Array.from({ length: 48 }, (_, k) => { const at = d175 + k * 0.6, col = k % 12, row = Math.floor(k / 12)
              return <g key={k} opacity={on(f, at, 4) * (1 - on(f, added, 10) * 0.6) * (1 - on(f, d294 - 6, 8))} transform={`translate(${860 + col * 64} ${400 + row * 80})`}><rect x={-24} y={-30} width={48} height={60} rx={6} fill={P.paper} /><rect x={-16} y={-14} width={32} height={6} rx={3} fill="#C8B994" /></g> })}
            <Label x={1210} y={720} text={f >= purchases ? '≈ $17.5 BILLION OF PURCHASES' : ''} size={52} font="Bebas Neue" color={P.ink} o={1 - on(f, d294 - 8, 6)} />
            {/* # the small slices fly into one stack: the yearly total */}
            {Array.from({ length: 10 }, (_, k) => { const m = fly(f, cents + k * 2, [880 + (k * 97) % 700, 420 + (k % 4) * 80], [1600, 900 - k * 10], 14, 60); return <g key={k} opacity={m.o} transform={`translate(${m.x} ${m.y})`}><path d="M0 0 L0 -30 A30 30 0 0 1 21 -21 Z" fill={P.gold} stroke={P.goldD} strokeWidth={3} /></g> })}
            {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={on(f, added + k * 2, 4)}><rect x={1470} y={940 - k * 28} width={260} height={24} rx={8} fill={k % 2 ? P.gold : '#E2B444'} stroke={P.goldD} strokeWidth={3} /></g>)}
            <g opacity={on(f, d294, 6)} transform={`translate(1600 640) scale(${pop(f, d294) * 0.8})`}><Stat x={0} y={0} big="$294 MILLION" small="IN A YEAR, IN TOTAL" color={P.goldInk} w={600} /></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={380} y={1190} s={1.45} life={6} />
        {f >= c('s41') && f < app + 2 && <Phone x={hp.x + 160} y={hp.y + 10} s={1} r={8} o={1 - on(f, app - 4, 6)}><Label x={0} y={-80} text="PAYMENT" size={48} font="Bebas Neue" color={P.navy1} /><circle cx={0} cy={10} r={46} fill={P.mint} /><path d="M-20 10 l13 13 l28 -30" stroke="#FFFFFF" strokeWidth={9} fill="none" strokeLinecap="round" /><Label x={0} y={110} text="SENT" size={48} font="Bebas Neue" color="#1E9A63" /></Phone>}
        {f >= card - 4 && f < fee + 20 && (() => { const h = hand(f, hero, 380, 1190, 1.45); return <g transform={`translate(${h.x + 40} ${h.y - 20}) rotate(-14) scale(${pop(f, card - 4) * 0.8})`}><Prop id="credit-card" x={0} y={0} size={140} f={f} /></g> })()}
      </g>
      <Vignette id="bv" />
    </g>
  )
}

// ---------------------------------------------------------------- s44–s48: late fees aren't the engine — Affirm charges $0; others: ~4 in 100 loans got one (2023), often ~$7 a missed payment; collected ≈ 18¢ per $100 lent; hurts the person, small change for the business
const Late: React.FC<PieceProps> = ({ f, c }) => {
  const expect = c('s44:expect'), late = c('s44:late'), hidden = c('s44:hidden'), engine = c('s44:engine')
  const affirm = c('s45:affirm'), founding = c('s45:founding'), charged = c('s45:charged'), zero = c('s45:zero')
  const other = c('s46:other'), charge = c('s46:charge'), d4 = c('s46:4'), d100 = c('s46:100'), fee = c('s46:fee')
  const report = c('s46a:report'), often = c('s46a:often'), d7 = c('s46a:7'), missed = c('s46a:missed')
  const collected = c('s47:collected'), d18 = c('s47:18'), d100b = c('s47:100'), lent = c('s47:lent')
  const hurts = c('s48:hurts'), person = c('s48:person'), small = c('s48:small'), business = c('s48:business')
  const A = win(f, expect, other), B = win(f, other, collected), Cc = on(f, collected, 10)
  const hero: Beat[] = [[0, 'think', 'thinking'], [hidden, 'scratchHead', 'thinking'], [zero, 'thumbsUp', 'smiling'], [other, 'read', 'neutral'], [d4, 'read', 'worried'], [missed, 'oops', 'shocked'], [collected, 'idle', 'neutral'], [hurts, 'despair', 'worried'], [small, 'slump', 'worried']]
  const red = (k: number) => [3, 27, 58, 81].includes(k)
  return (
    <g>
      <Stage id="bf" frame={f} />
      <Headline f={f} lines={[[late, 'LATE FEES?', P.ink, 130], [engine, 'THE HIDDEN ENGINE?', P.coralInk, 124], [affirm, 'NOT AT AFFIRM', P.ink, 124], [zero, '$0 IN LATE FEES', P.mintInk, 130], [other, 'OTHER LENDERS DO', P.ink, 120], [d100, '≈ 4 IN EVERY 100 LOANS', P.coralInk, 116],
        [d7, 'OFTEN ≈ $7 A MISSED PAYMENT', P.coralInk, 104], [d18, 'COLLECTED: ≈ 18¢…', P.goldInk, 124], [lent, '…PER $100 LENT', P.goldInk, 124], [hurts, 'IT HURTS THE PERSON', P.coralInk, 120], [small, 'SMALL CHANGE FOR THE BUSINESS', P.ink, 104]]} />
      <g transform={camera(f, [[c("s46:in"), 1240, 600, 1.05], [engine, 1240, 600, 1.1], [affirm, 960, 540, 1], [zero, 1240, 560, 1.1], [other, 960, 540, 1], [d4, 1240, 620, 1.06], [d7, 1300, 640, 1.1], [collected, 960, 540, 1], [d18, 1480, 620, 1.15], [hurts, 960, 540, 1]])}>
        {/* # A: an engine labelled LATE FEES — stops; Affirm: $0 */}
        <g opacity={A}>
          <g opacity={on(f, late, 6) * (1 - on(f, affirm, 8))} transform={`translate(1240 620) scale(${pop(f, late)})`}>
            {[[-90, 0, 120, 1], [90, -60, 80, -1.4]].map(([x, y, r, sp], k) => <g key={k} transform={`translate(${x} ${y}) rotate(${(f - late) * (sp as number) * 2 * (1 - on(f, hidden + 30, 20))})`}>
              {Array.from({ length: 10 }, (_, j) => <rect key={j} x={-14} y={-(r as number) - 22} width={28} height={40} rx={6} fill={P.navy4} transform={`rotate(${j * 36})`} />)}<circle r={r as number} fill={P.navy4} /><circle r={(r as number) * 0.35} fill={P.navy1} /></g>)}
            <Label x={0} y={220} text={f >= engine ? 'ENGINE?' : ''} size={64} font="Bebas Neue" color={P.ink} />
          </g>
          <g opacity={on(f, affirm, 6)} transform={`translate(1240 600) scale(${pop(f, affirm)})`}><rect x={-260} y={-160} width={520} height={320} rx={30} fill={P.card} /><Label x={0} y={-70} text="AFFIRM" size={72} font="Bebas Neue" color={P.ink} />
            <Label x={0} y={70} text={f >= zero ? '$0' : ''} size={150} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, founding, 6)} transform={`translate(1640 380) scale(${pop(f, founding) * 0.8})`}><Calendar x={0} y={0} text="DAY 1" s={1.2} /></g>
          <g opacity={on(f, charged, 6)} transform={`translate(1640 760) rotate(6) scale(${pop(f, charged) * 0.6})`}><Doc x={0} y={0} title="LATE FEE" lines={3} stamp="$0" stampO={on(f, zero, 6)} /></g>
        </g>
        {/* # B: 100 loans, about 4 of them red with a late fee; a missed payment ≈ $7 */}
        <g opacity={B}>
          {Array.from({ length: 100 }, (_, k) => { const col = k % 20, row = Math.floor(k / 20), x = 780 + col * 50, y = 420 + row * 70, isRed = red(k) && f >= d4 + [3, 27, 58, 81].indexOf(k) * 3
            return <rect key={k} x={x} y={y} width={38} height={54} rx={6} fill={isRed ? P.coral : P.paper} opacity={on(f, charge + col * 0.4, 5) * (f >= report ? (isRed ? 1 : 0.35) : 1)} /> })}
          <Label x={1255} y={830} text={f >= fee ? 'GOT A LATE FEE (2023)' : ''} size={52} font="Bebas Neue" color={P.coralInk} />
          <g opacity={on(f, often, 6)} transform={`translate(1300 920) scale(${pop(f, often)})`}><Calendar x={-120} y={0} text="DUE" s={0.9} /><path d="M-160 -40 L-80 40 M-80 -40 L-160 40" stroke={P.coral} strokeWidth={12} strokeLinecap="round" opacity={on(f, missed, 6)} />
            <g opacity={on(f, d7, 6)} transform={`translate(110 0) scale(${pop(f, d7)})`}><circle r={70} fill={P.coral} /><Label x={0} y={26} text="$7" size={80} font="Bebas Neue" color="#FFFFFF" /></g></g>
        </g>
        {/* # C: a $100 bill next to an 18¢ coin; the business shrugs */}
        <g opacity={Cc}>
          <g transform={`translate(1080 600) scale(${pop(f, d100b) * 1.5})`} opacity={on(f, d100b, 6)}><rect x={-200} y={-90} width={400} height={180} rx={14} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={6} /><circle r={56} fill="none" stroke="#3E8A4E" strokeWidth={5} /><Label x={0} y={24} text="$100" size={72} font="Bebas Neue" color="#1F5A2E" /></g>
          <g opacity={on(f, d18, 6)} transform={`translate(1440 650) scale(${pop(f, d18)})`}><Coin x={0} y={0} s={1.25} text="18¢" /></g>
          <Label x={1080} y={860} text={f >= lent ? 'LENT' : ''} size={60} font="Bebas Neue" color={P.ink} />
          <Label x={1440} y={760} text={f >= d18 ? 'LATE FEES' : ''} size={52} font="Bebas Neue" color={P.ink} />
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [small, 'shrug', 'smug'], [business, 'leanBack', 'smug']]} x={1790} y={1180} s={1.25} flip life={8} o={on(f, small - 4, 8)} />
          <g opacity={on(f, person, 6) * (1 - on(f, small, 8))} transform={`translate(760 420) scale(${pop(f, person)})`}><Prop id="cracks" x={0} y={0} size={160} f={f} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={420} y={1190} s={1.45} life={4} />
        {f >= other && f < missed + 4 && (() => { const h = hand(f, hero, 420, 1190, 1.45); return <g opacity={on(f, other, 6) * (1 - on(f, missed - 2, 6))} transform={`translate(${h.x - 60} ${h.y - 40}) scale(0.42)`}><Doc x={0} y={0} title="BILL" lines={3} /></g> })()}
      </g>
      <Vignette id="bf" />
    </g>
  )
}

// ---------------------------------------------------------------- s49–s51a: the simple loan earns little — 2021: ≈ $4 of revenue per $100 lent, ≈ $3 of costs (processing, unpaid loans; 2023: ~2 in 100 written off), ≈ $1 left → needs millions of loans; Klarna today ≈ $1.20 per $100 after costs
const Margin: React.FC<PieceProps> = ({ f, c }) => {
  const simple49 = c('s49:simple'), little = c('s49:little'), bureau = c('s49:bureau'), five = c('s49:five'), d4 = c('s49:4'), d100 = c('s49:100'), lent = c('s49:lent')
  const d3 = c('s50:3'), costs = c('s50:costs'), processing = c('s50:processing'), never = c('s50:never'), repaid = c('s50:repaid')
  const losses = c('s50a:losses'), real = c('s50a:real'), d2 = c('s50a:2'), written = c('s50a:written')
  const left = c('s51:left'), d1 = c('s51:1'), simplest = c('s51:simplest'), many = c('s51:many'), millions = c('s51:millions'), times = c('s51:times')
  const klarna = c("s51a:klarna's"), results = c('s51a:results'), similar = c('s51a:similar'), costs2 = c('s51a:costs'), kept = c('s51a:kept'), d20 = c('s51a:20'), shopping = c('s51a:shopping')
  const A = win(f, c('s49'), losses), B = win(f, losses, left), Cc = win(f, left, klarna), D = on(f, klarna, 10)
  const lender: Beat[] = [[0, 'idle', 'neutral'], [little, 'shrug', 'worried'], [d4, 'countA', 'neutral', 'countB', 14], [costs, 'emptyPockets', 'worried'], [losses, 'despair', 'worried'], [left, 'hold', 'neutral'], [many, 'clapA', 'smiling', 'clapB', 12], [klarna, 'explain', 'neutral'], [d20, 'thumbsUp', 'smiling']]
  // # CFPB 2021, % of GMV = dollars per $100 lent: revenue 4.02 = processing 1.47 + credit losses 1.30 + other costs 0.24 + 1.01 left
  const PX = 800 / 4.02, segs: [number, number, string][] = [[1.47, processing, P.sky], [1.30, never, P.coral], [0.24, costs, P.navy4], [1.01, left, P.mint]]
  return (
    <g>
      <Stage id="bm" frame={f} />
      <Headline f={f} lines={[[little, 'PAY IN 4 EARNS VERY LITTLE', P.ink, 110], [d4, 'REVENUE ≈ $4…', P.goldInk, 124], [d100, '…PER $100 LENT (2021)', P.goldInk, 116], [d3, '≈ $3 GOES ON COSTS', P.coralInk, 116], [processing, 'MAINLY PROCESSING…', P.ink, 116], [never, '…AND UNPAID LOANS', P.coralInk, 116], [losses, 'THE LOSSES ARE REAL', P.coralInk, 116], [d2, '≈ 2 IN 100 NEVER REPAID (2023)', P.coralInk, 100],
        [d1, '≈ $1 LEFT PER $100', P.mintInk, 124], [millions, 'MADE MILLIONS OF TIMES', P.ink, 116], [klarna, 'KLARNA TODAY', P.skyInk, 124], [d20, '≈ $1.20 PER $100 KEPT', P.mintInk, 116]]} />
      <g transform={camera(f, [[c("s51a:every"), 1240, 640, 1.05], [c("s51:pays"), 1180, 680, 1.06], [c("s50a:fully"), 1270, 760, 1.08], [c("s50a:in"), 1240, 600, 1.05], [c("s49:in#2"), 1100, 600, 1.04], [d4, 1200, 600, 1.08], [processing, 1300, 640, 1.1], [losses, 960, 540, 1], [left, 1200, 600, 1.1], [millions, 960, 540, 1], [d20, 1300, 600, 1.1]])}>
        {/* # A: $100 lent → 4 coins of revenue; 3 of them roll off to costs */}
        <g opacity={A}>
          <g opacity={on(f, simple49, 6) * (1 - on(f, bureau, 8))}>{[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${980 + k * 160} 600) scale(${pop(f, simple49 + k * 2)})`}><rect x={-66} y={-80} width={132} height={160} rx={16} fill={k === 0 ? P.gold : P.paper} stroke={P.edge} strokeWidth={3} /><Label x={0} y={18} text={`${k + 1}`} size={70} font="Bebas Neue" color={P.navy0} /></g>)}</g>
          <g opacity={on(f, bureau, 6) * (1 - on(f, d4, 8))} transform={`translate(1240 560) scale(${pop(f, bureau)})`}><Prop id="bank" x={0} y={0} size={260} f={f} /><Label x={0} y={190} text={f >= five ? 'CFPB: 5 LENDERS' : 'CFPB'} size={60} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, d100, 6)} transform={`translate(1000 480) scale(${pop(f, d100)})`}><rect x={-160} y={-70} width={320} height={140} rx={12} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={5} /><Label x={0} y={22} text="$100 LENT" size={60} font="Bebas Neue" color="#1F5A2E" /></g>
          {(() => { let x = 860; return segs.map(([v, at, col], k) => { const x0 = x; x += v * PX; const lit = k < 3 ? on(f, costs, 8) * 0.5 + on(f, at, 8) * 0.5 : 0
            return <g key={k} opacity={on(f, d4, 8)}><rect x={x0 + 2} y={700} width={v * PX * on(f, d4 + k * 2, 12) - 4} height={110} rx={12} fill={k === 3 ? P.mint : lerp(0, 1, lit) > 0.4 ? col : P.gold} /></g> }) })()}
          <Label x={860 + (1.47 / 2) * PX} y={890} text={f >= processing ? 'PROCESSING $1.47' : ''} size={46} font="Bebas Neue" color={P.ink} />
          <Label x={860 + (1.47 + 0.65) * PX} y={670} text={f >= never ? 'NEVER REPAID ≈ $1.30' : ''} size={50} font="Bebas Neue" color={P.ink} />
          <Label x={860 + (2.77 + 0.12) * PX + 30} y={890} text={f >= costs ? 'OTHER $0.24' : ''} size={44} font="Bebas Neue" color={P.ink2} anchor="start" />
          <path d={`M860 ${f >= costs ? 960 : 2000} h${3.01 * PX}`} stroke={P.coralInk} strokeWidth={8} opacity={on(f, costs, 6)} />
          <Label x={860 + 1.5 * PX} y={1010} text={f >= d3 ? '≈ $3 OF COSTS' : ''} size={52} font="Bebas Neue" color={P.coralInk} />
          <Label x={1260} y={660 - 0} text="" />
        </g>
        {/* # B: 100 loans, 2 crumble — written off */}
        <g opacity={B}>
          {Array.from({ length: 100 }, (_, k) => { const col = k % 20, row = Math.floor(k / 20), x = 760 + col * 52, y = 420 + row * 74, bad = (k === 33 || k === 76) && f >= d2 + (k === 76 ? 4 : 0)
            return <g key={k} opacity={on(f, real + col * 0.4, 5)} transform={`translate(${x} ${y + (bad ? on(f, written, 20) * 120 : 0)}) rotate(${bad ? on(f, written, 20) * 30 : 0})`}><rect x={0} y={0} width={40} height={56} rx={6} fill={bad ? P.coral : P.paper} opacity={bad ? 1 - on(f, written + 14, 10) * 0.6 : 1} /></g> })}
          <Label x={1270} y={880} text={f >= written ? 'WRITTEN OFF' : ''} size={60} font="Bebas Neue" color={P.coralInk} />
        </g>
        {/* # C: one coin left, multiplied by millions */}
        <g opacity={Cc}>
          <g transform={`translate(1180 600) scale(${pop(f, d1) * 1.8})`} opacity={on(f, d1, 6)}><Coin x={0} y={0} s={1.6} text="$1" /></g>
          <Label x={1180} y={860} text={f >= d1 ? 'LEFT PER $100 (2021)' : ''} size={56} font="Bebas Neue" color={P.ink} />
          {Array.from({ length: 30 }, (_, k) => <Coin key={k} x={900 + (k % 10) * 62} y={420 - Math.floor(k / 10) * 0 + Math.floor(k / 10) * 60 + 520} s={0.5} o={on(f, millions + k * 0.8, 4) * (1 - on(f, klarna, 8))} />)}
          <g opacity={on(f, times, 6)} transform={`translate(1600 520) scale(${pop(f, times)})`}><Label x={0} y={0} text="× MILLIONS" size={96} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        {/* # D: Klarna's latest quarter: ≈ $1.20 kept per $100 after costs */}
        <g opacity={D}>
          <g transform={`translate(1240 580) scale(${pop(f, klarna)})`}><rect x={-300} y={-200} width={600} height={430} rx={30} fill={P.card} /><Label x={0} y={-110} text="KLARNA, LATEST QUARTER" size={52} font="Bebas Neue" color={P.ink2} />
            <rect x={-250} y={-60} width={500 * on(f, results, 14)} height={90} rx={14} fill={P.sky} opacity={on(f, results, 4)} />
            <rect x={-250} y={-60} width={500 * (1.63 / 2.85) * on(f, costs2, 12)} height={90} rx={14} fill={P.navy4} opacity={on(f, costs2, 4)} />
            <Label x={-250 + 250 * (1.63 / 2.85)} y={0} text={f >= costs2 ? 'COSTS' : f >= results ? 'REVENUE' : ''} size={48} font="Bebas Neue" color="#FFFFFF" />
            <Label x={250 - 250 * (1.22 / 2.85)} y={0} text={f >= kept ? 'KEPT' : ''} size={48} font="Bebas Neue" color={P.navy0} />
            <Label x={0} y={120} text={f >= d20 ? '$1.20' : f >= kept ? '$1' : ''} size={110} font="Bebas Neue" color={P.mintInk} />
            <Label x={0} y={180} text={f >= shopping ? 'PER $100 OF SHOPPING' : ''} size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, costs2, 6)} transform={`translate(1680 360) scale(${pop(f, costs2) * 0.8})`}><Prop id="calculator" x={0} y={0} size={150} f={f} /></g>
          <g opacity={on(f, similar, 6)} transform={`translate(800 360) scale(${pop(f, similar) * 0.8})`}><Prop id="tick" x={0} y={0} size={120} f={f} /></g>
        </g>
        <Person f={f} who="investor" beats={lender} x={430} y={1180} s={1.4} life={8} />
        {f >= d4 && f < costs && (() => { const h = hand(f, lender, 430, 1180, 1.4); return <Coin x={h.x} y={h.y - 30} s={0.9} o={on(f, d4, 6) * (1 - on(f, costs - 4, 6))} /> })()}
        <g opacity={on(f, simplest, 6) * (1 - on(f, klarna, 8))} transform={`translate(430 330)`}><rect x={-140} y={-50} width={280} height={90} rx={16} fill={P.navy2} /><Label x={0} y={16} text="LENDER" size={60} font="Bebas Neue" color={P.white} /></g>
      </g>
      <Vignette id="bm" />
    </g>
  )
}

// ---------------------------------------------------------------- s52–s55: the catch is spending more — lenders sell stores bigger orders, bigger orders come from shoppers; small payments don't feel like borrowing; 53.6M customers (some counted twice); 6.3 loans and ≈ $848 a year per lender
const Catch: React.FC<PieceProps> = ({ f, c }) => {
  const stores52 = c('s52:stores'), late52 = c('s52:late'), small52 = c('s52:small'), catchW = c('s52:catch')
  const thing = c('s53:thing'), paying = c('s53:paying'), spending = c('s53:spending'), more = c('s53:more')
  const sell = c('s54:sell'), bigger = c('s54:bigger'), shoppers = c('s54:shoppers')
  const because = c('s54a:because'), small = c('s54a:small'), feels = c('s54a:feels'), borrowing = c('s54a:borrowing')
  const in55 = c('s55a:in'), six55 = c('s55a:six'), counted = c('s55a:counted'), d536 = c('s55a:536'), customers = c('s55a:customers'), people = c('s55a:people'), one = c('s55a:one'), lower = c('s55a:lower')
  const keep = c('s55:keep'), back = c('s55:back'), user = c('s55:user'), d63 = c('s55:63'), lender = c('s55:lender'), d848 = c('s55:848')
  const A = win(f, c('s52'), in55), B = win(f, in55, keep), Cc = on(f, keep, 10)
  const bags = Math.round(lerp(1, 5, on(f, more, 30)) + (f >= shoppers ? 1 : 0))
  const hero: Beat[] = [[0, 'idle', 'thinking'], [catchW, 'scratchHead', 'thinking'], [spending, 'carry', 'smiling'], [more, 'carryHeavy', 'neutral'], [because, 'phone', 'smiling'], [borrowing, 'thumbsUp', 'smiling'], [counted, 'idle', 'neutral'], [keep, 'waveA', 'smiling', 'waveB', 14], [d63, 'countOne', 'neutral'], [d848, 'oops', 'shocked']]
  const hx = f < keep ? 420 : 380, hp = hand(f, hero, hx, 1190, 1.45)
  return (
    <g>
      <Stage id="bk" frame={f} />
      <Headline f={f} lines={[[catchW, 'SO WHERE IS THE CATCH?', P.ink, 116], [spending, 'SPENDING MORE', P.coralInk, 140], [sell, 'LENDERS SELL BIGGER ORDERS', P.ink, 106], [shoppers, 'THEY COME FROM SHOPPERS', P.ink, 110], [small, 'EACH PAYMENT IS SMALL', P.ink, 116], [borrowing, 'IT DOESN’T FEEL LIKE BORROWING', P.goldInk, 98],
        [d536, '≈ 53.6 MILLION CUSTOMERS (2023)', P.ink, 100], [one, 'SOME USE MORE THAN ONE', P.ink, 110], [lower, 'REAL NUMBER: LOWER', P.goldInk, 120], [back, 'AND THEY COME BACK', P.ink, 120], [d63, '6.3 LOANS PER LENDER', P.goldInk, 120], [d848, '≈ $848 A YEAR, PER LENDER', P.goldInk, 110]]} />
      <g transform={camera(f, [[c("s55a:real"), 1300, 620, 1.05], [c("s54:come"), 1360, 600, 1.06], [c("s53:thing"), 1000, 600, 1.05], [more, 700, 640, 1.08], [sell, 960, 540, 1], [feels, 760, 640, 1.08], [counted, 960, 540, 1], [lower, 1300, 600, 1.08], [keep, 960, 540, 1], [d848, 1240, 620, 1.08]])}>
        <g opacity={(1 - on(f, catchW, 8))}>
          <g opacity={on(f, stores52, 6)} transform={`translate(1000 560) scale(${pop(f, stores52)})`}><circle r={100} fill={P.card} /><Prop id="shop-mini" x={0} y={-6} size={130} f={f} /><Label x={0} y={150} text="STORES PAY" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, late52, 6)} transform={`translate(1300 560) scale(${pop(f, late52)})`}><circle r={100} fill={P.card} /><Coin x={0} y={0} s={on(f, small52, 10) > 0.5 ? 0.6 : 1.2} text="FEE" /><Label x={0} y={150} text={f >= small52 ? 'LATE FEES: SMALL' : 'LATE FEES'} size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, small52 + 12, 6)} transform={`translate(1600 560) scale(${pop(f, small52 + 12)})`}><circle r={100} fill={P.gold} /><Label x={0} y={40} text="?" size={130} font="Bebas Neue" color={P.navy0} /></g>
        </g>
        {/* # A: the shopping bags pile up; the lender pitching "bigger orders" to a store, and the order is you */}
        <g opacity={A}>
          <g opacity={on(f, paying, 6) * (1 - on(f, small, 8))} transform={`translate(1360 560) scale(${pop(f, paying)})`}><rect x={-280} y={-180} width={560} height={300} rx={28} fill={P.card} />
            <Prop id="shop-mini" x={-140} y={-40} size={200} f={f} /><Label x={110} y={-80} text={f >= sell ? 'BIGGER' : 'STORE'} size={60} font="Bebas Neue" color={P.ink} /><Label x={110} y={-10} text={f >= bigger ? 'ORDERS' : ''} size={60} font="Bebas Neue" color={P.ink} />
            {f >= bigger && <path d="M60 70 L180 70 L180 0" stroke={P.mintInk} strokeWidth={14} fill="none" strokeLinecap="round" />}</g>
          <g opacity={on(f, small, 6)}>{[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${1120 + k * 170} ${520 + Math.sin((f - small) / 12 + k) * 26})`} opacity={on(f, small + k * 3, 5)}><rect x={-64} y={-44} width={128} height={88} rx={14} fill={P.paper} /><Label x={0} y={18} text="SMALL" size={44} font="Bebas Neue" color={P.navy0} /></g>)}
            <g opacity={on(f, feels, 6)} transform={`translate(1380 800) scale(${pop(f, feels)})`}><Prop id="inflation-balloon" x={0} y={0} size={180} f={f} /></g></g>
        </g>
        {/* # B: two lender circles overlap — the same people counted twice */}
        <g opacity={B}>
          <g opacity={on(f, in55 + 10, 6)} transform={`translate(820 330) scale(${pop(f, in55 + 10) * 0.8})`}><Calendar x={0} y={0} text="2023" s={1} /></g>
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, six55 + k * 2, 5)} transform={`translate(${1000 + k * 100} 290) scale(${pop(f, six55 + k * 2) * 0.6})`}><circle r={60} fill={P.card} /><Prop id="bank" x={0} y={-4} size={80} f={f} /></g>)}
          <circle cx={1060} cy={600} r={260} fill={P.sky} opacity={0.25 * on(f, counted, 8)} /><circle cx={1420} cy={600} r={260} fill={P.gold} opacity={0.25 * on(f, one, 8)} />
          {Array.from({ length: 14 }, (_, k) => { const inB = k >= 7, x = (inB ? 1420 : 1060) + ((k % 7) % 3 - 1) * 110 + (inB ? 40 : -40), y = 480 + Math.floor((k % 7) / 3) * 130
            return <g key={k} opacity={on(f, (inB ? one : counted) + (k % 7) * 1.5, 5)}><Mini look={['hero', 'buyer', 'owner', 'worker', 'investor', 'hero', 'owner'][k % 7]} x={x} y={y + 50} scale={0.7} frame={f} seed={k + 140} /></g> })}
          {[0, 1].map((k) => <circle key={k} cx={k ? 1300 : 1180} cy={600} r={58} fill="none" stroke={P.coralInk} strokeWidth={8} opacity={on(f, people + k * 4, 6)} />)}
          <g opacity={on(f, d536, 6)} transform={`translate(1240 960) scale(${pop(f, d536) * 0.75})`}><Stat x={0} y={0} big="53.6 MILLION" small={f >= customers ? 'CUSTOMERS AT 6 LENDERS' : ''} w={700} /></g>
        </g>
        {/* # C: back again and again — six receipts stack; ≈ $848 a year at one lender */}
        <g opacity={Cc}>
          {Array.from({ length: 7 }, (_, k) => { const at = user + k * 4, last = k === 6
            return <g key={k} opacity={on(f, at, 5)} transform={`translate(${1100 + (k % 4) * 6} ${880 - k * 70}) rotate(${(k % 2 ? 4 : -3)})`}><rect x={-160} y={-30} width={last ? 320 * 0.3 : 320} height={60} rx={10} fill={last ? P.gold : P.paper} stroke={P.edge} strokeWidth={2} /></g> })}
          <Label x={1100} y={960} text={f >= d63 ? '6.3 LOANS' : ''} size={64} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, lender, 6)} transform={`translate(1560 520) scale(${pop(f, lender) * 0.9})`}><circle r={100} fill={P.card} /><Prop id="bank" x={0} y={-6} size={130} f={f} /><Label x={0} y={160} text="ONE LENDER" size={52} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, d848, 6)} transform={`translate(1560 900) scale(${pop(f, d848) * 0.8})`}><Stat x={0} y={0} big="≈ $848" small="A YEAR" w={420} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={hx} y={1190} s={1.45} life={2} />
        {/* # shopping bags in the hero's arms, more and more */}
        {f >= spending && f < because + 6 && Array.from({ length: bags }, (_, k) => <g key={k} opacity={on(f, spending + k * 6, 5) * (1 - on(f, because, 6))} transform={`translate(${hp.x - 60 + (k % 3) * 70} ${hp.y - 20 - Math.floor(k / 3) * 70}) rotate(${(k % 2 ? 6 : -5)})`}><Prop id="shopping-bag" x={0} y={0} size={130} f={f} /></g>)}
        {f >= because && f < counted && <Phone x={hp.x + 160} y={hp.y + 10} s={1} r={8} o={on(f, because, 6) * (1 - on(f, counted - 6, 6))}><Label x={0} y={-80} text="DUE" size={48} font="Bebas Neue" color={P.navy1} /><Label x={0} y={20} text="SMALL" size={60} font="Bebas Neue" color={P.navy0} /><Label x={0} y={100} text="EASY" size={48} font="Bebas Neue" color="#1E9A63" /></Phone>}
      </g>
      <Vignette id="bk" />
    </g>
  )
}

// ---------------------------------------------------------------- s56–s58: per-lender counts — each lender can't see the others; loan stacking: several small easy loans that add up; four $100 purchases in a week across three apps → $400 over six weeks
const Stack: React.FC<PieceProps> = ({ f, c }) => {
  const counts = c('s56:counts'), each = c('s56:each'), cannot = c('s56:cannot'), see = c('s56:see'), others = c('s56:others')
  const bureau = c('s57:bureau'), stacking = c('s57:stacking'), several = c('s57:several'), easy = c('s57:easy'), add = c('s57:add'), repay = c('s57:repay')
  const d25 = c('s58:25'), feels = c('s58:feels'), four = c('s58:four'), d100 = c('s58:100'), week = c('s58:day'), three = c('s58:three'), apps = c('s58:apps'), d400 = c('s58:400'), six = c('s58:six')
  const A = win(f, c('s56'), bureau), B = win(f, bureau, c('s58')), Cc = on(f, c('s58'), 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [each, 'phone', 'neutral'], [bureau, 'nervous', 'worried'], [stacking, 'carry', 'worried'], [add, 'carryHeavy', 'worried'], [c('s58'), 'phone', 'neutral'], [feels, 'thumbsUp', 'smiling'], [four, 'phone', 'neutral'], [d400, 'shock', 'shocked'], [six, 'despair', 'worried']]
  const hp = hand(f, hero, 380, 1190, 1.45)
  const tower = (k: number) => on(f, (k < 2 ? stacking : k < 4 ? several : k < 6 ? easy : add) + (k % 2) * 4, 6)
  return (
    <g>
      <Stage id="bz" frame={f} />
      <Headline f={f} lines={[[counts, 'COUNTS FOR ONE LENDER AT A TIME', P.ink, 100], [cannot, 'EACH CAN’T SEE THE OTHERS', P.coralInk, 108], [stacking, 'LOAN STACKING', P.coralInk, 140], [add, 'IT ADDS UP', P.coralInk, 130],
        [d25, '$25 FEELS SMALL', P.ink, 124], [four, 'FOUR $100 PURCHASES', P.ink, 120], [week, 'ON THE SAME DAY', P.ink, 120], [apps, 'ACROSS 3 APPS', P.ink, 124], [d400, '$400 TO REPAY', P.coralInk, 140], [six, 'OVER THE NEXT 6 WEEKS', P.ink, 116]]} />
      <g transform={camera(f, [[c("s56:time"), 1240, 600, 1.05], [cannot, 1240, 620, 1.08], [bureau, 960, 540, 1], [add, 1200, 560, 1.08], [d25, 960, 540, 1], [d400, 1300, 600, 1.1]])}>
        {/* # A: three lender booths, each behind its own wall, each seeing only its own loan */}
        <g opacity={A}>
          {[0, 1, 2].map((k) => { const x = 860 + k * 380
            return <g key={k} opacity={on(f, counts + k * 4, 6)}>
              <rect x={x - 150} y={360} width={300} height={560} rx={24} fill={P.card} /><Prop id="bank" x={x} y={480} size={150} f={f} />
              <g transform={`translate(${x} 720) scale(0.4)`}><Doc x={0} y={0} title="1 LOAN" lines={2} /></g>
              <g opacity={on(f, see + k * 2, 6)} transform={`translate(${x} 880)`}><path d="M-46 0 Q0 -36 46 0 Q0 36 -46 0 Z" fill="none" stroke={P.ink} strokeWidth={6} /><circle r={12} fill={P.ink} /></g>
              {k < 2 && <rect x={x + 175} y={340} width={30} height={600} rx={10} fill={P.navy4} opacity={on(f, cannot, 6)} />}
            </g> })}
          <g opacity={on(f, others, 6)} transform={`translate(1240 300) scale(${pop(f, others)})`}><path d="M-60 0 Q0 -46 60 0 Q0 46 -60 0 Z" fill="none" stroke={P.coralInk} strokeWidth={8} /><circle r={16} fill={P.coralInk} /><path d="M-70 40 L70 -40" stroke={P.coralInk} strokeWidth={10} strokeLinecap="round" /></g>
        </g>
        {/* # B: loan stacking — a tower of loans that starts to wobble */}
        <g opacity={B}>
          <g transform={`translate(1260 960) rotate(${Math.sin((f - add) / 6) * 4 * on(f, add, 10)})`}>
            {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={tower(k)} transform={`translate(${(k % 2 ? 1 : -1) * 18 * on(f, add, 10)} ${-k * 80 - (1 - easeOut(span(f, (k < 2 ? stacking : k < 4 ? several : k < 6 ? easy : add) + (k % 2) * 4, (k < 2 ? stacking : k < 4 ? several : k < 6 ? easy : add) + (k % 2) * 4 + 12))) * 140})`}>
              <rect x={-220} y={-74} width={440} height={70} rx={12} fill={[P.sky, P.gold, P.mint, P.coral][k % 4]} /><Label x={0} y={-22} text="PAY IN 4" size={48} font="Bebas Neue" color={P.navy0} /></g>)}
          </g>
          <g opacity={on(f, repay, 6)} transform={`translate(1640 420) scale(${pop(f, repay)})`}><Prop id="warning" x={0} y={0} size={170} f={f} /></g>
          <g opacity={on(f, bureau, 6) * (1 - on(f, stacking, 8))} transform={`translate(1260 560) scale(${pop(f, bureau)})`}><Prop id="bank" x={0} y={0} size={240} f={f} /><Label x={0} y={180} text="CFPB" size={64} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # C: three apps, four $100 purchases, $400 due over six weeks */}
        <g opacity={Cc}>
          <g opacity={on(f, d25, 6) * (1 - on(f, four, 8))} transform={`translate(1240 600) scale(${pop(f, d25) * (f >= feels ? 0.8 : 1.1)})`}><rect x={-120} y={-80} width={240} height={160} rx={20} fill={P.paper} /><Label x={0} y={30} text="$25" size={110} font="Bebas Neue" color={P.navy0} /></g>
          {[0, 1, 2, 3].map((k) => { const at = (k === 0 ? four : d100) + k * 3, app = [0, 1, 2, 0][k]
            return <g key={k} opacity={on(f, at, 6)} transform={`translate(${880 + k * 230} ${lerp(500, 560, on(f, d400, 14))}) scale(${pop(f, at)})`}>
              <rect x={-90} y={-70} width={180} height={140} rx={18} fill={[P.sky, P.gold, P.mint][app]} opacity={f >= apps ? 1 : 0.85} /><Label x={0} y={28} text={f >= d100 ? '$100' : ''} size={76} font="Bebas Neue" color={P.navy0} />
              <Label x={0} y={120} text={f >= three ? `APP ${app + 1}` : ''} size={44} font="Bebas Neue" color={P.ink} /></g> })}
          <g opacity={on(f, week, 6) * (1 - on(f, d400, 8))} transform={`translate(1220 380) scale(${pop(f, week) * 0.8})`}><rect x={-260} y={-50} width={520} height={100} rx={18} fill={P.gold} /><Label x={0} y={20} text="SAME DAY" size={64} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, d400, 6)} transform={`translate(1220 830) scale(${pop(f, d400) * 0.8})`}><rect x={-260} y={-90} width={520} height={180} rx={24} fill={P.coral} /><Label x={0} y={40} text="$400" size={150} font="Bebas Neue" color="#FFFFFF" /></g>
          {Array.from({ length: 4 }, (_, k) => <g key={k} opacity={on(f, six + k * 3, 6)}><Calendar x={970 + k * 170} y={960} text={`WK ${k * 2}`} s={0.65} /></g>)}
        </g>
        <Person f={f} who="hero" beats={hero} x={380} y={1190} s={1.45} life={2} />
        {f >= stacking && f < c('s58') + 4 && (() => { const h = hand(f, hero, 380, 1190, 1.45); const n = Math.min(6, 1 + Math.floor((f - stacking) / 14)); return <g opacity={on(f, stacking, 6) * (1 - on(f, c('s58') - 4, 6))}>{Array.from({ length: n }, (_, k) => <g key={k} transform={`translate(${h.x - 50 + (k % 2) * 14} ${h.y - 30 - k * 34}) rotate(${(k % 2 ? 5 : -4) + Math.sin((f - add) / 6) * 3 * on(f, add, 8)}) scale(0.3)`}><Doc x={0} y={0} title="PAY IN 4" lines={1} /></g>)}</g> })()}
        {f >= each && f < bureau && <Phone x={hp.x + 160} y={hp.y + 10} s={1} r={8} o={on(f, each, 6) * (1 - on(f, bureau - 6, 6))}><Label x={0} y={-60} text="3 APPS" size={56} font="Bebas Neue" color={P.navy1} />{[0, 1, 2].map((k) => <rect key={k} x={-60} y={-20 + k * 50} width={120} height={36} rx={8} fill={[P.sky, P.gold, P.mint][k]} />)}</Phone>}
      </g>
      <Vignette id="bz" />
    </g>
  )
}

// ---------------------------------------------------------------- s59–s66: who pays for free — stores (a fee, bigger for 0%), shoppers on longer plans (interest), investors (loan sales and collecting), extra spending; on time, pay-in-four can cost nothing extra; clear incentives; next time, you'll know who's paying
const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const free = c('s59:free')
  const stores = c('s60:stores'), fee = c('s60:fee'), bigger = c('s60:bigger'), zero = c('s60:zero')
  const shoppers = c('s61:shoppers'), interest = c('s61:interest'), biggest = c('s61:biggest')
  const investors = c('s62:investors'), earns = c('s62:earns'), collecting = c('s62:collecting')
  const whole = c('s63:whole'), grows = c('s63:grows'), more = c('s63:more'), planned = c('s63:planned')
  const something = c('s64:something'), anyway = c('s64:anyway'), time = c('s64:time'), nothing = c('s64:nothing'), extra = c('s64:extra')
  const business = c('s65:business'), around = c('s65:around')
  const none = c('s65a:none'), trick = c('s65a:trick'), incentives = c('s65a:incentives'), know = c('s65a:know'), part = c('s65a:part')
  const next = c('s66:next'), checkout = c('s66:checkout'), four = c('s66:four'), easy = c('s66:easy'), exactly = c('s66:exactly'), paying = c('s66:paying')
  const A = win(f, c('s59'), something), B = win(f, something, none), Cc = on(f, none, 10)
  const hero: Beat[] = [[0, 'scratchHead', 'thinking'], [stores, 'explain', 'neutral'], [something, 'carry', 'smiling'], [time, 'phone', 'smiling'], [nothing, 'fistPump', 'smiling'], [business, 'lookFar', 'thinking'], [none, 'explain', 'neutral'], [incentives, 'weighA', 'thinking', 'weighB', 22], [next, 'phone', 'smiling'], [exactly, 'confident', 'smug']]
  const hp = hand(f, hero, 400, 1190, 1.45)
  // # the four payers as panels around the free plan
  const panels: [number, string, string, string][] = [[stores, 'THE STORE', 'shop-mini', f >= bigger ? 'FEES, MORE FOR 0%' : f >= fee ? 'A FEE ON EACH SALE' : ''], [shoppers, 'LONGER PLANS', 'interest-percent', f >= interest ? 'INTEREST' : ''],
    [investors, 'INVESTORS', 'briefcase', f >= earns ? 'BUY THE LOANS' : ''], [grows, 'EXTRA SPENDING', 'shopping-bag', f >= more ? 'BUY MORE THAN PLANNED' : '']]
  return (
    <g>
      <Stage id="by" frame={f} />
      <Headline f={f} lines={[[free, 'WHO PAYS FOR FREE?', P.ink, 124], [stores, 'STORES PAY FEES', P.goldInk, 124], [zero, 'BIGGER ONES FOR 0%', P.goldInk, 124], [shoppers, 'LONGER PLANS PAY INTEREST', P.coralInk, 110], [biggest, 'AFFIRM’S BIGGEST SOURCE', P.coralInk, 116],
        [investors, 'INVESTORS BUY THE LOANS', P.skyInk, 116], [grows, 'IT GROWS WHEN WE BUY MORE', P.ink, 110], [anyway, 'SOMETHING YOU’D BUY ANYWAY…', P.ink, 106], [time, '…PAID ON TIME', P.mintInk, 120], [nothing, 'NOTHING EXTRA', P.mintInk, 140],
        [business, 'THE BUSINESS IS AROUND IT', P.ink, 110], [trick, 'NOT A TRICK', P.ink, 130], [incentives, 'CLEAR INCENTIVES', P.goldInk, 130], [part, 'SEE WHICH PART IS FREE', P.mintInk, 116], [checkout, 'NEXT TIME AT CHECKOUT…', P.ink, 110], [paying, '…YOU’LL KNOW WHO’S PAYING', P.goldInk, 108]]} />
      <g transform={camera(f, [[c("s60:longer"), 1000, 460, 1.1], [c("s65a:know"), 1240, 640, 1.05], [c("s61:affirm's"), 1480, 420, 1.1], [stores, 1000, 460, 1.06], [shoppers, 1480, 460, 1.06], [investors, 1000, 820, 1.06], [grows, 1480, 820, 1.06], [planned, 960, 540, 1], [nothing, 1240, 600, 1.08], [none, 960, 540, 1], [paying, 1240, 600, 1.06]])}>
        {/* # A: the FREE card in the middle, four payers lighting up around it */}
        <g opacity={A}>
          <g transform={`translate(1240 640) scale(${pop(f, c('s59'))})`}><rect x={-170} y={-90} width={340} height={180} rx={26} fill={P.mint} /><Label x={0} y={30} text="FREE" size={110} font="Bebas Neue" color="#FFFFFF" /></g>
          {panels.map(([at, t, id, sub], k) => { const x = 1000 + (k % 2) * 480, y = 420 + Math.floor(k / 2) * 440
            return <g key={k} opacity={on(f, at, 6)} transform={`translate(${x} ${y}) scale(${pop(f, at)})`}>
              <rect x={-220} y={-130} width={440} height={260} rx={26} fill={P.card} /><Prop id={id} x={0} y={-62} size={110} f={f} />
              <Label x={0} y={36} text={t} size={52} font="Bebas Neue" color={P.ink} /><Label x={0} y={96} text={sub} size={46} font="Bebas Neue" color={[P.goldInk, P.coralInk, P.skyInk, P.ink][k]} /></g> })}
        </g>
        {/* # B: pay in four, on time: four ticks, nothing extra — the business is built around it */}
        <g opacity={B}>
          <g opacity={on(f, anyway, 6)} transform={`translate(1240 360) scale(${pop(f, anyway)})`}><SneakerBox x={0} y={60} s={1.1} /></g>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, time + k * 3, 6)} transform={`translate(${960 + k * 190} 640)`}><rect x={-80} y={-60} width={160} height={120} rx={18} fill={P.mint} /><path d="M-30 0 l20 22 l42 -46" stroke="#FFFFFF" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>)}
          <g opacity={on(f, extra, 6)} transform={`translate(1240 860) scale(${pop(f, extra)})`}><circle r={100} fill={P.mint} /><Label x={0} y={34} text="$0" size={100} font="Bebas Neue" color="#FFFFFF" /></g>
          {/* # the business: the four payers' icons orbit around the ticks */}
          {[0, 1, 2, 3].map((k) => { const a = (f - business) / 60 + k * Math.PI / 2; return <g key={k} opacity={on(f, business + k * 3, 6)} transform={`translate(${1240 + Math.cos(a) * 470} ${640 + Math.sin(a) * 300})`}><circle r={70} fill={P.card} /><Prop id={['shop-mini', 'interest-percent', 'briefcase', 'shopping-bag'][k]} x={0} y={-4} size={100} f={f} /></g> })}
        </g>
        {/* # C: a balance of clear incentives, then the checkout screen with the four payers behind it */}
        <g opacity={Cc}>
          <g opacity={on(f, incentives, 6) * (1 - on(f, next, 8))} transform={`translate(1240 620) scale(${pop(f, incentives)})`}><Prop id="scale-balance" x={0} y={0} size={340} f={f} /></g>
          <g opacity={on(f, trick, 6) * (1 - on(f, incentives, 6))} transform={`translate(1240 620) scale(${pop(f, trick)})`}><Prop id="dice" x={0} y={0} size={200} f={f} /><path d="M-110 -110 L110 110" stroke={P.coral} strokeWidth={16} strokeLinecap="round" /></g>
          <g opacity={on(f, checkout, 6)} transform={`translate(1240 620) scale(${pop(f, checkout)})`}>
            {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, exactly + k * 3, 6)} transform={`translate(${(k % 2 ? 1 : -1) * 330} ${(k < 2 ? -1 : 1) * 170})`}><circle r={90} fill={P.card} /><Prop id={['shop-mini', 'interest-percent', 'briefcase', 'shopping-bag'][k]} x={0} y={-4} size={120} f={f} /></g>)}
            <rect x={-230} y={-200} width={460} height={400} rx={30} fill={P.paper} stroke={P.edge} strokeWidth={3} /><Label x={0} y={-110} text="CHECKOUT" size={64} font="Bebas Neue" color={P.navy1} />
            {[0, 1, 2, 3].map((k) => <rect key={k} x={-170 + k * 88} y={-50} width={76} height={110} rx={12} fill={k === 0 ? P.gold : '#DCE6F2'} opacity={on(f, four + k * 2, 5)} />)}
            <Label x={0} y={140} text={f >= easy ? '4 EASY PAYMENTS' : ''} size={52} font="Bebas Neue" color={P.navy1} />
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={400} y={1190} s={1.45} life={2} />
        {f >= time - 4 && f < nothing && <Phone x={hp.x + 160} y={hp.y + 10} s={1} r={8} o={on(f, time - 4, 6)}><Label x={0} y={-80} text="PAID" size={56} font="Bebas Neue" color="#1E9A63" /><Label x={0} y={10} text="ON TIME" size={52} font="Bebas Neue" color={P.navy1} /></Phone>}
        {f >= next && <Phone x={hp.x + 160} y={hp.y + 10} s={1} r={8} o={on(f, next, 6)}><Label x={0} y={-80} text="PAY IN 4" size={52} font="Bebas Neue" color={P.navy1} /><Label x={0} y={20} text="?" size={110} font="Bebas Neue" color={P.goldInk} /></Phone>}
      </g>
      <Vignette id="by" />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const BNPL = [
  makePiece('bnpl-hook', 'Long: $100 sneakers in four $25 payments · no interest, no fees · Affirm took in $4.3B · who is paying?', { mood: 'light', Component: Hook,
    beats: ["s3:took", ...beat('s1', ['sneakers', '100', 'checkout', 'split', 'four', '25']), ...beat('s2', ['interest', 'fees', 'time', 'nothing']), ...beat('s3', ['affirm', 'biggest', '43', 'revenue', 'fiscal']), ...beat('s4', ['loan', 'who']), ...beat('s5', ['follow', 'money', 'several', 'different', 'payers', 'hiding'])],
    sfx: [['s1:sneakers', 'pop', 0.4], ['s1:100', 'ding', 0.4], ['s1:split', 'swish', 0.4], ['s2:interest', 'thud', 0.4], ['s2:fees', 'thud', 0.4], ['s2:nothing', 'chime', 0.4], ['s3:43', 'impact', 0.5], ['s4:who', 'riser', 0.4], ['s5:hiding', 'whoosh', 0.4]] }),
  makePiece('bnpl-loan', 'Long: it is a loan — four equal parts over six weeks · the lender waits · longer monthly plans', { mood: 'dark', Component: Loan,
    beats: ["s10a:lenders", ...beat('s6', ['what', 'actually']), ...beat('s7', ['loan']), ...beat('s8', ['classic', 'split', 'four', 'equal', 'parts']), ...beat('s9', ['first', 'checkout', 'every', 'two', 'whole', 'six']), ...beat('s10', ['walk', 'today', 'lender', 'waits', 'three']), ...beat('s10a', ['longer', 'monthly', 'many', 'keep', 'later'])],
    sfx: [['s7:loan', 'impact', 0.5], ['s8:four', 'pop', 0.4], ['s9:checkout', 'coin', 0.4], ['s9:two', 'tick', 0.4], ['s9:six', 'chime', 0.4], ['s10:lender', 'pop', 0.4], ['s10a:longer', 'swish', 0.4], ['s10a:keep', 'ding', 0.4]] }),
  makePiece('bnpl-scale', 'Long: small loans (~$135) but ~336 million a year (~$45B); ~17x since 2019', { mood: 'light', Component: Scale,
    beats: [...beat('s11', ['small', 'average', 'six', 'biggest', '135']), ...beat('s12', ['lot', 'six', 'lenders', 'made', '336', 'year', '45']), ...beat('s12a', ['grew', 'fast', 'same', '20', 'million', 'loans', 'by', 'roughly', '17', 'many'])],
    sfx: [['s11:135', 'ding', 0.4], ['s12:lot', 'swish', 0.4], ['s12:336', 'impact', 0.5], ['s12a:fast', 'whoosh', 0.4], ['s12a:17', 'impact', 0.5]] }),
  makePiece('bnpl-approve', 'Long: a soft check, 73% approved, low and grow; free lending earns nothing', { mood: 'dark', Component: Approve,
    beats: ["s12b:designed", ...beat('s12b', ['easy', 'check', 'soft', 'cannot', 'change', 'score']), ...beat('s12c', ['in', 'bureau', 'studied', 'approved', '73', 'applied']), ...beat('s12d', ['start', 'small', 'raise', 'time', 'low', 'grow']), ...beat('s13', ['lending', 'charging', 'nothing', 'money', 'somewhere'])],
    sfx: [['s12b:soft', 'softpop', 0.4], ['s12c:73', 'ding', 0.4], ['s12d:raise', 'pop', 0.4], ['s12d:grow', 'chime', 0.4], ['s13:nothing', 'thud', 0.5]] }),
  makePiece('bnpl-store', 'Long: the store pays a fee on each pay-later sale (like a card fee); Affirm ≈ $1.15B from stores on ≈ $50.2B ≈ $2.30 per $100', { mood: 'light', Component: Store,
    beats: ["s17:same", "s15a:store", ...beat('s14', ['store']), ...beat('s15', ['choose', 'later', 'pays', 'lender', 'fee', 'sale']), ...beat('s15a', ['works', 'tap', 'card']), ...beat('s18a', ['each', 'small', 'across', 'millions', 'serious']), ...beat('s16', ['fiscal', 'affirm', 'earned', '115', 'merchant']), ...beat('s17', ['financed', '502', 'purchases']), ...beat('s18', ['together', '2', '30', '100'])],
    sfx: [['s14:store', 'pop', 0.4], ['s15:fee', 'coin', 0.5], ['s15a:tap', 'click', 0.4], ['s18a:millions', 'swish', 0.4], ['s16:115', 'impact', 0.5], ['s17:502', 'thud', 0.4], ['s18:30', 'ding', 0.5]] }),
  makePiece('bnpl-pitch', 'Long: CFPB merchant fees ≈ 2.5%; why stores agree — a lender pitch (+41% orders, +30% checkouts, own claims); 571k / 1.2M stores; 0% plans cost the store more', { mood: 'dark', Component: Pitch,
    beats: ["s24:affirm", "s23:lender's", "s22:one", "s19:in", "s19:consumer", ...beat('s19', ['bureau', 'five', 'pattern', 'averaged', '25']), ...beat('s20', ['sneakers', '2', '50', 'gives']), ...beat('s21', ['why', 'agree']), ...beat('s22', ['promise', 'quoted', 'advertised', '41', '30', 'checkouts']), ...beat('s23', ['claims', 'independent', 'signing', 'affirm', '571000']), ...beat('s23a', ['klarna', '12', 'stores', 'offer']), ...beat('s24', ['twist', 'longer', 'zero', 'bigger', 'fee']), ...beat('s25', ['sofa', 'laptop', 'zero', 'year', 'often', 'free'])],
    sfx: [['s19:25', 'ding', 0.4], ['s20:gives', 'coin', 0.5], ['s21:why', 'softpop', 0.4], ['s22:41', 'pop', 0.4], ['s22:30', 'pop', 0.4], ['s23:independent', 'thud', 0.5], ['s23:571000', 'impact', 0.4], ['s24:bigger', 'thud', 0.5], ['s25:free', 'crack', 0.4]] }),
  makePiece('bnpl-interest', 'Long: payer #2 is you on longer plans; 27.8M customers; 70/16/14 mix; the rate depends on you — up to 36%; simple interest still adds up', { mood: 'dark', Component: Interest,
    beats: ["s30a:longer", "s30a:but", "s30a:says", "s28:fiscal", ...beat('s26', ['choose', 'longer', 'charges', 'interest']), ...beat('s27a', ['affirm', '278', 'customers', 'june']), ...beat('s27', ['most', 'split', 'four']), ...beat('s28', ['70', 'monthly', 'charge']), ...beat('s29', ['16', 'classic', '14', 'zero']), ...beat('s30', ['rate', 'credit', 'long', 'much', 'partner', '36']), ...beat('s30a', ['simple', 'never', 'rates', 'real', 'price'])],
    sfx: [['s26:choose', 'pop', 0.4], ['s26:interest', 'thud', 0.4], ['s27a:278', 'swish', 0.4], ['s28:70', 'impact', 0.5], ['s29:16', 'pop', 0.4], ['s29:14', 'pop', 0.4], ['s30:36', 'impact', 0.5], ['s30a:never', 'ding', 0.4], ['s30a:real', 'riser', 0.4]] }),
  makePiece('bnpl-split', 'Long: interest is the biggest source (≈ $2.05B, 48¢ per revenue dollar vs 27¢ store fees); per $100: Affirm ≈ $8.50 vs Klarna < $3; lending at interest', { mood: 'light', Component: Split,
    beats: ["s35:klarna's", "s33:revenue", "s32:interest", ...beat('s31', ['biggest', 'source', '205', 'last']), ...beat('s32', ['dollar', '48', '27', 'fees']), ...beat('s33', ['compare', 'affirm', '8', '50', '100', 'financed']), ...beat('s34', ['klarna', 'under', '3', 'quarter']), ...beat('s35', ['alone', '4', 'more', 'name', 'money', 'oldest', 'banking', 'lending'])],
    sfx: [['s31:205', 'impact', 0.5], ['s32:48', 'swish', 0.4], ['s32:27', 'swish', 0.4], ['s33:50', 'pop', 0.4], ['s34:3', 'pop', 0.4], ['s35:4', 'thud', 0.5], ['s35:banking', 'whoosh', 0.4], ['s35:lending', 'coin', 0.5]] }),
  makePiece('bnpl-sold', 'Long: payer #3 — Affirm sells ≈ $21.9B of loans to banks, hedge funds, pension funds, insurers; 1–3 year deals; ≈ $597M gains; cash lent again', { mood: 'dark', Component: Sold,
    beats: ["s40a:how", ...beat('s36', ['someone', 'meet']), ...beat('s37', ['makes', 'often', 'keep']), ...beat('s38', ['sold', '219', 'outside', 'investors']), ...beat('s39', ['banks', 'hedge', 'pension', 'insurance', 'receive', 'repaid']), ...beat('s39a', ['sign', 'one', 'three', 'batches', 'again']), ...beat('s40', ['selling', 'cash', 'lend', 'booked', '597', 'gains']), ...beat('s40a', ['making', 'tying', 'old'])],
    sfx: [['s36:someone', 'riser', 0.4], ['s38:sold', 'thud', 0.5], ['s38:219', 'impact', 0.5], ['s39:banks', 'pop', 0.4], ['s39:hedge', 'pop', 0.4], ['s39:pension', 'pop', 0.4], ['s39:insurance', 'pop', 0.4], ['s39a:again', 'swish', 0.4], ['s40:cash', 'cash', 0.5], ['s40:597', 'impact', 0.5]] }),
  makePiece('bnpl-service', 'Long: Affirm collects for the buyers (≈ $173M); your app loan may belong to a pension fund; the Affirm Card earns a share of card fees (≈ $294M)', { mood: 'light', Component: Service,
    beats: [...beat('s41', ['collecting', 'buyers', 'earned', '173', 'work']), ...beat('s42', ['app', 'belong', 'pension', 'shows', 'name']), ...beat('s43', ["affirm's#3", 'stream', "affirm's", 'pays', 'card', 'store', 'fee', 'cut', '17', 'dollar', 'across', '175', 'purchases', 'cents', 'added', '294'])],
    sfx: [['s41:collecting', 'coin', 0.4], ['s41:173', 'impact', 0.4], ['s42:pension', 'ding', 0.5], ['s43:card', 'click', 0.4], ['s43:cut', 'coin', 0.4], ['s43:17', 'ding', 0.4], ['s43:294', 'impact', 0.5]] }),
  makePiece('bnpl-late', 'Long: late fees are not the engine — Affirm $0; ~4 in 100 loans got one; ~$7 a missed payment; ≈ 18¢ per $100 lent', { mood: 'dark', Component: Late,
    beats: ["s46:in", ...beat('s44', ['late', 'hidden', 'engine']), ...beat('s45', ['affirm', 'founding', 'zero']), ...beat('s46', ['other', 'charge', '4', '100', 'fee']), ...beat('s46a', ['report', 'often', '7', 'missed']), ...beat('s47', ['collected', '18', '100', 'lent']), ...beat('s48', ['hurts', 'person', 'small', 'business'])],
    sfx: [['s44:engine', 'riser', 0.4], ['s45:zero', 'ding', 0.5], ['s46:4', 'thud', 0.4], ['s46a:7', 'pop', 0.4], ['s47:18', 'coin', 0.4], ['s48:hurts', 'crack', 0.4]] }),
  makePiece('bnpl-margin', 'Long: pay-in-four earns little — ≈ $4 revenue, ≈ $3 costs, ≈ $1 left per $100 (2021); ~2 in 100 written off; Klarna ≈ $1.20 kept', { mood: 'light', Component: Margin,
    beats: ["s51a:every", "s51:pays", "s50a:fully", "s50a:in", "s49:in#2", ...beat('s49', ['simple', 'little', 'bureau', 'five', '4', '100']), ...beat('s50', ['3', 'costs', 'processing', 'never']), ...beat('s50a', ['losses', 'real', '2', 'written']), ...beat('s51', ['left', '1', 'simplest', 'many', 'millions', 'times']), ...beat("s51a", ["klarna's", 'results', 'similar', 'costs', 'kept', '20', 'shopping'])],
    sfx: [['s49:4', 'coin', 0.4], ['s50:processing', 'swish', 0.4], ['s50:never', 'swish', 0.4], ['s50a:written', 'crack', 0.4], ['s51:1', 'ding', 0.5], ['s51:millions', 'cash', 0.4], ['s51a:20', 'pop', 0.4]] }),
  makePiece('bnpl-catch', 'Long: the catch is spending more; small payments do not feel like borrowing; 53.6M customers (some counted twice); 6.3 loans, ≈ $848 a year per lender', { mood: 'light', Component: Catch,
    beats: ["s55a:real", "s54:come", "s53:thing", ...beat('s52', ['stores', 'late', 'small', 'catch']), ...beat('s53', ['paying', 'spending', 'more']), ...beat('s54', ['sell', 'bigger', 'shoppers']), ...beat('s54a', ['because', 'small', 'feels', 'borrowing']), ...beat('s55a', ['in', 'six', 'counted', '536', 'customers', 'people', 'one', 'lower']), ...beat('s55', ['keep', 'back', 'user', '63', 'lender', '848'])],
    sfx: [['s52:catch', 'softpop', 0.4], ['s53:more', 'thud', 0.5], ['s54:bigger', 'pop', 0.4], ['s54a:borrowing', 'chime', 0.4], ['s55a:536', 'impact', 0.4], ['s55:63', 'pop', 0.4], ['s55:848', 'impact', 0.5]] }),
  makePiece('bnpl-stack', 'Long: each lender sees only its own loans; loan stacking; four $100 purchases across three apps = $400 in six weeks', { mood: 'dark', Component: Stack,
    beats: ["s56:time", ...beat('s56', ['counts', 'each', 'cannot', 'see', 'others']), ...beat('s57', ['bureau', 'stacking', 'several', 'easy', 'add', 'repay']), ...beat('s58', ['25', 'feels', 'four', '100', 'day', 'three', 'apps', '400', 'six'])],
    sfx: [['s56:cannot', 'thud', 0.4], ['s57:stacking', 'riser', 0.4], ['s57:add', 'crack', 0.4], ['s58:100', 'pop', 0.4], ['s58:400', 'impact', 0.6]] }),
  makePiece('bnpl-payoff', 'Long: who pays for free — stores, longer-plan interest, investors, extra spending; on time pay-in-four costs nothing extra; clear incentives', { mood: 'light', Component: Payoff,
    beats: ["s60:longer", "s65a:know", "s61:affirm's", ...beat('s60', ['stores', 'fee', 'bigger', 'zero']), ...beat('s61', ['shoppers', 'interest', 'biggest']), ...beat('s62', ['investors', 'earns', 'collecting']), ...beat('s63', ['grows', 'more', 'planned']), ...beat('s64', ['anyway', 'time', 'nothing', 'extra']), ...beat('s65', ['business', 'around']), ...beat('s65a', ['none', 'trick', 'incentives', 'part']), ...beat('s66', ['next', 'checkout', 'four', 'easy', 'exactly', 'paying'])],
    sfx: [['s60:stores', 'pop', 0.4], ['s61:shoppers', 'pop', 0.4], ['s62:investors', 'pop', 0.4], ['s63:grows', 'pop', 0.4], ['s64:nothing', 'chime', 0.5], ['s65a:incentives', 'ding', 0.4], ['s66:paying', 'impact', 0.5]] }),
]
