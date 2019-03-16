import React from 'react';
import { graphql } from 'gatsby';

import PageLayout from '../page-layout';
import ProjectCard from '../components/ProjectCard';

import { Project } from '../types/project';
import { FixedImage } from '../types/image';

type ProjectEdge = {
  node: Project<string>
}

type ImageFileEdge = {
  node: {
    childImageSharp: {
      fixed: {
        originalName: string
      }
    }
  }
}

type Props = {
  data: {
    allProjectsJson: {
      edges: ProjectEdge[]
    }
    allFile: {
      edges: ImageFileEdge[]
    }
  }
};

export default ({ data: { allProjectsJson, allFile } }: Props) => {
  const images: { [key: string]: FixedImage } = allFile.edges
    .map(x => x.node.childImageSharp)
    .reduce((acc, img) => ({ ...acc, [img.fixed.originalName]: img.fixed }), {});

  const projects: Project<FixedImage>[] = allProjectsJson.edges
    .map(e => e.node)
    .map(project => ({
      ...project,
      image: images[project.image]? images[project.image]: ({ src: project.image })
    }));

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

    allFile(filter: { relativePath: { regex: "/projects/.*\\.(png|jpg|gif|jpeg|webp)/" } }) {
      edges {
        node {
          childImageSharp {
            fixed(quality: 100, width: 400) {
              base64
              tracedSVG
              src
              srcWebp
              srcSet
              srcSetWebp
              originalName
            }
          }
        }
      }
    }
  }
`;
