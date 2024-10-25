import { CampoFiltro } from '@lacasadejuana/types';

import { VSearchType } from '@lacasadejuana/types/src/VSearchType';
import { VInputType } from '@lacasadejuana/types/src/VInputType';
import { VTypeSearch } from '@lacasadejuana/types/src/VTypeSearch';
import { DttColumn } from '../DttColumn';
import { INegocioRow } from '../alpine.store';
import { TSimpleCampo } from '../alpine_definitions/TSimpleCampo';
import { NegocioColumn } from '../entities/NegocioColumn';
import { BaseClass } from './BaseClass';

import { XTipoBusquedaStore } from '@lacasadejuana/types';
import { LogLevel, LogLevels, fakeConsole } from '@lacasadejuana/types/src/logLevel';

import { bindConsole } from '..';

export class TipoBusquedaStore extends BaseClass implements XTipoBusquedaStore {
    className = 'TipoBusquedaStore';

    properties: Record<VSearchType, string>
    tipos_busqueda: Record<VSearchType, string>
    VSearchType: typeof VSearchType
    _console: Console
    silent: boolean = false;
    loglevel: LogLevel = LogLevel.INFO
    protected timerColor: string = 'color:blue;font-weight:bold'
    protected classNameColor: string = 'color:steelblue;font-weight:bold;'
    ready: boolean

    constructor() {
        super()
        this.ready = false
        this.classNameColor = 'color:steelblue;font-weight:bold;'
        this._console = bindConsole(this.className, this.classNameColor)

        this.init()
    }

    marquee(message: string, ...args): void {

        /*console.marquee({
            [Number(performance.now() / 1000).toFixed(1)]: this.timerColor,
            [String(this.constructor.name)]: this.classNameColor,
            [message]: '',
            //@ts-ignore
        }, ...args)*/
        console.timerInfo(this.className, message, ...args)
    }
    [s: string]: unknown;

    updateProperties(tipos_busqueda: Record<VSearchType, string>) {
        this.properties = tipos_busqueda

        this.ready = true
        this.processEventListeners('ready', this)

    }
    operadores_para(
        campo: NegocioColumn | DttColumn<INegocioRow> | CampoFiltro | TSimpleCampo
    ): Record<VSearchType, string> {
        if (!(campo instanceof NegocioColumn)) return this.operadores_por_input_type(campo as { slug_name: string, options: unknown[], attach_files: boolean, id_input_type: VInputType | undefined; })
        let operaciones = [VSearchType.IS_NULL, VSearchType.IS_NOT_NULL]

        /**
         * Enable SELECT component for checkboxes, radio buttons , select fields and fields id or codigo_interno
         */
        if (campo.isSelectOrRadioButtonGroup
            || campo.isCheckbox
            || campo.isContact
            //@ts-ignore
            || (['id', 'codigo_interno'].includes(campo.slug_name) && campo.options.length)
        ) {
            operaciones = operaciones.concat(
                [VSearchType.IN,
                VSearchType.NOT_IN
                ])
        }
        /**
         * Enable 'attach files' filter criteria
         */
        if (campo.attachesFiles) {
            operaciones.push(VSearchType.HAS_ATTACHMENTS)
        }
        /**
         * Enable 'contains' filter criteria
         */
        if (campo.isMultiSelectField) {
            operaciones.push(VSearchType.JSON_CONTAINS)
            operaciones.push(VSearchType.JSON_NOT_CONTAINS)
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
            ])
        }
        return operaciones.reduce((accum, operacion) => {
            accum[operacion] = this.get(operacion)
            return accum;
        }, {} as Record<VSearchType, string>)
    }
    operadores_por_input_type(campo: TSimpleCampo): Record<VSearchType, string> {
        return Object.fromEntries(
            Object.entries(this.properties).filter(([id, tipo]) => {
                const str_search_type_id = String(id) as VSearchType,
                    { id_input_type } = campo,
                    str_input_type_id = String(id_input_type) as VInputType;
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
                        || (
                            campo.attach_files
                            && VSearchType.HAS_ATTACHMENTS === str_search_type_id
                        );


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
                        VSearchType.IS_NOT_NULL]
                        .includes(str_search_type_id);

                }
                return [

                    VSearchType.LIKE,
                    VSearchType.NOT_LIKE,
                    VSearchType.IS_NULL,
                    VSearchType.IS_NOT_NULL]
                    .includes(str_search_type_id);
            })
        ) as Record<VSearchType, string>;
    }
    get(id: VSearchType) {
        return this.properties[Number(id)]
    }
    getOperation(id: VSearchType): string {
        return VTypeSearch[String(id)];
    }
    init() {
        console.marquee({
            [Number(performance.now() / 1000).toFixed(1)]: 'color:blue;font-weight:bold',
            ' created store ': '',
            [String(this.className)]: 'color:blue;font-weight:bold;'
        })
    }

}
