/**
 * Was meant to display info abount selected columns via contextMenu (right-click )
 * @param id
 * @returns
 */
export const itemTooltipData = (id) => ({
    get campo() {
        return this.columnas_actuales.get(id) || this.campos_busqueda.get(id);
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
    get columna_actual() {
        return this.active_filter.columnas_actuales.find(c => c.id == this.campo.id) || {};
    },
    get is_visible() {
        let visible = this.columna_actual.visible;
        return visible ?? this.campo.visible;
    },
    init() {
        console.log({ is_visible: this.is_visible, columna_actual: this.columna_actual, id: this.campo.id, columnas_actuales: this.$store.active_filter.columnas_actuales });
        globalThis.itemTooltipDataInstance = this;
    },
    toggle() {
        this.campo.visible = !this.campo.visible;
        console.log({ columna_actual: this.columna_actual, id: this.campo.id });
        this.columna_actual.visible = this.campo.visible;
    }
});
export default itemTooltipData;
//# sourceMappingURL=itemTooltipData.js.map