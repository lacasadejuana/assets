/// <reference types="alpinejs" />
// <referece path="../../types/app.d.ts" />
import TomSelect from 'tom-select';
import { enrichFilter } from '../filter_manipulations/enrichFilter';
import { VInputTypeIcons } from "@lacasadejuana/types";
var formatName = function (item) {
    return ((item.first || '') + ' ' + (item.last || '')).trim();
};
export const camposBusquedaSelector = (current_filter) => ({
    name: 'camposBusquedaSelector',
    tables: false,
    tomselect: null,
    //  filtro: current_filter,
    get filtro() {
        return current_filter;
    },
    get filtroEnriquecido() {
        return enrichFilter(this.filtro);
    },
    options: [],
    get tomSettings() {
        let options = [...Object.values(this.$store.campos_busqueda.all_selectable_fields)];
        this.options = Array.from(options);
        return {
            allowEmptyOption: true,
            plugins: ['dropdown_input', 'optgroup_columns', 'change_listener'],
            //@ts-ignore
            optgroups: this.$store.campos_busqueda.optgroups,
            optgroupField: 'group',
            optgroupLabelField: 'name',
            optgroupValueField: 'group',
            lockOptgroupOrder: true,
            valueField: 'key',
            labelField: 'name',
            maxOptions: 400,
            placeholder: `Campo búsqueda`,
            maxItems: 1,
            //@ts-ignore
            options: Array.from(options),
            items: current_filter.campo_busqueda,
            searchField: ['slug_name', 'name', 'group'],
            render: {
                optgroup_header: function (data, escape) {
                    return `<div class=\'optgroup-header bg-gray-200 fw-500 py-2 text-black -translate-y-2 \'>${escape(data.name)}</div>`;
                },
                option: function (data, escape) {
                    let { id_input_type, input_type } = data, typeclass = `input-type-${id_input_type}`, icon = VInputTypeIcons[id_input_type] || 'far fa-question-circle';
                    return `<div data-selectable="" data-value="${data.slug_name},${data.attr_type}" class="${typeclass} option" role="option"  >
                    <i class="${icon} mr-2 fs-09rem"></i>
                     ${escape(data.name)}</div>`;
                },
                item: function (data, escape) {
                    let name1 = data.name, name2 = '';
                    if (data.name.length > 28) {
                        let warray = data.name.split(' ');
                        name1 = warray.slice(0, warray.length / 2).join(' ');
                        name2 = warray.slice(warray.length / 2).join(' ');
                    }
                    else {
                    }
                    let { id_input_type, input_type } = data, typeclass = `input-type-${id_input_type}`, icon = VInputTypeIcons[id_input_type] || 'fas fa-question';
                    let style = "${ !name2 ? 'padding-top:0.7em;padding-bottom:0.7em;' : '' } max-width:16opx !important;line-break:auto;";
                    return `<div title="${escape(data.name)}" class="campo_selector_item ${typeclass} ${input_type} cursor-pointer -mt-1 w-full ${name2 ? 'align-items-center two_lines' : 'align-items-start'} justify-items-start justify-content-start text-left  justify-start align-top flex flex-wrap">
                    <i class="${icon} mr-2  ${name2 ? 'mt-1' : ''} fs-09rem flex-inline" style="align-self:flex-start"></i><span style="line-height:14px" class="campo_selector_item_texto max-w-[160px]" style="${style}">${escape(name1)} ${name2 ? escape(name2) : ''}</span></div>`;
                }
            }
        };
    },
    get storeReference() {
        return (this.$store.active_filter || {}).properties || {};
    },
    get tomSelectItem() {
        return this.tomselect && this.tomselect.items[0];
    },
    initializeTomSelect() {
        if (this.tomselect)
            this.tomselect.destroy();
        //console.info({ optsVisibles: this.tomSettings.options, optgroups: this.tomSettings.optgroups })
        this.tomselect = new TomSelect(this.$el, this.tomSettings);
        this.$el.parentElement.tomselect = this.tomselect;
        this.tomselect.on('change', (value) => {
            let [slug_name, attr_type] = value.split(',');
            current_filter.campo_busqueda = value;
            this.$el.value = value;
        });
        //console.info('initialized tomselect for campoBusquedaSelector ' + this.filtro.index)
        setTimeout(() => {
            this.$el.value = current_filter.campo_busqueda;
            let items = current_filter.campo_busqueda;
            this.tomselect.addItems(items);
        }, 100);
    },
    init() {
        /**
         * This watcher is responsible of cleaning out the filter value when the field changes
         * Ideally, this should happen in the parent component "enrichedFilterData" but that one
         * mistakes the change event whenever another filter is removed.
         */
        this.$watch('filtro.xcampo_busqueda', (newCampo, oldCampo) => {
            if (JSON.stringify(newCampo) === JSON.stringify(oldCampo))
                return;
            let item = this.tomselect.items[0];
            if (this.tables) {
                //@ts-ignore
                console.table({
                    what: `Filtro ${this.filtro.index} changed campo_busqueda`,
                    from: this.name,
                    oldCampo: (oldCampo || '').split(',')[0],
                    newCampo: (newCampo || '').split(',')[0],
                    item: (item || '').split(',')[0],
                    elementValue: this.$el.value.split(',')[0],
                });
            }
            if (item === newCampo) {
                return;
            }
            this.tomselect.addItem(newCampo, true);
        });
        //console.log('initialized campo_busqueda selector')
        this.initializeTomSelect();
    }
});
export default camposBusquedaSelector;
//# sourceMappingURL=campo_busqueda_selector.js.map