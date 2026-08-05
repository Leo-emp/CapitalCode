import { createVideo, updateVideoStatus } from '@/db/repo/videos'
import type { VideoType, VideoStatus } from '@/db/schema'

// # Each pipeline stage takes context in, returns enriched context out
export type PipelineContext = Record<string, any> & {
  videoId: string
  topic: string
  videoType: VideoType
}

export type PipelineStage = (ctx: PipelineContext) => Promise<PipelineContext>

export interface PipelineInput {
  topic: string
  videoType: VideoType
  stages: PipelineStage[]
  template?: string                // # Remotion composition name — defaults by videoType
}

export interface PipelineResult {
  videoId: string
  context: PipelineContext
  error?: string
  failedStage?: number
}

const MAX_RETRIES = 3

// # Template selection based on video type — AI Director can override later
function defaultTemplate(type: VideoType): string {
  switch (type) {
    case 'long_form': return 'Explainer'
    case 'short_explainer': return 'ShortExplainer'
    case 'short_data_reveal': return 'ShortDataReveal'
  }
}

// # Run the full pipeline: create video record, chain stages, update status
export async function runPipeline(input: PipelineInput): Promise<PipelineResult> {
  const { topic, videoType, stages, template } = input
  const now = Math.floor(Date.now() / 1000)

  // # Create the video record — all stages reference this ID
  const video = await createVideo({
    id: crypto.randomUUID(),
    topic,
    type: videoType,
    status: 'generating',
    template: template ?? defaultTemplate(videoType),
    createdAt: now,
  })

  let ctx: PipelineContext = { videoId: video.id, topic, videoType }

  // # Chain stages sequentially — each gets the output of the previous
  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i]
    let lastError: Error | null = null

    // # Retry each stage up to MAX_RETRIES on failure
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        ctx = await stage(ctx)
        lastError = null
        break
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err))
        if (attempt < MAX_RETRIES) {
          // # Exponential backoff: 1s, 2s, 4s
          await sleep(1000 * Math.pow(2, attempt - 1))
        }
      }
    }

    // # Stage exhausted all retries — mark video as failed and stop
    if (lastError) {
      await updateVideoStatus(video.id, 'failed', {
        metadata: JSON.stringify({ failedStage: i, error: lastError.message }),
      })
      return { videoId: video.id, context: ctx, error: lastError.message, failedStage: i }
    }
  }

  // # All stages succeeded — mark ready for human review
  await updateVideoStatus(video.id, 'ready_for_review')
  return { videoId: video.id, context: ctx }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
