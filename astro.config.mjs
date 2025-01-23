import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import astroIcon from 'astro-icon';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [tailwind(), astroIcon(), svelte(), mdx()],
  output: 'server',
  adapter: vercel({
    functionPerRoute: true,
    webAnalytics: { enabled: true }
  }),
});
