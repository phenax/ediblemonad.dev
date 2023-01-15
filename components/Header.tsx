import Link from 'next/link'

import styles from '../styles/layout.module.css'
import { useRouter } from 'next/router'

const navLinks = [
  { name: 'Projects', link: { pathname: '/' } },
  { name: 'About', link: { pathname: '/about' } },
  // { name: 'Blog', link: { pathname: '/blog' } },
  { name: 'Links', link: { pathname: '/contact' } },
]

export const Header = () => {
  const router = useRouter()

  return (
    <header className={styles.header}>
      <span className={styles.headerFade}></span>
      <div className={styles.headerName}>
        <h1 className={`${styles.headerTitle} text-4xl md:text-6xl`}>
          <div className="relative">
            <span>Akshay Nair</span>
          </div>
        </h1>
        <div className={styles.headerSubtitle}>a full-stack developer</div>
      </div>

      <div
        className={`relative ${styles.spacing} text-right flex px-6 justify-around md:align-top md:inline-block`}
        style={{ marginTop: '0.8rem' }}
      >
        {navLinks.map(({ name, link }) => (
          <div key={name} className="pt-1">
            <Link
              href={link}
              className={`${styles.navLink} ${
                router.pathname === link.pathname ? styles.navLinkActive : ''
              }`}
            >
              {name}
            </Link>
          </div>
        ))}
      </div>
    </header>
  )
}
