import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [dts({ include: ['src'] })],
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