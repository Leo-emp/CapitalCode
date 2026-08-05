// # Watermark overlay — channel branding in corner
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'

export interface WatermarkProps {
  text?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  aspect?: AspectMode
}

export const Watermark: React.FC<WatermarkProps> = ({ text = 'CapitalCode', position = 'bottom-right', aspect = 'landscape' }) => {
  const posStyle: Record<string, string | number> = { position: 'absolute', zIndex: 150 }

  // # Map position to CSS
  if (position.includes('top')) posStyle.top = 40
  if (position.includes('bottom')) posStyle.bottom = 40
  if (position.includes('left')) posStyle.left = 40
  if (position.includes('right')) posStyle.right = 40

  return (
    <div style={posStyle as React.CSSProperties}>
      <div style={{
        fontFamily: fonts.headline.family,
        fontSize: fontSize('body', 'small', aspect) * 0.9,
        color: colors.text.primary,
        opacity: 0.3,
        textTransform: 'uppercase',
        letterSpacing: 2,
      }}>
        {text}
      </div>
    </div>
  )
}
