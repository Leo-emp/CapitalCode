// ============================================================
// AZURE SYNTH — Andrew Dragon HD, plain reading. Writes a 24 kHz
// mono wav and returns word timings with each word's character
// offset in the ORIGINAL text (SSML escaping is mapped back).
// The key is read from .env.local and never printed.
// ============================================================
import { existsSync, readFileSync } from 'node:fs'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { ENV_FILE } from './paths'
import { VOICE, type Synth, type SynthWord } from './voice'

// # Read KEY=VALUE pairs from .env.local (no printing, no logging)
export const readEnv = (file = ENV_FILE): Record<string, string> => {
  if (!existsSync(file)) return {}
  const out: Record<string, string> = {}
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return out
}

// # Escape text for SSML and keep a map: escaped index → original index
export const escapeWithMap = (text: string): { xml: string; back: number[] } => {
  const ents: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
  let xml = ''
  const back: number[] = []
  for (let i = 0; i < text.length; i++) {
    const piece = ents[text[i]] ?? text[i]
    for (let k = 0; k < piece.length; k++) back.push(i)
    xml += piece
  }
  back.push(text.length)
  return { xml, back }
}

// # Pin each word event to a real token of `text`: the nearest token start at or
// # after the previous one (Azure's offsets drift ±1 around entities/numbers).
// # Skipped tokens are jumped over; extra events past the end are dropped.
export const snapWords = (text: string, events: { at: number; s: number; e: number }[]): SynthWord[] => {
  const tokens = [...text.matchAll(/\S+/g)].map((m) => ({ start: m.index!, w: m[0].replace(/^["“(]+|[.,!?;:"”)]+$/g, '') }))
  const out: SynthWord[] = []
  let from = 0
  for (const ev of events) {
    let best = -1
    for (let i = from; i < tokens.length; i++) {
      if (best < 0 || Math.abs(tokens[i].start - ev.at) < Math.abs(tokens[best].start - ev.at)) best = i
      if (tokens[i].start > ev.at) break
    }
    if (best < 0) break
    out.push({ w: tokens[best].w, s: ev.s, e: ev.e, offset: tokens[best].start })
    from = best + 1
  }
  return out
}

export const azureSynth =(opts: { voice?: string; retries?: number } = {}): Synth => {
  const env = { ...readEnv(), ...process.env }
  const key = env.AZURE_SPEECH_KEY, region = env.AZURE_SPEECH_REGION
  if (!key || !region) throw new Error('AZURE_SPEECH_KEY / AZURE_SPEECH_REGION missing from .env.local')
  const voice = opts.voice ?? VOICE

  const once = (text: string, outWav: string) => new Promise<{ words: SynthWord[] }>((resolve, reject) => {
    const cfg = sdk.SpeechConfig.fromSubscription(key, region)
    cfg.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm
    cfg.setProperty(sdk.PropertyId.SpeechServiceResponse_RequestSentenceBoundary, 'false')
    const synth = new sdk.SpeechSynthesizer(cfg, sdk.AudioConfig.fromAudioFileOutput(outWav))
    const { xml } = escapeWithMap(text)
    const head = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="${voice}">`
    const ssml = `${head}${xml}</voice></speak>`
    const events: { at: number; s: number; e: number }[] = []
    // # textOffset minus the SSML head ≈ index into `text` (drifts ±1 near entities/numbers;
    // # snapWords pins it to the real token, and the word text comes from `text`, not the SDK)
    synth.wordBoundary = (_s, e) => {
      if (e.boundaryType !== sdk.SpeechSynthesisBoundaryType.Word) return
      const s = e.audioOffset / 1e7
      events.push({ at: e.textOffset - head.length, s: +s.toFixed(3), e: +(s + e.duration / 1e7).toFixed(3) })
    }
    synth.speakSsmlAsync(ssml, (r) => {
      synth.close()
      if (r.reason === sdk.ResultReason.SynthesizingAudioCompleted) resolve({ words: snapWords(text, events.filter((x) => x.at >= 0)) })
      else reject(new Error(`azure synth failed: ${sdk.ResultReason[r.reason]} ${r.errorDetails ?? ''}`.trim()))
    }, (err) => { synth.close(); reject(new Error(`azure synth error: ${err}`)) })
  })

  // # transient network/throttle errors retry with backoff; the cache means a retry never double-pays
  return async (text, outWav) => {
    const tries = opts.retries ?? 3
    for (let k = 1; ; k++) {
      try {
        const r = await once(text, outWav)
        if (!r.words.length) throw new Error('azure returned no word timings')
        return r
      } catch (e) {
        if (k >= tries) throw e
        await new Promise((res) => setTimeout(res, 2000 * k))
      }
    }
  }
}
