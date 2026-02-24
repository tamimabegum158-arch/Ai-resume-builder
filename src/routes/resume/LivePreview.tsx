import type { ResumeData } from '../../context/ResumeContext'
import './LivePreview.css'

export function LivePreview({ data }: { data: ResumeData }) {
  const hasSummary = data.summary.trim() !== ''
  const hasEducation = data.education.length > 0
  const hasExperience = data.experience.length > 0
  const hasProjects = data.projects.length > 0
  const hasSkills = data.skills.trim() !== ''
  const hasLinks = data.links.github.trim() !== '' || data.links.linkedin.trim() !== ''
  const hasAnySection = hasSummary || hasEducation || hasExperience || hasProjects || hasSkills || hasLinks

  return (
    <div className="live-preview">
      <div className="live-preview-inner">
        <div className="live-preview-header">
          <div className="live-preview-name">{data.personal.name || 'Your name'}</div>
          <div className="live-preview-contact">
            {[data.personal.email, data.personal.phone, data.personal.location]
              .filter(Boolean)
              .join(' · ') || 'Email · Phone · Location'}
          </div>
        </div>

        {hasSummary && (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Summary</h3>
            <p className="live-preview-p">{data.summary}</p>
          </section>
        )}

        {hasEducation && (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Education</h3>
            {data.education.map((e) => (
              <div key={e.id} className="live-preview-item">
                <div className="live-preview-item-head">
                  <span className="strong">{e.school || 'School'}</span>
                  <span className="muted">{e.period}</span>
                </div>
                <div className="live-preview-item-sub">{e.degree || 'Degree'}</div>
                {e.details ? <p className="live-preview-p">{e.details}</p> : null}
              </div>
            ))}
          </section>
        )}

        {hasExperience && (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Experience</h3>
            {data.experience.map((e) => (
              <div key={e.id} className="live-preview-item">
                <div className="live-preview-item-head">
                  <span className="strong">{e.role || 'Role'}</span>
                  <span className="muted">{e.period}</span>
                </div>
                <div className="live-preview-item-sub">{e.company || 'Company'}</div>
                {e.details ? <p className="live-preview-p">{e.details}</p> : null}
              </div>
            ))}
          </section>
        )}

        {hasProjects && (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Projects</h3>
            {data.projects.map((p) => (
              <div key={p.id} className="live-preview-item">
                <div className="live-preview-item-head">
                  <span className="strong">{p.title || 'Project'}</span>
                  <span className="muted">{p.period}</span>
                </div>
                {p.details ? <p className="live-preview-p">{p.details}</p> : null}
              </div>
            ))}
          </section>
        )}

        {hasSkills && (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Skills</h3>
            <p className="live-preview-p">{data.skills}</p>
          </section>
        )}

        {hasLinks && (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Links</h3>
            <p className="live-preview-p">
              {[data.links.github, data.links.linkedin].filter(Boolean).join(' · ')}
            </p>
          </section>
        )}

        {!hasAnySection && (
          <p className="live-preview-empty">Fill the form to see your resume here.</p>
        )}
      </div>
    </div>
  )
}
