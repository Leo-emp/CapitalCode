import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { videos } from './videos'
import { renders } from './renders'

export const uploadStatuses = ['pending', 'uploading', 'published', 'failed'] as const
export type UploadStatus = (typeof uploadStatuses)[number]

export const uploads = sqliteTable('uploads', {
  id: text('id').primaryKey(),
  videoId: text('video_id').notNull().references(() => videos.id),
  renderId: text('render_id').notNull().references(() => renders.id),
  platform: text('platform').notNull(),            // # youtube | youtube_short | tiktok | instagram
  status: text('status').notNull().$type<UploadStatus>().default('pending'),
  platformId: text('platform_id'),                 // # YouTube video ID, TikTok post ID, etc.
  platformUrl: text('platform_url'),
  title: text('title').notNull(),
  description: text('description').notNull(),
  tags: text('tags'),                              // # JSON array
  hashtags: text('hashtags'),                      // # JSON array
  uploadedAt: integer('uploaded_at'),
  error: text('error'),
  retryCount: integer('retry_count').default(0),
}, (t) => [
  index('idx_uploads_video').on(t.videoId),
  index('idx_uploads_platform_status').on(t.platform, t.status),
])

export type Upload = typeof uploads.$inferSelect
export type NewUpload = typeof uploads.$inferInsert
