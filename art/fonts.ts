// ============================================================
// BRAND FONTS — loaded once per render tab BEFORE any frame is
// captured. CSS @font-face alone does not make Remotion wait, so a
// tab could capture text in a fallback font (wrong widths → text
// jumping, as in the demo at 13–15 s). Remotion's official
// loadFont() holds the render (delayRender) until each font is in.
// ============================================================
import { loadFont } from '@remotion/fonts'
import { continueRender, delayRender } from 'remotion'
import { FONT_DATA } from './fontData'

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
  // # Each font is built into the bundle and handed to the browser as raw bytes (new FontFace(name, ArrayBuffer)):
  // # no fetch and no URL loader, which hung in some fresh render tabs (2026-10-29); the bytes are parsed in place.
  // # The render waits (delayRender) until every face has parsed, so no frame is captured in a fallback font.
  // # fonts parse in well under a second; a tab that has not finished in 20 s is stuck (seen 2026-10-30: the first
  // # try of almost every chunk hung the full 118 s, the retry rendered fine), so give up early and let Remotion retry the tab
  const wait = delayRender('brand fonts', { timeoutInMilliseconds: 20_000, retries: 2 })
  const created = FONT_FILES.map((f) => {
    const b64 = FONT_DATA[f.file.slice(6, -6)].split(',')[1]
    // # plain loop: Uint8Array.from with a callback is slow on ~1 MB of base64 in a starved tab
    const bin = atob(b64), bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    const face = new FontFace(f.family, bytes.buffer, f.weight ? { weight: f.weight } : {})
    document.fonts.add(face)
    return face
  })
  const faces = created.map((face) => face.loaded)
  // # release the render once, whichever comes first
  let released = false
  const release = () => { if (!released) { released = true; clearInterval(watch); continueRender(wait) } }
  // # watchdog: in a busy tab the `loaded` promises sometimes never settle although every face has parsed
  // # (render stalled 118 s, 2026-10-30) — so also release as soon as each face reports status "loaded"
  const watch = setInterval(() => { if (FONT_FILES.every((_, i) => created[i].status === 'loaded')) release() }, 250)
  Promise.all(faces).then(release, (e) => { console.error('font failed', e); release() })
}
