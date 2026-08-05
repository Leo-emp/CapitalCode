// # Area chart fill — filled area chart with animated reveal
import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface AreaChartFillProps {
  title: string
  dataPoints?: Array<{ x: string; y: number }>
  color?: 'gold' | 'positive' | 'negative' | 'neutral'
  aspect?: AspectMode
}

export const AreaChartFill: React.FC<AreaChartFillProps> = ({
  title, dataPoints = [], color = 'gold', aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const fillProgress = interpolate(frame, [5, 35], [0, 1], { extrapolateRight: 'clamp' })
  const accentColor = color === 'gold' ? colors.accent.gold : colors.semantic[color === 'positive' ? 'positive' : color === 'negative' ? 'negative' : 'neutral']
  const chartW = aspect === 'landscape' ? 1200 : 700
  const chartH = aspect === 'landscape' ? 500 : 400
  const maxY = Math.max(...dataPoints.map((d) => d.y), 1)
  const minY = Math.min(...dataPoints.map((d) => d.y), 0)
  const range = maxY - minY || 1
  const points = dataPoints.map((d, i) => ({ x: (i / Math.max(dataPoints.length - 1, 1)) * chartW, y: chartH - ((d.y - minY) / range) * chartH }))
  const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${lineD} L ${chartW} ${chartH} L 0 ${chartH} Z`

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 32 }}>{truncate(title, 50)}</div>
        <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
          {points.length > 1 && <>
            <path d={areaD} fill={accentColor} opacity={0.15 * fillProgress} />
            <path d={lineD} fill="none" stroke={accentColor} strokeWidth={3} opacity={fillProgress} />
          </>}
        </svg>
      </div>
    </div>
  )
}
