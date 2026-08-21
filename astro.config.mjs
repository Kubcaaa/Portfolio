import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.kubca.com',
  integrations: [
    tailwind({
      applyBaseStyles: false, // on gère les styles de base nous-mêmes dans global.css
    }),
  ],
});
