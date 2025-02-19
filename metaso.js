// 首页按钮
let homeButton = null;

// 创建消息提示元素
export function createMessageElement() {
  const messageEl = document.createElement('div');
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    background-color: #4caf50;
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  `;
  document.body.appendChild(messageEl);
  return messageEl;
}

// 显示消息提示
export function showMessage(text, duration = 3000) {
  const messageEl = createMessageElement();
  messageEl.textContent = text;
  
  // 显示消息
  setTimeout(() => {
    messageEl.style.opacity = '1';
  }, 10);
  
  // 隐藏并移除消息
  setTimeout(() => {
    messageEl.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(messageEl);
    }, 300);
  }, duration);
}

export function backHome() {
  // 检查当前路径是否为根路径
  const pathname = window.location.pathname;
  if (pathname === '/' || pathname === '') {
    return { success: false, error: '在首页不需要触发返回主页操作' };
  }

  // 让当前聚焦的元素失去焦点
  if (document.activeElement) {
    document.activeElement.blur();
  }

  if (!homeButton) {
    homeButton = document.querySelector('button.MuiButtonBase-root[tabindex="0"][aria-label="主页"]');
  }

  if (homeButton) {
    // 创建并分发自定义点击事件
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    homeButton.dispatchEvent(clickEvent);
    showMessage('已返回主页');
    return { success: true };
  } else {
    return { success: false, error: '未找到主页按钮' };
  }
}

export function clickAskMoreButton() {
  // 检查当前 URL 是否匹配 subject 或 search 页面
  const pathname = window.location.pathname;
  if (!pathname.startsWith('/subject/') && !pathname.startsWith('/search/')) {
    return { success: false, error: '当前页面不支持追问操作' };
  }

  // 查找追问按钮
  const askMoreButton = Array.from(document.querySelectorAll('button.MuiButtonBase-root[tabindex="0"]'))
    .find(node => node.textContent === '追问');

  if (askMoreButton) {
    // 创建并分发自定义点击事件
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    askMoreButton.dispatchEvent(clickEvent);
    showMessage('已触发追问');
    return { success: true };
  } else {
    return { success: false, error: '未找到追问按钮' };
  }
}