// # Cinematic 2.35:1 letterbox bars — animated black bars top and bottom
// # Only used on landscape (16:9) when AI Director sets cinematic: true
// # Converts 16:9 (1.778) to 2.35:1 aspect with ~12.1% bars each side

import React from 'react'
import { interpolate } from 'remotion'

export interface LetterboxProps {
  progress: number   // # 0–1, controls how much bars are revealed (0=no bars, 1=full bars)
}

export const Letterbox: React.FC<LetterboxProps> = ({ progress }) => {
  // # Calculate bar height: 16:9→2.35:1 needs ~12.1% of frame height per bar
  const barHeight = interpolate(progress, [0, 1], [0, 12.1], {
    extrapolateRight: 'clamp',
  })

  const barStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    height: `${barHeight}%`,
    backgroundColor: '#000',
    zIndex: 250,
    pointerEvents: 'none',
  }

  return (
    <>
      {/* # Top bar slides down from above */}
      <div style={{ ...barStyle, top: 0 }} />
      {/* # Bottom bar slides up from below */}
      <div style={{ ...barStyle, bottom: 0 }} />
    </>
  )
}
