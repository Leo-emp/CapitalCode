// # Bar chart grow — bars animate upward from bottom
// # Used for: data segments, categorical comparisons

import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface BarChartGrowProps {
  title: string
  data?: Array<{ label: string; value: number }>
  showValues?: boolean
  aspect?: AspectMode
}

export const BarChartGrow: React.FC<BarChartGrowProps> = ({
  title, data = [], showValues = true, aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const maxVal = Math.max(...data.map((d) => d.value), 1)
  const barW = Math.min(80, (aspect === 'landscape' ? 1000 : 600) / Math.max(data.length, 1) - 16)
  const chartH = aspect === 'landscape' ? 400 : 350

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 32 }}>
          {truncate(title, 50)}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: chartH }}>
          {data.slice(0, 10).map((d, i) => {
            const height = spring({ frame: frame - i * durations.staggerDelay, fps, config: springs.smooth }) * (d.value / maxVal) * chartH
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showValues && <div style={{ fontFamily: fonts.data.family, fontSize: fontSize('data', 'small', aspect), color: colors.accent.gold, marginBottom: 4 }}>{d.value}</div>}
                <div style={{ width: barW, height, backgroundColor: colors.chart[i % colors.chart.length], borderRadius: 4 }} />
                <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'small', aspect), color: colors.text.muted, marginTop: 8, textAlign: 'center', maxWidth: barW + 20 }}>{truncate(d.label, 12)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
