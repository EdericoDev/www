import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import astroIcon from 'astro-icon';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless'; 

export default defineConfig({
  integrations: [tailwind(), astroIcon(), svelte()],
  output: 'server',
  adapter: vercel(), 
});
