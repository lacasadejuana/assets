import { VInputType } from '@lacasadejuana/types';
import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import { tap, waitFor } from '../../components/plugins';
import { getFieldAndNegocio } from "../decorators";
localeEs.timeFormat = 'HH:mm';
export const inlineEditDatesData = ({ auto_save = false, id_negocio, slug_name, cell_editing, local_editing, item_editable }) => ({
    ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
    cell_editing: false,
    local_editing: false,
    item_editable,
    pickr: null,
    auto_save,
    ready: false,
    initialValue: null,
    /**
     * Current negocoi value, without formatting
     */
    get value() {
        return (this.negocio[this.field.slug_name]);
    },
    set value(val) {
        if (!this.negocio)
            return;
        if ((this.negocio[this.field.slug_name] ?? '') === val
            || !this.auto_save
            || !this.cell_editing
            || !this.local_editing) {
            this.negocio.set(this.slug_name, this.ISOValue);
            return;
        }
        console.log('saving date', val);
        this.negocio.setProperty(this.field.slug_name, this.ISOValue)
            .then(() => {
            this.initialValue = val;
            this.$refs.input_element.value = this.pickr.formatDate(this.pickr.selectedDates[0], this.input_is_datetime
                ? 'dd-MM-yyyy HH:mm'
                : 'dd-MM-yyyy');
        }).catch(err => {
            val = this.initialValue;
            this.pickr.selectDate(val);
        });
    },
    initPicker() {
        let self = this;
        if (this.pickr instanceof AirDatepicker)
            return this.pickr;
        this.pickr = new AirDatepicker(this.$refs.input_element, {
            locale: localeEs,
            dateFormat: /*this.input_is_datetime ? 'dd-MM-yyyy HH:mm' :*/ 'dd-MM-yyyy',
            selectedDates: [this.ISOValue],
            selectMultiple: false,
            timepicker: this.input_is_datetime,
            timeformat: 'HH:mm',
            position: window.innerWidth > 768 ? 'right top' : 'left top',
            container: window.innerWidth > 768 ? this.$el : this.$el.parentElement,
            onShow: () => {
                this.pickr.id = this.pickr.$el.id;
                let otherpickr = globalThis['pickr_' + this.slug_name];
                if (otherpickr && otherpickr.id !== this.pickr.id) {
                    try {
                        otherpickr.hide();
                    }
                    catch (e) {
                    }
                }
                self.$el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                globalThis['pickr_' + this.slug_name] = this.pickr;
            },
            onSelect({ date, formattedDate, datepicker }) {
                console.info({ date, formattedDate });
            },
            buttons: [
                {
                    content: 'Aceptar',
                    className: 'custom-button-classname',
                    onClick: (dp) => {
                        let date = new Date(this.pickr.selectedDates[0]);
                        dp.selectDate(date);
                        self.value = self.formatDateString(date.toLocaleString('en-GB'));
                        self.pickr.hide();
                    }
                },
                {
                    content: 'Cancelar',
                    className: 'custom-button-cancel',
                    onClick: (dp) => {
                        dp.selectDate(this.ISOValue);
                        setTimeout(() => {
                            self.pickr.hide();
                            setTimeout(() => dp.selectDate(this.ISOValue), 500);
                        }, 250);
                    }
                }
            ]
            //container: this.$refs.input_element,
        });
        return this.pickr;
    },
    /**
 * The current negocio value, formatted as ISO
 */
    get ISOValue() {
        return ((this.pickr && this.pickr.selectedDates.length) ?
            this.pickr.selectedDates[0].toISOString()
            : this.formatToISOString(this.value)).replace(/T00:00:00$/, 'T05:00:00Z');
    },
    /**
     * Formatted value is the pickr value, formatted nively
     */
    get shown_value() {
        return this.pickr && this.pickr.selectedDates.length
            ? this.pickr.formatDate(this.pickr.selectedDates[0], this.input_is_datetime
                ? 'dd-MM-yyyy HH:mm'
                : 'dd-MM-yyyy')
            : this.formatDateString(this.value);
    },
    set shown_value(val) {
        console.log('setting formatted value to ' + val);
    },
    formatToISOString(dateString, input_is_datetime) {
        dateString = dateString ?? this.value;
        if (this.isIsoFormat(dateString))
            return dateString;
        dateString = String(dateString ?? this.value).replace('null', '').replace(/"/g, '').replace('-0 T', '-01T').replace('-0T', '-01T').replace(/T(\d{2}):(\d)::/, 'T$1:0$2:');
        if (!dateString)
            return new Date().toISOString().substr(0, 20);
        dateString = dateString.replace(', ', ' ').replace(' ', 'T').replace(/\//g, '-')
            .replace(/^(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1');
        return (dateString.substr(0, 10) + 'T' + dateString.substr(11, 5)).padEnd(19, ':00').replace(/:0$/, ':00').replace(/T:/, 'T') + 'Z';
        //.substr(0, (this || {}).input_is_datetime ? 16 : 10)
    },
    isIsoFormat(dateString) {
        return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateString);
    },
    formatDateString(dateString) {
        dateString = String(dateString ?? this.value).replace(/"/g, '').replace('-0 T', '-01T').replace('-0T', '-01T').replace(/T(\d{2}):(\d)::/, 'T$1:0$2:');
        if (this.isIsoFormat(dateString)) {
            return new Date(dateString).toLocaleString('en-GB').replace(/\//g, '-').replace(', ', ' ').substr(0, (this || {}).input_is_datetime ? 16 : 10);
        }
        return String(dateString ?? '').replace('T', ' ').replace(/\//g, '-').replace(', ', ' ').replace('null', '').replace('undefined', '')
            .replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1')
            .substr(0, (this || {}).input_is_datetime ? 16 : 10);
    },
    valueChanged(newValue, oldValue) {
        let normalizedNewValue = this.formatDateString(newValue ?? ''), normalizedOldValue = this.formatDateString(oldValue ?? '');
        if (normalizedNewValue === normalizedOldValue || !this.local_editing || !this.cell_editing)
            return;
        console.table({
            cell_editing: this.cell_editing,
            local_editing: this.local_editing,
            what: 'date changed',
            slug: this.slug_name,
            normalizedNewValue,
            normalizedOldValue,
            'this.value': this.value,
            auto_save,
            pickrtype: typeof this.pickr
        });
        //if (this.pickr) {            this.pickr.selectDate(this.formatToISOString(newValue, this.input_is_datetime))        }
    },
    init() {
        this.debouncedValueChanged = Alpine.debounce(this.valueChanged, 500);
        this.initialValue = this.shown_value;
        this.negocio.controls.set(this.field.slug_name, this);
        this.$watch('value', this.debouncedValueChanged.bind(this));
        this.$watch('local_editing', async (editing) => {
            if (!editing || this.pickr)
                return;
            if (!/^\d{2}-\d{2}-\d{4}/.test(this.shown_value)) {
                console.zwarn('Invalid date format', this.value);
                this.value = '';
            }
            this.pickr = this.initPicker();
            await waitFor(500);
            this.pickr.selectDate(tap(this.formatToISOString(this.value, this.input_is_datetime), (str) => {
                console.zinfo('formatted date', str);
            }));
            waitFor(399).then(() => this.$refs.input_element.value = this.shown_value);
            this.pickr.show();
            this.ready = true;
        });
    },
    get input_is_datetime() {
        return this.field.id_input_type === VInputType.INPUT_DATE_TIME;
    },
    get focus_target_classes() {
        return {
            'justify-evenly': true,
            'max-w-[20em]': true,
            'focus_target': true,
            'modelable_inline_editing': true,
            'nowrap': true,
            'flex': !this.local_editing || !this.field.editable,
            'hidden': this.local_editing && this.field.editable,
            'inline_edit_dates': true,
            'bg-gray-100': !this.field.editable,
            'pr-5': true,
            'focused': this.focus,
        };
    },
    focus: false,
    common_bindings: {
        ['@click.away']() {
            if (this.pickr)
                this.pickr.hide();
            this.focus = false;
        },
        ['@keyup.escape']() {
            if (this.pickr)
                this.pickr.hide();
        },
        ['@keyup.tab']() {
            if (this.pickr)
                this.pickr.hide();
            return this.focus = false;
        },
        ['@blur']() {
            // if (this.pickr && this.ready) this.pickr.hide()
            this.focus = false;
        },
        ['@focus']() {
            this.focus = true;
            console.log({ focus: this.focus, $el: this.$el, negocio: this.id_negocio });
            this.$el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        },
    },
    focus_target: {
        focus: false,
        rel: 'inline_edit_dates',
        'x-model': 'cell_editing',
        'x-modelable': 'local_editing',
        ['@focus']() {
            this.focus = true;
            console.log({ focus: this.focus, $el: this.$el, negocio: this.id_negocio });
        },
        //['@keyup.enter']() {
        //this.local_editing = this.field.editable ? true : false;
        ////  if (this.pickr) this.pickr.show()
        //},
        ['@keyup.space']() {
            this.local_editing = this.field.editable ? true : false;
            if (this.pickr)
                this.pickr.show();
        },
        ['@click'](event) {
            if (event.which == 1) {
                this.local_editing = (this.item_editable || this.field.editable) ? true : false;
                console.log({ local_editing: this.local_editing, 'this.field.editable': this.field.editable });
            }
            this.$el.focus();
            this.focus = true;
        },
    }
});
export default inlineEditDatesData;
//# sourceMappingURL=inline_edit_date.js.map