import { useEffect, useRef } from 'react'
import { projects, relationships } from '../../data/projects'
import type { Project } from '../../types'

export function Dossier({project,onClose,onFocus}:{project:Project|null;onClose:()=>void;onFocus:(id:string)=>void}){
  const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{if(project)setTimeout(()=>ref.current?.focus(),50)},[project])
  if(!project)return null
  const edges=relationships.filter(e=>e.source===project.id||e.target===project.id)
  const professional=project.recordType==='experience'||project.recordType==='assignment'
  return <div className="dossier-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <article className={`project-dossier ${professional?'project-dossier--experience':''}`} role="dialog" aria-modal="true" aria-labelledby="dossier-title" tabIndex={-1} ref={ref}>
      <button className="dossier-close" onClick={onClose} aria-label="Close dossier">×</button>
      <header><div><span>{project.caseNo} · {professional?'PROFESSIONAL CASE FILE':project.category.toUpperCase()}</span><h2 id="dossier-title">{project.title}</h2><p>{project.summary}</p></div><div className="status-block"><b>{project.status}</b><small>{project.year}</small></div></header>
      {professional&&<dl className="experience-facts"><div><dt>EMPLOYER</dt><dd>{project.employer}</dd></div><div><dt>ROLE / RECORD</dt><dd>{project.jobTitle}</dd></div><div><dt>DATES</dt><dd>{project.employmentDates}</dd></div></dl>}
      {project.projectRole&&<p className="project-role"><b>PERSONAL ROLE</b><span>{project.projectRole}</span></p>}
      <div className="dossier-grid"><div className="dossier-main"><Section title={professional?'Role overview':'Problem investigated'}><p>{project.problem}</p></Section><Section title={professional?'Responsibilities & contributions':'What was engineered'}><Bullet items={project.engineered}/></Section><Section title={professional?'Engineering approach':'Technical approach'}><Bullet items={project.approach}/></Section><div className="split"><Section title="Engineering challenges"><Bullet items={project.challenges}/></Section><Section title={professional?'Evidence boundary':'Results & validation'}><Bullet items={project.results}/></Section></div></div>
      <aside><section><h3>TECHNOLOGY INDEX</h3><div className="tech-list">{project.technologies.map(t=><span key={t}>{t}</span>)}</div></section><section><h3>RELATED EVIDENCE</h3>{edges.map(edge=>{const id=edge.source===project.id?edge.target:edge.source;const other=projects.find(p=>p.id===id)!;return <button className="related-file" key={edge.id} onClick={()=>onFocus(id)}><small>{edge.label}</small><b>{other.shortTitle}</b><span>{edge.note}</span></button>})}</section><section><h3>VERIFIED LINKS</h3>{project.links.length?project.links.map(link=><a className="external-link" href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.label} ↗</a>):<p className="muted">No public project link verified.</p>}</section><small className="provenance">SOURCE: {project.source}</small></aside></div>
    </article>
  </div>
}
function Section({title,children}:{title:string;children:React.ReactNode}){return <section><h3>{title}</h3>{children}</section>}
function Bullet({items}:{items:string[]}){return <ul>{items.map(item=><li key={item}>{item}</li>)}</ul>}
