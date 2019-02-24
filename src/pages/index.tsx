import React from 'react';
import { graphql } from 'gatsby';

import PageLayout from '../page-layout';

import { Project } from '../types/project';

type Edge = {
  node: {
    projects: Project[]
    totalCount: number
  }
};

type Props = {
  data: {
    allDataJson?: {
      edges: Edge[]
    }
  }
};

export default ({ data: { allDataJson }, ...props }: Props) => {
  const { edges: [ { node: { projects = [], totalCount = 0 } = {} } = {} ] = [] } = allDataJson || {};

  return (
    <PageLayout headerProps={{ subtitle: 'Full Stack Web Developer' }}>
      <div>Projects {totalCount}</div>
      <div>
        {projects.map(project => (
          <div key={project.id}>
            {project.title}
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export const pageQeury = graphql`
query Projects {
  allDataJson(filter: { projects: { elemMatch: { complete: { eq: true } } } }) {
    edges {
      node {
        projects {
          id
          title
          description
          image
          tags
          links {
            link
            gh
            text
          }
        }
      }
    }
  }
}
`;
