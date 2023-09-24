import { moment } from '../moment.bundle';
import { DtPckr } from "./DtPckr";
export function instanceSingleDatePicker(selector, options) {
    //@ts-ignore
    const $input = $(selector);
    //@ts-ignore
    let wasEmpty = !$input.val();
    const $el = $input[0];
    const { onChange = (start, end, label) => { }, autoSave = false, cancelShouldClear = true, ...customOptions } = options || {};
    $el.parseMoment = () => {
        if (!$el.parsed)
            $el.parsed = new DtPckr($el);
        return $el.parsed.date;
    };
    const parsed = $el.parsed || new DtPckr($el);
    if (parsed.$picker) {
        console.trace('picker already instanced');
        return parsed.$picker;
    }
    if ($input.hasClass('pickerinput')) {
        console.warn('found unexpected .pickerinput class wtf');
    }
    //@ts-ignore
    $input.prop('readonly', false).addClass('bg-white').addClass('pickerinput');
    //@ts-ignore
    let maybeNewPicker = $input.daterangepicker(parsed.mergeOptions(customOptions), function (start, end, label) {
        parsed.date = start;
        console.info({ start, end });
        onChange(start, end, label);
    });
    //@ts-ignore
    let $picker = $input.data('daterangepicker');
    //console.warn({ 'maybeNewPicker': maybeNewPicker, $picker });
    //@ts-ignore
    const container = $picker.container;
    //@ts-ignore
    let cancelBtn = container.find('.cancelBtn'), 
    //@ts-ignore
    applyBtn = container.find('.applyBtn'), 
    //@ts-ignore
    $aboveMonth = container
        .find('.calendar-table')
        .closest('.drp-calendar.single');
    let $calendarHint = $aboveMonth.find('.calendar-hint');
    if ($calendarHint.length === 0)
        $calendarHint = $('<div class="calendar-hint"></div>').appendTo($aboveMonth);
    let hint = 'Agendar una fecha en este campo creará automáticamente la cita en Google Calendar';
    if (!parsed.empty) {
        hint = 'Modificar la fecha agendada actualiza automáticamente la cita en Google Calendar';
    }
    if (!globalThis.allow_edit_past_dates && parsed.date < moment().subtract(2, 'day')) {
        hint = 'No se pueden editar fechas pasadas';
        applyBtn.remove();
    }
    $calendarHint.text(hint);
    $calendarHint.prepend('<i class="fa fa-info-circle" aria-hidden="true"></i>');
    /**
     * If there's a value already, then add a clear btn
     */
    if (parsed.empty && cancelBtn.length === 1) {
        let clearBtn = cancelBtn
            .clone()
            .addClass('dateClear btn-danger')
            .text('Eliminar');
        clearBtn.on('click', () => {
            parsed.clear();
            $input.trigger('change');
        });
        clearBtn.prependTo(cancelBtn.parent());
    }
    //@ts-ignore
    $input.on('apply.daterangepicker', function (ev, picker) {
        parsed.date = picker.startDate;
        $input.trigger('change');
        $input[0].dispatchEvent(new Event('apply.daterangepicker', ev));
        console.log('event:apply datepicker', ev);
    });
    //@ts-ignore
    $input.on('cancel.daterangepicker', function (ev, picker) {
        console.log('cancel datepicker', ev);
        $input.trigger('change');
        $input[0].dispatchEvent(new Event('cancel.daterangepicker', ev));
    });
    return $picker;
}
//# sourceMappingURL=instanceSingleDatePicker.js.map