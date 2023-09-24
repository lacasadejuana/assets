import { getSeriesData } from '../sprData';
import { itemStyle } from './itemStyle';
export class NegociosChartSeries {
    constructor(dataStore) {
        this.dataset = [
            ['dias', 'activos', 'vendidos', 'restantes', 'descuento'],
        ];
        this.legendBottom = 10;
        this.legendHeight = 30;
        this.dataZoomHeight = 25;
        this.grid1Height = 140;
        this.dataStore = dataStore;
        this.seriesData = getSeriesData(this.dataStore.properties);
        this.dataset = this.seriesData.days.reduce((accum, day, index) => {
            let activos = this.seriesData.negocios[index], vendidos = this.seriesData.vendidos[index], descuento = this.seriesData.precio_cierre_vs_precio_publicacion[index];
            descuento = Number.isNaN(Number(descuento)) ? 0 : Number(descuento);
            accum.push([
                day,
                activos,
                vendidos,
                activos - vendidos,
                -1 * descuento,
            ]);
            return accum;
        }, this.dataset);
        console.table(this.dataset);
        globalThis.negocioChart = this;
    }
    get dataZoomBottom() {
        return 10 + this.legendBottom + this.legendHeight;
    }
    get grid1Bottom() {
        return this.dataZoomBottom + this.dataZoomHeight + 10;
    }
    lineSeries({ name, type, data, xAxisIndex, yAxisIndex, encode, }) {
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
                offset: [5, -10],
            }),
            data,
            encode,
        };
    }
    barStyle(position = 'top') {
        return {
            normal: {
                //  color: '#50adf0',
                opacity: 1,
                barBorderRadius: 0,
                label: {
                    show: true,
                    offset: [0, 5],
                    position
                },
            },
        };
    }
    get title() {
        return {
            text: 'Negocios Activos y Vendidos',
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
    get seriesInSecondGrid() {
        return this.series(this.seriesData).filter((s) => s.xAxisIndex == 1 && s.yAxisIndex == 1);
    }
    get xAxis() {
        let xAxis = [
            {
                name: 'dias',
                type: 'category',
                //    data: this.seriesData.days//.map(value => new Date(Date.now() + 86400 * value))
            },
        ];
        return xAxis;
    }
    get yAxis() {
        return [
            {
                // left: '10',
                type: 'value',
                //name: 'Valores',
                //     scale: true,
                splitArea: {
                    show: false,
                },
                min: -50,
                max: 'dataMax',
            },
            {
                // left: '10',
                type: 'value',
                //name: 'Valores',
                scale: true,
                splitArea: {
                    show: false,
                },
                min: -20,
                max: 75,
            },
        ];
    }
    get legend() {
        return [
            {
                right: 70,
                top: 50,
                width: 200,
                textStyle: {
                    color: '#555',
                    //fontSize: 15,
                },
                //@ts-ignore
                data: this.series(this.seriesData)
                    .filter((s) => s.xAxisIndex != 1 && s.name !== 'restantes')
                    .map((s) => s.name),
                selected: {
                    'Peso Relativo': false,
                },
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
            },
            {
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
                data: this.series(this.seriesData)
                    .filter((s) => s.xAxisIndex == 1 && s.yAxisIndex == 1 && (s.name && s.name != 'restantes'))
                    .map((s) => s.name),
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
            },
        ];
    }
    xseries(seriesData) {
        seriesData = seriesData || this.seriesData;
        return [
            {
                name: 'Precio Cierre vs Precio Publicación',
                type: 'bar',
                barGap: '30%',
                xAxisIndex: 1,
                yAxisIndex: 1,
                max: 100,
                data: seriesData.precio_cierre_vs_precio_publicacion.map((s) => -1 * s),
                width: 25,
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,
                        label: {
                            show: true,
                            offset: [0, 5],
                            // rotate: 90,
                            // position: 'inside',
                            //  color: '#fff',
                            //position: 'top',//'inside',
                            formatter(p) {
                                return -1 * p.value + '%';
                            },
                        },
                    },
                },
            },
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
                            offset: [0, 15],
                            rorate: 90,
                            color: '#fff',
                            position: 'inside',
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
                //                barGap: '-50%',
                xAxisIndex: 0,
                yAxisIndex: 0,
                //max: 100,
                //stack: 'negocios',
                itemStyle: this.barStyle(),
                data: seriesData.negocios,
            },
            {
                name: 'Vendidos',
                type: 'bar',
                //barGap: '-50%',
                //stack: 'negocios',
                xAxisIndex: 0,
                yAxisIndex: 0,
                //max: 100,
                itemStyle: this.barStyle(),
                data: seriesData.vendidos,
            },
        ];
    }
    series(seriesData) {
        return [
            {
                name: 'activos',
                type: 'bar',
                stack: 'descuento',
                itemStyle: this.barStyle(),
                encode: {
                    // Map the "amount" column to X axis.
                    x: 0,
                    // Map the "product" column to Y axis
                    y: 1,
                },
            },
            {
                name: 'restantes',
                type: 'bar',
                stack: 'negocios',
                color: 'transparent',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 0,
                    // Map the "product" column to Y axis
                    y: 3,
                },
            },
            {
                name: 'vendidos',
                type: 'bar',
                stack: 'negocios',
                itemStyle: { ...this.barStyle('bottom') },
                encode: {
                    // Map the "amount" column to X axis.
                    x: 0,
                    // Map the "product" column to Y axis
                    y: 2,
                },
            },
            {
                name: 'Descuento',
                type: 'bar',
                smooth: true,
                stack: 'descuento',
                yAxisIndex: 1,
                encode: {
                    // Map the "amount" column to X axis.
                    x: 0,
                    // Map the "product" column to Y axis
                    y: 4,
                },
            },
        ];
    }
    chartOptions() {
        return {
            dataset: { source: this.dataset },
            visualMap: this.visualMap,
            xAxis: this.xAxis,
            yAxis: this.yAxis,
            title: this.title,
            legend: this.legend,
            series: this.series(this.seriesData),
        };
    }
}
//# sourceMappingURL=NegociosChartSeries.js.map