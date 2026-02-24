import { useState, useRef } from 'react'
import type { ProjectEntry } from '../../context/ResumeContext'
import { BulletGuidance } from './BulletGuidance'
import './ProjectsSection.css'

const DESCRIPTION_MAX = 200

type Props = {
  projects: ProjectEntry[]
  onAdd: () => void
  onUpdate: (id: string, u: Partial<ProjectEntry>) => void
  onRemove: (id: string) => void
  onAddTech: (id: string, tech: string) => void
  onRemoveTech: (id: string, index: number) => void
}

export function ProjectsSection({ projects, onAdd, onUpdate, onRemove, onAddTech, onRemoveTech }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id ?? null)
  const techInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const handleTechKeyDown = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const input = techInputRefs.current[id]
      const v = input?.value?.trim()
      if (v) {
        onAddTech(id, v)
        if (input) input.value = ''
      }
    }
  }

  return (
    <section className="form-section projects-section">
      <div className="form-section-head">
        <h2 className="form-section-title">Projects</h2>
        <button type="button" className="btn btn-sm" onClick={onAdd}>
          Add Project
        </button>
      </div>
      {projects.map((p) => {
        const isOpen = expandedId === p.id
        const descLen = (p.description ?? '').length
        return (
          <div key={p.id} className="project-accordion-item">
            <button
              type="button"
              className="project-accordion-header"
              onClick={() => toggle(p.id)}
              aria-expanded={isOpen}
            >
              <span className="project-accordion-title">{p.title || 'Untitled Project'}</span>
              <span className="project-accordion-chevron">{isOpen ? '▼' : '▶'}</span>
            </button>
            {isOpen && (
              <div className="project-accordion-body">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={p.title}
                  onChange={(e) => onUpdate(p.id, { title: e.target.value })}
                  className="form-input"
                />
                <div>
                  <textarea
                    placeholder="Description (max 200 characters)"
                    value={p.description ?? ''}
                    onChange={(e) => onUpdate(p.id, { description: e.target.value.slice(0, DESCRIPTION_MAX) })}
                    className="form-textarea form-textarea-sm"
                    rows={3}
                    maxLength={DESCRIPTION_MAX}
                  />
                  <span className="char-count">{descLen}/{DESCRIPTION_MAX}</span>
                </div>
                <BulletGuidance details={p.description ?? ''} />
                <div className="project-tech-wrap">
                  <label className="skill-category-title">Tech Stack</label>
                  <div className="skill-pills-wrap">
                    {(p.techStack ?? []).map((tech, i) => (
                      <span key={`${p.id}-t-${i}`} className="skill-pill">
                        {tech}
                        <button
                          type="button"
                          className="skill-pill-remove"
                          onClick={() => onRemoveTech(p.id, i)}
                          aria-label={`Remove ${tech}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      ref={(el) => { techInputRefs.current[p.id] = el }}
                      type="text"
                      className="skill-tag-input"
                      placeholder="Tech and press Enter"
                      onKeyDown={(e) => handleTechKeyDown(p.id, e)}
                    />
                  </div>
                </div>
                <input
                  type="url"
                  placeholder="Live URL (optional)"
                  value={p.liveUrl ?? ''}
                  onChange={(e) => onUpdate(p.id, { liveUrl: e.target.value })}
                  className="form-input"
                />
                <input
                  type="url"
                  placeholder="GitHub URL (optional)"
                  value={p.githubUrl ?? ''}
                  onChange={(e) => onUpdate(p.id, { githubUrl: e.target.value })}
                  className="form-input"
                />
                <button type="button" className="btn btn-sm btn-remove" onClick={() => onRemove(p.id)}>
                  Delete project
                </button>
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
