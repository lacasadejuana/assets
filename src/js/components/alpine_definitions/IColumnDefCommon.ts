import { Solicitud } from '../solicitudes_modules/Solicitud';
import { INegocioRow } from './alpine.store';
import { InputType } from './alpine_definitions/definitions.input_types';
import { AttrType } from './type_definitions';
import { IHybridColumnDef } from './IHybridColumnDef';

export interface IColumnDefCommon<R extends (INegocioRow | Solicitud) = INegocioRow> extends IHybridColumnDef {
    name: string;
    field?: string;
    title?: string;
    visible?: boolean;
    className?: string;
    sortable?: boolean;
    width?: string;
    slug_name: string;
    input_type: InputType;
    attr_type: AttrType;
    targets: number | number[];
    render?: (data: any, type: any, row: R, meta: any) => string;
    formatter?: (data: any, row: R) => string;
    checkbox?: boolean;
    [s: string]: unknown;
}

export interface IColumnDefField<R extends (INegocioRow | Solicitud) = INegocioRow> extends IColumnDefCommon<R> {
    field: string;
    data: string;
}
export interface IColumnCheckbox<R extends (INegocioRow | Solicitud) = INegocioRow> extends IColumnDefCommon<R> {
    checkbox: boolean;
}

export type IColumnDef<R extends (INegocioRow | Solicitud) = INegocioRow> = IColumnDefField<R> | IColumnCheckbox<R>;
