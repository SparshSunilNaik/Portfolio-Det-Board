import { publicLinks } from '../../data/links'
import { LinkedInIcon } from '../ui/SocialIcon'
import { ProfilePortrait } from '../ui/ProfilePortrait'

export function IdentityDossier({onOverview,onProject}:{onOverview:()=>void;onProject:()=>void}){
  return <section className="identity-dossier" aria-labelledby="identity-title">
    <span className="binder-clip"/><div className="identity-grid"><div><span className="classified">CASE 000 · PRIMARY SUBJECT</span><h2 id="identity-title">SPARSH<br/>SUNIL NAIK</h2><p className="role">AI ENGINEER / SOFTWARE &amp; SYSTEMS BUILDER</p></div><ProfilePortrait /></div>
    <p className="identity-summary">Computer Science Engineering student specializing in AI, building autonomous robots, cloud-native infrastructure, intelligent developer systems, and applied ML research.</p>
    <dl><div><dt>INSTITUTION</dt><dd>KLE Technological University</dd></div><div><dt>PROGRAM</dt><dd>B.E. CSE — Artificial Intelligence</dd></div><div><dt>ACADEMIC RECORD</dt><dd>CGPA 9.00 / 10</dd></div></dl>
    <div className="identity-actions"><button onClick={onProject}>Explore projects</button><a className="resume-action" href={publicLinks.resume} target="_blank" rel="noopener noreferrer">VIEW RESUME</a><button onClick={onOverview}>Portfolio Summary</button><a className="social-action" href={publicLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="View Sparsh Sunil Naik on LinkedIn"><LinkedInIcon/>LinkedIn</a></div>
    <small className="instruction">DRAG EMPTY BOARD TO PAN · SCROLL TO ZOOM · CLICK EVIDENCE TO INSPECT</small>
  </section>
}
