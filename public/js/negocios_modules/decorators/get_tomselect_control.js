import TomSelect from 'tom-select';
import { getFieldAndNegocio } from './get_field_and_negocio';
/**
 * This function is meant to extend data components adding repetitive common parts
 * @param param0
 * @returns
 */
export const getTomSelectControl = ({ id_negocio, slug_name, auto_open, auto_save, library }) => {
    return {
        selectControl: null,
        auto_open,
        ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
        closeSelectControl() {
            this.selectControl.close();
        },
        async persistChanges(newValue) {
            return Promise.reject(new Error('You have to implement this method in your component'));
        },
        stored: null,
        async initTomSelect($el, stored, options, userOptions) {
            this.selectControl = new TomSelect($el, {
                valueField: 'value',
                maxItems: 1,
                create: false,
                plugins: ['clear_button'],
                allowEmptyOption: true,
                labelField: 'name',
                options: options,
                items: [stored],
                appendTo: this.$el.parentElement,
                xonFocus: (event) => {
                    //@ts-ignore
                    this.selectControl.focus_node.classList.add('hidden');
                    this.selectControl.input.value = '';
                },
                onChange: (newValue) => {
                    this.persistChanges(newValue)
                        .then(() => {
                        this.stored = newValue;
                    })
                        .catch((e) => {
                        //@ts-ignore
                        this.selectControl.addItem(this.stored);
                    });
                },
                ...(userOptions || {})
            });
            setTimeout(() => {
                //@ts-ignore
                if (this.auto_open)
                    this.selectControl.focus();
            }, 300);
            return this.selectControl;
        }
    };
};
export default getTomSelectControl;
//# sourceMappingURL=get_tomselect_control.js.map