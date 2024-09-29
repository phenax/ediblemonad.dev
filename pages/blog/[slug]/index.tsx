import dynamic from 'next/dynamic'
import { MDXProvider } from '@mdx-js/react'
import { useRouter } from 'next/router'
// import 'highlight.js/styles/base16/material-palenight.css'
// import 'highlight.js/styles/base16/gruvbox-dark-hard.css'
import 'highlight.js/styles/atom-one-dark.css'

import styles from '../../../styles/page.module.css'
import { getBlogPosts } from '../../../components/utils/blog'
import Head from 'next/head'
import { Header } from '../../../components/Header'

export async function getStaticPaths() {
  const posts = await getBlogPosts({ onlyPublished: false, sortByDate: false })
  return {
    paths: posts.map(p => p.url),
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  const { meta } = await import(`../../../posts/${slug}.mdx`)
  return {
    props: { meta }
  }
}

export default function Post({ meta }: any) {
  const router = useRouter()
  const { slug } = router.query

  if (!slug) return ''

  const Post = dynamic(import(`../../../posts/${slug}.mdx`))

  return (
    <>
      <Header variant="simple" />

      <main className={styles.main}>
        <Head>
          <title>{meta.title} - Blog - Akshay Nair</title>
          <meta name="description" content={`${meta.description}`} />
        </Head>

        <article className="prose prose-invert max-w-full">
          <MDXProvider disableParentContext={true}>
            <h1 className="text-accent-1">{meta.title}</h1>
            <Post />
          </MDXProvider>
        </article>
      </main>
    </>
  )
}
