// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  server: {
    proxy: {
      '/api/slack': {
        target: 'https://hooks.slack.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/slack/, '')
      }
    }
  }
})