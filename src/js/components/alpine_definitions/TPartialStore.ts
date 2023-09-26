import { ICamposBusqueda, IFilterStore, INegocioStore, iCurrentColumns } from ".."

export type TPartialStore = {
    columnas_actuales: iCurrentColumns,
    campos_busqueda: ICamposBusqueda,
    negocios: INegocioStore,
    active_filter: IFilterStore
}