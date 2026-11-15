import { AUDIO_PREFERENCE_KEY, DEFAULT_AUDIO_VOLUME } from '../data/audio'

export type AudioStatus = 'idle' | 'loading' | 'paused' | 'playing' | 'ended' | 'error'
export interface AudioArchiveState { status:AudioStatus; currentTime:number; duration:number; volume:number; muted:boolean; error:string|null }
export interface AudioPreferences { volume:number; muted:boolean }
export interface PreferenceStore { getItem(key:string):string|null; setItem(key:string,value:string):void }

export const INITIAL_AUDIO_STATE:AudioArchiveState={status:'idle',currentTime:0,duration:0,volume:DEFAULT_AUDIO_VOLUME,muted:false,error:null}

const clamp=(value:number,min=0,max=1)=>Number.isFinite(value)?Math.min(max,Math.max(min,value)):min
const errorMessages:Record<number,string>={1:'Playback was interrupted.',2:'The soundtrack could not be loaded.',3:'The soundtrack could not be decoded.',4:'This browser cannot play the soundtrack.'}

export class AudioArchiveController {
  private state:AudioArchiveState
  private disposed=false
  private handlers:Record<string,EventListener>
  constructor(private media:HTMLAudioElement,private onChange:(state:AudioArchiveState)=>void,preferences:AudioPreferences={volume:DEFAULT_AUDIO_VOLUME,muted:false}){
    const volume=clamp(preferences.volume)
    media.volume=volume;media.muted=preferences.muted
    this.state={...INITIAL_AUDIO_STATE,volume,muted:preferences.muted}
    this.handlers={
      loadstart:()=>this.update({status:'loading',error:null}),
      loadedmetadata:()=>this.syncDuration(),durationchange:()=>this.syncDuration(),
      canplay:()=>{if(this.media.paused)this.update({status:'paused'})},
      playing:()=>this.update({status:'playing',error:null}),
      waiting:()=>{if(!this.media.paused)this.update({status:'loading'})},
      pause:()=>{if(!this.media.ended)this.update({status:'paused'})},
      timeupdate:()=>this.update({currentTime:this.safeTime(this.media.currentTime)}),
      ended:()=>this.update({status:'ended',currentTime:this.safeDuration()}),
      error:()=>this.update({status:'error',error:errorMessages[this.media.error?.code??0]??'The soundtrack is unavailable.'}),
    }
    Object.entries(this.handlers).forEach(([name,handler])=>media.addEventListener(name,handler))
    this.emit()
  }
  get snapshot(){return this.state}
  prepare(){if(this.state.status==='idle'){this.update({status:'loading'});this.media.load()}}
  async togglePlayback(){if(this.state.status==='playing'||!this.media.paused){this.media.pause();return}await this.play()}
  async play(){
    if(this.state.status==='ended'||(this.safeDuration()>0&&this.media.currentTime>=this.safeDuration()))this.media.currentTime=0
    this.update({status:'loading',error:null})
    try{await this.media.play();if(!this.disposed)this.update({status:this.media.paused?'paused':'playing',error:null})}
    catch{if(!this.disposed)this.update({status:'error',error:'Playback was blocked or the soundtrack is unavailable.'})}
  }
  toggleMute(){this.media.muted=!this.media.muted;this.update({muted:this.media.muted})}
  setVolume(value:number){const volume=clamp(value);this.media.volume=volume;this.update({volume})}
  seekTo(seconds:number){const duration=this.safeDuration();if(!duration)return;this.media.currentTime=clamp(seconds,0,duration);this.update({currentTime:this.media.currentTime,status:this.state.status==='ended'?'paused':this.state.status})}
  dispose(){this.disposed=true;Object.entries(this.handlers).forEach(([name,handler])=>this.media.removeEventListener(name,handler));this.media.pause()}
  private syncDuration(){this.update({duration:this.safeDuration(),currentTime:this.safeTime(this.media.currentTime)})}
  private safeDuration(){return Number.isFinite(this.media.duration)&&this.media.duration>0?this.media.duration:0}
  private safeTime(value:number){return Number.isFinite(value)&&value>0?value:0}
  private update(next:Partial<AudioArchiveState>){this.state={...this.state,...next};this.emit()}
  private emit(){this.onChange({...this.state})}
}

export function readAudioPreferences(store:PreferenceStore|null):AudioPreferences{
  try{const value=store?.getItem(AUDIO_PREFERENCE_KEY);if(!value)return{volume:DEFAULT_AUDIO_VOLUME,muted:false};const parsed=JSON.parse(value) as Partial<AudioPreferences>;const volume=Number(parsed.volume);return{volume:Number.isFinite(volume)?clamp(volume):DEFAULT_AUDIO_VOLUME,muted:Boolean(parsed.muted)}}catch{return{volume:DEFAULT_AUDIO_VOLUME,muted:false}}
}
export function writeAudioPreferences(store:PreferenceStore|null,preferences:AudioPreferences){try{store?.setItem(AUDIO_PREFERENCE_KEY,JSON.stringify(preferences))}catch{/* Playback remains usable without storage. */}}
export function formatAudioTime(seconds:number){if(!Number.isFinite(seconds)||seconds<0)return'--:--';const whole=Math.floor(seconds);return`${Math.floor(whole/60).toString().padStart(2,'0')}:${(whole%60).toString().padStart(2,'0')}`}
export function waveformShouldAnimate(status:AudioStatus,reducedMotion:boolean){return status==='playing'&&!reducedMotion}
