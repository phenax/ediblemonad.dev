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
              showLineNumbers: true,
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

    // {
    //   resolve: 'gatsby-plugin-web-font-loader',
    //   options: {
    //     custom: {
    //       families: ['fontello'],
    //       urls: ['/fontello/css/fontello.css']
    //     }
    //   }
    // },
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