import TomSelect from 'tom-select';
export function initNegociosTomSelect($el, $store) {
    const $storeSolicitudes = $store.solicitudes;
    const negocioTomSettings = {
        allowEmptyOption: true,
        valueField: 'id',
        labelField: 'name',
        searchField: ['name'],
        maxItems: 100,
        //@ts-ignore
        options: [...Object.values($storeSolicitudes.negocios)],
        items: $storeSolicitudes.filtros.id_negocio,
        plugins: {
            remove_button: true,
            dropdown_header: {
                html: function (data) {
                    return `<div class="dropdown-header">
                                <div class="dropdown-header-title flex">
                                    <span class="dropdown-header-label flex-grow-1">Negocio</span>
                                    <small>Solicitudes</small>
                                </div>
                            </div>`;
                }
            }
        },
        render: {
            option: function (data) {
                const div = document.createElement('div');
                div.className = 'd-flex align-items-center';
                const span = document.createElement('span');
                span.className = 'flex-grow-1';
                span.innerText = data.direccion;
                const propietario = document.createElement('small');
                propietario.className = 'block text-gray-500';
                propietario.innerHTML = data.propietario;
                span.append(propietario);
                div.append(span);
                const small = document.createElement('small');
                small.innerText = data.solicitudes;
                small.className = 'btn btn-sm btn-light';
                div.append(small);
                return div;
            }
        }
    };
    const negocioTomSelect = new TomSelect(
    //@ts-ignore
    $el, negocioTomSettings);
    negocioTomSelect.on('item_add', (value, item) => {
        console.info({ item_add: value });
        $storeSolicitudes.filtros.id_negocio = $storeSolicitudes.filtros.id_negocio || [];
        $storeSolicitudes.filtros.id_negocio.push(value);
    });
    negocioTomSelect.on('item_remove', (value, item) => {
        console.info({ item_remove: value });
        $storeSolicitudes.filtros.id_negocio = $storeSolicitudes.filtros.id_negocio || [];
        $storeSolicitudes.filtros.id_negocio = $storeSolicitudes.filtros.id_negocio.filter((v) => v !== value);
    });
    return negocioTomSelect;
}
//# sourceMappingURL=initNegociosTomSelect.js.map