import React from 'react';
import { Link } from 'gatsby';

import { toBlogFormat } from '../../helpers/datetime';
import { getLink } from '../../helpers/blog';
import { FrontMatter, WordCount } from '../../types/blog';

import s from './BlogPostCard.module.scss';

type Props = {
  frontmatter: FrontMatter
  wordCount: WordCount
}

const BlogPostCard = ({ frontmatter, wordCount }: Props) => (
  <Link to={getLink(frontmatter)} className={s.card}>
    <div className={s.cardTitle}>{frontmatter.title}</div>
    <small>
      <div>
        <span className={s.date}>
          {toBlogFormat(frontmatter.publishDate)}
        </span>
        {`${frontmatter.description} - `}
        <span>
          {wordCount.words} words
        </span>
      </div>
    </small>
  </Link>
);

export default BlogPostCard;
