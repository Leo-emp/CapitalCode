import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { videos, scripts } from './videos'

// # AI Director output — the visual plan telling Remotion what to render
export const scenePlans = sqliteTable('scene_plans', {
  id: text('id').primaryKey(),
  videoId: text('video_id').notNull().references(() => videos.id),
  scriptId: text('script_id').notNull().references(() => scripts.id),
  sequence: text('sequence').notNull(),            // # JSON: [{scene_type, props, start_frame, duration_frames, ...}]
  aspectRatio: text('aspect_ratio').notNull(),     // # '16:9' | '9:16'
  totalFrames: integer('total_frames').notNull(),
  fps: integer('fps').notNull().default(30),
  createdAt: integer('created_at').notNull(),
}, (t) => [
  index('idx_scene_plans_video').on(t.videoId),
])

export type ScenePlan = typeof scenePlans.$inferSelect
export type NewScenePlan = typeof scenePlans.$inferInsert
