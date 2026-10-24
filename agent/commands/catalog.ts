// # CLI: catalog — every scene/prop/pose/expression/cast/slide/sfx id → temp/catalog.md (read it before planning)
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { catalog, catalogMarkdown } from '../catalog'
import { register } from '../cli'
import { sfxAvailable } from '../gates/plan'
import { ROOT } from '../paths'
import { result } from '../result'
import { mkdirSync } from 'node:fs'

register('catalog', 'catalog  — every usable art/slide/sfx id → temp/catalog.md', () => {
  const c = catalog(sfxAvailable())
  mkdirSync(join(ROOT, 'temp'), { recursive: true })
  writeFileSync(join(ROOT, 'temp', 'catalog.md'), catalogMarkdown(c))
  result({ ok: true, scenes: c.scenes.length, props: c.props.length, poses: c.poses.length, slides: c.slides.length, sfx: c.sfx.length, file: 'temp/catalog.md' })
})
