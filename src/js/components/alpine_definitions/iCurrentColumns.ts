import { DttColumn } from '../DttColumn';
import { NegocioColumn } from '../entities/NegocioColumn';
import { ICamposBusqueda } from './ICamposBusqueda';
import type { INegocioRow } from './INegocioRow';
import { THandler, TeventType } from ".";


export interface iCurrentColumns extends ICamposBusqueda<'ready' | 'columns_updated'> {
    featureProperties: Record<string, string>;
    columnVisibility: Record<string, boolean>;
    columnas_visibles: DttColumn<INegocioRow>[];
    default_columns: DttColumn<INegocioRow>[];
    sortedColumnDefs: DttColumn<INegocioRow>[];
    reloadCampos(columnas_visibles: DttColumn<INegocioRow>[], reset: boolean): NegocioColumn[];
    moveColumn: (from: number, to: number) => void;
    refreshInvisibles: () => void;
    setDefaultColumns(default_columns: NegocioColumn[]): void
    get columnIds(): string[];
    columnDefs: DttColumn[];
    toggle: (string) => void;
    previouslyInvisible: string[];
    isDefaultField: (slug_name: string) => boolean;
    get visible_slugs(): string[];
    get currentSlugs(): string[];
    isVisible(slug_name: any): any;
    get(slug_name: any): any;
    at(index?: number): unknown;


}
