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
export const onRequest: PagesFunction = async ({ next }) => {
	const response = await next();
	//response.headers.set('Link', '</js/public_map.js>; rel=preload; as=script');
	//	response.headers.append('link', '</api/negocios>; rel="preload"; as="fetch"');

	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.delete('X-Frame-Options');
	response.headers.set('Access-Control-Max-Age', '86400');
	return response;
};