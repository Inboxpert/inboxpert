const fs = require('fs')
const path = require('path')

// Copy manifest.json to dist
fs.copyFileSync(
  path.join(__dirname, '../public/manifest.json'),
  path.join(__dirname, '../dist/manifest.json')
)

// Copy assets to dist
const assets = ['icons']
assets.forEach(asset => {
  fs.cpSync(
    path.join(__dirname, `../public/${asset}`),
    path.join(__dirname, `../dist/${asset}`),
    { recursive: true }
  )
})