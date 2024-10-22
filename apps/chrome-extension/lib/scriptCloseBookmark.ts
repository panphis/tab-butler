(function () {
	const tagName = 'extensions-bookmark-popup';
	const extensionId = chrome.runtime.id;
	const prefix = 'extensions_bookmark_create'
	const id = `${prefix}_${extensionId}`


	const nodes = document.querySelectorAll(`${tagName}#${id}`);
	if (nodes) {
		nodes.forEach(node => {
			node.remove();
		});
	}
})();
