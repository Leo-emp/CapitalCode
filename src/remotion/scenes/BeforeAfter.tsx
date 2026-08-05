// # Before/After — two-panel comparison showing change
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface BeforeAfterProps {
  title: string
  beforeLabel: string
  afterLabel: string
  beforeValue?: string
  afterValue?: string
  aspect?: AspectMode
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  title, beforeLabel, afterLabel, beforeValue = '', afterValue = '', aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const leftP = spring({ frame, fps, config: springs.snappy })
  const rightP = spring({ frame: frame - 10, fps, config: springs.snappy })
  const arrowP = spring({ frame: frame - 15, fps, config: springs.elegant })

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 40 }}>{truncate(title, 50)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {/* # Before panel */}
          <div style={{ flex: 1, padding: 32, border: `2px solid ${colors.semantic.negative}`, borderRadius: 12, opacity: leftP, transform: `translateX(${(1 - leftP) * -30}px)` }}>
            <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect) * 0.8, color: colors.semantic.negative, marginBottom: 12 }}>{truncate(beforeLabel, 25)}</div>
            {beforeValue && <div style={{ fontFamily: fonts.data.family, fontSize: fontSize('data', 'large', aspect), color: colors.text.primary }}>{truncate(beforeValue, 30)}</div>}
          </div>
          {/* # Arrow */}
          <div style={{ fontSize: 48, color: colors.accent.gold, opacity: arrowP }}>→</div>
          {/* # After panel */}
          <div style={{ flex: 1, padding: 32, border: `2px solid ${colors.semantic.positive}`, borderRadius: 12, opacity: rightP, transform: `translateX(${(1 - rightP) * 30}px)` }}>
            <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect) * 0.8, color: colors.semantic.positive, marginBottom: 12 }}>{truncate(afterLabel, 25)}</div>
            {afterValue && <div style={{ fontFamily: fonts.data.family, fontSize: fontSize('data', 'large', aspect), color: colors.text.primary }}>{truncate(afterValue, 30)}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
