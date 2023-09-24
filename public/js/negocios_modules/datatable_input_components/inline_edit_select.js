import { getFieldAndNegocio } from '../decorators/get_field_and_negocio';
import { getSelectControl } from '../decorators/get_select_control';
import { normalizeAndPersistValues } from '../decorators/normalize_and_persist_values';
export const inlineEditSelect = ({ id_negocio, slug_name, auto_open, item_editable = true, cell_editing = false, library, auto_save = false, }) => {
    return {
        selectControl: null,
        auto_save,
        library,
        auto_open,
        cell_editing: false,
        local_editing: false,
        item_editable,
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
            this.sortedOptions = this.options.slice(0);
            this.sortedOptions.sort((a, b) => a.id - b.id);
            if (this.negocio[this.slug_name]) {
                //      this.negocio[this.slug_name] = String(this.negocio[this.slug_name])
            }
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
                            let plugins = ['clear_button'];
                            if (this.options.length > 30) {
                                plugins.push('dropdown_input');
                            }
                            let userOptions = {
                                plugins,
                                options: this.options,
                            };
                            if (this.optGroups.length) {
                                userOptions = {
                                    ...userOptions,
                                    //@ts-ignore
                                    optgroups: this.optGroups,
                                    optgroupField: 'opt_group',
                                    render: {
                                        optgroup_header: function (data, escape) {
                                            return `<div class=\'optgroup-header bg-gray-200 fw-500 py-2 text-black -translate-y-2 \'>${escape(data.value)}</div>`;
                                        }
                                    }
                                };
                            }
                            this.initSelectControl(this.$refs.input_element);
                        });
                    }
                });
            }
            if (cell_editing) {
                this.$nextTick(() => {
                    this.local_editing = cell_editing;
                });
            }
            if (this.slug_name === 'barrio') {
                this.$watch('negocio.comuna', (newValue, oldValue) => {
                    console.log('Updating options for barrio');
                    if (library === 'tomselect') {
                        this.selectControl.clearOptions();
                        this.selectControl.addOptions(this.getOptions());
                        this.selectControl.refreshOptions();
                    }
                });
            }
            this.$watch('value', (newValue, oldValue) => {
                if (this.normalizeValue(newValue) === this.normalizeValue(oldValue))
                    return;
                console.table({
                    what: 'value changed',
                    slug: slug_name,
                    newValue: this.normalizeValue(newValue),
                    oldValue: this.normalizeValue(oldValue),
                });
            });
        },
        get optGroups() {
            return Array.from(new Set(this.options.map(i => i.opt_group)))
                .map(i => ({ value: i, label: i }))
                .slice(0).sort((a, b) => (String(a.label) || '').localeCompare(String(b.label) || ''));
            //optgroupField: 'class',
        },
        get options() {
            const options = [
                { id: '', value: '', name: 'Sin valor', label: 'Sin valor' },
            ].concat(this.field.options);
            if (this.slug_name === 'barrio' && this.negocio.comuna) {
                //@ts-ignore
                return options.filter(i => i.opt_group === this.negocio.comuna);
            }
            return options;
        },
        getOptions() {
            if (this.slug_name === 'barrio' && this.negocio.comuna) {
                console.info('getOptions for barrio', this.negocio.comuna);
                //@ts-ignore
                return this.options.filter(i => i.opt_group === this.negocio.comuna);
            }
            return this.options;
        },
        loading: false,
        get initial() {
            //@ts-ignore
            return this.$store.negocios.get(id_negocio)[slug_name];
        },
        get editable() {
            return true;
        },
        printTable({ stored, scalarValue }) {
            console.table({
                what: 'persistChanges',
                scalarValue,
                initial: this.initial,
                stored,
                value: this.value,
                slug_name: slug_name,
                id: this.negocio.id,
            });
        },
        get shown_value() {
            return this.field.optionMap.get((this.negocio || {})[this.slug_name] || '');
        },
        focus: false,
        focus_target: {
            focus: false,
            [':class']() {
                return {
                    'justify-content-start': true,
                    'form-select': true,
                    inline_select: auto_open,
                    focus_target: true,
                    modelable_inline_editing: !this.local_editing,
                    nowrap: true,
                    flex: !this.local_editing,
                    hidden: this.local_editing,
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
                this.local_editing = this.item_editable
                    ? !this.local_editing
                    : false;
                return (this.focus = false);
            },
            ['@keyup.tab']() {
                return (this.focus = false);
            },
            ['@blur']() {
                this.focus = false;
            },
            ['@click'](event) {
                if (event.which === 1) {
                    this.local_editing =
                        this.item_editable || this.field.editable
                            ? !this.local_editing
                            : false;
                    console.log({
                        local_editing: this.local_editing,
                        item_editable: this.item_editable,
                    });
                    return;
                }
                console.zinfo({ event });
                this.$el.focus();
                this.focus = true;
                this.$el.dispatchEvent(new InputEvent('field'));
            },
        },
    };
};
export default inlineEditSelect;
//# sourceMappingURL=inline_edit_select.js.map