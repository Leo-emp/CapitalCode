// # Opacity crossfade transition — default for all scene changes
// # Wraps two children: outgoing fades out while incoming fades in
// # Duration: 15 frames (0.5s at 30fps)

import React from 'react'
import { AbsoluteFill } from 'remotion'

export interface TransitionProps {
  progress: number  // # 0 = fully outgoing, 1 = fully incoming
  children: [React.ReactNode, React.ReactNode]  // # [outgoing, incoming]
}

export const CrossDissolve: React.FC<TransitionProps> = ({ progress, children }) => {
  return (
    <AbsoluteFill>
      {/* # Outgoing scene fading out as progress → 1 */}
      <AbsoluteFill style={{ opacity: 1 - progress }}>
        {children[0]}
      </AbsoluteFill>
      {/* # Incoming scene fading in as progress → 1 */}
      <AbsoluteFill style={{ opacity: progress }}>
        {children[1]}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
CrossDissolve.displayName = 'CrossDissolve'
