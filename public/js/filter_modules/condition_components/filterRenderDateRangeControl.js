//import { Litepicker } from 'litepicker';
import Litepicker from 'litepicker';
import 'litepicker/dist/plugins/mobilefriendly';
import 'litepicker/dist/plugins/multiselect';
import { waitFor } from '../../components/plugins';
export const filterRenderDateRangeControl = (filtro, filtroEnriquecido) => ({
    get filtro() {
        return filtro;
    },
    tables: true,
    pickr: null,
    name: 'date_range',
    get value() {
        return filtro.valor_busqueda;
    },
    set value(val) {
        console.log('setting value', val);
        filtro.valor_busqueda = val;
    },
    setValue(val) {
        if (this.pickr)
            this.pickr.setDate(val, false);
    },
    range: [],
    destroy_pickr() {
        if (!this.pickr)
            return;
        let pickr = this.pickr;
        pickr.destroy();
        this.pickr = null;
    },
    date_regex: /\d{2}\/\d{2}\/\d{4}\s*-\s*\d{2}\/\d{2}\/\d{4}/,
    initNotice() {
        //@ts-ignore
        /* console.zwarn('INIT FILTER RENDER ' + this.name.toUpperCase() + ' CONTROL')
         console.table({
             tipo_busqueda: this.filtro.tipo_busqueda,
             operacion: this.filtro.operacion,
             valor_busqueda: this.filtro.valor_busqueda,
             shouldIBeVisible: this.shouldIBeVisible,
             pickr: typeof this.pickr
         })*/
    },
    async verifyRegex() {
        let { valor_busqueda } = filtro;
        this.pickr = this.initPicker();
        await waitFor(500);
        if (!this.date_regex.test(valor_busqueda) || !filtro.campo_busqueda) {
            //@ts-ignore
            console.zwarn('limpiando valor de filtro de fecha ' + valor_busqueda);
            this.filtro.valor_busqueda = '';
            this.$el.value = '';
            this.pickr.clearSelection();
        }
        else {
            filtro.valor_busqueda = valor_busqueda;
            let [date1, date2] = valor_busqueda.split(' - ');
            this.pickr.setDateRange(date1, date2, true);
        }
    },
    get shouldIBeVisible() {
        return filtroEnriquecido.renderDateRange;
    },
    async init() {
        if (this.pickr)
            this.destroy_pickr();
        this.initNotice();
        await this.verifyRegex();
        this.$watch('filtro.valor_busqueda', (newValue, oldValue) => {
            if (newValue === oldValue || !this.shouldIBeVisible)
                return;
            console.table({
                what: 'valor_busqueda',
                from: this.name,
                newValue,
                valor_busqueda: this.filtro.valor_busqueda,
                oldValue,
                shouldIBeVisible: this.shouldIBeVisible,
                regexMatches: this.date_regex.test(newValue)
            });
            return;
            if (!this.date_regex.test(newValue) && newValue !== '') {
                let [date1, date2] = oldValue.split(' - ');
                return this.pickr && this.pickr.setDateRange(date1, date2, true);
            }
            // this.pickt && this.pickr.setDate(newValue);
        });
        this.$watch('filtroEnriquecido.renderDateRange', (renderDateRange, oldValue) => {
            if (renderDateRange === oldValue || !this.shouldIBeVisible)
                return;
            if (!renderDateRange) {
                this.filtro.valor_busqueda = '';
                this.destroy_pickr();
            }
            if (this.tables) {
                //@ts-ignore
                console.table({
                    what: 'renderDateRange',
                    from: this.name,
                    oldValue,
                    renderDateRange,
                    pickr: typeof this.pickr
                });
            }
        });
    },
    initPicker() {
        if (this.pickr)
            this.destroy_pickr();
        let self = this;
        //@ts-ignore
        console.timerInfo('INSTANCED DATERANGE LITEPICKER');
        return new Litepicker(this.getPickerOptions());
    },
    getPickerOptions(extraOptions = {}) {
        const self = this;
        return {
            element: this.$el,
            lang: 'es-ES',
            format: 'DD/MM/YYYY',
            numberOfMonths: 2,
            showWeekNumbers: true,
            allowRepick: true,
            numberOfColumns: 2,
            singleMode: false,
            autoApply: true,
            setup(picker) {
                self.onSetup(picker);
            },
            splitView: true,
            ...extraOptions
        };
    },
    onSetup(picker) {
        const self = this;
        picker.on('selected', (date1, date2) => {
            console.log('selected', date1, date2);
            //@ts-ignore
            let date1Str = date1.toLocaleString('en-GB').split(',')[0].replace(/-/g, '/'), 
            //@ts-ignore
            date2Str = date2 ? date2.toLocaleString('en-GB').split(',')[0].replace(/-/g, '/') : '';
            if (!date1Str || !date2Str)
                return;
            const valor_busqueda = `${date1Str} - ${date2Str}`;
            if (self.tables) {
                console.table({
                    from: self.name,
                    'what': 'onSelected',
                    //@ts-ignore
                    date1: date1Str,
                    //@ts-ignore
                    date2: date2Str,
                    elementvalue: self.$el.value,
                    shouldIBeVisible: self.shouldIBeVisible,
                    valor_busqueda,
                    regexMatches: self.date_regex.test(valor_busqueda)
                });
            }
            if (self.date_regex.test(valor_busqueda)) {
                filtro.valor_busqueda = valor_busqueda;
            }
        });
    }
});
//# sourceMappingURL=filterRenderDateRangeControl.js.map