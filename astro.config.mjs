import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://colorado-ballot-guide.vercel.app',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
