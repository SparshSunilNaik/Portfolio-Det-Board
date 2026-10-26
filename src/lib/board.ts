import type { Camera, Position } from '../types'

export const BOARD = { width: 4000, height: 3100, minScale: 0.18, maxScale: 1.55 }
export const clampScale = (scale: number) => Math.min(BOARD.maxScale, Math.max(BOARD.minScale, scale))
export const screenToBoard = (screenX: number, screenY: number, camera: Camera) => ({ x: (screenX-camera.x)/camera.scale, y: (screenY-camera.y)/camera.scale })
export const zoomAt = (camera: Camera, screenX: number, screenY: number, requestedScale: number): Camera => {
  const point = screenToBoard(screenX,screenY,camera); const scale = clampScale(requestedScale)
  return { scale, x: screenX-point.x*scale, y: screenY-point.y*scale }
}
export const focusCamera = (position: Position, viewportWidth: number, viewportHeight: number, scale = .92): Camera => ({ scale:clampScale(scale), x:viewportWidth/2-(position.x+position.width/2)*clampScale(scale), y:viewportHeight/2-(position.y+position.height/2)*clampScale(scale) })
export const fitCamera = (viewportWidth: number, viewportHeight: number): Camera => { const scale=clampScale(Math.min((viewportWidth-80)/BOARD.width,(viewportHeight-80)/BOARD.height)); return {scale,x:(viewportWidth-BOARD.width*scale)/2,y:(viewportHeight-BOARD.height*scale)/2} }
