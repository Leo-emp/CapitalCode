// ============================================================
// CHARTS — number builds, equations, bars, lines, areas, stacked
// bars. Every build step starts on a cue frame (from cueFrame).
// Numbers come from facts.json in the engine; illustrative ones
// must be labelled by the caller (source line).
// ============================================================

import React from 'react'
import { Easing, interpolate } from 'remotion'
import { COLORS } from '../tokens'
import { barRows, formatMoney, labelRows, niceTicks, scaleLinear } from './layout'
import { build, clamp, rise, TONE, type Tone } from './SlideFrame'

const ease = Easing.bezier(0.16, 1, 0.3, 1)

// ------------------------------------------------------------
// BIG NUMBER — counts up between two cues, label under it
// ------------------------------------------------------------
export const NumberBuild: React.FC<{ frame: number; value: number; cues: [number, number]; label?: string; tone?: Tone; format?: (v: number) => string; x?: number; y?: number; size?: number }> = ({
  frame, value, cues, label, tone = 'blue', format = (v) => formatMoney(v, { compact: true }), x = 150, y = 460, size = 140,
}) => {
  const a = build(frame, cues[0])
  const v = interpolate(frame, cues, [0, value], { ...clamp, easing: ease })
  return (
    <div style={{ position: 'absolute', left: x, top: y, ...rise(a) }}>
      <div style={{ fontSize: size, fontWeight: 800, color: TONE[tone], lineHeight: 1 }}>{format(v)}</div>
      {label && <div style={{ fontSize: 36, letterSpacing: 5, color: COLORS.dim, marginTop: 14 }}>{label.toUpperCase()}</div>}
    </div>
  )
}

// ------------------------------------------------------------
// EQUATION — "$350k × 3 → $1.05m": each part on its own cue
// ------------------------------------------------------------
export type EqPart = { text: string; label?: string; tone?: Tone } | { op: string }
export const Equation: React.FC<{ frame: number; parts: EqPart[]; cues: number[]; y?: number }> = ({ frame, parts, cues, y = 470 }) => (
  <div style={{ position: 'absolute', left: 150, top: y, display: 'flex', alignItems: 'center', gap: 60 }}>
    {parts.map((p, i) => {
      const v = build(frame, cues[Math.min(i, cues.length - 1)], 'op' in p)
      if ('op' in p) {
        if (p.op === '→') {
          const w = interpolate(frame, [cues[i], cues[i] + 14], [0, 1], { ...clamp, easing: ease })
          return <svg key={i} width={200} height={40} style={{ opacity: w > 0 ? 1 : 0 }}><line x1={0} y1={20} x2={182 * w} y2={20} stroke={COLORS.dim} strokeWidth={4} />
            {w > 0.9 && <path d="M168 8 L186 20 L168 32" fill="none" stroke={COLORS.dim} strokeWidth={4} />}</svg>
        }
        return <div key={i} style={{ fontSize: 86, fontWeight: 700, ...rise(v) }}>{p.op}</div>
      }
      return (
        <div key={i} style={rise(v)}>
          <div style={{ fontSize: 116, fontWeight: 800, color: TONE[p.tone ?? 'blue'], lineHeight: 1 }}>{p.text}</div>
          {p.label && <div style={{ fontSize: 32, letterSpacing: 5, color: COLORS.dim, marginTop: 12 }}>{p.label.toUpperCase()}</div>}
        </div>
      )
    })}
  </div>
)

// ------------------------------------------------------------
// BAR CHART — horizontal bars, each grows on its cue
// ------------------------------------------------------------
export type Bar = { label: string; value: number; tone?: Tone; display?: string }
export const BarChart: React.FC<{ frame: number; bars: Bar[]; cues: number[]; max?: number; y?: number; format?: (v: number) => string }> = ({
  frame, bars, cues, max, y = 330, format = (v) => `${Math.round(v)}`,
}) => {
  const top = max ?? Math.max(...bars.map((b) => b.value)) * 1.1
  const row = barRows(bars.length)
  return (
    <div style={{ position: 'absolute', left: 150, right: 150, top: y, display: 'flex', flexDirection: 'column', gap: row.gap }}>
      {bars.map((b, i) => {
        const g = build(frame, cues[Math.min(i, cues.length - 1)], false)
        const w = Math.max(0, Math.min(1.05, g)) * (b.value / top) * 100
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 30, opacity: Math.min(1, g * 3) }}>
            <div style={{ width: 300, fontSize: row.font, color: COLORS.text }}>{b.label}</div>
            <div style={{ flex: 1, height: row.height, background: 'rgba(255,255,255,0.05)', borderRadius: 4, position: 'relative' }}>
              <div style={{ width: `${w}%`, height: '100%', borderRadius: 4, background: TONE[b.tone ?? 'blue'], boxShadow: `0 0 30px ${TONE[b.tone ?? 'blue']}55` }} />
            </div>
            <div style={{ width: 170, textAlign: 'right', fontSize: row.value, fontWeight: 800, color: TONE[b.tone ?? 'blue'] }}>{b.display ?? format(b.value * Math.min(1, Math.max(0, g)))}</div>
          </div>
        )
      })}
    </div>
  )
}

// ------------------------------------------------------------
// LINE / AREA CHART — draws on between two cues; optional
// annotated point; colour turns red after `turnAt` if falling
// ------------------------------------------------------------
export const LineChart: React.FC<{ frame: number; values: number[]; cues: [number, number]; area?: boolean; tone?: Tone; annotate?: { index: number; text: string; cue: number };
  yFormat?: (v: number) => string; xLabels?: [string, string] }> = ({ frame, values, cues, area = false, tone = 'blue', annotate, yFormat = (v) => `${v}`, xLabels }) => {
  const X0 = 260, X1 = 1760, Y0 = 300, Y1 = 860
  const ticks = niceTicks(Math.min(0, ...values), Math.max(...values), 5)
  const sx = scaleLinear([0, values.length - 1], [X0, X1]), sy = scaleLinear([ticks[0], ticks[ticks.length - 1]], [Y1, Y0])
  const p = interpolate(frame, cues, [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) })
  const upto = p * (values.length - 1), i = Math.min(Math.floor(upto), values.length - 2), t = upto - i
  const pts = values.slice(0, i + 1).map((v, k) => [sx(k), sy(v)])
  pts.push([sx(i + t), sy(values[i] + (values[i + 1] - values[i]) * t)])
  const d = pts.map(([x, y], k) => `${k ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const tip = pts[pts.length - 1], col = TONE[tone]
  const an = annotate ? build(frame, annotate.cue, false) : 0
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      {ticks.map((v) => <g key={v}><line x1={X0} x2={X1} y1={sy(v)} y2={sy(v)} stroke="rgba(255,255,255,0.07)" strokeDasharray="4 10" />
        <text x={X0 - 20} y={sy(v) + 8} textAnchor="end" fill={COLORS.dim} style={{ font: '26px "JetBrains Mono"' }}>{yFormat(v)}</text></g>)}
      {xLabels && xLabels.map((l, k) => <text key={k} x={k ? X1 : X0} y={Y1 + 40} textAnchor={k ? 'end' : 'start'} fill={COLORS.dim} style={{ font: '28px Inter' }}>{l}</text>)}
      {area && <path d={`${d} L${tip[0]} ${Y1} L${X0} ${Y1} Z`} fill={col} opacity={0.14} />}
      <path d={d} stroke={col} strokeWidth={12} fill="none" opacity={0.25} />
      <path d={d} stroke={col} strokeWidth={5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={tip[0]} cy={tip[1]} r={10} fill="#fff" />
      {annotate && an > 0 && (
        <g transform={`translate(${sx(annotate.index)} ${sy(values[annotate.index]) - 60}) scale(${an})`}>
          <rect x={-130} y={-34} width={260} height={52} rx={6} fill={COLORS.champagne} />
          <text x={0} y={2} textAnchor="middle" fill="#111" style={{ font: '34px "Bebas Neue"', letterSpacing: 1 }}>{annotate.text}</text>
        </g>
      )}
    </svg>
  )
}

// ------------------------------------------------------------
// STACKED BAR — one bar split into labelled segments (e.g. where
// a $1.05m sale price actually goes)
// ------------------------------------------------------------
export const StackedBar: React.FC<{ frame: number; segments: { label: string; value: number; tone?: Tone }[]; cues: number[]; y?: number; format?: (v: number) => string }> = ({
  frame, segments, cues, y = 470, format = (v) => formatMoney(v, { compact: true }),
}) => {
  const total = segments.reduce((s, x) => s + x.value, 0)
  const rows = labelRows(segments.map((x) => x.value))
  return (
    <div style={{ position: 'absolute', left: 150, right: 150, top: y }}>
      <div style={{ display: 'flex', height: 90, gap: 6 }}>
        {segments.map((s, i) => {
          const g = build(frame, cues[Math.min(i, cues.length - 1)])
          return <div key={i} style={{ width: `${(s.value / total) * 100 * g}%`, background: TONE[s.tone ?? 'blue'], opacity: 0.35 + 0.65 * g, borderRadius: 4 }} />
        })}
      </div>
      <div style={{ position: 'relative', height: 220, marginTop: 20 }}>
        {segments.map((s, i) => {
          const g = build(frame, cues[Math.min(i, cues.length - 1)])
          const left = segments.slice(0, i).reduce((a, x) => a + x.value, 0) / total * 100
          return <div key={i} style={{ position: 'absolute', left: `${left}%`, top: rows[i] * 100, whiteSpace: 'nowrap', ...rise(g) }}>
            <div style={{ fontSize: 46, fontWeight: 800, color: TONE[s.tone ?? 'blue'] }}>{format(s.value)}</div>
            <div style={{ fontSize: 30, color: COLORS.dim, marginTop: 6 }}>{s.label}</div></div>
        })}
      </div>
    </div>
  )
}
