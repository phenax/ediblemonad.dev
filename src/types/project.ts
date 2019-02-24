
type LinkType = {
  text: string
  link: string
  gh: boolean
};

export interface Project {
  id: string,
  complete: boolean
  title: string
  description: string
  image: string
  tags: string[]
  links: LinkType[]
};
