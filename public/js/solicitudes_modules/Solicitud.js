import { openToast } from '../components/openToast';
import { ESTADO_AGENDADA, ESTADO_CANCELADA, ESTADO_EFECTUADA, ESTADO_EFECTUADA_POR_VALIDAR, ESTADO_EN_GESTION, ESTADO_NO_CONTESTA, ESTADO_PENDIENTE, ESTADO_POSTERGADA, ESTADO_REAGENDADA } from './DummySolicitud';
import { SolicitudBase } from './SolicitudBase';
export class Solicitud extends SolicitudBase {
    constructor(solicitud) {
        //@ts-ignore
        super(solicitud);
        this.searchstring = '';
        Object.assign(this, solicitud);
        this.isDirtyReasons = {
            fecha_programada_local: { from: solicitud.fecha_programada_local, to: null },
            fecha_agendada: { from: solicitud.fecha_programada, to: null },
            fecha_seguimiento: { from: solicitud.fecha_seguimiento, to: null },
            fecha_realizacion: { from: solicitud.fecha_ejecucion, to: null },
            estado_id: { from: solicitud.id_estado_solicitud, to: null },
            subestado_id: { from: solicitud.subestado, to: null },
            motivo: { from: solicitud.motivo, to: null },
        };
        this.negocio = solicitud.negocio;
        this.solicitante = solicitud.solicitante;
        this.searchstring = this.computeSearchString();
        try {
            //@ts-ignore
            this.tipo_negocio = Alpine.store('tipos_negocio').get(this.id_tipo_negocio).name;
        }
        catch (e) {
        }
        //this.tipo_propiedad = this.$store.tipos_propiedad.get(this.negocio.propiedad.id_tipo_propiedad).name
    }
    async getSolicitud(delay = 0) {
        this.isOngoingRequest = true;
        await globalThis.waitFor(delay);
        return fetch(`/solicitud_visita/json/${this.id}`)
            .then(res => this.parseResponse(res))
            .then(solicitudData => {
            if (solicitudData.error) {
                return openToast({ type: 'warning', text: solicitudData.error });
            }
        });
    }
    async parseResponse(res) {
        this.isOngoingRequest = false;
        if (res.ok) {
            const solicitudData = await res.json();
            this.refreshInput(solicitudData);
            console.info(solicitudData);
            return solicitudData;
        }
        else {
            const solicitudData = await res.json();
            console.warn(solicitudData);
            return solicitudData;
        }
    }
    get shouldSendReminder() {
        return ![
            ESTADO_CANCELADA,
            ESTADO_POSTERGADA,
            ESTADO_EFECTUADA,
            ESTADO_EFECTUADA_POR_VALIDAR
        ].includes(this.id_estado_solicitud);
    }
    sendOrResendemail(delay = 0, silent = false) {
        this.isOngoingRequest = true;
        let payload = { '_token': globalThis.csrf_token, 'inmediate': 1, 'mailer': (this.solicitante || {}).id_persona == 48 ? 'failover' : null };
        return globalThis.waitFor(delay).then(() => {
            return fetch(`/solicitud_visita/json/${this.id}/enqueue_invitation`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
        }).then(async (res) => {
            this.isOngoingRequest = false;
            let jsonRes = await res.json();
            if (!res.ok || jsonRes.error) {
                return openToast({ type: 'warning', text: jsonRes.error });
            }
            if (!silent) {
                return openToast({ type: 'success', text: `Se programó envío de correo para Solicitud #${this.id} ` });
            }
        });
    }
    patchSolicitud(delay = 0, silent = false) {
        this.isOngoingRequest = true;
        return globalThis.waitFor(delay).then(() => {
            return fetch(this.action, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    //@ts-ignore
                    // 'X-CSRF-TOKEN': Alpine.store('dictionary').token
                },
                body: JSON.stringify(this.payload)
            });
        }).then(res => this.parseResponse(res))
            .then(solicitudData => {
            if (solicitudData.error) {
                return openToast({ type: 'warning', text: solicitudData.error });
            }
            if (!silent) {
                return openToast({ type: 'success', text: `Solicitud #${this.id} guardada exitosamente` });
            }
        });
    }
    debouncedSave() {
        this.saving_icon = 'fa fa-spinner fa-spin';
        this.isOngoingRequest = true;
        if (this.timer) {
            clearTimeout(this.timer);
            console.log(`${performance.now()} clearing timeout ${this.timer}`);
        }
        this.timer = setTimeout(() => {
            console.log(`${performance.now()} Real execution timer ${this.timer}`);
            this.patchSolicitud();
            this.timer = null;
        }, 200);
    }
    /**
     * Change case for css capitalization
     */
    get solicitud_medio() {
        return (this.medio_texto || '').toLowerCase();
    }
    get payload() {
        const { medio_solicitud, nivel_ingreso, aval_ingreso, fecha_programada, fecha_ejecucion, id_estado_solicitud, subestado, anfitrion, motivo, comentario_ejecutiva } = this;
        //@ts-ignore
        return {
            '_token': globalThis.csrf_token,
            medio_solicitud,
            nivel_ingreso,
            aval_ingreso,
            motivo,
            comentario_ejecutiva,
            fecha_programada,
            fecha_ejecucion,
            id_estado_solicitud: Number(id_estado_solicitud),
            subestado: Number(subestado),
            anfitrion
        };
    }
    refreshInput({ fecha_programada, fecha_ejecucion, motivo, id_estado_solicitud, subestado, fecha_programada_local, color_row }) {
        if (this.isDirty) {
            console.log('refreshing input', {
                fecha_programada,
                fecha_ejecucion,
                id_estado_solicitud,
                subestado,
                fecha_programada_local
            });
        }
        //@ts-ignore
        this.$store = Alpine.store('dictionary');
        this.motivo = motivo;
        this.fecha_programada_local = fecha_programada_local; //?? this.fecha_programada_local
        this.fecha_agendada = fecha_programada; //?? this.fecha_programada
        this.fecha_realizacion = fecha_ejecucion; //?? this.fecha_ejecucion
        this.estado_id = id_estado_solicitud || this.id_estado_solicitud;
        this.subestado_id = subestado || this.subestado;
        this.color_row = color_row;
        this.original_state = id_estado_solicitud || this.id_estado_solicitud;
        this.isDirty = false;
    }
    setInstance(tippyinstance) {
        this.tippyinstance = tippyinstance;
        console.log({ shown: tippyinstance });
    }
    get rules() {
        return {
            [ESTADO_PENDIENTE]: [
                {
                    label_to: 'ESTADO_PENDIENTE',
                    to: ESTADO_PENDIENTE, allowed: true
                },
                {
                    label_to: 'ESTADO_EN_GESTION',
                    to: ESTADO_EN_GESTION, allowed: true
                },
                {
                    label_to: 'ESTADO_AGENDADA',
                    to: ESTADO_AGENDADA, allowed: true
                },
                {
                    label_to: 'ESTADO_EFECTUADA',
                    to: ESTADO_EFECTUADA, allowed: false
                },
                {
                    label_to: 'ESTADO_CANCELADA',
                    to: ESTADO_CANCELADA, allowed: true
                },
                {
                    label_to: 'ESTADO_REAGENDADA',
                    to: ESTADO_REAGENDADA, allowed: false
                },
                {
                    label_to: 'ESTADO_POSTERGADA',
                    to: ESTADO_POSTERGADA, allowed: false
                },
                {
                    label_to: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    to: ESTADO_EFECTUADA_POR_VALIDAR, allowed: false
                },
                {
                    label_to: 'ESTADO_NO_CONTESTA',
                    to: ESTADO_NO_CONTESTA, allowed: false
                }
            ],
            [ESTADO_EN_GESTION]: [
                {
                    label_to: 'ESTADO_PENDIENTE',
                    to: ESTADO_PENDIENTE, allowed: true
                },
                {
                    label_to: 'ESTADO_EN_GESTION',
                    to: ESTADO_EN_GESTION, allowed: true
                },
                {
                    label_to: 'ESTADO_AGENDADA',
                    to: ESTADO_AGENDADA, allowed: true
                },
                {
                    label_to: 'ESTADO_EFECTUADA',
                    to: ESTADO_EFECTUADA, allowed: false
                },
                {
                    label_to: 'ESTADO_CANCELADA',
                    to: ESTADO_CANCELADA, allowed: true
                },
                {
                    label_to: 'ESTADO_REAGENDADA',
                    to: ESTADO_REAGENDADA, allowed: false
                },
                {
                    label_to: 'ESTADO_POSTERGADA',
                    to: ESTADO_POSTERGADA, allowed: false
                },
                {
                    label_to: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    to: ESTADO_EFECTUADA_POR_VALIDAR, allowed: false
                },
                {
                    label_to: 'ESTADO_NO_CONTESTA',
                    to: ESTADO_NO_CONTESTA, allowed: false
                }
            ],
            [ESTADO_AGENDADA]: [
                {
                    label_to: 'ESTADO_PENDIENTE',
                    to: ESTADO_PENDIENTE
                },
                {
                    label_to: 'ESTADO_EN_GESTION',
                    to: ESTADO_EN_GESTION, allowed: true
                },
                {
                    label_to: 'ESTADO_AGENDADA',
                    to: ESTADO_AGENDADA,
                    allowed: true
                },
                {
                    label_to: 'ESTADO_EFECTUADA',
                    to: ESTADO_EFECTUADA, allowed: true
                },
                {
                    label_to: 'ESTADO_CANCELADA',
                    to: ESTADO_CANCELADA,
                    allowed: true
                },
                {
                    label_to: 'ESTADO_REAGENDADA',
                    to: ESTADO_REAGENDADA,
                    allowed: false
                },
                {
                    label_to: 'ESTADO_POSTERGADA',
                    to: ESTADO_POSTERGADA,
                    allowed: false
                },
                {
                    label_to: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    to: ESTADO_EFECTUADA_POR_VALIDAR,
                    allowed: false
                },
                {
                    label_to: 'ESTADO_NO_CONTESTA',
                    to: ESTADO_NO_CONTESTA
                }
            ],
            [ESTADO_EFECTUADA]: [
                {
                    label_to: 'ESTADO_PENDIENTE',
                    to: ESTADO_PENDIENTE
                },
                {
                    label_to: 'ESTADO_EN_GESTION',
                    to: ESTADO_EN_GESTION, allowed: false
                },
                {
                    label_to: 'ESTADO_AGENDADA',
                    to: ESTADO_AGENDADA
                },
                {
                    label_to: 'ESTADO_EFECTUADA',
                    to: ESTADO_EFECTUADA, allowed: true
                },
                {
                    label_to: 'ESTADO_CANCELADA',
                    to: ESTADO_CANCELADA
                },
                {
                    label_to: 'ESTADO_REAGENDADA',
                    to: ESTADO_REAGENDADA
                },
                {
                    label_to: 'ESTADO_POSTERGADA',
                    to: ESTADO_POSTERGADA
                },
                {
                    label_to: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    to: ESTADO_EFECTUADA_POR_VALIDAR
                },
                {
                    label_to: 'ESTADO_NO_CONTESTA',
                    to: ESTADO_NO_CONTESTA
                }
            ],
            [ESTADO_CANCELADA]: [
                {
                    label_to: 'ESTADO_PENDIENTE',
                    to: ESTADO_PENDIENTE
                },
                {
                    label_to: 'ESTADO_EN_GESTION',
                    to: ESTADO_EN_GESTION, allowed: false
                },
                {
                    label_to: 'ESTADO_AGENDADA',
                    to: ESTADO_AGENDADA
                },
                {
                    label_to: 'ESTADO_EFECTUADA',
                    to: ESTADO_EFECTUADA
                },
                {
                    label_to: 'ESTADO_CANCELADA',
                    to: ESTADO_CANCELADA, allowed: true
                },
                {
                    label_to: 'ESTADO_REAGENDADA',
                    to: ESTADO_REAGENDADA
                },
                {
                    label_to: 'ESTADO_POSTERGADA',
                    to: ESTADO_POSTERGADA
                },
                {
                    label_to: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    to: ESTADO_EFECTUADA_POR_VALIDAR
                },
                {
                    label_to: 'ESTADO_NO_CONTESTA',
                    to: ESTADO_NO_CONTESTA
                }
            ],
            [ESTADO_REAGENDADA]: [
                {
                    label_to: 'ESTADO_PENDIENTE',
                    to: ESTADO_PENDIENTE
                },
                {
                    label_to: 'ESTADO_EN_GESTION',
                    to: ESTADO_EN_GESTION, allowed: true
                },
                {
                    label_to: 'ESTADO_AGENDADA',
                    to: ESTADO_AGENDADA
                },
                {
                    label_to: 'ESTADO_EFECTUADA',
                    to: ESTADO_EFECTUADA
                },
                {
                    label_to: 'ESTADO_CANCELADA',
                    to: ESTADO_CANCELADA, allowed: true
                },
                {
                    label_to: 'ESTADO_REAGENDADA',
                    to: ESTADO_REAGENDADA, allowed: true
                },
                {
                    label_to: 'ESTADO_POSTERGADA',
                    to: ESTADO_POSTERGADA, allowed: true
                },
                {
                    label_to: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    to: ESTADO_EFECTUADA_POR_VALIDAR, allowed: true
                },
                {
                    label_to: 'ESTADO_NO_CONTESTA',
                    to: ESTADO_NO_CONTESTA
                }
            ],
            [ESTADO_POSTERGADA]: [
                {
                    label_to: 'ESTADO_PENDIENTE', to: ESTADO_PENDIENTE
                },
                { label_to: 'ESTADO_AGENDADA', to: ESTADO_AGENDADA, allowed: true },
                { label_to: 'ESTADO_EFECTUADA', to: ESTADO_EFECTUADA },
                { label_to: 'ESTADO_CANCELADA', to: ESTADO_CANCELADA, allowed: true },
                { label_to: 'ESTADO_REAGENDADA', to: ESTADO_REAGENDADA, allowed: true },
                { label_to: 'ESTADO_POSTERGADA', to: ESTADO_POSTERGADA, allowed: true },
                { label_to: 'ESTADO_EFECTUADA_POR_VALIDAR', to: ESTADO_EFECTUADA_POR_VALIDAR, allowed: true },
                { label_to: 'ESTADO_NO_CONTESTA', to: ESTADO_NO_CONTESTA }
            ],
            [ESTADO_EFECTUADA_POR_VALIDAR]: [
                {
                    label_to: 'ESTADO_PENDIENTE',
                    to: ESTADO_PENDIENTE
                },
                {
                    label_to: 'ESTADO_EN_GESTION',
                    to: ESTADO_EN_GESTION, allowed: true
                },
                {
                    label_to: 'ESTADO_AGENDADA',
                    to: ESTADO_AGENDADA, allowed: globalThis.allow_edit_realizacion
                },
                {
                    label_to: 'ESTADO_EFECTUADA',
                    to: ESTADO_EFECTUADA
                },
                {
                    label_to: 'ESTADO_CANCELADA',
                    to: ESTADO_CANCELADA, allowed: globalThis.allow_edit_realizacion
                },
                {
                    label_to: 'ESTADO_REAGENDADA',
                    to: ESTADO_REAGENDADA
                },
                {
                    label_to: 'ESTADO_POSTERGADA',
                    to: ESTADO_POSTERGADA, allowed: globalThis.allow_edit_realizacion
                },
                {
                    label_to: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    to: ESTADO_EFECTUADA_POR_VALIDAR, allowed: true
                },
                {
                    label_to: 'ESTADO_NO_CONTESTA',
                    to: ESTADO_NO_CONTESTA
                }
            ],
            [ESTADO_NO_CONTESTA]: [
                {
                    label_to: 'ESTADO_PENDIENTE',
                    to: ESTADO_PENDIENTE
                },
                {
                    label_to: 'ESTADO_EN_GESTION',
                    to: ESTADO_EN_GESTION, allowed: true
                },
                {
                    label_to: 'ESTADO_AGENDADA',
                    to: ESTADO_AGENDADA, allowed: true
                },
                {
                    label_to: 'ESTADO_EFECTUADA',
                    to: ESTADO_EFECTUADA
                },
                {
                    label_to: 'ESTADO_CANCELADA',
                    to: ESTADO_CANCELADA, allowed: true
                },
                {
                    label_to: 'ESTADO_REAGENDADA',
                    to: ESTADO_REAGENDADA, allowed: true
                },
                {
                    label_to: 'ESTADO_POSTERGADA',
                    to: ESTADO_POSTERGADA, allowed: true
                },
                {
                    label_to: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    to: ESTADO_EFECTUADA_POR_VALIDAR, allowed: true
                },
                {
                    label_to: 'ESTADO_NO_CONTESTA',
                    to: ESTADO_NO_CONTESTA, allowed: true
                }
            ],
        };
    }
    get estados_options() {
        let current_estado_id = Number(this.original_state) || Number(this.estado_id);
        console.log('current_estado_id', current_estado_id);
        let tableentries = {};
        let activeRules = this.rules[current_estado_id].map(option => {
            option.disabled = !option.allowed;
            return option;
        });
        let entries = Object.entries(this.estados_source).map(([key, value]) => {
            const option = {
                //@ts-ignore
                ...value,
                ...activeRules.find(r => r.to === value.estado_id),
                selected: current_estado_id === value.estado_id,
            };
            // rule = { ...option, ...activeRules.find(r => r.to === value.estado_id) }
            console.info(option);
            let tag = {
                only_agendada_can_be_reagendada: (current_estado_id !== ESTADO_AGENDADA && option.estado_id === ESTADO_REAGENDADA),
                cant_go_back_to_agendada: ([ESTADO_REAGENDADA, ESTADO_POSTERGADA, ESTADO_CANCELADA].includes(current_estado_id) && option.estado_id === ESTADO_AGENDADA),
                //invalid_pendiente: (option.estado_id === ESTADO_PENDIENTE && !!(!!this.fecha_ejecucion || !!this.fecha_programada)) || option.estado_id === ESTADO_NO_CONTESTA,
                // redefinition by felipe díaz on 2020-10-19: ESTADO_NO_CONTESTA should be selectable under the same conditions as pendiente
                cant_be_pendiente_since_it_has_fechas: ([ESTADO_PENDIENTE, ESTADO_NO_CONTESTA].includes(option.estado_id) && !!(!!this.fecha_ejecucion || !!this.fecha_programada)),
                not_efectuada: option.estado_id !== ESTADO_EFECTUADA && option.estado_id !== ESTADO_EFECTUADA_POR_VALIDAR,
                efectuada: [ESTADO_EFECTUADA, ESTADO_EFECTUADA_POR_VALIDAR].includes(option.estado_id),
                cant_set_as_efectuada: false
            };
            tag.cant_set_as_efectuada = (option.estado_id === ESTADO_EFECTUADA)
                || (tag.efectuada && !this.fecha_agendada) || (tag.not_efectuada && !!(this.fecha_ejecucion));
            option.estado_id = Number(value.id);
            let disabled_text = !!tag.only_agendada_can_be_reagendada
                ? 'only_agendada_can_be_reagendada' : (!!tag.cant_go_back_to_agendada ? 'cant_go_back_to_agendada' : ((!!tag.cant_be_pendiente_since_it_has_fechas) ? 'cant_be_pendiente_since_it_has_fechas' : ((tag.cant_set_as_efectuada ? 'cant_set_as_efectuada' : ''))));
            //option.disabled = disabled_text !== ''
            if (Number(option.estado_id) === current_estado_id) {
                option.disabled = false;
            }
            tableentries[option.name + (option.selected ? ' current' : '')] = ({
                current_estado_id: current_estado_id,
                disabled: option.disabled,
                disabled_text,
                ...tag
            });
            option.selected = current_estado_id === option.estado_id;
            return option;
        });
        console.table(tableentries);
        return entries;
    }
}
//# sourceMappingURL=Solicitud.js.map