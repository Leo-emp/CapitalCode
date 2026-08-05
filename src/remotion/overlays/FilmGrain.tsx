// # Film grain overlay — subtle noise texture for production feel
// # Uses CSS-only approach, no external images needed
import { useCurrentFrame } from 'remotion'

export interface FilmGrainProps {
  opacity?: number // # 0–1, default 0.04 for subtle grain
}

export const FilmGrain: React.FC<FilmGrainProps> = ({ opacity = 0.04 }) => {
  const frame = useCurrentFrame()
  // # Shift background position each frame for grain movement
  const offset = (frame * 7) % 200

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200, pointerEvents: 'none',
      opacity,
      // # SVG noise filter embedded as data URI
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundPosition: `${offset}px ${offset}px`,
      mixBlendMode: 'overlay',
    }} />
  )
}
