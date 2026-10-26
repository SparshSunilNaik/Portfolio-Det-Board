import { describe, expect, it } from 'vitest'
import { achievements, projects, relationships } from '../data/projects'
import { BOARD, clampScale, fitCamera, focusCamera, screenToBoard, zoomAt } from './board'
import { validateGraph } from './graph'
import { filterProjects } from './search'
import { publicLinks } from '../data/links'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Dossier } from '../components/dossiers/Dossier'
import { GuidedOverview } from '../components/dossiers/GuidedOverview'
import { EvidenceCard } from '../components/board/EvidenceCard'
import indexHtml from '../../index.html?raw'
import spiderLogo from '../../public/brand/case-spider.svg?raw'

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

describe('COBOT evidence',()=>{
  const cobot=projects.find(project=>project.id==='cobot')!
  it('contains complete, conservative project metadata',()=>{expect(cobot.caseNo).toBe('R-03');expect(cobot.title).toContain('Collaborative Project Assessment Bot');expect(cobot.category).toBe('agents');expect(cobot.featured).toBe(true);expect(cobot.projectRole).toContain('contributor');expect(cobot.technologies).toEqual(expect.arrayContaining(['FastAPI','Next.js','Ollama','SQLite']));expect(cobot.links).toEqual([])})
  it('is searchable by name, capability, and technology',()=>{expect(filterProjects(projects,'COBOT','all')).toContain(cobot);expect(filterProjects(projects,'adaptive viva','all')).toContain(cobot);expect(filterProjects(projects,'Alembic','agents')).toContain(cobot)})
  it('has a valid evidence-backed local inference relationship',()=>{const edge=relationships.find(item=>item.id==='cobot-splitbrain-local-inference');expect(edge?.type).toBe('shares-method');expect([edge?.source,edge?.target]).toEqual(expect.arrayContaining(['cobot','splitbrain']))})
  it('renders first in the guided featured sequence',()=>{const html=renderToStaticMarkup(createElement(GuidedOverview,{onClose:()=>undefined,onFocus:()=>undefined}));expect(html).toContain('COBOT');expect(html.indexOf('COBOT')).toBeLessThan(html.indexOf('EgoNav VLA'))})
  it('renders a distinctive system schematic and full dossier role',()=>{const card=renderToStaticMarkup(createElement(EvidenceCard,{project:cobot,selected:false,dimmed:false,onSelect:()=>undefined,onPointerDown:()=>undefined}));const dossier=renderToStaticMarkup(createElement(Dossier,{project:cobot,onClose:()=>undefined,onFocus:()=>undefined}));expect(card).toContain('evidence--cobot');expect(card).toContain('BROWSER');expect(card).toContain('OLLAMA');expect(dossier).toContain('PERSONAL ROLE');expect(dossier).toContain('No public project link verified')})
})

describe('Phase 4 content and identity corrections',()=>{
  const publicCopy=JSON.stringify({projects,achievements})+renderToStaticMarkup(createElement(GuidedOverview,{onClose:()=>undefined,onFocus:()=>undefined}))+indexHtml
  it('uses former-president wording without an ongoing presidency',()=>{expect(publicCopy).toContain('FORMER PRESIDENT');expect(publicCopy).toContain('Former President');expect(publicCopy).not.toMatch(/Data Science Club[^.\"<]*(Present|present)/)})
  it('does not present unconfirmed Ignis employment',()=>{expect(publicCopy.toLocaleLowerCase()).not.toContain('ignis')})
  it('references the new spider favicon and no obsolete eye identity',()=>{expect(indexHtml).toContain('brand/case-spider-favicon.svg');expect(indexHtml.toLocaleLowerCase()).not.toContain('watchful');expect(spiderLogo).toContain('CASE spider emblem');expect(spiderLogo).toContain('#a33d37')})
})

describe('board coordinate transforms',()=>{
  it('preserves the board point beneath cursor while zooming',()=>{const camera={x:-200,y:-100,scale:.5};const before=screenToBoard(500,300,camera);const after=screenToBoard(500,300,zoomAt(camera,500,300,1));expect(after.x).toBeCloseTo(before.x);expect(after.y).toBeCloseTo(before.y)})
  it('clamps zoom bounds',()=>{expect(clampScale(0)).toBe(BOARD.minScale);expect(clampScale(9)).toBe(BOARD.maxScale)})
  it('fits the full board and centers focused projects',()=>{const fit=fitCamera(1000,700);expect(BOARD.width*fit.scale).toBeLessThanOrEqual(920);const p=projects[0];const camera=focusCamera(p.position,1200,800,1);expect((p.position.x+p.position.width/2)*camera.scale+camera.x).toBeCloseTo(600);expect((p.position.y+p.position.height/2)*camera.scale+camera.y).toBeCloseTo(400)})
})
