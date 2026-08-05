// # Line chart draw — SVG line chart with animated draw from left to right
// # Used for: data segments, trends over time

import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface LineChartDrawProps {
  title: string
  yAxisLabel?: string
  dataPoints?: Array<{ x: string; y: number }>
  color?: 'gold' | 'positive' | 'negative' | 'neutral'
  aspect?: AspectMode
}

export const LineChartDraw: React.FC<LineChartDrawProps> = ({
  title,
  yAxisLabel = '',
  dataPoints = [],
  color = 'gold',
  aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const drawProgress = interpolate(frame, [5, 35], [0, 1], { extrapolateRight: 'clamp' })
  const accentColor = color === 'gold' ? colors.accent.gold
    : color === 'positive' ? colors.semantic.positive
    : color === 'negative' ? colors.semantic.negative
    : colors.semantic.neutral

  // # Chart dimensions inside safe zone
  const chartW = aspect === 'landscape' ? 1200 : 700
  const chartH = aspect === 'landscape' ? 500 : 400

  // # Normalize data points to chart coordinates
  const maxY = Math.max(...dataPoints.map((d) => d.y), 1)
  const minY = Math.min(...dataPoints.map((d) => d.y), 0)
  const range = maxY - minY || 1

  const points = dataPoints.map((d, i) => ({
    x: (i / Math.max(dataPoints.length - 1, 1)) * chartW,
    y: chartH - ((d.y - minY) / range) * chartH,
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const pathLength = chartW * 1.5

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{
          fontFamily: fonts.headline.family,
          fontSize: fontSize('headline', 'subheading', aspect),
          color: colors.text.primary,
          textTransform: 'uppercase',
          marginBottom: 32,
        }}>
          {truncate(title, 50)}
        </div>

        <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
          {/* # Grid lines */}
          {[0.25, 0.5, 0.75].map((frac) => (
            <line key={frac} x1={0} y1={chartH * frac} x2={chartW} y2={chartH * frac}
              stroke={colors.bg.tertiary} strokeWidth={1} />
          ))}

          {/* # Animated line */}
          {points.length > 1 && (
            <path d={pathD} fill="none" stroke={accentColor} strokeWidth={3}
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - drawProgress)} />
          )}
        </svg>

        {yAxisLabel && (
          <div style={{
            fontFamily: fonts.body.family,
            fontSize: fontSize('body', 'small', aspect),
            color: colors.text.muted,
            marginTop: 8,
          }}>
            {yAxisLabel}
          </div>
        )}
      </div>
    </div>
  )
}
