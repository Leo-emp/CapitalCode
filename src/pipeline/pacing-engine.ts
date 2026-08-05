import { msToFrames } from '@/remotion/design/animations'
import type { WordTimestamp } from './voice-generator'
import type { Segment } from './script-generator'
import type { PipelineContext } from './orchestrator'

export interface PacedWord {
  word: string
  frameStart: number
  frameEnd: number
  emphasis: 'normal' | 'strong' | 'de-emphasis'
}

export interface Pause {
  frameStart: number
  frameEnd: number
  type: 'natural_pause' | 'dramatic_pause' | 'section_break'
}

export interface PunchPoint {
  frame: number
  word: string
  type: 'emphasis_hit' | 'stat_reveal' | 'transition'
}

export interface SfxCue {
  frame: number
  type: 'tick' | 'bass_hit' | 'whoosh'
}

export interface PacedSegment {
  segmentId: string
  words: PacedWord[]
  pauses: Pause[]
  punches: PunchPoint[]
  sfxCues: SfxCue[]
}

export interface PacingData {
  segments: PacedSegment[]
  totalFrames: number
}

// # Detect emphasis patterns from timing gaps and speech speed
function detectEmphasis(
  word: WordTimestamp,
  prevWord: WordTimestamp | null,
  avgWordDurationMs: number
): PacedWord['emphasis'] {
  const wordDuration = word.endMs - word.startMs

  // # Gap before this word → speaker paused for emphasis
  if (prevWord && (word.startMs - prevWord.endMs) > 300) return 'strong'

  // # Word spoken 1.5x slower than average → deliberate emphasis
  if (wordDuration > avgWordDurationMs * 1.5) return 'strong'

  return 'normal'
}

// # Map word timestamps to script segments by matching text content
function assignWordsToSegments(
  timestamps: WordTimestamp[],
  segments: Segment[]
): Map<string, WordTimestamp[]> {
  const map = new Map<string, WordTimestamp[]>()
  let wordIdx = 0

  for (const seg of segments) {
    const segWords = seg.text.split(/\s+/).filter(Boolean)
    const assigned: WordTimestamp[] = []

    // # Greedily assign timestamps to this segment's word count
    for (let i = 0; i < segWords.length && wordIdx < timestamps.length; i++) {
      assigned.push(timestamps[wordIdx])
      wordIdx++
    }

    map.set(seg.id, assigned)
  }

  return map
}

// # Analyze pacing: convert ms timestamps to frames, detect emphasis and pauses
export function analyzePacing(
  wordTimestamps: WordTimestamp[],
  scriptSegments: Segment[]
): PacingData {
  if (wordTimestamps.length === 0) {
    return { segments: [], totalFrames: 0 }
  }

  // # Average word duration for emphasis detection
  const avgWordDurationMs = wordTimestamps.reduce(
    (sum, w) => sum + (w.endMs - w.startMs), 0
  ) / wordTimestamps.length

  const segmentMap = assignWordsToSegments(wordTimestamps, scriptSegments)
  const pacedSegments: PacedSegment[] = []

  for (const seg of scriptSegments) {
    const words = segmentMap.get(seg.id) ?? []
    const pacedWords: PacedWord[] = []
    const pauses: Pause[] = []
    const punches: PunchPoint[] = []
    const sfxCues: SfxCue[] = []

    for (let i = 0; i < words.length; i++) {
      const w = words[i]
      const prev = i > 0 ? words[i - 1] : null

      const emphasis = detectEmphasis(w, prev, avgWordDurationMs)

      pacedWords.push({
        word: w.word,
        frameStart: msToFrames(w.startMs),
        frameEnd: msToFrames(w.endMs),
        emphasis,
      })

      // # Detect pauses between consecutive words
      if (prev) {
        const gapMs = w.startMs - prev.endMs
        if (gapMs > 500) {
          pauses.push({
            frameStart: msToFrames(prev.endMs),
            frameEnd: msToFrames(w.startMs),
            type: gapMs > 1000 ? 'dramatic_pause' : 'natural_pause',
          })
        }
      }

      // # Mark emphasis words from the script as punch points
      if (seg.emphasisWords?.some((ew) => w.word.toLowerCase().includes(ew.toLowerCase()))) {
        punches.push({
          frame: msToFrames(w.startMs),
          word: w.word,
          type: 'emphasis_hit',
        })

        // # Suggest SFX: tick on stat words, bass_hit on emphasis hits
        sfxCues.push({
          frame: msToFrames(w.startMs),
          type: seg.type === 'data' || seg.type === 'counter' ? 'tick' : 'bass_hit',
        })
      }
    }

    pacedSegments.push({
      segmentId: seg.id,
      words: pacedWords,
      pauses,
      punches,
      sfxCues,
    })
  }

  const lastWord = wordTimestamps[wordTimestamps.length - 1]
  const totalFrames = msToFrames(lastWord.endMs)

  return { segments: pacedSegments, totalFrames }
}

// # Pipeline stage — analyzes pacing from voice timestamps + script segments
export async function pacingEngineStage(ctx: PipelineContext): Promise<PipelineContext> {
  const { voice, primaryScript } = ctx

  if (!voice?.wordTimestamps) {
    throw new Error('No voice data in context — run voiceGeneratorStage first')
  }
  if (!primaryScript?.segments) {
    throw new Error('No script in context — run scriptGeneratorStage first')
  }

  const pacing = analyzePacing(voice.wordTimestamps, primaryScript.segments)

  return { ...ctx, pacing }
}
