import { staticFetchWrapper } from '../../components/decorators/staticFetchWrapper';
import { openToast } from '../../components/openToast';
export function patchFilter(payload, delay = 0) {
    const { id } = payload;
    let target_url = '/api/filtros/' + id ?? '';
    if (id) {
        payload._method = 'PUT';
    }
    payload.name = String(payload.name).trim();
    //@ts-ignore
    console.zinfo({ target_url, payload });
    return staticFetchWrapper(target_url, {
        method: 'put',
        body: JSON.stringify(payload),
    })
        .then(async (jsonRes) => {
        return jsonRes;
    }).catch(err => {
        openToast({
            type: 'error',
            text: err.message,
            from: 'patchFilter',
            delay: 4000
        });
        return Promise.reject(new Error(err));
    });
}
//# sourceMappingURL=patchFilter.js.map