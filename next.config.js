import mdx from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'
import haskell from 'highlight.js/lib/languages/haskell'
import javascript from 'highlight.js/lib/languages/javascript'
import reasonml from 'highlight.js/lib/languages/reasonml'
import lua from 'highlight.js/lib/languages/lua'
import typescript from 'highlight.js/lib/languages/typescript'

const languages = {
  haskell,
  javascript,
  typescript,
  reasonml,
  lua,
}

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkRehypeOptions: {
      allowDangerousHtml: true,
    },
    rehypePlugins: [
      [rehypeHighlight, {
        ignoreMissing: true,
        languages,
      }]
    ],
  },
})

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'mdx', 'md'],
  reactStrictMode: true,
  experimental: {
    mdxRs: false,
  },
}

export default withMDX(config)
