export const tableHeader = ({ slug_name, index }) => ({
    get inputWidth() {
        return this.colWidth || ((this.campo.input_type === 'select' || this.campo.input_type === 'text') ? '185' : '165');
    },
    get colWidth() {
        return this.campo.width;
    },
    get campo() {
        return this.$store.columnas_actuales.find(this.slug_name) || { slug_name };
    },
    get newColName() {
        let main = this.campo.name;
        if (this.campo && this.campo.name && this.campo.name.includes('(')) {
            let [main, notes] = this.campo.name.split('(');
            notes = '(' + notes;
            return `<span>${main}<small class="fs-09em block">${notes}</small></span>`;
        }
        return `<span>${main}</span>`;
    },
    slug_name: null,
    init() {
        this.slug_name = slug_name;
        if (index === 0)
            this.$el.classList.add('left-0');
        this.$el.classList.add(`slug_${this.campo.slug_name.replace(/\s/g, '_')}`);
        this.$el.classList.add(`cell_${this.campo.input_type.replace(/\s/g, '_')}`);
        if (index === 0)
            this.$el.classList.add('z-20');
        this.$watch('campo.visible', (newVisible, oldVisible) => {
            if (oldVisible === newVisible)
                return;
            if (!this.campo || this.campo.name === undefined) {
                console.warn('Campo no encontrado ' + this.slug_name);
                return;
            }
            this.$store.columnas_actuales.refreshInvisibles();
            console.info((newVisible ? 'Mostrando' : 'Ocultando') + ' columna ' + this.campo.name);
        });
    },
    contextMenuHtml: '',
    contextMenuShown: false,
    apagarColumna() {
        this.campo.visible = false;
        this.closeMenu();
    },
    closeMenu() {
        this.contextMenuShown = false;
        this.$store.negocios.contextMenuOpen = null;
    },
    openMenu($event) {
        if (!$event.shiftKey) {
            $event.preventDefault();
        }
        this.$store.negocios.contextMenuOpen?.closeMenu();
        this.contextMenuShown = true;
        this.$store.negocios.contextMenuOpen = this;
        //console.log({ contextMenuHtml: this.$refs.contextMenuHtml, contextMenuContainer: this.$refs.contextMenuContainer })
    },
    onmouseover() {
        let { slug_name, visible } = this.campo;
        console.log({ slug_name, visible, colName: this.colName, columna_name: this.campo.name });
    }
});
export default tableHeader;
//# sourceMappingURL=tableHeader.js.map