// # POST /api/videos/[id]/reject — mark video as rejected with reason
import { NextRequest, NextResponse } from 'next/server'
import { updateVideoStatus, getVideoById } from '@/db/repo/videos'
import { authCheck } from '../../../auth'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = authCheck(req)
  if (denied) return denied

  const { id } = await params
  const video = await getVideoById(id)
  if (!video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  if (video.status !== 'ready_for_review') {
    return NextResponse.json(
      { error: `Cannot reject video in '${video.status}' status` },
      { status: 400 }
    )
  }

  // # Parse optional rejection reason from body
  let reason = 'No reason provided'
  try {
    const body = await req.json()
    if (body.reason) reason = String(body.reason).slice(0, 500)
  } catch {
    // # No body is fine — default reason used
  }

  await updateVideoStatus(id, 'rejected', {
    reviewedAt: Math.floor(Date.now() / 1000),
    rejectionReason: reason,
  })

  return NextResponse.json({ success: true, videoId: id, status: 'rejected', reason })
}
