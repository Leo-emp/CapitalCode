// # CLI: voice — synthesises the gated script with Azure (cached per chapter), writes voice.wav + words.json
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { azureSynth } from '../azure'
import { register } from '../cli'
import { isDone, loadJob, markStep, unmarkFrom } from '../jobs'
import { refuse, result } from '../result'
import { voiceJob } from '../voice'
import { fileHash } from './script'

// # The script must be gated, and unchanged since the gate (else re-gate first)
export const checkVoiceReady = (dir: string) => {
  if (!existsSync(join(dir, 'script.json'))) refuse(`script.json missing in ${dir}`)
  if (!isDone(dir, 'gate_script')) refuse('run gate-script first')
  const gated = loadJob(dir).steps.gate_script?.hash
  if (gated !== fileHash(join(dir, 'script.json'))) refuse('script.json changed since gate-script — run gate-script again')
}

register('voice', 'voice <job>  — Azure Andrew HD voice-over (cached), voice.wav + words.json', async (a) => {
  const dir = a[0] ?? refuse('give the job folder')
  checkVoiceReady(dir)
  const r = await voiceJob(dir, { synth: azureSynth() })
  unmarkFrom(dir, 'voice')
  markStep(dir, 'voice', { duration: +r.duration.toFixed(2), words: r.words.length, hash: fileHash(join(dir, 'script.json')) })
  result({ ok: true, duration: +r.duration.toFixed(2), words: r.words.length, next: 'plan' })
})
