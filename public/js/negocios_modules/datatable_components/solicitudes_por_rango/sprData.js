import { sprColumns } from "./sprColumns";
export function getSeriesData(negociosData) {
    console.log('getSeriesData', negociosData);
    let data = negociosData.reduce((accum, negocio) => {
        let extra_props = (negocio._extra_props ?? {}), dias_publicado = negocio.dias_publicado ?? extra_props.dias_publicado, fecha_aceptacion_oferta = negocio.fecha_aceptacion_oferta
            ?? extra_props.fecha_aceptacion_oferta
            ?? negocio.date_negocio_descartado_o_perdido
            ?? extra_props.date_negocio_descartado_o_perdido;
        //@ts-ignore
        sprColumns([]).filter(c => c.quantity_column)
            .filter(c => c.field.includes('mes'))
            .forEach(column => {
            let [visitas, quantity, unit] = column.field.split('_'), ejecutadas_field = column.field.replace('visitas_', 'ejecutadas_'), ejecutadas_anterior_field = column.tramo_anterior?.replace('visitas_', 'ejecutadas_'), valor_tramo = negocio[column.field] || negocio._extra_props[column.field], valor_ejecutadas_tramo = negocio[ejecutadas_field] || negocio._extra_props[ejecutadas_field], valor_ejecutadas_tramo_anterior = negocio[ejecutadas_anterior_field] || negocio._extra_props[ejecutadas_anterior_field], valor_tramo_anterior = negocio[column.tramo_anterior] || negocio._extra_props[column.tramo_anterior], days = unit.startsWith('mes') ? 30 * Number(quantity) : Number(quantity);
            let thisTramo = accum[column.field] || {
                rango: column.field,
                negocios: 0,
                days,
                //@ts-ignore
                tramo_anterior: column.tramo_anterior ?? '',
                //casas: 0,
                //ventas: 0,
                //arriendos: 0,
                acumulado: 0,
                acumulado_ejecutadas: 0,
                //departamentos: 0,
                incremento: 0,
                incremento_ejecutadas: 0,
                column
            };
            valor_tramo = valor_tramo || 0;
            let incremento = 0, incremento_ejecutadas = 0;
            //@ts-ignore
            if (column.tramo_anterior) {
                //@ts-ignore
                incremento = Math.max(0, valor_tramo - valor_tramo_anterior);
                incremento_ejecutadas = Math.max(0, valor_ejecutadas_tramo - valor_ejecutadas_tramo_anterior);
            }
            else {
                incremento = valor_tramo;
                incremento_ejecutadas = valor_ejecutadas_tramo;
            }
            if (dias_publicado >= (days - 30)) {
                thisTramo.incremento += incremento;
                thisTramo.incremento_ejecutadas += incremento_ejecutadas;
                thisTramo.negocios += 1;
                thisTramo.acumulado += valor_tramo;
                thisTramo.acumulado_ejecutadas += valor_ejecutadas_tramo;
                if (dias_publicado <= days + 30) {
                }
                //if (row.tipo_negocio === 'Venta') thisTramo.ventas += valor_tramo;
                //if (row.tipo_negocio === 'Arriendo') thisTramo.arriendos += valor_tramo;
                //if (row.tipo_propiedad === 'Casa') thisTramo.casas += valor_tramo;
                //if (row.tipo_propiedad === 'Departamento') thisTramo.departamentos += valor_tramo;
            }
            accum[column.field] = thisTramo;
        });
        return accum;
    }, {});
    console.info({ data });
    let valuesData = Object.values(data);
    let series = {
        rangos: ['0_meses'].concat(valuesData.map(v => v.rango.replace('visitas_', '').split('_').join(' '))),
        days: [0].concat(valuesData.map(v => v.days)),
        negocios: [0].concat(valuesData.map(v => v.negocios)),
        //ventas: valuesData.map(v => v.ventas),
        //arriendos: valuesData.map(v => v.arriendos),
        //casas: valuesData.map(v => v.casas),
        //departamentos: valuesData.map(v => v.departamentos),
        acumulado: [0].concat(valuesData.map(v => v.acumulado)),
        acumulado_ejecutadas: [0].concat(valuesData.map(v => v.acumulado_ejecutadas)),
        incremento_ejecutadas: [0].concat(valuesData.map(v => v.incremento_ejecutadas)),
        tramo_anterior: ['visitas_0_meses'].concat(valuesData.map(v => v.tramo_anterior)),
        incremento: [0].concat(valuesData.map(v => v.incremento)),
        acumulado_promedio: [],
        acumulado_promedio_ejecutadas: [],
        incremento_promedio_ejecutadas: [],
        incremento_promedio: []
    };
    series.negocios[0] = series.negocios[1];
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
    console.table(data, ['days', 'negocios', 'acumulado', 'incremento', 'acumulado_ejecutadas', 'incremento_ejecutadas']);
    return series;
    data.rangos = Object.keys(data).map(name => name.replace('visitas_', '').split('_').join(' '));
    data.total = Object.values(data);
    data.acumulado = data.total.reduce((accum, value, index) => {
        accum[index] = Math.max(accum[index - 1] ?? 0, value);
        return accum;
    }, [0]);
    data.incremento = data.total.reduce((accum, value, index) => {
        accum[index] = Math.max(0, value - (accum[index - 1] ?? 0));
        return accum;
    }, [0]);
    console.table(data, ['rangos', 'total', 'acumulado', 'incremento']);
    console.log(data);
    return data;
}
//# sourceMappingURL=sprData.js.map