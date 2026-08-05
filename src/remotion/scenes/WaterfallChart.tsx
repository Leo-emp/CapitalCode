// # Waterfall chart — sequential gains/losses building to total
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface WaterfallChartProps {
  title: string
  items?: Array<{ label: string; value: number }>
  aspect?: AspectMode
}

export const WaterfallChart: React.FC<WaterfallChartProps> = ({ title, items = [], aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const chartH = aspect === 'landscape' ? 400 : 350
  const barW = Math.min(80, (aspect === 'landscape' ? 1000 : 600) / Math.max(items.length, 1) - 16)

  // # Calculate running totals for waterfall positioning
  let running = 0
  const processed = items.slice(0, 8).map((item) => {
    const start = running
    running += item.value
    return { ...item, start, end: running }
  })
  const maxAbs = Math.max(...processed.map((p) => Math.max(Math.abs(p.start), Math.abs(p.end))), 1)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 32 }}>{truncate(title, 50)}</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: chartH, position: 'relative' }}>
          {/* # Zero line */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: `${(maxAbs / (maxAbs * 2)) * 100}%`, height: 1, backgroundColor: colors.text.muted, opacity: 0.3 }} />
          {processed.map((item, i) => {
            const progress = spring({ frame: frame - i * durations.staggerDelay, fps, config: springs.smooth })
            const isPositive = item.value >= 0
            const barH = (Math.abs(item.value) / (maxAbs * 2)) * chartH * progress
            const bottomOffset = ((maxAbs + Math.min(item.start, item.end)) / (maxAbs * 2)) * chartH
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <div style={{ fontFamily: fonts.data.family, fontSize: fontSize('data', 'small', aspect), color: isPositive ? colors.semantic.positive : colors.semantic.negative, marginBottom: 4, opacity: progress }}>{isPositive ? '+' : ''}{item.value}</div>
                <div style={{ width: barW, height: barH, backgroundColor: isPositive ? colors.semantic.positive : colors.semantic.negative, borderRadius: 3, position: 'relative', bottom: 0 }} />
                <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'small', aspect) * 0.85, color: colors.text.muted, marginTop: 6, textAlign: 'center', maxWidth: barW + 16, opacity: progress }}>{truncate(item.label, 10)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
