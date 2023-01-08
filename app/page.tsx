'use client'
import { useState } from 'react'
import projectData from '../data/projects.json'
import styles from './page.module.css'
import commonStyles from './common.module.css'

const projectIds: Array<keyof typeof projectData> = [
  'algebraic-effects',
  'typed-regex',
  'is-a-dev',
  'diary-pwa',
  'pattern-lock-js',
  'elxr',
  'esbuild-plugin-elm',
  'cmp-graphql',
  'owyn-launcher',
  'bsp-layout',
  'shotkey',
  'pipey',
  'enum-fp',
]

interface Project {
  key: string
  title: string
  description: string
  tags: string[]
  link: string
}

const projectList: Project[] = projectIds.map((key) => ({
  key,
  ...projectData[key],
}))
const tags = Array.from(new Set(projectList.flatMap((p) => p.tags)).values())

const ProjectCard = ({ project }: { project: Project }) => (
  <div className={styles.project}>
    <h2 className={`mb-4 ${styles.projectTitle}`}>
      <a className={commonStyles.link} href={project.link} target="_blank _parent">
        {project.title}
      </a>
    </h2>
    <div>{project.description}</div>
  </div>
)

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())

  return (
    <main className={styles.main}>
      <div className="mb-5">
        <span
          className={`font-bold ${styles.tag} ${
            selectedTags.size === 0 ? styles.tagSelected : ''
          }`}
          onClick={() => setSelectedTags(new Set())}
        >
          all
        </span>
        {tags.map((t) => (
          <span
            className={`${styles.tag} ${
              selectedTags.has(t) ? styles.tagSelected : ''
            }`}
            key={t}
            onClick={() =>
              setSelectedTags((s) => {
                s = new Set(s.values())
                s.has(t) ? s.delete(t) : s.add(t)
                return s
              })
            }
          >
            {t}
          </span>
        ))}
      </div>

      <div>
        {(selectedTags.size === 0
          ? projectList
          : projectList.filter((p) => p.tags.some((t) => selectedTags.has(t)))
        ).map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>
    </main>
  )
}
