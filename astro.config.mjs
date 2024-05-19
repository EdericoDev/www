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
        /**
         * Adds ids to headings
         */
        rehypeSlug,
        [
          /**
           * Enhances code blocks with syntax highlighting, line numbers,
           * titles, and allows highlighting specific lines and words
           */
 
          rehypePrettyCode,
          {
            theme: 'github-dark',
          },
        ],
      ],
    }),
  ],
});