// # Stacked bar — horizontal stacked bars for composition breakdown
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface StackedBarProps {
  title: string
  data?: Array<{ label: string; segments: Array<{ value: number; color?: string }> }>
  aspect?: AspectMode
}

export const StackedBar: React.FC<StackedBarProps> = ({ title, data = [], aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const barW = aspect === 'landscape' ? 900 : 600

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 32 }}>{truncate(title, 50)}</div>
        {data.slice(0, 6).map((row, i) => {
          const progress = spring({ frame: frame - i * durations.staggerDelay, fps, config: springs.smooth })
          const total = row.segments.reduce((s, seg) => s + seg.value, 0) || 1
          return (
            <div key={i} style={{ marginBottom: 20, opacity: progress }}>
              <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'small', aspect), color: colors.text.secondary, marginBottom: 6 }}>{truncate(row.label, 30)}</div>
              <div style={{ display: 'flex', width: barW * progress, height: 28, borderRadius: 4, overflow: 'hidden' }}>
                {row.segments.map((seg, j) => (
                  <div key={j} style={{ width: `${(seg.value / total) * 100}%`, backgroundColor: seg.color ?? colors.chart[j % colors.chart.length], height: '100%' }} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
