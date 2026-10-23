// ============================================================
// GRAIN OVERLAY — one static noise texture over the whole frame
// (printed-ink / film feel). Replaces per-shape SVG noise filters,
// which tore text during camera moves and were the slowest part
// of every frame. The texture shifts a little every 2 frames
// (deterministic) so the grain feels alive.
// ============================================================
import React from 'react'
import { AbsoluteFill, staticFile } from 'remotion'

export const GrainOverlay: React.FC<{ frame: number; opacity?: number }> = ({ frame, opacity = 0.09 }) => {
  const k = Math.floor(frame / 2)
  const ox = (k * 137) % 512, oy = (k * 251) % 512
  return (
    <AbsoluteFill style={{
      pointerEvents: 'none', opacity, mixBlendMode: 'overlay',
      backgroundImage: `url(${staticFile('textures/grain.png')})`, backgroundRepeat: 'repeat', backgroundPosition: `${ox}px ${oy}px`,
    }} />
  )
}
