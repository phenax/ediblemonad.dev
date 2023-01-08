import styles from '../page.module.css'
import commonStyles from '../common.module.css'

export default function About() {
  return (
    <main className={styles.main}>
      <h2 className="text-2xl text-bold pb-6" style={{ color: 'rgb(var(--accent-rgb))' }}>
        {`> console.log("Hello, there!")`}
      </h2>

      <div className={`indent-6 text-slate-400 ${styles.paraWrap}`}>
        <p>My name is <b>Akshay Nair</b> (as the giant header above might have given away). I am a <b>full-stack web developer</b> from Mumbai, India (+5:30 GMT).</p>

        <p>I have 6+ years of professional experience working full-stack on a variety of projects from a <b>matrimonial website</b> to a <b>video editor</b> on the web to a <b>realtime electronic lab notebook</b>. In addition to that, I also have a lot more experience working on <b>personal projects</b> and contributing to <b>open source</b>.</p>

        <p>
          I also like to dabble in some <b>esoteric</b> coding ideas, <b>creative coding</b>, etc in my free time.
          {` I've`} also taken up live-coding my personal projects on <b>twitch</b> (<a href="https://twitch.tv/EdibleMonad" target="_blank _parent" className={commonStyles.link}>@EdibleMonad</a>)
        </p>
      </div>
    </main>
  )
}
