export const templateFechaProgramada = (solicitud) => `
<fieldset x-tooltip.placement.bottom.theme.light.delay.500="inline_inputs_tooltip"
 x-data class="fs-085rem"
x-on:click.prevent="edit_modal">

<span x-ref="fecha_ejecucion" x-on:click.prevent="edit_modal"
 :class="solicitud.agendada_class"
   x-html="solicitud.fecha_agendada_formatted||'&nbsp;'" ></span>
    <i class="relative" :class="solicitud.agendada_icon_class"  style="font-size:1rem;top:3px"></i>
</fieldset>
`;
//# sourceMappingURL=templateFechaProgramada.js.map