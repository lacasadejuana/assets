import { VInputType, VRenderType, VSearchType, search_types } from "@lacasadejuana/types";
import { isArray } from 'lodash';
export class EnrichedFilter {
    constructor(filtro) {
        this.filter_id = String(filtro.id);
        this._filtro = filtro;
        this._campo_busqueda = filtro.campo_busqueda;
        this._tipo_busqueda = filtro.tipo_busqueda;
        this._conector = filtro.conector;
        this._valor_busqueda = filtro.valor_busqueda;
        this.disabled = filtro.disabled;
        this.index = filtro.index;
        this.$store.active_filter = Alpine.store('active_filter');
        this.$store.tipos_busqueda = Alpine.store('tipos_busqueda');
    }
    get id() {
        return this.filter_id;
    }
    get parent_id() {
        return Number(this.$store.active_filter.id);
    }
    get conector() {
        return this._conector || this._filtro.conector;
    }
    set conector(conector) {
        this._conector = conector;
        this._filtro.conector = conector;
    }
    get valor_busqueda() {
        return this._valor_busqueda || this._filtro.valor_busqueda;
    }
    set valor_busqueda(valor_busqueda) {
        this._valor_busqueda = valor_busqueda;
        this._filtro.valor_busqueda = valor_busqueda;
    }
    get '$store'() {
        return {
            campos_busqueda: Alpine.store('campos_busqueda'),
            negocios: Alpine.store('negocios'),
            columnas_actuales: Alpine.store('columnas_actuales'),
            active_filter: Alpine.store('active_filter'),
            tipos_busqueda: Alpine.store('tipos_busqueda'),
        };
    }
    get campo_busqueda() {
        return this._campo_busqueda;
    }
    set campo_busqueda(newCampo) {
        if (this._campo_busqueda !== newCampo) {
            this._campo_busqueda = newCampo;
            console.colorInfo('#00C', 'EnrichedFilter', { 'setting new campo ': newCampo, shouldRender: this.shouldRender });
            this.valor_busqueda = '';
            this.tipo_busqueda = VSearchType.IS_NULL;
        }
    }
    get tipo_busqueda() {
        return this._tipo_busqueda;
    }
    set tipo_busqueda(newType) {
        if (this._tipo_busqueda === newType)
            return;
        this._tipo_busqueda = newType;
        console.colorInfo('#00C', 'EnrichedFilter', { 'setting new tipo_busqueda ': newType, shouldRender: this.shouldRender, valor_busqueda: this.valor_busqueda });
        if (!isArray(this.valor_busqueda))
            this.valor_busqueda = [];
    }
    get filtro() {
        return this;
    }
    get slug_name() {
        return (this.campo_busqueda || '').replace(/^([^,]+).*$/, '$1') || this.campo_busqueda.split(',')[0];
    }
    get id_input_type() {
        return (this.campo || { id_input_type: VInputType.INPUT_TEXT }).id_input_type;
    }
    get id_rol_negocio() {
        return (this.campo || { id_rol_negocio: null }).id_rol_negocio;
    }
    get slug() {
        return this.slug_name;
    }
    get attr_type() {
        return this.campo ? this.campo.attr_type : (this.campo_busqueda.split(',')[1] ?? 'negocio');
    }
    get campo() {
        return (this.filtro && this.campo_busqueda)
            ? this.$store.campos_busqueda.find(this.campo_busqueda)
            : { id_input_type: VInputType.INPUT_TEXT };
    }
    get tipo() {
        // if (this.tipo_busqueda === '=') return 'Igual a'
        //@ts-ignore
        return this.$store.tipos_busqueda.get(this.tipo_busqueda).name;
    }
    get operation() {
        return this.$store.tipos_busqueda.getOperation(this.tipo_busqueda);
    }
    get properties() {
        return (this.campo && Array.isArray(this.campo.properties) ? this.campo.properties : []);
    }
    get items() {
        //properties.length > 0
        return (Array.isArray(this.valor_busqueda) ? this.valor_busqueda : [this.valor_busqueda]).map(String); //.split(',')
    }
    get options() {
        //@ts-ignore
        return this.campo ? this.campo.options : [];
    }
    get operadores_busqueda() {
        //@ts-ignore
        return this.$store.tipos_busqueda.operadores_para((this.campo || { id_input_type: 0 }))
            || {
                [VSearchType.IS_NULL]: 'Vacío/Nulo', [VSearchType.IS_NOT_NULL]: 'No es vacío/Nulo'
            };
    }
    /*get index() {
        return (this.filtro || {}).index;
    }
    set index(value) {
        this.filtro.index = value;
    }
    get disabled() {
        return !!(this.filtro || {}).disabled
    }
    set disabled(value) {
        this.filtro.disabled = !!value
    }*/
    get operadores() {
        return this.operadores_busqueda;
    }
    get isValid() {
        return this.campo_busqueda && this.campo_busqueda !== ',negocio' && this.slug_name && ((this.valor_busqueda !== null && this.valor_busqueda !== undefined)
            || String(this.tipo_busqueda) === VSearchType.IS_NULL
            || String(this.tipo_busqueda) === VSearchType.IS_NOT_NULL);
    }
    get input_type() {
        return this.campo ? this.campo.input_type : 'text';
    }
    get payload() {
        let { id, conector, campo_busqueda, tipo_busqueda, valor_busqueda, slug_name, attr_type, id_input_type, id_rol_negocio, disabled, input_type, operation, index } = this;
        // console.log({ campo_busqueda, id_rol_negocio })
        return {
            id,
            index,
            conector,
            campo_busqueda,
            tipo_busqueda,
            input_type,
            valor_busqueda: valor_busqueda === null
                ? null
                : typeof valor_busqueda === 'object'
                    ? Object.values(valor_busqueda)
                    : valor_busqueda,
            slug_name,
            id_input_type,
            attr_type,
            id_rol_negocio,
            operation,
            disabled
        };
    }
    get templateId() {
        if (this.renderButtonGroup)
            return '#render_button_group';
        if (this.renderSelect)
            return '#render_select';
        if (this.renderContacto)
            return '#render_contacto';
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
    }
    getTemplateContent() {
        return document.querySelector(this.templateId).innerHTML;
    }
    get templateContent() {
        return document.querySelector(this.templateId).innerHTML;
    }
    get VRenderType() {
        return VRenderType;
    }
    get shouldRender() {
        if (!this.campo)
            return 'renderNull';
        let { renderNumericInterval, renderSelect, renderSingleDate, renderDateRange, renderNumber, renderContacto, renderNull, renderText, renderButtonGroup, } = this;
        let shouldRender = Object.entries({
            renderNull,
            renderSelect,
            renderSingleDate,
            renderDateRange,
            renderNumericInterval,
            renderNumber,
            renderContacto,
            renderButtonGroup,
            renderText
            //@ts-ignore
        }).find(([key, value]) => value === true); //.map(([key, value]) => key as string)
        return (shouldRender ? shouldRender[0] : 'renderText');
    }
    get renderSelect() {
        if (!this.campo)
            return false;
        return (this.campo.isSelectOrRadioButtonGroup
            || this.campo.isMultiSelectField
            || this.campo.isCheckbox
            //@ts-ignore
            || (!this.renderContacto && [search_types.IN, search_types.NOT_IN].includes(String(this.tipo_busqueda)) && (this.campo.options || []).length)) && !this.renderNull && !this.renderButtonGroup;
    }
    get renderButtonGroup() {
        if (!this.campo)
            return false;
        return [
            search_types.HAS_ATTACHMENTS
        ].includes(String(this.tipo_busqueda))
            && !this.renderNull;
    }
    get renderSingleDate() {
        if (!this.campo)
            return false;
        return this.campo &&
            this.campo.isDateOrDatetimeField
            && ![
                search_types.BETWEEN,
                search_types.NOT_BETWEEN
            ].includes(String(this.tipo_busqueda))
            && !this.renderNull;
    }
    get renderDateRange() {
        if (!this.campo)
            return false;
        return this.campo && this.campo.isDateOrDatetimeField && [
            search_types.BETWEEN,
            search_types.NOT_BETWEEN
        ].includes(String(this.tipo_busqueda))
            && !this.renderNull;
    }
    get renderNumber() {
        if (!this.campo)
            return false;
        return this.campo.isNumber && !this.renderNull && search_types.IN_RANGE !== String(this.tipo_busqueda);
    }
    get renderNumericInterval() {
        if (!this.campo)
            return false;
        return this.campo.isNumber && !this.renderNull && search_types.IN_RANGE === String(this.tipo_busqueda);
    }
    get renderNull() {
        if (!this.campo)
            return true;
        return [
            search_types.IS_NULL,
            search_types.IS_NOT_NULL
        ].includes(String(this.tipo_busqueda));
    }
    get renderContacto() {
        if (!this.campo)
            return false;
        return this.campo.isContact && !this.renderNull;
    }
    get renderText() {
        return !this.renderSelect
            && !this.renderNull
            && !this.renderNumber
            && !this.renderDateRange
            && !this.renderSingleDate
            && !this.renderContacto
            && !this.renderNull;
    }
}
Object.defineProperty(EnrichedFilter.prototype, 'tipo', { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, 'input_type', { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, 'shouldRender', { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, 'payload', { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, 'operadores_busqueda', { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, 'operation', { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, 'tipo_busqueda', { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, 'campo_busqueda', { enumerable: true });
//# sourceMappingURL=EnrichedFilter.js.map