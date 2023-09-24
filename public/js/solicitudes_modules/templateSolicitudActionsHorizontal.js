export const templateSolicitudActionsHorizontal = (row) => {
    let { calendar_link, event_id, id, id_estado_solicitud, reminder_sent } = row, envelope_icon = `<i class='fa fa-envelope   align-items-center flex float-start mr-1'></i>`, download_icon = `<i class='fa fa-download  align-items-center flex float-start mr-1'></i>`, calendar_icon = `<i class='fa fa-calendar-plus  align-items-center flex float-start mr-1'></i>`, google_icon = `<i class='lni lni-google  align-items-center flex float-start mr-1'></i>`, 
    //console.log({ data, row, meta });
    pendiente = row.id_estado_solicitud === 1, disabled = pendiente ? 'disabled' : '', sentlabel = reminder_sent ? 'Reenviar' : 'Enviar', envelope_title = pendiente ? 'No se ha generado aún' : `${sentlabel} Invitación por correo`, enviar_class = pendiente ? 'opacity-50 btn-outline-success' : 'btn-success', ver_title = pendiente ? 'No se ha generado aún' : `Ver Orden`;
    const event_label = calendar_link ? 'Calendar' : 'Agendar', event_icon = calendar_link ? google_icon : calendar_icon;
    let download_class = pendiente ? 'opacity-50 btn-outline-secondary' : 'btn-outline-secondary', downloadObj = {
        class: `visitas_actions_button btn ${download_class} btn-xs mt-1   ${disabled} w-100`,
        href: `/solicitud_visita/${row.id}/download_invitation`,
        title: ver_title,
        innerHTML: `${download_icon} Ver Orden`
    }, envelopeObj = {
        class: `visitas_actions_button btn ${enviar_class} btn-xs mt-1 ${disabled} w-100`,
        href: `/solicitud_visita/${row.id}/send_invitation`,
        title: envelope_title,
        innerHTML: `${envelope_icon} ${sentlabel}`
    }, eventObj = {
        class: `visitas_actions_button text-nowrap btn ${(calendar_link ? 'btn-outline-primary' : 'agregar_a_goole_calendar btn-primary')} btn-xs mt-1 w-100`,
        href: calendar_link ? calendar_link : "javascript:void(0)",
        title: calendar_link ? 'Ver en calendar' : 'Agendar',
        innerHTML: `${event_icon} ${event_label}`
    }, event = `<a href="${eventObj.href}"  target="_blank" title="${eventObj.title}" class="flex ${eventObj.class}" ${disabled}>${eventObj.innerHTML}</a>`, envelope = `<a href="${envelopeObj.href}"  target="_blank" title="${envelopeObj.title}" class="flex ${envelopeObj.class}" ${disabled}>${envelopeObj.innerHTML}</a>`, download = `<a href="${downloadObj.href}"  target="_blank" title="${downloadObj.title}" class="flex ${downloadObj.class}" ${disabled}>${downloadObj.innerHTML}</a>`;
    return `<div
    class="actions_div flex justify-content-between min-w-[8rem] pb-2">
    <ul class="w-100">
    <li class="pt-1">${envelope} </li>
    <li class="pt-1">${download} </li>
    <li  class="pt-1" >${event}</li>
    </ul>
     </div>`;
};
//# sourceMappingURL=templateSolicitudActionsHorizontal.js.map