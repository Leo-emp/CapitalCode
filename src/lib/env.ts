// # Typed environment variable access — throws on missing required vars
export function env(key: string): string {
  const value = process.env[key]?.trim()
  if (!value) throw new Error(`Missing required env var: ${key}`)
  return value
}

// # Optional env var with fallback
export function envOr(key: string, fallback: string): string {
  return process.env[key]?.trim() || fallback
}
