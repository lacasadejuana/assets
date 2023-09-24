import { getSelectControl } from '../decorators';
import getFieldAndNegocio from '../decorators/get_field_and_negocio';
export const inlineEditContacto = ({ id_negocio, slug_name, auto_open, item_editable = true, library, auto_save = false }) => {
    return {
        selectControl: null,
        library,
        auto_open,
        cell_editing: false,
        local_editing: false,
        item_editable,
        auto_save,
        ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
        /**
         * "Library" is unused here. Further on TomSelect is directly instanced
         */
        ...getSelectControl({ auto_save, id_negocio, slug_name, auto_open, library }),
        get shown_value() {
            return this.$store.campos_busqueda.getShownValue(this.negocio, this.slug_name);
        },
        init() {
            if (this.negocio[this.slug_name]) {
                //       this.negocio[this.slug_name] = String(this.negocio[this.slug_name])
            }
            if (this.local_editing) {
                this.initSelectControl(this.$refs.input_element);
            }
            else {
                this.$watch('local_editing', (newValue, oldValue) => {
                    if (newValue === oldValue)
                        return;
                    if (newValue === true) {
                        this.$nextTick(() => {
                            this.initSelectControl(this.$refs.input_element);
                        });
                    }
                });
            }
            this.negocio.controls.set(this.slug_name, this);
            //console.log({ id_negocio, slug_name, filterOptions: this.options })
            this.$watch('value', (newValue, oldValue) => {
                let scalarValue = typeof newValue === 'object' ? newValue.value : newValue;
                console.log({ event: 'value changed', scalarValue, oldValue });
                this.loading = true;
                if (this.negocio && scalarValue !== oldValue) {
                    this.negocio.set(this.slug_name, scalarValue);
                    //@ts-ignore
                    // this.submitContacto(newValue);
                }
            });
        },
        get value() {
            return (this.negocio[this.field.slug_name] === '' ? null : this.negocio[this.field.slug_name]);
        },
        set value(newValue) {
            console.log({ newValue, thisvalue: this.value });
            if (this.normalizeValue(this.value) === this.normalizeValue(newValue) || !this.auto_save) {
                this.negocio[this.field.slug_name] = newValue;
            }
            this.persistChanges(newValue);
        },
        persistChanges(newValue) {
            const stored = this.normalizeValue(this.negocio[slug_name]);
            newValue = this.normalizeValue(newValue);
            //this.printTable({stored, newValue})
            if (!this.auto_save) {
                this.negocio.set(this.slug_name, newValue);
                return Promise.resolve();
            }
            this.loading = true;
            //@ts-ignore
            return this.negocio.submitContacto(slug_name, newValue).then((res) => {
                if (!res) {
                    this.setSelectValue(stored);
                    return Promise.reject(new Error('reverting to ' + stored));
                }
                return this.negocio[this.slug_name] = newValue;
            }).catch(err => {
                this.setSelectValue(stored);
                return Promise.reject(err);
            }).finally(() => {
                this.loading = false;
                this.$el.blur();
            });
        },
        onChange(event) {
        },
        get options() {
            //@ts-ignore
            return this.library === 'tomselect' ? this.field.options : Object.values(this.field.properties || []).map((c) => ({
                name: c.nombre_completo,
                value: String(c.id),
                email: c.email,
                label: `<div class='flex align-items-center'  role='option'>
                <span class='flex-grow-1'>
               ${c.nombre_completo}
               <span class='-mt-1 flex_on_open label   text-gray-500 fs-085rem'>${c.email}</span>
               </span>
           </div>`
            }));
        },
        focus: false,
        focus_target: {
            'x-model': 'cell_editing',
            'x-modelable': 'local_editing',
            'rel': 'inline_edit_contacto',
            focus: false,
            [':class']() {
                return {
                    'form-select': !this.value,
                    'max-w-[20em]': true,
                    'focus_target': true,
                    'modelable_inline_editing': true,
                    'form_select_contacto': this.value,
                    'nowrap': true,
                    'flex': !this.local_editing && this.$store.user.has_privileged_role,
                    'hidden': this.local_editing || !this.$store.user.has_privileged_role,
                    'focused': this.focus,
                };
            },
            ['@focus']() {
                this.focus = true;
                console.log({ $el: this.$el, negocio: this.id_negocio });
            },
            ['@click.away']() {
                this.focus = false;
            },
            ['@keyup.escape']() {
                this.closeSelectControl();
            },
            ['@keyup.enter']() {
                this.local_editing = this.item_editable ? !this.local_editing : false;
                return this.focus = false;
            },
            ['@keyup.tab']() {
                return this.focus = false;
            },
            ['@blur']() {
                this.focus = false;
            },
            ['@click'](event) {
                if (event.which === 1) {
                    this.local_editing = this.item_editable; // this.$store.user.has_privileged_role;
                    return;
                }
                console.log('click.prevent', event);
                this.$el.focus();
                this.focus = true;
            },
        }
    };
};
//# sourceMappingURL=inline_edit_contacto.js.map