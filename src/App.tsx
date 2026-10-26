import { useCallback, useEffect, useMemo, useState } from 'react'
import { InvestigationBoard } from './components/board/InvestigationBoard'
import { Dossier } from './components/dossiers/Dossier'
import { GuidedOverview } from './components/dossiers/GuidedOverview'
import { Navigator } from './components/navigation/Navigator'
import { projects } from './data/projects'
import type { Camera, Category } from './types'

const initialCamera: Camera = { x: -690, y: -395, scale: .72 }

export function App() {
  const [selectedId,setSelectedId]=useState<string|null>(()=>new URLSearchParams(location.hash.slice(1)).get('project'))
  const [focusRequest,setFocusRequest]=useState<{id:string;nonce:number}|null>(null)
  const [category,setCategory]=useState<Category|'all'>('all')
  const [query,setQuery]=useState('')
  const [overview,setOverview]=useState(false)
  const [camera,setCamera]=useState<Camera>(initialCamera)
  const selected=projects.find(p=>p.id===selectedId) ?? null
  const selectProject=useCallback((id:string|null)=>{
    setSelectedId(id); const url=new URL(location.href)
    if(id) url.hash=new URLSearchParams({project:id}).toString(); else url.hash=''
    history.replaceState(null,'',url)
  },[])
  const focus=(id:string)=>{setFocusRequest({id,nonce:Date.now()});selectProject(id)}

  useEffect(()=>{const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){selectProject(null);setOverview(false)} if(event.key==='/'&&!event.ctrlKey&&!event.metaKey){event.preventDefault();document.querySelector<HTMLInputElement>('#evidence-search')?.focus()} if(event.key.toLowerCase()==='g')setOverview(true)};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[selectProject])
  useEffect(()=>{const open=()=>setOverview(true);document.addEventListener('open-overview',open);return()=>document.removeEventListener('open-overview',open)},[])

  const counts=useMemo(()=>({projects:projects.filter(p=>!['achievement','education'].includes(p.category)).length,technologies:new Set(projects.flatMap(p=>p.technologies)).size}),[])
  return <main className="app-shell">
    <a className="skip-link" href="#mobile-evidence">Skip to project index</a>
    <InvestigationBoard camera={camera} setCamera={setCamera} selectedId={selectedId} onSelect={selectProject} category={category} query={query} focusRequest={focusRequest} />
    <header className="case-header" aria-label="Case identity"><span className="eyebrow">ENGINEERING INVESTIGATION</span><h1>CASE <i>000</i></h1><p>SPARSH SUNIL NAIK</p><small>{counts.projects} PROJECT FILES · {counts.technologies} TECHNOLOGIES · STATUS: ACTIVE</small></header>
    <Navigator query={query} setQuery={setQuery} category={category} setCategory={setCategory} onFocus={focus} onOverview={()=>setOverview(true)} camera={camera} setCamera={setCamera} />
    <Dossier project={selected} onClose={()=>selectProject(null)} onFocus={focus} />
    {overview&&<GuidedOverview onClose={()=>setOverview(false)} onFocus={(id)=>{setOverview(false);focus(id)}} />}
  </main>
}
