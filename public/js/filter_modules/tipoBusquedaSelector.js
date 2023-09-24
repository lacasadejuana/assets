/// <reference types="alpinejs" />
import TomSelect from 'tom-select';
import { enrichFilter } from './filter_manipulations/enrichFilter';
export const tipoBusquedaSelector = (filtro, filtroEnriquecido) => ({
    tomselect: null,
    init() {
        this.initTomSelect(this.$el);
        console.info({ filtro, options: this.computeAvailableOptions() });
    },
    computeAvailableOptions() {
        return Object.entries(filtroEnriquecido.operadores).reduce((accum, [key, value]) => {
            accum.push({ name: value, value: Number(key) });
            return accum;
        }, []);
    },
    computeTSettings() {
        const tsettings = {
            valueField: 'value',
            labelField: 'name',
            maxItems: 1,
            create: false,
            options: this.computeAvailableOptions(),
            hidePlaceholder: true,
            items: filtroEnriquecido.tipo_busqueda,
        };
        return { ...tsettings };
    },
    initTomSelect($el) {
        if (this.tomselect)
            return;
        const tsettings = this.computeTSettings();
        this.tomselect = new TomSelect($el, tsettings);
        this.$watch('filtroEnriquecido.operadores', (oldOperadores, newOperadores) => {
            if (oldOperadores === newOperadores)
                return;
            console.log({ oldOperadores, newOperadores });
            this.filtroEnriquecido = enrichFilter(this.filtro);
            this.tomselect.clearOptions();
            this.tomselect.addOptions(this.computeAvailableOptions);
        });
    }
});
export default tipoBusquedaSelector;
//# sourceMappingURL=tipoBusquedaSelector.js.map