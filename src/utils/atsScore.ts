import type { ResumeData } from '../context/ResumeContext'

const SUMMARY_MIN = 40
const SUMMARY_MAX = 120
const SKILLS_TARGET = 8
const PROJECTS_TARGET = 2
const NUMBER_PATTERN = /\d|%|\bk\b|\bK\b|\bx\b|million|thousand/i

function wordCount(s: string): number {
  return s
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

function skillsCount(skills: string): number {
  return skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean).length
}

function hasNumberInBullets(data: ResumeData): boolean {
  const texts = [
    ...data.experience.map((e) => e.details),
    ...data.projects.map((p) => p.details),
  ].filter(Boolean)
  return texts.some((t) => NUMBER_PATTERN.test(t))
}

function educationComplete(data: ResumeData): boolean {
  return data.education.some(
    (e) => e.school.trim() !== '' && e.degree.trim() !== '' && e.period.trim() !== ''
  )
}

export function computeAtsScore(data: ResumeData): number {
  let score = 0
  const words = wordCount(data.summary)
  if (words >= SUMMARY_MIN && words <= SUMMARY_MAX) score += 15
  if (data.projects.length >= PROJECTS_TARGET) score += 10
  if (data.experience.length >= 1) score += 10
  if (skillsCount(data.skills) >= SKILLS_TARGET) score += 10
  if (data.links.github.trim() !== '' || data.links.linkedin.trim() !== '') score += 10
  if (hasNumberInBullets(data)) score += 15
  if (educationComplete(data)) score += 10
  return Math.min(100, score)
}

export function getAtsSuggestions(data: ResumeData): string[] {
  const out: string[] = []
  const words = wordCount(data.summary)
  if (words < SUMMARY_MIN || (words > SUMMARY_MAX && data.summary.trim() !== '')) {
    out.push('Write a stronger summary (40–120 words).')
  }
  if (data.projects.length < PROJECTS_TARGET) {
    out.push('Add at least 2 projects.')
  }
  if (!hasNumberInBullets(data) && (data.experience.length > 0 || data.projects.length > 0)) {
    out.push('Add measurable impact (numbers) in bullets.')
  }
  if (skillsCount(data.skills) < SKILLS_TARGET) {
    out.push('Add more skills (target 8+).')
  }
  if (data.links.github.trim() === '' && data.links.linkedin.trim() === '') {
    out.push('Add a GitHub or LinkedIn link.')
  }
  if (data.experience.length < 1) {
    out.push('Add at least one experience entry.')
  }
  if (!educationComplete(data) && data.education.length > 0) {
    out.push('Complete education section (school, degree, period).')
  }
  return out.slice(0, 3)
}
