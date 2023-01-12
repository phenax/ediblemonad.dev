import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from '../../styles/page.module.css'
import commonStyles from '../../styles/common.module.css'

config.autoAddCss = false;

const contacts = [
  {
    link: 'https://github.com/phenax',
    icon: faGithub,
    text: 'Github',
    brandColor: '#ffffff',
  },
  {
    link: 'https://www.linkedin.com/in/akshay-nair5',
    icon: faLinkedin,
    text: 'LinkedIn',
    brandColor: '#006192',
  },
  {
    link: 'https://twitch.tv/EdibleMonad',
    icon: faTwitch,
    text: 'Twitch',
    brandColor: '#6441A4',
  },
  {
    link: 'https://twitter.com/EdibleMonad',
    icon: faTwitter,
    text: 'Twitter',
    brandColor: '#55ACEE',
  },
]

const email = 'akshay.n0@protonmail.com'

export default function Contact() {
  return (
    <main className={styles.main}>
      <h2 className="text-2xl text-bold mt-3 pb-6 text-center">
        <a href={`mailto:${email}`} className={commonStyles.link} target="_blank _parent">{email}</a>
      </h2>

      <div className="flex w-full justify-around mt-6">
        {contacts.map(c => (
          <a href={c.link} target="_blank _parent" className={`block ${styles.contactLink} ${commonStyles.link}`} key={c.link}>
            <div className="px-4 py-6 text-center">
              <span className="inline-block relative">
                <FontAwesomeIcon
                  icon={c.icon}
                  className={`text-4xl pb-6 ${styles.contactLinkIcon}`}
                />
                <FontAwesomeIcon
                  icon={c.icon}
                  className={`text-4xl pb-6 ${styles.contactLinkBrandIcon}`}
                  style={{ color: c.brandColor }}
                />
              </span>
              <div>{c.text}</div>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}
