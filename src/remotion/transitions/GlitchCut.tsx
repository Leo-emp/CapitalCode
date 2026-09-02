// # RGB-split glitch transition — tech/AI topic dramatic cut
// # Splits outgoing into offset RGB channels before incoming snaps in
// # Only used on ai_tech category or impact moments

import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'

export interface TransitionProps {
  progress: number
  children: [React.ReactNode, React.ReactNode]
}

export const GlitchCut: React.FC<TransitionProps> = ({ progress, children }) => {
  const frame = useCurrentFrame()
  // # Glitch intensity ramps up then snap-cuts to incoming
  const snapPoint = 0.7
  const showIncoming = progress >= snapPoint

  // # RGB offset increases as progress approaches snap point
  const glitchIntensity = showIncoming ? 0 : (progress / snapPoint) * 15
  // # Deterministic jitter based on frame (not random — Remotion-safe)
  const jitterX = Math.sin(frame * 13.7) * glitchIntensity
  const jitterY = Math.cos(frame * 7.3) * glitchIntensity * 0.3

  // # Horizontal slice displacement — simulates scan line corruption
  const sliceOffset = Math.sin(frame * 23.1) * glitchIntensity * 2

  if (showIncoming) {
    // # Snap cut — incoming appears instantly with brief flash
    const flashOpacity = Math.max(0, 1 - (progress - snapPoint) / (1 - snapPoint))
    return (
      <AbsoluteFill>
        <AbsoluteFill>{children[1]}</AbsoluteFill>
        <AbsoluteFill style={{
          backgroundColor: 'rgba(212, 168, 83, 0.15)',
          opacity: flashOpacity * 0.4,
          pointerEvents: 'none',
        }} />
      </AbsoluteFill>
    )
  }

  return (
    <AbsoluteFill>
      {/* # Red channel offset */}
      <AbsoluteFill style={{
        transform: `translate(${jitterX}px, ${jitterY}px)`,
        mixBlendMode: 'screen',
        opacity: 0.7,
        filter: 'hue-rotate(-30deg)',
      }}>
        {children[0]}
      </AbsoluteFill>
      {/* # Blue channel offset */}
      <AbsoluteFill style={{
        transform: `translate(${-jitterX}px, ${sliceOffset}px)`,
        mixBlendMode: 'screen',
        opacity: 0.7,
        filter: 'hue-rotate(30deg)',
      }}>
        {children[0]}
      </AbsoluteFill>
      {/* # Base layer */}
      <AbsoluteFill style={{ opacity: 0.6 }}>
        {children[0]}
      </AbsoluteFill>
      {/* # Noise scanlines */}
      <AbsoluteFill style={{
        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)`,
        opacity: progress * 0.6,
        pointerEvents: 'none',
      }} />
    </AbsoluteFill>
  )
}
GlitchCut.displayName = 'GlitchCut'
