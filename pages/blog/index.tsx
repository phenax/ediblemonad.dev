import Link from 'next/link'

import styles from '../../styles/page.module.css'
import commonStyles from '../../styles/common.module.css'
import { getBlogPosts } from '../../components/utils/blog'

export async function getStaticProps() {
  return {
    props: {
      posts: await getBlogPosts(),
    },
  }
}

export default function Post({ posts }: any) {
  return (
    <main className={styles.main}>
      {posts.map((post: any) => (
        <div className={styles.project} key={post.slug}>
          <Link href={post.url} className={commonStyles.link}>
            <h3 className="text-2xl font-bold">{post.title}</h3>
          </Link>
          <div className="text-sm text-slate-400">{post.description}</div>
          <div className="text-sm text-right">{post.readTime}</div>
        </div>
      ))}
    </main>
  )
}
