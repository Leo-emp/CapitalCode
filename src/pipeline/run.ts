import { runPipeline } from './orchestrator'
import { topicDiscoveryStage } from './topic-discovery'
import { scriptGeneratorStage } from './script-generator'
import { voiceGeneratorStage } from './voice-generator'
import { pacingEngineStage } from './pacing-engine'

// # CLI entry point — called by GitHub Actions workflow
// # Runs 3 pipelines sequentially: 1 long-form + 2 short-form

const stages = [
  topicDiscoveryStage,
  scriptGeneratorStage,
  voiceGeneratorStage,
  pacingEngineStage,
  // # TODO (Plan 2): audioProcessorStage, aiDirectorStage, svgSlotFillerStage,
  // #   dataFetcherStage, subtitleGeneratorStage, renderStage, thumbnailStage, safetyNetStage
]

const videoTypes = ['long_form', 'short_explainer', 'short_data_reveal'] as const

async function main() {
  console.log(`[CapitalCode] Starting daily pipeline — ${new Date().toISOString()}`)

  for (const videoType of videoTypes) {
    console.log(`[CapitalCode] Running ${videoType} pipeline...`)
    const result = await runPipeline({ topic: '', videoType, stages })

    if (result.error) {
      console.error(`[CapitalCode] ${videoType} FAILED at stage ${result.failedStage}: ${result.error}`)
    } else {
      console.log(`[CapitalCode] ${videoType} complete — video ${result.videoId}`)
    }
  }

  console.log(`[CapitalCode] Pipeline run complete — ${new Date().toISOString()}`)
}

main().catch((err) => {
  console.error('[CapitalCode] Fatal error:', err)
  process.exit(1)
})
