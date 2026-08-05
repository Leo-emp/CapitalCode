// # Process steps — numbered sequential steps with connecting lines
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface ProcessStepsProps {
  title: string
  steps?: string[]
  aspect?: AspectMode
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ title, steps = [], aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 40 }}>{truncate(title, 50)}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {steps.slice(0, 6).map((step, i) => {
            const progress = spring({ frame: frame - i * (durations.staggerDelay + 2), fps, config: springs.smooth })
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: progress, transform: `translateX(${(1 - progress) * 30}px)` }}>
                {/* # Step number circle */}
                <div style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.accent.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.headline.family, fontSize: fontSize('data', 'medium', aspect), color: colors.bg.primary, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'medium', aspect), color: colors.text.secondary }}>{truncate(step, 80)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
