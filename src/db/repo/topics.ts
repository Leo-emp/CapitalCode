import { eq, desc, isNull } from 'drizzle-orm'
import { db } from '../client'
import { topics, type NewTopic } from '../schema'

export async function createTopic(data: NewTopic) {
  const [row] = await db.insert(topics).values(data).returning()
  return row
}

// # Get topics not yet used — for dedup during topic discovery
export async function getUnusedTopics() {
  return db.query.topics.findMany({ where: isNull(topics.usedAt) })
}

// # Get recently used topics to avoid repeats
export async function getRecentTopics(limit = 50) {
  return db.query.topics.findMany({
    orderBy: desc(topics.usedAt),
    limit,
  })
}

export async function markTopicUsed(id: string) {
  await db.update(topics).set({ usedAt: Math.floor(Date.now() / 1000) }).where(eq(topics.id, id))
}
