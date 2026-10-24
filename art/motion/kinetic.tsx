// ============================================================
// KINETIC TEXT — a key word or number that animates onto the
// scene now and then, next to the thing it is about (owner
// 2026-10-24: "text animation occasionally where relevant").
//   pop    words spring in one by one (4 frames apart)
//   type   letters write on, one per frame
//   stamp  lands big (1.6×) with a small shake, then settles
//   count  the number inside rolls up from 0 over 20 frames
// Bebas Neue, champagne, never below 44 px. Pure function of frame.
// ============================================================
import React from 'react'
import { spring } from 'remotion'
import { COLORS, FPS } from '../tokens'

export type KineticStyle = 'pop' | 'type' | 'stamp' | 'count'
export const MIN_SIZE = 44
const ease = (t: number) => { const x = Math.max(0, Math.min(1, t)); return 1 - (1 - x) ** 3 }

// # The text with its first number shown at fraction p of its value (same decimals, same thousands commas)
export const countText = (words: string, p: number): string => {
  const m = words.match(/\d[\d,]*(\.\d+)?/)
  if (!m) return words
  const target = parseFloat(m[0].replace(/,/g, '')), dec = m[1] ? m[1].length - 1 : 0
  const v = target * Math.max(0, Math.min(1, p))
  const shown = v.toFixed(dec).replace(/^(\d+)/, (d) => (m[0].includes(',') ? Number(d).toLocaleString('en-US') : d))
  return words.slice(0, m.index) + shown + words.slice(m.index! + m[0].length)
}

export const KineticText: React.FC<{ words: string; style: KineticStyle; frame: number; at: number; x: number; y: number; size?: number; color?: string }> = ({
  words, style, frame, at, x, y, size = 72, color = COLORS.champagneLight,
}) => {
  if (frame < at) return null
  const fs = Math.max(MIN_SIZE, size), f = frame - at
  const font = `${fs}px "Bebas Neue"`
  const shadow = { paintOrder: 'stroke' as const, stroke: 'rgba(8,14,30,0.75)', strokeWidth: fs * 0.08 }
  if (style === 'pop') {
    const ws = words.split(' ')
    return (
      <text x={x} y={y} textAnchor="middle" fill={color} style={{ font, ...shadow }}>
        {ws.map((w, i) => {
          const s = spring({ frame: f - i * 4, fps: FPS, config: { damping: 11, stiffness: 200 } })
          return <tspan key={i} opacity={Math.min(1, s * 1.5).toFixed(3)} dy={i === 0 ? (1 - s) * 20 : 0}>{w}{i < ws.length - 1 ? ' ' : ''}</tspan>
        })}
      </text>
    )
  }
  if (style === 'type') return <text x={x} y={y} textAnchor="middle" fill={color} style={{ font, ...shadow }}>{words.slice(0, f)}</text>
  if (style === 'count') return <text x={x} y={y} textAnchor="middle" fill={color} style={{ font, ...shadow }}>{countText(words, ease(f / 20))}</text>
  // # stamp
  const k = 1 + 0.6 * (1 - ease(f / 8)), shake = f < 12 ? Math.sin(f * 2.3) * (12 - f) * 0.5 : 0
  return (
    <g transform={`translate(${x + shake} ${y}) scale(${k}) translate(${-x} ${-y})`} opacity={Math.min(1, f / 3 + 0.4)}>
      <text x={x} y={y} textAnchor="middle" fill={color} style={{ font, ...shadow }}>{words}</text>
    </g>
  )
}
