/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const slugify = require('@sindresorhus/slugify');
const yargs = require('yargs');

const getContent = ({ title, slug, description, keywords, published }) => {
  return `---
slug: ${slug}
title: ${title}
published: ${published}
description: ${description || title}
tags: ${keywords || slug.split('-').join(',')}
publishDate: ${format(new Date(), 'yyyy/MM/dd')}
---

Work in progress
`;
};

const { argv: args } = yargs
  .option('slug', {
    alias: 's',
    default: '',
  })
  .option('description', {
    alias: 'd',
    default: '',
  })
  .option('published', {
    alias: 'p',
    default: false,
  })
  .option('keywords', {
    alias: 'k',
    default: '',
  });

if (!args._.length) {
  throw new Error('You need to pass the title of the blog post');
}

[args.title] = args._;
args.slug = args.slug || slugify(`${args.title}`.replace(/'/g, ''));

const blogFile = path.resolve(__dirname, '../src/pages/blog', `${args.slug}.mdx`);

const contents = getContent(args);

fs.writeFileSync(blogFile, contents, { encoding: 'utf8' });
