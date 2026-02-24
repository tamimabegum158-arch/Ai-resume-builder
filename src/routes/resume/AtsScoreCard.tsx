import { useMemo } from 'react'
import type { ResumeData } from '../../context/ResumeContext'
import {
  computeAtsScore,
  getAtsSuggestions,
  getAtsBand,
  getAtsBandLabel,
} from '../../utils/atsScore'
import './AtsScoreCard.css'

const RADIUS = 44
const STROKE = 8
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function AtsScoreCard({ data }: { data: ResumeData }) {
  const score = useMemo(() => computeAtsScore(data), [data])
  const suggestions = useMemo(() => getAtsSuggestions(data), [data])
  const band = useMemo(() => getAtsBand(score), [score])
  const bandLabel = useMemo(() => getAtsBandLabel(score), [score])
  const dashOffset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE

  return (
    <div className="ats-score-card">
      <h3 className="ats-score-label">ATS Readiness Score</h3>
      <div className="ats-score-circular-wrap">
        <div className={'ats-score-circle ats-score-circle--' + band} aria-hidden>
          <svg viewBox="0 0 100 100" className="ats-score-svg">
            <circle
              className="ats-score-bg"
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
            />
            <circle
              className="ats-score-progress"
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        <div className="ats-score-center">
          <span className="ats-score-value" aria-live="polite">{score}<span className="ats-score-of">/100</span></span>
          <span className={'ats-score-band ats-score-band--' + band}>{bandLabel}</span>
        </div>
      </div>
      {suggestions.length > 0 && (
        <>
          <h4 className="ats-improvements-title">Improvement suggestions</h4>
          <ul className="ats-suggestions">
            {suggestions.slice(0, 6).map((s, i) => (
              <li key={i}>
                {s.text} (+{s.points} points)
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
