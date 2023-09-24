import { bootstrapTableBaseOptions } from "@lacasadejuana/types";
import ScrollBooster from 'scrollbooster';
import { waitFor } from '../../components';
import { initDropdownsBs } from "../../components/plugins/initDropdownsBs";
import { numericData } from '../decorators';
import { createCustomSort, mapColumns } from './compact_table/bttColumnHandlers';
globalThis.numericData = numericData;
export function instanceBsTable(tableElement, columns, negocioStore) {
    function headerStyle(column) {
        return {
            classes: 'sticky top-0 break-words',
        };
    }
    globalThis.bttColumns = mapColumns(columns);
    const heightElement = document.querySelector('.height-observer');
    const tblOptions = {
        ...bootstrapTableBaseOptions,
        alternativeContainer: true,
        //height: heightElement.clientHeight - 95,
        columns: globalThis.bttColumns,
        customSort: createCustomSort(columns),
        fixedColumns: false,
        //fixedNumber: 1,
        stickyHeader: true,
        headerStyle,
        idTable: 'negocios_compact',
        exportTypes: ['xlsx', 'excel', 'csv', 'pdf'],
        trimOnSearch: false,
        rowAttributes: (row, index) => {
            return {
                'x-data': `{
                 get datos() {
                    return this.$store.negocios.get(${row.id})
                 }
                }`,
                class: 'negocio_row',
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
    const bsTable = $(tableElement).bootstrapTable(tblOptions);
    const bsTableOptions = bsTable.bootstrapTable('getOptions');
    bsTableOptions.showButtonText = true;
    let data = (negocioStore.data || []).map(negocio => ({
        acciones: '',
        ...negocio
    }));
    bsTable
        .bootstrapTable('append', data);
    async function fetchPage() {
        if (negocioStore.next_page_url && negocioStore.data.length < negocioStore.total) {
            let data = await negocioStore.next();
            bsTable
                //.bootstrapTable('showLoading')
                .bootstrapTable('append', data.map(negocio => ({
                acciones: '',
                ...negocio
            })));
            return data.length && fetchPage();
        }
        initDropdownsBs(document.querySelector('#barebone_container'));
        return globalThis.debouncedAdjustHeight();
    }
    bsTable.addDraggableBehavior = () => {
        let fixed_table_body = document.querySelector('.fixed-table-body'), negocios_compact = document.querySelector('#negocios_compact');
        if ((bsTable.scrollBooster)) {
            bsTable.scrollBooster.destroy();
        }
        negocios_compact.style.marginRight = '200px';
        fixed_table_body.style.height = 'auto';
        bsTable.scrollBooster = new ScrollBooster({
            viewport: fixed_table_body,
            content: negocios_compact,
            direction: 'horizontal',
            scrollMode: 'native',
            friction: 0.01,
            bounce: false,
            bounceForce: 0.00,
            textSelection: true,
            onClick(status, event) {
                const target = event.target;
                let should = (target.classList.contains('modelable_cell_editing')
                    //|| (target as HTMLElement).classList.contains('inline_select')
                    || target.classList.contains('item')
                    || target.classList.contains('ts-control')
                    || target.classList.contains('inline_edit_select')
                    //|| (event.target as HTMLElement).classList.contains('radiobuttongroup')
                    || target.classList.contains('modelable_inline_editing')) ? false : true;
                if (!should) {
                    setTimeout(() => {
                        bsTable.scrollBooster.setPosition(status.position);
                        setTimeout(() => {
                            bsTable.scrollBooster.setPosition(status.position);
                        }, 100);
                    });
                    event.preventDefault();
                    event.stopPropagation();
                    console.info('onclick', status.position);
                    //console.log({ event })
                    //bsTable.scrollBooster.setPosition
                }
                else {
                    console.log(target.className);
                }
                return false;
            }
        });
        Array.from(fixed_table_body.querySelectorAll('thead th')).forEach(th => {
            th.setAttribute('scope', 'col');
            th.classList.add('negocio_table_th');
        });
        return bsTable;
    };
    //@ts-ignore
    bsTable.refreshColumns = (columnsDefs) => {
        bsTable.bootstrapTable('refreshOptions', {
            columns: mapColumns(columnsDefs ? columnsDefs : Alpine.store('columnas_actuales').columnDefs)
        });
    };
    bsTable.reload = (data, columnsDefs) => {
        bsTable.bootstrapTable('selectPage', 1)
            .bootstrapTable('load', []);
        //@ts-ignore    
        bsTable.refreshColumns(columnsDefs);
        bsTable.bootstrapTable('showAllColumns')
            .bootstrapTable('hideColumn', 'id');
        waitFor(100).then(() => {
            requestAnimationFrame(() => {
                bsTable.bootstrapTable('hideLoading')
                    .bootstrapTable('load', data || Alpine.store('negocios').data)
                    .addDraggableBehavior();
            });
        });
    };
    Alpine.store('negocios').on('complete', (records) => bsTable.reload(records, Alpine.store('columnas_actuales').columnDefs));
    bsTable.addDraggableBehavior();
    fetchPage().then(() => {
        setTimeout(() => {
            bsTable.addDraggableBehavior();
        }, 200);
    });
    Alpine.store('columnas_actuales').on('columns_updated', (storeColumnasActuales) => {
        //@ts-ignore
        bsTable.refreshColumns(Alpine.store('columnas_actuales').columnDefs);
    });
    return bsTable;
}
export function initBsTable() {
    Alpine.store('columnas_actuales').once('ready').then((storeColumnasActuales) => {
        let computedScroll = document.querySelector('body > main .outer_container').clientHeight - 120, columnDefs = Object.values(storeColumnasActuales.columnDefs);
        Alpine.data('columnsData', globalThis.columnsDataFn);
        $(function () {
            const dttParams = globalThis.dttParams = {
                columnDefs,
                computedScroll,
                /**
                 * Prepend and empty column to each Negocio, to match column count of the full blown
                 * negocios table interface,  so we don't need to declare a separate one
                 */
                negocioStore: Alpine.store('negocios')
            };
            /*
            
            globalThis.columns = globalThis.dttParams.columnDefs
                .filter(c => c.name !== 'acciones').map(
                    campo => {
                        //let {                    ...campo                } = col
                        campo.field = campo.data;
                        campo.sortable = true;
                        campo.visible = true;
                        campo.searchable = true;
                        if (['nombre'].includes(campo.field)) {
                            campo.align = 'left'
                        }

                        return campo
                    });*/
            waitFor(300).then(() => {
                globalThis.bsTable = instanceBsTable(document.querySelector('#negocios_compact'), columnDefs, Alpine.store('negocios'));
            });
        });
    });
}
//# sourceMappingURL=CompactBsTable.js.map