export interface LinkType {
  text: string;
  link: string;
  gh: boolean;
  ghUser?: string;
}

export interface Project<T> {
  id: string;
  complete: boolean;
  title: string;
  description: string;
  image: T;
  tags: string[];
  links: LinkType[];
}

export interface Skill {
  name: string;
  level: string;
}
