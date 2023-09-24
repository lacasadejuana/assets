import TomSelect from 'tom-select';
import { commonTomSelectOptions } from './filtros_solicitudes';
export function initializeAnfitrionTomSelect($el, $store) {
    const $storeSolicitudes = $store.solicitudes;
    const anfitrionTomSettings = ({ items, options }) => {
        return {
            ...commonTomSelectOptions,
            options,
            items,
            searchField: ['name', 'email'],
            plugins: {
                remove_button: true,
                dropdown_header: {
                    html: function (data) {
                        return `<div class="dropdown-header">
                                    <div class="dropdown-header-title flex">
                                        <span class="dropdown-header-label flex-grow-1">Ejecutiv@</span>
                                        <small>Visitas Gestionadas</small>
                                    </div>
                                </div>`;
                    }
                }
            },
            render: {
                option: function (data) {
                    return `<div class="d-flex align-items-center"  role="option">
                    <span class="flex-grow-1">
                    ${data.name}
                    <span class="label block text-gray-500 fs-08rem">${data.email}</span>
                    </span>
                    <small class="btn btn-sm btn-light">${data.anfitrion}</small>
                    </div>`;
                }
            }
        };
    };
    const anfitrionTomSelect = new TomSelect(
    //@ts-ignore
    $el, anfitrionTomSettings({
        options: Object.values($storeSolicitudes.anfitriones),
        items: $storeSolicitudes.filtros.equipo
    }));
    anfitrionTomSelect.on('item_add', (value, item) => {
        console.info({ item_add: value });
        $storeSolicitudes.filtros.equipo = $storeSolicitudes.filtros.equipo || [];
        $storeSolicitudes.filtros.equipo.push(value);
    });
    anfitrionTomSelect.on('item_remove', (value, item) => {
        console.info({ item_remove: value });
        $storeSolicitudes.filtros.equipo = $storeSolicitudes.filtros.equipo || [];
        $storeSolicitudes.filtros.equipo = $storeSolicitudes.filtros.equipo.filter((v) => v !== value);
    });
    return anfitrionTomSelect;
}
//# sourceMappingURL=initializeAnfitrionTomSelect.js.map