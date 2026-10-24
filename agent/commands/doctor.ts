// # CLI: doctor — every precondition of a run in seconds (keys, tools, fonts, sfx, disk, node); refuses on any failure
import { register } from '../cli'
import { doctor, realDeps } from '../doctor'
import { refuse, result } from '../result'

register('doctor', 'doctor  — check keys, ffmpeg, fonts, sfx, disk space and Node before a run', () => {
  const r = doctor(realDeps())
  for (const c of r.checks) console.log(`  ${c.ok ? 'ok ' : 'BAD'} ${c.name}${c.fix ? ` — ${c.fix}` : ''}`)
  if (!r.ok) refuse(`${r.checks.filter((c) => !c.ok).length} check(s) failed`)
  result({ ok: true, checks: r.checks.length })
})
