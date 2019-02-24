import React from 'react';
import { graphql } from 'gatsby';

import PageLayout from '../page-layout';
import ProjectCard from '../components/ProjectCard';

import { Project } from '../types/project';

type Edge = {
  node: Project
}

type Props = {
  data: {
    allProjectsJson: {
      edges: Edge[]
    }
  }
};

export default ({ data: { allProjectsJson: { edges } } }: Props) => {
  const projects = edges.map(e => e.node);

  return (
    <PageLayout headerProps={{ subtitle: 'Full Stack Web Developer' }}>
      {projects.map(project => <ProjectCard key={project.id} {...project} />)}
    </PageLayout>
  );
};

export const pageQeury = graphql`
  query Projects {
    allProjectsJson {
      edges {
        node {
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
`;
