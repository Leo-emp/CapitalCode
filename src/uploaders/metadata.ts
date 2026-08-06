// # Video metadata builder — generates platform-optimized titles, descriptions, tags
import type { Video, Script } from '@/db/schema'

export interface VideoMetadata {
  title: string
  description: string
  tags: string[]
  hashtags: string[]
  chapters?: string // # YouTube chapter format (00:00 Intro)
}

// # Build YouTube-optimized metadata
export function buildYouTubeMetadata(video: Video, script: Script): VideoMetadata {
  const segments = JSON.parse(script.segments) as Array<{ type: string; text: string; duration?: number }>

  // # Build chapter timestamps from segments
  let chapterTime = 0
  const chapters = segments
    .filter((s) => s.type !== 'hook')
    .map((seg) => {
      const timestamp = formatTimestamp(chapterTime)
      chapterTime += seg.duration ?? 10
      return `${timestamp} ${segmentLabel(seg.type)}`
    })
    .join('\n')

  return {
    title: truncateTitle(script.title, 100),
    description: buildDescription(video.topic, script, chapters),
    tags: buildTags(video.topic),
    hashtags: ['#finance', '#money', '#investing', '#economics'],
    chapters: `00:00 Introduction\n${chapters}`,
  }
}

// # Build short-form metadata for TikTok/Instagram/YouTube Shorts
export function buildShortMetadata(video: Video, script: Script): VideoMetadata {
  return {
    title: truncateTitle(script.title, 100),
    description: `${script.hook}\n\n${buildHashtags(video.topic)}`,
    tags: buildTags(video.topic),
    hashtags: buildHashtagList(video.topic),
  }
}

function truncateTitle(title: string, max: number): string {
  if (title.length <= max) return title
  return title.slice(0, max - 3) + '...'
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function segmentLabel(type: string): string {
  const labels: Record<string, string> = {
    context: 'Background',
    data: 'The Data',
    insight: 'Key Insight',
    counter: 'Counter-Argument',
    comparison: 'Comparison',
    prediction: 'What Happens Next',
    takeaway: 'Takeaways',
    cta: 'Conclusion',
  }
  return labels[type] ?? type.charAt(0).toUpperCase() + type.slice(1)
}

function buildDescription(topic: string, script: Script, chapters: string): string {
  return [
    script.hook,
    '',
    `In this video, we break down ${topic} with real data and expert analysis.`,
    '',
    'CHAPTERS:',
    `00:00 Introduction`,
    chapters,
    '',
    '---',
    'Subscribe for daily finance content backed by data.',
    '',
    '#finance #money #investing #economics #data',
  ].join('\n')
}

function buildTags(topic: string): string[] {
  const base = ['finance', 'money', 'investing', 'economics', 'data analysis', 'stock market']
  const topicWords = topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3).slice(0, 5)
  return [...base, ...topicWords]
}

function buildHashtags(topic: string): string {
  return buildHashtagList(topic).join(' ')
}

function buildHashtagList(topic: string): string[] {
  const base = ['#finance', '#money', '#investing']
  const topicTag = '#' + topic.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20)
  return [...base, topicTag].filter((h) => h.length > 1)
}
