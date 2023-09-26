
import { Feature } from 'geojson';
import { Instance, Props } from 'tippy.js';
import { DttColumn } from '../DttColumn';
import { AlpineDataComponent, IAlpineStore, INegocioRow } from '../alpine.store';
import { IDummyNegocio } from "./IDummyNegocio";
import { ITableHeader } from "./ITableHeader";
import { IBaseClass, THandler, TeventType } from '..';

interface IValidateInputs<T extends unknown> {
    ({ id, property, value }: { id: number, property: string, value: T }): Promise<{
        negocio: INegocioRow,
        campo: DttColumn,
        prefixed_property: string,
        currentValue: T
    }>
}
export interface INegocioStore extends XNegocioStore<'reload' | 'complete'> {
    data: INegocioRow[];
    append(rows: INegocioRow[]): void;
    reload(rows: INegocioRow[]): void;
    savingPromise: Promise<unknown>;
    checked: INegocioRow[];
    total: number;
    per_page: number;
    last_page: number;
    activeFilterIcon: string;
    dummy: IDummyNegocio

    fetchAll(): Promise<INegocioRow[]>
    processHandler: (handler: (() => void) | undefined) => void;
    fetchFilteredRecords(endpoint: string, { state, method, headers }: {
        state: Record<string, any>;
        method: string;
        headers: HeadersInit;
        page?: number;
    }): Promise<INegocioRow[]>;
    ids: number[];
    model: string;
    properties: INegocioRow[];
    processResult(res: Response): Promise<INegocioRow[]>
    setProperty(id: number, property: string, value: any): Promise<boolean>
    get deals_with_coordinates(): INegocioRow[],
    toJSON(id: number): Feature;
    next_page_url: string;
    init(): void;
    get(id: string | number): INegocioRow
    normalizeNegocio(negocio: INegocioRow, slugs: string[]): INegocioRow;
    [s: string]: unknown;
    tooltipInstance?: Instance<Props>
    filesTooltip?: Instance<Props>
    contextMenuOpen?: AlpineDataComponent<ITableHeader>


}


interface XNegocioStore<K extends TeventType> extends IBaseClass<K> {
    data: INegocioRow[];
    total: number;
    per_page: number;
    current_page: number;
    properties: INegocioRow[];
    next: (page?: number, cb?: Function) => Promise<INegocioRow[]>;
    ids: number[];
    append: (args: INegocioRow[]) => void;
    urlInstance: URL;
    getRaw: (id: number) => INegocioRow;
    url: URL;

    [s: string]: unknown;
};
type iLightDeal = {
    id: number;
    nombre: string;
}

