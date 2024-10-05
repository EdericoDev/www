import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import astroIcon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), astroIcon()],
});
