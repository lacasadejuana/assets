import { Workbox } from 'workbox-window';
import { debouncedPatchNegocio, patchNegocio, staticFetchWrapper, updateField } from '../components/decorators/staticFetchWrapper';
if (!console.marquee) {
    Object.defineProperty(console, 'marquee', {
        get: function () {
            return (obj, ...args) => {
                let colors = Object.values(obj), payload = [''].concat(Object.keys(obj));
                console.log(payload.join('%c '), ...colors, ...args);
            };
        },
    });
}
const auxStore = {};
Object.defineProperty(globalThis, '$auxStore', {
    enumerable: true,
    get() {
        return auxStore;
    }
});
if (!console.timerInfo) {
    Object.defineProperty(console, 'timerInfo', {
        get: function () {
            return Function.prototype.bind.call(console.debug, console, '%c' +
                Number(performance.now() / 1000).toFixed(2) +
                ' Timer:', 'color:#03C;font-weight:bold;');
        },
    });
}
if ("serviceWorker" in navigator) {
    const wb = new Workbox('/sw.js');
    wb.register();
    wb.messageSW({ type: 'GET_VERSION' }).then(swVersion => {
        console.timerInfo('Service Worker version:', swVersion);
    });
}
globalThis.staticFetchWrapper = staticFetchWrapper;
globalThis.updateField = updateField;
globalThis.patchNegocio = patchNegocio;
globalThis.debouncedPatchNegocio = debouncedPatchNegocio;
globalThis.camposBusquedaPromise = staticFetchWrapper('/api/negocios/get_campos', {}).then(res => {
    globalThis.camposBusquedaJson = res;
    console.timerInfo('received camposBusquedaPromise result from sw');
    return globalThis.camposBusquedaJson;
});
globalThis.anfitrioneYSolicitantesPromise = Promise.resolve({ anfitriones: [], solicitantes: [], negocios: [] });
globalThis.activeFilterPromise = staticFetchWrapper('/api/filtros/current_filter', {}).then(res => {
    globalThis.activeFilterJson = res;
    console.timerInfo('received activeFilterPromise result from sw');
    return globalThis.activeFilterJson;
});
globalThis.defaultFieldsPromise = staticFetchWrapper('/api/filtros/get_default_fields', {}).then(res => {
    globalThis.defaultFieldsJson = res;
    console.timerInfo('received defaultFieldsPromise result from sw');
    return globalThis.defaultFieldsJson;
});
globalThis.availableFiltersPromise = staticFetchWrapper('/api/filtros/get_available_filters', {}).then(res => {
    globalThis.availableFiltersJson = res;
    console.timerInfo('received availableFiltersPromise result from sw');
    return globalThis.availableFiltersJson;
});
/*globalThis.columnasVisiblesPromise = staticFetchWrapper<{ data: NegocioColumn[] }>(
    '/api/filtros/columnas_visibles', {}).then(res => {
        globalThis.columnasVisiblesJson = res.data || res;
        console.timerInfo('received columnasVisiblesPromise result from sw');
        return globalThis.columnasVisiblesJson;
    })*/
//# sourceMappingURL=load_sw_default.js.map