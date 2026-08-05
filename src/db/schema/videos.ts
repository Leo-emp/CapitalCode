import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'

// # Status progression: generating → ready_for_review → approved → uploading → published
export const videoStatuses = [
  'generating', 'ready_for_review', 'approved',
  'uploading', 'published', 'rejected', 'failed',
] as const
export type VideoStatus = (typeof videoStatuses)[number]

export const videoTypes = ['long_form', 'short_explainer', 'short_data_reveal'] as const
export type VideoType = (typeof videoTypes)[number]

export const videos = sqliteTable('videos', {
  id: text('id').primaryKey(),
  topic: text('topic').notNull(),
  type: text('type').notNull().$type<VideoType>(),
  status: text('status').notNull().$type<VideoStatus>().default('generating'),
  template: text('template').notNull(),           // # Remotion composition name
  createdAt: integer('created_at').notNull(),
  reviewedAt: integer('reviewed_at'),
  publishedAt: integer('published_at'),
  rejectionReason: text('rejection_reason'),
  retryCount: integer('retry_count').default(0),
  qualityScore: text('quality_score'),            // # JSON: safety net results
  metadata: text('metadata'),                     // # JSON blob for extra config
}, (t) => [
  index('idx_videos_status').on(t.status),
  index('idx_videos_created').on(t.createdAt),
])

export type Video = typeof videos.$inferSelect
export type NewVideo = typeof videos.$inferInsert

// # Each video can have multiple scripts — one per platform variant
export const scripts = sqliteTable('scripts', {
  id: text('id').primaryKey(),
  videoId: text('video_id').notNull().references(() => videos.id),
  platform: text('platform').notNull(),            // # youtube_long | tiktok | instagram | youtube_short
  title: text('title').notNull(),
  hook: text('hook').notNull(),                    // # First 3 seconds / first line
  body: text('body').notNull(),                    // # Full script text
  segments: text('segments').notNull(),            // # JSON array of segment objects
  chapters: text('chapters'),                      // # JSON array for YouTube chapters
  wordCount: integer('word_count').notNull(),
  estimatedDuration: integer('estimated_duration').notNull(),  // # seconds
  createdAt: integer('created_at').notNull(),
}, (t) => [
  index('idx_scripts_video').on(t.videoId),
])

export type Script = typeof scripts.$inferSelect
export type NewScript = typeof scripts.$inferInsert
