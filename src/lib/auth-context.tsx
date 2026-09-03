'use client'

// # Auth context — stores dashboard password in localStorage
// # Every API call uses authFetch() which adds the Bearer token
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface AuthCtx {
  token: string | null
  login: (password: string) => Promise<boolean>
  logout: () => void
  authFetch: (url: string, opts?: RequestInit) => Promise<Response>
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  // # Load saved token on mount
  useEffect(() => {
    const saved = localStorage.getItem('cc_dashboard_token')
    if (saved) setToken(saved)
    setChecked(true)
  }, [])

  // # Try logging in — verify password against API
  async function login(password: string): Promise<boolean> {
    const res = await fetch('/api/generate', {
      headers: { Authorization: `Bearer ${password}` },
    })
    if (res.status === 401) return false
    // # Any other status means auth passed (even 500 = token valid, server issue)
    localStorage.setItem('cc_dashboard_token', password)
    setToken(password)
    return true
  }

  function logout() {
    localStorage.removeItem('cc_dashboard_token')
    setToken(null)
  }

  // # Wrapper around fetch that auto-adds auth header
  async function authFetch(url: string, opts: RequestInit = {}): Promise<Response> {
    const headers = new Headers(opts.headers)
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return fetch(url, { ...opts, headers })
  }

  // # Don't render until we've checked localStorage
  if (!checked) return null

  return (
    <AuthContext.Provider value={{ token, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
