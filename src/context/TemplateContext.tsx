import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'resumeBuilderTemplate'
export type TemplateId = 'classic' | 'modern' | 'minimal'

const VALID: TemplateId[] = ['classic', 'modern', 'minimal']

function loadTemplate(): TemplateId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw && VALID.includes(raw as TemplateId)) return raw as TemplateId
  } catch {}
  return 'classic'
}

type TemplateContextValue = {
  template: TemplateId
  setTemplate: (t: TemplateId) => void
}

const TemplateContext = createContext<TemplateContextValue | null>(null)

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [template, setTemplateState] = useState<TemplateId>(loadTemplate)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, template)
    } catch {}
  }, [template])

  const setTemplate = useCallback((t: TemplateId) => {
    setTemplateState(t)
  }, [])

  const value = useMemo(() => ({ template, setTemplate }), [template, setTemplate])

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
