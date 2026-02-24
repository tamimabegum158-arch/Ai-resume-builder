import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { useTemplate } from '../../context/TemplateContext'
import { TemplateTabs } from '../../components/TemplateTabs'
import { AtsScoreCard } from './AtsScoreCard'
import { BulletGuidance } from './BulletGuidance'
import { LivePreview } from './LivePreview'
import { SkillsSection } from './SkillsSection'
import { ProjectsSection } from './ProjectsSection'
import './BuilderPage.css'

export function BuilderPage() {
  const { template } = useTemplate()
  const [suggestLoading, setSuggestLoading] = useState(false)
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
    addSkill,
    removeSkill,
    addSuggestedSkills,
    setLinks,
    loadSampleData,
  } = useResume()

  const handleSuggestSkills = () => {
    setSuggestLoading(true)
    addSuggestedSkills()
    setTimeout(() => setSuggestLoading(false), 1000)
  }

  const handleAddTech = (id: string, tech: string) => {
    const p = data.projects.find((pr) => pr.id === id)
    if (p) updateProject(id, { techStack: [...(p.techStack || []), tech] })
  }
  const handleRemoveTech = (id: string, index: number) => {
    const p = data.projects.find((pr) => pr.id === id)
    if (p) updateProject(id, { techStack: (p.techStack || []).filter((_, i) => i !== index) })
  }

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

        <ProjectsSection
          projects={data.projects}
          onAdd={addProject}
          onUpdate={updateProject}
          onRemove={removeProject}
          onAddTech={handleAddTech}
          onRemoveTech={handleRemoveTech}
        />

        <SkillsSection
          skills={data.skills}
          onAddSkill={addSkill}
          onRemoveSkill={removeSkill}
          onSuggestSkills={handleSuggestSkills}
          suggestLoading={suggestLoading}
        />

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
