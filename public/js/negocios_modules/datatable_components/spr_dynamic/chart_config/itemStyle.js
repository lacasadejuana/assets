export function itemStyle({ color, offset, opacity, labelPosition }) {
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
//# sourceMappingURL=itemStyle.js.map