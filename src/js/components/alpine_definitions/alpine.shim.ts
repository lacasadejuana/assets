import { ICamposBusqueda, IFilterStore, INegocioStore, ISolicitudesStore, XDataContext, iCurrentColumns } from '.';


import Alpine, { AlpineComponent } from 'alpinejs';
import { IAlpineStore, IGenericStore, IRolesNegocioStore } from '..';

export type XData = XDataContext | string | number | boolean | IAlpineStore;
export declare interface Alpine {

    data(name: string, callback: (...initialStateArgs: unknown[]) => AlpineComponent): void;
    store(name: 'campos_busqueda'): XData & ICamposBusqueda;
    store(name: 'negocios'): INegocioStore;
    store(name: 'active_filter'): IFilterStore;
    store(name: 'columnas_actuales'): iCurrentColumns;
    store(name: 'input_types'): { properties: Record<string, string>[] };
    store(name: 'roles_negocio'): IRolesNegocioStore;
    store(name: 'solicitudes'): ISolicitudesStore;
    store(name: 'tipos_busqueda'): IGenericStore<Record<string, string>> & { operadores_para(campo: ICamposBusqueda): string[] };
    store(name: 'tipos_negocio'): IGenericStore<Record<string, string>>;

    store(name: 'contactos_negocio'): IGenericStore<Record<string, string>>;

    /**
    * Retrieves state in the global store.
    *
    * @param name state key
    */
    store(name: string): XData;
    /**
     * Sets state in the global store.
     *
     * @param name state key
     * @param value the initial state value
     */
    store(name: string, value: XData): void;

}
export default Alpine;

