// ============================================================
// CAPITALCODE AGENT CLI — the hands. Claude Code (the director)
// calls these commands; each validates, does deterministic work,
// and ends with RESULT_JSON. Usage:
//   npx tsx agent/cli.ts <command> [job-dir] [options]
// ============================================================
import { copyFileSync, cpSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { latestJob, loadJob, newJob, nextStep } from './jobs'
import { refuse, result, runCommand } from './result'

type Handler = (args: string[]) => Promise<void> | void
export const COMMANDS: Record<string, { help: string; run: Handler }> = {
  new: {
    help: 'new "<topic>" [--short] [--minutes=N] [--from=<long job>]  — create a job folder (--from copies that job’s sourced facts, never its footage)',
    run: (a) => {
      const from = a.find((x) => x.startsWith('--from='))?.slice(7)
      const topic = a.filter((x) => !x.startsWith('--')).join(' ').trim() || refuse('give a topic: new "<topic>"')
      if (from && !existsSync(join(from, 'facts.json'))) refuse(`--from: no facts.json in ${from}`)
      const minutes = Number(a.find((x) => x.startsWith('--minutes='))?.slice(10)) || undefined
      if (minutes !== undefined && (minutes < 3 || minutes > 15)) refuse('--minutes must be between 3 and 15')
      const dir = newJob(topic, { kind: a.includes('--short') ? 'short' : 'long', minutes })
      if (from) {
        copyFileSync(join(from, 'facts.json'), join(dir, 'facts.json'))
        if (existsSync(join(from, 'sources'))) cpSync(join(from, 'sources'), join(dir, 'sources'), { recursive: true })
      }
      result({ ok: true, job: dir, from: from ?? null, next: nextStep(dir) })
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
  await import('./commands/cloud')
  await import('./commands/qa')
  await import('./commands/package')
  await import('./commands/cover')
  await import('./commands/research')
  await import('./commands/catalog')
  await import('./commands/learn')
  await import('./commands/doctor')
  await import('./commands/run')
  await import('./commands/stylebible')
  await import('./commands/archive')
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
