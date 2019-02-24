/* eslint-disable */
module.exports = {
  siteMetadata: {
    siteName: 'Portfolio/blog',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/blog`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        frontmatter: true,
        defaultLayout: require.resolve('./src/blog-layout.tsx'),
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '=>',
              showLineNumbers: true,
            },
          },
        ],
      },
    },
  ],
};
/*

{
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-93349937-2`,
      },
    },
*/