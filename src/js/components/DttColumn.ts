import { Solicitud } from '../solicitudes_modules/Solicitud';
import { INegocioRow } from './alpine.store';
import { InputType, VInputType } from './alpine_definitions/definitions.input_types';
import { AttrType } from './type_definitions';
import { CamposBusquedaStore, ColumnasActualesStore } from './stores';
import { MapStore, NegocioStore } from '@/negocios_modules';
import { ActiveFilterStore } from '@/filter_modules';
import { IUserStore } from './alpine_definitions';
import { IColumnDefCommon, IColumnDef } from './alpine_definitions/IColumnDefCommon';

export function inferDireccionAndPropietario(value: string = ''): { direccion: string, propietario: string } {
    value = value || ''
    if (!(value || '').includes(' - ') && (value || '')
        .includes('-'))
        value = value
            .replace(
                /([^\s]+)\s*-\s*([^\s]+)/,
                '$1 - $2');
    let valueArray = (value || '').split(' - ');
    let [direccion = '', propietario = ''
    ] = (!valueArray[1] || /\d+/.test(valueArray[0]) || !/\d+/.test(valueArray[1]))
            ? [
                valueArray[0], valueArray[1]
            ] : [valueArray[1], valueArray[0]];
    return { direccion, propietario }
}

export class DttColumn<R extends (INegocioRow | Solicitud) = INegocioRow> implements IColumnDefCommon<R>{
    public name: string;
    public data: string;
    public title: string;
    private _visible: boolean = true;
    public className: string;
    public sortable: boolean;
    public width: string;
    public visible: boolean;
    public field?: string;
    public attr_type: AttrType;
    public checkbox?: boolean;
    public key: string;
    public class: string;
    public render: (data: any, type: any, row: R, meta: any) => string;
    public formatter: (data: any, row: R) => string;
    public slug_name: string;
    public input_type: InputType = InputType.Text
    public targets: number | number[];
    public id_input_type?: VInputType;
    public editable: boolean = true;
    public is_default?: boolean;
    [s: string]: unknown;
    constructor(options: IColumnDef<R>) {
        const {
            name,
            data,
            title,
            visible = true,
            className,
            sortable,
            render,
            width,
            targets,
            slug_name,
            input_type,
            checkbox,
            attr_type = 'negocio',
            editable = true,
            is_default = false,

            ...attrs
        } = options;
        Object.entries(attrs).forEach(([attr_name, attr_value]) => {
            this[attr_name] = attr_value;
        });
        //@ts-ignore
        this.editable = editable;
        this.is_default = is_default;
        this.slug_name = slug_name;
        this.width = width;
        this.title = this.name = name;
        if (data) {
            this.data = data as string;
            this.field = data as string;
        } else if (checkbox) {
            this.checkbox = checkbox
        }
        //@ts-ignore
        this.attr_type = attr_type;
        this.title = title;
        this.visible = visible;
        this.class = this.className = className;
        this.sortable = sortable;
        this.targets = targets;
        this.input_type = (input_type || 'text') as InputType;
        this.render = render || this.defaultRendered;
        this.formatter = (value, row) => {
            return this.render(value, null, row, null);
        };
        const key = [slug_name, attr_type].filter(Boolean).join(',');


    }

    /*set visible(visible: boolean) {
        //console.trace(this.slug_name + ' setting visible', visible)
        this._visible = visible;
    }
    get visible() {
        return this._visible;
    }*/
    defaultRendered(data, type, row, meta) {
        return data;
    }

    get $store() {
        return {
            columnas_actuales: (Alpine.store('columnas_actuales') as ColumnasActualesStore),
            campos_busqueda: (Alpine.store('campos_busqueda') as CamposBusquedaStore),
            negocios: (Alpine.store('negocios') as NegocioStore),
            active_filter: (Alpine.store('active_filter') as ActiveFilterStore),
            maps: (Alpine.store('maps') as MapStore),
            user: (Alpine.store('user') as IUserStore)
        }
    }


}

