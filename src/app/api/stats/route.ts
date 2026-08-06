// # GET /api/stats — pipeline health dashboard data
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { videos, renders, uploads } from '@/db/schema'
import { sql, gte } from 'drizzle-orm'
import { authCheck } from '../auth'

export async function GET(req: NextRequest) {
  const denied = authCheck(req)
  if (denied) return denied

  const now = Math.floor(Date.now() / 1000)
  const dayAgo = now - 86400
  const weekAgo = now - 604800

  // # Video counts by status
  const statusCounts = await db
    .select({
      status: videos.status,
      count: sql<number>`count(*)`,
    })
    .from(videos)
    .groupBy(videos.status)

  // # Videos created in last 24h
  const [recentVideos] = await db
    .select({ count: sql<number>`count(*)` })
    .from(videos)
    .where(gte(videos.createdAt, dayAgo))

  // # Videos created in last 7d
  const [weekVideos] = await db
    .select({ count: sql<number>`count(*)` })
    .from(videos)
    .where(gte(videos.createdAt, weekAgo))

  // # Average render time (last 7 days)
  const [renderStats] = await db
    .select({
      avgTime: sql<number>`avg(${renders.renderTime})`,
      avgSize: sql<number>`avg(${renders.fileSize})`,
      totalRenders: sql<number>`count(*)`,
    })
    .from(renders)
    .where(gte(renders.createdAt, weekAgo))

  // # Upload success rate (last 7 days)
  const uploadCounts = await db
    .select({
      status: uploads.status,
      count: sql<number>`count(*)`,
    })
    .from(uploads)
    .where(gte(uploads.uploadedAt, weekAgo))
    .groupBy(uploads.status)

  return NextResponse.json({
    statusBreakdown: Object.fromEntries(statusCounts.map((r) => [r.status, r.count])),
    last24h: recentVideos.count,
    last7d: weekVideos.count,
    renderStats: {
      avgTimeSeconds: Math.round(renderStats.avgTime ?? 0),
      avgSizeMB: Math.round((renderStats.avgSize ?? 0) / 1024 / 1024),
      totalRenders: renderStats.totalRenders,
    },
    uploadBreakdown: Object.fromEntries(uploadCounts.map((r) => [r.status, r.count])),
  })
}
