'use client'
import dynamic from 'next/dynamic'
// import { getSlugs, getMeta } from 'utils/posts.js'
import { MDXProvider } from '@mdx-js/react'

export default function Post({ params: { slug } }: { params: { slug: string } }) {
  const Post = dynamic(import(`../posts/${slug}.mdx`))

  return (
    <main>
      <h1>WWWOoo - {slug}</h1>
      <article className="prose">
        <MDXProvider>
          <Post />
        </MDXProvider>
      </article>
    </main>
  )
}
