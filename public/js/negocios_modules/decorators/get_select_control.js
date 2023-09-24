import getChoicesControl from './get_choices_control';
import { getFieldAndNegocio } from './get_field_and_negocio';
import { getTomSelectControl } from './get_tomselect_control';
/**
 * This function is meant to extend data components adding repetitive common parts
 * @param param0
 * @returns
 */
export const getSelectControl = ({ id_negocio, slug_name, auto_open, auto_save, library }) => {
    return {
        selectControl: null,
        auto_open,
        ...getFieldAndNegocio({ auto_save, id_negocio, slug_name }),
        ...getChoicesControl({ auto_save, id_negocio, slug_name, auto_open, library: 'choices' }),
        ...getTomSelectControl({ auto_save, id_negocio, slug_name, auto_open, library: 'tomselect' }),
        get options() {
            // @ts-ignore
            return [{ id: '', value: '', name: 'Sin valor', label: 'Sin valor' }].concat(this.field.options);
        },
        input_element: null,
        async initSelectControl($el, userOptions = {}) {
            this.input_element = $el;
            if (this.selectControl)
                this.selectControl.destroy();
            const stored = String(this.negocio[slug_name]);
            if (library === 'tomselect') {
                this.selectControl = await this.initTomSelect($el, stored, this.options, userOptions);
                return this.selectControl;
            }
            this.addItemListener = (event) => {
                this.persistChanges(console.tap(event.detail.value))
                    .then(() => this.stored = event.detail.value)
                    .catch((e) => {
                    this.selectControl.setChoiceByValue(this.stored);
                });
            };
            this.selectControl = await this.initChoicesSelect($el, stored, this.options, userOptions);
            $el.addEventListener('addItem', this.addItemListener.bind(this), false);
            return this.selectControl;
            //}) 
        },
        closeSelectControl() {
            if (!this.selectControl)
                return;
            (library === 'choices')
                ? this.rescue(this.selectControl.hideDropdown.bind(this.selectControl), 500)
                //@ts-expect-error
                : this.rescue(this.selectControl.close.bind(this.selectControl), 500);
        },
        setSelectValue(value, silent) {
            if (!this.selectControl)
                return;
            if (library === 'choices') {
                if (silent) {
                    // If silent, we need to remove the listener to avoid infinite loop
                    this.input_element.removeEventListener('addItem', this.addItemListener.bind(this), false);
                    this.selectControl.setChoiceByValue(value);
                    setTimeout(() => {
                        this.input_element.addEventListener('addItem', this.addItemListener.bind(this), false);
                    }, 200);
                }
                else {
                    // Otherwise, we can just set the value
                    this.selectControl.setChoiceByValue(value);
                }
            }
            else {
                // TomSelect natively supports silent mode
                this.selectControl.addItem(value, silent);
            }
        },
        getSelectValue() {
            if (!this.selectControl)
                return '';
            if (library === 'choices') {
                return this.selectControl.getValue(true);
            }
            else {
                return this.selectControl.items[0];
            }
        },
        normalizeValue(value) {
            if (value === null)
                return null;
            const normalized = String(value ?? '').replace('undefined', '').replace('[null]', '').replace('null', '');
            return /^\d+$/.test(normalized) ? Number(normalized) : normalized;
        },
        getInputElement() {
            //@ts-ignore
            return this.$refs.input_element;
        }
    };
};
export default getSelectControl;
//# sourceMappingURL=get_select_control.js.map