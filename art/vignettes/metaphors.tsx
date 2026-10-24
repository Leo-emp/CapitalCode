// ============================================================
// METAPHORS — money ideas as little animated pictures (living film
// spec §8), the set the index-fund remake needs. Data-driven and
// cue-stepped like every vignette; flat night-world colours; the
// mini cast plays the people.
// ============================================================
import React from 'react'
import { interpolate } from 'remotion'
import { CAST } from '../rig/Actor'
import { Mini } from '../rig/Mini'
import { COLORS, WORLDS } from '../tokens'
import { clamp, hash01, Label, makeVignette, num, ramp, settle, type VignetteProps } from './kit'

const W = WORLDS.night
const GOLD = '#F2C35B', GOLD_D = '#C8962E'
const Ground: React.FC<{ y?: number }> = ({ y = 900 }) => <rect x={0} y={y} width={1920} height={1080 - y} fill={W.floor} />

// ------------------------------------------------------------ crowd vs giant (concentration)
const CrowdGiant: React.FC<VignetteProps> = ({ frame, data, cues }) => {
  const [c0, c1, c2] = cues
  const n: number = data.crowd
  const crowdIn = settle(frame, c0), rise = settle(frame, c1), look = ramp(frame, c2, 12)
  const g = 1 + 2.6 * rise
  return (
    <g>
      <Ground />
      {Array.from({ length: n }, (_, i) => {
        const col = i % 10, row = Math.floor(i / 10)
        const x = 170 + col * 100 + (row % 2) * 50, y = 900 - row * 70
        return <g key={i} opacity={crowdIn}><Mini look={CAST[i % CAST.length]} x={x} y={y + (1 - crowdIn) * 40} scale={0.85 - row * 0.08} frame={frame} seed={i + 2} mood={look > 0.5 ? 'sad' : 'neutral'} /></g>
      })}
      {rise > 0.001 && <Mini look={data.giant} x={1500} y={900} scale={g} frame={frame} seed={99} mood="happy" />}
      {data.label && rise > 0.3 && <Label x={1500} y={Math.max(70, 900 - 200 * g - 50)} size={46} color={COLORS.champagneLight} opacity={Math.min(1, (rise - 0.3) * 2)}>{data.label}</Label>}
    </g>
  )
}

// ------------------------------------------------------------ one slice of the pie growing
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => [cx + r * Math.sin(a), cy - r * Math.cos(a)]
  const [x0, y0] = p(a0), [x1, y1] = p(a1)
  return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1} Z`
}
const SliceGrows: React.FC<VignetteProps> = ({ frame, data, cues }) => {
  const appear = settle(frame, cues[0]), grow = ramp(frame, cues[1], 30)
  const v = data.from + (data.to - data.from) * (grow * grow * (3 - 2 * grow))
  const a = (Math.min(99.9, v) / 100) * Math.PI * 2
  return (
    <g opacity={appear} transform={`translate(760 560) scale(${0.8 + 0.2 * appear}) translate(-760 -560)`}>
      <circle cx={760} cy={572} r={330} fill={W.shadow} opacity={0.6} />
      <path d={arc(760, 560, 330, a, Math.PI * 2 - 0.0001)} fill={W.body} />
      <path d={arc(760, 560, 330, 0, Math.max(0.001, a))} fill={GOLD} />
      <Label x={1340} y={470} size={56} anchor="start" color={COLORS.champagneLight}>{data.name}</Label>
      <text x={1340} y={600} fill={GOLD} style={{ font: '700 110px "Bebas Neue"' }}>{`${v.toFixed(v < 10 ? 1 : 0)}%`}</text>
    </g>
  )
}

// ------------------------------------------------------------ 30 years vs 5 years: only the long road recovers
const trackPath = (x0: number, w: number, y: number, len: number) => {
  // # rises, dips hard at 40%, recovers above the start only past 70%
  const pts = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40
    const v = 0.35 * t - 0.45 * Math.exp(-((t - 0.4) ** 2) / 0.006) + (t > 0.4 ? 0.55 * (t - 0.4) : 0)
    return [x0 + t * w, y - v * 260] as const
  }).filter(([x]) => x <= x0 + len * w + 0.01)
  return pts.map(([x, yy], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${yy.toFixed(1)}`).join(' ')
}
const Tracks: React.FC<VignetteProps> = ({ frame, data, cues }) => {
  const base = settle(frame, cues[0])
  const shortRun = ramp(frame, cues[1], 40), longRun = ramp(frame, cues[2], 70)
  // # the short road runs the same market but stops at the bottom of the crash (it never gets the recovery)
  const shortLen = 0.42 * shortRun, longLen = longRun
  return (
    <g opacity={base}>
      {[{ y: 420, len: longLen, d: data.long, c: COLORS.green }, { y: 860, len: shortLen, d: data.short, c: COLORS.red }].map((r, i) => (
        <g key={i}>
          <rect x={300} y={r.y - 4} width={1400} height={8} rx={4} fill={W.body} />
          <Label x={260} y={r.y + 12} size={40} anchor="end">{r.d.label}</Label>
          {r.len > 0 && <path d={trackPath(300, 1400, r.y, r.len)} stroke={r.c} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ))}
    </g>
  )
}

// ------------------------------------------------------------ house of cards (fragile)
const HouseOfCards: React.FC<VignetteProps> = ({ frame, data, cues }) => {
  const build = ramp(frame, cues[0], 24), shake = cues[1] !== undefined && frame >= cues[1] ? Math.sin((frame - cues[1]) * 0.9) * 2 * Math.min(1, (frame - cues[1]) / 10) : 0
  const fall = data.collapse ? ramp(frame, cues[2], 26) : 0
  const levels = 4, cards: React.ReactNode[] = []
  let k = 0
  for (let l = 0; l < levels; l++) {
    const n = levels - l
    for (let i = 0; i < n; i++) {
      const show = build * (levels * 2) > k++ ? 1 : 0
      const cx = 960 + (i - (n - 1) / 2) * 170, base = 880 - l * 170
      const drop = fall * (base - 880 + 170) * -1, spin = fall * (hash01(k) - 0.5) * 140
      cards.push(
        <g key={`${l}-${i}`} opacity={show} transform={`translate(${(hash01(k, 2) - 0.5) * 200 * fall} ${drop + fall * 40}) rotate(${spin + shake} ${cx} ${base})`}>
          <path d={`M${cx - 70} ${base} L${cx - 10} ${base - 160} L${cx} ${base - 160} L${cx - 58} ${base} Z`} fill={W.solid} stroke={W.solidShade} strokeWidth={3} />
          <path d={`M${cx + 70} ${base} L${cx + 10} ${base - 160} L${cx} ${base - 160} L${cx + 58} ${base} Z`} fill={W.solidShade} />
          {l < levels - 1 && i < n - 1 && <rect x={cx + 10} y={base - 168} width={150} height={10} fill={W.solid} />}
        </g>,
      )
    }
  }
  return <g><Ground y={880} />{cards}{data.label && <Label x={960} y={150} size={52} color={COLORS.champagneLight} opacity={ramp(frame, cues[1], 10)}>{data.label}</Label>}</g>
}

// ------------------------------------------------------------ money mountain (grows, may burn)
const MoneyMountain: React.FC<VignetteProps> = ({ frame, data, cues }) => {
  const grow = settle(frame, cues[0]), pour = ramp(frame, cues[1], 30), burn = data.burn ? ramp(frame, cues[2], 40) : 0
  const h = 520 * grow * (1 - 0.7 * burn)
  const coins = Array.from({ length: 14 }, (_, i) => {
    const t = ((frame - (cues[1] ?? 0)) / 30 + i / 14) % 1
    return { x: 960 + (hash01(i) - 0.5) * 200, y: 120 + t * (880 - h - 120), o: pour * (1 - burn) }
  })
  return (
    <g>
      <Ground />
      <path d={`M${960 - h * 1.3} 900 Q${960 - h * 0.4} ${900 - h * 0.9} 960 ${900 - h} Q${960 + h * 0.4} ${900 - h * 0.9} ${960 + h * 1.3} 900 Z`} fill={GOLD} />
      <path d={`M960 ${900 - h} Q${960 + h * 0.4} ${900 - h * 0.9} ${960 + h * 1.3} 900 L960 900 Z`} fill={GOLD_D} opacity={0.6} />
      {coins.map((c, i) => <ellipse key={i} cx={c.x} cy={c.y} rx={20} ry={8} fill={GOLD} opacity={c.o} />)}
      {burn > 0 && Array.from({ length: 9 }, (_, i) => {
        const x = 960 + (i - 4) * h * 0.25, fl = 60 + 40 * Math.abs(Math.sin(frame / 4 + i))
        return <path key={i} d={`M${x - 26} ${900 - h * 0.3} Q${x} ${900 - h * 0.3 - fl * 2} ${x + 26} ${900 - h * 0.3} Z`} fill={i % 2 ? '#F06B5B' : '#FFB04A'} opacity={Math.min(1, burn * 2) * (1 - burn * 0.5)} />
      })}
      {data.label && h > 120 && <Label x={960} y={900 - h * 0.3} size={52} color="#3A2606" opacity={grow}>{data.label}</Label>}
    </g>
  )
}

// ------------------------------------------------------------ see-saw (which side is heavier)
const SeeSaw: React.FC<VignetteProps> = ({ frame, data, cues }) => {
  const board = settle(frame, cues[0]), lw = settle(frame, cues[1]), rw = settle(frame, cues[2])
  const L = data.left.value * lw, R = data.right.value * rw
  const tilt = interpolate(L - R, [-Math.max(1, data.right.value), Math.max(1, data.left.value)], [-14, 14], clamp)
  const side = (s: -1 | 1, d: { label: string; value: number }, w: number) => (
    <g transform={`translate(${960 + s * 560} 640)`} opacity={w}>
      <Mini look={s < 0 ? 'hero' : 'investor'} x={s * 60} y={22} scale={1.7} frame={frame} seed={s + 5} mood={(s < 0 ? L >= R : R >= L) ? 'neutral' : 'happy'} />
      {/* # the weight: a coin stack as tall as the value */}
      {(() => { const hh = 40 + 160 * Math.min(1, d.value / Math.max(data.left.value, data.right.value)); return <g><rect x={s * -150 - 50} y={-14 - hh} width={100} height={hh} fill={GOLD_D} /><ellipse cx={s * -150} cy={-14 - hh} rx={50} ry={16} fill={GOLD} /></g> })()}
    </g>
  )
  return (
    <g opacity={board}>
      <Ground y={820} />
      <path d="M900 820 L960 690 L1020 820 Z" fill={W.solidShade} />
      <g transform={`rotate(${-tilt} 960 680)`}>
        <rect x={340} y={660} width={1240} height={26} rx={13} fill={W.solid} />
        {side(-1, data.left, lw)}{side(1, data.right, rw)}
      </g>
      <Label x={400} y={960} size={40} opacity={lw}>{data.left.label}</Label>
      <Label x={1520} y={960} size={40} opacity={rw}>{data.right.label}</Label>
    </g>
  )
}

const bool = (d: any, k: string) => (d?.[k] === undefined || typeof d[k] === 'boolean' ? null : `${k} must be true or false`)

export const METAPHOR_VIGNETTES = [
  makeVignette('crowd-giant', 'A small crowd and one giant (concentration)', ['concentration', 'giant', 'crowd', 'power', 'big-tech'], {
    hint: '{ giant: cast id, crowd: 5–40, label?: string } — cues: crowd, giant rises, crowd looks up',
    items: () => 3,
    check: (d) => (!CAST.includes(d?.giant) ? `unknown giant look "${d?.giant}" (cast: ${CAST.join(', ')})` : !num(d?.crowd) || d.crowd < 5 || d.crowd > 40 ? 'crowd must be a number 5–40' : null),
    Component: CrowdGiant,
  }),
  makeVignette('slice-grows', "One company's slice of the pie growing", ['share', 'weight', 'growth', 'concentration', 'index'], {
    hint: '{ name: string, from: %, to: % } — cues: pie, slice grows',
    items: () => 2,
    check: (d) => (!d?.name ? 'needs a name' : [d?.from, d?.to].every((v) => num(v) && v > 0 && v < 100) ? null : 'from and to must be between 0 and 100'),
    Component: SliceGrows,
  }),
  makeVignette('tracks', 'Long road vs short road through the same crash', ['time', 'horizon', 'crash', 'patience', 'recovery'], {
    hint: '{ long: { label, years }, short: { label, years } } — cues: roads, short run, long run',
    items: () => 3,
    check: (d) => (!d?.long?.label || !d?.short?.label || !num(d?.long?.years) || !num(d?.short?.years) ? 'needs long and short, each with label and years' : d.long.years <= d.short.years ? 'the long road must be longer than the short one' : null),
    Component: Tracks,
  }),
  makeVignette('house-of-cards', 'A house of cards (fragile, may collapse)', ['fragile', 'risk', 'leverage', 'bubble', 'collapse'], {
    hint: '{ label?: string, collapse?: boolean } — cues: build, wobble (+ collapse)',
    items: (d) => (d?.collapse ? 3 : 2),
    check: (d) => bool(d, 'collapse'),
    Component: HouseOfCards,
  }),
  makeVignette('money-mountain', 'A mountain of money (grows, may burn)', ['wealth', 'growth', 'loss', 'money', 'pile'], {
    hint: '{ label?: string, burn?: boolean } — cues: grows, coins pour (+ burns)',
    items: (d) => (d?.burn ? 3 : 2),
    check: (d) => bool(d, 'burn'),
    Component: MoneyMountain,
  }),
  makeVignette('see-saw', 'A see-saw tipping to the heavier side', ['compare', 'balance', 'tradeoff', 'weight'], {
    hint: '{ left: { label, value }, right: { label, value } } — cues: board, left weight, right weight',
    items: () => 3,
    check: (d) => (d?.left?.label && num(d?.left?.value) && d?.right?.label && num(d?.right?.value) ? null : 'needs left and right, each with label and numeric value'),
    Component: SeeSaw,
  }),
]
