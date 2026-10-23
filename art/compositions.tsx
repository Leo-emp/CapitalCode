// # Every art composition is registered here
import React from 'react'
import { Composition } from 'remotion'
import { LogoReveal, LogoStill } from './logo/LogoReveal'
import { PoseStrip } from './stylebible/Sheets'
import { FPS, H, W } from './tokens'

export const ArtCompositions: React.FC = () => (
  <>
    <Composition id="LogoReveal" component={LogoReveal} durationInFrames={90} fps={FPS} width={W} height={H} />
    <Composition id="LogoStill" component={LogoStill} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="PoseStrip" component={PoseStrip} durationInFrames={1} fps={FPS} width={W} height={H} />
  </>
)
