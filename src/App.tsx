import { useCallback, useEffect, useMemo, useState } from 'react'
import { InvestigationBoard } from './components/board/InvestigationBoard'
import { Dossier } from './components/dossiers/Dossier'
import { GuidedOverview } from './components/dossiers/GuidedOverview'
import { Navigator } from './components/navigation/Navigator'
import { BrandLogo } from './components/ui/BrandLogo'
import { projects } from './data/projects'
import type { Camera, Category } from './types'

const initialCamera: Camera = { x: -690, y: -395, scale: .72 }

export function App() {
  const [selectedId,setSelectedId]=useState<string|null>(()=>new URLSearchParams(location.hash.slice(1)).get('project'))
  const [focusRequest,setFocusRequest]=useState<{id:string;nonce:number}|null>(null)
  const [category,setCategory]=useState<Category|'all'>('all')
  const [query,setQuery]=useState('')
  const [overview,setOverview]=useState(false)
  const [camera,setCamera]=useState<Camera>(()=>innerWidth<=760?{x:-510,y:-265,scale:.36}:initialCamera)
  const selected=projects.find(p=>p.id===selectedId) ?? null
  const selectProject=useCallback((id:string|null)=>{
    setSelectedId(id); const url=new URL(location.href)
    if(id) url.hash=new URLSearchParams({project:id}).toString(); else url.hash=''
    history.replaceState(null,'',url)
  },[])
  const focus=(id:string)=>{setFocusRequest({id,nonce:Date.now()});selectProject(id)}

  useEffect(()=>{const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){selectProject(null);setOverview(false)} if(event.key==='/'&&!event.ctrlKey&&!event.metaKey){event.preventDefault();document.querySelector<HTMLInputElement>('#evidence-search')?.focus()} if(event.key.toLowerCase()==='g')setOverview(true)};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[selectProject])
  useEffect(()=>{const open=()=>setOverview(true);document.addEventListener('open-overview',open);return()=>document.removeEventListener('open-overview',open)},[])

  const counts=useMemo(()=>({projects:projects.filter(p=>!p.recordType||p.recordType==='project').length,experience:projects.filter(p=>p.recordType==='experience').length,technologies:new Set(projects.flatMap(p=>p.technologies)).size}),[])
  return <main className="app-shell">
    <a className="skip-link" href="#mobile-evidence">Skip to project index</a>
    <InvestigationBoard camera={camera} setCamera={setCamera} selectedId={selectedId} onSelect={selectProject} category={category} query={query} focusRequest={focusRequest} />
    <header className="case-header" aria-label="SparshSunilNaik engineering portfolio"><BrandLogo className="site-logo"/><div className="brand-copy"><h1>SparshSunilNaik</h1><p>CASE 000 / ENGINEERING INVESTIGATION</p><small>{counts.experience} ACTIVE ROLE · {counts.projects} PROJECT FILES · {counts.technologies} TECHNOLOGIES</small></div></header>
    <Navigator query={query} setQuery={setQuery} category={category} setCategory={setCategory} onFocus={focus} onOverview={()=>setOverview(true)} camera={camera} setCamera={setCamera} />
    <Dossier project={selected} onClose={()=>selectProject(null)} onFocus={focus} />
    {overview&&<GuidedOverview onClose={()=>setOverview(false)} onFocus={(id)=>{setOverview(false);focus(id)}} />}
  </main>
}
