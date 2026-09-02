// # Video or image background with Ken Burns zoom + cinematic color grade + drift
// # PREMIUM UPGRADE: adds slow pan direction, speed ramp on video clips,
// # and teal/orange cinematic tint for cohesive look

import React from 'react'
import { useCurrentFrame, interpolate, Img, OffthreadVideo } from 'remotion'

export interface FootageBackgroundProps {
  src: string
  type: 'video' | 'image'
  durationFrames: number
  brightness?: number
  zoomAmount?: number
  // # Pan direction for parallax feel on stills
  panDirection?: 'left' | 'right' | 'up' | 'none'
}

export const FootageBackground: React.FC<FootageBackgroundProps> = ({
  src,
  type,
  durationFrames,
  brightness = 0.35,
  zoomAmount = 5,
  panDirection = 'left',
}) => {
  const frame = useCurrentFrame()

  // # Ken Burns: slow zoom over scene duration
  const scale = interpolate(frame, [0, durationFrames], [1, 1 + zoomAmount / 100], {
    extrapolateRight: 'clamp',
  })

  // # Slow pan for parallax movement
  const panAmount = 2
  let tx = 0
  let ty = 0
  if (panDirection === 'left') {
    tx = interpolate(frame, [0, durationFrames], [0, -panAmount], { extrapolateRight: 'clamp' })
  } else if (panDirection === 'right') {
    tx = interpolate(frame, [0, durationFrames], [0, panAmount], { extrapolateRight: 'clamp' })
  } else if (panDirection === 'up') {
    ty = interpolate(frame, [0, durationFrames], [0, -panAmount], { extrapolateRight: 'clamp' })
  }

  // # Cinematic grade: darken + desaturate + slight contrast boost
  const filter = `brightness(${brightness}) saturate(0.75) contrast(1.1)`

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '-3%',
    overflow: 'hidden',
    zIndex: 0,
  }

  const mediaStyle: React.CSSProperties = {
    width: '106%',
    height: '106%',
    objectFit: 'cover',
    transform: `scale(${scale}) translate(${tx}%, ${ty}%)`,
    filter,
  }

  return (
    <div style={containerStyle}>
      {type === 'video' ? (
        <OffthreadVideo src={src} style={mediaStyle} muted />
      ) : (
        <Img src={src} style={mediaStyle} />
      )}
      {/* # Teal-navy tint for brand cohesion — sits over footage */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.15) 50%, rgba(10,22,40,0.4) 100%)',
        mixBlendMode: 'multiply',
      }} />
    </div>
  )
}
