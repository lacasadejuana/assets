export const filesTooltipData = ({ id_negocio, slug_name }) => ({
    id_negocio,
    slug_name,
    get campo() {
        return this.$store.campos_busqueda.find(this.slug_name) ?? { path: '' };
    },
    init() {
        //this.$refs.iframe
        this.src = `${location.origin}/lfm/${this.id_negocio}/${this.campo.path}`;
        this.$refs.iframe.src = this.src;
        this.updateCoords({});
        globalThis.filesTooltipInstance = this;
        this.$watch('mouseMoveEnabled', (newValue, oldValue) => {
            console.log('mouseMoveEnabled changed: ' + oldValue + ' to ' + newValue);
        });
        this.debouncedUpdateCoords = Alpine.debounce(this.updateCooords, 500);
        this.debouncedSizeChangeListener = Alpine.debounce(this.sizeChangedListener, 100);
        const { width: iframeWidth, height: iframeHeight } = this.iframeElement.getBoundingClientRect();
        this.iframeSize = {
            width: iframeWidth,
            height: iframeHeight
        };
        setTimeout(() => {
            this.resizeObserver = new ResizeObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.contentRect) {
                        this.debouncedSizeChangeListener(entry.contentRect);
                    }
                });
            });
            this.resizeObserver.observe(this.iframeElement);
        }, 500);
    },
    _pos: {
        width: 500,
        height: 485
    },
    get pos() {
        return {
            ...this._pos,
            width: this.iframeSize.width + 2,
            height: this.iframeSize.height,
            maxWidth: this._pos.innerWidth - this._pos.left,
            maxHeight: this._pos.innerHeight - (this._pos.top + 20),
        };
    },
    set pos(pos) {
        this._pos = {
            ...this._pos,
            ...pos,
        };
    },
    get iframeElement() {
        return this.$el.querySelector('iframe');
    },
    iframeSize: {
        width: 500,
        height: 485
    },
    sizeChangedListener(contentRect) {
        let { width, height } = contentRect;
        this.iframeSize = {
            width: Math.min(this.pos.maxWidth, width),
            height: Math.min(this.pos.maxHeight, height)
        };
        //this._pos.width = width //+ 40
        //this._pos.height = height + 40
        this.draggableElement.style.setProperty('width', this.pos.width + 'px', 'important');
        this.draggableElement.style.setProperty('height', this.pos.height + 'px', 'important');
        //this.draggableElement.style.height = this.pos.height + 'px'
        //this.draggableElement.style.minHeight = this.pos.height + 'px '
        this.debouncedUpdateCoords();
    },
    draggableMousedown(e) {
        this.updateCoords(e);
        this.pos = {
            initialX: e.clientX,
            initialY: e.clientY
        };
        this.iframeElement.style.resize = 'unset';
        this.mouseMoveEnabled = true;
    },
    mouseMoveEnabled: false,
    draggableMouseUp(e) {
        this.mouseMoveEnabled = false;
        this.updateCoords(e);
        console.log('MOUSE UP');
    },
    get draggableElement() {
        return this.$el.closest('.actions_dropdown');
    },
    disableMouseMove() {
        this.mouseMoveEnabled = false;
        this.iframeElement.style.resize = 'both';
    },
    draggableMouseMove(e) {
        if (!this.mouseMoveEnabled || !e.clientX || !e.clientY) {
            //console.log('invalid mouseMove')
            return;
        }
        let { clientX, clientY, translateX, translateY } = this.pos;
        // How far the mouse has been moved
        const dx = e.clientX - this.pos.initialX;
        const dy = e.clientY - this.pos.initialY;
        // Scroll the element
        const tX = Math.min(Math.max(this.pos.minTx, dx + translateX), this.pos.maxTx);
        const tY = Math.min(Math.max(this.pos.minTy, dy + translateY), this.pos.maxTy);
        //console.log({ deltaX: tX - translateX, deltaY: tY - translateY, mouseMoveEnabled: this.mouseMoveEnabled })
        this.translate = { x: tX, y: tY };
        this.draggableElement.style.transform = `translate(${tX}px, ${tY}px)`;
    },
    get negocio() {
        return this.$store.negocios.get(this.id_negocio);
    },
    async closeMe() {
        console.log('closeMe');
        this.$dispatch('closefilestooltip');
    },
    get tippyRoot() {
        return this.$el.closest("[data-tippy-root]");
    },
    fullscreenfilestooltip() {
        console.log('fullscreenfilestooltip');
        this.updateCoords();
        this.previous_pos = { ...this.pos, iframeSize: this.iframeSize };
        this.draggableElement.style.transform = 'unset';
        this.tippyRoot.classList.add('fullscreen_tooltip');
        this.updateCoords();
        this.draggableElement.style.transform = `translate(${this._pos.minTx}px, ${this._pos.minTy}px)`;
        //this.sizeChangedListener({ width: this._pos.innerWidth, height: this._pos.innerHeight })
        this.iframeElement.style.width = `${this._pos.innerWidth}px`;
        this.iframeElement.style.height = `${this._pos.innerHeight}px`;
    },
    closefullscreentooltip() {
        console.log('closefullscreentooltip');
        this.updateCoords();
        this._pos = this.previous_pos;
        this.tippyRoot.classList.remove('fullscreen_tooltip');
        this.draggableElement.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px)`;
        //this.sizeChangedListener({ width: this._pos.innerWidth, height: this._pos.innerHeight })
        this.iframeElement.style.width = `${Math.min(this.previous_pos.iframeSize.width, 550)}px`;
        this.iframeElement.style.height = `${Math.min(this.previous_pos.iframeSize.height, 500)}px`;
        this.updateCoords();
        this.previous_pos = { ...this.pos, iframeSize: this.iframeSize };
    },
    updateCoords(e) {
        var style = window.getComputedStyle(this.draggableElement);
        var matrix = new WebKitCSSMatrix(style.transform);
        const { x, y, width, height, top, left } = this.draggableElement.getBoundingClientRect();
        console.timerInfo('updateCoords');
        this.pos = {
            ...this.pos,
            x,
            y,
            translateX: matrix.m41,
            translateY: matrix.m42,
            left,
            top,
            width,
            height,
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            initialX: null,
            initialY: null,
        };
        if (e) {
            this.pos.initialX = e.clientX;
            this.pos.initialY = e.clientY;
        }
        if (this.pos.maxWidth) {
            this.iframeElement.style.maxWidth = this.pos.maxWidth + 'px';
        }
        if (this.pos.maxHeight) {
            this.iframeElement.style.maxHeight = this.pos.maxHeight + 'px';
        }
        this._pos.minTx = this.pos.translateX - 1 * x;
        this._pos.minTy = this.pos.translateY - 1 * y;
        this._pos.maxTy = this.pos.translateY + window.innerHeight - (y + height);
        this._pos.maxTx = this.pos.translateX + window.innerWidth - (x + width);
        if (false && e) {
            console.table([
                { name: 'position', x: x, y: y },
                { name: 'size', x: width, y: height },
                { name: 'window', x: window.innerWidth, y: window.innerHeight },
                { name: 'translate', x: matrix.m41, y: matrix.m42 },
                { name: 'maxTranslate', x: this.pos.maxTx, y: this.pos.maxTy },
                { name: 'minTranslate', x: this.pos.minTx, y: this.pos.minTy },
            ]);
        }
    },
    boundingClientRect: null,
    translate: { x: 0, y: 0 },
    getTranslate() {
        return this.translate;
    }
});
//# sourceMappingURL=files_tooltip_data.js.map