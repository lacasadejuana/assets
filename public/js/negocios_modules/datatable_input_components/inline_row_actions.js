export const inlineRowActions = ({ auto_save = false, id_negocio }) => ({
    row_actions_show: true,
    id_negocio,
    slug_name: 'nombre',
    get negocio() {
        return this.$store.negocios.get(id_negocio);
    },
    get field() {
        //@ts-ignore
        return this.$store.campos_busqueda.find(this.slug_name);
    },
    instance: null,
    setInstance(instance) {
        try {
            this.instance = instance;
            console.log({ setInstance: this.instance });
        }
        catch (e) {
            console.warn(e);
        }
    },
    hideinstance() {
        console.log({ 'hideinstance': this.instance });
        if (this.instance)
            this.instance.hide();
    },
    keyUpEscape() {
        console.log({ 'keyUpEscape': this.instance });
        if (this.instance)
            this.instance.hide();
    },
    tooltip: null,
    init() {
        const hideOnEsc = {
            name: 'hideOnEsc',
            defaultValue: true,
            fn({ hide }) {
                console.log('hideOnEsc');
                function onKeyDown(event) {
                    if (event.keyCode === 27) {
                        hide();
                    }
                }
                return {
                    onShow() {
                        document.addEventListener('keydown', onKeyDown);
                    },
                    onHide() {
                        document.removeEventListener('keydown', onKeyDown);
                    },
                };
            },
        };
        const self = this;
        this.tooltip = {
            trigger: 'click',
            content: () => document.querySelector('#negocios_popover').innerHTML
                .replace('negocio_id', (this.negocio || {}).id)
                .replace('rel_negocio', (this.negocio || {}).id),
            maxWidth: '40rem',
            allowHTML: true,
            appendTo: document.querySelector('.negocios_full_container'),
            theme: 'translucent',
            placement: 'right',
            hideOnEsc: true,
            plugins: [hideOnEsc],
            onHide(instance) {
                self.open = false;
            },
            onShow(instance) {
                self.setInstance(instance);
                self.instance = instance;
            },
            interactive: true
        };
    }
});
//# sourceMappingURL=inline_row_actions.js.map