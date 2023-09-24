export const computeFilterPayload = (currentFilterInstance) => {
    //console.info({ currentFilterInstance$el: currentFilterInstance.$el })
    //@ts-ignore
    const filtros = currentFilterInstance.enrichedFilters
        .filter(f => f.isValid)
        .map(f => f.payload);
    return {
        filtros,
        public: currentFilterInstance.public,
        name: currentFilterInstance.name,
        rol: currentFilterInstance.rol,
        columnas_visibles: Object.values(currentFilterInstance.columnas_visibles),
        columnas_actuales: currentFilterInstance.columnas_actuales,
        opt_group: currentFilterInstance.opt_group,
        areas_subareas: currentFilterInstance.areas_subareas
            ? Object.values(currentFilterInstance.areas_subareas)
            : [],
        personas: currentFilterInstance.rol
            ? Object.values(currentFilterInstance.personas)
            : [],
        id: currentFilterInstance.id,
    };
};
//# sourceMappingURL=computeFilterPayload.js.map