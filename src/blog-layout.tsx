import React from 'react';
import { Helmet } from 'react-helmet';

import { FrontMatter } from './types/blog';
import { toBlogFormat } from './helpers/datetime';

interface Props {
  children: any,
  pageContext: {
    frontmatter: FrontMatter
  }
};

export default ({ children, pageContext: { frontmatter }, ...props }: Props) => (
  <div>
    <Helmet>
      <title>{frontmatter.title}</title>
      <meta name="content" content={frontmatter.description} />
      <meta name="keywords" content={frontmatter.tags} />
    </Helmet>
    <h1>{frontmatter.title}</h1>
    <small>
      <div>{toBlogFormat(frontmatter.publishDate)}</div>
    </small>
    <pre>{JSON.stringify(props, null, 2)}</pre>
    {children}
  </div>
);
