const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'mdx', 'md'],
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
})
