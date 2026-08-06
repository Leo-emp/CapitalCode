// # Kinetic title — word-by-word animated title with stagger
// # Used for: hooks, section headers, topic introductions

import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations, transform3dEntry } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'
import { goldGlow } from '../design/effects'

export interface KineticTitleProps {
  title: string
  subtitle?: string
  aspect?: AspectMode
}

export const KineticTitle: React.FC<KineticTitleProps> = ({
  title,
  subtitle = '',
  aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const words = truncate(title, 60).split(/\s+/)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        {/* # Word-by-word stagger */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          {words.map((word, i) => {
            const delay = i * durations.staggerDelay
            const progress = spring({ frame: frame - delay, fps, config: springs.snappy })
            return (
              <span key={i} style={{
                fontFamily: fonts.headline.family,
                fontSize: fontSize('headline', 'heading', aspect),
                color: colors.text.primary,
                textTransform: 'uppercase',
                opacity: progress,
                // # 3D depth entry + vertical slide
                transform: `${transform3dEntry(progress, -3)} translateY(${(1 - progress) * 30}px)`,
                // # Subtle gold glow on each word
                ...goldGlow(0.2),
              }}>
                {word}
              </span>
            )
          })}
        </div>

        {/* # Subtitle */}
        {subtitle && (
          <div style={{
            fontFamily: fonts.body.family,
            fontSize: fontSize('body', 'medium', aspect),
            color: colors.text.secondary,
            marginTop: 24,
            opacity: spring({ frame: frame - words.length * durations.staggerDelay - 5, fps, config: springs.smooth }),
          }}>
            {truncate(subtitle, 80)}
          </div>
        )}
      </div>
    </div>
  )
}
