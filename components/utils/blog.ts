import { promises as fs } from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import path from 'path'

interface Filters {
  onlyPublished?: boolean,
  sortByDate?: boolean
}

export const getBlogPosts = async ({ onlyPublished = true, sortByDate = true }: Filters = {}) => {
  const postsPath = path.resolve('posts')
  const posts = await fs.readdir(postsPath)

  let postProps = await Promise.all(
    posts.map(async (p) => {
      const { default: _, meta, ...rest } = await import(`../../posts/${p}`)
      const slug = p.replace(/\.mdx?$/, '')
      const mat = matter(await fs.readFile(path.resolve('posts', p), 'utf8'))
      const { text: readTime } = readingTime(mat.content)
      const url = `/blog/${slug}`
      return { ...rest, ...meta, slug, url, readTime }
    })
  )

  if (onlyPublished) {
    postProps = postProps.filter((p: any) => p.published !== false)
  }

  if (sortByDate) {
    postProps.sort((a: any, b: any) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
  }

  return postProps
}
