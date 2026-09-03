'use client'

// # Video review page — watch, approve, or reject a single video
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface VideoDetail {
  id: string
  topic: string
  type: string
  status: string
  createdAt: number
  qualityScore: string | null
  renderUrl: string | null
  thumbnailUrl: string | null
  duration: number | null
}

export default function ReviewPage() {
  const { authFetch } = useAuth()
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [video, setVideo] = useState<VideoDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [showReject, setShowReject] = useState(false)

  useEffect(() => {
    authFetch(`/api/videos?limit=1&status=ready_for_review`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        const found = data?.videos?.find((v: VideoDetail) => v.id === id)
        if (found) setVideo(found)
      })
      .finally(() => setLoading(false))
  }, [id])

  async function handleApprove() {
    setActionLoading(true)
    await authFetch(`/api/videos/${id}/approve`, { method: 'POST' })
    router.push('/dashboard')
  }

  async function handleReject() {
    setActionLoading(true)
    await authFetch(`/api/videos/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: rejectReason || 'Rejected by reviewer' }),
    })
    router.push('/dashboard')
  }

  if (loading) return <p className="text-slate-500 py-20 text-center">Loading...</p>
  if (!video) return <p className="text-slate-500 py-20 text-center">Video not found</p>

  const qualityCheck = video.qualityScore ? JSON.parse(video.qualityScore) : null

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        Review Video
      </h1>
      <p className="text-slate-400 mb-8">{video.topic}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* # Video player */}
        <div className="lg:col-span-2">
          {video.renderUrl ? (
            <video
              controls
              className="w-full rounded-xl"
              style={{ backgroundColor: '#0D1B2A' }}
              src={video.renderUrl}
              poster={video.thumbnailUrl ?? undefined}
            />
          ) : (
            <div className="w-full aspect-video rounded-xl flex items-center justify-center" style={{ backgroundColor: '#0D1B2A' }}>
              <span className="text-slate-500">No render available</span>
            </div>
          )}

          {/* # Approve/Reject */}
          {video.status === 'ready_for_review' && (
            <div className="mt-6 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="flex-1 py-3 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
                  style={{ backgroundColor: '#2ECC71', color: '#0A1628' }}
                >
                  {actionLoading ? 'Processing...' : 'Approve & Auto-Post'}
                </button>
                <button
                  onClick={() => setShowReject(!showReject)}
                  disabled={actionLoading}
                  className="px-6 py-3 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
                  style={{ backgroundColor: '#E74C3C20', color: '#E74C3C', border: '1px solid #E74C3C40' }}
                >
                  Reject
                </button>
              </div>

              {showReject && (
                <div className="space-y-2">
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Rejection reason (optional)"
                    className="w-full rounded-lg p-3 text-sm text-white placeholder-slate-500 resize-none"
                    style={{ backgroundColor: '#1B2838', border: '1px solid #1B2838' }}
                    rows={2}
                  />
                  <button
                    onClick={handleReject}
                    disabled={actionLoading}
                    className="w-full py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                    style={{ backgroundColor: '#E74C3C', color: 'white' }}
                  >
                    Confirm Reject
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* # Sidebar info */}
        <div className="space-y-4">
          <InfoCard title="Details">
            <InfoRow label="Type" value={video.type.replace(/_/g, ' ')} />
            <InfoRow label="Status" value={video.status.replace(/_/g, ' ')} />
            <InfoRow label="Created" value={new Date(video.createdAt * 1000).toLocaleString()} />
            {video.duration && <InfoRow label="Duration" value={`${video.duration}s`} />}
          </InfoCard>

          {qualityCheck && (
            <InfoCard title="Quality Check">
              <InfoRow label="Result" value={qualityCheck.pass ? 'PASS' : 'FAIL'} />
              <InfoRow label="Reason" value={qualityCheck.reason} />
            </InfoCard>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#0D1B2A' }}>
      <h3 className="text-sm font-semibold mb-3" style={{ color: '#D4A853' }}>{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  )
}
