import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type PersonalInfo = {
  name: string
  email: string
  phone: string
  location: string
}

export type EducationEntry = {
  id: string
  school: string
  degree: string
  period: string
  details: string
}

export type ExperienceEntry = {
  id: string
  company: string
  role: string
  period: string
  details: string
}

export type ProjectEntry = {
  id: string
  title: string
  period?: string
  details?: string
  description: string
  techStack: string[]
  liveUrl: string
  githubUrl: string
}

export type SkillsCategories = {
  technical: string[]
  soft: string[]
  tools: string[]
}

export type Links = {
  github: string
  linkedin: string
}

export type ResumeData = {
  personal: PersonalInfo
  summary: string
  education: EducationEntry[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  skills: SkillsCategories
  links: Links
}

const emptyPersonal: PersonalInfo = { name: '', email: '', phone: '', location: '' }
const emptyLinks: Links = { github: '', linkedin: '' }

const emptySkills: SkillsCategories = { technical: [], soft: [], tools: [] }

const sampleData: ResumeData = {
  personal: {
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary: 'Software engineer with 5+ years of experience building web applications. Focus on clean code, user experience, and scalable systems.',
  education: [
    { id: 'e1', school: 'State University', degree: 'B.S. Computer Science', period: '2015 – 2019', details: 'Relevant coursework, honors.' },
  ],
  experience: [
    { id: 'x1', company: 'Tech Corp', role: 'Senior Software Engineer', period: '2021 – Present', details: 'Led features. Improved performance. Mentored juniors.' },
    { id: 'x2', company: 'Startup Inc', role: 'Software Engineer', period: '2019 – 2021', details: 'Full-stack development. APIs and frontend.' },
  ],
  projects: [
    {
      id: 'p1',
      title: 'Open Source Tool',
      period: '2022',
      details: 'CLI tool for developers. 2k+ GitHub stars.',
      description: 'CLI tool for developers. 2k+ GitHub stars.',
      techStack: ['TypeScript', 'Node.js'],
      liveUrl: '',
      githubUrl: 'https://github.com/alexchen/tool',
    },
  ],
  skills: {
    technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL'],
    soft: ['Team Leadership', 'Problem Solving'],
    tools: ['Git', 'Docker'],
  },
  links: { github: 'https://github.com/alexchen', linkedin: 'https://linkedin.com/in/alexchen' },
}

const STORAGE_KEY = 'resumeBuilderData'

const initialData: ResumeData = {
  personal: { ...emptyPersonal },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: { ...emptySkills },
  links: { ...emptyLinks },
}

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

function ensureId<T extends { id?: string }>(entry: T): T & { id: string } {
  return { ...entry, id: entry.id || genId() } as T & { id: string }
}

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...initialData, personal: { ...emptyPersonal }, links: { ...emptyLinks } }
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return { ...initialData, personal: { ...emptyPersonal }, links: { ...emptyLinks } }
    const personal =
      parsed.personal && typeof parsed.personal === 'object' && !Array.isArray(parsed.personal)
        ? { ...emptyPersonal, ...parsed.personal }
        : { ...emptyPersonal }
    const links =
      parsed.links && typeof parsed.links === 'object' && !Array.isArray(parsed.links)
        ? { ...emptyLinks, ...parsed.links }
        : { ...emptyLinks }
    const education = Array.isArray(parsed.education)
      ? parsed.education.map((e: unknown) => ensureId(e as EducationEntry))
      : []
    const experience = Array.isArray(parsed.experience)
      ? parsed.experience.map((e: unknown) => ensureId(e as ExperienceEntry))
      : []
    const projects = Array.isArray(parsed.projects)
      ? parsed.projects.map((p: unknown) => {
          const x = p as Record<string, unknown>
          const id = (x?.id as string) || genId()
          const title = typeof x?.title === 'string' ? x.title : ''
          const description =
            typeof x?.description === 'string'
              ? x.description
              : typeof x?.details === 'string'
                ? x.details
                : ''
          const techStack = Array.isArray(x?.techStack) ? (x.techStack as string[]) : []
          const liveUrl = typeof x?.liveUrl === 'string' ? x.liveUrl : ''
          const githubUrl = typeof x?.githubUrl === 'string' ? x.githubUrl : ''
          const period = typeof x?.period === 'string' ? x.period : undefined
          const details = typeof x?.details === 'string' ? x.details : undefined
          return {
            id,
            title,
            period,
            details,
            description,
            techStack,
            liveUrl,
            githubUrl,
          } as ProjectEntry
        })
      : []
    let skills: SkillsCategories = { ...emptySkills }
    if (
      parsed.skills &&
      typeof parsed.skills === 'object' &&
      !Array.isArray(parsed.skills) &&
      Array.isArray((parsed.skills as SkillsCategories).technical)
    ) {
      const s = parsed.skills as SkillsCategories
      skills = {
        technical: Array.isArray(s.technical) ? s.technical : [],
        soft: Array.isArray(s.soft) ? s.soft : [],
        tools: Array.isArray(s.tools) ? s.tools : [],
      }
    } else if (typeof parsed.skills === 'string' && parsed.skills.trim()) {
      const list = parsed.skills.split(',').map((x: string) => x.trim()).filter(Boolean)
      skills = { ...emptySkills, technical: list }
    }
    return {
      personal,
      summary: typeof parsed.summary === 'string' ? parsed.summary : '',
      education,
      experience,
      projects,
      skills,
      links,
    }
  } catch {
    return { ...initialData, personal: { ...emptyPersonal }, links: { ...emptyLinks } }
  }
}

function saveToStorage(data: ResumeData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

type ResumeContextValue = {
  data: ResumeData
  setPersonal: (p: Partial<PersonalInfo>) => void
  setSummary: (s: string) => void
  addEducation: () => void
  updateEducation: (id: string, u: Partial<EducationEntry>) => void
  removeEducation: (id: string) => void
  addExperience: () => void
  updateExperience: (id: string, u: Partial<ExperienceEntry>) => void
  removeExperience: (id: string) => void
  addProject: () => void
  updateProject: (id: string, u: Partial<ProjectEntry>) => void
  removeProject: (id: string) => void
  addSkill: (category: keyof SkillsCategories, skill: string) => void
  removeSkill: (category: keyof SkillsCategories, index: number) => void
  addSuggestedSkills: () => void
  setLinks: (l: Partial<Links>) => void
  loadSampleData: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(loadFromStorage)

  useEffect(() => {
    saveToStorage(data)
  }, [data])

  const setPersonal = useCallback((p: Partial<PersonalInfo>) => {
    setData((d) => ({ ...d, personal: { ...d.personal, ...p } }))
  }, [])
  const setSummary = useCallback((s: string) => {
    setData((d) => ({ ...d, summary: s }))
  }, [])
  const addEducation = useCallback(() => {
    setData((d) => ({
      ...d,
      education: [...d.education, { id: genId(), school: '', degree: '', period: '', details: '' }],
    }))
  }, [])
  const updateEducation = useCallback((id: string, u: Partial<EducationEntry>) => {
    setData((d) => ({
      ...d,
      education: d.education.map((e) => (e.id === id ? { ...e, ...u } : e)),
    }))
  }, [])
  const removeEducation = useCallback((id: string) => {
    setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== id) }))
  }, [])
  const addExperience = useCallback(() => {
    setData((d) => ({
      ...d,
      experience: [...d.experience, { id: genId(), company: '', role: '', period: '', details: '' }],
    }))
  }, [])
  const updateExperience = useCallback((id: string, u: Partial<ExperienceEntry>) => {
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) => (e.id === id ? { ...e, ...u } : e)),
    }))
  }, [])
  const removeExperience = useCallback((id: string) => {
    setData((d) => ({ ...d, experience: d.experience.filter((e) => e.id !== id) }))
  }, [])
  const addProject = useCallback(() => {
    setData((d) => ({
      ...d,
      projects: [
        ...d.projects,
        {
          id: genId(),
          title: '',
          description: '',
          techStack: [],
          liveUrl: '',
          githubUrl: '',
        },
      ],
    }))
  }, [])
  const updateProject = useCallback((id: string, u: Partial<ProjectEntry>) => {
    setData((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === id ? { ...p, ...u } : p)),
    }))
  }, [])
  const removeProject = useCallback((id: string) => {
    setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }))
  }, [])
  const addSkill = useCallback((category: keyof SkillsCategories, skill: string) => {
    const trimmed = skill.trim()
    if (!trimmed) return
    setData((d) => ({
      ...d,
      skills: {
        ...d.skills,
        [category]: d.skills[category].includes(trimmed)
          ? d.skills[category]
          : [...d.skills[category], trimmed],
      },
    }))
  }, [])
  const removeSkill = useCallback((category: keyof SkillsCategories, index: number) => {
    setData((d) => ({
      ...d,
      skills: {
        ...d.skills,
        [category]: d.skills[category].filter((_, i) => i !== index),
      },
    }))
  }, [])
  const addSuggestedSkills = useCallback(() => {
    setData((d) => {
      const merge = (arr: string[], add: string[]) => {
        const set = new Set([...arr, ...add])
        return [...set]
      }
      return {
        ...d,
        skills: {
          technical: merge(d.skills.technical, ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL']),
          soft: merge(d.skills.soft, ['Team Leadership', 'Problem Solving']),
          tools: merge(d.skills.tools, ['Git', 'Docker', 'AWS']),
        },
      }
    })
  }, [])
  const setLinks = useCallback((l: Partial<Links>) => {
    setData((d) => ({ ...d, links: { ...d.links, ...l } }))
  }, [])
  const loadSampleData = useCallback(() => {
    setData(JSON.parse(JSON.stringify(sampleData)))
  }, [])

  const value = useMemo<ResumeContextValue>(
    () => ({
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
    }),
    [
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
    ]
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
