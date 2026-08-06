// # Quote card — styled quote with attribution
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, transform3dEntry } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'
import { goldGlow } from '../design/effects'

export interface QuoteCardProps { quote: string; attribution?: string; aspect?: AspectMode }

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, attribution = '', aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = spring({ frame, fps, config: springs.elegant })
  const attrOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ borderLeft: `4px solid ${colors.accent.gold}`, paddingLeft: 32, maxWidth: '75%', opacity: progress, transform: `${transform3dEntry(progress)} translateX(${(1 - progress) * -20}px)` }}>
          <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'large', aspect), color: colors.text.primary, fontStyle: 'italic', lineHeight: 1.6, ...goldGlow(0.15) }}>"{truncate(quote, 150)}"</div>
          {attribution && <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'small', aspect), color: colors.text.muted, marginTop: 16, opacity: attrOpacity }}>— {truncate(attribution, 50)}</div>}
        </div>
      </div>
    </div>
  )
}
