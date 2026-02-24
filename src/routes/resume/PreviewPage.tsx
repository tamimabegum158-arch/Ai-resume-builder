import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { useTemplate } from '../../context/TemplateContext'
import { TemplateTabs } from '../../components/TemplateTabs'
import { resumeToPlainText } from '../../utils/resumeToText'
import { isResumeIncomplete } from '../../utils/exportValidation'
import './PreviewPage.css'

export function PreviewPage() {
  const { data } = useResume()
  const { template, accentColor } = useTemplate()
  const [copyFeedback, setCopyFeedback] = useState(false)
  const [pdfToast, setPdfToast] = useState(false)
  const incomplete = isResumeIncomplete(data)

  const handlePrint = () => {
    window.print()
    setPdfToast(true)
    setTimeout(() => setPdfToast(false), 4000)
  }

  const handleCopyText = async () => {
    const text = resumeToPlainText(data)
    try {
      await navigator.clipboard.writeText(text)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    } catch {
      setCopyFeedback(false)
    }
  }

  return (
    <div className="preview-page">
      <div className="preview-export-actions no-print">
        <TemplateTabs />
        {incomplete && (
          <p className="preview-export-warning" role="status">
            Your resume may look incomplete.
          </p>
        )}
        <div className="preview-export-buttons">
          <button type="button" className="btn btn-outline" onClick={handlePrint}>
            Download PDF
          </button>
          <button type="button" className="btn btn-outline" onClick={handleCopyText}>
            {copyFeedback ? 'Copied!' : 'Copy Resume as Text'}
          </button>
        </div>
      </div>
      {pdfToast && (
        <div className="preview-pdf-toast" role="status" aria-live="polite">
          PDF export ready! Check your downloads.
        </div>
      )}
      <article
        className={`preview-resume template-${template} print-resume`}
        style={{ ['--resume-accent' as string]: accentColor }}
      >
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
                {(p.description || p.details) ? (
                  <p className="preview-resume-p">{p.description || p.details}</p>
                ) : null}
                {(p.techStack?.length ?? 0) > 0 && (
                  <p className="preview-resume-p">
                    {(p.techStack ?? []).join(' · ')}
                  </p>
                )}
                {((p.liveUrl?.trim()) || (p.githubUrl?.trim())) && (
                  <p className="preview-resume-p">
                    {[p.liveUrl, p.githubUrl].filter(Boolean).join('  ·  ')}
                  </p>
                )}
              </div>
            ))}
          </section>
        ) : null}

        {(data.skills?.technical?.length ?? 0) + (data.skills?.soft?.length ?? 0) + (data.skills?.tools?.length ?? 0) > 0 ? (
          <section className="preview-resume-section">
            <h2 className="preview-resume-h2">Skills</h2>
            {data.skills?.technical?.length ? (
              <p className="preview-resume-p">
                <strong>Technical:</strong> {(data.skills.technical ?? []).join(', ')}
              </p>
            ) : null}
            {data.skills?.soft?.length ? (
              <p className="preview-resume-p">
                <strong>Soft:</strong> {(data.skills.soft ?? []).join(', ')}
              </p>
            ) : null}
            {data.skills?.tools?.length ? (
              <p className="preview-resume-p">
                <strong>Tools:</strong> {(data.skills.tools ?? []).join(', ')}
              </p>
            ) : null}
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
