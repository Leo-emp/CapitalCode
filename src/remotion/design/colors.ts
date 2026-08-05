// # CapitalCode visual identity — dark navy + gold accent
// # Used by both Remotion scenes and the dashboard

export const colors = {
  bg: {
    primary: '#0A1628',       // # Deep navy — main background
    secondary: '#0D1B2A',     // # Cards, panels
    tertiary: '#1B2838',      // # Borders, dividers
    gradient: ['#0A1628', '#0D1B2A', '#1A1F2E'] as const,
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',     // # Subdued labels
    muted: '#64748B',         // # Timestamps, metadata
  },
  accent: {
    gold: '#D4A853',          // # Primary emphasis — key numbers, highlights
    goldLight: '#F0D78C',     // # Hover, glow
    goldDark: '#A67C2E',      // # Pressed, shadows
  },
  semantic: {
    positive: '#2ECC71',      // # Gains, growth, up arrows
    negative: '#E74C3C',      // # Losses, decline, down arrows
    neutral: '#3498DB',       // # Info, neutral data
    warning: '#F39C12',       // # Caution, alerts
  },
  // # Multi-series chart palette — ordered by visual distinction
  chart: ['#D4A853', '#3498DB', '#2ECC71', '#E74C3C', '#9B59B6', '#1ABC9C'] as const,
  citation: {
    bg: 'rgba(10, 22, 40, 0.85)',
    text: '#94A3B8',
    border: '#D4A853',
  },
} as const

export type AccentColor = keyof typeof colors.accent
export type SemanticColor = keyof typeof colors.semantic
