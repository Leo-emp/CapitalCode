// # Counter animation — number rolling from 0 to target
import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface CounterAnimationProps {
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  aspect?: AspectMode
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  label, value, prefix = '', suffix = '', decimals = 0, aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const progress = interpolate(frame, [5, 50], [0, 1], { extrapolateRight: 'clamp' })
  const current = value * progress
  const display = `${prefix}${current.toFixed(decimals)}${suffix}`

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.data.family, fontSize: fontSize('data', 'large', aspect) * 1.5, fontWeight: 700, color: colors.accent.gold, fontVariantNumeric: 'tabular-nums' }}>{display}</div>
        <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'large', aspect), color: colors.text.secondary, marginTop: 24 }}>{truncate(label, 60)}</div>
      </div>
    </div>
  )
}
