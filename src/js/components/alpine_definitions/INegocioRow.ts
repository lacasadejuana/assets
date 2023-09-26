

import { ICamposBusqueda } from './ICamposBusqueda';
import { IDummyNegocio } from './IDummyNegocio';
import { INegocioStore } from './INegocioStore';
import { IFilterStore } from './definitions.filters';
import { iCurrentColumns } from './iCurrentColumns';


export type INegocioRow = {
    id: number;

    [s: string]: unknown;
    tipo_negocio: unknown;
    tipo_propiedad: unknown;
    etapa_negocio: unknown;
    id_tipo_negocio: number;
    id_tipo_propiedad: number;
    id_etapa_negocio: number;
    searchstring: string;
    toFeature(): GeoJSON.Feature;
    setProperty(property: string, value: TPropertyValue): Promise<boolean>;
    set(property: string, value: TPropertyValue): void;
    save(): Promise<boolean>;

};
export interface INegocio extends IDummyNegocio {
    toFeature(): GeoJSON.Feature;
    setProperty(property: string, value: TPropertyValue): Promise<boolean>;
    submitContacto(slug_name: string, id_persona: number): Promise<boolean>;
    computeSearchString(negocioNormalized: INegocioRow): string;
    latitud: number;
    longitud: number;
    checked: boolean;
    negocio: INegocioRow;
    token: string;
}
export interface NegocioNormalized {
    id: number;
    tipo_negocio: unknown;
    tipo_propiedad: unknown;
    etapa_negocio: unknown;
    id_tipo_negocio: number;
    id_tipo_propiedad: number;
    id_etapa_negocio: number;
    searchstring: string;
    [s: string]: unknown;
}

export type TPropertyValue = string | number | string[];
export type TSeudoStore = {
    campos_busqueda: ICamposBusqueda;
    negocios: INegocioStore;
    columnas_actuales: iCurrentColumns;
    active_filter: IFilterStore;
};

