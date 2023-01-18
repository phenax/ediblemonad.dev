import { promises as fs } from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import Link from 'next/link'
import path from 'path'

import styles from '../../styles/page.module.css'
import commonStyles from '../../styles/common.module.css'

export async function getStaticProps() {
  const postsPath = path.resolve('posts')
  const posts = await fs.readdir(postsPath)

  const postProps = await Promise.all(
    posts.map(async (p) => {
      const { default: _, meta, ...rest } = await import(`../../posts/${p}`)
      const slug = p.replace(/\.mdx?$/, '')
      const mat = matter(await fs.readFile(path.resolve('posts', p), 'utf8'))
      const { text: readTime } = readingTime(mat.content)
      return { ...rest, ...meta, slug, readTime }
    })
  )

  return {
    props: {
      posts: postProps
        .filter((p) => p.published !== false)
        .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1)),
    },
  }
}

export default function Post({ posts }: any) {
  console.log(posts)

  return (
    <main className={styles.main}>
      {posts.map((post: any) => (
        <div className={styles.project} key={post.slug}>
          <Link href={`/blog/${post.slug}`} className={commonStyles.link}>
            <h3 className="text-2xl font-bold">{post.title}</h3>
          </Link>
          <div className="text-sm text-slate-400">{post.description}</div>
          <div className="text-sm text-right">{post.readTime}</div>
        </div>
      ))}
    </main>
  )
}
