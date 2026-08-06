// # GET /api/videos — list videos with optional status/type filters
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { videos, renders } from '@/db/schema'
import { eq, desc, and, sql } from 'drizzle-orm'
import { authCheck } from '../auth'

export async function GET(req: NextRequest) {
  const denied = authCheck(req)
  if (denied) return denied

  const url = new URL(req.url)
  const status = url.searchParams.get('status')
  const type = url.searchParams.get('type')
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 100)
  const offset = parseInt(url.searchParams.get('offset') ?? '0')

  // # Build filters
  const conditions = []
  if (status) conditions.push(eq(videos.status, status as any))
  if (type) conditions.push(eq(videos.type, type as any))

  const where = conditions.length > 0 ? and(...conditions) : undefined

  const rows = await db
    .select({
      id: videos.id,
      topic: videos.topic,
      type: videos.type,
      status: videos.status,
      template: videos.template,
      createdAt: videos.createdAt,
      reviewedAt: videos.reviewedAt,
      publishedAt: videos.publishedAt,
      qualityScore: videos.qualityScore,
      // # Join render data if exists
      renderUrl: renders.r2Url,
      thumbnailUrl: renders.thumbnailUrl,
      duration: renders.duration,
    })
    .from(videos)
    .leftJoin(renders, eq(videos.id, renders.videoId))
    .where(where)
    .orderBy(desc(videos.createdAt))
    .limit(limit)
    .offset(offset)

  // # Get total count for pagination
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(videos)
    .where(where)

  return NextResponse.json({ videos: rows, total: count, limit, offset })
}
