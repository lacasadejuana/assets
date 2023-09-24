export const chartOption = {
    title: {
        text: 'Basic Graph'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            colorMappingBy: 'color',
            roam: true,
            label: {
                show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 20
            },
            data: [
                { name: 'ESTADO_PENDIENTE', color: 'gray', x: 300, y: 300 },
                { name: 'ESTADO_AGENDADA', x: 400, y: 200 },
                { name: 'ESTADO_EFECTUADA', x: 650, y: 200 },
                { name: 'ESTADO_CANCELADA', x: 750, y: 300 },
                { name: 'ESTADO_REAGENDADA', x: 600, y: 400 },
                { name: 'ESTADO_POSTERGADA', x: 450, y: 400 },
                { name: 'ESTADO_EFECTUADA_POR_VALIDAR', x: 525, y: 75 },
                { name: 'ESTADO_NO_CONTESTA', x: 525, y: 450 }
            ],
            // links: [],
            links: [
                {
                    source: 'ESTADO_PENDIENTE',
                    target: 'ESTADO_AGENDADA',
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {
                        width: 5,
                        curveness: 0.2
                    }
                },
                {
                    source: 'ESTADO_AGENDADA',
                    target: 'ESTADO_EFECTUADA',
                    label: {
                        show: true
                    },
                    lineStyle: {
                        curveness: 0.2
                    }
                },
                {
                    source: 'ESTADO_AGENDADA',
                    target: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    lineStyle: {
                        curveness: 0.2,
                        color: 'green'
                    }
                },
                {
                    source: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    target: 'ESTADO_EFECTUADA'
                },
                {
                    source: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    target: 'ESTADO_EFECTUADA'
                },
                {
                    source: 'ESTADO_AGENDADA',
                    target: 'ESTADO_CANCELADA'
                },
                {
                    source: 'ESTADO_PENDIENTE',
                    target: 'ESTADO_EFECTUADA'
                },
                {
                    source: 'ESTADO_PENDIENTE',
                    target: 'ESTADO_CANCELADA'
                },
                {
                    source: 'ESTADO_POSTERGADA',
                    target: 'ESTADO_CANCELADA'
                },
                {
                    source: 'ESTADO_POSTERGADA',
                    target: 'ESTADO_AGENDADA'
                },
                {
                    source: 'ESTADO_POSTERGADA',
                    target: 'ESTADO_REAGENDADA'
                },
                {
                    source: 'ESTADO_PENDIENTE',
                    target: 'ESTADO_POSTERGADA'
                },
                {
                    source: 'ESTADO_PENDIENTE',
                    target: 'ESTADO_NO_CONTESTA',
                    lineStyle: {
                        curveness: -0.4
                    }
                },
                {
                    source: 'ESTADO_NO_CONTESTA',
                    target: 'ESTADO_CANCELADA',
                    lineStyle: {
                        curveness: -0.4
                    }
                },
                {
                    source: 'ESTADO_PENDIENTE',
                    target: 'ESTADO_EFECTUADA_POR_VALIDAR',
                    lineStyle: {
                        curveness: 0.4
                    }
                }
            ],
            lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0
            }
        }
    ]
};
//# sourceMappingURL=markov_chart.js.map