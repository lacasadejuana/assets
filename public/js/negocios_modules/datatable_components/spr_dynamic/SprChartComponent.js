import * as echarts from 'echarts';
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
export const SprChartComponent = (seriesDataOptions, options = {}) => {
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
        get seriesInSecondGrid() {
            return Array.isArray(this.seriesDataOptions.series) ? this.seriesDataOptions.series.filter(s => s.xAxisIndex == 1 && s.yAxisIndex == 1) : 0;
        },
        get grid() {
            let grid1Bottom = this.dataZoomBottom + this.dataZoomHeight + 10;
            let grids = [];
            if (this.seriesInSecondGrid.length > 0) {
                grids.push({
                    left: 35,
                    right: 35,
                    show: false,
                    //top: 310,
                    height: this.grid1Height,
                    bottom: grid1Bottom
                });
            }
            else {
                // grid1Bottom = 0;
                this.grid1Height = 0;
            }
            grids.unshift({
                show: false,
                left: 35,
                right: 35,
                borderWidth: 1,
                top: 35,
                bottom: grid1Bottom + 25 + this.grid1Height,
                /*textStyle: {
                    color: '#ccc',
                },*/
            });
            return grids;
        },
        seriesData: {},
        get chartOptions() {
            return {
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                toolbox: this.toolbox,
                axisPointer: this.axisPointer,
                tooltip: this.tooltip,
                grid: this.grid,
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
        init() {
            this.seriesDataOptions = seriesDataOptions;
            this.options = this.options || {};
            const chartContainer = this.$el;
            console.info('initChart', this.options);
            this.$el.chart = echarts.init(chartContainer);
            this.resetHeight();
            this.$el.chart.setOption({
                animate: true,
                ...this.chartOptions,
                ...this.seriesDataOptions,
                dataZoom: this.dataZoom(0)
            });
            globalThis.sprChartComponent = this;
            this.$nextTick(() => {
                this.$el.chart.setOption({
                    ...this.seriesDataOptions
                });
                this.resetHeight();
            });
            window.addEventListener('resize', () => {
                this.$el.chart.resize();
            });
            this.$watch('grid1Height', () => this.updateGrid());
            if (typeof this.seriesDataOptions.chartEventsHandler === 'function')
                this.seriesDataOptions.chartEventsHandler(this.$el.chart);
        },
        /**
         * Live events
         */
        updateGrid() {
            this.$el.chart.setOption({ grid: this.grid });
        },
        resized: false,
        resetHeight() {
            let chartContainer = this.$el;
            let chartParent = chartContainer.parentElement, rect = chartParent.getBoundingClientRect(), parentWidth = rect.width, parentTop = rect.top, height = window.innerHeight - (parentTop + 60), width = window.innerWidth - rect.left;
            chartContainer.style.width = width + 'px';
            chartContainer.style.height = height + 'px';
            chartContainer.style.inset = '0px';
            let size = { height, width };
            this.options.height = this.options.height ?? size.height;
            this.options.width = this.options.width ?? size.width;
            chartParent.style.height = this.options.height + 'px';
            this.$el.height = this.options.height + 'px';
            if (this.$el.chart)
                this.$el.chart.resize({ width: width - 20, height: height - 20 });
        },
    };
};
//# sourceMappingURL=SprChartComponent.js.map