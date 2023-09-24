import tippy from "tippy.js";
import { transformableBehavior } from "../../components/plugins";
import getFieldAndNegocio from "../decorators/get_field_and_negocio";
export const inlineEditCheckbox = ({ auto_save = false, id_negocio, slug_name }) => ({
    auto_save,
    //@ts-ignore
    ...getFieldAndNegocio({ id_negocio, slug_name, auto_save }),
    get checked() {
        return this.negocio[this.slug_name] ? 'on' : null;
    },
    set checked(newValue) {
        let oldValue = newValue ? null : 'on', strNewValue = newValue ? 'on' : null;
        console.table({
            slug_name,
            oldValue,
            strNewValue,
            checked: this.$refs.checkbox.checked,
            currently_checked: this.currently_checked
        });
        if (!auto_save) {
            this.negocio[this.slug_name] = strNewValue;
            return;
        }
        this.$refs.checkbox.classList.add('accent-cyan-400');
        this.$refs.checkbox.classList.add('animate-pulse');
        this.negocio.setProperty(this.slug_name, strNewValue)
            .then(() => {
            this.$refs.checkbox.checked = newValue;
        }).catch(() => {
            this.negocio[this.slug_name] = oldValue;
        }).finally(() => {
            this.$refs.checkbox.classList.remove('accent-cyan-400');
            this.$refs.checkbox.classList.remove('animate-pulse');
        });
        //this.$store.negocios.setProperty(this.negocio.id, this.slug_name, strNewValue).then(result => {
    },
    onclick() {
        this.checked = !this.checked;
    },
    dealFileUploaded(e) {
        let { id_negocio: negocio_id, slug_name: name_slug, filename: fileName } = e.detail || {};
        if (this.id_negocio == negocio_id && this.slug_name == name_slug) {
            console.log({ fileName });
            let fileItem = { fileName, folder: this.slug_name, user: this.$store.user.id, date: new Date().toISOString().split('T')[0] };
            this.files.push(fileItem);
            console.log(fileItem);
        }
    },
    get currently_checked() {
        return this.checked ? 'checked' : false;
    },
    get slug_name() {
        return slug_name;
    },
    get name_slug() {
        return slug_name;
    },
    files: [],
    ready: false,
    init() {
        this.debouncedSizeChangeListener = Alpine.debounce(this.sizeChangedListener, 1000);
        this.negocio.controls.set(this.slug_name, this);
        setTimeout(() => {
            this.ready = true;
        }, 1000);
        if (this.field.attach_files && this.negocio._extra_props) {
            this.files_slug_name = `${this.slug_name}-files`;
            this.files = this.negocio._extra_props[this.files_slug_name] || [];
            //  if (this.files.length) console.log({ files: this.files })
        }
        //console.log({ component: 'inline_edit_checkbox', slug_name, id_negocio, checked: this.checked })
    },
    close: false,
    closefilestooltip() {
        this.close = true;
        this.tooltip_open = false;
        if (!this.ready || !this.filesTooltip)
            return;
        this.filesTooltip.hide();
    },
    filesTooltip: null,
    tooltip_open: false,
    transformableElement: null,
    transformableHandle: null,
    resizeObserver: null,
    clearTransformableBehavior: null,
    create_attachment_tooltip() {
        const self = this;
        this.filesTooltip = tippy(this.$refs.input_element, {
            trigger: 'manual',
            maxWidth: '42rem',
            allowHTML: true,
            theme: 'translucent',
            interactive: true,
            placement: 'auto',
            //   placement: 'left',
            sticky: true,
            appendTo: document.body,
            arrow: false,
            onHide(instance) {
                console.log({ event: 'onHide', close: self.close });
                if (!self.close)
                    return false;
                self.filesTooltip = null;
                self.$store.negocios.filesTooltip = null;
                self.tooltip_open = false;
                console.info('tooltip closed');
                self.filesTooltip = null;
                //self.resizeObserver.disconnect()
                //self.clearTransformableBehavior()
            },
            onShow(instance) {
                if (self.$store.negocios.filesTooltip)
                    self.$store.negocios.filesTooltip.destroy();
                self.filesTooltip = instance;
                self.$store.negocios.filesTooltip = instance;
                console.info('tooltip open');
                self.tooltip_open = true;
                //setTimeout(() =>                     self.addTransformableBehavior()                }, 500)
            },
            content: () => document.querySelector('#files_tooltip').innerHTML
                .replace(/negocio_id/g, this.negocio.id)
                .replace(/name_slug/g, `'${this.field.slug_name}'`),
        });
        /* this.resizeObserver = new ResizeObserver((entries) => {
             this.debouncedSizeChangeListener();
         });*/
        this.filesTooltip.show();
    },
    sizeChangedListener() {
        console.timerInfo("Size changed");
        //if (this.clearTransformableBehavior) this.clearTransformableBehavior();
        setTimeout(() => {
            this.clearTransformableBehavior = null;
            this.addTransformableBehavior();
        }, 300);
    },
    addTransformableBehavior() {
        if (!this.filesTooltip)
            return;
        this.resizeObserver.observe(this.filesTooltip.popper);
        this.transformableElement = this.filesTooltip.popper.querySelector('.actions_dropdown');
        this.transformableHandle = this.filesTooltip.popper.querySelector('.draggable');
        this.clearTransformableBehavior = transformableBehavior(this.transformableElement, this.transformableHandle);
    },
    get attachments_tooltip() {
        const self = this;
        return {
            trigger: 'manual',
            maxWidth: '42rem',
            allowHTML: true,
            theme: 'translucent',
            interactive: true,
            placement: 'auto',
            //   placement: 'left',
            sticky: true,
            appendTo: document.body,
            arrow: false,
            onHide(instance) {
                console.log({ event: 'onHide', close: self.close });
                if (!self.close)
                    return false;
                self.filesTooltip = null;
                self.$store.negocios.filesTooltip = null;
                self.tooltip_open = false;
                console.info('tooltip closed');
                self.filesTooltip = null;
                //self.resizeObserver.disconnect()
                //self.clearTransformableBehavior()
            },
            onShow(instance) {
                if (self.$store.negocios.filesTooltip)
                    self.$store.negocios.filesTooltip.destroy();
                self.filesTooltip = instance;
                self.$store.negocios.filesTooltip = instance;
                console.info('tooltip open');
                self.tooltip_open = true;
                //setTimeout(() =>                     self.addTransformableBehavior()                }, 500)
            },
            content: () => document.querySelector('#files_tooltip').innerHTML
                .replace(/negocio_id/g, this.negocio.id)
                .replace(/name_slug/g, `'${this.field.slug_name}'`),
        };
    },
    focus: false,
    focus_target: {
        [':class']() {
            return {
                'focus_target': true,
                'flex': true,
                'align-center': true,
                'justify-evenly': true,
                'w-full': true,
                'modelable_inline_editing': true,
                'bg-transparent': true,
                'focused': this.focus
            };
        },
        type: 'text',
        temporary_value: null,
        ['@keyup.enter']() {
            this.onclick();
        },
        ['@click'](event) {
            if (event.which == 1) {
                this.onclick();
            }
            this.$el.focus();
            this.focus = true;
        },
        ['@click.away']() {
            this.focus = false;
        },
        ['@blur']() {
            this.focus = false;
        },
    }
});
export default inlineEditCheckbox;
//# sourceMappingURL=inline_edit_checkbox.js.map