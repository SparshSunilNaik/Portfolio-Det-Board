import { useCallback, useEffect, useMemo, useState } from 'react'
import { InvestigationBoard } from './components/board/InvestigationBoard'
import { Dossier } from './components/dossiers/Dossier'
import { GuidedOverview } from './components/dossiers/GuidedOverview'
import { Navigator } from './components/navigation/Navigator'
import { BrandLogo } from './components/ui/BrandLogo'
import { CaseIntake } from './components/intake/CaseIntake'
import { FindingsLedger } from './components/findings/FindingsLedger'
import { projects } from './data/projects'
import { resolveCaseIntake, shouldShowCaseIntake, type CaseIntakeAction } from './lib/caseIntake'
import type { Camera, Category } from './types'

export const INITIAL_CAMERA: Camera = { x: -690, y: -395, scale: .72 }

export function App() {
  const directProject=useMemo(()=>{const id=new URLSearchParams(location.hash.slice(1)).get('project');return projects.some(project=>project.id===id)?id:null},[])
  const [selectedId,setSelectedId]=useState<string|null>(directProject)
  const [dossierId,setDossierId]=useState<string|null>(directProject)
  const [focusRequest,setFocusRequest]=useState<{id:string;nonce:number}|null>(null)
  const [category,setCategory]=useState<Category|'all'>('all')
  const [query,setQuery]=useState('')
  const [overview,setOverview]=useState(false)
  const [intakeOpen,setIntakeOpen]=useState(()=>{let store:Storage|null=null;try{store=sessionStorage}catch{return shouldShowCaseIntake(null,Boolean(directProject))}return shouldShowCaseIntake(store,Boolean(directProject))})
  const [camera,setCamera]=useState<Camera>(()=>innerWidth<=760?{x:-510,y:-265,scale:.36}:INITIAL_CAMERA)
  const selected=projects.find(p=>p.id===selectedId) ?? null
  const dossier=projects.find(p=>p.id===dossierId) ?? null
  const selectEvidence=useCallback((id:string|null)=>setSelectedId(id),[])
  const setProjectHash=useCallback((id:string|null)=>{const url=new URL(location.href);if(id)url.hash=new URLSearchParams({project:id}).toString();else url.hash='';history.replaceState(null,'',url)},[])
  const openDossier=useCallback((id:string)=>{setSelectedId(id);setDossierId(id);setProjectHash(id)},[setProjectHash])
  const closeDossier=useCallback(()=>{setDossierId(null);setProjectHash(null)},[setProjectHash])
  const focus=(id:string)=>{setFocusRequest({id,nonce:Date.now()});selectEvidence(id)}
  const focusDossier=(id:string)=>{setFocusRequest({id,nonce:Date.now()});openDossier(id)}
  const completeIntake=useCallback((action:CaseIntakeAction)=>{let store:Storage|null=null;try{store=sessionStorage}catch{store=null}setIntakeOpen(resolveCaseIntake(action,store).open)},[])

  useEffect(()=>{const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){if(overview)setOverview(false);else if(dossierId)closeDossier();else selectEvidence(null)} if(event.key==='/'&&!event.ctrlKey&&!event.metaKey){event.preventDefault();document.querySelector<HTMLInputElement>('#evidence-search')?.focus()} if(event.key.toLowerCase()==='g'&&!intakeOpen)setOverview(true)};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[closeDossier,dossierId,intakeOpen,overview,selectEvidence])
  useEffect(()=>{const open=()=>setOverview(true);document.addEventListener('open-overview',open);return()=>document.removeEventListener('open-overview',open)},[])

  const counts=useMemo(()=>({projects:projects.filter(p=>!p.recordType||p.recordType==='project').length,currentExperience:projects.filter(p=>p.recordType==='experience'&&p.status==='Current').length,technologies:new Set(projects.flatMap(p=>p.technologies)).size}),[])
  return <main className={`app-shell case-aperture-shell ${intakeOpen?'intake-is-open':''}`}>
    <a className="skip-link" href="#mobile-evidence">Skip to project index</a>
    <InvestigationBoard camera={camera} setCamera={setCamera} selectedId={selectedId} onSelect={selectEvidence} category={category} query={query} focusRequest={focusRequest} />
    <header className="case-header" aria-label="SparshSunilNaik engineering portfolio"><BrandLogo className="site-logo"/><div className="brand-copy"><h1>SparshSunilNaik</h1><p>CASE 000 / ENGINEERING INVESTIGATION</p><small>{counts.currentExperience} CURRENT ROLE · {counts.projects} PROJECT FILES · {counts.technologies} TECHNOLOGIES</small></div></header>
    <div className="investigation-signal" aria-hidden="true"><span>ACTIVE INVESTIGATION</span><i/><b>VERIFIED EVIDENCE</b></div>
    <Navigator query={query} setQuery={setQuery} category={category} setCategory={setCategory} selectedId={selectedId} onFocus={focus} onOverview={()=>setOverview(true)} camera={camera} setCamera={setCamera} />
    <FindingsLedger project={selected} onClose={()=>selectEvidence(null)} onOpenDossier={openDossier} onFocus={focus}/>
    <Dossier project={dossier} onClose={closeDossier} onFocus={focusDossier} />
    {overview&&<GuidedOverview onClose={()=>setOverview(false)} onFocus={(id)=>{setOverview(false);focusDossier(id)}} />}
    {intakeOpen&&<CaseIntake evidenceCount={counts.projects} onComplete={completeIntake} onBriefing={()=>setOverview(true)}/>}
  </main>
}
