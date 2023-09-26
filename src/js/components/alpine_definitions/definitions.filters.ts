import { EnrichedFilter } from '@/filter_modules';
import { INegocioRow } from '../alpine.store';
import { IBaseClass } from '../alpine_definitions/IBaseClass';
import { TContactOption } from "./TContactOption";
import { VInputType } from './definitions.input_types';
import { VSearchType } from "./definitions.search_types";
import { AttrType, FormComponent, PropertyClass, TipoNegocio } from './type_definitions';



export interface IFilterStore extends IBaseClass<'ready' | 'filters_loaded' | 'probe'> {
    constructor: Function//(active_filter: IFilterDefinition, filtrosDisponibles: IFiltroDisponible[]);
    id: number | string;
    author?: string;
    get user_id(): number | string;
    created_at: Date;
    //updated_at: Date;
    opened_once: boolean;
    filters_open: boolean;
    searchUrl: string,
    display_filters_accordion: boolean,
    _filtro?: IFiltro;
    properties: IFilterDefinition;
    filtrosDisponibles: IFilterDefinition[];
    default_changed: boolean;
    filterMap: null | Map<number | string, IFiltro>;
    filterIndex: number;
    get nextIndex(): number;
    getEstimate(options: { include_columns: boolean }): Promise<{ estimate: number, columnas_visibles: number[] }>
    submitSearch(): Promise<void | INegocioRow[]>
    get filtros(): EnrichedFilter[];
    set filtros(filtros: EnrichedFilter[]);
    updateProperties(properties: IFilterDefinition): void;
    setActive(id: number | string): void;
    get(id: number | string): IFilterDefinition | null;
    removeAt(id): void,
    get columnas_actuales(): TFilterColumnaActual[];
    set columnas_actuales(columnas: TFilterColumnaActual[]);
    get columnas_visibles(): (string | number)[]
    set columnas_visibles(columnas: (string | number)[])

    infer_columnas_actuales(): TFilterColumnaActual[];
    createDummyFilter(): IFiltro;
    enrichFilter(filtro: IFiltro): IEnrichedFiltro;
    at(index: number): IFiltro | null;
    enrichedFilters: IEnrichedFiltro[],

}

export interface IFiltroDisponible {
    id: number;
    name: string;
    public: number;
    user_id: number;
    query_string: IFilterExtraAttributes['query_string'];

    areas_subareas: unknown;
    created_at: Date;
    updated_at: Date;
    opt_group?: string;
    deleted_at: null;
    author?: string;
    user?: {
        id: number;
        name: string;
    }
}



export interface IFilterExtraAttributes {
    query_string: IFilterDefinition;
}

export interface IFilterQueryString {
    rol: null;
    name: string;
    filter: null;
    filtros: IFiltro[];
    personas: number[];
    columnas_visibles: Array<number | string>;
}


export interface DefaultColumn {
    name: string;
    slug_name: string;
    attr_type: AttrType;
    input_type: string;
    readonly?: boolean | number;
    properties?: Array<PropertyClass | string> | null | string;
    options?: (TContactOption | TOption)[];
    id_input_type: VInputType;
    is_default?: boolean;
    optionMap?: Map<string | number, string>;

}
export interface ColumnaVisible {
    id_input_type?: VInputType;
    input_type: string;
    visible?: boolean;
    width?: string;
    id?: number;
    related_model?: null | string;
    properties?: Array<PropertyClass | string> | null | string;
    index?: number;
}
export type CampoFiltro = DefaultColumn & ColumnaVisible & {
    attach_files?: boolean,
    id_rol_negocio?: number;
    key: string;
    id_seccion?: number;
    tipo_negocio?: TipoNegocio;
    hidden?: number;
    id_input_type?: VInputType;
    readonly?: number | boolean;
    numero_columnas?: number | null;
    group?: string;
    form_component?: FormComponent;
    data: string;
    field: string;
    editable?: boolean;


};



export interface IFiltro {

    input_type?: string;
    id?: string | number;
    sortindex?: number;
    conector: string;
    campo_busqueda: string;
    tipo_busqueda: VSearchType;
    valor_busqueda: string | string[] | number | number[] | undefined;
    slug_name?: string;
    id_input_type?: VInputType;
    attr_type?: string;
    disabled?: boolean;
    id_rol_negocio?: number | undefined;
    index?: number;
    operacion?: string;
    removed?: boolean;
    timestamp?: number;
    parent_id?: number;

}
export type TOption = {
    name: string;
    value: string;
    id: string;
    opt_group?: string;
};
export type TFilterColumnaActual = {
    id: number;
    visible: boolean;
    slug_name: string;
};

export interface IFilterDefinition {
    id: number;
    areas_subareas?: string[];
    author?: string;
    campo_fecha?: string;
    columnas_actuales?: TFilterColumnaActual[]
    columnas_visibles?: (string | number)[];
    created_at?: Date;
    date_range?: string;
    estimate?: number;
    filter?: string;
    filtros: IFiltro[];
    filtros_and_or?: IFiltro[][];

    name: string;
    nuevo_filtro?: string;
    opt_group?: string;
    personas?: number[];
    personas_nice?: Record<string, string>;
    public?: string | boolean;
    rol?: string | number;
    updated_at?: Date;
    user_id?: number;
    visible_column_slugs?: Record<string, number>;
}

export type IEnrichedFiltro = IFiltro & {
    options?: (TContactOption | TOption)[];
    properties?: Array<PropertyClass | string> | null | string;
    items?: string | string[];
    title?: string;
    tipo?: string;
    [s: string]: any;
};


export interface TEnrichedFilterControl extends IEnrichedFiltro {
    tipo: any;
    renderSelect?: boolean;
    renderSingleDate?: boolean;
    renderDateRange?: boolean;
    renderContacto?: boolean;
    renderNumber?: boolean;
    renderText?: boolean;
    placeHolder?: string;
    operadores: Record<VSearchType, string>;
}
export interface IEnrichedFilter extends TEnrichedFilterControl {

    filtroEnriquecido: IFiltroEnriquecidoObject;
    campo_busqueda: string;
    tipo_busqueda: VSearchType;
    shouldRender?: string;

    operadores_busqueda?: Record<VSearchType, string>;
    slug: string;
    campo: CampoFiltro;
    tipo: string;
    properties?: (TOption | TContactOption)[];
    items: string | string[] | undefined;
    filtro: IFiltro;
    options: (TOption | TContactOption)[];
    parent_id?: number;


}
export interface IFiltroEnriquecidoObject {
    campo_busqueda: string;
    id_rol_negocio: number;
    index: number;
    campo: CampoFiltro;
    options: (TOption | TContactOption)[];
    properties?: (TOption | TContactOption)[];
    renderContacto: boolean;
    renderDateRange: boolean;
    renderNull: boolean;
    renderNumber: boolean;
    renderSelect: boolean;
    renderSingleDate: boolean;
    shouldRender: string;
    tipo_busqueda: VSearchType;
    operadores_busqueda: Record<VSearchType, string>;
    operadores: Record<VSearchType, string>;
    items: string[];
    renderText: boolean;
    slug: string;
    tipo: string;
    //@ts-ignore
    valor_busqueda: string | string[] | number | number[] | undefined;
}
