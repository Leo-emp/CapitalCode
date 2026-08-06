// # Client component — approve/reject buttons with loading state
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ReviewActions({ videoId }: { videoId: string }) {
  const [loading, setLoading] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [showReject, setShowReject] = useState(false)
  const router = useRouter()

  async function handleApprove() {
    setLoading(true)
    await fetch(`/api/videos/${videoId}/approve`, { method: 'POST' })
    router.refresh()
  }

  async function handleReject() {
    setLoading(true)
    await fetch(`/api/videos/${videoId}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: rejectReason || 'Rejected by reviewer' }),
    })
    router.refresh()
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          disabled={loading}
          className="flex-1 py-3 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
          style={{ backgroundColor: '#2ECC71', color: '#0A1628' }}
        >
          {loading ? 'Processing...' : 'Approve & Queue Upload'}
        </button>
        <button
          onClick={() => setShowReject(!showReject)}
          disabled={loading}
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
            disabled={loading}
            className="w-full py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            style={{ backgroundColor: '#E74C3C', color: 'white' }}
          >
            Confirm Reject
          </button>
        </div>
      )}
    </div>
  )
}
