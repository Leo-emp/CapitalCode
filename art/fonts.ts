// ============================================================
// BRAND FONTS — loaded once per render tab BEFORE any frame is
// captured. CSS @font-face alone does not make Remotion wait, so a
// tab could capture text in a fallback font (wrong widths → text
// jumping, as in the demo at 13–15 s). Remotion's official
// loadFont() holds the render (delayRender) until each font is in.
// ============================================================
import { loadFont } from '@remotion/fonts'
import { staticFile } from 'remotion'

// # Small static WOFF2 files (Inter's 877 KB variable TTF stalled loading in
// # parallel render tabs). Weights = the ones the art library uses.
export const FONT_FILES: { family: string; file: string; weight?: string }[] = [
  ...[400, 500, 600, 700, 800].map((w) => ({ family: 'Inter', file: `fonts/Inter-${w}.woff2`, weight: String(w) })),
  { family: 'Bebas Neue', file: 'fonts/BebasNeue-Regular.woff2' },
  { family: 'JetBrains Mono', file: 'fonts/JetBrainsMono-Bold.woff2', weight: '700' },
  { family: 'JetBrains Mono', file: 'fonts/JetBrainsMono-Regular.woff2', weight: '400' },
]

let started = false
export const loadBrandFonts = (): void => {
  if (started || typeof document === 'undefined') return
  started = true
  for (const f of FONT_FILES) void loadFont({ family: f.family, url: staticFile(f.file), weight: f.weight, format: 'woff2' })
}
