// # Root composition — maps scene directives from AI Director to Remotion components
// # Each scene directive specifies a component name + props + duration in frames
import React from 'react'
import { Composition } from 'remotion'
import { MasterComposition, type MasterCompositionProps } from './MasterComposition'
import { FPS } from './design/animations'

// # Cast to satisfy Remotion's generic Composition typing without Zod schema
const MC = MasterComposition as unknown as React.FC<Record<string, unknown>>

// # Two compositions: landscape (YouTube) and portrait (Shorts/TikTok/Reels)
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CapitalCode-Landscape"
        component={MC}
        durationInFrames={300}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: [],
          audioSrc: '',
          subtitleSrc: '',
          aspect: 'landscape',
          showGrain: true,
          showWatermark: true,
        } satisfies MasterCompositionProps as Record<string, unknown>}
      />
      <Composition
        id="CapitalCode-Portrait"
        component={MC}
        durationInFrames={300}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          scenes: [],
          audioSrc: '',
          subtitleSrc: '',
          aspect: 'portrait',
          showGrain: true,
          showWatermark: true,
        } satisfies MasterCompositionProps as Record<string, unknown>}
      />
    </>
  )
}
