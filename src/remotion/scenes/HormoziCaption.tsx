// # Hormozi caption — bold word-by-word subtitle overlay
// # Used as subtitle style: current word highlighted in gold
import { useCurrentFrame, interpolate } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'

export interface HormoziCaptionProps {
  words: Array<{ text: string; startFrame: number; endFrame: number }>
  aspect?: AspectMode
}

export const HormoziCaption: React.FC<HormoziCaptionProps> = ({ words = [], aspect = 'landscape' }) => {
  const frame = useCurrentFrame()

  // # Find active word group (show ~3 words at a time)
  const activeIdx = words.findIndex((w) => frame >= w.startFrame && frame < w.endFrame)
  if (activeIdx === -1) return null

  // # Show a window of words around the active one
  const windowStart = Math.max(0, activeIdx - 1)
  const windowEnd = Math.min(words.length, activeIdx + 2)
  const windowWords = words.slice(windowStart, windowEnd)

  // # Position at bottom third of screen
  const yPos = aspect === 'landscape' ? '75%' : '70%'

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: yPos, display: 'flex', justifyContent: 'center', gap: 12, zIndex: 100 }}>
      {windowWords.map((word, i) => {
        const globalIdx = windowStart + i
        const isActive = globalIdx === activeIdx
        const opacity = interpolate(frame, [word.startFrame, word.startFrame + 3], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
        return (
          <span key={globalIdx} style={{
            fontFamily: fonts.headline.family,
            fontSize: fontSize('headline', 'subheading', aspect),
            color: isActive ? colors.accent.gold : colors.text.primary,
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            opacity,
            transform: isActive ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.1s',
          }}>
            {word.text}
          </span>
        )
      })}
    </div>
  )
}
