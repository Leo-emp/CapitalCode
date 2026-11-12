// ============================================================
// LONG VIDEO — "The Rich Don't Sell. They Borrow." — objects for this
// story (share certificates, the tax office, the loan, price tags,
// paychecks). The shared cast, headline, camera and money helpers come
// from ../aimoney/common. One file per scene in this folder.
// House rules (owner r22/r26/r27/r36/r37): every picture lands ON its word;
// one picture group at a time; text is short labels only.
// ============================================================
import React from 'react'
import { lerp, on, P, pop, span } from '../kit'
import { Label } from '../charts'

// # pop a child in on its cue (fade + springy scale), at x/y
export const At: React.FC<{ f: number; at: number; x: number; y: number; s?: number; o?: number; r?: number; children: React.ReactNode }> = ({ f, at, x, y, s = 1, o = 1, r = 0, children }) => {
  const t = on(f, at, 6) * o
  return t > 0.001 ? <g opacity={t} transform={`translate(${x} ${y}) rotate(${r}) scale(${pop(f, at) * s})`}>{children}</g> : null
}
// # a short label that appears on its word
export const Tag: React.FC<{ f: number; at: number; x: number; y: number; text: string; size?: number; color?: string; o?: number }> = ({ f, at, x, y, text, size = 56, color = P.ink, o = 1 }) =>
  <Label x={x} y={y} text={text} size={size} font="Bebas Neue" color={color} o={on(f, at, 6) * o} />

// # one share certificate: cream sheet, gold seal, a little rising chart line
export const Cert: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; tint?: string }> = ({ x, y, s = 1, r = 0, o = 1, tint = P.gold }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-80} width={240} height={160} rx={12} fill="#000" opacity={0.15} transform="translate(6 8)" />
    <rect x={-120} y={-80} width={240} height={160} rx={12} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={4} />
    <rect x={-104} y={-64} width={208} height={128} rx={8} fill="none" stroke="#D9C79A" strokeWidth={3} />
    <path d="M-80 30 L-40 0 L0 14 L40 -26 L80 -40" fill="none" stroke="#3DA672" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={70} cy={40} r={22} fill={tint} /><circle cx={70} cy={40} r={13} fill="none" stroke={P.goldD} strokeWidth={3} />
    <rect x={-84} y={-50} width={110} height={12} rx={6} fill="#C9B27A" />
  </g>
)
// # a stack of `n` certificates (bottom up); `basis` of them (from the bottom) drawn blue = what was paid
export const Stack: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; basis?: number; gap?: number }> = ({ x, y, n, s = 1, o = 1, basis = 0, gap = 26 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={10} rx={150} ry={20} fill="#000" opacity={0.15} />
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k} transform={`translate(${(k % 2) * 6 - 3} ${-k * gap - 40})`}>
      <rect x={-125} y={-22} width={250} height={44} rx={8} fill={k < basis ? '#7FB2E5' : '#F7F1E1'} stroke={k < basis ? '#3A6EA8' : '#C9B27A'} strokeWidth={3} />
      <rect x={-100} y={-6} width={120} height={10} rx={5} fill={k < basis ? '#3A6EA8' : '#D9C79A'} /><circle cx={92} cy={0} r={11} fill={P.gold} />
    </g>)}
  </g>
)
// # the tax office: a columned building with a TAX pediment; `eat` 0–1 opens its door (money going in)
export const TaxOffice: React.FC<{ x: number; y: number; s?: number; o?: number; eat?: number; shut?: number }> = ({ x, y, s = 1, o = 1, eat = 0, shut = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={240} ry={18} fill="#000" opacity={0.15} />
    <rect x={-220} y={-30} width={440} height={30} rx={4} fill="#C9CFD9" />
    {[-160, -80, 80, 160].map((cx) => <rect key={cx} x={cx - 18} y={-230} width={36} height={200} fill="#E4E8EE" />)}
    <rect x={-50} y={-170} width={100} height={140} rx={50 * (1 - eat)} fill={lerp(0, 1, eat) > 0.5 ? '#1B2233' : '#5C6F8E'} />
    <path d="M-240 -230 L0 -320 L240 -230 Z" fill="#D9DEE6" /><rect x={-230} y={-250} width={460} height={24} fill="#C9CFD9" />
    <text x={0} y={-262} textAnchor="middle" fill="#3A4A66" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 6 }}>TAX</text>
    {shut > 0 && <g opacity={shut}><rect x={-70} y={-120} width={140} height={60} rx={10} fill={P.coral} /><text x={0} y={-76} textAnchor="middle" fill="#FFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>$0</text></g>}
  </g>
)
// # a tax bill with a big amount (e.g. "$0") and a year on top
export const TaxBill: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; year?: string; amount?: string; ao?: number }> = ({ x, y, s = 1, r = 0, o = 1, year, amount, ao = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-140} y={-180} width={280} height={360} rx={16} fill="#000" opacity={0.16} transform="translate(8 10)" />
    <rect x={-140} y={-180} width={280} height={360} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <rect x={-140} y={-180} width={280} height={70} rx={16} fill={P.navy2} /><rect x={-140} y={-130} width={280} height={20} fill={P.navy2} />
    {year && <text x={0} y={-128} textAnchor="middle" fill="#FFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>{year}</text>}
    {[0, 1, 2].map((k) => <rect key={k} x={-100} y={-80 + k * 34} width={200 - k * 40} height={12} rx={6} fill="#C8B994" />)}
    {amount && <text x={0} y={140} textAnchor="middle" fill={P.coral} opacity={ao} style={{ font: '400 120px "Bebas Neue"' }}>{amount}</text>}
  </g>
)
// # a paycheck; `cut` 0–1 slides the tax slice (right end, coral) off to the right
export const Paycheck: React.FC<{ x: number; y: number; s?: number; o?: number; amount?: string; cut?: number; slice?: string }> = ({ x, y, s = 1, o = 1, amount, cut = 0, slice }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-230} y={-90} width={400} height={180} rx={14} fill="#000" opacity={0.15} transform="translate(6 8)" />
    <rect x={-230} y={-90} width={400} height={180} rx={14} fill="#DDEFD9" stroke="#5E9E62" strokeWidth={4} />
    <text x={-200} y={-40} fill="#2F6A36" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>PAYCHECK</text>
    {amount && <text x={-200} y={40} fill="#1F4A26" style={{ font: '400 70px "Bebas Neue"' }}>{amount}</text>}
    <g transform={`translate(${cut * 160} ${-cut * 40}) rotate(${cut * 8})`} opacity={1 - Math.max(0, (cut - 0.75) * 4)}>
      <rect x={170} y={-90} width={80} height={180} rx={10} fill={P.coral} stroke={P.coralD} strokeWidth={4} />
      {slice && <text x={210} y={14} textAnchor="middle" fill="#FFF" style={{ font: '400 40px "Bebas Neue"' }}>{slice}</text>}
    </g>
  </g>
)
// # a price tag that flips from `a` to `b` as t goes 0→1
export const FlipTag: React.FC<{ x: number; y: number; s?: number; o?: number; a: string; b: string; t: number; color?: string }> = ({ x, y, s = 1, o = 1, a, b, t, color = P.gold }) => {
  const sx = Math.abs(Math.cos(t * Math.PI)), txt = t < 0.5 ? a : b
  return <g transform={`translate(${x} ${y}) scale(${s * Math.max(0.05, sx)} ${s})`} opacity={o}>
    <path d="M-150 -60 L110 -60 L160 0 L110 60 L-150 60 Z" fill={color} stroke={P.goldD} strokeWidth={4} /><circle cx={112} cy={0} r={12} fill={P.navy0} />
    <text x={-30} y={26} textAnchor="middle" fill={P.navy0} style={{ font: '400 76px "Bebas Neue"' }}>{txt}</text>
  </g>
}
// # a chain from a to b (links), drawn to t of its length
export const Chain: React.FC<{ a: [number, number]; b: [number, number]; t?: number; o?: number }> = ({ a, b, t = 1, o = 1 }) => {
  const n = 9, ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
  return <g opacity={o}>{Array.from({ length: n }, (_, k) => { const u = k / (n - 1); if (u > t) return null
    return <ellipse key={k} cx={lerp(a[0], b[0], u)} cy={lerp(a[1], b[1], u)} rx={26} ry={13} fill="none" stroke="#A9B4C4" strokeWidth={8} transform={`rotate(${ang + (k % 2) * 90 * 0} ${lerp(a[0], b[0], u)} ${lerp(a[1], b[1], u)})`} /> })}</g>
}
// # a vertical bar that grows from the floor; value label rides on top
export const Bar: React.FC<{ x: number; y: number; h: number; w?: number; color: string; value?: string; vo?: number; label?: string; o?: number }> = ({ x, y, h, w = 180, color, value, vo = 1, label, o = 1 }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={y - Math.max(0, h)} width={w} height={Math.max(0, h)} rx={12} fill={color} />
    {value && <Label x={x} y={y - Math.max(0, h) - 22} text={value} size={60} font="Bebas Neue" color={P.ink} o={vo} />}
    {label && <Label x={x} y={y + 56} text={label} size={46} font="Bebas Neue" color={P.ink2} />}
  </g>
)
// # a balance scale: left/right pan loads (0–1) tip the beam
export const Scale: React.FC<{ x: number; y: number; s?: number; o?: number; l: number; r: number; children?: [React.ReactNode, React.ReactNode] }> = ({ x, y, s = 1, o = 1, l, r, children }) => {
  const tilt = Math.max(-14, Math.min(14, (l - r) * 14)), rad = (tilt * Math.PI) / 180
  const ly = Math.sin(rad) * 240, ry = -Math.sin(rad) * 240
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-14} y={-300} width={28} height={300} fill="#8A97AA" /><rect x={-110} y={-10} width={220} height={20} rx={10} fill="#5C6F8E" />
    <g transform={`rotate(${-tilt} 0 -300)`}><rect x={-260} y={-308} width={520} height={16} rx={8} fill="#A9B4C4" /></g>
    {[[-240, ly, 0], [240, ry, 1]].map(([px, py, i]) => <g key={i} transform={`translate(${px} ${-300 + py})`}>
      <path d="M0 0 L-70 120 M0 0 L70 120" stroke="#A9B4C4" strokeWidth={4} /><path d="M-100 120 Q0 170 100 120 Z" fill="#5C6F8E" />
      <g transform="translate(0 110)">{children?.[i]}</g></g>)}
  </g>
}
// # the small "EXAMPLE" sticker every illustrative number wears
export const Example: React.FC<{ f: number; at: number; x: number; y: number }> = ({ f, at, x, y }) => (
  <g opacity={on(f, at, 6)} transform={`translate(${x} ${y}) rotate(-6) scale(${pop(f, at)})`}>
    <rect x={-110} y={-32} width={220} height={64} rx={32} fill={P.sky} /><text x={0} y={16} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>EXAMPLE</text>
  </g>
)
// # a grow ramp 0→1 between two cues
export const grow = (f: number, a: number, b: number) => span(f, a, b)

// # small story objects that pop in on a spoken word and leave on another (keeps every 2 s of speech illustrated
// # without crowding: each one has its own clear spot and its own exit cue)
export type Acc = [cue: string, prop: string, x: number, y: number, size: number, until: string]
export const Accents: React.FC<{ f: number; c: (k: string) => number; list: Acc[]; Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> }> = ({ f, c, list, Prop }) => (
  <g>{list.map(([k, id, x, y, size, until], i) => {
    const a = c(k), b = c(until), o = on(f, a, 6) * (1 - on(f, b - 6, 6))
    return o > 0.001 ? <g key={i} opacity={o} transform={`translate(${x} ${y}) scale(${pop(f, a)})`}><Prop id={id} x={0} y={0} size={size} f={f} /></g> : null
  })}</g>
)
// # extra camera keys on spoken words: [cue, x, y, zoom]
export type XCam = [cue: string, x: number, y: number, z: number]
export const xcam = (c: (k: string) => number, l: XCam[]): [number, number, number, number][] => l.map(([k, x, y, z]) => [c(k), x, y, z])

// # a punch-in on every beat (owner's reference edits use punch zooms): the frame eases 2.5 % closer and back over
// # 14 frames when a beat lands, so each spoken event reads as a visible change, not only a small pop at one spot
export const punch = (f: number, beats: number[], cx = 1240, cy = 620, amt = 0.025, d = 14) => {
  let k = 0
  for (const b of beats) { const t = f - b; if (t >= 0 && t < d) k = Math.max(k, Math.sin((Math.PI * t) / d)) }
  const s = 1 + amt * k
  return `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`
}
