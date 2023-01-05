import projectData from '../data/projects.json'
import styles from './page.module.css'

const projectIds: Array<keyof (typeof projectData)> = [
  'algebraic-effects',
  'typed-regex',
  'is-a-dev',
  'diary-pwa',
  'pattern-lock-js',
  'esbuild-plugin-elm'
]

interface Project {
  key: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projectList: Project[] = projectIds.map(key => ({ key, ...projectData[key] }))

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div>{project.title}</div>
  )
}

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerName}>
          <h1 className={styles.headerTitle}>Akshay Nair</h1>
          <div className={styles.headerSubtitle}>full-stack human</div>
        </div>
      </header>

      <main className={styles.main} style={{ display: 'none' }}>
        <div>
          Lorem ipsum dolor sit amet,
          {projectList.map(project => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </div>
        {/* <pre>{JSON.stringify(projectList, null, 2)}</pre> */}
      </main>
    </div>
  )
}
