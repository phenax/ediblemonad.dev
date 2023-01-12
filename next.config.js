// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeCodeTitles from 'rehype-code-titles'
// import rehypeHighlight from 'rehype-highlight'
// import rehypeSlug from 'rehype-slug'
import mdx from '@next/mdx'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    // rehypePlugins: [
    //   rehypeSlug,
    //   [
    //     rehypeAutolinkHeadings,
    //     { properties: { className: ['anchor'] } },
    //     { behaviour: 'wrap' },
    //   ],
    //   rehypeHighlight,
    //   rehypeCodeTitles,
    // ],
    // providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
export default withMDX({
  pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'mdx', 'md'],
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
})
