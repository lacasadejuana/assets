import Alpine from 'alpinejs';
import { patchFilter } from './current_filter_operations/patchFilter';
import { waitFor } from '../components/plugins';
export const filterListData = (filters = []) => ({
    /*get filtros2() {
        return filters.slice(9).sort((a, b) => {
            return this.sort_order === 'asc' ? (a[this.sort_by] - b[this.sort_by]) : (b[this.sort_by] - a[this.sort_by])
        })
    },*/
    per_page: 10,
    get last_page() {
        return Math.ceil(this.filtros.length / this.per_page);
    },
    current_page: 1,
    get visible_from() {
        return this.current_page * this.per_page;
    },
    get visible_to() {
        return this.visible_from + this.per_page;
    },
    get visible_records() {
        return this.sortedFilters.slice(this.visible_from, this.visible_to);
    },
    get sortedFilters() {
        return this.filtros.slice(0).sort(this.sortFn);
    },
    getselectElement(id) {
        let element_id = this.get(id).element_id;
        if (!element_id) {
            console.warn('Filtro no tiene elemento asociado');
            return null;
        }
        return document.getElementById(element_id);
    },
    getOriginalCategory(id) {
        let select = this.getselectElement(id);
        if (!select)
            return null;
        return select.getAttribute('rel');
    },
    getOriginalAreasSubareas(id) {
        let select = this.getselectElement(id);
        if (!select)
            return null;
        const options = Array.prototype.slice.call(select.options);
        const originalValues = options
            .filter((option) => option.selected)
            .map(option => option.value);
        return originalValues;
    },
    setOriginalCategory(id, category) {
        let select = this.getselectElement(id);
        if (!select)
            return null;
        if (this.categorias.includes(category)) {
            return;
        }
        return select.setAttribute('rel', category);
    },
    setOriginalAreasSubareas(id, areasSubareas) {
        let select = this.getselectElement(id);
        if (!select)
            return null;
        // Deseleccionar todas las opciones actuales
        for (let i = 0; i < select.options.length; i++) {
            select.options[i].selected = false;
        }
        // Seleccionar las opciones correspondientes a los nuevos valores de areasSubareas
        for (let i = 0; i < select.options.length; i++) {
            if (areasSubareas.includes(select.options[i].value)) {
                select.options[i].selected = true;
            }
        }
    },
    get sortFn() {
        return ((a, b) => {
            if (typeof a[this.sort_by] === 'number' && typeof b[this.sort_by] === 'number') {
                return this.sort_order === 'asc' ? (a[this.sort_by] - b[this.sort_by]) : (b[this.sort_by] - a[this.sort_by]);
            }
            return this.sort_order === 'asc' ? (String(a[this.sort_by]) || '').localeCompare(b[this.sort_by]) : (String(b[this.sort_by]) || '').localeCompare(b[this.sort_by]);
        });
    },
    filtros: [],
    get(id) {
        return this.filtros.find(f => f.id === id);
    },
    moveFilter(from, to) {
        let moved = this.filtros.splice(from, 1)[0];
        setTimeout(() => {
            this.filtros.splice(to, 0, moved);
        }, 200);
    },
    deleteAt(index) {
        this.filtros.splice(index, 1);
    },
    sort_by: 'id',
    sort_order: 'asc',
    categorias: [...new Set(filters.map(c => c.opt_group))].sort().reverse(),
    areas_subareas: [...new Set(filters.map(c => c.areas_subareas).flat())].sort().reverse(),
    fields: {
        'id': 'ID',
        'name': 'Nombre',
        'opt_group': 'Categoria',
        'areas_subareas': 'Areas y Subareas',
        'author': 'Autor',
        //  'created_at': 'Creado',
        'public': 'Público',
        'acciones': 'Acciones',
    },
    fetchFilters() {
        let tokenElement = this.$el.querySelector('[name="_token"]');
        if (!(tokenElement instanceof HTMLInputElement) || !tokenElement.value)
            throw new Error('No se encontró el token de seguridad');
        if (globalThis.readCookie('debug_lcdj')) {
            //@ts-ignore
            globalThis.setCookie('x-csrf-token', tokenElement.value, 1);
        }
        const sanctumToken = document.querySelector('meta[name="test_user_token"]');
        /**
         * Let's pick the best token for the task
         */
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        };
        if (sanctumToken) {
            headers['Authorization'] = `Bearer ${sanctumToken.content}`;
        }
        else {
            headers['X-CSRF-TOKEN'] = `${tokenElement.value}`;
        }
        fetch('/api/filtros', {
            method: 'GET',
            headers,
        }).then(async (res) => {
            const { data, total } = await res.json();
            console.info({ total });
            this.filtros = this.normalizeFiltros(data);
        }).catch(err => {
            console.error(err);
        });
    },
    async patchFilter(id, payload, callback) {
        if (!this.canIEdit(this.get(id))) {
            return Promise.resolve({
                success: false, message: 'No tienes permisos para editar este filtro'
            });
        }
        let token = globalThis.filterListData.$el.querySelector('[name="_token"]');
        console.log('patching filter ' + id);
        let currentFiltro = this.filtros.find(f => f.id === id);
        let cleanPayload = {};
        for (let key of ['name', 'public', 'opt_group', 'areas_subareas']) {
            cleanPayload[key] = payload[key] ?? currentFiltro[key];
        }
        cleanPayload.public = Number(cleanPayload.public);
        let { success, message, filtro } = await patchFilter({ return: true, ...cleanPayload });
        if (!success) {
            return Promise.reject(message);
        }
        let { name, author, public: publico, updated_at, opt_group, areas_subareas } = this.setVisibility(filtro);
        console.table([
            { 'name': 'id', 'old_value': currentFiltro.id, 'new_value': id },
            { 'name': 'name', 'old_value': currentFiltro.name, 'new_value': name },
            { 'name': 'public', 'old_value': currentFiltro.public, 'new_value': publico },
            { 'name': 'opt_group', 'old_value': currentFiltro.opt_group, 'new_value': opt_group },
            { 'name': 'areas_subareas', 'old_value': currentFiltro.areas_subareas, 'new_value': areas_subareas },
        ]);
        for (let [key, value] of Object.entries({ name, public: Number(publico), updated_at, opt_group, areas_subareas })) {
            this.get(id)[key] = value;
        }
        if (callback) {
            callback({ success, message, filtro });
        }
        return { success, message };
    },
    get term() {
        return String(this.searchVal).normalize('NFD').replace(/\p{Diacritic}/gu, '');
    },
    set term(searchVal) {
        this.searchVal = String(searchVal).normalize('NFD').replace(/\p{Diacritic}/gu, '');
    },
    searchVal: '',
    canIEdit(filtro) {
        return filtro.user_id === this.$store.user.id || this.$store.user.isAdmin || this.$store.cargo_id == 25;
    },
    isMine(filtro) {
        return filtro.user_id === this.$store.user.id;
    },
    search(searchVal) {
        if (searchVal) {
            this.term = searchVal;
            console.log('searching for ' + this.term);
        }
        this.filtros.forEach(f => {
            this.setVisibility(f);
        });
    },
    setVisibility(filtro) {
        filtro.visible = String(filtro.name.toLowerCase()).normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(this.searchVal);
        //console.log('filtro ' + filtro.id + ' is ' + (filtro.visible ? 'visible' : 'hidden'))
        return filtro;
    },
    categoryChanged(filtro, newCategory) {
        console.info({ id: filtro.id, newCategory });
    },
    areas_subareasChanged(filtro, newAreasSubareas) {
        console.info({ id: filtro.id, newAreasSubareas });
    },
    async syncCategory({ id, name, publico, opt_group }) {
        let filtro = this.get(id);
        if (!filtro)
            return;
        let originalCategory = this.getOriginalCategory(id);
        if (!originalCategory) {
            //@ts-ignore
            console.zwarn(`Rejected: filter ${id} has no original category`);
            return;
        }
        if (originalCategory === opt_group) {
            //@ts-ignore
            console.zinfo(`Old and new category ${opt_group} are the same for filter ${id} `);
            return;
        }
        if (!this.categorias.includes(opt_group)) {
            filtro.opt_group = originalCategory;
            //@ts-ignore
            console.zwarn(opt_group + ' not found, reverting to original value ' + originalCategory);
            return;
        }
        console.log('Filter ' + id + ' changing from ' + originalCategory + ' to ' + opt_group);
        await this.debouncedPatch(filtro.id, { opt_group }, (result) => {
            console.log('debouncedPatch result', result);
            //@ts-ignore
            console.zsuccess('Filter ' + id + ' changed from ' + originalCategory + ' to ' + opt_group);
            this.getselectElement(id).value = filtro.opt_group;
            this.setOriginalCategory(id, filtro.opt_group);
        });
    },
    async syncAreasSubareas({ id, name, publico, areas_subareas }) {
        let filtro = this.get(id);
        if (!filtro)
            return;
        let originalAreasSubareas = this.getOriginalAreasSubareas(id);
        if (!originalAreasSubareas) {
            //@ts-ignore
            console.zwarn(`Rejected: filter ${id} has no original areas_subareas`);
            return;
        }
        if (originalAreasSubareas === areas_subareas) {
            //@ts-ignore
            console.zinfo(`Old and new areas_subareas ${areas_subareas} are the same for filter ${id} `);
            return;
        }
        if (!this.areas_subareas.includes(areas_subareas)) {
            filtro.areas_subareas = originalAreasSubareas;
            //@ts-ignore
            console.zwarn(areas_subareas + ' not found, reverting to original value ' + originalAreasSubareas);
            return;
        }
        console.log('Filter ' + id + ' changing from ' + originalAreasSubareas + ' to ' + areas_subareas);
        await this.debouncedPatch(filtro.id, { areas_subareas }, (result) => {
            console.log('debouncedPatch result', result);
            //@ts-ignore
            console.zsuccess('Filter ' + id + ' changed from ' + originalAreasSubareas + ' to ' + areas_subareas);
            this.getselectElement(id).value = filtro.areas_subareas;
            this.setOriginalAreasSubareas(id, filtro.areas_subareas);
        });
    },
    listReady: false,
    compareFilters(filtro1, filtro2) {
        let diff = [...new Set(Object.keys(filtro1).concat(Object.keys(filtro2)))].reduce((acc, key) => {
            let value = filtro1[key], old_value = filtro2[key];
            if (value !== old_value) {
                acc.push({ name: key, value, old_value });
                return acc;
            }
            return acc;
        }, []);
        return diff;
    },
    normalizeFiltros(filtros) {
        return filtros.map(f => {
            //@ts-ignore
            let { id, name, author, public: publico, created_at, updated_at, opt_group, areas_subareas, user_id, visible, element_id } = this.setVisibility(f);
            if (updated_at)
                updated_at = updated_at.substr(0, 19) + 'Z';
            return {
                id, name, author, public: Number(publico), created_at, updated_at, opt_group, areas_subareas, user_id, element_id,
                editable: this.canIEdit(f), isMine: this.isMine(f), visible
            };
        });
    },
    get sort_params() {
        return [this.sort_by, this.sort_order].join(',');
    },
    setElementId(filtro, element) {
        filtro.element_id = element.id;
        element.setAttribute('rel', filtro.opt_group || '');
        // console.log('element_id for ' + filtro.id + ' set to ' + element.id)
        element.value = filtro.opt_group;
    },
    setElementAreaSubarea(filtro, element) {
        filtro.element_id = element.id;
        element.setAttribute('rel', filtro.areas_subareas || []);
        element.value = filtro.areas_subareas;
    },
    init() {
        this.fetchFilters();
        this.debouncedPatch = Alpine.debounce(this.patchFilter, 500);
        this.searchVal = '';
        //this.filtros = this.normalizeFiltros(filters)
        this.$watch('filtros', (newVal, oldVal) => {
            let stringified = JSON.stringify(newVal), stringified2 = JSON.stringify(oldVal);
            if (stringified !== stringified2)
                return;
            newVal.forEach((f, i) => {
                let diff = this.compareFilters(newVal[i], oldVal[i]);
                if (diff.length) {
                    console.info('diff found for ' + newVal[i].id);
                    console.table(diff);
                }
            });
        });
        this.$watch('sort_params', (new_params, old_params) => {
            let [sort_by, sort_order] = new_params.split(',');
            let [old_sort_by, old_sort_order] = old_params.split(',');
            /*          if (sort_by === old_sort_by) {
                          this.sort_order = this.sort_order === 'asc' ? 'desc' : 'asc'
                      }*/
            //            this.sort_by = sort_by
            console.table([
                { name: 'sort_by', from: old_sort_by, to: sort_by },
                { name: 'sort_order', from: old_sort_order, to: sort_order }
            ]);
        });
        /*this.filtros = this.filtros.sort((a, b) => {
            return this.sort_order === 'asc' ? (a[this.sort_by] - b[this.sort_by]) : (b[this.sort_by] - a[this.sort_by])
        })*/
        //console.log({ filtros: this.filtros, length: this.filtros.length })
        globalThis.filterListData = this;
        waitFor(1000);
        setTimeout(() => {
            this.listReady = true;
            console.table([
                { name: 'per_page', value: this.per_page },
                { name: 'last_page', value: this.last_page },
                { name: 'current_page', value: this.current_page },
                { name: 'visible_from', value: this.visible_from },
                { name: 'visible_to', value: this.visible_to },
            ]);
        }, 3500);
    }
});
export default filterListData;
//# sourceMappingURL=filterListData.js.map