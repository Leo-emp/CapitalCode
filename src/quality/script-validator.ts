// # ============================================================
// # script-validator.ts — Post-generation script quality gate
// # ============================================================
// # After Gemini generates a script, this validator checks it
// # against CapitalCode quality rules and auto-fixes what it
// # can. Only segment count mismatches are fatal errors —
// # everything else gets patched and logged as a "fix".
// # ============================================================

import type { Segment, GeneratedScript } from '@/pipeline/script-generator'
import type { VideoType } from '@/db/schema'
import { containsBannedPhrase, removeBannedPhrases } from './banned-phrases'

// # -----------------------------------------------------------
// # Type definitions for validation results
// # -----------------------------------------------------------

// # Each auto-fix records what was changed and why, so we can
// # log exactly what the validator did to the AI's output
export interface ValidationFix {
  field: string    // # which field was fixed (e.g. "hook", "segments[2].text")
  rule: string     // # which rule triggered (e.g. "banned_phrase", "hook_length")
  original: string // # the value before fixing
  fixed: string    // # the value after fixing
}

// # The full validation result — includes the (possibly modified)
// # script, any auto-fixes applied, and any fatal errors
export interface ValidationResult {
  valid: boolean            // # true if no fatal errors remain
  fixes: ValidationFix[]    // # auto-fixes that were applied
  errors: string[]          // # fatal errors that can't be auto-fixed
  script: GeneratedScript   // # the script (with fixes applied)
}

// # -----------------------------------------------------------
// # Constraints per video type
// # -----------------------------------------------------------
// # These numbers match the prompt rules in script-generator.ts
// # so the validator enforces the same structure Gemini was told
// # to produce. "short_explainer" and "short_data_reveal" share
// # the same constraints — both are short-form content.
interface TypeConstraints {
  segmentCount: number  // # exact number of segments expected
  hookMaxWords: number  // # maximum words allowed in the hook
  wordCountMin: number  // # minimum total word count
  wordCountMax: number  // # maximum total word count
  ctaMaxWords: number   // # maximum words in the call-to-action
}

// # Build the constraints lookup — short types share config
const CONSTRAINTS: Record<VideoType, TypeConstraints> = {
  long_form: {
    segmentCount: 12,
    hookMaxWords: 15,
    wordCountMin: 1500,
    wordCountMax: 2200,
    ctaMaxWords: 20,
  },
  short_explainer: {
    segmentCount: 5,
    hookMaxWords: 10,
    wordCountMin: 150,
    wordCountMax: 250,
    ctaMaxWords: 8,
  },
  short_data_reveal: {
    segmentCount: 5,
    hookMaxWords: 10,
    wordCountMin: 150,
    wordCountMax: 250,
    ctaMaxWords: 8,
  },
}

// # -----------------------------------------------------------
// # Word counting helper
// # -----------------------------------------------------------
// # Splits on whitespace and filters out empty strings to get
// # an accurate word count. Used for hook, CTA, and total checks.
function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

// # -----------------------------------------------------------
// # Individual validation checks
// # -----------------------------------------------------------
// # Each check function mutates the script in-place (for auto-
// # fixes) and pushes to the fixes/errors arrays. This keeps
// # the main validateScript function clean and readable.

// # Check 1: Strip banned phrases from all text fields
function checkBannedPhrases(
  script: GeneratedScript,
  fixes: ValidationFix[],
): void {
  // # Check the hook for slop
  const hookMatch = containsBannedPhrase(script.hook)
  if (hookMatch) {
    const original = script.hook
    script.hook = removeBannedPhrases(script.hook)
    fixes.push({
      field: 'hook',
      rule: 'banned_phrase',
      original,
      fixed: script.hook,
    })
  }

  // # Check the CTA for slop
  const ctaMatch = containsBannedPhrase(script.cta)
  if (ctaMatch) {
    const original = script.cta
    script.cta = removeBannedPhrases(script.cta)
    fixes.push({
      field: 'cta',
      rule: 'banned_phrase',
      original,
      fixed: script.cta,
    })
  }

  // # Check every segment's text for slop
  for (let i = 0; i < script.segments.length; i++) {
    const seg = script.segments[i]
    const segMatch = containsBannedPhrase(seg.text)
    if (segMatch) {
      const original = seg.text
      seg.text = removeBannedPhrases(seg.text)
      fixes.push({
        field: `segments[${i}].text`,
        rule: 'banned_phrase',
        original,
        fixed: seg.text,
      })
    }
  }
}

// # Check 2: Hook must not exceed word limit
function checkHookLength(
  script: GeneratedScript,
  constraints: TypeConstraints,
  fixes: ValidationFix[],
): void {
  const hookWords = countWords(script.hook)

  if (hookWords > constraints.hookMaxWords) {
    const original = script.hook
    // # Auto-fix: truncate to the allowed word count and add ellipsis
    const words = script.hook.split(/\s+/).filter(Boolean)
    script.hook = words.slice(0, constraints.hookMaxWords).join(' ')
    fixes.push({
      field: 'hook',
      rule: 'hook_length',
      original,
      fixed: script.hook,
    })
  }
}

// # Check 3: Segment count must match exactly (FATAL — can't auto-fix)
function checkSegmentCount(
  script: GeneratedScript,
  constraints: TypeConstraints,
  errors: string[],
): void {
  const actual = script.segments.length
  const expected = constraints.segmentCount

  if (actual !== expected) {
    // # This is the one thing we can't auto-fix — the AI needs
    // # to regenerate with the correct structure
    errors.push(
      `Segment count mismatch: expected ${expected}, got ${actual}`
    )
  }
}

// # Check 4: CTA must not exceed word limit
function checkCtaLength(
  script: GeneratedScript,
  constraints: TypeConstraints,
  fixes: ValidationFix[],
): void {
  const ctaWords = countWords(script.cta)

  if (ctaWords > constraints.ctaMaxWords) {
    const original = script.cta
    // # Auto-fix: truncate the CTA to the max allowed words
    const words = script.cta.split(/\s+/).filter(Boolean)
    script.cta = words.slice(0, constraints.ctaMaxWords).join(' ')
    fixes.push({
      field: 'cta',
      rule: 'cta_length',
      original,
      fixed: script.cta,
    })
  }
}

// # Check 5: Data segments must have source citations
function checkMissingCitations(
  script: GeneratedScript,
  fixes: ValidationFix[],
): void {
  for (let i = 0; i < script.segments.length; i++) {
    const seg = script.segments[i]

    // # Only "data" type segments require a citation
    if (seg.type === 'data' && !seg.sourceCitation) {
      // # Auto-fix: add a placeholder citation so downstream
      // # stages know this needs a real source
      seg.sourceCitation = '[Citation needed]'
      fixes.push({
        field: `segments[${i}].sourceCitation`,
        rule: 'missing_citation',
        original: '',
        fixed: '[Citation needed]',
      })
    }
  }
}

// # Check 6: Total word count must be within range
function checkWordCount(
  script: GeneratedScript,
  constraints: TypeConstraints,
  fixes: ValidationFix[],
): void {
  // # Recount words from all segment texts — don't trust the
  // # wordCount field from Gemini, it's often wrong
  const actualWordCount = script.segments.reduce(
    (sum, seg) => sum + countWords(seg.text),
    0
  )

  // # If the reported word count doesn't match the actual count,
  // # fix the field so downstream stages have accurate data
  if (script.wordCount !== actualWordCount) {
    const original = String(script.wordCount)
    script.wordCount = actualWordCount
    fixes.push({
      field: 'wordCount',
      rule: 'word_count_correction',
      original,
      fixed: String(actualWordCount),
    })
  }

  // # Check if the actual count is within the allowed range
  if (actualWordCount < constraints.wordCountMin) {
    fixes.push({
      field: 'wordCount',
      rule: 'word_count_low',
      original: String(actualWordCount),
      fixed: `Below minimum (${constraints.wordCountMin}). Script may need expansion.`,
    })
  }

  if (actualWordCount > constraints.wordCountMax) {
    fixes.push({
      field: 'wordCount',
      rule: 'word_count_high',
      original: String(actualWordCount),
      fixed: `Above maximum (${constraints.wordCountMax}). Script may need trimming.`,
    })
  }
}

// # -----------------------------------------------------------
// # Main validation function
// # -----------------------------------------------------------
// # Runs all checks in order, collects fixes and errors, and
// # returns the (possibly modified) script with a summary.
// # The script is deep-cloned first so the original is not
// # mutated — callers keep their original for comparison.
export function validateScript(
  script: GeneratedScript,
  videoType: VideoType,
): ValidationResult {
  // # Deep clone so we don't mutate the caller's object
  const cloned: GeneratedScript = JSON.parse(JSON.stringify(script))

  const constraints = CONSTRAINTS[videoType]
  const fixes: ValidationFix[] = []
  const errors: string[] = []

  // # Run all checks in a logical order:
  // # 1. Banned phrases first (modifies text that other checks measure)
  checkBannedPhrases(cloned, fixes)

  // # 2. Hook length (after banned phrase removal may have shortened it)
  checkHookLength(cloned, constraints, fixes)

  // # 3. Segment count (fatal check)
  checkSegmentCount(cloned, constraints, errors)

  // # 4. CTA length
  checkCtaLength(cloned, constraints, fixes)

  // # 5. Missing citations on data segments
  checkMissingCitations(cloned, fixes)

  // # 6. Word count accuracy and range
  checkWordCount(cloned, constraints, fixes)

  return {
    // # Valid only if there are zero fatal errors
    valid: errors.length === 0,
    fixes,
    errors,
    script: cloned,
  }
}
