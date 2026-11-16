import { useEffect, useMemo, useRef, useState, type Dispatch, type PointerEvent, type SetStateAction, type WheelEvent } from 'react'
import { projects, relationships } from '../../data/projects'
import { fitCamera, focusCamera, zoomAt, BOARD } from '../../lib/board'
import { filterProjects } from '../../lib/search'
import { relatedIds } from '../../lib/graph'
import type { Camera, Category } from '../../types'
import { EvidenceCard } from './EvidenceCard'
import { IdentityDossier } from './IdentityDossier'
import { ThreadLayer } from './ThreadLayer'
import { BoardAtmosphere } from './BoardAtmosphere'

interface Props {camera:Camera;setCamera:Dispatch<SetStateAction<Camera>>;selectedId:string|null;onSelect:(id:string|null)=>void;category:Category|'all';query:string;focusRequest:{id:string;nonce:number}|null}
export function InvestigationBoard({camera,setCamera,selectedId,onSelect,category,query,focusRequest}:Props){
  const shell=useRef<HTMLDivElement>(null);const pointers=useRef(new Map<number,{x:number;y:number}>());const drag=useRef<{x:number;y:number;cx:number;cy:number;moved:boolean}|null>(null);const pinch=useRef<{distance:number;camera:Camera;midX:number;midY:number}|null>(null);const reducedMotion=useRef(typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches);const [dragging,setDragging]=useState(false);const [previewId,setPreviewId]=useState<string|null>(null)
  const visible=useMemo(()=>new Set(filterProjects(projects,query,category).map(p=>p.id)),[query,category]);const related=useMemo(()=>selectedId?relatedIds(selectedId,relationships):new Set<string>(),[selectedId])
  const connectionCounts=useMemo(()=>{const counts=new Map<string,number>();relationships.forEach(edge=>{counts.set(edge.source,(counts.get(edge.source)??0)+1);counts.set(edge.target,(counts.get(edge.target)??0)+1)});return counts},[])
  useEffect(()=>{if(!focusRequest)return;const p=projects.find(x=>x.id===focusRequest.id);const box=shell.current?.getBoundingClientRect();if(p&&box)setCamera(focusCamera(p.position,box.width,box.height,.9))},[focusRequest,setCamera])
  const local=(e:{clientX:number;clientY:number})=>{const b=shell.current!.getBoundingClientRect();return{x:e.clientX-b.left,y:e.clientY-b.top}}
  const down=(e:PointerEvent<HTMLDivElement>)=>{if((e.target as HTMLElement).closest('button,a,input,.evidence,.identity-dossier'))return;e.currentTarget.setPointerCapture(e.pointerId);const p=local(e);pointers.current.set(e.pointerId,p);if(pointers.current.size===1){drag.current={x:p.x,y:p.y,cx:camera.x,cy:camera.y,moved:false};setDragging(true)}else if(pointers.current.size===2){const [a,b]=[...pointers.current.values()];pinch.current={distance:Math.hypot(a.x-b.x,a.y-b.y),camera,midX:(a.x+b.x)/2,midY:(a.y+b.y)/2};drag.current=null}}
  const illuminate=(e:PointerEvent<HTMLDivElement>)=>{if(reducedMotion.current||!shell.current)return;const box=shell.current.getBoundingClientRect();const x=44+Math.min(1,Math.max(0,(e.clientX-box.left)/box.width))*16,y=40+Math.min(1,Math.max(0,(e.clientY-box.top)/box.height))*14;shell.current.style.setProperty('--light-x',`${x}%`);shell.current.style.setProperty('--light-y',`${y}%`)}
  const move=(e:PointerEvent<HTMLDivElement>)=>{illuminate(e);if(!pointers.current.has(e.pointerId))return;const p=local(e);pointers.current.set(e.pointerId,p);const activePinch=pinch.current;if(pointers.current.size===2&&activePinch){const [a,b]=[...pointers.current.values()];const midX=(a.x+b.x)/2,midY=(a.y+b.y)/2;setCamera(zoomAt(activePinch.camera,activePinch.midX,activePinch.midY,activePinch.camera.scale*Math.hypot(a.x-b.x,a.y-b.y)/activePinch.distance));setCamera(c=>({...c,x:c.x+(midX-activePinch.midX),y:c.y+(midY-activePinch.midY)}));return}const activeDrag=drag.current;if(activeDrag){const dx=p.x-activeDrag.x,dy=p.y-activeDrag.y;if(Math.abs(dx)+Math.abs(dy)>5)activeDrag.moved=true;setCamera(c=>({...c,x:activeDrag.cx+dx,y:activeDrag.cy+dy}))}}
  const up=(e:PointerEvent<HTMLDivElement>)=>{pointers.current.delete(e.pointerId);if(pointers.current.size<2)pinch.current=null;if(pointers.current.size===0){drag.current=null;setDragging(false)}}
  const wheel=(e:WheelEvent<HTMLDivElement>)=>{e.preventDefault();const p=local(e);setCamera(c=>zoomAt(c,p.x,p.y,c.scale*Math.exp(-e.deltaY*.0012)))}
  const fit=()=>{const b=shell.current!.getBoundingClientRect();setCamera(fitCamera(b.width,b.height))}
  const identity={x:1510,y:850,width:900,height:650,rotation:-.4}
  const first=projects.find(p=>p.id==='cobot')!
  return <div className={`board-viewport ${dragging?'is-dragging':''}`} ref={shell} onPointerDown={down} onPointerMove={move} onPointerLeave={()=>{shell.current?.style.removeProperty('--light-x');shell.current?.style.removeProperty('--light-y');setPreviewId(null)}} onPointerUp={up} onPointerCancel={up} onWheel={wheel} onClick={(e)=>{if(!(e.target as HTMLElement).closest('.evidence,.identity-dossier'))onSelect(null)}}>
    <div className="board" style={{width:BOARD.width,height:BOARD.height,transform:`translate3d(${camera.x}px,${camera.y}px,0) scale(${camera.scale})`}}>
      <BoardAtmosphere/>
      <div className="zone zone--experience"><b>PROFESSIONAL EXPERIENCE — CASE FILES</b></div><div className="zone zone--robotics"><b>A / AUTONOMOUS SYSTEMS</b></div><div className="zone zone--infra"><b>B / INFRASTRUCTURE &amp; CLOUD</b></div><div className="zone zone--agents"><b>C / AGENTS, ASSESSMENT &amp; RETRIEVAL</b></div><div className="zone zone--research"><b>D / MACHINE LEARNING RESEARCH</b></div>
      <ThreadLayer selectedId={selectedId} previewId={previewId}/>
      <div style={{position:'absolute',left:identity.x,top:identity.y,width:identity.width,height:identity.height,transform:`rotate(${identity.rotation}deg)`}}><IdentityDossier onOverview={()=>document.dispatchEvent(new CustomEvent('open-overview'))} onProject={()=>onSelect(first.id)}/></div>
      {projects.map(project=><EvidenceCard key={project.id} project={project} selected={selectedId===project.id} dimmed={!visible.has(project.id)||(selectedId!==null&&project.id!==selectedId&&!related.has(project.id))} connectionCount={connectionCounts.get(project.id)??0} onSelect={onSelect} onPreview={setPreviewId} onPointerDown={e=>e.stopPropagation()}/>) }
    </div>
    <button className="fit-fab" onClick={fit} title="Fit entire board">FIT BOARD</button>
  </div>
}
