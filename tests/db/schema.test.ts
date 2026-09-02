import { describe, it, expect } from 'vitest'
import {
  videos, scripts, scenePlans, renders, uploads,
  topics, pushSubscriptions, platformTokens,
  topicCategories,
} from '@/db/schema'
import { getTableName } from 'drizzle-orm'

// # Verify all tables exist and have correct names
describe('database schema', () => {
  it('defines all 8 tables with correct names', () => {
    expect(getTableName(videos)).toBe('videos')
    expect(getTableName(scripts)).toBe('scripts')
    expect(getTableName(scenePlans)).toBe('scene_plans')
    expect(getTableName(renders)).toBe('renders')
    expect(getTableName(uploads)).toBe('uploads')
    expect(getTableName(topics)).toBe('topics')
    expect(getTableName(pushSubscriptions)).toBe('push_subscriptions')
    expect(getTableName(platformTokens)).toBe('platform_tokens')
  })

  it('exports video status default as generating', () => {
    expect(videos.status.default).toBe('generating')
  })

  it('exports 6 topic categories', () => {
    expect(topicCategories).toContain('finance')
    expect(topicCategories).toContain('ai_tech')
    expect(topicCategories).toContain('personal_finance')
    expect(topicCategories.length).toBe(6)
  })
})
