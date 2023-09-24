import { initNegociosTomSelect } from './initNegociosTomSelect';
import { initializeSolicitanteTomSelect } from './initializeSolicitanteTomSelect';
import { initializeAnfitrionTomSelect } from './initializeAnfitrionTomSelect';
export const commonTomSelectOptions = {
    allowEmptyOption: true,
    plugins: ['remove_button'],
    hidePlaceholder: true,
    valueField: 'id',
    labelField: 'name',
    searchField: ['name',],
    maxOptions: 400,
    maxItems: 100
};
//@ts-ignore
export const filtrosSolicitudesData = () => ({
    filters_open: false,
    get filtros() {
        return this.$store.solicitudes.filtros;
    },
    get camposFechaOptions() {
        return [
            { id: 'created_at', name: 'Fecha Creación' },
            { id: 'fecha_programada', name: 'Fecha Agendada' },
            { id: 'fecha_ejecucion', name: 'Fecha Ejecución' },
            { id: 'fecha_seguimiento', name: 'Fecha Seguimiento' },
            { id: 'updated_at', name: 'Última actualización' },
        ];
    },
    form: document.getElementById('form-filtros'),
    get estado() {
        return this.estados_options.find(option => Number(option.id) === Number(this.filtros.estado)) || { id: null, text: 'Todos', subestados: [] };
    },
    get estados_options() {
        //@ts-ignore
        return ([...Object.values(this.$store.dictionary.estados)] || []);
    },
    get subestado() {
        return this.subestados_options.find(option => Number(option.id) === Number(this.filtros.subestado)) || { id: null, text: 'Todos' };
    },
    get subestados_options() {
        //@ts-ignore
        // return ((this.estado || {}).subestados || []).map((option): IValueLabelTuple => {
        //     option.id = option.id || option.subestado_id;
        //     option.disabled = !!option.disabled;
        //     return option;
        // });
        return ([...Object.values(this.$store.dictionary.subestados)] || []);
    },
    get medios_options() {
        //@ts-ignore
        return ([...Object.values(this.$store.dictionary.medios)] || []);
    },
    get categorias_visita_options() {
        //@ts-ignore
        return ([...Object.values(this.$store.dictionary.solicitud_categorias_visita)] || []);
    },
    get campo_fecha() {
        return (this.filtros || {}).campo_fecha || (this.date_range ? 'created_at' : '');
    },
    get date_range() {
        return (this.filtros || {}).date_range || (this.form.querySelector("[name='date_range']") || { id: null }).value;
    },
    submit() {
        this.$nextTick(() => this.form.submit());
    },
    get medio() {
        let medio = this.medios_options.find(option => Number(option.id) === Number(this.filtros.medio)) || { id: null, name: 'Todos' };
        medio.name = medio.name.toLowerCase();
        return medio;
    },
    get solicitud_categorias_visita() {
        let categoria = this.categorias_visita_options.find(option => Number(option.id) === Number(this.filtros.solicitud_categorias_visita)) || { id: null, name: 'Todos' };
        categoria.name = categoria.name.toLowerCase();
        return categoria;
    },
    //@ts-ignore
    filteredRows: Alpine.store('solicitudes').properties,
    get filtros_aplicados() {
        let filtros = this.filtros;
        const filtros_aplicados = (this.campo_fecha ? [
            {
                field: this.campo_fecha,
                label: this.campo_fecha,
                id: this.date_range,
                name: this.date_range,
                default: "Todas",
            }
        ] : []).concat([
            {
                label: "Estado",
                query: "estado",
                field: 'id_estado_solicitud',
                ...(this.estado)
            },
            {
                label: "Subestado",
                field: 'subestado',
                query: "subestado",
                ...(this.subestado)
            },
            {
                label: "Medio",
                query: "medio",
                field: 'medio_solicitud',
                ...(this.medio)
            },
            {
                label: "Categoría Visita",
                query: "solicitud_categorias_visita",
                field: 'solicitud_categorias_visita',
                ...(this.solicitud_categorias_visita)
            },
            {
                label: "Negocio", field: 'id_negocio',
                name: this.negocios.length ? this.negocios.map(p => p.name) : null,
                id: this.negocios.length ? [...this.negocios.map(p => Number(p.id))] : null
            },
            {
                label: "Persona",
                field: 'id_persona',
                name: this.personas.length ? this.personas.map(p => p.name) : null,
                id: this.personas.length ? [...this.personas.map(p => Number(p.id))] : null
            },
            {
                label: "Equipo",
                field: 'id_ejecutivo',
                name: this.equipo.length ? this.equipo.map(p => p.name) : null,
                id: this.equipo.length ? [...this.equipo.map(p => Number(p.id))] : null
            }
        ]);
        console.log(filtros_aplicados);
        return [...filtros_aplicados];
    },
    clearFilter() {
        this.$store.solicitudes.filtros.campo_fecha = null;
        this.$store.solicitudes.filtros.date_range = null;
        this.$store.solicitudes.filtros.estado = null;
        this.$store.solicitudes.filtros.subestado = null;
        this.$store.solicitudes.filtros.medio = null;
        this.$store.solicitudes.filtros.solicitud_categorias_visita = null;
        this.$store.solicitudes.filtros.negocios = [];
        this.$store.solicitudes.filtros.personas = [];
        this.$store.solicitudes.filtros.equipo = [];
        this.tooltipInstance.hide();
        this.show_visits_filter_label = false;
        this.$nextTick(() => this.filters_open = false);
        this.computeAndSubmit({}, location.href.split('?')[0]);
    },
    get filtros_parsed() {
        let campos_fecha = this.camposFechaOptions.map(option => option.id);
        const filtros_parsed = [...this.filtros_aplicados].reduce((accum, value) => {
            if (campos_fecha.includes(value.field)) {
                accum.campo_fecha = value.field;
                accum.date_range = value.id;
                return accum;
            }
            if (!value.id)
                return accum;
            accum[value.query || value.field] = value.id;
            return accum;
        }, {});
        if (Object.keys(filtros_parsed).length) {
            filtros_parsed.filter = '';
        }
        return filtros_parsed;
    },
    get filterBy() {
        let campos_fecha = this.camposFechaOptions.map(option => option.id);
        return [...this.filtros_aplicados].reduce((accum, value) => {
            if (campos_fecha.includes(value.field)) {
                accum.date_in_range = true;
                return accum;
            }
            if (!value.id)
                return accum;
            accum[value.field] = value.id;
            return accum;
        }, {});
    },
    computeNewUrl(baseParams = {}) {
        const url = new URL(location.href);
        if (this.filtros_parsed.date_range && !this.$store.solicitudes.filtros.campo_fecha) {
            this.$store.solicitudes.filtros.campo_fecha = 'created_at';
        }
        url.search = '?' + decodeURIComponent(new URLSearchParams({ ...this.filtros_parsed, ...baseParams }).toString());
        return decodeURIComponent(url.toString());
    },
    resultados: '',
    resultados_class: '',
    activeFilterIcon: 'fa-info-circle',
    computeAndSubmit(state, url) {
        this.filters_open = false;
        this.resultados = 'Buscando...';
        this.buscarButtonClass = 'fa fa-spinner fa-spin';
        this.activeFilterIcon = 'fa fa-spinner fa-spin';
        state = state || JSON.parse(JSON.stringify(this.filtros_parsed));
        url = url || this.computeNewUrl();
        history.pushState(state, '', url);
        this.$store.solicitudes.fetchAll({ append: false, limit: 500 })
            .then(() => this.buscarButtonClass = 'fa fa-search')
            .then(() => {
            this.resultados_class = 'text-success';
            this.resultados = `Resultados : ${this.filteredRows.length}`;
        })
            .then(() => setTimeout(() => this.resultados_class = 'out', 1000))
            .then(() => setTimeout(() => {
            this.activeFilterIcon = 'fa-info-circle';
            this.resultados = '';
            this.resultados_class = '';
            this.$nextTick(() => {
                this.show_visits_filter_label = this.non_null_filters.length > 0;
            });
        }, 2000));
        //@ts-ignore
        //location.href = (this.computeNewUrl())
        /*  if (globalThis.loadPartial) {
              globalThis.loadPartial(url)
          } else {
              location.reload()
          }*/
    },
    buscarButtonClass: 'fa fa-search',
    aplicar() {
        globalThis.bsTable.bootstrapTable('filterBy', this.filterBy);
        this.filteredRows = globalThis.bsTable.bootstrapTable('getData');
        console.log({ filtered: this.filteredRows, filterBy: this.filterBy });
        const state = JSON.parse(JSON.stringify(this.filtros_parsed));
        const url = this.computeNewUrl();
        history.pushState(state, '', url);
    },
    get criteria_length() {
        return this.non_null_filters.length;
    },
    get non_null_filters() {
        return [...this.filtros_aplicados].filter(f => f.id);
    },
    tooltipInstance: null,
    get activeFilterTooltip() {
        const self = this;
        return this.non_null_filters.length ? {
            maxWidth: '50rem',
            content: () => this.$refs.template.innerHTML,
            allowHTML: true,
            appendTo: this.$root,
            theme: 'light',
            trigger: 'click',
            placement: 'bottom',
            offset: [-30, 0],
            onShow(tooltipInstance) {
                self.tooltipInstance = tooltipInstance;
                console.log({ tooltipInstance: self.tooltipInstance });
                self.open = true;
            },
            interactive: true
        } : null;
    },
    get id_negocio() {
        return [...this.$store.solicitudes.negocios || []]
            .filter(option => Number(option.id) === Number(this.filtros.id_negocio)) || { id: null, name: 'Todos' };
    },
    get negocios() {
        return ([...Object.values(this.$store.solicitudes.negocios) || []])
            .filter(option => Object.values([...this.filtros.id_negocio || []]).includes(String(option.id)));
    },
    get personas() {
        return ([...Object.values(this.$store.solicitudes.solicitantes) || []])
            .filter(option => Object.values([...this.filtros.personas || []]).includes(String(option.id)));
    },
    get equipo() {
        return ([...Object.values(this.$store.solicitudes.anfitriones) || []]).filter(option => Object.values([...this.filtros.equipo || []]).includes(String(option.id)) || Object.values([...this.filtros.equipo || []]).includes(Number(option.id)));
    },
    initializeSolicitanteTomSelect($el) {
        this.solicitanteTomSelect = this.solicitanteTomSelect || initializeSolicitanteTomSelect($el, this.$store);
        return this.solicitanteTomSelect;
    },
    initializeAnfitrionTomSelect($el) {
        this.anfitrionTomSelect = this.anfitrionTomSelect || initializeAnfitrionTomSelect($el, this.$store);
        return this.anfitrionTomSelect;
    },
    initNegociosTomSelect($el) {
        this.negociosTomSelect = this.negociosTomSelect || initNegociosTomSelect($el, this.$store);
        return this.negociosTomSelect;
    },
    show_visits_filter_label: false,
    init() {
        globalThis.parsedVisitsFilter = this;
        //console.log({ show_visits_filter_label: this.show_visits_filter_label, date_range: this.date_range.value, campo_fecha: this.campo_fecha.value, filtros_aplicados: this.filtros_aplicados, non_null_filters: this.non_null_filters });
        this.$nextTick(() => {
            this.show_visits_filter_label = this.non_null_filters.length > 0;
        });
    }
});
export default filtrosSolicitudesData;
//# sourceMappingURL=filtros_solicitudes.js.map