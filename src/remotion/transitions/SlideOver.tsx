// # Directional slide transition — incoming pushes outgoing off-screen
// # Best for sequential segments (context→data, data→data)

import React from 'react'
import { AbsoluteFill } from 'remotion'

export interface TransitionProps {
  progress: number
  children: [React.ReactNode, React.ReactNode]
}

export const SlideOver: React.FC<TransitionProps> = ({ progress, children }) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{
        transform: `translateX(${-progress * 100}%)`,
      }}>
        {children[0]}
      </AbsoluteFill>
      <AbsoluteFill style={{
        transform: `translateX(${(1 - progress) * 100}%)`,
      }}>
        {children[1]}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
SlideOver.displayName = 'SlideOver'
