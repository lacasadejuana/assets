export const templateSolicitudActions = (row) => {
    return `
    <div  x-data="solicitudActionButtons(${row.id})" class="actions_div flex min-w-[8rem] ">
    <ul class="w-100 pb-1">

    <li >
    <a href="javascript:void(0)" @click.prevent="edit_modal"
        class="  visitas_actions_button flex btn btn-xs mt-1 border-gray-400 btn-cyan text-white hover:bg-secondary-500"
:class="{


}"
         x-html="edit_icon + 'Edición rápida'" target="_blank">
    </a>
    </li>

                <li >
                <a :href="send_invitation_url" :title="send_title"
                    class="border-green-600 text-green-700 hover:bg-green-600 hover:text-white flex visitas_actions_button btn btn-xs mt-1"
                    :class="{
                        'disabled': disabled,
                        'opacity-50 ': pendiente
                    }"
                    x-init="console.log({envelope_icon, sentlabel,reminder_sent:solicitud.remindent_sent})"
                    :disabled="disabled" x-html="envelope_icon + sentlabel">
                </a>
                </li>
                <li >
                <a :href="download_invitation_url" :title="ver_title"  target="_blank"
                    class="flex visitas_actions_button btn  btn-xs mt-1 "
                    :class="{
                        'disabled': disabled,
                        'opacity-50 btn-outline-secondary': pendiente,
                        'btn-outline-secondary': !pendiente
                    }"
                    :disabled="disabled" x-html="download_icon + ver_title">

                </a>
                </li>
                <li >
                <a :href="event_url" :title="event_title"
                    class="  visitas_actions_button text-nowrap btn  btn-xs mt-1"
                    :class="event_class" x-html="event_icon+event_title">
                    </a>
                </li>

                    <li >
                    <a :href="edit_negocio_url" title="Abrir formulario negocio"
                        class="flex visitas_actions_button
                        btn btn-xs mt-1 border-gray-400 btn-outline-cyan hover:bg-cyan-600 hover:text-white"

                   x-html="negocio_icon + 'Ir al negocio'" target="_blank">
                    </a>
                    </li>
                    <li >
                    <a :href="clone_solicitud_url" title="Clonar"
                        class="flex visitas_actions_button
                        btn btn-xs mt-1 border-gray-400 btn-outline-cyan hover:bg-cyan-600 hover:text-white"

                   x-html="copy_icon + 'Clonar'" target="_blank">
                    </a>
                    </li>
                    <li >
                        <a href="javascript:void(0)"  onclick="showPlantillas(true, ${row.id}, ${row.negocio_id});"
                            class="  visitas_actions_button flex btn btn-xs mt-1 border-gray-400 btn-cyan text-white hover:bg-secondary-500"
                    :class="{


                    }"
                            x-html="envelope_icon + 'Plantillas de Correo'" >
                        </a>
                    </li>

            </ul>
    </div>`;
};
//# sourceMappingURL=templateSolicitudActions.js.map