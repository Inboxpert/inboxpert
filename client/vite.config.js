// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    commonjs(),
    inject({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        background: resolve(__dirname, 'src/background/index.js'),
        content: resolve(__dirname, 'src/content/index.jsx')
      },
      output: {
        format: 'iife', // Immediately Invoked Function Expression
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  // Generate popup.html if missing
  closeBundle() {
    const popupPath = resolve(__dirname, 'dist/popup.html')
    if (!fs.existsSync(popupPath)) {
      fs.writeFileSync(popupPath, `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Popup</title>
  <script src="popup.js" type="module"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`)
    }
  }
})