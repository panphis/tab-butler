(function () {
  const ele = document.getElementById('extensions_bookmark_create');
  if (ele) {
    ele.remove();
  }
  const iframe = document.createElement('iframe');
  iframe.id = 'extensions_bookmark_create';
  iframe.style =
    'border: none; position: fixed; top: 10px; right: 10px; width: 600px;' +
    'height: 480px; z-index: 2147483647; box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);';
  iframe.src = chrome.runtime.getURL('pages/bookmark-popup.html');
  document.body.appendChild(iframe);
})();
