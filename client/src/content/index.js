import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Main entry point for content script
function initExtension() {
  // Create root container for our UI
  const rootContainer = document.createElement('div');
  rootContainer.id = 'ai-email-sorter-root';
  document.body.appendChild(rootContainer);
  
  // Render React app
  const root = ReactDOM.createRoot(rootContainer);
  root.render(<App />);
  
  console.log("AI Email Sorter content script loaded");
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExtension);
} else {
  initExtension();
}