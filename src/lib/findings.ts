import type { Project } from '../types'

const boundaryPattern=/\b(no |not |private|remain|unverified|without|planned|simulation|source|repository reports|claimed|undisclosed)/i

export interface ProjectFinding {
  mission: string
  implementation: string[]
  validation: string[]
  boundary: string[]
}

export function createProjectFinding(project: Project): ProjectFinding {
  const validation=project.results.slice(0,2)
  const qualified=[...project.results.slice(2),...project.challenges].filter(item=>boundaryPattern.test(item)&&!validation.includes(item))
  return {
    mission:project.problem,
    implementation:project.engineered.slice(0,3),
    validation,
    boundary:qualified.length?qualified.slice(0,2):[`Evidence source: ${project.source}`],
  }
}
