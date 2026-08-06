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
import { sendAlert } from '@/lib/alert'

const stages = [
  topicDiscoveryStage,       // # 1. Pick topic from Gemini
  scriptGeneratorStage,      // # 2. Generate rigid-template script
  voiceGeneratorStage,       // # 3. ElevenLabs TTS + timestamps
  audioProcessorStage,       // # 4. ffmpeg broadcast chain
  pacingEngineStage,         // # 5. Word timestamps → frame-level timing
  aiDirectorStage,           // # 6. Gemini picks scenes (constrained by segment-scene map)
  dataFetcherStage,          // # 7. Fetch real chart data from FRED/Yahoo/etc
  svgSlotFillerStage,        // # 8. Fill SVG template labels via Gemini
  subtitleGeneratorStage,    // # 9. Generate SRT subtitles
  renderStage,               // # 10. Remotion render → MP4
  thumbnailStage,            // # 11. Remotion still → PNG
  safetyNetStage,            // # 12. Gemini Vision quality check
]

const videoTypes = ['long_form', 'short_explainer', 'short_data_reveal'] as const

async function main() {
  console.log(`[CapitalCode] Starting daily pipeline — ${new Date().toISOString()}`)

  const results = []
  for (const videoType of videoTypes) {
    console.log(`[CapitalCode] Running ${videoType} pipeline...`)
    const result = await runPipeline({ topic: '', videoType, stages })

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
