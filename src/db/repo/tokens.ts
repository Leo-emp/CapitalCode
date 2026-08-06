// # Platform OAuth token management — get, upsert, check expiry
import { eq } from 'drizzle-orm'
import { db } from '../client'
import { platformTokens, type NewPlatformToken } from '../schema'

// # Get token for a platform (youtube, tiktok, instagram)
export async function getToken(platform: string) {
  return db.query.platformTokens.findFirst({
    where: eq(platformTokens.platform, platform),
  })
}

// # Insert or update token for a platform
export async function upsertToken(data: NewPlatformToken) {
  const existing = await getToken(data.platform)
  if (existing) {
    await db.update(platformTokens).set({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? existing.refreshToken,
      expiresAt: data.expiresAt,
      scopes: data.scopes,
      updatedAt: data.updatedAt,
    }).where(eq(platformTokens.platform, data.platform))
    return { ...existing, ...data }
  }
  const [row] = await db.insert(platformTokens).values(data).returning()
  return row
}

// # Check if token is expired (with 5 min buffer)
export function isTokenExpired(expiresAt: number | null): boolean {
  if (!expiresAt) return false // # No expiry = permanent token
  return Date.now() / 1000 > expiresAt - 300 // # 5 min buffer
}
