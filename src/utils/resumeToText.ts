import type { ResumeData } from '../context/ResumeContext'

function line(str: string): string {
  return str.trim() || ''
}

function block(title: string, body: string): string {
  const b = line(body)
  if (!b) return ''
  return `${title}\n${b}\n`
}

export function resumeToPlainText(data: ResumeData): string {
  const parts: string[] = []

  parts.push(line(data.personal.name) || 'Name')
  const contact = [data.personal.email, data.personal.phone, data.personal.location]
    .filter(Boolean)
    .join('  ·  ')
  parts.push(line(contact) || '—')
  parts.push('')

  if (data.summary.trim()) {
    parts.push(block('Summary', data.summary))
  }

  if (data.education.length > 0) {
    const edu = data.education
      .map((e) => {
        const sub = [e.school, e.degree, e.period].filter(Boolean).join('  ·  ')
        return [sub, e.details].filter(Boolean).join('\n')
      })
      .join('\n\n')
    parts.push(block('Education', edu))
  }

  if (data.experience.length > 0) {
    const exp = data.experience
      .map((e) => {
        const sub = [e.role, e.company, e.period].filter(Boolean).join('  ·  ')
        return [sub, e.details].filter(Boolean).join('\n')
      })
      .join('\n\n')
    parts.push(block('Experience', exp))
  }

  if (data.projects.length > 0) {
    const proj = data.projects
      .map((p) => {
        const sub = [p.title, p.period].filter(Boolean).join('  ·  ')
        const body = [p.description || p.details, p.techStack?.join(', ')].filter(Boolean).join('\n')
        const links = [p.liveUrl, p.githubUrl].filter(Boolean).join('  ·  ')
        return [sub, body, links].filter(Boolean).join('\n')
      })
      .join('\n\n')
    parts.push(block('Projects', proj))
  }

  const skillParts: string[] = []
  if (data.skills.technical?.length) skillParts.push('Technical: ' + data.skills.technical.join(', '))
  if (data.skills.soft?.length) skillParts.push('Soft: ' + data.skills.soft.join(', '))
  if (data.skills.tools?.length) skillParts.push('Tools: ' + data.skills.tools.join(', '))
  if (skillParts.length) parts.push(block('Skills', skillParts.join('\n')))

  if (data.links.github.trim() || data.links.linkedin.trim()) {
    const links = [data.links.github, data.links.linkedin].filter(Boolean).join('  ·  ')
    parts.push(block('Links', links))
  }

  return parts.join('\n').trim() || 'Resume (empty)'
}
