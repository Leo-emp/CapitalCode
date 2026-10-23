// ============================================================
// RENDER THE STYLE BIBLE — every review page as a PNG plus the
// library demo video, with render speed (ms per frame).
// Usage: npx tsx scripts/render-style-bible.mts
// Output: output/style-bible/page_NN_<name>.png, demo.mp4
// ============================================================
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const OUT = 'output/style-bible'
const PAGES = ['LogoStill', 'CastLineup', 'ExpressionStrip', 'PoseStrip', 'PropSheet', 'PropSheet2', 'SceneSheet', 'SceneSheet2', 'SceneSheet3', 'InfoSheet', 'ThumbSheet']
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const run = (args: string[]) => execFileSync(npx, ['remotion', ...args, '--port=3177', '--log=error'], { stdio: 'inherit', shell: process.platform === 'win32' })

mkdirSync(OUT, { recursive: true })
PAGES.forEach((id, i) => {
  run(['still', 'art/index.tsx', id, `${OUT}/page_${String(i + 1).padStart(2, '0')}_${id}.png`])
  console.log(`page ${i + 1}/${PAGES.length}: ${id}`)
})
const t0 = Date.now()
run(['render', 'art/index.tsx', 'LibraryDemo', `${OUT}/demo.mp4`])
const secs = (Date.now() - t0) / 1000
const frames = Number(execFileSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', `${OUT}/demo.mp4`]).toString().replace(/[^0-9]/g, ''))
console.log(`RESULT_JSON: ${JSON.stringify({ pages: PAGES.length, demo_frames: frames, render_seconds: Math.round(secs), ms_per_frame: Math.round((secs * 1000) / frames) })}`)
