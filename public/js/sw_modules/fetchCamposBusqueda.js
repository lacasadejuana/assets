import { json } from 'itty-router';
import { fetchAndCache, responseToJson } from './fetchAndCache';
export const fetchCamposBusqueda = async (fetchEvent) => {
    let request = fetchEvent.request;
    let cache = await caches.open('cache');
    let url = new URL(request.url);
    var hasQuery = fetchEvent.request.url.indexOf('?') != -1;
    const cachedResponse = await cache.match(request, {
        ignoreSearch: hasQuery,
    });
    //if (cachedResponse && cachedResponse.ok) return cachedResponse
    let [campos, lightList, comunas] = await Promise.all([
        responseToJson(fetchAndCache(fetchEvent, '/api/negocios/get_campos')),
        responseToJson(fetchAndCache(fetchEvent, '/api/negocios/light_list')),
        responseToJson(fetchAndCache(fetchEvent, '/api/maps/comunas'))
    ]);
    //@ts-ignore
    let { fechaCreacion } = campos;
    //@ts-ignore
    campos.fechaCreacion = {
        ...fechaCreacion,
        slug_name: 'created_at',
        name: 'created_at',
        dot_property: 'created_at',
    };
    //@ts-ignore
    campos.created_at = {
        ...fechaCreacion,
        slug_name: 'created_at',
        name: 'created_at',
        dot_property: 'created_at',
    };
    //@ts-ignore
    campos.comuna.properties = comunas.map(comuna => {
        return {
            ...comuna,
            id: comuna.nombre_comuna,
            value: comuna.nombre_comuna,
            label: comuna.nombre_comuna,
            name: comuna.nombre_comuna
        };
    });
    //@ts-ignore
    campos.codigo_interno.properties = (Object.values(lightList)).filter(option => option.codigo_interno && String(option.codigo_interno).length === 6).map(option => {
        return {
            id: option.codigo_interno,
            value: option.codigo_interno,
            label: `${option.codigo_interno}|${option.nombre}`,
            name: `${option.codigo_interno}|${option.nombre}`
        };
    });
    //@ts-ignore
    campos.id.properties = (Object.values(lightList)).filter(option => option.id).map(option => {
        return {
            value: option.id,
            name: `#${option.id}|${option.nombre}`
        };
    });
    const finalResponse = json(campos);
    fetchEvent.waitUntil(cache.put(fetchEvent.request, finalResponse.clone()));
    return finalResponse;
};
//# sourceMappingURL=fetchCamposBusqueda.js.map