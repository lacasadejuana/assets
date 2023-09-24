import ScrollBooster from 'scrollbooster';
import { waitFor } from '../../components';
import { detailFormatter } from './detailFormatter';
import { columnsFactory } from './columnsFactory';
import { staticFetchWrapper } from '../../components/decorators/staticFetchWrapper';
export const icons = {
    paginationSwitchDown: 'fa-caret-down-square',
    paginationSwitchUp: 'fa-caret-up-square',
    refresh: 'fa-redo',
    toggleOff: 'fa-toggle-off',
    toggleOn: 'fa-toggle-on',
    columns: 'fa-list-ul',
    detailOpen: 'fa-plus',
    detailClose: 'fa-minus',
    fullscreen: 'fa-expand',
    search: 'fa-search',
    clearSearch: 'fa-trash',
    export: 'fa-download',
    paginationSwitch: 'fa-toggle-on',
    paginationNext: 'fa-chevron-right',
    paginationPrevious: 'fa-chevron-left',
    paginationFirst: 'fa-step-backward',
    paginationLast: 'fa-step-forward',
    filterControlSwitchHide: 'fa-eye-slash',
    filterControlSwitchShow: 'fa-eye',
};
export const filtersBootstrapTableFactory = (tableSelector, userOptions) => {
    let bsTable = {
        $el: tableSelector[0],
        tableSelector,
        scrollBooster: null,
        accumFilters: {},
        clearFilters: () => tableSelector.bootstrapTable('triggerSearch', tblOptions.columns.reduce((acc, col) => {
            //@ts-ignore
            if (!col.filterControl)
                return acc;
            acc[col.field] = '';
            return acc;
        }, {})),
        setFilter(field, text) {
            this.accumFilters[field] = text;
            setTimeout(() => {
                Object.entries(this.accumFilters).forEach(([field, text]) => {
                    //@ts-ignore
                    $(`.filter_input[rel="${field}"]`).val(text);
                });
            }, 200);
        },
        getCurrentFilter: () => Array.from(document.querySelectorAll('.fixed-table-header .filter_input')).reduce((accum, el) => {
            //@ts-ignore
            let field = el.getAttribute('rel');
            let jqEl = $(el);
            let value = $(el).val() ?? '';
            accum[field] = value;
            return accum;
        }, {}),
    };
    let { token, height, ...tblOptions } = userOptions;
    let detailOptions = {
        detailView: true,
        detailViewIcon: true,
        detailViewByClick: false,
        detailFormatter: detailFormatter,
    };
    let columns = columnsFactory(bsTable, token);
    const customSearch = (data, term) => {
        let searchTextNormalized = term.toLowerCase().normalize('NFD')
            .replace(/\n+/, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\p{Diacritic}/gu, '');
        return data.filter(n => {
            return String(n.id).includes(searchTextNormalized) || n.name.includes(searchTextNormalized) || n.areas_subareas.includes(searchTextNormalized) || n.categoria.includes(searchTextNormalized) || n.author.includes(searchTextNormalized);
        });
    };
    let normalize = (text) => text.toLowerCase().normalize('NFD')
        .replace(/\n+/, ' ')
        .replace(/\s+/g, ' ')
        .replace(/\p{Diacritic}/gu, '');
    const ajaxRequest = (params) => {
        let filterStore = Alpine.store('active_filter');
        let dataParams = params.data;
        console.info({ dataParams });
        let filtrosDisponibles = filterStore.filtrosDisponibles.slice(0);
        let numberOffset = Number(dataParams.offset) || 0, numberLimit = Number(dataParams.limit) || 50;
        let rows = filtrosDisponibles.slice(numberOffset, numberLimit + numberOffset);
        if (dataParams.searchText) {
            let searchTextNormalized = normalize(dataParams.searchText);
            rows = rows.filter(n => {
                return String(n.id).includes(searchTextNormalized)
                    || normalize(n.name).includes(searchTextNormalized)
                    || normalize(n.areas_subareas).includes(searchTextNormalized)
                    || normalize(n.categoria).includes(searchTextNormalized)
                    || normalize(n.author).includes(searchTextNormalized);
            });
        }
        console.log('responding with ' + rows.length + ' rows', rows);
        return params.success({
            rows,
            total: filtrosDisponibles.length
        });
    };
    const ajaxOptions = {
        ajaxRequest,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('cache-control', 'no-cache');
        }
    };
    //@ts-ignore
    tblOptions = {
        height,
        rowAttributes: (row, index) => {
            return {
                'x-data': `{
                 get datos() {
                    return this.$store.active_filter.get(${row.id})
                 },
                 get highlighted() {
                    return this.datos.highlighted
                 },
                 init() {
                    this.$watch('highlighted',(newVal,oldVal) => {
                        if(newVal) {
                            setTimeout(()=>this.datos.highlighted = false,550)
                        } 
                    })
                 }
                }`,
                ':class': '{ "bg-green-100": highlighted }',
                class: 'negocio_row',
                'style': 'transition: background-color 0.8s ease',
                'data-toggle': 'popover',
                'data-placement': 'bottom',
                'data-trigger': 'hover',
                'data-content': [
                    'Index: ' + index,
                    'ID: ' + row.id,
                    'Name: ' + row.name,
                    'Price: ' + row.price
                ].join(', ')
            };
        },
        showRefresh: true,
        onColumnSearch(field, text) {
            setTimeout(() => {
                bsTable.setFilter(field, text);
            }, 500);
            return true;
        },
        headerStyle: (column) => {
            return {
                id: {
                    classes: 'uppercase'
                },
                public: {
                    classes: 'p-0 m-0'
                },
                updated_at: {
                    classes: 'p-0 m-0'
                },
            }[column.field];
        },
        //filterControl: true,
        //showFullscreen: true,
        //showPaginationSwitch: true,
        //showToggle: true,
        alternativeContainer: true,
        buttonsClass: 'primary',
        //filterControl: true,
        fixedColumns: false,
        fixedHeader: false,
        iconsPrefix: 'fas',
        idField: 'id',
        locale: 'es-CL',
        pageList: [10, 25, 50, 100, 'all'],
        pageSize: 25,
        pagination: true,
        ...detailOptions,
        paginationDetailHAlign: 'left',
        paginationHAlign: 'right',
        paginationVAlign: 'both',
        showExport: true,
        showFooter: false,
        sidePagination: 'server',
        toolbarAlign: 'left',
        searchAccentNeutralise: true,
        search: true,
        searchSelector: '#search_compact',
        showColumnsSearch: false,
        showFilterControlSwitch: false,
        trimOnSearch: false,
        searchOnEnterKey: true,
        icons,
        cellStyle: (cell, row, rowIndex, colIndex) => {
            return {
                classes: 'px-1 h-4 py-0  -red-500',
                css: {
                    height: '40px'
                }
            };
        },
        columns,
        //  url: '/api/filtros/get_available_filters',
        ajaxOptions,
        ajax: (params) => ajaxRequest(params),
        customSearch: (data, term, searchBy) => customSearch(data, term, searchBy),
        responseHandler: (res) => {
            console.zinfo({ res });
            let rows = (res.rows || res).map((rraw) => {
                let { grouped_filters, filtros_and_or, ...r } = rraw;
                let query_string = r.query_string || r;
                let areas_subareas = query_string.areas_subareas || [];
                //@ts-ignore||n.areas_subareas.includes(searchTextNormalized)
                let { opt_group: categoria, ...filtro } = r;
                //@ts-ignore
                r.categoria = categoria || 'N/A';
                //@ts-ignore
                r.areas_subareas = (typeof areas_subareas === 'string') ? areas_subareas : (areas_subareas || []).sort((a, b) => a.localeCompare(b)).join(', ').replace('Área', 'Area').replace('Subárea', 'Subarea');
                //@ts-ignore
                r.estimate = query_string.estimate || 0;
                r.cant_filtros = (query_string.filtros || []).length;
                r.filtros = query_string.filtros;
                //r.filter_detail = r.query_string.filtros
                r.columnas_visibles = (typeof query_string.columnas_visibles === 'string') ? query_string.columnas_visibles : (query_string.columnas_visibles || []).length;
                r.columnas_actuales = (typeof query_string.columnas_actuales === 'string') ? query_string.columnas_actuales : (query_string.columnas_actuales || []).map(col => `<pre class="flex mx-1 my-0 border px-1">${col.slug_name}</pre>`).join(' ');
                return r;
            });
            setTimeout(() => {
                if (!document.querySelector('#toolbar'))
                    return;
                jQuery('.fixed-table-container.fixed-height').css('min-height', (window.innerHeight - document.querySelector('#toolbar')
                    .getBoundingClientRect().top) - 130);
            }, 500);
            return {
                rows,
                total: res.total || rows.length
            };
        },
        ...tblOptions
    };
    //@ts-ignore
    tableSelector.bootstrapTable(tblOptions);
    //@ts-ignore
    bsTable = {
        ...bsTable,
        tblOptions,
        resetHeight: () => {
            if (!document.querySelector('#toolbar'))
                return;
            jQuery('.fixed-table-container.fixed-height').css('height', (window.innerHeight - document.querySelector('#toolbar')
                .getBoundingClientRect().top) - 100);
        },
        bootstrapTable: new Proxy(tableSelector.bootstrapTable, {
            get(target, prop, receiver) {
                return (...args) => {
                    try {
                        return tableSelector.bootstrapTable(String(prop), ...args);
                    }
                    catch (err) {
                        console.warn(err);
                    }
                };
            }
        }),
    };
    setTimeout(() => {
        bsTable.resetHeight();
    }, 3000);
    //    bsTable.bootstrapTable.load(data)
    if (!bsTable.tableSelector || !bsTable.$el)
        return;
    setTimeout(async () => {
        bsTable.tableSelector.on('click', '.delete_filter', function (e) {
            staticFetchWrapper('/api/filtros/' + e.currentTarget.dataset.id, {
                method: 'DELETE'
            }).then(res => {
                e.currentTarget.closest('tr').classList.add('opacity-25');
                bsTable.bootstrapTable.refresh();
                console.log('deleted');
            }).catch(err => {
                console.error(err);
            });
        });
        bsTable.tableSelector.find('.detail-icon').each(function (index, element) {
            $(element).closest('td').addClass('detail_cell p-0').css('max-height', '2em');
        });
        await waitFor(1000);
        $('.clear_table_filters').on('click', () => bsTable.clearFilters());
        bsTable.scrollBooster = new ScrollBooster({
            viewport: document.querySelector('.fixed-table-body'),
            content: bsTable.$el,
            direction: 'horizontal',
            scrollMode: 'native',
            friction: 0.01,
            bounce: false,
            allowTextSelection: true,
            bounceForce: 0.00
        });
        await waitFor(1000);
        $('.fixed-table-header th').each((i, e) => {
            e.style.minWidth = e.offsetWidth + 'px';
        });
        $('.fixed-table-body td').each((i, e) => {
            e.style.minWidth = e.offsetWidth + 'px';
        });
        $('.filter-control').each(function (i, e) {
            let field = $(e).closest('th').data('field');
            $(e).find('input').first().addClass('filter_input').attr('rel', field);
            $(e).find('select').first().addClass('filter_input').attr('rel', field).find('option').first().html('&nbsp;');
        });
        bsTable.bootstrapTable.refresh();
    }, 500);
    return bsTable;
};
//# sourceMappingURL=filtersBootstrapTableFactory.js.map