// # AI illustration generator pipeline stage
// # Generates branded illustrations per scene via Gemini Imagen
// # Fallback: if generation fails, scene uses footage or gradient instead

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { envOr } from '@/lib/env'
import type { PipelineContext } from './orchestrator'

// # Brand style guide injected into every Imagen prompt
// # Ensures all illustrations match CapitalCode visual identity
export const STYLE_GUIDE = [
  'flat vector illustration style',
  'dark navy background (#0A1628)',
  'gold accent color (#D4A853)',
  'financial/business theme',
  'clean lines, minimal detail',
  'no text, no words, no letters, no numbers in the image',
  'professional, modern, corporate aesthetic',
  'subtle gradients, geometric shapes',
].join(', ')

// # Build the full Imagen prompt: scene description + brand style guide
export function buildStylePrompt(sceneDescription: string): string {
  return `${sceneDescription}. Style: ${STYLE_GUIDE}`
}

// # Call Gemini Imagen API to generate an illustration
// # Returns PNG buffer on success, null on any failure
async function generateIllustration(prompt: string): Promise<Buffer | null> {
  const apiKey = envOr('GEMINI_API_KEY', '')
  if (!apiKey) return null

  try {
    // # Imagen 3.0 endpoint for high-quality image generation
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '16:9',
            outputOptions: { mimeType: 'image/png' },
          },
        }),
      }
    )

    if (!res.ok) return null
    const data = await res.json() as { predictions?: Array<{ bytesBase64Encoded: string }> }
    const b64 = data.predictions?.[0]?.bytesBase64Encoded
    if (!b64) return null
    return Buffer.from(b64, 'base64')
  } catch {
    return null // # Graceful fallback — illustration is optional
  }
}

// # Pipeline stage — generates illustrations for scenes that want them
// # AI Director sets illustration_prompt on scenes suited for AI art
export async function illustrationGeneratorStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.scenePlan?.scenes) {
    throw new Error('No scene plan in context — run aiDirectorStage first')
  }

  const workDir = join(tmpdir(), `capitalcode-illust-${ctx.videoId}`)
  if (!existsSync(workDir)) mkdirSync(workDir, { recursive: true })

  const scenes = [...ctx.scenePlan.scenes]

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i]
    // # Only generate for scenes with an illustration prompt from AI Director
    const illustPrompt = scene.props?.illustrationPrompt ?? scene.props?.illustration_prompt ?? ''
    if (!illustPrompt) continue

    const fullPrompt = buildStylePrompt(illustPrompt)
    const imageBuffer = await generateIllustration(fullPrompt)

    if (imageBuffer) {
      const imagePath = join(workDir, `illust-${i}.png`)
      writeFileSync(imagePath, imageBuffer)
      // # Mark this scene as using an illustration background
      scenes[i] = {
        ...scene,
        props: { ...scene.props, footagePath: imagePath, backgroundType: 'illustration' },
      }
    }
    // # If generation fails, scene falls through to footage fetcher or gradient
  }

  return { ...ctx, scenePlan: { ...ctx.scenePlan, scenes } }
}
