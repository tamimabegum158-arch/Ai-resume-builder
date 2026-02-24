import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useBuild } from '../../context/BuildContext'
import './RBStepPage.css'

const STEP_ORDER = ['01-problem', '02-market', '03-architecture', '04-hld', '05-lld', '06-build', '07-test', '08-ship'] as const

function firstIncompleteStep(hasArtifact: (s: number) => boolean): number {
  for (let s = 1; s <= 8; s++) if (!hasArtifact(s)) return s
  return 9
}

export function RBStepPage() {
  const { stepSlug } = useParams<{ stepSlug: string }>()
  const navigate = useNavigate()
  const { hasArtifact, canProceedToStep } = useBuild()

  const idx = STEP_ORDER.indexOf((stepSlug ?? '') as typeof STEP_ORDER[number])
  const stepNum = idx >= 0 ? idx + 1 : 1
  const currentSlug = idx >= 0 ? STEP_ORDER[idx] : STEP_ORDER[0]

  useEffect(() => {
    if (idx === -1) {
      navigate('/rb/01-problem', { replace: true })
      return
    }
    if (!canProceedToStep(stepNum)) {
      const first = firstIncompleteStep(hasArtifact)
      const target = first <= 8 ? STEP_ORDER[first - 1] : 'proof'
      navigate(`/rb/${target}`, { replace: true })
    }
  }, [idx, stepNum, canProceedToStep, hasArtifact, navigate])
  const hasCurrentArtifact = hasArtifact(stepNum)
  const canGoNext = hasCurrentArtifact
  const prevSlug = stepNum > 1 ? STEP_ORDER[stepNum - 2] : null
  const nextSlug = stepNum < 8 ? STEP_ORDER[stepNum] : null

  const goNext = () => {
    if (nextSlug && canGoNext) navigate(`/rb/${nextSlug}`)
  }
  const goPrev = () => {
    if (prevSlug) navigate(`/rb/${prevSlug}`)
  }

  if (idx === -1) return null

  return (
    <div className="rb-step-page">
      <div className="rb-step-placeholder">
        <p>Step {stepNum} of 8 — {currentSlug}</p>
        <p className="muted">Upload your artifact in the build panel (right), then use &quot;It Worked&quot; to unlock Next.</p>
      </div>
      <nav className="rb-step-nav">
        {prevSlug ? (
          <Link to={`/rb/${prevSlug}`} className="btn btn-outline" onClick={(e) => { e.preventDefault(); goPrev(); }}>
            ← Previous
          </Link>
        ) : (
          <span />
        )}
        <span className="rb-step-indicator">Step {stepNum} of 8</span>
        {nextSlug ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={goNext}
            disabled={!canGoNext}
          >
            Next →
          </button>
        ) : (
          <Link to="/rb/proof" className="btn btn-primary">
            Go to Proof →
          </Link>
        )}
      </nav>
    </div>
  )
}
