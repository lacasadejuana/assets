import { bootstrapTableBaseOptions } from '../components/alpine_definitions';
import { registerHeightObserver } from 'element-height-observer';
export function createBootStrapVisitas(tableElement, columns, data, computedScroll) {
    console.info({ computedScroll });
    globalThis.bttColumns = mapColumns(columns);
    function tooltipButton() {
        return {
            btnUsersAdd: {
                text: 'Editar Selección',
                icon: 'fa fa-cog',
                event: function () {
                    const selection = $(tableElement).bootstrapTable('getSelections');
                    console.info({ selection });
                },
                attributes: {
                    title: 'Search all users which has logged in the last week'
                }
            },
        };
    }
    function updateSelectedCount() {
        const selection = $(tableElement).bootstrapTable('getSelections');
        //@ts-ignore
        Alpine.store('solicitudes').selectedRows = selection;
        return selection;
    }
    //data-cookie="true" data-cookie-id-table="ordenes_visita_dtt"
    const tblOptions = {
        ...bootstrapTableBaseOptions,
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
            const selection = updateSelectedCount();
            //console.info({ onCheckSome: rows, selection })
        },
        onUncheckSome: (rows) => {
            const selection = updateSelectedCount();
            //console.info({ onCheckSome: rows, selection })
        },
        onCheckAll: (rowsAfter, rowsBefore) => {
            const selection = updateSelectedCount();
            //console.info({ rowsAfter, rowsBefore, selection })
        },
        onUncheckAll: (rowsAfter, rowsBefore) => {
            const selection = updateSelectedCount();
            //console.info({ rowsAfter, rowsBefore, selection })
        },
        onCheck: (row, $element) => {
            const selection = updateSelectedCount();
            //console.info({ row, $element, selection })
        },
        onUncheck: (row, $element) => {
            const selection = updateSelectedCount();
            //console.info({ row, $element, selection })
        },
    };
    const bsTable = $(tableElement).bootstrapTable(tblOptions);
    //console.info('first50', first50[0].id, first50[49].id)
    bsTable
        //.bootstrapTable('showLoading')
        .bootstrapTable('append', data);
    setTimeout(() => {
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
        let firstBody = document.querySelector('.fixed-table-body'), firstBodyTbody = firstBody.querySelector("tbody"), removeDraggableListener = addDraggableBehavior(firstBody, firstBodyTbody);
        bsTable.addDraggableBehavior = () => {
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
            return bsTable;
        };
        bsTable.addDraggableBehavior();
        let debounceTimeout = null;
        registerHeightObserver(document.querySelector('.fixed-table-container'), () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                globalThis.bsTable.bootstrapTable('resetView', { height: (window.innerHeight - document.querySelector('.fixed-table-container').getBoundingClientRect().top) + 90 });
                removeDraggableListener();
                removeDraggableListener = addDraggableBehavior(firstBody, firstBodyTbody);
            }, 100);
        });
    }, 250);
    console.timerInfo('Visitas Table Ready');
    return bsTable;
}
import { addDraggableBehavior } from '../components/plugins/addDraggableBehavior';
import { createCustomSort, mapColumns } from './visitasBttColumnsHandler';
import ScrollBooster from 'scrollbooster';
//# sourceMappingURL=createBootStrapVisitas.js.map