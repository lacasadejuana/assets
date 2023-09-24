import { bindConsole } from '@lacasadejuana/types';
import Alpine from 'alpinejs';
import { staticFetchWrapper } from '../../components/decorators';
import { BaseClass } from '../../components/stores';
import { DummyNegocio } from '../entities/DummyNegocio';
import { Negocio } from '../entities/Negocio';
export class NegocioStore extends BaseClass {
    constructor() {
        super();
        this.className = 'NegocioStore';
        this.model = null;
        this.total = 0;
        this.state = {
            from: 0,
            to: 0,
            total: 0
        };
        this.per_page = 0;
        this.last_page = 0;
        this.current_page = 1;
        this.properties = [];
        this.activeFilterIcon = 'fa fa-filter';
        this.ready = false;
        this.complete = false;
        this.limit = null;
        this.dummy = null;
        this.next_page_url = location.origin + '/api/negocios';
        this.urlInstance = new URL(location.href);
        this.apiSortBy = 'created_at';
        this.timerColor = 'color:cobalt;font-weight:bold';
        this.classNameColor = 'color:cobalt;font-weight:bold;';
        this.fetchPromises = {};
        this.fetchResults = {};
        this.abortController = null;
        this.buffer = [];
        this.ready = false;
        this.complete = false;
        this.classNameColor = 'color:cobalt;font-weight:bold;';
        this._console = bindConsole(this.className, this.classNameColor);
        this.init();
    }
    get deals_with_coordinates() {
        return this.data.filter(n => (n.lat && n.lng) || (n._extra_props.lat && n._extra_props.lng));
    }
    init() {
        this.marquee(' init ');
    }
    async fetchAll(page = 0) {
        return this.next().then(res => {
            if (this.next_page_url || this.complete === false)
                return this.fetchAll();
            this.processEventListeners('complete', this.properties);
            return this.properties;
        });
    }
    setOptions({ per_page, total, last_page, request_id, next_page_url }) {
        this.per_page = per_page;
        this.total = total;
        this.last_page = last_page;
        this.request_id = request_id;
        this.next_page_url = next_page_url;
        return this;
    }
    openModalEdition() {
        //console.log('opening modal edition')
        this.dummy.syncInitialValues();
        //@ts-ignore
        this.model = this.dummy;
    }
    get to() {
        return (this.properties[this.properties.length - 1] || 500000);
    }
    stopFetching(cb) {
        this.ready = true;
        this.next_page_url = null;
        this.complete = true;
        cb && cb([]);
        this.marquee('processing onComplete handlers ');
        this.processEventListeners('complete', this.properties);
        return [];
    }
    async restart() {
        //@ts-ignore
        let total = this.$store.active_filter.estimate;
        this.next_page_url = location.origin + `/api/negocios?from=${Number(Date.now() / 1000).toFixed(0)}&total=${total}&limit=500`;
        this.complete = false;
        this.ready = true;
        this.properties = [];
        return this.fetchAll();
    }
    async next(page = 1, cb) {
        if (!globalThis.backendPaginator || globalThis.backendPaginator.total === undefined || globalThis.logging_out) {
            return this.stopFetching(cb);
        }
        if (!this.next_page_url) {
            this.stopFetching(cb);
            return this.properties;
        }
        const tokenElement = document.querySelector('[name="_token"]');
        if (!tokenElement)
            throw new Error('no element matching [name="_token"]');
        const token = tokenElement.value;
        //const limit = (globalThis.backendPaginator.total) + 12
        const next_page_url = this.next_page_url;
        if (this.fetchPromises[next_page_url])
            return this.fetchPromises[next_page_url];
        this.marquee(`dataLength: ${this.data.length} fetching ${this.next_page_url}`);
        let url = new URL(next_page_url);
        url.searchParams.set('total', String(this.total));
        url.searchParams.set('limit', '500');
        this.abortController = new AbortController();
        const signal = this.abortController.signal;
        this.fetchPromises[this.next_page_url] = fetch(url.toString(), {
            signal,
            headers: {
                'Content-Type': 'application/json',
                expect: 'application/json',
                'X-CSRF-TOKEN': token,
            },
        }).then(async (res) => {
            if (!res.ok) {
                return this.stopFetching(cb);
            }
            const data = await this.processResult(res, next_page_url);
            //this.marquee(`next page url is ${this.next_page_url}`)
            if (data.length === 0) {
                return this.stopFetching(cb);
            }
            cb && cb(data);
            //console.timeEnd('fetch ' + this.per_page + ' records')
            this.ready = true;
            //console.timerInfo('finished requesting data to API')
            return (this.data.length === 0 ? this.reload(data) : this.append(data));
        }).catch(err => {
            return this.stopFetching(cb);
        });
        return this.fetchPromises[this.next_page_url];
    }
    get data() {
        return this.properties;
    }
    normalizeNegocio(row, slug_names) {
        //@ts-ignore
        row.fecha_creacion_visual = new Date(row.created_at).toLocaleDateString('es-CL');
        //@ts-ignore
        row.fechaCreacion = new Date(row.created_at).toLocaleDateString('es-CL');
        return new Negocio(row, this.$store.columnas_actuales.currentSlugs);
    }
    append(rows) {
        return new Promise(res => {
            return this.$store.columnas_actuales.once('ready').then(() => {
                let newRows = Object.values(rows)
                    .filter(r => !this.ids.includes(r.id));
                let newRowsNormalized = newRows.map(row => this.normalizeNegocio(row, Alpine.raw(this.$store.columnas_actuales.currentSlugs)));
                this.properties = this.properties.concat(newRowsNormalized);
                res(newRowsNormalized);
            });
        });
    }
    reload(rows) {
        // we need to create a dummy negocio to be able to perform mass edition
        // however we avoid instancing it on the constructor because it's too early
        // for the columnas_actuales store to be populated
        this.dummy = new DummyNegocio({ id: 0 }, this.$store.columnas_actuales.currentSlugs);
        return new Promise(res => {
            return this.$store.columnas_actuales.once('ready').then(() => {
                this.properties = rows.map(row => this.normalizeNegocio(row, Alpine.raw(this.$store.columnas_actuales.currentSlugs)));
                if (!this.ready) {
                    this.ready = true;
                    this.marquee(' Finished ingesting first batch ');
                    this.processEventListeners('ready', this.properties);
                }
                res(this.properties);
            });
        });
    }
    get checked() {
        return this.properties.filter(n => n.checked);
    }
    getDummy() {
        return this.dummy;
    }
    get url() {
        this.urlInstance = new URL(this.next_page_url);
        return this.urlInstance;
    }
    async fetchFilteredRecords(endpoint, { state, method, headers, page } = { page: 1, state: {}, method: 'GET', headers: [] }) {
        endpoint = endpoint || new URL(this.$store.active_filter.searchUrl, location.origin).toString();
        state = state || {};
        //@ts-ignore
        state.limit = state.limit || 100;
        //@ts-ignore
        //console.zwarn('Fetching page ' + page)
        //if (page == 1) //console.time('fetchFilteredRecords')
        let url = new URL(endpoint), body = typeof state === 'string' ? state : JSON.stringify(state);
        url.searchParams.set('page', page.toFixed(0));
        this.abortController = new AbortController();
        this.current_page = page || 1;
        const signal = this.abortController.signal;
        // Fire fetch call
        const result = await staticFetchWrapper(url.toString(), {
            signal,
            method: method || 'post',
            body
        }).then(async (res) => {
            const data = await this.processResult(res);
            (this.current_page === 1 ? this.reload(data) : this.append(data));
            if (!this.next_page_url) {
                this.stopFetching();
                return this.properties;
            }
            state.from = this.from;
            state.total = this.total;
            this.current_page++;
            // Recursive call to fetch the next page
            return this.fetchFilteredRecords(endpoint, { state, method, headers, page: this.current_page });
        });
        //console.timeEnd('fetchFilteredRecords')
        return result;
    }
    async processResult(res, last_page_url) {
        const result = typeof res.json === 'function' ? await res.json() : res;
        if (result.data) {
            result.data = Object.values(result.data);
            this.per_page = result.per_page;
            this.last_page = result.last_page;
            this.current_page = result.current_page;
            this.next_page_url = result.next_page_url;
            this.total = result.total;
            this.from = result.from;
            if (last_page_url) {
                this.fetchResults[last_page_url] = {
                    per_page: result.per_page,
                    last_page: result.last_page,
                    next_page_url: result.next_page_url,
                    total: result.total,
                    request_id: result.request_id
                };
            }
            return result.data;
        }
        return [];
    }
    toJson(id) {
        return this.toJSON(id);
    }
    toJSON(id) {
        let negocio = this.getRaw(id);
        let { lng, lat, searchstring, ...props } = negocio;
        let geometry = { type: 'Point', coordinates: [lng, lat] };
        //@ts-ignore
        let properties = Alpine.store('columnas_actuales').columnDefs.reduce((accum, c) => {
            let { slug_name, name, properties, input_type, id_input_type, ...rest } = c;
            accum[slug_name] = negocio[slug_name];
            if (id_input_type === "1" && Array.isArray(properties)) {
                let selected_value = properties.find(p => p.id === negocio[slug_name]);
                accum[slug_name] = selected_value ? selected_value.name : negocio[slug_name];
            }
            return accum;
        }, {});
        return {
            type: 'Feature',
            id,
            properties,
            geometry
        };
    }
    get ids() {
        return this.data.map(n => n.id);
    }
    /**
     * Provided to avoid breaking changes
     */
    getRaw(id) {
        return this.properties.find(n => n.id === id);
    }
    get(id) {
        //@ts-ignore
        if (id === 0)
            return this.getDummy();
        return this.properties.find(n => n.id === id);
    }
    at(index) {
        return this.data[index];
    }
    splice(id) {
        let position = this.ids.indexOf(id);
        if (position) {
            this.properties.splice(position, 1);
        }
    }
    /**
     * the new value comes from coalescing the allowed properties, stripping readonly keys and replacing them using their getter
     * @param    {Object}    data
     **/
    set(id, data = {}) {
        throw new Error(`Deprecated. Use Negocio.set(slug_name, value)`);
    }
    async setProperty(id, property, value) {
        return this.get(id).setProperty(property, value);
    }
    setModel(model) {
        this.model = model;
        return this;
    }
}
export const createNegociosStore = () => {
    //@ts-ignore
    return new NegocioStore();
};
//# sourceMappingURL=createNegociosStore.js.map