import getFieldAndNegocio from "../decorators/get_field_and_negocio";
import NumberFormatParse from 'number-format-parse';
export const inlineEditNumber = ({ auto_save = false, id_negocio, slug_name }) => {
    return {
        auto_save,
        ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
        get type_input_number() {
            return this.field.type_input_number;
        },
        get value() {
            return this.negocio[this.field.slug_name];
        },
        set value(newValue) {
            newValue = this.parseValue(newValue);
            if (this.hasChanged === false) {
                console.log({
                    what: 'no changes',
                    temporary_value: this.formatValue(this.temporary_value),
                    oldValue: this.formatValue(this.oldValue),
                    dar: this.field.type_input_number
                });
                this.$el.blur();
            }
            else if (!auto_save) {
                this.negocio.set(this.slug_name, newValue);
                this.oldValue = newValue;
            }
            else {
                this.persistChanges(newValue);
            }
        },
        formatParse: {
            stringify: (num) => String(num),
            parse: (str) => Number(str)
        },
        numberToString(num) {
            return this.formatParse.stringify(typeof num === 'number' ? num : this.strToNumber(num));
        },
        strToNumber(val) {
            if (typeof val === 'number')
                return val;
            if (val === null || val === undefined)
                return 0;
            let parsedNumber = this.formatParse.parse(String(val).replace(/,$/, ',0'));
            return isNaN(parsedNumber) ? 0 : parsedNumber;
        },
        formatterConfig: {
            style: 'decimal',
            maximumFractionDigits: 6,
            minimumFractionDigits: 1
        },
        init() {
            if (this.type_input_number || this.field.slug_name === 'contribuciones') {
                this.formatterConfig = {
                    style: 'currency',
                    currency: 'CLP',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0
                };
            }
            this.formatParse = new NumberFormatParse('es-CL', this.formatterConfig);
            this.negocio.controls.set(this.slug_name, this);
            this.tabindex = this.$el.parentElement.dataset.tabindex;
            this.temporary_value = this.formatValue(this.value);
            this.focus_target.temporary_value = this.temporary_value;
            this.oldValue = this.parseValue(this.value);
            this.$watch('value', (value, old_value) => {
                this.temporary_value = this.formatValue(value);
                if (this.parseValue(value) === this.parseValue(old_value))
                    return;
            });
            this.$watch('temporary_value', (value, old_value) => {
                this.temporary_value = this.formatValue(value);
            });
        },
        formatValue(value) {
            return this.numberToString(value);
        },
        parseValue(value) {
            return this.strToNumber(value);
        },
        get hasChanged() {
            return this.parseValue(this.temporary_value) !== this.parseValue(this.oldValue);
        },
        async persistChanges(newValue) {
            newValue = this.parseValue(newValue ?? this.temporary_value);
            return this.negocio.setProperty(this.slug_name, newValue)
                .then((res) => {
                if (!res) {
                    this.revert();
                    return Promise.reject(new Error('reverting to ' + this.oldValue));
                }
                return this.oldValue = newValue;
            })
                .catch(err => {
                this.revert();
                return Promise.reject(err);
            })
                .finally(() => {
                setTimeout(() => {
                    this.$el.dispatchEvent(new InputEvent('input'));
                    setTimeout(() => {
                        this.$el.blur();
                    }, 100);
                }, 500);
            });
        },
        revert() {
            this.negocio[this.field.slug_name] = this.parseValue(this.oldValue);
            this.temporary_value = this.formatValue(this.oldValue);
            this.$el.value = this.temporary_value;
            console.log('revert');
            this.$el.blur();
        },
        temporary_value: null,
        oldValue: null,
        focus_target: {
            [':class']() {
                return {
                    'focus_target': true,
                    'modelable_inline_editing': true,
                    'pointer-events-none': !this.field.editable,
                    'bg-gray-100': !this.field.editable,
                    'focus:ring-1': true,
                    'inline_edit_btn': true,
                    'inline_edit_number': true,
                    'inline_field': true,
                    'pl-5': true,
                    'px-2': true,
                    'text-right': true,
                    'w-[140px]': true,
                    'focused': this.focus
                };
            },
            type: 'text',
            temporary_value: null,
            ['@keyup.enter']() {
                console.log('@keyup.enter');
                this.value = this.parseValue(this.temporary_value);
            },
            ['@blur']() {
                console.log('@blur');
                this.value = this.parseValue(this.temporary_value);
            },
            ['@keyup.escape']() {
                return this.revert();
            },
            ['@click']() {
                this.$el.dispatchEvent(new InputEvent('input'));
                this.$el.focus();
            },
            ['@keydown'](e) {
                const key = e.key;
                const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
                const inputValue = e.target.value;
                const commaCount = (inputValue.match(/,/g) || []).length;
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'End' || e.key === 'Start')
                    return;
                if (e.key === ',' && (this.formatterConfig.style != 'decimal' || commaCount != 0)) {
                    e.preventDefault();
                    this.$nextTick(() => this.revert());
                    return false;
                }
                if (!validChars.includes(key) &&
                    key !== 'ArrowLeft' &&
                    key !== 'ArrowRight' &&
                    key !== 'Supr' &&
                    key !== 'Delete' &&
                    key !== 'Backspace') {
                    e.preventDefault();
                }
                let selectionStart = this.$el.selectionStart;
                let selectionEnd = this.$el.selectionEnd;
                console.info('selection ' + selectionStart + ' to ' + selectionEnd);
                this.$nextTick(() => this.$el.selectionStart = selectionStart);
                if (e.key === 'Delete') {
                    this.$nextTick(() => this.$el.selectionEnd = selectionStart);
                }
                else {
                    this.$nextTick(() => this.$el.selectionEnd = selectionEnd);
                }
            }
        }
    };
};
//# sourceMappingURL=inline_edit_number.js.map