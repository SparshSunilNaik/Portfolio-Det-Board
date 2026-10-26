import type { Category, Project } from '../types'
export function filterProjects(items: Project[], query: string, category: Category|'all') {
  const needle=query.trim().toLocaleLowerCase(); return items.filter((item)=>{
    const categoryMatch=category==='all'||item.category===category
    const haystack=[item.title,item.shortTitle,item.summary,item.problem,item.category,item.status,item.employer??'',item.jobTitle??'',item.employmentDates??'',...item.technologies,...item.engineered].join(' ').toLocaleLowerCase()
    return categoryMatch&&(!needle||haystack.includes(needle))
  })
}
