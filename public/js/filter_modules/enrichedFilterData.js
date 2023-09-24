/// <reference types="alpinejs" />
import { VInputType, VRenderType, VSearchType, search_types } from "../components/alpine_definitions";
/**
 *
 * This components handles the dom interaction for exactly one entry of the condition list
 * (The entry itself is an instance of EnrichedFilter whest most of the logic is encapsulated)
 *
 * @param filtro
 * @returns
 */
export const enrichedFilterData = (filtro) => ({
    search_types,
    name: 'enrichedFilterData',
    index: null,
    get id() {
        return filtro.id;
    },
    enrichedFilterClass: null,
    init() {
        this.index = filtro.index;
        //@ts-ignore
        this.declareWatchers();
    },
    get VRenderType() {
        return VRenderType;
    },
    declareWatchers() {
        this.$watch('shouldRender', (newValue, oldValue) => {
            if (JSON.stringify(newValue) === JSON.stringify(oldValue))
                return;
            console.zwarn(`Filtro ${this.filtro.id} changed shouldRender from "${oldValue}" to "${newValue}" `);
            if ([
                search_types.IS_NULL,
                search_types.IS_NOT_NULL
            ].includes(String(this.tipo_busqueda))) {
                this.valor_busqueda = undefined;
            }
        });
        this.$watch('filtro.campo_busqueda', (newCampo, oldCampo) => {
            this.filtro.valor_busqueda = '';
            if (JSON.stringify(newCampo) === JSON.stringify(oldCampo))
                return;
            console.zwarn(`Filtro ${this.filtro.id} changed campo_busqueda from "${oldCampo}" to "${newCampo}" `);
        });
        this.$watch('filtro.tipo_busqueda', (newTipo, oldTipo) => {
            if (JSON.stringify(newTipo) === JSON.stringify(oldTipo))
                return;
            console.zwarn(`Filtro ${this.filtro.id} changed tipo_busqueda from "${oldTipo}" to "${this.tipo}" renderDateRange? ${this.renderDateRange} `);
            if ([
                search_types.IS_NULL,
                search_types.IS_NOT_NULL
            ].includes(String(this.tipo_busqueda))) {
                this.valor_busqueda = undefined;
            }
        });
        this.$watch('filtro.index', (index, oldValue) => {
            if (JSON.stringify(index) === JSON.stringify(oldValue))
                return;
            console.zwarn(`Filtro ${this.filtro.id} changed index from "${oldValue}" to "${index}" `);
        });
    },
    set filtro(newFiltro) {
        let { tipo_busqueda, campo_busqueda, valor_busqueda, conector, index, id } = newFiltro;
        //@ts-ignore
        //  console.zwarn('tried to set new filtro', { newIndex: index, currentIndex: this.index })
        this.index = index;
    },
    get filtro() {
        return this.$store.active_filter.filterMap.get(filtro.id) || {
            campo_busqueda: '',
            tipo_busqueda: VSearchType.IS_NULL,
            valor_busqueda: '',
            id: this.id,
            index: this.index,
            conector: 'AND'
        };
    },
    toJSON() {
        return this.filtroEnriquecido;
    },
    get filtroEnriquecido() {
        return this;
    },
    get campo_busqueda() {
        //@ts-ignore
        return this.filtro.campo_busqueda;
    },
    set campo_busqueda(value) {
        //@ts-ignore
        this.filtro.campo_busqueda = value;
    },
    get conector() {
        //@ts-ignore
        return this.filtro.conector;
    },
    set conector(value) {
        //@ts-ignore
        this.filtro.conector = value;
    },
    get tipo_busqueda() {
        //@ts-ignore
        return this.filtro.tipo_busqueda;
    },
    set tipo_busqueda(value) {
        //@ts-ignore
        this.filtro.tipo_busqueda = value;
    },
    get valor_busqueda() {
        //@ts-ignore
        return this.filtro.valor_busqueda;
    },
    set valor_busqueda(value) {
        //@ts-ignore
        this.filtro.valor_busqueda = value;
    },
    get slug_name() {
        return this.campo_busqueda.replace(/^([^,]+).*$/, '$1');
    },
    get id_input_type() {
        return (this.campo || { id_input_type: VInputType.INPUT_TEXT }).id_input_type;
    },
    get id_rol_negocio() {
        return (this.campo || {}).id_rol_negocio;
    },
    get slug() {
        return this.campo_busqueda.replace(/^([^,]+).*$/, '$1');
    },
    get campo() {
        return (this.filtro && this.campo_busqueda)
            ? this.$store.campos_busqueda.find(this.filtro.campo_busqueda)
            : { id_input_type: VInputType.INPUT_TEXT };
    },
    get tipo() {
        // if (this.tipo_busqueda === '=') return 'Igual a'
        return this.$store.tipos_busqueda.get(this.tipo_busqueda);
    },
    get properties() {
        return (this.campo && Array.isArray(this.campo.properties) ? this.campo.properties : []);
    },
    get items() {
        //properties.length > 0
        return (Array.isArray(this.valor_busqueda) ? this.valor_busqueda : [this.valor_busqueda]).map(String); //.split(',')
    },
    get operadores_busqueda() {
        //@ts-ignore
        return this.$store.tipos_busqueda.ready ? {
            ...(this.$store.tipos_busqueda.operadores_para((this.campo || { id_input_type: 0 }))
                || {
                    [VSearchType.IS_NULL]: 'Vacío/Nulo', [VSearchType.IS_NOT_NULL]: 'No es vacío/Nulo'
                })
        } : {
            [VSearchType.IS_NULL]: 'Vacío/Nulo', [VSearchType.IS_NOT_NULL]: 'No es vacío/Nulo'
        };
    },
    get templateId() {
        if (this.renderButtonGroup)
            return '#render_button_group';
        if (this.renderContacto)
            return '#render_contacto';
        if (this.renderSelect)
            return '#render_select';
        if (this.renderDateRange)
            return '#render_date_range';
        if (this.renderSingleDate)
            return '#render_date';
        if (this.renderNull)
            return '#render_null';
        if (this.renderNumber)
            return '#render_number';
        if (this.renderText)
            return '#render_text';
        return '#render_text';
    },
    get templateContent() {
        return document.querySelector(this.templateId).innerHTML;
    },
    get shouldRender() {
        return this.filtro.shouldRender;
    },
    get renderSelect() {
        return this.filtro.renderSelect;
    },
    get renderButtonGroup() {
        return this.filtro.renderButtonGroup;
    },
    get renderSingleDate() {
        return this.filtro.renderSingleDate;
    },
    get renderDateRange() {
        return this.filtro.renderDateRange;
    },
    get renderNumber() {
        return this.filtro.renderNumber;
    },
    get renderNull() {
        return this.filtro.renderNull;
    },
    get renderContacto() {
        return this.filtro.renderContacto;
    },
    get renderText() {
        return this.filtro.renderText;
    },
    get options() {
        return this.campo ? this.campo.options : [];
    }
});
export default enrichedFilterData;
//# sourceMappingURL=enrichedFilterData.js.map