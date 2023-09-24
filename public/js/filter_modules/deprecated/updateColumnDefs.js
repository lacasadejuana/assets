export function updateColumnDefs(filterPayload) {
    const columnasActualesStore = Alpine.store('columnas_actuales');
    columnasActualesStore
        .refreshInvisibles()
        .reloadCampos([], true);
    let { grouped_filters, ...payload } = filterPayload;
    payload.debug = globalThis.readCookie('debug_lcdj');
    return Alpine.store('active_filter').getEstimate({
        include_columns: true
    })
        .then((result) => {
        /**
         * Read the "columnas_visibles" property from the result and compare it with the current columns
         */
        //@ts-ignore
        return ifDefined(Object.values(result.columnas_visibles || (result.active_filter || {}).columnas_visibles), (backendColumnasArray) => {
            /**
             * If the backend respond with a fresh set of columnas visibles, replace the existing ones
             * In the store
             */
            //@ts-ignore
            return columnasActualesStore.reloadCampos(backendColumnasArray);
        }, () => {
            /**
             * If there arent any columnas_visibles in the response, return the existing ones
             */
            return columnasActualesStore.columnDefs;
        });
    }).catch(err => {
        console.error(err);
        return columnasActualesStore.columnDefs;
    });
}
//# sourceMappingURL=updateColumnDefs.js.map