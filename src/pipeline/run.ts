// # CLI entry point — called by GitHub Actions daily cron
// # Runs 3 pipelines sequentially: 1 long-form + 2 short-form
// # Each pipeline chains 12 stages in order
import { runPipeline } from './orchestrator'
import { topicDiscoveryStage } from './topic-discovery'
import { scriptGeneratorStage } from './script-generator'
import { voiceGeneratorStage } from './voice-generator'
import { pacingEngineStage } from './pacing-engine'
import { audioProcessorStage } from './audio-processor'
import { aiDirectorStage } from './ai-director'
import { dataFetcherStage } from './data-fetcher'
import { svgSlotFillerStage } from './svg-slot-filler'
import { subtitleGeneratorStage } from './subtitle-generator'
import { renderStage } from './render-stage'
import { thumbnailStage } from './thumbnail-stage'
import { safetyNetStage } from './safety-net'
import { illustrationGeneratorStage } from './illustration-generator'
import { footageFetcherStage } from './footage-fetcher'
import { musicMixerStage } from './music-mixer'
import { sfxMixerStage } from './sfx-mixer'
import { sendAlert } from '@/lib/alert'

const stages = [
  topicDiscoveryStage,           // # 1. Pick topic from Gemini
  scriptGeneratorStage,          // # 2. Generate rigid-template script
  voiceGeneratorStage,           // # 3. ElevenLabs TTS + timestamps
  audioProcessorStage,           // # 4. ffmpeg broadcast chain
  pacingEngineStage,             // # 5. Word timestamps → frame-level timing
  aiDirectorStage,               // # 6. Scene plan + footage queries + mood
  illustrationGeneratorStage,    // # 7. AI illustrations (Gemini Imagen)
  footageFetcherStage,           // # 8. Stock footage (Storyblocks/Pexels/Pixabay)
  dataFetcherStage,              // # 9. Fetch real chart data from FRED/Yahoo/etc
  svgSlotFillerStage,            // # 10. Fill SVG template labels via Gemini
  subtitleGeneratorStage,        // # 11. Generate SRT subtitles
  musicMixerStage,               // # 12. Background music (Storyblocks/Pixabay)
  sfxMixerStage,                 // # 13. Sound effects at timestamps
  renderStage,                   // # 14. Remotion render → MP4
  thumbnailStage,                // # 15. Remotion thumbnail → PNG
  safetyNetStage,                // # 16. Gemini Vision quality check
]

const ALL_VIDEO_TYPES = ['long_form', 'short_explainer', 'short_data_reveal'] as const

async function main() {
  console.log(`[CapitalCode] Starting pipeline — ${new Date().toISOString()}`)

  // # Read optional inputs from workflow_dispatch (dashboard or manual trigger)
  const inputTopic = process.env.PIPELINE_TOPIC ?? ''
  const inputType = process.env.PIPELINE_VIDEO_TYPE ?? 'all'

  // # If a specific type was requested, run only that; otherwise run all 3
  const typesToRun = inputType === 'all'
    ? ALL_VIDEO_TYPES
    : ALL_VIDEO_TYPES.filter((t) => t === inputType)

  if (typesToRun.length === 0) {
    console.error(`[CapitalCode] Invalid video type: ${inputType}`)
    process.exit(1)
  }

  console.log(`[CapitalCode] Types: ${typesToRun.join(', ')}${inputTopic ? ` | Topic: ${inputTopic}` : ' | Topic: AI-selected'}`)

  const results = []
  for (const videoType of typesToRun) {
    console.log(`[CapitalCode] Running ${videoType} pipeline...`)
    const result = await runPipeline({ topic: inputTopic, videoType, stages })

    if (result.error) {
      console.error(`[CapitalCode] ${videoType} FAILED at stage ${result.failedStage}: ${result.error}`)
      await sendAlert('PIPELINE_FAIL', `${videoType} failed at stage ${result.failedStage}: ${result.error}`)
    } else {
      console.log(`[CapitalCode] ${videoType} complete — video ${result.videoId}`)
    }
    results.push(result)
  }

  const succeeded = results.filter((r) => !r.error).length
  console.log(`[CapitalCode] Pipeline run complete — ${succeeded}/${results.length} succeeded`)

  if (succeeded > 0) {
    await sendAlert('DAILY_COMPLETE', `${succeeded} videos ready for review`)
  }
}

main().catch(async (err) => {
  console.error('[CapitalCode] Fatal error:', err)
  await sendAlert('FATAL', `Pipeline crashed: ${err.message ?? err}`)
  process.exit(1)
})
