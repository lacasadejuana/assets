import TomSelect from 'tom-select';
export const data_select_role = (current_role) => ({
    tomselectRoles: null,
    tomSettings(id_rol_negocio) {
        return this.$store.roles_negocio.tomSettings(id_rol_negocio, {
            placeholder: 'Rol de negocio',
            hidePlaceholder: true,
            plugins: ['clear_button', 'change_listener'],
            items: id_rol_negocio
        });
    },
    initializeTomSelect() {
        if (this.tomselectRoles)
            this.tomselectRoles.destroy();
        let rolesTomSettings = this.tomSettings(current_role || this.$store.roles_negocio.current);
        console.log({ rolesTomSettings });
        this.tomselectRoles = new TomSelect(this.$el, rolesTomSettings);
    },
    init() {
        this.$nextTick(() => {
            this.initializeTomSelect();
            this.$watch('$store.roles_negocio.current', (value) => {
                this.tomselectRoles.addItem(value);
            });
        });
    }
});
export default data_select_role;
//# sourceMappingURL=data_select_role.js.map