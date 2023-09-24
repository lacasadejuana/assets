import { getSeriesData } from '../sprData';
import { itemStyle } from './itemStyle';
export class SolicitudesChartSeries {
    constructor(dataStore) {
        this.legendBottom = 10;
        this.legendHeight = 30;
        this.dataZoomHeight = 25;
        this.grid1Height = 140;
        this.dataStore = dataStore;
        this.seriesData = getSeriesData(this.dataStore.properties);
    }
    get dataZoomBottom() {
        return 10 + this.legendBottom + this.legendHeight;
    }
    get grid1Bottom() {
        return this.dataZoomBottom + this.dataZoomHeight + 10;
    }
    get seriesInSecondGrid() {
        return this.series(this.seriesData).filter(s => s.xAxisIndex == 1 && s.yAxisIndex == 1);
    }
    get xAxis() {
        let xAxis = [
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
                data: this.seriesData.days //.map(value => new Date(Date.now() + 86400 * value))
            }
        ];
        if (this.seriesInSecondGrid.length > 0) {
            xAxis.push({
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
                data: this.seriesData.days //.map(value => new Date(Date.now() + 86400 * value))
            });
        }
        return xAxis;
    }
    lineSeries({ name, type, data, xAxisIndex, yAxisIndex }) {
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
            //@ts-ignore
            itemStyle: itemStyle({
                // color: '#50adf0',
                offset: [5, -10]
            }),
            data
        };
    }
    barStyle() {
        return {
            normal: {
                //  color: '#50adf0',
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
        };
    }
    get title() {
        return {
            text: 'Solicitudes por rango de fechas',
            //x: '20',
            top: 0,
            right: 60,
            textStyle: {
                color: '#666',
                fontSize: 22,
            },
            subtextStyle: {
                color: '#90979c',
                fontSize: 16,
            },
        };
    }
    get legend() {
        return [{
                right: 70,
                top: 50,
                width: 200,
                textStyle: {
                    color: '#555',
                    //fontSize: 15,
                },
                //@ts-ignore
                data: this.series(this.seriesData).filter(s => s.xAxisIndex != 1 && s.yAxisIndex != 1).map(s => s.name),
                selected: {
                    'Acumulado Ejecutadas': false,
                    'Acumulado': false,
                    'Incremento Ejecutadas': true,
                    'Incremento': true,
                    //  'Departamentos': false,
                    // 'Arriendos': false,
                    // 'Casas': false,
                    // 'Ventas': false,
                },
            }, {
                right: 1,
                left: 1,
                bottom: this.legendBottom - 5,
                height: this.legendHeight,
                //align: 'center',
                width: '100%',
                textStyle: {
                    color: '#555',
                    //fontSize: 15,
                },
                //@ts-ignore
                data: this.series(this.seriesData).filter(s => s.xAxisIndex == 1 && s.yAxisIndex == 1).map(s => s.name),
                selected: {
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
    }
    series(seriesData) {
        seriesData = seriesData || this.seriesData;
        return [
            this.lineSeries({
                name: 'Acumulado',
                data: seriesData.acumulado
            }),
            this.lineSeries({
                name: 'Incremento',
                data: seriesData.incremento
            }),
            this.lineSeries({
                name: 'Incremento Promedio',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: seriesData.incremento_promedio
            }),
            this.lineSeries({
                name: 'Acumulado Promedio',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: seriesData.acumulado_promedio
            }),
            /**
             * EJECUTADAS
             */
            this.lineSeries({
                name: 'Acumulado Ejecutadas',
                data: seriesData.acumulado_ejecutadas
            }),
            this.lineSeries({
                name: 'Incremento Ejecutadas',
                data: seriesData.incremento_ejecutadas
            }),
            this.lineSeries({
                name: 'Incremento Promedio Ejecutadas',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: seriesData.incremento_promedio_ejecutadas
            }),
            this.lineSeries({
                name: 'Acumulado Promedio Ejecutadas',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: seriesData.acumulado_promedio_ejecutadas
            }),
        ];
    }
    chartEventsHandler(chart) {
        const groups = {
            'Acumulado': ['Acumulado', 'Acumulado Promedio'],
            'Acumulado Promedio': ['Acumulado', 'Acumulado Promedio'],
            'Acumulado Ejecutadas': ['Acumulado Ejecutadas', 'Acumulado Promedio Ejecutadas'],
            'Acumulado Promedio Ejecutadas': ['Acumulado Ejecutadas', 'Acumulado Promedio Ejecutadas'],
            'Incremento': ['Incremento', 'Incremento Promedio'],
            'Incremento Promedio': ['Incremento', 'Incremento Promedio'],
            'Incremento Ejecutadas': ['Incremento Ejecutadas', 'Incremento Promedio Ejecutadas'],
            'Incremento Promedio Ejecutadas': ['Incremento Ejecutadas', 'Incremento Promedio Ejecutadas']
        };
        const initialized = {
            ...this.legend[0].selected,
            ...this.legend[1].selected,
        };
        const emitGroupedSelection = (params) => {
            chart.setOption({ animation: false });
            console.log(params.name, params.type);
            // Re-select what the user unselected
            chart.dispatchAction({
                type: params.type,
                name: params.name
            });
            chart.setOption({ animation: true });
        };
        const handleLegendEvent = (params) => {
            let changedSeries = params.name, 
            //if it hasn't been initialized, we always set it to active
            isSelected = params.selected[changedSeries], groupedSeries = groups[changedSeries], isInitialized = initialized[changedSeries];
            if (!isInitialized)
                isSelected = !isSelected;
            let eventType = (isSelected) ? 'legendSelect' : 'legendUnSelect';
            initialized[changedSeries] = { isSelected };
            if (!groupedSeries)
                groupedSeries = [changedSeries];
            console.log(eventType, groupedSeries);
            groupedSeries
                //.filter(s=>s!=changedSeries)
                .forEach(serie => emitGroupedSelection({
                name: serie,
                type: eventType
            }));
        };
        chart.on('legendselectchanged', (params) => {
            handleLegendEvent(params);
        });
    }
    chartOptions() {
        return {
            xAxis: this.xAxis,
            title: this.title,
            legend: this.legend,
            series: this.series(this.seriesData),
            chartEventsHandler: this.chartEventsHandler.bind(this),
        };
    }
}
//# sourceMappingURL=SolicitudesChartSeries.js.map