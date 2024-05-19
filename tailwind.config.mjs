/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,mdx}', 
  ],
  theme: {
    // ...
  },
  plugins: [
    typography,
    // ...
  ],
}
