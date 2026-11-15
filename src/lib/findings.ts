import type { Project } from '../types'

const boundaryPattern=/\b(no |not |private|remain|unverified|without|planned|simulation|source|repository reports|claimed|undisclosed)/i

export interface ProjectFinding {
  mission: string
  implementation: string[]
  validation: string[]
  boundary: string[]
}

export function createProjectFinding(project: Project): ProjectFinding {
  const qualified=[...project.results,...project.challenges].filter(item=>boundaryPattern.test(item))
  return {
    mission:project.problem,
    implementation:project.engineered.slice(0,3),
    validation:project.results.slice(0,2),
    boundary:qualified.length?qualified.slice(0,2):[`Evidence source: ${project.source}`],
  }
}
