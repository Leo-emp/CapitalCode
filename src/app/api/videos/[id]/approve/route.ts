// # POST /api/videos/[id]/approve — mark video as approved for upload
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
      { error: `Cannot approve video in '${video.status}' status` },
      { status: 400 }
    )
  }

  await updateVideoStatus(id, 'approved', {
    reviewedAt: Math.floor(Date.now() / 1000),
  })

  return NextResponse.json({ success: true, videoId: id, status: 'approved' })
}
