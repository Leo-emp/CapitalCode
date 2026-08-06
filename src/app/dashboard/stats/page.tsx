// # Stats page — pipeline health and performance metrics
import { db } from '@/db/client'
import { videos, renders } from '@/db/schema'
import { sql, gte } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export default async function StatsPage() {
  const now = Math.floor(Date.now() / 1000)
  const weekAgo = now - 604800

  // # Status counts
  const statusCounts = await db
    .select({ status: videos.status, count: sql<number>`count(*)` })
    .from(videos)
    .groupBy(videos.status)

  const statusMap = Object.fromEntries(statusCounts.map((r) => [r.status, r.count]))
  const total = statusCounts.reduce((s, r) => s + r.count, 0)

  // # Render stats
  const [renderStats] = await db
    .select({
      avgTime: sql<number>`avg(${renders.renderTime})`,
      avgSize: sql<number>`avg(${renders.fileSize})`,
      totalRenders: sql<number>`count(*)`,
    })
    .from(renders)
    .where(gte(renders.createdAt, weekAgo))

  // # Videos per day (last 7 days)
  const [weekCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(videos)
    .where(gte(videos.createdAt, weekAgo))

  const dailyAvg = weekCount.count > 0 ? (weekCount.count / 7).toFixed(1) : '0'

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        Pipeline Stats
      </h1>

      {/* # Top-level metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Videos" value={total} color="#D4A853" />
        <StatCard label="Pending Review" value={statusMap['ready_for_review'] ?? 0} color="#D4A853" />
        <StatCard label="Published" value={statusMap['published'] ?? 0} color="#2ECC71" />
        <StatCard label="Failed" value={(statusMap['failed'] ?? 0) + (statusMap['rejected'] ?? 0)} color="#E74C3C" />
      </div>

      {/* # Performance metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Daily Average" value={dailyAvg} color="#3498DB" />
        <StatCard label="Avg Render Time" value={`${Math.round(renderStats.avgTime ?? 0)}s`} color="#3498DB" />
        <StatCard label="Avg File Size" value={`${Math.round((renderStats.avgSize ?? 0) / 1024 / 1024)}MB`} color="#3498DB" />
      </div>

      {/* # Status breakdown */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#0D1B2A' }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: '#D4A853' }}>Status Breakdown</h2>
        <div className="space-y-3">
          {Object.entries(statusMap).map(([status, count]) => (
            <div key={status} className="flex items-center gap-3">
              <span className="text-sm text-slate-400 w-32">{status}</span>
              <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ backgroundColor: '#1B2838' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${total > 0 ? (count / total) * 100 : 0}%`,
                    backgroundColor: STATUS_BAR_COLORS[status] ?? '#3498DB',
                    minWidth: count > 0 ? '8px' : '0',
                  }}
                />
              </div>
              <span className="text-sm text-white w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const STATUS_BAR_COLORS: Record<string, string> = {
  generating: '#3498DB',
  ready_for_review: '#D4A853',
  approved: '#2ECC71',
  uploading: '#F39C12',
  published: '#2ECC71',
  rejected: '#E74C3C',
  failed: '#E74C3C',
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#0D1B2A' }}>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  )
}
