import { VInputType } from '@lacasadejuana/types';
import { Litepicker } from 'litepicker';
import getFieldAndNegocio from '../decorators/get_field_and_negocio';
const moment = globalThis.moment;
export const inlineEditDatesData = ({ auto_save = false, id_negocio, slug_name, cell_editing, local_editing, item_editable }) => ({
    ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
    cell_editing: false,
    local_editing: false,
    item_editable,
    pickr: null,
    auto_save,
    get value() {
        return this.formatDateString(this.negocio[this.field.slug_name]);
    },
    set value(val) {
        //console.log({ [this.field.slug_name]: val })
        if (this.negocio && (this.negocio[this.field.slug_name] ?? '') !== val) {
            if (!this.auto_save || !this.cell_editing || !this.local_editing) {
                this.negocio[this.field.slug_name] = val;
                return;
            }
            this.negocio.setProperty(this.field.slug_name, val)
                .then(() => {
                this.initialValue = val;
            }).catch(err => {
                val = this.initialValue;
                this.pickr.setDate(val);
            });
        }
    },
    get input_is_datetime() {
        return this.field.id_input_type === VInputType.INPUT_DATE_TIME;
    },
    get formatted_value() {
        return this.value;
    },
    initPicker() {
        let self = this;
        return new Litepicker({
            element: this.$refs.input_element,
            lang: 'es-ES',
            format: 'DD-MM-YYYY HH:mm',
            singleMode: true,
            autoApply: false,
            setup(picker) {
                console.log({ setup: this });
                picker.on('selected', (date1, date2) => {
                    console.log({ date1: date1, date2: date2 });
                    if (!date1 || typeof date1.toLocaleString !== 'function')
                        return;
                    /**
                     *  We use locale 'en-GB' to obtain 24 hours format (instead of AM/PC)
                     *  days/months padded with 0, so we only need to replace slashes with dashes
                     * We set the value to YYYY-MM-DD which is the one we will store.
                     * The value getter will format it to DD-MM-YYYY
                     **/
                    self.value = date1.
                        toLocaleString('en-GB')
                        .replace(', ', ' ')
                        .replace(/\//g, '-')
                        .replace(/^(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1');
                });
            },
        });
    },
    get shown_value() {
        return this.formatDateString(this.value);
    },
    initialValue: null,
    formatDateString(dateString) {
        return String(dateString ?? '').replace('T', ' ').replace(/\//g, '-').replace(', ', ' ')
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
        if (this.pickr) {
            this.pickr.setDate(newValue);
        }
    },
    get pickrValue() {
        return this.formatDateString(this.pickr.getDate().toLocaleString('en-GB'));
    },
    init() {
        this.debouncedValueChanged = Alpine.debounce(this.valueChanged, 500);
        this.initialValue = this.value;
        this.negocio.controls.set(this.field.slug_name, this);
        this.$watch('value', this.formatDateString);
        this.$watch('local_editing', (editing) => {
            if (!editing || this.pickr)
                return;
            if (!/^\d{2}-\d{2}-\d{4}/.test(this.formatDateString(this.value))) {
                console.zwarn('Invalid date format', this.value);
                this.value = '';
            }
            this.pickr = this.initPicker();
            setTimeout(() => {
                this.pickr.setDate(this.value);
                this.pickr.show();
            }, 600);
        });
        globalThis.inlineEditDatesDataInstance = this;
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
            if (this.pickr)
                this.pickr.hide();
            this.focus = false;
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
        ['@keyup.enter']() {
            this.local_editing = this.field.editable ? true : false;
            if (this.pickr)
                this.pickr.show();
        },
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
//# sourceMappingURL=inline_edit_date.litepicker.js.map