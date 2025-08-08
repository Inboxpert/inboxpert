// Inject sidebar into Gmail UI
const sidebarContainer = document.createElement('div');
sidebarContainer.id = 'inboxpert-sidebar';
sidebarContainer.style.position = 'fixed';
sidebarContainer.style.top = '0';
sidebarContainer.style.right = '0';
sidebarContainer.style.width = '300px';
sidebarContainer.style.height = '100vh';
sidebarContainer.style.zIndex = '1000';
sidebarContainer.style.backgroundColor = '#f6f8fc';

// Create iframe for React sidebar
const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('sidebar/sidebar.html');
iframe.style.width = '100%';
iframe.style.height = '100%';
iframe.style.border = 'none';
sidebarContainer.appendChild(iframe);

// Add to Gmail UI
document.body.appendChild(sidebarContainer);

// Listen for category selection events
window.addEventListener('message', (event) => {
  if (event.data.type === 'CATEGORY_SELECTED') {
    // Trigger Gmail search
    const searchInput = document.querySelector('input[aria-label="Search mail"]');
    if (searchInput) {
      searchInput.value = `category:"${event.data.category}"`;
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true
      });
      searchInput.dispatchEvent(enterEvent);
    }
  }
});