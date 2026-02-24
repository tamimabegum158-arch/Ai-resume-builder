import type { ResumeData } from '../../context/ResumeContext'
import './LivePreview.css'

export function LivePreview({ data }: { data: ResumeData }) {
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
        {data.summary ? (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Summary</h3>
            <p className="live-preview-p">{data.summary}</p>
          </section>
        ) : (
          <section className="live-preview-section live-preview-placeholder">
            <h3 className="live-preview-h3">Summary</h3>
            <p className="live-preview-p muted">Summary will appear here.</p>
          </section>
        )}
        {data.education.length > 0 ? (
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
        ) : (
          <section className="live-preview-section live-preview-placeholder">
            <h3 className="live-preview-h3">Education</h3>
            <p className="live-preview-p muted">Education entries will appear here.</p>
          </section>
        )}
        {data.experience.length > 0 ? (
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
        ) : (
          <section className="live-preview-section live-preview-placeholder">
            <h3 className="live-preview-h3">Experience</h3>
            <p className="live-preview-p muted">Experience entries will appear here.</p>
          </section>
        )}
        {data.projects.length > 0 ? (
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
        ) : (
          <section className="live-preview-section live-preview-placeholder">
            <h3 className="live-preview-h3">Projects</h3>
            <p className="live-preview-p muted">Projects will appear here.</p>
          </section>
        )}
        {data.skills ? (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Skills</h3>
            <p className="live-preview-p">{data.skills}</p>
          </section>
        ) : (
          <section className="live-preview-section live-preview-placeholder">
            <h3 className="live-preview-h3">Skills</h3>
            <p className="live-preview-p muted">Skills will appear here.</p>
          </section>
        )}
        {(data.links.github || data.links.linkedin) ? (
          <section className="live-preview-section">
            <h3 className="live-preview-h3">Links</h3>
            <p className="live-preview-p">
              {[data.links.github, data.links.linkedin].filter(Boolean).join(' · ')}
            </p>
          </section>
        ) : null}
      </div>
    </div>
  )
}
