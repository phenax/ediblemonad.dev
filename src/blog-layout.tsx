import React from 'react';
import cx from 'classnames';
import { Helmet } from 'react-helmet';
import { Link, graphql, useStaticQuery } from 'gatsby';

import './helpers/jsenv';
import './helpers/firebase';
import { getLink } from './helpers/blog';

import Menu from './components/Menu';
import PageHeader from './components/PageHeader';
import ArticleActions from './components/ArticleActions';

import { FrontMatter } from './types/blog';
import { toBlogFormat } from './helpers/datetime';

import s from './styles/blogpost.module.scss';

import 'prismjs/themes/prism-tomorrow.css';
import './styles/mdx.scss';

interface Props {
  children: any,
  pageContext: {
    frontmatter: FrontMatter
  }
};

const siteMetaQuery = graphql`
  query SiteUrl {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default ({ children, pageContext: { frontmatter } }: Props) => {
  const date = toBlogFormat(frontmatter.publishDate);

  const { site: { siteMetadata: { siteUrl } } } = useStaticQuery(siteMetaQuery);

  return (
    <>
      <Helmet>
        <title>{frontmatter.title} - Akshay Nair's blog</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="keywords" content={frontmatter.tags} />
        <style>{`
          html, body {
            background-color: #fff;
          }
        `}</style>
      </Helmet>
      <Menu />
      <PageHeader
        title={frontmatter.title}
        subtitle={frontmatter.description}
        preTitle={
          <Link to="/blog" className={s.gobackButton}>
            <i className="fa fa-angle-left" />
            <span style={{ paddingLeft: '0.5em' }}>View all articles</span>
          </Link>
        }
      />
      <div className={s.wrapper}>
        <div>
          <span className={s.date}>Posted on {date}</span>
        </div>
        <div className={cx(s.content, 'blog-content')}>
          {children}
        </div>
        <ArticleActions postid={frontmatter.slug} summary={frontmatter.title} link={`${siteUrl}${getLink(frontmatter)}`} />
      </div>
    </>
  );
};

