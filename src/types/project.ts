
import { FixedImage } from './image';

type LinkType = {
  text: string
  link: string
  gh: boolean
};

export interface Project<T> {
  id: string
  complete: boolean
  title: string
  description: string
  image: T
  tags: string[]
  links: LinkType[]
};

export interface Skill {
  name: string
  level: string
};
