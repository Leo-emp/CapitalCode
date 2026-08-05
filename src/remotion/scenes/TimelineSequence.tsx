// # Timeline sequence — horizontal or vertical timeline with events
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface TimelineSequenceProps {
  title: string
  events?: Array<{ date: string; label: string }>
  aspect?: AspectMode
}

export const TimelineSequence: React.FC<TimelineSequenceProps> = ({ title, events = [], aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 40 }}>{truncate(title, 50)}</div>
        <div style={{ position: 'relative' }}>
          {/* # Vertical line */}
          <div style={{ position: 'absolute', left: 12, top: 0, bottom: 0, width: 2, backgroundColor: colors.bg.tertiary }} />
          {events.slice(0, 6).map((evt, i) => {
            const progress = spring({ frame: frame - i * (durations.staggerDelay + 2), fps, config: springs.smooth })
            return (
              <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 28, opacity: progress, transform: `translateX(${(1 - progress) * 30}px)` }}>
                {/* # Dot on timeline */}
                <div style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: colors.accent.gold, flexShrink: 0, zIndex: 1, marginTop: 4 }} />
                <div>
                  <div style={{ fontFamily: fonts.data.family, fontSize: fontSize('data', 'small', aspect), color: colors.accent.gold, marginBottom: 4 }}>{truncate(evt.date, 20)}</div>
                  <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'medium', aspect), color: colors.text.secondary }}>{truncate(evt.label, 60)}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
