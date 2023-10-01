// Respond to OPTIONS method
export const onRequestOptions: PagesFunction = async () => {
	return new Response(null, {
		status: 204,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Max-Age': '86400',
		},
	});
};





// Set CORS to all /api responses
export const onRequest: PagesFunction = async ({ next, waitUntil, request }) => {
	let cachedResponse = await caches.default.match(request)
	if (cachedResponse) return cachedResponse;

	let res = await fetch('https://microservices.juana.house/api/maps/publicaciones', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cf: {
			// Always cache this fetch regardless of content type
			// for a max of 5 seconds before revalidating the resource
			cacheTtl: 120,
			cacheEverything: true,
			//Enterprise only feature, see Cache API for other plans
		},
	})
	if (res.ok) {
		let newRes = new Response(res.body, res)
		newRes.headers.set('Cache-Control', 'public, max-age=300, must-revalidate');
		waitUntil(caches.default.put(request, newRes.clone()))
		return newRes
	}
	return res

}