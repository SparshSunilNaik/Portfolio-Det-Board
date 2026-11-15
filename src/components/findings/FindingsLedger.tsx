import { useEffect, useMemo, useState } from 'react'
import { projects, relationships } from '../../data/projects'
import { createProjectFinding } from '../../lib/findings'
import type { Project } from '../../types'

export function FindingsLedger({project,onClose,onOpenDossier,onFocus}:{project:Project|null;onClose:()=>void;onOpenDossier:(id:string)=>void;onFocus:(id:string)=>void}){
  const [expanded,setExpanded]=useState(true)
  useEffect(()=>{if(project)setExpanded(true)},[project])
  const edges=useMemo(()=>project?relationships.filter(edge=>edge.source===project.id||edge.target===project.id):[],[project])
  if(!project)return null
  const finding=createProjectFinding(project)
  return <aside className={`findings-ledger ${expanded?'is-expanded':'is-collapsed'}`} aria-label={`Findings for ${project.title}`}>
    <header><div><span>FINDINGS LEDGER</span><small>{project.caseNo} · {project.status.toUpperCase()}</small></div><div><button onClick={()=>setExpanded(value=>!value)} aria-expanded={expanded} aria-label={expanded?'Collapse findings':'Expand findings'}>{expanded?'−':'+'}</button><button onClick={onClose} aria-label="Close findings">×</button></div></header>
    <div className="findings-summary" aria-live="polite"><p>{project.category.toUpperCase()} / VERIFIED FILE</p><h2>{project.shortTitle}</h2><span>{project.summary}</span></div>
    {expanded&&<>
      <LedgerSection title="MISSION"><p>{finding.mission}</p></LedgerSection>
      <LedgerSection title="IMPLEMENTATION"><Bullet items={finding.implementation}/></LedgerSection>
      <LedgerSection title="VALIDATION"><Bullet items={finding.validation}/></LedgerSection>
      <LedgerSection title="EVIDENCE BOUNDARY"><Bullet items={finding.boundary}/></LedgerSection>
      <section className="ledger-related"><h3>RELATED CASES</h3>{edges.length?edges.map(edge=>{const id=edge.source===project.id?edge.target:edge.source;const related=projects.find(item=>item.id===id)!;return <button key={edge.id} onClick={()=>onFocus(id)}><small>{edge.label}</small><b>{related.shortTitle}</b><span>{edge.note}</span></button>}):<p>No typed relationship recorded.</p>}</section>
      <button className="ledger-open" onClick={()=>onOpenDossier(project.id)}>OPEN COMPLETE DOSSIER <span>↗</span></button>
    </>}
  </aside>
}
function LedgerSection({title,children}:{title:string;children:React.ReactNode}){return <section><h3>{title}</h3>{children}</section>}
function Bullet({items}:{items:string[]}){return <ul>{items.map(item=><li key={item}>{item}</li>)}</ul>}
