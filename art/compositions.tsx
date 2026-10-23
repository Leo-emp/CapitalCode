// # Every art composition is registered here
import React from 'react'
import { Composition } from 'remotion'
import { LogoReveal, LogoStill } from './logo/LogoReveal'
import { CastLineup, ExpressionStrip, PoseStrip, PropSheet, PropSheet2, SceneSheet, SceneSheet2, SceneSheet3 } from './stylebible/Sheets'
import { FPS, H, W } from './tokens'

export const ArtCompositions: React.FC = () => (
  <>
    <Composition id="LogoReveal" component={LogoReveal} durationInFrames={90} fps={FPS} width={W} height={H} />
    <Composition id="LogoStill" component={LogoStill} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="ExpressionStrip" component={ExpressionStrip} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="CastLineup" component={CastLineup} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="PropSheet" component={PropSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="PropSheet2" component={PropSheet2} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet" component={SceneSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet2" component={SceneSheet2} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet3" component={SceneSheet3} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="PoseStrip" component={PoseStrip} durationInFrames={1} fps={FPS} width={W} height={H} />
  </>
)
