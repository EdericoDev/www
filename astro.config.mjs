import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    svelte(),
    mdx()
  ],
  output: 'server',
  adapter: vercel(),
  vite: {
    build: {
      rollupOptions: {
        external: ['@astrojs/icon']
      }
    },
    ssr: {
      noExternal: ['@astrojs/icon']
    }
  }
});
