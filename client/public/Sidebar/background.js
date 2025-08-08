chrome.runtime.onInstalled.addListener(() => {
  console.log("Gmail Sorter extension installed.");
});

function checkSecureUrl(url) {
  if (!url.startsWith('https://')) {
    throw new Error('Insecure connection: ' + url);
  }
}
