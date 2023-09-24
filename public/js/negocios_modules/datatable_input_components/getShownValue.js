import { getFieldAndNegocio } from '../decorators/get_field_and_negocio';
export const getShownValue = ({ id_negocio, slug_name, cell_editing = false, auto_open = false, item_editable = true, auto_save }, context = {}) => {
    return {
        local_editing: false,
        cell_editing,
        item_editable,
        auto_open,
        slug_name,
        focus: false,
        ...getFieldAndNegocio({ auto_save, id_negocio, slug_name }),
        get shown_value() {
            return this.field.optionMap.get((this.negocio || {})[this.slug_name] || '');
        },
        init() {
            // this.$el.querySelector('.hidden.shown_value').innerText = this.shown_value
        },
        get tabIndex() {
            if (!this.$el) {
                console.log('no $el');
                return 0;
            }
            let parentElement = this.$el.closest('.negocio_dtt_control');
            if (!parentElement)
                return 0;
            let parentId = parentElement.id;
            let regex = /(negocio_tr)-(\d+)-(.*)/.exec(parentId);
            if (!regex)
                return;
            let [prefix, rownum, colnum] = regex.slice(1);
            return `${rownum}${colnum.padStart(2, '0')}`;
        },
        ...context,
        focus_target: {
            ['@focus']() {
                this.focus = true;
                console.log({ $el: this.$el, negocio: this.id_negocio });
            },
            ['@click.away']() {
                this.focus = false;
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
                    this.local_editing = this.item_editable ? !this.local_editing : false;
                    return;
                }
                console.log('click.prevent', event);
                this.$el.focus();
                this.focus = true;
                this.$el.dispatchEvent(new InputEvent('field'));
            },
            ['@keyup.up']() {
                return this.arrowUp();
            },
            ['@keyup.down']() {
                return this.arrowDown();
            },
            ['@keyup.left']() {
                return this.arrowLeft();
            },
            ['@keyup.right']() {
                return this.arrowRight();
            },
        }
    };
};
export default getShownValue;
//# sourceMappingURL=getShownValue.js.map