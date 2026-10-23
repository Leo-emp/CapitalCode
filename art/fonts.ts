// ============================================================
// BRAND FONTS — loaded once per render tab BEFORE any frame is
// captured. CSS @font-face alone does not make Remotion wait, so a
// tab could capture text in a fallback font (wrong widths → text
// jumping, as in the demo at 13–15 s). Remotion's official
// loadFont() holds the render (delayRender) until each font is in.
// ============================================================
import { loadFont } from '@remotion/fonts'
import { staticFile } from 'remotion'

const FILES: { family: string; file: string; weight?: string }[] = [
  { family: 'Inter', file: 'fonts/Inter-Variable.ttf', weight: '100 900' },
  { family: 'Bebas Neue', file: 'fonts/BebasNeue-Regular.ttf' },
  { family: 'JetBrains Mono', file: 'fonts/JetBrainsMono-Bold.ttf', weight: '700' },
  { family: 'JetBrains Mono', file: 'fonts/JetBrainsMono-Regular.ttf', weight: '400' },
]

let started = false
export const loadBrandFonts = (): void => {
  if (started || typeof document === 'undefined') return
  started = true
  for (const f of FILES) void loadFont({ family: f.family, url: staticFile(f.file), weight: f.weight, format: 'truetype' })
}
