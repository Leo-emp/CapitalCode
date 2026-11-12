// ============================================================
// COVER WORDS — the sticker title (thick ring, dark outline, fill,
// hard shadow) placed anywhere, any tilt; and a pointing arrow.
// ============================================================
import React from 'react'
import { approxMeasure } from '../thumbnails/fitText'
import { useReport } from './kit'

// # lines centred on x; y = top of the first line; size = px (Bebas Neue)
export type Line = { t: string; size: number; color?: string }
export const Words: React.FC<{ name?: string; lines: Line[]; x: number; y: number; rotate?: number; ring?: string; ink?: string; outline?: string
  gap?: number; touches?: string[] }> = ({ name = 'words', lines, x, y, rotate = 0, ring = '#FFFFFF', ink = '#FFFFFF', outline = '#05070C', gap = 0.06, touches }) => {
  const report = useReport()
  let cy = y
  const rows = lines.map((l) => {
    const r = { ...l, w: approxMeasure(l.t, l.size) + l.size * 0.3, top: cy }
    cy += l.size * (0.92 + gap)
    return r
  })
  const bw = Math.max(...rows.map((r) => r.w)), bh = cy - y
  const rad = Math.abs(rotate) * Math.PI / 180, rw = bw * Math.cos(rad) + bh * Math.sin(rad), rh = bw * Math.sin(rad) + bh * Math.cos(rad)
  report({ name, kind: 'text', x: x - rw / 2, y: y + bh / 2 - rh / 2, w: rw, h: rh, touches,
    info: { words: lines.flatMap((l) => l.t.split(/\s+/).filter(Boolean)).length, minSize: Math.min(...lines.map((l) => l.size)), text: lines.map((l) => l.t).join(' / ') } })
  return <g transform={`rotate(${rotate} ${x} ${y + bh / 2})`} strokeLinejoin="round">
    {rows.map((r, i) => {
      const base = r.top + r.size * 0.8
      const st = { font: `400 ${r.size}px "Bebas Neue"`, letterSpacing: r.size * 0.01 } as React.CSSProperties
      return <g key={i}>
        <text x={x + r.size * 0.04} y={base + r.size * 0.08} textAnchor="middle" style={st} fill="#05070C" stroke="#05070C" strokeWidth={r.size * 0.24} opacity={0.5}>{r.t}</text>
        <text x={x} y={base} textAnchor="middle" style={st} fill={ring} stroke={ring} strokeWidth={r.size * 0.22}>{r.t}</text>
        <text x={x} y={base} textAnchor="middle" style={st} fill={outline} stroke={outline} strokeWidth={r.size * 0.1}>{r.t}</text>
        <text x={x} y={base} textAnchor="middle" style={st} fill={r.color ?? ink}>{r.t}</text>
      </g>
    })}
  </g>
}

// # a big curved arrow from a to b (may cross anything)
export const Arrow: React.FC<{ name: string; from: [number, number]; to: [number, number]; bend?: number; color?: string; width?: number }> = ({ name, from, to, bend = 0.25, color = '#F2B632', width = 28 }) => {
  const [x1, y1] = from, [x2, y2] = to
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend
  useReport()({ name, kind: 'extra', x: Math.min(x1, x2, mx), y: Math.min(y1, y2, my), w: Math.max(x1, x2, mx) - Math.min(x1, x2, mx), h: Math.max(y1, y2, my) - Math.min(y1, y2, my), touches: ['*'] })
  const a = Math.atan2(y2 - my, x2 - mx), hl = width * 2.4
  const hx = x2 - Math.cos(a) * hl * 0.6, hy = y2 - Math.sin(a) * hl * 0.6
  const side = (s: number) => `${hx + Math.cos(a + s * Math.PI / 2) * hl * 0.55} ${hy + Math.sin(a + s * Math.PI / 2) * hl * 0.55}`
  const head = `M${x2} ${y2} L${side(1)} L${side(-1)} Z`, path = `M${x1} ${y1} Q${mx} ${my} ${hx} ${hy}`
  return <g strokeLinecap="round" strokeLinejoin="round">
    <path d={path} fill="none" stroke="#05070C" strokeWidth={width + 14} /><path d={head} fill="#05070C" stroke="#05070C" strokeWidth={14} />
    <path d={path} fill="none" stroke={color} strokeWidth={width} /><path d={head} fill={color} />
  </g>
}
