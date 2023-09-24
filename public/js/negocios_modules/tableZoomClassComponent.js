export const tableZoomClassComponent = () => ({
    /**
    * @returns {string} a.k.a zoom1, zoom2, zoom3, zoom4, zoom5
    */
    get tableZoomClass() {
        return 'tablezoom' + String(Math.min(14, Math.max(7, this.zoom_class))).replace(/^(\d{1})$/, '0$1');
    },
    get hasDebugCookie() {
        return globalThis.readCookie('debug_lcdj') || globalThis.readCookie('zoom_class_lcdj');
    },
    init() {
        console.log('current zoom_class', this.tableZoomClass);
        this.$watch('tableZoomClass', (newVal, oldVal) => {
            document.querySelector('#negocios_full').classList.remove(oldVal);
            document.querySelector('#negocios_full').classList.add(newVal);
            this.$dispatch('zoom', newVal);
            console.log('new  zoom_class', newVal);
            if (this.hasDebugCookie) {
                globalThis.setCookie('zoom_class_lcdj', this.zoom_class, 365);
            }
        });
        if (this.hasDebugCookie && globalThis.readCookie('zoom_class_lcdj')) {
            this.zoom_class = globalThis.readCookie('zoom_class_lcdj');
        }
        globalThis.zoomClassInstance = this;
    },
    zoom_class: 10,
    tooltipInstance: null,
    get multiSelectTooltipOptions() {
        const self = this;
        return {
            trigger: 'click',
            maxWidth: '22rem',
            allowHTML: true,
            theme: 'light-border',
            interactive: true,
            placement: 'bottom',
            //  appendTo: this.$el,
            onShow(instance) {
                self.tooltipInstance = instance;
            },
            content: () => document.querySelector('#negocio_multiselect_actions').innerHTML
        };
    }
});
export default tableZoomClassComponent;
//# sourceMappingURL=tableZoomClassComponent.js.map