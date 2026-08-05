// # Comparison split — side-by-side A vs B
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface ComparisonSplitProps {
  leftTitle: string
  rightTitle: string
  leftItems?: string[]
  rightItems?: string[]
  leftColor?: 'positive' | 'negative' | 'gold' | 'neutral'
  rightColor?: 'positive' | 'negative' | 'gold' | 'neutral'
  aspect?: AspectMode
}

export const ComparisonSplit: React.FC<ComparisonSplitProps> = ({
  leftTitle, rightTitle, leftItems = [], rightItems = [], leftColor = 'positive', rightColor = 'negative', aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const leftProgress = spring({ frame, fps, config: springs.snappy })
  const rightProgress = spring({ frame: frame - 5, fps, config: springs.snappy })
  const resolveColor = (c: string) => c === 'gold' ? colors.accent.gold : colors.semantic[c as keyof typeof colors.semantic] ?? colors.text.primary

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={{ ...safeZoneStyle, flexDirection: 'row', gap: 48 }}>
        {/* # Left side */}
        <div style={{ flex: 1, opacity: leftProgress, transform: `translateX(${(1 - leftProgress) * -40}px)` }}>
          <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: resolveColor(leftColor), textTransform: 'uppercase', marginBottom: 24 }}>{truncate(leftTitle, 30)}</div>
          {leftItems.slice(0, 5).map((item, i) => (
            <div key={i} style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'medium', aspect), color: colors.text.secondary, marginBottom: 12 }}>• {truncate(item, 50)}</div>
          ))}
        </div>
        {/* # Divider */}
        <div style={{ width: 2, backgroundColor: colors.bg.tertiary, alignSelf: 'stretch' }} />
        {/* # Right side */}
        <div style={{ flex: 1, opacity: rightProgress, transform: `translateX(${(1 - rightProgress) * 40}px)` }}>
          <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: resolveColor(rightColor), textTransform: 'uppercase', marginBottom: 24 }}>{truncate(rightTitle, 30)}</div>
          {rightItems.slice(0, 5).map((item, i) => (
            <div key={i} style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'medium', aspect), color: colors.text.secondary, marginBottom: 12 }}>• {truncate(item, 50)}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
