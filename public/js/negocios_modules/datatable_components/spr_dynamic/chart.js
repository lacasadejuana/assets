import * as echarts from 'echarts';
const legendBottom = 10, legendHeight = 30, dataZoomBottom = 10 + legendBottom + legendHeight, dataZoomHeight = 25, grid1Bottom = dataZoomBottom + dataZoomHeight + 10, grid1Height = 140;
const dataZoom = (extent) => ([
    {
        show: true,
        height: dataZoomHeight,
        xAxisIndex: [0, 1],
        bottom: dataZoomBottom,
        start: extent,
        end: 70,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
            color: '#d3dee5',
        },
        textStyle: {
            color: '#fff',
        },
        borderColor: '#90979c',
    }
]);
function itemStyle({ color, offset, opacity, labelPosition }) {
    return {
        normal: {
            color,
            opacity,
            barBorderRadius: 0,
            label: {
                show: true,
                offset,
                position: labelPosition ?? 'top',
                formatter(p) {
                    let value = Array.isArray(p.value) ? p.value[1] : p.value;
                    return value > 0
                        ? Number(value)
                            .toFixed(0)
                            .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                        : '';
                },
            },
        },
    };
}
export function initChart(seriesData, chartContainer, options = {}) {
    let chartParent = chartContainer.parentElement, parentWidth = chartContainer.parentElement.getBoundingClientRect().width;
    chartContainer.style.width = parentWidth + 'px';
    let rect = chartParent.getBoundingClientRect(), size = { height: window.innerHeight - rect.top - 30, width: window.innerWidth - rect.left }, { height, width } = options ?? size;
    chartParent.style.height = height + 'px';
    console.info('initChart', { height, width });
    const chart = echarts.init(chartContainer, { width: width - 80 });
    let values = Object.values(seriesData);
    seriesData.rangos_alt = seriesData.rangos.map(rango => {
        let [quantity, unit] = rango.split(' ');
        if (unit === 'meses') {
            unit = 'dias';
            quantity = quantity * 30;
        }
        unit = 'dias';
        quantity = String(quantity).padStart(3, '0');
        return [quantity, unit].join(' ');
    });
    console.info({ seriesData });
    const xData = seriesData.rangos_alt, dataLength = xData.length, // amounts for 100%
    timeSeries = seriesData.days.map(value => new Date(Date.now() + 86400000 * value)), lengthMinus15 = Math.round((100 * (dataLength - 15)) / (dataLength + 1));
    let chartOptions = {};
    chartOptions.xAxis = [
        {
            type: 'category',
            nameTextStyle: {
                color: '#666',
                align: 'right',
                verticalAlign: 'top',
                /**
                 * the top padding will shift the name down so that it does not overlap with the axis-labels
                 * t-l-b-r
                 */
                padding: [30, 0, 0, 0],
            },
            name: 'Totales',
            axisLine: {
                lineStyle: {
                    color: '#90979c',
                },
            },
            axisLabel: {
                //interval: 24,
                rotate: 45,
                formatter: (value) => {
                    return `${value} dias`;
                    console.log({ value });
                    return value;
                }
            },
            //splitNumber: 24,
            axisTick: {
                interval: 1,
                show: true,
            },
            data: seriesData.days //.map(value => new Date(Date.now() + 86400 * value))
        },
        {
            name: 'Promedios',
            nameTextStyle: {
                align: 'right',
                verticalAlign: 'top',
                color: '#666',
                /**
                 * the top padding will shift the name down so that it does not overlap with the axis-labels
                 * t-l-b-r
                 */
                padding: [15, 0, 40, 30],
            },
            type: 'category',
            gridIndex: 1,
            axisLine: {
                lineStyle: {
                    color: '#90979c',
                },
            },
            axisLabel: {
                show: false,
                //interval: 24,
                rotate: 45,
                formatter: (value) => {
                    return `${value} dias`;
                    console.log({ value });
                    return value;
                }
            },
            //splitNumber: 24,
            axisTick: {
                interval: 1,
                show: true,
            },
            data: seriesData.days //.map(value => new Date(Date.now() + 86400 * value))
        }
    ];
    chartOptions.yAxis = [
        {
            nameTextStyle: {
                align: 'right',
                verticalAlign: 'top',
                /**
                 * the top padding will shift the name down so that it does not overlap with the axis-labels
                 * t-l-b-r
                 */
                padding: [30, 0, 0, 0],
            },
            // left: '10',
            type: 'value',
            //name: 'Valores',
            //     scale: true,
            splitArea: {
                show: false
            },
            min: 'dataMin',
            max: 'dataMax',
            axisLine: {
                lineStyle: {
                    color: '#90979c',
                },
            },
        },
        {
            nameTextStyle: {
                align: 'right',
                verticalAlign: 'top',
                /**
                 * the top padding will shift the name down so that it does not overlap with the axis-labels
                 * t-l-b-r
                 */
                padding: [30, 0, 0, 0],
            },
            type: 'value',
            // 
            //scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: true },
            //axisLine: { show: false },
            axisTick: { show: true },
            splitLine: { show: false },
            min: 'dataMin',
            max: 'dataMax',
            axisLine: {
                lineStyle: {
                    color: '#90979c',
                },
            },
        },
    ];
    chartOptions.toolbox = {
        show: true,
        orient: 'vertical',
        feature: {
            saveAsImage: {
                type: 'png'
            },
            magicType: {
                type: ['line', 'bar', 'stack', 'tiled']
            },
            dataZoom: {
                show: true,
            },
            brush: {
                type: 'lineX'
            },
            dataView: {
                show: true,
            },
            restore: {
                show: true,
            }
        }
    };
    chartOptions.axisPointer = {
        link: { xAxisIndex: [0, 1] },
        label: {
            backgroundColor: '#777'
        }
    };
    chartOptions.tooltip = {
        trigger: 'axis',
        extraCssText: 'width: 300px',
        axisPointer: {
            type: 'cross',
        },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        /*position: function (pos, params, el, elRect, size) {
            var obj = { top: 10 };
            //  obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
        },*/
    };
    chartOptions.grid = [{
            show: false,
            left: 35,
            right: 35,
            borderWidth: 1,
            top: 35,
            bottom: grid1Bottom + 60 + grid1Height,
            /*textStyle: {
                color: '#ccc',
            },*/
        }, {
            left: 35,
            right: 35,
            show: false,
            //top: 310,
            height: grid1Height,
            bottom: grid1Bottom
        }];
    chartOptions.legend = [{
            right: 70,
            top: '65',
            width: '200',
            textStyle: {
                color: '#555',
                //fontSize: 15,
            },
            data: [
                'Acumulado Ejecutadas',
                'Acumulado',
                'Incremento Ejecutadas',
                'Incremento',
                'Precio Cierre vs Precio Publicación',
                'Peso Relativo',
                //  'Casas',
                //  'Departamentos',
                //  'tipo_propiedad',
                // 'Arriendos',
                // 'Ventas',
            ],
            selected: {
                'Acumulado Ejecutadas': false,
                'Acumulado': false,
                'Incremento Ejecutadas': true,
                'Incremento': true,
                'Precio Cierre vs Precio Publicación': true,
                'Peso Relativo': true,
                //  'Departamentos': false,
                // 'Arriendos': false,
                // 'Casas': false,
                // 'Ventas': false,
            },
        }, {
            left: '10%',
            right: 20,
            bottom: legendBottom - 5,
            height: legendHeight,
            //align: 'center',
            width: '100%',
            textStyle: {
                color: '#555',
                //fontSize: 15,
            },
            data: [
                'Activos',
                'Acumulado Promedio Ejecutadas',
                'Acumulado Promedio',
                'Incremento Promedio Ejecutadas',
                'Incremento Promedio',
                //  'Casas',
                //  'Departamentos',
                //  'tipo_propiedad',
                // 'Arriendos',
                // 'Ventas',
            ],
            selected: {
                'Activos': false,
                'Acumulado Promedio Ejecutadas': false,
                'Acumulado Promedio': false,
                'Incremento Promedio Ejecutadas': true,
                'Incremento Promedio': true,
                //  'Departamentos': false,
                // 'Arriendos': false,
                // 'Casas': false,
                // 'Ventas': false,
            },
        }];
    chartOptions.title = {
        text: 'Visitas por rango de fechas',
        //x: '20',
        top: '0',
        left: '70%',
        textStyle: {
            color: '#666',
            fontSize: 22,
        },
        subtextStyle: {
            color: '#90979c',
            fontSize: 16,
        },
    };
    const itemSeries = ({ name, type, data, xAxisIndex, yAxisIndex }) => {
        type = type || 'line';
        return {
            name,
            type: 'line',
            smooth: true,
            xAxisIndex: xAxisIndex ?? 0,
            yAxisIndex: yAxisIndex ?? 0,
            barMaxWidth: 25,
            emphasis: { label: { show: true } },
            //   stack: 'total',
            itemStyle: itemStyle({
                // color: '#50adf0',
                offset: [5, -10]
            }),
            data
        };
    };
    chartOptions.series = [
        itemSeries({
            name: 'Acumulado',
            data: seriesData.acumulado ?? seriesData.acumulado.map((value, index) => {
                return [seriesData.days[index], value];
            }),
        }),
        itemSeries({
            name: 'Incremento',
            data: seriesData.incremento ?? seriesData.incremento.map((value, index) => {
                return [seriesData.days[index], value];
            }),
        }),
        itemSeries({
            name: 'Incremento Promedio',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: seriesData.incremento_promedio ?? seriesData.incremento_promedio.map((value, index) => {
                return [seriesData.days[index], value];
            }),
        }),
        itemSeries({
            name: 'Acumulado Promedio',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: seriesData.acumulado_promedio ?? seriesData.acumulado_promedio.map((value, index) => {
                return [seriesData.days[index], value];
            }),
        }),
        {
            ...itemSeries({
                name: 'Precio Cierre vs Precio Publicación',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: seriesData.precio_cierre_vs_precio_publicacion ?? seriesData.precio_cierre_vs_precio_publicacion.map((value, index) => {
                    return [seriesData.days[index], value];
                }),
            }),
            itemStyle: {
                normal: {
                    barBorderRadius: 0,
                    label: {
                        show: true,
                        offset: [0, 5],
                        position: 'top',
                        formatter(p) {
                            return (-1 * p.value) + '%';
                        },
                    },
                },
            },
        },
        /**
         * EJECUTADAS
         */
        itemSeries({
            name: 'Acumulado Ejecutadas',
            data: seriesData.acumulado_ejecutadas ?? seriesData.acumulado_ejecutadas.map((value, index) => {
                return [seriesData.days[index], value];
            }),
        }),
        itemSeries({
            name: 'Incremento Ejecutadas',
            data: seriesData.incremento_ejecutadas ?? seriesData.incremento_ejecutadas.map((value, index) => {
                return [seriesData.days[index], value];
            }),
        }),
        itemSeries({
            name: 'Incremento Promedio Ejecutadas',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: seriesData.incremento_promedio_ejecutadas ?? seriesData.incremento_promedio_ejecutadas.map((value, index) => {
                return [seriesData.days[index], value];
            }),
        }),
        itemSeries({
            name: 'Acumulado Promedio Ejecutadas',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: seriesData.acumulado_promedio_ejecutadas ?? seriesData.acumulado_promedio_ejecutadas.map((value, index) => {
                return [seriesData.days[index], value];
            }),
        }),
        {
            name: 'Peso Relativo',
            type: 'bar',
            data: seriesData.peso_relativo ?? seriesData.peso_relativo.map((value, index) => {
                return [seriesData.days[index], value];
            }),
            max: 100,
            itemStyle: {
                normal: {
                    color: '#50adf0',
                    opacity: 1,
                    barBorderRadius: 0,
                    label: {
                        show: true,
                        offset: [0, 5],
                        position: 'top',
                        formatter(p) {
                            return p.value + '%';
                        },
                    },
                },
            },
        },
        {
            name: 'Activos',
            type: 'bar',
            barGap: '-50%',
            xAxisIndex: 1,
            yAxisIndex: 1,
            max: 100,
            itemStyle: {
                normal: {
                    color: '#50adf0',
                    opacity: 1,
                    barBorderRadius: 0,
                    label: {
                        show: true,
                        offset: [0, 5],
                        position: 'top',
                        formatter(p) {
                            let value = Array.isArray(p.value) ? p.value[1] : p.value;
                            return value > 0
                                ? Number(value)
                                    .toFixed(0)
                                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                                : '';
                        },
                    },
                },
            },
            data: seriesData.negocios ?? seriesData.negocios.map((value, index) => {
                return [seriesData.days[index], value];
            }),
        }
    ];
    chart.setOption({
        ...chartOptions,
        dataZoom: dataZoom(0)
    });
    return chart;
}
//# sourceMappingURL=chart.js.map