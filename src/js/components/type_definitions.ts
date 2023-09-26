




import { BootstrapTableOptions } from 'bootstrap-table';
declare global {
    interface jQueryFN<T extends HTMLElement> {
        daterangepicker(): JQuery<T>;
        bootstrapTable(options: BootstrapTableOptions): JQuery<T>;

        bootstrapTable(method: string, ...parameters: any[]): JQuery<T> | any;
    }
}


export enum AttrType {
    NegocioAttr = "negocio_attr",
    Propiedad = "propiedad",
    PropiedadAttr = "propiedad_attr",
    Negocio = "negocio",
    ContactoAttr = "contacto_asociado",
    Solicitud = "solicitud"
}

export enum FormComponent {
    DateInputComponent = "dateInputComponent",
    DatetimeInputComponent = "datetimeInputComponent",
    NumberInputComponent = "numberInputComponent",
    SelectInputComponent = "selectInputComponent",
    TextInputComponent = "textInputComponent"
}


export interface PropertyClass {
    id: number | string;
    name: string;
    opt_group?: string
}

export enum TipoNegocio {
    Arriendo = "arriendo",
    Todos = "todos",
    Venta = "venta"
}



interface TCalendar {
    month?: Date;
    calendar?: Array<Date[]>;
}

interface Locale {
    direction?: string;
    format?: string;
    separator?: string;
    applyLabel?: string;
    cancelLabel?: string;
    weekLabel?: string;
    customRangeLabel?: string;
    daysOfWeek?: string[];
    monthNames?: string[];
    firstDay?: number;
}

interface Ranges {
}


export interface IGenericMapping {
    id: number;
    name: string;
    extra_attributes?: unknown
}

export class GenericKeyValue {
    id: number;
    name: string;
    [s: string]: unknown;
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
}

export const bootstrapTableBaseOptions = {
    iconsPrefix: "fas",
    loadingFontSize: "24px",
    toolbar: '#above_toolbar',
    sortEmptylast: true,
    detailView: false,
    filterControl: true,
    searchTimeOut: 300,
    locale: 'es-CL' as unknown as BootstrapTableOptions['locale'],
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
} as Omit<BootstrapTableOptions, 'searchSelector'> & { pageList: (number | string)[], idTable?: string, resizable?: boolean, searchSelector?: string }

