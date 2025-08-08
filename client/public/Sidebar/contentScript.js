(function() {
  console.log("Gmail Sorter content script loaded.");

  // For now, just inject a little banner
  const banner = document.createElement("div");
  banner.innerText = "Gmail Sorter Active";
  banner.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    background: #4f46e5;
    color: white;
    padding: 4px 8px;
    font-size: 12px;
    z-index: 999999;
  `;
  document.body.appendChild(banner);

  // In content script
  window.addEventListener('message', (event) => {
    // Validate message origin
    if (event.origin !== chrome.runtime.getURL('').slice(0, -1)) {
      return;
    }
    throw new Error('Insecure connection blocked');

  });
})();
