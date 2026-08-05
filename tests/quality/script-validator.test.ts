import { describe, it, expect } from 'vitest'
import {
  BANNED_PHRASES,
  containsBannedPhrase,
  removeBannedPhrases,
} from '@/quality/banned-phrases'
import { validateScript } from '@/quality/script-validator'
import type { GeneratedScript, Segment } from '@/pipeline/script-generator'
import type { VideoType } from '@/db/schema'

// # ============================================================
// # Test helpers — build scripts with sensible defaults
// # ============================================================

// # Creates a single segment with overridable fields
function makeSegment(overrides: Partial<Segment> = {}): Segment {
  return {
    id: 'seg_1',
    type: 'context',
    text: 'The Federal Reserve raised rates by 25 basis points in Q1 2025.',
    durationHint: 10,
    emphasisWords: ['25 basis points'],
    visualHint: 'chart',
    ...overrides,
  }
}

// # Creates a full script with the specified number of segments.
// # By default builds 12 segments (valid for long_form).
function makeScript(overrides: Partial<GeneratedScript> = {}, segmentCount = 12): GeneratedScript {
  // # Generate segments if not explicitly provided
  const segments = overrides.segments ?? Array.from({ length: segmentCount }, (_, i) =>
    makeSegment({
      id: `seg_${i + 1}`,
      // # Give segment index 2, 4, 6, 9 the "data" type to test citation checks
      type: [2, 4, 6, 9].includes(i) ? 'data' : 'context',
      text: `Segment ${i + 1} provides analysis of economic indicators from Q${(i % 4) + 1} 2025.`,
      sourceCitation: [2, 4, 6, 9].includes(i) ? 'Federal Reserve, 2025' : undefined,
    })
  )

  // # Count words in segments for an accurate wordCount default
  const wordCount = segments.reduce(
    (sum, s) => sum + s.text.split(/\s+/).filter(Boolean).length,
    0
  )

  return {
    title: 'Why the Fed Just Broke the Market',
    hook: 'The Fed just triggered a $2 trillion sell-off.',
    segments,
    cta: 'Subscribe for weekly market analysis.',
    tags: ['fed', 'markets', 'interest-rates'],
    wordCount,
    estimatedDuration: 480,
    ...overrides,
  }
}

// # ============================================================
// # banned-phrases.ts tests
// # ============================================================

describe('BANNED_PHRASES', () => {
  it('contains at least 30 patterns', () => {
    // # The spec requires 30+ slop phrases
    expect(BANNED_PHRASES.length).toBeGreaterThanOrEqual(30)
  })

  it('every entry has a pattern and replacement', () => {
    for (const entry of BANNED_PHRASES) {
      expect(entry.pattern).toBeInstanceOf(RegExp)
      expect(typeof entry.replacement).toBe('string')
    }
  })
})

describe('containsBannedPhrase', () => {
  it('returns null for clean text', () => {
    const result = containsBannedPhrase(
      'The S&P 500 dropped 4.2% in a single trading session.'
    )
    expect(result).toBeNull()
  })

  it('detects "in today\'s video"', () => {
    const result = containsBannedPhrase("In today's video we look at inflation.")
    expect(result).not.toBeNull()
    expect(result!.toLowerCase()).toContain("in today's video")
  })

  it('detects "let\'s dive in" (case insensitive)', () => {
    const result = containsBannedPhrase("Let's Dive In to the data.")
    expect(result).not.toBeNull()
  })

  it('detects "game-changer" with hyphen', () => {
    const result = containsBannedPhrase('This is a game-changer for investors.')
    expect(result).not.toBeNull()
  })

  it('detects "game changer" without hyphen', () => {
    const result = containsBannedPhrase('This is a game changer.')
    expect(result).not.toBeNull()
  })

  it('detects "without further ado"', () => {
    const result = containsBannedPhrase('Without further ado, the numbers.')
    expect(result).not.toBeNull()
  })

  it('detects "buckle up"', () => {
    const result = containsBannedPhrase('Buckle up, this is big.')
    expect(result).not.toBeNull()
  })

  it('detects "stay tuned"', () => {
    const result = containsBannedPhrase('Stay tuned for more updates.')
    expect(result).not.toBeNull()
  })

  it('detects "believe it or not"', () => {
    const result = containsBannedPhrase('Believe it or not, rates went up.')
    expect(result).not.toBeNull()
  })

  it('returns the first match only', () => {
    // # Text with multiple slop phrases — should get the first
    const result = containsBannedPhrase(
      "In today's video, let's dive in and buckle up!"
    )
    expect(result).not.toBeNull()
    // # Should match "in today's video" first since it appears first
    expect(result!.toLowerCase()).toContain("in today's video")
  })
})

describe('removeBannedPhrases', () => {
  it('returns clean text unchanged', () => {
    const clean = 'Markets dropped 3.1% after the Fed announcement.'
    expect(removeBannedPhrases(clean)).toBe(clean)
  })

  it('removes "in today\'s video" completely', () => {
    const result = removeBannedPhrases("In today's video we examine inflation.")
    expect(result).not.toContain("today's video")
    // # Should still contain the substantive part
    expect(result).toContain('examine inflation')
  })

  it('replaces "game-changer" with "significant shift"', () => {
    const result = removeBannedPhrases('This is a game-changer for banks.')
    expect(result).toContain('significant shift')
    expect(result).not.toContain('game-changer')
  })

  it('replaces "mind-blowing" with "remarkable"', () => {
    const result = removeBannedPhrases('The mind-blowing data shows growth.')
    expect(result).toContain('remarkable')
    expect(result).not.toContain('mind-blowing')
  })

  it('replaces "at the end of the day" with "ultimately"', () => {
    const result = removeBannedPhrases('At the end of the day, rates matter.')
    expect(result).toContain('ultimately')
    expect(result).not.toContain('at the end of the day')
  })

  it('removes multiple slop phrases from one string', () => {
    const result = removeBannedPhrases(
      "Let's dive in. Buckle up. Stay tuned for more."
    )
    expect(result).not.toContain('dive in')
    expect(result).not.toContain('Buckle up')
    expect(result).not.toContain('Stay tuned')
  })

  it('collapses double spaces after removal', () => {
    const result = removeBannedPhrases("Let's dive in to the data.")
    // # After removing "let's dive in", shouldn't have double spaces
    expect(result).not.toMatch(/\s{2,}/)
  })

  it('trims leading and trailing whitespace', () => {
    const result = removeBannedPhrases("Buckle up, here are the numbers.")
    expect(result).toBe(result.trim())
  })
})

// # ============================================================
// # script-validator.ts tests
// # ============================================================

describe('validateScript', () => {
  // # --- Clean script passes validation ---
  describe('with a valid script', () => {
    it('returns valid=true with zero errors for a correct long_form script', () => {
      const script = makeScript()
      const result = validateScript(script, 'long_form')

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      // # The returned script should be a copy, not the original
      expect(result.script).not.toBe(script)
    })

    it('returns valid=true for a correct short_explainer script', () => {
      // # 5 segments with short text for short-form word count range
      const script = makeScript({
        hook: 'Rates just hit 5.5%.',
        segments: Array.from({ length: 5 }, (_, i) =>
          makeSegment({
            id: `seg_${i + 1}`,
            type: i === 2 ? 'data' : 'context',
            text: `Short segment ${i + 1} about rates.`,
            sourceCitation: i === 2 ? 'Fed, 2025' : undefined,
          })
        ),
        cta: 'Follow for more.',
        wordCount: 25,
      }, 5)

      const result = validateScript(script, 'short_explainer')
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('returns valid=true for short_data_reveal (same constraints as short_explainer)', () => {
      const script = makeScript({
        hook: 'GDP fell 2.1% overnight.',
        cta: 'Follow now.',
      }, 5)

      const result = validateScript(script, 'short_data_reveal')
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })

  // # --- Banned phrase auto-fix ---
  describe('banned phrase checks', () => {
    it('auto-fixes banned phrases in the hook', () => {
      const script = makeScript({
        hook: "In today's video, the Fed broke a record.",
      })

      const result = validateScript(script, 'long_form')

      // # Should have a fix for the hook
      const hookFix = result.fixes.find(
        f => f.field === 'hook' && f.rule === 'banned_phrase'
      )
      expect(hookFix).toBeDefined()
      expect(hookFix!.original).toContain("today's video")
      // # Fixed version should not contain the slop
      expect(result.script.hook).not.toContain("today's video")
    })

    it('auto-fixes banned phrases in the CTA', () => {
      const script = makeScript({
        cta: "Don't forget to subscribe and stay tuned!",
      })

      const result = validateScript(script, 'long_form')

      const ctaFix = result.fixes.find(
        f => f.field === 'cta' && f.rule === 'banned_phrase'
      )
      expect(ctaFix).toBeDefined()
    })

    it('auto-fixes banned phrases in segment text', () => {
      const segments = Array.from({ length: 12 }, (_, i) =>
        makeSegment({
          id: `seg_${i + 1}`,
          type: 'context',
          // # Inject slop into segment 3
          text: i === 2
            ? "Let's dive in. The data shows a 15% increase."
            : `Clean segment ${i + 1} text here.`,
        })
      )

      const script = makeScript({ segments })
      const result = validateScript(script, 'long_form')

      const segFix = result.fixes.find(
        f => f.field === 'segments[2].text' && f.rule === 'banned_phrase'
      )
      expect(segFix).toBeDefined()
      expect(result.script.segments[2].text).not.toContain('dive in')
    })

    it('does not create fixes when no banned phrases exist', () => {
      const script = makeScript()
      const result = validateScript(script, 'long_form')

      const bannedFixes = result.fixes.filter(f => f.rule === 'banned_phrase')
      expect(bannedFixes).toHaveLength(0)
    })
  })

  // # --- Hook length auto-fix ---
  describe('hook length checks', () => {
    it('truncates a long_form hook exceeding 15 words', () => {
      // # 20-word hook — should be trimmed to 15
      const longHook = 'The Federal Reserve has just made a decision that will impact every single investor in the global market today'
      const script = makeScript({ hook: longHook })

      const result = validateScript(script, 'long_form')

      const hookFix = result.fixes.find(f => f.rule === 'hook_length')
      expect(hookFix).toBeDefined()
      // # Fixed hook should have at most 15 words
      const fixedWordCount = result.script.hook.split(/\s+/).filter(Boolean).length
      expect(fixedWordCount).toBeLessThanOrEqual(15)
    })

    it('truncates a short_explainer hook exceeding 10 words', () => {
      const longHook = 'Interest rates just hit the highest level in over twenty years of history'
      const script = makeScript({ hook: longHook }, 5)

      const result = validateScript(script, 'short_explainer')

      const hookFix = result.fixes.find(f => f.rule === 'hook_length')
      expect(hookFix).toBeDefined()
      const fixedWordCount = result.script.hook.split(/\s+/).filter(Boolean).length
      expect(fixedWordCount).toBeLessThanOrEqual(10)
    })

    it('does not truncate a hook within the limit', () => {
      // # 8 words — well within the 15-word long_form limit
      const script = makeScript({
        hook: 'The Fed just triggered a $2 trillion sell-off.',
      })

      const result = validateScript(script, 'long_form')

      const hookFix = result.fixes.find(f => f.rule === 'hook_length')
      expect(hookFix).toBeUndefined()
    })
  })

  // # --- Segment count (fatal error) ---
  describe('segment count checks', () => {
    it('errors when long_form has wrong segment count', () => {
      // # long_form expects 12 segments, give it 8
      const script = makeScript({}, 8)
      const result = validateScript(script, 'long_form')

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]).toContain('expected 12')
      expect(result.errors[0]).toContain('got 8')
    })

    it('errors when short_explainer has wrong segment count', () => {
      // # short_explainer expects 5 segments, give it 12
      const script = makeScript({}, 12)
      const result = validateScript(script, 'short_explainer')

      expect(result.valid).toBe(false)
      expect(result.errors[0]).toContain('expected 5')
      expect(result.errors[0]).toContain('got 12')
    })

    it('errors when short_data_reveal has wrong segment count', () => {
      const script = makeScript({}, 3)
      const result = validateScript(script, 'short_data_reveal')

      expect(result.valid).toBe(false)
      expect(result.errors[0]).toContain('expected 5')
      expect(result.errors[0]).toContain('got 3')
    })

    it('passes when segment count matches exactly', () => {
      const script = makeScript({}, 12)
      const result = validateScript(script, 'long_form')

      // # Should have no segment count errors
      const segErrors = result.errors.filter(e => e.includes('Segment count'))
      expect(segErrors).toHaveLength(0)
    })
  })

  // # --- CTA length auto-fix ---
  describe('CTA length checks', () => {
    it('truncates a long_form CTA exceeding 20 words', () => {
      const longCta = 'Please subscribe to the channel and hit the bell and share this video with everyone you know and leave a comment about what you think below right now today'
      const script = makeScript({ cta: longCta })

      const result = validateScript(script, 'long_form')

      const ctaFix = result.fixes.find(f => f.rule === 'cta_length')
      expect(ctaFix).toBeDefined()
      const fixedWordCount = result.script.cta.split(/\s+/).filter(Boolean).length
      expect(fixedWordCount).toBeLessThanOrEqual(20)
    })

    it('truncates a short CTA exceeding 8 words', () => {
      const longCta = 'Follow us right now for the latest updates on all market movements daily'
      const script = makeScript({ cta: longCta }, 5)

      const result = validateScript(script, 'short_explainer')

      const ctaFix = result.fixes.find(f => f.rule === 'cta_length')
      expect(ctaFix).toBeDefined()
      const fixedWordCount = result.script.cta.split(/\s+/).filter(Boolean).length
      expect(fixedWordCount).toBeLessThanOrEqual(8)
    })

    it('does not truncate a CTA within the limit', () => {
      const script = makeScript({ cta: 'Subscribe for weekly analysis.' })
      const result = validateScript(script, 'long_form')

      const ctaFix = result.fixes.find(f => f.rule === 'cta_length')
      expect(ctaFix).toBeUndefined()
    })
  })

  // # --- Missing citations auto-fix ---
  describe('citation checks', () => {
    it('adds "[Citation needed]" to data segments without citations', () => {
      const segments = Array.from({ length: 12 }, (_, i) =>
        makeSegment({
          id: `seg_${i + 1}`,
          // # Make segment 4 a "data" type with no citation
          type: i === 3 ? 'data' : 'context',
          sourceCitation: undefined,
        })
      )

      const script = makeScript({ segments })
      const result = validateScript(script, 'long_form')

      const citeFix = result.fixes.find(
        f => f.field === 'segments[3].sourceCitation' && f.rule === 'missing_citation'
      )
      expect(citeFix).toBeDefined()
      expect(result.script.segments[3].sourceCitation).toBe('[Citation needed]')
    })

    it('does not flag data segments that already have citations', () => {
      const segments = Array.from({ length: 12 }, (_, i) =>
        makeSegment({
          id: `seg_${i + 1}`,
          type: i === 3 ? 'data' : 'context',
          sourceCitation: i === 3 ? 'BLS, 2025' : undefined,
        })
      )

      const script = makeScript({ segments })
      const result = validateScript(script, 'long_form')

      const citeFixes = result.fixes.filter(f => f.rule === 'missing_citation')
      expect(citeFixes).toHaveLength(0)
    })

    it('does not flag non-data segments without citations', () => {
      // # "context" segments don't need citations
      const segments = Array.from({ length: 12 }, (_, i) =>
        makeSegment({
          id: `seg_${i + 1}`,
          type: 'context',
          sourceCitation: undefined,
        })
      )

      const script = makeScript({ segments })
      const result = validateScript(script, 'long_form')

      const citeFixes = result.fixes.filter(f => f.rule === 'missing_citation')
      expect(citeFixes).toHaveLength(0)
    })
  })

  // # --- Word count checks ---
  describe('word count checks', () => {
    it('corrects an inaccurate wordCount field', () => {
      // # Set wordCount to a wrong number
      const script = makeScript({ wordCount: 9999 })
      const result = validateScript(script, 'long_form')

      const wcFix = result.fixes.find(f => f.rule === 'word_count_correction')
      expect(wcFix).toBeDefined()
      expect(wcFix!.original).toBe('9999')
      // # The corrected count should match the actual segment text
      expect(result.script.wordCount).not.toBe(9999)
    })

    it('flags word count below minimum', () => {
      // # Create a long_form script with very short segments (below 1500)
      const segments = Array.from({ length: 12 }, (_, i) =>
        makeSegment({
          id: `seg_${i + 1}`,
          type: 'context',
          text: 'Short.', // # 1 word per segment = 12 total (way below 1500)
        })
      )

      const script = makeScript({ segments, wordCount: 12 })
      const result = validateScript(script, 'long_form')

      const lowFix = result.fixes.find(f => f.rule === 'word_count_low')
      expect(lowFix).toBeDefined()
      expect(lowFix!.fixed).toContain('1500')
    })

    it('flags word count above maximum', () => {
      // # Create segments with enough words to exceed 2200
      const longText = Array(200).fill('word').join(' ') // # 200 words per segment
      const segments = Array.from({ length: 12 }, (_, i) =>
        makeSegment({
          id: `seg_${i + 1}`,
          type: 'context',
          text: longText,
        })
      )

      const script = makeScript({ segments, wordCount: 2400 })
      const result = validateScript(script, 'long_form')

      const highFix = result.fixes.find(f => f.rule === 'word_count_high')
      expect(highFix).toBeDefined()
      expect(highFix!.fixed).toContain('2200')
    })

    it('does not flag word count within range', () => {
      // # Build segments that total ~1600 words (within 1500-2200)
      const text133 = Array(133).fill('word').join(' ') // # ~133 words x 12 = ~1596
      const segments = Array.from({ length: 12 }, (_, i) =>
        makeSegment({
          id: `seg_${i + 1}`,
          type: 'context',
          text: text133,
        })
      )

      const script = makeScript({ segments, wordCount: 1596 })
      const result = validateScript(script, 'long_form')

      const rangeFixes = result.fixes.filter(
        f => f.rule === 'word_count_low' || f.rule === 'word_count_high'
      )
      expect(rangeFixes).toHaveLength(0)
    })
  })

  // # --- Deep clone behavior ---
  describe('immutability', () => {
    it('does not mutate the original script object', () => {
      const script = makeScript({
        hook: "In today's video, the Fed broke everything.",
        cta: "Don't forget to subscribe and stay tuned!",
      })

      // # Snapshot the original values
      const originalHook = script.hook
      const originalCta = script.cta

      validateScript(script, 'long_form')

      // # Original should be untouched
      expect(script.hook).toBe(originalHook)
      expect(script.cta).toBe(originalCta)
    })
  })

  // # --- Multiple issues at once ---
  describe('combined issues', () => {
    it('collects fixes from multiple rules in a single pass', () => {
      // # Script with: banned phrase in hook, wrong word count, missing citation
      const segments = Array.from({ length: 12 }, (_, i) =>
        makeSegment({
          id: `seg_${i + 1}`,
          type: i === 3 ? 'data' : 'context',
          text: `Short seg ${i + 1}.`,
          sourceCitation: undefined, // # data segment 3 has no citation
        })
      )

      const script = makeScript({
        hook: "Buckle up, the Fed just did something unprecedented in history.",
        segments,
        wordCount: 9999,
      })

      const result = validateScript(script, 'long_form')

      // # Should have multiple fix types
      const rules = result.fixes.map(f => f.rule)
      expect(rules).toContain('banned_phrase')
      expect(rules).toContain('missing_citation')
      expect(rules).toContain('word_count_correction')
    })

    it('can have both fixes and errors simultaneously', () => {
      // # Wrong segment count (error) + banned phrase (fix)
      const script = makeScript({
        hook: "Let's dive in to inflation data.",
      }, 8) // # Wrong count for long_form

      const result = validateScript(script, 'long_form')

      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.fixes.length).toBeGreaterThan(0)
    })
  })
})
