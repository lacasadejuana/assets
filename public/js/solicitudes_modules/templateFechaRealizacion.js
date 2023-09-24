export const templateFechaRealizacion = (solicitud) => `
 <fieldset  x-on:click.prevent="edit_modal" x-tooltip.placement.bottom.theme.light.delay.500="inline_inputs_tooltip" class="fs-085rem">
    <span x-ref="fecha_ejecucion" :class="solicitud.realizacion_class" 
     x-html="(solicitud.fecha_ejecucion_formatted)||'&nbsp;'" ></span>
    <i class="relative" :class="solicitud.realizacion_icon_class"  style="font-size:1rem;top:3px"></i>
</fieldset>
`;
export const templateFechaCreacion = (solicitud) => `
 <fieldset  class="fs-085rem;color:#777;">
    <span x-ref="fecha_ejecucion" class="fs-085rem px-2 inline-block text-start rounded-1 bg-gray-100 "
     style="font-size:1em !important;padding-bottom:0.42em;padding-top:0.42em;width:142px !important;margin-right:-1.4em;"    >${solicitud.created_at_formatted}&nbsp;</span>
    <i   class="relative fa fa-calendar"  style="font-size:1rem;right:8px;"></i>
</fieldset>
`;
//# sourceMappingURL=templateFechaRealizacion.js.map