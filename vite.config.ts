/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { sourceTags } from './tools/designarena/vite-plugin-source-tags';

/**
 * Opt-in DesignArena dev tooling (source-mapped element picker).
 * See tools/designarena/README.md. Disabled by default so production
 * builds carry no source-tag metadata:
 *
 *   SOURCE_TAGS=1 npm run dev
 */
const enableSourceTags = process.env.SOURCE_TAGS === '1';

const plugins: PluginOption[] = [react(), tailwindcss()];
if (enableSourceTags) {
  plugins.push(sourceTags());
}

export default defineConfig({
  plugins,
  // Dev-server convenience for sandboxed/proxied preview environments:
  // accept whatever host the dev server is reached through. Production
  // builds are static files and unaffected.
  server: {
    allowedHosts: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.{ts,tsx}'],
  },
});
