import tippy from "tippy.js";
import getFieldAndNegocio from "../decorators/get_field_and_negocio";
export const inlineEditTextArea = ({ id_negocio, slug_name, auto_save = true }) => ({
    ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
    local_editing: false,
    get shown_value() {
        return this.$store.campos_busqueda.getShownValue(this.negocio, this.slug_name);
    },
    close: false,
    init() {
        this.initialValue = String(this.negocio[this.slug_name] ?? '').replace('[null]', '').replace('null', '');
    },
    /**
     * A method that closes the tooltip in response
     * to an event emitted by the tooltip itsdelf
     * @param event
     */
    closeMeDispatch(event) {
        const newValue = event.detail;
        console.log({
            what: 'closeMeDispatch',
            tooltipInstance: this.tooltipInstance,
            newValue,
            event
        });
        if (typeof newValue === 'string')
            this.value = newValue;
        setTimeout(() => {
            this.closeMe();
        }, 100);
    },
    keyUpEscape() {
        console.log('keyUpEscape');
        this.closeMe();
    },
    closeMe() {
        console.log({ event: 'closeMe' });
        this.close = true;
        if (this.tooltipInstance)
            this.tooltipInstance.hide();
    },
    get value() {
        return String(this.negocio[this.slug_name] ?? '').replace('[null]', '').replace('null', '');
    },
    set value(newValue) {
        if (newValue.trim() === '')
            newValue = null;
        if (!this.auto_save) {
            this.negocio.set(this.slug_name, newValue);
            return;
        }
        this.negocio.setProperty(this.slug_name, newValue)
            .then(result => {
            if (result) {
                this.olvValue = this.negocio[this.slug_name];
            }
            else {
                this.negocio[this.slug_name] = this.initialValue;
            }
        }).catch(err => {
            this.negocio[this.slug_name] = this.initialValue;
        });
    },
    initialValue: '',
    tooltipInstance: null,
    createTooltip() {
        const self = this;
        this.tooltipInstance = tippy(this.$refs.input_element, {
            trigger: 'manual',
            maxWidth: '46rem',
            allowHTML: true,
            theme: 'translucent',
            interactive: true,
            placement: 'bottom',
            sticky: true,
            appendTo: this.$root,
            onHide(instance) {
                console.log({ event: 'onHide' });
                if (!self.close)
                    return false;
                self.tooltipInstance = null;
                self.close = false;
                instance.destroy();
                self.$store.negocios.tooltipInstance = null;
            },
            onShow(instance) {
                globalThis.closeMeDispatch = this;
                if (self.$store.negocios.tooltipInstance)
                    self.$store.negocios.tooltipInstance.destroy();
                self.tooltipInstance = instance;
                self.$store.negocios.tooltipInstance = instance;
            },
            content: () => document.querySelector('#textarea_tooltip').innerHTML
                .replace(/negocio_id/g, this.negocio.id)
                .replace(/name_slug/g, `'${this.field.slug_name}'`)
                .replace(/value_temporary/g, `'${this.value}'`)
        });
        this.tooltipInstance.show();
        console.log({ tooltipOptions: this.tooltipOptions });
    },
    get class() {
        return {
            'focus_target': true,
            'modelable_inline_editing': true,
            'nowrap': true,
            'bg-white': true,
            'w-full': true,
            'flex': true,
            'p-2': true,
            'focused': this.focus,
        };
    },
    focus_target: {
        'x-ref': 'input_element',
        rel: 'inline_edit_textarea',
        [':class']() {
            return this.class;
        },
        ['@click.away']() {
            this.focus = false;
        },
        ['@keyup.enter']() {
            this.local_editing = (this.field.editable || this.field.editable) ? !this.local_editing : false;
            console.log({ local_editing: this.local_editing, 'this.field.editable': this.field.editable });
            this.createTooltip();
            this.$el.focus();
            this.focus = true;
        },
        ['@keyup.escape']() {
            this.keyUpEscape();
            return this.focus = false;
        },
        ['@click'](event) {
            if (event.which == 1) {
                this.local_editing = this.field.editable;
                this.createTooltip();
            }
            this.$el.focus();
            this.focus = true;
        },
        ['@mouseup']() {
            //@ts-ignore
            this.$el.focus();
            //@ts-ignore
            this.focus = true;
        },
        ['@keyup.up']() {
            this.keyUpEscape();
            return this.arrowUp();
        },
        ['@keyup.down']() {
            this.keyUpEscape();
            return this.arrowDown();
        },
        ['@keyup.left']() {
            this.keyUpEscape();
            return this.arrowLeft();
        },
        ['@keyup.right']() {
            this.keyUpEscape();
            return this.arrowRight();
        },
    }
});
export default inlineEditTextArea;
//# sourceMappingURL=inline_edit_textarea.js.map