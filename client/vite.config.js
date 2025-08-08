import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
  
    viteStaticCopy({
      targets: [
        { src: 'public/manifest.json', dest: '.' },
        { src: 'public/*.png', dest: '.' }
      ]
    })
  ],
  server: {
    port: 6291,
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
})
