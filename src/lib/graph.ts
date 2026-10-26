import type { Project, Relationship } from '../types'
export function validateGraph(nodes: Project[], edges: Relationship[]) {
  const errors:string[]=[]; const ids=new Set<string>(); const edgeIds=new Set<string>()
  nodes.forEach(n=>{if(ids.has(n.id)) errors.push(`Duplicate project: ${n.id}`); ids.add(n.id); if(!n.title||!n.summary||!n.technologies.length) errors.push(`Incomplete project: ${n.id}`); n.links.forEach(l=>{try{const u=new URL(l.url);if(u.protocol!=='https:') errors.push(`Non-HTTPS link: ${n.id}`)}catch{errors.push(`Invalid link: ${n.id}`)}})})
  edges.forEach(e=>{if(edgeIds.has(e.id)) errors.push(`Duplicate relationship: ${e.id}`);edgeIds.add(e.id);if(!ids.has(e.source)||!ids.has(e.target))errors.push(`Missing endpoint: ${e.id}`);if(e.source===e.target)errors.push(`Self relationship: ${e.id}`)})
  return {valid:errors.length===0,errors}
}
export const relatedIds=(id:string,edges:Relationship[])=>new Set(edges.filter(e=>e.source===id||e.target===id).flatMap(e=>[e.source,e.target]))
