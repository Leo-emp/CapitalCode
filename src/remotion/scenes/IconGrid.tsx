// # Icon grid — grid of labeled items with emoji/text icons
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface IconGridProps {
  title: string
  items?: Array<{ icon: string; label: string }>
  columns?: 2 | 3 | 4
  aspect?: AspectMode
}

export const IconGrid: React.FC<IconGridProps> = ({ title, items = [], columns = 3, aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 40 }}>{truncate(title, 50)}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, maxWidth: aspect === 'landscape' ? 1200 : 800 }}>
          {items.slice(0, 9).map((item, i) => {
            // # Each item staggers in
            const progress = spring({ frame: frame - i * durations.staggerDelay, fps, config: springs.smooth })
            return (
              <div key={i} style={{ width: `${100 / columns - 4}%`, textAlign: 'center', opacity: progress, transform: `scale(${0.8 + 0.2 * progress})` }}>
                <div style={{ fontSize: fontSize('headline', 'title', aspect), marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'small', aspect), color: colors.text.secondary }}>{truncate(item.label, 25)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
