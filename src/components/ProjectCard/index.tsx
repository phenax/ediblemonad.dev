import React from 'react';

import s from './ProjectCard.module.scss';

import { Project } from '../../types/project';

const ProjectCard = ({ id, title }: Project) => (
  <div key={id}>
    {title}
  </div>
);

export default ProjectCard;
