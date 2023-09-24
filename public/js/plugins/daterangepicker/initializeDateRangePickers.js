import { locale } from './locale';
export const initializeDateRangePickers = async (selector = '#dateRange', options) => {
    const $input = $(selector);
    let { cancelShouldClear, onChange, ...pickerOptions } = options || {};
    let $picker = $input.data('daterangepicker'), timepickerloaded = typeof jQuery.fn.daterangepicker === 'function';
    //console.info({ $picker, $input, selector, timepickerloaded });
    if ($picker) {
        console.warn(`element already initialized`, selector);
        return $picker;
    }
    else if (!timepickerloaded) {
        console.warn(`timepicker not loaded`);
        return Promise.resolve($picker);
    }
    else if ($input.length === 0) {
        console.warn(`could not find input ${selector}`);
        return Promise.resolve($picker);
    }
    //@ts-ignore
    $input.daterangepicker({
        // autoUpdateInput: false,
        singleDatePicker: false,
        timePicker: false,
        autoUpdateInput: true,
        locale,
        ...pickerOptions
    }, onChange);
    $picker = $input.data('daterangepicker');
    performance.mark('newPicker');
    console.info('newPicker', { $picker, $input, selector });
    if (!$picker)
        return { $picker: null };
    //@ts-ignore
    let cancelBtn = $picker.container.find('.cancelBtn');
    // console.log({ $picker, $input, $element })
    if (cancelShouldClear && !cancelBtn.hasClass('dateClear')) {
        cancelBtn
            .addClass('dateClear btn-danger')
            .text('Eliminar');
    }
    $input.on('apply.daterangepicker', function (ev, picker) {
        ev.stopPropagation();
        $input.val([
            picker.startDate.format('DD/MM/YYYY'),
            picker.endDate.format('DD/MM/YYYY')
        ].join('-')).trigger('change');
        $input[0].dispatchEvent(new Event('apply_daterangepicker', ev));
    });
    $input.on('cancel.daterangepicker', function (ev, picker) {
        ev.stopPropagation();
        $input[0].dispatchEvent(new Event('cancel_daterangepicker', ev));
        if (cancelShouldClear)
            $input.val('').trigger('change');
    });
    return $picker;
};
//# sourceMappingURL=initializeDateRangePickers.js.map