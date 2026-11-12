// # CLI: run — every automatic step in order (gates, voice, render, QA, critic check, package), resumable; stops where the director must write
import { COMMANDS, register } from '../cli'
import { doctor, realDeps } from '../doctor'
import { latestJob } from '../jobs'
import { refuse, result } from '../result'
import { jobState, nextAction } from '../run'

register('run', 'run [job] [--on=laptop|aws|github]  — run every automatic step until the director is needed (resume after any crash)', async (a) => {
  const dir = a.find((x) => !x.startsWith('--')) ?? latestJob() ?? refuse('no jobs yet')
  const flags = a.filter((x) => x.startsWith('--'))
  const ran: string[] = []
  let checked = false
  for (let guard = 0; guard < 20; guard++) {
    const next = nextAction(jobState(dir))
    if ('done' in next) return result({ ok: true, job: dir, ran, done: true })
    if ('needs' in next) return result({ ok: true, job: dir, ran, needs: next.needs })
    // # check the machine once, before the first slow or paid step
    if (!checked && ['voice', 'render', 'package'].includes(next.run)) {
      // # --on=github|aws renders in the cloud, so the laptop needs less free disk (owner 2026-11-03: render on GitHub instead of deleting old chunks)
      const d = doctor(realDeps(), { cloud: flags.some((f) => /^--on=(github|aws)$/.test(f)) })
      if (!d.ok) refuse(`doctor: ${d.checks.filter((c) => !c.ok).map((c) => `${c.name} — ${c.fix}`).join('; ')}`)
      checked = true
    }
    if (ran.at(-1) === next.run) refuse(`${next.run} ran but the job did not move on — see its output above`)
    console.log(`\n▶ ${next.run}`)
    // # --on=… reaches the render step only
    await COMMANDS[next.run].run(next.run === 'render' ? [dir, ...flags] : [dir])
    ran.push(next.run)
  }
  refuse('run stopped after 20 steps (loop guard)')
})
