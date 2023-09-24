import { BaseClass, bindConsole, requestAnimationPromise, waitFor } from '..';
import { v4 as uuidv4 } from 'uuid';
import { staticFetchWrapper } from '../decorators/staticFetchWrapper';
import { Preferencia } from '../entities/Preferencia';
export function createPreferenciaStore() {
    return new PreferenciasStore();
}
export class PreferenciasStore extends BaseClass {
    constructor() {
        super();
        this.properties = [];
        this.selectedRows = [];
        this.id = uuidv4();
        this.apiSortBy = 'id';
        this.timerColor = 'color:teal;font-weight:bold';
        this.classNameColor = 'color:teal;font-weight:bold;';
        this.total = 0;
        this.fetchPromises = [];
        this.is_aborted = false;
        this.ready = false;
        this.current_batch = null;
        this.ready = false;
        this.classNameColor = 'color:teal;font-weight:bold;';
        this.timerColor = 'color:teal;font-weight:bold;';
        this._console = bindConsole(this.className, this.classNameColor);
        this.fetchPromises = [];
        this.selectedRows = [];
    }
    async updateProperties({ from, total, next_page_url, data, }) {
        //this.solicitud_estados = solicitud_estados;
        // this.solicitud_subestados = solicitud_subestados;
        // this.solicitud_medios = solicitud_medios;
        this.total = total ?? this.properties.length;
        this.next_page_url = next_page_url ?? '/api/solicitudes_visita';
        this.properties = Object.values(data).map(s => new Preferencia(s));
        let last_preferencia = this.properties[this.properties.length - 1];
        this.from = from || last_preferencia.id;
        if (!this.ready) {
            this.ready = true;
            this._console.log('ready');
            this.marquee('ready');
            requestAnimationFrame(() => this.processEventListeners('ready', this));
        }
    }
    get(id) {
        return this.properties
            .find(solicitud => solicitud.id == id);
    }
    get last_preferencia() {
        return this.properties[this.properties.length - 1];
    }
    get preferenciasIds() {
        return this.properties.map(s => Number(s.id));
    }
    async fetchAll(options = { append: false, limit: 500, batch: null }) {
        //@ts-ignore
        let { batch, append, limit, ...params } = options;
        if (!batch && this.current_batch) {
            console.colorInfo('#C00', 'aborting current batch ' + this.current_batch);
            this.is_aborted = true;
            batch = uuidv4();
            this.current_batch = batch;
            await Promise.all(this.fetchPromises);
            this.is_aborted = false;
            append = false;
            this.properties = [];
            await waitFor(100);
        }
        return this.fetchProperties({ append, limit, ...params }).then(() => {
            if (this.next_page_url != null && !this.is_aborted)
                return requestAnimationPromise().then(() => waitFor(100)).then(() => this.fetchAll({ batch, append: true, limit, ...params }));
            this.current_batch = null;
            return this.properties;
        });
    }
    computeNextUrl(options = { append: false, limit: 500 }) {
        let { append, limit, ...params } = options;
        let url = new URL(this.next_page_url, location.origin);
        let formData = new FormData(document.querySelector('#preferencias_filter_form'));
        url.pathname = '/preferencias_busqueda';
        //@ts-ignore
        Object.entries(Object.fromEntries(formData)).forEach(([key, value]) => {
            url.searchParams.set(key, String(value));
        });
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, String(value));
        });
        if (append) {
            url.searchParams.set('from', String(this.from));
            url.searchParams.set('total', String(this.total));
        }
        else {
            url.searchParams.set('from', this.apiSortBy === 'id' ? '500000' : String(Date.now() / 1000));
            url.searchParams.delete('total');
            this.properties = [];
        }
        url.searchParams.set('records_length', String(this.properties.length));
        url.searchParams.set('limit', String(limit ?? 500));
        return url;
    }
    fetchProperties(options = { append: false, limit: 500 }) {
        let { append, limit, ...params } = options;
        if (this.is_aborted) {
            return this.properties;
        }
        let url = this.computeNextUrl({ append, limit, ...params });
        if (!append) {
            globalThis.bsTable.bootstrapTable('removeAll');
            globalThis.bsTable.bootstrapTable('showLoading');
        }
        if (append && !this.next_page_url)
            return Promise.resolve(this.properties);
        this.is_fetching = true;
        let fetchPromise = staticFetchWrapper(url.toString(), {
            headers: {
                data_from: String(this.from)
            }
        })
            .then(({ data, total, from, next_page_url }) => {
            console.info({ data });
            this.total = total;
            this.from = from;
            this.next_page_url = next_page_url;
            if (append) {
                let newSolicitudes = data.filter(s => !this.preferenciasIds.includes(Number(s.id))).map(s => new Preferencia(s));
                this.properties = this.properties.concat(newSolicitudes);
                this.console.log('appending', newSolicitudes.length, 'preferencias');
            }
            else {
                globalThis.bsTable.bootstrapTable('selectPage', 1);
                globalThis.bsTable.bootstrapTable('hideLoading');
                this.properties = data.map(s => new Preferencia(s));
                globalThis.bsTable.bootstrapTable('refresh');
            }
            return this.properties;
        });
        this.fetchPromises.push(fetchPromise);
        fetchPromise.then(() => fetchPromise.fulfilled = true);
        return fetchPromise;
    }
    get pendingPromises() {
        return this.fetchPromises.filter(p => !p.fulfilled);
    }
    at(index) {
        return this.properties[index];
    }
    push(item) {
        return this.properties.push(item);
    }
    pop() {
        let item = this.properties.pop();
        console.log({
            item
        });
        return item;
    }
}
//# sourceMappingURL=PreferenciasStore.js.map