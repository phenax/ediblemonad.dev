
export interface FrontMatter {
  title: string
  description: string
  tags: string
  slug: string
  published: boolean
  publishDate: string
};

export interface WordCount {
  paragraphs: number
  sentences: number
  words: number
}
