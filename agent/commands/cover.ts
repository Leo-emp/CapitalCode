// # CLI: cover — check and render a job's custom drawn covers → <job>/covers/<id>.png, a phone-size copy, and one sheet
import { existsSync, mkdirSync, readdirSync, renameSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import { ff } from '../audio'
import { register } from '../cli'
import { checkCover } from '../gates/cover'
import { renderStills } from '../render'
import { refuse, result } from '../result'
import { COVERS } from '../../art/covers/index'

export const coversFor = (dir: string) => COVERS.filter((c) => c.job === basename(dir))

register('cover', 'cover <job> [--check]  — check + render the job\'s drawn covers (art/covers) to <job>/covers/, with phone-size copies', async (a) => {
  const dir = a.find((x) => !x.startsWith('--')) ?? refuse('give the job folder')
  const list = coversFor(dir)
  if (!list.length) refuse(`no covers for ${basename(dir)} — add a file in art/covers/ and list it in art/covers/index.ts`)
  let bad = 0
  for (const c of list) {
    const { problems } = checkCover(c)
    console.log(`${c.id} (${c.canvas}) — ${c.concept}`)
    for (const p of problems) console.log(`  - ${p}`)
    bad += problems.length
  }
  if (bad) refuse(`covers have ${bad} problem(s)`)
  if (a.includes('--check')) return result({ ok: true, covers: list.map((c) => c.id) })
  const out = join(dir, 'covers')
  mkdirSync(out, { recursive: true })
  const files: string[] = []
  for (const c of list) {
    const [png] = await renderStills('Cover', { id: c.id }, [0], out, c.id)
    // # what a viewer sees on a phone: a Short cover in the shelf ≈ 300 px wide, a long thumbnail in the feed ≈ 480 px wide
    const phone = join(out, `${c.id}_phone.png`)
    ff(['-i', png, '-vf', `scale=${c.canvas === 'tall' ? 300 : 480}:-1`, phone], 'phone preview')
    files.push(png)
  }
  // # one sheet of all covers side by side for review
  const sheet = join(out, 'sheet.png')
  const tall = list[0].canvas === 'tall'
  if (files.length === 1) ff(['-i', files[0], '-vf', tall ? 'scale=540:960' : 'scale=960:540', sheet], 'cover sheet')
  else ff([...files.flatMap((f) => ['-i', f]), '-filter_complex', `${files.map((_, i) => `[${i}:v]scale=${tall ? '540:960' : '960:540'}[v${i}]`).join(';')};${files.map((_, i) => `[v${i}]`).join('')}${tall ? 'hstack' : 'vstack'}=inputs=${files.length}`, sheet], 'cover sheet')
  result({ ok: true, covers: files, sheet })
})

// # re-cover an already packaged video: old thumb_*.jpg move to old_thumbs/ (never deleted), the drawn cover becomes thumb_1.jpg
register('recover', 'recover <cover-id> <output folder>...  — put a drawn cover into packaged output folders (old thumbs → old_thumbs/)', async (a) => {
  const [id, ...folders] = a
  if (!id || !folders.length) refuse('give a cover id and at least one output folder')
  const c = COVERS.find((x) => x.id === id) ?? refuse(`unknown cover "${id}"`)
  const { problems } = checkCover(c)
  if (problems.length) { for (const p of problems) console.log(`  - ${p}`); refuse(`cover ${id} fails the cover gate`) }
  const tmp = join('temp', 'covers-out')
  const [png] = await renderStills('Cover', { id }, [0], tmp, id)
  for (const f of folders) {
    if (!existsSync(f)) refuse(`no folder ${f}`)
    const old = readdirSync(f).filter((n) => /^thumb_\d\.jpg$/.test(n))
    if (old.length) {
      mkdirSync(join(f, 'old_thumbs'), { recursive: true })
      // # a name already in old_thumbs/ gets a dated copy name, so an older thumbnail is never overwritten
      const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '')
      for (const n of old) {
        const to = existsSync(join(f, 'old_thumbs', n)) ? n.replace('.jpg', `_${stamp}.jpg`) : n
        renameSync(join(f, n), join(f, 'old_thumbs', to))
      }
    }
    for (const q of [2, 4, 6, 9]) {
      ff(['-i', png, '-q:v', String(q), join(f, 'thumb_1.jpg')], 'thumbnail jpeg')
      if (statSync(join(f, 'thumb_1.jpg')).size < 1_900_000) break
    }
  }
  result({ ok: true, id, folders: folders.length })
})
