const solicitudActionButtons = (id) => ({
    internalSolicitud: null,
    get solicitud() {
        return this.internalSolicitud || {};
    },
    id,
    init() {
        this.internalSolicitud = this.$store.solicitudes.get(this.id);
        console.info({ internalSolicitud: this.internalSolicitud, sentlabel: this.sentlabel, reminder_sent: this.solicitud.reminder_sent });
    },
    edit_icon: `<i class='fa align-items-center flex float-start mr-2  fa-edit'></i>`,
    negocio_icon: `<i class='fa align-items-center flex float-start mr-2  fa fa-briefcase'></i>`,
    envelope_icon: `<i class='fa align-items-center flex float-start mr-2  fa-envelope'></i>`,
    copy_icon: `<i class='fa align-items-center flex float-start mr-2  fa-copy'></i>`,
    get sentlabel() {
        return (this.internalSolicitud.reminder_sent)
            ? 'Reenviar'
            : 'Enviar';
    },
    download_icon: `<i class='fa align-items-center flex float-start mr-2  fa-download'></i>`,
    calendar_icon: `<i class='fa align-items-center flex float-start mr-2  fa-calendar-plus'></i>`,
    google_icon: `<i class='lni align-items-center flex float-start mr-2  lni-google'></i>`,
    get base_link() {
        return `/solicitud_visita/${this.id}`;
    },
    get edit_negocio_url() {
        return `/negocio/${this.solicitud.negocio_id}/edit`;
    },
    get hasCalendarLink() {
        return this.solicitud.calendar_link;
    },
    get edit_solicitud_url() {
        return `${this.base_link}/edit`;
    },
    get clone_solicitud_url() {
        return `${this.base_link}/clone`;
    },
    get download_invitation_url() {
        return `${this.base_link}/download_invitation`;
    },
    get send_invitation_url() {
        return `${this.base_link}/send_invitation`;
    },
    get event_url() {
        return this.hasCalendarLink
            ? this.calendar_link
            : 'javascript:void(0)';
    },
    get id_estado_solicitud() {
        return Number(this.solicitud.id_estado_solicitud || 1);
    },
    get calendar_link() {
        return this.solicitud.calendar_link;
    },
    get ver_title() {
        return this.pendiente ?
            'Previsualizar Orden' :
            'Visualizar Orden';
    },
    get send_title() {
        return this.pendiente ?
            'No se ha generado aún' :
            `${this.sentlabel} Invitación por correo`;
    },
    get pendiente() {
        return Number(this.id_estado_solicitud) === 1;
    },
    get event_label() {
        return this.hasCalendarLink
            ? 'Calendar'
            : 'Agendar';
    },
    get event_title() {
        return this.hasCalendarLink
            ? ' Ver en calendar'
            : ' Agendar';
    },
    get event_icon() {
        return this.hasCalendarLink
            ? this.google_icon
            : this.calendar_icon;
    },
    get event_class() {
        return this.hasCalendarLink
            ? 'flex btn-primary'
            : 'hidden agregar_a_goole_calendar btn-outline-primary';
    },
    get disabled() {
        return this.pendiente
            ? 'disabled'
            : '';
    },
    get tippyinstance() {
        const defaultTippy = { hide: () => { } };
        return this.internalSolicitud
            ? this.internalSolicitud.tippyinstance || defaultTippy
            : defaultTippy;
    },
    edit_modal() {
        this.tippyinstance.hide();
        this.$nextTick(() => this.$store.solicitudes.setCurrent(this.id), 250);
    },
});
export { solicitudActionButtons };
export default solicitudActionButtons;
//# sourceMappingURL=dataSolicitudActionButtons.js.map