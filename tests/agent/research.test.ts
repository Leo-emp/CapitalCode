// # Topic quota (area furthest below its share) and RSS outliers (≥ 2× channel median)
import { expect, test } from 'vitest'
import { findOutliers, nextArea, parseFeed, parseLabelAge, parseLabelViews, parseVideosPage } from '../../agent/research'

test('with no history the biggest share (investing) comes first', () => {
  expect(nextArea([]).area).toBe('investing')
})

test('the area furthest below its share is next; shorts do not count', () => {
  const h = [
    ...Array(3).fill({ area: 'investing', kind: 'long' }),
    ...Array(3).fill({ area: 'personal-finance', kind: 'long' }),
    ...Array(2).fill({ area: 'business', kind: 'long' }),
    ...Array(5).fill({ area: 'ai-tech', kind: 'short' }),
  ]
  // # 8 long videos: ai-tech share 0.20 but 0 made → deficit 1.6 is the largest
  const r = nextArea(h as any)
  expect(r.area).toBe('ai-tech')
  expect(r.counts['ai-tech']).toBe(0)
})

const xml = (views: number[]) => `<?xml version="1.0"?><feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/">
<title>Money Channel</title>
${views.map((v, i) => `<entry><yt:videoId>vid${i}</yt:videoId><title>Video &amp; title ${i}</title><published>2026-10-${String(20 - i).padStart(2, '0')}T10:00:00+00:00</published>
<media:group><media:title>Video ${i}</media:title><media:community><media:statistics views="${v}"/></media:community></media:group></entry>`).join('\n')}
</feed>`

test('parseFeed reads id, title (entities decoded), date and views', () => {
  const f = parseFeed(xml([100, 200]))
  expect(f.channel).toBe('Money Channel')
  expect(f.videos[0]).toEqual({ id: 'vid0', title: 'Video & title 0', published: '2026-10-20T10:00:00+00:00', views: 100 })
})

test('outliers are videos at ≥ 2× their channel median, biggest ratio first', () => {
  const f = parseFeed(xml([100, 120, 90, 110, 500, 260, 100]))
  const o = findOutliers([f])
  expect(o.map((x) => x.id)).toEqual(['vid4', 'vid5'])
  expect(o[0].ratio).toBeCloseTo(500 / 110, 1)
})

// # YouTube RSS now 404s for every channel (2026-10-24), so outliers come from the channel's /videos page
test('view labels become numbers', () => {
  expect(parseLabelViews('350 thousand views')).toBe(350_000)
  expect(parseLabelViews('1.2 million views')).toBe(1_200_000)
  expect(parseLabelViews('12,345 views')).toBe(12_345)
  expect(parseLabelViews('No views')).toBe(0)
})

test('age labels become dates before now', () => {
  const now = new Date('2026-10-24T00:00:00Z')
  expect(parseLabelAge('9 days ago', now)).toBe('2026-10-15T00:00:00.000Z')
  expect(parseLabelAge('2 weeks ago', now)).toBe('2026-10-10T00:00:00.000Z')
  expect(parseLabelAge('1 month ago', now)).toBe('2026-09-24T00:00:00.000Z')
})

const lockup = (id: string, title: string, views: string, age: string) =>
  `"lockupViewModel":{"contentImage":{},"metadata":{"lockupMetadataViewModel":{"title":{"content":"${title}"},"metadata":{"contentMetadataViewModel":{"metadataRows":[{"metadataParts":[{"text":{"content":"x"},"accessibilityLabel":"${views}"},{"text":{"content":"y"},"accessibilityLabel":"${age}"}]}]}}}},"contentId":"${id}","contentType":"LOCKUP_CONTENT_TYPE_VIDEO"}`

test('parseVideosPage reads channel name, ids, titles, views and dates', () => {
  const html = `<meta property="og:title" content="How Money Works">${lockup('aaaaaaaaaa1', 'Inflation \u0026 you', '350 thousand views', '9 days ago')},${lockup('bbbbbbbbbb2', 'Second', '1.1 million views', '2 weeks ago')}`
  const f = parseVideosPage(html, new Date('2026-10-24T00:00:00Z'))
  expect(f.channel).toBe('How Money Works')
  expect(f.videos).toEqual([
    { id: 'aaaaaaaaaa1', title: 'Inflation & you', published: '2026-10-15T00:00:00.000Z', views: 350_000 },
    { id: 'bbbbbbbbbb2', title: 'Second', published: '2026-10-10T00:00:00.000Z', views: 1_100_000 },
  ])
})
