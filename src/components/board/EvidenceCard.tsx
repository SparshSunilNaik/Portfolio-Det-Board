import { memo, type CSSProperties, type PointerEvent } from 'react'
import type { Project } from '../../types'

const visuals:Record<Project['kind'],string>={dossier:'PERSONNEL FILE',polaroid:'FIELD PHOTOGRAPH',terminal:'TERMINAL RECORD',blueprint:'TECHNICAL SCHEMATIC',report:'RESEARCH REPORT',clipping:'ARCHIVED CLIPPING',telemetry:'TELEMETRY RECORD',note:'INVESTIGATOR NOTE'}

export const EvidenceCard=memo(function EvidenceCard({project,selected,dimmed,onSelect,onPointerDown}:{project:Project;selected:boolean;dimmed:boolean;onSelect:(id:string)=>void;onPointerDown:(event:PointerEvent<HTMLElement>)=>void}){
  const p=project.position;const style={left:p.x,top:p.y,width:p.width,height:p.height,'--rotation':`${p.rotation}deg`} as CSSProperties
  return <article className={`evidence evidence--${project.kind} evidence--${project.category} ${selected?'is-selected':''} ${dimmed?'is-dimmed':''}`} style={style} tabIndex={0} role="button" aria-label={`Inspect ${project.title}`} onPointerDown={onPointerDown} onClick={(e)=>{e.stopPropagation();onSelect(project.id)}} onKeyDown={(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(project.id)}}}>
    <span className="pin"/><span className="evidence-code">{project.caseNo} / {project.recordType==='experience'?'EMPLOYMENT RECORD':project.recordType==='assignment'?'ENGINEERING ASSIGNMENT':visuals[project.kind]}</span>
    {project.category==='experience'&&<div className="employment-band"><span>PROFESSIONAL EXPERIENCE</span><b>{project.employer}</b></div>}
    {project.kind==='polaroid'&&<div className="schematic-art" aria-hidden="true"><span>{project.id==='egonav'?'◉ — ◉ — ◉':project.id==='peter'?'◖  ◗':'◇───◇'}</span><i>{project.category.toUpperCase()} // OPTICAL RECORD</i></div>}
    {project.kind==='terminal'&&<pre aria-hidden="true">$ inspect --case {project.caseNo.toLowerCase()}<br/>status: {project.status.toLowerCase()}<br/>trace: verified_</pre>}
    {project.kind==='telemetry'&&<div className="telemetry-grid" aria-hidden="true"><i/><i/><i/><i/></div>}
    <h2>{project.shortTitle}</h2><p>{project.summary}</p>
    <div className="evidence-footer"><span>{project.year}</span><span>{project.status}</span><b>OPEN FILE ↗</b></div>
  </article>
})
