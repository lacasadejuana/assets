import { bootstrapTableBaseOptions } from '../components/alpine_definitions';
import { createCustomSort, mapColumns } from './visitasBttColumnsHandler';
import ScrollBooster from 'scrollbooster';
import { ifDefined } from '../components';
import { registerHeightObserver } from 'element-height-observer';
import { sortRows } from '../components/decorators/sortRows';
export const bootstrapVisitasComponent = (tableElement, columns, data, computedScroll) => {
    console.info({ computedScroll });
    globalThis.bttColumns = mapColumns(columns);
    return {
        dataStore: Alpine.store('solicitudes'),
        bsTable: null,
        bttColumns: globalThis.bttColumns,
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
        //data-cookie="true" data-cookie-id-table="ordenes_visita_dtt"
        get tblOptions() {
            return {
                ...bootstrapTableBaseOptions,
                ...this.sspOptions,
                alternativeContainer: false,
                searchSelector: '#search_compact',
                // fixedColumns: true,
                // fixedNumber: 2,
                trimOnSearch: false,
                columns: globalThis.bttColumns,
                customSort: createCustomSort(columns),
                //height: (window.innerHeight - document.querySelector('.fixed-table-container').getBoundingClientRect().top) - 125,
                idTable: 'ordenes_visita_dtt',
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
                        'x-data': `estadoFormDataInline($store.solicitudes.get(${row.id}),${row.id})`,
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
            let selector = $(tableElement);
            return selector.bootstrapTable(this.tblOptions);
        },
        addDraggableBehavior() {
            let bsTable = this.bsTable;
            let fixed_table_body = document.querySelector('.fixed-table-body'), negocios_compact = document.querySelector('#ordenes_visita_dtt');
            if ((bsTable.scrollBooster)) {
                bsTable.scrollBooster.destroy();
            }
            bsTable.scrollBooster = new ScrollBooster({
                viewport: fixed_table_body,
                content: negocios_compact,
                direction: 'horizontal',
                scrollMode: 'native',
                friction: 0.01,
                bounce: false,
                bounceForce: 0.00,
            });
            Array.from(fixed_table_body.querySelectorAll('thead th')).forEach(th => th.setAttribute('scope', 'col'));
            ifDefined(document.querySelector('.fixed-table-header'), (tableHeader) => tableHeader.style.height = '40px');
            return bsTable;
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
            let firstBody = document.querySelector('.fixed-table-body'), firstBodyTbody = firstBody.querySelector("tbody");
            ifDefined(document.querySelector('.fixed-table-header'), (tableHeader) => tableHeader.style.height = '40px');
            this.addDraggableBehavior();
            let debounceTimeout = null;
            registerHeightObserver(document.querySelector('.fixed-table-container'), () => {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(() => {
                    bsTable.bootstrapTable('resetView', { height: (window.innerHeight - document.querySelector('.fixed-table-container').getBoundingClientRect().top) + 90 });
                    this.addDraggableBehavior();
                }, 100);
            });
        },
        init() {
            let bsTable = this.bsTable = this.createBsTable();
            //console.info('first50', first50[0].id, first50[49].id)
            globalThis.bsTable = bsTable;
            globalThis.visitasDataTable = this;
            setTimeout(() => {
                this.addHeightObserver();
                let mainRect = document.querySelector('main').getBoundingClientRect();
                ifDefined(document.querySelector('.fixed-table-container'), container => container.style.maxWidth = `calc(98vw - ${mainRect.left}px`);
            }, 250);
            console.timerInfo('Visitas Table Ready');
            this.dataStore.onReady((dataStore) => {
                dataStore.fetchAll({ append: true, limit: 500 }).then(() => {
                    ifDefined(document.querySelector('.fixed-table-header'), (tableHeader) => tableHeader.style.height = '40px');
                });
            });
        },
        reloading: false,
        ongoingRequest: null,
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
            url.pathname = '/api/solicitud_visita';
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
                    params.from = new Date((this.dataStore.properties[params.drawOffset || params.offset] || { created_at: new Date().toLocaleString() }).created_at).getTime() / 1000;
                    params.total = this.dataStore.total || globalThis.backendPaginator.total;
                    // Some fields might need a different sortName than their slug_name
                    /*if (params.sortName) {
                        let campo = this.$store.campos_busqueda.find(params.sortName);
                        if (campo && campo.sortName) {
                            //@ts-ignore
                            params.sortName = campo.dot_property
                        }
                    }*/
                    let dataParams = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== undefined));
                    console.zinfo({ dataParams });
                    return dataParams;
                },
                url: '/api/solicitudes',
                //usePipeline: true,
                method: 'post',
                ajax: this.ajaxRequest.bind(this),
            };
        },
    };
};
//# sourceMappingURL=bootstrapVisitasComponent.js.map