import React from 'react';
import { graphql } from 'gatsby';

import PageLayout from '../page-layout';
import SkillList from '../components/SkillList';

import { Skill } from '../types/project';

type Edge = {
  node: Skill
}

type Props = {
  data: {
    allSkillsJson: {
      edges: Edge[]
    }
  }
};

export default ({ data: { allSkillsJson: { edges } } }: Props) => (
  <PageLayout headerProps={{ title: 'Skill level 9999', subtitle: 'Not to brag but the list doesn\'t include everything. For example, my headbanding skills' }}>
    <SkillList skills={edges.map(e => e.node)} />
  </PageLayout>
);

export const pageQeury = graphql`
  query Skills {
    allSkillsJson {
      edges {
        node {
          name
          level
        }
      }
    }
  }
`;
