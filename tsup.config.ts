import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : `.${format}`,
    }
  }
})