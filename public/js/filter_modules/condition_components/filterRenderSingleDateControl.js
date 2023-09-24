import { Litepicker } from 'litepicker';
import { waitFor } from '../../components/plugins';
import getFiltroAndCampo from '../decorators/getFiltroAndCampo';
export const filterRenderSingleDateControl = (filtro, filtroEnriquecido) => ({
    pickr: null,
    tables: false,
    ...getFiltroAndCampo(filtro),
    get filtroEnriquecido() {
        return filtroEnriquecido;
    },
    get shouldIBeVisible() {
        return this.filtroEnriquecido.renderSingleDate;
    },
    name: 'single_date',
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
    destroy_pickr() {
        if (!this.pickr)
            return;
        let pickr = this.pickr;
        pickr.destroy();
        this.pickr = null;
    },
    date_regex: /^\d{4}-\d{2}-\d{2}$/,
    initNotice() {
        //@ts-ignore
        console.zwarn('INIT FILTER RENDER ' + this.name.toUpperCase() + ' CONTROL');
        if (this.tables) {
            console.table({
                tipo_busqueda: this.filtro.tipo_busqueda,
                operacion: this.filtro.operacion,
                valor_busqueda: this.filtro.valor_busqueda,
                shouldIBeVisible: this.shouldIBeVisible,
                pickr: typeof this.pickr
            });
        }
    },
    async verifyRegex() {
        let { valor_busqueda } = filtro;
        await waitFor(500);
        this.pickr = this.initPicker();
        this.initNotice(filtroEnriquecido.renderSingleDate);
        if (!this.date_regex.test(filtro.valor_busqueda) || !valor_busqueda) {
            //@ts-ignore
            console.zwarn('limpiando valor de filtro de fecha ' + valor_busqueda);
            setTimeout(() => this.filtro.valor_busqueda = '', 200);
            this.$el.value = '';
            this.pickr.clearSelection();
        }
        else {
            filtro.valor_busqueda = valor_busqueda;
            this.pickr.setDate(filtro.valor_busqueda);
        }
    },
    async init() {
        if (this.pickr)
            this.destroy_pickr();
        this.initNotice(filtroEnriquecido.renderSingleDate);
        await this.verifyRegex();
        //this.$el.style.backgroundColor = 'white !important';
        this.$watch('filtro.valor_busqueda', (value, oldValue) => {
            if (value === oldValue || !this.shouldIBeVisible)
                return;
            if (this.tables) {
                console.table({
                    what: 'valor_busqueda',
                    from: this.name,
                    value,
                    oldValue,
                    valor_busqueda: this.filtro.valor_busqueda,
                    shouldIBeVisible: this.shouldIBeVisible,
                });
            }
            if (!this.date_regex.test(value) && value !== '') {
                return this.pickr && this.pickr.setDate(oldValue);
            }
            //  this.pickr && this.pickr.setDate(value);
        });
        this.$watch('filtroEnriquecido.renderSingleDate', (renderSingleDate, oldValue) => {
            if (renderSingleDate === oldValue || !this.shouldIBeVisible)
                return;
            if (!renderSingleDate) {
                this.filtro.valor_busqueda = '';
                this.destroy_pickr();
            }
            //@ts-ignore
            console.zlog({
                what: 'renderSingleDate',
                from: this.name,
                oldValue,
                renderSingleDate,
                pickr: typeof this.pickr
            });
        });
    },
    initPicker() {
        let self = this;
        if (this.pickr)
            this.destroy_pickr();
        //@ts-ignore
        console.timerInfo('INSTANCED SINGLE DATE LITEPICKER');
        return new Litepicker(this.getPickerOptions());
    },
    getPickerOptions(extraOptions = {}) {
        const self = this;
        return {
            element: this.$el,
            lang: 'es-ES',
            //format: 'MM/DD/YYYY',
            singleMode: true,
            autoApply: true,
            setup(picker) {
                self.onSetup(picker);
            },
            ...extraOptions
        };
    },
    onSetup(picker) {
        const self = this;
        picker.on('selected', (date1) => {
            let date1Str = date1.getDate().toLocaleString().split(',')[0];
            if (self.tables) {
                console.table({
                    from: self.name,
                    date1: typeof date1,
                    date1Str,
                    elementvalue: self.$el.value
                });
            }
            if (date1 && typeof date1.toLocaleString === 'function') {
                //                        filtro.valor_busqueda = date1.toLocaleString().split(',')[0].replace(/^(\d{1})\//, '0$1/').replace(/\/(\d{1})\//, '/0$1/').replace(/(\d{1,2})\/(\d{1,2})\/(\d{4}).*/, '$3-$1-$2')
                filtro.valor_busqueda = self.$el.value;
            }
        });
    }
});
//# sourceMappingURL=filterRenderSingleDateControl.js.map