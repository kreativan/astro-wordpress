import { defineConfig } from 'astro/config';
import { loadEnv } from "vite";

import tailwindcss from '@tailwindcss/vite';

// We need it for ssr mode
import node from '@astrojs/node';

// Get the value of the ASTRO_SSR environment variable from .env
const { ASTRO_SSR } = loadEnv(process.env, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: ASTRO_SSR == 1 ? 'server' : 'static',
  adapter: ASTRO_SSR == 1 ? node({ mode: 'standalone' }) : undefined,
  image: {
    domains: ["wp.kreativan.dev", "supersonic-wordpress.ddev.site"],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});