import { useState } from 'react'
import projectData from '../data/projects.json'
import styles from '../styles/page.module.css'
import commonStyles from '../styles/common.module.css'

// TODO: get props on build
const projectIds: Array<keyof typeof projectData> = [
  'css-everything',
  'elxr',
  'react-is-a-programming-language',
  'edible-desmos',
  'typed-regex',
  'ts-typeslang',
  'algebraic-effects',
  'diary-pwa',
  'pattern-lock-js',
  'is-a-dev',
  'esbuild-plugin-elm',
  'owyn-launcher',
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
          className={`font-bold ${styles.tag} ${selectedTags.size === 0 ? styles.tagSelected : ''
            }`}
          onClick={() => setSelectedTags(new Set())}
        >
          all
        </span>
        {tags.map((t) => (
          <span
            className={`${styles.tag} ${selectedTags.has(t) ? styles.tagSelected : ''
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
