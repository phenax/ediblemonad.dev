import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/layout.module.css'
import { useRouter } from 'next/router'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'

const navLinks = [
  { name: 'Projects', link: { pathname: '/' } },
  { name: 'About', link: { pathname: '/about' } },
  { name: 'Blog', link: { pathname: '/blog' } },
  { name: 'Desmos', link: { pathname: 'https://desmos.ediblemonad.dev' } },
  { name: 'Links', link: { pathname: '/contact' } },
]

export const Header = () => {
  const router = useRouter()
  const isNested = (path: string) => {
    if (
      path !== '/' &&
      path !== router.pathname &&
      router.pathname.startsWith(path)
    )
      return true
    return false
  }
  const routeMatches = (path: string) => router.pathname === path

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
                routeMatches(link.pathname) ? styles.navLinkActive : ''
              }`}
            >
              {name}
            </Link>
            {isNested(link.pathname) ? (
              <span className="absolute text-slate-600 ml-2 mt-0.5 w-full text-left max-md:hidden">
                <FontAwesomeIcon icon={faArrowRight} size="xs" />
                <FontAwesomeIcon
                  icon={faCircleDot}
                  size="xs"
                  className="ml-2"
                />
              </span>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </header>
  )
}
