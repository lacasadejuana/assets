//import changeEstadoDialogData from './change_estado_dialog_data';
import { enableInputElement, instanceSingleDatePicker } from '../plugins/daterangepicker';
import { Solicitud } from './Solicitud';
import { createDict } from './stores/createDictStore';
import { templateFechaProgramada } from './templateFechaProgramada';
//import { solicitudData } from './solicitud_data';
import { templateChangeEstadoAlt } from './templateChangeEstado';
import { templateFechaCreacion, templateFechaRealizacion } from './templateFechaRealizacion';
import { templateSolicitudActions } from './templateSolicitudActions';
globalThis.createDict = createDict;
//globalThis.solicitudData = solicitudData
globalThis.Solicitud = Solicitud;
globalThis.enableInputElement = enableInputElement;
globalThis.instanceSingleDatePicker = instanceSingleDatePicker;
import { DttColumn, inferDireccionAndPropietario } from '../components/DttColumn';
import { AttrType } from '../components/alpine_definitions';
import { templateFechaSeguimiento } from './templateFechaSeguimiento';
export const visitasColumns = [
    {
        visible: true,
        data: 'id',
        title: '',
        width: '30px',
        sortable: false,
        cardVisible: false,
        className: 'dtr-control expand phone transform-scale-2',
        //render: (data, type, row, meta) => {            return `<span x-ignore   class="dtr-control phone"></span>`        }
    },
    {
        data: 'nombre',
        title: 'Negocio',
        searchable: true,
        //  width: '250px',
        input_type: 'text',
        className: 'with_actions border-gray-200 text-left direccion_y_nombre phone tablet desktop  sticky z-10 left-0',
        sortable: true,
        render: (data, type, row, meta) => {
            let { propietario, direccion } = inferDireccionAndPropietario(row.nombre);
            if (propietario) {
                propietario =
                    `<span class="print_only"> - </span><div class="propietario"  ><a href="/solicitud_visita/${row.id}/edit">${propietario}</a></div>`;
            }
            return `

            <div  class="actions_inner relative flex align-middle flex-nowrap justify-start py-1 w-[255px]"  x-init="$nextTick(()=>setTimeout(()=>$el.classList.remove('w-[255px]')&& $el.classList.add('w-[265px]')),1500)">
                <template x-ref="solicitud_actions">${templateSolicitudActions(row)}</template>
                <button class="flex justify-center text-2xl py-2 mr-2 " :class="verMasClasses" x-transition  x-tooltip="tooltip">
                    <i :class="solicitud.popover_icon_class"></i>
                </button>
                <div class="flex inner_container flex-grow">
                    <div class="direccion"><a href="/solicitud_visita/${row.id}/edit" target="_blank">${direccion}</a></div>
                    ${propietario}
                    </div>
                </div><span x-show="solicitud.color_row" x-tooltip.theme.light="solicitud.color_row_title"  class="clock_icon">
                <i class="fa fa-clock" :style="solicitud.color_row_style"></i>
            </span>`;
        },
    },
    {
        data: 'days_pending',
        title: 'Días Corridos',
        searchable: false,
        input_type: 'number',
        sortable: true
    },
    {
        visible: true,
        data: 'created_at',
        input_type: 'date',
        title: `Fecha Creación`,
        width: '160px',
        sortable: true,
        className: 'text-center f_creacion    desktop',
        render: (data, type, row, meta) => {
            //console.log({ data, row, meta });
            //@ts-ignore
            //return changeEstadoDialog(row)
            return templateFechaCreacion(row);
        },
    },
    {
        visible: true,
        data: 'id_persona',
        title: 'Solicitante',
        sortable: true,
        width: '150px',
        input_type: 'select',
        className: 'text-left pl-2 solicitante phone tablet desktop',
        render: (data, type, row) => {
            let { solicitante } = row;
            if (!solicitante)
                return '';
            return `<a x-ignore target="_blank" style="text-transform:capitalize"  href="/persona/${solicitante.id}">${solicitante.nombre_completo.toLowerCase()}</a>`;
        }
    },
    {
        visible: true,
        title: 'Como prefieres que te contactemos',
        sortable: true,
        width: '150px',
        input_type: 'select',
        className: 'text-left pl-2 como_prefieres_que_te_contactemos phone tablet desktop',
        render: (data, type, row) => {
            let { solicitante } = row;
            if (!solicitante)
                return 'ninguna preferencia';
            let como_prefieres_que_te_contactemos = solicitante.como_prefieres_que_te_contactemos || solicitante.extra_attributes?.como_prefieres_que_te_contactemos || '';
            if (como_prefieres_que_te_contactemos === '')
                return 'ninguna preferencia';
            return `<a x-ignore target="_blank" style="text-transform:capitalize" title=" email:${solicitante.email} \n medio contacto: ${como_prefieres_que_te_contactemos}" href="/persona/${solicitante.id}">${como_prefieres_que_te_contactemos.toLowerCase()}</a>`;
        }
    },
    {
        data: 'fecha_seguimiento',
        title: `Fecha Seguimiento`,
        width: '150px',
        className: 'text-center f_seguimiento   tablet desktop',
        input_type: 'date',
        sortable: true,
        render: (data, type, row) => {
            let html = templateFechaSeguimiento(row);
            // console.log({ templateFechaProgramada: html })
            return html;
        }
    },
    {
        data: 'fecha_programada',
        title: `Fecha Agendada`,
        width: '150px',
        className: 'text-center f_agendada   tablet desktop',
        input_type: 'date',
        sortable: true,
        render: (data, type, row) => {
            let html = templateFechaProgramada(row);
            // console.log({ templateFechaProgramada: html })
            return html;
        }
    },
    {
        data: 'id_estado_solicitud', title: 'Estado / Subestado',
        input_type: 'select',
        className: 'text-center   estado    desktop',
        render: (data, type, row, meta) => {
            //console.log({ data, row, meta });
            //@ts-ignore
            //return changeEstadoDialog(row)
            return templateChangeEstadoAlt(row);
        },
    },
    {
        data: 'fecha_ejecucion',
        input_type: 'date',
        title: `Fecha Ejecución`,
        width: '150px',
        sortable: true,
        className: 'text-center f_agendada f_ejecucion   tablet  desktop',
        render: (data, type, row) => {
            let html = templateFechaRealizacion(row);
            // console.log({ templateFechaProgramada: html })
            return html;
        }
    },
    {
        data: "comentario_ejecutiva", title: 'Comentario Anfitrión',
        width: '170px',
        className: 'motivo no-wrap text-center  desktop', visible: true,
        sortable: true,
        searchable: false,
        filterable: false,
        render: (data, type, row) => {
            return `<span x-tooltip.placement.left.theme.light.delay.1000="solicitud.motivo" class="motivo text-start text_overflow" style="text-transform:capitalize" x-html="solicitud.comentario_ejecutiva"></span>`;
        }
    },
    {
        data: "motivo", title: 'Motivo',
        width: '170px',
        className: 'motivo no-wrap text-center  desktop', visible: true,
        sortable: true,
        searchable: false,
        filterable: false,
        render: (data, type, row) => {
            return `<span x-tooltip.placement.left.theme.light.delay.1000="solicitud.motivo" class="motivo text-start text_overflow" style="text-transform:capitalize" x-html="solicitud.motivo"></span>`;
        }
    },
    {
        data: "solicitud_medio", title: 'Medio Solicitud', className: 'no-wrap text-center  desktop', visible: true,
        sortable: true,
        input_type: 'select',
        render: (data, type, row) => {
            return `<span x-ignore style="width:100%;text-transform:capitalize" >${row.solicitud_medio}</span>`;
        }
    },
    {
        data: "categoria_visita_texto", title: 'Categoría Visita', className: 'no-wrap text-center  desktop', visible: true,
        sortable: true,
        input_type: 'select',
        render: (data, type, row) => {
            return `<span x-ignore style="width:100%;text-transform:capitalize" >${row.categoria_visita_texto}</span>`;
        }
    },
    {
        visible: true,
        data: 'id_ejecutivo', title: 'Anfitrión', className: 'no-wrap text-center anfitrion desktop',
        sortable: true,
        input_type: 'select',
        render: (data, type, row) => {
            if (!row.anfitrion)
                return '';
            return `<a x-ignore target="_blank" href = "/persona/${row.anfitrion.id_persona || row.anfitrion.id}" > ${row.anfitrion.nombre_completo} </a>`;
        }
    },
    {
        data: 'log_plantilla', className: 'px-2 text-left n_orden nowrap desktop', width: '70px', visible: true,
        title: 'Última plantilla usada email',
        searchable: true, sortable: true,
        // input_type: 'number',
        render: (data, type, row) => {
            if (row.log_plantilla) {
                // split sitrng by comma
                let data_plantilla = row.log_plantilla.split(',');
                let plantilla = data_plantilla[0];
                let para = data_plantilla[1];
                let usuario = data_plantilla[2];
                let fecha = data_plantilla[3];
                let medio = data_plantilla[4];
                return `<span x-ignore class="no-wrap nowrap" style="text-indent: 0.1em;">${plantilla}</span> <br> <span x-ignore class="no-wrap nowrap" style="text-indent: 0.5em;">${para}</span> <br> <span x-ignore class="no-wrap nowrap" style="text-indent: 0.5em;">${usuario}</span> <br> <span x-ignore class="no-wrap nowrap" style="text-indent: 0.5em;">${fecha}</span> <br> <span x-ignore class="no-wrap nowrap" style="text-indent: 0.5em;">${medio}</span>`;
            }
        }
    },
    {
        data: 'log_plantilla_wsp', className: 'px-2 text-left n_orden nowrap desktop', width: '70px', visible: true,
        title: 'Última plantilla usada ws',
        searchable: true, sortable: true,
        // input_type: 'number',
        render: (data, type, row) => {
            if (row.log_plantilla_wsp) {
                // split sitrng by comma
                let data_plantilla = row.log_plantilla_wsp.split(',');
                let plantilla = data_plantilla[0];
                let para = data_plantilla[1];
                let usuario = data_plantilla[2];
                let fecha = data_plantilla[3];
                let medio = data_plantilla[4];
                return `<span x-ignore class="no-wrap nowrap" style="text-indent: 0.1em;">${plantilla}</span> <br> <span x-ignore class="no-wrap nowrap" style="text-indent: 0.5em;">${para}</span> <br> <span x-ignore class="no-wrap nowrap" style="text-indent: 0.5em;">${usuario}</span> <br> <span x-ignore class="no-wrap nowrap" style="text-indent: 0.5em;">${fecha}</span> <br> <span x-ignore class="no-wrap nowrap" style="text-indent: 0.5em;">${medio}</span>`;
            }
        }
    },
    {
        data: "numero_orden", title: 'N° Orden', className: 'px-2 text-left n_orden nowrap desktop', width: '70px', visible: true,
        sortable: true,
        render: (data, type, row) => {
            return `<span x-ignore class="no-wrap nowrap" style="    text-indent: 0.5em;">${row.numero_orden}</span>`;
        }
    },
    {
        data: 'nivel_ingreso_label',
        title: 'Nivel Ingreso',
        className: 'text-center nivel_ingreso desktop',
        input_type: 'select',
        sortable: true
    },
    {
        data: 'aval_ingreso_brief',
        title: 'Aval Ingreso',
        input_type: 'select',
        className: 'text-center aval_ingreso desktop',
        sortable: true
    },
    {
        data: 'duracion_arriendo_label',
        title: 'Duración Arriendo',
        className: 'text-center duracion_arriendo desktop',
        input_type: 'select',
        cardVisible: false,
        sortable: true
    },
    {
        data: 'tipo_negocio',
        title: 'Tipo Negocio',
        input_type: 'select',
        className: 'text-center tipo_negocio desktop',
        cardVisible: false,
        sortable: true
    },
    {
        data: 'tipo_propiedad',
        title: 'Tipo Propiedad',
        input_type: 'select',
        className: 'text-center tipo_propiedad desktop',
        cardVisible: false,
        sortable: true
    },
    {
        data: 'como_conocio_lcdj',
        title: 'Como Conocio LCDJ',
        input_type: 'select',
        width: '150px',
        sortable: true,
        className: 'text-center como_conocio_lcdj desktop',
        cardVisible: false,
        render: (data, type, row) => {
            return `<span x-tooltip.placement.left.theme.light="solicitud.como_conocio_lcdj"
            class="text_overflow" style="text-transform:capitalize" x-text="solicitud.como_conocio_lcdj"></span>`;
        }
    }
]
    .map(col => {
    col.slug_name = col.data;
    col.attr_type = AttrType.Solicitud;
    return col;
})
    .map(col => new DttColumn(col))
    .map((col, index) => {
    //@ts-ignore
    col.targets = index;
    //@ts-ignore
    //@ts-ignore
    col.name = col.title || col.data;
    col.searchable = true;
    return col;
});
//# sourceMappingURL=visitas_columns.js.map