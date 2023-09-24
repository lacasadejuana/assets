/**
 * Was meant to display info abount selected columns via contextMenu (right-click )
 * @param id
 * @returns
 */
export const selectedFieldSlugs = (id, is_default) => ({
    is_default,
    get campo() {
        return this.active_filter.get_or_infer_columnas_actuales().find(c => c.id == id) || this.columnas_actuales.get(id) || this.campos_busqueda.get(id);
    },
    get active_filter() {
        return this.$store.active_filter;
    },
    get columnas_actuales() {
        return this.$store.columnas_actuales;
    },
    get campos_busqueda() {
        return this.$store.campos_busqueda;
    },
    preventDefault($event) {
        if (!$event.shiftKey) {
            $event.preventDefault();
        }
    },
    get is_visible() {
        return this.campo.visible;
    },
    get xtooltip() {
        const self = this;
        //console.info({ campo: this.campo, is_visible: this.campo.visible })
        //return false;
        //console.log({ event: this.lastEvent, id })
        return {
            appendTo: document.querySelector('#filtros_negocio_form'),
            content: () => document.querySelector('#item_tooltip').innerHTML.replace('id_campo', id),
            interactive: true,
            theme: 'light',
            followCursor: true,
            allowHTML: true,
            onHide(instance) {
                console.log('onHide', { instance, event: self.lastEvent });
                self.tooltipInstance = null;
            },
            onShow(instance) {
                console.log('onShow', { instance, event: self.lastEvent, });
                self.tooltipInstance = instance;
            },
        };
    },
    init() {
        //globalThis.columnSlug = globalThis.columnSlug || {}
        //globalThis.columnSlug[id] = this
    }
});
export default selectedFieldSlugs;
//# sourceMappingURL=selectedFieldSlugs.js.map