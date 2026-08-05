import { eq } from 'drizzle-orm'
import { db } from '../client'
import { videos, scripts, type VideoStatus, type NewVideo, type NewScript } from '../schema'

export async function createVideo(data: NewVideo) {
  const [row] = await db.insert(videos).values(data).returning()
  return row
}

export async function updateVideoStatus(id: string, status: VideoStatus, extra?: Partial<NewVideo>) {
  await db.update(videos).set({ status, ...extra }).where(eq(videos.id, id))
}

export async function getVideoById(id: string) {
  return db.query.videos.findFirst({ where: eq(videos.id, id) })
}

export async function getVideosByStatus(status: VideoStatus) {
  return db.query.videos.findMany({ where: eq(videos.status, status) })
}

export async function createScript(data: NewScript) {
  const [row] = await db.insert(scripts).values(data).returning()
  return row
}

export async function getScriptsByVideoId(videoId: string) {
  return db.query.scripts.findMany({ where: eq(scripts.videoId, videoId) })
}
