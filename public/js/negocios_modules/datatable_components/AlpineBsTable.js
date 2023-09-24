import ScrollBooster from 'scrollbooster';
import { sortRows } from '../../components/decorators/sortRows';
import { createCustomSort } from './compact_table/bttColumnHandlers';
import { bootstrapTableBaseOptions, waitFor } from '../../components';
import { columnMapper } from './negocios_datatable/columnMapper';
import { initDropdownsBs } from "../../components/plugins/initDropdownsBs";
function headerStyle(column) {
    return {
        classes: 'sticky top-0 break-words',
        'x-init': "console.log('headerStyle', $el)"
    };
}
export const AlpineBsTable = () => ({
    dataStore: Alpine.store('negocios'),
    columns: [],
    bttColumns: [],
    columnVisibility: {},
    hasCheckbox: window.innerWidth > 768,
    scrollBooster: null,
    scrollableClass: '.fixed-table-body',
    destroy() {
        if (this.resizeObserver)
            this.resizeObserver.disconnect();
        if (this.scrollBooster)
            this.scrollBooster.destroy();
        this.bsTable.bootstrapTable('destroy');
        globalThis.alpineBsTable = null;
        globalThis.bsTable = null;
        console.timerInfo('alpineBsTable destroyed');
    },
    init() {
        //@ts-ignore
        this.debouncedCreateScrollBooster = Alpine.debounce(this.createScrollBooster, 500);
        this.debouncedResetHeight = Alpine.debounce(this.resetHeight, 300);
        globalThis.alpineBsTable = this;
        //Export twice to globalmap to avoid touching other references to "compact table"
        globalThis.bsTable = this;
        console.timerInfo('creating AlpineBSTable');
        this.$store.columnas_actuales.onReady().then(() => {
            console.timerInfo('received ColumnasActuales onready callback ');
            this.bsTable = this.createBsTable();
            this.bsTable.reload = this.reload.bind(this);
            this.dataStore.on('complete', () => this.reload());
            this.createScrollBooster();
            this.createResizeObserver();
            console.timerInfo('AlpineBsTable ready');
            console.timerInfo('Negocios Datatable Ready');
            this.buffer = [];
            this.columnVisibility = this.$store.columnas_actuales.columnVisibility;
            this.resetContainerSize();
            this.$store.negocios.fetchAll().then(() => {
                setTimeout(() => {
                    if (this.bsTable.bootstrapTable('getData').length === 0) {
                        this.bsTable.bootstrapTable('refresh');
                    }
                    this.$store.active_filter.opened_once = true;
                }, 1000);
                initDropdownsBs(document.querySelector('#barebone_container'));
            });
            this.$store.columnas_actuales.on('columns_updated', (columnas) => {
                //@ts-ignore
                this.refreshColumns();
            });
        });
    },
    bsTable: null,
    buffer: [],
    data: [],
    createBsTable() {
        this.bsTable = $(this.$el).bootstrapTable({
            ...this.tblOptions,
        });
        const bsTableOptions = this.getOptions();
        bsTableOptions.showButtonText = true;
        this.loadingText.innerHTML = `<div>Renderizando ${this.data.length} negocios</div>`;
        if (this.data.length < 5) {
            this.loadingText.innerHTML = `<div>Cargando negocios</div>`;
        }
        if (this.pendingNegocios > 50) {
            this.loadingText.innerHTML += `<small style="font-size:1rem">(Puedes usar la tabla mientras cargamos otros ${this.pendingNegocios} en segundo plano)</small>`;
        }
        this.showLoading();
        console.timerInfo('Received onReady callback from ColumnasActualesStore');
        this.bsTable.bootstrapTable('refreshOptions', {
            //@ts-ignore
            columns: this.mappedColumns,
        });
        this.refreshColumns();
        this.$nextTick(() => {
            this.styleThElements();
        });
        this.ongoingRequest = null;
        return this.bsTable;
    },
    reloading: false,
    ajaxRequest(params) {
        const tokenElement = document.querySelector('[name="_token"]');
        if (!tokenElement)
            throw new Error('no element matching [name="_token"]');
        const token = tokenElement.value;
        let dataParams = JSON.parse(params.data);
        const searchParams = new URLSearchParams(dataParams);
        let url = new URL(this.$store.negocios.next_page_url ?? globalThis.backendPaginator.next_page_url ?? location.href);
        url.pathname = '/api/negocios/apply_filter_ssp';
        for (const [key, value] of searchParams.entries()) {
            url.searchParams.set(key, value);
        }
        dataParams = Object.fromEntries(url.searchParams);
        let numberOffset = Number(dataParams.offset), numberLimit = Number(dataParams.limit);
        if (this.reloading) {
            return params.success({
                rows: [],
                total: 0,
                isMockResponse: true
            });
        }
        if (this.ongoingRequest)
            return this.ongoingRequest;
        this.ongoingRequest = this.$store.negocios.once('ready').then(() => {
            console.log(dataParams);
            if (this.loadedAlready < numberOffset) {
                console.error('Not enough data loaded', {
                    loadedAlready: this.loadedAlready,
                    numberOffset,
                    numberLimit,
                });
            }
            console.timerInfo({ dataParams, loadedAlready: this.loadedAlready, numberOffset });
            let rows = this.$store.negocios.properties.slice(0);
            if (dataParams.sortName) {
                let campo = this.$store.campos_busqueda.find(dataParams.sortName.replace('fecha_creacion_visual', 'created_at'));
                rows = sortRows(rows, campo, dataParams);
                if (dataParams.sortOrder === 'desc')
                    rows = rows.reverse();
            }
            if (dataParams.searchText) {
                let searchTextNormalized = dataParams.searchText.toLowerCase().normalize('NFD')
                    .replace(/\n+/, ' ')
                    .replace(/\s+/g, ' ')
                    .replace(/\p{Diacritic}/gu, '');
                rows = rows.filter(n => n.searchstring.includes(searchTextNormalized));
            }
            rows = rows.slice(numberOffset, numberLimit + numberOffset);
            this.ongoingRequest = null;
            return params.success({
                rows,
                total: this.$store.negocios.total || globalThis.backendPaginator.total,
                isMockResponse: true
            });
        });
        return this.ongoingRequest;
    },
    get loadedAlready() {
        return this.$store.negocios.properties.length;
    },
    get sspOptions() {
        const self = this;
        return {
            // pipelineSize: 50,
            sidePagination: 'server',
            queryParams: (params) => {
                //@ts-ignore
                params.from = new Date((this.$store.negocios.properties[params.drawOffset || params.offset] || { created_at: new Date().toLocaleString() }).created_at).getTime() / 1000;
                params.total = this.$store.negocios.total || globalThis.backendPaginator.total;
                // Some fields might need a different sortName than their slug_name
                if (params.sortName) {
                    let campo = this.$store.campos_busqueda.find(params.sortName);
                    if (campo && campo.sortName) {
                        //@ts-ignore
                        params.sortName = campo.dot_property;
                    }
                }
                let dataParams = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== undefined));
                console.zinfo({ dataParams });
                return dataParams;
            },
            url: '/api/negocios/apply_filter_ssp',
            //usePipeline: true,
            method: 'post',
            ajax: this.ajaxRequest.bind(this),
        };
    },
    get tblOptions() {
        let self = this;
        return {
            ...bootstrapTableBaseOptions,
            ...this.sspOptions,
            showFooter: true,
            columns: [],
            customSort: createCustomSort(this.bttColumns),
            searchOnEnterKey: false,
            customSearch: (data, term, searchBy) => {
                console.log({ data, term, searchBy });
            },
            searchSelector: '#search_compact',
            searchAccentNeutralise: true,
            trimOnSearch: false,
            //            height: this.tableHeight,
            alternativeContainer: true,
            fixedColumns: false,
            //fixedNumber: 1,
            //stickyHeader: true,
            idTable: this.$el.id,
            exportTypes: null,
            showExport: false,
            headerStyle: (headerColumn) => {
                //   console.log({ headerColumn })
                return {
                    classes: 'sticky top-0 break-words bs_table_header_cell',
                    css: { 'font-weight': 'normal', 'min-width': headerColumn.checkbox ? '50px' : '155px' },
                };
            },
            ...this.columnCheckboxOptions,
            rowAttributes: (row, index) => {
                return {
                    'x-data': `NegocioData($store.negocios.get(${row.id}))`,
                    "x-id": `['negocio_tr','negocio-${row.id}']`,
                    class: 'negocio_row ' + (self.hasCheckbox ? 'has_checkbox ' : ''),
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
            }
        };
    },
    styleThElements() {
        let thElements = Array.from(this.fixedTableBody.querySelectorAll('thead th'));
        thElements.forEach(th => {
            th.setAttribute('scope', 'col');
            //th.classList.add('negocio_table_th')
            th.classList.add('font-semibold');
            th.classList.add('z-10');
        });
        thElements[0].classList.add('left-0');
        thElements[0].classList.add('bg-white');
        thElements[0].classList.remove('z-10');
        thElements[0].classList.add('z-20');
        this.resetContainerSize();
    },
    bootstrapTable(...args) {
        return this.bsTable.bootstrapTable(...args);
    },
    /**
     * Method to inspect what exactly was passed to the table
     */
    getOptions() {
        return this.bsTable.bootstrapTable('getOptions');
    },
    removeAll() {
        this.bsTable.bootstrapTable('removeAll');
        return this;
    },
    showLoading() {
        this.bsTable.bootstrapTable('showLoading');
        return this;
    },
    columnMapper,
    get pendingNegocios() {
        return this.$store.negocios.total - this.$store.negocios.data.length;
    },
    hideLoading() {
        this.bsTable.bootstrapTable('hideLoading');
        return this;
    },
    refreshColumns() {
        this.bsTable.bootstrapTable('refreshOptions', {
            //@ts-ignore
            columns: this.mappedColumns
        });
        return this;
    },
    append(data) {
        this.bsTable.bootstrapTable('append', data);
        return this;
    },
    get mappedColumns() {
        if (!this.hasCheckbox) {
            return columnMapper(this.$store.columnas_actuales.sortedColumnDefs);
        }
        //@ts-ignore
        return [{ 'checkbox': true }].concat(columnMapper(this.$store.columnas_actuales.sortedColumnDefs)); //.concat({ 'name': 'padding', 'title': '', visible: false })
    },
    reload(data, columnsDefs) {
        //    this.showLoading();
        this.reloading = true;
        this.bsTable
            .bootstrapTable('selectPage', 1)
            .bootstrapTable('removeAll')
            //@ts-ignore    
            .bootstrapTable('refreshOptions', {
            //@ts-ignore
            columns: this.mappedColumns
        });
        waitFor(100).then(() => {
            this.reloading = false;
            //.bootstrapTable('showAllColumns')
            //.bootstrapTable('hideLoading')
            this.bsTable.bootstrapTable('refresh');
            this.createScrollBooster();
            this.debouncedResetHeight();
            this.hideLoading();
        }); /*, {
                data: data ?? this.$store.negocios.properties,
                total: this.$store.negocios.total
            });*/
        return this.bsTable;
    },
    createResizeObserver() {
        const resizeObserver = new ResizeObserver((entries) => {
            //   console.log('resizeObserver detected change');
            this.debouncedResetHeight(this.tableHeight);
        });
        this.resizeObserver = resizeObserver;
        this.resizeObserver.observe(this.fixedTableBody);
        return this.resizeObserver;
    },
    createScrollBooster() {
        if ((this.scrollBooster)) {
            this.scrollBooster.destroy();
        }
        const self = this;
        this.scrollBooster = new ScrollBooster({
            viewport: this.scrollableElement,
            content: this.$el,
            direction: 'horizontal',
            scrollMode: 'native',
            friction: 0.01,
            bounce: false,
            allowTextSelection: true,
            bounceForce: 0.00
        });
        return this.scrollBooster;
    },
    get loadingContainer() {
        return this.fixedTableBody.querySelector('.fixed-table-loading');
    },
    get loadingText() {
        return this.loadingContainer.querySelector('.loading-text');
    },
    /**
     * Methods that deal with table related HTMLElement (containers) end their heights
     */
    get scrollableElement() {
        return this.$el.closest(this.scrollableClass);
    },
    get tableHeight() {
        if (!(this.scrollableElement instanceof HTMLElement))
            return 'auto';
        let offsetTop = 10;
        return (window.innerHeight - this.scrollableElement.getBoundingClientRect().top) - offsetTop;
    },
    get negociosFullContainer() {
        const bsTableDiv = this.$el.closest('.negocios_full_container');
        if (bsTableDiv instanceof HTMLElement)
            return bsTableDiv;
        return null;
    },
    get bootstrap5Container() {
        const bsTableDiv = this.$el.closest('.bootstrap-table');
        if (bsTableDiv instanceof HTMLElement)
            return bsTableDiv;
        return null;
    },
    get fixedTableContainer() {
        let container = this.$el.closest('.fixed-table-container');
        if (container instanceof HTMLElement)
            return container;
        return null;
    },
    resetContainerSize() {
        if (this.fixedTableContainer instanceof HTMLElement) {
            requestAnimationFrame(() => {
                this.fixedTableContainer.style.maxHeight = 'unset !important';
                this.fixedTableContainer.style.height = 'unset !important';
            });
        }
    },
    get fixedTableBody() {
        return document.querySelector('.fixed-table-body');
    },
    resetHeight(height) {
        if (this.scrollableClass === '.fixed-table-body')
            return this.resetHeightClassic();
        return this.resetHeightStickyTop(height);
    },
    resetHeightStickyTop(height) {
        height = height ?? this.tableHeight;
        requestAnimationFrame(() => {
            if (this.scrollableElement instanceof HTMLElement) {
                this.scrollableElement.style.height = this.tableHeight;
                this.scrollableElement.style.maxHeight = this.tableHeight;
                this.scrollableElement.style.overflowY = 'auto';
                //this.scrollableElement.style.marginRight = '-35px';
                let negocios_datatable = this.$el;
                this.fixedTableBody.style.width = '100%';
                //this.fixedTableBody.style.height = (this.tableHeight - 60) + 'px'
                this.fixedTableBody.style.marginLeft = '-10px';
                this.fixedTableBody.style.marginLeft = 0;
                this.fixedTableBody.style.overflowY = 'unset';
                this.fixedTableBody.style.overflowX = 'unset ';
                //@ts-ignore
                if (negocios_datatable)
                    negocios_datatable.querySelector('tbody').style.transform = 'translateY(0)';
                if (this.fixedTableContainer) {
                    this.fixedTableContainer.style.height = 'unset !important';
                    this.fixedTableContainer.style.maxHeight = 'unset !important';
                    this.fixedTableContainer.style.overflowY = 'unset';
                    this.fixedTableContainer.style.paddingBottom = '0px !important';
                    this.fixedTableContainer.style.position = 'sticky';
                    this.fixedTableContainer.style.top = '0px'; // = this.tableHeight;
                    this.fixedTableContainer.style.zIndex = '50';
                    this.fixedTableContainer.classList.add('height-unset');
                }
                this.bsTable.bootstrapTable('resetView', { height });
                this.debouncedCreateScrollBooster();
            }
        });
    },
    resetHeightClassic(height) {
        if (!this.fixedTableBody)
            return;
        height = height ?? this.tableHeight;
        requestAnimationFrame(() => {
            let fixed_table_body = this.fixedTableBody, negocios_datatable = this.$el;
            fixed_table_body.style.maxHeight = this.tableHeight + 'px';
            fixed_table_body.style.height = 'auto';
            fixed_table_body.classList.add('-ml-1');
            negocios_datatable.querySelector('tbody').style.transform = 'translateY(0)';
            if (this.fixedTableContainer) {
                this.fixedTableContainer.style.paddingBottom = '0px !important';
            }
            this.bsTable.bootstrapTable('resetView', { height });
            this.debouncedCreateScrollBooster();
            this.resetContainerSize();
        });
    },
    get columnCheckboxOptions() {
        const self = this;
        return {
            onCheckAll: (rowsAfter, rowsBefore) => {
                const selection = this.bsTable.bootstrapTable('getSelections');
                selection.forEach((row) => {
                    //@ts-ignore
                    this.$store.negocios.get(row.id).checked = true;
                });
            },
            onUncheckAll: (rowsAfter, rowsBefore) => {
                const selection = this.bsTable.bootstrapTable('getSelections');
                selection.forEach((row) => {
                    //@ts-ignore
                    this.$store.negocios.get(row.id).checked = false;
                });
            },
            onCheck: (row, $element) => {
                const selection = this.bsTable.bootstrapTable('getSelections');
                //@ts-ignore
                this.$store.negocios.get(row.id).checked = true;
                //console.info({ row, $element, selection })
            },
            onUncheck: (row, $element) => {
                const selection = this.bsTable.bootstrapTable('getSelections');
                this.$store.negocios.get(row.id).checked = false;
                console.info({ row, $element, selection });
            },
            onColumnSwitch: (field, checked) => {
                console.log({ field, checked });
                self.createScrollBooster();
            }
        };
    }
});
//# sourceMappingURL=AlpineBsTable.js.map