import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '../styles/layout.module.css'
import { useRouter } from 'next/router'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'

export const navLinks = [
  { name: 'Projects', link: { pathname: '/' } },
  { name: 'About', link: { pathname: '/about' } },
  { name: 'Blog', link: { pathname: '/blog' } },
  { name: 'Desmos', link: { pathname: 'https://desmos.ediblemonad.dev' } },
  { name: 'Links', link: { pathname: '/contact' } },
]

export const Header = ({ variant = 'default' }: { variant?: 'simple' | 'default' }) => {
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

  const isSimpleVariant = variant === 'simple';

  return (
    <header className={`${styles.header} ${isSimpleVariant && '!pt-4 !pb-8'}`}>
      <span className={styles.bubble}></span>

      {!isSimpleVariant && (
        <div className={styles.headerName}>
          <h1 className={`${styles.headerTitle}`}>
            <div className="relative">
              <span>Akshay Nair</span>
            </div>
          </h1>
          <div className={styles.headerSubtitle}>a professional nerd</div>
        </div>
      )}

      <div
        className={[
          styles.spacing,
          `relative text-right flex px-6 justify-around gap-3 text-base`,
          isSimpleVariant
            ? 'align-top inline-block text-sm max-w-[800px] m-auto'
            : 'md:align-top md:inline-block max-sm:text-sm',
        ].join(' ')}
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

            {isNested(link.pathname) && (
              <span className="absolute text-slate-600 ml-1 mt-0.5 w-full text-left max-md:hidden">
                {'/'}
                <FontAwesomeIcon
                  icon={faCircleDot}
                  size="xs"
                  className="ml-1"
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </header>
  )
}
