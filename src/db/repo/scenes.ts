// # Scene plan CRUD — stores AI Director output for each video

import { db } from '@/db/client'
import { scenePlans } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function createScenePlan(data: typeof scenePlans.$inferInsert) {
  const [plan] = await db.insert(scenePlans).values(data).returning()
  return plan
}

export async function getScenePlanByVideoId(videoId: string) {
  return db.select().from(scenePlans).where(eq(scenePlans.videoId, videoId))
}
