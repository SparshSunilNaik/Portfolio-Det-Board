import { describe, expect, it } from 'vitest'
import { projects, relationships } from '../data/projects'
import { BOARD, clampScale, fitCamera, focusCamera, screenToBoard, zoomAt } from './board'
import { validateGraph } from './graph'
import { filterProjects } from './search'

describe('portfolio evidence graph',()=>{
  it('has unique, complete project metadata and valid relationships',()=>{expect(validateGraph(projects,relationships)).toEqual({valid:true,errors:[]})})
  it('contains every resume baseline project',()=>{expect(projects.map(p=>p.id)).toEqual(expect.arrayContaining(['egonav','polaris','network-slicing','gpu-platform','sage','splitbrain','dynamic-pricing','domainbed','compression','cifar-cnn','sentinel','smart-helmet']))})
  it('keeps evidence within board coordinates',()=>{for(const p of projects){expect(p.position.x).toBeGreaterThanOrEqual(0);expect(p.position.y).toBeGreaterThanOrEqual(0);expect(p.position.x+p.position.width).toBeLessThanOrEqual(BOARD.width);expect(p.position.y+p.position.height).toBeLessThanOrEqual(BOARD.height)}})
  it('only exposes verified HTTPS links',()=>{for(const p of projects)for(const link of p.links){expect(link.url).toMatch(/^https:\/\//);expect(link.url).not.toContain('localhost')}})
})

describe('search and filtering',()=>{
  it('searches title, technology, and engineering text',()=>{expect(filterProjects(projects,'Kubernetes','all').map(p=>p.id)).toEqual(expect.arrayContaining(['network-slicing','gpu-platform']));expect(filterProjects(projects,'governance','all').map(p=>p.id)).toContain('sentinel')})
  it('combines category and query filters',()=>{const hits=filterProjects(projects,'Python','robotics');expect(hits.length).toBeGreaterThan(0);expect(hits.every(p=>p.category==='robotics')).toBe(true)})
  it('is case insensitive',()=>expect(filterProjects(projects,'splitbrain','all')[0]?.id).toBe('splitbrain'))
})

describe('board coordinate transforms',()=>{
  it('preserves the board point beneath cursor while zooming',()=>{const camera={x:-200,y:-100,scale:.5};const before=screenToBoard(500,300,camera);const after=screenToBoard(500,300,zoomAt(camera,500,300,1));expect(after.x).toBeCloseTo(before.x);expect(after.y).toBeCloseTo(before.y)})
  it('clamps zoom bounds',()=>{expect(clampScale(0)).toBe(BOARD.minScale);expect(clampScale(9)).toBe(BOARD.maxScale)})
  it('fits the full board and centers focused projects',()=>{const fit=fitCamera(1000,700);expect(BOARD.width*fit.scale).toBeLessThanOrEqual(920);const p=projects[0];const camera=focusCamera(p.position,1200,800,1);expect((p.position.x+p.position.width/2)*camera.scale+camera.x).toBeCloseTo(600);expect((p.position.y+p.position.height/2)*camera.scale+camera.y).toBeCloseTo(400)})
})
