import mdx from '@next/mdx'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
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
