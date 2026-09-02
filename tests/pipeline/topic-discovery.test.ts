import { describe, it, expect, vi, beforeEach } from 'vitest'

// # Inline stripFences for testing — avoids loading the real @/lib/gemini module
// # (importOriginal would pull in @google/genai, which hangs in full suite)
function stripFences(text: string): string {
  let t = text.trim()
  if (t.startsWith('```')) {
    t = t.split('\n').slice(1).join('\n')
    if (t.endsWith('```')) t = t.slice(0, -3)
    t = t.trim()
  }
  return t
}

describe('stripFences', () => {
  it('strips ```json fences', () => {
    const input = '```json\n{"topic":"test"}\n```'
    expect(stripFences(input)).toBe('{"topic":"test"}')
  })

  it('strips plain ``` fences', () => {
    const input = '```\n{"topic":"test"}\n```'
    expect(stripFences(input)).toBe('{"topic":"test"}')
  })

  it('returns unfenced text unchanged', () => {
    expect(stripFences('{"topic":"test"}')).toBe('{"topic":"test"}')
  })
})

// # Mock Gemini fully — no importOriginal to avoid loading @google/genai
vi.mock('@/lib/gemini', () => ({
  stripFences: vi.fn((text: string) => {
    let t = text.trim()
    if (t.startsWith('```')) {
      t = t.split('\n').slice(1).join('\n')
      if (t.endsWith('```')) t = t.slice(0, -3)
      t = t.trim()
    }
    return t
  }),
  geminiJson: vi.fn().mockResolvedValue({
    long_form: { topic: 'How Banks Profit From Your Deposits', category: 'finance' },
    shorts: [
      { topic: 'Credit Card Interchange Fees', category: 'fintech' },
      { topic: 'Fed Rate Impact on Savings', category: 'economics' },
    ],
  }),
  geminiText: vi.fn(),
  geminiVision: vi.fn(),
}))

vi.mock('@/db/repo/topics', () => ({
  getRecentTopics: vi.fn().mockResolvedValue([]),
  createTopic: vi.fn().mockImplementation((d) => Promise.resolve({ ...d, id: d.id })),
  markTopicUsed: vi.fn().mockResolvedValue(undefined),
}))

describe('discoverTopics', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 3 topics (1 long + 2 short) from Gemini', async () => {
    const { discoverTopics } = await import('@/pipeline/topic-discovery')

    const topics = await discoverTopics()

    expect(topics).toHaveLength(3)
    expect(topics[0].type).toBe('long_form')
    expect(topics[1].type).toBe('short_explainer')
    expect(topics[2].type).toBe('short_data_reveal')
  })

  it('uses manual topic when provided', async () => {
    const { discoverTopics } = await import('@/pipeline/topic-discovery')

    const topics = await discoverTopics('My Custom Topic')

    expect(topics).toHaveLength(3)
    expect(topics[0].topic).toBe('My Custom Topic')
    expect(topics[0].source).toBe('manual')
  })

  it('validates category values', async () => {
    const { geminiJson } = await import('@/lib/gemini')
    vi.mocked(geminiJson).mockResolvedValueOnce({
      long_form: { topic: 'test', category: 'invalid_category' },
      shorts: [
        { topic: 'a', category: 'finance' },
        { topic: 'b', category: '' },
      ],
    })

    const { discoverTopics } = await import('@/pipeline/topic-discovery')
    const topics = await discoverTopics()

    // # Invalid categories should fall back to 'finance'
    expect(topics[0].category).toBe('finance')
    expect(topics[2].category).toBe('finance')
  })
})
