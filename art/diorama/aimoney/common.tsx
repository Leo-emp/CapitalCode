// ============================================================
// LONG VIDEO — "Who Is Actually Making Money From AI?" — shared drawing
// kit for the eleven scene files in this folder (one file per scene, so a
// fix to one scene re-renders only the chunks that show it).
// House rules (owner r22/r26/r27/r29): every word and number shows ON its
// spoken word, never before; one headline slot; text ≥ 44 px; the cast acts.
// ============================================================
import React from 'react'
import { expressionAt } from '../../motion/acting'
import { getProp } from '../../props/registry'
import { Actor, heldPoint } from '../../rig/Actor'
import { cyclePose, mixPose, type Pose, poseAt, type PoseId, type ExpressionId } from '../../rig/pose'
import { Calendar, Label } from '../charts'
import { easeInOut, easeOut, lerp, on, P, pop, span } from '../kit'

export const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> = ({ id, x, y, size, f }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} />
}
// # visible from a to b with clean fades (gone by b)
export const win = (f: number, a: number, b: number, d = 8) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
// # camera: on each cue the view eases to [cue, focus x, focus y, zoom]; Stage, headline and vignette stay put
export type CamKey = [at: number, x: number, y: number, s: number]
export const camera = (f: number, keys: CamKey[], d = 14) => {
  let x = 960, y = 540, z = 1
  for (const [at, kx, ky, ks] of [...keys].sort((a, b) => a[0] - b[0])) { const t = easeInOut(span(f, at, at + d)); x = lerp(x, kx, t); y = lerp(y, ky, t); z = lerp(z, ks, t) }
  return `translate(${x} ${y}) scale(${z}) translate(${-x} ${-y})`
}
// # the headline slot: each line from its cue until the next line's cue — never two at once
export type Head = [at: number, text: string, color?: string, size?: number]
export const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number }> = ({ f, lines: raw, until = 9e9, y = 150 }) => { const lines = [...raw].sort((p, q) => p[0] - q[0]); return (
  <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    return o > 0.001 ? <g key={k} transform={`translate(960 ${y}) scale(${0.95 + 0.05 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 96} font="Bebas Neue" color={color ?? P.ink} o={o} /></g> : null
  })}</g>)}

// ------------------------------------------------------------ acting
// # a beat: from `at` the actor springs into `pose`; with `loop` it keeps swinging pose ↔ loop (signing, counting, clapping…)
export type Beat = [at: number, pose: PoseId, face?: ExpressionId, loop?: PoseId, period?: number]
export const posed = (f: number, beats: Beat[]): Pose => {
  const base = poseAt(f, 30, beats.map(([at, p]) => [at, p] as [number, PoseId]))
  const cur = beats.filter((b) => b[0] <= f).pop()
  if (!cur || !cur[3]) return base
  return mixPose(base, cyclePose(f, cur[1], cur[3], cur[4] ?? 16), on(f, cur[0], 10))
}
export const faced = (f: number, beats: Beat[]) => expressionAt(f, beats.map(([at, pose, face]) => ({ at, pose, expression: face })))
// # one cast member acting a list of beats; returns the pose too so props can follow the hand
export const Person: React.FC<{ f: number; who: string; beats: Beat[]; x: number; y: number; s?: number; flip?: boolean; life?: number; o?: number }> = ({ f, who, beats, x, y, s = 1, flip, life = 3, o = 1 }) => {
  const p = posed(f, beats), ex = faced(f, beats)
  return <g opacity={o}><Actor who={who} pose={p} expression={ex.expression} blend={ex.from ? { from: ex.from, mix: ex.mix! } : undefined} x={x} y={y} scale={s} frame={f} flip={flip} life={life} /></g>
}
// # where a Person's right hand is (scene pixels) — for a prop held in it
export const hand = (f: number, beats: Beat[], x: number, y: number, s = 1, flip = false) => heldPoint(posed(f, beats), { x, y, scale: s }, flip)

// ------------------------------------------------------------ the cast of objects
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={34} ry={34} fill={P.goldD} /><circle r={34} fill={P.gold} /><circle r={25} fill="none" stroke={P.goldD} strokeWidth={4} />
    <text y={13} textAnchor="middle" fill={P.goldD} style={{ font: '400 38px "Bebas Neue"' }}>{text}</text>
  </g>
)
// # a phone held up, its screen showing a few lines
export const Phone: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; children?: React.ReactNode }> = ({ x, y, s = 1, r = 0, o = 1, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-92} y={-170} width={184} height={340} rx={30} fill="#0D1424" />
    <rect x={-80} y={-150} width={160} height={300} rx={20} fill="#F7FAFF" />
    <rect x={-26} y={-162} width={52} height={8} rx={4} fill="#2A3550" />
    {children}
  </g>
)
// # a sneaker box with a sneaker peeking out
export const SneakerBox: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-90} width={300} height={90} rx={10} fill="#E05A4C" /><rect x={-150} y={-90} width={300} height={22} rx={8} fill="#B8433A" />
    <path d="M-110 -90 Q-110 -150 -40 -150 L30 -132 Q90 -120 110 -100 L110 -90 Z" fill="#F7FAFF" /><path d="M-110 -100 L110 -100" stroke="#2B4A78" strokeWidth={10} />
    <path d="M-60 -140 L-20 -128 M-50 -146 L-10 -134" stroke="#2B4A78" strokeWidth={5} strokeLinecap="round" />
    <rect x={-150} y={-12} width={300} height={12} fill="#000" opacity={0.12} />
  </g>
)
// # a document (loan contract) with a title
export const Doc: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; title?: string; stamp?: string; stampO?: number; lines?: number }> = ({ x, y, s = 1, r = 0, o = 1, title, stamp, stampO = 0, lines = 4 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-190} width={300} height={380} rx={18} fill="#000" opacity={0.16} transform="translate(10 12)" />
    <rect x={-150} y={-190} width={300} height={380} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    {title && <text x={0} y={-120} textAnchor="middle" fill={P.navy2} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>}
    {Array.from({ length: lines }, (_, k) => <rect key={k} x={-110} y={-80 + k * 42} width={220 - (k % 2) * 60} height={14} rx={7} fill="#C8B994" />)}
    {stamp && <g opacity={stampO} transform={`rotate(-12) scale(${0.8 + 0.2 * stampO})`}><rect x={-130} y={70} width={260} height={90} rx={12} fill="none" stroke={P.coral} strokeWidth={8} /><text x={0} y={136} textAnchor="middle" fill={P.coral} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>{stamp}</text></g>}
  </g>
)
// # a shop counter (front) with a card terminal
export const Counter: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 1 }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={y} width={w} height={40} rx={10} fill="#C98F5A" /><rect x={x - w / 2} y={y + 40} width={w} height={420} fill="#A86F42" />
    <rect x={x - w / 2} y={y + 40} width={w} height={14} fill="#000" opacity={0.15} />
    {Array.from({ length: Math.floor(w / 180) }, (_, k) => <rect key={k} x={x - w / 2 + 30 + k * 180} y={y + 80} width={140} height={300} rx={10} fill="#000" opacity={0.07} />)}
  </g>
)
export const Terminal: React.FC<{ x: number; y: number; s?: number; text?: string; o?: number; lit?: number }> = ({ x, y, s = 1, text, o = 1, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-150} width={120} height={150} rx={18} fill="#1B2233" /><rect x={-46} y={-136} width={92} height={56} rx={8} fill={lit > 0 ? P.mint : '#3A4A66'} opacity={0.9} />
    {text && <text x={0} y={-96} textAnchor="middle" fill="#0D1424" style={{ font: '400 34px "Bebas Neue"' }}>{text}</text>}
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-40 + c * 30} y={-66 + r * 20} width={20} height={12} rx={3} fill="#5A6680" />))}
  </g>
)
// # a person-shaped silhouette with a question mark (an unknown payer)
export const Shadow: React.FC<{ x: number; y: number; s?: number; o?: number; q?: number; color?: string }> = ({ x, y, s = 1, o = 1, q = 1, color = P.navy4 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-150} r={42} fill={color} /><path d="M-70 0 Q-70 -96 0 -100 Q70 -96 70 0 Z" fill={color} />
    <g opacity={q}><circle cx={0} cy={-150} r={30} fill={P.gold} /><text x={0} y={-134} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>?</text></g>
  </g>
)
// # a rounded panel with a big number and a caption
export const Stat: React.FC<{ x: number; y: number; big: string; small?: string; color?: string; o?: number; s?: number; w?: number }> = ({ x, y, big, small, color = P.goldInk, o = 1, s = 1, w = 520 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-110} width={w} height={small ? 220 : 160} rx={28} fill={P.card} />
    <Label x={0} y={small ? 10 : 20} text={big} size={110} font="Bebas Neue" color={color} />
    {small && <Label x={0} y={80} text={small} size={48} font="Bebas Neue" color={P.ink2} />}
  </g>
)
// # a stamp that thumps on
export const Stamp: React.FC<{ x: number; y: number; text: string; f: number; at: number; color?: string; r?: number; size?: number }> = ({ x, y, text, f, at, color = P.coralInk, r = -8, size = 72 }) => {
  const t = on(f, at, 6), w = text.length * size * 0.42 + 70
  return <g opacity={t} transform={`translate(${x} ${y}) rotate(${r}) scale(${lerp(1.4, 1, easeOut(span(f, at, at + 6)))})`}>
    <rect x={-w / 2} y={-size * 0.75} width={w} height={size * 1.3} rx={14} fill="none" stroke={color} strokeWidth={8} />
    <Label x={0} y={size * 0.33} text={text} size={size} font="Bebas Neue" color={color} />
  </g>
}
// # a tick in a circle
export const Tick: React.FC<{ x: number; y: number; o: number; r?: number; ok?: boolean }> = ({ x, y, o, r = 40, ok = true }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={ok ? P.mint : P.coral} />
    {ok ? <path d={`M${-r * 0.45} 0 l${r * 0.3} ${r * 0.3} l${r * 0.6} ${-r * 0.65}`} stroke={P.white} strokeWidth={r * 0.22} fill="none" strokeLinecap="round" />
      : <path d={`M${-r * 0.4} ${-r * 0.4} L${r * 0.4} ${r * 0.4} M${r * 0.4} ${-r * 0.4} L${-r * 0.4} ${r * 0.4}`} stroke={P.white} strokeWidth={r * 0.22} strokeLinecap="round" />}</g>
)
// # a coin flying from a to b over d frames starting at t0 (arcs up)
export const fly = (f: number, t0: number, a: [number, number], b: [number, number], d = 18, h = 140) => {
  const t = easeInOut(span(f, t0, t0 + d))
  return { x: lerp(a[0], b[0], t), y: lerp(a[1], b[1], t) - Math.sin(t * Math.PI) * h, o: on(f, t0, 3) * (1 - span(f, t0 + d - 2, t0 + d + 2)), t }
}


// ------------------------------------------------------------ objects for this story
// # a glass savings jar, fill 0–1, with an optional label on its lid
export const Jar: React.FC<{ x: number; y: number; s?: number; fill: number; label?: string; o?: number; color?: string }> = ({ x, y, s = 1, fill, label, o = 1, color = P.gold }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-230} width={220} height={240} rx={34} fill="#DDEBF7" opacity={0.35} stroke="#A9C4DE" strokeWidth={6} />
    <rect x={-96} y={4 - 220 * Math.max(0, Math.min(1, fill))} width={192} height={220 * Math.max(0, Math.min(1, fill))} rx={26} fill={color} />
    {Array.from({ length: Math.floor(fill * 6) }, (_, k) => <ellipse key={k} cx={-50 + (k % 3) * 50} cy={-14 - Math.floor(k / 3) * 40} rx={22} ry={8} fill={P.goldD} opacity={0.6} />)}
    <rect x={-120} y={-262} width={240} height={40} rx={12} fill={P.navy3} />
    {label && <text x={0} y={-233} textAnchor="middle" fill={P.white} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
  </g>
)
// # a tax bucket: fill 0–1 of water, its rate on the front, an optional cap line
export const Bucket: React.FC<{ x: number; y: number; fill: number; rate: string; o?: number; s?: number; color?: string; dry?: boolean }> = ({ x, y, fill, rate, o = 1, s = 1, color = '#4FA8E8', dry }) => {
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
export const Car: React.FC<{ x: number; y: number; s?: number; color?: string; o?: number; old?: number; spin?: number }> = ({ x, y, s = 1, color = '#3A6EA8', o = 1, old = 0, spin = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={300} ry={18} fill="#000" opacity={0.2} />
    <path d="M-290 -50 Q-290 -110 -230 -118 L-130 -128 L-70 -200 Q-50 -220 -20 -220 L120 -220 Q150 -220 170 -196 L230 -128 L270 -118 Q300 -110 300 -60 L300 -40 Q300 -24 284 -24 L-276 -24 Q-290 -24 -290 -40 Z" fill={old > 0.5 ? '#8A8F99' : color} />
    <path d="M-50 -196 L40 -196 L40 -132 L-104 -132 Z M64 -196 L120 -196 Q138 -196 150 -180 L190 -132 L64 -132 Z" fill="#BFE4FF" opacity={0.85} />
    {[-170, 180].map((cx) => <g key={cx} transform={`translate(${cx} -24) rotate(${spin * 360})`}><circle r={52} fill="#1B2233" /><circle r={26} fill="#C9D1DE" /><rect x={-4} y={-24} width={8} height={18} fill="#8C97AA" /></g>)}
    {old > 0 && <g opacity={old}><circle cx={-320} cy={-60} r={22} fill="#9AA3B2" opacity={0.6} /><circle cx={-350} cy={-90} r={30} fill="#9AA3B2" opacity={0.4} /></g>}
  </g>
)
// # a house; size 0–1 grows it (a nicer place)
export const House: React.FC<{ x: number; y: number; s?: number; o?: number; big?: number; color?: string }> = ({ x, y, s = 1, o = 1, big = 0, color = '#E9C25A' }) => {
  const w = 220 + 120 * big, h = 170 + 110 * big
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={10} fill={color} /><path d={`M${-w / 2 - 30} ${-h} L0 ${-h - 120 - 40 * big} L${w / 2 + 30} ${-h} Z`} fill="#C94A3E" />
    <rect x={-36} y={-110} width={72} height={110} rx={8} fill="#6E5236" />
    {Array.from({ length: big > 0.5 ? 4 : 2 }, (_, k) => <rect key={k} x={-w / 2 + 26 + (k % 2) * (w - 112)} y={-h + 34 + Math.floor(k / 2) * 90} width={60} height={56} rx={6} fill="#BFE4FF" />)}
  </g>
}
// # an envelope (a bill) — text on its face
export const Bill: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string }> = ({ x, y, s = 1, r = 0, o = 1, text }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-76} width={240} height={152} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={3} /><path d="M-120 -76 L0 10 L120 -76" fill="none" stroke="#C8B994" strokeWidth={6} />
    {text && <text x={0} y={56} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>{text}</text>}
  </g>
)
// # a labelled horizontal money bar growing from x, with value text at its end
export const MBar: React.FC<{ x: number; y: number; w: number; h?: number; color: string; label?: string; value?: string; o?: number; vo?: number; inside?: boolean }> = ({ x, y, w, h = 80, color, label, value, o = 1, vo = 1, inside }) => (
  <g opacity={o}>
    {label && <Label x={x} y={y - 16} text={label} size={46} font="Bebas Neue" color={P.ink} anchor="start" />}
    <rect x={x} y={y} width={Math.max(0, w)} height={h} rx={16} fill={color} />
    {value && <Label x={inside ? x + w - 18 : x + w + 20} y={y + h / 2 + 20} text={value} size={58} font="Bebas Neue" color={inside ? P.navy0 : P.ink} anchor={inside ? 'end' : 'start'} o={vo} />}
  </g>
)


// ------------------------------------------------------------ objects for the AI money story
// # a GPU: a dark board with a glowing die; glow 0–1, an optional label under it
export const Gpu: React.FC<{ x: number; y: number; s?: number; o?: number; glow?: number; label?: string; r?: number }> = ({ x, y, s = 1, o = 1, glow = 0.6, label, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-100} width={300} height={200} rx={18} fill="#000" opacity={0.18} transform="translate(8 10)" />
    <rect x={-150} y={-100} width={300} height={200} rx={18} fill="#1E2A3E" />
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-130 + k * 26} y={92} width={14} height={18} rx={3} fill="#C9A44B" />)}
    <rect x={-70} y={-62} width={140} height={124} rx={12} fill="#0B1222" stroke="#3E5478" strokeWidth={4} />
    <rect x={-52} y={-44} width={104} height={88} rx={8} fill="#5FE3A1" opacity={0.25 + 0.75 * glow} />
    {[-110, 110].map((cx) => <g key={cx}>{[-50, 0, 50].map((cy) => <rect key={cy} x={cx - 18} y={cy - 14} width={36} height={28} rx={5} fill="#33476A" />)}</g>)}
    <circle r={60 + 30 * glow} fill="#5FE3A1" opacity={0.12 * glow} />
    {label && <text x={0} y={100 + 70 / Math.min(1, s)} textAnchor="middle" fill={P.ink} style={{ font: `400 ${Math.max(50, 48 / s)}px "Bebas Neue"`, letterSpacing: 2 }}>{label}</text>}
  </g>
)
// # a data-center hall: a long building with rows of blinking server lights; lit 0–1
export const DataCenter: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number; f?: number; label?: string }> = ({ x, y, s = 1, o = 1, lit = 1, f = 0, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={330} ry={22} fill="#000" opacity={0.18} />
    <rect x={-300} y={-260} width={600} height={260} rx={16} fill="#D9E2EE" /><rect x={-300} y={-260} width={600} height={34} rx={14} fill="#A9B7CB" />
    {Array.from({ length: 5 }, (_, k) => <g key={k}><rect x={-270 + k * 112} y={-200} width={86} height={170} rx={8} fill="#26324A" />
      {Array.from({ length: 6 }, (_, j) => <circle key={j} cx={-246 + k * 112 + (j % 2) * 38} cy={-178 + Math.floor(j / 2) * 52} r={7} fill={(Math.floor(f / 6) + k * 3 + j * 5) % 7 < 5 ? '#5FE3A1' : '#2E7A58'} opacity={lit} />)}</g>)}
    {[-200, 0, 200].map((cx) => <rect key={cx} x={cx - 30} y={-300} width={60} height={44} rx={8} fill="#8A99B0" />)}
    {label && <text x={0} y={20 + 50 / Math.min(1, s)} textAnchor="middle" fill={P.ink} style={{ font: `400 ${Math.max(52, 48 / s)}px "Bebas Neue"`, letterSpacing: 2 }}>{label}</text>}
  </g>
)
// # a chip factory (fab): a clean white block with a tall stack
export const Fab: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string; f?: number }> = ({ x, y, s = 1, o = 1, label, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={300} ry={20} fill="#000" opacity={0.18} />
    <rect x={-260} y={-220} width={520} height={220} rx={12} fill="#EEF2F7" /><rect x={-260} y={-220} width={520} height={26} rx={10} fill="#B9C6D8" />
    <rect x={150} y={-380} width={60} height={170} rx={8} fill="#C9D3E1" />
    {[0, 1, 2].map((k) => <circle key={k} cx={180 + Math.sin((f + k * 20) / 14) * 10} cy={-410 - k * 40 - ((f / 2 + k * 15) % 40)} r={22 + k * 6} fill="#DDE5EF" opacity={0.6 - k * 0.15} />)}
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-230 + k * 70} y={-170} width={50} height={60} rx={6} fill="#9FD4FF" />)}
    <rect x={-90} y={-90} width={180} height={90} rx={8} fill="#5C6F8E" />
    {label && <text x={0} y={20 + 50 / Math.min(1, s)} textAnchor="middle" fill={P.ink} style={{ font: `400 ${Math.max(56, 48 / s)}px "Bebas Neue"`, letterSpacing: 2 }}>{label}</text>}
  </g>
)
// # gold-rush props: a shovel (blade down), a pick, a gold pan
export const Shovel: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-8} y={-190} width={16} height={190} rx={6} fill="#A06B3A" /><rect x={-34} y={-206} width={68} height={22} rx={10} fill="#A06B3A" />
    <path d="M-48 0 L48 0 L40 80 Q0 120 -40 80 Z" fill="#9AA6B6" stroke="#6E7A8C" strokeWidth={5} />
  </g>
)
export const Pick: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-8} y={-10} width={16} height={200} rx={6} fill="#A06B3A" />
    <path d="M-120 10 Q0 -60 120 10 L110 22 Q0 -36 -110 22 Z" fill="#8792A3" />
  </g>
)
export const Pan: React.FC<{ x: number; y: number; s?: number; o?: number; gold?: number }> = ({ x, y, s = 1, o = 1, gold = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={90} ry={30} fill="#7B8796" /><ellipse cx={0} cy={-6} rx={70} ry={20} fill="#A7B2C0" />
    {gold > 0 && [[-20, -8], [8, -4], [24, -10]].map(([gx, gy], k) => <circle key={k} cx={gx} cy={gy} r={7} fill={P.gold} opacity={gold} />)}
  </g>
)
// # one layer of the AI stack: a wide slab with a name and an icon on its left
export const Layer: React.FC<{ x: number; y: number; w?: number; color: string; name: string; icon?: string; f: number; o?: number; glow?: number; dim?: number }> = ({ x, y, w = 760, color, name, icon, f, o = 1, glow = 0, dim = 0 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {glow > 0 && <rect x={-w / 2 - 14} y={-64} width={w + 28} height={128} rx={30} fill={P.gold} opacity={0.4 * glow} />}
    <rect x={-w / 2} y={-50} width={w} height={100} rx={22} fill={color} />
    <rect x={-w / 2} y={30} width={w} height={20} rx={10} fill="#000" opacity={0.15} />
    {icon && <Prop id={icon} x={-w / 2 + 70} y={0} size={80} f={f} />}
    <text x={icon ? -w / 2 + 130 : 0} y={20} textAnchor={icon ? 'start' : 'middle'} fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"', letterSpacing: 3 }}>{name}</text>
    {dim > 0 && <rect x={-w / 2} y={-50} width={w} height={100} rx={22} fill="#0E1B33" opacity={0.55 * dim} />}
  </g>
)
// # a vertical money column growing up from baseline y: value on top, label below
export const Col: React.FC<{ x: number; y: number; h: number; w?: number; color: string; value?: string; label?: string; o?: number; vo?: number }> = ({ x, y, h, w = 170, color, value, label, o = 1, vo = 1 }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={y - Math.max(0, h)} width={w} height={Math.max(0, h)} rx={14} fill={color} />
    {value && <Label x={x} y={y - Math.max(0, h) - 22} text={value} size={64} font="Bebas Neue" color={P.ink} o={vo} />}
    {label && <Label x={x} y={y + 58} text={label} size={48} font="Bebas Neue" color={P.ink2} />}
  </g>
)
// # a coin pile of `n` coins
export const Pile: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k} transform={`translate(${(k % 3) * 70 - 70} ${-Math.floor(k / 3) * 22})`}><ellipse cx={0} cy={6} rx={34} ry={12} fill={P.goldD} /><ellipse cx={0} cy={0} rx={34} ry={12} fill={P.gold} /></g>)}
  </g>
)
// # every $100 of sales split into kept (mint) and costs (coral); t grows the kept part in
export const Split: React.FC<{ x: number; y: number; kept: number; t: number; w?: number; keptText: string; costText: string; o?: number; ct?: number }> = ({ x, y, kept, t, w = 900, keptText, costText, o = 1, ct = 1 }) => {
  const kw = w * kept / 100 * t
  return <g opacity={o}>
    <rect x={x} y={y} width={w} height={110} rx={20} fill={P.coral} opacity={0.85} />
    <rect x={x} y={y} width={kw} height={110} rx={20} fill={P.mint} />
    <Label x={x + Math.max(kw, 200) / 2} y={y + 74} text={keptText} size={60} font="Bebas Neue" color="#0E1B33" o={t} />
    <Label x={x + kw + (w - kw) / 2} y={y + 74} text={costText} size={52} font="Bebas Neue" color="#FFFFFF" o={ct * t} />
  </g>
}
export { Calendar, Label }
