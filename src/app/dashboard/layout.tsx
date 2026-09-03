'use client'

// # Dashboard layout — dark navy theme with sidebar, auth-gated
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AuthProvider, useAuth } from '@/lib/auth-context'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  )
}

// # Shows login screen if no token, dashboard if authenticated
function AuthGate({ children }: { children: React.ReactNode }) {
  const { token } = useAuth()
  if (!token) return <LoginScreen />
  return <DashboardShell>{children}</DashboardShell>
}

// # Login screen — password input, dark themed
function LoginScreen() {
  const { login } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await login(password)
    if (!ok) {
      setError('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A1628' }}>
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl p-8" style={{ backgroundColor: '#0D1B2A' }}>
        <h1 className="text-2xl font-bold text-center mb-6" style={{ color: '#D4A853', fontFamily: 'Bebas Neue, sans-serif' }}>
          CapitalCode
        </h1>
        <p className="text-slate-400 text-sm text-center mb-6">Enter dashboard password</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 outline-none mb-4"
          style={{ backgroundColor: '#1B2838', border: '1px solid #2A3A4E' }}
          autoFocus
        />

        {error && (
          <p className="text-sm mb-4" style={{ color: '#E74C3C' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-3 rounded-lg text-sm font-bold transition-all"
          style={{
            backgroundColor: loading ? '#2A3A4E' : '#D4A853',
            color: loading ? '#6B7280' : '#0A1628',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

// # Main dashboard shell — sidebar + content
function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0A1628' }}>
      {/* # Sidebar */}
      <nav className="w-56 border-r border-slate-800 p-6 flex flex-col" style={{ backgroundColor: '#0D1B2A' }}>
        <Link href="/dashboard" className="text-2xl font-bold mb-8" style={{ color: '#D4A853', fontFamily: 'Bebas Neue, sans-serif' }}>
          CapitalCode
        </Link>

        <div className="flex flex-col gap-1 flex-1">
          <NavLink href="/dashboard" label="Queue" active={pathname === '/dashboard'} />
          <NavLink href="/dashboard/generate" label="Generate" active={pathname === '/dashboard/generate'} />
          <NavLink href="/dashboard/stats" label="Stats" active={pathname === '/dashboard/stats'} />
        </div>

        {/* # Logout at bottom */}
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors text-xs mt-auto"
        >
          Sign Out
        </button>
      </nav>

      {/* # Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-lg transition-colors text-sm"
      style={{
        backgroundColor: active ? 'rgba(212, 168, 83, 0.1)' : 'transparent',
        color: active ? '#D4A853' : '#94A3B8',
      }}
    >
      {label}
    </Link>
  )
}
