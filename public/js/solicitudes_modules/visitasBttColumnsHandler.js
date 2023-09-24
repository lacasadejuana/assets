import { parseMySqlDate } from '../plugins/moment.bundle';
function dateSorter(a, b) {
    try {
        a = (parseMySqlDate(a).toISOString()) || '';
        b = (parseMySqlDate(b).toISOString()) || '';
    }
    catch (err) {
        console.warn(err, a, b);
    }
    return a.localeCompare(b);
}
export function createCustomSort(columns) {
    return (sortName, sortOrder, rows) => {
        const order = sortOrder === 'desc' ? -1 : 1;
        let { input_type = 'text', slug_name } = columns.find(c => c.field === sortName) || {};
        if (['tipo_negocio', 'tipo_propiedad', 'etapa_negocio'].includes(String(sortName))) {
            sortName = String(`id_${sortName}`);
            input_type = 'number';
        }
        return rows.sort(function (a, b) {
            let valA = String(a[sortName]), valB = String(b[sortName]);
            // console.log({ valA, valB, order, slug_name, input_type, sortName, sortOrder })
            if (input_type === 'number') {
                let numA = parseFloat(String(a[sortName] || '0').split(',')[0].replace(/[^\d]/g, '').replace(/\.(\d{3})/g, '$1')), numB = parseFloat(String(b[sortName] || '0').split(',')[0].replace(/[^\d]/g, '').replace(/\.(\d{3})/g, '$1'));
                //console.log({ input_type, numA, numB })
                return order * ((numA) - (numB));
            }
            if (input_type.includes('date')) {
                return order * dateSorter(valA, valB);
            }
            return order * valA.localeCompare(valB);
        });
    };
}
export function mapColumns(columns = []) {
    return (columns)
        //        .filter(campo => campo.field !== 'id')
        .map(campo => {
        if (campo.field === 'id') {
            let { field, ...rest } = campo;
            rest.checkbox = true;
            //rest.field = 'id'
            return rest;
        }
        if (campo.field === 'nombre') {
            campo.class += ' text-left   sticky left-0 z-100';
            campo.scope = 'row';
            //campo.cellStyle
        }
        if (campo.field === 'numero_orden') {
            campo.formatter = (value, row) => {
                return String(value).substring(0, 3) + ' ' + String(value).substring(3).padEnd(7, ' ');
            };
        }
        if (campo.width) {
            //@ts-ignore
            campo.width = Number(String(campo.width).replace(/[^\d]/g, ''));
        }
        /*if (campo.input_type === 'text') {

            campo
                .filterControl = 'input';
        }*/
        if (campo.input_type === 'number') {
            campo.sorter = 'numericOnly';
            //campo.filterControl = 'input';
            //ampo.searchable = true;
        }
        if (campo.input_type === 'text' && campo.searchable === undefined) {
            campo.filterControl = 'input';
            campo.searchable = true;
        }
        if (campo.input_type.includes('date')) {
            campo.sortable = true;
            //campo            .filterControl = 'datepicker';
            campo.sorter = dateSorter;
            //campo.formatter = (value, row) => `<span x-text="datos.${campo.field}"></span>`;
        }
        if (campo.input_type === 'select') {
            //campo.filterControl = 'select';
            //campo.searchFormatter = true;
        }
        //campo.class += ' bg-white';
        return campo;
    });
}
//# sourceMappingURL=visitasBttColumnsHandler.js.map