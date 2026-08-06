// # Safety net — final quality gate before human review
// # Uses Gemini Vision to check rendered frames for visual issues
import { sendAlert } from '@/lib/alert'
import { updateVideoStatus } from '@/db/repo/videos'
import type { PipelineContext } from './orchestrator'

export interface SafetyResult {
  pass: boolean
  reason: string
}

// # Build the Gemini Vision prompt for quality check
export function buildSafetyPrompt(): string {
  return `You are reviewing frames from a professional finance YouTube channel called "CapitalCode".
Rate pass or fail ONLY. Fail if:
- Text is unreadable or cut off
- Colors clash or look unprofessional
- Layout looks amateur or unbalanced
- Empty unused space dominates the frame
- Charts are missing data or labels
- Any visual element overlaps incorrectly

Return JSON: { "pass": true/false, "reason": "brief explanation" }`
}

// # Parse Gemini's response — defaults to fail on malformed input
export function parseSafetyResponse(raw: Record<string, unknown>): SafetyResult {
  return {
    pass: raw.pass === true,
    reason: String(raw.reason ?? 'No reason provided'),
  }
}

// # Pipeline stage — final quality check
export async function safetyNetStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.render?.r2Url) {
    throw new Error('No render URL in context — run renderStage first')
  }

  // # Build the prompt (Vision integration wired in future plan)
  const _prompt = buildSafetyPrompt()

  // # Auto-pass for now — Vision API frame extraction comes in Plan 3
  const result: SafetyResult = { pass: true, reason: 'Auto-pass — Vision check not yet wired' }

  // # Update video status based on quality result
  await updateVideoStatus(ctx.videoId, result.pass ? 'ready_for_review' : 'failed', {
    metadata: JSON.stringify({ qualityCheck: result }),
  })

  // # Always alert — human should review either way
  if (result.pass) {
    await sendAlert('READY', `Video ${ctx.videoId} ready for review (${ctx.videoType})`, [ctx.thumbnail?.url])
  } else {
    await sendAlert('QUALITY_FAIL', `Video ${ctx.videoId} failed safety net: ${result.reason}`, [ctx.thumbnail?.url])
  }

  return { ...ctx, qualityCheck: result }
}
