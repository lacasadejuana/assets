
export function bindConsole(className: string, classNameColor?: string): Console {
    if (!console.timerInfo) {
        Object.defineProperty(console, 'timerInfo', {
            get: function () {
                return Function.prototype.bind.call(
                    console.log,
                    console,
                    '%c' +
                    Number(performance.now() / 1000).toFixed(1) +
                    ' Timer:',
                    'color:#03C;font-weight:bold;'
                );
            },
        });
    }
    return {
        ...console,
        debug: console.debug.bind(console, `%c${className}:`, 'color:#A39;font-weight:bold;'),
        log: console.log.bind(console, `%c${className}:`, 'color:#090;font-weight:bold;'),
        info: console.info.bind(console, `%c${className}:`, classNameColor ?? 'color:#33C;font-weight:bold;'),
        warn: console.warn.bind(console, `%c${className}:`, 'color:orange;font-weight:bold;'),
        error: console.error.bind(console, `%c${className}:`, 'color:red;font-weight:bold;'),
        timerInfo: console.timerInfo.bind(console, `%c${className}:`, classNameColor ?? 'color:#33C;font-weight:bold;')
    };
}
