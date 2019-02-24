import React from 'react';
import { graphql } from 'gatsby';

import PageLayout from '../page-layout';
import ProjectCard from '../components/ProjectCard';

import { Project } from '../types/project';

type Edge = {
  node: {
    projects: Project[]
  }
};

type Props = {
  data: {
    allDataJson?: {
      edges: Edge[]
    }
  }
};

export default ({ data: { allDataJson } }: Props) => {
  const { edges: [ { node: { projects = [] } = {} } = {} ] = [] } = allDataJson || {};

  return (
    <PageLayout headerProps={{ subtitle: 'Full Stack Web Developer' }}>
      {projects.map(project => <ProjectCard key={project.id} {...project} />)}
    </PageLayout>
  );
};

export const pageQeury = graphql`
query Projects {
  allDataJson {
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
