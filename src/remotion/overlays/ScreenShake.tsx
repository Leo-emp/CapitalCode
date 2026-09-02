// # Screen shake overlay — triggered on impact moments (stat reveals, bass hits)
// # Wraps children and applies decaying random offset
// # Deterministic per-frame (no Math.random) for Remotion compatibility
// # Only fires when AI Director marks a scene with impact: true or sfx_cues include bass_hit

import React from 'react'
import { useCurrentFrame } from 'remotion'

export interface ScreenShakeProps {
  children: React.ReactNode
  // # Frame number when shake triggers (relative to scene start)
  triggerFrame: number
  // # Duration in frames (default 8 = ~267ms)
  durationFrames?: number
  // # Max pixel offset at peak (default 10px)
  intensity?: number
}

export const ScreenShake: React.FC<ScreenShakeProps> = ({
  children,
  triggerFrame,
  durationFrames = 8,
  intensity = 10,
}) => {
  const frame = useCurrentFrame()
  const elapsed = frame - triggerFrame

  // # Only shake during active window
  if (elapsed < 0 || elapsed >= durationFrames) {
    return <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
  }

  // # Exponential decay — shake reduces rapidly
  const decay = Math.exp(-4.0 * elapsed / durationFrames)
  const currentIntensity = intensity * decay

  // # Deterministic offset from frame number (no Math.random)
  const dx = Math.sin(elapsed * 13.7 + triggerFrame * 3.1) * currentIntensity
  const dy = Math.cos(elapsed * 7.3 + triggerFrame * 5.7) * currentIntensity * 0.7

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      transform: `translate(${dx}px, ${dy}px)`,
      overflow: 'hidden',
    }}>
      {children}
    </div>
  )
}
