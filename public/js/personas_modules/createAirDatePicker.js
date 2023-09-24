import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
export const createAirDatePicker = (input, persona, options = {}) => {
    return {
        persona,
        label: null,
        name: null,
        type: null,
        required: null,
        placeholder: null,
        error_message: null,
        id: null,
        init() {
            this.label = this.$el.getAttribute('label');
            this.name = this.$el.getAttribute('name');
            this.type = this.$el.getAttribute('type') || 'text';
            this.required = this.$el.getAttribute('required') || false;
            this.id = this.$el.getAttribute('id') || this.$el.getAttribute('name');
            this.persona[this.name] = this.persona[this.name] || '';
            this.input_element = input;
            input.value = input.value || '';
            this.value = input.value ?? '';
            this.initPicker();
            globalThis.airDatePicker = this;
        },
        input_element: null,
        pickr: null,
        value: input.value ?? '',
        initPicker() {
            let self = this;
            if (this.pickr instanceof AirDatepicker)
                return this.pickr;
            this.pickr = new AirDatepicker(this.input_element, {
                locale: localeEs,
                dateFormat: /*this.input_is_datetime ? 'dd-MM-yyyy HH:mm' :*/ 'dd-MM-yyyy',
                selectedDates: self.value ? [self.ISOValue] : [],
                selectMultiple: false,
                timepicker: options.input_is_datetime,
                timeformat: 'HH:mm',
                position: window.innerWidth > 768 ? 'right top' : 'left top',
                container: window.innerWidth > 768 ? self.$el : self.$el.parentElement,
                onSelect({ date, formattedDate, datepicker }) {
                    console.info({ date, formattedDate });
                    self.value = formattedDate;
                    self.pickr.hide();
                },
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
                : this.formatToISOString(this.value, !!options.input_is_datetime)).replace(/T00:00:00$/, 'T05:00:00Z');
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
                return new Date(dateString).toLocaleString('en-GB').replace(/\//g, '-').replace(', ', ' ').substr(0, options.input_is_datetime ? 16 : 10);
            }
            return String(dateString ?? '').replace('T', ' ').replace(/\//g, '-').replace(', ', ' ').replace('null', '').replace('undefined', '')
                .replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1')
                .substr(0, !!options.input_is_datetime ? 16 : 10);
        },
    };
};
//# sourceMappingURL=createAirDatePicker.js.map