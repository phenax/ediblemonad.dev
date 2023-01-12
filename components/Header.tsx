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
      <h1 className={styles.headerTitle}>Akshay Nair</h1>
      <div className={styles.headerSubtitle}>full-stack developer</div>
    </div>
    <div className="inline-block text-right align-top" style={{ margin: '0.8rem 0 0 4rem' }}>
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
