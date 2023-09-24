export const templateFechaSeguimiento = (solicitud) => `
<fieldset x-tooltip.placement.bottom.theme.light.delay.500="inline_inputs_tooltip"
 x-data class="fs-085rem"
x-on:click.prevent="edit_modal">
<span x-ref="fecha_seguimiento" x-on:click.prevent="edit_modal"
 class="cursor-pointer   agendar_input inline-block text-start rounded-1 py-1 "
 :class="{'text-bg-warning':solicitud.seguimiento_expired}"
   x-html="solicitud.fecha_seguimiento_formatted||'&nbsp;'" ></span>
    <i class="relative" :class="solicitud.agendada_icon_class"  style="font-size:1rem;top:3px"></i>
</fieldset>
`;
//# sourceMappingURL=templateFechaSeguimiento.js.map