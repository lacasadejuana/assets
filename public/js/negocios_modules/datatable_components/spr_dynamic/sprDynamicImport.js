export const sprDynamicImport = () => ({
    _dtt_loaded: false,
    get dtt_loaded() {
        return this._dtt_loaded && this.spr_loaded;
    },
    set dtt_loaded(flag) {
        this._dtt_loaded = flag;
    },
    spr_loaded: false,
    InstanceChart(dataStore, containet) {
        return;
    },
    importComponent(moduleName) {
        //@ts-ignore
        return import('/js/components/negocios_modules/datatable_components/SolicitudesPorRangoTable.js')
            .then((module) => {
            console.log('SolicitudesPorRangoTable', module);
            Alpine.data('SolicitudesPorRangoTable', module.SolicitudesPorRangoTable);
            this.InstanceChart = module.InstanceChart;
            this.spr_loaded = true;
            setTimeout(() => {
                this.dtt_loaded = true;
            }, 100);
        });
    },
    active_tab: 'tabs-ejecutadas',
    chart_initialized: false,
    pivot_initialized: false,
    dataSets: {},
    registerComponent(name, component) {
        this.dataSets[name] = component;
    },
    init() {
        globalThis.sprTabs = this;
        this.$store.active_filter.searchUrl = '/api/negocios/visitas_por_rango';
        this.$store.active_filter.display_filters_accordion = true;
        this.$watch('active_tab', (active_tab) => {
            if (active_tab === 'tabs-tabla') {
                globalThis.sprTable.resetHeight();
            }
            if (active_tab === 'tabs-chart') {
                this.chart_initialized = true;
                globalThis.sprTable.initChart();
            }
            if (active_tab === 'tabs-pivot' && !this.pivot_initialized) {
                this.pivot_initialized = true;
                globalThis.sprTable.initPivot();
            }
        });
    }
});
//# sourceMappingURL=sprDynamicImport.js.map