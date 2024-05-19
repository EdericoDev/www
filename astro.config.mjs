import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kozhuhds.com',
  integrations: [
    tailwind(),
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
          },
        ],
      ],
    }),
  ],
  content: {
    collections: {
      blog: {
        schema: {
          title: 'string',
          description: 'string',
          date: 'date',
          slug: 'string',
        },
      },
    },
  },
});
