// # CLI: research — next area from the topic-mix quota + outlier videos from the watch list (free RSS)
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { register } from '../cli'
import { readJson, writeJson } from '../jobs'
import { ROOT } from '../paths'
import { fetchFeed, findOutliers, nextArea, resolveChannelId } from '../research'
import { result } from '../result'
import { readHistory } from './plan'

const WATCH = join(ROOT, 'research', 'watchlist.json')
type Watch = { handle: string; area: string; id?: string }[]

register('research', 'research [--days=90]  — topic quota + outliers (≥ 2× median) → temp/research/outliers.json', async (a) => {
  const days = Number(a.find((x) => x.startsWith('--days='))?.slice(7) ?? 90)
  const watch = existsSync(WATCH) ? readJson<Watch>(WATCH) : []
  for (const w of watch) if (!w.id) w.id = (await resolveChannelId(w.handle).catch(() => null)) ?? undefined
  writeJson(WATCH, watch)
  const since = Date.now() - days * 864e5
  const feeds = (await Promise.all(watch.filter((w) => w.id).map(async (w) => {
    const f = await fetchFeed(w.id!).catch(() => null)
    return f ? { ...f, area: w.area } : null
  }))).filter((f): f is NonNullable<typeof f> => !!f)
  const area = Object.fromEntries(feeds.map((f) => [f.channel, f.area]))
  const outliers = findOutliers(feeds).filter((v) => Date.parse(v.published) >= since).map((v) => ({ ...v, area: area[v.channel] }))
  const quota = nextArea(readHistory())
  writeJson(join(ROOT, 'temp', 'research', 'outliers.json'), { at: new Date().toISOString(), quota, outliers })
  for (const o of outliers.slice(0, 15)) console.log(`  ${o.ratio}× ${o.area} · ${o.channel}: ${o.title}`)
  result({ ok: true, next_area: quota.area, channels: feeds.length, of: watch.length, outliers: outliers.length, file: 'temp/research/outliers.json' })
})
