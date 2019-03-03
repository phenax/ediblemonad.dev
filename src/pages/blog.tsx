import React from 'react';
import { graphql, Link } from 'gatsby';

import PageLayout from '../page-layout';
import BlogPostCard from '../components/BlogPostCard';

import { FrontMatter, WordCount } from '../types/blog';

interface BlogPost {
  node: {
    id: string,
    frontmatter: FrontMatter
    wordCount: WordCount
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
    <PageLayout title="Akshay Nair's Blog" headerProps={{ title: 'Blog', subtitle: '' }}>
      <div>
        Posts <strong>{totalCount}</strong>
      </div>
      <div>
        {edges.map(({ node: post }) => (
          <div key={post.id}>
            <BlogPostCard {...post} />
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogPosts {
    allMdx(filter: { frontmatter: { published: { eq: true } } }, sort: { fields: [frontmatter___publishDate], order: DESC }) {
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