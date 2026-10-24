// ============================================================
// LAYOUT VIGNETTES — living film (spec §8): many small people at
// once (crowd on pedestals), split-screen grids that fill in panel
// by panel, and circles holding little worlds. Each step lands on
// its cue word, like every vignette.
// ============================================================
import React from 'react'
import { getProp, PROPS } from '../props/registry'
import { CAST } from '../rig/Actor'
import { Mini, MINI_HEIGHT } from '../rig/Mini'
import { getScene, SCENES } from '../scenes/registry'
import { WORLDS } from '../tokens'
import { useUid } from '../uid'
import { Label, makeVignette, settle, type VignetteProps } from './kit'

const W = WORLDS.night

// ------------------------------------------------------------ crowd
// # Feet positions for n people (≤ 60): rows back-to-front, everyone inside 120..1800 × 200..980
export const crowdLayout = (n: number): { x: number; y: number; scale: number }[] => {
  const rows = n <= 6 ? 1 : n <= 16 ? 2 : n <= 36 ? 3 : 4
  const cols = Math.ceil(n / rows)
  const step = 1600 / cols
  const scale = Math.min(1.3, step / 130)
  const gap = rows > 1 ? Math.min(240 * scale, (940 - 202 - MINI_HEIGHT * scale) / (rows - 1)) : 0
  const out: { x: number; y: number; scale: number }[] = []
  for (let i = 0; i < n; i++) {
    // # fill from the back row so the front row is the fullest
    const r = Math.floor(i / cols), inRow = Math.min(cols, n - r * cols), c = i % cols
    // # perspective: each row further back is 8% smaller and drawn closer to the centre
    const k = 1 - 0.08 * (rows - 1 - r)
    out.push({ x: 960 + (c - (inRow - 1) / 2) * step * k, y: 940 - (rows - 1 - r) * gap, scale: scale * k })
  }
  return out
}

// # A round pedestal with a coin stack sized to this person's share
const Pedestal: React.FC<{ x: number; y: number; s: number; coins: number }> = ({ x, y, s, coins }) => (
  <g>
    <ellipse cx={x} cy={y + 8 * s} rx={62 * s} ry={16 * s} fill={W.bodyShade} />
    <ellipse cx={x} cy={y} rx={58 * s} ry={14 * s} fill={W.body} />
    {/* # coin stack as two shapes (body + lit top), not one ellipse per coin — 60 stacks stay cheap */}
    <rect x={x + 50 * s} y={y - (coins - 1) * 9 * s} width={40 * s} height={(coins - 1) * 9 * s + 7 * s} fill="#C8962E" />
    <ellipse cx={x + 70 * s} cy={y - (coins - 1) * 9 * s} rx={20 * s} ry={7 * s} fill="#F2C35B" />
  </g>
)

type Person = { look: string; share: number; label?: string }
const Crowd: React.FC<VignetteProps> = ({ frame, data, cues }) => {
  const people: Person[] = data.people
  const spots = crowdLayout(people.length)
  const steps = Math.min(6, people.length)
  const max = Math.max(...people.map((p) => p.share))
  // # one spring per group, not per person (a spring is simulated frame by frame — 60 of them cost 200 ms)
  const pops = Array.from({ length: steps }, (_, g) => settle(frame, cues[g], true))
  return (
    <g>
      {people.map((p, i) => {
        const s = spots[i], pop = pops[Math.floor((i * steps) / people.length)]
        if (pop <= 0.001) return null
        const coins = Math.max(1, Math.round((p.share / max) * 10))
        return (
          <g key={i} opacity={Math.min(1, pop * 2)} transform={`translate(${s.x} ${s.y}) scale(${pop}) translate(${-s.x} ${-s.y})`}>
            <Pedestal x={s.x} y={s.y} s={s.scale} coins={coins} />
            <Mini look={p.look} x={s.x} y={s.y} scale={s.scale} frame={frame} seed={i * 3 + 1} mood={p.share === max ? 'happy' : 'neutral'} />
            {p.label && people.length <= 8 && <Label x={s.x} y={s.y + 62 * s.scale} size={32}>{p.label}</Label>}
          </g>
        )
      })}
    </g>
  )
}

// ------------------------------------------------------------ grid + circles: little worlds side by side
type Item = { prop?: string; scene?: string; label?: string }
const itemProblem = (it: Item): string | null => {
  if (!it?.prop && !it?.scene) return 'each item needs a prop or a scene'
  if (it.prop && !PROPS.some((p) => p.id === it.prop)) return `unknown prop "${it.prop}"`
  if (it.scene && !SCENES.some((s) => s.id === it.scene)) return `unknown scene "${it.scene}"`
  return null
}

// # The content of one panel/circle, fitted to a box (scenes cover it, props sit centred)
const Content: React.FC<{ it: Item; x: number; y: number; w: number; h: number; frame: number }> = ({ it, x, y, w, h, frame }) => {
  if (it.scene) {
    const S = getScene(it.scene).Component, k = Math.max(w / 1920, h / 1080)
    return <g transform={`translate(${x + (w - 1920 * k) / 2} ${y + (h - 1080 * k) / 2}) scale(${k})`}><S frame={frame} /></g>
  }
  const P = getProp(it.prop!).Component, size = Math.min(w, h) * 0.7
  return <P size={size} x={x + (w - size) / 2} y={y + (h - size) / 2} frame={frame} />
}

const gridBoxes = (n: number) => {
  const cols = n === 4 ? 2 : 3, rows = 2, gap = 30
  const pw = (1680 - gap * (cols - 1)) / cols, ph = (800 - gap) / 2
  return Array.from({ length: n }, (_, i) => {
    const r = Math.floor(i / cols), inRow = Math.min(cols, n - r * cols), c = i % cols
    const off = (1680 - (inRow * pw + (inRow - 1) * gap)) / 2
    return { x: 120 + off + c * (pw + gap), y: 160 + r * (ph + gap), w: pw, h: ph }
  })
}

const Grid: React.FC<VignetteProps> = ({ frame, data, cues }) => {
  const id = useUid('grid')
  const items: Item[] = data.panels
  return (
    <g>
      {gridBoxes(items.length).map((b, i) => {
        const pop = settle(frame, cues[i], true)
        if (pop <= 0.001) return null
        const cx = b.x + b.w / 2, cy = b.y + b.h / 2
        return (
          <g key={i} opacity={Math.min(1, pop * 2)} transform={`translate(${cx} ${cy}) scale(${0.85 + 0.15 * pop}) translate(${-cx} ${-cy})`}>
            <defs><clipPath id={`${id}-${i}`}><rect x={b.x} y={b.y} width={b.w} height={b.h} rx={22} /></clipPath></defs>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={22} fill={W.wall} />
            <g clipPath={`url(#${id}-${i})`}><Content it={items[i]} x={b.x} y={b.y} w={b.w} h={b.h - (items[i].label ? 64 : 0)} frame={frame} /></g>
            {items[i].label && <><rect x={b.x} y={b.y + b.h - 64} width={b.w} height={64} fill={W.shadow} opacity={0.85} clipPath={`url(#${id}-${i})`} />
              <Label x={cx} y={b.y + b.h - 20} size={36}>{items[i].label}</Label></>}
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={22} fill="none" stroke={W.solidShade} strokeWidth={4} />
          </g>
        )
      })}
    </g>
  )
}

const Circles: React.FC<VignetteProps> = ({ frame, data, cues }) => {
  const id = useUid('circ')
  const items: Item[] = data.items
  const n = items.length, r = Math.min(230, 1600 / n / 2 - 24)
  return (
    <g>
      {items.map((it, i) => {
        const pop = settle(frame, cues[i], true)
        if (pop <= 0.001) return null
        const cx = 960 + (i - (n - 1) / 2) * (1600 / n), cy = 500
        return (
          <g key={i} opacity={Math.min(1, pop * 2)} transform={`translate(${cx} ${cy}) scale(${pop}) translate(${-cx} ${-cy})`}>
            <defs><clipPath id={`${id}-${i}`}><circle cx={cx} cy={cy} r={r} /></clipPath></defs>
            <circle cx={cx} cy={cy + 12} r={r} fill={W.shadow} opacity={0.5} />
            <circle cx={cx} cy={cy} r={r} fill={W.wall} />
            <g clipPath={`url(#${id}-${i})`}><Content it={it} x={cx - r} y={cy - r} w={r * 2} h={r * 2} frame={frame} /></g>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={W.solid} strokeWidth={6} />
            {it.label && <Label x={cx} y={cy + r + 64} size={36}>{it.label}</Label>}
          </g>
        )
      })}
    </g>
  )
}

export const LAYOUT_VIGNETTES = [
  makeVignette('crowd', 'A crowd of small people on pedestals, coin stacks by share', ['crowd', 'people', 'investors', 'share', 'concentration', 'many'], {
    hint: '{ people: { look: cast id, share: number, label?: string }[] (1–60) } — cues: up to 6, the crowd fills in group by group',
    items: (d) => Math.min(6, d?.people?.length ?? 1),
    check: (d) => {
      if (!Array.isArray(d?.people) || !d.people.length) return 'needs a "people" list with at least 1 person'
      if (d.people.length > 60) return 'at most 60 people'
      const bad = d.people.find((p: Person) => !CAST.includes(p?.look))
      if (bad) return `unknown look "${bad?.look}" (cast: ${CAST.join(', ')})`
      return d.people.every((p: Person) => typeof p.share === 'number' && p.share > 0) ? null : 'every person needs a share > 0'
    },
    Component: Crowd,
  }),
  makeVignette('grid', 'Split screen: 4–6 panels filling in one by one', ['compare', 'many', 'examples', 'split', 'list'], {
    hint: '{ panels: { prop?: id, scene?: id, label: string }[] (4–6) } — cues: one per panel',
    items: (d) => d?.panels?.length ?? 4,
    check: (d) => (!Array.isArray(d?.panels) || d.panels.length < 4 || d.panels.length > 6 ? 'needs 4–6 panels' : d.panels.map(itemProblem).find(Boolean) ?? null),
    Component: Grid,
  }),
  makeVignette('circles', 'Little worlds in circles, side by side', ['compare', 'examples', 'options', 'worlds'], {
    hint: '{ items: { prop?: id, scene?: id, label?: string }[] (3–5) } — cues: one per circle',
    items: (d) => d?.items?.length ?? 3,
    check: (d) => (!Array.isArray(d?.items) || d.items.length < 3 || d.items.length > 5 ? 'needs 3–5 items' : d.items.map(itemProblem).find(Boolean) ?? null),
    Component: Circles,
  }),
]

