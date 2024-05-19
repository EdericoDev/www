// src/content/config.ts
 
import { defineCollection, z } from 'astro:content';
 
const postsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
   // using zod to define type-safe frontmatter of our mdx files
   // astro will generate types definitions for our project so we can use them in templates
   // also it will check every newly created frontmatter in the content/blog directory
    z.object({
      cover: image(),
      title: z.string(),
      tags: z.array(z.string()),
      date: z.coerce.date(),
      excerpt: z.string(),
    }),
});
 
// This key should match your collection directory name in "src/content"
export const collections = {
  blog: postsCollection,
};