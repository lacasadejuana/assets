//@ts-ignore
import { toExcel } from '../../plugins/to-excel';
export function exportXLSX() {
    //@ts-ignore
    Alpine.store('columnas_actuales').onReady().then(storeColumnasActuales => {
        const headers = storeColumnasActuales.columnDefs.map(c => {
            let input_type = c.input_type.toLowerCase(), header = {
                label: c.name,
                field: c.slug_name,
            };
            if (c.input_type === 'number') {
                //@ts-ignore
                //header.type = 'Number'
            }
            if (c.input_type === 'date' || c.input_type === 'datetime') {
                //@ts-ignore
                //header.type = 'Date'
            }
            return header;
        });
        //@ts-ignore
        const data = Alpine.store('negocios').properties.map(negocio => Object
            .fromEntries(headers.map(h => {
            let value = negocio.shown_value(h.field) ?? '';
            if (Array.isArray(value)) {
                value = value.filter(v => v).map(v => String(v || '')
                    .trim());
                if (!value.length) {
                    value = '';
                }
                else {
                    value = value.join(', ');
                }
            }
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            return [h.field, value];
        })));
        var content = toExcel.exportXLS(headers, data, {
            // @ts-ignore
            filename: Alpine.store('active_filter').name +
                ' ' +
                (new Date().toLocaleString('es-CL').replace(',', '').substr(0, 16)),
            extension: 'xlsx',
            company: 'La Casa de Juana SPA'
        });
    });
}
//# sourceMappingURL=exportXls.js.map