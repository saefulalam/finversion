import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['@fv-ui/core', '@fv-ui/shared'],
      output: {
        globals: {
          '@fv-ui/core': 'FVCore',
          '@fv-ui/shared': 'FVShared'
        }
      }
    }
  }
})