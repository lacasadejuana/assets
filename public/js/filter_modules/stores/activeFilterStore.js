import { enrichFilter } from '../filter_manipulations/enrichFilter';
import { bindConsole, VInputType } from "@lacasadejuana/types";
import Alpine from 'alpinejs';
import { v4 as uuidv4 } from 'uuid';
import { openToast, VSearchType } from '../../components';
import { staticFetchWrapper } from '../../components/decorators';
import { tap } from '../../components/plugins';
import { BaseClass } from '../../components/stores';
import { EnrichedFilter } from '../EnrichedFilter';
import { dummyFilter } from '../filter_manipulations/create_dummy_filter';
import { normalizeFiltros, printFilters, } from '../filter_manipulations/normalizeFiltro';
export class ActiveFilterStore extends BaseClass {
    get user_id() {
        return this.properties.user_id;
    }
    get nextIndex() {
        return tap(++this.filterIndex, (index) => console.log('nextIndex', index));
    }
    resetControl() {
        this.controls = new Map();
        this.on('ready', () => { });
    }
    disableRedrawing() {
        this.marquee('disableRedrawing');
        this.redrawing = false;
    }
    get verifiers() {
        return {
            ready: !!this.ready,
            filters_loaded: this.filtrosDisponibles.length > 0
        };
    }
    async onFiltersLoaded(handler) {
        return this.verifiers.filters_loaded
            ? this.tap(() => (handler ? handler(this) : Promise.resolve(this)))
            : new Promise(res => this.once('filters_loaded', (result) => (handler ? handler(result) : res(result))));
    }
    constructor() {
        super();
        this.opened_once = false;
        this.filters_open = false;
        this.className = 'ActiveFilterStore';
        this.ready = false;
        this.estimate = 0;
        //updated_at: Date;
        this.properties = {
            columnas_actuales: [],
        };
        this.filtrosDisponibles = [];
        this.default_changed = false;
        this.filterMap = null;
        this.filterIndex = -1;
        this.filterIds = [];
        this.onReadyHandlers = [];
        this.estimatePromise = null;
        this.controls = new Map();
        this.redrawing = false;
        this.searchUrl = '/api/negocios/apply_filter';
        this.display_filters_accordion = false;
        this.onFiltersLoadedHandlers = [];
        this._console = bindConsole(this.className);
        this.marquee(' created store ');
        globalThis.$store = globalThis.$store || {};
        globalThis.$store.active_filter = this;
        this.filterMap = new Map();
        this.redrawingTimeout = null;
        this.debouncedDisableRedrawing = () => {
            if (this.redrawingTimeout)
                clearTimeout(this.redrawingTimeout);
            //@ts-ignore
            this.redrawingTimeout = setTimeout(() => this.disableRedrawing(), 500);
        };
        //this.verifiers.filters_loaded = () => this.filtrosDisponibles.length > 0
    }
    replaceDisponible(filtro) {
        let position = this.filtrosDisponibles.map(f => Number(f.id)).indexOf(Number(filtro.id));
        if (position !== -1) {
            let extracted = this.filtrosDisponibles.splice(position, 1);
            filtro.highlighted = true;
            this.filtrosDisponibles.splice(position, 0, filtro);
            this.processEventListeners('filters_loaded', this);
        }
        else {
            this.filtrosDisponibles.unshift(filtro);
            this.processEventListeners('filters_loaded', this);
        }
    }
    loadFiltrosDisponibles(filtrosDisponibles) {
        /**
         * Prune redundant properties
         */
        let filtrosNormalized = filtrosDisponibles.map((filtro) => {
            let { query_string, id, updated_at, user_id, name, created_at, opt_group = 'Otros', areas_subareas, user, ...rest } = filtro, author = user?.name, 
            // We clean redundant user_id, name and id from the query_string
            //@ts-ignore
            { user_id: fake_user_id, id: fake_id, rol, personas, 
            //@ts-ignore
            _method, filter, ...properties } = query_string;
            return {
                id,
                name,
                public: !!rest.public,
                user_id,
                ...properties,
                opt_group,
                areas_subareas,
                author,
                created_at,
                updated_at,
            };
        });
        this.filtrosDisponibles = filtrosNormalized;
        this.processEventListeners('filters_loaded', this);
        return this;
    }
    once(event, handler) {
        if ((event === 'filters_loaded' && this.filtrosDisponibles.length > 0) || (event === 'ready' && this.ready)) {
            return Promise.resolve((typeof handler === 'function') ? handler(this) : this);
        }
        return super.once(event, handler);
    }
    processEventListeners(event, callbackArgument) {
        callbackArgument = callbackArgument || this;
        if (!this.eventListeners[event])
            return;
        this.log(`processing ${event} handlers, ${this.eventListeners[event].length} remaining`);
        let onceHandlers = this.eventListeners[event].filter(h => h.once), otherHandlers = this.eventListeners[event].filter(h => !h.once);
        while (onceHandlers.length) {
            onceHandlers.shift()(callbackArgument);
            //console.log('process onceHandler ' + onceHandlers.length + ' remaining')
        }
        otherHandlers.forEach(cb => cb(callbackArgument));
        this.eventListeners[event] = otherHandlers;
    }
    get emptyFilter() {
        return {
            id: null,
            name: 'Nuevo filtro ' + new Date().toLocaleString('es-CL').replace(',', '').substr(0, 16),
            opt_group: 'Otros',
            public: null,
            author: null,
            filtros: [{
                    conector: 'AND',
                    valor_busqueda: null,
                    tipo_busqueda: VSearchType.IS_NOT_NULL,
                    campo_busqueda: 'id_tipo_negocio,negocio',
                    slug_name: 'id_tipo_negocio',
                    attr_type: 'negocio',
                    id_input_type: VInputType.INPUT_SELECT
                }],
            columnas_visibles: [70],
            columnas_actuales: [{
                    slug_name: 'id_tipo_negocio',
                    id: 70,
                    visible: true
                }],
            areas_subareas: null,
            //@ts-ignore
            estimate: this.$store.negocios.properties.length,
            grouped_filters: [],
            filtros_and_or: [],
            user_id: null,
            created_at: null,
            updated_at: null,
        };
    }
    getEstimate(options) {
        this.estimatePromise = this.estimatePromise ?? this.getEstimateOriginal(options);
        return this.estimatePromise;
    }
    get estimate_icon() {
        return this.estimatePromise ? 'fa fa-spinner fa-spin' : 'fa fa-calculator';
    }
    get payloadForNewFilter() {
        let { id, ...payload } = this.estimatePayload;
        return payload;
    }
    get estimatePayload() {
        let { filtros, user_id, columnas_actuales, columnas_visibles, id, name, } = this.properties;
        filtros = this.filtros.filter(f => !f.disabled && f.campo_busqueda).map(filtro => {
            let f = (filtro._filtro || filtro);
            f.conector = f.conector || f._conector || 'and';
            f.campo_busqueda = (filtro.campo_busqueda || f.campo_busqueda || f._campo_busqueda).replace('fechaCreacion', 'created_at');
            f.tipo_busqueda = filtro.tipo_busqueda || f.tipo_busqueda || f._tipo_busqueda;
            f.valor_busqueda = filtro.valor_busqueda || f.valor_busqueda || f._valor_busqueda;
            //@ts-ignore
            let [slug_name, attr_type] = f.campo_busqueda.split(',');
            f.slug_name = slug_name;
            f.attr_type = attr_type;
            return f;
        }).filter(f => f.campo_busqueda && f.campo_busqueda !== ',negocio').map(f => Alpine.raw(f));
        return Alpine.raw({
            id: this.id,
            name: this.name,
            opt_group: this.opt_group,
            areas_subareas: this.areas_subareas,
            filtros,
            public: this.public,
            columnas_actuales: Alpine.raw(this.columnas_actuales),
            columnas_visibles: Alpine.raw(this.columnas_visibles)
        });
    }
    submitSearch(state = {}) {
        const payload = this.estimatePayload;
        state = { ...payload, ...state };
        state.columnas_actuales = Alpine.raw(this.columnas_actuales);
        state.columnas_visibles = Alpine.raw(this.columnas_visibles);
        state.filter = 1;
        state.from = state.from || Number(Date.now() / 1000).toFixed(0);
        let endpoint = location.origin + '/api/negocios/apply_filter';
        if (this.searchUrl)
            endpoint = location.origin + this.searchUrl.replace(location.origin, '');
        //@ts-ignore
        Alpine.store('user').ongoingSearchOperation = true;
        console.table(state.columnas_actuales);
        this.info('submitSearch', state);
        this.$store.negocios.complete = false;
        return this.$store.negocios.fetchFilteredRecords(endpoint, {
            method: 'post',
            headers: {},
            state,
            page: 1
        })
            .then(async (result) => {
            //@ts-ignore
            setTimeout(() => Alpine.store('user').ongoingSearchOperation = false);
            //ifDefined(globalThis.mapFrameData, (mapFrameData) => mapFrameData.reload())
            //ifDefined(globalThis.bsTable, (bsTable) => bsTable.reload && bsTable.reload())
            setTimeout(() => this.$store.negocios.total = this.$store.negocios.properties.length, 1000);
            return result;
        })
            .catch(e => {
            //@ts-ignore
            Alpine.store('user').ongoingSearchOperation = false;
        });
    }
    async getEstimateOriginal(options) {
        const estimate_url = new URL(location.origin + '/api/filtros/estimate_filter');
        estimate_url.pathname += `/${this.properties.id}`;
        if (options.include_columns) {
            estimate_url.searchParams.append('include_columns', '1');
        }
        setTimeout(() => {
            this.estimatePromise = null;
        }, 2000);
        return BaseClass.staticFetchWrapper(estimate_url.toString(), {
            method: 'POST',
            body: JSON.stringify(this.estimatePayload),
        }).then((results) => {
            results = results;
            //@ts-ignore
            let { total, new_total, default_filter_id, columnas_visibles } = results || {};
            this.marquee('estimate', {
                total,
                new_total,
                default_filter_id,
                columnas_visibles,
            });
            this.estimatePromise = null;
            this.estimate = total;
            let freshResult = { estimate: this.estimate, columnas_visibles };
            this.processEventListeners('probe', freshResult);
            this.redrawing = false;
            return freshResult;
        }).catch(err => {
            this.redrawing = false;
            this.estimatePromise = null;
            let fallbackResult = {
                estimate: this.estimate,
                columnas_visibles: options.include_columns ? this.$store.columnas_actuales.columnDefs : this.columnas_visibles
            };
            return fallbackResult;
        });
    }
    async updateColumnDefs() {
        //const result = await this.getEstimate({ include_columns: true })
        this.$store.columnas_actuales.reloadCampos(this.columnas_actuales, true);
        return this.columnas_actuales;
    }
    async submitTwice() {
        this.$store.columnas_actuales.once('columns_updated', async () => {
            this.$store.negocios.ready = false;
            await this.submitSearch({ limit: 5500, from: Number(Date.now() / 1000).toFixed(0) });
            setTimeout(() => this.submitSearch({ limit: 5500, from: Number(Date.now() / 1000).toFixed(0) }));
        });
        this.updateColumnDefs();
    }
    get filtros() {
        return this.filterIds.map((id) => this.filterMap.get(id));
    }
    set filtros(filtros) {
        console.log('set filtros', filtros);
        this.filterIds = [];
        let newFiltros = normalizeFiltros(filtros).map((f, index) => {
            // f = f instanceof EnrichedFilter ? f : new EnrichedFilter(f)
            this.filterIds.push(String(f.id));
            return f;
        });
        this.properties.filtros = newFiltros;
        //@ts-ignore
        this.filterMap = new Map(newFiltros.map((f) => [f.id, f]));
    }
    get updated_at() {
        return this.properties.updated_at;
    }
    set updated_at(updated_at) {
        this.properties.updated_at = updated_at;
    }
    updateProperties(newProperties) {
        let { columnas_visibles, id, name, user_id, filtros, updated_at, created_at, opt_group, areas_subareas, public: isPublic, author, columnas_actuales, ...otherProps } = newProperties || this.properties;
        this.author = author;
        console.marquee({
            'Filter name is "': '',
            [name]: 'color:blue;font-weight:bold',
            '"': '',
        });
        if (!id)
            isPublic = true;
        this.properties = {
            columnas_actuales: Alpine.raw(columnas_actuales),
            columnas_visibles: Alpine.raw(columnas_visibles),
            updated_at,
            created_at,
            id,
            name,
            user_id,
            author,
            filtros: Alpine.raw(filtros),
            //@ts-ignore
            filtros2: filtros,
            opt_group,
            areas_subareas,
            public: isPublic,
            ...otherProps,
        };
        this.properties.columnas_visibles = (Array.isArray(columnas_visibles) && columnas_visibles.length) ? Alpine.raw(columnas_visibles) : [
            61,
            139,
            70,
            71,
            65,
            62
        ];
        this.properties.columnas_visibles = Array.from(new Set([...this.properties.columnas_visibles].map((c) => String(c))));
        this.columnas_actuales = this.infer_columnas_actuales(columnas_actuales);
        this.properties.columnas_actuales = columnas_actuales;
        this.properties.opt_group = this.properties.opt_group || 'Otros';
        this.properties.areas_subareas = this.properties.areas_subareas || [];
        this.author = this.properties.author;
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.public = !!isPublic;
        //this.properties.public = !!this.properties.public;
        //this.properties.user_id = this.properties.user_id || (Alpine.store('user') as IUserStore).id
        try {
            this.properties.filtros = this.properties.filtros || [];
            this.normalizeFiltros(filtros ?? []);
        }
        catch (e) {
            console.error(e);
        }
        this.columnas_actuales.forEach((c) => {
            c.id = Number(c.id);
            c.visible = c.visible ?? true;
            if (this.$store.campos_busqueda.get(c.id)) {
                let { slug_name } = this.$store.campos_busqueda.get(c.id);
                c.slug_name = slug_name;
            }
        });
        this.reloadCampos();
        if (!this.ready) {
            this.ready = true;
            this.processEventListeners('ready', this);
        }
    }
    onReady(handler) {
        return this.once('ready', handler);
    }
    normalizeFiltros(filtros) {
        this.filterMap = new Map();
        this.filterIds = [];
        filtros = filtros || this.properties.filtros;
        if (!filtros.length)
            filtros.push(this.createDummyFilter());
        this.properties.filtros = normalizeFiltros(filtros).map((f, index) => {
            f.conector = f.conector || 'AND';
            f.index = index;
            this.filterIds.push(String(f.id));
            //@ts-ignore
            return f;
        });
        this.properties.filtros.forEach((filtro) => this.filterMap.set(filtro.id, filtro));
    }
    syncFiltrosWithAvailableInfo() {
        let availableFiltro = this.get(this.id);
        if (availableFiltro) {
            this.normalizeFiltros(availableFiltro.filtros);
            this.columnas_visibles = availableFiltro.columnas_visibles;
            this.columnas_actuales = availableFiltro.columnas_actuales;
        }
    }
    appendFiltro() {
        if (!Array.isArray(this.filterIds)) {
            this.filterIds = [];
            this.normalizeFiltros();
        }
        let lengthBefore = this.filterMap.size;
        let newFiltro = this.createDummyFilter();
        newFiltro.index = lengthBefore; // this.filtros.length;
        newFiltro.id = uuidv4(); // 'f' + this.nextIndex
        newFiltro.parent_id = Number(this.id);
        const filtro = new EnrichedFilter(newFiltro);
        this.properties.filtros.push(filtro);
        this.filterMap.set(filtro.id, filtro);
        this.filterIds.push(filtro.id);
        /*setTimeout(() => {
            console.log({ filtro, lengthBefore, lengthAfter: this.filterMap.size })
            this.printTable()
        }, 500)*/
        return filtro;
    }
    reloadCampos() {
        //@ts-ignore
        this.$store.columnas_actuales.syncWithActiveFilter();
    }
    rollBack() {
        this.setActive(this.id);
    }
    toggleRedrawing() {
        this.redrawing = true;
        this.debouncedDisableRedrawing();
    }
    getActive() {
        return this.get(this.id);
    }
    getSafeProperies(id) {
        id = Number(id ?? this.id);
        let { filtros, ...newProperties } = this.get(id) || {};
        filtros = (filtros || []).map(filtro => {
            return { ...Alpine.raw(filtro) };
        });
        return { id, filtros, ...newProperties };
    }
    async setActive(id) {
        id = Number(id ?? this.id);
        //if (Number(this.id) === Number(id)) return;
        let { filtros, ...newProperties } = this.get(id) || {};
        this.ready = false;
        this.once('ready', () => this.updateColumnDefs());
        this.$store.tipos_busqueda.once('ready').then(() => {
            this.updateProperties(this.getSafeProperies(id));
            this.id = id;
            this.name = this.properties.name;
            if (this.controls.has('columnas_disponibles_control')) {
                this.controls.get('columnas_disponibles_control').resetSelectedOptions(([...this.columnas_visibles] || []).join(','));
            }
            this.default_changed = true;
            // apply the original filter valor_busqueda yo each filter instace
            /*setTimeout(() => {
                this.filtros.forEach((filtro) => {
                    filtro.valor_busqueda = filtro.valor_busqueda ?? filtro._filtro.valor_busqueda;
                });
                this.normalizeFiltros()
            }, 500);*/
        });
        return this.redrawing = true;
    }
    get(id) {
        if (id == 0)
            return this.emptyFilter;
        return this.filtrosDisponibles.find((f) => Number(f.id) === Number(id || this.id));
    }
    /**
     * Reads a cookie in the user's browser to decide if
     * the page should be reloaded after a filter is saved, or when
     * the default filter is changed
     */
    get prevent_reload() {
        return true || globalThis.readCookie('debug_lcdj');
    }
    reloadAvailableFilters(setActive = null) {
        this.filtrosDisponibles = [];
        setActive = setActive || this.id;
        return BaseClass.staticFetchWrapper('/api/filtros/get_available_filters', {
            headers: {
                'cache-control': 'no-cache',
            },
        })
            .then(async (filtros) => {
            //@ts-ignore
            if (setActive) {
                //@ts-ignore
                this.once('filters_loaded', () => this.setActive(setActive));
            }
            await this.loadFiltrosDisponibles(filtros);
            return filtros;
        });
    }
    getCurrentFilter() {
        globalThis.activeFilterPromise = staticFetchWrapper('/api/filtros/current_filter', {}).then(res => {
            console.timerInfo('received activeFilterPromise result from sw', res.id);
            return res;
        });
    }
    async init() {
        this.marquee(' init ');
        this.updateProperties(this.properties);
        this.properties.filtros = normalizeFiltros((this.properties || {}).filtros || []);
    }
    removeAt(id, retry = 0) {
        this.filterIds = this.filterIds.filter((fid) => fid !== id);
        this.properties.filtros = this.properties.filtros.filter((f) => f.id !== id);
        return this.filterMap.delete(id);
    }
    moveFilter(from, to) {
        let filterIds = [...this.filterIds].slice(0);
        let moved = filterIds.splice(from, 1)[0];
        filterIds.splice(to, 0, moved);
        this.filterIds = filterIds;
        this.properties.filtros = this.filterIds.map((id) => {
            return this.properties.filtros.find((f) => f.id == id);
        });
        console.table(this.filtros.map((f) => f.campo_busqueda));
    }
    get columnas_visibles() {
        return Array.from(new Set(this.properties.columnas_visibles));
    }
    set columnas_visibles(columnas_visibles) {
        this.properties.columnas_visibles = Array.from(new Set(columnas_visibles));
    }
    get columnas_actuales() {
        return this.infer_columnas_actuales(this.properties.columnas_actuales);
    }
    set columnas_actuales(columnas_actuales) {
        this.properties.columnas_actuales = this.infer_columnas_actuales(columnas_actuales);
        this.columnas_visibles = this.columnas_actuales.map((c) => c.id);
    }
    get_or_infer_columnas_actuales() {
        if (!this.columnas_actuales)
            this.columnas_actuales = this.infer_columnas_actuales();
        return this.columnas_actuales;
    }
    sync_columnas_actuales() {
        this.columnas_actuales = this.infer_columnas_actuales();
        return this.columnas_actuales;
    }
    infer_columnas_actuales(columnas_actuales) {
        columnas_actuales = Array.isArray(columnas_actuales) ? columnas_actuales :
            (Array.isArray(this.properties.columnas_actuales) ? this.properties.columnas_actuales : this.$store.columnas_actuales.columnDefs);
        let actuales = Array.from(new Set(this.columnas_visibles))
            .map((c) => Number(c))
            .map((c) => {
            let actual = (columnas_actuales).find((ca) => ca.id == c) || {
                id: c,
                visible: true,
            };
            let campo = this.$store.campos_busqueda.get(c);
            return {
                id: c,
                slug_name: campo?.slug_name.replace('fechaCracion', 'created_at'),
                visible: actual.visible ?? true,
            };
        });
        return Array.from(new Set(actuales));
    }
    get name() {
        return this.properties.name;
    }
    set name(name) {
        //name = String(name).trim()
        if (name && name !== this.properties.name) {
            this.properties.name = name;
        }
    }
    get public() {
        return !!this.properties.public;
    }
    set public(flag) {
        this.properties.public = !!flag;
    }
    get opt_group() {
        return this.properties.opt_group;
    }
    set opt_group(opt_group) {
        this.properties.opt_group = opt_group;
    }
    get areas_subareas() {
        return this.properties.areas_subareas;
    }
    set areas_subareas(areas_subareas) {
        this.properties.areas_subareas = areas_subareas;
    }
    createDummyFilter() {
        return dummyFilter();
    }
    enrichFilter(filtro) {
        return enrichFilter(filtro);
    }
    printColumns() {
        let combinedColumns = this.columnas_visibles.map((c) => {
            let actual = this.columnas_actuales.find((ca) => ca.id == c);
            return {
                id_visible: c,
                id_actual: actual?.id,
                slug_name: actual?.slug_name,
                visible: actual?.visible,
            };
        });
        console.table(combinedColumns);
    }
    printTable(filters = null) {
        printFilters((filters ?? this.enrichedFilters).map((f) => {
            let filtro = f._filtro || f;
            filtro.tipo = f.operation || f.tipo;
            return filtro;
        }), ['attr_type', 'slug_name', 'tipo', 'valor_busqueda', 'conector']);
    }
    at(index) {
        return this.filtros[index] || {};
    }
    get enrichedFilters() {
        return this.properties.filtros;
    }
    suggestNewName() {
        return [(this.name || 'nuevo filtro ').split(' v202')[0], new Date().toISOString().replace(/-/g, '').replace('T', ' ').substr(0, 14)
        ].join(' v');
    }
    async setDefaultFilter(id) {
        return this.setActive(id).then(() => staticFetchWrapper('/api/filtros/change_default_filter', {
            method: 'POST',
            body: JSON.stringify({ default_filter: id }),
        }).then(jsonRes => {
            this.$store.user.displayLoadingMessage = false;
            // ifDefined(this.collapseOne, (collapseOne) => collapseOne.classList.remove('opacity-25'));
            //ifDefined(this.tsWrapper, (collapseOne) => collapseOne.classList.remove('disabled'));
            openToast({
                //@ts-ignore
                type: jsonRes.type,
                //@ts-ignore
                text: 'Cambio de filtro guardado',
                description: jsonRes.message,
                delay: 4000,
                from: 'selectorFiltroDefault',
            });
            //this.updateProperties(jsonRes)
        }));
    }
    populateEmptyFilter() {
        let emptyFilter = this.emptyFilter;
        if (globalThis.defaultFieldsPromise) {
            globalThis.defaultFieldsPromise.then((fields) => {
                emptyFilter.columnas_actuales = fields.map(field => {
                    let { slug_name, id, visible } = field;
                    return { slug_name, id, visible };
                });
                emptyFilter.columnas_visibles = fields.map(f => f.id);
                this.updateProperties(emptyFilter);
            });
        }
        else {
            this.updateProperties(emptyFilter);
        }
        this.redrawing = true;
        this.searchUrl = null;
    }
}
Object.defineProperty(ActiveFilterStore.prototype, 'id', { enumerable: true, writable: true });
Object.defineProperty(ActiveFilterStore.prototype, 'name', { enumerable: true, writable: true });
export const activeFilterStore = () => {
    return new ActiveFilterStore();
};
//# sourceMappingURL=activeFilterStore.js.map