/**
 * Función reutilizable para dar lógica a elementos
 * que representan un campo numérico
 * @example
 * ```
 *  <template x-for="(row) in rows">
 *      <tr>
 *      <template x-for="(campo) in campos">
 *         <td>
 *         <template x-if="campo.input_type==='number'">
 *             <div x-data="numericData(row,campos)">...</div>
 *         </template>
 *         <template x-if="campo.input_type==='select'">
 *             .... otro tipo
 *         </template>
 *         </td>
 *      </template>
 *      </tr>
 *  </template>
 * ```
 *
 * @param {INegocioRow} row
 * @param {string} field
 * @returns  {XNumericData}
 */
const numericData = (row, field) => ({
    editing: false,
    row_id: row.id,
    field,
    get pointer() {
        //@ts-ignore
        return Alpine.store('negocios').getRaw(this.row_id);
    },
    //@ts-ignore
    get value() {
        let value = this.pointer[this.field];
        return isNaN(value) ? '' : this.formatted(value);
    },
    init() {
        let numericValue = this.toNumber(this.formatted(this.pointer[this.field]));
        this.pointer[this.field] = isNaN(numericValue) ? '' : numericValue;
        this.$el.innerText = this.value;
    },
    handleKeyup(e) {
        console.log({ $el: this.$el, keyup: e.key });
    },
    formatted(value) {
        return value ? Number(String(value).replace(/\./g, '').trim()).toLocaleString('es-CL') : '';
    },
    toNumber(formatted) {
        if (!formatted)
            return '';
        if (/^\d+\.\d{1,2}$/.test(formatted)) {
            return Number.parseFloat(formatted.replace(',', '.').trim());
        }
        return Number.parseFloat(formatted.replace(/\./g, '').replace(',', '.').trim());
    },
    handleInput(e) {
        console.info({ newvalue: this.$el.innerText, e, $e: this.$event });
        if (!/[\d,\.]/.test(e.data)) {
            this.$el.innerText = this.value || '';
            return false;
        }
        this.pointer[this.field] = Number(this.$el.innerText.replace(/\./g, '').replace(',', '.').trim());
        //     this.$el.innerText = this.normalizer(e.target.value || e.target.innerText)
    },
    handleClickOutside() {
        if (!this.editing)
            return;
        this.$el.contenteditable = false;
        console.info({ clickoutside: this.$el, 'action': 'click outside', $e: this.$event, value: this.value });
        this.$el.classList.remove('editing');
    },
    handleClick() {
        this.editing = true;
        this.$el.contenteditable = true;
        this.$el.classList.add('editing');
    },
});
export default numericData;
export { numericData };
//# sourceMappingURL=numeric_data.js.map