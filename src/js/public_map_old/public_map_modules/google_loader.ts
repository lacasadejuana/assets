import { Loader, LoaderOptions } from '@googlemaps/js-api-loader';

export async function loadGoogle(opt: Partial<LoaderOptions> = {}) {
    if (globalThis.google)
        return globalThis.google;
    const loader = new Loader({
        apiKey: opt.apiKey || "AIzaSyBK6dIFJ8th5qFY4reiE745gW9vUYE88JY",
        version: opt.version || "beta",
        region: opt.region || 'CL',
        language: opt.language || 'es',
        mapId: opt.id || undefined,// '8f541b0e0f5f6c31',
        libraries: opt.libraries || ["places"]
    } as LoaderOptions);
    globalThis.google = await loader.load();

    console.log('LOADED');
    return globalThis.google;
}
