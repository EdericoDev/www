import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import astroIcon from 'astro-icon';


// https://astro.build/config
export default defineConfig({
  site: 'https://ederico.dev',
  integrations: [
    [astroIcon()],
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
