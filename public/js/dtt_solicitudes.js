//import changeEstadoDialogData from './solicitudes_modules/change_estado_dialog_data';
//import { solicitudData } from './solicitudes_modules/solicitud_data';
import { enableInputElement, instanceSingleDatePicker } from './plugins/daterangepicker';
import { createTipoBusquedaStore } from './filter_modules/stores/createTipoBusquedaStore';
import { Solicitud, createBootStrapVisitas, dataSolicitudModal, estadoFormDataInline, filtrosSolicitudesData, multiselectButtonsData, solicitudActionButtons, solicitudMultiselectModal, visitasColumns } from './solicitudes_modules';
globalThis.createTipoBusquedaStore = createTipoBusquedaStore;
import { parseMySqlDate } from './plugins/moment.bundle';
//globalThis.changeEstadoDialogData = changeEstadoDialogData
//globalThis.createDataTable = createDataTable
//globalThis.fchaRealizacionFormData = fchaRealizacionFormData
//globalThis.solicitudData = solicitudData
//import { createDataTable } from './solicitudes_modules/deprecated/createDataTable';
globalThis.Solicitud = Solicitud;
globalThis.createBootStrapVisitas = createBootStrapVisitas;
globalThis.dataSolicitudModal = dataSolicitudModal;
globalThis.enableInputElement = enableInputElement;
globalThis.estadoFormDataInline = estadoFormDataInline;
globalThis.filtrosSolicitudesData = filtrosSolicitudesData;
globalThis.instanceSingleDatePicker = instanceSingleDatePicker;
globalThis.multiselectButtonsData = multiselectButtonsData;
globalThis.parseMySqlDate = parseMySqlDate;
globalThis.solicitudActionButtons = solicitudActionButtons;
globalThis.solicitudMultiselectModal = solicitudMultiselectModal;
globalThis.visitasColumns = visitasColumns;
//# sourceMappingURL=dtt_solicitudes.js.map