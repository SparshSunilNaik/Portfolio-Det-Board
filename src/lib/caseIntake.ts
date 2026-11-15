export const CASE_INTAKE_SESSION_KEY = 'case-000:intake-seen'

export interface SessionStore {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export type CaseIntakeAction = 'enter' | 'skip'
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function shouldShowCaseIntake(store: SessionStore | null, directProject = false) {
  if (directProject) return false
  try { return store?.getItem(CASE_INTAKE_SESSION_KEY) !== '1' } catch { return true }
}

export function resolveCaseIntake(action: CaseIntakeAction, store: SessionStore | null) {
  try { store?.setItem(CASE_INTAKE_SESSION_KEY, '1') } catch { /* Continue without storage. */ }
  return { open: false, action }
}

export function reducedMotionPreferred(media:{matches:boolean}|null){return Boolean(media?.matches)}
