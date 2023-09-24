/**
 * This function is meant to extend data components adding repetitive common parts
 * @param param0
 * @returns
 */
export const bsTableCommonMethods = () => {
    return {
        async rescue(cb, delay) {
            try {
                return cb();
            }
            catch (e) {
                //@ts-ignore
                console.zwarn(e.message);
                return null;
            }
        },
        get $store() {
            return {
                columnas_actuales: Alpine.store('columnas_actuales'),
                campos_busqueda: Alpine.store('campos_busqueda'),
                negocios: Alpine.store('negocios'),
                active_filter: Alpine.store('active_filter'),
                maps: Alpine.store('maps'),
                solicitudes: Alpine.store('solicitudes')
            };
        },
    };
};
export default bsTableCommonMethods;
//# sourceMappingURL=bsTableCommonMethods.js.map