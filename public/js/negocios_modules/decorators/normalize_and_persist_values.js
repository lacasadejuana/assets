/**
 * This function is meant to extend data components adding repetitive common parts
 * @param param0
 * @returns
 */
export const normalizeAndPersistValues = ({ id_negocio, slug_name, auto_save = true, }) => {
    return {
        id_negocio,
        slug_name,
        auto_save,
        saving: false,
        loading: false,
        get negocio() {
            return this.$store.negocios.get(id_negocio);
        },
        get field() {
            //@ts-ignore
            return this.$store.campos_busqueda.find(this.slug_name);
        },
        focus: false,
        local_editing: false,
        //@ts-ignore
        get $store() {
            return {
                columnas_actuales: Alpine.store('columnas_actuales'),
                campos_busqueda: Alpine.store('campos_busqueda'),
                negocios: Alpine.store('negocios'),
                active_filter: Alpine.store('active_filter'),
            };
        },
        get xvalue() {
            return this.field.optionMap.get(
            //@ts-ignore
            this.negocio[this.field.slug_name] ?? '');
        },
        set value(newValue) {
            let scalarValue = this.normalizeValue(newValue);
            if (scalarValue != this.value) {
                if (this.id_negocio === 0) {
                    console.trace('setting ' + this.slug_name, scalarValue);
                }
                this.persistChanges(scalarValue);
            }
        },
        normalizeValue(value) {
            return !value
                ? null
                : String(typeof value === 'object' ? value.value || value : value)
                    .replace('undefined', '')
                    .replace('[null]', '')
                    .replace('null', '');
        },
        /**
         * This method explicitly sets the property value on the deal,
         * and enqueues a save operation (if auto save is enabled)
         * The setter of the `value` property is not quite the same,
         * as it might be invoked by Alpine/TomSelect/Choices binding on the input element
         * @param newValue
         * @returns Promise<unknown>
         */
        persistChanges(newValue) {
            newValue = this.normalizeValue(newValue);
            const stored = this.negocio[slug_name];
            if (!this.auto_save) {
                this.negocio.set(this.slug_name, newValue);
                return Promise.resolve();
            }
            this.loading = true;
            //@ts-ignore
            return this.negocio
                .setProperty(this.slug_name, newValue)
                .then((res) => {
                this.loading = false;
                if (!res) {
                    this.value = stored;
                    return Promise.reject(new Error('reverting to ' + stored));
                }
                else {
                    console.zinfo('Persisting ' + newValue);
                    this.value = newValue;
                }
            });
        },
    };
};
export default normalizeAndPersistValues;
//# sourceMappingURL=normalize_and_persist_values.js.map