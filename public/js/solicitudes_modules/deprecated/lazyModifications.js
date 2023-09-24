import { enableDateInputs, initializeDateRangePickers } from '../../plugins/daterangepicker';
export const applyAboveTableLayout = () => {
    $('#help_dropdown').addClass('col-11');
    const dataTables_wrapper = $('.dataTables_wrapper'), dataTables_length = $('.dataTables_length'), dataTables_info = $('.dataTables_info'), dataTables_paginate = $('.dataTables_paginate'), dataTables_filter = dataTables_wrapper.find('.dataTables_filter '), $after_footer = $('<div id="after_footer" class="row flex"></div>');
    dataTables_length.find('select').addClass('inline').css('max-width', '70px');
    dataTables_filter.addClass('col-6').appendTo('#search_contextual');
    $after_footer.appendTo(dataTables_info.parent()).append(dataTables_info.addClass('col-6 ml-0 fs-09rem pt-1'))
        .append(dataTables_paginate.addClass('col-6 small').addClass('justify-content-end'));
    setTimeout(() => {
        $('#help_dropdown').append($('.dataTables_length').addClass('mt-0  mb-0 float-end h-25-em'));
    }, 500);
};
export const lazyModifications = (solicitudesTable) => {
    solicitudesTable.draw();
    requestAnimationFrame(() => {
        const inputsHabilitables = $('#ordenes_visita_dtt .agendar_input:read-only+.habilitar_edicion_de_fecha_programada');
        enableDateInputs(inputsHabilitables);
        setTimeout(() => {
            initializeDateRangePickers('#dateRange', {});
        }, 3000);
    });
    $('.agregar_a_goole_calendar').on('click', function () {
        let $tr = $(this).closest('tr');
        $tr.find('.habilitar_edicion_de_fecha_programada').click();
        requestAnimationFrame(() => $tr.find('.agendar_input').click());
        return false;
    });
    $('.dataTables_scrollBody').css({ "max-height": "calc(100vh - 335px)" });
};
//# sourceMappingURL=lazyModifications.js.map