import React from 'react';
import { graphql, Link } from 'gatsby';

import { FrontMatter } from '../types/blog';
import { toBlogFormat } from '../helpers/datetime';

interface BlogPost {
  node: {
    id: string,
    frontmatter: FrontMatter
  }
};

interface BlogIndexProps {
  data: {
    allMdx?: {
      edges: BlogPost[],
      totalCount: number,
    }
  }
};

const BlogIndex = ({ data: { allMdx } = { allMdx: void 0 } }: BlogIndexProps) => {
  const { edges, totalCount } = allMdx || { edges: [], totalCount: 0 };

  return (
    <div>
      <div>
        Posts <strong>{totalCount}</strong>
      </div>
      <div>
        {edges.map(({ node: post }) => (
          <div key={post.id}>
            <Link to={`/blog/${post.frontmatter.slug}`}>
              <div>{post.frontmatter.title}</div>
              <small>
                <div>{post.frontmatter.description} - {toBlogFormat(post.frontmatter.publishDate)}</div>
              </small>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogPosts {
    allMdx(filter: { frontmatter: { published: { eq: true } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
            description
            publishDate
          }
          wordCount {
            paragraphs
            sentences
            words
          }
          timeToRead
        }
      }
    }
  }
`;