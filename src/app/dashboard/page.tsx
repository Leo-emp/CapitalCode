'use client'

// # Dashboard queue page — shows all videos, approve/reject from here
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

const STATUS_COLORS: Record<string, string> = {
  generating: '#3498DB',
  ready_for_review: '#D4A853',
  approved: '#2ECC71',
  uploading: '#F39C12',
  published: '#2ECC71',
  rejected: '#E74C3C',
  failed: '#E74C3C',
}

const STATUS_LABELS: Record<string, string> = {
  generating: 'Generating',
  ready_for_review: 'Review',
  approved: 'Approved',
  uploading: 'Uploading',
  published: 'Published',
  rejected: 'Rejected',
  failed: 'Failed',
}

interface Video {
  id: string
  topic: string
  type: string
  status: string
  createdAt: number
  qualityScore: string | null
  thumbnailUrl: string | null
  renderUrl: string | null
  duration: number | null
}

export default function QueuePage() {
  const { authFetch } = useAuth()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => { loadVideos() }, [])

  async function loadVideos() {
    try {
      const res = await authFetch('/api/videos?limit=100')
      if (res.ok) {
        const data = await res.json()
        setVideos(data.videos ?? [])
      }
    } catch { /* */ }
    setLoading(false)
  }

  // # Approve video — moves to 'approved' status
  async function handleApprove(id: string) {
    setActionLoading(id)
    await authFetch(`/api/videos/${id}/approve`, { method: 'POST' })
    await loadVideos()
    setActionLoading(null)
  }

  // # Reject video
  async function handleReject(id: string) {
    setActionLoading(id)
    await authFetch(`/api/videos/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: 'Rejected from queue' }),
    })
    await loadVideos()
    setActionLoading(null)
  }

  const reviewable = videos.filter((v) => v.status === 'ready_for_review')
  const rest = videos.filter((v) => v.status !== 'ready_for_review')

  if (loading) {
    return <p className="text-slate-500 py-20 text-center">Loading videos...</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        Video Queue
      </h1>

      {/* # Review section */}
      {reviewable.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#D4A853' }}>
            Ready for Review ({reviewable.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviewable.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                highlight
                onApprove={() => handleApprove(v.id)}
                onReject={() => handleReject(v.id)}
                loading={actionLoading === v.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* # All other videos */}
      <section>
        <h2 className="text-lg font-semibold text-slate-300 mb-4">
          All Videos ({rest.length})
        </h2>
        {rest.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-20">
            No videos yet. Go to Generate to create your first video.
          </p>
        )}
      </section>
    </div>
  )
}

function VideoCard({
  video,
  highlight,
  onApprove,
  onReject,
  loading,
}: {
  video: Video
  highlight?: boolean
  onApprove?: () => void
  onReject?: () => void
  loading?: boolean
}) {
  const borderColor = highlight ? '#D4A853' : '#1B2838'
  const date = new Date(video.createdAt * 1000).toLocaleDateString()
  const typeLabel = video.type === 'long_form' ? 'Long' : video.type === 'short_explainer' ? 'Short' : 'Data'

  return (
    <div
      className="rounded-xl p-4 transition-all"
      style={{ backgroundColor: '#0D1B2A', border: `1px solid ${borderColor}` }}
    >
      {/* # Thumbnail */}
      <div className="w-full h-36 rounded-lg mb-3 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#1B2838' }}>
        {video.thumbnailUrl ? (
          <img src={video.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-slate-600 text-sm">No thumbnail</span>
        )}
      </div>

      {/* # Status badge + type */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: (STATUS_COLORS[video.status] ?? '#3498DB') + '20',
            color: STATUS_COLORS[video.status] ?? '#3498DB',
          }}
        >
          {STATUS_LABELS[video.status] ?? video.status}
        </span>
        <span className="text-xs text-slate-500">{typeLabel}</span>
        {video.duration && (
          <span className="text-xs text-slate-500">
            {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
          </span>
        )}
      </div>

      <p className="text-white text-sm font-medium line-clamp-2 mb-1">{video.topic || 'Untitled'}</p>
      <p className="text-slate-500 text-xs mb-3">{date}</p>

      {/* # Approve/Reject buttons for reviewable videos */}
      {highlight && onApprove && onReject && (
        <div className="flex gap-2">
          <button
            onClick={onApprove}
            disabled={loading}
            className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
            style={{ backgroundColor: '#2ECC71', color: '#0A1628' }}
          >
            {loading ? '...' : 'Approve'}
          </button>
          <button
            onClick={onReject}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
            style={{ backgroundColor: '#E74C3C20', color: '#E74C3C', border: '1px solid #E74C3C40' }}
          >
            Reject
          </button>
        </div>
      )}

      {/* # Video preview link if render exists */}
      {video.renderUrl && (
        <a
          href={video.renderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs mt-2 underline"
          style={{ color: '#D4A853' }}
        >
          Watch Video
        </a>
      )}
    </div>
  )
}
