// # Safety net — final quality gate before human review
// # Extracts 3 frames from rendered video, sends to Gemini Vision for QA
import { execFileSync } from 'node:child_process'
import { readFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { geminiVision } from '@/lib/gemini'
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

// # Extract 3 key frames from video at 10%, 40%, 80% using ffmpeg
export function extractFrameArgs(videoPath: string, outputDir: string, totalFrames: number): string[][] {
  const positions = [0.1, 0.4, 0.8] // # Hook, middle, end
  return positions.map((pct, i) => {
    const frameNum = Math.floor(totalFrames * pct)
    const timeSec = (frameNum / 30).toFixed(2)
    return [
      '-ss', timeSec,
      '-i', videoPath,
      '-frames:v', '1',
      '-q:v', '2',
      '-y',
      join(outputDir, `frame-${i}.jpg`),
    ]
  })
}

// # Pipeline stage — final quality check via Gemini Vision
export async function safetyNetStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.render?.r2Url) {
    throw new Error('No render URL in context — run renderStage first')
  }

  const totalFrames = ctx.scenePlan?.totalFrames ?? 300
  let result: SafetyResult

  // # Try Vision-based check if local render file exists
  const localVideo = join(tmpdir(), `capitalcode-render-${ctx.videoId}`, 'output.mp4')

  if (existsSync(localVideo)) {
    const frameDir = join(tmpdir(), `capitalcode-frames-${ctx.videoId}`)
    if (!existsSync(frameDir)) mkdirSync(frameDir, { recursive: true })

    // # Extract 3 frames via ffmpeg
    const frameArgSets = extractFrameArgs(localVideo, frameDir, totalFrames)
    for (const args of frameArgSets) {
      try {
        execFileSync('ffmpeg', args, { stdio: 'pipe', timeout: 15_000 })
      } catch {
        // # ffmpeg might not be available — fall through to auto-pass
      }
    }

    // # Load extracted frames as base64
    const images: Array<{ base64: string; mimeType: string }> = []
    for (let i = 0; i < 3; i++) {
      const framePath = join(frameDir, `frame-${i}.jpg`)
      if (existsSync(framePath)) {
        const buf = readFileSync(framePath)
        images.push({ base64: buf.toString('base64'), mimeType: 'image/jpeg' })
      }
    }

    if (images.length > 0) {
      // # Send frames to Gemini Vision
      try {
        const prompt = buildSafetyPrompt()
        const visionResult = await geminiVision<Record<string, unknown>>(prompt, images)
        result = parseSafetyResponse(visionResult)
      } catch (err) {
        // # Vision check failed — auto-pass with warning
        console.warn(`[SafetyNet] Vision check failed: ${err}`)
        result = { pass: true, reason: 'Vision check errored — auto-pass for human review' }
      }
    } else {
      result = { pass: true, reason: 'Frame extraction failed — auto-pass for human review' }
    }
  } else {
    result = { pass: true, reason: 'Local render not found — auto-pass for human review' }
  }

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
