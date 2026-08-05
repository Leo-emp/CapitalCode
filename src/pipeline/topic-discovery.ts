import { geminiJson } from '@/lib/gemini'
import { getRecentTopics, createTopic, markTopicUsed } from '@/db/repo/topics'
import type { TopicCategory } from '@/db/schema'
import type { PipelineContext } from './orchestrator'

export interface DiscoveredTopic {
  topic: string
  category: TopicCategory
  type: 'long_form' | 'short_explainer' | 'short_data_reveal'
  source: 'trending' | 'manual'
}

// # Content pillars with weighted rotation — controls topic mix
const PILLARS = [
  { name: 'AI disruption stories', weight: 25 },
  { name: 'Business model breakdowns', weight: 25 },
  { name: 'Market/economic analysis', weight: 20 },
  { name: 'Fintech/app reviews', weight: 15 },
  { name: 'Wealth psychology', weight: 15 },
]

interface GeminiTopicResponse {
  long_form: { topic: string; category: string }
  shorts: Array<{ topic: string; category: string }>
}

// # Discover 3 topics: 1 long-form + 2 short-form
// # Cross-references recent topics to avoid repeats
export async function discoverTopics(manualTopic?: string): Promise<DiscoveredTopic[]> {
  // # Manual override — skip AI, use the provided topic for all formats
  if (manualTopic) {
    return [
      { topic: manualTopic, category: 'finance', type: 'long_form', source: 'manual' },
      { topic: manualTopic, category: 'finance', type: 'short_explainer', source: 'manual' },
      { topic: manualTopic, category: 'finance', type: 'short_data_reveal', source: 'manual' },
    ]
  }

  // # Get recently used topics to avoid repeats
  const recent = await getRecentTopics(50)
  const recentList = recent.map((t) => t.topic).join(', ')

  const prompt = `You are a content strategist for a faceless finance/tech YouTube channel called "CapitalCode".
The channel has an analytical authority tone — confident, data-driven, slightly cynical.

Content pillars (weighted):
${PILLARS.map((p) => `- ${p.name} (${p.weight}%)`).join('\n')}

Recently covered topics (DO NOT repeat these): ${recentList || 'none yet'}

Pick the most engaging topics for today:
1. ONE long-form topic (8-12 minute explainer) — must have specific data/numbers to cite
2. TWO short-form topics (60-90 second punchy reveals) — must have a single surprising stat

Return as JSON (no markdown fences):
{
  "long_form": { "topic": "...", "category": "finance|fintech|ai_tech|crypto|economics" },
  "shorts": [
    { "topic": "...", "category": "..." },
    { "topic": "...", "category": "..." }
  ]
}`

  const data = await geminiJson<GeminiTopicResponse>(prompt)

  // # Validate category values — fall back to "finance" if Gemini returns garbage
  const validCategories = ['finance', 'fintech', 'ai_tech', 'crypto', 'economics']
  const safeCategory = (c: string): TopicCategory =>
    validCategories.includes(c) ? (c as TopicCategory) : 'finance'

  const results: DiscoveredTopic[] = [
    {
      topic: data.long_form.topic,
      category: safeCategory(data.long_form.category),
      type: 'long_form',
      source: 'trending',
    },
    ...data.shorts.map((s, i) => ({
      topic: s.topic,
      category: safeCategory(s.category),
      type: (i === 0 ? 'short_explainer' : 'short_data_reveal') as DiscoveredTopic['type'],
      source: 'trending' as const,
    })),
  ]

  // # Persist topics in DB for future dedup
  for (const t of results) {
    const row = await createTopic({
      id: crypto.randomUUID(),
      topic: t.topic,
      category: t.category,
      source: t.source,
    })
    await markTopicUsed(row.id)
  }

  return results
}

// # Pipeline stage wrapper — discovers topic and adds to context
export async function topicDiscoveryStage(ctx: PipelineContext): Promise<PipelineContext> {
  const [topic] = await discoverTopics(ctx.manualTopic)
  return {
    ...ctx,
    discoveredTopic: topic,
    topic: topic.topic,           // # Override topic with discovered one
  }
}
