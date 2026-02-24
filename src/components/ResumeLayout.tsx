import { Link, Outlet, useLocation } from 'react-router-dom'
import './ResumeLayout.css'

const navItems = [
  { path: '/builder', label: 'Builder' },
  { path: '/preview', label: 'Preview' },
  { path: '/proof', label: 'Proof' },
]

export function ResumeLayout() {
  const location = useLocation()

  return (
    <div className="resume-layout">
      <header className="resume-nav">
        <Link to="/" className="resume-nav-brand">
          AI Resume Builder
        </Link>
        <nav className="resume-nav-links">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`resume-nav-link ${location.pathname === path ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="resume-main">
        <Outlet />
      </main>
    </div>
  )
}
