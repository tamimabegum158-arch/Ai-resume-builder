import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'resumeBuilderTemplate'
const COLOR_STORAGE_KEY = 'resumeBuilderColor'
export type TemplateId = 'classic' | 'modern' | 'minimal'

export const COLOR_THEMES = [
  { id: 'teal', label: 'Teal', value: 'hsl(168, 60%, 40%)' },
  { id: 'navy', label: 'Navy', value: 'hsl(220, 60%, 35%)' },
  { id: 'burgundy', label: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
  { id: 'forest', label: 'Forest', value: 'hsl(150, 50%, 30%)' },
  { id: 'charcoal', label: 'Charcoal', value: 'hsl(0, 0%, 25%)' },
] as const
export type ColorThemeId = (typeof COLOR_THEMES)[number]['id']

const VALID: TemplateId[] = ['classic', 'modern', 'minimal']

function loadTemplate(): TemplateId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw && VALID.includes(raw as TemplateId)) return raw as TemplateId
  } catch {}
  return 'classic'
}

function loadColor(): ColorThemeId {
  try {
    const raw = localStorage.getItem(COLOR_STORAGE_KEY)
    const ids = COLOR_THEMES.map((t) => t.id)
    if (raw && ids.includes(raw as ColorThemeId)) return raw as ColorThemeId
  } catch {}
  return 'teal'
}

type TemplateContextValue = {
  template: TemplateId
  setTemplate: (t: TemplateId) => void
  colorTheme: ColorThemeId
  setColorTheme: (c: ColorThemeId) => void
  accentColor: string
}

const TemplateContext = createContext<TemplateContextValue | null>(null)

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [template, setTemplateState] = useState<TemplateId>(loadTemplate)
  const [colorTheme, setColorThemeState] = useState<ColorThemeId>(loadColor)
  const accentColor = useMemo(
    () => COLOR_THEMES.find((t) => t.id === colorTheme)?.value ?? COLOR_THEMES[0].value,
    [colorTheme]
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, template)
    } catch {}
  }, [template])

  useEffect(() => {
    try {
      localStorage.setItem(COLOR_STORAGE_KEY, colorTheme)
    } catch {}
  }, [colorTheme])

  const setTemplate = useCallback((t: TemplateId) => setTemplateState(t), [])
  const setColorTheme = useCallback((c: ColorThemeId) => setColorThemeState(c), [])

  const value = useMemo(
    () => ({ template, setTemplate, colorTheme, setColorTheme, accentColor }),
    [template, setTemplate, colorTheme, setColorTheme, accentColor]
  )

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  )
}

export function useTemplate() {
  const ctx = useContext(TemplateContext)
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider')
  return ctx
}
