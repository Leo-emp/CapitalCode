// # Text overlay — headline + body with optional emphasis word in gold
// # Used for: context, insight, counter, implication segments

import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface TextOverlayProps {
  headline: string
  body: string
  emphasisWord?: string
  aspect?: AspectMode
}

export const TextOverlay: React.FC<TextOverlayProps> = ({
  headline,
  body,
  emphasisWord,
  aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const headlineProgress = spring({ frame, fps, config: springs.snappy })
  const bodyOpacity = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' })

  // # Highlight emphasis word in gold within the body text
  const renderBody = () => {
    if (!emphasisWord) return truncate(body, 200)
    const parts = body.split(new RegExp(`(${emphasisWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === emphasisWord?.toLowerCase()
        ? <span key={i} style={{ color: colors.accent.gold, fontWeight: 700 }}>{part}</span>
        : <span key={i}>{part}</span>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={{ ...safeZoneStyle, alignItems: 'flex-start' }}>
        <div style={{
          fontFamily: fonts.headline.family,
          fontSize: fontSize('headline', 'subheading', aspect),
          color: colors.text.primary,
          textTransform: 'uppercase',
          opacity: headlineProgress,
          transform: `translateX(${(1 - headlineProgress) * -40}px)`,
          marginBottom: 32,
        }}>
          {truncate(headline, 50)}
        </div>

        <div style={{
          fontFamily: fonts.body.family,
          fontSize: fontSize('body', 'medium', aspect),
          color: colors.text.secondary,
          opacity: bodyOpacity,
          lineHeight: 1.6,
          maxWidth: '80%',
        }}>
          {renderBody()}
        </div>
      </div>
    </div>
  )
}
