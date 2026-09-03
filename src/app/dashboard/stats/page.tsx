'use client'

// # Stats page — pipeline health and performance metrics
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

const STATUS_BAR_COLORS: Record<string, string> = {
  generating: '#3498DB',
  ready_for_review: '#D4A853',
  approved: '#2ECC71',
  uploading: '#F39C12',
  published: '#2ECC71',
  rejected: '#E74C3C',
  failed: '#E74C3C',
}

interface Stats {
  statusBreakdown: Record<string, number>
  last24h: number
  last7d: number
  renderStats: { avgTimeSeconds: number; avgSizeMB: number; totalRenders: number }
  uploadBreakdown: Record<string, number>
}

export default function StatsPage() {
  const { authFetch } = useAuth()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authFetch('/api/stats')
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setStats(d) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-slate-500 py-20 text-center">Loading stats...</p>
  if (!stats) return <p className="text-slate-500 py-20 text-center">Failed to load stats</p>

  const total = Object.values(stats.statusBreakdown).reduce((s, n) => s + n, 0)
  const dailyAvg = stats.last7d > 0 ? (stats.last7d / 7).toFixed(1) : '0'

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        Pipeline Stats
      </h1>

      {/* # Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Videos" value={total} color="#D4A853" />
        <StatCard label="Pending Review" value={stats.statusBreakdown['ready_for_review'] ?? 0} color="#D4A853" />
        <StatCard label="Published" value={stats.statusBreakdown['published'] ?? 0} color="#2ECC71" />
        <StatCard label="Failed" value={(stats.statusBreakdown['failed'] ?? 0) + (stats.statusBreakdown['rejected'] ?? 0)} color="#E74C3C" />
      </div>

      {/* # Performance */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Last 24h" value={stats.last24h} color="#3498DB" />
        <StatCard label="Daily Average" value={dailyAvg} color="#3498DB" />
        <StatCard label="Avg Render Time" value={`${stats.renderStats.avgTimeSeconds}s`} color="#3498DB" />
      </div>

      {/* # Status breakdown bar chart */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#0D1B2A' }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: '#D4A853' }}>Status Breakdown</h2>
        {total === 0 ? (
          <p className="text-slate-500 text-sm">No videos yet</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(stats.statusBreakdown).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <span className="text-sm text-slate-400 w-32 capitalize">{status.replace(/_/g, ' ')}</span>
                <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ backgroundColor: '#1B2838' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(count / total) * 100}%`,
                      backgroundColor: STATUS_BAR_COLORS[status] ?? '#3498DB',
                      minWidth: count > 0 ? '8px' : '0',
                    }}
                  />
                </div>
                <span className="text-sm text-white w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#0D1B2A' }}>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  )
}
