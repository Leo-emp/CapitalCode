// # Three font families: headlines (impact), body (readable), data (monospace)
// # Sizes differ between landscape (16:9) and portrait (9:16) compositions

export const fonts = {
  headline: {
    family: 'Bebas Neue',
    weights: [400] as const,   // # Bebas Neue only has regular (looks bold by design)
    style: 'uppercase' as const,
    sizes: {
      landscape: { hero: 96, heading: 72, subheading: 48 },
      portrait: { hero: 72, heading: 56, subheading: 36 },
    },
  },
  body: {
    family: 'Inter',
    weights: [400, 500, 600, 700] as const,
    sizes: {
      landscape: { large: 36, medium: 28, small: 22 },
      portrait: { large: 28, medium: 22, small: 18 },
    },
  },
  data: {
    family: 'JetBrains Mono',
    weights: [400, 700] as const,
    style: 'tabular-nums' as const,  // # Fixed-width digits for animated counters
    sizes: {
      landscape: { large: 48, medium: 32, small: 24 },
      portrait: { large: 36, medium: 28, small: 20 },
    },
  },
} as const

export type AspectMode = 'landscape' | 'portrait'

// # Helper to get font size by aspect ratio
export function fontSize(
  font: keyof typeof fonts,
  size: string,
  mode: AspectMode
): number {
  const f = fonts[font]
  return (f.sizes[mode] as Record<string, number>)[size] ?? 28
}
