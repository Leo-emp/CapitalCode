// # ============================================================
// # banned-phrases.ts — YouTube slop phrase detection and removal
// # ============================================================
// # AI script generators (Gemini, GPT, etc.) consistently produce
// # the same tired phrases that make videos sound generic. This
// # module maintains a regex-based blocklist and provides two
// # utilities: one to detect slop, one to strip it out.
// # ============================================================

// # Each entry is a regex that matches a slop phrase.
// # - Flags: 'i' for case-insensitive matching
// # - Word boundaries (\b) prevent false positives
// #   e.g. "dive" in "diverse" won't trigger the "dive in" rule
export const BANNED_PHRASES: { pattern: RegExp; replacement: string }[] = [
  // # --- Generic YouTube openers ---
  { pattern: /\bin today'?s video\b/i, replacement: '' },
  { pattern: /\bwelcome back to\b/i, replacement: '' },
  { pattern: /\bhey guys\b/i, replacement: '' },
  { pattern: /\bhey everyone\b/i, replacement: '' },
  { pattern: /\bwhat'?s up guys\b/i, replacement: '' },
  { pattern: /\bwhat'?s going on\b/i, replacement: '' },

  // # --- Filler transitions ---
  { pattern: /\blet'?s dive in\b/i, replacement: '' },
  { pattern: /\blet'?s get into it\b/i, replacement: '' },
  { pattern: /\bwithout further ado\b/i, replacement: '' },
  { pattern: /\bbefore we begin\b/i, replacement: '' },
  { pattern: /\bbefore we get started\b/i, replacement: '' },
  { pattern: /\bso without wasting any time\b/i, replacement: '' },

  // # --- Hype words that add zero information ---
  { pattern: /\bbuckle up\b/i, replacement: '' },
  { pattern: /\bgame[- ]?changer\b/i, replacement: 'significant shift' },
  { pattern: /\bmind[- ]?blowing\b/i, replacement: 'remarkable' },
  { pattern: /\bmind[- ]?boggling\b/i, replacement: 'surprising' },
  { pattern: /\binsane\b/i, replacement: 'extreme' },
  { pattern: /\bcrazy\b/i, replacement: 'unusual' },
  { pattern: /\bliterally\b/i, replacement: '' },

  // # --- Lazy engagement bait ---
  { pattern: /\bstay tuned\b/i, replacement: '' },
  { pattern: /\bsmash that like button\b/i, replacement: '' },
  { pattern: /\bhit that subscribe\b/i, replacement: '' },
  { pattern: /\bdon'?t forget to subscribe\b/i, replacement: '' },
  { pattern: /\bleave a comment below\b/i, replacement: '' },
  { pattern: /\bturn on notifications\b/i, replacement: '' },

  // # --- Empty authority phrases ---
  { pattern: /\bhere'?s the thing\b/i, replacement: '' },
  { pattern: /\bthe truth is\b/i, replacement: '' },
  { pattern: /\bbelieve it or not\b/i, replacement: '' },
  { pattern: /\bit goes without saying\b/i, replacement: '' },
  { pattern: /\bneedless to say\b/i, replacement: '' },
  { pattern: /\bat the end of the day\b/i, replacement: 'ultimately' },

  // # --- Filler closers ---
  { pattern: /\band that'?s it for today\b/i, replacement: '' },
  { pattern: /\bthat'?s all for now\b/i, replacement: '' },
  { pattern: /\buntil next time\b/i, replacement: '' },
  { pattern: /\bsee you in the next one\b/i, replacement: '' },

  // # --- AI-generated fluff ---
  { pattern: /\bin this article\b/i, replacement: '' },
  { pattern: /\bin conclusion\b/i, replacement: '' },
  { pattern: /\blet me explain\b/i, replacement: '' },
  { pattern: /\byou won'?t believe\b/i, replacement: '' },
]

// # -----------------------------------------------------------
// # containsBannedPhrase — checks if any slop exists in text
// # -----------------------------------------------------------
// # Returns the first matched phrase (for error reporting), or
// # null if the text is clean. Useful for validation checks
// # where you need to know WHAT was found, not just true/false.
export function containsBannedPhrase(text: string): string | null {
  for (const { pattern } of BANNED_PHRASES) {
    // # Test the regex against the input text
    const match = text.match(pattern)
    if (match) {
      // # Return the actual matched text so callers can report
      // # which specific phrase triggered the rule
      return match[0]
    }
  }
  // # No slop found — text is clean
  return null
}

// # -----------------------------------------------------------
// # removeBannedPhrases — strips all slop from text
// # -----------------------------------------------------------
// # Replaces each matched phrase with its designated replacement
// # (often empty string, sometimes a better word). Then cleans
// # up leftover double spaces and leading/trailing whitespace.
export function removeBannedPhrases(text: string): string {
  let cleaned = text

  for (const { pattern, replacement } of BANNED_PHRASES) {
    // # Use a global version of the regex so ALL occurrences
    // # in the text get replaced, not just the first one
    const globalPattern = new RegExp(pattern.source, 'gi')
    cleaned = cleaned.replace(globalPattern, replacement)
  }

  // # Clean up artifacts left by removal:
  // # 1. Collapse multiple spaces into one
  // # 2. Remove spaces before punctuation (e.g. " ," -> ",")
  // # 3. Trim leading/trailing whitespace
  cleaned = cleaned
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .trim()

  return cleaned
}
