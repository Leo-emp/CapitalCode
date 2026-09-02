// # Master composition — assembles scenes + overlays + transitions into final video
// # Receives scene plan from AI Director, renders each scene as a Remotion Sequence
// # PREMIUM UPGRADE: camera drift on every scene, bokeh particles, screen shake on impacts,
// # 8 transition types, parallax-ready footage backgrounds

import React from 'react'
import { AbsoluteFill, Sequence, Audio, useCurrentFrame, interpolate } from 'remotion'
import { type AspectMode } from './design/fonts'
import { FilmGrain } from './overlays/FilmGrain'
import { Watermark } from './overlays/Watermark'
import { FootageBackground } from './overlays/FootageBackground'
import { Vignette } from './overlays/Vignette'
import { BokehParticles } from './overlays/BokehParticles'
import { Letterbox } from './overlays/Letterbox'
import { CameraDrift } from './overlays/CameraDrift'
import { ScreenShake } from './overlays/ScreenShake'
import { SCENE_REGISTRY } from './scene-registry'
import { getFontFaces } from './design/load-fonts'
import { getTransitionComponent, TRANSITION_FRAMES } from './transitions'

// # Scene directive shape matching AI Director output
export interface SceneDirective {
  sceneType: string
  startFrame: number
  durationFrames: number
  props: Record<string, unknown>
  transition?: string
  sfx?: string
  footageQuery?: string
  illustrationPrompt?: string
  backgroundType?: 'footage' | 'illustration' | 'gradient'
  cinematic?: boolean
  morphFrom?: string
  // # Premium fields — set by AI Director based on segment context
  impact?: boolean
  sfxCues?: Array<{ frame: number; type: string }>
}

export interface MasterCompositionProps {
  scenes: SceneDirective[]
  audioSrc: string
  subtitleSrc: string
  aspect: AspectMode
  showGrain?: boolean
  showWatermark?: boolean
  showParticles?: boolean
  mood?: string
}

function hasFootage(scene: SceneDirective): boolean {
  return Boolean(scene.props?.footagePath) &&
    (scene.backgroundType === 'footage' || scene.backgroundType === 'illustration')
}

// # Find bass_hit sfx cue frame for screen shake trigger
function findImpactFrame(scene: SceneDirective): number | null {
  if (scene.impact) return 5
  const bassHit = scene.sfxCues?.find((c) => c.type === 'bass_hit')
  return bassHit ? bassHit.frame : null
}

// # Inner component that renders one scene with all its per-scene overlays
const SceneWithOverlays: React.FC<{
  scene: SceneDirective
  sceneIndex: number
  aspect: AspectMode
}> = ({ scene, sceneIndex, aspect }) => {
  const frame = useCurrentFrame()
  const Component = SCENE_REGISTRY[scene.sceneType]
  if (!Component) return null

  const letterboxProgress = scene.cinematic
    ? interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })
    : 0

  const impactFrame = findImpactFrame(scene)

  const content = (
    <AbsoluteFill>
      {/* # Layer 1: Footage or illustration background */}
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

      {/* # Layer 3: Cinematic letterbox bars */}
      {scene.cinematic && <Letterbox progress={letterboxProgress} />}
    </AbsoluteFill>
  )

  // # Wrap in screen shake if this scene has an impact moment
  const withShake = impactFrame !== null ? (
    <ScreenShake triggerFrame={impactFrame} intensity={8} durationFrames={9}>
      {content}
    </ScreenShake>
  ) : content

  // # Wrap everything in camera drift — every scene gets subtle motion
  return (
    <CameraDrift
      durationFrames={scene.durationFrames}
      seed={sceneIndex}
      intensity={2.5}
    >
      {withShake}
    </CameraDrift>
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
      <style dangerouslySetInnerHTML={{ __html: getFontFaces() }} />

      {audioSrc && <Audio src={audioSrc} />}

      {/* # Scene sequences with transitions */}
      {scenes.map((scene, i) => {
        const Component = SCENE_REGISTRY[scene.sceneType]
        if (!Component) return null

        const nextScene = i < scenes.length - 1 ? scenes[i + 1] : null
        const hasTransition = nextScene && scene.transition

        return (
          <React.Fragment key={i}>
            <Sequence
              from={scene.startFrame}
              durationInFrames={scene.durationFrames}
              name={`${scene.sceneType}-${i}`}
            >
              <SceneWithOverlays scene={scene} sceneIndex={i} aspect={aspect} />
            </Sequence>

            {hasTransition && nextScene && (
              <Sequence
                from={scene.startFrame + scene.durationFrames - TRANSITION_FRAMES}
                durationInFrames={TRANSITION_FRAMES}
                name={`transition-${i}`}
              >
                <TransitionOverlay
                  type={scene.transition ?? 'cross_dissolve'}
                  currentScene={scene}
                  currentIndex={i}
                  nextScene={nextScene}
                  nextIndex={i + 1}
                  aspect={aspect}
                />
              </Sequence>
            )}
          </React.Fragment>
        )
      })}

      {/* # Global overlays — always on top, ordered by z-index */}
      {showParticles && <BokehParticles bokehCount={7} dustCount={20} maxOpacity={0.15} />}
      <Vignette intensity={0.5} />
      {showGrain && <FilmGrain opacity={0.03} />}
      {showWatermark && <Watermark aspect={aspect} />}
    </AbsoluteFill>
  )
}

const TransitionOverlay: React.FC<{
  type: string
  currentScene: SceneDirective
  currentIndex: number
  nextScene: SceneDirective
  nextIndex: number
  aspect: AspectMode
}> = ({ type, currentScene, currentIndex, nextScene, nextIndex, aspect }) => {
  const frame = useCurrentFrame()
  const progress = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const TransitionComponent = getTransitionComponent(type)

  return (
    <TransitionComponent progress={progress}>
      <SceneWithOverlays scene={currentScene} sceneIndex={currentIndex} aspect={aspect} />
      <SceneWithOverlays scene={nextScene} sceneIndex={nextIndex} aspect={aspect} />
    </TransitionComponent>
  )
}
