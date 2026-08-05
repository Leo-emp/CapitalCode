// # Safe zone helpers — ensures content never overlaps video edges
// # All scene components use these to guarantee professional output

import type { CSSProperties } from 'react'

// # 80px padding on all sides — content-safe area
export const SAFE_ZONE = 80

// # Snap any value to 8px grid for consistent spacing
export function snap(value: number): number {
  return Math.round(value / 8) * 8
}

// # CSS for the safe zone wrapper — use inside every scene component
export const safeZoneStyle: CSSProperties = {
  position: 'absolute',
  top: SAFE_ZONE,
  left: SAFE_ZONE,
  right: SAFE_ZONE,
  bottom: SAFE_ZONE,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

// # Auto-truncate text to maxChars with ellipsis — prevents layout breaks
export function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text
  return text.substring(0, maxChars - 3) + '...'
}
