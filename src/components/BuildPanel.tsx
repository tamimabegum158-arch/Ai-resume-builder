import { useState } from 'react'
import { useBuild } from '../context/BuildContext'

type BuildOutcome = 'none' | 'worked' | 'error' | 'screenshot'

export function BuildPanel({ stepNum }: { stepNum: number }) {
  const { getArtifact, setArtifact, hasArtifact } = useBuild()
  const [copyText, setCopyText] = useState('')
  const [outcome, setOutcome] = useState<BuildOutcome>('none')
  const [screenshotData, setScreenshotData] = useState('')

  const artifact = getArtifact(stepNum)

  const handleCopyToClipboard = () => {
    const text = copyText.trim() || artifact
    if (text) {
      navigator.clipboard.writeText(text)
    }
  }

  const handleItWorked = () => {
    const toStore = copyText.trim()
    if (toStore) setArtifact(stepNum, toStore)
    setOutcome('worked')
  }

  const handleError = () => {
    setOutcome('error')
  }

  const handleAddScreenshot = () => {
    const toStore = (copyText.trim() || artifact) + (screenshotData.trim() ? '\n[Screenshot]\n' + screenshotData : '')
    if (toStore) setArtifact(stepNum, toStore)
    setOutcome('screenshot')
  }

  return (
    <div className="build-panel-inner">
      <label className="panel-label">Copy This Into Lovable</label>
      <textarea
        className="panel-textarea"
        placeholder="Paste or type content to copy into Lovable..."
        value={copyText}
        onChange={(e) => setCopyText(e.target.value)}
        rows={6}
      />
      <div className="panel-actions">
        <button type="button" className="btn btn-secondary" onClick={handleCopyToClipboard}>
          Copy
        </button>
        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Build in Lovable
        </a>
      </div>
      <div className="panel-outcomes">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleItWorked}
        >
          It Worked
        </button>
        <button type="button" className="btn btn-danger" onClick={handleError}>
          Error
        </button>
        <button type="button" className="btn btn-outline" onClick={handleAddScreenshot}>
          Add Screenshot
        </button>
      </div>
      {outcome === 'screenshot' && (
        <textarea
          className="panel-textarea mt"
          placeholder="Paste screenshot URL or description..."
          value={screenshotData}
          onChange={(e) => setScreenshotData(e.target.value)}
          rows={2}
        />
      )}
      {hasArtifact(stepNum) && (
        <p className="panel-status success">Step {stepNum} artifact saved.</p>
      )}
    </div>
  )
}
