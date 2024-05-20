/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,astro}', // Include all relevant paths
    './src/pages/index.astro', // Include the root HTML file
  ],
  theme: {
    extend: {
      // Your custom theme configurations
    },
  },
  plugins: [
    typography,
  ],
}
