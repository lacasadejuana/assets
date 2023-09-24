//import { Litepicker } from 'litepicker';
import 'litepicker/dist/plugins/mobilefriendly';
import 'litepicker/dist/plugins/multiselect';
import NumberFormatParse from 'number-format-parse';
import getFiltroAndCampo from '../decorators/getFiltroAndCampo';
export const filterRenderNumericValueControl = (filtro, filtroEnriquecido) => ({
    ...getFiltroAndCampo(filtro),
    name: 'numeric_value',
    _internal_value: 0,
    get value() {
        //@ts-ignore
        return this.numberToString(this.filtro.valor_busqueda);
    },
    set value(val) {
        this.filtro.valor_busqueda = (typeof val === 'number' ? val : this.strToNumber(val));
    },
    get reference_value() {
        //@ts-ignore
        return this.numberToString(this._internal_value);
    },
    set reference_value(val) {
        let newReferenceValue = this.strToNumber(val);
        if (newReferenceValue !== this._internal_value) {
            this._internal_value = newReferenceValue;
        }
    },
    syncValorBusqueda() {
        this.filtro.valor_busqueda = this._internal_value;
        console.log('syncValorBusqueda', this.value);
    },
    init() {
        this.formatParse = new NumberFormatParse('es-CL', {
            style: 'decimal',
            maximumFractionDigits: 2,
            minimumFractionDigits: 1
        });
        globalThis.numericValue = this;
        if (Array.isArray(filtro.valor_busqueda)) {
            this._internal_value = this.strToNumber(filtro.valor_busqueda[0]);
        }
        else {
            this._internal_value = this.strToNumber(filtro.valor_busqueda);
        }
        this.debouncedSync = Alpine.debounce(this.syncValorBusqueda, 1000);
        this.$watch('_internal_value', (newValue, oldValue) => {
            if (oldValue == newValue)
                return;
            console.table([
                { name: 'oldvalue', value: oldValue },
                { name: 'newValue', value: newValue }
            ]);
            return this.debouncedSync();
            // this.pickt && this.pickr.setDate(newValue);
        });
        this.$watch('value', (newValue, oldValue) => {
            this._internal_value = newValue;
        });
    },
    formatParse: {
        stringify: (num) => String(num),
        parse: (num) => Number(num)
    },
    numberToString(num) {
        return this.formatParse.stringify(typeof num === 'number' ? num : this.strToNumber(num));
    },
    strToNumber(val) {
        if (typeof val === 'number')
            return val;
        if (val === null || val === undefined)
            return 0;
        let parsedNumber = this.formatParse.parse(String(val).replace(/,$/, ',0'));
        return isNaN(parsedNumber) ? 0 : parsedNumber;
    },
});
//# sourceMappingURL=filterRenderNumericValueControl.js.map