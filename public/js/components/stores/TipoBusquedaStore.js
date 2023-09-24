import { VInputType } from "../alpine_definitions/definitions.input_types";
import { VSearchType, VTypeSearch } from "../alpine_definitions/definitions.search_types";
import { NegocioColumn } from '../entities/NegocioColumn';
import { BaseClass } from './BaseClass';
import { bindConsole } from '..';
import { LogLevel } from '../alpine_definitions/logLevel';
export class TipoBusquedaStore extends BaseClass {
    constructor() {
        super();
        this.className = 'TipoBusquedaStore';
        this.silent = false;
        this.loglevel = LogLevel.INFO;
        this.timerColor = 'color:blue;font-weight:bold';
        this.classNameColor = 'color:steelblue;font-weight:bold;';
        this.ready = false;
        this.classNameColor = 'color:steelblue;font-weight:bold;';
        this._console = bindConsole(this.className, this.classNameColor);
        this.init();
    }
    marquee(message, ...args) {
        /*console.marquee({
            [Number(performance.now() / 1000).toFixed(1)]: this.timerColor,
            [String(this.constructor.name)]: this.classNameColor,
            [message]: '',
            //@ts-ignore
        }, ...args)*/
        console.timerInfo(this.className, message, ...args);
    }
    updateProperties(tipos_busqueda) {
        this.properties = tipos_busqueda;
        this.ready = true;
        this.processEventListeners('ready', this);
    }
    operadores_para(campo) {
        if (!(campo instanceof NegocioColumn))
            return this.operadores_por_input_type(campo);
        let operaciones = [VSearchType.IS_NULL, VSearchType.IS_NOT_NULL];
        /**
         * Enable SELECT component for checkboxes, radio buttons , select fields and fields id or codigo_interno
         */
        if (campo.isSelectOrRadioButtonGroup
            || campo.isCheckbox
            || campo.isContact
            //@ts-ignore
            || (['id', 'codigo_interno'].includes(campo.slug_name) && campo.options.length)) {
            operaciones = operaciones.concat([VSearchType.IN,
                VSearchType.NOT_IN
            ]);
        }
        /**
         * Enable 'attach files' filter criteria
         */
        if (campo.attachesFiles) {
            operaciones.push(VSearchType.HAS_ATTACHMENTS);
        }
        /**
         * Enable 'contains' filter criteria
         */
        if (campo.isMultiSelectField) {
            operaciones.push(VSearchType.JSON_CONTAINS);
            operaciones.push(VSearchType.JSON_NOT_CONTAINS);
        }
        /**
         * Enable 'between' , 'not between', 'is after' and 'is before' filter criteria
         */
        if (campo.isDateOrDatetimeField) {
            operaciones = operaciones.concat([
                VSearchType.BETWEEN,
                VSearchType.NOT_BETWEEN,
                VSearchType.IS_AFTER,
                VSearchType.IS_BEFORE,
            ]);
        }
        /**
         * Enable 'equal', 'not equal', 'greater than', 'greater than or equal', 'less than' and 'less than or equal' filter criteria
         * for numeric fields
         */
        if (campo.isNumber) {
            operaciones = operaciones.concat([
                VSearchType.IN_RANGE,
                VSearchType.IS_EQUAL,
                VSearchType.IS_NOT_EQUAL,
                VSearchType.GREATER_THAN,
                //VSearchType.GREATER_THAN_OR_EQUAL,
                VSearchType.LESS_THAN,
                //VSearchType.LESS_THAN_OR_EQUAL,
            ]);
        }
        if (campo.isTextOrTextArea) {
            operaciones = operaciones.concat([
                VSearchType.LIKE,
                VSearchType.NOT_LIKE,
            ]);
        }
        return operaciones.reduce((accum, operacion) => {
            accum[operacion] = this.get(operacion);
            return accum;
        }, {});
    }
    operadores_por_input_type(campo) {
        return Object.fromEntries(Object.entries(this.properties).filter(([id, tipo]) => {
            const str_search_type_id = String(id), { id_input_type } = campo, str_input_type_id = String(id_input_type);
            if (([
                VInputType.INPUT_SELECT,
                VInputType.INPUT_STATIC_PARAMS,
                VInputType.INPUT_RADIO_BUTTONGROUP,
                VInputType.INPUT_CHECKBOX,
                VInputType.INPUT_CONTACTO_ASOCIADO,
            ].includes(str_input_type_id))
                //@ts-ignore
                || (['id', 'codigo_interno'].includes(campo.slug_name) && campo.options.length)) {
                return [
                    VSearchType.IN,
                    VSearchType.NOT_IN,
                    VSearchType.IS_NULL,
                    VSearchType.IS_NOT_NULL,
                ].includes(str_search_type_id)
                    || (campo.attach_files
                        && VSearchType.HAS_ATTACHMENTS === str_search_type_id);
            }
            if ([
                VInputType.INPUT_SELECT_MULTIPLE
            ].includes(str_input_type_id)) {
                return [
                    VSearchType.JSON_CONTAINS,
                    VSearchType.JSON_NOT_CONTAINS,
                    VSearchType.IS_NULL,
                    VSearchType.IS_NOT_NULL,
                ].includes(str_search_type_id);
            }
            if ([
                VInputType.INPUT_DATE,
                VInputType.INPUT_DATE_TIME,
            ].includes(str_input_type_id)) {
                return [
                    VSearchType.BETWEEN,
                    VSearchType.NOT_BETWEEN,
                    VSearchType.IS_AFTER,
                    VSearchType.IS_BEFORE,
                    VSearchType.IS_NULL,
                    VSearchType.IS_NOT_NULL,
                ].includes(str_search_type_id);
            }
            // default: every search type except trash ones
            if ([
                VInputType.INPUT_NUMBER
            ].includes(str_input_type_id)) {
                return [
                    VSearchType.IS_EQUAL,
                    VSearchType.IS_NOT_EQUAL,
                    VSearchType.GREATER_THAN,
                    VSearchType.LESS_THAN,
                    //VSearchType.GREATER_THAN_OR_EQUAL,
                    //VSearchType.LESS_THAN_OR_EQUAL,
                    VSearchType.IS_NULL,
                    VSearchType.IS_NOT_NULL
                ]
                    .includes(str_search_type_id);
            }
            return [
                VSearchType.LIKE,
                VSearchType.NOT_LIKE,
                VSearchType.IS_NULL,
                VSearchType.IS_NOT_NULL
            ]
                .includes(str_search_type_id);
        }));
    }
    get(id) {
        return this.properties[Number(id)];
    }
    getOperation(id) {
        return VTypeSearch[String(id)];
    }
    init() {
        console.marquee({
            [Number(performance.now() / 1000).toFixed(1)]: 'color:blue;font-weight:bold',
            ' created store ': '',
            [String(this.className)]: 'color:blue;font-weight:bold;'
        });
    }
}
//# sourceMappingURL=TipoBusquedaStore.js.map