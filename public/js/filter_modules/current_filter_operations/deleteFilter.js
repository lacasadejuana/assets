import { openToast } from '../../components/openToast';
import { tap } from '../../components/plugins';
export function deleteFilter(payload, delay = 0) {
    let negocios_filters_form = document.querySelector('#filtros_negocio_form');
    let method_input = negocios_filters_form.querySelector('[name="_method"]'), tokenValue = negocios_filters_form.querySelector('[name="_token"]').value;
    payload._method = 'DELETE';
    return fetch('/api/filtros/' + payload.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': tokenValue,
            'expect': 'application/json',
            'accept': 'application/json'
        },
        body: null
    }).then(async (res) => {
        if (method_input)
            method_input.value = 'PATCH';
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const jsonRes = await res.json();
        return tap(jsonRes.filtro || jsonRes, async () => {
            openToast({
                type: jsonRes.type || 'warning',
                text: jsonRes.message,
                from: 'deleteFilter',
                delay: 2000
            });
        });
    }).catch(err => {
        return tap({
            type: 'error',
            text: err.message,
            from: 'deleteFilter',
            delay: 4000
        }, openToast);
    });
}
//# sourceMappingURL=deleteFilter.js.map