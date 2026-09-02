// # Subtle camera drift — slow pan/drift on every scene
// # Nothing is ever static. This is the #1 quality signal.
// # Movement is 2-4% max — barely perceptible but your brain registers it as "alive"
// # Uses deterministic seed per scene so drift direction is consistent within a scene

import React from 'react'
import { useCurrentFrame, interpolate } from 'remotion'

export interface CameraDriftProps {
  children: React.ReactNode
  durationFrames: number
  // # Seed controls drift direction — each scene gets a unique drift path
  seed?: number
  // # Max translation in percentage (2 = 2% of frame size)
  intensity?: number
}

// # Deterministic angle from seed — no Math.random (Remotion-safe)
function seedToAngle(seed: number): number {
  return ((seed * 137.508) % 360) * (Math.PI / 180)
}

export const CameraDrift: React.FC<CameraDriftProps> = ({
  children,
  durationFrames,
  seed = 0,
  intensity = 2.5,
}) => {
  const frame = useCurrentFrame()

  // # Drift direction from seed — each scene drifts a different way
  const angle = seedToAngle(seed)

  // # Smooth eased progress over scene duration
  const progress = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateRight: 'clamp',
  })

  // # Translate along the drift angle
  const tx = Math.cos(angle) * intensity * progress
  const ty = Math.sin(angle) * intensity * progress

  // # Very subtle zoom (0.5%) for depth
  const scale = 1 + progress * 0.005

  return (
    <div style={{
      position: 'absolute',
      inset: `-${intensity}%`,
      transform: `translate(${tx}%, ${ty}%) scale(${scale})`,
      overflow: 'hidden',
    }}>
      {children}
    </div>
  )
}
