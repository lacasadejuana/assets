export { mapComponents } from './map_modules';
export * from './datatable_components';
export * from './datatable_input_components';
export * from './decorators';
export * from './editNegocioFilterInputs';
export * from './entities';
export * from './map_modules';
export * from './negocio_edit_components';
export * from './stores';
export { NegocioData, attachFileComponent, singleFileInput, switchDealControl, syncMultiSelectData, syncSelectData, tableZoomClass, tableZoomClassComponent };
globalThis.attachFileComponent = attachFileComponent;
globalThis.singleFileInput = singleFileInput;
import { initBsTable } from './datatable_components';
import { editNegocioFilterInputs } from './editNegocioFilterInputs';
import { NegocioData, attachFileComponent, singleFileInput, syncMultiSelectData, syncSelectData, syncSingleSelectData } from "./negocio_edit_components";
import { switchDealControl } from './switchDealControl';
import tableZoomClass from './tableZoomClass';
import { filesTooltipData, getShownValue, inlineEditCheckbox, inlineEditContacto, inlineEditDatesData, inlineEditMainFieldsData, inlineEditMultiselect, inlineEditNumber, inlineEditSelect, inlineEditTextArea, inlineRowActions, inlineEditEtapaNegocioData } from './datatable_input_components';
import { createMapFrameData } from './map_modules/createMapFrameData';
import { tableZoomClassComponent } from './tableZoomClassComponent';
globalThis.createMapFrameData = createMapFrameData;
import { transformableBehavior } from '../components/plugins/transformableBehavior';
import { debouncedAdjustHeight, getFieldAndNegocio, normalizeColumnDef } from './decorators';
/**
 * Datatable input controls
 */
globalThis.inputComponents = {
    inlineEditCheckbox,
    inlineEditDatesData,
    inlineEditMainFieldsData,
    inlineEditEtapaNegocioData,
    inlineEditNumber,
    inlineEditSelect,
    inlineEditTextArea,
    inlineEditContacto,
    inlineEditMultiselect,
    inlineRowActions,
    getShownValue,
    filesTooltipData
};
globalThis.tableZoomClass = tableZoomClass;
globalThis.tableZoomClassComponent = tableZoomClassComponent;
globalThis.editNegocioFilterInputs = editNegocioFilterInputs;
globalThis.normalizeColumnDef = normalizeColumnDef;
globalThis.switchDealControl = switchDealControl;
globalThis.syncSelectData = syncSelectData;
globalThis.syncMultiSelectData = syncMultiSelectData;
globalThis.syncSingleSelectData = syncSingleSelectData;
globalThis.debouncedAdjustHeight = debouncedAdjustHeight;
globalThis.columnsDataFn = (cols) => ({
    columns: cols,
    init() {
        console.info('init columnsData', cols);
        globalThis.columnsData = this;
    }
});
globalThis.getFieldAndNegocio = getFieldAndNegocio;
export function onAlpineInit() {
    console.log('onAlpineInit');
    Alpine.data('numericData', globalThis.numericData);
    Alpine.data('columnsData', (cols) => ({
        columns: cols,
        init() {
            console.info('init columnsData', cols);
            globalThis.columnsData = this;
        },
        closefilestooltip() {
            console.log('columnsData closefilestooltip');
            //@ts-ignore
            if (this.$store.negocios.filesTooltip)
                this.$store.negocios.filesTooltip.destroy();
        }
    }));
}
globalThis.onAlpineInit = onAlpineInit;
globalThis.transformableBehavior = transformableBehavior;
globalThis.NegocioData = NegocioData;
globalThis.initBsTable = initBsTable;
globalThis.debouncedAdjustHeight = debouncedAdjustHeight;
//# sourceMappingURL=index.js.map