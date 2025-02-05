chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'click-ask-more-button') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.url.startsWith('https://metaso.cn')) {
      chrome.tabs.sendMessage(tab.id, { action: 'clickAskMoreButton' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
          return;
        }
        
        if (!response.success) {
          console.error('Failed to click ask more button:', response.error);
        }
      });
    }
  } else if (command === 'click-home-button') {
    // 获取当前标签页
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.url.startsWith('https://metaso.cn')) {
      // 发送消息给 content script
      chrome.tabs.sendMessage(tab.id, { action: 'clickHomeButton' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
          return;
        }
        
        if (!response.success) {
          console.error('Failed to click home button:', response.error);
        }
      });
    }
  }
});