import {defineConfig} from 'vite';

export default defineConfig(({command}) => ({
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 4173,
  },
}));
