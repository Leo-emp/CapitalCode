// # Upload records — track video publishing to each platform
import { eq, and } from 'drizzle-orm'
import { db } from '../client'
import { uploads, type NewUpload, type UploadStatus } from '../schema'

export async function createUpload(data: NewUpload) {
  const [row] = await db.insert(uploads).values(data).returning()
  return row
}

export async function updateUploadStatus(
  id: string,
  status: UploadStatus,
  extra?: Partial<NewUpload>
) {
  await db.update(uploads).set({ status, ...extra }).where(eq(uploads.id, id))
}

export async function getUploadsByVideoId(videoId: string) {
  return db.select().from(uploads).where(eq(uploads.videoId, videoId))
}

export async function getPendingUploads() {
  return db.select().from(uploads).where(eq(uploads.status, 'pending'))
}

export async function getFailedUploads() {
  return db.select().from(uploads).where(
    and(eq(uploads.status, 'failed'), eq(uploads.retryCount, 0))
  )
}
