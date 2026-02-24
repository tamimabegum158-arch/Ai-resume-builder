import { useState, useRef } from 'react'
import type { SkillsCategories } from '../../context/ResumeContext'
import './SkillsSection.css'

const CATEGORIES: { key: keyof SkillsCategories; label: string }[] = [
  { key: 'technical', label: 'Technical Skills' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'tools', label: 'Tools & Technologies' },
]

type Props = {
  skills: SkillsCategories
  onAddSkill: (category: keyof SkillsCategories, skill: string) => void
  onRemoveSkill: (category: keyof SkillsCategories, index: number) => void
  onSuggestSkills: () => void
  suggestLoading: boolean
}

export function SkillsSection({ skills, onAddSkill, onRemoveSkill, onSuggestSkills, suggestLoading }: Props) {
  const [inputVal, setInputVal] = useState<Record<keyof SkillsCategories, string>>({
    technical: '',
    soft: '',
    tools: '',
  })
  const inputRefs = useRef<Record<keyof SkillsCategories, HTMLInputElement | null>>({
    technical: null,
    soft: null,
    tools: null,
  })

  const handleKeyDown = (category: keyof SkillsCategories, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const v = inputVal[category].trim()
      if (v) {
        onAddSkill(category, v)
        setInputVal((prev) => ({ ...prev, [category]: '' }))
      }
    }
  }

  return (
    <section className="form-section skills-section">
      <div className="skills-section-header">
        <h2 className="form-section-title">Skills</h2>
        <button
          type="button"
          className="btn btn-outline btn-suggest"
          onClick={onSuggestSkills}
          disabled={suggestLoading}
        >
          {suggestLoading ? 'Adding…' : '✨ Suggest Skills'}
        </button>
      </div>
      {CATEGORIES.map(({ key, label }) => (
        <div key={key} className="skill-category">
          <h3 className="skill-category-title">
            {label} ({skills[key]?.length ?? 0})
          </h3>
          <div className="skill-pills-wrap">
            {(skills[key] ?? []).map((skill, i) => (
              <span key={`${key}-${i}`} className="skill-pill">
                {skill}
                <button
                  type="button"
                  className="skill-pill-remove"
                  onClick={() => onRemoveSkill(key, i)}
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              ref={(el) => { inputRefs.current[key] = el }}
              type="text"
              className="skill-tag-input"
              placeholder="Type and press Enter"
              value={inputVal[key]}
              onChange={(e) => setInputVal((prev) => ({ ...prev, [key]: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(key, e)}
            />
          </div>
        </div>
      ))}
    </section>
  )
}
