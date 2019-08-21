chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {
    if (changeInfo.url) { /* Wait for url to change */
      /* Send tab url to content script */
      chrome.tabs.sendMessage(tabId, {
        url: tab.url,
      });
    }
  },
);
