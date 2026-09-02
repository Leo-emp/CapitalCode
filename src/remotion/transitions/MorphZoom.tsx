// # Morph zoom — outgoing blurs + zooms out while incoming sharpens in
// # Best for chart-to-chart transitions where data transforms
// # Smoother than ZoomThrough — uses blur for depth illusion

import React from 'react'
import { AbsoluteFill } from 'remotion'

export interface TransitionProps {
  progress: number
  children: [React.ReactNode, React.ReactNode]
}

export const MorphZoom: React.FC<TransitionProps> = ({ progress, children }) => {
  // # Outgoing: scale up + blur out (zooming "past" it)
  const outScale = 1 + progress * 0.15
  const outBlur = progress * 8
  const outOpacity = 1 - progress * 1.2

  // # Incoming: scale from small + blur to sharp (emerging from depth)
  const inScale = 0.92 + progress * 0.08
  const inBlur = (1 - progress) * 6
  const inOpacity = Math.max(0, (progress - 0.2) * 1.4)

  return (
    <AbsoluteFill>
      {/* # Outgoing — zooms past viewer */}
      <AbsoluteFill style={{
        transform: `scale(${outScale})`,
        filter: `blur(${outBlur}px)`,
        opacity: Math.max(0, outOpacity),
      }}>
        {children[0]}
      </AbsoluteFill>
      {/* # Incoming — emerges from depth */}
      <AbsoluteFill style={{
        transform: `scale(${inScale})`,
        filter: `blur(${inBlur}px)`,
        opacity: Math.min(1, inOpacity),
      }}>
        {children[1]}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
MorphZoom.displayName = 'MorphZoom'
