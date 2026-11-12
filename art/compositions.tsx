// # Every art composition is registered here
import React from 'react'
import { Composition } from 'remotion'
import { LogoReveal, LogoStill } from './logo/LogoReveal'
import { CastHD, CastLineup, ExpressionsHD, ExpressionStrip, InfoSheet, ThumbSheet, PoseSheet, PoseStrip, PropSheet, PropSheet2, PropSheet3, SceneSheet, SceneSheet2, SceneSheet3, SceneSheet4, SceneSheet5, SceneSheet6, VariantSheet } from './stylebible/Sheets'
import { Thumbnail } from './thumbnails/Thumbnail'
import { ThumbShort, type ShortThumbProps } from './thumbnails/ThumbShort'
import { ThumbLong, type LongThumbProps } from './thumbnails/ThumbLong'
import { DEMO_FRAMES, LibraryDemo } from './stylebible/Demo'
import { CoverStill } from './covers/CoverStill'
import { Banner, BANNER } from './banner/Banner'
import { BannerPick } from './banner/variants'
import { getCover } from './covers/index'
import { SIZE as COVER_SIZE } from './covers/kit'
import { FPS, H, W } from './tokens'
import { Episode, type EpisodeProps, type EpisodeTimeline } from './episode/Episode'
import { DioramaHook, type HookProps } from './diorama/Hook'

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
    {/* # a Short's drawn cover (1080×1920): sticker title, a stake object cut from one frame, a cast close-up */}
    <Composition id="ThumbShort" component={ThumbShort as React.FC<ShortThumbProps>} durationInFrames={1} fps={FPS} width={1080} height={1920}
      defaultProps={{ timeline: EMPTY_TIMELINE, title: [{ t: 'IS $4.99', size: 'm' }, { t: 'REALLY $4?', size: 'l', accent: true }], character: { pose: 'scratchHead', expression: 'thinking' } } as ShortThumbProps} />
    {/* # a long video's thumbnail (1280×720) drawn from the video's own art: panel / banner / stack (2026-11-01 study) */}
    <Composition id="ThumbLong" component={ThumbLong as React.FC<LongThumbProps>} durationInFrames={1} fps={FPS} width={1280} height={720}
      defaultProps={{ timeline: EMPTY_TIMELINE, style: 'panel', words: 'WHY GYMS WANT YOU TO SKIP', accent: [3], crop: { frame: 0, x: 0, y: 0, w: 1920, h: 1080 } } as LongThumbProps} />
    {/* # a custom drawn cover (art/covers): Short 1080×1920 or long 1920×1080, by the cover's canvas */}
    <Composition id="Cover" component={CoverStill as React.FC<{ id: string }>} durationInFrames={1} fps={FPS} width={1080} height={1920} defaultProps={{ id: '' }}
      calculateMetadata={({ props }) => {
        if (!props.id) return {}
        const s = COVER_SIZE[getCover(props.id).canvas]
        return { width: s.w, height: s.h }
      }} />
    {/* # YouTube channel banner 2560×1440 (guides: show the desktop strip + phone safe box) */}
    <Composition id="Banner" component={Banner as React.FC<{ guides?: boolean }>} durationInFrames={1} fps={FPS} width={BANNER.w} height={BANNER.h} defaultProps={{ guides: false }} />
    <Composition id="BannerPick" component={BannerPick as React.FC<{ variant: string; guides?: boolean }>} durationInFrames={1} fps={FPS} width={BANNER.w} height={BANNER.h} defaultProps={{ variant: 'bold', guides: false }} />
    <Composition id="LibraryDemo" component={LibraryDemo} durationInFrames={DEMO_FRAMES} fps={FPS} width={W} height={H} />
    <Composition id="CastHD" component={CastHD} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="ExpressionsHD" component={ExpressionsHD} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet4" component={SceneSheet4} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet5" component={SceneSheet5} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="SceneSheet6" component={SceneSheet6} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="VariantSheet" component={VariantSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="Episode" component={Episode} durationInFrames={90} fps={FPS} width={W} height={H}
      defaultProps={{ timeline: EMPTY_TIMELINE } as EpisodeProps}
      calculateMetadata={({ props }) => ({ durationInFrames: props.timeline.durationInFrames, ...(props.timeline.canvas === 'tall' ? { width: 1080, height: 1920 } : { width: props.width ?? W, height: props.height ?? H }) })} />
    <Composition id="DioramaHook" component={DioramaHook as React.FC<HookProps>} durationInFrames={1040} fps={FPS} width={W} height={H} defaultProps={{ cue: {} } as HookProps} />
    <Composition id="PoseSheet" component={PoseSheet as React.FC<{ page?: number }>} durationInFrames={1} fps={FPS} width={W} height={H} defaultProps={{ page: 0 }} />
    <Composition id="PoseStrip"component={PoseStrip} durationInFrames={1} fps={FPS} width={W} height={H} />
  </>
)
