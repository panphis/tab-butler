(function () {
  var tagName = 'extensions-bookmark-popup';
  var id = 'extensions_bookmark_create'
  const nodes = document.querySelectorAll(`${tagName}#${id}`);
  if (nodes) {
    nodes.forEach(node => {
      node.remove();
    });
  }
})();
