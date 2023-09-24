export var AttrType;
(function (AttrType) {
    AttrType["NegocioAttr"] = "negocio_attr";
    AttrType["Propiedad"] = "propiedad";
    AttrType["PropiedadAttr"] = "propiedad_attr";
    AttrType["Negocio"] = "negocio";
    AttrType["ContactoAttr"] = "contacto_asociado";
    AttrType["Solicitud"] = "solicitud";
})(AttrType || (AttrType = {}));
export var FormComponent;
(function (FormComponent) {
    FormComponent["DateInputComponent"] = "dateInputComponent";
    FormComponent["DatetimeInputComponent"] = "datetimeInputComponent";
    FormComponent["NumberInputComponent"] = "numberInputComponent";
    FormComponent["SelectInputComponent"] = "selectInputComponent";
    FormComponent["TextInputComponent"] = "textInputComponent";
})(FormComponent || (FormComponent = {}));
export var TipoNegocio;
(function (TipoNegocio) {
    TipoNegocio["Arriendo"] = "arriendo";
    TipoNegocio["Todos"] = "todos";
    TipoNegocio["Venta"] = "venta";
})(TipoNegocio || (TipoNegocio = {}));
export class GenericKeyValue {
    toString() {
        return this.name;
    }
}
export const BttIcons = {
    paginationSwitchDown: "fa-caret-down-square",
    paginationSwitchUp: "fa-caret-up-square",
    refresh: "fa-redo",
    toggleOff: "fa-toggle-off",
    toggleOn: "fa-toggle-on",
    columns: "fa-list-ul",
    detailOpen: "fa-plus",
    detailClose: "fa-dash",
    fullscreen: "fa-expand",
    search: "fa-search",
    clearSearch: "fa-trash",
    export: "fa-download"
};
export const bootstrapTableBaseOptions = {
    iconsPrefix: "fas",
    loadingFontSize: "24px",
    toolbar: '#above_toolbar',
    sortEmptylast: true,
    detailView: false,
    filterControl: true,
    searchTimeOut: 300,
    locale: 'es-CL',
    idField: 'id',
    data: [],
    buttonsClass: 'primary',
    minimumCountColumns: 2,
    pageList: [10, 25, 50, 100, 'all'],
    pageSize: 50,
    pagination: true,
    searchAccentNeutralise: true,
    searchSelector: '#search_compact',
    selectItemName: 'id',
    showExport: true,
    showFullscreen: true,
    showPaginationSwitch: false,
    showToggle: true,
    showSearchClearButton: true,
    showColumnsSearch: true,
    searchHighlight: true,
    showButtonText: false,
    exportTypes: ['excel', 'pdf'],
    minWidth: 758,
    mobileResponsive: true,
    showColumns: true,
    showFooter: false,
    icons: BttIcons,
    toolbarAlign: 'left',
    paginationVAlign: 'top',
    paginationHAlign: 'right',
    paginationDetailHAlign: 'left'
};
//# sourceMappingURL=type_definitions.js.map