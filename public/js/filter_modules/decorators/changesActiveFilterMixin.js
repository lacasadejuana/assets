/**
 * This component is shown above deals datatable. When the selected value changes
 *
 * - the new filter id is persisted to the user's session AND to the database.
 * - the serviceworker is instructed to update the cached available filters
 * - the new set of available filters is retrieved
 * - the select control options are refreshed
 * - the deals are reloaded obeying the new filer, and the contents of the datatable are refreshed
 *
 *
 * The contents of the datatable are refreshed the change,
 *
 * @param csrf
 * @param onChange
 * @returns
 */
export const changesActiveFilterMixin = () => ({
    tables: false,
    get currentDisponible() {
        return (this.$store.active_filter.get(this.default_filter_id) || {});
    },
    get activeFilter() {
        return (this.$store.active_filter.properties || {});
    },
    set activeFilter(properties) {
        this.$store.active_filter.properties = properties;
    },
    get prevent_reload() {
        return this.$store.active_filter.prevent_reload;
    },
    get collapseOne() {
        return document.querySelector('#collapseOne');
    },
    get $store() {
        return {
            columnas_actuales: Alpine.store('columnas_actuales'),
            campos_busqueda: Alpine.store('campos_busqueda'),
            negocios: Alpine.store('negocios'),
            active_filter: Alpine.store('active_filter'),
            maps: Alpine.store('maps'),
            user: Alpine.store('user')
        };
    }
});
//# sourceMappingURL=changesActiveFilterMixin.js.map