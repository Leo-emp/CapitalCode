// # Render records — maps video renders stored in R2
import { eq } from 'drizzle-orm'
import { db } from '../client'
import { renders, type NewRender } from '../schema'

export async function createRender(data: NewRender) {
  const [row] = await db.insert(renders).values(data).returning()
  return row
}

export async function getRenderByVideoId(videoId: string) {
  return db.select().from(renders).where(eq(renders.videoId, videoId))
}
