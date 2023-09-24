export const templateChangeEstadoAlt = (row) => `<fieldset
x-tooltip.placement.bottom.theme.light-border.delay.500="inline_inputs_tooltip"  x-data class="flex">



    <button
        class="btn estado_button h-25"

        type="button"
        @click="()=>edit_modal()"
        x-text="solicitud.estado_label"></button>

    <button
        class="btn estado_button h-25"
        type="button"
        @click="()=>edit_modal()"
        x-text="solicitud.subestado_label"></button>

    <span
        class="h-25"
        @click="()=>edit_modal()"
        // truncate text to 20 characters
        x-text="(solicitud.motivo&&solicitud.motivo.length > 20) ? solicitud.motivo.substring(0, 20) + '...' : (solicitud.motivo||'')"></span>



</fieldset>`;
//# sourceMappingURL=templateChangeEstado.js.map