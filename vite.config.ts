import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // if your repo is at https://<you>.github.io/onboarding-journey
  base: 'embark-onboarding-journey-main',
  plugins: [react()],
  build: {
    outDir: 'docs'     // GitHub Pages can serve from /docs
  }
});
