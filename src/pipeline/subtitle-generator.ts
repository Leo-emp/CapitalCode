// # Subtitle generator — converts word timestamps to SRT format
// # Groups words into ≤42-char chunks aligned to word boundaries
// # Long-form: uploaded as YouTube CC track
// # Short-form: burned in via HormoziCaption.tsx

import { uploadToR2 } from '@/storage/r2'
import type { WordTimestamp } from './voice-generator'
import type { PipelineContext } from './orchestrator'

export interface SrtChunk {
  index: number
  startMs: number
  endMs: number
  text: string
}

const MAX_CHARS_PER_LINE = 42

// # Format milliseconds as SRT timestamp: HH:MM:SS,mmm
export function formatSrtTime(ms: number): string {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const millis = ms % 1000
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(millis).padStart(3, '0')}`
}

// # Group word timestamps into subtitle chunks (≤42 chars each)
export function groupWords(timestamps: WordTimestamp[]): SrtChunk[] {
  if (timestamps.length === 0) return []

  const chunks: SrtChunk[] = []
  let currentWords: WordTimestamp[] = []
  let currentText = ''

  for (const word of timestamps) {
    const wouldBe = currentText ? `${currentText} ${word.word}` : word.word

    // # Start new chunk if adding this word would exceed limit
    if (wouldBe.length > MAX_CHARS_PER_LINE && currentWords.length > 0) {
      chunks.push({
        index: chunks.length + 1,
        startMs: currentWords[0].startMs,
        endMs: currentWords[currentWords.length - 1].endMs,
        text: currentText,
      })
      currentWords = [word]
      currentText = word.word
    } else {
      currentWords.push(word)
      currentText = wouldBe
    }
  }

  // # Flush remaining words
  if (currentWords.length > 0) {
    chunks.push({
      index: chunks.length + 1,
      startMs: currentWords[0].startMs,
      endMs: currentWords[currentWords.length - 1].endMs,
      text: currentText,
    })
  }

  return chunks
}

// # Generate SRT subtitle content from word timestamps
export function generateSrt(timestamps: WordTimestamp[]): string {
  if (timestamps.length === 0) return ''

  const chunks = groupWords(timestamps)

  return chunks
    .map((chunk) =>
      `${chunk.index}\n${formatSrtTime(chunk.startMs)} --> ${formatSrtTime(chunk.endMs)}\n${chunk.text}`
    )
    .join('\n\n')
}

// # Pipeline stage — generates SRT subtitles and uploads to R2
export async function subtitleGeneratorStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.voice?.wordTimestamps) {
    throw new Error('No word timestamps in context — run voiceGeneratorStage first')
  }

  const srtContent = generateSrt(ctx.voice.wordTimestamps)

  // # Upload SRT to R2
  const r2Key = `subtitles/${ctx.videoId}/captions.srt`
  const srtUrl = await uploadToR2(r2Key, Buffer.from(srtContent, 'utf-8'), 'text/plain')

  return {
    ...ctx,
    subtitles: { srtUrl, srtContent },
  }
}
