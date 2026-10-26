import { achievements, projects } from '../../data/projects'

const path=['egonav','network-slicing','splitbrain','sentinel','dynamic-pricing']
export function GuidedOverview({onClose,onFocus}:{onClose:()=>void;onFocus:(id:string)=>void}){
  return <div className="overview-backdrop"><article className="overview" role="dialog" aria-modal="true" aria-labelledby="overview-title"><button className="dossier-close" onClick={onClose} aria-label="Close briefing">×</button>
    <span className="eyebrow">RECRUITER BRIEF / 03 MIN READ</span><h2 id="overview-title">THE SHORT CASE</h2><p className="lede">Sparsh is a Computer Science Engineering student specializing in AI who works across the full engineering path: perception and models, APIs and safety controls, containers and clusters, evaluation and operator interfaces.</p>
    <div className="achievement-strip">{achievements.map(a=><div key={a.value}><b>{a.value}</b><span>{a.label}</span></div>)}</div>
    <h3>FIVE FILES TO OPEN FIRST</h3><ol className="guided-path">{path.map((id,index)=>{const p=projects.find(x=>x.id===id)!;return <li key={id}><button onClick={()=>onFocus(id)}><span>0{index+1}</span><div><b>{p.shortTitle}</b><p>{p.summary}</p></div><i>OPEN ↗</i></button></li>})}</ol>
    <div className="overview-columns"><section><h3>ENGINEERING RANGE</h3><p>Robotics · Kubernetes · 5G · local AI · RAG · agent governance · deep learning · reinforcement learning · embedded systems</p></section><section><h3>EDUCATION &amp; LEADERSHIP</h3><p>KLE Technological University · B.E. CSE (AI), 9.00/10. President, Data Science Club. Core team, AWS Student Builder Club.</p></section></div>
    <footer><a href="https://github.com/SparshSunilNaik" target="_blank" rel="noreferrer">GITHUB ↗</a><button onClick={()=>window.print()}>PRINT PUBLIC BRIEF</button><small>Contact through verified GitHub profile. Private phone details are intentionally not published.</small></footer>
  </article></div>
}
