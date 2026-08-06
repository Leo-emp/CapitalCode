// # Left-to-right clip-path wipe reveal transition
// # Incoming scene "wipes" over the outgoing scene from left to right
// # Best for sequential data and timeline transitions

import React from 'react'
import { AbsoluteFill } from 'remotion'

export interface TransitionProps {
  progress: number
  children: [React.ReactNode, React.ReactNode]
}

export const WipeRight: React.FC<TransitionProps> = ({ progress, children }) => {
  // # Clip percentage: how much of incoming scene is visible
  const clipPct = progress * 100

  return (
    <AbsoluteFill>
      {/* # Outgoing scene — fully visible behind the wipe */}
      <AbsoluteFill>
        {children[0]}
      </AbsoluteFill>
      {/* # Incoming scene — clip-path reveals from left to right */}
      <AbsoluteFill style={{
        clipPath: `inset(0 ${100 - clipPct}% 0 0)`,
      }}>
        {children[1]}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
WipeRight.displayName = 'WipeRight'
