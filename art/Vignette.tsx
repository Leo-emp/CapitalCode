// # Dark edges that pull the eye to the centre
import React from 'react'
import { AbsoluteFill } from 'remotion'

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.8 }) => (
  <AbsoluteFill style={{ pointerEvents: 'none', background: `radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,${strength}) 100%)` }} />
)
