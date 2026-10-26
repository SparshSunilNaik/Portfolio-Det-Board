import { memo } from 'react'
import { projects, relationships } from '../../data/projects'

export const ThreadLayer=memo(function ThreadLayer({selectedId}:{selectedId:string|null}){
  const byId=new Map(projects.map(p=>[p.id,p]))
  return <svg className="thread-layer" viewBox="0 0 4000 3100" aria-hidden="true">
    <defs><filter id="thread-shadow"><feDropShadow dx="2" dy="3" stdDeviation="2" floodOpacity=".5"/></filter></defs>
    {relationships.map((edge,index)=>{const a=byId.get(edge.source)!,b=byId.get(edge.target)!;const x1=a.position.x+a.position.width/2,y1=a.position.y+a.position.height/2,x2=b.position.x+b.position.width/2,y2=b.position.y+b.position.height/2;const curve=(index%2?1:-1)*Math.min(180,Math.abs(x2-x1)*.18+40);const d=`M${x1} ${y1} C${x1+curve} ${y1-curve},${x2-curve} ${y2+curve},${x2} ${y2}`;const active=!selectedId||edge.source===selectedId||edge.target===selectedId;return <g className={`thread thread--${edge.type} ${active?'':'is-muted'}`} key={edge.id}><path d={d}/><circle cx={x1} cy={y1} r="8"/><circle cx={x2} cy={y2} r="8"/></g>})}
  </svg>
})
