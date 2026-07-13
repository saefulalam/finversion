// vite.config.ts
import { defineConfig } from "file:///D:/finversion/node_modules/.pnpm/vite@5.4.21/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/finversion/node_modules/.pnpm/vite-plugin-dts@4.5.4_rollu_337483798a4569eeb6d4c7b4a5c18ac3/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
import { copyFileSync, existsSync } from "fs";
var __vite_injected_original_dirname = "D:\\finversion\\packages\\shared";
function copyTokensPlugin() {
  return {
    name: "copy-tokens",
    closeBundle() {
      const src = resolve(__vite_injected_original_dirname, "src/tokens.css");
      const dest = resolve(__vite_injected_original_dirname, "dist/tokens.css");
      if (existsSync(src)) {
        copyFileSync(src, dest);
      }
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [dts({ include: ["src"] }), copyTokensPlugin()],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: "index"
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmaW52ZXJzaW9uXFxcXHBhY2thZ2VzXFxcXHNoYXJlZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZmludmVyc2lvblxcXFxwYWNrYWdlc1xcXFxzaGFyZWRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2ZpbnZlcnNpb24vcGFja2FnZXMvc2hhcmVkL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW4gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGNvcHlGaWxlU3luYywgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJ1xuXG5mdW5jdGlvbiBjb3B5VG9rZW5zUGx1Z2luKCk6IFBsdWdpbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2NvcHktdG9rZW5zJyxcbiAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIGNvbnN0IHNyYyA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3Rva2Vucy5jc3MnKVxuICAgICAgY29uc3QgZGVzdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdC90b2tlbnMuY3NzJylcbiAgICAgIGlmIChleGlzdHNTeW5jKHNyYykpIHtcbiAgICAgICAgY29weUZpbGVTeW5jKHNyYywgZGVzdClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW2R0cyh7IGluY2x1ZGU6IFsnc3JjJ10gfSksIGNvcHlUb2tlbnNQbHVnaW4oKV0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICBmaWxlTmFtZTogJ2luZGV4J1xuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHt9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUixTQUFTLG9CQUE0QjtBQUN0VCxPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsY0FBYyxrQkFBa0I7QUFIekMsSUFBTSxtQ0FBbUM7QUFLekMsU0FBUyxtQkFBMkI7QUFDbEMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sY0FBYztBQUNaLFlBQU0sTUFBTSxRQUFRLGtDQUFXLGdCQUFnQjtBQUMvQyxZQUFNLE9BQU8sUUFBUSxrQ0FBVyxpQkFBaUI7QUFDakQsVUFBSSxXQUFXLEdBQUcsR0FBRztBQUNuQixxQkFBYSxLQUFLLElBQUk7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO0FBQUEsRUFDdkQsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQztBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ04sU0FBUyxDQUFDO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
