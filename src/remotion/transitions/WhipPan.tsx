// # Whip pan — fast horizontal blur simulating a rapid camera pan
// # Best for topic changes and dramatic pivots ("but here's the catch")
// # Motion blur peaks at midpoint then resolves to incoming scene

import React from 'react'
import { AbsoluteFill } from 'remotion'

export interface TransitionProps {
  progress: number
  children: [React.ReactNode, React.ReactNode]
}

export const WhipPan: React.FC<TransitionProps> = ({ progress, children }) => {
  // # Motion blur peaks at midpoint (progress=0.5)
  const blurAmount = Math.sin(progress * Math.PI) * 30

  // # Outgoing slides left with increasing speed
  const outX = -progress * progress * 120
  const outOpacity = progress < 0.45 ? 1 : Math.max(0, 1 - (progress - 0.45) * 4)

  // # Incoming slides in from right, decelerating
  const inProgress = Math.max(0, progress - 0.4) / 0.6
  const inX = (1 - inProgress * inProgress) * 120
  const inOpacity = progress > 0.4 ? Math.min(1, (progress - 0.4) * 3) : 0

  return (
    <AbsoluteFill>
      {/* # Outgoing — whips left */}
      <AbsoluteFill style={{
        transform: `translateX(${outX}%)`,
        filter: `blur(${blurAmount * 0.7}px)`,
        opacity: outOpacity,
      }}>
        {children[0]}
      </AbsoluteFill>
      {/* # Incoming — arrives from right */}
      <AbsoluteFill style={{
        transform: `translateX(${inX}%)`,
        filter: `blur(${blurAmount * 0.5}px)`,
        opacity: inOpacity,
      }}>
        {children[1]}
      </AbsoluteFill>
      {/* # Directional motion blur streak at peak */}
      <AbsoluteFill style={{
        background: `linear-gradient(90deg, transparent, rgba(10,22,40,${blurAmount / 60}), transparent)`,
        pointerEvents: 'none',
      }} />
    </AbsoluteFill>
  )
}
WhipPan.displayName = 'WhipPan'
