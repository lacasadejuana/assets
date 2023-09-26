import { NegocioColumn } from '@/components/entities/NegocioColumn';


export type ISimpleResponse = {
    columnas_visibles: number[];
    estimate: number;
};

export type IResponseWithColumns = {
    columnas_visibles: NegocioColumn[];
    estimate: number;
};

export interface TIncludeColumns {
    include_columns?: boolean;
}
export type TProbeResult<T extends { include_columns?: boolean; }> = T['include_columns'] extends true ? IResponseWithColumns : ISimpleResponse;
