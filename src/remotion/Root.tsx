// # Root composition — maps scene directives from AI Director to Remotion components
// # Each scene directive specifies a component name + props + duration in frames
import React from 'react'
import { Composition } from 'remotion'
import { MasterComposition, type MasterCompositionProps } from './MasterComposition'
import { FPS } from './design/animations'

// # Two compositions: landscape (YouTube) and portrait (Shorts/TikTok/Reels)
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CapitalCode-Landscape"
        component={MasterComposition}
        durationInFrames={300} // # Overridden at render time via --props
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: [],
          audioSrc: '',
          subtitleSrc: '',
          aspect: 'landscape' as const,
          showGrain: true,
          showWatermark: true,
        } satisfies MasterCompositionProps}
      />
      <Composition
        id="CapitalCode-Portrait"
        component={MasterComposition}
        durationInFrames={300}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          scenes: [],
          audioSrc: '',
          subtitleSrc: '',
          aspect: 'portrait' as const,
          showGrain: true,
          showWatermark: true,
        } satisfies MasterCompositionProps}
      />
    </>
  )
}
