// # Flow diagram — boxes with arrows showing process flow
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface FlowDiagramProps {
  title: string
  nodes?: string[]
  aspect?: AspectMode
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ title, nodes = [], aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 40 }}>{truncate(title, 50)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {nodes.slice(0, 6).map((node, i) => {
            const progress = spring({ frame: frame - i * (durations.staggerDelay + 3), fps, config: springs.elegant })
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* # Node box */}
                <div style={{ padding: '16px 24px', border: `2px solid ${colors.accent.gold}`, borderRadius: 8, opacity: progress, transform: `scale(${0.8 + 0.2 * progress})` }}>
                  <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'medium', aspect), color: colors.text.primary, textAlign: 'center' }}>{truncate(node, 30)}</div>
                </div>
                {/* # Arrow between nodes */}
                {i < nodes.length - 1 && i < 5 && (
                  <div style={{ fontFamily: fonts.body.family, fontSize: fontSize('body', 'large', aspect), color: colors.accent.gold, opacity: progress }}>→</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
