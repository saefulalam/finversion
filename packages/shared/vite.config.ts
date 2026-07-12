import { defineConfig, Plugin } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { copyFileSync, existsSync } from 'fs'

function copyTokensPlugin(): Plugin {
  return {
    name: 'copy-tokens',
    closeBundle() {
      const src = resolve(__dirname, 'src/tokens.css')
      const dest = resolve(__dirname, 'dist/tokens.css')
      if (existsSync(src)) {
        copyFileSync(src, dest)
      }
    }
  }
}

export default defineConfig({
  plugins: [dts({ include: ['src'] }), copyTokensPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
})
