// ============================================================
// RESEARCH — the Topic Scout's two helpers:
// 1. topic-mix quota: the area furthest below its share comes next
//    (investing 30, personal finance 25, AI & tech 20, business 20, crypto 5)
// 2. outliers: recent uploads of big channels in our areas that
//    did ≥ 2× their channel's median views (free YouTube RSS, no key).
//    Outliers show what viewers want; we find our own angle, never copy.
// ============================================================
import { AREA_SHARE, AREAS, type Area } from './schema'

type HistoryLike = { area?: string; kind?: string }[]

export const nextArea = (history: HistoryLike) => {
  const longs = history.filter((h) => (h.kind ?? 'long') === 'long')
  const counts = Object.fromEntries(AREAS.map((a) => [a, longs.filter((h) => h.area === a).length])) as Record<Area, number>
  const n = longs.length + 1
  const deficit = (a: Area) => AREA_SHARE[a] * n - counts[a]
  const area = [...AREAS].sort((a, b) => deficit(b) - deficit(a) || AREA_SHARE[b] - AREA_SHARE[a])[0]
  return { area, counts, deficits: Object.fromEntries(AREAS.map((a) => [a, +deficit(a).toFixed(2)])) as Record<Area, number> }
}

// ---------------------------------------------------------------- RSS
export type FeedVideo = { id: string; title: string; published: string; views: number }
export type Feed = { channel: string; videos: FeedVideo[] }

const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1]?.trim() ?? ''

export const parseFeed = (xml: string): Feed => {
  const head = xml.split('<entry>')[0]
  const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    id: tag(e, 'yt:videoId'),
    title: decode(tag(e, 'title')),
    published: tag(e, 'published'),
    views: Number(e.match(/<media:statistics views="(\d+)"/)?.[1] ?? 0),
  }))
  return { channel: decode(tag(head, 'title')), videos }
}

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b)
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2
}

export const findOutliers = (feeds: Feed[], min = 2) =>
  feeds.flatMap((f) => {
    const med = median(f.videos.map((v) => v.views).filter((v) => v > 0))
    return med > 0 ? f.videos.filter((v) => v.views >= min * med).map((v) => ({ ...v, channel: f.channel, median: med, ratio: +(v.views / med).toFixed(2), url: `https://www.youtube.com/watch?v=${v.id}` })) : []
  }).sort((a, b) => b.ratio - a.ratio)

// # Channel id from a handle page (cached in the watch list after the first lookup)
export const resolveChannelId = async (handle: string): Promise<string | null> => {
  const r = await fetch(`https://www.youtube.com/${handle}`, { headers: { 'accept-language': 'en' } })
  if (!r.ok) return null
  const html = await r.text()
  return html.match(/"channelId":"(UC[\w-]{22})"/)?.[1] ?? html.match(/channel\/(UC[\w-]{22})/)?.[1] ?? null
}

// ---------------------------------------------------------------- /videos page
// # YouTube RSS started returning 404 for every channel (seen 2026-10-24),
// # so the channel's own /videos page (30 latest uploads) is the main source.
const UNIT: Record<string, number> = { thousand: 1e3, million: 1e6, billion: 1e9 }
export const parseLabelViews = (label: string) => {
  const m = label.replace(/,/g, '').match(/([\d.]+)\s*(thousand|million|billion)?\s+views?/i)
  return m ? Math.round(Number(m[1]) * (UNIT[m[2]?.toLowerCase() ?? ''] ?? 1)) : 0
}

const DAYS: Record<string, number> = { second: 0, minute: 0, hour: 0, day: 1, week: 7, month: 30, year: 365 }
export const parseLabelAge = (label: string, now = new Date()) => {
  const m = label.match(/(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/i)
  const days = m ? Number(m[1]) * DAYS[m[2].toLowerCase()] : 0
  return new Date(now.getTime() - days * 864e5).toISOString()
}

const unescape = (s: string) => decode(s.replace(/\\u0026/g, '&').replace(/\\"/g, '"'))

export const parseVideosPage = (html: string, now = new Date()): Feed => {
  const channel = unescape(html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ?? '')
  const videos = html.split('"lockupViewModel":').slice(1).flatMap((e) => {
    const id = e.match(/"contentId":"([\w-]{11})"/)?.[1]
    const title = e.match(/"lockupMetadataViewModel":\{"title":\{"content":"((?:[^"\\]|\\.)*)"/)?.[1]
    const labels = [...e.matchAll(/"accessibilityLabel":"([^"]*)"/g)].map((m) => m[1])
    const views = labels.find((l) => /views?$/i.test(l))
    const age = labels.find((l) => /ago$/i.test(l))
    return id && title ? [{ id, title: unescape(title), published: parseLabelAge(age ?? '', now), views: parseLabelViews(views ?? '') }] : []
  })
  return { channel, videos }
}

const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'accept-language': 'en' }

export const fetchFeed = async (channelId: string): Promise<Feed | null> => {
  // # Try RSS first (exact dates); fall back to the /videos page
  const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`).catch(() => null)
  if (r?.ok) return parseFeed(await r.text())
  const p = await fetch(`https://www.youtube.com/channel/${channelId}/videos`, { headers: UA }).catch(() => null)
  if (!p?.ok) return null
  const f = parseVideosPage(await p.text())
  return f.videos.length ? f : null
}
