///import Alpine from 'alpinejs'
import ScrollBooster from 'scrollbooster';
import { tap } from '../../../components/plugins';
const negociosFullDatatable = (tableData, 
//columnas_visibles: Record<string, ColumnaVisible>,
config = { perPage: 50, currentPage: 1 }) => {
    const modifiedTableData = tableData.map(row => {
        let searchstring = Object.values(row).join(' ').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
        return { searchstring, ...row };
    }), defaultSort = {
        field: 'id',
        rule: 'desc'
    };
    return {
        slideCount: 4,
        activeIndex: 0,
        hideScrollbar: false,
        term: '',
        prev(e) {
            if (this.activeIndex > 0) {
                e.scrollLeft = e.clientWidth * (this.activeIndex - 1);
                this.activeIndex--;
            }
        },
        next(e) {
            if (this.activeIndex < this.slideCount - 1) {
                e.scrollLeft = e.clientWidth * (this.activeIndex + 1);
                this.activeIndex++;
            }
        },
        updateIndex(e) {
            if (e.scrollLeft < e.clientWidth) {
                this.activeIndex = 0;
            }
            else {
                this.activeIndex = Math.round(e.scrollLeft / e.clientWidth);
            }
        },
        items: [],
        get perPage() {
            return config.perPage;
        },
        searchValue: '',
        get columnas_visibles() {
            return this.$store.columnas_actuales.columnDefs.reduce((acc, col) => {
                acc[col.slug_name] = col;
                return acc;
            }, {});
        },
        get tableHeaders() {
            return this.$store.columnas_actuales.columnDefs;
        },
        visible_pages: [],
        get thElements() {
            //@ts-ignore
            return Array.from(this.$el.querySelector('thead').querySelector('tr').querySelectorAll('th')).map((el) => el.getAttribute('rel'));
        },
        get tdElements() {
            //@ts-ignore
            return Array.from(this.$el.querySelector('tbody.table-group-divider').querySelector('tr').querySelectorAll('td:not(.hidden_td)')).map((el) => el.getAttribute('data-slug'));
        },
        get columnDefs() {
            return this.$store.columnas_actuales.columnDefs.map(c => {
                let { name, slug_name, visible } = c;
                return { slug_name, visible };
            });
        },
        compareFields(full = false) {
            let thElements = this.thElements, tdElements = this.tdElements;
            return this.columnDefs.map(c => {
                let { slug_name, visible } = c;
                c.isTh = thElements.includes(slug_name);
                c.isTd = tdElements.includes(slug_name);
                return { slug_name, visible, isTh: c.isTh, isTd: c.isTd };
            }).filter(c => {
                return full || (!c.visible && (c.isTh || c.isTd)) || (c.visible && (!c.isTh || !c.isTd));
            });
        },
        currentPage: config.currentPage,
        sorted: defaultSort,
        negociosStore: globalThis.Alpine.store('negocios'),
        get pagination() {
            const lastPage = Math.ceil(this.negociosStore.total / this.perPage), currentPage = Math.min(this.currentPage, lastPage);
            return {
                total: this.negociosStore.total,
                perPage: this.perPage,
                lastPage,
                currentPage,
                from: (currentPage - 1) * this.perPage + 1,
                to: currentPage * this.perPage
            };
        },
        get tableData() {
            return this.negociosStore.properties;
        },
        decorate(negocio) {
            let { id_tipo_negocio, id_tipo_propiedad, id_etapa_negocio } = negocio;
            return {
                ...negocio,
                //@ts-ignore
                tipo_negocio: this.$store.tipos_negocio.get(id_tipo_negocio),
                //@ts-ignore
                tipo_propiedad: this.$store.tipos_propiedad.get(id_tipo_propiedad),
                //@ts-ignore
                etapa_negocio: this.$store.etapas_negocio.get(id_etapa_negocio),
            };
        },
        get(id) {
            //@ts-ignore
            this.negociosStore.get(id);
        },
        set(id, data) {
            //@ts-ignore
            this.negociosStore.set(id, data);
        },
        get visibleItems() {
            return this.items.slice(this.pagination.from - 1, this.pagination.to);
        },
        get pages() {
            return Array.from({
                length: Math.ceil(this.pagination.total / this.perPage),
            }).map((_, i) => i + 1);
        },
        get tableWidth() {
            //@ts-ignore
            return document.querySelector('#negocios_full').clientWidth;
        },
        onZoom(e) {
            let tablezoomclass = e.detail, zoom = e.detail.replace('tablezoom', '') / 10;
            console.warn('recreating scrollbooster', { tablezoomclass, zoom });
            this.createScrollBooster(zoom);
        },
        init() {
            this.fetchPage();
            this.initData();
            this.storedData = this.$store.negocios;
            globalThis.dtt = this;
        },
        debouncedTimeout: null,
        async debouncedFetchPage() {
            clearTimeout(this.debouncedTimeout);
            return new Promise(res => {
                this.debouncedTimeout = setTimeout(async () => {
                    res(this.fetchPage());
                }, 500);
            });
        },
        //fuse: createFuseInstance(tableData),
        initData() {
            this.items = this.tableData;
            tap(this.$store.columnas_actuales.find('titulo-resumen-web'), columna => columna.width = 300);
            tap(this.$store.columnas_actuales.find('canal-de-captacion'), columna => columna.width = 225);
            globalThis.debouncedAdjustHeight();
            setTimeout(() => {
                console.info('full Datatable, clientWidth', this.tableWidth);
                this.scrollBooster = this.createScrollBooster();
            }, 500);
            this.changePage(1);
        },
        async fetchPage() {
            if (this.negociosStore.next_page_url) {
                this.items = this.tableData;
                globalThis.debouncedAdjustHeight();
                // console.log('requesting next page')
                const data = await this.negociosStore.next();
                this.items = this.items.concat(data);
                this.search(this.term);
                return data.length && this.debouncedFetchPage();
            }
            else {
                console.info(performance.now(), 'FULL DATATABLE READY');
                return [];
            }
        },
        arescrolling: false,
        scroller(from, to) {
            return;
            let toElement = this.$refs[to] || document.querySelector(`#${to}`);
            let fromElement = this.$refs[from] || document.querySelector(`#${from}`);
            /*if (this.arescrolling || !toElement || !fromElement) {
                console.warn({ scrolling: this.arescrolling, from: from, to: to, toElement, fromElement }); // avoid potential recursion/inefficiency
                return;
            }*/
            this.arescrolling = true;
            // set the other div's scroll position equal to ours
            //// console.log(`setting ${to} to ${Number(fromElement.scrollLeft).toFixed(0)}`)
            toElement.scrollLeft = Number(fromElement.scrollLeft).toFixed(0);
            this.arescrolling = false;
        },
        compareOnKey(key, rule) {
            this.sorted = {
                field: key, rule
            };
            let { input_type } = this.$store.campos_busqueda.find(key);
            // console.log({ key, rule, input_type })
            return function (a, b) {
                let valueA = a[key], valueB = b[key];
                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    //@ts-ignore
                    input_type = 'number';
                }
                if (['date', 'dateTime'].includes(input_type)) {
                    valueA = new Date(a[key]);
                    valueB = new Date(b[key]);
                }
                else if (['text', 'textArea', 'email', 'url'].includes(input_type)) {
                    valueA = String(a[key]).toUpperCase();
                    valueB = String(b[key]).toUpperCase();
                    trigger: 'focus';
                }
                //console.log({ valueA, valueB })
                return (valueA === valueB ? 0 : (valueA > valueB ? 1 : -1)) * (rule === 'asc' ? 1 : -1);
            };
        },
        checkView(index) {
            return index > this.pagination.from && index < this.pagination.to;
        },
        search(term) {
            if (!term) {
                this.term = '';
                this.items = this.tableData.slice(0).sort(this.compareOnKey(this.sorted.field, this.sorted.rule));
            }
            else {
                this.term = String(term).normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
                this.items = this.tableData.filter(row => String(row.searchstring).includes(this.term)).slice(0).sort(this.compareOnKey(this.sorted.field, this.sorted.rule));
            }
        },
        sort(field, rule) {
            //@ts-ignore
            if (this.sorted.field === field && this.sorted.rule === rule) {
                rule = rule === 'asc' ? 'desc' : 'asc';
            }
            this.items.sort(this.compareOnKey(field, rule));
            this.sorted.field = field;
            this.sorted.rule = rule;
        },
        changePage(page = 1) {
            if (page) {
                page = Math.max(1, Math.min(page, this.pagination.lastPage));
                this.currentPage = page;
            }
            let { currentPage, lastPage } = this.pagination;
            let from = currentPage - 3, to = currentPage + 3;
            if (from < 1) {
                from = 1;
            }
            if (to > lastPage) {
                to = lastPage;
            }
            let pages = Array.from({ length: Math.min(7, 1 + to - from) }).map((_, i) => String(from + i));
            // console.log({ currentPage, lastPage, from, to, pages: pages.join(',') })
            if (from > 2)
                pages.unshift('...');
            if (from > 1)
                pages.unshift('1');
            if (to < lastPage - 1)
                pages.push('...');
            if (to < lastPage)
                pages.push(String(lastPage));
            this.visible_pages = pages;
        },
        createScrollBooster(zoom = 1) {
            if (this.scrollBooster)
                this.scrollBooster.destroy();
            let factor = zoom - 1;
            let zoomMultipier = Math.round(20 * Math.max(0, factor));
            let midWrapperWidth = (this.tableWidth + 300 + zoomMultipier);
            // console.log('zoomMultipier', { midWrapperWidth, zoom, zoomMultipier })
            //@ts-ignore
            document.querySelector('#negocios_mid_wrapper').style.minWidth = midWrapperWidth + 'px';
            // console.log(`document.querySelector('#negocios_mid_wrapper').style.width = '${midWrapperWidth}px'`)
            this.scrollBooster = new ScrollBooster({
                viewport: document.querySelector('#negocios_full_wrapper'),
                content: document.querySelector('#negocios_mid_wrapper'),
                direction: 'horizontal',
                //scrollMode: 'transform',
                scrollMode: 'native',
                friction: 0.01,
                bounce: false,
                bounceForce: 0.00,
                onClick(status) {
                    console.info({ ScrollBooster: status });
                    return false;
                },
                shouldScroll(state, event) {
                    return !event.target.classList.contains('col_title');
                    console.log({ shouldScroll: event.target });
                    return true;
                }
                //lockScrollOnDragDirection: true,
                // emulateScroll: true,
            });
        },
        isEmpty() {
            return this.pagination.total ? false : true;
        }
    };
};
export default negociosFullDatatable;
export { negociosFullDatatable };
//# sourceMappingURL=negociosFullDatatable.js.map