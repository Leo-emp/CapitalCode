// # Bar chart race — horizontal bars that reorder (simplified: sorted bars with stagger)
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface BarChartRaceProps {
  title: string
  data?: Array<{ label: string; value: number }>
  aspect?: AspectMode
}

export const BarChartRace: React.FC<BarChartRaceProps> = ({ title, data = [], aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const maxVal = Math.max(...data.map((d) => d.value), 1)
  const barMaxW = aspect === 'landscape' ? 900 : 550
  // # Sort descending so biggest bar on top
  const sorted = [...data].sort((a, b) => b.value - a.value).slice(0, 8)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 32 }}>{truncate(title, 50)}</div>
        {sorted.map((d, i) => {
          const progress = spring({ frame: frame - i * durations.staggerDelay, fps, config: springs.smooth })
          const barW = (d.value / maxVal) * barMaxW * progress
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'small', aspect), color: colors.text.secondary, width: 100, textAlign: 'right', flexShrink: 0 }}>{truncate(d.label, 14)}</div>
              <div style={{ height: 28, width: barW, backgroundColor: colors.chart[i % colors.chart.length], borderRadius: 4 }} />
              <div style={{ fontFamily: fonts.data.family, fontSize: fontSize('data', 'small', aspect), color: colors.accent.gold, opacity: progress }}>{d.value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
