import { useMemo } from 'react'
import type { ResumeData } from '../../context/ResumeContext'
import { computeAtsScore, getAtsSuggestions } from '../../utils/atsScore'
import './AtsScoreCard.css'

export function AtsScoreCard({ data }: { data: ResumeData }) {
  const score = useMemo(() => computeAtsScore(data), [data])
  const suggestions = useMemo(() => getAtsSuggestions(data), [data])

  return (
    <div className="ats-score-card">
      <h3 className="ats-score-label">ATS Readiness Score</h3>
      <div className="ats-score-meter">
        <div className="ats-score-track">
          <div className="ats-score-fill" style={{ width: `${score}%` }} />
        </div>
        <span className="ats-score-value">{score}</span>
      </div>
      {suggestions.length > 0 && (
        <ul className="ats-suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
