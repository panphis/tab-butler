



(function () {

	const tagName = 'extensions-bookmark-popup';
	const src = chrome.runtime.getURL('/pages/bookmark-popup.html')
	const extensionId = chrome.runtime.id;
	const prefix = 'extensions_bookmark_create'
	const id = `${prefix}_${extensionId}`


	const nodes = document.querySelectorAll(`${tagName}#${id}`);
	if (nodes) {
		nodes.forEach(node => {
			node.remove();
		});
	}
	const popup = document.createElement(tagName);
	popup.id = id;
	popup.style.position = `fixed`;
	popup.style.display = `block`;
	popup.style.top = `10px`;
	popup.style.right = `10px`;
	popup.style.zIndex = `2147483647`;
	popup.style.zIndex = `2147483647`;
	popup.style.boxShadow = `0 1px 6px 0 rgba(32,33,36,0.28)`;
	popup.style.borderRadius = `4px`;


	const iframe = document.createElement('iframe');
	iframe.style.border = `none`;
	iframe.style.width = `600px`;
	iframe.style.height = `480px`;
	iframe.src = src;
	popup.appendChild(iframe);
	document.body.appendChild(popup);

})();
