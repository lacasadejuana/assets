import { v4 as uuidv4 } from 'uuid';
import { EnrichedFilter } from "../EnrichedFilter";
export function normalizeFiltros(filtros) {
    return filtros
        .map((condition, index) => {
        if (condition instanceof EnrichedFilter)
            return condition;
        condition.index = index;
        condition.disabled = !!condition.disabled;
        let [slug_name, attr_type] = condition.campo_busqueda.split(',');
        condition.slug_name = condition.slug_name || slug_name;
        condition.attr_type = condition.attr_type || attr_type;
        condition.valor_busqueda = Alpine.raw(condition.valor_busqueda || '');
        condition.id = uuidv4();
        if (index === 0)
            condition.conector = 'AND';
        return condition;
    })
        //.filter((f) => f.campo_busqueda && !f.disabled)
        .map((filtro) => (filtro instanceof EnrichedFilter ? filtro : new EnrichedFilter(filtro)));
}
export function printFilters(filters, fields = []) {
    //@ts-ignore
    console.table(filters.map((f) => {
        //@ts-ignore
        let { conector, 
        //@ts-ignore
        title, tipo_busqueda, campo_busqueda, 
        //@ts-ignore
        tipo, valor_busqueda, index, disabled, sortindex, id, } = f;
        valor_busqueda = valor_busqueda
            ? JSON.stringify(valor_busqueda)
            : valor_busqueda;
        let [slug_name, attr_type] = campo_busqueda.split(',');
        return {
            conector,
            slug_name,
            attr_type,
            title: title || campo_busqueda,
            tipo: tipo || tipo_busqueda,
            valor_busqueda,
            index,
            disabled,
            sortindex,
            id,
        };
    }), fields);
}
//# sourceMappingURL=normalizeFiltro.js.map