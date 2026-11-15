import { useEffect, useRef, useState } from 'react'
import { ProfilePortrait } from '../ui/ProfilePortrait'
import { BrandLogo } from '../ui/BrandLogo'
import { REDUCED_MOTION_QUERY, reducedMotionPreferred, type CaseIntakeAction } from '../../lib/caseIntake'

export function CaseIntake({evidenceCount,onComplete,onBriefing}:{evidenceCount:number;onComplete:(action:CaseIntakeAction)=>void;onBriefing:()=>void}){
  const dialog=useRef<HTMLElement>(null)
  const enter=useRef<HTMLButtonElement>(null)
  const timer=useRef<number|null>(null)
  const [reduceMotion]=useState(()=>reducedMotionPreferred(typeof matchMedia==='function'?matchMedia(REDUCED_MOTION_QUERY):null))
  const [leaving,setLeaving]=useState(false)
  const finish=(action:CaseIntakeAction,after?:()=>void)=>{
    if(leaving)return
    if(action==='skip'||reduceMotion){onComplete(action);after?.();return}
    setLeaving(true)
    timer.current=window.setTimeout(()=>{onComplete(action);after?.()},220)
  }
  useEffect(()=>{
    enter.current?.focus()
    const key=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();if(timer.current!==null)clearTimeout(timer.current);onComplete('skip');return}
      if(event.key!=='Tab'||!dialog.current)return
      const controls=[...dialog.current.querySelectorAll<HTMLElement>('button,a[href]')]
      if(!controls.length)return
      const first=controls[0],last=controls[controls.length-1]
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
    addEventListener('keydown',key);return()=>{removeEventListener('keydown',key);if(timer.current!==null)clearTimeout(timer.current)}
  },[onComplete])
  return <section className={`case-intake ${reduceMotion?'reduce-motion':''} ${leaving?'is-leaving':''}`} role="dialog" aria-modal="true" aria-labelledby="intake-title" ref={dialog}>
    <div className="intake-grid" aria-hidden="true"/><div className="intake-thread" aria-hidden="true"/>
    <div className="intake-mark"><BrandLogo/><span><b>CASE 000</b><small>SUBJECT VERIFIED</small></span></div>
    <div className="intake-copy">
      <p className="intake-mobile-subject">SPARSH SUNIL NAIK <span>AI · SOFTWARE · SYSTEMS</span></p>
      <p className="intake-kicker">ENGINEERING INVESTIGATION / EVIDENCE IN MOTION</p>
      <h1 id="intake-title">Every system<br/>leaves a trace.</h1>
      <p>Follow the evidence across intelligent software, autonomous systems, embedded vision, infrastructure, and research.</p>
      <div className="intake-actions"><button className="intake-enter" ref={enter} onClick={()=>finish('enter')}>OPEN CASE FILE <span>↗</span></button><button onClick={()=>finish('enter',onBriefing)}>RECRUITER BRIEFING</button><button className="intake-skip" onClick={()=>finish('skip')}>SKIP INTRO</button></div>
    </div>
    <article className="intake-subject" aria-label="Primary subject: Sparsh Sunil Naik">
      <span className="intake-clip" aria-hidden="true"/><div><small>PRIMARY SUBJECT / CASE 000</small><h2>SPARSH<br/>SUNIL NAIK</h2><b>AI · SOFTWARE · SYSTEMS</b></div><ProfilePortrait/>
      <footer><span>IDENTITY CONFIRMED</span><span>{evidenceCount} PROJECT FILES</span></footer>
    </article>
    <p className="intake-footnote">PRESS ESC TO SKIP · NO ARTIFICIAL LOADING DELAY</p>
  </section>
}
