// # POST /api/videos/[id]/approve — approve video and queue auto-post
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { videos, renders, scripts, uploads } from '@/db/schema'
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

  const [video] = await db.select().from(videos).where(eq(videos.id, id)).limit(1)
  if (!video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  if (video.status !== 'ready_for_review') {
    return NextResponse.json(
      { error: `Cannot approve video in '${video.status}' status` },
      { status: 400 }
    )
  }

  // # Get render and script for upload metadata
  const renderRows = await db.select().from(renders).where(eq(renders.videoId, id))
  const render = renderRows[0]
  const scriptRows = await db.select().from(scripts).where(eq(scripts.videoId, id))
  const script = scriptRows[0]

  // # Mark as approved
  await db.update(videos).set({
    status: 'approved',
    reviewedAt: Math.floor(Date.now() / 1000),
  }).where(eq(videos.id, id))

  // # Auto-queue upload if render exists
  let uploadId: string | null = null
  if (render) {
    const platform = video.type === 'long_form' ? 'youtube' : 'youtube_short'
    uploadId = randomUUID()

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
  }

  return NextResponse.json({
    success: true,
    videoId: id,
    status: 'approved',
    uploadQueued: !!uploadId,
    uploadId,
  })
}
