import React from 'react';
import { Link } from 'gatsby';

import { toBlogFormat } from '../../helpers/datetime';

import { FrontMatter, WordCount } from '../../types/blog';

import s from './BlogPostCard.module.scss';

type Props = {
  frontmatter: FrontMatter
  wordCount: WordCount
}

const BlogPostCard = ({ frontmatter }: Props) => (
  <Link to={`/blog/${frontmatter.slug}`} className={s.card}>
    <div className={s.cardTitle}>{frontmatter.title}</div>
    <small>
      <div>
        <span className={s.date}>
          {toBlogFormat(frontmatter.publishDate)}
        </span>
        {frontmatter.description}
      </div>
    </small>
  </Link>
);

export default BlogPostCard;
