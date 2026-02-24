import { createContext, useCallback, useContext, useMemo, useState } from 'react'

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
  period: string
  details: string
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
  skills: string
  links: Links
}

const emptyPersonal: PersonalInfo = { name: '', email: '', phone: '', location: '' }
const emptyLinks: Links = { github: '', linkedin: '' }

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
    { id: 'p1', title: 'Open Source Tool', period: '2022', details: 'CLI tool for developers. 2k+ GitHub stars.' },
  ],
  skills: 'JavaScript, TypeScript, React, Node.js, SQL, Git',
  links: { github: 'https://github.com/alexchen', linkedin: 'https://linkedin.com/in/alexchen' },
}

const initialData: ResumeData = {
  personal: { ...emptyPersonal },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: '',
  links: { ...emptyLinks },
}

function genId() {
  return Math.random().toString(36).slice(2, 10)
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
  setSkills: (s: string) => void
  setLinks: (l: Partial<Links>) => void
  loadSampleData: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(initialData)

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
      projects: [...d.projects, { id: genId(), title: '', period: '', details: '' }],
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
  const setSkills = useCallback((s: string) => {
    setData((d) => ({ ...d, skills: s }))
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
      setSkills,
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
      setSkills,
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
