import { staticFetchWrapper } from '../../components/decorators/staticFetchWrapper';
import { openToast } from '../../components/openToast';
import { tap, waitFor } from '../../components/plugins';
export function createAsNewFilter(payload, delay = 2000) {
    let negocios_filters_form = document.querySelector('#filtros_negocio_form');
    negocios_filters_form.addEventListener('submit', (e) => {
        console.zwarn('tried to submit filters form');
        return false;
    });
    let method_input = negocios_filters_form.querySelector('[name="_method"]'), tokenValue = negocios_filters_form.querySelector('[name="_token"]').value;
    if (method_input) {
        method_input.value = 'POST';
    }
    negocios_filters_form.action = '/filtros';
    negocios_filters_form.method = 'POST';
    payload._method = 'POST';
    payload.id = null;
    /*if (!new URL(location.href).pathname.startsWith(`/negocio`)) {
        let formurl = new URL(location.href);
    formurl.pathname = '/filtros';
        history.pushState({ method: 'POST' }, '', formurl);
    }*/
    return staticFetchWrapper('/api/filtros', {
        method: 'POST',
        body: JSON.stringify(payload),
    }).then(jsonRes => {
        return tap(jsonRes.filtro || jsonRes, async () => {
            await waitFor(delay);
            openToast({
                type: jsonRes.type || 'warning',
                text: jsonRes.message,
                description: 'Nuevo filtro por defecto es "' + payload.name + '"',
                from: 'createAsNewFilter',
                delay: 2000
            });
        });
    }).catch(err => {
        return tap({
            type: 'error',
            text: err.message,
            from: 'createAsNewFilter',
            delay: 4000
        }, openToast);
    });
}
//# sourceMappingURL=createAsNewFilter.js.map