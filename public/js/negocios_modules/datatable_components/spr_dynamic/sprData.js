import { sprColumns } from './sprColumns';
export function getSeriesData(negociosData) {
    console.log('getSeriesData', negociosData);
    let data = negociosData.reduce((accum, negocio) => {
        let dias_publicado = negocio.dias_publicado ?? negocio._extra_props.dias_publicado, solicitudes_visita_count = negocio.solicitudes_visita_count ?? negocio._extra_props.solicitudes_visita_count, precio_publicacion = negocio.precio_publicacion ??
            negocio._extra_props.precio_publicacion, precio_cierre_uf = negocio.precio_cierre_uf ??
            negocio._extra_props.precio_cierre_uf, fecha_aceptacion_oferta = negocio.fecha_aceptacion_oferta ??
            negocio._extra_props.fecha_aceptacion_oferta ??
            negocio.date_negocio_descartado_o_perdido ??
            negocio._extra_props.date_negocio_descartado_o_perdido;
        //@ts-ignore
        sprColumns([])
            .filter((c) => c.quantity_column)
            .filter((c) => c.field.includes('mes'))
            .forEach((column) => {
            let [visitas, quantity, unit] = column.field.split('_'), ejecutadas_field = column.field.replace('visitas_', 'ejecutadas_'), ejecutadas_anterior_field = column.tramo_anterior?.replace('visitas_', 'ejecutadas_'), valor_tramo = negocio[column.field] ||
                negocio._extra_props[column.field], valor_ejecutadas_tramo = negocio[ejecutadas_field] ||
                negocio._extra_props[ejecutadas_field], valor_ejecutadas_tramo_anterior = negocio[ejecutadas_anterior_field] ||
                negocio._extra_props[ejecutadas_anterior_field], valor_tramo_anterior = negocio[column.tramo_anterior] ||
                negocio._extra_props[column.tramo_anterior], days = unit.startsWith('mes')
                ? 30 * Number(quantity)
                : Number(quantity);
            let thisTramo = accum[column.field] || {
                rango: column.field,
                negocios: 0,
                days,
                //@ts-ignore
                tramo_anterior: column.tramo_anterior ?? '',
                //casas: 0,
                //ventas: 0,
                //arriendos: 0,
                peso_relativo: 0,
                acumulado: 0,
                acumulado_ejecutadas: 0,
                //departamentos: 0,
                incremento: 0,
                incremento_ejecutadas: 0,
                tamano_muestra_precio_cierre: 0,
                precio_cierre_vs_precio_publicacion: 0,
                column,
            };
            valor_tramo = valor_tramo || 0;
            let incremento = 0, incremento_ejecutadas = 0;
            //@ts-ignore
            if (column.tramo_anterior) {
                //@ts-ignore
                incremento = Math.max(0, valor_tramo - valor_tramo_anterior);
                incremento_ejecutadas = Math.max(0, valor_ejecutadas_tramo -
                    valor_ejecutadas_tramo_anterior);
            }
            else {
                incremento = valor_tramo;
                incremento_ejecutadas = valor_ejecutadas_tramo;
            }
            if (dias_publicado >= days - 30) {
                thisTramo.incremento += incremento;
                thisTramo.incremento_ejecutadas += incremento_ejecutadas;
                /**
                 * Each deal allocates its 100% in different proportions to each period.
                 * What matters is they all have the same 100% to allocate, so we can compare
                 */
                thisTramo.peso_relativo += solicitudes_visita_count ? (incremento / solicitudes_visita_count) : 0;
                thisTramo.negocios += 1;
                thisTramo.acumulado += valor_tramo;
                thisTramo.acumulado_ejecutadas += valor_ejecutadas_tramo;
                /**
                 * Check if the deal was closed in this period. If so, add it to the price variation series
                 */
                if (dias_publicado <= days &&
                    fecha_aceptacion_oferta &&
                    precio_cierre_uf &&
                    precio_publicacion) {
                    let precio_cierre_vs_precio_publicacion = (100 * (precio_publicacion - precio_cierre_uf)) /
                        precio_publicacion;
                    if (Math.abs(precio_cierre_vs_precio_publicacion) < 100) {
                        thisTramo.precio_cierre_vs_precio_publicacion += precio_cierre_vs_precio_publicacion;
                        thisTramo.tamano_muestra_precio_cierre += 1;
                    }
                }
            }
            //if (row.tipo_negocio === 'Venta') thisTramo.ventas += valor_tramo;
            //if (row.tipo_negocio === 'Arriendo') thisTramo.arriendos += valor_tramo;
            //if (row.tipo_propiedad === 'Casa') thisTramo.casas += valor_tramo;
            //if (row.tipo_propiedad === 'Departamento') thisTramo.departamentos += valor_tramo;
            accum[column.field] = thisTramo;
        });
        return accum;
    }, {});
    console.info({ data });
    let valuesData = Object.values(data);
    let series = {
        rangos: ['0_meses'].concat(valuesData.map((v) => v.rango.replace('visitas_', '').split('_').join(' '))),
        days: [0].concat(valuesData.map((v) => v.days)),
        negocios: [0].concat(valuesData.map((v) => v.negocios)),
        //ventas: valuesData.map(v => v.ventas),
        //arriendos: valuesData.map(v => v.arriendos),
        //casas: valuesData.map(v => v.casas),
        //departamentos: valuesData.map(v => v.departamentos),
        acumulado: [0].concat(valuesData.map((v) => v.acumulado)),
        acumulado_ejecutadas: [0].concat(valuesData.map((v) => v.acumulado_ejecutadas)),
        incremento_ejecutadas: [0].concat(valuesData.map((v) => v.incremento_ejecutadas)),
        tramo_anterior: ['visitas_0_meses'].concat(valuesData.map((v) => v.tramo_anterior)),
        peso_relativo: [0].concat(valuesData.map((v) => 1 * Number(100 * v.peso_relativo / negociosData.length).toFixed(1))),
        incremento: [0].concat(valuesData.map((v) => v.incremento)),
        precio_cierre_vs_precio_publicacion: valuesData.map((v) => Number(v.precio_cierre_vs_precio_publicacion /
            v.tamano_muestra_precio_cierre).toFixed(2)),
        acumulado_promedio: [],
        acumulado_promedio_ejecutadas: [],
        incremento_promedio_ejecutadas: [],
        incremento_promedio: [],
    };
    series.negocios[0] = series.negocios[1];
    series.vendidos = series.negocios.slice(1).map((valor, indice) => series.negocios[indice] - valor);
    series.acumulado_promedio_ejecutadas = series.acumulado_ejecutadas.map((valor, indice) => {
        let negocio_cant = Number(series.negocios[indice] ?? 0);
        return negocio_cant ? Number(valor / negocio_cant).toFixed(2) : 0;
    });
    series.incremento_promedio_ejecutadas = series.incremento_ejecutadas.map((valor, indice) => {
        let negocio_cant = Number(series.negocios[indice] ?? 0);
        return negocio_cant ? Number(valor / negocio_cant).toFixed(2) : 0;
    });
    series.acumulado_promedio = series.acumulado.map((valor, indice) => {
        let negocio_cant = Number(series.negocios[indice] ?? 0);
        return negocio_cant ? Number(valor / negocio_cant).toFixed(2) : 0;
    });
    series.incremento_promedio = series.incremento.map((valor, indice) => {
        let negocio_cant = Number(series.negocios[indice] ?? 0);
        return negocio_cant ? Number(valor / negocio_cant).toFixed(2) : 0;
    });
    console.table(data, [
        'days',
        'negocios',
        'peso_relativo',
        'acumulado',
        'incremento',
        'precio_cierre_vs_precio_publicacion',
        'acumulado_ejecutadas',
        'incremento_ejecutadas',
    ]);
    return series;
}
//# sourceMappingURL=sprData.js.map