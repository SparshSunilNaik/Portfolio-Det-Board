import { achievements, projects } from '../../data/projects'
import { publicLinks } from '../../data/links'
import { LinkedInIcon } from '../ui/SocialIcon'

const path=['cobot','egonav','polaris','network-slicing','sentinel']
export function GuidedOverview({onClose,onFocus}:{onClose:()=>void;onFocus:(id:string)=>void}){
  return <div className="overview-backdrop"><article className="overview" role="dialog" aria-modal="true" aria-labelledby="overview-title"><button className="dossier-close" onClick={onClose} aria-label="Close briefing">×</button>
    <span className="eyebrow">RECRUITER BRIEF / 03 MIN READ</span><h2 id="overview-title">THE SHORT CASE</h2><p className="lede">Sparsh is a Computer Science Engineering student specializing in AI who works across the full engineering path: perception and models, APIs and safety controls, containers and clusters, evaluation and operator interfaces.</p>
    <div className="achievement-strip">{achievements.map(a=><div key={a.value}><b>{a.value}</b><span>{a.label}</span></div>)}</div>
    <section className="experience-brief"><span>PROFESSIONAL EXPERIENCE · CASE E-001</span><div><h3>Software Engineering Intern · Entropy Systems</h3><p>Contributing to computer-vision modules, software services, component integration, automated test validation, debugging, and technical documentation.</p><button onClick={()=>onFocus('entropy-systems')}>OPEN EMPLOYMENT FILE ↗</button></div></section>
    <h3>FIVE FILES TO OPEN FIRST</h3><ol className="guided-path">{path.map((id,index)=>{const p=projects.find(x=>x.id===id)!;return <li key={id}><button onClick={()=>onFocus(id)}><span>0{index+1}</span><div><b>{p.shortTitle}</b><p>{p.summary}</p></div><i>OPEN ↗</i></button></li>})}</ol>
    <div className="overview-columns"><section><h3>ENGINEERING RANGE</h3><p>Robotics · Kubernetes · 5G · local AI · RAG · agent governance · deep learning · reinforcement learning · embedded systems</p></section><section><h3>EDUCATION &amp; LEADERSHIP</h3><p>KLE Technological University · B.E. CSE (AI), 9.00/10. Former President, Data Science Club. Core team, AWS Student Builder Club.</p></section></div>
    <footer><a className="resume-link" href={publicLinks.resume} target="_blank" rel="noopener noreferrer">VIEW RESUME ↗</a><a href={publicLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="View Sparsh Sunil Naik on LinkedIn"><LinkedInIcon/> LINKEDIN ↗</a><a href={publicLinks.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><button onClick={()=>window.print()}>PRINT PORTFOLIO SUMMARY</button><small>Official résumé and verified professional profiles.</small></footer>
  </article></div>
}
