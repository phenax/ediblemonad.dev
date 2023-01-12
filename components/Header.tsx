import Link from 'next/link'

import styles from '../styles/layout.module.css'
import commonStyles from '../styles/common.module.css'

const navLinks = [
  { name: 'Projects', link: { pathname: '/' } },
  { name: 'About', link: { pathname: '/about' } },
  // { name: 'Blog', link: { pathname: '/blog' } },
  { name: 'Links', link: { pathname: '/contact' } },
]

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerName}>
      <h1 className={`${styles.headerTitle} text-4xl md:text-6xl`}>Akshay Nair</h1>
      <div className={styles.headerSubtitle}>full-stack developer</div>
    </div>
    <div className="text-right flex px-6 justify-around md:pl-6 md:pr-0 md:align-top md:inline-block" style={{ marginTop: '0.8rem' }}>
      {navLinks.map(({ name, link }) => (
        <div key={name} className="pt-1">
          <Link
            href={link}
            className={`${commonStyles.link} ${styles.navLink}`}
          >
            {name}
          </Link>
        </div>
      ))}
    </div>
  </header>
)
