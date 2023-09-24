/**
 * This function is meant to extend data components adding repetitive common parts
 * @param param0
 * @returns
 */
export const getFiltroAndCampo = (filtro) => {
    return {
        get filtro() {
            return filtro;
        },
        get campo() {
            //@ts-ignore
            return this.$store.campos_busqueda.find(this.filtro.campo_busqueda);
        },
        flashClass($element, className, delay) {
            $element.classList.add(className);
            if (!delay) {
                this.$nextTick(() => requestAnimationFrame(() => $element.classList.remove(className)));
            }
            else {
                setTimeout(() => {
                    requestAnimationFrame(() => $element.classList.remove(className));
                }, delay);
            }
        },
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
                active_filter: Alpine.store('active_filter')
            };
        },
    };
};
export default getFiltroAndCampo;
//# sourceMappingURL=getFiltroAndCampo.js.map