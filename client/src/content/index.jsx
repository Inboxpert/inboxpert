import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css';

function initExtension() {
  const rootContainer = document.createElement('div')
  rootContainer.id = 'ai-email-sorter-root'
  document.body.appendChild(rootContainer)
  
  const root = ReactDOM.createRoot(rootContainer)
  root.render(<App />)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExtension)
} else {
  initExtension()
}