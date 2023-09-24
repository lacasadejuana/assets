import { getSelectControl } from '../decorators';
import getFieldAndNegocio from '../decorators/get_field_and_negocio';
import normalizeAndPersistValues from '../decorators/normalize_and_persist_values';
/**
 *
 * @param param0
 * @returns
 */
export function inlineEditMainFieldsData({ id_negocio, slug_name, cell_editing, auto_open, auto_save = false, local_editing = false, library }) {
    return {
        local_editing,
        tomselect: null,
        focus: false,
        loading: false,
        auto_save,
        library,
        selectControl: null,
        ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
        ...getSelectControl({ auto_save, id_negocio, slug_name, auto_open, library }),
        ...normalizeAndPersistValues({ id_negocio, slug_name, auto_save }),
        init() {
            //this.negocio[this.slug_name] = String(this.negocio[this.slug_name])
            this.initial = this.negocio[this.slug_name];
            this.value = this.initial;
            this.negocio.controls.set(slug_name, this);
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
                            setTimeout(() => {
                                if (this.selectControl.wrapper) {
                                    this.selectControl.wrapper.classList.remove('hidden');
                                }
                            }, 500);
                        });
                    }
                });
                this.$watch('value', (newValue, oldValue) => {
                    console.log({ [this.slug_name]: newValue });
                    if (this.getSelectValue() != this.normalizeValue(newValue)) {
                        this.setSelectValue(this.normalizeValue(newValue), true);
                    }
                    if (this.normalizeValue(newValue) !== this.normalizeValue(oldValue))
                        return;
                });
            }
            if (cell_editing) {
                this.$nextTick(() => {
                    this.local_editing = cell_editing;
                });
            }
        },
        get value() {
            return Number(this.negocio[this.slug_name] || 0);
        },
        set value(newValue) {
            let normalized = this.normalizeValue(newValue);
            this.negocio[this.slug_name] = normalized === null ? null : Number(normalized);
        },
        get shown_value() {
            return this.field.optionMap.get(this.negocio[this.slug_name] || '');
        },
        get cell_editing() {
            return cell_editing;
        },
        set cell_editing(value) {
            cell_editing = value;
        },
        get className() {
            return [slug_name, 'negocio_cell', this.editable ? 'editable' : 'readonly'].join(' ');
        },
        get options() {
            return this.field.options.slice(0).map(opt => {
                opt.label = opt.label || opt.name;
                return opt;
            }).sort((a, b) => a.value - b.value);
        },
        clear(silent) {
            if (this.selectControl)
                this.selectControl.clear(silent);
        },
        get id() {
            return 'select_' + this.slug_name + '-' + this.negocio.id;
        },
        get attr_type() {
            return this.field.attr_type;
        },
        get visible() {
            return this.field.visible;
        },
        get tooltip() {
            return this.editable ? false : 'Este campo no se puede editar en esta etapa del negocio';
        },
        get editable() {
            return [1, 2, 0].includes(Number(this.negocio.id_etapa_negocio)) || this.negocio.id_etapa_negocio === undefined || this.slug_name === 'id_etapa_negocio';
        },
        get show_button() {
            return !this.cell_editing || !this.editable;
        },
        get show_form() {
            return this.cell_editing && this.editable;
        },
        focus_target: {
            local_editing: false,
            [':class']() {
                return {
                    'ring-1': this.focus,
                    'inline_select': this.editable,
                    'readonly_inner': !this.editable,
                    'align-items-center': true,
                    'justify-content-center': true,
                    //'hidden': this.local_editing,
                    'flex': !this.local_editing,
                    'focus_target': true,
                    'modelable_inline_editing': true,
                    'form-select ': this.editable,
                    'border-0  bg-transparent': !this.editable,
                    'focused': this.focus,
                    'h-[2.5rem]': true,
                    'min-w-[200px]': true,
                };
            },
            ['@focus']() {
                this.focus = true;
                console.log({ $el: this.$el, negocio: this.id_negocio });
            },
            ['@keyup.escape']() {
                this.selectControl && this.closeSelectControl();
                this.$el.blur();
                this.focus = false;
            },
            ['@click.away']() {
                this.focus = false;
            },
            ['@keyup.enter']() {
                this.local_editing = this.editable ? true : false;
            },
            ['@blur']() {
                this.focus = false;
            },
            ['@click'](event) {
                if (event.which === 1) {
                    this.local_editing = this.editable ? !this.local_editing : false;
                    return;
                }
                this.$el.focus();
                this.focus = true;
            },
        }
    };
}
export default inlineEditMainFieldsData;
//# sourceMappingURL=inline_edit_main_fields.js.map