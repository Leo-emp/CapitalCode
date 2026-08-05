// # Gauge chart — semicircle gauge showing a percentage
import { useCurrentFrame, interpolate } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface GaugeChartProps {
  title: string
  value: number // # 0–100
  label?: string
  color?: 'gold' | 'positive' | 'negative'
  aspect?: AspectMode
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ title, value, label = '', color = 'gold', aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const progress = interpolate(frame, [5, 40], [0, 1], { extrapolateRight: 'clamp' })
  const clampedVal = Math.min(100, Math.max(0, value))
  const angle = clampedVal * 1.8 * progress // # 180deg = full gauge
  const accentColor = color === 'gold' ? colors.accent.gold : colors.semantic[color]
  const r = 140 // # radius
  const cx = 160
  const cy = 160

  // # Arc path via SVG
  const startX = cx - r
  const startY = cy
  const rad = (angle * Math.PI) / 180
  const endX = cx - r * Math.cos(rad)
  const endY = cy - r * Math.sin(rad)
  const largeArc = angle > 90 ? 1 : 0
  const arcPath = `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 32 }}>{truncate(title, 50)}</div>
        <svg width={320} height={180} viewBox="0 0 320 180">
          {/* # Background arc */}
          <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}`} fill="none" stroke={colors.bg.tertiary} strokeWidth={16} strokeLinecap="round" />
          {/* # Value arc */}
          {angle > 0 && <path d={arcPath} fill="none" stroke={accentColor} strokeWidth={16} strokeLinecap="round" />}
        </svg>
        <div style={{ fontFamily: fonts.data.family, fontSize: fontSize('data', 'large', aspect), color: accentColor, textAlign: 'center', marginTop: -20 }}>{Math.round(clampedVal * progress)}%</div>
        {label && <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'medium', aspect), color: colors.text.muted, textAlign: 'center', marginTop: 8 }}>{truncate(label, 40)}</div>}
      </div>
    </div>
  )
}
