import { useMemo } from 'react'
import { getBulletSuggestions } from '../../utils/bulletGuidance'
import './BulletGuidance.css'

export function BulletGuidance({ details }: { details: string }) {
  const suggestions = useMemo(() => getBulletSuggestions(details), [details])
  if (suggestions.length === 0) return null

  return (
    <div className="bullet-guidance" role="status">
      {suggestions.map((s, i) => (
        <span key={i} className="bullet-guidance-item">{s}</span>
      ))}
    </div>
  )
}
