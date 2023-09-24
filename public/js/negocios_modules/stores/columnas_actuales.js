//ColumnaVisible
import { normalizeColumnDef } from '../decorators/normalizeColumnDefs';
export function populateColumnDefs(columnas_array, columnas_default) {
    let id = columnas_default.find(c => c.slug_name === 'id'), default_sin_id = columnas_default.filter(c => c.slug_name !== 'id');
    return columnas_default.concat(columnas_array) //.concat([id])
        .map((columna, index) => normalizeColumnDef(columna, index));
}
//# sourceMappingURL=columnas_actuales.js.map