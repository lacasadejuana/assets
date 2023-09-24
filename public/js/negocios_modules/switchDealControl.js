import TomSelect from 'tom-select';
export const switchDealControl = () => ({
    tomselect: null,
    async init() {
        //this.initTomSelect(this.$el)
        globalThis.switchDealControlInstance = this;
        this.$store.campos_busqueda.lightList.then(jsonRes => this.initTomSelect(this.$refs.select_element, jsonRes));
    },
    computeTSettings(extra) {
        const tsettings = {
            valueField: 'id',
            maxItems: 1,
            create: false,
            // options: this.filtroEnriquecido.options,
            placeholder: `Selecciona un negocio para editar`,
            hidePlaceholder: true,
            searchField: ['direccion', 'propietario']
        };
        return { ...tsettings, ...extra };
    },
    initTomSelect($el, options) {
        if (this.tomselect)
            return;
        console.log({ options });
        const self = this;
        const tsettings = this.computeTSettings({
            options: options,
            onChange(id) {
                self.$refs.select_wrapper.classList.add('hidden');
                let url = new URL(window.location.href);
                self.$refs.dialog_icon.classList.remove('fa-briefcase');
                self.$refs.dialog_icon.classList.add('fa-spinner');
                self.$refs.dialog_icon.classList.add('fa-spin');
                url.pathname = `/negocio/${id}/edit`;
                //@ts-ignore
                location.assign(url.toString());
            },
            render: {
                option: function (data) {
                    return `<div class='d-flex align-items-center mb-1'  role='option'>
                             <span class='flex-grow-1 fs-6' font-size='15px'>
                            ${data.propietario}
                            <small class='block fs-085em'>
                            ${data.direccion}
                            </i>
                            </small>
                        </div>`;
                }
            }
        });
        this.tomselect = new TomSelect($el, tsettings);
        setTimeout(() => {
            this.$el.focus();
        }, 1000);
    }
});
export default switchDealControl;
//# sourceMappingURL=switchDealControl.js.map