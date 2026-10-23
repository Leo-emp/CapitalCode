// ============================================================
// WORDMARK — serif "CapitalCode" in champagne metal, optional
// spaced tagline underneath (banner / brand card only; it is
// unreadable at small sizes).
// ============================================================

import React from 'react'
import { COLORS, FONTS } from '../tokens'

export const TAGLINE = 'INVEST  /  CRYPTO  /  TECH  /  AI  /  ENTREPRENEURSHIP'

export const Wordmark: React.FC<{ height: number; tagline?: boolean; opacity?: number; taglineOpacity?: number }> = ({
  height, tagline = false, opacity = 1, taglineOpacity = 1,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', opacity }}>
    <div style={{
      fontFamily: FONTS.serif, fontSize: height, lineHeight: 1, letterSpacing: height * 0.005,
      background: `linear-gradient(180deg, ${COLORS.champagneLight} 0%, ${COLORS.champagne} 55%, ${COLORS.champagneDark} 100%)`,
      WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
    }}>CapitalCode</div>
    {tagline && (
      <div style={{ marginTop: height * 0.32, fontFamily: 'Inter', fontWeight: 500, fontSize: height * 0.17,
        letterSpacing: height * 0.045, color: COLORS.champagne, opacity: taglineOpacity, whiteSpace: 'pre' }}>{TAGLINE}</div>
    )}
  </div>
)
