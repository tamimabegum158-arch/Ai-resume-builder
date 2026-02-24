import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ARTIFACT_PREFIX = 'rb_step_'
const ARTIFACT_SUFFIX = '_artifact'

export type StepStatus = 'pending' | 'uploaded' | 'done'

function getStoredArtifact(step: number): string {
  try {
    return localStorage.getItem(ARTIFACT_PREFIX + String(step).padStart(2, '0') + ARTIFACT_SUFFIX) ?? ''
  } catch {
    return ''
  }
}

function setStoredArtifact(step: number, value: string): void {
  try {
    if (value) localStorage.setItem(ARTIFACT_PREFIX + String(step).padStart(2, '0') + ARTIFACT_SUFFIX, value)
    else localStorage.removeItem(ARTIFACT_PREFIX + String(step).padStart(2, '0') + ARTIFACT_SUFFIX)
  } catch {}
}

export type ProofLinks = { lovable: string; github: string; deploy: string }

type BuildContextValue = {
  stepArtifacts: Record<number, string>
  getArtifact: (step: number) => string
  setArtifact: (step: number, value: string) => void
  hasArtifact: (step: number) => boolean
  proofLinks: ProofLinks
  setProofLinks: (links: Partial<ProofLinks>) => void
  canProceedToStep: (toStep: number) => boolean
}

const BuildContext = createContext<BuildContextValue | null>(null)

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [artifacts, setArtifacts] = useState<Record<number, string>>(() => {
    const out: Record<number, string> = {}
    for (let s = 1; s <= 8; s++) out[s] = getStoredArtifact(s)
    return out
  })
  const [proofLinks, setProofLinksState] = useState<ProofLinks>(() => {
    try {
      const raw = localStorage.getItem('rb_proof_links')
      if (raw) return { ...{ lovable: '', github: '', deploy: '' }, ...JSON.parse(raw) }
    } catch {}
    return { lovable: '', github: '', deploy: '' }
  })

  const getArtifact = useCallback((step: number) => artifacts[step] ?? getStoredArtifact(step), [artifacts])
  const setArtifact = useCallback((step: number, value: string) => {
    setStoredArtifact(step, value)
    setArtifacts((prev) => ({ ...prev, [step]: value }))
  }, [])
  const hasArtifact = useCallback((step: number) => !!((artifacts[step] ?? getStoredArtifact(step))?.trim()), [artifacts])
  const setProofLinks = useCallback((next: Partial<ProofLinks>) => {
    setProofLinksState((prev) => {
      const updated = { ...prev, ...next }
      try { localStorage.setItem('rb_proof_links', JSON.stringify(updated)) } catch {}
      return updated
    })
  }, [])

  const canProceedToStep = useCallback((toStep: number) => {
    if (toStep <= 1) return true
    for (let s = 1; s < toStep; s++) if (!(artifacts[s] ?? getStoredArtifact(s))?.trim()) return false
    return true
  }, [artifacts])

  const value = useMemo<BuildContextValue>(() => ({
    stepArtifacts: artifacts,
    getArtifact,
    setArtifact,
    hasArtifact,
    proofLinks,
    setProofLinks,
    canProceedToStep,
  }), [artifacts, getArtifact, setArtifact, hasArtifact, proofLinks, setProofLinks, canProceedToStep])

  return <BuildContext.Provider value={value}>{children}</BuildContext.Provider>
}

export function useBuild() {
  const ctx = useContext(BuildContext)
  if (!ctx) throw new Error('useBuild must be used within BuildProvider')
  return ctx
}
