import {defineConfig} from 'vite';

export default defineConfig(({command}) => ({
  base: command === 'build' ? '/autonateai-workshop-portal/' : '/',
  server: {
    host: '0.0.0.0',
    port: 4173,
  },
}));
