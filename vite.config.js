import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { mcpPlugin } from '@lovable.dev/mcp-js/stacks/supabase/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mcpPlugin()],
  base: process.env.NODE_ENV === "production" ? "/rufusakande/" : "/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
