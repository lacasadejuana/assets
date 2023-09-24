import { locale } from './locale';
import { parseMySqlDate, getMinScheduleableDate, moment } from '../moment.bundle';
export class DtPckr {
    constructor($el) {
        this.$el = $el;
        this.instanced_at = moment();
        this.dueInUserTZ = moment().add(-1 * new Date().getTimezoneOffset(), 'minute');
        this.internalDate = ($el.value ? parseMySqlDate($el.value) : getMinScheduleableDate());
        if ($el.value) {
            this.$el.value = this.internalDate.format('DD-MM-YYYY HH:mm');
        }
        const $input = $(this.$el);
        //@ts-ignore
        $el.parsed = this;
        if (this.date < moment().startOf('day')) {
            this.$input.addClass('non-editable').addClass('bg-gray-200');
            //@ts-ignore
        }
    }
    mergeOptions(options) {
        return {
            singleDatePicker: true,
            minDate: this.isDue ? this.date : getMinScheduleableDate(),
            startDate: this.date,
            timePicker: true,
            autoUpdateInput: false,
            opens: 'left',
            drops: 'up',
            timePickerIncrement: 5,
            timePicker24Hour: true,
            locale: {
                ...locale,
                format: 'DD-MM-YYYY HH:mm',
                applyLabel: 'Guardar',
            },
            ...options || {},
        };
    }
    get $input() {
        return $(this.$el);
    }
    get $picker() {
        return this.$input.data('daterangepicker');
    }
    get empty() {
        return this.$el.value === '';
    }
    /**
     * Theoretically, same as "isPast", but will give a leeway equal of 24hrs to edit past schedules
     * (which is already too much anyway, but the exeutives do sometimes change schedules ex-post)
     */
    get isDue() {
        return !this.empty && this.date < moment().subtract(1, 'days'); // this.dueInUserTZ
    }
    /**
     * @todo this how much leeway to allow? we're considering events to be editable up to 4 hours past their formal schedule time!!!
     * !!warning!! this is a hack, and should be removed when the timezone offset is fixed
     */
    get isEditable() {
        return this.empty || !this.isDue;
    }
    get isPast() {
        return !this.empty && this.date < this.instanced_at;
    }
    get isScheduled() {
        return !this.empty && this.date >= this.instanced_at;
    }
    dispatchCustom() {
        try {
            this.$el.dispatchEvent(new CustomEvent('apply_daterangepicker', { detail: this.$picker, bubbles: true }));
        }
        catch (e) {
            console.warn(e);
        }
    }
    clear() {
        this.$el.value = '';
        this.internalDate = undefined;
        this.dispatchCustom();
    }
    set date(date) {
        this.internalDate = date;
        this.$el.value = this.internalDate.format('DD-MM-YYYY HH:mm');
        this.dispatchCustom();
    }
    get date() {
        return this.internalDate || getMinScheduleableDate();
    }
    get iconClass() {
        return this.date < moment().startOf('day') ? 'fa-lock' : 'fa-calendar';
    }
    getOrCreatePicker() {
        if (this.$picker) {
            return this.$picker;
        }
    }
}
//# sourceMappingURL=DtPckr.js.map