import TomSelect from 'tom-select';
import getFiltroAndCampo from '../decorators/getFiltroAndCampo';
export const filterRenderSelectControl = (filtro) => ({
    tables: false,
    ...getFiltroAndCampo(filtro),
    get options() {
        //@ts-ignore
        return this.$store.campos_busqueda.computeOptions(this.filtro.campo_busqueda).slice(0).sort((a, b) => a.id - b.id);
    },
    tomselect: null,
    get valor_busqueda() {
        return filtro.valor_busqueda;
    },
    init() {
        this.initTomSelect(this.$el);
        this.$watch('valor_busqueda', (newOptions, oldOptions) => {
            console.log({ changed: 'valor_busqueda', oldOptions, newOptions });
            if (this.tomselect)
                this.tomselect.addItems(newOptions);
        });
        this.$watch('options', (newOptions, oldOptions) => {
            //@ts-ignore
            let newOptions_string = this.stringifiedOptions(newOptions);
            //@ts-ignore
            let oldOptions_string = this.stringifiedOptions(oldOptions);
            if (newOptions_string === oldOptions_string)
                return;
            //@ts-ignore
            this.tomselect.clear();
            this.tomselect.clearOptions();
            this.tomselect.addOptions(newOptions.sort((a, b) => a.id - b.id));
        });
        this.filtro.selectControl = this;
    },
    stringifiedOptions(options) {
        //@ts-ignore
        return Object.values(options || this.options).slice(0).map(e => e.nombre_completo || e.value).sort((a, b) => {
            return String(a).localeCompare(String(b));
        }).join(',');
    },
    initTomSelect($el) {
        if (this.tomselect)
            this.tomselect.destroy();
        let plugins = ['remove_button'];
        if (this.options.length > 10)
            plugins = plugins.concat(['dropdown_input', 'checkbox_options']);
        let tsettings = {
            create: false,
            hidePlaceholder: true,
            items: (Array.isArray(filtro.valor_busqueda) ? filtro.valor_busqueda : [filtro.valor_busqueda]).map(String),
            labelField: 'name',
            maxItems: null,
            options: this.options.sort((a, b) => a.id - b.id),
            sortField: [{ field: '$order' }],
            lockOptgroupOrder: true,
            placeholder: `Valor búsqueda`,
            plugins,
            valueField: 'value',
            searchField: ['name', 'label', 'value'],
            onChange: (value, item, event) => {
                console.log('onChange', value, item, event);
                filtro.valor_busqueda = value;
            },
        };
        if (['codigo_interno', 'id'].includes(this.campo.slug_name)) {
            tsettings = {
                ...tsettings,
                render: {
                    option: function (data) {
                        let [value, name] = data.name.split('|');
                        return `<div class='flex align-items-center'  role='option'>
                            <span style="font-family:monospace;font-size:0.95em;padding-top:0.05em" class='flex-shrink-1 mr-2'>[${value}]</span>
                             <span class='flex-grow-1'>${name}</span>
                        </div>`;
                    },
                    item: function (data) {
                        let [value, name] = data.name.split('|');
                        return `<span class="bg-gray-100 border">[${value}] ${name}</span>`;
                    }
                }
            };
        }
        this.tomselect = new TomSelect($el, tsettings);
    }
});
//# sourceMappingURL=filterRenderSelectControl.js.map