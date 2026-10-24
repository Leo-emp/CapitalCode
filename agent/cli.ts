// ============================================================
// CAPITALCODE AGENT CLI — the hands. Claude Code (the director)
// calls these commands; each validates, does deterministic work,
// and ends with RESULT_JSON. Usage:
//   npx tsx agent/cli.ts <command> [job-dir] [options]
// ============================================================
import { latestJob, loadJob, newJob, nextStep } from './jobs'
import { refuse, result, runCommand } from './result'

type Handler = (args: string[]) => Promise<void> | void
export const COMMANDS: Record<string, { help: string; run: Handler }> = {
  new: {
    help: 'new "<topic>" [--short]  — create a job folder',
    run: (a) => {
      const topic = a.filter((x) => !x.startsWith('--')).join(' ').trim() || refuse('give a topic: new "<topic>"')
      const dir = newJob(topic, { kind: a.includes('--short') ? 'short' : 'long' })
      result({ ok: true, job: dir, next: nextStep(dir) })
    },
  },
  status: {
    help: 'status [job]  — steps done and the next step',
    run: (a) => {
      const dir = a[0] ?? latestJob() ?? refuse('no jobs yet')
      const job = loadJob(dir)
      result({ ok: true, job: dir, topic: job.topic, kind: job.kind, done: Object.keys(job.steps), next: nextStep(dir) })
    },
  },
}

// # Later tasks register more commands here (gate-script, voice, gate-plan, render, …)
export const register = (name: string, help: string, run: Handler) => { COMMANDS[name] = { help, run } }

// # Command modules register themselves on import
const loadCommands = async () => {
  await import('./commands/script')
  await import('./commands/voice')
  await import('./commands/plan')
  await import('./commands/render')
  await import('./commands/qa')
  await import('./commands/package')
  await import('./commands/research')
  await import('./commands/catalog')
  await import('./commands/learn')
  await import('./commands/doctor')
  await import('./commands/run')
  await import('./commands/shorts')
  await import('./commands/stylebible')
}

const main = async () => {
  await loadCommands()
  const [cmd, ...args] = process.argv.slice(2)
  if (!cmd || !COMMANDS[cmd]) {
    console.log('Commands:\n' + Object.values(COMMANDS).map((c) => `  ${c.help}`).join('\n'))
    process.exitCode = cmd ? 1 : 0
    return
  }
  process.exitCode = await runCommand(() => COMMANDS[cmd].run(args))
}

if (process.argv[1] && /cli\.ts$/.test(process.argv[1])) void main()
