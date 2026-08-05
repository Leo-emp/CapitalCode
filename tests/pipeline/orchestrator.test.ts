import { describe, it, expect, vi } from 'vitest'
import {
  runPipeline,
  type PipelineStage,
} from '@/pipeline/orchestrator'

// # Mock the database — orchestrator tests verify chaining logic, not DB writes
vi.mock('@/db/repo/videos', () => ({
  createVideo: vi.fn().mockResolvedValue({ id: 'vid_test' }),
  updateVideoStatus: vi.fn().mockResolvedValue(undefined),
}))

describe('pipeline orchestrator', () => {
  it('chains stages in order, passing context through', async () => {
    const order: string[] = []

    const stage1: PipelineStage = async (ctx) => {
      order.push('stage1')
      return { ...ctx, stage1Done: true }
    }
    const stage2: PipelineStage = async (ctx) => {
      order.push('stage2')
      return { ...ctx, stage2Done: true }
    }

    const result = await runPipeline({
      topic: 'test topic',
      videoType: 'long_form',
      stages: [stage1, stage2],
    })

    expect(order).toEqual(['stage1', 'stage2'])
    expect(result.context.stage1Done).toBe(true)
    expect(result.context.stage2Done).toBe(true)
  })

  it('retries a failed stage up to 3 times', async () => {
    let attempts = 0
    const flaky: PipelineStage = async (ctx) => {
      attempts++
      if (attempts < 3) throw new Error('transient')
      return { ...ctx, recovered: true }
    }

    const result = await runPipeline({
      topic: 'retry test',
      videoType: 'short_explainer',
      stages: [flaky],
    })

    expect(attempts).toBe(3)
    expect(result.context.recovered).toBe(true)
  })

  it('marks video as failed after 3 retries exhausted', async () => {
    const { updateVideoStatus } = await import('@/db/repo/videos')
    const alwaysFails: PipelineStage = async () => {
      throw new Error('permanent')
    }

    const result = await runPipeline({
      topic: 'fail test',
      videoType: 'long_form',
      stages: [alwaysFails],
    })

    expect(result.error).toBe('permanent')
    expect(updateVideoStatus).toHaveBeenCalledWith(
      expect.any(String),
      'failed',
      expect.any(Object),
    )
  })
})
