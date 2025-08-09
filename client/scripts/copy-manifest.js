import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

// Find the built background file (with hash)
const assetsDir = path.join(distDir, 'assets')
const bgFile = fs.readdirSync(assetsDir).find(f => f.startsWith('background-') && f.endsWith('.js'))
if (!bgFile) {
  console.error('Error: background.js not found in dist/assets')
  process.exit(1)
}
// Copy and rename to dist/background.js
fs.copyFileSync(path.join(assetsDir, bgFile), path.join(distDir, 'background.js'))

// Copy popup.html
const popupHtmlSrc = path.join(distDir, 'src/popup/index.html')
const popupHtmlDestDir = path.join(distDir, 'popup')
const popupHtmlDest = path.join(popupHtmlDestDir, 'index.html')
if (!fs.existsSync(popupHtmlSrc)) {
  console.error('Error: popup.html not found in dist/src/popup')
  process.exit(1)
}
fs.mkdirSync(popupHtmlDestDir, { recursive: true })
fs.copyFileSync(popupHtmlSrc, popupHtmlDest)

// Copy manifest
fs.copyFileSync(
  path.resolve(__dirname, '../public/manifest.json'),
  path.join(distDir, 'manifest.json')
)

// Copy icons
fs.cpSync(
  path.resolve(__dirname, '../public/icons'),
  path.join(distDir, 'icons'),
  { recursive: true }
)

// Find the built content script file (with hash)
const contentFile = fs.readdirSync(assetsDir).find(f => f.startsWith('content-') && f.endsWith('.js'))
if (!contentFile) {
  console.error('Error: content.js not found in dist/assets')
  process.exit(1)
}
// Copy and rename to dist/content.js
fs.copyFileSync(path.join(assetsDir, contentFile), path.join(distDir, 'content.js'))

// Find the built content CSS file (with hash)
const contentCssFile = fs.readdirSync(assetsDir).find(f => f.startsWith('content-') && f.endsWith('.css'));
if (contentCssFile) {
  fs.copyFileSync(path.join(assetsDir, contentCssFile), path.join(distDir, 'content.css'));
}