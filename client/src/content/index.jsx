import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

function injectUI() {
  // Create container for our UI
  const container = document.createElement('div');
  container.id = 'inboxpert-root';
  container.style.position = 'fixed';
  container.style.top = '20px';
  container.style.right = '20px';
  container.style.zIndex = '9999';
  
  // Add to Gmail's interface
  document.body.appendChild(container);
  
  // Render React app
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}

// Wait for Gmail to load
if (document.location.href.includes('mail.google.com')) {
  const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector('[role="navigation"]')) {
      injectUI();
      obs.disconnect(); // Stop observing once injected
    }
  });
  
  observer.observe(document, {
    childList: true,
    subtree: true
  });
}