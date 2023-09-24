import { DummySolicitud } from "./DummySolicitud";
export const solicitudMultiselectModal = (tippyinstance) => ({
    tippyinstance: null,
    init() {
        this.tippyinstance = tippyinstance;
        console.info({ tippyinstance });
    },
    get selectedRows() {
        return this.$store.solicitudes.selectedRows || [];
    },
    get modalIsOpen() {
        return (!this.$store.solicitudes.closing) && this.$store.solicitudes.selectedRows.length && this.$store.solicitudes.selectedRows.massEditing;
    },
    disabled: false,
    edit_icon: `<i class='fa align-items-center flex float-start mr-2  fa-edit'></i>`,
    negocio_icon: `<i class='fa align-items-center flex float-start mr-2  fa fa-briefcase'></i>`,
    envelope_icon: `<i class='fa align-items-center flex float-start mr-2  fa-envelope'></i>`,
    copy_icon: `<i class='fa align-items-center flex float-start mr-2  fa-copy'></i>`,
    get sentlabel() {
        return 'Enviar';
    },
    async sendMultipleEmails() {
        let nonMailable = this.selectedRows.filter(solicitud => !solicitud.shouldSendReminder)
            .map(solicitud => solicitud.id);
        if (nonMailable.length) {
            globalThis.openToast({ type: 'warning', text: `Omitiendo solicitudes ${nonMailable.join(', ')} en base a su estado y/o fechas`, delay: 6000 });
        }
        for (let solicitud of this.selectedRows) {
            if (solicitud.shouldSendReminder) {
                await solicitud.sendOrResendemail(150, true);
            }
            else {
                console.warn(`not sending email, solicitud ${solicitud.id},is ${solicitud.estado.name}`);
                await globalThis.waitFor(100);
            }
            globalThis.bsTable.bootstrapTable('uncheckBy', { field: 'id', values: [solicitud.id] });
        }
    },
    download_icon: `<i class='fa align-items-center flex float-start mr-2  fa-download'></i>`,
    calendar_icon: `<i class='fa align-items-center flex float-start mr-2  fa-calendar-plus'></i>`,
    mass_update_icon: `<i class='fa fa-save align-items-center flex float-start mr-2  '></i>`,
    get base_link() {
        return `/solicitud_visita`;
    },
    get send_invitation_url() {
        return `${this.base_link}/send_invitation`;
    },
    checkAll() {
        globalThis.bsTable.bootstrapTable('checkAll');
    },
    uncheckAll() {
        globalThis.bsTable.bootstrapTable('uncheckAll');
    },
    get send_title() {
        return this.pendiente ?
            'No se ha generado aún' :
            `${this.sentlabel} Invitación por correo`;
    },
    get pendiente() {
        return false;
    },
    get massUpdateTitle() {
        return 'Editar masivamente';
    },
    focusOnCancelEdition() {
        if (this.modalIsOpen) {
            this.$nextTick(() => {
                const cancelEdition = this.$refs.cancelEdition;
                cancelEdition && cancelEdition.focus();
            });
        }
    },
    get model() {
        return this.$store.solicitudes.massEditing || { subestados_options: [] };
    },
    async saveSelected() {
        let nonEditable = this.selectedRows.filter(solicitud => !solicitud.isEditable
            || solicitud.is_errored)
            .map(solicitud => solicitud.id);
        if (nonEditable.length) {
            globalThis.openToast({ type: 'warning', text: `Las solicitudes ${nonEditable.join(', ')} no son editables`, delay: 6000 });
        }
        const estado_id = this.model.estado_id;
        const subestado_id = this.model.subestado_id;
        const motivo = this.model.motivo;
        for (let solicitud of this.selectedRows) {
            solicitud.estado_id = estado_id;
            solicitud.subestado_id = subestado_id;
            if (motivo) {
                solicitud.motivo = motivo;
            }
            if (solicitud.isEditable && !solicitud.is_errored) {
                await solicitud.patchSolicitud(150, true).then(() => globalThis.openToast({ type: 'success', text: `Solicitud ${solicitud.id} actualizada`, delay: 1000 }));
            }
            else {
                console.warn(`reverting changes on solicitud ${solicitud.id}`, solicitud.preventClosingReasonVerbose.map(e => e.message));
                await solicitud.getSolicitud(200);
            }
            globalThis.bsTable.bootstrapTable('uncheckBy', { field: 'id', values: [solicitud.id] });
        }
    },
    openModal() {
        this.$nextTick(() => this.tippyinstance.hide());
        this.$store.solicitudes.massEditing = new DummySolicitud();
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
            this.saveSelected();
        }
        setTimeout(() => {
            this.$store.solicitudes.massEditing = null;
            setTimeout(() => {
                //@ts-ignore
                this.$store.solicitudes.closing = false;
            }, 200);
        }, 600);
    },
    get editando_text() {
        return `Editando ${this.$store.solicitudes.selectedRows.length} solicitudes`;
    }
});
export const multiselectButtonsData = () => ({
    disabled: false,
    popover_icon_class: 'h-100 align-items-center flex fa fa-cog text-xl mx-2',
    get selectedRows() {
        return this.$store.solicitudes.selectedRows || [];
    },
    get selectedRowsLength() {
        return this.selectedRows.length;
    },
    get selectedRowsText() {
        let filaText = (this.selectedRowsLength === 1 ? 'fila' : 'filas'), seleccionadaText = ''; // (this.selectedRowsLength === 1 ? 'seleccionada' : 'seleccionadas');
        return ([this.selectedRowsLength, filaText, `<span class="hidden ml-1 md:inline">${seleccionadaText}</span>`].join(' '));
    },
    init() {
        globalThis.multiselectButtonsInstance = this;
    },
    async saveSelected() {
        for (let solicitud of this.selectedRows) {
            await solicitud.patchSolicitud(150, true);
            globalThis.bsTable.bootstrapTable('uncheckBy', { field: 'id', values: [solicitud.id] });
        }
    },
    get model() {
        return this.$store.solicitudes.massEditing || {};
    },
    openModal() {
        this.tippyinstance.close();
        this.$store.solicitudes.massEditing = new DummySolicitud();
    },
    closeModal() {
        this.$store.solicitudes.massEditing = null;
    },
    get tooltip() {
        const self = this;
        return {
            maxWidth: '13rem',
            content: () => this.$refs.solicitud_actions.innerHTML,
            allowHTML: true,
            appendTo: this.$refs.help_dropdown,
            theme: 'light-border',
            trigger: 'click',
            placement: 'bottom',
            offset: [-5, 10],
            interactive: true,
            onHide(tippyinstance) {
                self.open = false;
                console.log({ closing: tippyinstance });
                self.tippyinstance = null;
            },
            onShow(tippyinstance) {
                globalThis.verMas = self;
                self.tippyinstance = tippyinstance;
                console.log({ selfInstance: self.tippyinstance, solicitud: self.solicitud });
                self.open = true;
            },
        };
    },
    get help_tooltip() {
        return {
            maxWidth: '50rem',
            content: () => this.$refs.ayuda.innerHTML,
            allowHTML: true,
            appendTo: this.$root,
            theme: 'light',
            trigger: 'click',
            placement: 'bottom-end',
            offset: [-10, 20],
            interactive: true
        };
    }
});
//# sourceMappingURL=dataMultiselect.js.map