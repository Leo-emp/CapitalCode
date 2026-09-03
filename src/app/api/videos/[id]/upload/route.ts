// # POST /api/videos/[id]/upload — trigger auto-post to YouTube
// # Called after approval to queue the video for upload
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { videos, renders, uploads, scripts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { authCheck } from '../../../auth'
import { randomUUID } from 'crypto'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = authCheck(req)
  if (denied) return denied

  const { id } = await params

  // # Get video + render + script
  const [video] = await db.select().from(videos).where(eq(videos.id, id)).limit(1)
  if (!video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  if (video.status !== 'approved') {
    return NextResponse.json(
      { error: `Video must be approved first (current: ${video.status})` },
      { status: 400 }
    )
  }

  const renderRows = await db.select().from(renders).where(eq(renders.videoId, id))
  const render = renderRows[0]
  if (!render) {
    return NextResponse.json({ error: 'No render found for this video' }, { status: 400 })
  }

  const scriptRows = await db.select().from(scripts).where(eq(scripts.videoId, id))
  const script = scriptRows[0]

  // # Determine platform based on video type
  const platform = video.type === 'long_form' ? 'youtube' : 'youtube_short'

  // # Create upload record
  const uploadId = randomUUID()
  await db.insert(uploads).values({
    id: uploadId,
    videoId: id,
    renderId: render.id,
    platform,
    status: 'pending',
    title: script?.title ?? video.topic,
    description: script?.body?.slice(0, 500) ?? video.topic,
    tags: JSON.stringify(['finance', 'investing', 'money', 'capitalcode']),
    hashtags: JSON.stringify(['#finance', '#investing', '#money']),
  })

  // # Update video status to uploading
  await db.update(videos).set({ status: 'uploading' }).where(eq(videos.id, id))

  return NextResponse.json({
    success: true,
    uploadId,
    platform,
    message: `Queued for ${platform} upload`,
  })
}

// # GET /api/videos/[id]/upload — check upload status
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = authCheck(req)
  if (denied) return denied

  const { id } = await params

  const rows = await db.select().from(uploads).where(eq(uploads.videoId, id))

  return NextResponse.json({ uploads: rows })
}
