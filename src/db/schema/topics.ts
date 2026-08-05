import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const topicCategories = [
  'finance', 'fintech', 'ai_tech', 'crypto', 'economics',
] as const
export type TopicCategory = (typeof topicCategories)[number]

export const topicSources = ['trending', 'evergreen', 'manual'] as const

export const topics = sqliteTable('topics', {
  id: text('id').primaryKey(),
  topic: text('topic').notNull(),
  category: text('category').notNull().$type<TopicCategory>(),
  usedAt: integer('used_at'),
  source: text('source'),                          // # trending | evergreen | manual
  performance: text('performance'),                // # JSON: views, engagement after publish
}, (t) => [
  index('idx_topics_used').on(t.usedAt),
  index('idx_topics_category').on(t.category),
])

export type Topic = typeof topics.$inferSelect
export type NewTopic = typeof topics.$inferInsert

// # Web push notification subscriptions (for "video ready" alerts) — Plan 3
export const pushSubscriptions = sqliteTable('push_subscriptions', {
  id: text('id').primaryKey(),
  endpoint: text('endpoint').notNull(),
  p256dh: text('p256dh').notNull(),
  auth: text('auth').notNull(),
  createdAt: integer('created_at').notNull(),
})

// # Platform OAuth tokens — DB-backed (serverless is ephemeral, can't use JSON files)
export const platformTokens = sqliteTable('platform_tokens', {
  id: text('id').primaryKey(),
  platform: text('platform').notNull(),            // # youtube | tiktok | instagram | facebook
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token'),
  expiresAt: integer('expires_at'),
  scopes: text('scopes'),                          // # JSON array of granted scopes
  updatedAt: integer('updated_at').notNull(),
}, (t) => [
  uniqueIndex('idx_platform_tokens_platform').on(t.platform),
])

export type PlatformToken = typeof platformTokens.$inferSelect
export type NewPlatformToken = typeof platformTokens.$inferInsert
