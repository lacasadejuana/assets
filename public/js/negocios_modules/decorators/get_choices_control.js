import Choices from 'choices.js';
import { getFieldAndNegocio } from './get_field_and_negocio';
/**
* This function is meant to extend data components adding repetitive common parts
* @param param0
* @returns
*/
export const getChoicesControl = ({ id_negocio, slug_name, auto_open, auto_save }) => {
    return {
        selectControl: null,
        auto_open,
        ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
        closeSelectControl() {
            this.rescue(this.selectControl.hideDropdown.bind(this.selectControl), 500);
        },
        stored: null,
        async persistChanges(newValue) {
            return Promise.reject(new Error('You have to implement this method in your component'));
        },
        async initChoicesSelect($el, stored, options, userOptions) {
            const items = options.filter(opt => opt.value == stored);
            console.zinfo({ items });
            const choicesOptions = {
                items,
                choices: (options),
                renderChoiceLimit: -1,
                maxItemCount: 1,
                addItems: false,
                searchEnabled: options.length > 10,
                searchChoices: options.length > 10,
                searchFields: ['label', 'value'],
                position: 'auto',
                shouldSort: false,
                shouldSortItems: false,
                itemSelectText: '',
                ...userOptions
            };
            //@ts-ignore
            const choicesControl = new Choices($el, choicesOptions);
            //@ts-ignore
            this.selectControl = choicesControl;
            choicesControl.setValue(items);
            requestAnimationFrame(async () => {
                await this.rescue(choicesControl.enable.bind(choicesControl), 300);
                //choicesControl.setChoiceByValue(stored)
                console.info('Setting choice by value', stored);
                await globalThis.waitFor(500);
                if (auto_open) {
                    await this.rescue(choicesControl.showDropdown.bind(choicesControl), 500);
                }
            });
            return choicesControl;
        },
    };
};
export default getChoicesControl;
//# sourceMappingURL=get_choices_control.js.map