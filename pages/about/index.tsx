import styles from '../../styles/page.module.css'
import commonStyles from '../../styles/common.module.css'
import Head from 'next/head'

export default function About() {
  return (
    <main className={styles.main}>
      <Head>
        <title>About Me - Akshay Nair</title>
        <meta name="description" content="Akshay Nair, who is a full-stack web developer based in India" />
      </Head>

      <h2 className="text-3xl text-bold pb-6" style={{ color: 'var(--accent-rgb)' }}>
        <pre style={{ fontFamily: 'var(--font-mono)' }}>{`$ whoami`}</pre>
      </h2>

      <div className={`indent-6 text-slate-400 ${styles.paraWrap}`}>
        <p>
          I am a <b>full-stack web developer</b> from Mumbai, India <b>(+5:30 GMT)</b> with <b>6 years</b> of professional experience building great products. I have a passion for <b>functional programming</b>, linux and <b>open source</b> software. I am also dedicated to constantly <b>improving my skills</b> and staying <b>up to date</b> with the latest developments in the industry.
        </p>

        <p>
          Also, being an advocate for strong <b>automated testing</b> practices, I prioritize it thoroughly in my projects, ensuring that the software can be deployed with confidence.
        </p>

        <p>
          Other than that, in my <b>free time</b>, I also like to dabble in some <b>esoteric</b> coding ideas, <b>creative coding</b>, etc.
          {` I've`} also taken up live-coding my personal projects on <b>twitch</b> (<a href="https://twitch.tv/EdibleMonad" target="_blank _parent" className={commonStyles.link}>@EdibleMonad</a>)
        </p>
      </div>
    </main>
  )
}
