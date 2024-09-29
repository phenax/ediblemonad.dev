import Link from 'next/link'

import styles from '../../styles/page.module.css'
import commonStyles from '../../styles/common.module.css'
import { getBlogPosts } from '../../components/utils/blog'
import Head from 'next/head'
import { Header } from '../../components/Header'

export async function getStaticProps() {
  return {
    props: {
      posts: await getBlogPosts(),
    },
  }
}

export default function Post({ posts }: any) {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Head><title>Blog - Akshay Nair</title></Head>

        {posts.map((post: any) => (
          <div className={styles.project} key={post.slug}>
            <Link href={post.url} className={commonStyles.link}>
              <h3 className={`${styles.projectTitle}`}>{post.title}</h3>
            </Link>
            <div className="text-sm text-slate-400">{post.description}</div>
            <div className="text-sm text-right">{post.readTime}</div>
          </div>
        ))}
      </main>
    </>
  )
}
