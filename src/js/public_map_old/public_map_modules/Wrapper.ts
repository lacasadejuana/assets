export class Wrapper {
    wrapper: HTMLDivElement;
    constructor(className) {
        this.wrapper = document.createElement('div');
        this.wrapper.className = className;
    }
    addClass(className: string) {
        this.wrapper.classList.add(className);
        return this;
    }
    addStyle(property, value) {
        this.wrapper.style[property] = value;
        return this;
    }
    setInnerHTML(html: string) {
        this.wrapper.innerHTML = html;
        return this;
    }
    appendChild(child: HTMLElement) {
        this.wrapper.appendChild(child);
        return this;
    }
    appendTo(parent: HTMLElement) {
        parent.appendChild(this.wrapper);
        return this;
    }
    setTextContent(text: string) {
        this.wrapper.textContent = text;
        return this;
    }
    prependTo(parent: HTMLElement) {
        parent.prepend(this.wrapper);
        return this;
    }
    append(child: HTMLElement) {
        this.wrapper.appendChild(child);
        return this;
    }
    get div() {
        return this.wrapper;
    }

}
