import { staticFetchWrapper } from '@/components/decorators';
import { DummyNegocio } from '@/components/entities/DummyNegocio';
import { Negocio } from '@/components/entities/Negocio';
import { BaseClass } from '@/components/stores';
import { IApiSortOrder, INegocioRow, INegocioStore } from '@lacasadejuana/types';
import Alpine from 'alpinejs';
import { bindConsole } from '../../components';

type TBakendPaginatorPayload = {
    total: number;
    per_page: number;
    last_page: number;
    // data: Record<string, INegocioRow> | INegocioRow[]
}
type TPaginatorOptions = {
    per_page: number;
    total: number;
    last_page: number;
    request_id: string;
    next_page_url: string;
};

export class NegocioStore extends BaseClass implements INegocioStore, IApiSortOrder {
    className = 'NegocioStore'
    model = null
    total = 0
    state = {
        from: 0,
        to: 0,
        total: 0
    }
    per_page = 0
    last_page = 0
    current_page = 1
    properties: Negocio[] = []
    activeFilterIcon = 'fa fa-filter'
    ready: boolean = false
    complete: boolean = false
    limit = null
    dummy = null
    token: string
    request_id: string
    next_page_url = location.origin + '/api/negocios'
    urlInstance = new URL(location.href)
    savingPromise: Promise<unknown>
    [s: string]: any


    apiSortBy: 'id' | 'created_at' = 'created_at'
    protected timerColor: string = 'color:cobalt;font-weight:bold'
    protected classNameColor: string = 'color:cobalt;font-weight:bold;'
    constructor() {
        super()
        this.ready = false
        this.complete = false;
        this.classNameColor = 'color:cobalt;font-weight:bold;'
        this._console = bindConsole(this.className, this.classNameColor)

        this.init()
    }
    get deals_with_coordinates(): INegocioRow[] {
        return this.data.filter(n => (n.lat && n.lng) || (n._extra_props.lat && n._extra_props.lng))
    }
    init() {
        this.marquee(' init ')


    }

    async fetchAll(page = 0) {
        return this.next().then(res => {

            if (this.next_page_url || this.complete === false) return this.fetchAll();
            this.processEventListeners('complete', this.properties)
            return this.properties;
        })
    }
    setOptions({
        per_page,
        total,
        last_page,
        request_id,
        next_page_url
    }: TPaginatorOptions) {
        this.per_page = per_page;
        this.total = total;
        this.last_page = last_page;
        this.request_id = request_id
        this.next_page_url = next_page_url;
        return this
    }
    openModalEdition() {
        //console.log('opening modal edition')
        this.dummy.syncInitialValues()
        //@ts-ignore
        this.model = this.dummy
    }
    get to() {
        return (this.properties[this.properties.length - 1] || 500000)
    }
    stopFetching(cb?: Function) {
        this.ready = true;
        this.next_page_url = null;
        this.complete = true
        cb && cb([])


        this.marquee('processing onComplete handlers ')
        this.processEventListeners('complete', this.properties)
        this.$store.active_filter.clearLoading(2500)

        return []
    }
    fetchPromises: Record<string, Promise<INegocioRow[]>> = {};
    fetchResults: Record<string, TPaginatorOptions> = {};

    abortController: AbortController | null = null

    async restart() {
        //@ts-ignore
        let total = this.$store.active_filter.estimate;
        this.next_page_url = location.origin + `/maps/api/negocios?from=${Number(Date.now() / 1000).toFixed(0)}&total=${total}&limit=500`;
        this.complete = false;
        this.ready = true;
        this.properties = [];
        return this.fetchAll()
    }

    async next(page: number = 1, cb?: Function): Promise<INegocioRow[]> {

        if (!globalThis.backendPaginator || globalThis.backendPaginator.total === undefined || globalThis.logging_out) {
            return this.stopFetching(cb)
        }
        if (!this.next_page_url) {
            this.stopFetching(cb)
            return this.properties;
        }

        //@ts-ignore
        let token = document.querySelector('meta[name="csrf"]') && document.querySelector('meta[name="csrf"]').content



        //const limit = (globalThis.backendPaginator.total) + 12
        const next_page_url = this.next_page_url;
        if (this.fetchPromises[next_page_url]) return this.fetchPromises[next_page_url]
        this.marquee(`dataLength: ${this.data.length} fetching ${this.next_page_url}`)
        let url = new URL(next_page_url)

        url.searchParams.set('total', String(this.total))
        url.searchParams.set('limit', '500')

        let current_progress = this.properties.length / (this.total ?? 50);

        this.$store.active_filter.setLoading(this.properties.length < 100 ? 30 : current_progress, 'Cargando negocios')

        this.abortController = new AbortController();
        const signal = this.abortController.signal;

        this.fetchPromises[this.next_page_url] = fetch(url.toString(), {
            signal,
            headers: {
                'Content-Type': 'application/json',
                expect: 'application/json',
                'X-CSRF-TOKEN': token,
            },
        }).then(async (res): Promise<INegocioRow[]> => {
            if (!res.ok) {
                return this.stopFetching(cb)
            }
            const data = await this.processResult(res, next_page_url)


            //this.marquee(`next page url is ${this.next_page_url}`)
            if (data.length === 0) {
                return this.stopFetching(cb)
            }
            cb && cb(data)
            //console.timeEnd('fetch ' + this.per_page + ' records')
            this.ready = true;

            //console.timerInfo('finished requesting data to API')


            return (this.data.length === 0 ? this.reload(data) : this.append(data));

        }).catch(err => {
            return this.stopFetching(cb)
        });
        return this.fetchPromises[this.next_page_url];

    }
    get data() {
        return this.properties;
    }
    normalizeNegocio(row: INegocioRow, slug_names: string[]): Negocio {
        //@ts-ignore
        row.fecha_creacion_visual = new Date(row.created_at).toLocaleDateString('es-CL')
        //@ts-ignore
        row.fechaCreacion = new Date(row.created_at).toLocaleDateString('es-CL')
        return new Negocio(row, this.$store.columnas_actuales.currentSlugs)
    }
    async recreateNegocios() {
        this.$store.active_filter.setLoading(
            1 / 3,
            'Regenerando negocios'
        )
        let currentSlugs = Array.from(new Set(Alpine.raw(this.$store.columnas_actuales.currentSlugs.concat(this.$store.active_filter.currentSlugs))))

        this.properties.forEach(row => {
            Object.entries({
                ...Object.fromEntries(row.initial), ...row._extra_props
            }).filter(([key]) => currentSlugs.includes(key)).forEach(([key, value]) => {
                row.initial.set(key, value);
            });
        })
        return this.processEventListeners('complete', this.properties)
    }
    append(rows): Promise<INegocioRow[]> {
        return new Promise(res => {
            return this.$store.active_filter.once('ready').then(() => {
                this.$store.active_filter.setLoading(
                    1 / 3,
                    'Cargando negocios'
                )
                let currentSlugs = Array.from(new Set(Alpine.raw(this.$store.columnas_actuales.currentSlugs.concat(this.$store.active_filter.currentSlugs))))

                let newRows = (Object.values(rows) as INegocioRow[])
                    .filter(r => !this.ids.includes(r.id));
                let newRowsNormalized = newRows.map(row => this.normalizeNegocio(row, currentSlugs));
                this.properties = this.properties.concat(newRowsNormalized);



                res(newRowsNormalized as INegocioRow[])
            })
        });

    }

    reload(rows): Promise<INegocioRow[]> {



        return new Promise(res => {
            return this.$store.active_filter.once('ready').then(() => {

                let currentSlugs = Array.from(new Set(Alpine.raw(this.$store.columnas_actuales.currentSlugs.concat(this.$store.active_filter.currentSlugs))))
                this.$store.active_filter.setLoading(
                    1 / 3,
                    'Cargando negocios'
                )

                // we need to create a dummy negocio to be able to perform mass edition
                // however we avoid instancing it on the constructor because it's too early
                // for the columnas_actuales store to be populated
                this.dummy = new DummyNegocio({ id: 0 } as unknown as INegocioRow, currentSlugs)

                this.properties = rows.map(row => this.normalizeNegocio(row, currentSlugs));
                if (!this.ready) {
                    this.ready = true
                    this.marquee(' Finished ingesting first batch ')
                    this.processEventListeners('ready', this.properties)
                } else {
                    this.processEventListeners('reload', this.properties)
                }
                res(this.properties as INegocioRow[])
            })

        })
    }
    get checked(): Negocio[] {
        return this.properties.filter(n => n.checked) as Negocio[]
    }
    getDummy(): INegocioRow {
        return this.dummy
    }
    buffer: INegocioRow[] = []

    get url() {
        this.urlInstance = new URL(this.next_page_url) as URL;

        return this.urlInstance;
    }

    async fetchFilteredRecords(endpoint: string, {
        state,
        method,
        headers,
        page
    }: {
        page: number,
        state: Record<string, any>,
        method: string,
        headers: HeadersInit
    } = { page: 1, state: {}, method: 'GET', headers: [] }): Promise<INegocioRow[]> {

        endpoint = endpoint || new URL(this.$store.active_filter.searchUrl, location.origin).toString()
        state = state || {}
        //@ts-ignore
        state.limit = state.limit || 100;
        //@ts-ignore
        //console.zwarn('Fetching page ' + page)
        //if (page == 1) //console.time('fetchFilteredRecords')
        let url = new URL(endpoint),
            body = typeof state === 'string' ? state : JSON.stringify(state)
        if (page !== 0) {
            url.searchParams.set('page', page.toFixed(0))
        }

        this.abortController = new AbortController();
        this.current_page = page || 1;
        const signal = this.abortController.signal;

        // Fire fetch call
        const result = await staticFetchWrapper(url.toString(), {
            signal,
            method: method || 'post',
            body
        }).then(async (res): Promise<INegocioRow[]> => {
            const data = await this.processResult(res as Record<string, unknown>);


            (this.current_page === 1 ? this.reload(data) : this.append(data));

            if (!this.next_page_url) {
                this.stopFetching()

                return this.properties;
            }
            state.from = this.from
            state.total = this.total
            this.current_page++;
            // Recursive call to fetch the next page
            return this.fetchFilteredRecords(endpoint, { state, method, headers, page: this.current_page })

        });

        //console.timeEnd('fetchFilteredRecords')


        return result;
    }



    async processResult(res: Response | Record<string, unknown>, last_page_url?: string) {
        const result = typeof res.json === 'function' ? await res.json() : res;
        if (result.data) {
            result.data = Object.values(result.data);
            this.per_page = result.per_page
            this.last_page = result.last_page
            this.current_page = result.current_page
            this.next_page_url = result.next_page_url
            this.total = result.total
            this.from = result.from
            if (last_page_url) {
                this.fetchResults[last_page_url] = {
                    per_page: result.per_page,
                    last_page: result.last_page,
                    next_page_url: result.next_page_url,
                    total: result.total,
                    request_id: result.request_id
                }
            }
            return result.data
        }
        return []
    }

    toJson(id: number) {
        return this.toJSON(id)
    }
    toJSON(id): Feature {
        let negocio = this.getRaw(id);
        let { lng, lat, searchstring, ...props } = negocio
        let geometry = { type: 'Point', coordinates: [lng, lat] } as GeoJSON.Point

        //@ts-ignore
        let properties = Alpine.store('columnas_actuales').columnDefs.reduce((accum, c) => {
            let { slug_name, name, properties, input_type, id_input_type, ...rest } = c;
            accum[slug_name] = negocio[slug_name]
            if (id_input_type === "1" && Array.isArray(properties)) {
                let selected_value = properties.find(p => p.id === negocio[slug_name]);
                accum[slug_name] = selected_value ? selected_value.name : negocio[slug_name];
            }
            return accum
        }, {})
        return {
            type: 'Feature',
            id,
            properties,
            geometry
        }
    }

    get ids() {
        return this.data.map(n => n.id);
    }
    /**
     * Provided to avoid breaking changes
     */
    getRaw(id: string | number): Negocio {
        return this.properties.find(n => n.id === id) as Negocio;
    }
    get(id: string | number): Negocio {
        //@ts-ignore
        if (id === 0) return this.getDummy() as unknown as Negocio
        return this.properties.find(n => n.id === id) as Negocio;
    }
    at(index) {
        return this.data[index]
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
export const createNegociosStore = (): INegocioStore => {
    //@ts-ignore
    return new NegocioStore();
}
