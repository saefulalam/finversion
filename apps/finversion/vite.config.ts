import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname, '../..'),
  publicDir: 'public',
  resolve: {
    alias: {
      '@fv-ui/core': resolve(__dirname, '../../packages/ui/src'),
      '@fv-ui/pro': resolve(__dirname, '../../packages/ui-pro/src'),
      '@fv-ui/shared': resolve(__dirname, '../../packages/shared/src')
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  }
})