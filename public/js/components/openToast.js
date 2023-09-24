import Alpine from 'alpinejs';
function openToastRaw(options = {}) {
    if (typeof options === 'string') {
        let textmsg = options;
        options = {
            type: 'info',
            text: textmsg,
            delay: 2000,
            from: null,
            description: '',
            callback: () => { }
        };
    }
    let { type = 'info', text = 'Solicitud guardada exitosamente', delay = 2000, from = null, description = '', callback = () => { } } = options;
    if (from)
        console.info('openToast called from ' + from);
    globalThis.dispatchEvent(new CustomEvent('notice', {
        detail: {
            type,
            title: text,
            description,
            delay
        }
    }));
    if (callback) {
        setTimeout(callback, delay);
    }
}
export const openToast = Alpine.debounce(openToastRaw, 400);
globalThis.openToast = openToast;
//# sourceMappingURL=openToast.js.map