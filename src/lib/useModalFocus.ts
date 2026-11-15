import { useEffect, useRef, type RefObject } from 'react'

const focusable='button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function useModalFocus(active:boolean,dialog:RefObject<HTMLElement|null>){
  const returnFocus=useRef<HTMLElement|null>(null)
  useEffect(()=>{
    if(!active)return
    returnFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null
    const timer=setTimeout(()=>dialog.current?.focus(),0)
    const trap=(event:KeyboardEvent)=>{
      if(event.key!=='Tab'||!dialog.current)return
      const controls=[...dialog.current.querySelectorAll<HTMLElement>(focusable)]
      if(!controls.length){event.preventDefault();dialog.current.focus();return}
      const first=controls[0],last=controls[controls.length-1]
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
    document.addEventListener('keydown',trap)
    return()=>{
      clearTimeout(timer)
      document.removeEventListener('keydown',trap)
      if(returnFocus.current?.isConnected)returnFocus.current.focus()
      else document.querySelector<HTMLElement>('[data-focus-root]')?.focus()
    }
  },[active,dialog])
}
