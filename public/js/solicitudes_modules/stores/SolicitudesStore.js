import { Solicitud } from '../Solicitud';
import { v4 as uuidv4 } from 'uuid';
import { BaseClass, bindConsole } from '../../components';
import { staticFetchWrapper } from '../../components/decorators/staticFetchWrapper';
export class SolicitudesStore extends BaseClass {
    constructor() {
        super();
        //medios: IIdNameTuple[];
        //solicitud_categorias_visita: IIdNameTuple[];
        // csrf_token: string;
        this.anfitriones = [];
        this.solicitantes = [];
        this.negocios = [];
        this.properties = [];
        this.selectedRows = [];
        this.id = uuidv4();
        this.timerColor = 'color:teal;font-weight:bold';
        this.classNameColor = 'color:teal;font-weight:bold;';
        this.total = 0;
        this.ready = false;
        this.apiSortBy = 'created_at';
        this.closing = false;
        this.massEditing = false;
        this.ready = false;
        this.classNameColor = 'color:teal;font-weight:bold;';
        this.timerColor = 'color:teal;font-weight:bold;';
        this._console = bindConsole(this.className, this.classNameColor);
        this.selectedRows = [];
    }
    async updateProperties({ from, total, next_page_url, data, 
    //solicitud_estados,
    //solicitud_subestados,
    //solicitud_medios,
    //        solicitud_categorias_visita,
    //csrf_token,
    filtros }) {
        //this.solicitud_estados = solicitud_estados;
        // this.solicitud_subestados = solicitud_subestados;
        // this.solicitud_medios = solicitud_medios;
        this.total = total ?? this.properties.length;
        this.next_page_url = next_page_url ?? '/api/solicitudes_visita';
        //this.estados = solicitud_estados
        // this.subestados = solicitud_subestados
        // this.medios = solicitud_medios
        //this.solicitud_categorias_visita = solicitud_categorias_visita;
        //this.csrf_token = csrf_token;
        this.filtros = filtros;
        this.properties = Object.values(data).map(s => new Solicitud(s));
        /* if (!this.anfitriones.length || !this.solicitantes.length || !this.negocios.length) {
             await this.fetchAnfitrionesAndSolicitantes();
         }*/
        let last_solicitud = this.properties[this.properties.length - 1];
        this.from = from || last_solicitud.id;
        if (!this.ready) {
            this.ready = true;
            this._console.log('ready');
            this.processEventListeners('ready', this);
        }
    }
    get parsedRange() {
        if (this.filtros && this.filtros.date_range) {
            let [startDate, stopDate] = this.filtros.date_range.split('-').map(fecha => (fecha.split(/\//).reverse().join('-')));
            return [globalThis.moment(startDate).startOf('day'), globalThis.moment(stopDate).endOf('day')];
        }
        return [globalThis.moment('2019-01-01').startOf('day'), globalThis.moment().endOf('day')];
    }
    setCurrent(id) {
        this.model = id ? this.get(id) : null;
    }
    get(id) {
        return this.properties
            .find(solicitud => solicitud.id == id);
    }
    updateAnfitrionesYSolicitantes({ anfitriones, solicitantes, negocios }) {
        this.anfitriones = Object.values(anfitriones).filter(cto => cto).map(cto => ({
            id: cto.id,
            name: cto.nombre_completo,
            nombre_completo: cto.nombre_completo,
            email: cto.email,
            anfitrion: cto.anfitrion
        })).sort((a, b) => a.name.localeCompare(b.name));
        this.solicitantes = Object.values(solicitantes).filter(cto => cto).map(cto => ({
            id: cto.id,
            name: cto.nombre_completo,
            nombre_completo: cto.nombre_completo,
            email: cto.email,
            solicitante: cto.solicitante
        })).sort((a, b) => a.name.localeCompare(b.name));
        this.negocios = Object.values(negocios).filter(negocio => negocio).map(({ id, propietario, direccion, solicitudes }) => ({
            id: Number(id),
            propietario,
            direccion,
            name: direccion,
            solicitudes
        })).sort((a, b) => a.name.localeCompare(b.name));
    }
    fetchAnfitrionesAndSolicitantes() {
        return staticFetchWrapper('api/solicitudes_visita/anfitriones_y_solicitantes', {})
            .then(({ anfitriones, solicitantes, negocios }) => {
            this.updateAnfitrionesYSolicitantes({ anfitriones, solicitantes, negocios });
        });
    }
    get last_solicitud() {
        return this.properties[this.properties.length - 1];
    }
    get solicitudesIds() {
        return this.properties.map(s => Number(s.id));
    }
    fetchAll({ append, limit } = { append: false, limit: 500 }) {
        return this.fetchProperties({ append, limit }).then(() => {
            if (this.next_page_url != null)
                return this.fetchAll({ append: true, limit });
            return this.properties;
        });
    }
    computeNextUrl({ append, limit } = { append: false, limit: 500 }) {
        let url = new URL(this.next_page_url, location.origin);
        Object.entries(globalThis.parsedVisitsFilter.filtros_parsed).forEach(([key, value]) => {
            url.searchParams.set(key, String(value));
        });
        url.pathname = '/api/solicitud_visita';
        if (append) {
            url.searchParams.set('from', String(this.from));
            url.searchParams.set('from2', String(this.last_solicitud.created_at_parsed.toDate().getTime() / 1000));
            url.searchParams.set('total', String(this.total));
        }
        else {
            url.searchParams.set('from', new Date().getTime().toString());
            this.properties = [];
        }
        url.searchParams.set('records_length', String(this.properties.length));
        url.searchParams.set('limit', String(limit ?? 500));
        return url;
    }
    fetchProperties({ append, limit } = { append: false, limit: 500 }) {
        let url = this.computeNextUrl({ append, limit });
        if (!append) {
            globalThis.bsTable.bootstrapTable('removeAll');
            globalThis.bsTable.bootstrapTable('showLoading');
        }
        if (append && !this.next_page_url)
            return Promise.resolve(this.properties);
        return staticFetchWrapper(url.toString(), {
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
                let newSolicitudes = data.filter(s => !this.solicitudesIds.includes(Number(s.id))).map(s => new Solicitud(s));
                this.properties = this.properties.concat(newSolicitudes);
                this.console.log('appending', newSolicitudes.length, 'solicitudes');
            }
            else {
                globalThis.bsTable.bootstrapTable('selectPage', 1);
                globalThis.bsTable.bootstrapTable('hideLoading');
                this.properties = data.map(s => new Solicitud(s));
                globalThis.bsTable.bootstrapTable('refresh');
            }
            globalThis.parsedVisitsFilter.filteredRows = globalThis.bsTable.bootstrapTable('getData');
            return this.properties;
        });
    }
    setProperty(id, property, value) {
        let solicitud = this.get(id);
        if (solicitud) {
            solicitud[property] = value;
        }
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
//# sourceMappingURL=SolicitudesStore.js.map