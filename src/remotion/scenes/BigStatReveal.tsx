// # Big stat reveal — animated counter with gold Bebas Neue text
// # Used for: hooks, shocking numbers, data segment reveals

import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, transform3dEntry } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'
import { goldGlow } from '../design/effects'

export interface BigStatRevealProps {
  stat: string            // # e.g. "$1.8T"
  subtitle?: string       // # e.g. "Annual bank profit from deposits"
  color?: 'gold' | 'positive' | 'negative' | 'neutral'
  aspect?: AspectMode
}

export const BigStatReveal: React.FC<BigStatRevealProps> = ({
  stat,
  subtitle = '',
  color = 'gold',
  aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // # Spring animation for the stat text
  const scale = spring({ frame, fps, config: springs.snappy })
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })

  // # Subtitle fades in after stat
  const subtitleOpacity = interpolate(frame, [15, 25], [0, 1], { extrapolateRight: 'clamp' })

  // # Resolve color from semantic name
  const accentColor = color === 'gold' ? colors.accent.gold
    : color === 'positive' ? colors.semantic.positive
    : color === 'negative' ? colors.semantic.negative
    : colors.semantic.neutral

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        {/* # Stat number */}
        <div style={{
          fontFamily: fonts.data.family,
          fontSize: fontSize('data', 'large', aspect) * 2,
          fontWeight: 700,
          color: accentColor,
          // # 3D entry + scale spring for cinematic depth
          transform: `${transform3dEntry(scale)} scale(${scale})`,
          opacity,
          textAlign: 'center',
          letterSpacing: '2px',
          // # Gold glow effect on stat text
          ...goldGlow(color === 'gold' ? 0.5 : 0.3),
        }}>
          {truncate(stat, 20)}
        </div>

        {/* # Subtitle */}
        {subtitle && (
          <div style={{
            fontFamily: fonts.body.family,
            fontSize: fontSize('body', 'large', aspect),
            color: colors.text.secondary,
            opacity: subtitleOpacity,
            marginTop: 24,
            textAlign: 'center',
          }}>
            {truncate(subtitle, 80)}
          </div>
        )}
      </div>
    </div>
  )
}
