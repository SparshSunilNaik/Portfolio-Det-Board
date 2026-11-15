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
import { ProfilePortrait } from '../components/ui/ProfilePortrait'
import { IdentityDossier } from '../components/board/IdentityDossier'
import { INITIAL_CAMERA } from '../App'
import { CaseIntake } from '../components/intake/CaseIntake'
import { FindingsLedger } from '../components/findings/FindingsLedger'
import { MobileEvidenceReel } from '../components/navigation/MobileEvidenceReel'
import { ProjectDiagram } from '../components/dossiers/ProjectDiagram'
import { ThreadLayer } from '../components/board/ThreadLayer'
import { CASE_INTAKE_SESSION_KEY, REDUCED_MOTION_QUERY, reducedMotionPreferred, resolveCaseIntake, shouldShowCaseIntake, type SessionStore } from './caseIntake'
import { createProjectFinding } from './findings'
import indexHtml from '../../index.html?raw'
import spiderLogo from '../../public/brand/case-spider.svg?raw'

describe('portfolio evidence graph',()=>{
  it('has unique, complete project metadata and valid relationships',()=>{expect(validateGraph(projects,relationships)).toEqual({valid:true,errors:[]})})
  it('contains every resume baseline project',()=>{expect(projects.map(p=>p.id)).toEqual(expect.arrayContaining(['egonav','polaris','network-slicing','gpu-platform','sage','splitbrain','dynamic-pricing','domainbed','compression','cifar-cnn','sentinel','smart-helmet']))})
  it('keeps evidence within board coordinates',()=>{for(const p of projects){expect(p.position.x).toBeGreaterThanOrEqual(0);expect(p.position.y).toBeGreaterThanOrEqual(0);expect(p.position.x+p.position.width).toBeLessThanOrEqual(BOARD.width);expect(p.position.y+p.position.height).toBeLessThanOrEqual(BOARD.height)}})
  it('keeps evidence cards from overlapping',()=>{for(let i=0;i<projects.length;i++)for(let j=i+1;j<projects.length;j++){const a=projects[i].position,b=projects[j].position;const overlaps=Math.min(a.x+a.width,b.x+b.width)>Math.max(a.x,b.x)&&Math.min(a.y+a.height,b.y+b.height)>Math.max(a.y,b.y);expect(overlaps,`${projects[i].id} overlaps ${projects[j].id}`).toBe(false)}})
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
  const elma=projects.find(project=>project.id==='elma-labs')!
  const entropy=projects.find(project=>project.id==='entropy-systems')!
  it('orders current Elma experience before completed Entropy experience',()=>{const experience=projects.filter(project=>project.recordType==='experience');expect(experience.map(project=>project.id)).toEqual(['elma-labs','entropy-systems']);expect(elma.status).toBe('Current');expect(entropy.status).toBe('Completed')})
  it('publishes conservative dates and a descriptive Elma role',()=>{expect(elma.jobTitle).toBe('SmartGlass Systems Engineering (descriptive scope)');expect(elma.employmentDates).toContain('exact start month and official title not independently verified');expect(entropy.jobTitle).toBe('Software Engineering Intern');expect(entropy.employmentDates).toContain('approximately 4.5 months');expect(entropy.employmentDates).not.toMatch(/present/i)})
  it('finds Elma and SmartGlass work by employer, system, and technology',()=>{for(const query of ['Elma Labs','SmartGlass OS','ESP32-S3','QEMU','YOLOv8n'])expect(filterProjects(projects,query,'experience')).toContain(elma);expect(filterProjects(projects,'Entropy Systems','all')).toContain(entropy)})
  it('limits typed professional relationships to verified work',()=>{const assignment=relationships.find(item=>item.id==='entropy-assignment-record');const polaris=relationships.find(item=>item.id==='entropy-polaris-contribution');expect(assignment?.type).toBe('engineered-at');expect([assignment?.source,assignment?.target]).toEqual(expect.arrayContaining(['entropy-systems','entropy-assignment']));expect(polaris).toMatchObject({source:'entropy-systems',target:'polaris',type:'contributed-to'});expect(relationships.some(item=>item.source==='elma-labs'||item.target==='elma-labs')).toBe(false)})
  it('renders current and completed professional dossiers accurately',()=>{const current=renderToStaticMarkup(createElement(Dossier,{project:elma,onClose:()=>undefined,onFocus:()=>undefined}));const previous=renderToStaticMarkup(createElement(Dossier,{project:entropy,onClose:()=>undefined,onFocus:()=>undefined}));expect(current).toContain('project-dossier--current');expect(current).toContain('SmartGlass Systems Engineering (descriptive scope)');expect(current).toContain('No public project link verified');expect(previous).toContain('Software Engineering Intern');expect(previous).toContain('Completed');expect(previous).not.toContain('– Present');expect(previous).not.toContain('>Present<')})
  it('presents Elma as current and Entropy as previous in the guided briefing',()=>{const html=renderToStaticMarkup(createElement(GuidedOverview,{onClose:()=>undefined,onFocus:()=>undefined}));expect(html).toContain('CURRENT EXPERIENCE · CASE E-002');expect(html).toContain('Elma Labs');expect(html).toContain('OPEN CURRENT FILE');expect(html).toContain('PREVIOUS: ENTROPY SYSTEMS')})
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

describe('Phase 5 portrait and orientation',()=>{
  it('renders the optimized owner portrait through the Pages base path',()=>{const html=renderToStaticMarkup(createElement(ProfilePortrait));expect(html).toContain('profile/sparsh-naik.webp');expect(html).toContain('Portrait of Sparsh Sunil Naik');expect(html).toContain('width="600"');expect(html).toContain('height="750"')})
  it('retains the exact approved desktop camera configuration',()=>{expect(INITIAL_CAMERA).toEqual({x:-690,y:-395,scale:.72})})
  it('adds a subtle start marker and explicit evidence-card instruction',()=>{const html=renderToStaticMarkup(createElement(IdentityDossier,{onOverview:()=>undefined,onProject:()=>undefined}));expect(html).toContain('START HERE / CASE 000');expect(html).toContain('CLICK ANY EVIDENCE CARD TO INSPECT')})
  it('briefs recruiters across Cobot, autonomy, infrastructure, AI, and research',()=>{const html=renderToStaticMarkup(createElement(GuidedOverview,{onClose:()=>undefined,onFocus:()=>undefined}));for(const title of ['COBOT','EgoNav VLA','Polaris','5G Edge Orchestrator','Sentinel','RL Dynamic Pricing'])expect(html).toContain(title);expect(html).toContain('BEST PAPER');expect(html).toContain('VIEW RESUME');expect(html).toContain('LINKEDIN');expect(html).toContain('GITHUB')})
})

describe('Stage B case intake',()=>{
  class MemoryStore implements SessionStore { value:string|null=null;getItem(){return this.value}setItem(_key:string,value:string){this.value=value} }
  it('shows once per tab session and skips direct dossier links',()=>{const store=new MemoryStore();expect(shouldShowCaseIntake(store)).toBe(true);expect(resolveCaseIntake('enter',store)).toEqual({open:false,action:'enter'});expect(store.value).toBe('1');expect(shouldShowCaseIntake(store)).toBe(false);expect(shouldShowCaseIntake(new MemoryStore(),true)).toBe(false)})
  it('supports both skip and enter when session storage is unavailable',()=>{const unavailable:SessionStore={getItem(){throw new Error('blocked')},setItem(){throw new Error('blocked')}};expect(shouldShowCaseIntake(unavailable)).toBe(true);expect(resolveCaseIntake('skip',unavailable)).toEqual({open:false,action:'skip'});expect(resolveCaseIntake('enter',unavailable)).toEqual({open:false,action:'enter'});expect(CASE_INTAKE_SESSION_KEY).toBe('case-000:intake-seen')})
  it('renders an accessible, immediately skippable authored opening',()=>{const html=renderToStaticMarkup(createElement(CaseIntake,{evidenceCount:19,onComplete:()=>undefined,onBriefing:()=>undefined}));expect(html).toContain('role="dialog"');expect(html).toContain('aria-modal="true"');expect(html).toContain('OPEN CASE FILE');expect(html).toContain('SKIP INTRO');expect(html).toContain('RECRUITER BRIEFING');expect(html).toContain('19 PROJECT FILES');expect(html).toContain('SPARSH SUNIL NAIK');expect(html).toContain('Portrait of Sparsh Sunil Naik')})
  it('detects reduced-motion preference without requiring browser APIs',()=>{expect(REDUCED_MOTION_QUERY).toBe('(prefers-reduced-motion: reduce)');expect(reducedMotionPreferred({matches:true})).toBe(true);expect(reducedMotionPreferred({matches:false})).toBe(false);expect(reducedMotionPreferred(null)).toBe(false)})
})

describe('Stage B findings and relationships',()=>{
  const cobot=projects.find(project=>project.id==='cobot')!
  const elma=projects.find(project=>project.id==='elma-labs')!
  it('maps findings only from validated project metadata without repeating validation as boundary',()=>{const finding=createProjectFinding(elma);expect(finding.mission).toBe(elma.problem);expect(finding.implementation).toEqual(elma.engineered.slice(0,3));expect(finding.validation).toEqual(elma.results.slice(0,2));expect(finding.boundary.join(' ')).toMatch(/remain planned/i);expect(finding.boundary.filter(item=>finding.validation.includes(item))).toEqual([])})
  it('renders compact findings with typed related cases and a dossier path',()=>{const html=renderToStaticMarkup(createElement(FindingsLedger,{project:cobot,onClose:()=>undefined,onOpenDossier:()=>undefined,onFocus:()=>undefined}));expect(html).toContain('FINDINGS LEDGER');expect(html).toContain('MISSION');expect(html).toContain('IMPLEMENTATION');expect(html).toContain('EVIDENCE BOUNDARY');expect(html).toContain('SplitBrain-RAG');expect(html).toContain('local inference boundary');expect(html).toContain('OPEN COMPLETE DOSSIER')})
  it('labels only selected graph relationships',()=>{const focused=renderToStaticMarkup(createElement(ThreadLayer,{selectedId:'cobot'}));const idle=renderToStaticMarkup(createElement(ThreadLayer,{selectedId:null}));expect(focused).toContain('LOCAL INFERENCE BOUNDARY');expect(focused).toContain('is-focused');expect(idle).not.toContain('thread-label')})
  it('keeps search and category filtering compatible with ledger selection',()=>{const visible=filterProjects(projects,'Ollama','agents');expect(visible.map(project=>project.id)).toEqual(expect.arrayContaining(['cobot','splitbrain']));expect(createProjectFinding(visible[0]).mission.length).toBeGreaterThan(20)})
})

describe('Stage B responsive storytelling',()=>{
  it('renders every filtered item in an accessible mobile reel',()=>{const items=filterProjects(projects,'','experience');const html=renderToStaticMarkup(createElement(MobileEvidenceReel,{items,selectedId:'elma-labs',onSelect:()=>undefined}));expect(html).toContain('EVIDENCE REEL');expect(html).toContain('Show findings for Elma Labs');expect(html).toContain('Entropy Systems');expect(html.indexOf('Elma Labs')).toBeLessThan(html.indexOf('Entropy Systems'))})
  it('renders evidence-backed diagrams for the six approved system stories',()=>{for(const id of ['elma-labs','cobot','egonav','polaris','network-slicing','dynamic-pricing']){const project=projects.find(item=>item.id===id)!;const html=renderToStaticMarkup(createElement(ProjectDiagram,{project}));expect(html).toContain('VERIFIED SYSTEM TRACE');expect(html).toContain(`${project.shortTitle} technical workflow`)}expect(renderToStaticMarkup(createElement(ProjectDiagram,{project:projects.find(item=>item.id==='sentinel')!}))).toBe('')})
  it('keeps full dossiers accessible and adds diagrams without replacing evidence',()=>{const html=renderToStaticMarkup(createElement(Dossier,{project:projects.find(item=>item.id==='polaris')!,onClose:()=>undefined,onFocus:()=>undefined}));expect(html).toContain('role="dialog"');expect(html).toContain('aria-modal="true"');expect(html).toContain('Close dossier');expect(html).toContain('RGB AUTONOMY &amp; RECOVERY LOOP');expect(html).toContain('Problem investigated')})
  it('integrates the existing briefing with one clear investigation route',()=>{const html=renderToStaticMarkup(createElement(GuidedOverview,{onClose:()=>undefined,onFocus:()=>undefined}));expect(html).toContain('Briefing route');for(const step of ['IDENTITY','EXPERIENCE','SYSTEMS','RESEARCH','CONTACT'])expect(html).toContain(step)})
})

describe('board coordinate transforms',()=>{
  it('preserves the board point beneath cursor while zooming',()=>{const camera={x:-200,y:-100,scale:.5};const before=screenToBoard(500,300,camera);const after=screenToBoard(500,300,zoomAt(camera,500,300,1));expect(after.x).toBeCloseTo(before.x);expect(after.y).toBeCloseTo(before.y)})
  it('clamps zoom bounds',()=>{expect(clampScale(0)).toBe(BOARD.minScale);expect(clampScale(9)).toBe(BOARD.maxScale)})
  it('fits the full board and centers focused projects',()=>{const fit=fitCamera(1000,700);expect(BOARD.width*fit.scale).toBeLessThanOrEqual(920);const p=projects[0];const camera=focusCamera(p.position,1200,800,1);expect((p.position.x+p.position.width/2)*camera.scale+camera.x).toBeCloseTo(600);expect((p.position.y+p.position.height/2)*camera.scale+camera.y).toBeCloseTo(400)})
})
