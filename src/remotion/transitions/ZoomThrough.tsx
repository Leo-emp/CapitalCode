// # Scale + fade transition — outgoing zooms to 1.3x, incoming zooms from 0.7x
// # Creates a "zooming through" the outgoing scene into the incoming one
// # Best for topic changes and dramatic reveals

import React from 'react'
import { AbsoluteFill } from 'remotion'

export interface TransitionProps {
  progress: number
  children: [React.ReactNode, React.ReactNode]
}

export const ZoomThrough: React.FC<TransitionProps> = ({ progress, children }) => {
  // # Outgoing: scale 1→1.3 (zooms away), fade 1→0
  const outScale = 1 + progress * 0.3
  // # Incoming: scale 0.7→1 (zooms in from distance), fade 0→1
  const inScale = 0.7 + progress * 0.3

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{
        opacity: 1 - progress,
        transform: `scale(${outScale})`,
      }}>
        {children[0]}
      </AbsoluteFill>
      <AbsoluteFill style={{
        opacity: progress,
        transform: `scale(${inScale})`,
      }}>
        {children[1]}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
ZoomThrough.displayName = 'ZoomThrough'
