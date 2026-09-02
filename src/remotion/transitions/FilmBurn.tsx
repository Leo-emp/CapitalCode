// # Film burn transition — warm amber glow between scenes
// # Simulates old film exposure bleed for dramatic topic changes
// # Uses brand gold (#D4A853) to stay on-palette

import React from 'react'
import { AbsoluteFill } from 'remotion'

export interface TransitionProps {
  progress: number
  children: [React.ReactNode, React.ReactNode]
}

export const FilmBurn: React.FC<TransitionProps> = ({ progress, children }) => {
  // # Phase 1 (0–0.5): outgoing fades while burn builds
  // # Phase 2 (0.5–1): burn fades while incoming appears
  const burnIntensity = progress < 0.5
    ? progress * 2
    : (1 - progress) * 2

  const outgoingOpacity = Math.max(0, 1 - progress * 1.5)
  const incomingOpacity = Math.max(0, (progress - 0.35) * 1.8)

  // # Burn expands from center as a radial gradient
  const burnRadius = 30 + burnIntensity * 70

  return (
    <AbsoluteFill>
      {/* # Outgoing scene fading */}
      <AbsoluteFill style={{ opacity: outgoingOpacity }}>
        {children[0]}
      </AbsoluteFill>
      {/* # Incoming scene emerging */}
      <AbsoluteFill style={{ opacity: Math.min(1, incomingOpacity) }}>
        {children[1]}
      </AbsoluteFill>
      {/* # Warm amber burn overlay */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at center, rgba(212,168,83,${burnIntensity * 0.6}) 0%, rgba(166,124,46,${burnIntensity * 0.3}) ${burnRadius * 0.5}%, transparent ${burnRadius}%)`,
        pointerEvents: 'none',
        zIndex: 10,
      }} />
      {/* # Bright center flash at peak */}
      <AbsoluteFill style={{
        background: `radial-gradient(circle at center, rgba(255,255,255,${burnIntensity * 0.25}) 0%, transparent 40%)`,
        pointerEvents: 'none',
        zIndex: 11,
      }} />
    </AbsoluteFill>
  )
}
FilmBurn.displayName = 'FilmBurn'
