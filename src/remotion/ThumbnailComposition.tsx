// # Dedicated thumbnail composition — designed for maximum YouTube feed impact
// # Bold stat + title + footage/illustration background + vignette + gold glow
// # Renders as a single 1920×1080 still frame

import React from 'react'
import { AbsoluteFill, Img } from 'remotion'
import { colors } from './design/colors'
import { fonts } from './design/fonts'
import { goldGlow } from './design/effects'

export interface ThumbnailProps {
  stat: string             // # Big number: "$1.8T", "47%", "+$500B"
  line1: string            // # Title line 1 (primary)
  line2: string            // # Title line 2 (secondary)
  backgroundSrc?: string   // # Path to footage frame or illustration image
  trendDirection?: 'up' | 'down' | 'neutral'  // # Arrow indicator
}

export const ThumbnailComposition: React.FC<ThumbnailProps> = ({
  stat,
  line1,
  line2,
  backgroundSrc,
  trendDirection = 'neutral',
}) => {
  // # Pick arrow color based on trend direction
  const arrowColor = trendDirection === 'up' ? colors.semantic.positive
    : trendDirection === 'down' ? colors.semantic.negative
    : colors.accent.gold

  // # Arrow symbol for visual impact
  const arrowSymbol = trendDirection === 'up' ? '▲'
    : trendDirection === 'down' ? '▼'
    : ''

  return (
    <AbsoluteFill style={{
      backgroundColor: colors.bg.primary,
      // # Boost contrast + saturation for thumbnail pop
      filter: 'contrast(1.2) saturate(1.1)',
    }}>
      {/* # Background image (heavily darkened for text contrast) */}
      {backgroundSrc && (
        <Img src={backgroundSrc} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.3) saturate(0.7)',
          position: 'absolute',
        }} />
      )}

      {/* # Dark gradient overlay — darker at bottom for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.8) 100%)',
      }} />

      {/* # Vignette effect — dark edges focus eye on center */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
      }} />

      {/* # Content container — positioned in safe zone */}
      <div style={{
        position: 'absolute',
        inset: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        {/* # Big stat number — largest element, maximum impact */}
        <div style={{
          fontFamily: fonts.headline.family,
          fontSize: 180,
          color: colors.accent.gold,
          textTransform: 'uppercase',
          lineHeight: 1,
          ...goldGlow(0.6),
        }}>
          {stat}
          {/* # Trend arrow next to stat */}
          {arrowSymbol && (
            <span style={{ color: arrowColor, fontSize: 120, marginLeft: 16 }}>
              {arrowSymbol}
            </span>
          )}
        </div>

        {/* # Title line 1 — bold, white */}
        <div style={{
          fontFamily: fonts.body.family,
          fontSize: 56,
          fontWeight: 700,
          color: colors.text.primary,
          marginTop: 24,
          lineHeight: 1.2,
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
        }}>
          {line1}
        </div>

        {/* # Title line 2 — slightly smaller, subdued */}
        <div style={{
          fontFamily: fonts.body.family,
          fontSize: 48,
          fontWeight: 600,
          color: colors.text.secondary,
          marginTop: 8,
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
        }}>
          {line2}
        </div>
      </div>
    </AbsoluteFill>
  )
}
