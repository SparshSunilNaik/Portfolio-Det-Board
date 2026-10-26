export type Category = 'robotics' | 'infrastructure' | 'agents' | 'research' | 'achievement' | 'education'
export type ProjectStatus = 'Built' | 'Research' | 'In development' | 'Prototype' | 'Supporting evidence'
export type EvidenceKind = 'dossier' | 'polaroid' | 'terminal' | 'blueprint' | 'report' | 'clipping' | 'telemetry' | 'note'
export type RelationType = 'powers' | 'extends' | 'shares-method' | 'validates' | 'informs' | 'documents'

export interface Position { x: number; y: number; width: number; height: number; rotation: number }
export interface Link { label: string; url: string; kind: 'repository' | 'demo' | 'profile' }
export interface Project {
  id: string; caseNo: string; title: string; shortTitle: string; category: Category; status: ProjectStatus; year: string
  kind: EvidenceKind; position: Position; featured?: boolean; summary: string; problem: string; engineered: string[]
  approach: string[]; challenges: string[]; results: string[]; technologies: string[]; links: Link[]; source: string
}
export interface Relationship { id: string; source: string; target: string; type: RelationType; label: string; note: string }
export interface Camera { x: number; y: number; scale: number }
