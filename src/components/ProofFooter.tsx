import { Link, useLocation } from 'react-router-dom'

export function ProofFooter() {
  const location = useLocation()
  const isRb = location.pathname.startsWith('/rb')

  if (!isRb) return null

  return (
    <footer className="proof-footer">
      <Link to="/rb/proof" className="proof-footer-link">
        Proof & submission →
      </Link>
    </footer>
  )
}
