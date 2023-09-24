import TomSelect from 'tom-select';
import { commonTomSelectOptions } from './filtros_solicitudes';
export function initializeSolicitanteTomSelect($el, $store) {
    const $storeSolicitudes = $store.solicitudes;
    const solicitanteTomSettings = ({ items, options }) => {
        return {
            ...commonTomSelectOptions,
            options,
            searchField: ['name', 'email'],
            plugins: {
                remove_button: true,
                dropdown_header: {
                    html: function (data) {
                        return `<div class="dropdown-header">
                                    <div class="dropdown-header-title flex">
                                        <span class="dropdown-header-label flex-grow-1">Persona</span>
                                        <small>Visitas Solicitadas</small>
                                    </div>
                                </div>`;
                    }
                }
            },
            items,
            render: {
                option: function (data) {
                    return `<div class="d-flex align-items-center"  role="option">
                    <span class="flex-grow-1">
                    ${data.name}
                    <span class="label block text-gray-500 fs-08rem">${data.email}</span>
                    </span>
                    <small class="btn btn-sm btn-light">${data.solicitante}</small>
                    </div>`;
                }
            }
        };
    };
    //@ts-ignore
    const solicitanteTomSelect = new TomSelect($el, solicitanteTomSettings({
        items: $storeSolicitudes.filtros.personas,
        options: Object.values($storeSolicitudes.solicitantes)
    }));
    solicitanteTomSelect.on('item_add', (value, item) => {
        console.info({ item_add: value });
        $storeSolicitudes.filtros.personas = $storeSolicitudes.filtros.personas || [];
        $storeSolicitudes.filtros.personas.push(value);
    });
    solicitanteTomSelect.on('item_remove', (value, item) => {
        console.info({ item_remove: value });
        $storeSolicitudes.filtros.personas = $storeSolicitudes.filtros.personas || [];
        $storeSolicitudes.filtros.personas = $storeSolicitudes.filtros.personas.filter((v) => v !== value);
    });
    return solicitanteTomSelect;
}
//# sourceMappingURL=initializeSolicitanteTomSelect.js.map