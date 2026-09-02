// # AI Director — Gemini-powered constrained scene planner
// # Takes script segments + pacing data, outputs a validated scene plan
// # Constrained by: segment-scene map, timing rules, variety enforcement

import { geminiJson } from '@/lib/gemini'
import { SEGMENT_SCENE_MAP, pickSceneType } from '@/quality/segment-scene-map'
import { TIMING_RULES } from '@/quality/timing-rules'
import { validateScenePlan, type SceneDirective } from '@/quality/scene-validator'
import { FEW_SHOT_SCENES } from '@/quality/few-shot-scenes'
import { SCENE_DESCRIPTIONS } from '@/quality/few-shot-descriptions'
import { createScenePlan } from '@/db/repo/scenes'
import type { Segment } from '@/pipeline/script-generator'
import type { PacingData } from '@/pipeline/pacing-engine'
import type { PipelineContext } from './orchestrator'

// # Parsed AI Director response
interface DirectorResult {
  scenes: SceneDirective[]
  thumbnailProps: { stat: string; line1: string; line2: string }
  mood: string  // # Overall video mood for music search
}

// # Build the heavily-constrained Gemini prompt
export function buildDirectorPrompt(
  segments: Segment[],
  pacing: PacingData,
  aspectRatio: 'landscape' | 'portrait'
): string {
  // # Per-segment constraint block showing ALLOWED scene types
  const segmentConstraints = segments.map((seg, i) => {
    const allowed = (SEGMENT_SCENE_MAP as Record<string, readonly string[]>)[seg.type] ?? ['TextOverlay']
    return `  Segment ${i + 1} (${seg.type}, id: ${seg.id}): ALLOWED scene types: [${allowed.join(', ')}]`
  }).join('\n')

  return `You are the AI Director for "CapitalCode", a faceless finance YouTube channel.
Your job: assign ONE Remotion scene component to each script segment.

CONSTRAINTS — YOU MUST FOLLOW THESE:
- Total frames must equal ${pacing.totalFrames} (±30 frames)
- Minimum scene duration: ${TIMING_RULES.minSceneDuration} frames (${(TIMING_RULES.minSceneDuration / 30).toFixed(1)}s)
- Maximum scene duration: ${TIMING_RULES.maxSceneDuration} frames (${(TIMING_RULES.maxSceneDuration / 30).toFixed(1)}s)
- Hook max: ${TIMING_RULES.hookMaxDuration} frames | CTA max: ${TIMING_RULES.ctaMaxDuration} frames
- No 3 consecutive scenes with the same scene type
- No 2 consecutive scenes with the same transition
- Transitions (8 types, each 15 frames, use the RIGHT one for context):
    fade — calm continuation within same topic
    wipe — sequential data progression, timeline steps
    slide — context→data or data→data within same topic
    zoom — dramatic stat reveals, key topic changes
    morph — chart-to-chart data transforms (set morph_from)
    glitch — ONLY for ai_tech category or tech disruption moments
    film_burn — major topic pivots, dramatic emotional shifts
    whip_pan — counter-arguments ("but here's the catch"), pivots
- SFX: max 1 per 60 frames. Types: tick, bass_hit, whoosh
- "impact": set to true on hook segments and any segment with a dramatic stat reveal — triggers screen shake on render
- Aspect ratio: ${aspectRatio} (${aspectRatio === 'landscape' ? '1920×1080' : '1080×1920'})

ALLOWED SCENE TYPES PER SEGMENT:
${segmentConstraints}

${SCENE_DESCRIPTIONS}

${FEW_SHOT_SCENES}

VISUAL BACKGROUND INSTRUCTIONS:
- For each scene, provide a "footage_query" — descriptive stock footage search terms (e.g. "wall street trading floor green screens", "city skyline sunset aerial")
- For context, insight, implication segments: also provide "illustration_prompt" — description for AI-generated illustration (e.g. "abstract visualization of money flowing between global banks")
- Set "cinematic": true on dramatic reveal scenes (hook, key data reveals) to trigger letterbox bars
- Set "morph_from" to the previous scene's scene_type when chart data should visually transform
- Choose a "mood" for the whole video: "tense" | "upbeat" | "neutral" | "dramatic" | "contemplative"

SCRIPT SEGMENTS:
${segments.map((s, i) => `  ${i + 1}. [${s.type}] "${s.text.substring(0, 100)}${s.text.length > 100 ? '...' : ''}" (hint: ${s.visualHint}, citation: ${s.sourceCitation ?? 'none'})`).join('\n')}

Return JSON (no markdown fences):
{
  "scenes": [
    {
      "scene_type": "SceneComponentName",
      "segment_id": "seg_N",
      "duration_frames": <number>,
      "transition": "fade|wipe|slide|zoom|morph|glitch|film_burn|whip_pan",
      "props": { ... scene-specific props ... },
      "sfx_cues": [{ "frame": <number>, "type": "tick|bass_hit|whoosh" }],
      "source_citation": "optional source",
      "footage_query": "descriptive search terms for B-roll",
      "illustration_prompt": "optional, for AI-generated backgrounds",
      "cinematic": false,
      "impact": false,
      "morph_from": null
    }
  ],
  "thumbnail": {
    "stat": "$1.8T",
    "line1": "How Banks Profit",
    "line2": "From Your Deposits"
  },
  "mood": "tense|upbeat|neutral|dramatic|contemplative"
}`
}

// # Normalize Gemini's snake_case response to camelCase
export function parseDirectorResponse(
  raw: Record<string, any>,
  segments: Segment[]
): DirectorResult {
  const rawScenes = Array.isArray(raw.scenes) ? raw.scenes : []

  const scenes: SceneDirective[] = rawScenes.map((s: Record<string, any>, i: number) => {
    const segId = s.segment_id ?? s.segmentId ?? `seg_${i + 1}`
    const matchedSeg = segments.find((seg) => seg.id === segId)

    return {
      sceneType: s.scene_type ?? s.sceneType ?? 'TextOverlay',
      segmentId: segId,
      segmentType: matchedSeg?.type ?? 'context',
      startFrame: 0,
      durationFrames: Number(s.duration_frames ?? s.durationFrames ?? 150),
      transition: s.transition ?? 'fade',
      props: s.props ?? {},
      sfxCues: Array.isArray(s.sfx_cues ?? s.sfxCues)
        ? (s.sfx_cues ?? s.sfxCues).map((c: any) => ({ frame: Number(c.frame), type: String(c.type) }))
        : [],
      sourceCitation: s.source_citation ?? s.sourceCitation ?? matchedSeg?.sourceCitation,
      // # New fields for quality upgrade layers
      footageQuery: s.footage_query ?? s.footageQuery ?? '',
      illustrationPrompt: s.illustration_prompt ?? s.illustrationPrompt ?? '',
      cinematic: Boolean(s.cinematic),
      impact: Boolean(s.impact),
      morphFrom: s.morph_from ?? s.morphFrom ?? undefined,
    }
  })

  return {
    scenes,
    thumbnailProps: {
      stat: String(raw.thumbnail?.stat ?? ''),
      line1: String(raw.thumbnail?.line1 ?? raw.thumbnail?.line_1 ?? ''),
      line2: String(raw.thumbnail?.line2 ?? raw.thumbnail?.line_2 ?? ''),
    },
    mood: String(raw.mood ?? 'neutral'),
  }
}

// # Force scene types to be within the allowed set per segment type
export function constrainSceneTypes(scenes: SceneDirective[]): SceneDirective[] {
  const recentScenes: string[] = []

  return scenes.map((scene) => {
    const allowed = (SEGMENT_SCENE_MAP as Record<string, readonly string[]>)[scene.segmentType] ?? ['TextOverlay']

    let sceneType = scene.sceneType
    if (!allowed.includes(sceneType)) {
      // # Invalid — use variety-enforced picker
      sceneType = pickSceneType(scene.segmentType, recentScenes)
    }

    recentScenes.push(sceneType)
    return { ...scene, sceneType }
  })
}

// # Pipeline stage — generates constrained scene plan via Gemini
export async function aiDirectorStage(ctx: PipelineContext): Promise<PipelineContext> {
  const { primaryScript, pacing, videoId, videoType } = ctx

  if (!primaryScript?.segments) {
    throw new Error('No script in context — run scriptGeneratorStage first')
  }
  if (!pacing) {
    throw new Error('No pacing data in context — run pacingEngineStage first')
  }

  const aspectRatio = videoType === 'long_form' ? 'landscape' : 'portrait'
  const prompt = buildDirectorPrompt(primaryScript.segments, pacing, aspectRatio as 'landscape' | 'portrait')

  // # 1. Get scene plan from Gemini
  const rawResponse = await geminiJson<Record<string, any>>(prompt)
  const parsed = parseDirectorResponse(rawResponse, primaryScript.segments)

  // # 2. Constrain scene types to allowed set (code, not AI)
  const constrained = constrainSceneTypes(parsed.scenes)

  // # 3. Validate full scene plan (duration, variety, SFX density, total frames)
  const validated = validateScenePlan(constrained, pacing.totalFrames)

  // # 4. Store in database
  const scenePlanId = crypto.randomUUID()
  await createScenePlan({
    id: scenePlanId,
    videoId,
    scriptId: ctx.scripts?.[0]?.id ?? videoId,
    sequence: JSON.stringify(validated.scenes),
    aspectRatio,
    totalFrames: pacing.totalFrames,
    fps: 30,
    createdAt: Math.floor(Date.now() / 1000),
  })

  return {
    ...ctx,
    scenePlan: {
      id: scenePlanId,
      videoId,
      scenes: validated.scenes,
      aspectRatio,
      totalFrames: pacing.totalFrames,
      fps: 30,
      thumbnailProps: parsed.thumbnailProps,
      mood: parsed.mood,
    },
  }
}
