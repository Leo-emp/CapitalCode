// # Master composition — assembles scenes + overlays into final video
// # Receives scene plan from AI Director, renders each scene as a Remotion Sequence
import React from 'react'
import { AbsoluteFill, Sequence, Audio } from 'remotion'
import { type AspectMode } from './design/fonts'
import { FilmGrain } from './overlays/FilmGrain'
import { Watermark } from './overlays/Watermark'
import { SCENE_REGISTRY } from './scene-registry'
import { getFontFaces } from './design/load-fonts'

// # Scene directive shape matching AI Director output
export interface SceneDirective {
  sceneType: string
  startFrame: number
  durationFrames: number
  props: Record<string, unknown>
  transition?: string
  sfx?: string
}

export interface MasterCompositionProps {
  scenes: SceneDirective[]
  audioSrc: string
  subtitleSrc: string
  aspect: AspectMode
  showGrain?: boolean
  showWatermark?: boolean
}

export const MasterComposition: React.FC<MasterCompositionProps> = ({
  scenes, audioSrc, aspect, showGrain = true, showWatermark = true,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0A1628' }}>
      {/* # Load fonts via CSS @font-face */}
      <style dangerouslySetInnerHTML={{ __html: getFontFaces() }} />
      {/* # Audio track */}
      {audioSrc && <Audio src={audioSrc} />}

      {/* # Scene sequences */}
      {scenes.map((scene, i) => {
        const Component = SCENE_REGISTRY[scene.sceneType]
        if (!Component) return null // # Unknown scene type — skip safely
        return (
          <Sequence key={i} from={scene.startFrame} durationInFrames={scene.durationFrames} name={`${scene.sceneType}-${i}`}>
            <AbsoluteFill>
              <Component {...scene.props} aspect={aspect} />
            </AbsoluteFill>
          </Sequence>
        )
      })}

      {/* # Global overlays — always on top */}
      {showGrain && <FilmGrain opacity={0.03} />}
      {showWatermark && <Watermark aspect={aspect} />}
    </AbsoluteFill>
  )
}
