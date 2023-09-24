import { VInputType, VSearchType } from "@lacasadejuana/types";
export const dummyFilter = () => ({
    conector: "AND",
    campo_busqueda: ",negocio",
    id_input_type: VInputType.INPUT_TEXT,
    tipo_busqueda: VSearchType.IS_NOT_NULL,
    valor_busqueda: "",
    index: null,
    removed: false,
    disabled: false,
    parent_id: 0,
    slug_name: "",
    attr_type: "negocio",
    id: null
});
export function populateFilterForm() {
    return {
        filter: '',
        id: Date.now(),
        filtros: [
            {
                conector: "AND",
                tipo_busqueda: VSearchType.IS_NOT_NULL,
                campo_busqueda: "id_tipo_negocio",
                valor_busqueda: null
            }
        ],
        columnas_visibles: [
            79,
            122,
            140,
            67,
            131,
        ],
        rol: "",
        name: "",
        public: "on",
        personas: [],
        areas_subareas: [],
        personas_nice: {}
    };
}
//# sourceMappingURL=create_dummy_filter.js.map