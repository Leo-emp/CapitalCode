import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // # tests that load the whole art library take > 5 s when the full suite runs in parallel
    testTimeout: 30_000,
  },
  resolve: {
    alias: {
      '@': import.meta.dirname + '/src',
    },
  },
})
