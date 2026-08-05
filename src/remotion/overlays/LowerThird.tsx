// # Lower third — info bar at bottom of screen
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs } from '../design/animations'
import { truncate } from '../design/safe-zones'

export interface LowerThirdProps {
  title: string
  subtitle?: string
  aspect?: AspectMode
}

export const LowerThird: React.FC<LowerThirdProps> = ({ title, subtitle = '', aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const slideIn = spring({ frame, fps, config: springs.snappy })

  return (
    <div style={{
      position: 'absolute', bottom: 80, left: 80, zIndex: 90,
      transform: `translateX(${(1 - slideIn) * -200}px)`,
      opacity: slideIn,
    }}>
      {/* # Gold accent bar */}
      <div style={{ width: 60, height: 4, backgroundColor: colors.accent.gold, marginBottom: 8 }} />
      <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect) * 0.7, color: colors.text.primary, textTransform: 'uppercase' }}>{truncate(title, 40)}</div>
      {subtitle && <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'small', aspect), color: colors.text.muted, marginTop: 4 }}>{truncate(subtitle, 60)}</div>}
    </div>
  )
}
