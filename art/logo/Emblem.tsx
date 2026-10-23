// ============================================================
// CAPITALCODE EMBLEM — vector redraw of the owner's logo:
// a "C" (upper arm with a slanted end, lower arm sweeping to a
// point), a thin diagonal slash, and three rising bars.
// Coordinates follow the 3× crop of the PNG (693 × 678).
// `progress` (0..1 per part) lets LogoReveal animate it.
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'
import { useUid } from '../uid'

export type EmblemProgress = { arms: number; slash: number; bars: number }
const DONE: EmblemProgress = { arms: 1, slash: 1, bars: 1 }

// # Bars: x-left, x-right, top-left y, top-right y, bottom y (top edge slopes up to the right)
const BARS: [number, number, number, number, number][] = [
  [286, 318, 425, 398, 478],
  [350, 432, 360, 306, 528],
  [470, 552, 262, 212, 565],
]

export const Emblem: React.FC<{ size: number; progress?: EmblemProgress; x?: number; y?: number }> = ({
  size, progress = DONE, x = 0, y = 0,
}) => {
  const metal = useUid('metal')
  const sheen = useUid('sheen')
  const p = progress
  return (
    <svg x={x} y={y} width={size} height={size * (678 / 693)} viewBox="0 0 693 678" overflow="visible">
      <defs>
        {/* # Brushed champagne metal: dark → light → mid → bright → dark */}
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8E847B" />
          <stop offset="28%" stopColor={COLORS.champagneLight} />
          <stop offset="52%" stopColor={COLORS.champagneDark} />
          <stop offset="74%" stopColor={COLORS.champagneLight} />
          <stop offset="100%" stopColor="#7E746B" />
        </linearGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <g opacity={Math.min(1, p.arms * 1.5)}>
        {/* # Upper arm of the C, ending in the slanted top-right cut */}
        <path fill={`url(#${metal})`} d="M330 50 L655 50 L555 152 L342 156 C272 162 232 240 229 330 L231 412 L118 446 C94 330 120 172 200 102 C240 68 286 52 330 50 Z" />
        {/* # Lower arm sweeping right to a point */}
        <path fill={`url(#${metal})`} d="M170 470 L268 452 C272 502 302 532 362 546 C432 562 502 572 542 592 L612 642 L372 632 C282 622 222 582 192 532 C180 512 172 492 170 470 Z" />
        <path fill={`url(#${sheen})`} d="M330 50 L655 50 L630 76 L320 80 C260 86 214 120 186 170 C214 104 268 56 330 50 Z" />
      </g>
      {/* # Rising bars: each grows up from its base */}
      {BARS.map(([x1, x2, t1, t2, b], i) => {
        const g = Math.max(0, Math.min(1, p.bars * 3 - i))
        const top = (yy: number) => b - (b - yy) * g
        return <path key={i} fill={`url(#${metal})`} d={`M${x1} ${b} L${x1} ${top(t1)} L${x2} ${top(t2)} L${x2} ${b} Z`} />
      })}
      {/* # The slash: a thin wedge cutting up-right across the C */}
      <path fill={`url(#${metal})`}
        d={`M${318 - 288 * p.slash} ${392 + 188 * p.slash} L306 390 L320 420 Z`} />
    </svg>
  )
}
