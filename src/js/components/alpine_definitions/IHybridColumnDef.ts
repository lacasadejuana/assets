import { BootstrapTableColumn } from 'bootstrap-table';
import { CampoFiltro } from "./alpine_definitions/definitions.filters";

//@ts-ignore
export type IHybridColumnDef = DataTables.ColumnDefsSettings &
    Omit<BootstrapTableColumn, 'field'> &
    Omit<CampoFiltro, 'id_input_type' | 'field'>;
