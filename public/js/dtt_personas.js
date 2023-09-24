import { createTipoBusquedaStore } from './filter_modules/stores/createTipoBusquedaStore';
import { impersonateControl } from './user_modules/impersonateControl';
globalThis.createTipoBusquedaStore = createTipoBusquedaStore;
globalThis.backendPaginator = globalThis.backendPaginator || { "has_take": true, "count": 50, "next_page_url": "https:\/\/negocioslocal.juana.house\/api\/negocios?from=1690235100", "first_page_url": "https:\/\/negocioslocal.juana.house\/api\/negocios?page=1", "last_page_url": "https:\/\/negocioslocal.juana.house\/api\/negocios?page=4", "current_page": 1, "from": 1, "last_page": 4, "max_id": "2023-08-14 16:38:56", "min_id": "2023-07-24 17:45:00", "path": "https:\/\/negocioslocal.juana.house\/api\/negocios", "per_page": 300, "prev_page_url": null, "query": { "id": 161, "name": "Nuevo filtro v20230815 18:38", "opt_group": "Otros", "limit": 300, "page": 1, "from": 1692201726, "offset": 0, "sortName": "negocios.id", "sortOrder": "desc", "cache": 300, "take": 50, "total": 1182 }, "request_id": "7c7d0755-99cf-4302-b96c-8c9b38a9dc1a", "current_filter_id": 161, "to": 51, "total": 1182, "links": [{ "url": null, "label": "« Anterior", "active": false }, { "url": "https:\/\/negocioslocal.juana.house\/api\/negocios?from=1690235100", "label": "« Siguiente", "active": false }], "data": [{ "nombre": "Felipe Diaz - Medinacelli 1250 N\/A", "id_etapa_negocio": 1, "id_tipo_negocio": 1, "id": 1738, "created_at": "2023-08-14 16:38:56", "id_propiedad": 1727, "codigo_interno": null, "id_mercado_libre": null, "id_tipo_propiedad": 1 }] };
//@ts-ignore
export const personasDatatableData = ({ collection, options }) => ({
    collection,
    options: {
        notSortable: ['acciones'],
        notSearchable: ['acciones'],
        notFilterable: ['acciones'],
        dropdowns: ['rol'],
        perPageOptions: [25, 50, 100, 200],
        perPage: 50,
        ...options,
        cellWidth(key) {
            switch (key) {
                case 'dominio':
                    return '140px';
                case 'email':
                    return '220px';
                case 'acciones':
                    return '120px';
                default:
                    return `200px`;
            }
        },
        notVisible: ['user_id', 'created_at', 'can_be_impersonated'],
        dates: ['created_at'],
        titleRenderer(key) {
            if (key == "id") {
                return `Acciones`;
            }
            // by default: return nothing
        },
        cellRenderer(key, cell, row) {
            console.info({ ...row });
            if (key === 'nombre_completo' || key === 'email') {
                return `<div class="email max-w-[205px] overflow-ellipsis overflow-hidden whitespace-nowrap">${cell.value}</div>`;
            }
            if (key == "acciones") {
                let id = cell.value, user_id = row.user_id && row.user_id.value, can_be_impersonated = (row.can_be_impersonated && row.can_be_impersonated.value) && globalThis.canImpersonate;
                if (user_id) {
                    console.log({ id, user_id, can_be_impersonated });
                }
                else {
                    console.info({ uder: row.user_id });
                }
                return [
                    `<a href="/persona/${id}/edit"  class="btn btn-primary  " title="Editar usuario"><i class="fa fa-edit"></i></a>`,
                    `<a href="/persona/${id}"  class="btn btn-secondary  mx-2" title="Ver perfil"><i class="fa fa-eye "></i></a>`,
                    can_be_impersonated ?
                        `<a href="/impersonate/take/${user_id}"  title="Representar a este usuario" class="btn btn-success "><i class="fa  fa-mask"></i></a>` :
                        ``
                ].join('');
            }
            return cell.value; // default
        }
    }
});
globalThis.personasDatatableData = personasDatatableData;
export default personasDatatableData;
globalThis.impersonateControl = impersonateControl;
//# sourceMappingURL=dtt_personas.js.map