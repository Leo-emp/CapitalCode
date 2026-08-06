// # Dashboard layout — dark navy theme with sidebar navigation
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0A1628' }}>
      {/* # Sidebar */}
      <nav className="w-56 border-r border-slate-800 p-6 flex flex-col gap-2" style={{ backgroundColor: '#0D1B2A' }}>
        <Link href="/dashboard" className="text-2xl font-bold mb-8" style={{ color: '#D4A853', fontFamily: 'Bebas Neue, sans-serif' }}>
          CapitalCode
        </Link>
        <NavLink href="/dashboard" label="Queue" />
        <NavLink href="/dashboard/stats" label="Stats" />
      </nav>
      {/* # Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-sm"
    >
      {label}
    </Link>
  )
}
