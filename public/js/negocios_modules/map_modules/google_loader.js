import { Loader } from '@googlemaps/js-api-loader';
export async function loadGoogle(opt = {}) {
    if (globalThis.google)
        return globalThis.google;
    const loader = new Loader({
        apiKey: opt.apiKey || "AIzaSyBK6dIFJ8th5qFY4reiE745gW9vUYE88JY",
        version: opt.version || "beta",
        region: opt.region || 'CL',
        language: opt.language || 'es',
        mapId: opt.id || undefined,
        libraries: opt.libraries || ["places"]
    });
    globalThis.google = await loader.load();
    console.log('LOADED');
    return globalThis.google;
}
//# sourceMappingURL=google_loader.js.map