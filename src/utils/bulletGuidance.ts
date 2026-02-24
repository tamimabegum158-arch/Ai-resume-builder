const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated', 'managed', 'delivered', 'launched',
]

const NUMBER_PATTERN = /\d|%|\bk\b|\bK\b|\bx\b|million|thousand/i

function getBulletLines(details: string): string[] {
  return details
    .trim()
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function startsWithActionVerb(line: string): boolean {
  const first = (line.split(/\s+/)[0] ?? '').toLowerCase().replace(/[,.]/g, '')
  return first !== '' && ACTION_VERBS.some((v) => first === v)
}

export function getBulletSuggestions(details: string): string[] {
  const out: string[] = []
  const lines = getBulletLines(details)
  if (lines.length === 0) return out
  const needsVerb = lines.some((line) => !startsWithActionVerb(line))
  if (needsVerb) out.push('Start with a strong action verb.')
  if (!NUMBER_PATTERN.test(details)) out.push('Add measurable impact (numbers).')
  return out
}
