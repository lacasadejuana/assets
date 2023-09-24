importScripts("/js/vendor/workbox/workbox-sw.js");
import { Router } from 'itty-router';
import { logger } from 'workbox-core/_private/logger';
import { matchPrecache, precache } from 'workbox-precaching';
import { fetchAndCache } from './sw_modules/fetchAndCache';
import { fetchCamposBusqueda } from './sw_modules/fetchCamposBusqueda';
//@ts-ignore
let wb = workbox;
//@ts-ignore
wb.setConfig({
    modulePathPrefix: "/js/vendor/workbox",
    debug: true,
});
if (!console.timerInfo) {
    Object.defineProperty(console, 'timerInfo', {
        get: function () {
            return Function.prototype.bind.call(console.debug, console, '%c' +
                Number(performance.now() / 1000).toFixed(1) +
                ' sw:', 'color:#10A050;font-weight:bold;');
        },
    });
}
console.zinfo = console.info.bind(console, `%c$sw:`, 'color:#33C;font-weight:bold;');
//@ts-ignore
const SW_VERSION = __SW_VERSION;
//@ts-ignore
console.sw = console.log.bind(console, `%csw:`, 'color:#05A;font-weight:bold;');
export const ONE_HOUR = 1000 * 60 * 60;
export const ONE_MINUTE = 1000 * 60;
//@ts-ignore
//@ts-ignore
precache(self.__WB_MANIFEST);
const usePrecache = async (fetchEvent) => {
    return matchPrecache(fetchEvent.request);
};
const requestHandler = async (fetchEvent) => {
    let request = fetchEvent.request;
    if (/^\/js\/(main|app|guest|load_sw)\.js/.test(request.url)) {
        return false;
    }
    if (/^\/api\/(lfm)/.test(request.url)) {
        return false;
    }
    //@ts-ignore
    const router = Router()
        //@ts-ignore
        .withPArams()
        .get('/api/negocios/get_campos', async (req) => fetchAndCache(fetchEvent))
        .get('/api/filtros/get_default_fields', async (req) => cacheFirst(fetchEvent))
        .get('/api/maps/comunas', async (req) => cacheFirst(fetchEvent))
        .get('/api/filtros/columnas_visibles', async (req) => fetch(req))
        .get('/api/filtros/current_filter', async (req) => fetch(request))
        .get('/api/solicitudes_visita/anfitriones_y_solicitantes', req => cacheFirst(fetchEvent, ONE_HOUR / 2))
        //.get('/api/filtros/get_available_filters', async (req) => cacheFirst(fetchEvent, 2 * ONE_MINUTE))
        .post('/api/filtros', async (req) => fetch(fetchEvent.request))
        .all('/filtros/:id/clone', async (req) => fetch(fetchEvent.request))
        .put('/api/filtros/*', async (req) => fetch(fetchEvent.request))
        .delete('/api/filtros/*', async (req) => fetch(fetchEvent.request))
        /**
         * Delete cached filters after creating a new filter,
         * cloning a filter or updating an existing one
        */
        .get('/api/filtros/get_available_filters', async (req) => availableFiltersHandler(fetchEvent, false))
        //.post('/api/filtros', async (req) => fetchAndBustCache(fetchEvent))
        //.all('/filtros/:id/clone', async (req) => fetchAndBustCache(fetchEvent))
        //.put('/api/filtros/*', async (req) => fetchAndBustCache(fetchEvent))
        //        .delete('/api/filtros/*', async (req) => fetchAndBustCache(fetchEvent))
        .get('/api/negocios/light_list', async (req) => fetchAndCache(fetchEvent, '/api/negocios/light_list'))
        .get('/negocio/campos', async (req) => fetchCamposBusqueda(fetchEvent))
        .get('/js/vendor/*', async (req) => usePrecache(fetchEvent))
        .get('/css/vendor/*', async (req) => usePrecache(fetchEvent))
        .get('/fonts/*', async (req) => usePrecache(fetchEvent))
        .all('*', async (req) => {
        const response = await fetchEvent.preloadResponse;
        if (response)
            return response;
        // Else try the network.
        return fetch(fetchEvent.request);
    });
    return router
        .handle(request);
};
addEventListener("fetch", (event) => {
    event.respondWith(requestHandler(event));
});
self.addEventListener("fetch2", (event) => {
    let fetchEvent = event;
    //@ts-ignore
    fetchEvent.respondWith(requestHandler(fetchEvent));
});
self.addEventListener("activate", (event) => {
    console.timerInfo('activating service worker');
    logger.debug('activating');
    event.waitUntil((async () => {
        //@ts-ignore
        if (self.registration.navigationPreload) {
            // Enable navigation preloads!
            //@ts-ignore
            await self.registration.navigationPreload.enable();
        }
    })());
    //@ts-ignore
    event.waitUntil(clients.claim());
});
self.addEventListener('message', (event) => {
    if (event.data.type === 'GET_VERSION') {
        console.timerInfo(`Version ${SW_VERSION} received message from client`, event.data);
        event.ports[0].postMessage(SW_VERSION);
    }
    else {
        console.timerInfo(`received message from client`, event.data);
    }
});
self.addEventListener("install", (event) => {
    // The promise that skipWaiting() returns can be safely ignored.
    //@ts-ignore
    self.skipWaiting();
    // Perform any other actions required for your
    // service worker to install, potentially inside
    // of event.waitUntil();
});
const cacheFirst = async (fetchEvent, ttl = ONE_HOUR) => {
    let request = fetchEvent.request;
    let cache = await caches.open('cache');
    let url = new URL(request.url);
    var hasQuery = fetchEvent.request.url.indexOf('?') != -1;
    const responseFromCache = await caches.match(request, {
        ignoreSearch: hasQuery,
    });
    if (responseFromCache && responseFromCache.ok) {
        //@ts-ignore
        console.timerInfo(`response to ${url.pathname} was already in cache`);
        let lastModified = responseFromCache.headers.get('date') || responseFromCache.headers.get('last-modified');
        // If ttl expire in less than one minute, refresh the cache
        if (lastModified && (new Date(lastModified).getTime() + ttl) > (Date.now() + ONE_MINUTE)) {
            return responseFromCache;
        }
    }
    let response = await fetch(request);
    if (response.ok) {
        fetchEvent.waitUntil(cache.put(request, response.clone()));
        console.info('stored' + request.url + ' in cache');
    }
    return response;
};
const AVAILABLE_FILTERS_ENDPOINT = '/api/filtros/get_available_filters';
async function fetchAndBustCache(fetchEvent) {
    fetchEvent.waitUntil(caches.delete(AVAILABLE_FILTERS_ENDPOINT));
    return fetch(fetchEvent.request);
}
const availableFiltersHandler = async (fetchEvent, force = false) => {
    let request = fetchEvent.request;
    let cacheControl = request.headers.get('cache-control'), skipCache = cacheControl && cacheControl.includes('no-cache');
    let cache = await caches.open('cache');
    var hasQuery = fetchEvent.request.url.indexOf('?') != -1;
    let url = new URL(request.url);
    url.pathname = AVAILABLE_FILTERS_ENDPOINT;
    //@ts-ignore
    let headers = Object.fromEntries(request.headers);
    headers.accept = 'application/json';
    headers['sec-fetch-dest'] = 'empty';
    headers['sec-fetch-mode'] = 'cors';
    headers['sec-fetch-site'] = 'same-origin';
    request = new Request(url.toString(), { headers });
    const responseFromCache = await caches.match(AVAILABLE_FILTERS_ENDPOINT, {
        ignoreSearch: hasQuery,
    });
    if (responseFromCache && responseFromCache.ok && !force && !skipCache) {
        //@ts-ignore
        console.timerInfo(`response to ${url.pathname} was already in cache`);
        let lastModified = responseFromCache.headers.get('date') || responseFromCache.headers.get('last-modified');
        // If ttl expire in less than one minute, refresh the cache
        if (lastModified && (new Date(lastModified).getTime() + 4 * ONE_MINUTE) > (Date.now() + ONE_MINUTE)) {
            return responseFromCache;
        }
    }
    console.timerInfo(`response to ${url.pathname} was not in cache`, { force, skipCache, ok: (responseFromCache || {}).ok });
    let response = await fetch(request);
    if (response.ok) {
        console.timerInfo(`storing fresh response to ${url.pathname}`);
        let newResponse = new Response(response.body, response);
        // newResponse.headers.set('cache-control', 'max-age=360')
        fetchEvent.waitUntil(cache.put(AVAILABLE_FILTERS_ENDPOINT, newResponse.clone()));
        return newResponse;
    }
    return response;
};
//# sourceMappingURL=sw.js.map