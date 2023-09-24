export const negociosTableCell = ({ id_negocio, slug_name }) => ({
    get negocio() {
        return this.$store.negocios.get(this.id_negocio);
    },
    get campo_busqueda() {
        //@ts-ignore
        return this.$store.campos_busqueda.find(this.slug_name);
    },
    get slug_name() {
        return slug_name;
    },
    get id_negocio() {
        return id_negocio;
    },
    getInputContent(options) {
        options = options || {};
        return document
            .querySelector(this.campo_busqueda.template_id)
            .innerHTML.replace(/negocio_id/g, String(this.negocio.id))
            .replace(/editing_cell/g, String(options.editing_cell ?? 'false'))
            .replace(/editable_item/g, String(this.campo_busqueda.editable ?? true))
            .replace(/save_auto/g, String(options.save_auto ?? true))
            .replace(/tom_select_or_choices/g, `'${options.tom_select_or_choices ?? "choices"}'`)
            .replace(/open_auto/g, String(options.save_auto ?? true))
            .replace(/name_slug/g, `'${this.slug_name}'`);
    },
    get campo() {
        return this.$store.columnas_actuales
            .find(this.slug_name) || {};
    },
    cell_editing: false,
    init() {
        //  console.zinfo({ id_negocio, slug_name })
        this.negocio[this.slug_name] = this.negocio[this.slug_name] || '';
        this.$el.classList.add(`cell_${this.campo.input_type.replace(/\s/g, '_')}`);
        this.$el.classList.add(`${this.slug_name.replace(/\s/g, '_')}`);
        if (this.cell_editing)
            this.$el.classList.add('cell_editing border-blue-500');
        //if (!this.campo.editable) this.$el.classList.add('cursor-not-allowed');
        this.$watch('cell_editing', (new_cell_editing, old_cell_ediging) => {
            if (new_cell_editing === old_cell_ediging)
                return;
            console.log({ new_cell_editing, old_cell_ediging });
        });
    },
    getShownValue(negocio, slug_name) {
        return this.$store.campos_busqueda.getShownValue(negocio, slug_name);
    },
    preventClick(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('preventDefault');
        return false;
    },
    get inputWidth() {
        if (this.campo.input_type === 'select multiple')
            return 215;
        return Math.max(this.colWidth || ((this.campo.input_type === 'select'
            || this.campo.input_type === 'text'
            || this.campo.input_type === 'contacto') ? '205' : '165'));
    },
    get colWidth() {
        return this.campo.width;
    },
    loading: false,
    get negocioField() {
        return this.negocio[this.campo
            .slug_name];
    },
    set negocioField(value) {
        this.negocio[this.campo
            .slug_name] = value;
    },
    isVisible(slug_name) {
        return this.$store.columnas_actuales.isVisible(slug_name);
    },
    get title() {
        if (!this.negocio)
            return '';
        return this.campo.options ? (this.campo.optionMap.get(this.negocio[this.slug_name]) || {}).name : (this.negocio[this.slug_name] ?? '');
    },
    get currentValue() {
        if (!this.negocio)
            return '';
        return this.$store.campos_busqueda.getShownValue(this.negocio, this.slug_name);
    },
    get options() {
        return this.campo.options || [];
    },
    get shownValue() {
        if ([1, 14].includes(Number(this.campo
            .id_input_type))) {
            return this.campo.optionMap.get(this.negocio[this.slug_name] || {}).name;
        }
        return this.currentValue;
    },
    isDefaultField(slug_name) {
        return this.$store.columnas_actuales.isDefaultField(slug_name);
    },
    isCheckbox(id_input_type) {
        return this.$store.campos_busqueda.isCheckbox(id_input_type);
    },
    isContact(id_input_type) {
        return this.$store.campos_busqueda.isContact(id_input_type);
    },
    isDateOrDatetimeField(id_input_type) {
        return this.$store.campos_busqueda.isDateOrDatetimeField(id_input_type);
    },
    isMultiSelectField(id_input_type) {
        return this.$store.campos_busqueda.isMultiSelectField(id_input_type);
    },
    isNumber(id_input_type) {
        return this.$store.campos_busqueda.isNumber(id_input_type);
    },
    isSelectOrRadioButtonGroup(id_input_type) {
        return this.$store.campos_busqueda.isSelectOrRadioButtonGroup(id_input_type);
    },
    isTextOrTextArea(id_input_type) {
        return this.$store.campos_busqueda.isTextOrTextArea(id_input_type);
    },
});
export default negociosTableCell;
//# sourceMappingURL=negociosTableCell.js.map