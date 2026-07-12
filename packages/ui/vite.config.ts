import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  plugins: [
    dts({ include: ['src'] }),
    {
      name: 'collect-styles',
      generateBundle() {
        // This plugin will be used to collect CSS into a single file
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['@fv-ui/shared'],
      output: {
        globals: {
          '@fv-ui/shared': 'FVShared'
        }
      }
    }
  }
})