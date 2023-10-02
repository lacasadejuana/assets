class EmbeddedWebview extends HTMLElement {
  connectedCallback() {
    fetch(this.getAttribute('src'))
      .then(response => response.text())
      .then(html => {
        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.innerHTML = html;
      });
  }
}

window.customElements.define(
  'embedded-webview',
  EmbeddedWebview
);