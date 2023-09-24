import TomSelect from 'tom-select';
export const filterRenderContactControl = (filtro) => ({
    tomselect: null,
    tables: false,
    get filtro() {
        return filtro;
    },
    get campo() {
        //@ts-ignore
        return this.$store.campos_busqueda.find(this.filtro.campo_busqueda);
    },
    get options() {
        return this.$store.campos_busqueda.computeOptions(this.filtro.campo_busqueda);
    },
    stringifiedOptions(options) {
        //@ts-ignore
        return Object.values(options || this.options).map(e => e.nombre_completo || e.name).sort((a, b) => {
            return a.localeCompare(b);
        }).join(',');
    },
    init() {
        console.log({ filtro });
        this.initTomSelect(this.$el);
        this.$watch('options', (newOptions, oldOptions) => {
            //@ts-ignore
            let newOptions_string = this.stringifiedOptions(newOptions);
            //@ts-ignore
            let oldOptions_string = this.stringifiedOptions(oldOptions);
            if (newOptions_string === oldOptions_string)
                return;
            //@ts-ignore
            console.zinfo({ newOptions });
            if (this.tables) {
                console.table({
                    //@ts-ignore
                    newOptions_string,
                    //@ts-ignore
                    oldOptions_string
                });
            }
            this.tomselect.clear();
            this.tomselect.clearOptions();
            this.tomselect.addOptions(newOptions);
        });
    },
    computeTSettings(extra) {
        const tsettings = {
            create: false,
            hidePlaceholder: true,
            items: (Array.isArray(filtro.valor_busqueda) ? filtro.valor_busqueda : [filtro.valor_busqueda]).map(String),
            labelField: 'nombre_completo',
            maxItems: null,
            options: this.options,
            placeholder: `Contactos`,
            plugins: ['remove_button'],
            searchField: ['nombre_completo', 'email'],
            valueField: 'id',
            onChange: (value, item, event) => {
                console.log('onChange', value, item, event);
                filtro.valor_busqueda = value;
            }
        };
        return { ...tsettings, ...extra };
    },
    initTomSelect($el) {
        if (this.tomselect)
            this.tomSelect.destroy();
        const tsettings = this.computeTSettings({
            render: {
                option: function (data) {
                    return `<div class='d-flex align-items-center'  role='option'>
                             <span class='flex-grow-1'>
                            ${data.nombre_completo}
                            <span class='label block text-gray-500 fs-08rem'>${data.email}</span>
                            </span>
                        </div>`;
                }
            }
        });
        this.tomselect = new TomSelect($el, tsettings);
    }
});
export default filterRenderContactControl;
//# sourceMappingURL=filterRenderContactControl.js.map