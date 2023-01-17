import { promises as fs } from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import Link from 'next/link'
import path from 'path'

import styles from '../../styles/page.module.css'

export async function getStaticProps() {
  const postsPath = path.resolve('posts')
  const posts = await fs.readdir(postsPath)

  const postProps = await Promise.all(posts.map(async p => {
    const { default: _, meta } = await import(`../../posts/${p}`)
    const slug = p.replace(/\.mdx?$/, '')
    const mat = matter(await fs.readFile(path.resolve('posts', p), 'utf8'))
    const { text: readTime } = readingTime(mat.content)
    return { ...meta, slug, readTime }
  }))

  return {
    props: {
      posts: postProps
    }
  }
}

export default function Post({ posts }: any) {
  console.log(posts)
  
  return (
    <main className={styles.main}>
      {posts.map((post: any) => (
        <Link href={`/blog/${post.slug}`} key={post.slug}>
          <div className={styles.project}>
            <h3 className="text-2xl font-bold">{post.title}</h3>
            <div className="text-sm">{post.description}</div>
            <div className="text-sm">{post.readTime}</div>
          </div>
        </Link>
      ))}
    </main>
  )
}
