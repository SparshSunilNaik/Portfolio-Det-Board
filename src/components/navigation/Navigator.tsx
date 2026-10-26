import { useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { categories, projects } from '../../data/projects'
import { BOARD, clampScale, fitCamera } from '../../lib/board'
import { filterProjects } from '../../lib/search'
import type { Camera, Category } from '../../types'
import { publicLinks } from '../../data/links'
import { LinkedInIcon } from '../ui/SocialIcon'

interface Props {query:string;setQuery:(value:string)=>void;category:Category|'all';setCategory:(value:Category|'all')=>void;onFocus:(id:string)=>void;onOverview:()=>void;camera:Camera;setCamera:Dispatch<SetStateAction<Camera>>}
export function Navigator({query,setQuery,category,setCategory,onFocus,onOverview,camera,setCamera}:Props){
  const [open,setOpen]=useState(false);const results=useMemo(()=>filterProjects(projects,query,category),[query,category])
  const zoom=(factor:number)=>setCamera(c=>({...c,scale:clampScale(c.scale*factor)}))
  return <>
    <nav className={`navigator ${open?'is-open':''}`} aria-label="Investigation controls">
      <button className="nav-toggle" onClick={()=>setOpen(!open)} aria-expanded={open}>INDEX <span>{results.length}</span></button>
      <div className="nav-body">
        <label className="search-label" htmlFor="evidence-search"><span>SEARCH EVIDENCE</span><input id="evidence-search" type="search" placeholder="project, technology, domain…" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>/</kbd></label>
        <div className="filters" aria-label="Evidence categories">{categories.map(c=><button key={c.id} className={category===c.id?'active':''} onClick={()=>setCategory(c.id)}>{c.label}</button>)}</div>
        <div className="result-list" role="list" id="mobile-evidence">{results.map(project=><button role="listitem" key={project.id} onClick={()=>{onFocus(project.id);setOpen(false)}}><span>{project.caseNo}</span><strong>{project.shortTitle}</strong><small>{project.status}</small></button>)}</div>
        {!results.length&&<p className="empty-results">NO MATCHING EVIDENCE</p>}
        <button className="guided-button" onClick={onOverview}>START GUIDED BRIEFING <kbd>G</kbd></button>
        <div className="contact-links" aria-label="Resume and professional profiles"><a href={publicLinks.resume} target="_blank" rel="noopener noreferrer">VIEW RESUME ↗</a><a href={publicLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><LinkedInIcon/> LINKEDIN</a><a href={publicLinks.github} target="_blank" rel="noopener noreferrer">GITHUB</a></div>
      </div>
    </nav>
    <div className="zoom-controls" aria-label="Board view controls"><button onClick={()=>zoom(1.18)} aria-label="Zoom in">+</button><output>{Math.round(camera.scale*100)}%</output><button onClick={()=>zoom(.84)} aria-label="Zoom out">−</button><button onClick={()=>setCamera(fitCamera(innerWidth,innerHeight))}>⌗</button></div>
    <div className="minimap" aria-hidden="true"><div className="mini-board">{projects.filter(p=>p.featured).map(p=><i key={p.id} style={{left:`${p.position.x/BOARD.width*100}%`,top:`${p.position.y/BOARD.height*100}%`}}/>)}<span style={{width:`${Math.min(100,innerWidth/camera.scale/BOARD.width*100)}%`,height:`${Math.min(100,innerHeight/camera.scale/BOARD.height*100)}%`,left:`${Math.max(0,-camera.x/camera.scale/BOARD.width*100)}%`,top:`${Math.max(0,-camera.y/camera.scale/BOARD.height*100)}%`}}/></div></div>
  </>
}
