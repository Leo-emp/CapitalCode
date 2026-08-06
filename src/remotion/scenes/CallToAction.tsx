// # Call to action — subscribe/like prompt at video end
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, transform3dEntry } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'
import { goldGlow } from '../design/effects'

export interface CallToActionProps {
  headline?: string
  subtext?: string
  channelName?: string
  aspect?: AspectMode
}

export const CallToAction: React.FC<CallToActionProps> = ({
  headline = 'Subscribe for more', subtext = '', channelName = 'CapitalCode', aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const headP = spring({ frame, fps, config: springs.elegant })
  const btnP = spring({ frame: frame - 10, fps, config: springs.snappy })
  const subP = spring({ frame: frame - 15, fps, config: springs.smooth })

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={{ ...safeZoneStyle, alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'title', aspect), color: colors.text.primary, textTransform: 'uppercase', opacity: headP, transform: `scale(${0.9 + 0.1 * headP})` }}>{truncate(headline, 40)}</div>
        {/* # Subscribe button */}
        <div style={{ marginTop: 32, padding: '16px 48px', backgroundColor: colors.accent.gold, borderRadius: 8, opacity: btnP, transform: `scale(${0.8 + 0.2 * btnP})` }}>
          <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('body', 'large', aspect), color: colors.bg.primary, textTransform: 'uppercase', letterSpacing: 2 }}>Subscribe</div>
        </div>
        <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'medium', aspect), color: colors.accent.gold, marginTop: 20, opacity: subP }}>{truncate(channelName, 30)}</div>
        {subtext && <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'small', aspect), color: colors.text.muted, marginTop: 12, opacity: subP }}>{truncate(subtext, 80)}</div>}
      </div>
    </div>
  )
}
