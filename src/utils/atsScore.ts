import type { ResumeData } from '../context/ResumeContext'

const ACTION_VERBS =
  /\b(built|led|designed|improved|created|developed|implemented|managed|delivered|achieved|increased|reduced|launched|established|coordinated|optimized|automated|architected|mentored|spearheaded|drove)\b/i

function skillsCount(skills: ResumeData['skills']): number {
  if (!skills || typeof skills !== 'object' || Array.isArray(skills)) return 0
  return (
    (skills.technical?.length ?? 0) +
    (skills.soft?.length ?? 0) +
    (skills.tools?.length ?? 0)
  )
}

function hasExperienceWithBullets(data: ResumeData): boolean {
  return data.experience.some((e) => (e.details ?? '').trim().length > 0)
}

function summaryHasActionVerbs(summary: string): boolean {
  return ACTION_VERBS.test(summary.trim())
}

export function computeAtsScore(data: ResumeData): number {
  let score = 0
  if ((data.personal.name ?? '').trim() !== '') score += 10
  if ((data.personal.email ?? '').trim() !== '') score += 10
  if ((data.personal.phone ?? '').trim() !== '') score += 5
  if ((data.summary ?? '').trim().length > 50) score += 10
  if (summaryHasActionVerbs(data.summary ?? '')) score += 10
  if (hasExperienceWithBullets(data)) score += 15
  if (data.education.length >= 1) score += 10
  if (skillsCount(data.skills) >= 5) score += 10
  if (data.projects.length >= 1) score += 10
  if ((data.links.linkedin ?? '').trim() !== '') score += 5
  if ((data.links.github ?? '').trim() !== '') score += 5
  return Math.min(100, score)
}

export type AtsSuggestion = { text: string; points: number }

export function getAtsSuggestions(data: ResumeData): AtsSuggestion[] {
  const out: AtsSuggestion[] = []
  if ((data.personal.name ?? '').trim() === '') out.push({ text: 'Add your name', points: 10 })
  if ((data.personal.email ?? '').trim() === '') out.push({ text: 'Add your email', points: 10 })
  if ((data.personal.phone ?? '').trim() === '') out.push({ text: 'Add your phone number', points: 5 })
  if ((data.summary ?? '').trim().length <= 50 && (data.summary ?? '').trim().length > 0)
    out.push({ text: 'Write a longer professional summary (over 50 characters)', points: 10 })
  if ((data.summary ?? '').trim().length === 0)
    out.push({ text: 'Add a professional summary', points: 20 })
  else if (!summaryHasActionVerbs(data.summary ?? ''))
    out.push({ text: 'Use action verbs in your summary (e.g. built, led, designed, improved)', points: 10 })
  if (!hasExperienceWithBullets(data) && data.experience.length > 0)
    out.push({ text: 'Add bullet points to at least one experience entry', points: 15 })
  if (data.experience.length === 0)
    out.push({ text: 'Add at least one experience entry with bullets', points: 15 })
  if (data.education.length === 0) out.push({ text: 'Add at least one education entry', points: 10 })
  if (skillsCount(data.skills) < 5)
    out.push({ text: `Add at least 5 skills (you have ${skillsCount(data.skills)})`, points: 10 })
  if (data.projects.length === 0) out.push({ text: 'Add at least one project', points: 10 })
  if ((data.links.linkedin ?? '').trim() === '')
    out.push({ text: 'Add your LinkedIn URL', points: 5 })
  if ((data.links.github ?? '').trim() === '')
    out.push({ text: 'Add your GitHub URL', points: 5 })
  return out
}

export function getAtsBand(score: number): 'needs-work' | 'getting-there' | 'strong' {
  if (score <= 40) return 'needs-work'
  if (score <= 70) return 'getting-there'
  return 'strong'
}

export function getAtsBandLabel(score: number): string {
  const band = getAtsBand(score)
  if (band === 'needs-work') return 'Needs Work'
  if (band === 'getting-there') return 'Getting There'
  return 'Strong Resume'
}
