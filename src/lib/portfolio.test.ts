import { describe, expect, it } from 'vitest'
import { projects, relationships } from '../data/projects'
import { BOARD, clampScale, fitCamera, focusCamera, screenToBoard, zoomAt } from './board'
import { validateGraph } from './graph'
import { filterProjects } from './search'
import { publicLinks } from '../data/links'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Dossier } from '../components/dossiers/Dossier'
import { GuidedOverview } from '../components/dossiers/GuidedOverview'

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

describe('public identity links',()=>{
  it('uses the approved resume and LinkedIn destinations',()=>{expect(publicLinks.resume).toBe('https://drive.google.com/file/d/15UN1z4oPUHHgRHgBR304ekByyrhwGFF0/view?usp=drive_link');expect(publicLinks.linkedin).toBe('https://www.linkedin.com/in/sparsh-naik-032362267/')})
  it('keeps all identity destinations HTTPS and public',()=>{for(const url of Object.values(publicLinks)){expect(url).toMatch(/^https:\/\//);expect(url).not.toContain('localhost')}})
})

describe('professional experience evidence',()=>{
  const employment=projects.find(project=>project.id==='entropy-systems')!
  it('keeps employment distinct from personal projects and leadership',()=>{expect(employment.recordType).toBe('experience');expect(employment.category).toBe('experience');expect(employment.employer).toBe('Entropy Systems');expect(employment.jobTitle).toBe('Software Engineering Intern')})
  it('is discoverable by employer, role, technology, and category',()=>{expect(filterProjects(projects,'Entropy Systems','all')).toContain(employment);expect(filterProjects(projects,'Software Engineering Intern','experience')).toContain(employment);expect(filterProjects(projects,'Computer Vision','experience').length).toBeGreaterThan(0)})
  it('uses a typed, valid professional relationship without attributing a personal project',()=>{const edge=relationships.find(item=>item.id==='entropy-assignment-record');expect(edge?.type).toBe('engineered-at');expect([edge?.source,edge?.target]).toEqual(expect.arrayContaining(['entropy-systems','entropy-assignment']));expect(relationships.filter(item=>(item.source==='entropy-systems'||item.target==='entropy-systems')&&item.id!=='entropy-assignment-record')).toHaveLength(0)})
  it('renders the professional dossier fields',()=>{const html=renderToStaticMarkup(createElement(Dossier,{project:employment,onClose:()=>undefined,onFocus:()=>undefined}));expect(html).toContain('PROFESSIONAL CASE FILE');expect(html).toContain('Software Engineering Intern');expect(html).toContain('Entropy Systems');expect(html).toContain('Responsibilities &amp; contributions')})
  it('includes employment in the guided recruiter briefing',()=>{const html=renderToStaticMarkup(createElement(GuidedOverview,{onClose:()=>undefined,onFocus:()=>undefined}));expect(html).toContain('PROFESSIONAL EXPERIENCE');expect(html).toContain('Entropy Systems');expect(html).toContain('OPEN EMPLOYMENT FILE')})
})

describe('board coordinate transforms',()=>{
  it('preserves the board point beneath cursor while zooming',()=>{const camera={x:-200,y:-100,scale:.5};const before=screenToBoard(500,300,camera);const after=screenToBoard(500,300,zoomAt(camera,500,300,1));expect(after.x).toBeCloseTo(before.x);expect(after.y).toBeCloseTo(before.y)})
  it('clamps zoom bounds',()=>{expect(clampScale(0)).toBe(BOARD.minScale);expect(clampScale(9)).toBe(BOARD.maxScale)})
  it('fits the full board and centers focused projects',()=>{const fit=fitCamera(1000,700);expect(BOARD.width*fit.scale).toBeLessThanOrEqual(920);const p=projects[0];const camera=focusCamera(p.position,1200,800,1);expect((p.position.x+p.position.width/2)*camera.scale+camera.x).toBeCloseTo(600);expect((p.position.y+p.position.height/2)*camera.scale+camera.y).toBeCloseTo(400)})
})
