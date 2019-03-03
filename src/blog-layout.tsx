import React from 'react';
import { Helmet } from 'react-helmet';

import './helpers/jsenv';

import Menu from './components/Menu';
import PageHeader from './components/PageHeader';

import { FrontMatter } from './types/blog';
import { toBlogFormat } from './helpers/datetime';

import s from './styles/blogpost.module.scss';

import 'prismjs/themes/prism-tomorrow.css';

interface Props {
  children: any,
  pageContext: {
    frontmatter: FrontMatter
  }
};

export default ({ children, pageContext: { frontmatter } }: Props) => (
  <>
    <Helmet>
      <title>{frontmatter.title} - Akshay Nair's blog</title>
      <meta name="description" content={frontmatter.description} />
      <meta name="keywords" content={frontmatter.tags} />
    </Helmet>
    <Menu />
    <PageHeader title={frontmatter.title} subtitle={`${frontmatter.description} - ${toBlogFormat(frontmatter.publishDate)}`} />
    <div className={s.content}>
      {children}
    </div>
  </>
);
