import { EnrichedFilter } from '../EnrichedFilter';
export function enrichFilters(filtros) {
    return filtros
        .map((filtro, index) => enrichFilter(filtro));
}
export function enrichFilter(filtro, index) {
    return filtro instanceof EnrichedFilter ? filtro : new EnrichedFilter(filtro);
}
//# sourceMappingURL=enrichFilter.js.map