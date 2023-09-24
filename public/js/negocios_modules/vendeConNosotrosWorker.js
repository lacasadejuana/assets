export default {
    async fetch(request, env) {
        return await handleRequest(request);
    }
};
async function handleRequest(request) {
    const url = new URL(request.url), type = url.searchParams.get('type') || '1';
    try {
        if (request.method.toUpperCase() === 'POST') {
            const modifiedRequest = new Request('https://negocios-dev.juana.house/vende_con_nosotros2', request);
            return fetch(modifiedRequest);
        }
        return fetch(`https://negocios-dev.juana.house/vende_con_nosotros2?type=${type}`);
    }
    catch (e) {
        console.error(e);
        return fetch(`https://negocios-dev.juana.house/vende_con_nosotros2?type=${type}`);
    }
}
//# sourceMappingURL=vendeConNosotrosWorker.js.map