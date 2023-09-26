import { Moment } from '../../plugins/moment.bundle'
import { IFiltroSolicitud } from "./IFiltroSolicitud";
import { IidEstadoTuple } from "./IidEstadoTuple";
import { TSolicitanteOAnfitrion } from './TSolicitudesStoreInput';



export interface ISolicitudDummy {

    estado: IidEstadoTuple;
    motivo: string;
    subestado_id: number;
    estado_id: number;

}
export interface ISolicitudBase {
    id: number;
    filtros: IFiltroSolicitud & { parsed_range?: [Moment, Moment] };
    fecha_creacion: string;
    //fecha_programada: string;
    negocio?: { id: number; nombre: string; id_tipo_negocio?: number; };
    nombre?: string;
    solicitante: TSolicitanteOAnfitrion
    anfitrion: TSolicitanteOAnfitrion
    estado: IidEstadoTuple;
    readonly motivo: string;
    //subestado: number;
    //fecha_ejecucion: string;
    medio_solicitud: string;
    n_orden: string;
    nivel_ingreso: number;
    aval_ingreso: number;
    duracion_arriendo: number;
    acciones: string;
    //id_estado_solicitud: number;
    medio_texto: string;
    numero_orden: number;
    negocio_id: number;
    negocio_name: string;
    anfitrion_name: string;
    solicitante_name: string;
    como_conocio_lcdj: string;
    reminder_sent: boolean;
    updated_at: string;
    saving_icon?: string

}
export interface ISolicitud extends ISolicitudBase {
    fecha_programada: string;
    fecha_seguimiento: string;
    subestado: number;
    fecha_ejecucion: string;
    id_estado_solicitud: number;
    fecha_programada_local: string;
    color_row: string;
    seguimiento_expired: boolean;
}
export type TisDirtyReasons = {
    fecha_programada_local: { from: unknown, to: unknown },
    fecha_agendada: { from: unknown, to: unknown },
    fecha_seguimiento: { from: unknown, to: unknown },
    fecha_realizacion: { from: unknown, to: unknown },
    estado_id: { from: unknown, to: unknown },
    subestado_id: { from: unknown, to: unknown },
    motivo: { from: unknown, to: unknown },
}
export interface ISolicitudMutableData {
    fecha_programada: string;
    fecha_seguimiento: string;
    fecha_ejecucion: string;
    motivo: string;
    id_estado_solicitud: number;
    subestado: number;
    fecha_programada_local?: string;
    color_row?: string;
}
