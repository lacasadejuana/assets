import { defaultSubestadoOption, defaultEstadoOption } from './stores/createDictStore';
import { parseMySqlDate } from '../plugins/moment.bundle';
const ESTADO_PENDIENTE = 1;
const ESTADO_AGENDADA = 2;
const ESTADO_EFECTUADA = 3;
const ESTADO_CANCELADA = 4;
const ESTADO_REAGENDADA = 5;
const ESTADO_POSTERGADA = 6;
const ESTADO_EFECTUADA_POR_VALIDAR = 7;
const ESTADO_NO_CONTESTA = 8;
const ESTADO_EN_GESTION = 9;
export { ESTADO_PENDIENTE, ESTADO_AGENDADA, ESTADO_EFECTUADA, ESTADO_CANCELADA, ESTADO_REAGENDADA, ESTADO_POSTERGADA, ESTADO_EFECTUADA_POR_VALIDAR, ESTADO_NO_CONTESTA, ESTADO_EN_GESTION };
export class DummySolicitud {
    get fecha_agendada_in_range() {
        return this.fecha_agendada_parsed
            && this.fecha_agendada_parsed.isBetween(this.parsedRange[0], this.parsedRange[1]);
    }
    get fecha_agendada_parsed() {
        return this.fecha_programada ? parseMySqlDate(this.fecha_programada, 'UTC') : null;
    }
    get fecha_seguimiento_parsed() {
        return this.fecha_seguimiento ? parseMySqlDate(this.fecha_seguimiento, 'UTC') : null;
    }
    get fecha_agendada_formatted() {
        return this.fecha_agendada_parsed ? this.fecha_agendada_parsed.format('DD-MM-YYYY HH:mm') : '';
    }
    get fecha_seguimiento_formatted() {
        return this.fecha_seguimiento_parsed ? this.fecha_seguimiento_parsed.format('DD-MM-YYYY HH:mm') : '';
    }
    get is_errored() {
        return !!this.motivo_errored ||
            !!this.subestado_errored;
    }
    get preventClosingReason() {
        let errores = [];
        if (this.subestado_errored) {
            // errores.push(`Estado "${this.estado_label}" requiere seleccionar subestado`)
        }
        if (this.motivo_errored) {
            //errores.push(`Estado "${this.estado_label}" requiere ingresar un motivo`)
        }
        return errores.join('. ');
    }
    get subestado_errored() {
        return this.estado.subestados.length && (!this.subestado_id);
    }
    get motivo_errored() {
        return ([ESTADO_CANCELADA, ESTADO_POSTERGADA, ESTADO_EN_GESTION].includes(this.estado_id) && !this.motivo);
    }
    get isEditable() {
        return true;
    }
    get estado_label() {
        return this.estado.name;
    }
    get subestado_label() {
        return this.subestadoObj.name;
    }
    get estado() {
        return (this.dictionary ? (this.dictionary.get(this.estado_id) || defaultEstadoOption) : defaultEstadoOption);
    }
    get subestadoObj() {
        return this.dictionary ? ((this.dictionary.get(this.estado_id) || {}).subestados || []).find(e => Number(e.subestado_id) === Number(this.subestado_id) || Number(e.id) === Number(this.subestado_id)) || defaultSubestadoOption : defaultSubestadoOption;
    }
    get dictionary() {
        //@ts-ignore
        return Alpine.store('dictionary') || {};
    }
    get estados_source() {
        //@ts-ignore
        return this.dictionary.estados;
    }
    get subestados_source() {
        //@ts-ignore
        return this.dictionary.subestados;
    }
    constructor() {
        this.id_estado_solicitud = 1;
        this.isDirty = false;
        this.isDirtyReasons = {
            estado_id: { from: 1, to: null },
            subestado_id: { from: null, to: null },
            motivo: { from: null, to: null },
        };
        //@ts-ignore
        this.$store = Alpine.store('dictionary');
    }
    get parsedRange() {
        //@ts-ignore
        return Alpine.store('solicitudes').parsedRange;
    }
    get filtros() {
        //@ts-ignore
        return Alpine.store('solicitudes').filtros;
    }
    get motivo_text() {
        return this.motivo;
    }
    set motivo_text(motivo) {
        if (motivo !== this.motivo) {
            this.isDirty = true;
            this.isDirtyReasons.motivo.to = motivo;
        }
        this.motivo = motivo;
    }
    get estado_id() {
        return Number(this.id_estado_solicitud);
    }
    set estado_id(id_estado_solicitud) {
        if (Number(this.id_estado_solicitud) !== Number(id_estado_solicitud)) {
            this.isDirty = true;
            this.isDirtyReasons.estado_id.to = Number(id_estado_solicitud);
            this.id_estado_solicitud = Number(id_estado_solicitud);
            this.subestado_id = 0;
            if ([ESTADO_POSTERGADA, ESTADO_CANCELADA].includes(this.id_estado_solicitud)) {
                this.fecha_agendada = null;
                this.fecha_realizacion = null;
            }
        }
    }
    get subestados_options() {
        return ((this.estado || defaultEstadoOption).subestados || []).map(option => {
            option.disabled = !!option.disabled;
            return option;
        });
    }
    get subestado_id() {
        return Number(this.subestado || 0);
    }
    set subestado_id(subestado_id) {
        if (this.subestado !== Number(subestado_id)) {
            this.isDirty = true;
            this.isDirtyReasons.subestado_id.to = Number(subestado_id);
        }
        this.subestado = Number(subestado_id);
        if (!this.estado || !this.estado.subestados || !this.estado.subestados.length) {
            this.subestado = null;
        }
    }
    get fecha_realizacion() {
        let fecha_ejecucion = this.fecha_ejecucion;
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(fecha_ejecucion)) {
            fecha_ejecucion += ':00Z';
        }
        return fecha_ejecucion;
    }
    set fecha_realizacion(fecha_ejecucion) {
        //        console.info('setting fecha_realizacion', fecha_ejecucion)
        if (fecha_ejecucion !== this.fecha_ejecucion) {
            if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(fecha_ejecucion)) {
                fecha_ejecucion += ':00Z';
            }
            console.info('setting fecha ejecucion', fecha_ejecucion);
            this.isDirty = true;
            //@ts-ignore
            this.isDirtyReasons.fecha_realizacion = this.isDirtyReasons.fecha_realizacion || {};
            this.isDirtyReasons.fecha_realizacion.to = fecha_ejecucion;
        }
        this.fecha_ejecucion = fecha_ejecucion;
        if (this.fecha_ejecucion
            && this.id_estado_solicitud !== ESTADO_EFECTUADA
            && this.id_estado_solicitud !== ESTADO_EFECTUADA_POR_VALIDAR) {
            this.estado_id = ESTADO_EFECTUADA_POR_VALIDAR;
            this.subestado_id = 0;
        }
    }
    get fecha_agendada() {
        return this.fecha_programada;
    }
    set fecha_agendada(fecha_programada) {
        //   console.info({ setFecaAgendada: fecha_programada })
        if (fecha_programada !== this.fecha_programada_local
            && fecha_programada !== this.fecha_programada) {
            //@ts-ignore
            this.isDirtyReasons.fecha_agendada = this.isDirtyReasons.fecha_agendada || {};
            this.isDirtyReasons.fecha_agendada.to = fecha_programada;
            //@ts-ignore
            this.isDirtyReasons.fecha_programada_local = this.isDirtyReasons.fecha_programada_local || {};
            this.isDirtyReasons.fecha_programada_local.to = fecha_programada;
            console.warn({
                change_fecha_programada: fecha_programada,
                fecha_programada_local: this.fecha_programada_local,
                current_fecha_programada: this.fecha_programada,
                current_fecha_agendada_formatted: this.fecha_agendada_formatted,
                current_estado: this.estado_label
            });
            this.isDirty = true;
        }
        this.fecha_programada = fecha_programada;
        if (this.id_estado_solicitud === ESTADO_PENDIENTE &&
            this.fecha_programada
        /*&& new Date(this.fecha_programada).getTime() > Date.now()*/
        ) {
            this.estado_id = ESTADO_AGENDADA;
            this.subestado_id = null;
        }
        if (!this.fecha_programada) {
            this.fecha_realizacion = null;
        }
    }
    get estados_options() {
        let estado_id = Number(this.estado_id);
        let tableentries = {};
        let entries = Object.entries(this.estados_source).map(([key, value]) => {
            const option = {
                //@ts-ignore
                ...value,
                selected: estado_id === value.estado_id,
            };
            option.estado_id = Number(value.id);
            option.disabled = [ESTADO_EFECTUADA, ESTADO_AGENDADA, ESTADO_REAGENDADA, ESTADO_EFECTUADA_POR_VALIDAR].includes(option.estado_id);
            if (Number(option.estado_id) === estado_id) {
                option.disabled = false;
            }
            tableentries[option.name + (option.selected ? ' current' : '')] = ({
                current_estado_id: estado_id,
                disabled: option.disabled,
                disabled_text: '',
            });
            option.selected = estado_id === option.estado_id;
            return option;
        });
        //console.table(tableentries)
        return entries;
    }
}
//# sourceMappingURL=DummySolicitud.js.map