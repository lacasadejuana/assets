import confirmDate from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import flatpickr from 'flatpickr';
function ejecucionInnerInput() {
    return `<div class="flatpickr h-12" x-init="initEjecucionPicker($el)"     x-ref="fecha_ejecucion">
    <input type="text" name="fecha_ejecucion" data-input

    :disabled="model.is_realizacion_disabled"
    :placeholder="model.ejecucion_placeholder"

    class="form-control form-control-sm     ejecucion_input float-start"
    :class="{
        'invalid': model
            .realizacion_errored,
        'border-danger': model
            .realizacion_errored,
        'bg-gray-200': model
            .is_realizacion_disabled
    }"
    readonly


    :value="(model.fecha_ejecucion_formatted||'').trim()" />
        <i  :class="model.agendada_icon_class" class="fa float-end hidden sm:inline-block rounded-end border absolute fa-calendar-plus" data-toggle
        style="font-size:1rem;    transform: translate(-1.5em, 0.5em);"></i>
    <a  x-show="model.fecha_ejecucion_formatted  && model.isEditable"  @click="clear_ejecucion" class="float-end absolute  input-button text-gray cursor-pointer" title="clear" data-clear style="
                transform: translate(-3.5em, 0.5em);">
                <i class="fa fa-times"></i>
            </a>
            </div>`;
}
function agendadaInnerInput() {
    return `<div class="flatpickr h-12"  x-init="initAgendadaPicker($el)"   x-ref="fecha_programada">
    <input type="text" name="fecha_programada" data-input

    :placeholder="model.agendada_placeholder"

    class="form-control form-control-sm     agendada_input float-start"
    :class="{
        'invalid': model.agendada_errored,
        'border-danger': model.agendada_errored,
        'bg-gray-200': !model.isEditable||model.is_agendada_disabled,
        'bg-gray-50': model.isEditable&&!model.is_agendada_disabled
    }"
    readonly


    :value="(model.fecha_agendada_formatted||'').trim()" />
    <i
    :class="model.agendada_icon_class"  class="hidden sm:inline-block float-end  fa  rounded-end border absolute fa-calendar-plus" data-toggle
    style="font-size:1rem;      transform: translate(-1.5em, 0.5em);">
    </i>
      <a  x-show="model.fecha_agendada_formatted && model.isEditable" class="float-end absolute input-button text-gray cursor-pointer" title="clear" data-clear @click="clear_agendada" style="    transform: translate(-3.5em, 0.5em);">
        <i class="fa fa-times"></i>
      </a>
    </div>`;
}
function seguimientoInnerInput() {
    return `<div class="flatpickr h-12"  x-init="initSeguimientoPicker($el)"   x-ref="fecha_seguimiento">
    <input type="text" name="fecha_seguimiento" data-input

    :placeholder="model.seguimiento_placeholder"

    class="form-control form-control-sm     agendada_input float-start"
    :class="{
        'invalid': model.seguimiento_errored,
        'border-danger': model.seguimiento_errored,
        'bg-gray-200': !model.isEditable||model.is_seguimiento_disabled,
        'bg-gray-50': model.isEditable&&!model.is_seguimiento_disabled
    }"
    readonly


    :value="(model.fecha_seguimiento_formatted||'').trim()" />
    <i
    :class="model.agendada_icon_class"  class="hidden sm:inline-block float-end  fa  rounded-end border absolute fa-calendar-plus" data-toggle
    style="font-size:1rem;      transform: translate(-1.5em, 0.5em);">
    </i>
      <a  x-show="model.fecha_seguimiento_formatted && model.isEditable" class="float-end absolute input-button text-gray cursor-pointer" title="clear" data-clear @click="clear_seguimiento" style="    transform: translate(-3.5em, 0.5em);">
        <i class="fa fa-times"></i>
      </a>
    </div>`;
}
const dataSolicitudModal = (solicitud, closing = false) => ({
    programadaPickr: null,
    ejecucionPickr: null,
    seguimientoPickr: null,
    agendadaInput: '',
    solicitud: solicitud,
    get model() {
        return this.solicitud || {};
    },
    set model(model) {
        this.solicitud = model;
    },
    get solicitud_id() {
        return this.model && this.model.id;
    },
    get programadaPickrValue() {
        return this.programadaPickr && this.programadaPickr.selectedDates && this.programadaPickr.selectedDates[0]
            ? this.programadaPickr.selectedDates[0].format('DD-MM-YYYY HH:mm')
            : (this.model ? this.model.fecha_agendada_formatted : null);
    },
    get seguimientoPickrValue() {
        return this.seguimientoPickr && this.seguimientoPickr.selectedDates && this.seguimientoPickr.selectedDates[0]
            ? this.seguimientoPickr.selectedDates[0].format('DD-MM-YYYY HH:mm')
            : (this.model ? this.model.fecha_seguimiento_formatted : null);
    },
    get ejecucionPickrValue() {
        return this.ejecucionPickr && this.ejecucionPickr.selectedDates && this.ejecucionPickr.selectedDates[0]
            ? this.ejecucionPickr.selectedDates[0].format('DD-MM-YYYY HH:mm')
            : (this.model ? this.model.fecha_realizacion_formatted : null);
    },
    get fecha_programada() {
        return this.model.fecha_programada;
    },
    get fecha_seguimiento() {
        return this.model.fecha_seguimiento;
    },
    get editando_text() {
        return this.model.isEditable ? 'Editando Solicitud ' : 'Mostrando Solicitud ';
    },
    get $input() {
        return this.$el.firstElementChild;
    },
    initAgendadaPicker($el) {
        $el = $el || this.$refs.fecha_programada;
        const $element = $el.querySelector('input');
        let defaultDate = this.model.fecha_agendada_parsed ? (this.model.fecha_agendada_parsed)
            .format('YYYY-MM-DD HH:mm') : null;
        console.info({
            $el, $element, fecha_programada: this.model.fecha_programada, defaultDate
        });
        $element.value = this.model.fecha_programada;
        this.programadaPickr = flatpickr($el, {
            altInput: true,
            allowInput: true,
            'altFormat': 'd-m-Y H:i',
            'enableTime': true,
            minTime: '08:30',
            wrap: true,
            maxTime: '21:00',
            minuteIncrement: 5,
            closeOnSelect: false,
            'dateFormat': 'Y-m-d H:i',
            defaultHour: 8,
            defaultMinute: 30,
            //minDate: 'yesterday',
            onClose: (ev) => {
                if (ev && ev.length) {
                    this.model.fecha_agendada = (ev && ev[0]) ? ev[0].toISOString() : null;
                    $element.value = this.model.fecha_agendada;
                    console.info({
                        fecha_agendada: this.model.fecha_agendada,
                    });
                }
            },
            plugins: [
                //@ts-ignore
                new confirmDate({
                    confirmIcon: "<i class='fa fa-check py-3 ml-2'></i>",
                    confirmText: "Agendar ",
                    showAlways: false,
                    theme: "light" // or "dark"
                })
            ],
            position: 'above center',
            defaultDate
        });
        // setTimeout(() => this.programadaPickr.open(), 300)
        this.$watch('model.fecha_agendada', (newAgendada, oldAgendada) => {
            if (newAgendada === oldAgendada) {
                //console.info('fecha_agendada no ha cambiado')
                return;
            }
            console.info({
                newAgendada,
                oldAgendada
            });
            if (this.programadaPickr) {
                let current = this.programadaPickr.selectedDates ? this.programadaPickr.selectedDates[0] : null;
                current = (current && current.toISOString) ? current.toISOString() : null;
                try {
                    this.programadaPickr.setDate(newAgendada, true);
                }
                catch (e) {
                    console.warn(e);
                }
            }
        });
        this.$nextTick(() => this.programadaPickr.close());
        return this.programadaPickr;
    },
    initSeguimientoPicker($el) {
        $el = $el || this.$refs.fecha_seguimiento;
        const $element = $el.querySelector('input');
        let defaultDate = this.model.fecha_seguimiento_parsed ? (this.model.fecha_seguimiento_parsed)
            .format('YYYY-MM-DD HH:mm') : null;
        console.info({
            $el, $element, fecha_seguimiento: this.model.fecha_seguimiento, defaultDate
        });
        $element.value = this.model.fecha_seguimiento;
        this.seguimientoPickr = flatpickr($el, {
            altInput: true,
            allowInput: true,
            'altFormat': 'd-m-Y H:i',
            'enableTime': true,
            minTime: '08:30',
            wrap: true,
            maxTime: '21:00',
            minuteIncrement: 5,
            closeOnSelect: false,
            'dateFormat': 'Y-m-d H:i',
            defaultHour: 8,
            defaultMinute: 30,
            //minDate: 'yesterday',
            onClose: (ev) => {
                if (ev && ev.length) {
                    this.model.fecha_seguimiento = (ev && ev[0]) ? ev[0].toISOString() : null;
                    $element.value = this.model.fecha_seguimiento;
                    console.info({
                        fecha_seguimiento: this.model.fecha_seguimiento,
                    });
                }
            },
            plugins: [
                //@ts-ignore
                new confirmDate({
                    confirmIcon: "<i class='fa fa-check py-3 ml-2'></i>",
                    confirmText: "Agendar ",
                    showAlways: false,
                    theme: "light" // or "dark"
                })
            ],
            position: 'above center',
            defaultDate
        });
        // setTimeout(() => this.programadaPickr.open(), 300)
        this.$watch('model.fecha_seguimiento', (newSeguimiento, oldSeguimiento) => {
            if (newSeguimiento === oldSeguimiento) {
                //console.info('fecha_agendada no ha cambiado')
                return;
            }
            console.info({
                newSeguimiento,
                oldSeguimiento
            });
            if (this.seguimientoPickr) {
                let current = this.seguimientoPickr.selectedDates ? this.seguimientoPickr.selectedDates[0] : null;
                current = (current && current.toISOString) ? current.toISOString() : null;
                try {
                    this.seguimientoPickr.setDate(newSeguimiento, true);
                }
                catch (e) {
                    console.warn(e);
                }
            }
        });
        this.$nextTick(() => this.seguimientoPickr.close());
        return this.seguimientoPickr;
    },
    clear_agendada() {
        this.model.fecha_agendada = null;
        this.programadaPickr && this.programadaPickr.setDate(null, true);
    },
    clear_seguimiento() {
        this.model.fecha_seguimiento = null;
        this.seguimientoPickr && this.programadaPickr.setDate(null, true);
    },
    clear_ejecucion() {
        this.model.fecha_realizacion = null;
        this.ejecucionPickr && this.ejecucionPickr.setDate(null, true);
    },
    initEjecucionPicker($el) {
        $el = $el || this.$refs.fecha_ejecucion;
        const $element = $el.querySelector('input');
        $element.value = this.model.fecha_realizacion;
        let defaultDate = (this.model.fecha_realizacion_parsed
            || this.model.fecha_agendada_parsed);
        defaultDate = defaultDate ? defaultDate.format('YYYY-MM-DD HH:mm') : null;
        console.info({ $el, $element, fecha_realizacion: this.model.fecha_realizacion, defaultDate });
        this.ejecucionPickr = flatpickr($el, {
            'altInput': true,
            allowInput: true,
            'altFormat': 'd-m-Y H:i',
            'enableTime': true,
            minTime: '08:30',
            wrap: true,
            maxTime: '21:00',
            minuteIncrement: 5,
            minDate: this.model.fecha_agendada_parsed ? this.model.fecha_agendada_parsed.format('YYYY-MM-DD') : null,
            closeOnSelect: false,
            'dateFormat': 'Y-m-d H:i',
            onClose: (ev) => {
                this.model.fecha_realizacion = (ev && ev[0]) ? ev[0].toISOString() : null;
                $element.value = this.model.fecha_realizacion;
                console.info({
                    fecha_realizacion: this.model.fecha_realizacion,
                    fecha_ejecucion_formatted: this.model.fecha_ejecucion_formatted
                });
            },
            plugins: [
                //@ts-ignore
                new confirmDate({
                    confirmIcon: "<i class='fa fa-check py-3 ml-2'></i>",
                    confirmText: "Aceptar ",
                    showAlways: false,
                    theme: "light" // or "dark"
                })
            ],
            defaultDate: this.model.fecha_realizacion_parsed ? this.model.fecha_realizacion_parsed.format('YYYY-MM-DD HH:mm') : null,
        });
        // setTimeout(() => this.ejecucionPickr.open(), 300)
        this.$watch('model.fecha_realizacion', (newRealizacion, oldRealizacion) => {
            if (newRealizacion === oldRealizacion) {
                console.info('fecha_realizacion no ha cambiado');
                return;
            }
            console.info({
                newRealizacion,
                oldRealizacion
            });
            if (this.ejecucionPickr) {
                let current = this.ejecucionPickr.selectedDates ? this.ejecucionPickr.selectedDates[0] : null;
                current = (current && current.toISOString) ? current.toISOString() : null;
                try {
                    this.ejecucionPickr.setDate(newRealizacion, true);
                }
                catch (e) {
                    console.warn(e);
                }
            }
        });
        return this.ejecucionPickr;
    },
    focusOnCancelEdition() {
        if (this.modalIsOpen) {
            this.$nextTick(() => {
                const cancelEdition = this.$refs.cancelEdition;
                cancelEdition && cancelEdition.focus();
            });
        }
    },
    closeModal(options = {}) {
        //@ts-ignore
        this.$store.solicitudes.closing = true;
        console.info('closeModal', options);
        if (options.save) {
            if (this.model && this.model
                .preventClosingReason) {
                return;
            }
            this.model.debouncedSave();
        }
        else if (this.model && this.model.isDirty) {
            this.model.getSolicitud();
        }
        if (this.ejecucionPickr) {
            this.ejecucionPickr.destroy();
        }
        if (this.programadaPickr) {
            this.programadaPickr.destroy();
        }
        setTimeout(() => {
            this.ejecucionPickr = null;
            this.programadaPickr = null;
            this.seguimientoPickr = null;
            this.$store.solicitudes.setCurrent(null);
            this.model = null;
            setTimeout(() => {
                //@ts-ignore
                this.$store.solicitudes.closing = false;
            }, 200);
        }, 600);
    },
    handleSolictudChange(solicitud_id) {
        this.solicitud =
            this.$store
                .solicitudes
                .get(solicitud_id);
        console.info({
            solicitud_id,
            solicitud: this
                .solicitud
        });
        this.$refs
            .solicitudEditModal
            .focus();
    },
    get isDirty() {
        return this.solicitud && this.solicitud.isDirty;
    },
    ejecucionInnerInput: '',
    init() {
        //@ts-ignore
        this.$store.solicitudes.closing = false;
        this.$store.solicitudes.modalDialog = this;
        this.ejecucionInnerInput = ejecucionInnerInput();
        this.seguimientoInnerInput = seguimientoInnerInput();
        //this.agendadaInput = agendadaInput()
        this.agendadaInnerInput = agendadaInnerInput();
        this.$watch('isDirty', (isDirty) => {
            solicitud.printIsDirtyReason();
        });
        this.$watch('solicitud_id', (solicitud_id) => {
            if (!solicitud_id ||
                typeof solicitud_id !==
                    'number') {
                this.closeModal();
                return;
            }
            this.$nextTick(() => this.handleSolictudChange(solicitud_id));
        });
        this.$nextTick(() => {
            this.modalIsOpen = true;
        });
    },
    modalIsOpen: false,
    get realizacion_tooltip() {
        if (!this.model)
            return '';
        return (!this.model.fecha_agendada) ?
            'No editable sin fecha agendada' :
            (!this.model.isEditable
                ? 'Solicitud ya no admite edición'
                : 'Asignar fecha ejecución');
    },
    get estadoSubestadoTooltip() {
        if (!this.model)
            return '';
        return (!this.model.isEditable
            ? 'Solicitud ya no admite edición'
            : 'Abrir diálogo de edición');
    },
    get warning_message() {
        if (!this.model)
            return '';
        return this.model.fecha_realizacion
            ? 'Solicitud ya no admite edición'
            : 'Asignar fecha ejecución';
    },
});
export { dataSolicitudModal };
export default dataSolicitudModal;
//# sourceMappingURL=dataSolicitudModal.js.map