import { useState } from 'react'
import { useBuild } from '../../context/BuildContext'
import './ProofPage.css'

export function ProofPage() {
  const { hasArtifact, proofLinks, setProofLinks } = useBuild()
  const [copied, setCopied] = useState(false)

  const steps = Array.from({ length: 8 }, (_, i) => i + 1)

  const finalSubmission = [
    'AI Resume Builder — Build Track — Project 3',
    '',
    'Steps:',
    ...steps.map((s) => `  Step ${s}: ${hasArtifact(s) ? 'Done' : 'Pending'}`),
    '',
    'Links:',
    `  Lovable: ${proofLinks.lovable || '(not set)'}`,
    `  GitHub: ${proofLinks.github || '(not set)'}`,
    `  Deploy: ${proofLinks.deploy || '(not set)'}`,
  ].join('\n')

  const copyFinalSubmission = () => {
    navigator.clipboard.writeText(finalSubmission)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="proof-page">
      <section className="proof-section">
        <h2>Step status</h2>
        <ul className="proof-step-list">
          {steps.map((s) => (
            <li key={s} className={hasArtifact(s) ? 'done' : 'pending'}>
              Step {s}: {hasArtifact(s) ? 'Done' : 'Pending'}
            </li>
          ))}
        </ul>
      </section>
      <section className="proof-section">
        <h2>Links</h2>
        <div className="proof-inputs">
          <label>
            <span>Lovable link</span>
            <input
              type="url"
              placeholder="https://..."
              value={proofLinks.lovable}
              onChange={(e) => setProofLinks({ lovable: e.target.value })}
            />
          </label>
          <label>
            <span>GitHub link</span>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={proofLinks.github}
              onChange={(e) => setProofLinks({ github: e.target.value })}
            />
          </label>
          <label>
            <span>Deploy link</span>
            <input
              type="url"
              placeholder="https://..."
              value={proofLinks.deploy}
              onChange={(e) => setProofLinks({ deploy: e.target.value })}
            />
          </label>
        </div>
      </section>
      <section className="proof-section">
        <button
          type="button"
          className="btn btn-primary btn-large"
          onClick={copyFinalSubmission}
        >
          {copied ? 'Copied!' : 'Copy Final Submission'}
        </button>
      </section>
    </div>
  )
}
