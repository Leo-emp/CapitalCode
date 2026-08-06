// # Video or image background with Ken Burns zoom + cinematic color grade
// # Renders behind scene content when AI Director provides footage/illustration
// # Uses OffthreadVideo for video clips, Img for illustrations

import React from 'react'
import { useCurrentFrame, interpolate, Img, OffthreadVideo } from 'remotion'

export interface FootageBackgroundProps {
  src: string               // # Path to video file or image
  type: 'video' | 'image'   // # Whether to use OffthreadVideo or Img
  durationFrames: number     // # Scene duration for Ken Burns calculation
  brightness?: number        // # 0–1, default 0.35 (dark backdrop so text reads)
  zoomAmount?: number        // # Percentage zoom over scene, default 5 (subtle)
}

export const FootageBackground: React.FC<FootageBackgroundProps> = ({
  src,
  type,
  durationFrames,
  brightness = 0.35,
  zoomAmount = 5,
}) => {
  const frame = useCurrentFrame()

  // # Ken Burns: slow zoom from 100% to 100+zoomAmount% over scene duration
  // # Creates subtle motion even on still images
  const scale = interpolate(frame, [0, durationFrames], [1, 1 + zoomAmount / 100], {
    extrapolateRight: 'clamp',
  })

  // # Cinematic grade: darken + desaturate to push footage behind overlaid text
  const filter = `brightness(${brightness}) saturate(0.8)`

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    zIndex: 0,
  }

  const mediaStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: `scale(${scale})`,
    filter,
  }

  return (
    <div style={containerStyle}>
      {/* # Video uses OffthreadVideo (Remotion's optimized video decoder) */}
      {type === 'video' ? (
        <OffthreadVideo src={src} style={mediaStyle} muted />
      ) : (
        <Img src={src} style={mediaStyle} />
      )}
      {/* # Blue tint overlay for cohesive cinematic look */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10, 22, 40, 0.2)',
        mixBlendMode: 'multiply',
      }} />
    </div>
  )
}
