import type { ResumeData } from '../../context/ResumeContext'
import type { TemplateId } from '../../context/TemplateContext'
import './LivePreview.css'

export function LivePreview({ data, template = 'classic' }: { data: ResumeData; template?: TemplateId }) {
  const hasSummary = data.summary.trim() !== ''
  const hasEducation = data.education.length > 0
  const hasExperience = data.experience.length > 0
  const hasProjects = data.projects.length > 0
  const skillsTotal =
    (data.skills?.technical?.length ?? 0) +
    (data.skills?.soft?.length ?? 0) +
    (data.skills?.tools?.length ?? 0)
  const hasSkills = skillsTotal > 0
  const hasLinks = data.links.github.trim() !== '' || data.links.linkedin.trim() !== ''
  const hasAnySection = hasSummary || hasEducation || hasExperience || hasProjects || hasSkills || hasLinks

  const isModern = template === 'modern'

  return (
    <div className={`live-preview template-${template}`}>
      <div className="live-preview-inner">
        {isModern ? (
          <>
            <div className="live-preview-sidebar">
              <div className="live-preview-header">
                <div className="live-preview-name">{data.personal.name || 'Your name'}</div>
                <div className="live-preview-contact">
                  {[data.personal.email, data.personal.phone, data.personal.location]
                    .filter(Boolean)
                    .join(' · ') || 'Email · Phone · Location'}
                </div>
              </div>
              {hasSkills && (
                <section className="live-preview-section">
                  <h3 className="live-preview-h3">Skills</h3>
                  {(data.skills?.technical?.length ?? 0) > 0 && (
                    <div className="live-preview-skill-group">
                      <span className="live-preview-skill-label">Technical</span>
                      <div className="live-preview-pills">
                        {(data.skills.technical ?? []).map((s, i) => (
                          <span key={`t-${i}`} className="live-preview-pill">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(data.skills?.soft?.length ?? 0) > 0 && (
                    <div className="live-preview-skill-group">
                      <span className="live-preview-skill-label">Soft</span>
                      <div className="live-preview-pills">
                        {(data.skills.soft ?? []).map((s, i) => (
                          <span key={`s-${i}`} className="live-preview-pill">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(data.skills?.tools?.length ?? 0) > 0 && (
                    <div className="live-preview-skill-group">
                      <span className="live-preview-skill-label">Tools</span>
                      <div className="live-preview-pills">
                        {(data.skills.tools ?? []).map((s, i) => (
                          <span key={`w-${i}`} className="live-preview-pill">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>
            <div className="live-preview-main">
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
                    <div key={p.id} className="live-preview-card">
                      <div className="live-preview-card-title">{p.title || 'Project'}</div>
                      {(p.description || p.details) && (
                        <p className="live-preview-p">{p.description || p.details}</p>
                      )}
                      {(p.techStack?.length ?? 0) > 0 && (
                        <div className="live-preview-pills">
                          {(p.techStack ?? []).map((tech, i) => (
                            <span key={`${p.id}-${i}`} className="live-preview-pill">{tech}</span>
                          ))}
                        </div>
                      )}
                      <div className="live-preview-links">
                        {p.liveUrl?.trim() && (
                          <a href={p.liveUrl.trim()} target="_blank" rel="noopener noreferrer" className="live-preview-link" aria-label="Live link">
                            🔗 Live
                          </a>
                        )}
                        {p.githubUrl?.trim() && (
                          <a href={p.githubUrl.trim()} target="_blank" rel="noopener noreferrer" className="live-preview-link" aria-label="GitHub">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
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
              {!hasSummary && !hasEducation && !hasExperience && !hasProjects && !hasLinks && (
                <p className="live-preview-empty">Fill the form to see your resume here.</p>
              )}
            </div>
          </>
        ) : (
          <>
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
              <div key={p.id} className="live-preview-card">
                <div className="live-preview-card-title">{p.title || 'Project'}</div>
                {(p.description || p.details) && (
                  <p className="live-preview-p">{p.description || p.details}</p>
                )}
                {(p.techStack?.length ?? 0) > 0 && (
                  <div className="live-preview-pills">
                    {(p.techStack ?? []).map((tech, i) => (
                      <span key={`${p.id}-${i}`} className="live-preview-pill">{tech}</span>
                    ))}
                  </div>
                )}
                <div className="live-preview-links">
                  {p.liveUrl?.trim() && (
                    <a href={p.liveUrl.trim()} target="_blank" rel="noopener noreferrer" className="live-preview-link" aria-label="Live link">
                      🔗 Live
                    </a>
                  )}
                  {p.githubUrl?.trim() && (
                    <a href={p.githubUrl.trim()} target="_blank" rel="noopener noreferrer" className="live-preview-link" aria-label="GitHub">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {hasSkills && (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Skills</h3>
            {(data.skills?.technical?.length ?? 0) > 0 && (
              <div className="live-preview-skill-group">
                <span className="live-preview-skill-label">Technical</span>
                <div className="live-preview-pills">
                  {(data.skills.technical ?? []).map((s, i) => (
                    <span key={`t-${i}`} className="live-preview-pill">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {(data.skills?.soft?.length ?? 0) > 0 && (
              <div className="live-preview-skill-group">
                <span className="live-preview-skill-label">Soft</span>
                <div className="live-preview-pills">
                  {(data.skills.soft ?? []).map((s, i) => (
                    <span key={`s-${i}`} className="live-preview-pill">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {(data.skills?.tools?.length ?? 0) > 0 && (
              <div className="live-preview-skill-group">
                <span className="live-preview-skill-label">Tools</span>
                <div className="live-preview-pills">
                  {(data.skills.tools ?? []).map((s, i) => (
                    <span key={`w-${i}`} className="live-preview-pill">{s}</span>
                  ))}
                </div>
              </div>
            )}
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
          </>
        )}
      </div>
    </div>
  )
}
