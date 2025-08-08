// Background service worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCategories') {
    // Get user token from storage
    chrome.storage.local.get(['authToken'], async (result) => {
      if (!result.authToken) {
        sendResponse({ success: false, error: 'Not authenticated' });
        return;
      }

      try {
        // Fetch categories from backend
        const response = await fetch('https://your-backend.com/api/categories', {
          headers: {
            'Authorization': `Bearer ${result.authToken}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          sendResponse({ success: true, categories: data });
        } else {
          sendResponse({ success: false, error: 'Failed to fetch categories' });
        }
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    });
    return true; // Indicates async response
  }
});

// Handle authentication
chrome.identity.getAuthToken({ interactive: true }, (token) => {
  if (token) {
    chrome.storage.local.set({ authToken: token });
  }
});