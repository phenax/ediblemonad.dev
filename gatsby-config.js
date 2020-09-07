/* eslint-disable */

// require("dotenv").config({ path: '.env' });

// const enableBundleAnalyzer = process.env.ANALYZE === '1';

const BASE_URL = 'https://phenax.github.io';
const BLOG_BASE_URL = `${BASE_URL}/blog`;

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
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        display: 'swap',
        fonts: [
          'Oswald\:300,400',
          'Raleway\:100,400',
          'Fira Mono\:400',
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
    //`gatsby-plugin-webpack-size`,
    //enableBundleAnalyzer && {
      //resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      //options: {
        //analyzerPort: 3000,
        //production: true,
      //},
    //},
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { allMdx } }) => {
              return allMdx.edges.map(edge => {
                const { title, description, publishDate, slug } = edge.node.frontmatter;
                const url = `${BLOG_BASE_URL}/${slug}`;
                return {
                  title,
                  description,
                  date: publishDate,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": edge.node.html }], // rawBody | html
                };
              })
            },
            query: `
              {
                allMdx(sort: {order: DESC, fields: [frontmatter___publishDate]}, filter: {frontmatter: {published: {eq: true}}}) {
                  edges {
                    node {
                      html
                      frontmatter {
                        title
                        description
                        slug
                        publishDate
                      }
                    }
                  }
                }
              }
            `,
            output: '/blog-rss.xml',
            title: `Akshay Nair's blog`,
          },
        ],
      },
    }
  ].filter(Boolean),
};
