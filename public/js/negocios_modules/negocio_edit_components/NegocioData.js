export const NegocioData = (negocio, slugs) => {
    return {
        init() {
            globalThis.negocioModal = this;
            setTimeout(() => {
                this.ready = true;
            }, 1000);
        },
        closing: false,
        get model() {
            return this.$store.negocios.model;
        },
        closeModal(options = {}) {
            if (!this.ready)
                return;
            console.log('closeModal', options);
            //@ts-ignore
            if (options.save) {
                return this.model.save().then(() => {
                    this.$store.negocios.model = null;
                }).catch(() => {
                    this.$store.negocios.model = null;
                });
            }
            this.$store.negocios.model = null;
        },
        get isShown() {
            if (!this.model)
                return false;
            return (!this.$store.negocios.closing) && this.$store.negocios.model;
        },
        get isMassEdit() {
            if (!this.model)
                return false;
            return (!this.$store.negocios.closing) && (this.$store.negocios.checked || []).length && this.model && this.model.id === 0;
        },
        get title() {
            if (!this.model)
                return;
            return this.model.id === 0
                ? 'Editando ' + this.$store.negocios.checked.length + ' negocios'
                : 'Editando negocio #' + this.model.id;
        },
        ready: false,
    };
};
//# sourceMappingURL=NegocioData.js.map