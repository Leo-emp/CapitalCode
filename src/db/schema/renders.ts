import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { videos } from './videos'
import { scenePlans } from './scenes'

// # Rendered video files stored in Cloudflare R2
export const renders = sqliteTable('renders', {
  id: text('id').primaryKey(),
  videoId: text('video_id').notNull().references(() => videos.id),
  scenePlanId: text('scene_plan_id').notNull().references(() => scenePlans.id),
  aspectRatio: text('aspect_ratio').notNull(),
  r2Url: text('r2_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  subtitleUrl: text('subtitle_url'),
  duration: integer('duration').notNull(),         // # seconds
  fileSize: integer('file_size').notNull(),        // # bytes
  renderTime: integer('render_time').notNull(),    // # ms taken to render
  createdAt: integer('created_at').notNull(),
}, (t) => [
  index('idx_renders_video').on(t.videoId),
])

export type Render = typeof renders.$inferSelect
export type NewRender = typeof renders.$inferInsert
