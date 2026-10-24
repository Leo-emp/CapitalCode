// # CLI: run — every automatic step in order (gates, voice, render, QA, critic check, package), resumable; stops where the director must write
import { COMMANDS, register } from '../cli'
import { doctor, realDeps } from '../doctor'
import { latestJob } from '../jobs'
import { refuse, result } from '../result'
import { jobState, nextAction } from '../run'

register('run', 'run [job]  — run every automatic step until the director is needed (resume after any crash)', async (a) => {
  const dir = a[0] ?? latestJob() ?? refuse('no jobs yet')
  const ran: string[] = []
  let checked = false
  for (let guard = 0; guard < 20; guard++) {
    const next = nextAction(jobState(dir))
    if ('done' in next) return result({ ok: true, job: dir, ran, done: true })
    if ('needs' in next) return result({ ok: true, job: dir, ran, needs: next.needs })
    // # check the machine once, before the first slow or paid step
    if (!checked && ['voice', 'render', 'package'].includes(next.run)) {
      const d = doctor(realDeps())
      if (!d.ok) refuse(`doctor: ${d.checks.filter((c) => !c.ok).map((c) => `${c.name} — ${c.fix}`).join('; ')}`)
      checked = true
    }
    if (ran.at(-1) === next.run) refuse(`${next.run} ran but the job did not move on — see its output above`)
    console.log(`\n▶ ${next.run}`)
    await COMMANDS[next.run].run([dir])
    ran.push(next.run)
  }
  refuse('run stopped after 20 steps (loop guard)')
})
