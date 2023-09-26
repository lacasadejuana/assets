import { INegocioRow } from '@/components/alpine.store';
import { CampoFiltro } from '@/components/alpine_definitions/definitions.filters';
import { DttColumn } from '../DttColumn';
import { IBaseClass } from './IBaseClass';
import { TSimpleCampo } from './TSimpleCampo';
import { VSearchType } from "./definitions.search_types";


export interface XTipoBusquedaStore extends IBaseClass<'ready'> {
    className: string;
    properties: Record<VSearchType, string>;
    VSearchType: typeof VSearchType;
    operadores_para: (campo: DttColumn<INegocioRow> | CampoFiltro | TSimpleCampo) => Record<VSearchType, string>;
    operadores_por_input_type: (params: TSimpleCampo) => Record<VSearchType, string>;
    get: (id: VSearchType) => string;
    [s: string]: unknown;

};
