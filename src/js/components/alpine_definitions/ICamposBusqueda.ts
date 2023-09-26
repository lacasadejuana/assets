import { DttColumn } from '../DttColumn';
import { NegocioColumn } from '../entities/NegocioColumn';
import { IBaseClass, TeventType } from './IBaseClass';
import type { INegocioRow } from './INegocioRow';
import { Toptgroups } from "./OptionGroups";
import { TContactOption } from "./TContactOption";
import { TOption } from "./definitions.filters";
import { VInputType } from './definitions.input_types';

export type THandler<T> = (arg?: T) => void

export type OnceHandler<T> = THandler<T> & { once: boolean }

export interface ICamposBusqueda<K extends TeventType = 'ready'> extends IBaseClass<K> {
    //properties: DttColumn<INegocioRow>[];
    defaultSlugs?: string[];
    all_selectable_fields: DttColumn<INegocioRow>[];
    slugs?: string[];
    optgroups: Toptgroups;
    readOnly: string[];
    onReadyHandlers: THandler<this>[]
    ready: boolean;
    computeOptions: (campo: string) => (TContactOption | TOption)[];
    findMany(cols: (string | { slug_name: string, id: number, visible: boolean })[]): NegocioColumn[]
    getMany(ids: (number | { id: number, slug_name: string, visible: boolean })[]): NegocioColumn[]
    get: (id: number) => DttColumn<INegocioRow>;
    find: (slug_name: string) => DttColumn<INegocioRow>;

    // get $store(): Partial<IAlpineStore>;
    reloadCampos(campos_busqueda: DttColumn<INegocioRow>[], reset: boolean): void;



    //comercial: DttColumn<INegocioRow>[],
    //contacto: DttColumn<INegocioRow>[],
    contactos_asociados_fields: DttColumn<INegocioRow>[];
    no_seleccionables: DttColumn<INegocioRow>[];
    slugs_no_seleccionables: string[];
    getShownValue: (negocio: INegocioRow, slug_name: string) => string;
    //fechas_negocio: DttColumn<INegocioRow>[],
    //general: DttColumn<INegocioRow>[],
    //propiedad: DttColumn<INegocioRow>[],
    isContact?(slug_name: string | VInputType): boolean;
    isDateOrDatetimeField?(id_input_type: VInputType): boolean;
    isTextOrTextArea?(id_input_type: VInputType): boolean;
    isSelectOrRadioButtonGroup?(id_input_type: VInputType): boolean;
    isCheckbox?(id_input_type: VInputType): boolean;
    isNumber?(id_input_type: VInputType): boolean;
    multiselect_fields?: DttColumn<INegocioRow>[];
    isMultiSelectField?(id_input_type: VInputType): boolean;
}

