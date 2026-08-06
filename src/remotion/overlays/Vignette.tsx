// # Dark-edge vignette overlay — focuses viewer attention on center content
// # Purely CSS radial gradient, no external images or canvas

import React from 'react'

export interface VignetteProps {
  intensity?: number  // # 0–1, default 0.6 (subtle but visible darkening)
}

export const Vignette: React.FC<VignetteProps> = ({ intensity = 0.6 }) => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 150,
      pointerEvents: 'none',
      // # Transparent center → dark edges = classic camera vignette
      background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,${intensity}) 100%)`,
    }} />
  )
}
