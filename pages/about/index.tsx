import styles from '../../styles/page.module.css'
import commonStyles from '../../styles/common.module.css'
import Head from 'next/head'
import { Header } from '../../components/Header'
import Link from 'next/link'

export default function About() {
  const years = new Date().getFullYear() - 2017

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Head>
          <title>About Me - Akshay Nair</title>
          <meta
            name="description"
            content="About Akshay Nair, a professional nerd"
          />
        </Head>

        <h2
          className="text-3xl text-bold pb-6"
          style={{ color: 'var(--accent-rgb)' }}
        >
          <pre style={{ fontFamily: 'var(--font-mono)' }}>{`$ whoami`}</pre>
        </h2>

        <div className={`indent-6 text-slate-400 ${styles.paraWrap}`}>
          <p>
            I am a <b>full-stack web developer</b> from India with{' '}
            <b>~{years} years</b> of professional experience building great products.
            I have a passion for <b>building software</b>, <b>FOSS</b>, <b>Linux</b>
            , and <b>learning</b> new&nbsp;things.
          </p>

          <p>
            I also like to dabble in some <b>esoteric</b>/<b>creative</b> coding projects, building software tools for myself, whittling with wood, creating small clay sculptures, listening to music, playing video&nbsp;games,&nbsp;etc.
            If you like those things too, <Link className={commonStyles.link} href="/contact">tell me about em</Link>!
          </p>
        </div>
      </main>
    </>
  )
}
