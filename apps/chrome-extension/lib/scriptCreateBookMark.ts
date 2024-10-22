(function () {
  const ele = document.getElementById('extensions_bookmark_create');
  if (ele) {
    ele.remove();
  }
  const iframe = document.createElement('iframe');
  iframe.id = 'extensions_bookmark_create';
  iframe.style.border = `none`;
  iframe.style.position = `fixed`;
  iframe.style.top = `10px`;
  iframe.style.right = `10px`;
  iframe.style.width = `600px`;
  iframe.style.height = `480px`;
  iframe.style.zIndex = `2147483647`;
  iframe.style.boxShadow = `0 1px 6px 0 rgba(32,33,36,0.28)`;
  iframe.style.borderRadius = `4px`;
  iframe.src = chrome.runtime.getURL('/pages/bookmark-popup.html');
  // bing 不能直接插入 iframe
  const div = document.createElement('div');
  div.appendChild(iframe);
  document.body.appendChild(div);
})();
