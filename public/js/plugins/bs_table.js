/// <reference types="jquery" />
//@ts-ignore
const $ = globalThis.jQuery;
//@ts-ignore
const jQuery = globalThis.jQuery;
//@ts-ignore
if (!window)
    window = globalThis;
import './natural-sorting';
//@ts-ignore
import BootstrapTable from './bootstrap-table.js';
//import 'bootstrap-table/src/themes/bootstrap-table/bootstrap-table'
//import 'bootstrap-table/src/extensions/editable/bootstrap-table-editable'
import 'bootstrap-table/src/extensions/export/bootstrap-table-export';
import 'bootstrap-table/src/extensions/mobile/bootstrap-table-mobile';
//import 'bootstrap-table/src/extensions/reorder-columns/bootstrap-table-reorder-columns';
import 'bootstrap-table/src/extensions/i18n-enhance/bootstrap-table-i18n-enhance';
//import 'bootstrap-table/src/extensions/pipeline/bootstrap-table-pipeline';
import 'bootstrap-table/src/extensions/sticky-header/bootstrap-table-sticky-header';
import 'bootstrap-table/src/extensions/toolbar/bootstrap-table-toolbar';
import 'bootstrap-table/src/extensions/cookie/bootstrap-table-cookie';
//import 'bootstrap-table/src/extensions/editable/bootstrap-table-editable';
import 'bootstrap-table/src/extensions/fixed-columns/bootstrap-table-fixed-columns';
//import 'bootstrap-table/src/extensions/fixed-columns/bootstrap-table-resizable'
import 'bootstrap-table/src/extensions/addrbar/bootstrap-table-addrbar';
import 'bootstrap-table/src/extensions/pipeline/bootstrap-table-pipeline';
import 'bootstrap-table/src/locale/bootstrap-table-es-CL';
//import 'bootstrap-table/src/extensions/filter-control/bootstrap-table-filter-control';
//import 'bootstrap-table/src/extensions/defer-url/bootstrap-table-defer-url';
//import 'bootstrap-table/src/extensions/resizable/bootstrap-table-resizable';
$.fn.bootstrapTable.locales['es-CL'].formatRecordsPerPage = (pageNumber) => {
    return `${pageNumber} <span>por página</span>`;
};
$.fn.bootstrapTable.locales['es-CL'].formatShowingRows = (pageFrom, pageTo, totalRows, totalNotFiltered) => {
    return `Filas ${pageFrom} a ${pageTo} de ${totalRows}`;
};
export { BootstrapTable };
export default BootstrapTable;
//# sourceMappingURL=bs_table.js.map