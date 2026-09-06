import { env, envOr } from '@/lib/env'
import { uploadToR2 } from '@/storage/r2'
import type { PipelineContext } from './orchestrator'

export interface WordTimestamp {
  word: string
  startMs: number
  endMs: number
}

export interface VoiceResult {
  audioUrl: string
  wordTimestamps: WordTimestamp[]
  durationMs: number
}

// # Clean script text before sending to ElevenLabs — ported from LuminousWill voiceover.py
export function cleanScriptText(text: string): string {
  return text
    .replace(/\.\.\./g, '.')           // # Ellipsis causes weird AI pauses
    .replace(/--/g, ', ')              // # Double dash breaks tone
    .replace(/—/g, ', ')          // # Em dash breaks tone
    .replace(/[“”]/g, '"')   // # Smart double quotes → ASCII
    .replace(/[‘’]/g, "'")   // # Smart single quotes → ASCII
    .replace(/\s+/g, ' ')             // # Normalize whitespace
    .trim()
}

// # Extract word-level timestamps from ElevenLabs character-level alignment
// # Ported from LuminousWill voiceover.py:extract_word_timestamps()
export function extractWordTimestamps(alignment: {
  characters: string[]
  character_start_times_seconds: number[]
  character_end_times_seconds: number[]
}): WordTimestamp[] {
  const words: WordTimestamp[] = []
  let currentWord = ''
  let wordStart = 0

  for (let i = 0; i < alignment.characters.length; i++) {
    const char = alignment.characters[i]
    const startSec = alignment.character_start_times_seconds[i]

    if (char === ' ' || char === '\n') {
      // # Space boundary — flush current word
      if (currentWord.length > 0) {
        words.push({
          word: currentWord,
          startMs: Math.round(wordStart * 1000),
          endMs: Math.round(alignment.character_end_times_seconds[i - 1] * 1000),
        })
        currentWord = ''
      }
    } else {
      if (currentWord.length === 0) wordStart = startSec
      currentWord += char
    }
  }

  // # Flush last word
  if (currentWord.length > 0) {
    const lastEnd = alignment.character_end_times_seconds[alignment.characters.length - 1]
    words.push({
      word: currentWord,
      startMs: Math.round(wordStart * 1000),
      endMs: Math.round(lastEnd * 1000),
    })
  }

  return words
}

// # Find pauses longer than threshold (for trimming)
export function findLongPauses(
  timestamps: WordTimestamp[],
  thresholdMs = 1500
): Array<{ startMs: number; endMs: number; durationMs: number; afterWordIndex: number }> {
  const pauses: Array<{ startMs: number; endMs: number; durationMs: number; afterWordIndex: number }> = []
  for (let i = 0; i < timestamps.length - 1; i++) {
    const gap = timestamps[i + 1].startMs - timestamps[i].endMs
    if (gap > thresholdMs) {
      pauses.push({
        startMs: timestamps[i].endMs,
        endMs: timestamps[i + 1].startMs,
        durationMs: gap,
        afterWordIndex: i,
      })
    }
  }
  return pauses
}

// # ElevenLabs free tier caps at 10K chars per request.
// # We chunk at 9000 to leave margin.
const CHUNK_CHAR_LIMIT = 9000

// # Split text into chunks under the limit, breaking at sentence boundaries.
// # Each chunk is a complete group of sentences so speech doesn't cut mid-word.
function splitIntoChunks(text: string): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/)
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    const candidate = current ? `${current} ${sentence}` : sentence
    if (candidate.length <= CHUNK_CHAR_LIMIT) {
      current = candidate
    } else {
      if (current) chunks.push(current)
      current = sentence
    }
  }
  if (current) chunks.push(current)
  return chunks
}

// # Generate audio + timestamps for a single chunk (must be under 10K chars)
async function generateSingleChunk(
  text: string,
  apiKey: string,
  voiceId: string
): Promise<{ audioBuffer: Buffer; wordTimestamps: WordTimestamp[] }> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
          use_speaker_boost: true,
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`ElevenLabs API error ${response.status}: ${err}`)
  }

  const data = await response.json()

  const audioBuffer = Buffer.from(data.audio_base64, 'base64')
  const wordTimestamps = extractWordTimestamps(data.alignment)

  return { audioBuffer, wordTimestamps }
}

// # Call ElevenLabs TTS API with timestamps.
// # Auto-chunks scripts over 9000 chars at sentence boundaries so long scripts
// # don't hit the 10K per-request limit.
export async function generateVoice(scriptText: string): Promise<VoiceResult> {
  const apiKey = env('ELEVENLABS_API_KEY')
  const voiceId = envOr('ELEVENLABS_VOICE_ID', 'pNInz6obpgDQGcFmaJgB') // # Adam voice default

  const cleaned = cleanScriptText(scriptText)

  // # Short scripts: single request (most common case)
  if (cleaned.length <= CHUNK_CHAR_LIMIT) {
    console.log(`[VOICE] Generating narration (${cleaned.length} chars, single request)`)
    const { audioBuffer, wordTimestamps } = await generateSingleChunk(cleaned, apiKey, voiceId)

    const filename = `audio/${crypto.randomUUID()}.mp3`
    const audioUrl = await uploadToR2(filename, audioBuffer, 'audio/mpeg')

    const durationMs = wordTimestamps.length > 0
      ? wordTimestamps[wordTimestamps.length - 1].endMs
      : 0

    return { audioUrl, wordTimestamps, durationMs }
  }

  // # Long scripts: chunk at sentence boundaries, generate each, concatenate
  const chunks = splitIntoChunks(cleaned)
  console.log(`[VOICE] Script is ${cleaned.length} chars — splitting into ${chunks.length} chunks`)

  const allBuffers: Buffer[] = []
  const allTimestamps: WordTimestamp[] = []
  let timeOffsetMs = 0

  for (let i = 0; i < chunks.length; i++) {
    console.log(`[VOICE] Generating chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`)
    const { audioBuffer, wordTimestamps } = await generateSingleChunk(chunks[i], apiKey, voiceId)

    allBuffers.push(audioBuffer)

    // # Offset timestamps by cumulative duration of previous chunks
    for (const wt of wordTimestamps) {
      allTimestamps.push({
        word: wt.word,
        startMs: wt.startMs + timeOffsetMs,
        endMs: wt.endMs + timeOffsetMs,
      })
    }

    // # Calculate this chunk's duration from its last timestamp
    const chunkDurationMs = wordTimestamps.length > 0
      ? wordTimestamps[wordTimestamps.length - 1].endMs
      : 0
    timeOffsetMs += chunkDurationMs
    console.log(`[VOICE] Chunk ${i + 1} duration: ${(chunkDurationMs / 1000).toFixed(1)}s (cumulative: ${(timeOffsetMs / 1000).toFixed(1)}s)`)
  }

  // # Concatenate all audio chunks
  const combinedBuffer = Buffer.concat(allBuffers)
  const filename = `audio/${crypto.randomUUID()}.mp3`
  const audioUrl = await uploadToR2(filename, combinedBuffer, 'audio/mpeg')

  console.log(`[VOICE] Total: ${allTimestamps.length} words, ${(timeOffsetMs / 1000).toFixed(1)}s`)

  return { audioUrl, wordTimestamps: allTimestamps, durationMs: timeOffsetMs }
}

// # Pipeline stage — generates voice for the primary script
export async function voiceGeneratorStage(ctx: PipelineContext): Promise<PipelineContext> {
  const { primaryScript } = ctx

  if (!primaryScript?.segments) {
    throw new Error('No script in context — run scriptGeneratorStage first')
  }

  // # Concatenate all segment text into full narration
  const fullText = primaryScript.segments
    .map((s: { text: string }) => s.text)
    .join(' ')

  const voice = await generateVoice(fullText)

  return { ...ctx, voice }
}
