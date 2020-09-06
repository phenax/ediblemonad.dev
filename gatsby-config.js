/* eslint-disable */

require("dotenv").config({ path: '.env' });

const enableBundleAnalyzer = process.env.ANALYZE === '1';

module.exports = {
  siteMetadata: {
    siteName: 'Akshay\'s portfolio + blog',
    title: `Akshay Nair`,
    description: `Akshay\'s portfolio + blog`,
    siteUrl: 'https://phenax.github.io',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',

    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        stripMetadata: true,
        defaultQuality: 60,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/assets`,
        name: 'assets',
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/blog`,
        name: 'blog-posts',
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
              showLineNumbers: false,
            },
          },
        ],
      },
    },

    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
        name: 'jsondata',
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Oswald',
            variants: ['300', '400'],
            subsets: ['latin'],
          },
          {
            family: 'Raleway',
            variants: ['100', '400'],
            subsets: ['latin'],
          },
          {
            family: 'Fira Mono',
            variants: ['400'],
            subsets: ['latin'],
          }
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-copy',
      options: {
        verbose: true,
        'README.md': 'public/README.md',
      },
    },
    `gatsby-plugin-webpack-size`,
    enableBundleAnalyzer && {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        analyzerPort: 3000,
        production: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ['/suggest-music'],
      }
    },
  ].filter(Boolean),
};
