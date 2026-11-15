import { useEffect, useMemo, useRef, useState } from 'react'
import { audioArchiveTrack } from '../../data/audio'
import { AudioArchiveController, INITIAL_AUDIO_STATE, formatAudioTime, readAudioPreferences, waveformShouldAnimate, writeAudioPreferences } from '../../lib/audioArchive'

const levels=[.28,.54,.76,.42,.88,.61,.36,.72,.48,.92,.57,.31,.68,.83,.45,.74,.39,.64,.51,.79]
const labels={idle:'ARCHIVE READY',loading:'BUFFERING',paused:'PAUSED',playing:'PLAYING',ended:'ARCHIVE COMPLETE',error:'SIGNAL ERROR'} as const
const localStore=()=>{try{return typeof window==='undefined'?null:window.localStorage}catch{return null}}
export const audioArchiveStartsExpanded=(width:number,height:number)=>width>=1400&&height>=820

export function AudioArchive({obscured=false}:{obscured?:boolean}){
  const audio=useRef<HTMLAudioElement>(null)
  const controller=useRef<AudioArchiveController|null>(null)
  const preferences=useMemo(()=>readAudioPreferences(localStore()),[])
  const [state,setState]=useState({...INITIAL_AUDIO_STATE,...preferences})
  const [expanded,setExpanded]=useState(()=>typeof innerWidth==='number'&&typeof innerHeight==='number'&&audioArchiveStartsExpanded(innerWidth,innerHeight))
  const [reducedMotion]=useState(()=>typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches)
  const visibleStatus=state.error?'error':state.status
  const animated=waveformShouldAnimate(visibleStatus,reducedMotion)
  useEffect(()=>{
    if(!audio.current)return
    const instance=new AudioArchiveController(audio.current,setState,preferences);controller.current=instance
    const unload=()=>audio.current?.pause();addEventListener('pagehide',unload)
    return()=>{removeEventListener('pagehide',unload);instance.dispose();controller.current=null}
  },[preferences])
  const ensureSource=()=>{if(audio.current&&!audio.current.getAttribute('src'))audio.current.src=audioArchiveTrack.source}
  const play=()=>{ensureSource();void controller.current?.togglePlayback()}
  const expand=()=>{setExpanded(true);ensureSource();controller.current?.prepare()}
  const persist=(volume=state.volume,muted=state.muted)=>writeAudioPreferences(localStore(),{volume,muted})
  const mute=()=>{controller.current?.toggleMute();persist(state.volume,!state.muted)}
  const volume=(value:number)=>{controller.current?.setVolume(value);persist(value,state.muted)}
  return <aside className={`audio-archive ${expanded?'is-expanded':'is-collapsed'} ${obscured?'is-obscured':''}`} aria-label="CASE 000 audio archive">
    <audio ref={audio} preload="none" aria-label={`${audioArchiveTrack.title} by ${audioArchiveTrack.artist}. ${audioArchiveTrack.description}`}/>
    {!expanded?<button className="audio-archive-trigger" onClick={expand} aria-label="Open audio archive"><span aria-hidden="true">◉</span><b>AUDIO</b><i className={state.status==='playing'?'is-live':''}/></button>:<>
      <header><div><span>CASE 000 / AUDIO ARCHIVE</span><small>RECORDER UNIT A-00</small></div><button onClick={()=>setExpanded(false)} aria-label="Collapse audio archive">−</button></header>
      <div className="audio-track"><div><small>{audioArchiveTrack.status.toUpperCase()}</small><b>{audioArchiveTrack.title}</b><span>{audioArchiveTrack.artist}</span></div><em className={`audio-status audio-status--${visibleStatus}`} aria-live="polite">{labels[visibleStatus]}</em></div>
      <div className={`audio-waveform ${animated?'is-active':''}`} aria-hidden="true">{levels.map((level,index)=><i key={index} style={{'--level':level,'--delay':`${index*-53}ms`} as React.CSSProperties}/>)}</div>
      <div className="audio-timeline"><span>{formatAudioTime(state.currentTime)}</span><input type="range" min="0" max={state.duration||1} step=".1" value={state.duration?Math.min(state.currentTime,state.duration):0} disabled={!state.duration} onChange={event=>controller.current?.seekTo(Number(event.target.value))} aria-label="Seek soundtrack"/><span>{state.duration?formatAudioTime(state.duration):'--:--'}</span></div>
      <div className="audio-controls"><button className="audio-play" onClick={play} aria-label={state.status==='playing'?'Pause soundtrack':'Play soundtrack'}>{state.status==='playing'?'Ⅱ':'▶'}</button><button onClick={mute} aria-label={state.muted?'Unmute soundtrack':'Mute soundtrack'}>{state.muted?'MUTED':'SOUND'}</button><label><span>VOL</span><input type="range" min="0" max="1" step=".01" value={state.volume} onChange={event=>volume(Number(event.target.value))} aria-label="Soundtrack volume"/></label></div>
      {state.error&&<p className="audio-error" role="alert">{state.error}</p>}
    </>}
  </aside>
}
