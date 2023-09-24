import { defaultEstadoOption, defaultSubestadoOption } from './stores/createDictStore';
export const estadoFormDataInline = (solicitud, id) => ({
    get solicitud() {
        return solicitud;
    },
    get datos() {
        return solicitud;
    },
    get id() {
        return this.solicitud ? this.solicitud.id : id;
    },
    get id_estado_solicitud() {
        return this.solicitud ? this.solicitud.estado_id : null;
    },
    estado_cell_editing: false,
    subestado_cell_editing: false,
    get inline_inputs_tooltip() {
        return !this.solicitud.isEditable
            ? 'Solicitud ya no admite edición'
            : 'Abrir edición rápida';
    },
    get estados_options() {
        return this.solicitud.estados_options || [defaultEstadoOption];
    },
    get subestados_options() {
        return this.solicitud.subestados_options || [defaultSubestadoOption];
    },
    setEditing() {
        this.estado_cell_editing = true;
        const estado_id = this.solicitud.estado_id;
        this.$nextTick(() => {
            console.info({
                estados_options: this.estados_options,
                subestados_options: this.subestados_options,
                id: this.solicitud.id,
                setEditing: true,
                instance: this,
                estado_id,
                subestado: this.subestado
            });
            this.solicitud.estado_id = estado_id;
        });
    },
    init() {
        if (this.solicitud) {
            this.solicitud.refreshInput(this.solicitud);
        }
        else {
            console.error('could not find solicitud id #' + this.id);
        }
    },
    ejecucionPickr: null,
    /*get isEditable() {
        return this.solicitud.isDirty || ![3, 4].includes(Number(this.solicitud.estado_id))
    },



    get fecha_agendada_formatted() {
        return this.solicitud.fecha_agendada ? parseMySqlDate(this.solicitud.fecha_agendada, 'UTC').format('DD-MM-YYYY HH:mm') : '';
    },
    get fecha_ejecucion_formatted() {
        return this.solicitud.fecha_realizacion ? parseMySqlDate(this.solicitud.fecha_realizacion, 'UTC').format('DD-MM-YYYY HH:mm') : '';
    },*/
    get verMasClasses() {
        return [
            'color_row_' + this.solicitud.color_row,
            'w-10',
            'text-center',
            'shadow-md',
            'border',
            'border-gray-200',
            'hover:border-gray-300',
            'focus:border-gray-300',
            'rounded-2',
            'transition-all',
            'font-semibold',
            'outline-none',
            'focus:outline-none',
            this.solicitud.popover_button_class
        ].join(' ');
    },
    get style() {
        return `background: ${this.solicitud.fecha_agendada ? 'white' : '#eee'}; `;
    },
    edit_modal() {
        if (true || this.isEditable) {
            this.$store.solicitudes.setCurrent(this.solicitud.id);
        }
    },
    tippyinstance: null,
    get tooltip() {
        const self = this;
        return {
            maxWidth: '40rem',
            content: () => this.$refs.solicitud_actions.innerHTML,
            allowHTML: true,
            appendTo: this.$refs.table_container_parent,
            theme: 'light-border',
            trigger: 'click',
            placement: 'right',
            offset: [-5, 10],
            interactive: true,
            onHide(tippyinstance) {
                self.open = false;
                console.log({ closing: tippyinstance });
                self.solicitud.setInstance(null);
            },
            onShow(tippyinstance) {
                globalThis.verMas = self;
                self.tippyinstance = tippyinstance;
                console.log({ selfInstance: self.tippyinstance, solicitud: self.solicitud });
                self.solicitud.setInstance(tippyinstance);
                self.open = true;
            },
        };
    }
});
//# sourceMappingURL=estadoFormDataInline.js.map