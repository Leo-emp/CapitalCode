// # Every art composition is registered here
import React from 'react'
import { Composition } from 'remotion'
import { LogoReveal, LogoStill } from './logo/LogoReveal'
import { CastHD, CastLineup, ExpressionsHD, ExpressionStrip, InfoSheet, ThumbSheet, PoseStrip, PropSheet, PropSheet2, PropSheet3, SceneSheet, SceneSheet2, SceneSheet3, SceneSheet4, SceneSheet5, SceneSheet6, VariantSheet } from './stylebible/Sheets'
import { Thumbnail } from './thumbnails/Thumbnail'
import { DEMO_FRAMES, LibraryDemo } from './stylebible/Demo'
import { FPS, H, W } from './tokens'
import { Episode, type EpisodeProps, type EpisodeTimeline } from './episode/Episode'
import { SH, Short, type ShortProps, SW } from './episode/Short'

// # Placeholder until the engine passes a real timeline via --props
const EMPTY_TIMELINE: EpisodeTimeline = { fps: FPS, durationInFrames: 90, shots: [{ shot: { id: 'logo', kind: 'brand', start: 0 }, from: 0, to: 90 }], sfx: [] }

export const ArtCompositions: React.FC = () => (
  <>
    <Composition id="LogoReveal" component={LogoReveal} durationInFrames={90} fps={FPS} width={W} height={H} />
    <Composition id="LogoStill" component={LogoStill} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="ExpressionStrip" component={ExpressionStrip} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="CastLineup" component={CastLineup} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="PropSheet" component={PropSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="PropSheet2" component={PropSheet2} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="PropSheet3" component={PropSheet3} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet" component={SceneSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet2" component={SceneSheet2} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet3" component={SceneSheet3} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="InfoSheet" component={InfoSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="ThumbSheet" component={ThumbSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="Thumb" component={Thumbnail} durationInFrames={1} fps={FPS} width={1280} height={720}
      defaultProps={{ layout: 'hero-left' as const, words: 'WHO GETS THE $1M?', accent: [3], tone: 'green' as const, character: { pose: 'think' as const, expression: 'shocked' as const }, prop: 'cash-stack' }} />
    <Composition id="LibraryDemo" component={LibraryDemo} durationInFrames={DEMO_FRAMES} fps={FPS} width={W} height={H} />
    <Composition id="CastHD" component={CastHD} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="ExpressionsHD" component={ExpressionsHD} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet4" component={SceneSheet4} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet5" component={SceneSheet5} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet6" component={SceneSheet6} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="VariantSheet" component={VariantSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="Episode" component={Episode} durationInFrames={90} fps={FPS} width={W} height={H}
      defaultProps={{ timeline: EMPTY_TIMELINE } as EpisodeProps}
      calculateMetadata={({ props }) => ({ durationInFrames: props.timeline.durationInFrames, width: props.width ?? W, height: props.height ?? H })} />
    <Composition id="Short" component={Short} durationInFrames={90} fps={FPS} width={SW} height={SH}
      defaultProps={{ timeline: EMPTY_TIMELINE, captions: [], hook: '' } as ShortProps}
      calculateMetadata={({ props }) => ({ durationInFrames: props.timeline.durationInFrames })} />
    <Composition id="PoseStrip"component={PoseStrip} durationInFrames={1} fps={FPS} width={W} height={H} />
  </>
)
