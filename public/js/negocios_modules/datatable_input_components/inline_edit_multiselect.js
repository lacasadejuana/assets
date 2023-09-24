import getFieldAndNegocio from '../decorators/get_field_and_negocio';
import { getSelectControl } from '../decorators';
export const inlineEditMultiselect = ({ auto_save = false, id_negocio, slug_name, cell_editing, item_editable, auto_open, library = 'tomselect' }) => {
    return {
        cell_editing,
        local_editing: false,
        item_editable,
        auto_save,
        auto_open: !!auto_open,
        ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
        ...getSelectControl({ auto_save, id_negocio, slug_name, auto_open, library }),
        closeTomSelect() {
            this.selectControl.close();
        },
        tooltip() {
            if ((this.selectControl || {}).isOpen)
                return null;
            return (this.negocio || {})[this.slug_name] ? {
                allowHTML: true,
                placement: 'top',
                theme: 'light-border',
                content: this.current_value.sort().map(item => `<li>${item ?? ''}</li>`).join(''),
            } : false;
        },
        tomselect: null,
        init() {
            this.negocio.controls.set(slug_name, this);
            this.$watch('value', (newValue, oldValue) => {
                //  console.log({ event: 'value changed', newValue, oldValue })
                let newValueString = JSON.stringify(newValue), oldValueString = JSON.stringify(oldValue), currentValue = String(this.negocio[this.field.slug_name] ?? '').replace('[null]', '[]'), currentValueString = JSON.stringify(currentValue);
                if (newValueString === oldValueString)
                    return;
                /*console.table({
                    what: 'value changed',
                    cell_editing,
                    local_editing: this.local_editing,
                    slug: this.slug_name,
                    oldValueString,
                    newValueString,
                    currentValueString
                })*/
            });
            this.$watch('cell_editing', (editing) => {
                if (!editing)
                    return;
                setTimeout(() => {
                    this.initSelectControl(this.$refs.input_element, this.tomOptions);
                }, 500);
            });
            if (cell_editing) {
                this.auto_open = false;
                this.$nextTick(() => {
                    this.initSelectControl(this.$refs.input_element, this.tomOptions);
                });
            }
        },
        /**
         * Modified value, replaces nullish with an empty array
         */
        get current_value() {
            return Array.isArray((this.negocio || {})[this.slug_name]) ? (this.negocio || {})[this.slug_name] : [];
        },
        /**
         * Stringified value to be displayed on the table cell
         */
        get shown_value() {
            return this.current_value.join(', ') || '';
        },
        get value() {
            let maybeArray = JSON.parse(JSON.stringify(this.negocio[this.field.slug_name] ?? '[]').replace('[null]', '[]'));
            if (!Array.isArray(maybeArray))
                return [];
            return maybeArray.filter(item => item);
        },
        set value(newValue) {
            if (!Array.isArray(newValue))
                return;
            newValue = newValue.filter(item => item);
            if ((this.value || []).toString() === (newValue || []).toString())
                return;
            this.persistChanges(newValue);
        },
        async persistChanges(newValue) {
            this.loading = true;
            if (!this.negocio)
                return Promise.reject(new Error('Negocio no encontrado'));
            if (!this.auto_save)
                return this.negocio[this.slug_name] = newValue;
            //@ts-ignore
            return this.negocio.setProperty(this.slug_name, newValue).then(() => {
                this.loading = false;
                this.selectControl.addItems(newValue);
            }).catch(err => {
                this.loading = false;
                this.selectControl.addItems(this.value);
            });
        },
        get tomOptions() {
            const self = this;
            return {
                plugins: ['checkbox_options'],
                valueField: 'value',
                labelField: 'name',
                maxItems: null,
                create: false,
                multiple: true,
                options: this.field.options,
                items: this.value,
                //                dropdownParent: "body",
                onChange: (value) => {
                    console.log({ onChange: value });
                    this.value = (value);
                    //this.value = value
                },
                onFocus: (event) => {
                    this.selectControl.focus_node.classList.add('hidden');
                    this.selectControl.input.value = '';
                },
                onInitialize() {
                    if (self.auto_open) {
                        //@ts-ignore
                        this.focus();
                    }
                }
            };
        },
        focus: false,
        multiselect_bindings: {
            [':class']() {
                return {
                    'focus_target': true,
                    'form-control-sm': true,
                    'bg-white nowrap': true,
                    'inline_edit_multiselect': true,
                    'flex': true,
                    'focused': this.focus,
                    'align-baseline': true
                };
            },
            "x-ref": "input_element",
            "x-model": 'value',
            "rel": "inline_edit_multiselect",
            ['@keyup.escape']() {
                this.closeTomSelect();
            },
            "multiple": "multiple",
        },
        focus_target: {
            'x-model': 'cell_editing',
            'x-modelable': 'local_editing',
            'rel': 'inline_edit_multiselect',
            focus: false,
            [':class']() {
                return {
                    'form-select': true,
                    'max-w-[20em]': true,
                    'focus_target': true,
                    'modelable_inline_editing': true,
                    'nowrap': true,
                    'flex': !this.local_editing,
                    'hidden': this.local_editing,
                    'focused': this.focus
                };
            },
            ['@focus']() {
                this.focus = true;
            },
            ['@click.away']() {
                this.focus = false;
            },
            ['@keyup.enter']() {
                this.local_editing = this.item_editable ? !this.local_editing : false;
            },
            ['@keyup.tab']() {
                return this.focus = false;
            },
            ['@blur']() {
                this.focus = false;
            },
            ['@click'](event) {
                if (event.which === 1) {
                    this.local_editing = this.field.editable;
                }
                //console.log('click.prevent', event)
                this.$el.focus();
                this.focus = true;
            },
        }
    };
};
//# sourceMappingURL=inline_edit_multiselect.js.map