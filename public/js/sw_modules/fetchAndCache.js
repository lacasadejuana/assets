import { ONE_HOUR, ONE_MINUTE } from '../sw';
/**
 * Receives a fetchEvent and an arbitrary pathname. Using the target pathname,
 * a new request is created and used to match against the cache (in which case
 * the cached response is returned) or fetch fresh info from the backend (in which
 * case the info if cached in a background task using fetchEvent.waitUntil).
 *
 * In either case the return value is the JSON response from <pathName>.
 * (the original request is discarded. FetchEvent is used just to store the fresh response)
 *
 * @param fetchEvent
 * @param pathName
 * @returns Response
 */
export const fetchAndCache = async (fetchEvent, pathName) => {
    let cache = await caches.open('cache');
    let url = new URL(fetchEvent.request.url);
    if (pathName) {
        url.pathname = pathName;
    }
    var hasQuery = fetchEvent.request.url.indexOf('?') != -1;
    const newRequest = new Request(url.toString(), { headers: { 'accept': 'application/json' } });
    const cachedResponse = await cache.match(newRequest, {
        ignoreSearch: hasQuery,
    });
    if (cachedResponse && cachedResponse.ok) {
        console.timerInfo(`response to ${url.pathname} was already in cache`);
        let lastModified = cachedResponse.headers.get('date') || cachedResponse.headers.get('last-modified');
        // If cached response is close to expiry, fire an update request AFTER returning the cached response
        if ((lastModified && (new Date(lastModified).getTime() + ONE_HOUR) < (Date.now() + ONE_MINUTE)) || !lastModified) {
            fetchEvent.waitUntil(fetch(newRequest).then(response => {
                if (response.ok) {
                    //@ts-ignore
                    console.timerInfo('updating cache for ' + newRequest.url, Object.fromEntries(cachedResponse.headers));
                    cache.put(newRequest, response.clone());
                }
            }));
        }
        return cachedResponse;
    }
    let freshResponse = await fetch(newRequest);
    if (freshResponse.ok) {
        fetchEvent.waitUntil(cache.put(newRequest, freshResponse.clone()));
        console.info('stored' + newRequest.url + ' in cache');
    }
    return freshResponse;
};
/**
 * Receives a response or a promise of a response
 * Returns the json contents of the response
 * @param response
 * @returns
 */
export async function responseToJson(response) {
    return await (await response).json();
}
//# sourceMappingURL=fetchAndCache.js.map