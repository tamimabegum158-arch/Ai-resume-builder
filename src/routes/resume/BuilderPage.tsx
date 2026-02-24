import { useResume } from '../../context/ResumeContext'
import { useTemplate } from '../../context/TemplateContext'
import { TemplateTabs } from '../../components/TemplateTabs'
import { AtsScoreCard } from './AtsScoreCard'
import { BulletGuidance } from './BulletGuidance'
import { LivePreview } from './LivePreview'
import './BuilderPage.css'

export function BuilderPage() {
  const { template } = useTemplate()
  const {
    data,
    setPersonal,
    setSummary,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    setSkills,
    setLinks,
    loadSampleData,
  } = useResume()

  return (
    <div className="builder-page">
      <div className="builder-column builder-form">
        <div className="builder-actions">
          <button type="button" className="btn btn-outline" onClick={loadSampleData}>
            Load Sample Data
          </button>
        </div>

        <section className="form-section">
          <h2 className="form-section-title">Personal Info</h2>
          <div className="form-fields">
            <input
              type="text"
              placeholder="Full name"
              value={data.personal.name}
              onChange={(e) => setPersonal({ name: e.target.value })}
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={data.personal.email}
              onChange={(e) => setPersonal({ email: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Phone"
              value={data.personal.phone}
              onChange={(e) => setPersonal({ phone: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Location"
              value={data.personal.location}
              onChange={(e) => setPersonal({ location: e.target.value })}
              className="form-input"
            />
          </div>
        </section>

        <section className="form-section">
          <h2 className="form-section-title">Summary</h2>
          <textarea
            placeholder="Professional summary..."
            value={data.summary}
            onChange={(e) => setSummary(e.target.value)}
            className="form-textarea"
            rows={4}
          />
        </section>

        <section className="form-section">
          <div className="form-section-head">
            <h2 className="form-section-title">Education</h2>
            <button type="button" className="btn btn-sm" onClick={addEducation}>
              Add entry
            </button>
          </div>
          {data.education.map((e) => (
            <div key={e.id} className="form-entry">
              <input
                type="text"
                placeholder="School"
                value={e.school}
                onChange={(ev) => updateEducation(e.id, { school: ev.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Degree"
                value={e.degree}
                onChange={(ev) => updateEducation(e.id, { degree: ev.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Period"
                value={e.period}
                onChange={(ev) => updateEducation(e.id, { period: ev.target.value })}
                className="form-input"
              />
              <textarea
                placeholder="Details"
                value={e.details}
                onChange={(ev) => updateEducation(e.id, { details: ev.target.value })}
                className="form-textarea form-textarea-sm"
                rows={2}
              />
              <button type="button" className="btn btn-sm btn-remove" onClick={() => removeEducation(e.id)}>
                Remove
              </button>
            </div>
          ))}
        </section>

        <section className="form-section">
          <div className="form-section-head">
            <h2 className="form-section-title">Experience</h2>
            <button type="button" className="btn btn-sm" onClick={addExperience}>
              Add entry
            </button>
          </div>
          {data.experience.map((e) => (
            <div key={e.id} className="form-entry">
              <input
                type="text"
                placeholder="Company"
                value={e.company}
                onChange={(ev) => updateExperience(e.id, { company: ev.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Role"
                value={e.role}
                onChange={(ev) => updateExperience(e.id, { role: ev.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Period"
                value={e.period}
                onChange={(ev) => updateExperience(e.id, { period: ev.target.value })}
                className="form-input"
              />
              <textarea
                placeholder="Details"
                value={e.details}
                onChange={(ev) => updateExperience(e.id, { details: ev.target.value })}
                className="form-textarea form-textarea-sm"
                rows={2}
              />
              <BulletGuidance details={e.details} />
              <button type="button" className="btn btn-sm btn-remove" onClick={() => removeExperience(e.id)}>
                Remove
              </button>
            </div>
          ))}
        </section>

        <section className="form-section">
          <div className="form-section-head">
            <h2 className="form-section-title">Projects</h2>
            <button type="button" className="btn btn-sm" onClick={addProject}>
              Add entry
            </button>
          </div>
          {data.projects.map((p) => (
            <div key={p.id} className="form-entry">
              <input
                type="text"
                placeholder="Project title"
                value={p.title}
                onChange={(ev) => updateProject(p.id, { title: ev.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Period"
                value={p.period}
                onChange={(ev) => updateProject(p.id, { period: ev.target.value })}
                className="form-input"
              />
              <textarea
                placeholder="Details"
                value={p.details}
                onChange={(ev) => updateProject(p.id, { details: ev.target.value })}
                className="form-textarea form-textarea-sm"
                rows={2}
              />
              <BulletGuidance details={p.details} />
              <button type="button" className="btn btn-sm btn-remove" onClick={() => removeProject(p.id)}>
                Remove
              </button>
            </div>
          ))}
        </section>

        <section className="form-section">
          <h2 className="form-section-title">Skills</h2>
          <input
            type="text"
            placeholder="Comma-separated (e.g. JavaScript, React, SQL)"
            value={data.skills}
            onChange={(e) => setSkills(e.target.value)}
            className="form-input"
          />
        </section>

        <section className="form-section">
          <h2 className="form-section-title">Links</h2>
          <input
            type="url"
            placeholder="GitHub URL"
            value={data.links.github}
            onChange={(e) => setLinks({ github: e.target.value })}
            className="form-input"
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={data.links.linkedin}
            onChange={(e) => setLinks({ linkedin: e.target.value })}
            className="form-input"
          />
        </section>
      </div>

      <div className="builder-column builder-preview">
        <TemplateTabs />
        <AtsScoreCard data={data} />
        <LivePreview data={data} template={template} />
      </div>
    </div>
  )
}
