import styles from '../../styles/page.module.css'
import Head from 'next/head'
import { Header } from '../../components/Header'

export default function About() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Head>
          <title>About Me - Akshay Nair</title>
          <meta name="description" content="About Akshay Nair, a professional nerd" />
        </Head>

        <h2
          className="text-3xl text-bold pb-6"
          style={{ color: 'var(--accent-rgb)' }}
        >
          <pre style={{ fontFamily: 'var(--font-mono)' }}>{`$ whoami`}</pre>
        </h2>

        <div className={`indent-6 text-slate-400 ${styles.paraWrap}`}>
          <p>
            I am a <b>full-stack web developer</b> from Mumbai, India with <b>7 years</b> of professional experience building great products.
            I have a passion for <b>building software</b>, <b>FOSS</b>, and <b>learning</b>.

            I am also dedicated to constantly <b>improving my skills</b> and staying <b>up to date</b> with the latest developments in the industry.
            Also, being an advocate for strong <b>automated testing</b> practices, I prioritize it thoroughly in my projects, ensuring that the software can be deployed with confidence.
          </p>

          <p>
            And when I{`'`}m off the clock, I also like to dabble in some <b>esoteric</b>/<b>creative</b> coding projects, whittling with wood, creating small clay sculptures, building software tools for myself, listening to music, playing video games, etc.
          </p>
        </div>
      </main>
    </>
  )
}
