import { FrontMatter } from '../types/blog';

export const getLink = ({ slug }: FrontMatter) => `/blog/${slug}`;
