export default function (Alpine) {
    class ComponentWrapper extends HTMLElement {
        connectedCallback() {
            let shadow = this.attachShadow({ mode: 'open' });
            //@ts-ignore
            if (this.attributes.template) {
                //@ts-ignore
                let template_value = this.attributes.template.value;
                let template = document.getElementById(template_value);
                console.info({ template_value, template_html: template.innerHTML });
                let component = new DOMParser().parseFromString(template.innerHTML, 'text/html').body.firstChild;
                shadow.appendChild(component);
                document.addEventListener('alpine:initialized', () => Alpine.initTree(shadow));
            }
            //@ts-ignore
            if (this.attributes.url) {
                //@ts-ignore
                fetch(this.attributes.url.value)
                    .then((response) => response.text())
                    .then((template) => {
                    let component = new DOMParser().parseFromString(template, 'text/html').body.firstChild;
                    shadow.appendChild(component);
                    Alpine.initTree(shadow);
                });
            }
        }
    }
    if (window.customElements.get('z-component-wrapper'))
        return;
    customElements.define('z-component-wrapper', ComponentWrapper);
    Alpine.directive('component', () => {
        new ComponentWrapper();
    });
}
//# sourceMappingURL=alpine-component.js.map