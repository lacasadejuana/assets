/**
 * This function is meant to extend data components adding repetitive common parts
 * @param param0
 * @returns
 */
export const getFieldAndNegocio = ({ id_negocio, slug_name, auto_save = true }) => {
    return {
        id_negocio,
        slug_name,
        auto_save,
        get negocio() {
            return this.$store.negocios.get(id_negocio);
        },
        get field() {
            //@ts-ignore
            return this.$store.campos_busqueda.find(this.slug_name);
        },
        focus: false,
        local_editing: false,
        async rescue(cb, delay) {
            try {
                return cb();
            }
            catch (e) {
                //@ts-ignore
                console.zwarn(e.message);
                return null;
            }
        },
        get fieldIndex() {
            return this.$store.columnas_actuales.visible_slugs.indexOf(this.slug_name);
        },
        get $store() {
            return {
                columnas_actuales: Alpine.store('columnas_actuales'),
                campos_busqueda: Alpine.store('campos_busqueda'),
                negocios: Alpine.store('negocios'),
                active_filter: Alpine.store('active_filter')
            };
        },
        giveFocus(row_index, col_index) {
            let el = document.querySelector(`#negocio_tr-${row_index}-${col_index} .focus_target`);
            if (!el)
                return;
            this.$el.blur();
            this.$el.classList.remove('focused');
            let clientRect = el.getBoundingClientRect();
            ///@ts-ignore
            //el.focus({ focusVisible: true })
            //@ts-ignore
            //el.dispatchEvent(new CustomEvent('click', { which: 2 }))
            //el.dispatchEvent(new CustomEvent('contextmenu'))
            //@ts-ignore
            el.dispatchEvent(new MouseEvent('mouseup', {
                clientX: clientRect.left,
                clientY: clientRect.top,
                which: 2,
                button: 1,
                //@ts-ignore
                relatedTarget: this.$refs.focus_target,
            }));
            //globalThis.alpineBsTable.scrollBooster.scrollTo({ x: clientRect.left, y: clientRect.top })
            console.table(clientRect);
            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            return el;
        },
        getParentId() {
            if (!this.$el) {
                console.log('parentId: $el is null');
                return null;
            }
            if (this.$el.classList.contains('negocio_dtt_control'))
                return this.$el;
            return this.$el.closest('.negocio_dtt_control').id;
        },
        arrowLeft() {
            let regex = /(negocio_tr)-(\d+)-(\d+)/.exec(this.getParentId());
            if (!regex) {
                console.log('arrowLeft: regex failed for ' + this.getParentId());
                return;
            }
            let [prefix, row, my_index] = regex.slice(1);
            let row_index = parseInt(row, 10);
            let col_index = parseInt(my_index, 10);
            let elementWithFocus = this.giveFocus(row_index, col_index - 1);
            //@ts-ignore
            console.log(elementWithFocus ? elementWithFocus.rel : '');
        },
        arrowRight() {
            let regex = /(negocio_tr)-(\d+)-(\d+)/.exec(this.getParentId());
            if (!regex) {
                console.log('arrowRight: regex failed for ' + this.getParentId());
                return;
            }
            let [prefix, row, my_index] = regex.slice(1);
            let row_index = parseInt(row, 10);
            let col_index = parseInt(my_index, 10);
            let elementWithFocus = this.giveFocus(row_index, col_index + 1);
            //@ts-ignore
            console.log(elementWithFocus ? elementWithFocus.rel : '');
        },
        arrowUp() {
            let regex = /(negocio_tr)-(\d+)-(\d+)/.exec(this.getParentId());
            if (!regex) {
                console.log('arrowUp: regex failed for ' + this.getParentId());
                return;
            }
            let [prefix, row, my_index] = regex.slice(1);
            let row_index = parseInt(row, 10);
            let col_index = parseInt(my_index, 10);
            let elementWithFocus = this.giveFocus(row_index - 1, col_index);
            //@ts-ignore
            console.log(elementWithFocus ? elementWithFocus.rel : '');
        },
        arrowDown() {
            let regex = /(negocio_tr)-(\d+)-(\d+)/.exec(this.getParentId());
            if (!regex) {
                console.log('arrowDown: regex failed for ' + this.getParentId());
                return;
            }
            let [prefix, row, my_index] = regex.slice(1);
            let row_index = parseInt(row, 10);
            let col_index = parseInt(my_index, 10);
            let elementWithFocus = this.giveFocus(row_index + 1, col_index);
            //@ts-ignore
            console.log(elementWithFocus ? elementWithFocus.rel : '');
        },
        key_navigation: {
            ['@keyup.up']() {
                //@ts-expect-error
                return this.arrowUp();
            },
            ['@keyup.down']() {
                //@ts-expect-error
                return this.arrowDown();
            },
            ['@keyup.left']() {
                //@ts-expect-error
                return this.arrowLeft();
            },
            ['@keyup.right']() {
                //@ts-expect-error
                return this.arrowRight();
            },
            ['@mouseup']() {
                //@ts-ignore
                this.$el.focus();
                //@ts-ignore
                this.focus = true;
            },
        },
    };
};
export default getFieldAndNegocio;
//# sourceMappingURL=get_field_and_negocio.js.map