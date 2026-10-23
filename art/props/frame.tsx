// ============================================================
// PROP FRAME — every prop is drawn once in a 200×200 box; this
// wrapper sizes it, pops it in on its cue frame, gives it a small
// idle wobble, adds printed-ink grain, and hands the drawing a
// `u(name)` helper for unique gradient ids.
// ============================================================

import React from 'react'
import { spring } from 'remotion'
import { GrainFilter } from '../Grain'
import type { ArtEntry } from '../registry'
import { FPS, MOTION } from '../tokens'
import { useUid } from '../uid'

export type PropProps = { size: number; frame?: number; enter?: number; idle?: boolean; x?: number; y?: number }
export type Draw = React.FC<{ u: (name: string) => string; frame: number }>

// # Shared ink colours for props
export const INK = { outline: '#0A111C', shine: '#FFFFFF' }

export const makeProp = (id: string, title: string, tags: string[], Art: Draw): ArtEntry<PropProps> => {
  const Component: React.FC<PropProps> = ({ size, frame = 0, enter, idle = true, x = 0, y = 0 }) => {
    const base = useUid(id)
    const u = (name: string) => `${base}-${name}`
    const pop = enter === undefined ? 1 : spring({ frame: frame - enter, fps: FPS, config: MOTION.pop })
    const wobble = idle ? Math.sin((frame + id.length * 7) / 22) * 2 : 0
    return (
      <svg x={x} y={y} width={size} height={size} viewBox="0 0 200 200" overflow="visible">
        <defs><GrainFilter id={u('grain')} strength={0.35} /></defs>
        <g transform={`translate(100 100) scale(${pop}) rotate(${wobble}) translate(-100 -100)`} opacity={Math.min(1, pop * 2)}>
          <g filter={`url(#${u('grain')})`}><Art u={u} frame={frame} /></g>
        </g>
      </svg>
    )
  }
  Component.displayName = `Prop(${id})`
  return { id, title, tags, Component }
}

// # Vertical metal/ink gradient helper used by many props
export const Grad: React.FC<{ id: string; stops: string[]; x2?: number; y2?: number }> = ({ id, stops, x2 = 0, y2 = 1 }) => (
  <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
    {stops.map((c, i) => <stop key={i} offset={`${(i / (stops.length - 1)) * 100}%`} stopColor={c} />)}
  </linearGradient>
)
