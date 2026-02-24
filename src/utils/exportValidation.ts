import type { ResumeData } from '../context/ResumeContext'

/**
 * Returns true if resume may look incomplete (warning only; export is never blocked).
 */
export function isResumeIncomplete(data: ResumeData): boolean {
  const hasName = data.personal.name.trim() !== ''
  const hasProjectOrExperience = data.projects.length > 0 || data.experience.length > 0
  return !hasName || !hasProjectOrExperience
}
