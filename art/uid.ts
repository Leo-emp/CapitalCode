// ============================================================
// UNIQUE SVG IDS
// Gradients and filters are referenced by id. Two characters in one
// frame must not share "grain" or "jacket" ids, so every instance
// asks for its own.
// ============================================================

import { useId } from 'react'

// # useUid('grain') → "grain-r1a" (React ids contain ':' which SVG url() dislikes)
export const useUid = (prefix: string): string => `${prefix}-${useId().replace(/[^A-Za-z0-9_-]/g, '')}`
