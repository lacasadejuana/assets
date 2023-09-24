import { bootstrapTableBaseOptions } from '../components/alpine_definitions';
import ScrollBooster from 'scrollbooster';
import { ifDefined } from '../components';
import { registerHeightObserver } from 'element-height-observer';
import { sortRows } from '../components/decorators/sortRows';
const columns = [
    { field: 'id', title: 'id', visible: true, sortable: true, searchable: true },
    { field: 'nombre_negocio', title: 'nombre_negocio', visible: true, sortable: true, searchable: true },
    { field: 'email_persona', title: 'email_persona', visible: true, sortable: true, searchable: true },
    { field: 'cliente_premium', title: 'cliente_premium', visible: true, sortable: true, searchable: true },
    { field: 'cliente_premium_comment', title: 'cliente_premium_comment', visible: true, sortable: true, searchable: true },
    { field: 'persona_nombre_completo', title: 'persona_nombre_completo', visible: true, sortable: true, searchable: true },
    { field: 'persona_id', title: 'persona_id', visible: true, sortable: true, searchable: true },
    { field: 'origen', title: 'origen', visible: true, sortable: true, searchable: true },
    { field: 'tipo_negocio', title: 'tipo_negocio', visible: true, sortable: true, searchable: true },
    { field: 'tipo_propiedad', title: 'tipo_propiedad', visible: true, sortable: true, searchable: true },
    { field: 'extra_attributes', title: 'extra_attributes', visible: true, sortable: true, searchable: true },
    { field: 'negocio_id', title: 'negocio_id', visible: true, sortable: true, searchable: true },
    { field: 'deleted_at', title: 'deleted_at', visible: true, sortable: true, searchable: true },
    { field: 'created_at', title: 'created_at', visible: true, sortable: true, searchable: true },
    { field: 'updated_at', title: 'updated_at', visible: true, sortable: true, searchable: true },
    { field: 'persona', title: 'persona', visible: true, sortable: true, searchable: true },
    { field: 'negocio', title: 'negocio', visible: true, sortable: true, searchable: true },
    { field: 'precio_min', title: 'precio_min', visible: true, sortable: true, searchable: true },
    { field: 'precio_max', title: 'precio_max', visible: true, sortable: true, searchable: true },
    { field: 'region', title: 'region', visible: true, sortable: true, searchable: true },
    { field: 'barrios', title: 'barrios', visible: true, sortable: true, searchable: true },
    { field: 'comunas', title: 'comunas', visible: true, sortable: true, searchable: true },
    { field: 'comentario', title: 'comentario', visible: true, sortable: true, searchable: true },
    { field: 'dormitorios_min', title: 'dormitorios_min', visible: true, sortable: true, searchable: true },
    { field: 'dormitorios_max', title: 'dormitorios_max', visible: true, sortable: true, searchable: true },
    { field: 'plazo_limite', title: 'plazo_limite', visible: true, sortable: true, searchable: true },
    { field: 'acepta_mascotas', title: 'acepta_mascotas', visible: true, sortable: true, searchable: true },
    { field: 'banos_completos_min', title: 'banos_completos_min', visible: true, sortable: true, searchable: true },
    { field: 'banos_completos_max', title: 'banos_completos_max', visible: true, sortable: true, searchable: true },
    { field: 'ready', title: 'ready', visible: true, sortable: true, searchable: true },
];
export const bootstrapPreferenciasComponent = ({ dataStore, computedScroll }) => {
    return {
        dataStore,
        bsTable: null,
        tooltipButton() {
            return {
                btnUsersAdd: {
                    text: 'Editar Selección',
                    icon: 'fa fa-cog',
                    event: () => {
                        const selection = $(this.$el).bootstrapTable('getSelections');
                        console.info({ selection });
                    },
                    attributes: {
                        title: 'Search all users which has logged in the last week'
                    }
                },
            };
        },
        updateSelectedCount() {
            const selection = $(this.$el).bootstrapTable('getSelections');
            //@ts-ignore
            this.dataStore.selectedRows = selection;
            return selection;
        },
        //data-cookie="true" data-cookie-id-table="preferencias_table"
        get tblOptions() {
            return {
                ...bootstrapTableBaseOptions,
                ...this.sspOptions,
                alternativeContainer: true,
                searchSelector: '#search_compact',
                // fixedColumns: true,
                // fixedNumber: 2,
                trimOnSearch: false,
                columns,
                //customSort: createCustomSort(columns),
                //height: (window.innerHeight - document.querySelector('.fixed-table-container').getBoundingClientRect().top) - 125,
                idTable: 'preferencias_table',
                resizable: false,
                search: true,
                //advancedSearch: true,
                //showRefresh: true,
                buttonsAlign: 'right',
                paginationVAlign: 'top',
                paginationHAlign: 'right',
                paginationDetailHAlign: 'left',
                showColumnsSearch: true,
                rowAttributes: (row, index) => {
                    return {
                        // 'x-data': `estadoFormDataInline($store.solicitudes.get(${row.id}),${row.id})`,
                        'rel': 'estadoFormDataInline'
                    };
                },
                //addrbar: true,
                selectItemName: 'id',
                showPaginationSwitch: true,
                // filterControl: true,
                //fixedColumns: true,
                //fixedNumber: 2,
                //stickyHeader: true,
                //showSearchButton: true,
                onCheckSome: (rows) => {
                    const selection = this.updateSelectedCount();
                    //console.info({ onCheckSome: rows, selection })
                },
                onUncheckSome: (rows) => {
                    const selection = this.updateSelectedCount();
                    //console.info({ onCheckSome: rows, selection })
                },
                onCheckAll: (rowsAfter, rowsBefore) => {
                    const selection = this.updateSelectedCount();
                    //console.info({ rowsAfter, rowsBefore, selection })
                },
                onUncheckAll: (rowsAfter, rowsBefore) => {
                    const selection = this.updateSelectedCount();
                    //console.info({ rowsAfter, rowsBefore, selection })
                },
                onCheck: (row, $element) => {
                    const selection = this.updateSelectedCount();
                    //console.info({ row, $element, selection })
                },
                onUncheck: (row, $element) => {
                    const selection = this.updateSelectedCount();
                    //console.info({ row, $element, selection })
                },
            };
        },
        createBsTable() {
            let selector = $(this.$el);
            return selector.bootstrapTable(this.tblOptions);
        },
        addDraggableBehavior() {
            let bsTable = this.bsTable;
            Array.from(this.fixedTableBody.querySelectorAll('thead th')).forEach(th => th.setAttribute('scope', 'col'));
            ifDefined(document.querySelector('.fixed-table-header'), (tableHeader) => tableHeader.style.height = '40px');
            this.createScrollBooster();
            return bsTable;
        },
        createScrollBooster() {
            let bsTable = this.bsTable;
            let fixed_table_body = this.fixedTableBody, preferencias_table = document.querySelector(this.$el.id);
            if ((bsTable.scrollBooster)) {
                bsTable.scrollBooster.destroy();
            }
            bsTable.scrollBooster = new ScrollBooster({
                viewport: fixed_table_body,
                content: this.$el,
                direction: 'horizontal',
                scrollMode: 'native',
                friction: 0.01,
                bounce: false,
                bounceForce: 0.00,
            });
        },
        get fixedTableBody() {
            return document.querySelector('.fixed-table-body');
        },
        addHeightObserver() {
            let bsTable = this.bsTable;
            bsTable.bootstrapTable('resetView', {
                paginationVAlign: 'bottom',
                paginationHAlign: 'right',
                paginationDetailHAlign: 'left',
                height: window.innerHeight - document.querySelector('.fixed-table-container').getBoundingClientRect().top + 90
            });
            /* get tableHeight() {
                  let offsetTop = 25;
                 return (window.innerHeight - document.querySelector('#table_container').getBoundingClientRect().top) - offsetTop
             },*/
            let firstBody = this.fixedTableBody, firstBodyTbody = firstBody.querySelector("tbody");
            ifDefined(document.querySelector('.fixed-table-header'), (tableHeader) => tableHeader.style.height = '40px');
            this.addDraggableBehavior();
            let debounceTimeout = null;
            registerHeightObserver(document.querySelector('.fixed-table-container'), () => {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(() => {
                    this.resetHeight();
                    this.addDraggableBehavior();
                }, 100);
            });
        },
        resetHeight() {
            this.bsTable.bootstrapTable('resetView', { height: (window.innerHeight - document.querySelector('.fixed-table-container').getBoundingClientRect().top) + 90 });
        },
        init() {
            let bsTable = this.bsTable = this.createBsTable();
            //console.info('first50', first50[0].id, first50[49].id)
            globalThis.bsTable = bsTable;
            globalThis.preferenciasTable = this;
            console.timerInfo('Preferencias Table Ready');
            this.dataStore.onReady((dataStore) => {
                this.submitSearch();
                setTimeout(() => {
                    this.addHeightObserver();
                }, 250);
            });
        },
        reloading: false,
        ongoingRequest: null,
        submitSearch() {
            let formData = new FormData(document.querySelector('#preferencias_filter_form'));
            //@ts-ignore
            dataStore.fetchAll({ append: true, limit: 500, ...Object.fromEntries(formData) }).then(() => {
                this.resetHeight();
                ifDefined(document.querySelector('.fixed-table-header'), (tableHeader) => tableHeader.style.height = '40px');
            });
        },
        get loadedAlready() {
            return this.dataStore.properties.length;
        },
        ajaxRequest(params) {
            const tokenElement = document.querySelector('[name="_token"]');
            if (!tokenElement)
                throw new Error('no element matching [name="_token"]');
            const token = tokenElement.value;
            let dataParams = JSON.parse(params.data);
            const searchParams = new URLSearchParams(dataParams);
            let url = new URL(this.dataStore.next_page_url, location.origin); //new URL(globalThis.parsedVisitsFilter.computeNewUrl());
            url.pathname = '/preferencias_busqueda';
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
            this.ongoingRequest = this.dataStore.onReady().then(() => {
                console.log(dataParams);
                if (this.loadedAlready < numberOffset) {
                    console.error('Not enough data loaded', {
                        loadedAlready: this.loadedAlready,
                        numberOffset,
                        numberLimit,
                    });
                }
                console.timerInfo({ dataParams, loadedAlready: this.loadedAlready, numberOffset });
                let rows = this.dataStore.properties.slice(0);
                if (dataParams.sortName) {
                    rows = sortRows(rows, { input_type: 'string', isDateOrDatetimeField: false }, dataParams);
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
                    total: this.dataStore.total || globalThis.backendPaginator.total,
                    isMockResponse: true
                });
            });
            return this.ongoingRequest;
        },
        get sspOptions() {
            const self = this;
            return {
                // pipelineSize: 50,
                sidePagination: 'server',
                queryParams: (params) => {
                    //@ts-ignore
                    //  params.from = (this.dataStore.properties[params.drawOffset || params.offset] || { id: 5000000 }).id
                    params.total = this.dataStore.total || globalThis.backendPaginator.total;
                    // Some fields might need a different sortName than their slug_name
                    /*if (params.sortName) {
                        let campo = this.$store.campos_busqueda.find(params.sortName);
                        if (campo && campo.sortName) {
                            //@ts-ignore
                            params.sortName = campo.dot_property
                        }
                    }*/
                    params.format = 'json';
                    let dataParams = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== undefined));
                    console.zinfo({ dataParams });
                    return dataParams;
                },
                url: '/preferencias_busqueda',
                //usePipeline: true,
                method: 'post',
                ajax: this.ajaxRequest.bind(this),
            };
        },
    };
};
//# sourceMappingURL=bootstrapPreferenciasComponent.js.map