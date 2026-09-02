import { geminiJson } from '@/lib/gemini'
import { createScript } from '@/db/repo/videos'
import type { PipelineContext } from './orchestrator'

export interface Segment {
  id: string
  type: string             // # hook | context | data | insight | comparison | counter | prediction | implication | cta
  text: string
  durationHint: number     // # seconds
  emphasisWords: string[]
  visualHint: string       // # big_stat | chart | flow_diagram | comparison | text_overlay | counter
  sourceCitation?: string  // # e.g. "Federal Reserve, 2025"
  dataNeeds?: string[]     // # e.g. ["fed_funds_rate", "sp500_ytd"]
}

export interface GeneratedScript {
  title: string
  hook: string
  segments: Segment[]
  cta: string
  tags: string[]
  hashtags?: string[]
  wordCount: number
  estimatedDuration: number  // # seconds
}

type Platform = 'youtube_long' | 'tiktok' | 'instagram' | 'youtube_short'

// # Anti-slop rules — Gemini tends to generate these clichés
const ANTI_SLOP = [
  'Do NOT use: "In today\'s video", "Let\'s dive in", "Without further ado"',
  'Do NOT use: "buckle up", "game-changer", "mind-blowing", "stay tuned"',
  'Do NOT use: "here\'s the thing", "the truth is", "believe it or not"',
  'Every claim MUST cite a specific number, source, or date.',
  'Hook must be a bold statement or surprising fact — never a question.',
  'CTA must be exactly 1 sentence. No filler.',
].join('\n')

// # Build the Gemini prompt based on platform format
function buildPrompt(topic: string, platform: Platform): string {
  const isLong = platform === 'youtube_long'
  const segmentCount = isLong ? '12' : '5'
  const duration = isLong ? '8-12 minutes' : '60-90 seconds'
  const wordRange = isLong ? '1500-2200 words' : '150-250 words'

  // # Rigid segment structure for long-form (reverse-engineered from HMW/EE)
  const segmentOrder = isLong
    ? `Segments MUST follow this exact order:
1. hook — surprising stat, ≤15 words, must contain a specific number
2. context — why this matters, cite 1 source
3. data — first chart/number, cite source, include data_needs
4. insight — "here's what most people miss" — contrarian take
5. data — second chart, DIFFERENT chart type than segment 3
6. comparison — A vs B with numbers
7. data — third data point, cite source
8. implication — "what this means for you" — practical
9. counter — "but here's the catch" — nuance, not clickbait
10. data — supporting evidence for counter
11. prediction — forward-looking, based on data trend
12. cta — subscribe, 1 sentence only`
    : `Segments MUST follow this order:
1. hook — one shocking stat, ≤10 words, must have a number
2. context — quick setup, 1-2 sentences max
3. data — the reveal, single dramatic data point
4. insight — the punchline, why this matters
5. cta — follow, ≤5 words`

  return `You are a scriptwriter for "CapitalCode", a faceless finance/tech YouTube channel.
Tone: analytical authority — confident, data-driven, slightly cynical. "Here's what they don't tell you."
Framing rule: ALWAYS connect the topic to the viewer's personal money and investments — their salary, rent, mortgage, savings, retirement, portfolio, grocery bill, or job security. Even macro topics like Fed rates or AI disruption must land on "here's what this costs YOU" or "here's how to position your money." For investing topics, give specific actionable context (which asset classes benefit, what to watch for, historical returns) without being financial advice — use "historically" and "data shows" framing. Viewers share content that feels personal.

Write a ${duration} (${wordRange}) script about: "${topic}"

Rules:
${ANTI_SLOP}

${segmentOrder}

Return as JSON (no markdown fences):
{
  "title": "title with key stat, ≤70 chars",
  "hook": "first sentence — must grab attention immediately",
  "segments": [
    {
      "id": "seg_1",
      "type": "hook|context|data|insight|comparison|counter|prediction|implication|cta",
      "text": "segment narration text (2-4 sentences)",
      "duration_hint": <seconds>,
      "emphasis_words": ["key", "words"],
      "visual_hint": "big_stat|chart|flow_diagram|comparison|text_overlay|counter|quote",
      "source_citation": "Source Name, Year (required for data segments)",
      "data_needs": ["optional_data_source_ids"]
    }
  ],
  "cta": "end call to action (1 sentence)",
  "tags": ["tag1", "tag2", "...15-20 tags"],
  ${!isLong ? '"hashtags": ["#finance", "#money", "...3-5 hashtags"],' : ''}
  "word_count": <total words>,
  "estimated_duration": <total seconds>
}

Generate exactly ${segmentCount} segments.`
}

// # Normalize Gemini's snake_case response to our camelCase types
function normalizeSegment(raw: Record<string, any>, index: number): Segment {
  return {
    id: raw.id ?? `seg_${index + 1}`,
    type: raw.type ?? 'context',
    text: String(raw.text ?? ''),
    durationHint: Number(raw.duration_hint ?? raw.durationHint ?? 10),
    emphasisWords: Array.isArray(raw.emphasis_words ?? raw.emphasisWords)
      ? (raw.emphasis_words ?? raw.emphasisWords)
      : [],
    visualHint: String(raw.visual_hint ?? raw.visualHint ?? 'text_overlay'),
    sourceCitation: raw.source_citation ?? raw.sourceCitation ?? undefined,
    dataNeeds: Array.isArray(raw.data_needs ?? raw.dataNeeds)
      ? (raw.data_needs ?? raw.dataNeeds)
      : undefined,
  }
}

// # Count words in all segments
function countWords(segments: Segment[]): number {
  return segments.reduce((sum, s) => sum + s.text.split(/\s+/).filter(Boolean).length, 0)
}

export async function generateScript(topic: string, platform: Platform): Promise<GeneratedScript> {
  const prompt = buildPrompt(topic, platform)
  const raw = await geminiJson<Record<string, any>>(prompt)

  const segments = Array.isArray(raw.segments)
    ? raw.segments.map((s: Record<string, any>, i: number) => normalizeSegment(s, i))
    : []

  // # Guard against empty scripts
  if (segments.length === 0) {
    throw new Error(`Gemini returned 0 segments for topic: ${topic}`)
  }

  const wordCount = countWords(segments)

  return {
    title: String(raw.title ?? topic),
    hook: String(raw.hook ?? segments[0]?.text ?? ''),
    segments,
    cta: String(raw.cta ?? 'Subscribe for more.'),
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    hashtags: Array.isArray(raw.hashtags) ? raw.hashtags : undefined,
    wordCount,
    estimatedDuration: Number(raw.estimated_duration ?? raw.estimatedDuration ?? Math.round(wordCount / 2.5)),
  }
}

// # Pipeline stage — generates scripts for all platform variants of this video
export async function scriptGeneratorStage(ctx: PipelineContext): Promise<PipelineContext> {
  const { videoId, topic, videoType } = ctx
  const now = Math.floor(Date.now() / 1000)

  // # Long-form generates youtube_long script; short-form generates tiktok + instagram + youtube_short
  const platforms: Platform[] = videoType === 'long_form'
    ? ['youtube_long']
    : ['tiktok', 'instagram', 'youtube_short']

  const generatedScripts: GeneratedScript[] = []

  for (const platform of platforms) {
    const script = await generateScript(topic, platform)
    generatedScripts.push(script)

    // # Persist to DB
    await createScript({
      id: crypto.randomUUID(),
      videoId,
      platform,
      title: script.title,
      hook: script.hook,
      body: script.segments.map((s) => s.text).join('\n\n'),
      segments: JSON.stringify(script.segments),
      wordCount: script.wordCount,
      estimatedDuration: script.estimatedDuration,
      createdAt: now,
    })
  }

  // # Pass the primary script (first variant) to next stages
  return {
    ...ctx,
    scripts: generatedScripts,
    primaryScript: generatedScripts[0],
  }
}
