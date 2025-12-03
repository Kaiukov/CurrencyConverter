import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 3001,
    strictPort: true,
    allowedHosts: ['oleksandrs-macbook-air.neon-chuckwalla.ts.net'],
  },
});
