import { Outlet, useLocation } from 'react-router-dom'
import './PremiumLayout.css'
import { BuildPanel } from './BuildPanel'
import { ProofFooter } from './ProofFooter'

const STEP_SLUGS = ['01-problem', '02-market', '03-architecture', '04-hld', '05-lld', '06-build', '07-test', '08-ship'] as const
const STEP_LABELS: Record<string, string> = {
  '01-problem': 'Problem',
  '02-market': 'Market',
  '03-architecture': 'Architecture',
  '04-hld': 'HLD',
  '05-lld': 'LLD',
  '06-build': 'Build',
  '07-test': 'Test',
  '08-ship': 'Ship',
}

function getStepFromPath(pathname: string): { stepNum: number; label: string } | null {
  for (let i = 0; i < STEP_SLUGS.length; i++) {
    if (pathname.includes('/rb/' + STEP_SLUGS[i])) {
      return { stepNum: i + 1, label: STEP_LABELS[STEP_SLUGS[i]] }
    }
  }
  return null
}

export function PremiumLayout() {
  const location = useLocation()
  const stepInfo = getStepFromPath(location.pathname)
  const isProof = location.pathname.includes('/rb/proof')
  const showBuildPanel = !isProof && stepInfo

  return (
    <div className="premium-layout">
      {/* Top bar */}
      <header className="top-bar">
        <div className="top-bar-left">AI Resume Builder</div>
        <div className="top-bar-center">
          {stepInfo ? `Project 3 — Step ${stepInfo.stepNum} of 8` : isProof ? 'Project 3 — Proof' : 'Project 3'}
        </div>
        <div className="top-bar-right">
          <span className="status-badge">Build Track</span>
        </div>
      </header>

      {/* Context header */}
      <div className="context-header">
        {stepInfo && (
          <>Step {stepInfo.stepNum}: {stepInfo.label}</>
        )}
        {isProof && <>Proof & submission</>}
        {!stepInfo && !isProof && <>AI Resume Builder — Build Track</>}
      </div>

      {/* Main + Build panel row */}
      <div className="workspace-row">
        <main className="main-workspace" style={{ width: showBuildPanel ? '70%' : '100%' }}>
          <Outlet />
        </main>
        {showBuildPanel && stepInfo && (
          <aside className="build-panel">
            <BuildPanel stepNum={stepInfo.stepNum} />
          </aside>
        )}
      </div>

      {/* Proof footer */}
      <ProofFooter />
    </div>
  )
}
