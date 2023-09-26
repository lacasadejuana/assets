import TomSelect from "tom-select";
import type { XDataContext } from '.';
import { Solicitud } from '../../solicitudes_modules/Solicitud';

export type TSolicitudEstadoContext = XDataContext & {
    estadoElement?: HTMLSelectElement;
    subEstadoElement?: HTMLSelectElement;
    solicitud: Solicitud;
    subEstadoTomselect?: TomSelect;
    estadoTomselect?: TomSelect;
    estado_cell_editing: boolean;
    subestado_cell_editing: boolean;
};
