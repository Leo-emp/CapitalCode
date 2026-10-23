// ============================================================
// GRAIN — printed-ink noise multiplied inside a shape group.
// Usage: const g = useUid('grain'); <GrainFilter id={g}/> then
// <g filter={`url(#${g})`}>…</g>
// ============================================================

import React from 'react'

export const GrainFilter: React.FC<{ id: string; strength?: number }> = ({ id, strength = 0.55 }) => (
  <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="n" />
    <feColorMatrix in="n" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -${(strength * 1.3).toFixed(2)} ${strength}`} result="dots" />
    <feComposite in="dots" in2="SourceGraphic" operator="in" result="d" />
    <feBlend in="SourceGraphic" in2="d" mode="multiply" />
  </filter>
)

// # Full-frame film grain overlay (moving noise), very light
export const FilmGrain: React.FC<{ frame: number; opacity?: number; id: string }> = ({ frame, opacity = 0.08, id }) => (
  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity, mixBlendMode: 'screen', pointerEvents: 'none' }}>
    <filter id={id}><feTurbulence type="fractalNoise" baseFrequency="0.85" seed={frame % 24} /></filter>
    <rect width="100%" height="100%" filter={`url(#${id})`} />
  </svg>
)
