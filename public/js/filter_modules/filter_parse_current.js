import Alpine from 'alpinejs';
import { loadPartial } from '../components/plugins/loadPartial';
import { createAsNewFilter } from './current_filter_operations/createAsNewFilter';
import { deleteFilter } from './current_filter_operations/deleteFilter';
import { computeFilterPayload } from './filter_manipulations/computeFilterPayload';
import { populateFilterForm } from './filter_manipulations/create_dummy_filter';
import { openToast, tap } from '../components';
import { staticFetchWrapper } from '../components/decorators/staticFetchWrapper';
import { waitFor } from '../components/plugins';
import { patchFilter } from './current_filter_operations/patchFilter';
const parseCurrentFilter = (active_filter) => {
    const { filtros, columnas_visibles, personas = [], id, name, user_id, opt_group, areas_subareas, ...otherProperties } = {
        ...populateFilterForm(),
        ...active_filter
    };
    return {
        filtro: null,
        filtroEnriquecido: null,
        adding: false,
        removing: false,
        get crearNuevoButton() {
            return this.$el.querySelector('button[name="filtro_crear_nuevo]');
        },
        crearNuevoClass: 'p1 fas fa-plus',
        clonarClass: 'icon_clonar fa fa-clone',
        drawnFilters: [],
        get activeFilterProperties() {
            if (!this.$store.active_filter.properties)
                return {};
            this.$store.active_filter.properties.id = this.$store.active_filter.properties.id || this.id;
            return { ...this.$store.active_filter.properties };
        },
        get redrawing() {
            return !!this.$store.active_filter.redrawing;
        },
        set redrawing(flag) {
            this.$store.active_filter.redrawing = !!flag;
        },
        get filtros() {
            return this.redrawing ? [] : this.$store.active_filter.filtros;
        },
        set filtros(filtros) {
            console.log({ setFiltros: filtros });
            this.$store.active_filter.filtros = filtros; //.filter(f => !f.disabled);
        },
        //...otherProperties,
        get columnas_visibles() {
            return this.redrawing ? [] : this.$store.active_filter.columnas_visibles;
        },
        set columnas_visibles(columnas_visibles) {
            this.$store.active_filter.columnas_visibles = columnas_visibles;
        },
        get columnas_actuales() {
            return this.redrawing ? [] : this.$store.active_filter.columnas_actuales;
        },
        set columnas_actuales(columnas_actuales) {
            this.$store.active_filter.columnas_actuales = Array.from(new Set(columnas_actuales));
        },
        get id() {
            return this.$store.active_filter.id;
        },
        set id(id) {
            this.$store.active_filter.id = id;
        },
        get public() {
            return this.$store.active_filter.public; // ? 'on' : null;
        },
        set public(flag) {
            this.$store.active_filter.public = flag; //? 'on' : null;
        },
        get created_at() {
            return this.$store.active_filter.created_at;
        },
        set created_at(created_at) {
            this.$store.active_filter.created_at = created_at;
        },
        get updated_at() {
            return this.$store.active_filter.updated_at;
        },
        set updated_at(updated_at) {
            this.$store.active_filter.updated_at = updated_at;
        },
        syncDrawnFilters(delay) {
            const filter_group_div = document.querySelector('#filter_group0');
            let height = Number(filter_group_div.getBoundingClientRect().height).toFixed(0), heightClass = `min-h-[${height}px]`;
            filter_group_div.style.minHeight = `${height}px`;
            if (delay) {
                this.drawnFilters = [];
                this.redrawing = true;
            }
            setTimeout(() => {
                this.redrawing = false;
                this.drawnFilters = this.filtros.map((f, index) => {
                    f.index = index;
                    if (index === 0)
                        f.conector = 'AND';
                    return f;
                });
                filter_group_div.style.minHeight = 'unset';
            }, delay || 0);
        },
        setActive(id) {
            this.drawnFilters = [];
            this.redrawing = true;
            this.$store.active_filter.setActive(id);
            this.$nextTick(() => this.syncDrawnFilters(100));
        },
        async onResize(payload = null) {
            if ((payload || {}).filters_open)
                await waitFor(500);
            let parentElement = this.$el.parentElement;
            if (!parentElement)
                return;
            let parentWidth = parentElement.clientWidth, parentId = parentElement.id, minWidth = parentWidth - 40, filters_container = this.$refs.filters_container, thisWidth = this.$el.clientWidth;
            this.$el.style.width = (minWidth) + 'px';
            this.width = Math.round(thisWidth / 5) * 5;
            // console.table({ event: 'onResize', className: parentElement.className, parentId, parentWidth, minWidth, thisWidth })
            if (filters_container)
                filters_container.style.width = thisWidth + 'px';
        },
        init() {
            setTimeout(() => {
                console.log({ otherProperties });
                requestAnimationFrame(() => this.onResize());
            }, 100);
            this.accordion_open = this.$root.accordion_open;
            //@ts-ignore
            this.debouncedSync = Alpine.debounce(this.syncDrawnFilters, 650);
            globalThis.parsedFilter = this;
            this.$store.active_filter.controls.set('parsedFilter', this);
            this.$store.active_filter.onReady().then(() => {
                this.$nextTick(() => this.debouncedEstimate());
                this.$watch('activeFilterProperties', (oldValue, newValue) => {
                    this.debouncedRecompute();
                });
                this.$watch('filtros', (oldValue, newValue) => {
                    // this.debouncedSync()
                    this.debouncedEstimate();
                });
            });
            let currentUrl = new URL(location.href);
            if (currentUrl.searchParams.has('filter_id') && currentUrl.searchParams.get('filter_id') == this.id) {
                history.replaceState(null, '', currentUrl.pathname);
            }
            this.debouncedRecompute = Alpine.debounce(this.computeActiveFilter, 500);
        },
        appendFiltro() {
            this.$store.active_filter.appendFiltro();
        },
        async removeAt(index, id) {
            await this.$store.active_filter.removeAt(id);
            this.$nextTick(() => {
                this.syncDrawnFilters(1);
            });
        },
        async moveFilter(oldIndex, newIndex) {
            const ids_before = this.$store.active_filter.filtros.map(f => f.campo_busqueda).slice(0);
            this.$store.active_filter.moveFilter(oldIndex, newIndex);
            this.syncDrawnFilters(1);
            let ids_after = this.$store.active_filter.filtros.map(f => f.campo_busqueda).slice(0);
            console.table(ids_after.map((campo, index) => {
                return {
                    before: ids_before[index],
                    after: ids_after[index]
                };
            }));
            //this.redrawing = true
        },
        get lastFilter() {
            return this.filtros[this.filtros.length - 1];
        },
        accordion_open: false,
        toggle_accordion() {
            this.accordion_open = !this.accordion_open;
            return this.$root.filters_open;
        },
        get name() {
            return this.$store.active_filter.name;
        },
        get opt_group() {
            return this.$store.active_filter.opt_group;
        },
        set opt_group(opt_group) {
            this.$store.active_filter.opt_group = opt_group;
        },
        get areas_subareas() {
            return this.$store.active_filter.areas_subareas;
        },
        set areas_subareas(areas_subareas) {
            this.$store.active_filter.areas_subareas = areas_subareas;
        },
        set name(name) {
            if (name && name !== this.$store.active_filter.name) {
                this.$store.active_filter.name = name;
            }
        },
        get isMine() {
            return this.$store.active_filter.properties.user_id === this.$store.user.id;
        },
        get canIEdit() {
            return this.isMine || this.$store.user.isAdmin || this.$store.user.has_privileged_role;
        },
        get rol() {
            return this.$store.active_filter.properties.rol;
        },
        //@ts-ignore
        computeActiveFilter() {
            const active_filter = this.$store.active_filter.properties;
            //this.name = active_filter.name
            this.user_id = active_filter.user_id;
            this.public = active_filter.public;
            this.opt_group = active_filter.opt_group;
            this.areas_subareas = active_filter.areas_subareas;
            this.id = active_filter.id;
            return active_filter;
        },
        debouncedRecompute: null,
        get active_filter_count() {
            return this.filtros.filter(f => {
                return f && !f.removed
                    && !f.disabled
                    && (f.campo_busqueda || f.index === this.filtros.length - 1);
            }).length;
        },
        form_method: 'GET',
        form_action: '',
        timer: null,
        get estimate_icon() {
            return this.$store.active_filter.estimate_icon;
        },
        set estimate_icon(estimate_icon) {
            //return this.$store.active_filter.estimate_icon = estimate_icon
        },
        icon_timer: null,
        probe() {
            let initial_estimate = typeof this.estimate === 'number' ? this.estimate : 0;
            //@ts-ignore
            return this.$store.active_filter.getEstimate({}).then(({ estimate, columnas_visibles }) => {
                estimate = estimate || 0;
                //this.estimate = estimate;
                this.animateValue(initial_estimate, estimate, 400).then(() => {
                    this.estimate = estimate;
                });
                return estimate;
            });
        },
        estimateObject: {
            estimate: Alpine.store('negocios') ? Alpine.store('negocios').properties.length : 0,
        },
        get estimate() {
            return this.estimateObject.estimate;
        },
        set estimate(value) {
            this.estimateObject.estimate = value;
        },
        animateValue(initial_estimate, new_estimate, duration) {
            // assumes integer values for start and end
            return new Promise((resolve, reject) => {
                var range = (new_estimate || 0) - (initial_estimate || 0);
                if (range === 0) {
                    this.estimate = new_estimate;
                    resolve(new_estimate);
                    return;
                }
                console.log({
                    start: initial_estimate,
                    end: new_estimate,
                });
                // no timer shorter than 50ms (not really visible any way)
                var minTimer = 50;
                // calc step time to show all interediate values
                var stepTime = Math.abs(Math.floor(duration / range));
                // never go below minTimer
                stepTime = Math.max(stepTime, minTimer);
                // get current time and calculate desired end time
                var startTime = new Date().getTime();
                var endTime = startTime + duration;
                var timer;
                const run = () => {
                    var now = new Date().getTime();
                    var remaining = Math.max((endTime - now) / duration, 0);
                    var value = Math.round(new_estimate - (remaining * range));
                    if (isNaN(value)) {
                        clearInterval(timer);
                        this.estimate = new_estimate;
                        resolve(new_estimate);
                    }
                    else if (value >= new_estimate) {
                        this.estimate = new_estimate;
                        resolve(new_estimate);
                        clearInterval(timer);
                    }
                    else {
                        this.estimate = value;
                    }
                };
                timer = setInterval(run, stepTime);
                run();
            });
        },
        debouncedEstimate() {
            if (this.timer)
                clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                console.timerInfo('firing probe');
                this.timer = null;
                this.probe();
            }, 1000);
        },
        //spinner-border
        get payload() {
            return computeFilterPayload(this);
        },
        computeFilterPayload() {
            let payload = computeFilterPayload(this);
            console.info({ payload });
            return payload;
        },
        get is_mine() {
            return (this.$store.user.id === (this.$store.active_filter.properties || {}).user_id) || !this.$store.active_filter.id;
        },
        get isCurrentFilterPathName() {
            let url = new URL(location.href);
            return url.pathname.startsWith(`/filtros/${this.$store.active_filter.id}`);
        },
        get isDealsDatatableScreen() {
            let url = new URL(location.href);
            return url.pathname.startsWith(`/negocio`);
        },
        newColumns: [],
        //@ts-ignore
        suggestNewName() {
            return this.$store.active_filter.suggestNewName();
        },
        activeFilterIcon: 'fa fa-filter',
        buscarButtonClass: 'fa fa-search',
        //@ts-ignore
        //filteredRows: [],
        createNew({ newName }) {
            this.crearNuevoClass = 'fa fa-spinner fa-spin';
            this.$store.user.displayLoadingMessage = 'Guardando';
            if (!this.user_id) {
                this.user_id = this.$store.user.id;
            }
            let payload = this.$store.active_filter.payloadForNewFilter;
            payload.name = newName;
            payload.user_id = this.$store.user.id;
            console.zinfo({ payload });
            if (!payload.name)
                payload.name = 'Nuevo filtro v202' + this.suggestNewName();
            return createAsNewFilter(payload)
                .then(jsonRes => {
                console.log({ jsonRes });
                if (new URL(location.href).pathname.startsWith(`/negocio`)) {
                    this.$store.user.displayLoadingMessage = false;
                    this.$store.active_filter.reloadAvailableFilters(jsonRes.id).then(() => {
                        this.$store.active_filter.setActive(jsonRes.id);
                    });
                }
                else {
                    this.$store.user.displayLoadingMessage = false;
                    this.$store.active_filter.reloadAvailableFilters(jsonRes.id).then(() => {
                        loadPartial('/filtros/' + jsonRes.id + '/edit');
                    });
                }
            });
        },
        async cloneFilter() {
            this.clonarClass = 'p-1 fa fa-spinner fa-spin';
            this.$store.user.displayLoadingMessage = 'Guardando';
            let currentUrl = new URL(window.location.href);
            let url = new URL(window.location.href);
            url.pathname = `/filtros/${this.id}/clone`;
            url.searchParams.set('format', 'json');
            const jsonRes = await staticFetchWrapper(url.toString(), {});
            console.info({ nextUrl: url.toString(), jsonRes });
            if (!this.prevent_reload) {
                await waitFor(1000);
                this.clonarClass = 'p-1 fa fa-clone';
                this.$store.user.displayLoadingMessage = false;
                //@ts-ignore
                return location.href = url.toString();
            }
            //@ts-ignore
            currentUrl.pathname = `/filtros/${jsonRes.filtro.id}/edit`;
            history.replaceState(null, '', currentUrl.pathname);
            await waitFor(1000);
            await this.$store.active_filter.reloadAvailableFilters(jsonRes.filtro.id);
            this.$store.user.displayLoadingMessage = false;
        },
        deleteFilter() {
            this.crearNuevoClass = 'fa fa-spinner fa-spin';
            this.$store.user.displayLoadingMessage = 'Guardando';
            deleteFilter(this.payload).then(jsonRes => {
                this.crearNuevoClass = 'p1 fas fa-plus';
                this.$store.user.displayLoadingMessage = false;
                if (jsonRes.success) {
                    window.location.replace('/filtros');
                }
            });
        },
        debouncedSync: null,
        nameCategoryBasis: 'basis-600px',
        crearActualizarOClonar: 'basis-330px',
        searchBasis: 'mr-2',
        width: 0,
        actualizarIcon: 'fa fa-save',
        get prevent_reload() {
            return this.$store.active_filter.prevent_reload;
        },
        patchFilter() {
            this.$store.user.displayLoadingMessage = 'Guardando';
            this.actualizarIcon = 'fa fa-spinner fa-spin';
            return patchFilter(this.payload)
                .then((jsonRes) => {
                let { type, message } = jsonRes;
                this.$store.user.displayLoadingMessage = null;
                openToast({
                    type: type || 'warning',
                    text: message,
                    description: type === 'success' ? 'Se guardaron las modificaciones al filtro ' + this.payload.name : '',
                    from: 'patchFilter',
                    delay: 3000
                });
                return this.$store.active_filter.reloadAvailableFilters();
            })
                .then(() => {
                requestAnimationFrame(() => {
                    this.actualizarIcon = 'fa fa-save';
                    this.$store.user.displayLoadingMessage = false;
                });
                // refresh datatable contents after filter is saved
                return this.computeAndSubmit();
            }).catch((err) => {
                console.warn(err);
            });
        },
        get enrichedFilters() {
            return this.$store.active_filter.enrichedFilters;
        },
        async updateColumnDefs() {
            return this.$store.active_filter.updateColumnDefs();
        },
        async computeAndSubmit() {
            if (this.$store.active_filter.searchUrl === null)
                return;
            let { grouped_filters, ...payload } = this.payload;
            let state = JSON.parse(JSON.stringify(payload));
            state.limit = 9000;
            return tap(new Promise(res => {
                this.$store.columnas_actuales.once('columns_updated', () => {
                    this.$store.active_filter.submitSearch({ limit: 2500, from: Number(Date.now() / 1000).toFixed(0) })
                        .then(res);
                });
            }), () => this.$store.active_filter.updateColumnDefs());
        }
    };
};
export default parseCurrentFilter;
export { parseCurrentFilter };
//# sourceMappingURL=filter_parse_current.js.map