//import { Litepicker } from 'litepicker';
import 'litepicker/dist/plugins/mobilefriendly';
import 'litepicker/dist/plugins/multiselect';
import NumberFormatParse from 'number-format-parse';
import getFiltroAndCampo from '../decorators/getFiltroAndCampo';
export const filterRenderNumericIntervalControl = (filtro, filtroEnriquecido) => ({
    ...getFiltroAndCampo(filtro),
    name: 'numeric_interval',
    _internal_value: [],
    get value() {
        //@ts-ignore
        return this.filtro.valor_busqueda;
    },
    set value(val) {
        if (Array.isArray(val)) {
            let asNumbers = val.map(num => (typeof num === 'number' ? num : this.strToNumber(num)));
            console.table([
                { name: 'value', lower: val[0], upper: val[1] },
                {
                    name: 'asNumbers', lower: asNumbers[0], upper: asNumbers[1]
                }
            ]);
            this.filtro.valor_busqueda = asNumbers;
        }
    },
    get lowerlimit() {
        //@ts-ignore
        return this.numberToString(this._internal_value[0]);
    },
    get upperlimit() {
        //@ts-ignore
        return this.numberToString(this._internal_value[1]);
    },
    set lowerlimit(val) {
        let newLowerLimit = this.strToNumber(val);
        if (!Array.isArray(this._internal_value)) {
            this._internal_value = [newLowerLimit, newLowerLimit];
        }
        if (newLowerLimit > this._internal_value[1]) {
            newLowerLimit = this._internal_value[1];
            this.flashClass(this.upperlimit_input, 'text-red-500', 300);
        }
        if (newLowerLimit !== this._internal_value[0]) {
            this._internal_value[0] = newLowerLimit;
        }
        this._lowerlimit = val;
    },
    set upperlimit(val) {
        let newUpperLimit = this.strToNumber(val);
        if (!Array.isArray(this._internal_value)) {
            this._internal_value = [newUpperLimit, newUpperLimit];
        }
        if (newUpperLimit < this._internal_value[0]) {
            this._internal_value[0] = newUpperLimit;
            this.flashClass(this.lowerlimit_input, 'text-red-500', 300);
        }
        if (newUpperLimit !== this._internal_value[1]) {
            this._internal_value[1] = newUpperLimit;
        }
        this._upperlimit = val;
    },
    numberToString(num) {
        return this.formatParse.stringify(typeof num === 'number' ? num : this.strToNumber(num));
    },
    strToNumber(val) {
        if (typeof val === 'number')
            return val;
        let parsedNumber = this.formatParse.parse(String(val).replace(/,$/, ',0'));
        return isNaN(parsedNumber) ? 0 : parsedNumber;
        return typeof val === 'number' ? val : Number(String(val).replace(/^0/g, '')
            .replace(/\./g, '')
            //.replace(/\.(\d{3})/g, '$1')
            .replace(/,(\d{1,2})$/, '.$1'));
    },
    syncValorBusqueda() {
        this.value = this._internal_value.map(n => this.strToNumber(n));
        console.log('syncValorBusqueda', this.value);
    },
    formatParse: {
        stringify: (num) => String(num),
        parse: (num) => Number(num)
    },
    _lowerlimit: 0,
    _upperlimit: 0,
    initial: [(filtro.valor_busqueda || [0, 10000000000])[0], (filtro.valor_busqueda || [0, 10000000000])[1]],
    nf: null,
    lowerlimit_input: null,
    upperlimit_input: null,
    init() {
        this.formatParse = new NumberFormatParse('es-CL', {
            style: 'decimal',
            maximumFractionDigits: 2,
            minimumFractionDigits: 1
        });
        this.lowerlimit_input = this.$el.querySelector('.lower_limit input');
        this.upperlimit_input = this.$el.querySelector('.upper_limit input');
        globalThis.numericRange = this;
        filtro.valor_busqueda = filtro.valor_busqueda || [0, 10000000000];
        if (!Array.isArray(filtro.valor_busqueda)) {
            if (!isNaN(parseFloat(filtro.valor_busqueda))) {
                this.value = [Number(filtro.valor_busqueda), Number(filtro.valor_busqueda)];
            }
            else {
                this.value = [0, 0];
            }
        }
        else {
            this.value = [this.strToNumber(filtro.valor_busqueda[0]), this.strToNumber(filtro.valor_busqueda[1])];
        }
        this._internal_value = this.value;
        this._lowerlimit = this.lowerlimit;
        this._upperlimit = this.upperlimit;
        this.debouncedSync = Alpine.debounce(this.syncValorBusqueda, 1000);
        this.$watch('_internal_value', (newValue, oldValue) => {
            if (!Array.isArray(newValue)) {
                console.zwarn('NOT AN ARRAY', newValue, Alpine.raw(newValue));
            }
            if (!newValue)
                return;
            if (oldValue[0] == newValue[0] && newValue[1] == oldValue[1])
                return;
            console.table([
                { name: 'oldvalue', lower: oldValue[0], upper: oldValue[1] },
                { name: 'newValue', lower: newValue[0], upper: newValue[1] }
            ]);
            return this.debouncedSync();
            // this.pickt && this.pickr.setDate(newValue);
        });
        this.$watch('value', (newValue, oldValue) => {
            this._internal_value = newValue;
        });
    },
});
//# sourceMappingURL=filterRenderNumericIntervalControl.js.map