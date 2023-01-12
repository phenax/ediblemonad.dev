import dynamic from 'next/dynamic'
// import { getSlugs, getMeta } from 'utils/posts.js'
import { MDXProvider } from '@mdx-js/react'
import { useRouter } from 'next/router'
// import 'highlight.js/styles/atom-one-dark-reasonable.css'

export default function Post() {
  const router = useRouter()
  const { slug } = router.query

  if (!slug) return ''

  const Post = dynamic(import(`../posts/${slug}.mdx`))
  return (
    <main>
      <article className="prose mx-auto p-6">
        <MDXProvider disableParentContext={true}>
          <Post />
        </MDXProvider>
      </article>
    </main>
  )
}
