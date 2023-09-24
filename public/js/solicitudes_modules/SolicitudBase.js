import { moment, parseMySqlDate } from '../plugins/moment.bundle';
import { ESTADO_PENDIENTE, ESTADO_EN_GESTION, ESTADO_CANCELADA, ESTADO_POSTERGADA, ESTADO_EFECTUADA, ESTADO_AGENDADA, ESTADO_REAGENDADA, ESTADO_EFECTUADA_POR_VALIDAR, DummySolicitud } from './DummySolicitud';
export class SolicitudBase extends DummySolicitud {
    constructor(solicitud) {
        //@ts-ignore
        super(solicitud);
        this.activeInput = false;
        this.color_row = '';
        this.reminder_sent = false;
        this.seguimiento_expired = false;
        this.open = false;
        this.isOngoingRequest = false;
        this.saving_icon = 'fa fa-save';
        this.envelope_icon = `<i class='fa align-items-center flex float-start mr-2  fa-envelope'></i>`;
        this.copy_icon = `<i class='fa align-items-center flex float-start mr-2  fa-copy'></i>`;
        Object.assign(this, solicitud);
        this.original_state = solicitud.id_estado_solicitud;
        this.isDirtyReasons = {
            fecha_programada_local: { from: solicitud.fecha_programada_local, to: null },
            fecha_seguimiento: { from: solicitud.fecha_seguimiento, to: null },
            fecha_agendada: { from: solicitud.fecha_programada, to: null },
            fecha_realizacion: { from: solicitud.fecha_ejecucion, to: null },
            estado_id: { from: solicitud.id_estado_solicitud, to: null },
            subestado_id: { from: solicitud.subestado, to: null },
            motivo: { from: solicitud.motivo, to: null },
        };
        this.negocio = solicitud.negocio;
        this.solicitante = solicitud.solicitante;
        this.instance = solicitud;
        this.id = solicitud.id;
        this.id_tipo_negocio = solicitud.negocio?.id_tipo_negocio;
        this.nombre = this.negocio.nombre;
        this.como_conocio_lcdj = solicitud.como_conocio_lcdj;
        //@ts-ignore
        this.fecha_creacion = solicitud.fecha_creacion || solicitud.created_at;
        this.anfitrion = solicitud.anfitrion;
        this.medio_solicitud = solicitud.medio_solicitud;
        this.n_orden = solicitud.n_orden;
        this.nivel_ingreso = solicitud.nivel_ingreso;
        this.aval_ingreso = solicitud.aval_ingreso;
        this.duracion_arriendo = solicitud.duracion_arriendo;
        this.medio_texto = solicitud.medio_texto;
        this.numero_orden = solicitud.numero_orden;
        this.acciones = solicitud.acciones;
        this.motivo = solicitud.motivo;
        this.id_estado_solicitud = solicitud.id_estado_solicitud;
        this.fecha_programada = solicitud.fecha_programada;
        this.fecha_seguimiento = solicitud.fecha_seguimiento;
        this.seguimiento_expired = solicitud.seguimiento_expired;
        this.fecha_ejecucion = solicitud.fecha_ejecucion;
        this.color_row = solicitud.color_row;
        this.fecha_programada_local = solicitud.fecha_programada_local;
        this.subestado = solicitud.subestado;
        this.reminder_sent = Boolean(solicitud.reminder_sent);
        this.timer = null;
    }
    toJson() {
        return {
            id: this.id,
            negocio: this.negocio,
            id_tipo_negocio: this.id_tipo_negocio,
            solicitante: this.solicitante?.nombre_completo,
            nombre: this.nombre,
            como_conocio_lcdj: this.como_conocio_lcdj,
            como_prefieres_que_te_contactemos: this.solicitante.como_prefieres_que_te_contactemos ?? 'ninguna_preferencia',
            fecha_creacion: this.fecha_creacion,
            anfitrion: this.anfitrion?.nombre_completo,
            medio_solicitud: this.medio_solicitud,
            n_orden: this.n_orden,
            nivel_ingreso: this.nivel_ingreso,
            aval_ingreso: this.aval_ingreso,
            duracion_arriendo: this.duracion_arriendo,
            medio_texto: this.medio_texto,
            numero_orden: this.numero_orden,
            acciones: this.acciones,
            motivo: this.motivo,
            id_estado_solicitud: this.id_estado_solicitud,
            fecha_programada: this.fecha_programada,
            fecha_seguimiento: this.fecha_seguimiento,
            seguimiento_expired: this.seguimiento_expired,
            fecha_ejecucion: this.fecha_ejecucion,
            color_row: this.color_row,
            fecha_programada_local: this.fecha_programada_local,
            subestado: this.subestado,
            reminder_sent: this.reminder_sent,
            timer: this.timer,
        };
    }
    computeSearchString(solicitud) {
        return Object.entries(solicitud ?? this.toJson())
            .reduce((accum, [ket, value]) => {
            if (value === undefined)
                return accum;
            return accum + ' ' + value + ' ';
        }, '')
            .normalize('NFD')
            .replace(/\n+/, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();
    }
    get nivel_ingreso_label() {
        return this.dictionary.nivel_ingreso(this.nivel_ingreso);
    }
    get aval_ingreso_label() {
        return this.dictionary.aval_ingreso(this.aval_ingreso);
    }
    get aval_ingreso_brief() {
        return this.dictionary.aval_ingreso_brief(this.aval_ingreso);
    }
    get duracion_arriendo_label() {
        return this.dictionary.duracion_arriendo(this.duracion_arriendo);
    }
    get is_errored() {
        return !!this.agendada_errored ||
            !!this.estado_errored ||
            !!this.agendada_check_solicitante ||
            !!this.estado_realizada_errored ||
            !!this.motivo_errored ||
            !!this.realizacion_errored ||
            !!this.agendada_outdated ||
            !!this.subestado_errored;
    }
    /**
     * Invalid states
     */
    get estado_errored() {
        return ![ESTADO_AGENDADA, ESTADO_EN_GESTION, ESTADO_REAGENDADA, ESTADO_POSTERGADA, ESTADO_CANCELADA, ESTADO_EFECTUADA_POR_VALIDAR].includes(this.estado_id)
            && this.fecha_programada && !this.fecha_ejecucion;
    }
    get subestado_errored() {
        return this.estado.subestados.length && (!this.subestado_id);
    }
    get motivo_errored() {
        return ([ESTADO_CANCELADA, ESTADO_POSTERGADA, ESTADO_EN_GESTION].includes(this.estado_id) && !this.motivo);
    }
    get estado_realizada_errored() {
        return ![ESTADO_EFECTUADA, ESTADO_EFECTUADA_POR_VALIDAR].includes(this.estado_id)
            && this.fecha_ejecucion;
    }
    get agendada_outdated() {
        return [ESTADO_AGENDADA, ESTADO_REAGENDADA].includes(this.estado_id)
            && this.fecha_agendada && this.fecha_agendada_parsed.isBefore(moment().subtract(1, 'day'));
    }
    get agendada_errored() {
        return [ESTADO_AGENDADA, ESTADO_REAGENDADA, ESTADO_EFECTUADA, ESTADO_EFECTUADA_POR_VALIDAR].includes(this.estado_id)
            && !this.fecha_programada;
    }
    get agendada_check_solicitante() {
        if (!this.solicitante.rut && this.estado_id === ESTADO_AGENDADA) {
            return true;
        }
    }
    get realizacion_errored() {
        return [ESTADO_EFECTUADA, ESTADO_EFECTUADA_POR_VALIDAR].includes(this.estado_id)
            && !this.fecha_ejecucion;
    }
    get preventClosingReasonVerbose() {
        let errores = [];
        if (this.subestado_errored) {
            errores.push({
                message: `Estado "${this.estado_label}" requiere seleccionar subestado`,
                visible: false
            });
        }
        if (this.estado_realizada_errored) {
            errores.push({
                message: 'Existe fecha realización, estado sólo puede ser "efectuada" o "efectuada por validar"',
                visible: true
            });
        }
        else if (this.agendada_outdated) {
            errores.push({
                message: 'Debe corregirse el estado a Efectuada por validar o Cancelada según corresponda',
                visible: true
            });
        }
        if (this.motivo_errored) {
            errores.push({
                message: `Estado "${this.estado_label}" requiere ingresar un motivo`,
                visible: true
            });
        }
        if (this.agendada_errored || this.realizacion_errored) {
            errores.push({
                message: `Estado "${this.estado_label}" requiere especificar fecha`,
                visible: true
            });
        }
        if (this.agendada_check_solicitante) {
            errores.push({
                message: 'Debe ingresar un rut del solicitante antes de agendar',
                visible: true
            });
        }
        if (this.estado_errored) {
            errores.push({
                message: 'Existe fecha programada. Estado debe ser "agendada" o "reagendada"',
                visible: true
            });
        }
        return errores;
    }
    get preventClosingReason() {
        let errores = this.preventClosingReasonVerbose;
        return errores.filter(e => e.visible).map(e => e.message).join('. ');
    }
    get popover_button_class() {
        return this.isOngoingRequest ? 'bg-white text-gray-800' : 'btn-primary text-white';
    }
    get popover_icon_class() {
        return this.isOngoingRequest ? 'h-100 align-items-center flex  fa fa-cog fa-spin' : 'h-100 align-items-center flex fa fa-cog';
    }
    /**
     * Change case for css capitalization
     */
    get solicitud_medio() {
        return (this.medio_texto || '').toLowerCase();
    }
    get sentlabel() {
        return (this.reminder_sent)
            ? 'Reenviar'
            : 'Enviar';
    }
    get negocio_id() {
        return this.negocio.id;
    }
    get solicitante_name() {
        return this.solicitante ? (this.solicitante || {}).nombre_completo || 'N/A' : '';
    }
    get negocio_name() {
        return this.negocio.nombre;
    }
    get anfitrion_name() {
        return (this.anfitrion || {}).nombre_completo || 'N/A';
    }
    get action() {
        return '/solicitud_visita/updateSingleField/' +
            this.id;
    }
    get estado_warning() {
        return (this.fecha_ejecucion && (![ESTADO_EFECTUADA, ESTADO_EFECTUADA_POR_VALIDAR].includes(this.estado_id)))
            || ((this.fecha_programada || this.fecha_ejecucion) && this.estado_id === ESTADO_PENDIENTE);
    }
    setInstance(tippyinstance) {
        this.tippyinstance = tippyinstance;
        console.log({ shown: tippyinstance });
    }
    get updated_at_parsed() {
        return moment(this.updated_at);
    }
    get agendada_placeholder() {
        return this.is_agendada_disabled ? "Estado no admite fecha" : "Agendar fecha";
    }
    get ejecucion_placeholder() {
        return this.is_realizacion_disabled ? "Estado no admite fecha" : "Asignar fecha ejecución";
    }
    get agendada_icon_class() {
        return 'fa   -ml-1 ' + (this.is_agendada_disabled
            ? 'fa-lock opacity-50'
            : 'fa-calendar ');
    }
    get realizacion_icon_class() {
        return 'fa   -ml-1 ' + ((!this.fecha_programada || !this.isEditable)
            ? 'fa-lock opacity-50'
            : 'fa-calendar ');
    }
    get agendada_class() {
        return 'cursor-pointer   agendar_input inline-block text-start rounded-1 py-1 '
            + ((!this.isEditable) ? ' bg-gray-200 border-gray-300 ' : ' bg-white');
    }
    get realizacion_class() {
        return 'cursor-pointer agendar_input inline-block text-start rounded-1 py-1 '
            + ((!this.fecha_programada || !this.isEditable) ? ' bg-gray-200 border-gray-300 ' : ' bg-white');
    }
    get is_realizacion_disabled() {
        return (!this.fecha_programada) || !this.isEditable
            || (!this.isDirty && this.fecha_ejecucion && !globalThis.allow_edit_realizacion);
    }
    get isFinalState() {
        return [ESTADO_CANCELADA].includes(this.original_state) || ([ESTADO_EFECTUADA, ESTADO_EFECTUADA_POR_VALIDAR].includes(this.original_state) && !globalThis.allow_edit_realizacion);
    }
    get isEditable() {
        return !this.isFinalState;
    }
    get is_agendada_disabled() {
        return this.fecha_agendada_formatted && (!this.isEditable || ([ESTADO_CANCELADA, ESTADO_EFECTUADA, ESTADO_EFECTUADA_POR_VALIDAR, ESTADO_POSTERGADA].includes(this.estado_id)));
    }
    get color_row_title() {
        return this.color_row == 'red' ? 'Tiene mas de 3 días sin ser agendada (días hábiles)' : (this.color_row ? 'Tiene mas de 1 día sin ser agendada (días hábiles)' : '');
    }
    get color_row_style() {
        return this.color_row ? `color:${this.color_row.replace('yellow', 'gold')}` : '';
    }
    get agendada_tooltip() {
        return !this.isEditable
            ? 'Solicitud ya no admite edición'
            : (this.fecha_programada ?
                'Modifique esta fecha para reagendar visita' : 'Seleccione fecha agendada');
    }
    get inline_inputs_tooltip() {
        return !this.isEditable
            ? 'Solicitud ya no admite edición'
            : 'Abrir edición rápida';
    }
    get realizacion_tooltip() {
        return (!this.fecha_programada) ?
            'No editable sin fecha agendada' :
            (this.is_realizacion_disabled
                ? 'Solicitud ya no admite edición'
                : 'Asignar fecha ejecución');
    }
    get estadoSubestadoTooltip() {
        return (!this.isEditable
            ? 'Solicitud ya no admite edición'
            : 'Abrir diálogo de edición');
    }
    get warning_message() {
        return this.fecha_ejecucion
            ? 'Solicitud ya no admite edición'
            : 'Asignar fecha ejecución';
    }
    get fecha_realizacion_parsed() {
        return this.fecha_realizacion ? moment(this.fecha_realizacion) : null;
    }
    get fecha_realizacion_in_range() {
        return this.fecha_realizacion_parsed
            && this.fecha_realizacion_parsed.isBetween(this.parsedRange[0], this.parsedRange[1]);
    }
    get fecha_ejecucion_formatted() {
        return this.fecha_realizacion_parsed ? this.fecha_realizacion_parsed.format('DD-MM-YYYY HH:mm') : '';
    }
    get fecha_creacion_in_range() {
        return this.created_at_parsed
            && this.created_at_parsed.isBetween(this.parsedRange[0], this.parsedRange[1]);
    }
    get campo_fecha() {
        switch (this.filtros.campo_fecha) {
            case 'fecha_programada':
                return this.fecha_agendada_parsed;
                break;
            case 'fecha_ejecucion':
                return this.fecha_realizacion_parsed;
                break;
            case 'fecha_modificacion':
            case 'updated_at':
                return this.updated_at_parsed;
                break;
            case 'fecha_creacion':
            case 'created_at':
                return this.created_at_parsed;
                break;
        }
        ;
        return this.created_at_parsed;
    }
    get date_in_range() {
        return this.campo_fecha
            && this.campo_fecha.isBetween(this.parsedRange[0], this.parsedRange[1]);
    }
    get updated_at_in_range() {
        return this.updated_at_parsed
            && this.updated_at_parsed.isBetween(this.parsedRange[0], this.parsedRange[1]);
    }
    get created_at_parsed() {
        return parseMySqlDate(this.fecha_creacion);
    }
    get created_at_formatted() {
        return this.created_at_parsed.format('DD-MM-YYYY HH:mm');
    }
    printIsDirtyReason() {
        console.table(Object.entries(this.isDirtyReasons).filter(([key, { to, from }]) => {
            return to && to !== from;
        }).map(([key, { to, from }]) => {
            return { key, from, to };
        }));
    }
    getFechas() {
        console.table({
            fecha_agendada_formatted: this.fecha_agendada_formatted,
            fecha_seguimiento_formatted: this.fecha_seguimiento_formatted,
            fecha_programada: this.fecha_programada,
            fecha_programada_local: this.fecha_programada_local,
            ejecucion: this.fecha_ejecucion,
            ejecucion_formatted: this.fecha_ejecucion_formatted,
        });
    }
}
//# sourceMappingURL=SolicitudBase.js.map