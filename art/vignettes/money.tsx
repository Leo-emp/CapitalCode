// ============================================================
// MONEY VIGNETTES — where money goes and how it is split:
//   money-flow  dollars stream from a source into groups of companies
//   pie         a whole sliced into labelled parts
//   baskets     the same items dropping into several baskets (overlap)
//   scale       two weights on a balance; it tips toward the heavier
// ============================================================
import React from 'react'
import { interpolate } from 'remotion'
import { COLORS } from '../tokens'
import { clamp, Coin, Glow, Ground, hash01, Label, list, makeVignette, num, ramp, settle, tone } from './kit'

// ---------------------------------------------------------------- money-flow
// # data: { source?: string, groups: [{ label, share, count, tone? }] } (2–3 groups)
// # steps: 1) source + skyline appear, then one step per group (its stream + label)
const GROUND = 850 // # labels (two lines below) clear the slide's source line
const MoneyFlow: React.FC<{ frame: number; data: any; cues: number[] }> = ({ frame, data, cues }) => {
  const groups = data.groups as { label: string; share: number; count: number; tone?: string }[]
  const appear = settle(frame, cues[0])
  const colW = 1520 / groups.length
  const perMax = Math.max(...groups.map((g) => g.share / Math.max(1, g.count)))
  const src = { x: 960, y: 250 } // # below the slide heading, above the tallest tower
  return (
    <g>
      <Glow id="mf-src" x={src.x} y={src.y} r={260} color={COLORS.warm} opacity={0.25 * appear} />
      <Ground y={GROUND} opacity={appear} />
      {/* # the source: a coin stack with its label */}
      <g opacity={appear} transform={`translate(0 ${(1 - appear) * -30})`}>
        {Array.from({ length: 5 }, (_, k) => <Coin key={k} x={src.x} y={src.y + 30 - k * 8} r={40} />)}
        {data.source && <Label x={src.x + 90} y={src.y + 30} anchor="start" size={40} color={COLORS.champagneLight}>{data.source}</Label>}
      </g>
      {groups.map((g, gi) => {
        const cx = 200 + colW * gi + colW / 2
        const col = tone(g.tone ?? (gi === 0 ? 'champagne' : 'blue'))
        const per = g.share / Math.max(1, g.count)
        const h = Math.max(16, 520 * per / perMax)
        // # up to 14 towers drawn individually; bigger groups become a dense field of small blocks
        const drawn = Math.min(g.count, g.count <= 14 ? g.count : 120)
        const cols = g.count <= 14 ? drawn : 20
        const w = Math.min(64, (colW - 80) / cols - (g.count <= 14 ? 10 : 4))
        const gap = g.count <= 14 ? 10 : 4
        const rowW = cols * (w + gap) - gap
        const build = settle(frame, cues[0] + gi * 6)
        const flowOn = frame >= (cues[gi + 1] ?? Infinity)
        const lab = settle(frame, cues[gi + 1])
        // # coin stream: lanes in proportion to the group's share of the money
        const lanes = Math.max(2, Math.round(g.share / 100 * 16))
        return (
          <g key={gi}>
            {Array.from({ length: drawn }, (_, k) => {
              const r = g.count <= 14 ? 0 : Math.floor(k / cols), c = g.count <= 14 ? k : k % cols
              const x = cx - rowW / 2 + c * (w + gap)
              const hh = h * build
              const y = GROUND - hh - r * (h + 6)
              const lit = flowOn ? 0.55 + 0.45 * hash01(k, gi) : 0.25
              return (
                <g key={k}>
                  <rect x={x} y={y} width={w} height={hh} fill={COLORS.bgPanel} stroke={col} strokeWidth={2} rx={2} />
                  {hh > 60 && Array.from({ length: Math.floor(hh / 46) }, (_, j) => (
                    <rect key={j} x={x + w * 0.25} y={y + 18 + j * 46} width={w * 0.5} height={14} fill={COLORS.warm} opacity={lit * 0.8} />
                  ))}
                </g>
              )
            })}
            {g.count > drawn && <Label x={cx} y={GROUND - (Math.ceil(drawn / cols)) * (h + 6) - 24} size={34} color={COLORS.dim} opacity={build}>{`× ${g.count}`}</Label>}
            {flowOn && Array.from({ length: lanes }, (_, k) => {
              const t = ((frame - cues[gi + 1]) / 38 + k / lanes) % 1
              const ex = cx + (hash01(k, gi + 3) - 0.5) * Math.min(rowW, colW - 80)
              const ey = GROUND - h - 30
              const x = interpolate(t, [0, 1], [src.x, ex]), y = interpolate(t, [0, 1], [src.y + 60, ey]) - Math.sin(t * Math.PI) * 120
              return <Coin key={k} x={x} y={y} r={16} opacity={interpolate(t, [0, 0.1, 0.85, 1], [0, 1, 1, 0])} />
            })}
            <g opacity={lab} transform={`translate(0 ${(1 - lab) * 20})`}>
              <Label x={cx} y={GROUND + 64} size={44} weight={800} color={col}>{`${g.share}%`}</Label>
              <Label x={cx} y={GROUND + 112} size={34} color={COLORS.text}>{g.label}</Label>
            </g>
          </g>
        )
      })}
    </g>
  )
}

// ---------------------------------------------------------------- pie
// # data: { slices: [{ label, value, tone? }] } — steps: 1) whole pie draws, then each slice pulls out
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`
  return `M ${cx} ${cy} L ${p(a0)} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)} Z`
}
const Pie: React.FC<{ frame: number; data: any; cues: number[] }> = ({ frame, data, cues }) => {
  const slices = data.slices as { label: string; value: number; tone?: string }[]
  const total = slices.reduce((a, s) => a + s.value, 0)
  const draw = ramp(frame, cues[0], 24)
  const cx = 760, cy = 560, r = 300
  let a = -Math.PI / 2
  return (
    <g>
      <Glow id="pie-g" x={cx} y={cy} r={460} opacity={0.22} />
      {slices.map((s, i) => {
        const a0 = a, a1 = a + (s.value / total) * Math.PI * 2 * draw
        a = a0 + (s.value / total) * Math.PI * 2
        const mid = (a0 + a0 + (s.value / total) * Math.PI * 2) / 2
        const out = settle(frame, cues[i + 1], true)
        const dx = Math.cos(mid) * 40 * out, dy = Math.sin(mid) * 40 * out
        const col = tone(s.tone ?? (i === 0 ? 'champagne' : 'blue'))
        const lx = cx + Math.cos(mid) * (r + 150), ly = cy + Math.sin(mid) * (r + 110)
        return (
          <g key={i}>
            {a1 > a0 && <path d={arc(cx + dx, cy + dy, r, a0, a1)} fill={col} opacity={0.18 + 0.6 * out} stroke={COLORS.bg} strokeWidth={6} />}
            <g opacity={out}>
              <Label x={Math.max(240, Math.min(1700, lx))} y={ly} size={52} weight={800} color={col}>{`${s.value}%`}</Label>
              <Label x={Math.max(240, Math.min(1700, lx))} y={ly + 48} size={34}>{s.label}</Label>
            </g>
          </g>
        )
      })}
    </g>
  )
}

// ---------------------------------------------------------------- baskets
// # data: { baskets: string[] (≤ 4), items: string[] (≤ 4) } — steps: 1) baskets, then each item drops into ALL baskets
const Baskets: React.FC<{ frame: number; data: any; cues: number[] }> = ({ frame, data, cues }) => {
  const baskets = data.baskets as string[], items = data.items as string[]
  const show = settle(frame, cues[0])
  const step = 1600 / baskets.length
  const allIn = frame >= (cues[items.length] ?? Infinity) + 20
  return (
    <g>
      {baskets.map((b, bi) => {
        const cx = 160 + step * bi + step / 2, top = 640
        const col = allIn ? COLORS.champagne : COLORS.blue
        return (
          <g key={bi} opacity={show} transform={`translate(0 ${(1 - show) * 40})`}>
            <Glow id={`bk-${bi}`} x={cx} y={top + 60} r={220} opacity={allIn ? 0.3 : 0.15} color={allIn ? COLORS.warm : COLORS.blue} />
            <path d={`M ${cx - 170} ${top} L ${cx + 170} ${top} L ${cx + 130} ${top + 190} L ${cx - 130} ${top + 190} Z`} fill={COLORS.bgPanel} stroke={col} strokeWidth={4} />
            {[0.33, 0.66].map((k) => <line key={k} x1={cx - 160 + 20 * k} x2={cx + 160 - 20 * k} y1={top + 190 * k} y2={top + 190 * k} stroke={col} strokeWidth={2} opacity={0.5} />)}
            <Label x={cx} y={top + 250} size={36} color={COLORS.text}>{b}</Label>
            {items.map((it, ii) => {
              const t = settle(frame, cues[ii + 1], true)
              if (t <= 0.01) return null
              const restY = top - 44 - ii * 66
              const y = interpolate(t, [0, 1], [-120, restY], clamp)
              const w = Math.max(150, it.length * 19 + 50)
              return (
                <g key={ii} transform={`translate(${cx} ${y})`}>
                  <rect x={-w / 2} y={-28} width={w} height={56} rx={28} fill="#E2B85C" stroke="#FFE3A0" strokeWidth={3} />
                  <text y={11} textAnchor="middle" fill="#3B2905" style={{ font: '800 30px Inter' }}>{it}</text>
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}

// ---------------------------------------------------------------- scale
// # data: { left: { label, value }, right: { label, value }, unit? } — steps: 1) empty balance, 2) left weight, 3) right weight (tips)
const Scale: React.FC<{ frame: number; data: any; cues: number[] }> = ({ frame, data, cues }) => {
  const L = data.left as { label: string; value: number }, R = data.right as { label: string; value: number }
  const unit = data.unit ?? '%'
  const show = settle(frame, cues[0])
  const l = settle(frame, cues[1], true), r = settle(frame, cues[2], true)
  const wl = L.value * l, wr = R.value * r
  const tilt = (wl + wr) > 0 ? ((wl - wr) / (L.value + R.value)) * 26 : 0
  const px = 960, py = 380, arm = 470
  const pan = (side: -1 | 1, v: { label: string; value: number }, t: number, col: string) => {
    const e = { x: px + side * arm * Math.cos((tilt * Math.PI) / 180), y: py - side * arm * Math.sin((tilt * Math.PI) / 180) }
    const size = 60 + 140 * Math.sqrt(v.value / Math.max(L.value, R.value))
    return (
      <g>
        <line x1={e.x} y1={e.y} x2={e.x - 120} y2={e.y + 230} stroke={COLORS.line} strokeWidth={3} />
        <line x1={e.x} y1={e.y} x2={e.x + 120} y2={e.y + 230} stroke={COLORS.line} strokeWidth={3} />
        <path d={`M ${e.x - 170} ${e.y + 230} Q ${e.x} ${e.y + 300} ${e.x + 170} ${e.y + 230} Z`} fill={COLORS.bgPanel} stroke={COLORS.blue} strokeWidth={4} />
        {t > 0.01 && (
          // # drops a short way onto its pan and fades in — never flies across the slide heading
          <g opacity={Math.min(1, t * 2.5)} transform={`translate(${e.x} ${interpolate(t, [0, 1], [e.y + 230 - size / 2 - 160, e.y + 230 - size / 2], clamp)})`}>
            <rect x={-size / 2} y={-size / 2} width={size} height={size} rx={10} fill={col} opacity={0.9} />
            <Label x={0} y={14} size={44} weight={800} color={COLORS.bg}>{`${v.value}${unit}`}</Label>
          </g>
        )}
        <Label x={e.x} y={e.y + 350} size={38} color={COLORS.text}>{v.label}</Label>
      </g>
    )
  }
  return (
    <g opacity={show}>
      <Glow id="sc-g" x={px} y={py + 200} r={520} opacity={0.2} />
      <path d={`M ${px} ${py} L ${px - 70} 900 L ${px + 70} 900 Z`} fill={COLORS.bgPanel} stroke={COLORS.line} strokeWidth={3} />
      <Ground y={900} />
      <line x1={px - arm * Math.cos((tilt * Math.PI) / 180)} y1={py + arm * Math.sin((tilt * Math.PI) / 180)} x2={px + arm * Math.cos((tilt * Math.PI) / 180)} y2={py - arm * Math.sin((tilt * Math.PI) / 180)}
        stroke={COLORS.champagne} strokeWidth={10} strokeLinecap="round" />
      <circle cx={px} cy={py} r={16} fill={COLORS.champagne} />
      {pan(-1, L, l, COLORS.champagne)}
      {pan(1, R, r, COLORS.blue)}
    </g>
  )
}

const pct = (d: any, key: string) => (Array.isArray(d?.[key]) && d[key].every((x: any) => x?.label && num(x?.value)) ? null : `${key} need "label" and a numeric "value"`)

export const MONEY_VIGNETTES = [
  makeVignette('money-flow', 'Money flowing into groups of companies', ['money', 'concentration', 'index', 'investing', 'flow'], {
    hint: '{ source?: "Your $100", groups: [{ label, share, count, tone? }] } (2–3 groups) — cues: skyline, then one per group',
    items: (d) => 1 + (d?.groups?.length ?? 0),
    check: (d) => list(d, 'groups', 2) ?? (d.groups.length > 3 ? 'at most 3 groups' : d.groups.every((g: any) => g?.label && num(g?.share) && num(g?.count) && g.count >= 1) ? null : 'each group needs label, numeric share and count ≥ 1'),
    Component: MoneyFlow,
  }),
  makeVignette('pie', 'A whole sliced into parts', ['money', 'share', 'split', 'budget'], {
    hint: '{ slices: [{ label, value, tone? }] } (2–6) — cues: whole pie, then one per slice',
    items: (d) => 1 + (d?.slices?.length ?? 0),
    check: (d) => list(d, 'slices', 2) ?? (d.slices.length > 6 ? 'at most 6 slices' : pct(d, 'slices')),
    Component: Pie,
  }),
  makeVignette('baskets', 'The same items in several baskets', ['diversification', 'overlap', 'funds', 'portfolio'], {
    hint: '{ baskets: string[] (2–4), items: string[] (1–4, short names) } — cues: baskets, then one per item',
    items: (d) => 1 + (d?.items?.length ?? 0),
    check: (d) => list(d, 'baskets', 2) ?? list(d, 'items', 1) ?? (d.baskets.length > 4 || d.items.length > 4 ? 'at most 4 baskets and 4 items' : null),
    Component: Baskets,
  }),
  makeVignette('scale', 'A balance tipping toward the heavier side', ['compare', 'value', 'price', 'tradeoff'], {
    hint: '{ left: { label, value }, right: { label, value }, unit?: "%" } — cues: balance, left weight, right weight',
    items: () => 3,
    check: (d) => (d?.left?.label && num(d?.left?.value) && d?.right?.label && num(d?.right?.value) ? null : 'needs left and right, each with label and numeric value'),
    Component: Scale,
  }),
]
