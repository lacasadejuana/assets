import { VInputType } from "../alpine_definitions";
import { defaultSlugs, optgroups } from '../alpine_definitions/OptionGroups';
import { decorateCampo, staticFetchWrapper } from '../decorators';
import { NegocioColumn } from '../entities/NegocioColumn';
import { v4 as uuidv4 } from 'uuid';
import { bindConsole, inferDireccionAndPropietario } from "..";
import { LogLevel } from '../alpine_definitions/logLevel';
import { tap } from "../plugins";
import { BaseClass } from './BaseClass';
export class CamposBusquedaStore extends BaseClass {
    constructor() {
        super();
        this.className = 'CamposBusquedaStore';
        this.silent = false;
        this.loglevel = LogLevel.WARN;
        this.id = uuidv4();
        this.properties = [];
        this.fieldMap = new Map();
        this.timerColor = 'color:blue;font-weight:bold';
        this.classNameColor = 'color:purple;font-weight:bold;';
        this.fetching_light_list = false;
        this.ready = false;
        this.classNameColor = 'color:purple;font-weight:bold;';
        this._console = bindConsole(this.className, this.classNameColor);
        this.init();
    }
    init() {
        this.marquee(' init ');
        //console.trace(this.className + ' init')
        this.lightList = new Promise(res => {
            this.once('ready', () => {
                this.fetchLightNegocios().then(res);
            });
        });
    }
    get columnDefs() {
        return this.properties;
    }
    set columnDefs(campos_busqueda) {
        this.properties = campos_busqueda;
    }
    reloadCampos(campos_busqueda, reset = false) {
        if (!campos_busqueda || campos_busqueda.length === 0)
            return;
        if (this.ready)
            return;
        //console.zwarn(this.id + ' reloadCampos ' + this.className, { campos_busqueda })
        this.properties = Object.values(campos_busqueda).filter(c => c.slug_name)
            // .concat(hardCodedDateFields as NegocioColumn[])
            //@ts-ignore
            .map(c => new NegocioColumn(decorateCampo(c)))
            /* .sort((a, b) => {
                 if (a.group === b.group) {
                     return a.slug_name.localeCompare(b.slug_name);
                 }
                 //@ts-ignore
                 return a.group.localeCompare(b.group);
             })*/
            .map(c => {
            if (defaultSlugs.includes(c.slug_name)) {
                c.readonly = true;
                c.is_default = true;
            }
            this.fieldMap.set(c.slug_name, c);
            return c;
        });
        //don't fire callbacks that where called already
        if (!this.ready) {
            this.ready = true;
            this.marquee(' finished proccesing columnDefs ');
            requestAnimationFrame(() => this.processEventListeners('ready', this));
        }
        return this.properties;
    }
    async fetchLightNegocios() {
        if (this.fetching_light_list)
            return this.lightList;
        this.fetching_light_list = true;
        return staticFetchWrapper('/api/negocios/light_list', {}).then(async (res) => {
            const jsonRes = tap(await res, (lightList) => {
                this.find('codigo_interno').properties = (Object.values(lightList)).filter(option => option.codigo_interno && String(option.codigo_interno).length === 6).map(option => {
                    return {
                        id: option.codigo_interno,
                        value: option.codigo_interno,
                        label: `${option.codigo_interno}|${option.nombre}`,
                        name: `${option.codigo_interno}|${option.nombre}`
                    };
                });
                this.find('id').properties = (Object.values(lightList)).filter(option => option.id).map(option => {
                    return {
                        value: option.id,
                        name: `#${option.id}|${option.nombre}`
                    };
                });
            });
            return jsonRes.map((row) => {
                let { direccion, propietario } = inferDireccionAndPropietario(row.nombre);
                return { id: row.id, direccion, propietario };
            });
        });
    }
    findMany(cols) {
        return cols.filter(c => c).map(c => {
            //@ts-ignore
            let col = this.find(c.slug_name || c) || { slug_name: (c.slug_name || c), visible: true };
            col.visible = typeof c === 'object' ? (c.visible ?? true) : col.visible;
            return col;
        }).filter(c => c);
    }
    getMany(ids) {
        return ids.filter(c => c).map(c => {
            //@ts-ignore
            let col = this.get(c.id || c) || { id: (typeof c === 'object' ? c.id : c), visible: true };
            col.visible = typeof c === 'object' ? (c.visible ?? true) : col.visible;
            return col;
        }).filter(c => c);
    }
    computeOptions(campo_busqueda) {
        //@ts-ignore
        const campo = this.find(campo_busqueda.split(',')[0]) || { id_input_type: VInputType.INPUT_TEXT };
        if (!campo || (campo.id_input_type === VInputType.INPUT_SELECT && campo.properties === null)) {
            console.warn('Campo select sin opciones', campo);
            return [];
        }
        //@ts-ignore
        return campo.options;
    }
    getShownValue(negocio, slug_name) {
        const item = this.find(slug_name);
        if (typeof negocio === 'number')
            negocio = this.$store.negocios.get(negocio);
        if (item)
            return item.getShownValue(negocio);
        negocio = negocio || {};
        let baseline = negocio[slug_name] || '';
        if (negocio._extra_props) {
            baseline = (negocio[slug_name] ?? negocio._extra_props[slug_name]) || '';
        }
        if (!item) {
            return baseline;
        }
        if (this.isSelectOrRadioButtonGroup(item.id_input_type)
            || this.isContact(item.id_input_type)) {
            if (!item.optionMap) {
                console.warn('Campo select sin opciones', item);
                return baseline;
            }
            //@ts-ignore
            return item.optionMap.get(baseline || '') || item.optionMap.get(baseline || '') || '';
        }
        if (this.isMultiSelectField(item.id_input_type)) {
            let value = (negocio[slug_name] || []);
            //@ts-ignore
            return Array.isArray(value) ? value.map((id) => item.optionMap.get(id) || '').join(', ') : value;
        }
        if (typeof baseline === 'string') {
            return baseline.replace('[null]', '');
        }
        return baseline;
    }
    /**
     * Slug name should be only the clean nombre of the field,
     * but this method cleans the postfix in case it was passed a
     * filter campo de busqueda
     *
     * @param {string} slug_name
     * @returns
     */
    find(slug_name) {
        let exact_match = this.fieldMap.get(slug_name.replace(/^([^,]+),?.*$/, '$1'));
        if (exact_match)
            return exact_match;
        if (slug_name.endsWith('*'))
            return this.properties.find(prop => prop.slug_name.startsWith(slug_name.replace('*', '')));
        if (slug_name.startsWith('*'))
            return this.properties.find(prop => prop.slug_name.endsWith(slug_name.replace('*', '')));
        return this.properties.find(prop => prop.slug_name.includes(slug_name.replaceAll('*', '')));
    }
    has(slug_name) {
        return this.fieldMap.has(slug_name);
    }
    get(id) {
        return this.properties.find(c => c.id == id);
    }
    get contactos_asociados_fields() {
        return Object
            .values(this.properties).filter(c => [
            VInputType.INPUT_CONTACTO_ASOCIADO
        ].includes(c.id_input_type)).filter(field => field.group === 'contacto');
    }
    get slugs_no_seleccionables() {
        return this.no_seleccionables.map(c => c.slug_name);
    }
    get columnas_seleccionables() {
        return Object.values(this.properties)
            .filter(campo => !this.slugs_no_seleccionables.includes(campo.slug_name));
    }
    get all_selectable_fields() {
        return Object
            .values(this.properties)
            .filter(c => [
            VInputType.INPUT_SELECT,
            VInputType.INPUT_TEXT,
            VInputType.INPUT_TEXT_AREA,
            VInputType.INPUT_NUMBER,
            VInputType.INPUT_RADIO_BUTTONGROUP,
            VInputType.INPUT_STATIC_PARAMS,
            VInputType.INPUT_CHECKBOX,
            VInputType.INPUT_STATIC_PARAMS,
            VInputType.INPUT_DATE,
            VInputType.INPUT_DATE_TIME,
            VInputType.INPUT_SELECT_MULTIPLE,
        ].includes(c.id_input_type))
            //@ts-ignore
            //.concat((hardCodedDateFields)                .map(c => decorateCampo(c as NegocioColumn)))
            .concat(this.contactos_asociados_fields);
    }
    isMultiSelectField(id_input_type) {
        return VInputType.INPUT_SELECT_MULTIPLE === String(id_input_type);
    }
    isDateOrDatetimeField(id_input_type) {
        return VInputType.INPUT_DATE === String(id_input_type) || VInputType.INPUT_DATE_TIME === String(id_input_type);
    }
    isTextOrTextArea(id_input_type) {
        return VInputType.INPUT_TEXT === String(id_input_type) || VInputType.INPUT_TEXT_AREA === String(id_input_type);
    }
    isSelectOrRadioButtonGroup(id_input_type) {
        return VInputType.INPUT_STATIC_PARAMS === String(id_input_type)
            || VInputType.INPUT_RADIO_BUTTONGROUP === String(id_input_type)
            || VInputType.INPUT_SELECT === String(id_input_type);
    }
    isCheckbox(id_input_type) {
        return VInputType.INPUT_CHECKBOX === String(id_input_type);
    }
    isNumber(id_input_type) {
        return VInputType.INPUT_NUMBER === String(id_input_type);
    }
    isContact(id_input_type) {
        return VInputType.INPUT_CONTACTO_ASOCIADO === String(id_input_type);
    }
    get optgroups() {
        return optgroups;
    }
    get no_seleccionables() {
        return this.properties.filter(c => [
            'nombre',
            'id_tipo_negocio',
            'id_tipo_propiedad',
            'id_etapa_negocio',
            'fecha_creacion',
            'fechaCreacion',
            'fecha_creacion_visual'
        ].concat(this.defaultSlugs).includes(c.slug_name));
    }
    get defaultSlugs() {
        return defaultSlugs;
    }
    printTable(ids) {
        ids = ids.map(id => id.id || id);
        console.log('buscando', ids.toString());
        let campos = ids.map((id) => this.get(id));
        console.table(campos, ['id', 'slug_name', 'visible']);
    }
    /**
     * @todo why stringify and parse?
     */
    get readOnly() {
        return JSON.parse(JSON.stringify(Object.values(this.properties)))
            .filter(c => c.readonly)
            .map(c => c.slug_name)
            .concat(this.defaultSlugs);
    }
}
Object.defineProperty(CamposBusquedaStore.prototype, 'init', { enumerable: true });
//# sourceMappingURL=CamposBusquedaStore.js.map