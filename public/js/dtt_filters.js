import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { dropTargetsData, enrichedFilterData, filterColumnasDisponibles, parseCurrentFilter, selectedFieldSlugs, } from './filter_modules';
import { tipoBusquedaSelector } from './filter_modules';
import { itemTooltipData } from './filter_modules/';
import { filterListData } from './filter_modules';
import { createTipoBusquedaStore, applyFilter } from './filter_modules';
globalThis.filterComponents = {
    dropTargetsData,
    enrichedFilterData,
    filterColumnasDisponibles,
    itemTooltipData,
    parseCurrentFilter,
    selectedFieldSlugs,
    tipoBusquedaSelector,
};
globalThis.createTipoBusquedaStore = createTipoBusquedaStore;
globalThis.enrichedFilterData = enrichedFilterData;
globalThis.Sortable = Sortable;
globalThis.submitSearch = applyFilter;
globalThis.itemTooltipData = itemTooltipData;
globalThis.current_filter = (active_filter) => ({
    filtros: [],
    init() {
        this.filtros = active_filter.filtros;
    },
});
export async function setSearchValue(element) {
    var campoVal = String($(element).val()).split(',')[0];
    var dataType = $(element).find('option:selected').data('type');
    if (dataType == 1 || dataType == 14) {
        $.get('/selectFilterParams?campo_formulario=' + campoVal, function (dataAjax) {
            console.log(dataAjax);
            $('#valor_busqueda_select').empty().trigger('change');
            $('#valor_busqueda_select').select2({
                data: dataAjax,
                //@ts-ignore
                //@ts-ignore
                placeholder: function () {
                    $(this).data('placeholder');
                },
                allowClear: true,
                width: '100%',
                theme: 'bootstrap',
            });
            $('#valor_busqueda').css('display', 'none');
            $('#valor_busqueda_select').next('.select2-container').show();
            $('#valor_busqueda_select').attr('name', 'filtros[0][valor_busqueda]');
        });
    }
    else {
        $('#valor_busqueda').css('display', '');
        $('#valor_busqueda_select').next().hide();
        $('#valor_busqueda_select').attr('name', '');
    }
}
//globalThis.dropdownColumnasVisibles = dropdownColumnasVisibles
globalThis.parseCurrentFilter = parseCurrentFilter;
globalThis.setSearchValue = setSearchValue;
globalThis.filterColumnasDisponibles = filterColumnasDisponibles;
globalThis.selectedFieldSlugs = selectedFieldSlugs;
globalThis.filterListData = filterListData;
console.info({
    filterListData: globalThis.filterListData,
});
//# sourceMappingURL=dtt_filters.js.map