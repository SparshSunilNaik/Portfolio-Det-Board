import type { Project } from '../../types'

export function MobileEvidenceReel({items,selectedId,onSelect}:{items:Project[];selectedId:string|null;onSelect:(id:string)=>void}){
  return <section className="mobile-evidence-reel" aria-label="Evidence reel">
    <header><div><span>CASE 000 / EVIDENCE REEL</span><h2>Trace the engineered systems.</h2></div><small>{items.length} FILES<br/>SWIPE OR TAP</small></header>
    <div className="evidence-reel-track">{items.map(project=><button type="button" key={project.id} className={selectedId===project.id?'is-selected':''} onClick={()=>onSelect(project.id)} aria-label={`Show findings for ${project.title}`}><span>{project.caseNo} · {project.status}</span><b>{project.shortTitle}</b><p>{project.summary}</p><small>{project.category}</small></button>)}</div>
  </section>
}
