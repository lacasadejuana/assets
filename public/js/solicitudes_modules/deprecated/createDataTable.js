import { addDraggableBehavior } from '../../components/plugins/addDraggableBehavior';
import { applyAboveTableLayout } from './lazyModifications';
export const createDataTable = (selector, columns, data, customOpts = {}) => {
    const dttVisitasSettings = {
        initComplete: function (oSettings, json) {
            const tableElement = $('.dataTables_wrapper .dataTables_scrollBody > table');
            tableElement.removeClass('pending');
            console.log(performance.now(), 'initComplete');
            const ordenes_visita_dtt = document.querySelector('#ordenes_visita_dtt');
            addDraggableBehavior(document.querySelector(".dataTables_scrollBody"));
            setTimeout(() => {
                applyAboveTableLayout();
            }, 500);
        },
        //  responsive: true,
        colReorder: {
            fixedColumnsLeft: 1,
            realtime: true
        },
        //buttons: ['createState', 'savedStates'],
        //        scroller: true,
        drawCallback: function (settings) {
            //@ts-ignore
            const api = globalThis.solicitudesTableApi || this.api();
            globalThis.solicitudesTableApi = api;
        },
        order: [],
        pageLength: 50,
        columns,
        createdRow: (row, data, dataIndex) => {
            $(row).attr('x-data', `estadoFormDataInline($store.solicitudes.get(${data.id}))`);
        },
        //@ts-ignore
        data,
        language: { url: '/js/dataTables/Spanish.json' },
        //scrollY: computedScroll + 'px',
        scrollX: true,
        //scrollCollapse: true,
        //@ts-ignore
        fixedColumns: { left: 1, },
        fixedHeader: true,
        processing: true,
        deferRender: true,
        dom: '<"toolbar">lfrtip',
        responsive: {
            details: {
                type: 'inline',
                target: 0,
                renderer: function (api, rowIdx, columns) {
                    const solicitud = api.row(rowIdx).data();
                    if (!solicitud)
                        return '';
                    let id_solicitud = (solicitud || {}).id;
                    console.info({ columns, solicitud, id_solicitud });
                    var data = columns.map((col, i) => {
                        let { title, data, rowIndex, columnIndex, hidden } = col;
                        if (title.toLowerCase().includes('medio')) {
                            data = data.toLowerCase();
                        }
                        return hidden ?
                            '<tr class="w-100" data-dt-row="' + rowIndex + '" data-dt-column="' + columnIndex + '">' +
                                '<td class="border text-left py-2" style="min-width:11rem;font-weight:500;font-size:1.05em;">' + title + ':' + '</td> ' +
                                '<td class="border py-2" style="width:100%;font-size:1.1em;" x-cloak>' + data + '</td>' +
                                '</tr>' :
                            '';
                    }).join('');
                    if (!data)
                        return '';
                    const table = $(`<table x-init="()=>console.log({data:$data,id_solicitud:${id_solicitud ?? 0}})" class="child_table mb-4" style="font-size:1.1em" ></table>`);
                    const template = $(`<template x-if="$data.solicitud">${data}</template>`);
                    const container = $(`<div class="child_container" x-data="estadoFormDataInline($store.solicitudes.get(${id_solicitud}))" style="width:100%;max-width:90vw;"/>`);
                    //@ts-ignore
                    container.append(table);
                    setTimeout(() => table.append(template), 500);
                    return container;
                }
            },
            breakpoints: [
                { name: 'desktop', width: Infinity },
                { name: 'tablet', width: 1024 },
                { name: 'phone', width: 768 },
            ]
        }
    };
    console.log(performance.now(), { dttVisitasSettings });
    globalThis.solicitudesTable = $(selector).DataTable({ ...dttVisitasSettings, ...customOpts });
    globalThis.solicitudesTable.on('draw', function () {
        console.log('Redraw occurred at: ' + new Date().getTime());
    });
};
//# sourceMappingURL=createDataTable.js.map