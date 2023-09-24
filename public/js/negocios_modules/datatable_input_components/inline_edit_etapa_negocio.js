import { getSelectControl } from '../decorators';
import getFieldAndNegocio from '../decorators/get_field_and_negocio';
import normalizeAndPersistValues from '../decorators/normalize_and_persist_values';
/**
 *
 * @param param0
 * @returns
 */
export function inlineEditEtapaNegocioData({ id_negocio, slug_name, cell_editing, auto_open, auto_save = false, local_editing = false, library, }) {
    return {
        local_editing,
        tomselect: null,
        focus: false,
        loading: false,
        auto_save,
        library,
        selectControl: null,
        ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
        ...getSelectControl({
            auto_save,
            id_negocio,
            slug_name,
            auto_open,
            library,
        }),
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
                    console.log({
                        event: 'id_etapa_negocio_changed',
                        [this.slug_name]: newValue,
                        oldValue,
                    });
                    if (this.getSelectValue() != this.normalizeValue(newValue)) {
                        console.warn({
                            event: 'select value differs from normalized value',
                            selectValue: this.getSelectValue(),
                            normalizedValue: this.normalizeValue(newValue),
                        });
                        this.setSelectValue(this.normalizeValue(newValue), true);
                    }
                    if (this.normalizeValue(newValue) !==
                        this.normalizeValue(oldValue))
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
            this.negocio[this.slug_name] =
                normalized === null ? null : Number(normalized);
        },
        /**
         * @override method of the same name in decorator 'normalize_and_persist_values'
         * @param newValue
         * @returns Promise<unknown>
         */
        async persistChanges(newValue) {
            newValue = this.normalizeValue(newValue);
            const stored = this.negocio[slug_name];
            //alert(`tried to modify etapa from ${stored} to ${newValue}, autosave is ${this.auto_save}`);
            if (!this.auto_save) {
                this.negocio.set(this.slug_name, newValue);
                return Promise.resolve();
            }
            this.loading = true;
            return this.negocio
                .setProperty(this.slug_name, newValue)
                .then((res) => {
                this.loading = false;
                if (!res) {
                    /**
          * revert the select control value to initial value
          * while we check campo_etapa
          */
                    this.setSelectValue(stored, true);
                    return Promise.reject(new Error('reverting to ' + stored));
                }
                else {
                    console.zinfo('Persisting ' + newValue);
                    this.negocio.set(this.slug_name, newValue);
                    return;
                }
            });
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
            return [
                slug_name,
                'negocio_cell',
                this.editable ? 'editable' : 'readonly',
            ].join(' ');
        },
        get options() {
            //@ts-ignore
            let etapas = this.$store.etapas_negocio.shown_for(this.negocio.id_tipo_negocio);
            let current_etapa = etapas.find((etapa) => etapa.id == this.negocio.id_etapa_negocio);
            let current_etapa_order = current_etapa.orden;
            etapas = etapas.filter((etapa) => {
                return (etapa.orden < current_etapa_order + 2) || (etapa.id == 21);
            });
            return etapas.slice(0).sort((a, b) => a.orden - b.orden);
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
            return this.editable
                ? false
                : 'Este campo no se puede editar en esta etapa del negocio';
        },
        get editable() {
            return true;
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
                    inline_select: this.editable,
                    readonly_inner: !this.editable,
                    'align-items-center': true,
                    'justify-content-center': true,
                    //'hidden': this.local_editing,
                    flex: !this.local_editing,
                    focus_target: true,
                    modelable_inline_editing: true,
                    'form-select ': this.editable,
                    'border-0  bg-transparent': !this.editable,
                    focused: this.focus,
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
                    this.local_editing = this.editable
                        ? !this.local_editing
                        : false;
                    return;
                }
                this.$el.focus();
                this.focus = true;
            },
        },
    };
}
export default inlineEditEtapaNegocioData;
//# sourceMappingURL=inline_edit_etapa_negocio.js.map