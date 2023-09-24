import { BaseClass, bindConsole } from '../../components';
import { ESTADO_AGENDADA, ESTADO_CANCELADA, ESTADO_EFECTUADA, ESTADO_EFECTUADA_POR_VALIDAR, ESTADO_NO_CONTESTA, ESTADO_PENDIENTE, ESTADO_POSTERGADA, ESTADO_REAGENDADA } from '../DummySolicitud';
export const defaultSubestadoOption = { name: ' - ', id: 0, subestado_id: 0, disabled: true }, defaultEstadoOption = { name: ' - ', id: 0, estado_id: 0, disabled: true, subestados: [defaultSubestadoOption] };
export class SolicitudDictStore extends BaseClass {
    constructor() {
        super();
        this.data = [];
        this.subdata = [];
        this.solicitud_nivel_ingreso = [];
        this.solicitud_aval_ingreso = [];
        this.solicitud_duracion_arriendo = [];
        this.ESTADO_PENDIENTE = ESTADO_PENDIENTE;
        this.ESTADO_CANCELADA = ESTADO_CANCELADA;
        this.ESTADO_POSTERGADA = ESTADO_POSTERGADA;
        this.ESTADO_EFECTUADA = ESTADO_EFECTUADA;
        this.ESTADO_AGENDADA = ESTADO_AGENDADA;
        this.ESTADO_REAGENDADA = ESTADO_REAGENDADA;
        this.ESTADO_EFECTUADA_POR_VALIDAR = ESTADO_EFECTUADA_POR_VALIDAR;
        this.ESTADO_NO_CONTESTA = ESTADO_NO_CONTESTA;
        this.timerColor = 'color:teal;font-weight:bold';
        this.classNameColor = 'color:teal;font-weight:bold;';
        this.total = 0;
        this.ready = false;
        this.ready = false;
        this.classNameColor = 'color:teal;font-weight:bold;';
        this.timerColor = 'color:teal;font-weight:bold;';
        this._console = bindConsole(this.className, this.classNameColor);
    }
    updateProperties({ solicitud_estados, solicitud_subestados, solicitud_nivel_ingreso, solicitud_aval_ingreso, solicitud_duracion_arriendo, solicitud_medios, solicitud_categorias_visita, }) {
        this.data = solicitud_estados;
        this.subdata = solicitud_subestados;
        this.solicitud_nivel_ingreso = solicitud_nivel_ingreso;
        this.solicitud_aval_ingreso = solicitud_aval_ingreso;
        this.solicitud_duracion_arriendo = solicitud_duracion_arriendo;
        this.medios = solicitud_medios;
        this.solicitud_categorias_visita = solicitud_categorias_visita;
        this.ready = true;
        this.processEventListeners('ready', this);
    }
    nivel_ingreso(id) {
        return (id ? this.solicitud_nivel_ingreso[id] : { name: '' }).name;
    }
    aval_ingreso(id) {
        return (id ? this.solicitud_aval_ingreso[id] : { name: '' }).name;
    }
    aval_ingreso_brief(id) {
        return (Number(id) === 2 ? { name: 'Otra opción de garantía' } : (id ? this.solicitud_aval_ingreso[id] : { name: '' })).name;
    }
    duracion_arriendo(id) {
        return (id ? this.solicitud_duracion_arriendo[id] : { name: '' }).name;
    }
    get subestados() {
        return [...Object.values(this.subdata)];
    }
    get estados() {
        return [...Object.values(this.data)];
    }
    estado_name(id) {
        return (this.get(id) || {}).name;
    }
    subestado_name(id) {
        return (this.getsub(id) || {}).name;
    }
    get(id_estado) {
        let foundOption = Object.values(this.estados).find(e => Number(e.id) === Number(id_estado)) || defaultEstadoOption;
        foundOption.disabled = foundOption.disabled || false;
        return foundOption;
    }
    getsub(id_subestado) {
        let foundOption = Object.values(this.subestados).find(e => Number(e.id) === Number(id_subestado)) || defaultSubestadoOption;
        foundOption.disabled = foundOption.disabled || false;
        return foundOption;
    }
    get tipos_negocio() {
        return Alpine.store('tipos_negocio');
    }
    get tipos_propiedad() {
        return Alpine.store('tipos_propiedad');
    }
    get userTimezone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}
export function createDict() {
    return new SolicitudDictStore();
}
//# sourceMappingURL=createDictStore.js.map