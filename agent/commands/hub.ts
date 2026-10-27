// # CLI: hub — push a packaged video to the Content Hub, pull the owner's fix notes, show what was sent
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { register } from '../cli'
import { hubConfig, pullFeedback, pushJob } from '../hub'
import { latestJob, readJson } from '../jobs'
import { refuse, result } from '../result'

register('hub', 'hub push [job] | hub pull | hub status [job]  — Content Hub: send the packaged video; bring back fix notes', async (a) => {
  const [sub, job] = a
  if (!hubConfig()) refuse('the hub is not set up (HUB_URL and HUB_TOKEN in .env.local)')
  if (sub === 'push') {
    const dir = job ?? latestJob() ?? refuse('no jobs yet')
    result({ ok: true, ...(await pushJob(dir)) })
  } else if (sub === 'pull') {
    result({ ok: true, ...(await pullFeedback()) })
  } else if (sub === 'status') {
    const dir = job ?? latestJob() ?? refuse('no jobs yet')
    const hub = readJson<{ hub?: object }>(join(dir, 'job.json')).hub ?? null
    const fb = existsSync(join(dir, 'hub_feedback.json')) ? readJson<object[]>(join(dir, 'hub_feedback.json')) : []
    result({ ok: true, hub, feedback: fb.slice(-5) })
  } else refuse('use: hub push [job] | hub pull | hub status [job]')
})
