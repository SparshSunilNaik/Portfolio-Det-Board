import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { AudioArchive } from '../components/audio/AudioArchive'
import { AUDIO_PREFERENCE_KEY, DEFAULT_AUDIO_VOLUME, audioArchiveTrack } from '../data/audio'
import { AudioArchiveController, formatAudioTime, readAudioPreferences, waveformShouldAnimate, writeAudioPreferences, type AudioArchiveState, type PreferenceStore } from './audioArchive'
import appSource from '../App.tsx?raw'

class FakeAudio extends EventTarget {
  paused=true;muted=false;volume=1;currentTime=0;duration=48;ended=false;error:{code:number}|null=null
  playAction:()=>Promise<void>=async()=>{this.paused=false;this.dispatchEvent(new Event('playing'))}
  play(){return this.playAction()}
  pause(){this.paused=true;this.dispatchEvent(new Event('pause'))}
  load(){this.dispatchEvent(new Event('loadstart'))}
  fire(name:string){this.dispatchEvent(new Event(name))}
}
const setup=()=>{const media=new FakeAudio();const states:AudioArchiveState[]=[];const controller=new AudioArchiveController(media as unknown as HTMLAudioElement,state=>states.push(state));return{media,states,controller}}

describe('audio archive controller',()=>{
  it('reports playing only after successful playback',async()=>{const{media,controller}=setup();let resolve!:()=>void;media.playAction=()=>new Promise(done=>{resolve=()=>{media.paused=false;media.fire('playing');done()}});const request=controller.togglePlayback();expect(controller.snapshot.status).toBe('loading');expect(controller.snapshot.status).not.toBe('playing');resolve();await request;expect(controller.snapshot.status).toBe('playing');controller.dispose()})
  it('pauses a playing track and handles a rejected playback promise',async()=>{const{media,controller}=setup();await controller.togglePlayback();expect(controller.snapshot.status).toBe('playing');await controller.togglePlayback();expect(controller.snapshot.status).toBe('paused');media.playAction=async()=>{throw new Error('blocked')};await controller.togglePlayback();expect(controller.snapshot.status).toBe('error');expect(controller.snapshot.error).toMatch(/blocked|unavailable/);controller.dispose()})
  it('controls mute and clamps volume',()=>{const{media,controller}=setup();controller.toggleMute();expect(media.muted).toBe(true);expect(controller.snapshot.muted).toBe(true);controller.setVolume(2);expect(media.volume).toBe(1);controller.setVolume(-1);expect(media.volume).toBe(0);controller.dispose()})
  it('seeks against real duration and resets ended state',()=>{const{media,controller}=setup();controller.seekTo(20);expect(media.currentTime).toBe(20);controller.seekTo(200);expect(media.currentTime).toBe(48);media.ended=true;media.fire('ended');expect(controller.snapshot).toMatchObject({status:'ended',currentTime:48});media.ended=false;controller.seekTo(12);expect(controller.snapshot.status).toBe('paused');controller.dispose()})
  it('exposes media errors without inventing playback',()=>{const{media,controller}=setup();media.error={code:4};media.fire('error');expect(controller.snapshot.status).toBe('error');expect(controller.snapshot.error).toContain('cannot play');expect(controller.snapshot.status).not.toBe('playing');controller.dispose()})
})

describe('audio archive preferences and presentation',()=>{
  class MemoryStore implements PreferenceStore {value:string|null=null;getItem(){return this.value}setItem(key:string,value:string){expect(key).toBe(AUDIO_PREFERENCE_KEY);this.value=value}}
  it('persists volume and mute but no autoplay instruction',()=>{const store=new MemoryStore();writeAudioPreferences(store,{volume:.42,muted:true});expect(readAudioPreferences(store)).toEqual({volume:.42,muted:true});expect(store.value).not.toContain('play');expect(readAudioPreferences({getItem(){throw new Error('blocked')},setItem(){}})).toEqual({volume:DEFAULT_AUDIO_VOLUME,muted:false})})
  it('formats actual time and gates waveform motion on playback',()=>{expect(formatAudioTime(0)).toBe('00:00');expect(formatAudioTime(65.9)).toBe('01:05');expect(formatAudioTime(Number.NaN)).toBe('--:--');expect(waveformShouldAnimate('playing',false)).toBe(true);expect(waveformShouldAnimate('paused',false)).toBe(false);expect(waveformShouldAnimate('playing',true)).toBe(false)})
  it('renders paused without autoplay and keeps the source configured separately',()=>{const html=renderToStaticMarkup(createElement(AudioArchive));expect(html).toContain('CASE 000 audio archive');expect(html).toContain('preload="none"');expect(html).not.toContain('autoplay');expect(audioArchiveTrack).toMatchObject({title:'Investigation Theme',artist:'CASE 000',status:'Demo Soundtrack',duration:48});expect(audioArchiveTrack.source).toContain('audio/case-000-demo.mp3')})
  it('mounts one persistent player at the application shell level',()=>{expect(appSource.match(/<AudioArchive\b/g)).toHaveLength(1);expect(appSource).toContain('<AudioArchive obscured={intakeOpen}/>')})
})
