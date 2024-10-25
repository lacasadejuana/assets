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
	return fetch('https://microservices.juana.house/api/maps/publicaciones', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	})
}