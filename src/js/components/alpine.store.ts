
/// <reference path="./alpine_definitions/alpine.d.ts" />
import { TomSettings } from 'tom-select/dist/types/types';
import type {
    ICamposBusqueda,
    IMapStore, INegocioRow, INegocioStore, ISolicitudesStore, IUserStore, NegocioNormalized, XDataForm,
} from './alpine_definitions/index';
import { DttColumn } from './DttColumn';

export type { AlpineContext, AlpineDataCallback, IFilterStore, INegocioRow, INegocioStore, NegocioNormalized, XDataForm, };

//import type { Alpine as IAlpine } from 'alpinejs';
import { Alpine } from './alpine_definitions/alpine.shim';
import { $store } from './alpine_definitions/IStores';
//import Alpine from './alpine_definitions/alpine';
import { XData } from './alpine_definitions/alpine.shim';
import { IFilterStore } from './alpine_definitions/definitions.filters';
import type { IFormStore } from './alpine_definitions/XDataForm';

import { ActiveFilterStore } from '@/filter_modules';
import { BaseClass, CamposBusquedaStore, ColumnasActualesStore } from './stores';
export interface XDataContext {
    /**
     * Will be executed before Alpine initializes teh rest of the component.
     */
    init?(): void;
    [stateKey: string]: any;
}
export type AlpineDataComponent<T = Record<string, any>> = Omit<AlpineComponent<T>, '$store'> & { $store?: IAlpineStore }
export type AlpineStore = Alpine['store']
import { AlpineComponent } from 'alpinejs';
import { XTipoBusquedaStore } from './alpine_definitions/XTipoBusquedaStore';



export interface IAlpineStore {
    active_filter: ActiveFilterStore;

    campos_busqueda: XData & ICamposBusqueda,
    columnas_actuales: ColumnasActualesStore;
    input_types: { properties: Record<string, string>[] },
    negocios: INegocioStore;
    roles_negocio: IRolesNegocioStore,
    solicitudes: ISolicitudesStore,
    tipos_busqueda: XTipoBusquedaStore,
    tipos_negocio: IGenericStore<Record<string, string>>,
    tipos_propiedad: IGenericStore<Record<string, string>> & $store['tipos_propiedad'],
    contactos_negocio: IGenericStore<Record<string, string>>,
    etapas_negocio: IGenericStore<Record<string, string>>,
    map: IMapStore,
    theform: IFormStore,
    user: IUserStore,
    [key: string]: any;
}


export type TStoreParams = Parameters<Alpine['store']>;
type AlpineContext = Omit<ReturnType<AlpineDataCallback>, '$store'> & {
    $id?: (namespace: string, element: string) => void,
    'x-show'?: string,
    'x-id'?: string,
    'x-trap.noscroll.inert'?: string,
    '@dialog.window'?: string,
    '@keydown.escape.prevent.stop'?: string,
    ':id'?: string,
    ':role'?: string,
    $store?: IAlpineStore;
}
export interface IGenericStore<T extends Record<string, number | string>> {
    properties: T[],
    get(id: number): T | null
}
export type TTiposBusquedaStore = IGenericStore<Record<string, string>> & {
    operadores_para(campo: DttColumn<INegocioRow>): string[];
};

export type TAlpineDataCallBack = (...initialStateArgs: unknown[]) => AlpineComponent<Record<string, any>>




type AlpineDataCallback = Parameters<Alpine['data']>[1]
type AlpineReturnType = ReturnType<AlpineDataCallback>



export interface IRolesNegocioStore {
    properties: { id: number, name: string }[];
    current: number | string | null;
    tomSettings(id_rol_negocio: number, customOptions?: Partial<TomSettings>): TomSettings;
    get(id: number): { id: number, name: string } | undefined;
}


export interface IAnfitrionOrSolicitante {
    id: number;
    name: string;
    email: string;
    anfitrion?: number;
    solicitante?: number;
}


export type XDataPlus = (TStoreParams[1]) & {

    model: Record<string, unknown>;
    data: INegocioRow[];
};
export type iNoticePayload = {
    type: 'info' | 'success' | 'error' | 'warning',
    text: string,
    [s: string]: any
}


//@ts-ignore
console.zdebug = console.info.bind(
    console,
    '%cDEBUG:',
    'color:#A39;font-weight:bold;'
);

//@ts-ignore
console.zsuccess = console.info.bind(
    console,
    '%cSUCCESS:',
    'color:#16a34a;font-weight:bold;'
);

//@ts-ignore

console.zlog = console.log.bind(
    console,
    '%cLOG:',
    'color:#090;font-weight:bold;'
);
//@ts-ignore

console.zinfo = console.info.bind(
    console,
    '%cINFO:',
    'color:#33C;font-weight:bold;'
);
//@ts-ignore

console.zwarn = console.warn.bind(
    console,
    '%cWARN:',
    'color:orange;font-weight:bold;'
);
//@ts-ignore

console.ztable = console.table.bind(
    console,
    '%cTABLE:',
    'color:orange;font-weight:bold;'
);

console.timeEnd = console.timeEnd.bind(
    console,
    '%ctimeEnd:',
    'color:cyan;font-weight:bold;'
);

