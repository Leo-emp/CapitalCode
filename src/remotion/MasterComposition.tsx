// # Master composition — assembles scenes + overlays + transitions into final video
// # Receives scene plan from AI Director, renders each scene as a Remotion Sequence
// # Quality upgrade: footage backgrounds, cinematic transitions, vignette, particles, letterbox

import React from 'react'
import { AbsoluteFill, Sequence, Audio, useCurrentFrame, interpolate } from 'remotion'
import { type AspectMode } from './design/fonts'
import { FilmGrain } from './overlays/FilmGrain'
import { Watermark } from './overlays/Watermark'
import { FootageBackground } from './overlays/FootageBackground'
import { Vignette } from './overlays/Vignette'
import { Particles } from './overlays/Particles'
import { Letterbox } from './overlays/Letterbox'
import { SCENE_REGISTRY } from './scene-registry'
import { getFontFaces } from './design/load-fonts'
import { getTransitionComponent, TRANSITION_FRAMES } from './transitions'

// # Scene directive shape matching AI Director output + quality upgrade fields
export interface SceneDirective {
  sceneType: string
  startFrame: number
  durationFrames: number
  props: Record<string, unknown>
  transition?: string
  sfx?: string
  // # Quality upgrade fields
  footageQuery?: string
  illustrationPrompt?: string
  backgroundType?: 'footage' | 'illustration' | 'gradient'
  cinematic?: boolean
  morphFrom?: string
}

export interface MasterCompositionProps {
  scenes: SceneDirective[]
  audioSrc: string
  subtitleSrc: string
  aspect: AspectMode
  showGrain?: boolean
  showWatermark?: boolean
  showParticles?: boolean  // # Enable floating gold particles
  mood?: string            // # Video mood for visual theming
}

// # Helper to determine if a scene has a footage/illustration background
function hasFootage(scene: SceneDirective): boolean {
  return Boolean(scene.props?.footagePath) &&
    (scene.backgroundType === 'footage' || scene.backgroundType === 'illustration')
}

// # Inner component that can use hooks (useCurrentFrame)
const SceneWithOverlays: React.FC<{
  scene: SceneDirective
  aspect: AspectMode
}> = ({ scene, aspect }) => {
  const frame = useCurrentFrame()
  const Component = SCENE_REGISTRY[scene.sceneType]
  if (!Component) return null

  // # Letterbox progress — animate in over first 20 frames of scene
  const letterboxProgress = scene.cinematic
    ? interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })
    : 0

  return (
    <AbsoluteFill>
      {/* # Layer 1: Footage or illustration background (if provided) */}
      {hasFootage(scene) && (
        <FootageBackground
          src={scene.props.footagePath as string}
          type={scene.backgroundType === 'illustration' ? 'image' : 'video'}
          durationFrames={scene.durationFrames}
          brightness={0.35}
          zoomAmount={5}
        />
      )}

      {/* # Layer 2: Scene content (chart, text, stat, etc.) */}
      <Component {...scene.props} aspect={aspect} />

      {/* # Layer 3: Cinematic letterbox bars (on dramatic scenes) */}
      {scene.cinematic && <Letterbox progress={letterboxProgress} />}
    </AbsoluteFill>
  )
}

export const MasterComposition: React.FC<MasterCompositionProps> = ({
  scenes,
  audioSrc,
  aspect,
  showGrain = true,
  showWatermark = true,
  showParticles = true,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0A1628' }}>
      {/* # Load fonts via CSS @font-face */}
      <style dangerouslySetInnerHTML={{ __html: getFontFaces() }} />

      {/* # Audio track (voice + music + SFX, already mixed) */}
      {audioSrc && <Audio src={audioSrc} />}

      {/* # Scene sequences with transitions */}
      {scenes.map((scene, i) => {
        const Component = SCENE_REGISTRY[scene.sceneType]
        if (!Component) return null

        // # Check if this scene overlaps with the next via transition
        const nextScene = i < scenes.length - 1 ? scenes[i + 1] : null
        const hasTransition = nextScene && scene.transition

        return (
          <React.Fragment key={i}>
            {/* # Main scene sequence */}
            <Sequence
              from={scene.startFrame}
              durationInFrames={scene.durationFrames}
              name={`${scene.sceneType}-${i}`}
            >
              <SceneWithOverlays scene={scene} aspect={aspect} />
            </Sequence>

            {/* # Transition overlay — spans the last TRANSITION_FRAMES of current
                and first TRANSITION_FRAMES of next scene */}
            {hasTransition && nextScene && (
              <Sequence
                from={scene.startFrame + scene.durationFrames - TRANSITION_FRAMES}
                durationInFrames={TRANSITION_FRAMES}
                name={`transition-${i}`}
              >
                <TransitionOverlay
                  type={scene.transition ?? 'cross_dissolve'}
                  currentScene={scene}
                  nextScene={nextScene}
                  aspect={aspect}
                />
              </Sequence>
            )}
          </React.Fragment>
        )
      })}

      {/* # Global overlays — always on top of scene content */}
      {showParticles && <Particles count={15} maxOpacity={0.2} speed={0.3} />}
      <Vignette intensity={0.5} />
      {showGrain && <FilmGrain opacity={0.03} />}
      {showWatermark && <Watermark aspect={aspect} />}
    </AbsoluteFill>
  )
}

// # Transition overlay component — renders the transition between two scenes
const TransitionOverlay: React.FC<{
  type: string
  currentScene: SceneDirective
  nextScene: SceneDirective
  aspect: AspectMode
}> = ({ type, currentScene, nextScene, aspect }) => {
  const frame = useCurrentFrame()

  // # Progress 0→1 across the transition duration
  const progress = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const TransitionComponent = getTransitionComponent(type)

  return (
    <TransitionComponent progress={progress}>
      {/* # Outgoing scene (current) */}
      <SceneWithOverlays scene={currentScene} aspect={aspect} />
      {/* # Incoming scene (next) */}
      <SceneWithOverlays scene={nextScene} aspect={aspect} />
    </TransitionComponent>
  )
}
