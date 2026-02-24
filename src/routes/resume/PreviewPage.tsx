import { useResume } from '../../context/ResumeContext'
import './PreviewPage.css'

export function PreviewPage() {
  const { data } = useResume()

  return (
    <div className="preview-page">
      <article className="preview-resume">
        <header className="preview-resume-header">
          <h1 className="preview-resume-name">{data.personal.name || 'Your name'}</h1>
          <p className="preview-resume-contact">
            {[data.personal.email, data.personal.phone, data.personal.location]
              .filter(Boolean)
              .join('  ·  ') || '—'}
          </p>
        </header>

        {data.summary ? (
          <section className="preview-resume-section">
            <h2 className="preview-resume-h2">Summary</h2>
            <p className="preview-resume-p">{data.summary}</p>
          </section>
        ) : null}

        {data.education.length > 0 ? (
          <section className="preview-resume-section">
            <h2 className="preview-resume-h2">Education</h2>
            {data.education.map((e) => (
              <div key={e.id} className="preview-resume-item">
                <div className="preview-resume-item-head">
                  <span className="preview-resume-strong">{e.school || 'School'}</span>
                  <span className="preview-resume-muted">{e.period}</span>
                </div>
                <p className="preview-resume-sub">{e.degree || 'Degree'}</p>
                {e.details ? <p className="preview-resume-p">{e.details}</p> : null}
              </div>
            ))}
          </section>
        ) : null}

        {data.experience.length > 0 ? (
          <section className="preview-resume-section">
            <h2 className="preview-resume-h2">Experience</h2>
            {data.experience.map((e) => (
              <div key={e.id} className="preview-resume-item">
                <div className="preview-resume-item-head">
                  <span className="preview-resume-strong">{e.role || 'Role'}</span>
                  <span className="preview-resume-muted">{e.period}</span>
                </div>
                <p className="preview-resume-sub">{e.company || 'Company'}</p>
                {e.details ? <p className="preview-resume-p">{e.details}</p> : null}
              </div>
            ))}
          </section>
        ) : null}

        {data.projects.length > 0 ? (
          <section className="preview-resume-section">
            <h2 className="preview-resume-h2">Projects</h2>
            {data.projects.map((p) => (
              <div key={p.id} className="preview-resume-item">
                <div className="preview-resume-item-head">
                  <span className="preview-resume-strong">{p.title || 'Project'}</span>
                  <span className="preview-resume-muted">{p.period}</span>
                </div>
                {p.details ? <p className="preview-resume-p">{p.details}</p> : null}
              </div>
            ))}
          </section>
        ) : null}

        {data.skills ? (
          <section className="preview-resume-section">
            <h2 className="preview-resume-h2">Skills</h2>
            <p className="preview-resume-p">{data.skills}</p>
          </section>
        ) : null}

        {(data.links.github || data.links.linkedin) ? (
          <section className="preview-resume-section">
            <h2 className="preview-resume-h2">Links</h2>
            <p className="preview-resume-p">
              {[data.links.github, data.links.linkedin].filter(Boolean).join('  ·  ')}
            </p>
          </section>
        ) : null}
      </article>
    </div>
  )
}
