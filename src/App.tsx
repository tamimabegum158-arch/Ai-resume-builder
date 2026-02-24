import { Routes, Route, Navigate } from 'react-router-dom'
import { BuildProvider } from './context/BuildContext'
import { ResumeProvider } from './context/ResumeContext'
import { PremiumLayout } from './components/PremiumLayout'
import { ResumeLayout } from './components/ResumeLayout'
import { RBStepPage } from './routes/rb/RBStepPage'
import { ProofPage } from './routes/rb/ProofPage'
import { HomePage } from './routes/resume/HomePage'
import { BuilderPage } from './routes/resume/BuilderPage'
import { PreviewPage } from './routes/resume/PreviewPage'
import { ProofPlaceholder } from './routes/resume/ProofPlaceholder'

export default function App() {
  return (
    <BuildProvider>
      <ResumeProvider>
        <Routes>
          <Route element={<ResumeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/proof" element={<ProofPlaceholder />} />
          </Route>
          <Route path="/rb" element={<Navigate to="/rb/01-problem" replace />} />
          <Route element={<PremiumLayout />}>
            <Route path="/rb/01-problem" element={<RBStepPage />} />
            <Route path="/rb/02-market" element={<RBStepPage />} />
            <Route path="/rb/03-architecture" element={<RBStepPage />} />
            <Route path="/rb/04-hld" element={<RBStepPage />} />
            <Route path="/rb/05-lld" element={<RBStepPage />} />
            <Route path="/rb/06-build" element={<RBStepPage />} />
            <Route path="/rb/07-test" element={<RBStepPage />} />
            <Route path="/rb/08-ship" element={<RBStepPage />} />
            <Route path="/rb/proof" element={<ProofPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ResumeProvider>
    </BuildProvider>
  )
}
