import Link from 'next/link'
import { Raleway } from '@next/font/google'
import styles from './layout.module.css'
import commonStyles from './common.module.css'
import './globals.css'

const font = Raleway({
  preload: true,
})

const navLinks = [
  { name: 'Projects', link: { pathname: '/' } },
  { name: 'About', link: { pathname: '/about' } },
  // { name: 'Blog', link: { pathname: '/blog' } },
  { name: 'Contact', link: { pathname: '/contact' } },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={font.className}>
        <header className={styles.header}>
          <div className={styles.headerName}>
            <h1 className={styles.headerTitle}>Akshay Nair</h1>
            <div className={styles.headerSubtitle}>a full-stack human</div>
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

        {children}
      </body>
    </html>
  )
}
