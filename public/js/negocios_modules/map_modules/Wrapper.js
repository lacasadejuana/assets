export class Wrapper {
    constructor(className) {
        this.wrapper = document.createElement('div');
        this.wrapper.className = className;
    }
    addClass(className) {
        this.wrapper.classList.add(className);
        return this;
    }
    addStyle(property, value) {
        this.wrapper.style[property] = value;
        return this;
    }
    setInnerHTML(html) {
        this.wrapper.innerHTML = html;
        return this;
    }
    appendChild(child) {
        this.wrapper.appendChild(child);
        return this;
    }
    appendTo(parent) {
        parent.appendChild(this.wrapper);
        return this;
    }
    setTextContent(text) {
        this.wrapper.textContent = text;
        return this;
    }
    prependTo(parent) {
        parent.prepend(this.wrapper);
        return this;
    }
    append(child) {
        this.wrapper.appendChild(child);
        return this;
    }
    get div() {
        return this.wrapper;
    }
}
//# sourceMappingURL=Wrapper.js.map