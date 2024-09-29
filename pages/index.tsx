import { useState } from 'react'
import projectData from '../data/projects.json'
import styles from '../styles/page.module.css'
import commonStyles from '../styles/common.module.css'
import { Header } from '../components/Header'

// TODO: get props on build
const projectIds: Array<keyof typeof projectData> = [
  'css-everything',
  'elxr',
  'react-is-a-programming-language',
  'edible-desmos',
  'typed-regex',
  'ts-typeslang',
  'yaml-transformer',
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

const ProjectCard = ({ project }: { project: Project }) => (
  <div className={styles.project}>
    <h2 className={`mb-4 ${styles.projectTitle}`}>
      <a className={commonStyles.link} href={project.link} target="_blank _parent">
        {project.title}
      </a>
    </h2>
    <div>{project.description}</div>
    <div className="text-[13px] text-gray-500 pt-3">{project.tags.join(', ')}</div>
  </div>
)

export default function Home() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <div>
          {projectList.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </div>
      </main>
    </>
  )
}
