// ============================================================
// STORY VIGNETTES — things that happen over time:
//   bubble       swells with names inside, then (optionally) pops
//   leaderboard  a ranking reshuffles: old leaders slide out, new rise in
//   lottery      many tickets, most lose, a few win big
// ============================================================
import React from 'react'
import { interpolate } from 'remotion'
import { COLORS, WORLDS } from '../tokens'
import { clamp, Glow, hash01, Label, list, makeVignette, num, ramp, settle } from './kit'

// ---------------------------------------------------------------- bubble
// # data: { label, items?: string[] (≤ 5), pop?: boolean } — steps: appear, swell (+ items), pop
const Bubble: React.FC<{ frame: number; data: any; cues: number[] }> = ({ frame, data, cues }) => {
  const items = (data.items ?? []) as string[]
  const appear = settle(frame, cues[0])
  const swell = settle(frame, cues[1])
  const pop = data.pop ? ramp(frame, cues[2], 14) : 0
  const cx = 960, cy = 590
  const wobble = 1 + 0.015 * Math.sin(frame / 5)
  const r = (80 + 220 * swell) * appear * wobble * (1 + 0.25 * pop)
  return (
    <g>
      <Glow id="bb-g" x={cx} y={cy} r={r * 1.6 + 1} opacity={0.3 * (1 - pop)} />
      {pop < 1 && (
        <g opacity={1 - pop}>
          <circle cx={cx} cy={cy} r={r} fill={COLORS.blue} fillOpacity={0.1} stroke={COLORS.blueLight} strokeWidth={4} />
          <ellipse cx={cx + r * 0.55} cy={cy + r * 0.45} rx={r * 0.16} ry={r * 0.07} fill="#fff" opacity={0.25} transform={`rotate(-45 ${cx + r * 0.55} ${cy + r * 0.45})`} />
          <Label x={cx} y={cy - r * 0.5 + 20} size={50} weight={800} color={COLORS.champagneLight} opacity={swell}>{data.label}</Label>
          {data.value && <Label x={cx} y={cy + 30} size={84} weight={800} color={COLORS.champagneLight} opacity={swell}>{data.value}</Label>}
        </g>
      )}
      {/* # names float inside; when it pops they fall and turn red */}
      {items.map((it, i) => {
        const a = (i / Math.max(1, items.length)) * Math.PI * 2 + 0.6
        const s = settle(frame, (cues[1] ?? 0) + 6 + i * 5)
        const fall = pop * 120
        const x = cx + Math.cos(a) * r * 0.55, y = cy + (data.value ? 150 : 40) + Math.sin(a) * r * 0.12 + fall
        return <Label key={i} x={x} y={y} size={40} color={pop > 0.3 ? COLORS.red : COLORS.text} opacity={s * (1 - pop)}>{it}</Label>
      })}
      {/* # the pop: a ring and shards flying out */}
      {pop > 0 && pop < 1 && (
        <g>
          <circle cx={cx} cy={cy} r={r * (1 + pop)} fill="none" stroke={COLORS.champagneLight} strokeWidth={6 * (1 - pop)} opacity={1 - pop} />
          {Array.from({ length: 14 }, (_, k) => {
            const ang = (k / 14) * Math.PI * 2 + hash01(k) * 0.3, d = r * (0.9 + pop * 1.1)
            return <line key={k} x1={cx + Math.cos(ang) * d} y1={cy + Math.sin(ang) * d} x2={cx + Math.cos(ang) * (d + 40)} y2={cy + Math.sin(ang) * (d + 40)} stroke={COLORS.blueLight} strokeWidth={5} opacity={1 - pop} />
          })}
        </g>
      )}
    </g>
  )
}

// ---------------------------------------------------------------- leaderboard
// # data: { title?, before: string[], after: string[] } (≤ 8 each) — steps: old ranking, reshuffle
const ROW = 66
const Leaderboard: React.FC<{ frame: number; data: any; cues: number[] }> = ({ frame, data, cues }) => {
  const before = data.before as string[], after = data.after as string[]
  const show = settle(frame, cues[0])
  const t = interpolate(frame, [cues[1] ?? Infinity, (cues[1] ?? Infinity) + 36], [0, 1], { ...clamp })
  const ease = t * t * (3 - 2 * t)
  const names = [...new Set([...before, ...after])]
  const y0 = 250, x0 = 600, w = 720
  const n = Math.max(before.length, after.length)
  return (
    <g opacity={show}>
      <Glow id="lb-g" x={960} y={540} r={620} opacity={0.18} />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x0 - 110} y={y0 + i * ROW} width={w + 110} height={ROW - 12} rx={8} fill={WORLDS.night.wall} stroke={COLORS.lineDim} strokeWidth={2} />
          <Label x={x0 - 55} y={y0 + i * ROW + 50} size={36} weight={800} color={COLORS.champagne}>{`${i + 1}`}</Label>
        </g>
      ))}
      {names.map((nm) => {
        const b = before.indexOf(nm), a = after.indexOf(nm)
        let y: number, x = x0 + 30, op = 1, col: string = COLORS.text
        if (b >= 0 && a >= 0) { y = interpolate(ease, [0, 1], [b, a]) * ROW + y0 + 50; col = a < b ? COLORS.green : a > b ? COLORS.red : COLORS.text }
        else if (b >= 0) { const k = Math.min(1, ease * 2); y = b * ROW + y0 + 50; x += k * 560; op = 1 - k; col = k > 0.05 ? COLORS.red : COLORS.text }
        else { const k = Math.max(0, ease * 2 - 1); y = y0 + a * ROW + 50; x += (1 - k) * 560; op = k; col = COLORS.green }
        // # a name in both rankings survived: gold, marked (e.g. "only Microsoft is still there")
        const survivor = b >= 0 && a >= 0
        return (
          <g key={nm} data-survivor={survivor ? nm : undefined}>
            {survivor && ease > 0.5 && <rect x={x0 - 110} y={y - 44} width={w + 110} height={ROW - 10} rx={8} fill="none" stroke={COLORS.champagne} strokeWidth={4} opacity={(ease - 0.5) * 2} />}
            <Label x={x} y={y} anchor="start" size={36} weight={survivor ? 800 : 700} color={survivor ? COLORS.champagneLight : col} opacity={op}>{nm}</Label>
          </g>
        )
      })}
      {data.title && <Label x={960} y={170} size={38} color={COLORS.dim}>{data.title}</Label>}
      {/* # which ranking is showing: the old year fades out as the new one fades in */}
      {data.fromLabel && <Label x={x0 + w + 40} y={y0 + 46} anchor="start" size={64} weight={800} color={COLORS.champagne} opacity={1 - ease}>{data.fromLabel}</Label>}
      {data.toLabel && <Label x={x0 + w + 40} y={y0 + 46} anchor="start" size={64} weight={800} color={COLORS.green} opacity={ease}>{data.toLabel}</Label>}
    </g>
  )
}

// ---------------------------------------------------------------- lottery
// # data: { tickets: number (≤ 60), winners: number, label? } — steps: tickets, most lose, winners glow
const Lottery: React.FC<{ frame: number; data: any; cues: number[] }> = ({ frame, data, cues }) => {
  const n = Math.min(60, data.tickets as number), wins = data.winners as number
  const cols = Math.min(12, n), rows = Math.ceil(n / cols)
  const tw = 112, th = 64, gx = 22, gy = 26
  const W = cols * tw + (cols - 1) * gx, Hh = rows * th + (rows - 1) * gy
  const ox = 960 - W / 2, oy = 500 - Hh / 2
  const winners = new Set(Array.from({ length: wins }, (_, k) => Math.floor(((k + 0.5) / wins) * n + hash01(k, 7) * (n / wins / 2)) % n))
  const lose = ramp(frame, cues[1], 30)
  const win = settle(frame, cues[2], true)
  return (
    <g>
      <Glow id="lo-g" x={960} y={500} r={700} color={COLORS.warm} opacity={0.12 + 0.2 * win} />
      {Array.from({ length: n }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols)
        const appear = settle(frame, (cues[0] ?? 0) + Math.floor(i / 3))
        const isWin = winners.has(i)
        const fade = isWin ? 0 : Math.min(1, Math.max(0, lose * 1.6 - hash01(i, 2) * 0.6))
        const s = isWin ? 1 + 0.18 * win : 1
        const x = ox + c * (tw + gx) + tw / 2, y = oy + r * (th + gy) + th / 2
        const col = isWin && win > 0.05 ? '#E2B85C' : fade > 0.5 ? '#4A5568' : COLORS.blueLight
        return (
          <g key={i} opacity={appear * (1 - fade * 0.5)} transform={`translate(${x} ${y}) scale(${s})`}>
            <rect x={-tw / 2} y={-th / 2} width={tw} height={th} rx={8} fill={isWin && win > 0.05 ? '#3A2C0C' : '#12233A'} stroke={col} strokeWidth={isWin && win > 0.05 ? 5 : 3} strokeDasharray={isWin ? undefined : '10 6'} />
            <circle cx={-tw / 2} cy={0} r={10} fill={WORLDS.night.shadow} />
            <circle cx={tw / 2} cy={0} r={10} fill={WORLDS.night.shadow} />
            <line x1={-tw / 2 + 22} x2={tw / 2 - 22} y1={-8} y2={-8} stroke={col} strokeWidth={4} opacity={0.6} />
            <line x1={-tw / 2 + 22} x2={tw / 2 - 40} y1={10} y2={10} stroke={col} strokeWidth={4} opacity={0.4} />
          </g>
        )
      })}
      {data.label && <Label x={960} y={oy + Hh + 100} size={44} weight={800} color={COLORS.champagneLight} opacity={win}>{data.label}</Label>}
    </g>
  )
}

// ---------------------------------------------------------------- loop
// # a wide oval: side nodes clear the centre label, top/bottom clear it vertically
export const LOOP = { cx: 960, cy: 580, rx: 470, ry: 250 }
export const loopPoint = (i: number, n: number) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; return { x: LOOP.cx + Math.cos(a) * LOOP.rx, y: LOOP.cy + Math.sin(a) * LOOP.ry, a } }
// # data: { steps: string[] (3–4), label? } — a cycle that feeds itself; one step lights per cue, then it spins
const Loop: React.FC<{ frame: number; data: any; cues: number[] }> = ({ frame, data, cues }) => {
  const steps = data.steps as string[]
  const n = steps.length, cx = LOOP.cx, cy = LOOP.cy, R = LOOP.ry
  const last = cues[n - 1] ?? Infinity
  const spin = frame > last ? ((frame - last) / 90) * Math.PI * 2 : 0
  const at = (i: number) => loopPoint(i, n)
  return (
    <g>
      <Glow id="lp-g" x={cx} y={cy} r={520} color={COLORS.warm} opacity={0.12 + (frame > last ? 0.12 : 0)} />
      <ellipse cx={cx} cy={cy} rx={LOOP.rx} ry={LOOP.ry} fill="none" stroke={COLORS.lineDim} strokeWidth={3} strokeDasharray="14 12" />
      {steps.map((_, i) => {
        // # arrow from step i to step i+1, drawn when step i+1 lights (the last one closes the loop)
        const on = settle(frame, cues[(i + 1) % n === 0 ? n - 1 : i + 1])
        const p = at(i), q = at(i + 1)
        const mid = (p.a + (q.a < p.a ? q.a + Math.PI * 2 : q.a)) / 2
        const mx = cx + Math.cos(mid) * (LOOP.rx + 30), my = cy + Math.sin(mid) * (LOOP.ry + 30)
        return <path key={`a${i}`} d={`M ${p.x} ${p.y} Q ${mx} ${my} ${q.x} ${q.y}`} fill="none" stroke={COLORS.champagne} strokeWidth={6} opacity={on} strokeDasharray="1600" strokeDashoffset={1600 * (1 - on)} />
      })}
      {/* # a coin running round the loop once it is closed (behind the step pills) */}
      {frame > last && <circle cx={cx + Math.cos(spin - Math.PI / 2) * LOOP.rx} cy={cy + Math.sin(spin - Math.PI / 2) * LOOP.ry} r={18} fill="#E2B85C" stroke="#FFE3A0" strokeWidth={3} />}
      {steps.map((t, i) => {
        const p = at(i), on = settle(frame, cues[i], true)
        const w = Math.max(280, t.length * 20 + 60)
        return (
          <g key={i} opacity={0.25 + 0.75 * on} transform={`translate(${p.x} ${p.y}) scale(${0.9 + 0.1 * on})`}>
            <rect x={-w / 2} y={-40} width={w} height={80} rx={40} fill="#12233A" stroke={on > 0.5 ? COLORS.champagne : COLORS.blue} strokeWidth={4} />
            <Label x={0} y={13} size={36} weight={800} color={COLORS.text}>{t}</Label>
          </g>
        )
      })}
      {data.label && <Label x={cx} y={cy + 14} size={46} weight={800} color={COLORS.champagneLight} opacity={settle(frame, last + 10)}>{data.label}</Label>}
    </g>
  )
}

export const STORY_VIGNETTES = [
  makeVignette('loop', 'A cycle that feeds itself', ['feedback', 'momentum', 'compounding', 'concentration'], {
    hint: '{ steps: string[] (3–4 short steps), label? } — cues: one per step (the last closes the loop)',
    items: (d) => d?.steps?.length ?? 0,
    check: (d) => list(d, 'steps', 3) ?? (d.steps.length > 4 ? 'at most 4 steps' : d.steps.some((x: string) => x.length > 22) ? 'steps must be ≤ 22 chars' : null),
    Component: Loop,
  }),
  makeVignette('bubble', 'A bubble swelling (and popping)', ['bubble', 'mania', 'crash', 'history', 'valuation'], {
    hint: '{ label, value?: "≈ 27%", items?: string[] (≤ 5 short names), pop?: boolean } — cues: appear, swell, (pop)',
    items: (d) => (d?.pop ? 3 : 2),
    check: (d) => (d?.label ? ((d.items ?? []).length > 5 ? 'at most 5 items' : null) : 'needs a "label"'),
    Component: Bubble,
  }),
  makeVignette('leaderboard', 'A ranking reshuffles: old leaders out, new in', ['ranking', 'change', 'history', 'companies'], {
    hint: '{ title?, fromLabel?: "2000", toLabel?: "2026", before: string[], after: string[] } (≤ 10 each; names in both are marked as survivors) — cues: old ranking, reshuffle',
    items: () => 2,
    check: (d) => list(d, 'before', 2) ?? list(d, 'after', 2) ?? (d.before.length > 10 || d.after.length > 10 ? 'at most 10 rows' : null),
    Component: Leaderboard,
  }),
  makeVignette('lottery', 'Many tickets, a few huge winners', ['odds', 'winners', 'risk', 'stocks', 'returns'], {
    hint: '{ tickets: number (≤ 60), winners: number, label? } — cues: tickets, most lose, winners glow',
    items: () => 3,
    check: (d) => (num(d?.tickets) && num(d?.winners) ? (d.winners >= 1 && d.winners < d.tickets ? null : 'winners must be ≥ 1 and fewer than tickets') : 'needs numeric "tickets" and "winners"'),
    Component: Lottery,
  }),
]
