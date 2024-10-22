



(function () {



  const tagName = 'extensions-bookmark-popup';
  const id = 'extensions_bookmark_create'
  class PopupElement extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });

      const iframe = document.createElement('iframe');
      iframe.style.border = `none`;
      iframe.style.width = `600px`;
      iframe.style.height = `480px`;
      iframe.src = chrome.runtime.getURL('/pages/bookmark-popup.html');
      const wrapper = document.createElement('iframe');
      wrapper.style.boxShadow = `0 1px 6px 0 rgba(32,33,36,0.28)`;
      wrapper.style.borderRadius = `4px`;
      wrapper.appendChild(iframe);
      shadow.appendChild(wrapper);
    }
    adoptedCallback() { }
    attributeChangedCallback() { }
    disconnectedCallback() { }
  }



  if (!window.customElements?.get(tagName)) {
    console.dir(window)
    console.dir(globalThis)
    console.dir(globalThis.customElements)
    const res = window.customElements?.get(tagName)
    console.log(res)
    console.log(document.readyState)
    window.customElements?.define(tagName, PopupElement);
  }


  const nodes = document.querySelectorAll(`${tagName}#${id}`);
  if (nodes) {
    nodes.forEach(node => {
      node.remove();
    });
  }
  const popup = document.createElement(tagName);
  popup.id = id;
  popup.style.position = `fixed`;
  popup.style.top = `10px`;
  popup.style.right = `10px`;
  popup.style.zIndex = `2147483647`;
  popup.style.zIndex = `2147483647`;
  popup.style.boxShadow = `0 1px 6px 0 rgba(32,33,36,0.28)`;
  popup.style.borderRadius = `4px`;

  document.body.appendChild(popup);

})();
