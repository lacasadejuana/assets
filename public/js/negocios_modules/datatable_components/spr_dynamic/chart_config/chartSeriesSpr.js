import * as echarts from 'echarts';
import { getSeriesData } from './sprData';
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
export const SprChartComponent = (dataStore, options = {}) => {
    return {
        legendBottom: 10,
        legendHeight: 30,
        get dataZoomBottom() {
            return 10 + this.legendBottom + this.legendHeight;
        },
        dataZoomHeight: 25,
        get grid1Bottom() {
            return this.dataZoomBottom + this.dataZoomHeight + 10;
        },
        grid1Height: 140,
        dataZoom(extent) {
            return ([
                {
                    show: true,
                    height: this.dataZoomHeight,
                    xAxisIndex: [0, 1],
                    bottom: this.dataZoomBottom,
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
        },
        itemSeries({ name, type, data, xAxisIndex, yAxisIndex }) {
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
        },
        get xAxis() {
            return [
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
                    data: this.seriesData.days //.map(value => new Date(Date.now() + 86400 * value))
                }
            ];
        },
        get yAxis() {
            return [
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
        },
        get toolbox() {
            return {
                right: 30,
                top: 50,
                show: true,
                orient: 'vertical',
                feature: {
                    saveAsImage: {
                        type: 'png'
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack']
                    },
                    dataZoom: {
                        show: true,
                    },
                    brush: {
                        type: ['lineX']
                    },
                    dataView: {
                        show: true,
                    },
                    restore: {
                        show: true,
                    }
                }
            };
        },
        get axisPointer() {
            return {
                link: [{ xAxisIndex: [0, 1] }],
                label: {
                    backgroundColor: '#777'
                }
            };
        },
        get tooltip() {
            return {
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
        },
        get grid() {
            let grid1Bottom = this.dataZoomBottom + this.dataZoomHeight + 10;
            return [{
                    show: false,
                    left: 35,
                    right: 35,
                    borderWidth: 1,
                    top: 35,
                    bottom: grid1Bottom + 60 + this.grid1Height,
                    /*textStyle: {
                        color: '#ccc',
                    },*/
                }, {
                    left: 35,
                    right: 35,
                    show: false,
                    //top: 310,
                    height: this.grid1Height,
                    bottom: grid1Bottom
                }];
        },
        get title() {
            return {
                text: 'Visitas por rango de fechas',
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
        },
        get legend() {
            return [{
                    right: 70,
                    top: 50,
                    width: 200,
                    textStyle: {
                        color: '#555',
                        //fontSize: 15,
                    },
                    data: this.series().filter(s => s.xAxisIndex != 1 && s.yAxisIndex != 1).map(s => s.name),
                    /*selected: {
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
                    },*/
                }, {
                    left: '10%',
                    right: 20,
                    bottom: this.legendBottom - 5,
                    height: this.legendHeight,
                    //align: 'center',
                    width: '100%',
                    textStyle: {
                        color: '#555',
                        //fontSize: 15,
                    },
                    data: this.series().filter(s => s.xAxisIndex == 1 && s.yAxisIndex == 1).map(s => s.name),
                    /*selected: {
                        'Activos': false,
    
                        'Acumulado Promedio Ejecutadas': false,
                        'Acumulado Promedio': false,
    
                        'Incremento Promedio Ejecutadas': true,
                        'Incremento Promedio': true,
    
                        //  'Departamentos': false,
                        // 'Arriendos': false,
                        // 'Casas': false,
                        // 'Ventas': false,
                    },*/
                }];
        },
        series(seriesData) {
            seriesData = seriesData || this.seriesData;
            return [
                this.itemSeries({
                    name: 'Acumulado',
                    data: seriesData.acumulado
                }),
                this.itemSeries({
                    name: 'Incremento',
                    data: seriesData.incremento
                }),
                this.itemSeries({
                    name: 'Incremento Promedio',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: seriesData.incremento_promedio
                }),
                this.itemSeries({
                    name: 'Acumulado Promedio',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: seriesData.acumulado_promedio
                }),
                {
                    ...this.itemSeries({
                        name: 'Precio Cierre vs Precio Publicación',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: seriesData.precio_cierre_vs_precio_publicacion
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
                this.itemSeries({
                    name: 'Acumulado Ejecutadas',
                    data: seriesData.acumulado_ejecutadas
                }),
                this.itemSeries({
                    name: 'Incremento Ejecutadas',
                    data: seriesData.incremento_ejecutadas
                }),
                this.itemSeries({
                    name: 'Incremento Promedio Ejecutadas',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: seriesData.incremento_promedio_ejecutadas
                }),
                this.itemSeries({
                    name: 'Acumulado Promedio Ejecutadas',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: seriesData.acumulado_promedio_ejecutadas
                }),
                {
                    name: 'Peso Relativo',
                    type: 'bar',
                    data: seriesData.peso_relativo,
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
                    itemStyle: this.barStyle(),
                    data: seriesData.negocios
                },
                {
                    name: 'Vendidos',
                    type: 'bar',
                    barGap: '-50%',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    max: 100,
                    itemStyle: this.barStyle(),
                    data: seriesData.vendidos
                }
            ];
        },
        seriesData: {},
        chartOptions(seriesData) {
            return {
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                toolbox: this.toolbox,
                axisPointer: this.axisPointer,
                tooltip: this.tooltip,
                grid: this.grid,
                title: this.title,
                legend: this.legend,
                series: this.series(seriesData),
            };
        },
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
        },
        dataStore,
        init() {
            this.seriesData = getSeriesData(this.dataStore.properties);
            this.options = this.options || {};
            const chartContainer = this.$el;
            let chartParent = chartContainer.parentElement, parentWidth = chartContainer.parentElement.getBoundingClientRect().width;
            chartContainer.style.width = parentWidth + 'px';
            let rect = chartParent.getBoundingClientRect(), size = { height: window.innerHeight - rect.top - 30, width: window.innerWidth - (rect.left + 40) };
            this.options.height = this.options.height ?? size.height;
            this.options.width = this.options.width ?? size.width;
            chartParent.style.height = this.options.height + 'px';
            console.info('initChart', this.options);
            this.$el.chart = echarts.init(chartContainer, { width: this.options.width - 80 });
            this.$el.chart.setOption({
                ...this.chartOptions(this.seriesData),
                dataZoom: this.dataZoom(0)
            });
            globalThis.sprChartComponent = this;
            this.$nextTick(() => this.resetHeight());
            window.addEventListener('resize', () => {
                this.$el.chart.resize();
            });
            this.$watch('grid1Height', () => this.updateGrid());
        },
        updateGrid() {
            this.$el.chart.setOption({ grid: this.grid });
        },
        emitGroupedSelection(params) {
            this.$el.chart.setOption({ animation: false });
            console.log(params.name, params.type);
            // Re-select what the user unselected
            this.$el.chart.dispatchAction({
                type: params.type,
                name: params.name
            });
            this.$el.chart.setOption({ animation: true });
        },
        resized: false,
        resetHeight() {
            this.rect = this.$el.getBoundingClientRect();
            this.size = { height: window.innerHeight - this.rect.top - 30, width: window.innerWidth - this.rect.left };
            this.$el.style.height = this.size.height + 'px';
            this.$el.style.width = this.size.width + 'px';
            document.getElementById('spr_tabs_content').parentElement.style.height = this.size.height + 'px';
            this.$el.chart.resize(this.size);
        },
        handleLegendEvent(params) {
            let changedSeries = params.name, 
            //if it hasn't been initialized, we always set it to active
            isSelected = params.selected[changedSeries], groupedSeries = this.groups[changedSeries], initialized = this.initialized[changedSeries];
            if (!initialized)
                isSelected = !isSelected;
            let eventType = (isSelected) ? 'legendSelect' : 'legendUnSelect';
            console.log({ eventType, isSelected, changedSeries, currentlySelected: initialized?.isSelected });
            this.initialized[changedSeries] = { isSelected };
            if (!groupedSeries)
                groupedSeries = [changedSeries];
            console.log(eventType, groupedSeries);
            groupedSeries
                //.filter(s=>s!=changedSeries)
                .forEach(serie => this.emitGroupedSelection({
                name: serie,
                type: eventType
            }));
        }
    };
};
//# sourceMappingURL=chartSeriesSpr.js.map