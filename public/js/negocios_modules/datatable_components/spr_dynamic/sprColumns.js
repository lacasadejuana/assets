import { inferDireccionAndPropietario } from '../../../components';
import { mapColumns } from '../../decorators';
export const dateFormatter = (value) => {
    return value ? new Date(value).toLocaleString('es-CL').slice(0, 10) : '';
};
export const numberFormatterFactory = (previousColumn, days_limit = 0) => (value, row) => {
    let deal_age = row.dias_publicado;
    let delta = previousColumn ? value - row[previousColumn] : 0, diff = `<span class="w-[3.5em]  ${delta > 0 ? 'text-gray-400' : 'text-white'} pl-1 fs-09em">(<span class="min-w-[1.5em]">+${delta}</span>)</span>`;
    let colorClass = value > 50
        ? `text-black`
        : value
            ? 'text-gray-900'
            : 'text-gray-500';
    if (days_limit > deal_age)
        colorClass = 'text-gray-300';
    return `<span class="pr-1 ${colorClass}" style="font-size:1.15em">${value}${diff}</span>`;
};
export const quantity_column = {
    width: '100px',
    class: 'max-w-[110px]',
    align: 'right',
    visible: true,
    sortable: true,
    searchable: false,
    type: 'number',
    quantity_column: true,
};
export const sprColumns = (columnasActuales, column_prefix = 'visitas') => {
    let group1 = [
        {
            field: 'id',
            title: 'id',
            visible: false,
            sortable: true,
            searchable: false,
        },
        {
            field: 'nombre',
            title: 'Nombre',
            visible: true,
            sortable: true,
            searchable: false,
            width: 255,
            class: 'nombre_text bg-white sticky left-0 z-10',
            //console.log(campo);
            formatter: (value, row) => {
                let { propietario, direccion } = inferDireccionAndPropietario(value);
                if (propietario)
                    propietario = `<span class="print_only"> - </span><small>${propietario}</small>`;
                return `<a src="/negocio/${row.id}/edit" target="_blank" style="padding-top:0.25em;padding-bottom:0.15em;" class="-my-1  pl-2 mx-0 direccion_y_nombre"  title="#${row.id} ${value}"><div class="direccion">${direccion}</div>${propietario}</a>`;
            },
        },
        {
            field: 'id_negocio',
            title: 'id_negocio',
            visible: false,
            sortable: true,
            searchable: false,
        },
        {
            field: 'tipo_negocio',
            title: 'Tipo Negocio',
            filterControl: 'select',
            visible: false,
            sortable: true,
            searchable: false,
        },
        {
            field: 'tipo_propiedad',
            title: 'Tipo Propiedad',
            filterControl: 'select',
            visible: false,
            sortable: true,
            searchable: false,
        },
        {
            field: 'etapa_negocio',
            title: 'Etapa Negocio',
            visible: false,
            sortable: true,
            searchable: false,
        },
        {
            field: 'parametro_fecha',
            title: 'parametro_fecha',
            visible: false,
            sortable: true,
            searchable: false,
        },
        {
            field: 'fecha_publicacion',
            title: 'F. Publicación',
            visible: true,
            sortable: true,
            searchable: false,
            formatter: dateFormatter,
            class: 'max-w-[135px]',
        },
        {
            field: 'dias_publicado',
            title: 'Días Publicado',
            visible: true,
            sortable: true,
            searchable: false,
            width: '120px',
            class: 'max-w-[135px]',
            type: 'number',
        },
        {
            field: 'precio_de_publicacion_inicial_uf',
            title: 'P. Publicación Inicial',
            visible: true,
            sortable: true,
            searchable: false,
            width: '170px',
            class: 'max-w-[170px]',
            type: 'number',
            formatter: (value, row) => {
                if (value == 'null')
                    value = null;
                let delta = (value && row.precio_publicacion) ? (100 * (value - row.precio_publicacion) / row.precio_publicacion) : 0, delta_rounded = Number(delta).toFixed(1), delta_color = delta_rounded == '0.0' ? 'text-gray-400' : delta > 0 ? 'text-green-600' : 'text-red-600', diff = value ? `<span class=" w-[4.5em]  ${delta_color} pl-1 fs-09em pr-2">(<span class="min-w-[1.5em]">${delta > 0 ? '+' + delta_rounded : delta_rounded}%</span>)</span>` : '';
                return value ? `<span class="pr-1 float-end text-right " style="font-size:1.15em">${value} ${diff}</span>` : '';
            }
        },
        {
            field: 'precio_publicacion',
            title: 'Precio Publicación',
            visible: true,
            sortable: true,
            searchable: false,
            width: '150px',
            class: 'max-w-[155px]',
            type: 'number',
            formatter: (value, row) => {
                return value ? `<span class="float-end pr-1 text-right " style="font-size:1.15em">${value}</span>` : '';
            }
        },
        {
            field: 'precio_cierre_uf',
            title: 'Precio de Cierre',
            visible: true,
            sortable: true,
            searchable: false,
            width: '150px',
            class: 'max-w-[155px]',
            type: 'number',
            formatter: (value, row) => {
                if (value == 'null')
                    value = null;
                let delta = (value && row.precio_publicacion) ? (100 * (value - row.precio_publicacion) / row.precio_publicacion) : 0, delta_rounded = Number(delta).toFixed(1), delta_color = delta_rounded == '0.0' ? 'text-gray-400' : delta > 0 ? 'text-green-600' : 'text-red-600', diff = value ? `<span class=" w-[4.5em]  ${delta_color} pl-1 fs-09em pr-2">(<span class="min-w-[1.5em]">${delta > 0 ? '+' + delta_rounded : delta_rounded}%</span>)</span>` : '';
                return value ? `<span class="float-end pr-1 text-right " style="font-size:1.15em">${value} ${diff}</span>` : '';
            }
        },
        {
            field: 'fecha_aceptacion_oferta',
            title: 'F. Aceptación Oferta',
            visible: false,
            sortable: true,
            searchable: false,
            formatter: dateFormatter,
        },
        {
            field: 'date_negocio_descartado_o_perdido',
            title: 'F. Descartado o Perdido',
            visible: false,
            sortable: true,
            searchable: false,
            formatter: dateFormatter,
        },
    ];
    let blackList = group1.map(c => c.field);
    let group2 = mapColumns(columnasActuales.filter(c => !blackList.includes(c.slug_name))).map(c => {
        c.visible = false;
        if (c.title.includes(' vs ') && c.title.length >= 30) {
            let title_parts = c.title.split(' vs ');
            c.title = `<span class="flex flex-col">${title_parts[0]} vs<small style="line-height:14px;font-weight:400">${title_parts[1]}</small></span>`;
            //c.name = title_parts[0]
            console.log({ c });
        }
        return c;
    });
    let month_groups = [{ range_months: 2, previous_range: 1, visible: false },
        { range_months: 3, previous_range: 2, visible: true },
        { range_months: 4, previous_range: 3, visible: true },
        { range_months: 5, previous_range: 4, visible: true },
        { range_months: 6, previous_range: 5, visible: true },
        { range_months: 7, previous_range: 6, visible: false },
        { range_months: 8, previous_range: 7, visible: false },
        { range_months: 9, previous_range: 8, visible: true },
        { range_months: 10, previous_range: 9, visible: false },
        { range_months: 11, previous_range: 10, visible: false },
        { range_months: 12, previous_range: 11, visible: true },
        { range_months: 13, previous_range: 12, visible: false },
        { range_months: 14, previous_range: 13, visible: false },
        { range_months: 15, previous_range: 14, visible: true },
        { range_months: 16, previous_range: 15, visible: false },
        { range_months: 17, previous_range: 16, visible: false },
        { range_months: 18, previous_range: 17, visible: true },
        { range_months: 19, previous_range: 18, visible: false },
        { range_months: 20, previous_range: 19, visible: false },
        { range_months: 21, previous_range: 20, visible: true },
        { range_months: 22, previous_range: 21, visible: false },
        { range_months: 23, previous_range: 22, visible: false },
        { range_months: 24, previous_range: 23, visible: true }
    ];
    let group3 = [
        {
            field: `${column_prefix}_1_dia`,
            formatter: numberFormatterFactory(''),
            title: `<span class="tg_days_text"><span class="tg_days_digit">1 </span>dia</span>`,
            ...quantity_column,
        },
        {
            field: `${column_prefix}_3_dias`,
            tramo_anterior: `${column_prefix}_1_dia`,
            formatter: numberFormatterFactory(`${column_prefix}_1_dia`, 1),
            title: `<span class="tg_days_text"><span class="tg_days_digit">3 </span>dias</span>`,
            ...quantity_column,
        },
        {
            field: `${column_prefix}_7_dias`,
            tramo_anterior: `${column_prefix}_3_dias`,
            formatter: numberFormatterFactory(`${column_prefix}_3_dias`, 3),
            title: `<span class="tg_days_text"><span class="tg_days_digit">7 </span>dias</span>`,
            ...quantity_column,
        },
        {
            field: `${column_prefix}_15_dias`,
            tramo_anterior: `${column_prefix}_7_dias`,
            formatter: numberFormatterFactory(`${column_prefix}_7_dias`, 7),
            title: `<span class="tg_days_text"><span class="tg_days_digit">15</span> dias</span>`,
            ...quantity_column,
        },
        {
            field: `${column_prefix}_1_meses`,
            // tramo_anterior: `${column_prefix}_1_dia`,
            formatter: numberFormatterFactory(`${column_prefix}_15_dias`, 15),
            title: `<span class="tg_days_text"><span class="tg_days_digit">30</span> dias</span>`,
            ...quantity_column,
        }
    ].concat(month_groups.map(group => {
        return {
            field: `${column_prefix}_${group.range_months}_meses`,
            tramo_anterior: `${column_prefix}_${group.previous_range}_meses`,
            formatter: numberFormatterFactory(`${column_prefix}_${group.previous_range}_meses`, 30 * group.previous_range),
            title: `<span class="tg_days_text"><span class="tg_days_digit">${group.range_months}</span> meses</span>`,
            ...quantity_column,
            visible: group.visible,
        };
    }));
    let group4 = [{
            field: 'solicitudes_visita_count',
            title: 'Total Solicitudes',
            visible: true,
            sortable: true,
            searchable: false,
            type: 'number',
        },
        {
            field: 'solicitudes_visita_efectuada_count',
            title: 'Total Efectuadas',
            visible: true,
            sortable: true,
            searchable: false,
            type: 'number',
        },
    ];
    return group1.concat(group2).concat(group3).concat(group4);
};
//# sourceMappingURL=sprColumns.js.map